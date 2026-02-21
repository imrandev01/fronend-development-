import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'company-verifications.json');

let submissionWriteQueue = Promise.resolve();

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf8');
  }
}

export async function readSubmissions() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, 'utf8');

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('Failed to parse submission storage JSON file');
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Submission storage JSON must be an array');
  }

  return parsed;
}

export async function writeSubmissions(submissions) {
  if (!Array.isArray(submissions)) {
    throw new TypeError('submissions must be an array');
  }

  await ensureDataFile();
  const payload = JSON.stringify(submissions, null, 2);
  const tempFile = `${DATA_FILE}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tempFile, payload, 'utf8');
  await fs.rename(tempFile, DATA_FILE);
}

export async function appendSubmission(submission) {
  const writeTask = submissionWriteQueue.then(async () => {
    const submissions = await readSubmissions();
    submissions.push(submission);
    await writeSubmissions(submissions);
  });

  submissionWriteQueue = writeTask.catch(() => {});
  await writeTask;
}
