import { createRouter, createWebHistory } from 'vue-router';
import {
  ROUTE_HOME,
  ROUTE_AUTH,
  ROUTE_ADMIN,
  ROUTE_ERROR,
  ROUTE_PRODUCT,
} from '../constants/routers';
import { useAuthStore } from '../stores/authStore';
import { storeToRefs } from 'pinia';

const routes = [
  {
    path: ROUTE_HOME.home.path,
    component: () => import('../views/Home.vue'),
    name: ROUTE_HOME.home.name,
    alias: ROUTE_HOME.home.alias,
  },
  {
    path: ROUTE_AUTH.login.path,
    component: () => import('../views/auth/Login.vue'),
    name: ROUTE_AUTH.login.name,
  },
  {
    path: ROUTE_AUTH.register.path,
    component: () => import('../views/auth/Register.vue'),
    name: ROUTE_AUTH.register.name,
  },
  {
    path: ROUTE_HOME.home.path,
    component: () => import('../views/Home.vue'),
    name: ROUTE_HOME.home.name,
    alias: ROUTE_HOME.home.alias,
  },
  {
    path: ROUTE_ADMIN.home.path,
    component: () => import('../views/admin/index.vue'),
    children: [
      {
        path: '',
        name: ROUTE_ADMIN.home.name,
        component: () => import('../views/admin/home/index.vue'),
      },
    ],
    meta: ROUTE_ADMIN.home.meta,
  },
  {
    path: ROUTE_PRODUCT.list.path,
    component: () => import('../views/admin/product/list.vue'),
    name: ROUTE_PRODUCT.list.name,
  },
  {
    path: ROUTE_ADMIN.document.path,
    component: () => import('../views/admin/Document.vue'),
    name: ROUTE_ADMIN.document.name,
    meta: ROUTE_ADMIN.document.meta,
  },
  {
    path: ROUTE_ERROR.notFound.path,
    component: () => import('../views/error/NotFound.vue'),
    name: ROUTE_ERROR.notFound.name,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const NOT_ALLOWED_ROUTE_PREFIXES = [ROUTE_ADMIN.home.name, ROUTE_PRODUCT.list];

router.beforeResolve(async (to, from, next) => {
  const { isAuthenticated } = storeToRefs(useAuthStore());
  const toRouteName = to.path as string;
  if (!isAuthenticated.value && toRouteName.includes('admin')) {
    next({
      name: ROUTE_AUTH.login.name,
    });
  } else {
    next();
  }
});
