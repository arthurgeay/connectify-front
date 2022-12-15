<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="mb-5">Sign in</h1>
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
      const response = await axios.post(`/login`, {
        email: this.email,
        password: this.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location = "/";
    },
  },
};
</script>
