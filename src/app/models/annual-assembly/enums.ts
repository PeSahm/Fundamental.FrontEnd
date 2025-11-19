export enum SessionOrderType {
  ListenedBoardMemberReport = 0,
  ApproveStatements = 1,
  SelectInspector = 2,
  SelectNewspaper = 3,
  SelectBoardMember = 4,
  BoardMemberWage = 5,
  BoardMemberGift = 6,
  Other = 8
}

export enum LegalCompanyType {
  RealPerson = 0,
  PrivateCompany = 1,
  PublicCompany = 2,
  CooperativeCompany = 3,
  Other = 4
}

export enum BoardMembershipType {
  FullTime = 0,
  PartTime = 1,
  NonExecutive = 2
}

export enum BoardPosition {
  Chairman = 0,
  ViceChairman = 1,
  CEO = 2,
  Member = 3,
  Observer = 4
}

export enum VerificationStatus {
  Verified = 0,
  NotVerified = 1,
  InProgress = 2
}

export enum InspectorType {
  Primary = 0,
  Alternate = 1,
  LegalInspector = 2
}

export enum WageAndGiftFieldType {
  AttendanceFee = 0,
  Bonus = 1,
  AuditCommitteeAttendanceFee = 2,
  AppointmentCommitteeAttendanceFee = 3,
  OtherCommitteesAttendanceFee = 4,
  SocialResponsibilityExpenses = 5
}

export enum ProportionedRetainedEarningFieldName {
  NetIncomeLoss = 0,
  BeginningRetainedEarnings = 1,
  AnnualAdjustment = 2,
  AdjustedBeginningRetainedEarnings = 3,
  PreYearDividedRetainedEarning = 4,
  TransferToCapital = 5,
  UnallocatedRetainedEarningsAtTheBeginningOfPeriod = 6,
  TransfersFromOtherEquityItems = 7,
  ProportionableRetainedEarnings = 8,
  LegalReserve = 9,
  ExtenseReserve = 10,
  EndingRetainedEarnings = 11,
  DividedRetainedEarning = 12,
  TotalEndingRetainedEarnings = 13,
  EarningsPerShareAfterTax = 14,
  DividendPerShare = 15,
  ListedCapital = 16
}
