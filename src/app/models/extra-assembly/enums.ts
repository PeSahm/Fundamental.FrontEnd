export enum CapitalChangeState {
  NoChange = 0,
  CapitalIncrease = 1,
  CapitalDecrease = 2,
  ShareValueChange = 3,
  MultipleChanges = 4
}

export enum CapitalIncreaseApprovalType {
  Cash = 0,
  NonCash = 1,
  FromReserves = 2,
  FromRetainedEarnings = 3,
  Combined = 4,
  CashWithPriority = 5
}

// Re-export shared enums from annual assembly
export {
  SessionOrderType,
  LegalCompanyType,
  BoardMembershipType,
  BoardPosition,
  VerificationStatus
} from '../annual-assembly/enums';
