import { useEffect, useState } from 'react';

/**
 * width 사이즈에 따라 상태를 업데이트하는 커스텀 훅
 * @returns {boolean} 모바일 상태 표시 여부
 */

const useResizeMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
}

export default useResizeMobile;
