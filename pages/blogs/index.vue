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
      headingName="Blog"
      @update:options="getLoadData"
      @edit="openEditDialog"
      @delete="openDeleteDialog"
    />
    <DeleteDialog
      v-if="deleteDialog"
      :show="deleteDialog"
      :item="selectedItem"
      @confirm="confirmDelete"
      @close="deleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import DataTable from "@/components/DataTable.vue";
import DeleteDialog from "@/components/DeleteDialog.vue";

import type { Blogs } from "~/types/blogs/types";
const items = ref<Blogs[]>([]);
const isLoading = ref(false);
const totalItems = ref(0);
const router = useRouter();
const deleteDialog = ref(false);
const selectedItem = ref<Blogs | null>(null);
const enableDisableDialog = ref(false);

const headers: any = computed(() => [
  { title: "Title", value: "title", key: "title", width: "auto" },
  {
    title: "Published Date",
    value: "created_at",
    key: "created_at",
    width: "auto",
  },
  { title: "Actions", value: "actions", align: "end" },
]);

const { $supabase } = useNuxtApp();

// Fetch API data
const getLoadData = async () => {
  isLoading.value = true;

  try {
    const { data, error, count } = await $supabase
      .from("blogs") // ✅ Updated table name
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false });

    if (error) throw error;

    items.value = data || [];
    console.log(items.value, "blog res");
    totalItems.value = count || 0;
  } catch (err) {
    console.error("❌ Fetch error:", err);
  } finally {
    isLoading.value = false;
  }
};

const openDeleteDialog = (item: Blogs) => {
  selectedItem.value = item;
  deleteDialog.value = true;
};

const openEnableDisableDialog = (item: Blogs) => {
  selectedItem.value = item;
  enableDisableDialog.value = true;
};

function openEditDialog(edit: boolean, item: Blogs) {
  if (edit) {
    router.push({
      path: "/blogs/blogs-data?type=edit", // ✅ Updated path
      query: {
        id: item.id,
        type: "edit",
      },
    });
  } else {
    router.push({
      path: "/blogs/blogs-data?type=add", // ✅ Updated path
      query: {
        type: "add",
      },
    });
  }
}

// Confirm delete action
const confirmDelete = async (item: Blogs) => {
  try {
    const { error } = await $supabase
      .from("blogs") // ✅ Updated table name
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

onMounted(getLoadData);
</script>
