<template>
  <div>
    <div
      v-if="passwordErrors"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <ul>
        <li v-for="[key, value] in passwordErrorEntries" :key="key">
          {{ value.message }}
        </li>
      </ul>
    </div>

    <form @submit.prevent="submitChangePassword" class="space-y-4">
      <div>
        <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
        <input
          v-model="currentPassword"
          id="currentPassword"
          name="currentPassword"
          type="password"
          autocomplete="current-password"
          required
          class="dark:bg-slate-500 dark:text-white dark:placeholder-white w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
        <input
          v-model="newPassword"
          id="newPassword"
          name="newPassword"
          type="password"
          autocomplete="new-password"
          required
          minlength="8"
          class="dark:bg-slate-500 dark:text-white dark:placeholder-white w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
        <input
          v-model="confirmNewPassword"
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          autocomplete="new-password"
          required
          minlength="8"
          class="dark:bg-slate-500 dark:text-white dark:placeholder-white w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        :disabled="changingPassword"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {{ changingPassword ? 'Updating...' : 'Update Password' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { changePassword } from "~/composables/useAuth";
import { useNuxtApp } from "#app";

const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const changingPassword = ref(false);
const passwordErrors = ref<any>(undefined);

const passwordErrorEntries = computed(() => {
  const errorObj = passwordErrors.value?.errors || passwordErrors.value;
  if (!errorObj) return [];
  if (typeof errorObj.entries === "function") {
    return Array.from(errorObj.entries());
  }
  return Object.entries(errorObj);
});

async function submitChangePassword() {
  const toast = useNuxtApp().$toast;
  passwordErrors.value = undefined;

  if (newPassword.value !== confirmNewPassword.value) {
    passwordErrors.value = { confirmNewPassword: { message: "New passwords do not match" } };
    return;
  }

  changingPassword.value = true;
  try {
    const response = await changePassword(currentPassword.value, newPassword.value);

    if (response.hasErrors) {
      passwordErrors.value = response.errors;
      const errorObj = passwordErrors.value;
      const first = errorObj ? Object.values(errorObj)[0] : undefined;
      toast?.error?.((first as any)?.message ?? "Failed to update password.");
    } else {
      currentPassword.value = "";
      newPassword.value = "";
      confirmNewPassword.value = "";
      toast?.success?.("Password updated successfully.");
    }
  } finally {
    changingPassword.value = false;
  }
}
</script>
