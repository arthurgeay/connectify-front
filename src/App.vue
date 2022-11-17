<template>
  <div id="nav">
    <nav class="navbar fixed-top navbar-expand-xl bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-nav mr-auto">
          <router-link to="/" class="nav-item nav-link">Accueil</router-link>
          <router-link to="/profile" class="nav-item nav-link"
            >Profil</router-link
          >
        </div>
        <ul class="navbar-nav mr-auto">
          <div class="d-flex flex-row-reverse">
            <form class="d-flex" role="logout">
              <button class="btn btn-danger" type="submit">Déconnexion</button>
            </form>
          </div>
        </ul>
      </div>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script></script>

<style>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background: rgb(20, 123, 220);
  border-radius: 0.4rem;
}
</style>
