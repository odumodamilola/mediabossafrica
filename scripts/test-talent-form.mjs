import assert from 'node:assert/strict';
import fs from 'node:fs';
import { consultationSchema } from '../api/lib/validation.js';

const validPayload = {
  formType: 'consultation',
  brandName: 'Acme Corp',
  contactPerson: 'Jane Doe',
  email: 'jane@example.com',
  phoneNumber: '08012345678',
  website: 'https://acme.com',
  industry: 'Tech',
  location: 'Lagos',
  goals: ['Increase brand awareness'],
  targetAudience: 'Young professionals',
  platforms: ['Instagram'],
  services: ['Influencer Marketing'],
  budget: 'NGN 1,000,000 - NGN 5,000,000',
};

const validResult = consultationSchema.safeParse(validPayload);
assert.equal(validResult.success, true, 'Expected valid consultation payload to pass');

const invalidPhoneResult = consultationSchema.safeParse({
  ...validPayload,
  phoneNumber: '08012abc678',
});
assert.equal(invalidPhoneResult.success, false, 'Expected phone number with chars to fail');

const apiSource = fs.readFileSync(new URL('../api/consultation.js', import.meta.url), 'utf8');
assert.equal(
  apiSource.includes("to: ['info@mediabossafrica.com']"),
  true,
  'Expected consultation mail recipient to be info@mediabossafrica.com'
);

console.log('talent-form.mjs test passed');
