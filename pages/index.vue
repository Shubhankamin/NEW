<script setup>
import { ref, onMounted } from "vue";
import DataTable from "@/components/DataTable.vue";

// Define columns
const columns = ref([
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
]);

// Fetch API data
const rows = ref([]);

onMounted(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  rows.value = await response.json();
});
</script>

<template>
  <div class="p-6">
    <!-- <Nav /> -->
    <DataTable :columns="columns" :rows="rows">
      <!-- Custom slot example -->
      <template #name="{ row }">
        <span class="font-semibold text-blue-600">{{ row.name }}</span>
      </template>
    </DataTable>
  </div>
</template>
