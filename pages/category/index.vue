<template>
  <div class="pa-6">
    <!-- <Nav /> -->
    <DataTable
      :headers="headers"
      :items="items"
      :loading="isLoading"
      :total-items="totalItems"
      :options="options"
      :showAddButton="true"
      headingName="Category"
      @update:options="getLoadData"
      @edit="openEditDialog"
      @enableDisable="openEnableDisableDialog"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "@/components/DataTable.vue";

// Define columns
const columns = ref([
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
]);

const headers: any = computed(() => [
  { title: "Category", value: "name", key: "name", width: "auto" },
  {
    title: "Sub-Category",
    value: "subCategoryDetails.name",
    key: "subCategoryDetails.name",
    width: "auto",
  },

  // { title: "Sizes", value: "size", key: "size", width: "auto" },

  { title: "Actions", value: "mixactions", width: "auto" },
]);

// Fetch API data
const rows = ref([]);

onMounted(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  rows.value = await response.json();
});
</script>
