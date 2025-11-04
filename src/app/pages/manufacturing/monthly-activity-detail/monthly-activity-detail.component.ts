import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonthlyActivityService } from '../../../services/monthly-activity.service';
import { finalize } from 'rxjs';
import convertToToman from 'src/app/utils/toToman';

interface ProductionAndSalesItem {
  productName: string;
  unit: string;
  yearToDateProductionQuantity?: number;
  yearToDateSalesQuantity?: number;
  yearToDateSalesRate?: number;
  yearToDateSalesAmount?: number;
  correctionProductionQuantity?: number;
  correctionSalesQuantity?: number;
  correctionSalesAmount?: number;
  correctedYearToDateProductionQuantity?: number;
  correctedYearToDateSalesQuantity?: number;
  correctedYearToDateSalesRate?: number;
  correctedYearToDateSalesAmount?: number;
  monthlyProductionQuantity?: number;
  monthlySalesQuantity?: number;
  monthlySalesRate?: number;
  monthlySalesAmount?: number;
  cumulativeToPeriodProductionQuantity?: number;
  cumulativeToPeriodSalesQuantity?: number;
  cumulativeToPeriodSalesRate?: number;
  cumulativeToPeriodSalesAmount?: number;
  previousYearProductionQuantity?: number;
  previousYearSalesQuantity?: number;
  previousYearSalesRate?: number;
  previousYearSalesAmount?: number;
  type: string;
  rowCode: number;
  category: number;
  isDataRow?: boolean;
  isSummaryRow?: boolean;
  rowClass?: string;
}

interface BuyRawMaterialItem {
  materialName: string;
  unit: string;
  yearToDateQuantity?: number;
  yearToDateRate?: number;
  yearToDateAmount?: number;
  correctionQuantity?: number;
  correctionRate?: number;
  correctionAmount?: number;
  correctedYearToDateQuantity?: number;
  correctedYearToDateRate?: number;
  correctedYearToDateAmount?: number;
  monthlyPurchaseQuantity?: number;
  monthlyPurchaseRate?: number;
  monthlyPurchaseAmount?: number;
  cumulativeToPeriodQuantity?: number;
  cumulativeToPeriodRate?: number;
  cumulativeToPeriodAmount?: number;
  previousYearQuantity?: number;
  previousYearRate?: number;
  previousYearAmount?: number;
  rowCode: number;
  category: number;
  isDataRow?: boolean;
  isSummaryRow?: boolean;
  rowClass?: string;
}

interface EnergyItem {
  industry: string;
  classification: string;
  energyType: string;
  unit: string;
  yearToDateConsumption?: number;
  yearToDateRate?: number;
  yearToDateCost?: number;
  correctedYearToDateConsumption?: number;
  correctedYearToDateRate?: number;
  correctedYearToDateCost?: number;
  monthlyConsumption?: number;
  monthlyRate?: number;
  monthlyCost?: number;
  cumulativeToPeriodConsumption?: number;
  cumulativeToPeriodRate?: number;
  cumulativeToPeriodCost?: number;
  previousYearConsumption?: number;
  previousYearRate?: number;
  previousYearCost?: number;
  forecastYearConsumption?: number;
  consumptionChangeExplanation: string;
  rowCode: number;
  category: number;
  isDataRow?: boolean;
  isSummaryRow?: boolean;
  rowClass?: string;
}

interface CurrencyExchangeItem {
  description: string;
  currency: string;
  yearToDateForeignAmount?: number;
  yearToDateExchangeRate?: number;
  yearToDateRialAmount?: number;
  correctedYearToDateForeignAmount?: number;
  correctedYearToDateExchangeRate?: number;
  correctedYearToDateRialAmount?: number;
  monthlyForeignAmount?: number;
  monthlyExchangeRate?: number;
  monthlyRialAmount?: number;
  cumulativeToPeriodForeignAmount?: number;
  cumulativeToPeriodExchangeRate?: number;
  cumulativeToPeriodRialAmount?: number;
  previousYearForeignAmount?: number;
  previousYearExchangeRate?: number;
  previousYearRialAmount?: number;
  forecastRemainingForeignAmount?: number;
  forecastRemainingExchangeRate?: number;
  forecastRemainingRialAmount?: number;
  rowCode: number;
  category: number;
  isDataRow?: boolean;
  isSummaryRow?: boolean;
  rowClass?: string;
}

interface MonthlyActivityDescription {
  rowCode: number;
  description: string;
  category: number;
  rowType: string;
}

interface GetMonthlyActivityDetailItem {
  id: string;
  isin: string;
  symbol: string;
  title: string;
  uri: string;
  version: string;
  fiscalYear: number;
  yearEndMonth: number;
  reportMonth: number;
  hasSubCompanySale: boolean;
  traceNo: number;
  productionAndSalesItems: ProductionAndSalesItem[];
  buyRawMaterialItems: BuyRawMaterialItem[];
  energyItems: EnergyItem[];
  currencyExchangeItems: CurrencyExchangeItem[];
  descriptions: MonthlyActivityDescription[];
}

@Component({
  selector: 'app-monthly-activity-detail',
  templateUrl: './monthly-activity-detail.component.html',
  styleUrls: ['./monthly-activity-detail.component.scss']
})
export class MonthlyActivityDetailComponent implements OnInit {
  isLoading = true;
  activityData: GetMonthlyActivityDetailItem | null = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monthlyActivityService: MonthlyActivityService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMonthlyActivityDetail(id);
    } else {
      this.error = 'شناسه فعالیت ماهانه مشخص نشده است';
      this.isLoading = false;
    }
  }

  loadMonthlyActivityDetail(id: string): void {
    this.isLoading = true;
    this.monthlyActivityService.getMonthlyActivityById({ id })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response: any) => {
          if (response?.data) {
            this.activityData = this.processActivityData(response.data);
          } else {
            this.error = 'داده‌های فعالیت ماهانه یافت نشد';
          }
        },
        error: (err) => {
          this.error = 'خطا در بارگذاری داده‌های فعالیت ماهانه';
          console.error('Error loading monthly activity detail:', err);
        }
      });
  }

  private processActivityData(data: GetMonthlyActivityDetailItem): GetMonthlyActivityDetailItem {
    // Process production and sales items
    data.productionAndSalesItems = data.productionAndSalesItems?.map(item => ({
      ...item,
      isDataRow: item.rowCode === -1,
      isSummaryRow: item.rowCode !== -1,
      rowClass: this.getProductionSalesRowClass(item)
    })) || [];

    // Process raw material items
    data.buyRawMaterialItems = data.buyRawMaterialItems?.map(item => ({
      ...item,
      isDataRow: item.rowCode === -1,
      isSummaryRow: item.rowCode !== -1,
      rowClass: this.getRawMaterialRowClass(item)
    })) || [];

    // Process energy items
    data.energyItems = data.energyItems?.map(item => ({
      ...item,
      isDataRow: item.rowCode === -1,
      isSummaryRow: item.rowCode !== -1,
      rowClass: this.getEnergyRowClass(item)
    })) || [];

    // Process currency exchange items
    data.currencyExchangeItems = data.currencyExchangeItems?.map(item => ({
      ...item,
      isDataRow: item.rowCode === -1,
      isSummaryRow: item.rowCode !== -1,
      rowClass: this.getCurrencyExchangeRowClass(item)
    })) || [];

    return data;
  }

  // Helper methods for template
  getProductionSalesDataRows(): ProductionAndSalesItem[] {
    return this.activityData?.productionAndSalesItems?.filter(item => item.isDataRow) || [];
  }

  getProductionSalesSummaryRows(): ProductionAndSalesItem[] {
    return this.activityData?.productionAndSalesItems?.filter(item => item.isSummaryRow) || [];
  }

  getRawMaterialDataRows(): BuyRawMaterialItem[] {
    return this.activityData?.buyRawMaterialItems?.filter(item => item.isDataRow) || [];
  }

  getRawMaterialSummaryRows(): BuyRawMaterialItem[] {
    return this.activityData?.buyRawMaterialItems?.filter(item => item.isSummaryRow) || [];
  }

  getEnergyDataRows(): EnergyItem[] {
    return this.activityData?.energyItems?.filter(item => item.isDataRow) || [];
  }

  getEnergySummaryRows(): EnergyItem[] {
    return this.activityData?.energyItems?.filter(item => item.isSummaryRow) || [];
  }

  getCurrencyExchangeDataRows(): CurrencyExchangeItem[] {
    return this.activityData?.currencyExchangeItems?.filter(item => item.isDataRow) || [];
  }

  getCurrencyExchangeSummaryRows(): CurrencyExchangeItem[] {
    return this.activityData?.currencyExchangeItems?.filter(item => item.isSummaryRow) || [];
  }

  // Row styling helpers
  getProductionSalesRowClass(item: ProductionAndSalesItem): string {
    if (item.rowCode === 16) return 'total-sum-row';  // Grand total - green
    if (item.rowCode === 5) return 'internal-sum-row'; // Internal sales - blue
    if (item.rowCode === 8) return 'export-sum-row';   // Export sales - red
    return 'data-row';
  }

  getRawMaterialRowClass(item: BuyRawMaterialItem): string {
    if (item.rowCode === 25) return 'total-sum-row';  // Grand total
    return item.isSummaryRow ? 'summary-row' : 'data-row';
  }

  getEnergyRowClass(item: EnergyItem): string {
    if (item.rowCode === 1) return 'total-sum-row';  // Total
    return item.isSummaryRow ? 'summary-row' : 'data-row';
  }

  getCurrencyExchangeRowClass(item: CurrencyExchangeItem): string {
    if (item.rowCode === 1 || item.rowCode === 2) return 'summary-row';
    return 'data-row';
  }

  // Format numbers for display
  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  // Navigation
  goBack(): void {
    this.router.navigate(['/get-sales-report']);
  }

  // Filtered data getters
  getCurrencyExchangeSourcesData(): CurrencyExchangeItem[] {
    return this.activityData?.currencyExchangeItems?.filter(item => item.isDataRow && item.category === 1) || [];
  }

  getCurrencyExchangeUsesData(): CurrencyExchangeItem[] {
    return this.activityData?.currencyExchangeItems?.filter(item => item.isDataRow && item.category === 2) || [];
  }

  getDomesticRawMaterialDataRows(): BuyRawMaterialItem[] {
    return this.getRawMaterialDataRows().filter(item => item.category === 1);
  }

  getImportedRawMaterialDataRows(): BuyRawMaterialItem[] {
    return this.getRawMaterialDataRows().filter(item => item.category === 2);
  }
}