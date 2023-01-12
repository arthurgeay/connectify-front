<template>
  <h1>Sign in</h1>
  <form>
    <label for="exampleInputEmail1">Email address</label>
    <input
      type="email"
      v-model="email"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      required
    />
    <small id="emailHelp">We'll never share your email with anyone else.</small>

    <label for="exampleInputPassword1">Password</label>
    <input
      type="password"
      autocomplete="on"
      v-model="password"
      id="exampleInputPassword1"
      required
    />

    <button type="submit" v-on:click.prevent="login()">Login</button>
    <p>
      Not a member?
      <router-link to="/registration">Register</router-link>
    </p>
  </form>
</template>

<script>
import axios from "axios";
import { onMounted } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const options = {
  position: "top-right",

  closeButton: false,
  hideProgressBar: true,
  closeOnClick: true,
};

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API}/login`, {
          email: this.email,
          password: this.password,
        });
        if (response.status === 200 || response.status === 201) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          window.location = "/";
        }
      } catch (error) {
        console.log(error);
        toast.error("Une erreur est survenue, veuillez réessayer", options);
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location = "/";
    },
  },
};
</script>
<style>
.Vue-Toastification__toastCustom {
  max-height: 300px !important;
}
</style>
