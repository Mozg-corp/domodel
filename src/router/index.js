import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/');
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated && store.getters.isAdmin) {
        next();
        return
    }
    next('/');
};

const routes = [
    {
        path: '/',
        name: 'home',
        component: ()=>import(/*webpackChunkName: "Home page"*/ '@/views/Home')
    },
    {
        path: '/profile',
        name:'profile',
		default: '/profile/personal',
        component: ()=>import(/*webpackChunkName: "Profile page"*/ '@/views/Profile'),
		// beforeEnter: ifAuthenticated,
		children: [
			{
				path: 'personal',
				name: "personal", 
				component: ()=>import(/*webpackChunkName: "Profile Personal"*/ '@/components/Personal')
			},
			{
				path: 'counter',
				name: 'counter',
				component: ()=>import(/*webpackChunkName: "Profile Counter"*/ '@/components/Counter')
			},
			{
				path: 'claims',
				name: 'claims',
				component: ()=>import(/*webpackChunkName: "Profile Claims"*/ '@/components/Claims')
			},
			{
				path: 'claims/:id',
				name: 'single claim',
				props: true,
				component: ()=>import(/*webpackChunkName: "Profile Claims"*/ '@/components/ClaimSingle')
			},
			{
				path: 'createClaim',
				name: 'CreateClaim',
				component: ()=>import(/*webpackChunkName: 'Create Claim'*/ '@/components/ClaimCreate.vue')
			}
		]
    },
    {
        path: '/about',
        name:'about',
        component: ()=>import(/*webpackChunkName: "About page"*/ '@/views/About.vue'),
    },
    {
        path: '/contacts',
        name:'contacts',
        component: ()=>import(/*webpackChunkName: 'Contacts Page'*/ '@/views/Contacts.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
