import { createElement, compile } from "../utils/dom-utils.js";
import { computeDayKey, get } from "../utils/storage-utils.js";


const timelineTemplate = `
  <div class="hours-container">{hours}</div>
  <div class="hours-lines-container">{lines}</div>
`

const linesTemplate = `
   <div class="solid-line"> <hr> </div>
   <div class="dashed-line"> <hr> </div>
`
const hourTemplate  = `
  <div>{hour}:00</div>
`

const eventTemplate = `
  <div class="category-color-on-event-card" style="background-color: {color}"> </div>
  <div class="event-content">
    <h3>{title}</h3>
    <p>{description}</p>
    <div class="event-card-actions">
        <button class="edit-button"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="delete-button"><i class="fa-solid fa-trash"></i>Delete</button>
    </div>
  </div>
`

const computePosition = (startTime) => {
  const startHour = startTime.slice(0, 2)
  const startMinutes = startTime.slice(3)
  const totalMinutes = parseInt(startHour) * 60 + parseInt(startMinutes)
  return totalMinutes * 3;
}

const computeDuration = (startTime, endTime) => {
  const startHour = parseInt(startTime.slice(0, 2));
  const startMinutes = parseInt(startTime.slice(3));

  const endHour = parseInt(endTime.slice(0, 2));
  const endMinutes = parseInt(endTime.slice(3));

  const totalMinutes = (endHour - startHour) * 60 - startMinutes + endMinutes;
  return totalMinutes * 3;
}

export const renderEvents = (rootElement, events) => {
  const categories = get('categories')
  const eventContainer = new DocumentFragment();
  events.forEach((event) => {
    const eventCategory = categories.filter(category => category.name === event.category)[0];
    const eventCard = createElement('div', {
      className: 'event-card',
      innerHTML: compile(eventTemplate, {
        title: event.eventTitle,
        description: event.eventDescription,
        color: eventCategory.color
      }),
      style: `top: ${computePosition(event.startTime)}px; height: ${computeDuration(event.startTime, event.endTime)}px;`
    })
    eventContainer.append(eventCard)
  })
  rootElement.append(eventContainer)
}

export const render = (rootElement, date) => {
  const events = get(computeDayKey(date))
  console.log(events);
  const linesContainer = new DocumentFragment();
  const hoursContainer = new DocumentFragment();
  linesContainer.innerHTML = '';
  hoursContainer.innerHTML = '';
  for(let i = 0; i < 25; i++) {
    linesContainer.innerHTML += compile(linesTemplate, {hour: i});
    hoursContainer.innerHTML += compile(hourTemplate, {hour: i});
  }

  const timeline = createElement('div', {
    id: 'timeline',
    className: 'content-container',
    innerHTML: compile(timelineTemplate, {
      hours: hoursContainer.innerHTML,
      lines: linesContainer.innerHTML
    })
  })
  rootElement.appendChild(timeline);
  renderEvents(timeline, events);
}