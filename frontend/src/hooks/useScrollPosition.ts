import { useEffect, useState } from 'react';

/**
 * 스크롤 위치에 따라 상태를 업데이트하는 커스텀 훅
 * @param offsetY 스크롤 위치 기준
 * @returns {boolean} 스크롤 버튼 표시 여부
 */
const useScrollPosition = (offsetY : number) => {
    const [isVisible, setIsVisible] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingUp = prevScrollPos > currentScrollPos;

            setIsVisible(currentScrollPos > offsetY && isScrollingUp);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, offsetY]);

    return isVisible;
};

export default useScrollPosition;
