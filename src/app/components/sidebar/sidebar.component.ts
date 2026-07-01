import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  isManufacturingOpen = true;
  isStructuralOpen = false;
  isServicesOpen = false;
  isInvestmentOpen = false;
  isAgricultureOpen = false;
  isBankOpen = false;
  isLeasingOpen = false;
  isInsuranceOpen = false;
  isCapitalSupplyOpen = false;

  toggleSection(section: 'manufacturing' | 'structural' | 'services' | 'investment' | 'agriculture' | 'bank' | 'leasing' | 'insurance' | 'capital-supply') {
    switch (section) {
      case 'manufacturing': this.isManufacturingOpen = !this.isManufacturingOpen; break;
      case 'structural':    this.isStructuralOpen    = !this.isStructuralOpen;    break;
      case 'services':      this.isServicesOpen      = !this.isServicesOpen;      break;
      case 'investment':    this.isInvestmentOpen    = !this.isInvestmentOpen;    break;
      case 'agriculture':   this.isAgricultureOpen   = !this.isAgricultureOpen;   break;
      case 'bank':          this.isBankOpen          = !this.isBankOpen;          break;
      case 'leasing':       this.isLeasingOpen       = !this.isLeasingOpen;       break;
      case 'insurance':     this.isInsuranceOpen     = !this.isInsuranceOpen;     break;
      case 'capital-supply': this.isCapitalSupplyOpen = !this.isCapitalSupplyOpen; break;
    }
  }
}
