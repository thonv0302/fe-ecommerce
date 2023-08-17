import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE_HOME, ROUTE_AUTH } from '../constants/routers';

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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
