import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Button from '../../Common/Button';
import StepIndicator from './StepIndicator';
import CompanyInfoStep from './CompanyInfoStep';
import DocumentsStep from './DocumentsStep';
import ReviewStep from './ReviewStep';
import SuccessMessage from './SuccessMessage';

const STEPS = [
  { id: 1, label: 'Company Info' },
  { id: 2, label: 'Documents' },
  { id: 3, label: 'Review' },
];

const CompanyVerificationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    legalName: '',
    registrationNumber: '',
    taxId: '',
    industry: '',
    companySize: '',
    yearEstablished: '',
    website: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    documents: {
      registration: null,
      taxDocument: null,
      addressProof: null,
      panCard: null,
    },
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle file change
  const handleFileChange = (documentType, file) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
    
    // Clear error
    if (errors[documentType]) {
      setErrors(prev => ({
        ...prev,
        [documentType]: ''
      }));
    }
  };

  // Handle file remove
  const handleFileRemove = (documentType) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: null
      }
    }));
  };

  // Validate Step 1
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number is required';
    }

    if (!formData.taxId.trim()) {
      newErrors.taxId = 'Tax ID is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }

    if (!formData.companySize) {
      newErrors.companySize = 'Please select company size';
    }

    if (!formData.yearEstablished) {
      newErrors.yearEstablished = 'Year established is required';
    } else if (formData.yearEstablished < 1800 || formData.yearEstablished > new Date().getFullYear()) {
      newErrors.yearEstablished = 'Please enter a valid year';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    } else if (!/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email';
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Company description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2
  const validateStep2 = () => {
    const newErrors = {};
    const requiredDocs = ['registration', 'taxDocument', 'addressProof', 'panCard'];

    requiredDocs.forEach(doc => {
      if (!formData.documents[doc]) {
        newErrors[doc] = 'This document is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }

    if (isValid && currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
      const payload = new FormData();

      payload.append('companyName', formData.companyName);
      payload.append('registrationNumber', formData.registrationNumber);
      payload.append('taxId', formData.taxId);
      payload.append('industry', formData.industry);
      payload.append('companySize', formData.companySize);
      payload.append('yearEstablished', formData.yearEstablished);
      payload.append('website', formData.website);
      payload.append('address', formData.address);
      payload.append('contactEmail', formData.contactEmail);
      payload.append('contactPhone', formData.contactPhone);
      payload.append('description', formData.description);

      Object.entries(formData.documents).forEach(([key, value]) => {
        if (value) {
          payload.append(key, value);
        }
      });

      const response = await fetch(`${apiBase}/company-verifications`, {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // If submitted, show success message
  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SuccessMessage 
          onDashboardRedirect={() => navigate('/employer/dashboard')} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent mb-2">
          Company Verification
        </h1>
        <p className="text-slate-600">
          Complete the verification process to start posting jobs and hiring candidates
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} steps={STEPS} />

      {/* Form Container */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        {currentStep === 1 && (
          <CompanyInfoStep
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        )}

        {currentStep === 2 && (
          <DocumentsStep
            formData={formData}
            errors={errors}
            onFileChange={handleFileChange}
            onFileRemove={handleFileRemove}
          />
        )}

        {currentStep === 3 && (
          <ReviewStep formData={formData} />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="mobile-menu"
          onClick={handlePrevious}
          className={`flex items-center gap-2 ${currentStep === 1 ? 'invisible' : ''}`}
        >
          <ArrowBack sx={{ fontSize: 18 }} />
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button
            variant="primary"
            onClick={handleNext}
            className="flex items-center gap-2"
          >
            Next
            <ArrowForward sx={{ fontSize: 18 }} />
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading}
            className="min-w-[150px]"
          >
            {isLoading ? 'Submitting...' : 'Submit for Verification'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompanyVerificationForm;