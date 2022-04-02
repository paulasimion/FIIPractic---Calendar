import { createElement } from "../utils/dom-utils.js";
import { render as renderCalendar } from './calendar.js'
import { render as renderCategories } from './categories.js'
import { get, set } from "../utils/storage-utils.js";

export const render = (rootElement) => {
  const aside = createElement('aside', {
    className: 'sidenav',
  })
    
  rootElement.append(aside);
  renderCalendar(aside)
  renderCategories(aside);
};

