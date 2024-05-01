import { Component } from '@angular/core';

@Component({
  selector: 'systemicons',
  templateUrl: './systemicons.component.html',
  styleUrl: './systemicons.component.css'
})
export class SystemiconsComponent {

  rangeValue: number = 30;

  getRangeBackground(): string {
    const percentage = (this.rangeValue / 60) * 100;
    return `linear-gradient(to right, #0652f7 0%, #0652f7 ${percentage}%, #fff ${percentage}%, #fff 100%)`;
  }

  onRangeChange(event: any) {
    this.rangeValue = event.target.value;
  }

}
