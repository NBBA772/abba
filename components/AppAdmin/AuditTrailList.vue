<template>
  <div class="p-4 bg-white dark:bg-[#3a4934] rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">Audit Trails</h2>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">ID</th>
            <th class="px-4 py-2 text-left">Signer</th>
            <th class="px-4 py-2 text-left">Email</th>
            <th class="px-4 py-2 text-left">Action</th>
            <th class="px-4 py-2 text-left">IP</th>
            <th class="px-4 py-2 text-left">Timestamp</th>
            <th class="px-4 py-2 text-left">User</th>
            <!-- <th class="px-4 py-2 text-left">Application</th> -->
            <th class="px-4 py-2 text-left">PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trail in auditTrails" :key="trail.id" class="border-b dark:border-gray-700">
            <td class="px-4 py-2">{{ trail.id }}</td>
            <td class="px-4 py-2">{{ trail.signer }}</td>
            <td class="px-4 py-2">{{ trail.email }}</td>
            <td class="px-4 py-2">{{ trail.action }}</td>
            <td class="px-4 py-2">{{ trail.ip }}</td>
            <td class="px-4 py-2">{{ new Date(trail.timestamp).toLocaleString() }}</td>
            <td class="px-4 py-2">{{ trail.user ? `${trail.user.firstName} ${trail.user.lastName}` : "N/A" }}</td>
            <!-- <td class="px-4 py-2">{{ trail.insuranceApplication ? `${trail.insuranceApplication.firstName} ${trail.insuranceApplication.lastName}` : "N/A" }}</td> -->
            <td class="px-4 py-2">
              <a
                v-if="trail.insuranceApplication?.pdfUrl"
                :href="trail.insuranceApplication.pdfUrl"
                target="_blank"
                class="text-blue-500 hover:underline"
              >
                View PDF
              </a>
              <span v-else>N/A</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface AuditTrail {
  id: number;
  signer: string;
  email: string;
  ip: string;
  documentHash: string;
  action: string;
  metadata?: any;
  insuranceApplicationId?: number;
  timestamp: string;
  user?: { firstName: string; lastName: string };
  insuranceApplication?: { firstName: string; lastName: string; pdfUrl?: string };
}

const auditTrails = ref<AuditTrail[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const res = await $fetch("/api/admin/audit-trails");
    if (res.success) {
      auditTrails.value = res.data;
    } else {
      error.value = res.error || "Failed to load audit trails";
    }
  } catch (err: any) {
    error.value = err.message || "Failed to fetch audit trails";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border-bottom: 1px solid #ddd;
}
</style>
