import { createRouter, createWebHistory } from 'vue-router'
import Editor from '../components/Editor.vue'
import Update from '../components/Update.vue'



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Editor,
        },
        {
            path: '/update',
            component: Update,
        }
    ]
})

export default router