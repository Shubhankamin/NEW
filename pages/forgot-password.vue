<template>
  <div class="fullscreen-container d-none d-md-block">
    <div class="logo-container d-block d-xl-none">
      <v-img src="https://dummyimage.com/300/09f/fff.png" height="50"></v-img>
    </div>
    <div class="arrow"></div>
    <div class="form-Container d-block d-xl-none pt-5 pb-8">
      <v-icon class="mx-3" @click="goBack">mdi-arrow-left</v-icon>
      <h1 class="open-bold-h7 text-center py-4">Forgot Password</h1>
      <p class="mx-10 text-center mb-3">
        An Email will be sent with the OTP to reset your password
      </p>
      <div class="d-flex flex-column align-items-center">
        <div style="width: 86%" class="mt-2 mb-4 mx-auto">
          <v-text-field
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            autofocus
            v-model="emailData"
          ></v-text-field>
        </div>
        <div v-if="otpSection" class="px-2 mx-auto pb-3 d-flex ga-6">
          <div v-for="index in 4" :key="index">
            <input
              class="otp-input text-center"
              type="text"
              maxlength="1"
              v-model="otpInputs[index - 1]"
            />
          </div>
        </div>
        <v-btn
          v-if="sendOtpButton"
          @click="handleSendOtp"
          class="bg-black mx-5 rounded-button"
        >
          <h5>SEND RESET LINK</h5>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useNuxtApp } from "#app";

definePageMeta({
  layout: "custom",
});

const router = useRouter();
const { $supabase } = useNuxtApp(); // Access Supabase client
const emailData = ref("");
const otpSection = ref(false);
const sendOtpButton = ref(true);
const otpInputs = ref(["", "", "", ""]);

const goBack = () => {
  router.go(-1);
};

const handleSendOtp = async () => {
  if (!emailData.value) {
    alert("Please enter your email address.");
    return;
  }

  const { error } = await $supabase.auth.resetPasswordForEmail(emailData.value);

  if (error) {
    alert(error.message);
  } else {
    alert("Password reset email sent! Please check your inbox.");

    router.push("/login");
  }
};
</script>

<style scoped>
.otp-input {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #808080;
}
</style>
