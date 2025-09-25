import { createRouter, createWebHashHistory } from 'vue-router'
import Editor from '../components/Editor.vue'
import Id from '../components/Id.vue'



const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Editor,
        },
        {
            path: '/id/:id',
            component: Id,
        }
    ]
})

export default router