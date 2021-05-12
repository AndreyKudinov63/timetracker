import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main", log: true },
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/time",
    name: "Time",
    meta: { layout: "main", log: true },
    component: () =>
      import("@/views/Time.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "main", log: true },
    component: () =>
      import("@/views/Profile.vue"),
  },
  // {
  //   path: "/info",
  //   name: "Info",
  //   meta: { layout: "main", log: true },
  //   component: () =>
  //     import("@/views/Info.vue"),
  // },
  // {
  //   path: "/stats",
  //   name: "Stats",
  //   meta: { layout: "main", log: true },
  //   component: () =>
  //     import("@/views/Stats.vue"),
  // },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "empty" },
    component: () => import("@/views/Login.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 })
        }, 500)
      })
    }
  },
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.log)) {
    if (!localStorage.getItem("user")) {
      return next({ path: "/login" });
    }
  }
  return next();
});

export default router
