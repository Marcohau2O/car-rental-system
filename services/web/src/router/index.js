import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Cars from '../pages/cars.vue'
import CarDetail from '../pages/car-detail.vue'
import Checkout from '../pages/checkout.vue'
import Success from '../pages/success.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: "AutoRent - Renta de Autos" },
    },
    {
        path: '/login',
        name: 'login',
        component:  Login,
        meta: { title: "AutoRent - Inicio Sesión", guestOnly: true }
    },
    {
        path: '/registro',
        name: 'registro',
        component: Register,
        meta: { title: "AutoRent - Inicio Sesión", guestOnly: true}
    },
    {
        path: '/cars',
        name: 'Cars',
        component: Cars,
        meta: { title: "Nuestro Autos - AutoRent", requiresAuth: true },
    },
    {
        path: '/car-detail/:id',
        name: 'CarDetail',
        component: CarDetail,
        meta: { title: "Detalles del Auto - AutoRent", requiresAuth: true },
    },
    {
        path: '/checkout/:id',
        name: 'Checkout',
        component: Checkout,
        meta: { title: "Checkout - AutoRent", requiresAuth: true },
    },
    {
        path: '/success',
        name: 'Success',
        component: Success,
        meta: { title: "Reserva Confirmada - AutoRent", requiresAuth: true },
    },{
        path: "/:pathMatch(.*)*",
        redirect: "/",
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token')

    // 🔒 Ruta protegida
    if (to.meta.requiresAuth && !token) {
        return next({
        name: 'login',
        query: { redirect: to.fullPath } // 🔥 PRO
        })
    }

    // 🚫 Usuario logueado no entra a login/registro
    if (to.meta.guestOnly && token) {
        return next({ name: 'home' })
    }

    next()
})

router.afterEach((to) => {
  document.title = (to.meta.title) || "AutoRent"
})

export default router