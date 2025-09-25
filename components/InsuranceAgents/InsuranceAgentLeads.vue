<template>
  <div class="mx-auto p-6 bg-white dark:bg-[#3a4934] rounded-xl shadow-md space-y-6">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Companies</h2>

    <!-- Loading / Error States -->
    <div v-if="loadingLeads || loadingCompanies" class="text-gray-500 dark:text-gray-300">
      Loading leads & companies...
    </div>
    <div v-else-if="error" class="text-red-600 dark:text-red-400">{{ error }}</div>
    <div v-else-if="leads.length === 0 && companies.length === 0" class="text-gray-500 dark:text-gray-300">
      No companies yet.
    </div>

    <!-- Table -->
    <table v-else class="w-full text-left border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <!-- <thead class="bg-gray-100 dark:bg-[#142610]">
        <tr>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Lead ID</th>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Name</th>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Email</th>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Phone</th>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Accepted At</th>
          <th class="p-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">Actions</th>
        </tr>
      </thead> -->

<tbody>
  <template v-for="company in companies" :key="company.id">
    <!-- Company header row -->
    <tr class="bg-gray-200 dark:bg-[#243021]">
      <td colspan="6" class="p-3 font-bold dark:text-white">
        {{ company.companyName }}
      </td>
      
    </tr>

   

    <!-- Employees -->
    <tr v-for="employee in company.employees" :key="employee.id" class="hover:bg-gray-50 dark:hover:bg-[#2d3a2a]">
      <td class="relative w-8">
        <div class="absolute left-1/2 top-0 bottom-0 border-l-2 border-gray-400 dark:border-gray-400"></div>
      </td>
      <td class="p-2 dark:text-white">
        <div class="flex items-center">
          <div class="w-4 border-t-2 border-gray-400 dark:border-gray-400 mr-2"></div>
          <span>{{ employee.firstName }} {{ employee.lastName }}</span>
        </div>
      </td>
      <td class="p-2 dark:text-white">{{ employee.email }}</td>
      <td class="p-2 dark:text-white">{{ employee.phone || "—" }}</td>
      <td class="p-2 dark:text-white">—</td>
      <td class="p-2 dark:text-white">
        <button @click="employeeOpenModal(employee)" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
          Application
        </button>
      </td>
    </tr>
  </template>
</tbody>


    </table>

    <!-- Modal -->
     <Transition name="fade-zoom">
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white dark:bg-[#3a4934] rounded-xl shadow-lg p-6 w-3/4 max-h-[100vh] overflow-y-auto">
            <!-- <h3 class="text-xl font-bold mb-4 dark:text-white">Lead Details</h3>
            <p><strong>Name:</strong> {{ selectedLead.firstName }} {{ selectedLead.lastName }}</p>
            <p><strong>Email:</strong> {{ selectedLead.email }}</p>
            <p><strong>Phone:</strong> {{ selectedLead.phone }}</p>
            <p>
              <strong>Accepted At:</strong>
              {{
                selectedLead.invites?.[0]?.acceptedAt
                  ? new Date(selectedLead.invites[0].acceptedAt).toLocaleString()
                  : "—"
              }}
            </p> -->

            <!-- Pass dynamically fetched userId -->
          <InsuranceProductForm
            v-if="userId !== null && selectedLead.application !== undefined"
            :key="userId + '-' + (selectedLead.application?.id || 'new')"
            :userId="userId"
            :application="selectedLead.application"
          />




            <p v-else class="text-gray-500 dark:text-gray-400 mt-2">Loading user info...</p>

            <button
              class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const leads = ref<any[]>([])
const companies = ref<any[]>([])

const loadingLeads = ref(true)
const loadingCompanies = ref(true)
const error = ref<string | null>(null)

const selectedLead = ref<any | null>(null)
const showModal = ref(false)
const userId = ref<number | null>(null)

// ✅ Fetch leads
const fetchLeads = async () => {
  try {
    const res = await $fetch("/api/leads/accepted", { method: "GET" })
    leads.value = res || []
  } catch (err: any) {
    error.value = err.message || "Failed to fetch leads"
  } finally {
    loadingLeads.value = false
  }
}

// ✅ Fetch companies + employees
const fetchCompaniesWithEmployees = async () => {
  try {
    const res: any[] = await $fetch("/api/leads/accepted-companies")
    companies.value = res
  } catch (err: any) {
    error.value = err.message || "Failed to fetch companies from lead invites"
  } finally {
    loadingCompanies.value = false
  }
}


// ✅ Helper: Get user ID by email
const getUserIdByEmail = async (email: string): Promise<number | null> => {
  try {
    const user = await $fetch("/api/user/get-by-email", {
      method: "POST",
      body: { email },
    })
    return user.id || null
  } catch (err) {
    console.error("Error fetching user by email:", err)
    return null
  }
}

// ✅ Modal handlers
const openModal = async (lead: any) => {
  selectedLead.value = lead
  showModal.value = true
  userId.value = await getUserIdByEmail(lead.email)
}
const DEBUG_MODE = true

const employeeOpenModal = async (employee: any) => {
  console.log('[DEBUG] Opening modal for employee:', employee)

  selectedLead.value = { ...employee, application: undefined } // reset
  showModal.value = true

  userId.value = await getUserIdByEmail(employee.email)
  console.log('[DEBUG] Resolved userId:', userId.value)

  if (!userId.value) {
    console.warn('[DEBUG] No userId found for email:', employee.email)
    selectedLead.value.application = null
    return
  }

  const existingApp = await getApplicationByUserId(userId.value)
  console.log('[DEBUG] Fetched application:', existingApp)

  selectedLead.value.application = existingApp?.userId === userId.value ? existingApp : null
}




const closeModal = () => {
  selectedLead.value = null
  userId.value = null
  showModal.value = false
}

async function getApplicationByUserId(userId: number) {
  try {
    const response = await $fetch(`/api/applications/${userId}`);
    
    const application = response ?? null; // <- direct response
    if (DEBUG_MODE) console.log('[DEBUG] Application fetched:', application);
    
    return application;
  } catch (err: any) {
    console.error('[DEBUG] Error fetching application:', err);
    return null; // always return null if error
  }
}




onMounted(async () => {
  await Promise.all([fetchLeads(), fetchCompaniesWithEmployees()])
})
</script>
<style scoped>
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.fade-zoom-enter-to,
.fade-zoom-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>