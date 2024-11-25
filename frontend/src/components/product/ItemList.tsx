import React, {useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import Item from './Item';
import styles from './ItemList.module.css';
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import ErrorComponent from "../../utils/reactQuery/ErrorComponent";
import {fetchProductList} from "../../utils/product/fetchProductList";
import {CategoryProductList, Product} from "../../typings/product";
import DropDown from "./DropDown";
import NotFoundProduct from "../../utils/reactQuery/NotFoundProduct";

const ItemList: React.FC = () => {
    const {pathname} = useLocation();
    const [orderBy, setOrderBy] = useState<string>('popularity');
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observerRef = useRef<HTMLDivElement | null>(null);

    // 카테고리 추출
    const [productMainCategory, productSubCategory] = (() => {
        const params = pathname.split('/');
        return [params[1], params[2] || 'all'];
    })();

    // 드롭다운 변경 핸들러
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(event.target.value);
        setPage(1);
        setProducts([]);
        setHasMore(true);
    };

    // pathname이 변경되었을 때 상태 초기화
    useEffect(() => {
        setProducts([]); // 기존 데이터 초기화
        setPage(1); // 페이지 초기화
        setHasMore(true); // 더 불러오기 활성화
    }, [pathname, productMainCategory, productSubCategory]);

    // 데이터 fetch
    const fetchItems = async (params: CategoryProductList): Promise<Product[]> => {
        return await fetchProductList(params);
    };

    // 데이터 로드 useEffect
    useEffect(() => {
        const loadProducts = async () => {
            if (isLoading || !hasMore) return;

            setIsLoading(true);

            try {
                const newProducts = await fetchItems({
                    productMainCategory,
                    productSubCategory,
                    orderBy,
                    page,
                    pageSize: 16,
                });

                setProducts((prev) => [...prev, ...newProducts]);
                setHasMore(newProducts.length === 16); // 한 번 요청에 16개 데이터라면 더 로드 가능
            } catch (error) {
                console.error("Failed to load products:", error);
                setHasMore(false);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, [page, productMainCategory, productSubCategory, orderBy]);

    // 옵저버로 마지막 아이템 감지
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            {threshold: 1.0}
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasMore, isLoading]);

    // 로딩 상태 처리
    if (isLoading && page === 1) return <LoadingSpinner/>;
    if (!isLoading && products.length === 0) return <NotFoundProduct/>;

    return (
        <div className={styles.wrapper}>
            <DropDown orderBy={orderBy} handleSortChange={handleSortChange}/>
            <div className={styles.container}>
                {products.map((product, index) => (
                    <Item
                        key={`${product.productId}-${index}`} // 고유한 키 생성
                        productId={product.productId}
                        name={product.productName}
                        price={product.productPrice}
                        discount={product.productDiscountRate}
                        recommended={product.productViews}
                        reviewCount={product.numberOfProduct}
                        imageUrl={product.productImg}
                    />
                ))}
                <div ref={observerRef} className={styles.observer}></div>
            </div>
            {isLoading && <LoadingSpinner/>}
        </div>
    );
};

export default ItemList;
