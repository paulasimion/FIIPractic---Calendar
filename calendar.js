const date = new Date();

const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector('.days');

    //**pentru ca numarul de zile variaza de la o luna la alta trebuie sa aflam care este ultima zi din fiecare luna */
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;


    const months = [
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

    document.querySelector('.date h3').innerHTML = months[date.getMonth()];

    document.querySelector('.date p').innerHTML = new Date().toDateString();

    let days = ' ';

    for (let i = firstDayIndex; i > 0; i--) {
        days += `<div class='prev-date'>${prevLastDay - i + 1}</div>`
    }

    for (let i = 1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }


    monthDays.innerHTML = days;

    for (let i = 1; i <= nextDays; i++) {
        days += `<div class="next-date">${i}</div>`;
        monthDays.innerHTML = days;
    }

}

date.setDate(1);

const monthDays = document.querySelector('.days');

//**pentru ca numarul de zile variaza de la o luna la alta trebuie sa aflam care este ultima zi din fiecare luna */
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

const firstDayIndex = date.getDay();
const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

const nextDays = 7 - lastDayIndex - 1;

const months = [
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

document.querySelector('.date h3').innerHTML = months[date.getMonth()];

document.querySelector('.date p').innerHTML = new Date().toDateString();


let days = ' ';

for (let i = firstDayIndex; i > 0; i--) {
    days += `<div class='prev-date'>${prevLastDay - i + 1}</div>`
}

for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
        days += `<div class="today">${i}</div>`;
    } else {
        days += `<div>${i}</div>`;
    }
};


monthDays.innerHTML = days;

for (let i = 1; i <= nextDays; i++) {
    days += `<div class="next-date">${i}</div>`;
    monthDays.innerHTML = days;
};

document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar()

// ................... MONTH & YEAR PICKER....................

// let monthPicker = document.querySelector('#month');
// const calendar = document.querySelector('.calendar');

// let monthList = calendar.querySelector('.month-list');

// monthPicker.addEventListener('click', event => {
//     monthList.classList.add('show');
// });

// months.forEach((elem, index) => {
//     let chooseMonth = document.createElement('div');
//     chooseMonth.innerHTML = `<div>${elem}</div>`
//     monthList.appendChild(elem);
// })
// ...............................................................




// ................... CATEGORIES ....................

const addCategoryInput = document.querySelector('#addCategoryInput');
const addCategoryBtn = document.querySelector('.add-category-btn');
const categoryColorPicker = document.getElementById('categoryColorPicker').value;
const categoryList = document.querySelector('.categories-list');
const defaultCategories = [{
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

(function() {
    if (localStorage.getItem("New Category") === null) {
        localStorage.setItem("New Category", JSON.stringify(defaultCategories));
    }
})()

addCategoryInput.onkeyup = () => {
    let userData = addCategoryInput.value;
    if (userData.trim() != 0) {
        addCategoryBtn.classList.add("active");
    } else {
        addCategoryBtn.classList.remove("active");
    }
}
showCategory()

addCategoryBtn.onclick = () => {
    const inputData = addCategoryInput.value;
    const getLocalStorage = localStorage.getItem("New Category");
    const newCategory = { name: inputData, color: categoryColorPicker }
    const listArr = JSON.parse(getLocalStorage); // json string becomes a js object
    listArr.push(newCategory);
    localStorage.setItem("New Category", JSON.stringify(listArr)); //  js object becomes a json string
    categoryList.innerHTML += renderNewCategory(newCategory, listArr.length - 1)
    addCategoryInput.value = "";
};

function showCategory() {
    const getLocalStorage = localStorage.getItem("New Category");
    const listArr = JSON.parse(getLocalStorage);
    let newLiTag = '';
    listArr.forEach((element, index) => {
        console.log(element.name)
        newLiTag += renderNewCategory(element, index);
    });
    categoryList.innerHTML += newLiTag;
}

function deleteCategory(index) {
    const getLocalStorage = localStorage.getItem("New Category");
    const listArr = JSON.parse(getLocalStorage);
    const categoryToBeDeleted = categoryList.querySelector(`[data-index="${index}"]`);
    listArr.splice(index, 1);
    localStorage.setItem("New Category", JSON.stringify(listArr));
    categoryList.removeChild(categoryToBeDeleted);
}

function renderNewCategory(category, index) {
    return `<li data-index="${index}">
                <span class="category-color-new" style="background-color:${category.color}"></span> 
                ${category.name} 
                <span class="delete-category-icon" onclick="deleteCategory(${index}); ">
                    <i class="fas fa-trash"></i>
                </span>
            </li>`;
}