// 실시간 검색어
export interface Ranking {
  rank: number;
  keyword: string;
}

// 페이지 카테고리
export interface ProductcategoryItemProps {
  category: string;
  isActive: boolean;
  onClick: (category: string) => void;
  link: string;
}

// 사이드바 온오프
export interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}
