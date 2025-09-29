<template>
  <div class="mx-auto p-6 bg-white dark:bg-[#3a4934] rounded-xl shadow-md space-y-6">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Application</h2>

    <!-- Step Progress -->
    <div class="flex items-center space-x-2">
      <div v-for="(s, i) in steps" :key="i"
        class="flex-1 h-2 rounded-full"
        :class="[
          currentStep >= i ? 'bg-blue-600 dark:bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
        ]"></div>
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-4">

      <!-- Step 1. Group Info -->
      <Transition name="fade-slide" mode="out-in">
          <div v-if="currentStep === 0" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Group #</label>
                <input type="text" v-model="form.companyCode"
                      class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                      required disabled/>
              </div>
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name of Group</label>
                <input type="text" 
                      :disabled="!isAgent"
                      v-model="form.groupName"
                      class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                      required />
              </div>
            </div>
          

              <!-- Reason for Enrollment -->
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Reason for Enrollment (Mark all that apply)
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label class="flex items-center">
                    <input type="checkbox" value="New Group" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">New Group</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" value="Open Enrollment" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">Open Enrollment</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" value="New Hire" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">New Hire</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" value="New Application" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">New Application</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" value="Newborn" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">Newborn</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" value="Court Order" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">Court Order</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" value="Dependent Addition" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">Dependent Addition</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" value="Loss of Coverage" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">Loss of Coverage</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" value="Marriage" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">Marriage</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" value="Divorce" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">Divorce</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" value="Military Leave" v-model="form.reasons" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">Military Leave</span>
                  </label>
                </div>
              </div>
            </div>
      </Transition>

      <!-- Step 2. Personal Info -->
      <Transition name="fade-slide" mode="out-in">
          <div v-if="currentStep === 1" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">First Name</label>
                <input type="text" v-model="form.firstName"
                      class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                      required />
              </div>
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Middle Name</label>
                <input type="text" v-model="form.middleName"
                      class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                      />
              </div>
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Last Name</label>
                <input type="text" v-model="form.lastName"
                      class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                      required />
              </div>
            </div>
        

          <!-- Contact -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Phone Number</label>
              <input type="text" v-model="form.phoneNumber"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email</label>
              <input type="email" v-model="form.email"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required />
            </div>
          </div> 
        



          <!-- Identity -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Social Security Number</label>
              <input type="text" v-model="form.socialSecurityNumber"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Date Of Birth</label>
              <input type="date" v-model="form.dateOfBirth"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required />
            </div>
          </div>

              <!-- Demographics -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Age</label>
              <input type="text" v-model="form.age"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Gender</label>
              <input type="text" v-model="form.gender"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Weight</label>
              <input type="text" v-model="form.weight"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Height</label>
              <input type="text" v-model="form.height"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required />
            </div>
          </div>
        </div>
      </Transition>

      <!-- Step 3. Address -->
      <Transition name="fade-slide" mode="out-in">
          <div v-if="currentStep === 2" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Street Address</label>
                  <input type="text" v-model="form.streetAddress"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        required />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">City</label>
                  <input type="text" v-model="form.city"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        required />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">State / Province</label>
                  <input type="text" v-model="form.state"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        required />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">ZIP / Postal Code</label>
                  <input type="text" v-model="form.zipCode"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        required />
                </div>
              </div>
          </div>
      </Transition>

      <!-- Step 4. Company -->
      <Transition name="fade-slide" mode="out-in">
          <div v-if="currentStep === 3" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Hire Date -->
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Hire Date</label>
                <input type="date" v-model="form.hireDate"
                      class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                      required />
              </div>

              <!-- Rehire Date -->
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Rehire Date</label>
                <input type="date" v-model="form.rehireDate"
                      class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                      />
              </div>

              <!-- Location -->
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Location</label>
                <input type="text" v-model="form.location"
                      class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                      />
              </div>

              <!-- Is Division -->
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Is this a division?</label>
                <div class="flex items-center space-x-6">
                  <label class="flex items-center">
                    <input type="radio" :value="true" v-model="form.isDivision" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">Yes</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" :value="false" v-model="form.isDivision" class="mr-2">
                    <span class="text-gray-700 dark:text-gray-300">No</span>
                  </label>
                </div>
              </div>


              <!-- Parent Company -->
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Parent Company</label>
                <input type="text" v-model="form.parentCompany" class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white" />
              </div>

              <!-- Work Info -->
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Hours Per Week</label>
                <input type="text" v-model="form.hrsPerWeek"
                      class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                      />
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Job Title</label>
                <input type="text" v-model="form.jobTitle"
                      class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                      />
              </div>
            </div>
          </div>
      </Transition>

      <!-- Step 5. Spouse -->
      <Transition name="fade-slide" mode="out-in">
        <!-- Personal Info -->
        <div v-if="currentStep === 4" class="space-y-4">
            <h2>Spouse</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">First Name</label>
                  <input type="text" v-model="form.spouseFirstName"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Middle Name</label>
                  <input type="text" v-model="form.spouseMiddleName"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Last Name</label>
                  <input type="text" v-model="form.spouseLastName"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Social Security Number</label>
                  <input type="text" v-model="form.spouseSocialSecurityNumber"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Date Of Birth</label>
                  <input type="date" v-model="form.spouseDateOfBirth"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Age</label>
                  <input type="text" v-model="form.spouseAge"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Gender</label>
                  <input type="text" v-model="form.spouseGender"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Weight</label>
                  <input type="text" v-model="form.spouseWeight"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Height</label>
                  <input type="text" v-model="form.spouseHeight"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        />
                </div>
              </div>
          </div>
      </Transition>

      <!-- Step 6. Dependents -->
      <Transition name="fade-slide" mode="out-in">
        <div v-if="currentStep === 5" class="space-y-4">
          <h3 class="text-xl font-bold mb-4 dark:text-white">Step 6: Dependents</h3>

          <div v-for="(dep, index) in form.dependents" :key="index" class="mb-4 border p-4 rounded bg-gray-50 dark:bg-[#2d3a2a]">
            <label class="block mb-2 text-gray-700 dark:text-gray-300">First Name</label>
            <input v-model="dep.firstName" type="text" class="w-full p-2 border rounded" />

            <label class="block mb-2 text-gray-700 dark:text-gray-300 mt-2">Last Name</label>
            <input v-model="dep.lastName" type="text" class="w-full p-2 border rounded" />

            <label class="block mb-2 text-gray-700 dark:text-gray-300 mt-2">Social Security Number</label>
            <input v-model="dep.socialSecurityNumber" type="text" class="w-full p-2 border rounded" />

            <label class="block mb-2 text-gray-700 dark:text-gray-300 mt-2">Weight</label>
            <input v-model="dep.weight" type="text" class="w-full p-2 border rounded" />

            <label class="block mb-2 text-gray-700 dark:text-gray-300 mt-2">Height</label>
            <input v-model="dep.height" type="text" class="w-full p-2 border rounded" />

            <label class="block mb-2 text-gray-700 dark:text-gray-300 mt-2">Date of Birth</label>
            <input v-model="dep.dateOfBirth" type="date" class="w-full p-2 border rounded" />

            <label class="block mb-2 text-gray-700 dark:text-gray-300 mt-2">Gender</label>
            <select v-model="dep.gender" class="w-full p-2 border rounded">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label class="block mb-2 text-gray-700 dark:text-gray-300 mt-2">Relationship</label>
            <input v-model="dep.relationship" type="text" class="w-full p-2 border rounded" />

            <button
              class="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              @click.prevent="removeDependent(index)"
            >
              Remove
            </button>
          </div>


          <button
            type="button"
            class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            @click="addDependent"
          >
            Add Dependent
          </button>

        </div>
      </Transition>








      <!-- Step 7. Health Plan -->
      <Transition name="fade-slide" mode="out-in">
          <div v-if="currentStep === 6" class="space-y-4">
              <div>
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Health Plan</label>
                <select v-model="form.healthPlan"
                        :disabled="!isAgent"
                        class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                        required>
                  <option value="">Select Health Plan</option>
                  <option value="plan1">Plan 1</option>
                  <option value="plan2">Plan 2</option>
                </select>
              </div>
          </div>
      </Transition>



      <!-- Step 8. Vision and Dental Plan -->
      <Transition name="fade-slide" mode="out-in">
        <div v-if="currentStep === 7" class="space-y-4">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Do you need Vision and Dental coverage?
            </label>
            <select v-model="form.visionAndDentalPlan"
                    :disabled="!isAgent"
                    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                    required>
              <option :value="null">Select an option</option>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>

          </div>
        </div>
      </Transition>




      <!-- Step 9. Ancillary Insurance Info -->
      <Transition name="fade-slide" mode="out-in">
        <div v-if="currentStep === 8" class="space-y-4">
          
          <div v-for="(plan, index) in form.ancillaryPlans" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            
            <!-- Company-->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Company
              </label>
              <input 
                type="text" 
                v-model="plan.planName"
                :disabled="!isAgent"
                class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                placeholder="Enter plan name" 
              />
            </div>

            <!-- Product -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Product
              </label>
              <input 
                type="text" 
                v-model="plan.product"
                :disabled="!isAgent"
                class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                placeholder="Enter product name" 
              />
            </div>

            <!-- Plan Price -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Plan Price
              </label>
              <input 
                type="number" 
                v-model="plan.price"
                :disabled="!isAgent"
                class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                placeholder="Enter monthly price ($)"
                min="0"
                step="0.01" 
              />
            </div>

            <!-- Remove Button -->
            <div class="md:col-span-3 text-right">
              <button type="button" 
                      class="text-red-500 hover:text-red-700"
                      @click="removeAncillaryPlan(index)">
                Remove
              </button>
            </div>

          </div>

          <!-- Add New Plan Button -->
          <button v-if="isAgent" type="button" 
                  class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  @click="addAncillaryPlan">
            + Add Another Plan
          </button>

        </div>
      </Transition>








      <!-- Navigation -->
      <div class="flex justify-between pt-4">
        <button type="button" @click="prevStep" :disabled="currentStep === 0" class="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50">Back</button>
        <button v-if="currentStep < steps.length - 1" type="button" @click="nextStep" class="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
        <button v-else type="submit"
                class="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
      </div>
      
    </form>


    <!-- Feedback Messages -->
    <p v-if="message" class="mt-4 text-green-600 dark:text-green-400">{{ message }}</p>
    <p v-if="error" class="mt-4 text-red-600 dark:text-red-400">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useCookie } from "#imports";

// 👇 Define props
const props = defineProps<{ userId: number, application?: any }>()

const steps = ['Group', 'Personal', 'Address', 'company', 'Spouse', 'dependents', 'visionAndDental', 'ancillary', 'Plan']
const currentStep = ref(0)

const form = reactive({
  companyCode: '',
  groupNumber: '',
  groupName: '',
  healthPlan: '',
  visionAndDentalPlan: false,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  socialSecurityNumber: '',
  dateOfBirth : '',
  hireDate : '',
  rehireDate : '',
  location : '',
  isDivision: false,
  parentCompany: '',
  age: '',
  gender : '',
  weight : '',
  height : '',
  reasons: [] as string[],
  jobTitle: '',
  hrsPerWeek : '',
  spouseFirstName: '',
  spouseMiddleName: '',
  spouseLastName: '',
  spouseSocialSecurityNumber: '',
  spouseDateOfBirth : '',
  spouseAge: '',
  spouseGender : '',
  spouseWeight : '',
  spouseHeight : '',
  // 👇 add dependents here
  dependents: [] as {
    firstName: string
    lastName: string
    socialSecurityNumber: string
    weight: string
    height: string
    dateOfBirth: string
    gender: string
    relationship: string
  }[],
    ancillaryPlans: [
    { planName: "", product: null,  price: null }
  ]
})

const message = ref('')
const error = ref('')

const nextStep = () => { if (currentStep.value < steps.length - 1) currentStep.value++ }
const prevStep = () => { if (currentStep.value > 0) currentStep.value-- }


const submitForm = async () => {
  message.value = ''
  error.value = ''

  try {
    const authToken = useCookie('auth_token').value
    if (!authToken) throw new Error('No auth token found')

    if (!props.userId) throw new Error('Target user ID not provided')

    const response = await $fetch('/api/applications/create', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: { ...form, userId: props.userId }, // send clicked user's ID
    })

    message.value = 'Application submitted successfully!'
    form.companyCode = ''
    form.groupNumber = ''
    form.groupName = ''
    form.healthPlan = ''
    form.visionAndDentalPlan = false
    form.firstName = ''
    form.lastName = ''
    form.phoneNumber = ''
    form.socialSecurityNumber = ''
    form.email = ''
    form.streetAddress = ''
    form.city = ''
    form.state = ''
    form.zipCode = ''
    form.dateOfBirth = ''
    form.hireDate = ''
    form.rehireDate = ''
    form.location = ''
    form.isDivision = false
    form.parentCompany = ''
    form.age = ''
    form.gender = ''
    form.weight = ''
    form.height = ''
    form.reasons = []
    form.jobTitle = ''
    form.hrsPerWeek = ''
    form.spouseFirstName = ''
    form.spouseMiddleName = ''
    form.spouseLastName = ''
    form.spouseSocialSecurityNumber = ''
    form.spouseDateOfBirth  = ''
    form.spouseAge = ''
    form.spouseGender  = ''
    form.spouseWeight  = ''
    form.spouseHeight  = ''
    
  } catch (err: any) {
    console.error(err)
    error.value = err?.message || 'Failed to submit application'
  }
}


const addDependent = () => {
  form.dependents.push({
    firstName: "",
    lastName: "",
    socialSecurityNumber: "",
    weight: "",
    height: "",
    dateOfBirth: "",
    gender: "",
    relationship: "",
  })
}

const removeDependent = (index: number) => {
  form.dependents.splice(index, 1)
}

function addAncillaryPlan() {
  form.ancillaryPlans.push({ planName: "", product: null, price: null });
}

function removeAncillaryPlan(index: number) {
  form.ancillaryPlans.splice(index, 1);
}




function populateForm(app: any) {
  form.groupNumber = app.groupNumber || ''
  form.groupName = app.groupName || ''
  form.healthPlan = app.healthPlan || ''
  form.visionAndDentalPlan = app.visionAndDentalPlan ?? false
  form.firstName = app.firstName || ''
  form.middleName = app.middleName || ''
  form.lastName = app.lastName || ''
  form.phoneNumber = app.phoneNumber || ''
  form.email = app.email || ''
  form.streetAddress = app.streetAddress || ''
  form.city = app.city || ''
  form.state = app.state || ''
  form.zipCode = app.zipCode || ''
  form.socialSecurityNumber = app.socialSecurityNumber || ''
  form.dateOfBirth = app.dateOfBirth ? app.dateOfBirth.substr(0, 10) : ''
  form.hireDate = app.hireDate ? app.hireDate.substr(0, 10) : ''
  form.rehireDate = app.rehireDate ? app.rehireDate.substr(0, 10) : ''
  form.location = app.location || ''
  form.isDivision = app.isDivision ?? false
  form.parentCompany = app.parentCompany || ''
  form.age = app.age || ''
  form.gender = app.gender || ''
  form.weight = app.weight || ''
  form.height = app.height || ''
  form.reasons = Array.isArray(app.reasons)
  ? app.reasons
  : (app.reasons ? app.reasons.split(',') : [])

  form.jobTitle = app.jobTitle || ''
  form.hrsPerWeek = app.hrsPerWeek || ''
  
  form.spouseFirstName = app.spouseFirstName || ''
  form.spouseMiddleName = app.spouseMiddleName || ''
  form.spouseLastName = app.spouseLastName || ''
  form.spouseSocialSecurityNumber = app.spouseSocialSecurityNumber || ''
  form.spouseDateOfBirth = app.spouseDateOfBirth ? app.spouseDateOfBirth.substr(0,10) : ''
  form.spouseAge = app.spouseAge || ''
  form.spouseGender = app.spouseGender || ''
  form.spouseWeight = app.spouseWeight || ''
  form.spouseHeight = app.spouseHeight || ''

  // Dependents
  form.dependents = app.dependents?.map((d: any) => ({
    firstName: d.firstName || '',
    lastName: d.lastName || '',
    socialSecurityNumber: d.socialSecurityNumber || '',
    weight: d.weight || '',
    height: d.height || '',
    dateOfBirth: d.dateOfBirth ? d.dateOfBirth.substr(0,10) : '',
    gender: d.gender || '',
    relationship: d.relationship || '',
  })) || []

  // Ancillary Plans
  form.ancillaryPlans = app.ancillaryPlans?.length
    ? app.ancillaryPlans.map((p: any) => ({ planName: p.planName || '', product: p.product || '', price: p.price ?? null }))
    : [{ planName: '', product: null, price: null }]
}

async function fetchApplication(userId) {
  try {
    console.debug('[DEBUG] Fetching application for userId:', userId);
    const res = await fetch(`/api/applications/${userId}`);
    
    if (res.status === 204) {
      console.debug('[DEBUG] No application found');
      insuranceApplication.value = null; // reset form
      return;
    }


    // Only set the form if the fetched userId matches
const data = await res.json()

// now unwrap
if (data.application && data.application.userId === userId) {
  console.debug('[DEBUG] Fetched application:', data.application)
  insuranceApplication.value = data.application
} else {
  console.warn('[WARN] Fetched application does not match current userId')
  insuranceApplication.value = null
}

  } catch (err) {
    console.error('[ERROR] Fetching application failed:', err);
    insuranceApplication.value = null; // reset form on error
  }
}



watch(() => props.userId, async (newUserId) => {
  console.log('[DEBUG] userId changed:', newUserId);
  await fetchApplication(newUserId);
});


watch(
  () => props.application,
  (newApp) => {
    if (newApp) {
      populateForm(newApp)
    }
  },
  { immediate: true } // so it runs once on mount
)

async function fetchAndPopulateApplication(userId: number) {
  try {
    console.log('[DEBUG] Fetching application for userId:', userId)
    const res = await $fetch(`/api/applications/${userId}`)

    // Always set the company code if returned
    if (res?.bCode) {
      form.companyCode = res.bCode
      console.log('[DEBUG] Set companyCode to bCode:', res.bCode)
    }

    if (!res || !res.application) {
      console.log('[DEBUG] No application found, form will remain mostly blank')
      return
    }

    const app = res.application
    console.log('[DEBUG] Fetched application:', app)
    populateForm(app)
  } catch (error) {
    console.error('[ERROR] Fetching application failed:', error)
  }
}


const authCookie = useAuthCookie()
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


const isAgent = ref(false)
const loggedInUser = ref<any>(null)

onMounted(async () => {
  loggedInUser.value = await getLoggedInUser()
console.log("loggedInUser.value?.id ", loggedInUser)
  if (props.userId) {
    fetchAndPopulateApplication(props.userId)
  }
  if (loggedInUser.value?.id) {
    isAgent.value = await useInsuranceAgent(loggedInUser.value?.id)
  }
})


</script>


<style scoped>
.input {
  @apply w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white;
}


.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
  overflow: hidden; /* ensures smooth height animation */
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  max-height: 2000px; /* big enough to fit your tallest step */
  transform: translateY(0);
}

</style>