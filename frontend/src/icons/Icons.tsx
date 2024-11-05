import React from 'react';

// item, review page
interface FaShoppingCartProps {
    size?: number;
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
        height={size}
        width={size}
        fill="#ffd500" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 288.259 288.259">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> <g> <g> <path
            d="M6.839,137.02l46.417,47.774l-8.028,68.045l-0.045,0.619c-0.33,8.836,2.138,16.25,7.129,21.429 c7.104,7.374,18.707,8.866,30.214,3.677l61.621-33.545l61.099,33.281l0.518,0.264c4.637,2.087,9.201,3.148,13.579,3.148 c6.484,0,12.39-2.428,16.63-6.825c4.991-5.179,7.46-12.593,7.13-21.429l-8.079-68.664l45.793-47.05l0.624-0.724 c6.398-8.417,8.415-18.073,5.535-26.482c-2.884-8.409-10.395-14.8-20.611-17.524l-68.781-11.09l-29.99-60.339l-0.452-0.792 c-5.916-9.052-14.594-14.247-23.811-14.247c-8.861,0-17.113,4.634-23.247,13.035l-35.47,62.327L22.495,92.344l-0.853,0.193 c-10.141,2.895-17.575,9.422-20.398,17.912C-1.58,118.935,0.456,128.624,6.839,137.02z M16.046,115.378 c1.163-3.483,4.524-6.218,9.496-7.721l68.969-11.59l38.435-67.629c6.271-8.305,15.056-8.097,20.901,0.531l33.342,67.083 l75.515,12.131c4.986,1.409,8.358,4.03,9.521,7.414c1.152,3.362,0.106,7.48-2.931,11.629l-50.632,52.014l8.86,75.093 c0.112,4.297-0.873,7.739-2.782,9.72c-2.503,2.6-7.089,2.691-12.309,0.396l-68.289-37.201l-68.294,37.201 c-5.23,2.291-9.815,2.194-12.304-0.386c-1.914-1.99-2.899-5.433-2.788-9.729l8.861-75.093l-50.622-52.009 C15.934,123.048,14.888,118.858,16.046,115.378z"></path> </g> </g> </g></svg>
);

export const FaStar: React.FC<Item> = ({size = 15}) => (
    <svg
        height={size}
        width={size}
        fill="#ffd500" viewBox="0 -32 576 576" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
        </g>
    </svg>
);

export const FaShoppingCart: React.FC<FaShoppingCartProps> = ({size = 30, className, onClick}) => (
    <svg
        className={className}
        height={size}
        width={size}
        onClick={onClick}
        fill="currentColor" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M223.87109,65.43115l-12.15722,66.86231A23.98711,23.98711,0,0,1,188.10156,152H72.13135l4.36377,24H184a24.01161,24.01161,0,1,1-22.624,16H102.624a24.00309,24.00309,0,1,1-40.85986-7.57666L34.05078,32H16a8,8,0,0,1,0-16H34.05078A15.9918,15.9918,0,0,1,49.793,29.13818L54.67676,56H216a8.00076,8.00076,0,0,1,7.87109,9.43115Z"></path>
        </g>
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
        height={size}
        width={size}
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M15 7L10 12L15 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"></path>
        </g>
    </svg>
);

export const AiOutlineRight: React.FC<IconProps> = ({size = 30}) => (
    <svg
        height={size}
        width={size}
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M15 7L10 12L15 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"></path>
        </g>
    </svg>
);

// Footer Page
interface Footer {
    className?: string;
    size?: number;
}

export const FaUniversity: React.FC<Footer> = ({className, size = 25}) => (
    <svg
        className={className}
        height={size}
        width={size}
        fill="#000000" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z"></path>
        </g>
    </svg>
);

export const FaEnvelope: React.FC<Footer> = ({className, size = 25}) => (
    <svg
        height={size}
        widths={size}
        className={className}
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M1.60175 4.20114C2.14997 3.47258 3.02158 3 4 3H20C20.9784 3 21.85 3.47258 22.3982 4.20113L12 11.7635L1.60175 4.20114Z"
                fill="#000000"></path>
            <path
                d="M1 6.2365V18C1 19.6523 2.34772 21 4 21H20C21.6523 21 23 19.6523 23 18V6.23649L13.1763 13.381C12.475 13.891 11.525 13.891 10.8237 13.381L1 6.2365Z"
                fill="#000000"></path>
        </g>
    </svg>
);

export const FaGithub: React.FC<Footer> = ({className, size = 25}) => (
    <svg
        className={className}
        height={size}
        width={size}
        viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
        fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"><title>github [#142]</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path
                            d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                            id="github-[#142]"></path>
                    </g>
                </g>
            </g>
        </g>
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
        width={size}
        height={size}
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                fill="#0F0F0F"></path>
        </g>
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
    size?: number;
    onClick?: (event: React.MouseEvent<SVGElement>) => void;
}

export const FaLongArrowAltUp: React.FC<RealKeywordModal> = ({className, size = 30}) => (
    <svg
        height={size}
        width={size}
        className={className}
        fill="currentColor"
        viewBox="0 0 16.00 16.00" xmlns="http://www.w3.org/2000/svg" stroke="#000000"
        stroke-width="0.00016">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M6 8L2 8L2 6L8 5.24536e-07L14 6L14 8L10 8L10 16L6 16L6 8Z" fill="#000000"></path>
        </g>
    </svg>
);

export const FaLongArrowAltDown: React.FC<RealKeywordModal> = ({className, size=30}) => (
    <svg
        height={size}
        width={size}
        className={className}
        viewBox="0 0 16 16"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M10 8L14 8V10L8 16L2 10V8H6V0L10 4.76995e-08V8Z" fill="#000000"></path>
        </g>
    </svg>
);

export const CgBorderStyleSolid: React.FC<RealKeywordModal> = ({className, size=30}) => (
    <svg
        height={size}
        width={size}
        fill="currentColor"
        className={className}
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M23 13H1v-2h22z"></path>
            <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
    </svg>
);

export const IoIosArrowUp: React.FC<RealKeywordModal> = ({size=20,onClick, className}) => (
    <svg
        height={size}
        width={size}
        className={className}
        onClick={onClick}
        viewBox="0 0 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#000000"
         stroke-width="0.00048000000000000007" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M0 0h48v48H0z" fill="none"></path>
            <g id="Shopicon">
                <g>
                    <polygon
                        points="6.586,30.585 9.414,33.413 24,18.827 38.586,33.413 41.414,30.585 24,13.171 "></polygon>
                </g>
            </g>
        </g>
    </svg>
);


// 유저메뉴 페이지
interface Usermenu {
    size: number;
}

export const BsCart: React.FC<Usermenu> = ({size = 15}) => (
    <svg
        height={size}
        width={size}
        viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="bi bi-cart">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
        </g>
    </svg>
);

export const LiaShippingFastSolid: React.FC<Usermenu> = ({size = 15}) => (
    <svg
        height={size}
        width={size}
        viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                    <rect width="48" height="48" fill="none"></rect>
                </g>
                <g id="Health_Icons" data-name="Health Icons">
                    <g>
                        <path
                            d="M37.7,11.1A3,3,0,0,0,35.4,10H34.2l.3-1.7A3.1,3.1,0,0,0,33.9,6a3.2,3.2,0,0,0-2.2-1H7.8a2,2,0,0,0,0,4H30.3l-4,22.9a6.8,6.8,0,0,0-1,2.1H20.7A7,7,0,0,0,7.3,34H6.2l.5-2.9a2,2,0,0,0-1.6-2.3,2,2,0,0,0-2.3,1.6L2,34.7A2.8,2.8,0,0,0,2.7,37a2.8,2.8,0,0,0,2.1,1H7.3a7,7,0,0,0,13.4,0h4.6a7,7,0,0,0,13.4,0h2a3.2,3.2,0,0,0,3.1-2.7L46,22.5ZM14,39a3,3,0,0,1-3-3,3,3,0,0,1,6,0A3,3,0,0,1,14,39ZM33.5,14h1.3l5.9,8H32.1ZM32,39a3,3,0,0,1-3-3,3,3,0,0,1,6,0A3,3,0,0,1,32,39Zm8-5H38.7A7,7,0,0,0,32,29H30.9l.5-3.1h9.9Z"></path>
                        <path d="M4,15H14a2,2,0,0,0,0-4H4a2,2,0,0,0,0,4Z"></path>
                        <path d="M15,19a2,2,0,0,0-2-2H5a2,2,0,0,0,0,4h8A2,2,0,0,0,15,19Z"></path>
                        <path d="M6,23a2,2,0,0,0,0,4h6a2,2,0,0,0,0-4Z"></path>
                    </g>
                </g>
            </g>
        </g>
    </svg>

)

export const AiOutlineUser: React.FC<Usermenu> = ({size = 15}) => (
    <svg
        height={size}
        widths={size}
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9ZM15.8243 13.6235C17.1533 12.523 18 10.8604 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 10.8604 6.84668 12.523 8.17572 13.6235C4.98421 14.7459 3 17.2474 3 20C3 20.5523 3.44772 21 4 21C4.55228 21 5 20.5523 5 20C5 17.7306 7.3553 15 12 15C16.6447 15 19 17.7306 19 20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20C21 17.2474 19.0158 14.7459 15.8243 13.6235Z"
                  fill="#000000"></path>
        </g>
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
    size?: number
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

export const FaTrashAlt: React.FC<Cart> = ({className, onClick, size=30}) => (
    <svg
        height={size}
        width={size}
        onClick={onClick}
        className={className}
        viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
         fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"><title>trash</title>
            <desc>Created with Sketch Beta.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                <g id="Icon-Set-Filled"  transform="translate(-261.000000, -205.000000)"
                   fill="#000000">
                    <path
                        d="M268,220 C268,219.448 268.448,219 269,219 C269.552,219 270,219.448 270,220 L270,232 C270,232.553 269.552,233 269,233 C268.448,233 268,232.553 268,232 L268,220 L268,220 Z M273,220 C273,219.448 273.448,219 274,219 C274.552,219 275,219.448 275,220 L275,232 C275,232.553 274.552,233 274,233 C273.448,233 273,232.553 273,232 L273,220 L273,220 Z M278,220 C278,219.448 278.448,219 279,219 C279.552,219 280,219.448 280,220 L280,232 C280,232.553 279.552,233 279,233 C278.448,233 278,232.553 278,232 L278,220 L278,220 Z M263,233 C263,235.209 264.791,237 267,237 L281,237 C283.209,237 285,235.209 285,233 L285,217 L263,217 L263,233 L263,233 Z M277,209 L271,209 L271,208 C271,207.447 271.448,207 272,207 L276,207 C276.552,207 277,207.447 277,208 L277,209 L277,209 Z M285,209 L279,209 L279,207 C279,205.896 278.104,205 277,205 L271,205 C269.896,205 269,205.896 269,207 L269,209 L263,209 C261.896,209 261,209.896 261,211 L261,213 C261,214.104 261.895,214.999 262.999,215 L285.002,215 C286.105,214.999 287,214.104 287,213 L287,211 C287,209.896 286.104,209 285,209 L285,209 Z"
                        id="trash" ></path>
                </g>
            </g>
        </g>
    </svg>

)

export const FaMagnifyingGlass = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="24"
        height="24"
        fill="currentColor"
    >
        <path
            d="M500.3 444.5L405.7 349.9c28.3-34.1 45.4-78.4 45.4-126.3 0-111.6-90.4-202-202-202S47 112 47 223.6 137.4 425.6 249 425.6c47.9 0 92.2-17.1 126.3-45.4l94.6 94.6c6.6 6.6 17.4 6.6 24 0l6.3-6.3c6.5-6.7 6.5-17.5-.1-24.1zM249 383.6c-88.3 0-160-71.7-160-160s71.7-160 160-160 160 71.7 160 160-71.7 160-160 160z"
        />
    </svg>
);

//  InquiryHistory page
interface IoIosAdd {
    className?: string
}

export const IoIosAdd: React.FC<IoIosAdd> = ({className}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 512 512"
        fill="currentColor"
    >
        <path
            d="M256 112c13.3 0 24 10.7 24 24v104h104c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v104c0 13.3-10.7 24-24 24s-24-10.7-24-24V288H128c-13.3 0-24-10.7-24-24s10.7-24 24-24h104V136c0-13.3 10.7-24 24-24z"/>
    </svg>
);


