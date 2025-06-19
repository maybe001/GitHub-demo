import { createApp } from 'vue'
import { createPinia } from 'pinia'
//引入全局less样式
import '@/assets/global.less'
import App from './App.vue'

//引入路由
import router from '@/router/index.js'
//引入全局组件
import { componentPlugin } from './components/index.js'

const app = createApp(App)

app.use(createPinia())
//应用全局组件
app.use(componentPlugin)

//应用路由
app.use(router)
app.mount('#app')
