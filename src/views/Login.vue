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
            v-on:click="login()"
          >
            Login
          </button>
          <p class="text-center">
            Not a member?
            <a @click="$router.push(`/registration`)" class="link">Register</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.input.email != "" && this.input.password != "") {
        if (
          this.input.email == this.$parent.mockAccount.email &&
          this.input.password == this.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ email: "secure" });
        } else {
          console.log("The email and / or password is incorrect");
        }
      } else {
        console.log("An email and password must be present");
      }
    },
  },
};
</script>
