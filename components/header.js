import { createElement, compile } from "../utils/dom-utils.js";
import { render as renderAddModal } from "./modal.js";
import { render as renderAddForm } from './form.js';
import { addEventFormInputs } from '../utils/const.js';
import { set as setStorage, get as getFromStorage } from "../utils/storage-utils.js";
import { renderEvents } from "./timeline.js";

const template = `
  <div class="logo-wrapper">
    <img src="{logoImage}">
    <h1 class="logo-text">{logoBrand}</h1>
  </div>
  <button class="add-event-button">
    <i class="fa fa-plus"></i>
    {buttonLabel}
  </button>
`

const addEvent = (formData) => {
  const timeline = document.querySelector('#timeline')
  const eventCards = timeline.querySelectorAll('.event-card');
  const newEvent = {};
  let eventKey;
  for(let entry of formData.entries()) {
    if(entry[0] === 'date') {
      eventKey = entry[1];
    }
    newEvent[entry[0]] = entry[1];
  }
  const dayEvents = getFromStorage(eventKey) || [];
  const updatedEvents = [...dayEvents, newEvent];
  setStorage(eventKey, updatedEvents);
  eventCards.forEach(card => card.remove());
  renderEvents(timeline, updatedEvents);
}

export const render = (rootElement) => {
  const element = createElement('header', {
    innerHTML: compile(template, {
      logoImage: '../assets/calendar-multiselect.png',
      logoBrand: 'Calendar',
      buttonLabel: 'Add Event'
    })
  });
  rootElement.appendChild(element);

  const headerButton = rootElement.querySelector('header button');
  headerButton.addEventListener('click', () => {
    const modalContent = renderAddForm(addEventFormInputs, {
      id: 'eventForm'
    });
    renderAddModal('Add Event', modalContent);
    const form = document.querySelector('#eventForm')
    const closeBtn = document.querySelector('#closeBtn');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = e.target.querySelector('select');
      const formData = new FormData(form);
      formData.append('category', category.options[category.selectedIndex].value);
      addEvent(formData);
      closeBtn.click();
    })
  })
}