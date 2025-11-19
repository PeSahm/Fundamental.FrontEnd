import { AssemblyInterim, AssemblyAttendee, AssemblyBoardMember, BoardMemberWageAndGift, Inspector, NewsPaper, NewBoardMember, ProportionedRetainedEarning, SessionOrder, ShareHolder } from './models';
import { AssemblyResultType } from './types';

export interface AnnualAssemblyDetail {
  id: string;
  isin: string;
  symbol: string;
  title: string;
  htmlUrl: string;
  version: string;
  fiscalYear: number;
  yearEndMonth: number;
  reportMonth: number;
  assemblyDate: string;
  traceNo: number;
  publishDate: string;

  assemblyResultType: AssemblyResultType;
  assemblyResultTypeTitle: string | null;
  assemblyHour: string | null;
  assemblyLocation: string | null;
  assemblyDay: string | null;
  letterTracingNo: number | null;
  assemblyChief: string | null;
  assemblySuperVisor1: string | null;
  assemblySuperVisor2: string | null;
  assemblySecretary: string | null;

  boardMemberPeriod: string | null;
  publishSecurityDescription: string | null;
  otherDescription: string | null;
  newHour: string | null;
  newDay: string | null;
  newDate: string | null;
  newLocation: string | null;
  breakDescription: string | null;

  sessionOrders: SessionOrder[];
  shareHolders: ShareHolder[];
  assemblyBoardMembers: AssemblyBoardMember[];
  inspectors: Inspector[];
  newBoardMembers: NewBoardMember[];
  boardMemberWageAndGifts: BoardMemberWageAndGift[];
  newsPapers: NewsPaper[];
  assemblyInterims: AssemblyInterim[];
  proportionedRetainedEarnings: ProportionedRetainedEarning[];

  ceo: AssemblyAttendee | null;
  auditCommitteeChairman: AssemblyAttendee | null;
  independentAuditorRepresentative: AssemblyAttendee | null;
  topFinancialPosition: AssemblyAttendee | null;
}
