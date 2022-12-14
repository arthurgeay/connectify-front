import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/style.css";

const app = createApp(App);

axios.defaults.baseURL = `${import.meta.env.VITE_API}`;

axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    }

    return Promise.reject(error);
  }
);

app.use(Toast);
app.use(router);
app.mount("#app");
