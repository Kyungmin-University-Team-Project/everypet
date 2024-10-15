import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, useLocation } from 'react-router-dom';
import Item from './Item';
import styles from './ItemList.module.css';
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import ErrorComponent from "../../utils/reactQuery/ErrorComponent";
import { fetchProductList } from "../../utils/product/fetchProductList";
import { CategoryProductList, Product } from "../../typings/product";

const ItemList = () => {
    const { pathname } = useLocation();
    const params = pathname.split('/'); // URL에서 카테고리 추출
    const productMainCategory = params[1]; // 첫 번째 값이 메인 카테고리
    const productSubCategory = params[2] || 'all'; // 두 번째 값이 없으면 'all'로 설정

    const [orderBy, setOrderBy] = useState<string>('popularity'); // 초기 정렬 기준을 인기순으로 설정

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(event.target.value); // 드롭다운에서 선택한 정렬 기준을 업데이트
    };

    const fetchItems = async ({
                                  productMainCategory,
                                  productSubCategory = 'all',
                                  orderBy = 'popularity',
                                  page,
                                  pageSize = 10
                              }: CategoryProductList): Promise<Product[]> => {
        const params = {
            productMainCategory: productMainCategory,
            productSubCategory: productSubCategory,
            orderBy: orderBy,
            page: page,
            pageSize: pageSize,
        };
        console.log("Fetching items with params:", params);
        return await fetchProductList(params);
    };

    const { data, error, isLoading } = useQuery<Product[], Error>(['products', productMainCategory, productSubCategory, orderBy], () =>
        fetchItems({
            productMainCategory: productMainCategory, // URL에서 추출한 메인 카테고리
            productSubCategory: productSubCategory, // URL에서 추출한 서브 카테고리 (없으면 'all')
            orderBy: orderBy, // 정렬 기준에 따라 데이터를 다시 불러옴
            page: 1,
            pageSize: 10
        })
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorComponent message={error.message} />;
    }

    return (
        <>
            <div className={styles.selectContainer}>
                {/* 정렬 드롭다운 */}
                <select className={styles.select} id="sort" value={orderBy} onChange={handleSortChange}>
                    <option value="popularity">인기순</option>
                    <option value="sales_high">판매량 높은 순</option>
                    <option value="sales_low">판매량 낮은 순</option>
                    <option value="price_high">가격 높은 순</option>
                    <option value="price_low">가격 낮은 순</option>
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된 순</option>
                </select>
            </div>

            <div className={styles.container}>
                {data?.map((item) => (
                    <Item
                        key={item.productId}
                        productId={item.productId}
                        name={item.productName}
                        price={item.productPrice}
                        discount={item.productDiscountRate}
                        recommended={item.productViews}
                        reviewCount={item.numberOfProduct}
                        imageUrl={item.productImg}
                    />
                ))}
            </div>
        </>
    );
};

export default ItemList;
