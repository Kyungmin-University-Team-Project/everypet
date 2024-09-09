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
