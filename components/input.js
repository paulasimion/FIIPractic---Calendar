import { createElement, compile } from "../utils/dom-utils.js";

const defaultInput = {
  id: 'genericID',
  type: 'text',
  label: 'Standard Input',
  name: 'generic-input',
  placeholder: 'Generic Input'
}

const inputTemplate = `
  <div id="{id}Group" class="form-group">
    <label for="{id}">{label}</label>
    <input type="{type}" id="{id}" name="{name}" placeholder="{placeholder}">
  </div>
`

const textareaTemplate = `
  <div id="{id}Group" class="form-group">
    <label for="{id}">{label}</label>
    <textarea id="{id}" name="{name}" placeholder="{placeholder}"></textarea>
  </div>
`

const dropdownTemplate = `
  <div id="{id}Group" class="form-group">
    <label for="{id}">{label}</label>
    <div class="c-select">
      <select id="{id}">{options}<select>
    </div>
  </div>
`

const submitTemplate = `
  <button id="{id}" class="submit-btn" type="{type}">{label}</button>
`

export const render = (attributes = defaultInput) => {
  switch(attributes.type) {
    case 'textarea':
      return compile(textareaTemplate, attributes)
    case 'select':
      return compile(dropdownTemplate, {
        ...attributes,
        options: attributes.options.map(option => {
          return `<option value="${option.name}">${option.name}</option>`
        }).join('')
      })
    case 'submit':
      return compile(submitTemplate, attributes)
    default:
      return compile(inputTemplate, attributes)
  }
}