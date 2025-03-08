<template>
  <div class="pa-6">
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
      @delete="openDeleteDialog"
    />

    <!-- Delete Dialog Component -->
    <DeleteDialog
      v-if="deleteDialog"
      :item="selectedItem"
      @delete="confirmDelete"
      @cancel="deleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "@/components/DataTable.vue";
import DeleteDialog from "@/components/DeleteDialog.vue";
import type { Category } from "~/types/categories/types";

const items = ref<Category[]>([]);
const isLoading = ref(false);
const totalItems = ref(0);
const router = useRouter();
const deleteDialog = ref(false);
const selectedItem = ref<Category | null>(null);
const enableDisableDialog = ref(false);

const { $supabase } = useNuxtApp();

// Headers for the DataTable
const headers: any = computed(() => [
  { title: "Category", value: "name", key: "name", width: "auto" },
  {
    title: "Sub-Category",
    value: "subcategory",
    key: "subcategory",
    width: "auto",
  },
  { title: "Actions", value: "actions", width: "auto" },
]);

// Fetch categories data
const getLoadData = async () => {
  isLoading.value = true;

  try {
    const { data, error, count } = await $supabase
      .from("categories")
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false });

    if (error) throw error;

    items.value = data || [];
    console.log(items.value?.[0]?.subcategory.length, "response");
    totalItems.value = count || 0;
  } catch (err) {
    console.error("❌ Fetch error:", err);
  } finally {
    isLoading.value = false;
  }
};

// Open delete dialog
const openDeleteDialog = (item: Category) => {
  selectedItem.value = item;
  deleteDialog.value = true;
};

const openEnableDisableDialog = (item: Category) => {
  selectedItem.value = item;
  enableDisableDialog.value = true;
};

function openEditDialog(edit: boolean, item: Category) {
  console.log("PRESSED");
  if (edit) {
    router.push({
      path: `/category/category-data?type=edit`,
      query: {
        id: item.id,
        type: "edit",
      },
    });
  } else {
    console.log("ADD");
    router.push({
      path: `/category/category-data?type=add`,
      query: {
        type: "add",
      },
    });
  }
}

// Confirm delete action
const confirmDelete = async (item: Category) => {
  try {
    const { error } = await $supabase
      .from("categories")
      .delete()
      .eq("id", item.id);
    if (error) throw error;

    console.log("✅ Item deleted:", item.id);
    deleteDialog.value = false;
    getLoadData(); // Refresh data
  } catch (err) {
    console.error("❌ Error deleting item:", err);
  }
};
</script>
