<template>
  <div class="pb-16">
    <!-- Header -->
    <div class="d-flex ga-2 py-2 mx-2 bg-white justify-space-between">
      <div class="d-flex ga-2">
        <v-icon @click="goBack" class="my-auto">mdi-arrow-left</v-icon>
        <h3 class="paragraph-h1 my-auto">
          {{ type === "edit" ? "Edit " : "Add " }}{{ selectedItem.name }}
        </h3>
      </div>
      <div class="d-flex justify-end">
        <v-btn @click="clearData" variant="outlined" color="black"
          >Cancel</v-btn
        >
        <v-btn
          elevation="0"
          :loading="loadingValue"
          variant="text"
          class="bg-black"
          :disabled="loadingValue"
          @click="saveCategory"
        >
          {{ query?.type === "edit" ? "Save" : "Add" }}
        </v-btn>
      </div>
    </div>

    <v-container class="mx-3 mt-4">
      <v-row class="mt-1 justify-space-around">
        <!-- Category Name -->
        <v-col cols="4">
          <label class="mx-2 label-font">
            Category Name <span class="text-red">*</span>
          </label>
          <v-text-field
            density="compact"
            v-model="selectedItem.name"
            placeholder="Enter category name"
            variant="outlined"
            :rules="[(v) => !!v || 'Category Name is required']"
            @input="
              selectedItem.name = selectedItem.name.replace(/[^a-zA-Z\s]/g, '')
            "
          />
        </v-col>
      </v-row>

      <v-row class="justify-center border">
        <v-col cols="12">
          <div class="w-100">
            <!-- Subcategory List -->
            <div
              v-for="(subCategory, index) in subCategories"
              :key="index"
              class="pt-4 mt-4"
            >
              <v-row class="justify-space-around">
                <!-- Subcategory Name -->
                <v-col cols="4">
                  <label class="mx-2 label-font">
                    Subcategory {{ index + 1 }}
                  </label>
                  <v-text-field
                    class="my-1"
                    density="compact"
                    variant="outlined"
                    v-model="subCategories[index].name"
                    placeholder="Enter sub-category name"
                  />
                </v-col>

                <!-- Delete Button -->
                <v-col cols="1" class="d-flex align-center">
                  <v-icon
                    v-if="subCategories.length > 1"
                    color="red"
                    @click="openDeleteDialog(index)"
                  >
                    mdi-delete
                  </v-icon>
                </v-col>
              </v-row>
            </div>
          </div>

          <!-- Add Subcategory Button (Placed Outside the Loop) -->
          <div class="d-flex justify-end px-10 mt-4">
            <v-btn @click="addAnotherSubCategory" class="bg-black"
              >Add Subcategory</v-btn
            >
          </div>
        </v-col>
      </v-row>

      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="isDeleteDialogOpen" max-width="400px">
        <v-card>
          <v-card-title class="text-h5">Delete SubCategory</v-card-title>
          <v-card-text
            >Are you sure you want to delete this sub-category?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeDeleteDialog" class="cancel-btn">Cancel</v-btn>
            <v-btn @click="confirmDelete" class="confirm-btn">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = route.query.id;
const type = route?.query?.type;

const loadingValue = ref(false);
const selectedItem = ref({ name: "" });
const subCategories = ref([]);
const isDeleteDialogOpen = ref(false);
const deleteIndex = ref(null);
const { $supabase } = useNuxtApp();

// Go back function
const goBack = () => {
  router.go(-1);
};

// Clear data
const clearData = () => {
  selectedItem.value = { name: "" };
  subCategories.value = [];
};

// Fetch category data
const getCategoryData = async () => {
  if (!id || type === "add") return; // Skip fetching in "add" mode

  try {
    const { data, error } = await $supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("❌ Error fetching category data:", error);
      return;
    }

    console.log("✅ Category data fetched:", data);

    // Populate category name
    selectedItem.value.name = data.name || "";

    // Convert subcategory array of strings into objects with name property
    subCategories.value = data.subcategory
      ? data.subcategory.map((sub) => ({ name: sub })) // Convert each string to an object
      : [];

    console.log("📌 Parsed Subcategories:", subCategories.value);
  } catch (err) {
    console.error("❌ Fetch error:", err);
  }
};

// Save category
const saveCategory = async () => {
  loadingValue.value = true;

  try {
    if (type === "add") {
      // Insert a new category
      const { data, error } = await $supabase.from("categories").insert([
        {
          name: selectedItem.value.name,
          subcategory: subCategories.value.map((sub) => sub.name), // Convert to array of strings
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("❌ Error adding category:", error);
        return;
      }

      console.log("✅ Category added successfully:", data);
    } else if (type === "edit") {
      // Update existing category
      const { data, error } = await $supabase
        .from("categories")
        .update({
          name: selectedItem.value.name,
          subcategory: subCategories.value.map((sub) => sub.name),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id); // Ensure we update the correct category

      if (error) {
        console.error("❌ Error updating category:", error);
        return;
      }

      console.log("✅ Category updated successfully:", data);
    }

    // Redirect to categories list
    router.push("/category");
  } catch (err) {
    console.error("❌ Save error:", err);
  } finally {
    loadingValue.value = false;
  }
};

// Add new subcategory
const addAnotherSubCategory = () => {
  subCategories.value.push({ name: "" });
};

// Open delete dialog
const openDeleteDialog = (index) => {
  deleteIndex.value = index;
  isDeleteDialogOpen.value = true;
};

// Confirm delete subcategory
const confirmDelete = () => {
  if (deleteIndex.value !== null) {
    subCategories.value.splice(deleteIndex.value, 1);
    deleteIndex.value = null;
    isDeleteDialogOpen.value = false;
  }
};

// Close delete dialog
const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false;
};

// Fetch data when component is mounted
onMounted(() => {
  getCategoryData();
});
</script>
