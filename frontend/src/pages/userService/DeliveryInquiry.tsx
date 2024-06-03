import React from 'react';
import Fixedheader from "../../layout/Header/Fixedheader";
import Header from "../../layout/Header/Header";
import Productcategory from "../../layout/category/Productcategory";
import styles from './DeliveryInquiry.module.css';
import ImageUpload from "../../utils/adminsMaster/ImageUpload";

const DeliveryInquiry: React.FC = () => {
    return (
        <div>
            <Fixedheader/>
            <Header/>
            <Productcategory/>
            <div>
                <ImageUpload/>
            </div>
        </div>
    );
};

export default DeliveryInquiry;
