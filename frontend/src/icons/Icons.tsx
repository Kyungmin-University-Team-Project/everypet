import React from 'react';

// item, review page
interface FaShoppingCartProps {
    className?: string; // optional
    onClick?: (event: React.MouseEvent<SVGElement>) => void; // onClick 이벤트 핸들러
}

interface FaArrowUpProps {
    className: string;
}


// item 페이지
interface Item {
    size?: number;
}

export const FaRegStar: React.FC<Item> = ({size = 15}) => (
    <svg
        style={{color: "gray"}}
        height={size}
        widths={size}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path fill="currentColor"
              d="M288 448l-126.4 66.4c-10.4 5.5-22.9-2.8-20.1-14.1L202.6 336 90.3 235.6c-9.4-9.2-4.2-24.9 8.6-27.1l134.4-19.6 60-121.5c5-10.1 19.3-10.1 24.3 0l60 121.5 134.4 19.6c12.8 1.8 18 17.9 8.6 27.1L373.4 336l42.7 164.3c2.8 11.3-9.7 19.6-20.1 14.1L288 448z"/>
    </svg>
);

export const FaStar: React.FC<Item> = ({size = 15}) => (
    <svg
        widths={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path fill="currentColor"
              d="M288 448l-126.4 66.4c-10.4 5.5-22.9-2.8-20.1-14.1L202.6 336 90.3 235.6c-9.4-9.2-4.2-24.9 8.6-27.1l134.4-19.6 60-121.5c5-10.1 19.3-10.1 24.3 0l60 121.5 134.4 19.6c12.8 1.8 18 17.9 8.6 27.1L373.4 336l42.7 164.3c2.8 11.3-9.7 19.6-20.1 14.1L288 448z"/>
    </svg>
);

export const FaShoppingCart: React.FC<FaShoppingCartProps> = ({className, onClick}) => (
    <svg
        className={className}
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        width="30"
        height="30"
    >
        <path fill="currentColor"
              d="M576 128H118.7l-11-45.6C104.7 61 89.3 48 72 48H16C7.2 48 0 55.2 0 64c0 8.8 7.2 16 16 16h56l16.7 67.1L21.4 300.4c-11.3 9.1-15.2 24.4-9.5 37.6 5.6 11.9 17.3 19.9 29.6 19.9h356.6c17.7 0 33.4-12.9 38.7-30.1l43.2-151.4c1.7-6.1 7.2-10.5 13.5-10.5h72c8.8 0 16-7.2 16-16s-7.2-16-16-16zM162.4 384H24c-8.8 0-16 7.2-16 16s7.2 16 16 16h138.4c8.8 0 16-7.2 16-16s-7.2-16-16-16zm322.6 0H320c-8.8 0-16 7.2-16 16s7.2 16 16 16h165c8.8 0 16-7.2 16-16s-7.2-16-16-16z"/>
    </svg>
);

// 스크롤 top 페이지

export const FaArrowUp: React.FC<FaArrowUpProps> = ({className}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="30"
        height="30"
    >
        <path fill="currentColor" d="M128,24l80,80H160v72H96V104H48Z"/>
    </svg>
);

// 서치아이템, 낫파운드 페이지
interface VscSearchStopProps {
    className?: string; // optional
}

export const VscSearchStop: React.FC<VscSearchStopProps> = ({className}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="30"
        height="30"
    >
        <path fill="currentColor" d="M152,136H104V88h48a8,8,0,0,1,0,16H120v32h32A8,8,0,0,1,152,136Z"/>
        <path fill="currentColor"
              d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm0,192A88,88,0,1,1,216,128,88.1,88.1,0,0,1,128,216Z"/>
    </svg>
);

// 메인캐러셀 페이지
interface IconProps {
    size?: number; // optional, default size
}

export const AiOutlineLeft: React.FC<IconProps> = ({size = 30}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
    >
        <path fill="currentColor" d="M15 18l-6-6 6-6v12z"/>
    </svg>
);

export const AiOutlineRight: React.FC<IconProps> = ({size = 30}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
    >
        <path fill="currentColor" d="M9 18l6-6-6-6v12z"/>
    </svg>
);

// Footer Page
interface Footer {
    className?: string;
    size?: number;
}

export const FaUniversity: React.FC<Footer> = ({className, size = 25}) => (
    <svg
        widths={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
    >
        <path fill="currentColor"
              d="M288 0L0 192h48v288h128V352h224v128h128V192h48L288 0zm-96 416H48v-256h144v256zm320 0h-144v-128H176v128H32v-256h320v256zm-160-64H192v-128h128v128z"/>
    </svg>
);

export const FaEnvelope: React.FC<Footer> = ({className, size = 25}) => (
    <svg
        widths={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
    >
        <path fill="currentColor"
              d="M624 32H16C7.2 32 0 39.2 0 48v416c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16zm-16 32v42.4L320 258.9 32 106.4V64h576zM32 464V140.6l288 151.4 288-151.4V464H32z"/>
    </svg>
);

export const FaGithub: React.FC<Footer> = ({className, size = 25}) => (
    <svg
        widths={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 496 512"
    >
        <path fill="currentColor"
              d="M248 8C111 8 0 119 0 256c0 110.3 71.4 204.6 169.6 238.7 12.4 2.3 16.9-5.4 16.9-11.9 0-6.1-.2-24.9-.4-45.2-69.2 15.1-83.8-33.4-83.8-33.4-11.3-28.7-27.6-36.3-27.6-36.3-22.6-15.5 1.7-15.2 1.7-15.2 25.1 1.8 38.3 25.7 38.3 25.7 22.3 38.2 58.7 27.2 72.9 20.8 2.3-16.1 8.7-27.2 15.8-33.4-55.3-6.3-113.6-27.7-113.6-123.2 0-27.3 9.7-49.7 25.6-67.2-2.6-6.3-11.1-31.7 2.4-66.1 0 0 21.1-6.7 69.1 25.5 20-5.5 41.5-8.2 62.8-8.3 21.4.1 42.8 2.8 62.8 8.3 48-32.2 69.1-25.5 69.1-25.5 13.6 34.4 5 59.8 2.4 66.1 15.9 17.5 25.6 39.9 25.6 67.2 0 95.7-58.4 116.9-113.7 123.1 9 7.8 17 23.2 17 46.7 0 33.7-.3 61.1-.5 69.4 0 6.5 4.5 14.3 17 11.8C424.6 460.6 496 366.3 496 256c0-137-111-248-248-248z"/>
    </svg>
);

// HOME AD PAGE

interface HomeAd {
    size?: number;
}

export const FaChevronRight: React.FC<HomeAd> = ({size = 30}) => (
    <svg
        widths={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
    >
        <path fill="currentColor"
              d="M224.3 273.3l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-11.3-11.3c-9.4-9.4-9.4-24.6 0-33.9L137.4 256 43.1 161.7c-9.4-9.4-9.4-24.6 0-33.9l11.3-11.3c9.4-9.4 24.6-9.4 33.9 0l136 136c9.4 9.3 9.4 24.5 0 33.9z"/>
    </svg>
);

// 카테고리 페이지
interface IconProps {
    size?: number;
}

export const RxHamburgerMenu: React.FC<IconProps> = ({size = 28}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
    >
        <path fill="currentColor" d="M3 12h18m-18-6h18m-18 12h18" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round"/>
    </svg>
);

// 리얼타임 키워드 페이지
interface IconProps {
    size?: number; // optional, default size
    className?: string; // optional
    onClick?: (event: React.MouseEvent<SVGElement>) => void; // optional click handler
}

export const IoIosArrowDown: React.FC<IconProps> = ({size = 24, className, onClick}) => (
    <svg
        className={className}
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
    >
        <path fill="currentColor" d="M256 384l-192-192h384z"/>
    </svg>
);

interface IconProps {
    size?: number; // optional, default size
    className?: string; // optional
    onClick?: (event: React.MouseEvent<SVGElement>) => void; // optional click handler
}

// 리얼타임 키워드모델 페이지
interface RealKeywordModal {
    className?: string;
    onClick?: (event: React.MouseEvent<SVGElement>) => void;
}

export const FaLongArrowAltUp: React.FC<RealKeywordModal> = ({className}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
        <path fill="currentColor"
              d="M244 0c-8.5 0-16.6 3.2-22.6 9.3l-196 196c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 66.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V66.6l197.3 197.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-196-196C260.6 3.2 252.5 0 244 0z"/>
    </svg>
);

export const FaLongArrowAltDown: React.FC<RealKeywordModal> = ({className}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
        <path fill="currentColor"
              d="M268 512c8.5 0 16.6-3.2 22.6-9.3l196-196c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 445.4V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v413.4L45.3 261.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l196 196C251.4 508.8 259.5 512 268 512z"/>
    </svg>
);

export const CgBorderStyleSolid: React.FC<RealKeywordModal> = ({className}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
        <path fill="currentColor"
              d="M0 64v384c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64zm448 32c0 8.8-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16zM64 32h384c8.8 0 16 7.2 16 16s-7.2 16-16 16H64c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 448c-8.8 0-16-7.2-16-16s7.2-16 16-16h384c8.8 0 16 7.2 16 16s-7.2 16-16 16H64z"/>
    </svg>
);

export const IoIosArrowUp: React.FC<RealKeywordModal> = ({onClick, className}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30" onClick={onClick}>
        <path fill="currentColor"
              d="M256 96c-13.3 0-26.7 5.1-36.8 15.2l-160 160c-19.9 19.9-19.9 52.2 0 72.1s52.2 19.9 72.1 0L256 306.1l124.7 124.7c19.9 19.9 52.2 19.9 72.1 0s19.9-52.2 0-72.1l-160-160C282.7 101.1 269.3 96 256 96z"/>
    </svg>
);


// 유저메뉴 페이지
interface Usermenu {
    size: number;
}

export const BsCart: React.FC<Usermenu> = ({size = 15}) => (
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 576 512"
         width={size}
         height={size}>
        <path fill="currentColor"
              d="M528.12 301.319l47.273-208.83C577.044 71.842 554.816 48 528.12 48H144.203l-6.626-34.453A32.001 32.001 0 0 0 105.861 0H12C5.373 0 0 5.373 0 12c0 6.34 4.711 11.747 10.761 11.989L73.49 96H512l-21.486 96H110.783l-21.929-104.104C87.793 79.81 92.54 64 110.783 64h424.097c18.074 0 34.58 10.02 42.366 25.557l16.115 38.095-52.568 236.846c-2.057 9.257-10.019 16.435-19.208 16.435H226.005c-12.58 0-23.672-8.244-27.198-20.566L144.477 339.34c-3.667-13.662-17.157-20.99-30.928-17.555l-56.573 14.182C2.959 339.782 0 346.587 0 353.995c0 6.629 5.373 12 12 12h53.862c3.2 12.437 15.01 21.267 29.259 21.267h16.971c15.298 0 28-12.702 28-28s-12.702-28-28-28H113.283l12.1-54.7h368.055c22.483 0 40.703-18.72 40.703-41.203zm-150.234 85.266c12.903 0 23.263-10.37 23.263-23.263s-10.37-23.263-23.263-23.263-23.263 10.37-23.263 23.263 10.37 23.263 23.263 23.263zm56.118 0c12.903 0 23.263-10.37 23.263-23.263s-10.37-23.263-23.263-23.263-23.263 10.37-23.263 23.263 10.37 23.263 23.263 23.263z"/>
    </svg>
);

export const LiaShippingFastSolid: React.FC<Usermenu> = ({size = 15}) => (
    <svg
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path
            d="M10 2C9.448 2 9 2.448 9 3v1H5c-1.104 0-2 .896-2 2v10c0 1.104.896 2 2 2h1v1c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2V9c0-1.104-.896-2-2-2h-1V3c0-1.104-.896-2-2-2H10zM5 7h12c.553 0 1 .447 1 1v1H4V8c0-.553.447-1 1-1zm0 2h12v10H5V9zm3 9h1c.553 0 1-.447 1-1v-1H8v1c0 .553-.447 1-1 1zm4 0h1c.553 0 1-.447 1-1v-1h-2v1c0 .553.447 1 1 1zM4 17h1v1H4v-1zM18 17h1v1h-1v-1zM17 17c.553 0 1 .447 1 1v1h-2v-1c0-.553.447-1 1-1z"/>
    </svg>

)

export const AiOutlineUser: React.FC<Usermenu> = ({size = 15}) => (
    <svg
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v1h20v-1c0-3.33-6.69-5-10-5z"/>
    </svg>

)

// 모바일서치모달 페이지
export const FiArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
        <path d="M15 18l-6-6 6-6"/>
    </svg>
)

// MoreInformation Page
interface MoreInformation {
    className?: string,
    size?: number,
}

export const FaAngleRight: React.FC<MoreInformation> = ({className, size = 30}) => (
    <svg
        widths={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.3 16.3l-1.4-1.4 4.3-4.3H2v-2h6.9l-4.3-4.3 1.4-1.4 7.3 7.3c.4.4.4 1.1 0 1.5l-7.3 7.3z"/>
    </svg>
)

export const IoIosInformationCircleOutline: React.FC<MoreInformation> = ({className, size = 30}) => (
    <svg
        widths={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10S6.5 2 12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z"/>
    </svg>
)

// 카트 페이지
interface Cart {
    className?: string;
    onClick?: (event: React.MouseEvent<SVGElement>) => void;
}

export const FaMinus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13H5v-2h14v2z"/>
    </svg>

)

export const FaPlus = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
)

export const FaTrashAlt: React.FC<Cart> = ({className, onClick}) => (
    <svg
        className={className}
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path
            d="M6 6v14c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2V6H6zm2-4h8c1.104 0 2 .896 2 2v2H4V4c0-1.104.896-2 2-2zm2 2h8v2H10V2zm4 16c0 .553-.447 1-1 1s-1-.447-1-1v-2h2v2z"/>
    </svg>

)



