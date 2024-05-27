import React from 'react';
import Header from "../../layout/Header/Header";
import Fixedheader from "../../layout/Header/Fixedheader";
import Productcategory from "../../layout/category/Productcategory";

const MoreInformation = () => {
    return (
        <div>
            <Fixedheader/>
            <Header/>
            <Productcategory/>
        </div>
    );
};

export default MoreInformation;