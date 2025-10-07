import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router'
import { Locale } from 'vant';
import thTH from './locale/lang/th-TH';

const app = createApp(App)
app.use(Vant)
app.use(router)
app.mount('#app')
Locale.use('th-TH', thTH);
