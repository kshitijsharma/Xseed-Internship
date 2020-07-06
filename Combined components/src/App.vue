
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="'/otp'">OTP</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/tel'">Tel </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/cart'">Cart</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/creator'">Question Generator</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/test'">Test Page</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/fcreate'">Fill in the Blanks Generator</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/fblank'">Fill in the blanks Page</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>
<style src='../node_modules/bootswatch/dist/cosmo/bootstrap.css' scoped>
    /* global styles */
</style>




