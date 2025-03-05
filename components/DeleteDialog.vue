<template>
  <v-dialog v-model="dialogOpen" max-width="400px">
    <v-card>
      <v-card-title>Delete Item</v-card-title>
      <v-card-text> Are you sure you want to delete this item? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="primary" @click="cancel">Cancel</v-btn>
        <v-btn variant="text" class="bg-black" color="white" @click="deleteData"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any;
}>();
const emit = defineEmits<{
  (event: "delete", item: any): void;
  (event: "cancel"): void;
}>();

const dialogOpen = ref(true);
const editedItem = ref([]);
editedItem.value = props.item;

function deleteData() {
  emit("delete", editedItem.value);
  dialogOpen.value = false;
}

function cancel() {
  emit("cancel");
  dialogOpen.value = false;
}
</script>
