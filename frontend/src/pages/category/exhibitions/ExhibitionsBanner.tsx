import React from 'react';
import styles from './ExhibitionsBanner.module.css';
import ExhibitionItem from "./ExhibitionItem";

const ExhibitionsBanner = () => {
    const data = [
        {
            imageSrc: "/img/banner_1.webp",
            title: "스페셜 오늘의딜",
            subTitle: "단 하루 특가 스페셜 오늘의딜. 매일 오픈! 단 하루만 강력특가",
            link: "/exhibitions/13054?affect_type=ExhibitionIndex&affect_id=0"
        },
        {
            imageSrc: "/img/banner_2.webp",
            title: "신상모음.ZIP",
            subTitle: "이번주 신상 모음. ZIP. 단 1주일, 신규 입점 기념 SALE ~ 8/4",
            link: "/exhibitions/13054?affect_type=ExhibitionIndex&affect_id=0"
        },
        {
            imageSrc: "/img/banner_3.webp",
            title: "스페셜 오늘의딜",
            subTitle: "단 하루 특가 스페셜 오늘의딜. 매일 오픈! 단 하루만 강력특가",
            link: "/exhibitions/13054?affect_type=ExhibitionIndex&affect_id=0"
        },
        {
            imageSrc: "/img/banner_4.webp",
            title: "신상모음.ZIP",
            subTitle: "이번주 신상 모음. ZIP. 단 1주일, 신규 입점 기념 SALE ~ 8/4",
            link: "/exhibitions/13054?affect_type=ExhibitionIndex&affect_id=0"
        },
        {
            imageSrc: "/img/banner_5.webp",
            title: "스페셜 오늘의딜",
            subTitle: "단 하루 특가 스페셜 오늘의딜. 매일 오픈! 단 하루만 강력특가",
            link: "/exhibitions/13054?affect_type=ExhibitionIndex&affect_id=0"
        },
        {
            imageSrc: "/img/banner_6.webp",
            title: "신상모음.ZIP",
            subTitle: "이번주 신상 모음. ZIP. 단 1주일, 신규 입점 기념 SALE ~ 8/4",
            link: "/exhibitions/13054?affect_type=ExhibitionIndex&affect_id=0"
        }
    ];

    return (
        <div className={styles.banner}>
            {data.map((item) => (
                <ExhibitionItem
                    key={item.imageSrc}
                    imageSrc={item.imageSrc}
                    title={item.title}
                    subTitle={item.subTitle}
                    link={item.link}
                />
            ))}
        </div>
    );
};

export default ExhibitionsBanner;
