import { get as getFromStorage } from './storage-utils.js'
export const addEventFormInputs = [
  {
    id: 'eventTitleInput',
    type: 'text',
    name: 'eventTitle',
    label: 'Title',
    placeholder: 'Enter a title for your event'
  },
  {
    id: 'eventDescriptionInput',
    type: 'textarea',
    name: 'eventDescription',
    label: 'Description',
    placeholder: 'Enter a short description'
  },
  {
    id: 'categoriesDropdown',
    type: 'select',
    name: 'category',
    label: 'Category',
    options: getFromStorage('categories')
  },
  {
    id: 'eventDate',
    type: 'date',
    name: 'date',
    label: 'Date',
  },
  {
    id: 'startTime',
    type: 'time',
    name: 'startTime',
    label: 'Start Time'
  },
  {
    id: 'endTime',
    type: 'time',
    name: 'endTime',
    label: 'End Time'
  },
  {
    id: 'submitAddEvent',
    type: 'submit',
    label: 'Submit New Event'
  }
]

export const addCategoryInputs = [
  {
    id: 'newCategory',
    type: 'text',
    name: 'name',
    label: 'Add new category',
    placeholder: 'Category Name'
  },
  {
    id: 'submitAddCategory',
    type: 'submit',
    label: '<i class="fas fa-plus"></i>'
  }
]

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const defaultCategories = [{
  name: "Appointments",
  color: "#4CC9F0",
},
{
  name: "Meetings",
  color: "#FA6C40",
},
{
  name: "Courses",
  color: "#7209B7",
},
{
  name: "Birthdays",
  color: "#F72585"
}
];