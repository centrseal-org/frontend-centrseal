<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import PaystubCard from "@/components/PaystubCard.vue";
import httpHelper from "@/helpers/httpHelpers";
import { useFileToBase64 } from "@/composables/useFileToBase64";
import { useRouter } from "vue-router";
import { useLeadsStore } from "@/stores/useLeads";

const props = defineProps({
  property: {
    type: Object,
    required: true,
  },
});

// Define the event to emit data to the parent
const emit = defineEmits(["update-leads"]);

const leads = ref();
const router = useRouter();
const leadsStore = useLeadsStore();

const preSignedUrls = async (paystubUrl: string) => {
  const response = await httpHelper.post("paystub/signed-url", {
    paystubUrl,
  });
  return response.data;
};

const allLeads = (leads: any) => {
  leadsStore.setLeads(leads);
  leadsStore.setProperty(props.property);
  router.push("/dashboard/property");
};

onMounted(async () => {
  if (props.property) {
    const uniqueUrl = props.property.uniqueUrl;
    try {
      const response = await httpHelper.get(`/user/uniqueUrl/${uniqueUrl}`);

      if (response.data) {
        leads.value = response.data;
        for (const lead of leads.value) {
          const paystub: any = await httpHelper.get(
            `paystub/user/${lead.userId}/property/${props.property.propertyId}`
          );
          if (paystub.data) {
            /* check verificationDate */
            lead.verificationDate = paystub.data[0].verificationDate;
            /* check status */
            lead.status = paystub.data.find(
              (pa: any) => pa.isVerified === false
            )
              ? "unverified"
              : "verified";
            /* check paystubs */
            lead.paystubs = await Promise.all(
              paystub.data.map(async (pa: any) => ({
                paystubDate: pa.paystubDate,
                preSignedUrl: await preSignedUrls(pa.paystubUrl),
              }))
            );
          } else {
            /* check status */
            lead.status = "waitingOn";
          }
        }
        // Emit the leads data to the parent
        emit("update-leads", {
          propertyId: props.property.propertyId,
          leads: leads.value,
        });
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  }
});
</script>

<template>
  <h5 class="mb-2">{{ leads?.length > 0 ? leads?.length : "" }} Leads</h5>
  <section class="d-flex">
    <div v-for="(lead, index) in leads" :key="index" class="mr-4">
      <PaystubCard
        :fullname="`${lead?.firstName} ${lead?.lastName}`"
        earn="-"
        period="-"
        :statusDate="lead?.verificationDate ?? lead.createdDate"
        :status="lead.status"
        :paystubs="lead.paystubs"
      />
    </div>
    <div v-if="leads?.length === 0" class="mr-4">
      <PaystubCard
        fullname="Your Tenant"
        earn="-"
        period="-"
        statusDate="2014"
        status="basic"
      />
    </div>
  </section>
  <section v-if="leads?.length > 2">
    <v-btn
      class="body1 main-btn viewLeads px-6 mt-4"
      :ripple="false"
      @click="allLeads(leads)"
    >
      View All Leads
      <inline-svg src="/arrowRight.svg" class="ml-2" />
    </v-btn>
  </section>
</template>

<style scoped lang="scss">
.main-btn.viewLeads {
  height: 52px;
  border: none !important;
  background: linear-gradient(93deg, #595968 0%, #484852 100%) !important;
  box-shadow:
    0px 4px 10px 0px rgba(57, 57, 67, 0.32),
    0px 2px 4px 0px rgba(255, 255, 255, 0.75) inset !important;
}
.main-btn.viewLeads::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 10px; /* Match the button's border radius */
  background: linear-gradient(
    180deg,
    #fff,
    #fff,
    rgba(89, 89, 104, 0.2),
    rgba(89, 89, 104, 0.5)
  );
  z-index: -1; /* Place it behind the button */
  padding: 2px; /* Create space for the gradient border */
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
</style>
