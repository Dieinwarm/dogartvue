import { createRouter,createWebHashHistory } from 'vue-router';
import Index from './components/index.vue'
import Words from './components/view/words.vue'
import Diary from './components/view/diary.vue'

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
        }
    ]
});