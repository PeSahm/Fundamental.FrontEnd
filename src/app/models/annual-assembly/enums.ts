export enum SessionOrderType {
  BalanceSheetApproval = 0,
  IncomeStatementApproval = 1,
  CashFlowStatementApproval = 2,
  BoardReportApproval = 3,
  AuditorReportApproval = 4,
  BoardMemberElection = 5,
  InspectorElection = 6,
  OfficialNewspaperSelection = 7,
  ProfitDistribution = 8,
  CapitalIncrease = 9,
  Other = 10
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
  ChairmanWage = 0,
  MembersWage = 1,
  CEOWage = 2,
  Gifts = 3,
  BonusShares = 4,
  TotalCompensation = 5,
  Other = 6
}

export enum ProportionedRetainedEarningFieldName {
  NetIncomeLoss = 0,
  BeginingRetainedEarnings = 1,
  AnnualAdjustment = 2,
  AdjustedBeginingRetainedEarnings = 3,
  PreYearDevidedRetainedRetainedEarning = 4,
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
