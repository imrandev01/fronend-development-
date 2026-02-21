import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from '../src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.resolve(__dirname, '../data/company-verifications.json');

test.beforeEach(async () => {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, '[]', 'utf8');
});

test('health check endpoint responds ok', async () => {
  const res = await request(createApp()).get('/api/health');

  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
});

test('company verification submission accepts valid payload', async () => {
  const app = createApp();
  const response = await request(app)
    .post('/api/company-verifications')
    .field('companyName', 'Acme Inc')
    .field('registrationNumber', 'REG123')
    .field('taxId', 'TAX123')
    .field('industry', 'Technology')
    .field('companySize', '11-50')
    .field('yearEstablished', '2020')
    .field('website', 'https://acme.example')
    .field('address', 'Main Street')
    .field('contactEmail', 'hr@acme.example')
    .field('contactPhone', '+123456789')
    .field('description', 'A'.repeat(60))
    .attach('registration', Buffer.from('doc-1'), 'registration.pdf')
    .attach('taxDocument', Buffer.from('doc-2'), 'tax.pdf')
    .attach('addressProof', Buffer.from('doc-3'), 'address.pdf')
    .attach('panCard', Buffer.from('doc-4'), 'pan.pdf');

  assert.equal(response.status, 201);
  assert.equal(response.body.status, 'pending');

  const stored = JSON.parse(await fs.readFile(dataFile, 'utf8'));
  assert.equal(stored.length, 1);
  assert.equal(stored[0].company.companyName, 'Acme Inc');
  assert.equal(stored[0].documents.length, 4);
});
