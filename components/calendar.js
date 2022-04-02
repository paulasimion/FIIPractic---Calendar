import { createElement, compile } from "../utils/dom-utils.js";
import { months } from '../utils/const.js';

const calendarTemplate = `
  <div class="calendar">
    <div id="month">
      <i data-month="previous" class="fa fa-angle-left prev"></i>
      <div class="date">
          <h3>{month}</h3>
          <p>{currentDate}</p>
      </div>
      <i data-month="next" class="fas fa-angle-right next"></i>
    </div>
    {monthDays}
  </div>
`
const calendarDaysTemplate = `
  <div id="monthDays">
    <div class="weekdays">
      <div>Su</div>
      <div>Mo</div>
      <div>Tu</div>
      <div>We</div>
      <div>Th</div>
      <div>Fr</div>
      <div>Sa</div>
    </div>
    <div class="days">{days}</div>
  </div>
`
const renderDays = (currentDate) => {
  currentDate.setDate(1);
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0).getDate();
  const prevLastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0).getDate();
  const firstDayIndex = currentDate.getDay();
  const lastDayIndex = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  let days = ' ';

  for (let i = firstDayIndex; i > 0; i--) {
    days += `<div class='prev-date'>${prevLastDay - i + 1}</div>`
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let i = 1; i <= nextDays; i++) {
    days += `<div class="next-date">${i}</div>`;
  }

  return compile(calendarDaysTemplate, {
    days
  });
}

export const render = (rootElement) => {
  const currentDate = new Date();
  const calendar = createElement('div', {
    id: 'calendar',
    className: 'calendar-container',
    innerHTML: compile(calendarTemplate, {
      month: months[currentDate.getMonth()],
      currentDate: new Date().toDateString(),
      monthDays: renderDays(currentDate)
    })
  })


  rootElement.append(calendar);
  const monthDays = calendar.querySelector('#monthDays')
  const month = calendar.querySelector('.date h3')
  document.querySelector('.prev').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    monthDays.innerHTML = renderDays(currentDate)
    month.innerHTML = months[currentDate.getMonth()]
  });

  document.querySelector('.next').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    monthDays.innerHTML = renderDays(currentDate)
    month.innerHTML = months[currentDate.getMonth()]
  });
}
