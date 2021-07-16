import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import Taskmanage from "../components/Task-management/Taskmanage.vue"
import Eazynote from "../components/EazyNote/Eazynote.vue"
import Notebook from "../components/Notebook/Notebook.vue"
import Calendar from "../components/Calendar/Calendar.vue"
Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/home" }, //redirec / 導向 /login
  { path: "/home",component: Home,
    children: [
    { path: "/welcome",component: Welcome}, //我們要在組件home裡 再渲染一個組件，利用 佔位福
    { path: "/taskmanage",component: Taskmanage},
    { path: "/notebook",component: Notebook},
    { path: "/eazynote",component: Eazynote},
    { path: "/calendar",component: Calendar},
    ]  
  } //我們在home裡 還有一個組件 之後應該會有很多組件

];

const router = new VueRouter({
  routes,
});

router.beforeEach((to,from,next) => {
  // to 要訪問的路徑
  // from 從哪裡來
  // next() : 1.為空 代表 訪問到 to  2.不為空 強制跳轉到該路徑
  if (to.path === '/home' ) return next()
  
  // const tokenStr = window.sessionStorage.getItem('token');
  // if (!tokenStr) next('/home');

  next()
})

export default router;
