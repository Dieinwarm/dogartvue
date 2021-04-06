import { createRouter,createWebHashHistory } from 'vue-router';
import Index from './components/index'
import Words from './components/view/words'
import Diary from './components/view/diary'
import Admin from './components/view/admin'
import Login from './components/view/login'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            redirect: "/words",
            children:[
                {
                    path: '/words',
                    name: 'words',
                    component: Words,
                },
                {
                    path: '/diary',
                    name: 'diary',
                    component: Diary,
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
    ]
});