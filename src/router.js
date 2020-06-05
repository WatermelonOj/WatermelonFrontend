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
import menu from "./components/Menu/menu";
import login from "./components/Login/login";
import register from "./components/Register/register";
import Watermelon from "./components/Welcome/Watermelon";
import disHome from "./components/Discussion/disHome";
import write from "./components/Discussion/write";
import about from "./components/Other/about";
import comment from "./components/Discussion/comment";

Vue.use(VueRouter);

const routes = [
  {
    path:"/login",
    name:'login',
    component: login
  },
  {
    path:"/register",
    name:'register',
    component: register
  },
  {
    path:"/Watermelon",
    name:'Watermelon',
    component: Watermelon
  },
  {
    path:"/menu",
    name:'menu',
    redirect:'/home',
    component: menu,
    children: [
      {
        path:"/home",
        name:'home',
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
        name:'status',
        component: status
      },
      {
        path: "/contest",
        name:'contest',
        component: contest
      },
      {
        path: "/problemset",
        name:'problemset',
        component: problemset
      },
      {
        path: "/discussion",
        name:'discussion',
        component: discussion
      },
      {
        path: "/problem",
        name: 'problem',
        component: problem
      }
      ,
      {
        path: "/disHome",
        name: 'disHome',
        component: disHome
      },
      {
        path: "/write",
        name: 'write',
        component: write
      },
      {
        path: "/about",
        name: 'about',
        component: about
      },
      {
        path: "/comment",
        name: 'comment',
        component: comment
      }
      ]
  },
  {
    path: "/",
    redirect:'/Watermelon'
  }
]

var router =  new VueRouter({
  routes
})
export default router;
