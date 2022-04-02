import { createElement, compile } from "../utils/dom-utils.js";

const template = `
  <div class="modal-header">
    <h2>{modalTitle}</h2>
    <button id="closeBtn" class="fa fa-xmark fa-xmark-large"></button>
  </div>
  <div class="modal-content">
    {content}
  </div>
`

export const render = (title, content) => {
  const modalContainer = createElement('div', {
    role: 'dialog',
    className: 'modalContainer',
    innerHTML: compile(template, {
      modalTitle: title,
      content: content.outerHTML
    })
  });
  const overlay = createElement('div', {
    className: 'modal-background'
  });

  document.body.append(overlay, modalContainer);
  const closeBtn = document.querySelector('#closeBtn');
  closeBtn.addEventListener('click', () => {
    overlay.remove();
    modalContainer.remove();
  })
}