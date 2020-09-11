import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
// import Profile from '../views/Profile.vue'
// import Personal from '../components/Personal.vue'
import Shops from '../components/Shops.vue'
import ShopAdd from '../components/ShopAdd.vue'
import Map from "../views/Map";
import MapView from "../views/MapView";
import AuthComponent from "../components/AuthComponent";
import RegistrationComponent from "../components/RegistrationComponent";
import store from '../store/index'

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
			}
		]
    },
    {
        path: '/chains',
        name:'shops',
        component: Shops,
        props: true
    },
    {
        path: '/shop-add',
        name:'shopAdd',
        component: ShopAdd,
        props: true,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/map/draw',
        name:'mapdraw',
        component: Map,
        beforeEnter: ifAuthenticated,
        props: true
    },
    {
        path: '/map/view/:id',
        name:'mapview',
        component: MapView,
        props: true

    },
    {
        path: '/sign-in',
        name:'signin',
        component: AuthComponent,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/sign-up',
        name:'signup',
        component: RegistrationComponent,
        beforeEnter: ifNotAuthenticated,
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
