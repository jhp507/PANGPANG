import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RedCapIcon,
  WizardHatIcon,
  CrownIcon,
  CowboyHatIcon,
  ChefHatIcon,
  SantaHatIcon,
  YellowBeretIcon,
  LeprechaunHatIcon,
  BlackCowboyHatIcon,
  RedBucketHatIcon,
  KoreanGatIcon,
  BaseballHelmetIcon,
  VikingHatIcon,
  SombreroIcon,
  FezIcon,
  NonLaIcon,
  TopHatIcon,
  UshankaIcon,
  PoliceCapIcon,
  PropellerHatIcon,
  GraduationCapIcon,
  TurbanIcon,
  HachimakiIcon,
  SortingHatIcon,
  MouseIcon,
} from "../components/PixelIcons";

interface Item {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const ITEMS: Item[] = [
  {
    id: 1,
    name: "빨간 캡모자",
    description: "어디에나 잘 어울리는 기본 아이템! 열정적인 빨간색이 특징입니다.",
    icon: <RedCapIcon />,
  },
  {
    id: 2,
    name: "마법사 모자",
    description: "신비로운 힘이 깃든 모자입니다. 쓰고 있으면 지능이 올라갈 것 같아요.",
    icon: <WizardHatIcon />,
  },
  {
    id: 3,
    name: "황금 왕관",
    description: "진정한 리더를 위한 왕관. 반짝이는 황금빛이 권위를 상징합니다.",
    icon: <CrownIcon />,
  },
  {
    id: 4,
    name: "카우보이 모자",
    description: "자유로운 영혼을 위한 모자. 서부의 황야가 떠오르는 디자인입니다.",
    icon: <CowboyHatIcon />,
  },
  {
    id: 5,
    name: "요리사 모자",
    description: "맛있는 요리를 만들 때 필수! 깨끗하고 하얀 색상이 매력적입니다.",
    icon: <ChefHatIcon />,
  },
  {
    id: 6,
    name: "산타 모자",
    description: "크리스마스의 설렘을 담은 모자. 방울이 달려 있어 귀여움을 더합니다.",
    icon: <SantaHatIcon />,
  },
  {
    id: 7,
    name: "노란 베레모",
    description: "예술적 감각이 느껴지는 세련된 베레모입니다. 부드러운 노란색이 포인트예요.",
    icon: <YellowBeretIcon />,
  },
  {
    id: 8,
    name: "레프러콘 모자",
    description: "행운을 가져다줄 것 같은 초록색 모자입니다. 황금 버클이 매력적이죠.",
    icon: <LeprechaunHatIcon />,
  },
  {
    id: 9,
    name: "검은 카우보이 모자",
    description: "시크하고 강인한 인상을 주는 검은색 카우보이 모자입니다.",
    icon: <BlackCowboyHatIcon />,
  },
  {
    id: 10,
    name: "빨간 버킷햇",
    description: "어떤 스타일에도 힙하게 어울리는 빨간색 버킷햇입니다.",
    icon: <RedBucketHatIcon />,
  },
  {
    id: 11,
    name: "조선시대 갓",
    description: "선비의 기품이 느껴지는 전통 갓입니다. 검은색 실루엣과 갓끈이 멋스러워요.",
    icon: <KoreanGatIcon />,
  },
  {
    id: 12,
    name: "야구 헬멧",
    description: "단단하고 묵직한 회색 야구 헬멧입니다. 어떤 충격도 막아줄 것 같아요.",
    icon: <BaseballHelmetIcon />,
  },
  {
    id: 13,
    name: "바이킹 투구",
    description: "용맹한 바이킹의 상징인 뿔 달린 투구입니다. 파란색 본체가 아주 강렬하죠.",
    icon: <VikingHatIcon />,
  },
  {
    id: 14,
    name: "솜브레로",
    description: "멕시코의 정취가 느껴지는 넓은 챙의 모자입니다. 화려한 색상이 특징이에요.",
    icon: <SombreroIcon />,
  },
  {
    id: 15,
    name: "페즈",
    description: "터키의 전통적인 붉은색 원통형 모자입니다. 검은색 술이 달려있어요.",
    icon: <FezIcon />,
  },
  {
    id: 16,
    name: "논라",
    description: "베트남의 전통적인 원뿔형 모자입니다. 햇빛을 피하기에 아주 좋죠.",
    icon: <NonLaIcon />,
  },
  {
    id: 17,
    name: "신사 모자",
    description: "영국의 신사가 떠오르는 높은 검은색 모자입니다. 클래식한 멋이 있죠.",
    icon: <TopHatIcon />,
  },
  {
    id: 18,
    name: "우샨카",
    description: "추운 겨울을 나기 위한 러시아의 따뜻한 털모자입니다.",
    icon: <UshankaIcon />,
  },
  {
    id: 19,
    name: "경찰모",
    description: "정의를 수호하는 경찰의 모자입니다. 반짝이는 금색 배지가 포인트예요.",
    icon: <PoliceCapIcon />,
  },
  {
    id: 20,
    name: "프로펠러 모자",
    description: "머리 위에 프로펠러가 달린 장난기 가득한 알록달록한 모자입니다.",
    icon: <PropellerHatIcon />,
  },
  {
    id: 21,
    name: "학위모",
    description: "졸업식의 영광이 담긴 사각 모자입니다. 노란색 술이 달려있어요.",
    icon: <GraduationCapIcon />,
  },
  {
    id: 22,
    name: "터번",
    description: "인도나 중동 지역에서 머리에 두르는 전통적인 형태의 모자입니다.",
    icon: <TurbanIcon />,
  },
  {
    id: 23,
    name: "일장기 머리띠",
    description: "강한 의지가 느껴지는 일본 스타일의 하얀색 머리띠입니다.",
    icon: <HachimakiIcon />,
  },
  {
    id: 24,
    name: "말하는 모자",
    description: "신비로운 마법의 힘으로 당신의 기숙사를 배정해줄 낡은 모자입니다. 모자 주름 사이로 얼굴 형상이 보여요!",
    icon: <SortingHatIcon />,
  },
];

const Introduce: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [equippedItem, setEquippedItem] = useState<Item | null>(null);

  const handleEquip = (item: Item) => {
    setEquippedItem(item);
    setSelectedItem(null);
  };

  const handleReset = () => {
    setEquippedItem(null);
  };

  return (
    <div className="flex flex-col items-center py-6 px-4 min-h-screen max-w-2xl mx-auto">
      {/* 1. 최상단 제목 */}
      <div className="flex items-center justify-between w-full mb-8">
        <h1
          className="text-2xl font-black text-penguin-black tracking-tighter uppercase"
          style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
        >
          MOJI MEMBER
        </h1>
        <button
          onClick={handleReset}
          className="px-4 py-1 bg-white border-4 border-black text-[10px] font-black hover:bg-red-500 hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          RESET
        </button>
      </div>

      {/* 2. 상단: 캐릭터 영역 (아이템 착용 효과 포함) */}
      <div className="w-full flex flex-col items-center mb-10">
        <div className="relative w-44 h-44 bg-slate-50 border-[6px] border-black flex items-center justify-center shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] mb-4">
          <div className="relative w-32 h-32 animate-bounce">
            {equippedItem && (
              <div className="absolute -top-4 left-0 w-full h-full z-10 transform scale-110">
                {equippedItem.icon}
              </div>
            )}
            <MouseIcon />
          </div>

          <div className="absolute bottom-4 w-24 h-4 bg-black/5 rounded-full blur-[2px]"></div>

          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-black"></div>
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-black"></div>
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-black"></div>
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black"></div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="px-4 py-1 bg-black text-white text-[10px] font-black tracking-[0.3em] uppercase">
            Hero Mouse
          </div>
          {equippedItem && (
            <div className="text-[10px] font-bold text-penguin-yellow bg-black px-2 py-0.5 rounded-sm animate-pulse">
              Equipped: {equippedItem.name}
            </div>
          )}
        </div>
      </div>

      {/* 3. 하단: 아이템 목록 (인벤토리 박스 스타일) */}
      <div className="w-full bg-gray-100 border-[6px] border-black p-5 md:p-7 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="mb-5 flex items-center justify-between border-b-4 border-black pb-3">
          <h2 className="font-black text-base uppercase tracking-widest flex items-center gap-2">
            <span className="w-3 h-3 bg-penguin-yellow inline-block"></span>
            Inventory
          </h2>
          <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 border-2 border-black">
            {ITEMS.length} slots used
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
          {ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`group aspect-square bg-slate-100/80 border-4 border-black transition-all flex items-center justify-center p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:bg-slate-200 ${
                equippedItem?.id === item.id
                  ? "ring-4 ring-penguin-yellow ring-inset bg-penguin-yellow/20"
                  : ""
              }`}
            >
              <div className="w-full h-full transform group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
            </button>
          ))}

          {Array.from({ length: Math.max(0, 25 - ITEMS.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="aspect-square bg-gray-200/40 border-4 border-black/10 flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 bg-black/5 rotate-45"></div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[10px] font-black text-gray-400 animate-pulse">
            {"<<< SELECT AN ITEM TO PREVIEW >>>"}
          </p>
        </div>
      </div>

      {/* 4. 팝업 모달 */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-[320px] bg-white border-[6px] border-black p-6 md:p-8 animate-in zoom-in duration-200 shadow-[16px_16px_0px_0px_rgba(0,0,0,0.3)]">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center font-black text-2xl hover:text-red-500 transition-colors"
            >
              ×
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-slate-100 border-4 border-black flex items-center justify-center p-4 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-full h-full">{selectedItem.icon}</div>
              </div>
              <h3 className="text-lg font-black mb-3 border-b-4 border-penguin-yellow px-2">
                {selectedItem.name}
              </h3>
              <p className="text-xs font-bold leading-relaxed text-gray-600 mb-6">
                {selectedItem.description}
              </p>

              <button
                onClick={() => handleEquip(selectedItem)}
                className="w-full py-3 bg-black text-white font-black text-sm hover:bg-penguin-yellow hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(255,213,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                EQUIP THIS ITEM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. 하단 홈 링크 */}
      <div className="mt-12 mb-8 text-center w-full border-t-4 border-black/5 pt-8">
        <Link
          to="/"
          className="text-xs font-black border-b-2 border-black hover:text-penguin-yellow hover:border-penguin-yellow transition-all uppercase tracking-widest"
        >
          ← Exit Shop
        </Link>
      </div>
    </div>
  );
};

export default Introduce;
