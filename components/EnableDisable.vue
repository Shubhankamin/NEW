<template>
  <v-dialog v-model="dialogOpen" max-width="400px" persistent>
    <v-card>
      <v-card-title>
        {{ item.isEnabled ? "Enable" : "Disable" }}
        {{ props.type }}</v-card-title
      >
      <v-card-text>
        Are you sure you want to
        {{ item.isEnabled ? "Enable" : "Disable" }} this {{ props.type }}?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="primary" @click="cancel">Cancel</v-btn>
        <v-btn
          variant="text"
          class="bg-black"
          color="white"
          @click="enableDisableData"
          >{{ item.isEnabled ? "Enable" : "Disable" }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any;
  type: string;
}>();
const emit = defineEmits<{
  (event: "enableDisable", item: any): void;
  (event: "cancel"): void;
}>();

const dialogOpen = ref(true);
const editedItem = ref([]);
editedItem.value = props.item;

function enableDisableData() {
  emit("enableDisable", editedItem.value);
  dialogOpen.value = false;
}

function cancel() {
  emit("cancel");
  dialogOpen.value = false;
}
</script>
