import { Meteor } from "meteor/meteor";
import Vue from "vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import DataTables from "vue-data-tables";
Vue.use(ElementUI);
Vue.use(DataTables);

import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
locale.use(lang);

import VueMeteorTracker from "vue-meteor-tracker";
Vue.use(VueMeteorTracker);

// Layouts
import AppLayout from "../../client/layouts/AppLayout.vue";

//router
import router from "./routers.js";

//Startup
Meteor.startup(() => {
  new Vue({
    router,
    ...AppLayout
  }).$mount("app");
});
