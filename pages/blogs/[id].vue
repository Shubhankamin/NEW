<template>
  <div>
    <div
      class="d-flex ga-2 pt-2 mx-2 bg-white justify-space-between position-class"
    >
      <div class="d-flex ga-2">
        <v-icon @click="goBack" class="my-auto">mdi-arrow-left</v-icon>
        <h3 v-if="isEditMode" class="paragraph-h1 my-auto">Edit Blog</h3>
        <h3 v-else class="paragraph-h1 my-auto">Add Blog</h3>
      </div>
      <div class="d-flex ga-2">
        <v-btn variant="outlined" color="black" @click="goBack">Cancel</v-btn>
        <v-btn
          elevation="0"
          variant="text"
          class="bg-black"
          :loading="loadingButton"
          :disabled="loadingButton"
          @click="handleSaveBlog"
        >
          {{ isEditMode ? "Update" : "Add" }}
        </v-btn>
      </div>
    </div>
    <br />
    <v-container class="pt-0 py-0">
      <br />
      <v-row>
        <v-col cols="5">
          <label class="mx-2 label-font"
            >Title<span class="text-red">*</span></label
          >
          <v-text-field
            placeholder="Enter title here"
            density="compact"
            variant="outlined"
            v-model="selectedItem.title"
          />
        </v-col>
        <v-col cols="5">
          <label class="mx-2 label-font"
            >Publishing Date<span class="text-red">*</span></label
          >
          <VueDatePicker
            placeholder="Date & time"
            :max-date="new Date()"
            :is-24="false"
            :teleport="true"
            v-model="selectedItem.date"
            enable-seconds
            :enable-time-picker="false"
            :readonly="true"
            format="dd/MM/yyyy"
          />
        </v-col>

        <v-col cols="10">
          <ClientOnly>
            <label class="mx-2 label-font"
              >Description<span class="text-red">*</span></label
            >
            <QuillEditor
              contentType="html"
              v-model:content="selectedItem.description"
              theme="snow"
            />
          </ClientOnly>
        </v-col>

        <!-- ✅ Image Upload Field -->
        <v-col cols="10" class="mt-16">
          <p class="mx-2 label-font">
            Upload Image<span class="text-red">*</span>
          </p>
          <div class="upload-container">
            <div class="upload-box" @click="triggerFileInput">
              <button class="upload-button">Select Image</button>
              <p class="upload-text">or drag & drop here</p>
              <input
                type="file"
                ref="fileInput"
                @change="handleImageUpload"
                accept="image/*"
                hidden
              />
            </div>

            <!-- Image Preview -->
            <div v-if="selectedItem.image" class="image-preview">
              <img :src="selectedItem.image" alt="Preview" />
            </div>

            <div class="d-flex justify-center mt-4">
              <v-btn
                @click="uploadImage"
                :loading="loadingImage"
                color="primary"
                >Upload</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const router = useRouter();
const route = useRoute();
const { $supabase } = useNuxtApp();

const id = route.query.id as string;
const type = route.query.type as string;

const isEditMode = computed(() => type === "edit");

const loadingButton = ref(false);
const loadingImage = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const file = ref<File | null>(null);

const selectedItem = ref({
  title: "",
  date: new Date().toISOString().slice(0, 19),
  description: "",
  image: "", // Store image URL
});

const goBack = () => {
  router.back();
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

// ✅ Fetch Blog Data from Supabase
const fetchBlogById = async () => {
  if (!isEditMode.value || !id) return;

  try {
    const { data, error } = await $supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("❌ Error fetching blog data:", error);
      return;
    }

    if (data) {
      selectedItem.value = {
        title: data.title || "",
        date: data.date
          ? new Date(data.date).toISOString().slice(0, 19)
          : new Date().toISOString().slice(0, 19),
        description: data.description || "",
        image: data.image || "",
      };
    }
  } catch (err) {
    console.error("❌ Fetch error:", err);
  }
};

// ✅ Image Upload to Supabase Storage
const handleImageUpload = (event: Event) => {
  const uploadedFile = (event.target as HTMLInputElement).files?.[0];
  if (!uploadedFile) return;
  file.value = uploadedFile;
};

// ✅ Upload Image to Supabase Storage
const uploadImage = async () => {
  if (!file.value) {
    alert("Please select an image.");
    return;
  }

  loadingImage.value = true;
  const filePath = `blog-images/${file.value.name}`;

  try {
    const { data, error } = await $supabase.storage
      .from("blogs")
      .upload(filePath, file.value, { upsert: true });

    if (error) throw error;

    // ✅ Get Public URL
    selectedItem.value.image = $supabase.storage
      .from("blogs")
      .getPublicUrl(filePath).publicUrl;

    alert("Image uploaded successfully!");
  } catch (error) {
    console.error("❌ Image Upload Error:", error);
    alert("Failed to upload image.");
  } finally {
    loadingImage.value = false;
  }
};

// ✅ Save Blog (Update or Add)
const handleSaveBlog = async () => {
  if (!selectedItem.value.title.trim()) {
    alert("Please enter the title.");
    return;
  }
  if (!selectedItem.value.description.trim()) {
    alert("Please enter the description.");
    return;
  }
  if (!selectedItem.value.image) {
    alert("Please upload an image.");
    return;
  }

  loadingButton.value = true;

  try {
    if (isEditMode.value) {
      // Update existing blog
      const { error } = await $supabase
        .from("blogs")
        .update({
          title: selectedItem.value.title,
          date: selectedItem.value.date,
          description: selectedItem.value.description,
          image: selectedItem.value.image,
        })
        .eq("id", id);

      if (error) throw error;
      alert("Blog updated successfully!");
    } else {
      // Insert new blog
      const { error } = await $supabase.from("blogs").insert([
        {
          title: selectedItem.value.title,
          date: selectedItem.value.date,
          description: selectedItem.value.description,
          image: selectedItem.value.image,
        },
      ]);

      if (error) throw error;
      alert("Blog added successfully!");
    }

    router.back();
  } catch (error) {
    console.error("❌ Save error:", error);
    alert("Failed to save blog.");
  } finally {
    loadingButton.value = false;
  }
};

// ✅ Fetch blog data on mount
onMounted(() => {
  fetchBlogById();
});
</script>
<style scoped>
.upload-container {
  text-align: center;
}

.upload-box {
  border: 2px dashed #ccc;
  padding: 20px;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  max-width: 400px;
  margin: auto;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.upload-box:hover {
  border-color: #007bff;
}

.upload-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.upload-text {
  color: #777;
  margin-top: 8px;
}

.info-text {
  font-size: 14px;
  color: #555;
  margin-top: 10px;
}
</style>
