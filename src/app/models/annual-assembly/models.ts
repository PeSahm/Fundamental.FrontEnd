import { SessionOrderType, LegalCompanyType, BoardMembershipType, BoardPosition, VerificationStatus, InspectorType, WageAndGiftFieldType, ProportionedRetainedEarningFieldName } from './enums';

export interface SessionOrder {
  type: SessionOrderType;
  description: string | null;
  fieldName: string | null;
}

export interface ShareHolder {
  shareHolderSerial: number | null;
  name: string | null;
  shareCount: number | null;
  sharePercent: number | null;
}

export interface AssemblyBoardMember {
  boardMemberSerial: number | null;
  fullName: string | null;
  nationalCode: string | null;
  legalType: LegalCompanyType | null;
  membershipType: BoardMembershipType;
  agentBoardMemberFullName: string | null;
  agentBoardMemberNationalCode: string | null;
  position: BoardPosition;
  hasDuty: boolean;
  degree: string | null;
  degreeRef: number | null;
  educationField: string | null;
  educationFieldRef: number | null;
  attendingMeeting: boolean;
  verification: VerificationStatus;
}

export interface Inspector {
  serial: number | null;
  name: string | null;
  type: InspectorType;
}

export interface NewBoardMember {
  name: string | null;
  isLegal: boolean;
  nationalCode: string | null;
  boardMemberSerial: number | null;
  legalType: LegalCompanyType | null;
  membershipType: BoardMembershipType;
}

export interface BoardMemberWageAndGift {
  type: WageAndGiftFieldType;
  fieldName: string | null;
  currentYearValue: number | null;
  pastYearValue: number | null;
  description: string | null;
}

export interface NewsPaper {
  newsPaperId: number | null;
  name: string | null;
}

export interface AssemblyInterim {
  fieldName: string | null;
  description: string | null;
  yearEndToDateValue: number | null;
  percent: number | null;
  changesReason: string | null;
  rowClass: string | null;
}

export interface ProportionedRetainedEarning {
  fieldName: ProportionedRetainedEarningFieldName | null;
  description: string | null;
  yearEndToDateValue: number | null;
  rowClass: string | null;
}

export interface AssemblyAttendee {
  fullName: string | null;
  nationalCode: string | null;
  attendingMeeting: boolean;
  degree: string | null;
  degreeRef: number | null;
  educationField: string | null;
  educationFieldRef: number | null;
  verification: VerificationStatus | null;
}
