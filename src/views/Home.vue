<template>
  <div v-if="users.length > 0">
    <div class="d-flex justify-between mb-5">
      <p>Liste des utilisateurs</p>
      <button class="w-fit" @click="$router.push(`/users/create`)">
        Ajouter un utilisateur
      </button>
    </div>

    <article
      class="d-flex justify-between"
      :aria-busy="this.isLoading"
      aria-current="true"
      v-for="user in users"
      v-bind:key="user"
    >
      <a>
        <div>{{ user.fullname }} - {{ user.age }} ans</div>
        {{ user.city }}
      </a>
      <div class="d-flex gap-4">
        <button @click="$router.push(`/activities/${user._id}`)">
          Activités
        </button>
        <button
          class="outline contrast"
          @click="$router.push(`/users/${user._id}/update`)"
        >
          Modifier
        </button>
        <button class="outline secondary" @click="deleteUser(user._id)">
          Supprimer
        </button>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
var data =
  '<?xml version="1.0" encoding="utf-8"?>\n<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\n  <soap12:Body>\n    <CelsiusToFahrenheit xmlns="https://www.w3schools.com/xml/">\n      <Celsius>20</Celsius>\n    </CelsiusToFahrenheit>\n  </soap12:Body>\n</soap12:Envelope>';

var config = {
  method: "post",
  url: "https://www.w3schools.com/xml/tempconvert.asmx",
  headers: {
    "Content-Type": "application/soap+xml; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

export default {
  name: "Home",
  data() {
    return {
      users: [],
      isLoading: false,
    };
  },
  methods: {
    async getUsers() {
      this.isLoading = true;

      const response = await axios.get(`${import.meta.env.VITE_API}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      this.users = response.data;
      this.isLoading = false;
    },

    async deleteUser(userId) {
      await axios
        .delete(`${import.meta.env.VITE_API}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(async (response) => {
          await this.getUsers();
        });
    },

    async soapApiCall() {
      await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
      return this.$router.push("/login");
    }
    this.getUsers();
    this.soapApiCall();
  },
};
</script>
