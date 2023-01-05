<template>
  <div class="container">
    <div
      class="row justify-content-center align-content-center"
      style="height: 100vh"
    >
      <h1 class="mb-5 text-center" style="height: fit-content">Sign up</h1>
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
            @click.prevent="register()"
          >
            Register
          </button>
          <p class="text-center">
            Already a member?
            <router-link to="/login">Login</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Registration",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/register`,
        {
          email: this.email,
          password: this.password,
        }
      );
      if (response.status === 200) {
        toast.success("Votre inscription est validée !");
      } else {
        toast.error("Une erreur est survenue, veuillez réessayer");
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location = "/";
    },
  },
};
</script>
