import express from 'express';
import cors from 'cors';
import multer from 'multer';
import crypto from 'node:crypto';
import { appendSubmission, readSubmissions } from './storage.js';

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

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidWebsite(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function validateSubmissionInput(body, files) {
  const missingFields = requiredFields.filter((field) => !String(body[field] || '').trim());
  const missingDocuments = requiredDocuments.filter((doc) => !(files?.[doc]?.[0]));
  const invalidFields = [];

  if (body.contactEmail && !isValidEmail(String(body.contactEmail))) {
    invalidFields.push('contactEmail');
  }

  if (body.website && !isValidWebsite(String(body.website))) {
    invalidFields.push('website');
  }

  if (body.yearEstablished) {
    const year = Number(body.yearEstablished);
    const currentYear = new Date().getUTCFullYear();

    if (!Number.isInteger(year) || year < 1800 || year > currentYear) {
      invalidFields.push('yearEstablished');
    }
  }

  return { missingFields, missingDocuments, invalidFields };
}

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'trustcareer-backend' });
  });

  app.get('/api/company-verifications', async (_req, res, next) => {
    try {
      const submissions = await readSubmissions();
      res.json({ total: submissions.length, submissions });
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/company-verifications', upload.fields(requiredDocuments.map((name) => ({ name, maxCount: 1 }))), async (req, res, next) => {
    const { missingFields, missingDocuments, invalidFields } = validateSubmissionInput(req.body, req.files);

    if (missingFields.length || missingDocuments.length || invalidFields.length) {
      return res.status(400).json({
        error: 'Validation failed',
        missingFields,
        missingDocuments,
        invalidFields,
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

    try {
      await appendSubmission(submission);
    } catch (error) {
      return next(error);
    }

    return res.status(201).json({
      message: 'Company verification submitted successfully',
      submissionId: submission.id,
      status: submission.status,
    });
  });

  app.use((error, _req, res, next) => {
    if (error instanceof multer.MulterError) {
      const statusCode = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
      return res.status(statusCode).json({
        error: 'File upload error',
        message: error.message,
        code: error.code,
      });
    }

    if (res.headersSent) {
      return next(error);
    }

    return res.status(500).json({
      error: 'Internal server error',
    });
  });

  return app;
}
