<template>
  <h1>Sign up</h1>
  <form>
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" v-model="email" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
    <small id="emailHelp">We'll never share your email with anyone else.</small>

    <label for="exampleInputPassword1">Password</label>
    <input type="password" v-model="password" id="exampleInputPassword1" required/>
    
    <button type="submit" v-on:click.prevent="register()">Register</button>
    <p>
      Already a member?
      <router-link to="/login">Login</router-link>
    </p>
  </form>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const options = {
  position: "top-right",

  closeButton: false,
  hideProgressBar: true,
  closeOnClick: true,
};

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
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API}/register`,
          {
            email: this.email,
            password: this.password,
          }
        );

        toast.success("Votre inscription est validée !", options);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        window.location = "/";
      } catch (error) {
        toast.error("Une erreur est survenue, veuillez réessayer", options);
      }
    },
  },
};
</script>
