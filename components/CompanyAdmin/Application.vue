<template>
  <div class="p-4 my-4 shadow rounded-lg bg-white dark:bg-[#3a4934]">
    <h2 class="text-xl font-bold mb-4">Application</h2>

    <div v-if="loading" class="text-gray-500 dark:text-gray-300">
      Loading applications...
    </div>

    <div v-else-if="applications.length === 0" class="text-gray-500 dark:text-gray-300">
      No applications found.
    </div>

<!-- Show form if there is NO saved application -->
<InsuranceProductForm
  v-if="loggedInUser && (!application || application.id === null)"
  :key="loggedInUser.id"
  :userId="loggedInUser.id"
/>

<!-- Show sign form if application EXISTS -->
<EmployeeSignApplication
  v-else-if="loggedInUser && application && application.id !== null"
  :key="`sign-${loggedInUser.id}`"
  :application="application"
/>


    <!-- <table v-else class="w-full table-auto border-collapse">
      <thead>
        <tr class="bg-gray-100 dark:bg-[#142610] text-left">
          <th class="p-2 border-b">Application Name</th>
          <th class="p-2 border-b">Description</th>
          <th class="p-2 border-b">Status</th>
          <th class="p-2 border-b">Requested At</th>
          <th class="p-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="app in applications"
          :key="app.id"
          class="hover:bg-gray-50 dark:hover:bg-[#566051]"
        >
          <td class="p-2 border-b break-words">{{ app.name }}</td>
          <td class="p-2 border-b break-words">{{ app.description }}</td>
          <td class="p-2 border-b">
            <span
              :class="{
                'text-yellow-600': app.status === 'PENDING',
                'text-green-600': app.status === 'APPROVED',
                'text-red-600': app.status === 'REJECTED'
              }"
            >
              {{ app.status }}
            </span>
          </td>
          <td class="p-2 border-b">{{ formatDate(app.requestedAt) }}</td>
          <td class="p-2 border-b">
            <button
              v-if="app.status === 'PENDING'"
              @click="markApproved(app.id)"
              class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Approve
            </button>
            <span v-else class="text-gray-500">—</span>
          </td>
        </tr>
      </tbody>
    </table> -->
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

const applications = ref<Application[]>([])  // will come from API
const application = ref<Application | null>(null) // single selected app
const loading = ref(true)

const loggedInUser = ref<any>(null)
const authCookie = useAuthCookie()

// Fetch logged-in user
async function getLoggedInUser() {
  try {
    if (!authCookie.value) {
      console.error("Auth cookie is missing.")
      return null
    }
    console.log("Fetching fresh user data...")
    const response = await $fetch(`/api/user`, {
      headers: { Authorization: `Bearer ${authCookie.value}` },
    })
    console.log("✅ User fetched:", response)
    return response.user || response
  } catch (error: any) {
    console.error("Error in getLoggedInUser:", error.message || error)
    return null
  }
}

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString()

const markApproved = (id: number) => {
  const app = applications.value.find(a => a.id === id)
  if (app) app.status = 'APPROVED'
}

onMounted(async () => {
  loading.value = true

  loggedInUser.value = await getLoggedInUser()
  console.log("🔹 loggedInUser:", loggedInUser.value?.id)

  // Fetch all applications for this user
  applications.value = await $fetch("/api/applications/my")

  if (applications.value.length > 0) {
    application.value = applications.value[0] // pick first
  } else {
    // create blank one
    application.value = {
      id: null,
      status: "PENDING",
      name: "",
      description: "",
      requestedAt: new Date().toISOString(),
    }
  }

  loading.value = false
})
</script>


<style scoped>
table {
  min-width: 100%;
}
</style>
