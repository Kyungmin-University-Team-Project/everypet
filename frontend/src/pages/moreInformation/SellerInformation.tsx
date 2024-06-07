import React, { useEffect, useState } from 'react';
import ShippingInformation from '../../components/moreinformation/ShippiongInformation';

interface DeliveryInformation {
    "Delivery method": string;
    "Bundle delivery availability": string;
    "Shipping cost": string;
    "Delivery Period": string[];
}

interface ExchangeReturnInformation {
    "General Guidelines": string;
    "Exchange/Return Cost": {
        "Wow Membership Member": string;
        "Non-members": string[];
    };
    "Reference date for exchange/return application": string[];
    "Exchange/Return Restrictions": string[];
}

interface SellerInfo {
    "Shipping Information": DeliveryInformation;
    "Exchange/Return Information": ExchangeReturnInformation;
}

const SellerInformation: React.FC = () => {
    const [sellerInfo, setSellerInfo] = useState<SellerInfo | null>(null);

    useEffect(() => {
        fetch('/mock/shipping_information.json')
            .then((response) => response.json())
            .then((data) => setSellerInfo(data));
    }, []);

    if (!sellerInfo) {
        return <div>Loading...</div>;
    }

    const deliveryInfo = sellerInfo["Shipping Information"];
    const returnInfo = sellerInfo["Exchange/Return Information"];

    return (
        <div>
            <ShippingInformation deliveryInfo={deliveryInfo} returnInfo={returnInfo} />
        </div>
    );
};

export default SellerInformation;
