<template>
  <div class="container">
    <div
      class="row justify-content-center align-content-center"
      style="height: 100vh"
    >
      <h1 class="mb-5 text-center" style="height: fit-content">Sign in</h1>
      <form class="text-start w-50">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="d-flex flex-column">
          <button
            type="submit"
            class="btn btn-primary mb-3"
            v-on:click.prevent="login()"
          >
            Login
          </button>
          <p class="text-center">
            Not a member?
            <router-link to="/registration">Register</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
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
        if (response.status === 200) {
          console.log("success !!!");
          toast.success("Vous êtes connecté", options);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          // this.$router.push("/login");
          window.location = "/";
        }
      } catch (error) {
        console.log(error);
        toast.error("Une erreur est survenue, veuillez réessayer", options);
      }
    },
  },
  mounted() {},
};
</script>
<style>
.Vue-Toastification__toastCustom {
  max-height: 300px !important;
}
</style>
