import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faMagnifyingGlass, faXmark, faTrash, faPenToSquare, faCamera } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

library.add(faPlus, faMagnifyingGlass, faXmark, faTrash, faPenToSquare, faCamera);

app.use(pinia);
app.use(router);
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app');
