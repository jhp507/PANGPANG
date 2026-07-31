# 🐧 PANGPANG: 비회원 투표 서비스 데이터베이스 설계서

본 문서는 **PANGPANG** 서비스의 비회원 기반 투표 시스템을 위한 데이터 구조와 비즈니스 로직을 정의합니다.

## 1. 데이터베이스 스키마 명세

### 📊 `polls` (투표 메인)
투표의 기본 설정 및 작성자 인증 정보를 관리합니다.

| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Default: `gen_random_uuid()` | 투표 고유 ID |
| `admin_id` | `text` | NOT NULL | 관리용 ID (비회원 작성자 식별) |
| `password` | `text` | NOT NULL | 관리용 비밀번호 (수정/삭제 인증용) |
| `title` | `text` | NOT NULL | 투표 제목 |
| `description` | `text` | - | 투표 상세 설명 (선택 사항) |
| `status` | `text` | Default: `'open'` | 투표 상태 (`open`, `closed`) |
| `starts_at` | `timestamptz` | Default: `now()` | 투표 시작 일시 |
| `ends_at` | `timestamptz` | - | 투표 종료 일시 (null일 경우 상시) |
| `created_at` | `timestamptz` | Default: `now()` | 데이터 생성 일시 |

### 📝 `poll_options` (투표 선택지)
하나의 투표에 포함된 개별 선택 항목들입니다.

| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Default: `gen_random_uuid()` | 선택지 고유 ID |
| `poll_id` | `uuid` | FK (`polls.id`), ON DELETE CASCADE | 소속된 투표 ID |
| `option_text` | `text` | NOT NULL | 항목명 (예: 짜장면, 짬뽕) |
| `image_url` | `text` | - | 항목 이미지 경로 (선택 사항) |
| `order_index` | `int` | Default: `0` | 프론트엔드 노출 순서 |

### ✅ `votes` (투표 내역)
사용자들의 투표 참여 기록을 저장하며, 중복 투표를 방지합니다.

| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Default: `gen_random_uuid()` | 투표 기록 고유 ID |
| `poll_id` | `uuid` | FK (`polls.id`), ON DELETE CASCADE | 투표 ID |
| `option_id` | `uuid` | FK (`poll_options.id`), ON DELETE CASCADE | 선택한 항목 ID |
| `voter_id` | `uuid` | NOT NULL | 투표자 고유 식별자 (LocalStorage UUID) |
| `created_at` | `timestamptz` | Default: `now()` | 투표 일시 |

### 💬 `poll_comments` (투표 댓글)
비회원 사용자들이 특정 투표에 닉네임과 비밀번호를 사용하여 자유롭게 작성하는 댓글 목록입니다.

| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Default: `gen_random_uuid()` | 댓글 고유 ID |
| `poll_id` | `uuid` | FK (`polls.id`), ON DELETE CASCADE | 소속된 투표 ID |
| `nickname` | `text` | NOT NULL | 작성자 닉네임 |
| `password` | `text` | NOT NULL | 댓글 수정/삭제용 비밀번호 |
| `content` | `text` | NOT NULL | 댓글 내용 |
| `created_at` | `timestamptz` | Default: `now()` | 작성 일시 |
| `updated_at` | `timestamptz` | Default: `now()` | 수정 일시 |

---

## 2. 주요 비즈니스 규칙

### 🔐 작성자 및 댓글 인증 관리
- **익명성 보장**: 별도의 회원가입 없이 `admin_id`/`password`로 투표를 관리하고, `nickname`/`password`로 본인의 댓글을 수정/삭제합니다.
- **보안**: 댓글 수정/삭제 요청 시 전달된 비밀번호와 DB 값을 비교하여 권한을 검증합니다.

### 🚫 1인 1표 정책 (중복 투표 방지)
- **제약 조건**: `unique(poll_id, voter_id)` 설정을 통해 동일한 사용자가 한 투표에 여러 번 참여하는 것을 DB 수준에서 차단합니다.
- **식별 방식**: 클라이언트의 `localStorage`에 저장된 `voter_id`(UUID)를 기준으로 식별합니다.

### 🆔 투표자 식별 (Voter Identification)
앱 최초 접속 시 아래 로직을 통해 투표자 ID를 생성하고 유지해야 합니다.
```javascript
import { v4 as uuidv4 } from "uuid";
const voterId = localStorage.getItem("voter_id") || uuidv4();
localStorage.setItem("voter_id", voterId);
```

---

## 3. SQL 실행 가이드 (Supabase용)
Supabase Dashboard의 **SQL Editor**에 아래 스크립트를 복사하여 실행하면 테이블과 인덱스가 생성됩니다.

```sql
-- 1. 투표 테이블 생성
CREATE TABLE IF NOT EXISTS polls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id TEXT NOT NULL,
  password TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  starts_at TIMESTAMPTZ DEFAULT now(),
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 투표 항목 테이블 생성
CREATE TABLE IF NOT EXISTS poll_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  image_url TEXT,
  order_index INT DEFAULT 0
);

-- 3. 투표 내역 테이블 생성 (중복 투표 방지 포함)
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  option_id UUID REFERENCES poll_options(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(poll_id, voter_id) -- 1인 1표 핵심 제약 조건
);

-- 4. 투표 댓글 테이블 생성
CREATE TABLE IF NOT EXISTS poll_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE NOT NULL,
  nickname TEXT NOT NULL,
  password TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 5. 성능 최적화를 위한 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_polls_status ON polls(status);
CREATE INDEX IF NOT EXISTS idx_votes_voter ON votes(voter_id);
CREATE INDEX IF NOT EXISTS idx_poll_options_poll_id ON poll_options(poll_id);
CREATE INDEX IF NOT EXISTS idx_poll_comments_poll_id ON poll_comments(poll_id, created_at DESC);

-- 6. Row Level Security (RLS) 설정 (선택 사항)
-- 비회원 서비스이므로 모든 사용자가 읽고 쓸 수 있도록 기본 정책을 열어둡니다.
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to polls" ON polls FOR ALL USING (true);
CREATE POLICY "Allow public access to poll_options" ON poll_options FOR ALL USING (true);
CREATE POLICY "Allow public access to votes" ON votes FOR ALL USING (true);
CREATE POLICY "Allow public access to poll_comments" ON poll_comments FOR ALL USING (true);
```
