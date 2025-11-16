import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InterpretativeReportSummaryPage5Service } from 'src/app/services/interpretative-report-summary-page5.service';
import { InterpretativeReportSummaryPage5Detail } from 'src/app/models/interpretative-report-summary-page5';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-interpretative-report-summary-page5-detail',
  templateUrl: './interpretative-report-summary-page5-detail.component.html',
  styleUrls: ['./interpretative-report-summary-page5-detail.component.scss']
})
export class InterpretativeReportSummaryPage5DetailComponent implements OnInit {
  detail?: InterpretativeReportSummaryPage5Detail;
  isLoading = true;

  months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InterpretativeReportSummaryPage5Service,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id.trim() !== '') {
      this.loadDetail(id);
    } else {
      this.toastr.error('شناسه گزارش نامعتبر است');
      this.router.navigate(['/interpretative-report-summary-page5']);
    }
  }

  loadDetail(id: string): void {
    this.isLoading = true;
    this.service.getById(id).subscribe({
      next: (res: any) => {
        this.detail = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading report detail:', err);
        this.toastr.error('گزیده گزارش تفسیری صفحه 5 یافت نشد');
        this.isLoading = false;
        this.router.navigate(['/interpretative-report-summary-page5']);
      }
    });
  }

  getMonthName(month: number): string {
    return this.months[month - 1] || '';
  }

  goBack(): void {
    this.router.navigate(['/interpretative-report-summary-page5']);
  }

  isDataRow(rowCode: number): boolean {
    return rowCode === -1;
  }

  isSummaryRow(rowCode: number): boolean {
    return rowCode !== -1;
  }

  getSectionTitle(sectionName: string): string {
    const titles: { [key: string]: string } = {
      'P5Desc1': 'توضیحات کلی',
      'DescriptionForDetailsOfTheFinancing': 'توضیحات جزئیات تأمین مالی',
      'CompanyEstimatesOfFinancingPrograms': 'برآورد شرکت از برنامه‌های تأمین مالی',
      'CorporateIncomeProgram': 'برنامه درآمدی شرکت',
      'OtherImportantPrograms': 'سایر برنامه‌های مهم',
      'OtherImportantNotes': 'سایر نکات مهم',
      'P5Desc2': 'توضیحات تکمیلی'
    };
    return titles[sectionName] || sectionName;
  }

  formatNumber(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '—';
    }
    return value.toLocaleString('en-US');
  }

  convertToToman(formattedAmount: string): string {
    return convertToToman(formattedAmount);
  }
}
