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