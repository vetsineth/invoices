import VueRouter from "vue-router";
Vue.use(VueRouter);

//Pages
import Home from "../../client/pages/Home.vue";
import Invoice from "../../client/pages/Invoice.vue";
import InvoiceNew from "../../client/pages/InvoiceNew.vue";
import InvoiceEdit from "../../client/pages/InvoiceEdit.vue";
//Config router
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/invoice",
      name: "invoice",
      component: Invoice
    },
    {
      path: "/invoiceNew",
      name: "invoiceNew",
      component: InvoiceNew
    },
    {
      path: "_id/invoiceEdit",
      name: "invoiceEdit",
      component: InvoiceEdit
    }
  ]
});
export default router;
