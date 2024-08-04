// 실시간 검색어
export interface Ranking {
    rank: number;
    keyword: string;
    trend: "up" | "down" | "steady";
}

// 페이지 카테고리
export interface ProductcategoryItemProps {
    category: string;
    isActive: boolean;
    onClick: (category: string) => void;
    link: string;
}

export interface SidebarProps {
    isOpen: boolean;
    setOpen: () => void;
    setClose: () => void;
}
