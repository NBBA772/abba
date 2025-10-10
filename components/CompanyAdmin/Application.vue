<template>
  <div class="p-4 my-4 shadow rounded-lg bg-white dark:bg-[#3a4934]">
    <h2 class="text-xl font-bold mb-4">Application</h2>

    <div v-if="loading" class="text-gray-500 dark:text-gray-300">
      Loading applications...
    </div>

    <div v-else-if="applications.length === 0 && !hasPaymentAuth" class="text-gray-500 dark:text-gray-300">
      No applications or payment authorizations found.
    </div>

    <!-- 1️⃣ Show Payment Authorization FIRST if not signed -->
    <PaymentAuthorizationForm
      v-if="loggedInUser && !hasPaymentAuth"
      :key="`pay-${loggedInUser.id}`"
      :userId="loggedInUser.id"
      @completed="onPaymentCompleted"
    />

    <!-- 2️⃣ Show Application Form ONLY if payment is authorized -->
    <InsuranceProductForm
      v-else-if="loggedInUser && hasPaymentAuth && (!application?.id || application.id === null)"
      :key="`app-${loggedInUser.id}`"
      :userId="loggedInUser.id"
    />

    <!-- 3️⃣ Show Employee Sign ONLY if both exist -->
    <EmployeeSignApplication
      v-else-if="loggedInUser && application?.id && hasPaymentAuth"
      :key="`sign-${loggedInUser.id}`"
      :application="application"
    />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Application {
  id: number | null
  name: string
  description: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  requestedAt: string
}

const applications = ref<Application[]>([])
const application = ref<Application | null>(null)
const loading = ref(true)
const loggedInUser = ref<any>(null)
const hasPaymentAuth = ref(false)

const authCookie = useAuthCookie()

async function getLoggedInUser() {
  try {
    if (!authCookie.value) return null
    const response = await $fetch(`/api/user`, {
      headers: { Authorization: `Bearer ${authCookie.value}` },
    })
    return response.user || response
  } catch (error: any) {
    console.error("Error fetching user:", error)
    return null
  }
}

onMounted(async () => {
  loading.value = true
  loggedInUser.value = await getLoggedInUser()
  if (!loggedInUser.value) {
    loading.value = false
    return
  }

  // Fetch applications
  const apps = await $fetch("/api/applications/my")
  applications.value = apps
  application.value = apps.length > 0 ? apps[0] : {
    id: null,
    name: "",
    description: "",
    status: "PENDING",
    requestedAt: new Date().toISOString(),
  }

  // Fetch payment authorizations
  const paymentAuths = await $fetch("/api/payment-authorization/my")
  hasPaymentAuth.value = Array.isArray(paymentAuths) && paymentAuths.length > 0

  loading.value = false
})

async function onPaymentCompleted() {
  // Re-fetch payment authorizations
  const paymentAuths = await $fetch("/api/payment-authorization/my")
  hasPaymentAuth.value = Array.isArray(paymentAuths) && paymentAuths.length > 0
}



</script>

<style scoped>
table {
  min-width: 100%;
}
</style>
