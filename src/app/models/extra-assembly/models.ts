import { CapitalIncreaseApprovalType } from './enums';

export interface ExtraAssemblyDecreaseCapital {
  capitalDecreaseValue: number | null;
  decreasePercent: number | null;
  isAccept: boolean;
  newCapital: number | null;
  newShareCount: number | null;
  newShareValue: number | null;
}

export interface ExtraAssemblyShareValueChangeCapital {
  isAccept: boolean;
  newShareCount: number | null;
  newShareValue: number | null;
}

export interface ExtraAssemblyIncreaseCapital {
  cashIncoming: number | null; // مطالبات و اوردۀ نقدی (میلیون ریال)
  retainedEarning: number | null; // سود انباشته (میلیون ریال) - typo in API
  reserves: number | null; // اندوخته (میلیون ریال)
  revaluationSurplus: number | null; // مازاد تجدید ارزیابی دارایی ها (میلیون ریال)
  sarfSaham: number | null; // صرف سهام (میلیون ریال)
  isAccept: boolean; // موافقت / عدم موافقت
  capitalIncreaseValue: number | null; // مبلغ افزایش سرمایه (میلیون ریال)
  increasePercent: number | null; // درصد افزایش سرمایه
  type: number; // نحوۀ تصویب: 0=قطعی, 1=در اختیار هیئت‌مدیره
  cashForceclosurePriorityStockPrice: number | null; // قیمت سهام جهت عرضه عمومی-ریال
  cashForceclosurePriorityStockDesc: string | null; // توضیحات در خصوص قیمت سهام جهت عرضه عمومی
  cashForceclosurePriorityAvalableStockCount: number | null; // تعداد سهام قابل عرضه به عموم
  cashForceclosurePriorityPrizeStockCount: number | null; // تعداد سهام جایزه
  cashForceclosurePriority: number | null; // آورده نقدی با سلب حق تقدم از سهامداران فعلی
}

// Re-export shared models from annual assembly
export {
  SessionOrder,
  ShareHolder,
  AssemblyBoardMember,
  AssemblyAttendee
} from '../annual-assembly/models';
