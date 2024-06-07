import React from 'react';

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

interface ShippingInformationProps {
    deliveryInfo: DeliveryInformation;
    returnInfo: ExchangeReturnInformation;
}

const ShippingInformation: React.FC<ShippingInformationProps> = ({ deliveryInfo, returnInfo }) => {
    return (
        <div>
            <div>
                <h4>배송정보</h4>
            </div>
            <ul>
                <li>
                    배송방법
                    <span>{deliveryInfo["Delivery method"]}</span>
                </li>
                <li>
                    묶음배송여부
                    <span>{deliveryInfo["Bundle delivery availability"]}</span>
                </li>
                <li>
                    배송비
                    <span>
                        {deliveryInfo["Shipping cost"].split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br/>
                            </React.Fragment>
                        ))}
                    </span>
                </li>
                <li>
                    배송기간
                    <span>
                        {deliveryInfo["Delivery Period"].map((period, index) => (
                            <React.Fragment key={index}>
                                {period}
                                <br/>
                            </React.Fragment>
                        ))}
                    </span>
                </li>
                <li>
                    <h4>교환/반품 정보</h4>
                </li>
                <li>
                    {returnInfo["General Guidelines"].split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br/>
                        </React.Fragment>
                    ))}
                </li>
                <li>
                    교환/반품 비용
                    <span>
                        {returnInfo["Exchange/Return Cost"]["Wow Membership Member"]}
                        <br/>
                        {returnInfo["Exchange/Return Cost"]["Non-members"].map((cost, index) => (
                            <React.Fragment key={index}>
                                {cost}
                                <br/>
                            </React.Fragment>
                        ))}
                    </span>
                </li>
                <li>
                    교환/반품 신청 기준 날짜
                    <span>
                        {returnInfo["Reference date for exchange/return application"].map((date, index) => (
                            <React.Fragment key={index}>
                                {date}
                                <br/>
                            </React.Fragment>
                        ))}
                    </span>
                </li>
                <li>
                    <h4>교환/반품 제한 사항</h4>
                    <span>
                        {returnInfo["Exchange/Return Restrictions"].map((restriction, index) => (
                            <React.Fragment key={index}>
                                {restriction}
                                <br/>
                            </React.Fragment>
                        ))}
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default ShippingInformation;
