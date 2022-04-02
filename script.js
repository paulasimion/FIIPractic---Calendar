import { render as renderHeader } from './components/header.js';
import { render as renderAside } from './components/aside.js';
import { get as getStorage, set as setStorage } from './utils/storage-utils.js';
import { defaultCategories } from './utils/const.js'
import { render as renderTimeline } from './components/timeline.js';


(() => {
    const date = new Date();
    console.log(date);
    const app = document.querySelector('main#app')
    if(getStorage('categories') == null) {
        setStorage('categories', defaultCategories);

    }
    // setStorage('categories', defaultCategories);

    renderHeader(app);
    renderAside(app);
    renderTimeline(app, date);
})()