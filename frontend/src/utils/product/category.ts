import {DetailedCategoryList} from "../../typings/product";

export const fetchCategoryDetails = async (category: string): Promise<{ detailedCategories: DetailedCategoryList[] }> => {
    const response = await fetch(`/mock/${category}_detail_categories.json`);

    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};