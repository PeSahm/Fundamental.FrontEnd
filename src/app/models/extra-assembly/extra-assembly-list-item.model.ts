import { CapitalChangeState } from './enums';

export interface ExtraAssemblyListItem {
  id: string;
  isin: string;
  symbol: string;
  title: string;
  htmlUrl: string;
  version: string;
  fiscalYear: number;
  yearEndMonth: number;
  assemblyDate: string;
  traceNo: number;
  publishDate: string;
  capitalChangeState: CapitalChangeState;
  assemblyResultTypeTitle: string;
}
