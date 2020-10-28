import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/index.vue'
import Words from '../components/view/words.vue'
import Diary from '../components/view/diary.vue'
Vue.use(VueRouter)

const routes = [
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

const router = new VueRouter({
	routes
})

export default router
