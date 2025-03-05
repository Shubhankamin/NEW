<template>
  <div>
    <div
      class="d-flex ga-2 py-2 mx-2 bg-white justify-space-between position-class"
    >
      <div class="d-flex ga-2">
        <v-icon class="my-auto" @click="goBack">mdi-arrow-left</v-icon>
        <h3 class="paragraph-h1 my-auto">User Name</h3>
      </div>
      <div class="d-flex ga-2">
        <v-btn variant="outlined" color="black">Cancel</v-btn>
        <v-btn
          elevation="0"
          variant="text"
          class="bg-black"
          @click="saveCustomerData"
          >Save</v-btn
        >
      </div>
    </div>
    <br />
    <v-container>
      <br />
      <label class="mx-2 label-font font-weight-bold text-subtitle-2">
        Personal information
      </label>
      <v-row class="mt-1 align-center">
        <v-col cols="4">
          <label class="mx-2 label-font"
            >Name<span class="text-red">*</span></label
          >
          <v-text-field
            density="compact"
            placeholder="Enter name"
            variant="outlined"
            v-model="customerData.name"
          />
        </v-col>
        <v-col cols="4">
          <label class="mx-2 label-font"
            >Phone number<span class="text-red">*</span></label
          >
          <v-text-field
            density="compact"
            placeholder="Enter phone number"
            variant="outlined"
            v-model="customerData.phone"
          />
        </v-col>
      </v-row>
      <v-row class="align-center">
        <v-col cols="4" class="py-0">
          <label class="mx-2 label-font"
            >Email ID <span class="text-red">*</span></label
          >
          <v-text-field
            density="compact"
            placeholder="Enter email address"
            variant="outlined"
            v-model="customerData.email"
          />
        </v-col>
        <v-col cols="4">
          <label class="mx-2 label-font">DOB</label>
          <v-text-field
            density="compact"
            placeholder="Select date"
            variant="outlined"
            v-model="customerData.dob"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="py-0">
          <label class="mx-2 label-font">Gender</label>
          <v-select
            density="compact"
            :items="['Male', 'Female', 'Other']"
            variant="outlined"
            v-model="customerData.gender"
          />
        </v-col>
      </v-row>
      <v-divider class="my-2"></v-divider>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = route.query.id;
const type = route.query.type; // Check if it's "add" mode
const { $supabase } = useNuxtApp();

const originalData = ref({});
const customerData = ref({
  name: "",
  phone: "",
  email: "",
  dob: "",
  gender: "",
});

// Disable "Save" button if no changes (only for edit mode)
const isChanged = computed(() => {
  return (
    type === "add" ||
    JSON.stringify(customerData.value) !== JSON.stringify(originalData.value)
  );
});

const goBack = () => {
  router.back();
};

// Fetch single customer data only if editing
const getCustomerData = async () => {
  if (!id || type === "add") return; // Skip fetching in "add" mode

  try {
    const { data, error } = await $supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("❌ Error fetching customer data:", error);
      return;
    }

    console.log("✅ Customer data fetched:", data);

    originalData.value = {
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
      dob: data.dob || "",
      gender: capitalizeFirstLetter(data.gender?.trim() || ""),
    };

    customerData.value = { ...originalData.value };
  } catch (err) {
    console.error("❌ Fetch error:", err);
  }
};

// Function to insert or update customer data
const saveCustomerData = async () => {
  if (!isChanged.value) {
    alert("No changes detected!");
    return;
  }

  try {
    if (type === "add") {
      // Insert new customer
      const { error } = await $supabase.from("customers").insert({
        name: customerData.value.name,
        phone: customerData.value.phone,
        email: customerData.value.email,
        dob: customerData.value.dob,
        gender: customerData.value.gender,
      });

      if (error) {
        console.error("❌ Error adding customer:", error);
        return;
      }

      console.log("✅ New customer added successfully!");
      alert("New customer added successfully!");
      router.push("/customers"); // Redirect after adding
    } else {
      // Update existing customer
      const { error } = await $supabase
        .from("customers")
        .update({
          name: customerData.value.name,
          phone: customerData.value.phone,
          email: customerData.value.email,
          dob: customerData.value.dob,
          gender: customerData.value.gender,
        })
        .eq("id", id);

      if (error) {
        console.error("❌ Error updating customer data:", error);
        return;
      }

      console.log("✅ Customer data updated successfully!");
      alert("Customer data updated successfully!");

      originalData.value = { ...customerData.value };
    }
  } catch (err) {
    console.error("❌ Save error:", err);
  }
};

const capitalizeFirstLetter = (str) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
};

onMounted(() => {
  getCustomerData();
});
</script>
