import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Cars from '../pages/cars.vue'
import CarDetail from '../pages/car-detail.vue'
import Checkout from '../pages/checkout.vue'
import Success from '../pages/success.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: "AutoRent - Renta de Autos" },
    },
    {
        path: '/cars',
        name: 'Cars',
        component: Cars,
        meta: { title: "Nuestro Autos - AutoRent" },
    },
    {
        path: '/car-detail/:id',
        name: 'CarDetail',
        component: CarDetail,
        meta: { title: "Detalles del Auto - AutoRent" },
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
        meta: { title: "Checkout - AutoRent" },
    },
    {
        path: '/success',
        name: 'Success',
        component: Success,
        meta: { title: "Reserva Confirmada - AutoRent" },
    },{
        path: "/:pathMatch(.*)*",
        redirect: "/",
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.afterEach((to) => {
  document.title = (to.meta.title) || "AutoRent"
})

export default router