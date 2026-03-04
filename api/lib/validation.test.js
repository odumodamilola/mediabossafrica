import assert from 'node:assert/strict';
import { applySchema, contactSchema, consultationSchema, sanitizeSubject, validateWebsite } from './validation.js';

function run() {
  const consultationPayload = {
    formType: 'consultation',
    brandName: 'Acme',
    contactPerson: 'Jane Doe',
    email: 'jane@example.com',
    phoneNumber: '+2348012345678',
    website: 'https://acme.com',
    industry: 'Tech',
    location: 'Lagos',
    goals: ['Increase brand awareness'],
    targetAudience: 'Young professionals in Lagos',
    platforms: ['Instagram'],
    services: ['Influencer Marketing'],
    budget: 'NGN 1,000,000 - NGN 5,000,000',
  };
  assert.equal(consultationSchema.safeParse(consultationPayload).success, true);

  const badContact = {
    formType: 'contact',
    name: 'User',
    email: 'not-an-email',
    category: 'brand',
    message: 'Hello there',
  };
  assert.equal(contactSchema.safeParse(badContact).success, false);

  const applyPayload = {
    formType: 'apply',
    name: 'Creator Name',
    email: 'creator@example.com',
    platformLink: 'https://instagram.com/creator',
    followerCount: '10k - 50k',
    niche: 'Lifestyle & Tech',
    whyMediaboss: 'I want to scale with structured management.',
  };
  assert.equal(applySchema.safeParse(applyPayload).success, true);

  assert.equal(validateWebsite('example.com'), 'https://example.com/');
  assert.equal(validateWebsite('http://localhost:3000'), '');
  assert.equal(validateWebsite('http://192.168.1.10'), '');

  const output = sanitizeSubject(`hello\r\nworld ${'x'.repeat(200)}`);
  assert.equal(output.includes('\n'), false);
  assert.equal(output.length <= 100, true);

  console.log('validation tests passed');
}

run();