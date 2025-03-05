<template>
  <div>
    <div
      class="d-flex ga-2 py-2 mx-2 bg-white justify-space-between position-class"
    >
      <div class="d-flex ga-2"></div>
      <div class="d-flex ga-2">
        <v-btn variant="outlined" color="black">Cancel</v-btn>
        <v-btn elevation="0" variant="text" class="bg-gray">Save</v-btn>
      </div>
    </div>

    <br /><br />

    <v-container>
      <v-row>
        <v-col cols="4">
          <label class="mx-2 label-font"
            >Company name <span class="text-red">*</span></label
          >
          <v-text-field
            class="my-1"
            variant="outlined"
            density="compact"
            placeholder="Enter company name"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <label class="mx-2 label-font"
            >Phone number<span class="text-red">*</span></label
          >
          <PhoneInput class="mb-6 w-100" />
        </v-col>
        <v-col cols="4">
          <label class="mx-2 label-font"
            >Email Address <span class="text-red">*</span></label
          >
          <v-text-field
            class=""
            variant="outlined"
            density="compact"
            placeholder="Enter email"
          ></v-text-field>
        </v-col>
      </v-row>

      <h4 class="mb-3">Billing Address</h4>

      <v-row>
        <v-col cols="4">
          <label class="mx-2 label-font"
            >Address Line 1 <span class="text-red">*</span></label
          >
          <v-text-field
            class="my-1"
            variant="outlined"
            density="compact"
            placeholder="Enter Address Line 1"
          ></v-text-field>

          <label class="mx-2 label-font"
            >City <span class="text-red">*</span></label
          >
          <v-text-field
            class="my-1"
            variant="outlined"
            density="compact"
            placeholder="Enter city"
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <label class="mx-2 label-font"
            >State <span class="text-red">*</span></label
          >
          <v-autocomplete
            placeholder="Select..."
            variant="outlined"
            density="compact"
            class="mt-1"
          />

          <label class="mx-2 label-font"
            >Pincode <span class="text-red">*</span></label
          >
          <v-text-field
            class="mt-2"
            variant="outlined"
            density="compact"
            placeholder="Enter pincode"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-divider :thickness="2" class="mb-5"></v-divider>

      <h4 class="mb-3">Special Holidays</h4>

      <v-row>
        <v-col cols="4">
          <p class="mx-2 label-font mt-5">Date</p>
          <VueDatePicker
            placeholder="Date & time"
            class="my-1"
            format="dd/MM/yyyy"
          />
        </v-col>
        <v-col cols="4" class="pt-8">
          <label class="mx-2 label-font"
            >Title <span class="text-red">*</span></label
          >
          <v-text-field
            variant="outlined"
            density="compact"
            placeholder="Enter title"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.bg-gray {
  background-color: #808080 !important;
  color: #fff !important;
}

.position-class {
  position: fixed;
  width: 80%;
  z-index: 99;
}
</style>
