import React from 'react';
import Header from "../../layout/Header/Header";
import Fixedheader from "../../layout/Header/Fixedheader";
import Productcategory from "../../layout/category/Productcategory";
import {useLocation} from "react-router-dom";
import {FaStar, FaRegStar} from "react-icons/fa";

const MoreInformation = () => {
    const location = useLocation();
    const {item} = location.state;

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
        }
        return stars;
    };

    return (
        <div>
            <Fixedheader/>
            <Header/>
            <Productcategory/>
            <div >
                <img src={item.imageUrl} alt={item.name}  />
                <h2>{item.name}</h2>
                <p>Price: {item.price}원</p>
                <p>Discount: {item.discount}%</p>
                <p>Recommended: <div >{renderStars(item.recommended)}</div></p>
                <p>Review Count: {item.reviewCount}</p>
            </div>
        </div>
    );
};

export default MoreInformation;