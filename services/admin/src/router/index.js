import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

import AdminLogin from '@/pages/Login.vue'
import AdminDashboard from '@/pages/dashboard.vue'
import AdminCars from '@/pages/cars.vue'
import AdminCarsForm from '@/pages/cars-form.vue'
import AdminUserForm from '@/pages/user-form.vue'
import AdminReservations from '@/pages/reservations.vue'
import AdminUsers from '@/pages/users.vue'
import AdminReservasDetails from '@/pages/reservacion-detail.vue'

const routes = [
    // Admin Routes
  {
    path: "/admin/login",
    component: AdminLogin,
    meta: { title: "Login - Panel Admin" },
  },
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    meta: { title: "Dashboard - Admin", requiresAuth: true }
  },
  {
    path: "/admin/cars",
    component: AdminCars,
    meta: { title: "Gestión de Autos - Admin", requiresAuth: true },
  },
  {
    path: "/admin/cars-form",
    component: AdminCarsForm,
    meta: { title: "Crear Auto - Admin", requiresAuth: true, permission: "auto:create" },
  },
  {
    path: "/admin/cars-form/:id",
    component: AdminCarsForm,
    meta: { title: "Editar Auto - Admin", requiresAuth: true, permission: "auto:update" },
  },
  {
    path: "/admin/user-form",
    component: AdminUserForm,
    meta: { title: "Crear Usuario - Admin", requiresAuth: true, permission: "auto:create" }
  },
  {
    path: "/admin/user-form/:id",
    component: AdminUserForm,
    meta: { title: "Editar Usuario - Admin", requiresAuth: true, permission: "auto:update" }
  },
  {
    path: "/admin/reservations",
    component: AdminReservations,
    meta: { title: "Reservaciones - Admin", requiresAuth: true },
  },
  {
    path: "/admin/reservations/:id",
    component: AdminReservasDetails,
    meta: { title: "Reservacion Detallada - Admin", requiresAuth: true },
  },
  {
    path: "/admin/users",
    component: AdminUsers,
    meta: { title: "Usuarios - Admin", requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/admin/login",
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title) || "Admin AutoRent"
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.token) {
    return next("/admin/login");
  }

  next();
});


export default router