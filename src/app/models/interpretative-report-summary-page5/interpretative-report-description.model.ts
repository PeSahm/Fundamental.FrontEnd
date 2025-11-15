import { RowType } from './row-type.enum';

export interface InterpretativeReportDescription {
  rowCode: number; // Sequential numbering
  category: number;
  rowType: RowType;
  description: string; // Persian description text
  sectionName: string; // Section identifier
  additionalValue1?: string; // Multi-column support
  additionalValue2?: string;
  additionalValue3?: string;
  additionalValue4?: string;
  additionalValue5?: string;
}
