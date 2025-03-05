<template>
  <v-app id="inspire">
    <v-main>
      <!-- Tab Screens -->
      <div class="d-block d-lg-none position-class">
        <!-- <v-img src="/backgrounds/overlay.svg" width="550"> </v-img> -->
      </div>

      <!-- Laptop Screens -->
      <div class="d-none d-lg-block d-xl-none wrapper">
        <!-- <v-img src="/backgrounds/overlay.svg" width="700"> </v-img> -->
      </div>
      <!-- Large screens -->

      <div class="d-none d-xl-block position-class">
        <!-- <v-img src="/backgrounds/overlay.svg" width="1100"> </v-img> -->
      </div>
      <div>
        <slot />
      </div>

      <div class="d-block d-md-none mobile-class">
        <h1 class="Inter-Bold-h4 text-center position-class-new">
          Sorry..this software is not optimized for this screen.Please use
          minimum screen resolution of (1024x768).
        </h1>
        <div class="loading-wave">
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(null);
const activeButton = ref("Dashboard");
const items = [{ title: "Edit Profile" }, { title: "Logout" }];
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 999;
  left: 20px;
  max-width: 30vw;
  bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  color: #ffffff;
  border-left: 5px solid;
}

.mobile-class {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.position-class {
  position: absolute;
  bottom: 0%;
}

.position-class-new {
  position: absolute;
  top: 40%;
  left: 2%;
}

.wrapper {
  position: absolute;
  bottom: 0%;
}

.btn {
  text-transform: unset !important;
  background-color: #ffffff;
  color: #000000;
  margin-top: 5px;
}
.btn.active {
  background-color: #000000;
  color: #ffffff;
}

.v-btn {
  justify-content: start;
}

.v-btn span {
  color: #000000;
}
.v-btn.active span {
  color: #ffffff;
}

.loading-wave {
  position: absolute;
  top: 45%;
  left: 20%;
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.loading-bar {
  width: 20px;
  height: 10px;
  margin: 0 5px;
  background-color: #2257bf;
  border-radius: 5px;
  animation: loading-wave-animation 1s ease-in-out infinite;
}

.loading-bar:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-bar:nth-child(3) {
  animation-delay: 0.2s;
}

.loading-bar:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes loading-wave-animation {
  0% {
    height: 10px;
  }

  50% {
    height: 50px;
  }

  100% {
    height: 10px;
  }
}
.logo-class {
  -webkit-animation: spin 5s infinite;
  animation: spin 5s infinite;
  animation-delay: 10s;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotateY(0deg);
  }
  to {
    -webkit-transform: rotateY(-360deg);
  }
}

@keyframes spin {
  from {
    -moz-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }

  to {
    -moz-transform: rotateY(-360deg);
    -ms-transform: rotateY(-360deg);
    transform: rotateY(-360deg);
  }
}
.bg-wallpaper {
  width: 100%;
  height: 100vh;
  background: url("/images/background-2.jpeg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
}
</style>
