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

        <!-- ✅ Select Image Button -->
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
                @change="handleImageSelection"
                accept="image/*"
                hidden
              />
            </div>

            <!-- Image Preview -->
            <div v-if="selectedItem.image" class="image-preview">
              <img :src="selectedItem.image" alt="Preview" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, onMounted, computed, defineAsyncComponent } from "vue";

const QuillEditor = defineAsyncComponent(() =>
  import("@vueup/vue-quill").then((module) => module.QuillEditor)
);

const router = useRouter();
const route = useRoute();
const { $supabase } = useNuxtApp();

const id = route.query.id as string;
const type = route.query.type as string;

const isEditMode = computed(() => type === "edit");

const loadingButton = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const file = ref<File | null>(null); // ✅ Store selected file

const selectedItem = ref({
  title: "",
  date: new Date().toISOString().slice(0, 19),
  description: "",
  image: "", // ✅ Store image URL
});

const goBack = () => {
  router.back();
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

// ✅ Fetch Blog Data
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
        date: data.created_at ? new Date(data.created_at).toISOString() : "",
        description: data.description || "",
        image: data.image || "",
      };
    }
  } catch (err) {
    console.error("❌ Fetch error:", err);
  }
};

// ✅ Select Image (But Don't Upload Yet)
const handleImageSelection = (event: Event) => {
  const selectedFile = (event.target as HTMLInputElement).files?.[0];
  if (!selectedFile) return;

  file.value = selectedFile; // ✅ Store file but don't upload yet

  // ✅ Show preview
  selectedItem.value.image = URL.createObjectURL(selectedFile);
};

// ✅ Upload Image When Saving Blog
const uploadImageToSupabase = async () => {
  if (!file.value) return null; // If no new image, return null

  const filePath = `blog-images/${file.value.name}`;

  try {
    const { data, error } = await $supabase.storage
      .from("blogs")
      .upload(filePath, file.value, { upsert: true });

    if (error) throw error;

    return $supabase.storage.from("blogs").getPublicUrl(filePath).publicUrl;
  } catch (error) {
    console.error("❌ Image Upload Error:", error);
    alert("Failed to upload image.");
    return null;
  }
};

// ✅ Save Blog (Upload Image First)
const handleSaveBlog = async () => {
  if (!selectedItem.value.title.trim()) {
    alert("Please enter the title.");
    return;
  }
  if (!selectedItem.value.description.trim()) {
    alert("Please enter the description.");
    return;
  }

  loadingButton.value = true;

  try {
    if (file.value) {
      const uploadedImageUrl = await uploadImageToSupabase();
      if (uploadedImageUrl) {
        selectedItem.value.image = uploadedImageUrl;
      }
    }

    if (isEditMode.value) {
      // ✅ Update blog
      const { error } = await $supabase
        .from("blogs")
        .update({
          title: selectedItem.value.title,
          description: selectedItem.value.description,
          image: selectedItem.value.image,
          updated_at: new Date().toISOString(), // ✅ Update timestamp
        })
        .eq("id", id);

      if (error) throw error;
      alert("Blog updated successfully!");
    } else {
      // ✅ Insert new blog
      const { error } = await $supabase.from("blogs").insert([
        {
          title: selectedItem.value.title,
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
