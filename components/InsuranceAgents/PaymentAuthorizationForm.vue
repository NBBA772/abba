<template>
  <div class="mx-auto p-6 bg-white dark:bg-[#2d352d] rounded-xl shadow-md space-y-6">
    <div
      v-for="auth in paymentAuthorizations"
      :key="auth.id"
      class="border border-gray-200 dark:border-gray-700 p-5 rounded-xl"
    >
      <!-- Already signed -->
      <div v-if="auth.pdfUrl">
        <p class="text-green-600 dark:text-green-400 font-medium">
          This payment authorization has already been signed.
        </p>
        <button
          @click="downloadExistingPdf(auth.pdfUrl)"
          class="mt-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Download Signed PDF
        </button>
      </div>

      <!-- Authorization Form -->
      <form v-else @submit.prevent="submitForm(auth)" class="space-y-5">
       

      
      

        <!-- Contact Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input
              v-model="auth.fullName"
              type="text"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              v-model="auth.email"
              type="email"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              required
            />
          </div>
        </div>

                  <!-- Billing Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-1">Billing Address</label>
            <input
              v-model="auth.billingAddress"
              type="text"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              placeholder="123 Main St"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-1">City</label>
            <input
              v-model="auth.city"
              type="text"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              placeholder="City"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-1">State</label>
            <input
              v-model="auth.state"
              type="text"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              placeholder="State"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-1">Zip Code</label>
            <input
              v-model="auth.zip"
              type="text"
              class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
              placeholder="Zip"
              required
            />
          </div>
        </div>

        <!-- Plan Selection -->
<div>
  <label class="block text-gray-700 dark:text-gray-300 mb-1">Select Plan</label>
  <select
    v-model="auth.plan"
    class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
    required
  >
    <option value="" disabled>Select a plan</option>
    <option value="Single Member">Single Member | $99.99 Once & $24.99/month</option>
    <option value="2-5 Employees">2-5 Employees | $299.99 Once & $24.99/month</option>
    <option value="6-10 Employees">6-10 Employees | $599.99 Once & $24.99/month</option>
    <option value="11+ Employees">11+ Employees | $999.99 Once & $24.99/month</option>
  </select>
</div>





          <!-- Credit Card Info -->
          <div v-if="auth.paymentMethod === 'card'" class="space-y-4">
            <!-- Card Type -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-1">Card Type</label>
              <select
                v-model="auth.cardType"
                class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                required
              >
                <option value="" disabled>Select card type</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="American Express">American Express</option>
                <option value="Discover">Discover</option>
              </select>
            </div>

            <!-- Card Number -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
              <input
                v-model="auth.cardNumber"
                type="text"
                maxlength="19"
                placeholder="XXXX XXXX XXXX XXXX"
                class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- Expiration -->
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-1">Expiration Date</label>
                <input
                  v-model="auth.expiration"
                  type="text"
                  placeholder="MM/YY"
                  class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                  required
                />
              </div>

              <!-- CVV -->
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                <input
                  v-model="auth.cvv"
                  type="text"
                  maxlength="4"
                  placeholder="XXX"
                  class="w-full px-3 py-2 border rounded-md dark:bg-[#142610] dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

        <!-- Signature -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Electronic Signature
          </label>
          <div class="signature-container mt-4">
            <SignaturePad
              class="w-full h-40 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#3a3a3a]"
              :ref="el => { if (el) signaturePads[auth.id] = el.signaturePad }"
            />
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-2 italic">*Sign Here</p>
          </div>
        </div>

        <div class="flex items-center mt-3">
          <input type="checkbox" v-model="consent[auth.id]" class="mr-2" required />
          <label class="text-gray-700 dark:text-gray-300 text-sm">
            I consent to electronic signature and authorize this payment.
          </label>
        </div>

        <button
          type="submit"
          :disabled="!consent[auth.id]"
          class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Authorize Payment
        </button>
      </form>
    </div>

    <p v-if="message" class="text-green-600 mt-2">{{ message }}</p>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import SignaturePad from 'vue3-signature-pad';
import axios from 'axios';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const emit = defineEmits(["completed"])

interface PaymentAuthorization {
  id: number;
  userId: number;
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'ach' | 'paypal';
  description?: string;
  fullName: string;
  email: string;
  pdfUrl?: string;
  signatureImageUrl?: string;

  // Billing info
  cardNumber?: string;
  expiration?: string;      // MM/YY
  cvv?: string,
  billingAddress?: string;
  city?: string;
  state?: string;
  zip?: string;
}

const planPrices = {
  "Single Member": { oneTime: 99.99, monthly: 24.99 },
  "2-5 Employees": { oneTime: 299.99, monthly: 24.99 },
  "6-10 Employees": { oneTime: 599.99, monthly: 24.99 },
  "11+ Employees": { oneTime: 999.99, monthly: 24.99 },
};







const signaturePads = reactive<Record<number, any>>({});
const consent = reactive<Record<number, boolean>>({});
const paymentAuthorizations = ref<PaymentAuthorization[]>([]);
const message = ref('');
const error = ref('');

onMounted(() => {
  paymentAuthorizations.value = [
    {
      id: 1,
      userId: 5,
      amount: 150,
      currency: 'USD',
      paymentMethod: 'card',
      fullName: 'John Doe',
      email: 'john@example.com',
    },
  ];
});

watch(paymentAuthorizations, (auths) => {
  auths.forEach((auth) => {
    if (auth.plan && planPrices[auth.plan]) {
      auth.amount = planPrices[auth.plan].oneTime; // sets one-time amount
      auth.monthlyAmount = planPrices[auth.plan].monthly; // optional, for recurring
    }
  });
}, { deep: true });








const user = await useUser()
let company = null

async function generatePdf(auth: PaymentAuthorization, signatureDataUrl: string) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const companyName = 'Amerus Financial Inc.'; // replace with env var if needed
    // --- Embed logo ---
    const logoUrl = '/img/logo.png'
    const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer())
    const logoImage = await pdfDoc.embedPng(logoBytes)
    const logoDims = logoImage.scale(0.45)

    

    page.drawImage(logoImage, { x: 50, y: height - 90, width: logoDims.width, height: logoDims.height })

  // Title
  page.drawText('Recurring Payment Authorization Form', {
    x: 160,
    y: height - 80,
    size: 18,
    font: fontBold,
    color: rgb(0, 0.2, 0.6),
  });

  // Intro Paragraph
  const introText = `
I, ${auth.fullName}, authorize ${companyName} to charge my account as indicated below for payment of services or products as described. 
I understand that this authorization is for a recurring subscription and will remain in effect until I cancel it in writing.`;

  page.drawText(introText.trim(), {
    x: 50,
    y: height - 130,
    size: 12,
    font,
    lineHeight: 14,
    maxWidth: 480,
  });
let y = height - 210; // starting Y position





// Common settings
let rowY = y; // current Y position
const startX = 50;
const underlineWidthRow1and2 = 250; // for longer names/company
const underlineWidthRow3 = 100; // for amount/date/month blanks

// ------------------ Row 1 ------------------
const label1Row1 = "I, ";
const valueRow1 = auth.fullName || "";
const label2Row1 = " (Cardholder), authorize";

page.drawText(label1Row1, { x: startX, y: rowY, size: 12, font: fontBold });
const valueXRow1 = startX + font.widthOfTextAtSize(label1Row1, 12);
page.drawText(valueRow1, { x: valueXRow1, y: rowY, size: 12, font });
page.drawLine({
  start: { x: valueXRow1, y: rowY - 2 },
  end: { x: valueXRow1 + underlineWidthRow1and2, y: rowY - 2 },
  thickness: 1,
  color: rgb(0, 0, 0),
});
const label2XRow1 = valueXRow1 + underlineWidthRow1and2 + 5;
page.drawText(label2Row1, { x: label2XRow1, y: rowY, size: 12, font });

// ------------------ Row 2 ------------------
rowY -= 30;

const valueRow2 = companyName;
const label2Row2 = " (Merchant) to charge my credit/debit card for";

page.drawText("", { x: startX, y: rowY, size: 12, font: fontBold }); // empty label
const valueXRow2 = startX; // no label offset
page.drawText(valueRow2, { x: valueXRow2, y: rowY, size: 12, font });
page.drawLine({
  start: { x: valueXRow2, y: rowY - 2 },
  end: { x: valueXRow2 + underlineWidthRow1and2, y: rowY - 2 },
  thickness: 1,
  color: rgb(0, 0, 0),
});
const label2XRow2 = valueXRow2 + underlineWidthRow1and2 + 5;
page.drawText(label2Row2, { x: label2XRow2, y: rowY, size: 12, font });

// ------------------ Row 3 (One-time + Recurring payment) ------------------
rowY -= 30; // move down from Row 2

const underlineWidthAmount = 150; // wider underline for amounts
const underlineWidthDate = 100;   // underline for date/month

let xPos = startX;

// --- One-time payment ---
const labelOneTime = "a one-time payment of ";
const valueOneTime = auth.amount && auth.currency ? `$${auth.amount.toFixed(2)}` : "";

const labelOneTimeEnd = " and charge my credit/debit card for";

// Label text
page.drawText(labelOneTime, { x: xPos, y: rowY, size: 12, font });
xPos += font.widthOfTextAtSize(labelOneTime, 12);

// Amount underline
page.drawText(valueOneTime, { x: xPos, y: rowY, size: 12, font });
page.drawLine({
  start: { x: xPos, y: rowY - 2 },
  end: { x: xPos + underlineWidthAmount, y: rowY - 2 },
  thickness: 1,
  color: rgb(0, 0, 0),
});
xPos += underlineWidthAmount;

// End label
page.drawText(labelOneTimeEnd, { x: xPos, y: rowY, size: 12, font });

// --- Recurring payment ---
rowY -= 30; // move down for recurring payment
xPos = startX;

const labelRecurring1 = "$";
const valueRecurring = '24.95';
const labelRecurring2 = " on the ";
const valueDate = new Date().toLocaleDateString();
const labelRecurring3 = " of each ";
const valueMonth = "month";

// $Amount
page.drawText(labelRecurring1, { x: xPos, y: rowY, size: 12, font: fontBold });
xPos += font.widthOfTextAtSize(labelRecurring1, 12);
page.drawText(valueRecurring, { x: xPos, y: rowY, size: 12, font });
page.drawLine({
  start: { x: xPos, y: rowY - 2 },
  end: { x: xPos + underlineWidthAmount, y: rowY - 2 },
  thickness: 1,
  color: rgb(0, 0, 0),
});
xPos += underlineWidthAmount;

// " on the "
page.drawText(labelRecurring2, { x: xPos, y: rowY, size: 12, font });
xPos += font.widthOfTextAtSize(labelRecurring2, 12);

// Date underline
page.drawText(valueDate, { x: xPos, y: rowY, size: 12, font });
page.drawLine({
  start: { x: xPos, y: rowY - 2 },
  end: { x: xPos + underlineWidthDate, y: rowY - 2 },
  thickness: 1,
  color: rgb(0, 0, 0),
});
xPos += underlineWidthDate;

// " of each "
page.drawText(labelRecurring3, { x: xPos, y: rowY, size: 12, font });
xPos += font.widthOfTextAtSize(labelRecurring3, 12);

// Month underline
page.drawText(valueMonth, { x: xPos, y: rowY, size: 12, font });
page.drawLine({
  start: { x: xPos, y: rowY - 2 },
  end: { x: xPos + underlineWidthDate, y: rowY - 2 },
  thickness: 1,
  color: rgb(0, 0, 0),
});

// ------------------ Row 4: Billing Information ------------------
rowY -= 40;
xPos = startX;

// Heading
page.drawText("Billing Information", { x: startX, y: rowY, size: 14, font: fontBold });

// Move down for actual fields
rowY -= 25;
xPos = startX;

// Billing Address
page.drawText("Billing Address: ", { x: xPos, y: rowY, size: 12, font });
xPos += font.widthOfTextAtSize("Billing Address: ", 12);
page.drawText(auth.billingAddress || "", { x: xPos, y: rowY, size: 12, font });
page.drawLine({ start: { x: xPos, y: rowY - 2 }, end: { x: xPos + 300, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) });

// City / State / Zip
rowY -= 30;
xPos = startX;

page.drawText("City: ", { x: xPos, y: rowY, size: 12, font });
xPos += font.widthOfTextAtSize("City: ", 12);
page.drawText(auth.city || "", { x: xPos, y: rowY, size: 12, font });
page.drawLine({ start: { x: xPos, y: rowY - 2 }, end: { x: xPos + 100, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) });
xPos += 100;

page.drawText(" State: ", { x: xPos, y: rowY, size: 12, font });
xPos += font.widthOfTextAtSize(" State: ", 12);
page.drawText(auth.state || "", { x: xPos, y: rowY, size: 12, font });
page.drawLine({ start: { x: xPos, y: rowY - 2 }, end: { x: xPos + 50, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) });
xPos += 50;

page.drawText(" Zip: ", { x: xPos, y: rowY, size: 12, font });
xPos += font.widthOfTextAtSize(" Zip: ", 12);
page.drawText(auth.zip || "", { x: xPos, y: rowY, size: 12, font });
page.drawLine({ start: { x: xPos, y: rowY - 2 }, end: { x: xPos + 70, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) });

// ------------------ Row 5: Payment Card Information ------------------
rowY -= 40;
xPos = startX;

// Heading
page.drawText("Payment Card Information", { x: startX, y: rowY, size: 14, font: fontBold });
rowY -= 25; // spacing below heading
xPos = startX;

const cardTypes = ["Visa", "MasterCard", "American Express", "Discover"];
const boxSize = 12; // size of checkbox
const gap = 10; // space between box and label

cardTypes.forEach((card) => {
  // Draw checkbox rectangle
  page.drawRectangle({
    x: xPos,
    y: rowY - boxSize + 2,
    width: boxSize,
    height: boxSize,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
    color: auth.cardType === card ? rgb(0, 0, 0) : undefined, // fill if selected
  });

  // Draw label
  const labelX = xPos + boxSize + 5;
  page.drawText(card, { x: labelX, y: rowY, size: 12, font });

  // Move xPos for the next checkbox
  xPos = labelX + font.widthOfTextAtSize(card, 12) + gap;
});
// Card Number
rowY -= 25;
xPos = startX;
page.drawText("Card Number: ", { x: xPos, y: rowY, size: 12, font });
xPos += font.widthOfTextAtSize("Card Number: ", 12);
page.drawText(auth.cardNumber || "", { x: xPos, y: rowY, size: 12, font });
page.drawLine({ start: { x: xPos, y: rowY - 2 }, end: { x: xPos + 200, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) });

// Expiration
xPos += 200 + 10; // gap after card number
page.drawText(" Expiration: ", { x: xPos, y: rowY, size: 12, font });
xPos += font.widthOfTextAtSize(" Expiration: ", 12);
page.drawText(auth.expiration || "", { x: xPos, y: rowY, size: 12, font });
page.drawLine({ start: { x: xPos, y: rowY - 2 }, end: { x: xPos + 60, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) });

// CVV
xPos += 60 + 10; // gap after expiration
page.drawText(" CVV: ", { x: xPos, y: rowY, size: 12, font });
xPos += font.widthOfTextAtSize(" CVV: ", 12);
page.drawText(auth.cvv || "", { x: xPos, y: rowY, size: 12, font });
page.drawLine({ start: { x: xPos, y: rowY - 2 }, end: { x: xPos + 50, y: rowY - 2 }, thickness: 1, color: rgb(0, 0, 0) });







  // Legal Statement
  const legalText = `
I authorize ${companyName} to make recurring charges to my account as indicated above for the amount stated. 
I understand that I may cancel this authorization at any time by providing written notice prior to the next scheduled payment. 
I confirm that I am an authorized user of this account and that I will not dispute these payments with my bank or credit card company 
so long as the transactions correspond to the terms indicated in this agreement.`;

  page.drawText(legalText.trim(), {
    x: 50,
    y: y - 300,
    size: 11,
    font,
    lineHeight: 14,
    maxWidth: 480,
  });






    // Signature
  page.drawText('Signature:', { x: 50, y: y - 430, size: 12, font: fontBold });
  const pngImage = await pdfDoc.embedPng(signatureDataUrl);
  page.drawImage(pngImage, { x: 130, y: y - 510, width: 200, height: 80 });

  // Date Signed
  page.drawText(`Date Signed: ${new Date().toLocaleString()}`, {
    x: 50,
    y: y - 530,
    size: 10,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });




  

  // Footer
  page.drawText(
    'By signing electronically, you confirm your consent to recurring charges and acknowledge this as a legal signature under the E-Sign Act.',
    {
      x: 50,
      y: 80,
      size: 10,
      font,
      lineHeight: 12,
      color: rgb(0.25, 0.25, 0.25),
      maxWidth: 480,
    }
  );

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}



async function submitForm(auth: PaymentAuthorization) {
  const pad = signaturePads[auth.id];
  if (!pad || pad.isEmpty()) {
    error.value = 'Please sign before submitting.';
    return;
  }
  if (!consent[auth.id]) {
    error.value = 'You must consent to e-sign this authorization.';
    return;
  }

  error.value = '';
  message.value = '';

  const signatureDataUrl = pad.toDataURL();
  const pdfBlob = await generatePdf(auth, signatureDataUrl);

  const formData = new FormData();
  formData.append('pdf', pdfBlob, 'payment_authorization.pdf');
  formData.append('signatureImageUrl', signatureDataUrl);
  formData.append('amount', auth.amount.toString());
  formData.append('currency', auth.currency);
  formData.append('paymentMethod', auth.paymentMethod);
  formData.append('description', auth.description || '');
  formData.append('fullName', auth.fullName);
  formData.append('email', auth.email);

  try {
    const authToken = useCookie('auth_token').value;
    const res = await axios.post('/api/payment-authorization/sign', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
    });
    auth.pdfUrl = res.data.pdfUrl;
    message.value = 'Payment authorization signed successfully!';
    emit("completed")
  } catch (err: any) {
    console.error(err);
    error.value = err.response?.data?.message || err.message || 'Failed to submit';
  }
}

function downloadExistingPdf(url: string) {
  window.open(url, '_blank');
}


</script>
