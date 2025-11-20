import { AssemblyResultType } from '../annual-assembly/types';
import { CapitalChangeState } from './enums';
import {
  ExtraAssemblyDecreaseCapital,
  ExtraAssemblyShareValueChangeCapital,
  ExtraAssemblyIncreaseCapital,
  SessionOrder,
  ShareHolder,
  AssemblyBoardMember,
  AssemblyAttendee
} from './models';

export interface ExtraAssemblyDetail {
  // Header Information
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

  // Assembly Information
  assemblyResultType: AssemblyResultType;
  assemblyResultTypeTitle: string | null;
  assemblyDate_ParentInfo: string | null;
  assemblyHour: string | null;
  assemblyLocation: string | null;
  assemblyDay: string | null;
  letterPublishDate: string | null;
  letterTracingNo: number | null;

  // Assembly Leadership
  assemblyChief: string | null;
  assemblySuperVisor1: string | null;
  assemblySuperVisor2: string | null;
  assemblySecretary: string | null;

  // Capital Change Information
  capitalChangeState: CapitalChangeState;
  lastShareValue: number | null;
  lastCapital: number | null;
  lastShareCount: number | null;

  // Company Changes
  oldAddress: string | null;
  newAddress: string | null;
  oldName: string | null;
  newName: string | null;
  oldActivitySubject: string | null;
  newActivitySubject: string | null;

  // Fiscal Year Changes
  oldFinancialYearMonthLength: number | null;
  oldFinancialYearEndDate: string | null;
  oldFinancialYearDayLength: number | null;
  newFinancialYearEndDate: string | null;
  newFinancialYearMonthLength: string | null;
  newFinancialYearDayLength: string | null;

  // Change Flags
  isLocationChange: boolean;
  isNameChange: boolean;
  isActivitySubjectChange: boolean;
  isFinancialYearChange: boolean;
  isDecidedClause141: boolean;
  decidedClause141Des: string | null;
  isAccordWithSEOStatuteApproved: boolean;
  otherDes: string | null;
  primaryMarketTracingNo: number | null;
  correctionStatuteApproved: boolean;

  // Next Session Information
  nextSessionBreakDesc: string | null;
  nextSessionHour: string | null;
  nextSessionDate: string | null;
  nextSessionDay: string | null;
  nextSessionLocation: string | null;

  // Scheduling Information
  schedulingIsRegistered: boolean | null;
  schedulingYearEndToDate: string | null;

  // Capital Changes
  decreaseCapital: ExtraAssemblyDecreaseCapital | null;
  shareValueChangeCapital: ExtraAssemblyShareValueChangeCapital | null;
  increaseCapitals: ExtraAssemblyIncreaseCapital[];

  // Collections (Shared with Annual Assembly)
  sessionOrders: SessionOrder[];
  shareHolders: ShareHolder[];
  assemblyBoardMembers: AssemblyBoardMember[];

  // Individual Attendees
  ceo: AssemblyAttendee | null;
  auditCommitteeChairman: AssemblyAttendee | null;
}
