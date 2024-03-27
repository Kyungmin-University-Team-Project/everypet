export interface Ranking {
  rank: number;
  keyword: string;
}

export interface ProductcategoryItemProps {
  category: string;
  isActive: boolean;
  onClick: (category: string) => void;
  link: string;
}
