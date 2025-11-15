import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InterpretativeReportSummaryPage5Service } from 'src/app/services/interpretative-report-summary-page5.service';
import { InterpretativeReportSummaryPage5Detail } from 'src/app/models/interpretative-report-summary-page5';

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
    if (id) {
      this.loadDetail(id);
    }
  }

  loadDetail(id: string): void {
    this.isLoading = true;
    this.service.getById(id).subscribe({
      next: (data) => {
        this.detail = data;
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
}
