export interface Join {
    memberId: string;
    memberPwd: string;
    email: string;
    birth: string;
    name: string;
    phone: string;
    referrer: string;
    address: {
        address: string;
        detailAddress: string;
    };
    agreeMarketingYn: string;
}

export interface Code {
    code: string;
}


export interface AgreementJoin {
    name: string;
    value: string;
    children: string;
    checked: boolean;
    text: string;
    showDetails: boolean;
    agreement: AgreementJoin[];
}