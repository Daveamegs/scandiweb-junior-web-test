import { createRouter, createWebHistory } from "vue-router";
import ProductListView from "../views/ProductListView.vue";

const routes = [
  {
    path: "/",
    name: "productList",
    component: ProductListView,
  },
  {
    path: "/add-product",
    name: "addProduct",
    component: () =>
      import("../views/AddProductView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
