import React from "react";

const PixelIconWrapper = ({
  children,
  className = "w-full h-full",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated" }}
  >
    {children}
  </svg>
);

// 1. 빨간 캡모자
export const RedCapIcon = () => (
  <PixelIconWrapper>
    <rect x="6" y="8" width="12" height="8" fill="#991B1B" />
    <rect x="18" y="12" width="4" height="4" fill="#991B1B" />
    <rect x="7" y="9" width="10" height="6" fill="#EF4444" />
    <rect x="17" y="13" width="4" height="2" fill="#EF4444" />
    <rect x="8" y="9" width="4" height="2" fill="#F87171" />
    <rect x="11" y="11" width="2" height="2" fill="white" />
    <rect x="7" y="14" width="10" height="1" fill="#B91C1C" />
  </PixelIconWrapper>
);

// 2. 마법사 모자
export const WizardHatIcon = () => (
  <PixelIconWrapper>
    <path d="M11 3H14V5H16V7H18V9H20V11H4V9H6V7H8V5H10V3H11Z" fill="#4C1D95" />
    <path d="M11 4H13V6H15V8H17V10H7V8H9V6H11V4Z" fill="#7C3AED" />
    <rect x="3" y="11" width="18" height="3" fill="#5B21B6" />
    <rect x="4" y="12" width="16" height="1" fill="#8B5CF6" />
    <rect x="11" y="6" width="2" height="2" fill="#FDE047" />
    <rect x="14" y="9" width="1" height="1" fill="#FDE047" />
    <rect x="8" y="9" width="1" height="1" fill="#FDE047" />
  </PixelIconWrapper>
);

// 3. 황금 왕관
export const CrownIcon = () => (
  <PixelIconWrapper>
    <path d="M4 6L7 10L12 5L17 10L20 6V15H4V6Z" fill="#CA8A04" />
    <path d="M5 7L7 9L12 6L17 9L19 7V14H5V7Z" fill="#EAB308" />
    <rect x="5" y="12" width="14" height="2" fill="#FACC15" />
    <rect x="7" y="11" width="2" height="2" fill="#EF4444" />
    <rect x="11" y="11" width="2" height="2" fill="#3B82F6" />
    <rect x="15" y="11" width="2" height="2" fill="#10B981" />
  </PixelIconWrapper>
);

// 4. 카우보이 모자
export const CowboyHatIcon = () => (
  <PixelIconWrapper>
    <rect x="8" y="6" width="8" height="6" fill="#78350F" />
    <rect x="9" y="5" width="6" height="1" fill="#92400E" />
    <rect x="8" y="10" width="8" height="1" fill="#451A03" />
    <rect x="4" y="11" width="16" height="3" fill="#92400E" />
    <rect x="3" y="12" width="1" height="1" fill="#78350F" />
    <rect x="20" y="12" width="1" height="1" fill="#78350F" />
    <rect x="9" y="7" width="3" height="1" fill="#B45309" />
  </PixelIconWrapper>
);

// 5. 요리사 모자 (주름 디테일)
export const ChefHatIcon = () => (
  <PixelIconWrapper>
    <path d="M6 3H18V6H20V12H4V6H6V3Z" fill="#D1D5DB" />
    <path d="M7 4H17V11H5V6H7V4Z" fill="white" />
    <rect x="8" y="5" width="1" height="5" fill="#F3F4F6" />
    <rect x="12" y="5" width="1" height="5" fill="#F3F4F6" />
    <rect x="15" y="5" width="1" height="5" fill="#F3F4F6" />
    <rect x="7" y="12" width="10" height="5" fill="#9CA3AF" />{" "}
    {/* 하단 밴드 외곽 */}
    <rect x="8" y="12" width="8" height="4" fill="#E5E7EB" /> {/* 하단 밴드 */}
  </PixelIconWrapper>
);

// 6. 산타 모자
export const SantaHatIcon = () => (
  <PixelIconWrapper>
    <rect x="5" y="8" width="14" height="6" fill="black" />
    <rect x="17" y="4" width="5" height="5" fill="black" />
    <path d="M10 4H14V6H16V9H8V6H10V4Z" fill="#EF4444" />
    <path d="M16 6H18V8H16V6Z" fill="#DC2626" />
    <rect x="6" y="9" width="12" height="4" fill="white" />
    <rect x="7" y="10" width="10" height="2" fill="#F9FAFB" />
    <rect x="18" y="5" width="3" height="3" fill="white" />
    <rect x="19" y="6" width="1" height="1" fill="#F3F4F6" />
    <rect x="9" y="7" width="5" height="1" fill="#B91C1C" />
  </PixelIconWrapper>
);

// 7. 노란색 베레모
export const YellowBeretIcon = () => (
  <PixelIconWrapper>
    <rect x="11" y="5" width="2" height="2" fill="#CA8A04" />
    <path d="M6 7H18V9H20V12H4V9H6V7Z" fill="#EAB308" />
    <path d="M7 8H17V10H19V11H5V10H7V8Z" fill="#FACC15" />
    <rect x="5" y="12" width="14" height="1" fill="#CA8A04" />
  </PixelIconWrapper>
);

// 8. 레프러콘 모자
export const LeprechaunHatIcon = () => (
  <PixelIconWrapper>
    <rect x="7" y="4" width="10" height="9" fill="#166534" />
    <rect x="8" y="5" width="8" height="7" fill="#22C55E" />
    <rect x="7" y="10" width="10" height="2" fill="#111827" />
    <rect x="10" y="10" width="4" height="2" fill="#FACC15" />
    <rect x="11" y="10" width="2" height="1" fill="#111827" />
    <rect x="4" y="13" width="16" height="2" fill="#166534" />
  </PixelIconWrapper>
);

// 9. 검은색 카우보이 모자
export const BlackCowboyHatIcon = () => (
  <PixelIconWrapper>
    <rect x="8" y="6" width="8" height="6" fill="#1A1A1A" />
    <rect x="9" y="5" width="6" height="1" fill="#333333" />
    <rect x="11" y="7" width="2" height="3" fill="#FDE047" />
    <rect x="10" y="8" width="4" height="1" fill="#FDE047" />
    <rect x="11" y="8" width="1" height="1" fill="white" opacity="0.8" />
    <rect x="8" y="10" width="8" height="1" fill="#4B5563" />
    <rect x="6" y="11" width="12" height="2" fill="#333333" />
    <rect x="4" y="10" width="2" height="2" fill="#333333" />
    <rect x="3" y="9" width="1" height="1" fill="#1A1A1A" />
    <rect x="18" y="10" width="2" height="2" fill="#333333" />
    <rect x="20" y="9" width="1" height="1" fill="#1A1A1A" />
    <rect x="9" y="7" width="1" height="2" fill="#4B5563" opacity="0.3" />
    <rect x="6" y="11" width="12" height="1" fill="#4B5563" opacity="0.3" />
  </PixelIconWrapper>
);

// 10. 빨간색 버킷햇
export const RedBucketHatIcon = () => (
  <PixelIconWrapper>
    <rect x="7" y="5" width="10" height="5" fill="#EF4444" />
    <rect x="6" y="10" width="12" height="3" fill="#DC2626" />
    <rect x="8" y="6" width="3" height="1" fill="#F87171" />
  </PixelIconWrapper>
);

// 11. 조선시대 갓
// export const KoreanGatIcon = () => (
//   <PixelIconWrapper>
//     <rect x="8" y="11" width="1" height="9" fill="#E5E7EB" opacity="0.5" />
//     <rect x="15" y="11" width="1" height="9" fill="#E5E7EB" opacity="0.5" />
//     <rect x="8" y="14" width="1" height="1" fill="#FDE047" />
//     <rect x="15" y="14" width="1" height="1" fill="#FDE047" />
//     <rect x="2" y="10" width="20" height="2" fill="#000000" />
//     <rect x="3" y="11" width="18" height="1" fill="#1A1A1A" />
//     <rect x="8" y="3" width="8" height="8" fill="#000000" />
//     <rect x="9" y="4" width="6" height="6" fill="#1A1A1A" />
//     <rect x="9" y="4" width="2" height="1" fill="#333333" />
//   </PixelIconWrapper>
// );

// 12. 회색 야구 헬멧
export const BaseballHelmetIcon = () => (
  <PixelIconWrapper>
    <path d="M8 6H16V8H18V13H6V8H8V6Z" fill="#4B5563" />
    <path d="M9 7H15V9H17V12H7V9H9V7Z" fill="#6B7280" />
    <rect x="17" y="11" width="4" height="2" fill="#374151" />
    <rect x="18" y="11" width="2" height="1" fill="#4B5563" />
    <rect x="12" y="13" width="5" height="5" fill="#374151" />
    <rect x="13" y="14" width="3" height="3" fill="#4B5563" />
    <rect x="14" y="15" width="1" height="1" fill="#1F2937" />
    <rect x="9" y="7" width="4" height="1" fill="#9CA3AF" />
    <rect x="7" y="9" width="1" height="2" fill="#9CA3AF" opacity="0.5" />
    <rect x="7" y="12" width="10" height="1" fill="#1F2937" opacity="0.3" />
  </PixelIconWrapper>
);

// 13. 파란색 바이킹 모자
export const VikingHatIcon = () => (
  <PixelIconWrapper>
    <path d="M3 5H6V7H9V11H3V5Z" fill="black" />
    <path d="M4 6H6V8H8V10H4V6Z" fill="white" />
    <rect x="3" y="5" width="2" height="2" fill="white" />
    <path d="M18 5H21V11H15V7H18V5Z" fill="black" />
    <path d="M18 6H20V8H16V10H20V6Z" fill="white" />
    <rect x="19" y="5" width="2" height="2" fill="white" />
    <path d="M7 8H17V13H7V8Z" fill="#1E40AF" />
    <path d="M8 9H16V12H8V9Z" fill="#3B82F6" />
    <rect x="11" y="8" width="2" height="5" fill="#1D4ED8" />
    <rect x="7" y="12" width="10" height="2" fill="#1E3A8A" />
  </PixelIconWrapper>
);

// 14. 솜브레로 (멕시코 전통 모자)
export const SombreroIcon = () => (
  <PixelIconWrapper>
    <rect x="8" y="4" width="8" height="6" fill="#D97706" />
    <rect x="4" y="10" width="16" height="3" fill="#B45309" />
    <rect x="8" y="7" width="8" height="1" fill="#EF4444" />
    <rect x="8" y="8" width="8" height="1" fill="#10B981" />
    <rect x="3" y="11" width="18" height="1" fill="#FDE047" />
  </PixelIconWrapper>
);

// 15. 페즈 (터키 전통 모자)
export const FezIcon = () => (
  <PixelIconWrapper>
    <path d="M8 5H16L17 12H7L8 5Z" fill="#B91C1C" />
    <rect x="9" y="6" width="6" height="1" fill="#DC2626" />
    <rect x="15" y="4" width="1" height="4" fill="black" />
    <rect x="15" y="8" width="2" height="2" fill="black" />
  </PixelIconWrapper>
);

// 16. 논라 (베트남 전통 모자)
export const NonLaIcon = () => (
  <PixelIconWrapper>
    <path d="M12 4L3 13H21L12 4Z" fill="#FDE68A" />
    <path d="M12 5L5 12H19L12 5Z" fill="#FEF3C7" />
    <rect x="11" y="8" width="2" height="1" fill="#F59E0B" opacity="0.3" />
  </PixelIconWrapper>
);

// 18. 신사 모자 (Top Hat - 실크 광택 추가)
export const TopHatIcon = () => (
  <PixelIconWrapper>
    <rect x="6" y="3" width="12" height="10" fill="#000000" />
    <rect x="7" y="3" width="2" height="9" fill="#333333" /> {/* 왼쪽 광택 */}
    <rect x="6" y="10" width="12" height="2" fill="#7F1D1D" /> {/* 붉은 띠 */}
    <rect x="3" y="12" width="18" height="3" fill="#000000" />
    <rect x="4" y="12" width="16" height="1" fill="#333333" />
  </PixelIconWrapper>
);

// 18. 우샨카 (러시아 털모자)
export const UshankaIcon = () => (
  <PixelIconWrapper>
    <rect x="7" y="6" width="10" height="8" fill="#4B5563" />
    <rect x="6" y="9" width="3" height="6" fill="#374151" />
    <rect x="15" y="9" width="3" height="6" fill="#374151" />
    <rect x="8" y="7" width="8" height="3" fill="#9CA3AF" />
    <rect x="11" y="8" width="2" height="1" fill="#EF4444" />
  </PixelIconWrapper>
);

// 19. 경찰모
export const PoliceCapIcon = () => (
  <PixelIconWrapper>
    <rect x="6" y="7" width="12" height="5" fill="#1E3A8A" />
    <rect x="11" y="8" width="2" height="2" fill="#FACC15" />
    <rect x="5" y="11" width="14" height="2" fill="#111827" />
    <rect x="6" y="7" width="12" height="1" fill="#3B82F6" />
  </PixelIconWrapper>
);

// 20. 프로펠러 모자
export const PropellerHatIcon = () => (
  <PixelIconWrapper>
    <rect x="11" y="3" width="2" height="3" fill="black" />
    <rect x="7" y="3" width="10" height="1" fill="#9CA3AF" />
    <path d="M7 6H17V12H7V6Z" fill="#EF4444" />
    <rect x="7" y="6" width="5" height="6" fill="#3B82F6" />
    <rect x="12" y="6" width="5" height="3" fill="#FDE047" />
  </PixelIconWrapper>
);

// 21. 학위모 (Graduation Cap)
export const GraduationCapIcon = () => (
  <PixelIconWrapper>
    <path d="M3 8L12 5L21 8L12 11L3 8Z" fill="#1A1A1A" />
    <rect x="8" y="10" width="8" height="3" fill="#1A1A1A" />
    <rect x="20" y="8" width="1" height="5" fill="#FACC15" />
    <rect x="19" y="12" width="2" height="2" fill="#FACC15" />
  </PixelIconWrapper>
);

// 22. 터번 (Turban)
export const TurbanIcon = () => (
  <PixelIconWrapper>
    <rect x="6" y="7" width="12" height="7" fill="#F3F4F6" />
    <path d="M7 6H17V8H7V6Z" fill="white" />
    <rect x="11" y="8" width="2" height="2" fill="#3B82F6" />
    <rect x="6" y="10" width="12" height="1" fill="#E5E7EB" />
  </PixelIconWrapper>
);

// 23. 일장기 머리띠 (Hachimaki)
export const HachimakiIcon = () => (
  <PixelIconWrapper>
    <rect x="3" y="9" width="18" height="3" fill="white" />
    <rect x="3" y="9" width="18" height="1" fill="#E5E7EB" />
    <rect x="11" y="10" width="2" height="1" fill="#EF4444" />
    <rect x="2" y="11" width="2" height="2" fill="white" />
    <rect x="20" y="11" width="2" height="2" fill="white" />
  </PixelIconWrapper>
);

// 25. 말하는 모자 (Sorting Hat - 해리포터 스타일)
export const SortingHatIcon = () => (
  <PixelIconWrapper>
    <path
      d="M12 2L15 4V6L13 8L16 10L18 13H6L9 10L7 8L10 5L12 2Z"
      fill="#451A03"
    />
    <path
      d="M12 3L14 5V6L12 8L15 10L16 12H8L10 10L8 8L11 5L12 3Z"
      fill="#78350F"
    />
    {/* 눈 주름 */}
    <rect x="9" y="8" width="2" height="1" fill="#271101" />
    <rect x="13" y="8" width="2" height="1" fill="#271101" />
    {/* 입 주름 */}
    <path
      d="M9 11C9 11 10 12 12 12C14 12 15 11 15 11"
      stroke="#271101"
      strokeWidth="1"
    />
    {/* 챙 */}
    <rect x="2" y="13" width="20" height="3" fill="#451A03" />
    <rect x="3" y="13" width="18" height="1" fill="#92400E" />
  </PixelIconWrapper>
);

// 25. 쥐 (Mouse)
export const MouseIcon = () => (
  <PixelIconWrapper>
    <rect x="4" y="4" width="6" height="6" fill="#9CA3AF" />
    <rect x="14" y="4" width="6" height="6" fill="#9CA3AF" />
    <rect x="5" y="5" width="4" height="4" fill="#F472B6" />
    <rect x="15" y="5" width="4" height="4" fill="#F472B6" />
    <rect x="6" y="8" width="12" height="10" fill="#D1D5DB" />
    <rect x="7" y="9" width="10" height="8" fill="#E5E7EB" />
    <rect x="8" y="11" width="2" height="3" fill="black" />
    <rect x="8" y="11" width="1" height="1" fill="white" />
    <rect x="14" y="11" width="2" height="3" fill="black" />
    <rect x="14" y="11" width="1" height="1" fill="white" />
    <rect x="11" y="14" width="2" height="2" fill="#F472B6" />
    <rect x="11" y="14" width="1" height="1" fill="#FB923C" />
    <rect x="4" y="14" width="3" height="1" fill="black" opacity="0.2" />
    <rect x="17" y="14" width="3" height="1" fill="black" opacity="0.2" />
    <rect x="7" y="15" width="2" height="1" fill="#FECDD3" />
    <rect x="15" y="15" width="2" height="1" fill="#FECDD3" />
    <rect x="8" y="18" width="8" height="2" fill="#D1D5DB" />
  </PixelIconWrapper>
);
