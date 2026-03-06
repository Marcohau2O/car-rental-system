import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Cars from '../pages/cars.vue'
import CarDetail from '../pages/car-detail.vue'
import Checkout from '../pages/checkout.vue'
import Success from '../pages/success.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import misReservas from '../pages/misReservas.vue'
import Contactanos from '../pages/contactanos.vue'
import Oficinas from '../pages/oficinas.vue'
import CotizarVehiculo from '../pages/CotizarVehiculo.vue'
import DatosContrato from '../pages/DatosContrato.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: "AutoRent - Renta de Autos" },
    },
    {
        path: '/contactanos',
        name: 'contactanos',
        component: Contactanos,
        meta: { title: "AutoRent - Contactanos" }
    },
    {
        path: '/oficinas',
        name: 'oficinas',
        component: Oficinas,
        meta: { title: "AutoRent - Oficinas" }
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
        path: '/MisReservas',
        name: 'MisReservas',
        component: misReservas,
        meta: { title: "AutoRent - Mis Reservas", requiresAuth: true }
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
        path: '/cotizar/auto/:id',
        name: 'CotizarAuto',
        component: CotizarVehiculo,
        meta: { title: "Cotizacion Auto - AutoRent" }
    },
    {
        path: '/checkout/:id',
        name: 'Checkout',
        component: Checkout,
        meta: { title: "Checkout - AutoRent", requiresAuth: true },
    },
    {
        path: '/contrato/:id',
        name: 'Contrato',
        component: DatosContrato,
        meta: { title: "Contrato - Riviera Rentals"}
    },
    {
        path: '/success/:id',
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