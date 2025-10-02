import { createRouter, createWebHashHistory } from 'vue-router'
import Editor from '../components/Editor.vue'
import Id from '../components/Id.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'

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
        },
        {
            path: '/addUser',
            component: Signup,
        },
        {
            path: '/login',
            component: Login,
        }
    ]
})

export default router