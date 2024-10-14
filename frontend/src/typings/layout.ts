// 실시간 검색어
export interface Ranking {
    rank: number;
    keyword: string;
    trend: "up" | "down" | "steady";
}

// 페이지 카테고리
export interface ProductCategoryItemProps {
    category: string;
    isActive: boolean;
    onClick: (category: string) => void;
    link: string;
}

// 메가 카테고리 온/오프
export interface MegaMenuProps {
    isOpen: boolean;
    setOpen: () => void;
    setClose: () => void;
}
