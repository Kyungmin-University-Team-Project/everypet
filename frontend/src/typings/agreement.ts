export interface AgreementJoin {
  name: string;
  value: string;
  children: string;
  checked: boolean;
  text: string;
  showDetails: boolean;
  agreement: AgreementJoin[];
}
