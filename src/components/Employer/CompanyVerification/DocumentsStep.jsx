import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  CloudUpload, 
  CheckCircle, 
  Error as ErrorIcon,
  Delete 
} from '@mui/icons-material';
import { IconButton } from '@mui/material';

const DocumentsStep = ({ formData, errors, onFileChange, onFileRemove }) => {
  const documentTypes = [
    {
      id: 'registration',
      label: 'Company Registration Certificate',
      required: true,
      description: 'Certificate of Incorporation or Registration',
      acceptedFormats: '.pdf, .jpg, .png',
    },
    {
      id: 'taxDocument',
      label: 'Tax Registration Document',
      required: true,
      description: 'GST Certificate or Tax Registration Proof',
      acceptedFormats: '.pdf, .jpg, .png',
    },
    {
      id: 'addressProof',
      label: 'Address Proof',
      required: true,
      description: 'Utility bill, lease agreement, or property documents',
      acceptedFormats: '.pdf, .jpg, .png',
    },
    {
      id: 'panCard',
      label: 'Company PAN Card',
      required: true,
      description: 'Permanent Account Number (PAN) of the company',
      acceptedFormats: '.pdf, .jpg, .png',
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">
          Upload Verification Documents
        </h3>
        <p className="text-sm text-slate-500">
          Please upload clear copies of the following documents
        </p>
      </div>

      <div className="space-y-4">
        {documentTypes.map((doc) => (
          <FileUploadCard
            key={doc.id}
            documentType={doc}
            file={formData.documents[doc.id]}
            error={errors[doc.id]}
            onFileChange={(file) => onFileChange(doc.id, file)}
            onFileRemove={() => onFileRemove(doc.id)}
          />
        ))}
      </div>

      {/* General Upload Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          📋 Document Upload Guidelines:
        </h4>
        <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
          <li>Upload clear, readable copies of documents</li>
          <li>Maximum file size: 5MB per document</li>
          <li>Accepted formats: PDF, JPG, PNG</li>
          <li>Ensure all text is visible and not blurred</li>
          <li>Documents should be recent (within last 6 months)</li>
        </ul>
      </div>
    </div>
  );
};

// File Upload Card Component
const FileUploadCard = ({ documentType, file, error, onFileChange, onFileRemove }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  const validateAndUpload = (file) => {
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Only PDF, JPG, and PNG files are allowed');
      return;
    }

    setUploadError('');
    onFileChange(file);
  };

  const hasFile = Boolean(file);
  const hasError = Boolean(error || uploadError);

  return (
    <div
      className={`
        border-2 border-dashed rounded-lg p-4 transition-all
        ${dragActive ? 'border-purple-500 bg-purple-50' : ''}
        ${hasError ? 'border-red-300 bg-red-50' : 'border-slate-300'}
        ${hasFile && !hasError ? 'border-green-300 bg-green-50' : ''}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-800">
              {documentType.label}
              {documentType.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </h4>
            {hasFile && !hasError && (
              <CheckCircle className="text-green-600" sx={{ fontSize: 18 }} />
            )}
            {hasError && (
              <ErrorIcon className="text-red-600" sx={{ fontSize: 18 }} />
            )}
          </div>
          
          <p className="text-xs text-slate-500 mt-1">
            {documentType.description}
          </p>
          
          {hasFile ? (
            <div className="mt-2 flex items-center gap-2">
              <p className="text-xs text-slate-700 font-medium">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
              <IconButton
                size="small"
                onClick={onFileRemove}
                sx={{ color: '#ef4444' }}
              >
                <Delete sx={{ fontSize: 16 }} />
              </IconButton>
            </div>
          ) : (
            <label className="mt-2 inline-block cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept={documentType.acceptedFormats}
                onChange={handleChange}
              />
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <CloudUpload sx={{ fontSize: 16, color: '#667eea' }} />
                <span className="text-xs font-medium text-slate-700">
                  Choose File or Drag Here
                </span>
              </div>
            </label>
          )}
          
          {hasError && (
            <p className="text-xs text-red-600 mt-1">
              {error || uploadError}
            </p>
          )}
          
          <p className="text-xs text-slate-400 mt-1">
            {documentType.acceptedFormats}
          </p>
        </div>
      </div>
    </div>
  );
};

FileUploadCard.propTypes = {
  documentType: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    acceptedFormats: PropTypes.string.isRequired,
  }).isRequired,
  file: PropTypes.object,
  error: PropTypes.string,
  onFileChange: PropTypes.func.isRequired,
  onFileRemove: PropTypes.func.isRequired,
};

DocumentsStep.propTypes = {
  formData: PropTypes.shape({
    documents: PropTypes.object.isRequired,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onFileRemove: PropTypes.func.isRequired,
};

export default DocumentsStep;