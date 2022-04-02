import { compile, createElement } from "../utils/dom-utils.js";
import { get as getFromStorage, set as setStorage } from "../utils/storage-utils.js";
import { addCategoryInputs } from "../utils/const.js";
import { render as renderAddForm } from './form.js';

const categoryTemplate = `
  <li data-index="{index}">
    <span class="category-color-new" style="background-color:{color}"></span> 
    {name} 
    <span class="delete-category-icon" data-delete-index="{index}">
        <i class="fas fa-trash"></i>
    </span>
  </li>
`

const categoryWidgetTemplate = `
  <h2 class="categories-title">Categories</h2>
  <ul class="categories-list">
  {categories}
  </ul>
  {addCategoryForm}
`;

const generateCategoryColor = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

export const render = (rootElement) => {
  const categories = getFromStorage('categories');

  const categoryWidget = createElement('div', {
    id: 'categoriesWidget',
    className: 'categories-container',
    innerHTML: compile(categoryWidgetTemplate, {
      categories: categories.map((category, index) => compile(categoryTemplate, {
        index,
        name: category.name,
        color: category.color
      })).join(''),
      addCategoryForm: renderAddForm(addCategoryInputs, {
        id: 'categoryForm'
      }).outerHTML
    })
  })
  rootElement.append(categoryWidget);
  const categoryList  = categoryWidget.querySelector('.categories-list')
  const addForm  = categoryWidget.querySelector('#categoryForm');
  
  categoryList.addEventListener('click', (event) => {
    const target = event.target.tagName === 'I' ? event.target.closest('span') : event.target;
    if(target.hasAttribute('data-delete-index')) {
      const categories = getFromStorage('categories');
      const deleteIndex = target.getAttribute('data-delete-index');
      target.parentNode.remove();
      setStorage('categories', categories.filter((element, index) => index != deleteIndex))
    }
  })

  addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const categories = getFromStorage('categories')
    const newCategory = {
      color: generateCategoryColor()
    };

    const data = new FormData(addForm);
    for(let entry of data.entries()) {
      newCategory[entry[0]] = entry[1];
    }

    console.log(newCategory);
    categoryList.innerHTML += compile(categoryTemplate, {
      index: categoryList.childElementCount,
      name: newCategory.name,
      color: newCategory.color 
    })
    setStorage('categories', [...categories, newCategory])
    addForm.reset()
  })
}