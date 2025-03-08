<template>
  <div>
    <div class="d-flex px-2 w-100 justify-end ga-5 absolute-class mb-10">
      <p
        v-if="showAddButton"
        @click="$emit('edit', false)"
        variant="text"
        class="bg-black px-2 py-1 rounded cursor-pointer"
      >
        Add {{ headingName }}
      </p>
    </div>

    <v-divider></v-divider>
    <v-skeleton-loader
      v-show="loading"
      type="table-tbody"
      :loading="loading"
      :items="15"
    ></v-skeleton-loader>
    <v-data-table-server
      v-show="!loading"
      hover
      density="compact"
      :headers="headers"
      :items="items"
      sort-asc-icon="mdi-menu-up"
      sort-desc-icon="mdi-menu-down"
      :loading="loading"
      :items-length="totalItems"
      @update:options="$emit('update:options', $event)"
      multi-sort
    >
      <!-- nandha -->

      <template #item.names="{ item }">
        <p
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text cursor-pointer"
        >
          {{ item?.name ? item?.name : "N/A" }}
        </p>
      </template>

      <template #item.name="{ item }">
        <p
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text cursor-pointer"
        >
          {{ item?.name ? item?.name : "N/A" }}
        </p>
      </template>

      <template #item.recipientName="{ item }">
        <p>
          {{ item?.recipientName ? item?.recipientName : "N/A" }}
        </p>
      </template>

      <template #item.username="{ item }">
        <p
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text"
        >
          {{ item?.username ? item?.username : "N/A" }}
        </p>
      </template>

      <template #item.image="{ item }">
        <p>
          {{ item.image ? item.image : "N/A" }}
        </p>
      </template>

      <template #item.subcategory="{ item }">
        <div class="wrapper-class my-2 d-flex align-center ga-3">
          <template v-if="item?.subcategory && item.subcategory.length > 0">
            <!-- Display first 3 subcategories as chips -->
            <v-chip
              v-for="(subCategory, index) in item.subcategory.slice(0, 3)"
              :key="index"
              class="sub-category-chip bg-grey"
              color="primary"
              variant="outlined"
            >
              {{ subCategory }}
            </v-chip>

            <!-- Show +X if there are more than 3 subcategories -->
            <p v-if="item.subcategory.length > 3">
              +{{ item.subcategory.length - 3 }}
            </p>
          </template>

          <template v-else>
            <p class="sub-category">N/A</p>
          </template>
        </div>
      </template>

      <template #item.orderNo="{ item }">
        <p
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text"
        >
          {{ item?.orderNo ? item?.orderNo : "N/A" }}
        </p>
      </template>
      <template #item.userDetails.name="{ item }">
        <p
          v-if="route.path == '/product-orders/custom-design'"
          class="text-blue-accent-4 blue-text"
          @click="$emit('edit', true, item)"
        >
          {{ item?.userDetails.name ? item?.userDetails.name : "N/A" }}
        </p>
        <p v-else>
          {{ item?.userDetails?.name ? item?.userDetails?.name : "N/A" }}
        </p>
      </template>
      <template #item.userDetails.phone="{ item }">
        <p @click="$emit('edit', false, item)">
          {{
            item?.userDetails.phone
              ? `+${item?.countryCode ?? "91"} ${item?.userDetails.phone}`
              : "N/A"
          }}
        </p>
      </template>
      <template #item.email="{ item }">
        <p>
          {{ item?.email ? item?.email : "N/A" }}
        </p>
      </template>

      <template #item.status="{ item }">
        <p>
          {{ item?.status ? item?.status : "N/A" }}
        </p>
      </template>
      <template #item.phone="{ item }">
        <p>
          {{
            item?.phone ? `+${item?.countryCode ?? "91"} ${item?.phone}` : "N/A"
          }}
        </p>
      </template>

      <template #item.validity="{ item }">
        <!-- remove underscores -->
        <p>
          {{ item?.validity ? item?.validity.replace(/_/g, " ") : "N/A" }}
        </p>
      </template>

      <template #item.expiryDate="{ item }">
        <p>{{ item.expiryDate ?? "N/A" }}</p>
      </template>

      <template #item.totalOrders="{ item }">
        <p>
          {{ item?.totalOrders ? item?.totalOrders : "0" }}
        </p>
      </template>

      <template #item.size="{ item }">
        <div class="wrapper-class">
          <template v-if="item?.measurements && item.measurements.length > 0">
            <p
              v-for="(size, index) in item.measurements[0].sizes"
              :key="index"
              class="sub-category"
            >
              {{ size ? size : "N/A" }}
            </p>
          </template>
          <template v-else>
            <p class="sub-category">N/A</p>
          </template>
        </div>
      </template>

      <template #item.profile="{ item }">
        <p class="text-center w-75">
          <v-icon @click="goToProfile(item)">mdi-eye-outline</v-icon>
        </p>
      </template>
      <template #item.subscription="{ item }">
        <p class="text-center w-75">
          <v-icon @click="goToSubscription(item)">mdi-eye-outline</v-icon>
        </p>
      </template>
      <template #item.title="{ item }">
        <p
          v-if="!item.discountCode"
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text"
        >
          {{ item.title ? item.title : "N/A" }}
        </p>
        <p v-else>
          {{ item.title ? item.title : "N/A" }}
        </p>
      </template>
      <template #item.role="{ item }">
        <p
          v-if="route.path == '/career/jobs'"
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text"
        >
          {{ item.role ? item.role : "N/A" }}
        </p>
        <p v-else>
          {{ item.role ? item.role : "N/A" }}
        </p>
      </template>
      <template #item.jobDetails.role="{ item }">
        <p
          @click="$emit('role-clicked', item.jobDetails._id)"
          class="text-blue-accent-4 blue-text"
        >
          {{ item.jobDetails.role ? item.jobDetails.role : "N/A" }}
        </p>
      </template>
      <template #item.discountCode="{ item }">
        <p
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text"
        >
          {{ item.discountCode ? item.discountCode : "N/A" }}
        </p>
      </template>

      <template #item._id="{ item }">
        <p
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text"
        >
          {{ item._id ? item._id : "N/A" }}
        </p>
      </template>

      <template #item.amountSpent="{ item }">
        <p>
          {{ formatIndianPrice(item.amountSpent.toFixed(2) || "0") }}
        </p>
      </template>
      <template #item.startDate="{ item }">
        <p>{{ formatDate(item?.startDate) }}</p>
      </template>

      <template #item.endDate="{ item }">
        <p>{{ formatDate(item?.endDate) }}</p>
      </template>

      <template #item.orderCount="{ item }">
        <p>
          {{ item.orderCount ? item.orderCount : "0" }}
        </p>
      </template>

      <template #item.itemCount="{ item }">
        <p>
          {{ item.itemCount ? item.itemCount : "0" }}
        </p>
      </template>

      <template #item.occasion="{ item }">
        <p v-if="item.status">
          {{ item.occasion ? item.occasion : "N/A" }}
        </p>
        <p
          v-else
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text"
        >
          {{ item.occasion ? item.occasion : "N/A" }}
        </p>
      </template>

      <template #item.order_id="{ item }">
        <p
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text"
        >
          {{ item.occasion ? item.occasion : "N/A" }}
        </p>
      </template>

      <template #item.location.city="{ item }">
        <p>
          {{ item?.location?.city ? item?.location?.city : "N/A" }}
        </p>
      </template>
      <template #item.productDetails._id="{ item }">
        <p
          @click="$emit('edit', true, item)"
          class="text-blue-accent-4 blue-text"
        >
          {{ item.productDetails[0]._id ? item.productDetails[0]._id : "N/A" }}
        </p>
      </template>

      <template #item.productDetails.name="{ item }">
        <p @click="$emit('edit', false)">
          {{
            item?.productDetails[0].name ? item?.productDetails[0].name : "N/A"
          }}
        </p>
      </template>
      <template #item.categoryDetails.name="{ item }">
        <p>
          {{
            item?.categoryDetails?.name ? item?.categoryDetails?.name : "N/A"
          }}
        </p>
      </template>
      <template #item.weight="{ item }">
        <p>
          {{ item?.weight ? item?.weight : "N/A" }}
        </p>
      </template>
      <template #item.baseWeight="{ item }">
        <p>
          {{ item?.baseWeight ? item?.baseWeight : "N/A" }}
        </p>
      </template>
      <template #item.totalAmount="{ item }">
        <p>
          {{ formatIndianPrice(item.totalAmount || "0") }}
        </p>
      </template>

      <template #item.price="{ item }">
        <p>
          {{ formatIndianPrice(item.price || "0") }}
        </p>
      </template>
      <template #item.totalPrice="{ item }">
        <p>
          {{ formatIndianPrice(item.totalPrice || "0") }}
        </p>
      </template>

      <template #item.paidAmount="{ item }">
        <p>
          {{ formatIndianPrice(item.paidAmount || "0") }}
        </p>
      </template>

      <template #item.productDetails.price="{ item }">
        <p>
          {{
            item?.productDetails[0].price
              ? item?.productDetails[0].price
              : "N/A"
          }}
        </p>
      </template>
      <template #item.deliveryStatus="{ item }">
        <p>
          {{
            item.deliveryStatus ? item.deliveryStatus.replace(/_/g, " ") : "N/A"
          }}
        </p>
      </template>
      <template #item.paymentStatus="{ item }">
        <p>
          {{ item.paymentStatus ? item.paymentStatus : "N/A" }}
        </p>
      </template>
      <template #item.redeemedAmount="{ item }">
        <p>
          {{ item.redeemedAmount ? item.redeemedAmount : "N/A" }}
        </p>
      </template>
      <template #item.network="{ item }">
        <p class="text-center w-75">
          <v-icon @click="goToNetwork(item)">mdi-eye-outline</v-icon>
        </p>
      </template>
      <template #item.earnings="{ item }">
        <p class="text-center w-75">
          <v-icon @click="gotoEarnings(item)">mdi-eye-outline</v-icon>
        </p>
      </template>

      <template #item.description="{ item }">
        <p
          class="text-wrap text-truncate wrap-class"
          v-html="truncatedDescription(item.description) ?? 'N/A'"
        ></p>
      </template>

      <!-- <template #item.subCategories="{ item }">
        <p class="text-center w-75">
          <v-chip-group filter>
            <v-chip
              v-for="(chip, i) in displayedChips(item.gates)"
              :key="i"
              class="chip"
            >
              {{ chip }}
            </v-chip>
          </v-chip-group>
          <span v-if="remainingChips(item.gates) > 0">
            +{{ remainingChips(item.gates) }}
          </span>
        </p>
      </template> -->

      <template #item.subCategories="{ item }">
        <p class="text-center w-75">
          <v-chip-group filter>
            <v-chip v-for="(chip, i) in item.gates" :key="i" class="chip">
              {{ chip }}
            </v-chip>
          </v-chip-group>
        </p>
      </template>
      <template #item.payouts="{ item }">
        <p class="text-center w-75">
          <v-icon @click="gotoPayouts(item)">mdi-eye-outline</v-icon>
        </p>
      </template>
      <!-- <template #item.status="{ item }">
        <v-img src="/icons/active.svg" width="60" class="my-auto"></v-img>
      </template> -->
      <template #item.isCcTv="{ item }">
        <p @click="$emit('edit', true, item)" class="text-black font-class">
          123-567(0)
        </p>
      </template>

      <template #item.createdAt="{ item }">
        <p>{{ formatDate(item?.createdAt) }}</p>
      </template>

      <template #item.associateName="{ item }">
        <p @click="$emit('edit', true, item)" class="text-black font-class">
          Associate name
        </p>
      </template>
      <template #item.resume="{ item }">
        <div class="w-50 text-center d-flex">
          <v-icon @click="$emit('download', item)"
            >mdi-file-download-outline</v-icon
          >
        </div>
      </template>

      <!-- <template #item.download="{ item }">
        <div class="w-50 text-center d-flex">
          <v-icon @click="$emit('edit', false, item)"
            >mdi-arrow-collapse-down</v-icon
          >
        </div>
      </template> -->
      <template #item.isEnabled="{ item }">
        <v-switch
          class="my-auto"
          color="black"
          v-model="item.isEnabled"
          @click="$emit('enableDisable', item)"
        ></v-switch>
      </template>
      <template #item.featured="{ item }">
        <v-switch
          no-gutter
          class="my-auto"
          color="#00008B"
          v-model="item.isEnabled"
          @click="$emit('enableDisable', item)"
        ></v-switch>
      </template>
      <template #item.isFeatured="{ item }">
        <v-checkbox
          no-gutter
          class="my-auto"
          color="#D1A651"
          readonly
          v-model="item.isFeatured"
        ></v-checkbox>
      </template>
      <template #item.actions="{ item }">
        <div class="">
          <v-icon @click="$emit('delete', item)">mdi-delete</v-icon>
        </div>
      </template>

      <template #item.mixactions="{ item }">
        <div class="w-75 d-flex ga-2 align-center">
          <v-switch
            color="#D1A651"
            v-model="item.isEnabled"
            @click="$emit('enableDisable', item)"
          ></v-switch>
          <v-icon @click="$emit('delete', item)">mdi-delete</v-icon>
        </div>
      </template>

      <template #item.multiActions="{ item }">
        <div class="w-75 d-flex ga-2">
          <div class="text-center d-flex">
            <!-- Emit event for download action -->
            <v-icon @click="$emit('open-download', item)"
              >mdi-arrow-collapse-down</v-icon
            >
          </div>
          <v-switch
            no-gutter
            class="my-auto"
            color="#D1A651"
            v-model="item.isEnabled"
            @click="$emit('enableDisable', item)"
          ></v-switch>
          <v-icon @click="$emit('delete', item)">mdi-delete</v-icon>
        </div>
      </template>

      <template #item.projectLeadsActions="{ item }">
        <div class="d-flex justify-end ga-2">
          <v-icon @click="$emit('edit', true, item)">mdi-pen</v-icon>
          <v-icon @click="$emit('delete', item)">mdi-delete</v-icon>
        </div>
      </template>
      <template #item.projectActions="{ item }">
        <div class="d-flex justify-end ga-2">
          <v-switch class="my-auto"></v-switch>
          <v-icon @click="$emit('edit', true, item)">mdi-pen</v-icon>
          <v-icon @click="$emit('delete', item)">mdi-delete</v-icon>
        </div>
      </template>
      <template #item.listingActions="{ item }">
        <div class="d-flex justify-end ga-2">
          <v-icon @click="$emit('rejectAccept', true, item)">mdi-close</v-icon>
          <v-icon @click="$emit('rejectAccept', false, item)">mdi-check</v-icon>
          <v-switch
            class="my-auto"
            color="#00008B"
            v-model="item.isEnabled"
            @click="$emit('enableDisable', item)"
          ></v-switch>
          <v-icon @click="$emit('delete', item)">mdi-delete</v-icon>
        </div>
      </template>
      <template #item.testimonialAction="{ item }">
        <div class="d-flex justify-end ga-2">
          <v-switch class="my-auto"></v-switch>
          <v-icon @click="$emit('edit', true, item)">mdi-pen</v-icon>
        </div>
      </template>
      <template #item.isDeleted="{ item }">
        <div class="d-flex justify-end ga-2">
          <v-icon @click="$emit('edit', true, item)">mdi-file-outline</v-icon>
          <v-icon @click="$emit('delete', item)">mdi-delete</v-icon>
        </div>
      </template>
      <template #item.midActions="{ item }">
        <div class="d-flex justify-end ga-2">
          <v-icon @click="$emit('delete', item)">mdi-check</v-icon>
          <v-switch class="my-auto" @click="$emit('delete', item)"></v-switch>
        </div>
      </template>

      <template #item.moreActions="{ item }">
        <div class="d-flex justify-end ga-2">
          <v-icon @click="$emit('rejectAccept', true, item)">mdi-close</v-icon>
          <v-icon @click="$emit('rejectAccept', false, item)">mdi-check</v-icon>
          <v-switch
            class="my-auto"
            color="#00008B"
            v-model="item.isEnabled"
            @click="$emit('enableDisable', item)"
          ></v-switch>
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>
<script setup lang="ts">
import { Options } from "~/types/types";
// import { ref } from "vue";

// const date = ref();

const router = useRouter();

const route = useRoute();
console.log(route.path, "ROUTE PATH");
defineProps<{
  headers: Array<{ title: string; value: string; key: string }>;
  items: Array<any>;
  loading: boolean;
  totalItems: number;
  options: Options;
  showAddButton: boolean;
  headingName: string;
}>();

defineEmits<{
  (event: "update:options", options: Options): void;
  (event: "edit", edit: boolean, item?: any): void;
  (event: "delete", item: any): void;
  (event: "rejectAccept", reject: boolean, item: any): void;
  (event: "enableDisable", item: any): void;
  (event: "download", item: any): void;
  (event: "role-clicked", item: any): void;
}>();

const showAddButton = computed(() => {
  const excludedPaths = [
    "/gift-card/purchased",
    "/enquiries",
    "/career/application",
    "/dashboard",
  ];
  return !excludedPaths.includes(route.path);
});

// Truncated description
const truncatedDescription = (description: string | null | undefined) => {
  if (!description || description.length === 0) {
    return "N/A";
  }
  return description.length > 25
    ? description.substring(0, 25) + "..."
    : description;
};

const formatIndianPrice = (amount) => {
  // Convert to number and handle string/null/undefined cases
  const num = Number(amount);
  if (isNaN(num)) {
    return "₹0";
  }

  // Convert to string and split into integer and decimal parts
  const [integerPart, decimalPart] = num.toString().split(".");

  // Format integer part with Indian numbering system
  const lastThree = integerPart.slice(-3);
  const remainingDigits = integerPart.slice(0, -3);

  //keeping 2 decimal places
  const formattedDigits =
    remainingDigits.length > 0
      ? remainingDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
      : lastThree;

  //keeping 2 decimal places
  const formattedDecimal = decimalPart ? decimalPart.slice(0, 2) : "00";

  // Add decimal part if exists
  return decimalPart
    ? `₹${formattedDigits}.${formattedDecimal}`
    : `₹${formattedDigits}`;
};

// Displaying Chips
// const displayedChips = (gates) => gates.slice(0, 3);

// const remainingChips = (gates) => (gates.length > 3 ? gates.length - 3 : 0);

//!Associate management routing funcs
const goToProfile = (item: string) => {
  console.log(item, "DATA");
  // @ts-ignore
  router.push(`/associate-management/profile/${item.name}`);
};
const goToSubscription = (item: string) => {
  console.log(item, "DATA");
  // @ts-ignore
  router.push(`/associate-management/subscription/${item.name}`);
};
const goToNetwork = (item: string) => {
  console.log(item, "DATA");
  // @ts-ignore
  router.push(`/associate-management/network/${item.name}`);
};
const gotoEarnings = (item: string) => {
  console.log(item, "DATA");
  // @ts-ignore
  router.push(`/associate-management/earnings/${item.name}`);
};

const gotoPayouts = (item: string) => {
  console.log(item, "DATA");
  // @ts-ignore
  router.push(`/associate-management/associate-payouts/${item.name}`);
};

function formatDate(date) {
  return date
    ? new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";
}
</script>
