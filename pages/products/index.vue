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
  { title: "Name", value: "name", key: "name", width: "auto" },
  {
    title: "Category",
    value: "categoryDetails.name",
    key: "categoryDetails.name",
    width: "auto",
  },

  { title: "Price", value: "totalAmount", key: "totalAmount", width: "auto" },

  { title: "Featured", value: "isFeatured", key: "isFeatured", width: "auto" },
  { title: "Actions", value: "mixactions" },
]);

// Fetch API data
const rows = ref([]);

onMounted(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  rows.value = await response.json();
});
</script>

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
      headingName="Product"
      @update:options="getLoadData"
      @edit="openEditDialog"
      @enableDisable="openEnableDisableDialog"
    />
  </div>
</template>
