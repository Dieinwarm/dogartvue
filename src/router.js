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
                    meta: {
                      title: '舔狗の语'
                    }
                },
                {
                    path: '/diary',
                    name: 'diary',
                    component: Diary,
                    meta: {
                      title: '舔狗日记'
                    }
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
              title: '内容管理'
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
              title: '登录'
            }
        },
    ]
});