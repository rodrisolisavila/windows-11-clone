import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'date-time',
  templateUrl: './date-time.component.html',
  styleUrl: './date-time.component.css'
})
export class DateTimeComponent implements OnInit {

  @ViewChild('datetime') datetime!: ElementRef<HTMLElement>;

  date: Date = new Date();
  monthDays: string = '';
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  weekNames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthName: string = '';
  today: string = '';
  today_month_year: string = '';

  constructor(private menuService: MenuService) {
    this.menuService.isVisibleDateTime$.subscribe(isVisibleDateTime => {
      if (this.datetime) this.setWindowVisibility(isVisibleDateTime);
    });
  }
  

  ngOnInit(): void {
    this.renderCalendar();
  }

  renderCalendar(): void {
    this.date.setDate(1);
    const firstDayIndex = this.date.getDay();
    const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    const lastDayIndex = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;

    this.monthName = `${this.monthNames[this.date.getMonth()]} ${this.date.getFullYear()}`;
    this.today = `${this.weekNames[new Date().getDay()]}, ${this.monthNames[new Date().getMonth()]} ${new Date().getDate()}`;
    this.today_month_year = `${this.monthNames[this.date.getMonth()]} ${this.date.getDate()}`;

    let days: string = '';

    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="date-time-calendar-days-prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      if (i === new Date().getDate() && this.date.getMonth() === new Date().getMonth()) {
        days += `<div class="date-time-calendar-days-today">${i}</div>`;
      } else {
        days += `<div>${i}</div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="date-time-calendar-days-next-date">${j}</div>`;
    }

    this.monthDays = days;
  }

  prevMonth(): void {
    this.date.setMonth(this.date.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth(): void {
    this.date.setMonth(this.date.getMonth() + 1);
    this.renderCalendar();
  }

  private setWindowVisibility(isVisible: boolean): void {
    if (isVisible) {
      this.datetime.nativeElement.parentElement!.style.display = 'block';
    } else {
      this.datetime.nativeElement.parentElement!.classList.add('hide-date-time');
      setTimeout(() => {
        this.datetime.nativeElement.parentElement!.classList.remove('hide-date-time');
        this.datetime.nativeElement.parentElement!.style.display = 'none';
      }, 150);
    }
  }

}
