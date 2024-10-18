import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AgChartsModule } from 'ag-charts-angular'; 
import { AgChartOptions } from 'ag-charts-community';
import { getChartData, getPartnerData} from './data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AgGridModule, AgChartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private gridApi!: GridApi;

  barChartOptions: AgChartOptions = {
  data: getChartData(),
  series: [
    {
      type: "bar",
      xKey: "date",
      yKey: "po",
      yName: "3A4'S",
      fill: "Green"
    },
    {
      type: "bar",
      xKey: "date",
      yKey: "po_ack",
      yName: "3B18'S",
      fill: "Blue"
    },
    {
      type: "bar",
      xKey: "date",
      yKey: "violation",
      yName: "Violations",
      fill: "Red"
    }
  ],
};
  timeViews = ['LAST 24 HOURS', 'THIS WEEK'];
  currentTimeView = 0;

  partners = getPartnerData();

  currentPartnerIndex = 0;

  get visiblePartners() {
    return this.partners.slice(this.currentPartnerIndex, this.currentPartnerIndex + 3);
  }

  toggleTimeView(direction: number) {
    this.currentTimeView += direction;
    if (this.currentTimeView < 0) {
      this.currentTimeView = 0;
    } else if (this.currentTimeView >= this.timeViews.length) {
      this.currentTimeView = this.timeViews.length - 1;
    }
  }

  navigatePartners(direction: number) {
    this.currentPartnerIndex += direction * 3;
    if (this.currentPartnerIndex < 0) {
      this.currentPartnerIndex = 0;
    } else if (this.currentPartnerIndex > this.partners.length - 3) {
      this.currentPartnerIndex = this.partners.length - 3;
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  
}