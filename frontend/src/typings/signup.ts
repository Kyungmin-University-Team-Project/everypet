import { AgreementJoin } from "./agreement";

export interface Join {
  memberId: string;
  memberPwd: string;
  email: string;
  agreement: AgreementJoin[];
}
