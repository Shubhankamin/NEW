<script setup></script>

<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>My Navbar</v-app-bar-title>
      <v-btn color="white" text>Login</v-btn>
    </v-app-bar>

    <v-main class="pa-6">
      <slot />
    </v-main>
  </v-app>
</template>
