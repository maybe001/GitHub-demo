//将components中的组件注册为全局组件
import bg from './bg/index.vue'
import border from './border/index.vue'
import particles from './particles/index.vue'

export const componentPlugin = {
    install(app) {
        app.component('Bg', bg)
        app.component('border', border)
        app.component('particles', particles)
    }
}