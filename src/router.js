import Vue from "vue";
import VueRouter from "vue-router";

import home from "./components/Home/home.vue";
import contest from "./components/Contest/contest.vue";
import problemset from "./components/Problem/problemset";
import discussion from "./components/Discussion/discussion";
import problem from "./components/Problem/problem";
import status from "./components/Status/status";
import code from "./components/Status/code";
import contestProblem from "./components/Contest/contestProblem";
import contestRank from "./components/Contest/contestRank";
import UserHome from "./components/User/UserHome";

Vue.use(VueRouter);

const routes = [
  {
    path:"/home",
    component: home
  },
  {
    path:"/code",
    name:'code',
    component: code
  },
  {
    path:"/UserHome",
    name:'UserHome',
    component: UserHome
  },
  {
    path:"/contestProblem",
    name:'contestProblem',
    component: contestProblem
  },
  {
    path:"/contestRank",
    name:'contestRank',
    component: contestRank
  },
  {
    path:"/status",
    component: status
  },
  {
    path: "/contest",
    component: contest
  },
  {
    path: "/problemset",
    component: problemset
  },
  {
    path: "/discussion",
    component: discussion
  },
  {
    path: "/problem",
    name: 'problem',
    component: problem
  },
  {
    path: '/',
    redirect: '/home'
  }
]

var router =  new VueRouter({
  routes
})
export default router;
