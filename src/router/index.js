import { createRouter, createWebHashHistory } from 'vue-router'
import Editor from '../components/Editor.vue'
import Id from '../components/Id.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import logout from '../components/logout.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Editor,
            meta: { requiresAuth: true }
        },
        {
            path: '/id/:id',
            component: Id,
            meta: { requiresAuth: true}
        },
        {
            path: '/addUser',
            component: Signup,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/logout',
            component: logout
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem("token");

    if (to.meta.requiresAuth && !token) {
        next("/login");
    } else {
        next()
    }
})

export default router