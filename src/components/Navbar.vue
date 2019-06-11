<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div class="navbar-brand">
          <img width="130" src="https://web.privy.id/css/login/img/logo-privy.png" alt="logo">
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link :to="{ name: 'product' }" class="nav-link">Product</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'category' }" class="nav-link">Category</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
                Profile
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a v-on:click="logout" class="dropdown-item">Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    logout: function() {
      this.$store.dispatch('auth/logout');
      return this.$router.push({ name: 'auth-login' });
    }
  }
}
</script>