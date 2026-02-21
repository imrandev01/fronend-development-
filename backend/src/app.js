import express from 'express';
import cors from 'cors';
import multer from 'multer';
import crypto from 'node:crypto';
import { readSubmissions, writeSubmissions } from './storage.js';

const requiredFields = [
  'companyName',
  'registrationNumber',
  'taxId',
  'industry',
  'companySize',
  'yearEstablished',
  'website',
  'address',
  'contactEmail',
  'contactPhone',
  'description',
];

const requiredDocuments = ['registration', 'taxDocument', 'addressProof', 'panCard'];
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

let submissionWriteQueue = Promise.resolve();

async function appendSubmission(submission) {
  const writeTask = submissionWriteQueue.then(async () => {
    const submissions = await readSubmissions();
    submissions.push(submission);
    await writeSubmissions(submissions);
  });

  submissionWriteQueue = writeTask.catch(() => {});
  await writeTask;
}

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'trustcareer-backend' });
  });

  app.get('/api/company-verifications', async (_req, res) => {
    const submissions = await readSubmissions();
    res.json({ total: submissions.length, submissions });
  });

  app.post('/api/company-verifications', upload.fields(requiredDocuments.map((name) => ({ name, maxCount: 1 }))), async (req, res) => {
    const missingFields = requiredFields.filter((field) => !String(req.body[field] || '').trim());
    const missingDocuments = requiredDocuments.filter((doc) => !(req.files?.[doc]?.[0]));

    if (missingFields.length || missingDocuments.length) {
      return res.status(400).json({
        error: 'Validation failed',
        missingFields,
        missingDocuments,
      });
    }

    const submission = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      company: Object.fromEntries(requiredFields.map((field) => [field, req.body[field]])),
      documents: requiredDocuments.map((doc) => ({
        type: doc,
        originalName: req.files[doc][0].originalname,
        mimeType: req.files[doc][0].mimetype,
        size: req.files[doc][0].size,
      })),
    };

    await appendSubmission(submission);

    return res.status(201).json({
      message: 'Company verification submitted successfully',
      submissionId: submission.id,
      status: submission.status,
    });
  });

  return app;
}
