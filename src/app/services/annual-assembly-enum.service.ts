import { Injectable } from '@angular/core';
import { SessionOrderType, LegalCompanyType, BoardMembershipType, BoardPosition, VerificationStatus, InspectorType, WageAndGiftFieldType, ProportionedRetainedEarningFieldName } from '../models/annual-assembly';

@Injectable({ providedIn: 'root' })
export class AnnualAssemblyEnumService {
  getSessionOrderTypeLabel(type: SessionOrderType): string {
    const labels: Record<SessionOrderType, string> = {
      [SessionOrderType.ListenedBoardMemberReport]: 'استماع گزارش هیئت‌ مدیره و بازرس قانونی',
      [SessionOrderType.ApproveStatements]: 'تصویب صورت‌های مالی',
      [SessionOrderType.SelectInspector]: 'انتخاب حسابرس و بازرس قانونی',
      [SessionOrderType.SelectNewspaper]: 'انتخاب روزنامه کثیر‌الانتشار',
      [SessionOrderType.SelectBoardMember]: 'انتخاب اعضای هیئت‌ مدیره',
      [SessionOrderType.BoardMemberWage]: 'تعیین حق حضور اعضای غیر موظف هیئت مدیره',
      [SessionOrderType.BoardMemberGift]: 'تعیین پاداش هیئت مدیره',
      [SessionOrderType.Other]: 'سایر موارد'
    };
    return labels[type] || 'نامشخص';
  }

  getLegalCompanyTypeLabel(type: LegalCompanyType): string {
    const labels: Record<LegalCompanyType, string> = {
      [LegalCompanyType.RealPerson]: 'شخص حقیقی',
      [LegalCompanyType.PrivateCompany]: 'شرکت خصوصی',
      [LegalCompanyType.PublicCompany]: 'شرکت سهامی عام',
      [LegalCompanyType.CooperativeCompany]: 'شرکت تعاونی',
      [LegalCompanyType.Other]: 'سایر'
    };
    return labels[type] || 'نامشخص';
  }

  getBoardMembershipTypeLabel(type: BoardMembershipType): string {
    const labels: Record<BoardMembershipType, string> = {
      [BoardMembershipType.FullTime]: 'تمام وقت',
      [BoardMembershipType.PartTime]: 'پاره وقت',
      [BoardMembershipType.NonExecutive]: 'غیرموظف'
    };
    return labels[type] || 'نامشخص';
  }

  getBoardPositionLabel(position: BoardPosition): string {
    const labels: Record<BoardPosition, string> = {
      [BoardPosition.Chairman]: 'رئیس هیئت مدیره',
      [BoardPosition.ViceChairman]: 'نایب رئیس',
      [BoardPosition.CEO]: 'مدیرعامل',
      [BoardPosition.Member]: 'عضو',
      [BoardPosition.Observer]: 'ناظر'
    };
    return labels[position] || 'نامشخص';
  }

  getVerificationStatusLabel(status: VerificationStatus): string {
    const labels: Record<VerificationStatus, string> = {
      [VerificationStatus.Verified]: 'احراز شده',
      [VerificationStatus.NotVerified]: 'احراز نشده',
      [VerificationStatus.InProgress]: 'در حال بررسی'
    };
    return labels[status] || 'نامشخص';
  }

  getInspectorTypeLabel(type: InspectorType): string {
    const labels: Record<InspectorType, string> = {
      [InspectorType.Primary]: 'اصلی',
      [InspectorType.Alternate]: 'علی‌البدل',
      [InspectorType.LegalInspector]: 'بازرس قانونی'
    };
    return labels[type] || 'نامشخص';
  }

  getWageAndGiftFieldTypeLabel(type: WageAndGiftFieldType): string {
    const labels: Record<WageAndGiftFieldType, string> = {
      [WageAndGiftFieldType.AttendanceFee]: 'حق حضور',
      [WageAndGiftFieldType.Bonus]: 'پاداش',
      [WageAndGiftFieldType.AuditCommitteeAttendanceFee]: 'حق حضور اعضای کمیته حسابرسی',
      [WageAndGiftFieldType.AppointmentCommitteeAttendanceFee]: 'حق حضور اعضای کمیته انتصابات',
      [WageAndGiftFieldType.OtherCommitteesAttendanceFee]: 'حق حضور سایر کمیته‌های تخصصی',
      [WageAndGiftFieldType.SocialResponsibilityExpenses]: 'هزینه‌های مسئولیت اجتماعی'
    };
    return labels[type] || 'نامشخص';
  }

  getProportionedRetainedEarningFieldLabel(field: ProportionedRetainedEarningFieldName): string {
    const labels: Record<ProportionedRetainedEarningFieldName, string> = {
      [ProportionedRetainedEarningFieldName.NetIncomeLoss]: 'سود (زیان) خالص',
      [ProportionedRetainedEarningFieldName.BeginningRetainedEarnings]: 'سود (زیان) انباشته ابتدای دوره',
      [ProportionedRetainedEarningFieldName.AnnualAdjustment]: 'تعدیلات سنواتی',
      [ProportionedRetainedEarningFieldName.AdjustedBeginningRetainedEarnings]: 'سود (زیان) انباشته ابتدای دوره تعدیل‌شده',
      [ProportionedRetainedEarningFieldName.PreYearDividedRetainedEarning]: 'سود سهام مصوب (مجمع سال قبل)',
      [ProportionedRetainedEarningFieldName.TransferToCapital]: 'تغییرات سرمایه از محل سود (زیان) انباشته',
      [ProportionedRetainedEarningFieldName.UnallocatedRetainedEarningsAtTheBeginningOfPeriod]: 'سود انباشته ابتدای دوره تخصیص نیافته',
      [ProportionedRetainedEarningFieldName.TransfersFromOtherEquityItems]: 'انتقال از سایر اقلام حقوق صاحبان سهام',
      [ProportionedRetainedEarningFieldName.ProportionableRetainedEarnings]: 'سود قابل تخصیص',
      [ProportionedRetainedEarningFieldName.LegalReserve]: 'انتقال به اندوخته‌ قانونی',
      [ProportionedRetainedEarningFieldName.ExtenseReserve]: 'انتقال به سایر اندوخته‌ها',
      [ProportionedRetainedEarningFieldName.EndingRetainedEarnings]: 'سود (زیان) انباشته پايان دوره',
      [ProportionedRetainedEarningFieldName.DividedRetainedEarning]: 'سود سهام مصوب (مجمع سال جاری)',
      [ProportionedRetainedEarningFieldName.TotalEndingRetainedEarnings]: 'سود (زیان) انباشته پایان دوره (با لحاظ نمودن مصوبات مجمع)',
      [ProportionedRetainedEarningFieldName.EarningsPerShareAfterTax]: 'سود (زیان) خالص هر سهم- ریال',
      [ProportionedRetainedEarningFieldName.DividendPerShare]: 'سود نقدی هر سهم (ریال)',
      [ProportionedRetainedEarningFieldName.ListedCapital]: 'سرمایه'
    };
    return labels[field] || 'نامشخص';
  }
}
