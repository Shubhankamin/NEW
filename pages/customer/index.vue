<template>
  <div class="pa-6">
    <DataTable
      :headers="headers"
      :items="items"
      :loading="isLoading"
      :total-items="totalItems"
      :options="options"
      :showAddButton="true"
      headingName="Customer"
      @update:options="getLoadData"
      @edit="openEditDialog"
      @enableDisable="openEnableDisableDialog"
    />

    <EnableDisable
      v-if="enableDisableDialog"
      :item="selectedItem"
      type="Customer"
      @enableDisable="saveItemEnableDisable"
      @cancel="closeEditDialog"
    />
    <DeleteDialog
      v-if="deleteDialog"
      :item="selectedItem"
      @delete="saveItem"
      @cancel="closeEditDialog"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import DataTable from "@/components/DataTable.vue";
import type { Customers } from "@/types/customerCollection/types";
const deleteDialog = ref(false);
const enableDisableDialog = ref(false);
const selectedItem = ref<Customers | null>(null);
const isLoading = ref(false);
const totalItems = ref(0);
const items = ref<Customers[]>([]);
const router = useRouter();
// Get Supabase instance
const { $supabase } = useNuxtApp();

const getLoadData = async () => {
  isLoading.value = true;

  try {
    const { data, error, count } = await $supabase
      .from("customers")
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false }); // Fetch latest first

    if (error) {
      console.error("❌ Error fetching customers:", error);
      throw error;
    }

    console.log("✅ Customers fetched:", data);

    items.value = data || [];
    totalItems.value = count || 0;
  } catch (err) {
    console.error("❌ Fetch error:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getLoadData();
});

const openEnableDisableDialog = (item: Customers) => {
  selectedItem.value = item;
  enableDisableDialog.value = true;
};

const openDeleteDialog = (item: Customers) => {
  selectedItem.value = item;
  deleteDialog.value = true;
};

function openEditDialog(edit: boolean, item: Customers) {
  console.log("PRESSED");
  if (edit) {
    router.push({
      path: `/customer/customer-data?type=edit`,
      query: {
        id: item.id,
        type: "edit",
      },
    });
  } else {
    console.log("ADD");
    router.push({
      path: `/customer/customer-data?type=add`,
      query: {
        type: "add",
      },
    });
  }
}

const saveItemEnableDisable = async (item: Customers) => {
  try {
    const { error } = await $supabase
      .from("customers")
      .update({ isEnabled: !item.isEnabled })
      .eq("id", item.id);

    if (error) {
      console.error("❌ Error updating customer:", error);
      return;
    }

    console.log("✅ Customer enable/disable updated:", item);
    alert(`Customer ${item.isEnabled ? "enabled" : "disabled"} successfully`);

    enableDisableDialog.value = false; // Close dialog
    getLoadData(); // Refresh data
  } catch (err) {
    console.error("❌ Update error:", err);
  }
};
const closeEditDialog = () => {
  enableDisableDialog.value = false;
  deleteDialog.value = false;
};
const headers = computed(() => [
  { title: "Name", value: "name", key: "name", width: "auto" },
  { title: "Email", value: "email", key: "email", width: "auto" },
  { title: "Phone", value: "phone", key: "phone", width: "auto" },
  { title: "Actions", value: "isEnabled", width: "auto" },
]);
</script>
