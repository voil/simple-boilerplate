import RouterService from '@/services/routerService';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/authorization/login',
    name: 'LoginPage',
    meta: {
      authentication: false,
      authorizationType: 'login',
    },
    component: () => import('@/atomic/pages/LoginPage/index.vue'),
  },
  {
    path: '/panel/dashboard',
    name: 'DashboardPage',
    meta: {
      authentication: true,
      authorizationType: 'after',
    },
    component: () => import('@/atomic/pages/DashboardPage/index.vue'),
  },
  {
    path: '/panel/projects',
    name: 'ProjectsPage',
    meta: {
      authentication: true,
      authorizationType: 'after',
    },
    component: () => import('@/atomic/pages/ProjectsPage/index.vue'),
  },
  {
    path: '/panel/users',
    name: 'UsersPage',
    meta: {
      authentication: true,
      authorizationType: 'after',
    },
    component: () => import('@/atomic/pages/UsersPage/index.vue'),
  },
  {
    path: '/panel/teams',
    name: 'TeamsPage',
    meta: {
      authentication: true,
      authorizationType: 'after',
    },
    component: () => import('@/atomic/pages/TeamsPage/index.vue'),
  },
  {
    path: '/panel/privilages',
    name: 'PrivilagesPage',
    meta: {
      authentication: true,
      authorizationType: 'after',
    },
    component: () => import('@/atomic/pages/PrivilagesPage/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

RouterService.checkAuthentication(router);

export default router;
