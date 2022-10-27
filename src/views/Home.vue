<template>
  <div class="container">
    <p>This is the homepage</p>

    <ul class="list-group list-group-numbered">
      <li
        class="list-group-item d-flex justify-content-between align-items-start"
        aria-current="true"
        v-for="user in users"
      >
        <a href="" class="ms-2 me-auto text-decoration-none text-dark">
          <div class="fw-bold">{{ user.name }} - {{ user.age }} ans</div>
          {{ user.city }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      users: [
        {
          name: "Test",
          email: "test@gmail.com",
          age: 24,
          city: "Mumbai",
        },
        {
          name: "Test3",
          email: "test3@gmail.com",
          age: 35,
          city: "Paris",
        },
        {
          name: "Test2",
          email: "test2@gmail.com",
          age: 19,
          city: "London",
        },
      ],
    };
  },
};
</script>

<style></style>
