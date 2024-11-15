import React from 'react';

/**
 * 아이콘 컴포넌트를 위한 공통 Props 인터페이스
 */
interface IconProps {
    /**
     * 아이콘의 크기를 지정 (픽셀 단위)
     * @default 15px
     */
    size?: number;

    /**
     * 아이콘에 커스텀 CSS 클래스 이름을 지정
     * - color 값을 지정해줘야함
     * - :hover, :active, 애니메이션 등 후처리가 필요할 때 사용
     * - 별도 스타일링이 필요한 경우 부모 컨테이너나 wrap div 를 활용 가능
     * @example "custom-icon-class"
     */
    className?: string;

    /**
     * 아이콘 클릭 시 호출될 이벤트 핸들러
     */
    onClick?: (event: React.MouseEvent<SVGElement>) => void;
}


export const FaRegStar: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        fill="currentColor" // CSS의 color 속성 반영
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 288.259 288.259"
        onClick={onClick} // 클릭 이벤트
    >
        <g id="SVGRepo_iconCarrier">
            <path
                d="M6.839,137.02l46.417,47.774l-8.028,68.045l-0.045,0.619c-0.33,8.836,2.138,16.25,7.129,21.429 c7.104,7.374,18.707,8.866,30.214,3.677l61.621-33.545l61.099,33.281l0.518,0.264c4.637,2.087,9.201,3.148,13.579,3.148 c6.484,0,12.39-2.428,16.63-6.825c4.991-5.179,7.46-12.593,7.13-21.429l-8.079-68.664l45.793-47.05l0.624-0.724 c6.398-8.417,8.415-18.073,5.535-26.482c-2.884-8.409-10.395-14.8-20.611-17.524l-68.781-11.09l-29.99-60.339l-0.452-0.792 c-5.916-9.052-14.594-14.247-23.811-14.247c-8.861,0-17.113,4.634-23.247,13.035l-35.47,62.327L22.495,92.344l-0.853,0.193 c-10.141,2.895-17.575,9.422-20.398,17.912C-1.58,118.935,0.456,128.624,6.839,137.02z"></path>
        </g>
    </svg>
);

export const FaStar: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        fill="currentColor" // CSS의 color 속성 반영
        viewBox="0 -32 576 576"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <g id="SVGRepo_iconCarrier">
            <path
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
        </g>
    </svg>
);

export const FaShoppingCart: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        fill="currentColor" // CSS의 color 속성 반영
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <g id="SVGRepo_iconCarrier">
            <path
                d="M223.87109,65.43115l-12.15722,66.86231A23.98711,23.98711,0,0,1,188.10156,152H72.13135l4.36377,24H184a24.01161,24.01161,0,1,1-22.624,16H102.624a24.00309,24.00309,0,1,1-40.85986-7.57666L34.05078,32H16a8,8,0,0,1,0-16H34.05078A15.9918,15.9918,0,0,1,49.793,29.13818L54.67676,56H216a8.00076,8.00076,0,0,1,7.87109,9.43115Z"></path>
        </g>
    </svg>
);

export const FaArrowUp: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        height={size}
        width={size}
        fill="currentColor" // CSS의 color 속성 반영
        onClick={onClick}
    >
        <path d="M128,24l80,80H160v72H96V104H48Z"/>
    </svg>
);

export const VscSearchStop: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="currentColor" // CSS의 color 속성 반영
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.548 1.653,10.198 1.848,10.840 2.160 C 11.538 2.500,12.020 2.846,12.587 3.413 C 13.154 3.980,13.500 4.462,13.840 5.160 C 14.285 6.075,14.486 6.958,14.486 8.000 C 14.486 9.054,14.284 9.932,13.826 10.867 C 13.654 11.218,13.307 11.781,13.145 11.972 L 13.090 12.037 8.527 7.473 L 3.963 2.910 4.028 2.855 C 4.219 2.693,4.782 2.346,5.133 2.174 C 6.305 1.600,7.555 1.395,8.853 1.563 M7.480 8.534 L 12.040 13.095 11.973 13.148 C 11.734 13.338,11.207 13.662,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.468 8.989,1.403 7.738,1.670 6.535 C 1.849 5.734,2.268 4.820,2.766 4.147 C 2.836 4.052,2.899 3.974,2.907 3.974 C 2.914 3.974,4.972 6.026,7.480 8.534"
                fill="currentColor" // CSS의 color 속성 반영
                stroke="none"
                fillRule="evenodd"
            ></path>
        </g>
    </svg>
);

export const AiOutlineLeft: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={size}
        width={size}
        fill="currentColor" // CSS의 color 속성 반영
        onClick={onClick}
    >
        <path
            d="M15 7L10 12L15 17"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const AiOutlineRight: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={size}
        width={size}
        fill="currentColor" // CSS의 color 속성 반영
        onClick={onClick}
        transform="rotate(180)"
    >
        <path
            d="M15 7L10 12L15 17"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const FaUniversity: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        fill="currentColor" // CSS의 color 속성 반영
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <path
            d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z"/>
    </svg>
);

export const FaEnvelope: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        fill="currentColor" // CSS의 color 속성 반영
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <path
            d="M1.60175 4.20114C2.14997 3.47258 3.02158 3 4 3H20C20.9784 3 21.85 3.47258 22.3982 4.20113L12 11.7635L1.60175 4.20114Z"/>
        <path
            d="M1 6.2365V18C1 19.6523 2.34772 21 4 21H20C21.6523 21 23 19.6523 23 18V6.23649L13.1763 13.381C12.475 13.891 11.525 13.891 10.8237 13.381L1 6.2365Z"/>
    </svg>
);

export const FaGithub: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor" // CSS의 color 속성 반영
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.4142 3.82843C12.6332 3.04738 11.3668 3.04738 10.5858 3.82843L9.91421 4.5L11.482 6.06774C11.6472 6.02356 11.8208 6 12 6C13.1046 6 14 6.89543 14 8C14 8.17916 13.9764 8.35282 13.9323 8.51804L15.982 10.5677C16.1472 10.5236 16.3208 10.5 16.5 10.5C17.6046 10.5 18.5 11.3954 18.5 12.5C18.5 13.6046 17.6046 14.5 16.5 14.5C15.3954 14.5 14.5 13.6046 14.5 12.5C14.5 12.3208 14.5236 12.1472 14.5677 11.982L13 10.4142V15.2676C13.5978 15.6134 14 16.2597 14 17C14 18.1046 13.1046 19 12 19C10.8954 19 10 18.1046 10 17C10 16.2597 10.4022 15.6134 11 15.2676V9.73244C10.4022 9.38663 10 8.74028 10 8C10 7.82084 10.0236 7.64718 10.0677 7.48196L8.5 5.91421L3.82843 10.5858C3.04738 11.3668 3.04738 12.6332 3.82843 13.4142L10.5858 20.1716C11.3668 20.9526 12.6332 20.9526 13.4142 20.1716L20.1716 13.4142C20.9526 12.6332 20.9526 11.3668 20.1716 10.5858L13.4142 3.82843ZM9.17157 2.41421C10.7337 0.852115 13.2663 0.852119 14.8284 2.41422L21.5858 9.17157C23.1479 10.7337 23.1479 13.2663 21.5858 14.8284L14.8284 21.5858C13.2663 23.1479 10.7337 23.1479 9.17157 21.5858L2.41421 14.8284C0.852115 13.2663 0.852119 10.7337 2.41422 9.17157L9.17157 2.41421Z"
                fill="currentColor" // CSS의 color 속성 반영
            ></path>
        </g>
    </svg>
);

export const FaChevronRight: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
        fill="currentColor" // CSS의 color 속성 반영
        onClick={onClick}
    >
        <path
            d="M224.3 273.3l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-11.3-11.3c-9.4-9.4-9.4-24.6 0-33.9L137.4 256 43.1 161.7c-9.4-9.4-9.4-24.6 0-33.9l11.3-11.3c9.4-9.4 24.6-9.4 33.9 0l136 136c9.4 9.3 9.4 24.5 0 33.9z"/>
    </svg>
);

export const RxHamburgerMenu: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        onClick={onClick}
    >
        <path fill="currentColor" d="M3 12h18m-18-6h18m-18 12h18" stroke={"currentColor"} strokeWidth="2"
              strokeLinecap="round"/>
    </svg>
);

export const IoIosArrowDown: React.FC<IconProps> = ({size = 15, className, onClick,}) => (
    <svg
        className={className}
        height={size}
        width={size}
        onClick={onClick}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path
            d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"/>
    </svg>
);

export const FaLongArrowAltUp: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        onClick={onClick}
    >
        <polygon points="245,0 74.3,213.3 202.3,213.3 202.3,512 287.7,512 287.7,213.3 415.7,213.3"/>
    </svg>
);

export const FaLongArrowAltDown: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        transform="rotate(180)"
        onClick={onClick}
    >
        <polygon points="245,0 74.3,213.3 202.3,213.3 202.3,512 287.7,512 287.7,213.3 415.7,213.3"/>
    </svg>
);

export const CgBorderStyleSolid: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        onClick={onClick}
    >
        <path d="M23 13H1v-2h22z"/>
        <path fill="none" d="M0 0h24v24H0z"/>
    </svg>
);

export const IoIosArrowUp: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        transform="rotate(180)matrix(1, 0, 0, 1, 0, 0)"
        onClick={onClick}
    >
        <path
            d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"/>
    </svg>
);

export const BsCart: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        onClick={onClick}
    >
        <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1
            .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5
            0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313
            7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4
            2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1
            0 0 1 0-2z"
        ></path>
    </svg>
);

export const LiaShippingFastSolid: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M29.92,16.61l-3-7A1,1,0,0,0,26,9H23V7a1,1,0,0,0-1-1H3A1,1,0,0,0,2,7V24a1,1,0,0,0,1,1H5.14a4,4,0,0,0,7.72,0h6.28a4,4,0,0,0,7.72,0H29a1,1,0,0,0,1-1V17A1,1,0,0,0,29.92,16.61ZM23,11h2.34l2.14,5H23ZM9,26a2,2,0,1,1,2-2A2,2,0,0,1,9,26Zm10.14-3H12.86a4,4,0,0,0-7.72,0H4V8H21V20.56A4,4,0,0,0,19.14,23ZM23,26a2,2,0,1,1,2-2A2,2,0,0,1,23,26Zm5-3H26.86A4,4,0,0,0,23,20V18h5Z"
                fill="currentColor"
            ></path>
        </g>
    </svg>
);

export const AiOutlineUser: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        viewBox="0 0 24 24"
        fill="currentColor" // CSS의 color 속성 반영
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9ZM15.8243 13.6235C17.1533 12.523 18 10.8604 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 10.8604 6.84668 12.523 8.17572 13.6235C4.98421 14.7459 3 17.2474 3 20C3 20.5523 3.44772 21 4 21C4.55228 21 5 20.5523 5 20C5 17.7306 7.3553 15 12 15C16.6447 15 19 17.7306 19 20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20C21 17.2474 19.0158 14.7459 15.8243 13.6235Z"
        />
    </svg>
);

export const FiArrowLeft: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        onClick={onClick}
    >
        <path d="M15 18l-6-6 6-6"/>
    </svg>
);

export const FaAngleRight: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={onClick}
    >
        <path d="m9 18 6-6-6-6"/>
    </svg>
);

export const IoIosInformationCircleOutline: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        onClick={onClick}
    >
        <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10S6.5 2 12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z"/>
    </svg>
);

export const FaMinus: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        onClick={onClick}
    >
        <path d="M19 13H5v-2h14v2z"/>
    </svg>
);

export const FaPlus: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        onClick={onClick}
    >
        <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ size = 15, className, onClick }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    </svg>
);


export const FaMagnifyingGlass: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        onClick={onClick}
    >
        <path
            d="M500.3 444.5L405.7 349.9c28.3-34.1 45.4-78.4 45.4-126.3 0-111.6-90.4-202-202-202S47 112 47 223.6 137.4 425.6 249 425.6c47.9 0 92.2-17.1 126.3-45.4l94.6 94.6c6.6 6.6 17.4 6.6 24 0l6.3-6.3c6.5-6.7 6.5-17.5-.1-24.1zM249 383.6c-88.3 0-160-71.7-160-160s71.7-160 160-160 160 71.7 160 160-71.7 160-160 160z"
        />
    </svg>
);

export const IoIosAdd: React.FC<IconProps> = ({size = 15, className, onClick}) => (
    <svg
        className={className}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        onClick={onClick}
    >
        <path
            d="M256 112c13.3 0 24 10.7 24 24v104h104c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v104c0 13.3-10.7 24-24 24s-24-10.7-24-24V288H128c-13.3 0-24-10.7-24-24s10.7-24 24-24h104V136c0-13.3 10.7-24 24-24z"
        />
    </svg>
);


