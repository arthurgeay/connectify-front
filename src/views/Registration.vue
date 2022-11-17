<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="mb-5">Sign up</h1>
      <form class="text-start w-50">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
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
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="d-flex flex-column">
          <button type="submit" class="btn btn-primary mb-3">Register</button>
          <p>Already a member? <a @click="$router.push(`/login`)" class="link">Login</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script></script>
