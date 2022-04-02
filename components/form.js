import { createElement } from "../utils/dom-utils.js";
import { render as createInput } from "./input.js";

export const render = (inputs = [], attributes = {}) => {
  const element = createElement('form', {
    ...attributes,
    innerHTML: inputs.map(input => createInput(input)).join(''),
  })
  return element;
}