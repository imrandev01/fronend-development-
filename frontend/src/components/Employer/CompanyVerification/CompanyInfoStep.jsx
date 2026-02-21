import PropTypes from 'prop-types';
import FormInput from '../../Common/FormInput';

const CompanyInfoStep = ({ formData, errors, onChange }) => {
  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'other', label: 'Other' },
  ];

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">
          Company Information
        </h3>
        <p className="text-sm text-slate-500">
          Enter your company details for verification
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={onChange}
          error={errors.companyName}
          required
          placeholder="e.g., Tech Solutions Inc."
        />

        <FormInput
          label="Legal Name (if different)"
          name="legalName"
          value={formData.legalName}
          onChange={onChange}
          error={errors.legalName}
          placeholder="e.g., Tech Solutions Private Limited"
        />

        <FormInput
          label="Registration Number"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={onChange}
          error={errors.registrationNumber}
          required
          placeholder="e.g., CIN/Registration No."
        />

        <FormInput
          label="Tax ID / GST Number"
          name="taxId"
          value={formData.taxId}
          onChange={onChange}
          error={errors.taxId}
          required
          placeholder="e.g., GST/Tax ID"
        />

        <FormInput
          label="Industry"
          name="industry"
          value={formData.industry}
          onChange={onChange}
          error={errors.industry}
          required
          select
          options={industryOptions}
        />

        <FormInput
          label="Company Size"
          name="companySize"
          value={formData.companySize}
          onChange={onChange}
          error={errors.companySize}
          required
          select
          options={companySizeOptions}
        />

        <FormInput
          label="Year Established"
          name="yearEstablished"
          value={formData.yearEstablished}
          onChange={onChange}
          error={errors.yearEstablished}
          required
          type="number"
          placeholder="e.g., 2010"
        />

        <FormInput
          label="Company Website"
          name="website"
          value={formData.website}
          onChange={onChange}
          error={errors.website}
          required
          type="url"
          placeholder="https://www.example.com"
        />
      </div>

      <FormInput
        label="Headquarters Address"
        name="address"
        value={formData.address}
        onChange={onChange}
        error={errors.address}
        required
        multiline
        rows={3}
        placeholder="Enter complete address with city, state, and PIN code"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Contact Email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={onChange}
          error={errors.contactEmail}
          required
          type="email"
          placeholder="contact@company.com"
        />

        <FormInput
          label="Contact Phone"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={onChange}
          error={errors.contactPhone}
          required
          type="tel"
          placeholder="+91 XXXXXXXXXX"
        />
      </div>

      <FormInput
        label="Company Description"
        name="description"
        value={formData.description}
        onChange={onChange}
        error={errors.description}
        required
        multiline
        rows={4}
        placeholder="Briefly describe your company, what you do, and your mission..."
        helperText={`${formData.description.length}/500 characters`}
        inputProps={{ maxLength: 500 }}
      />
    </div>
  );
};

CompanyInfoStep.propTypes = {
  formData: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    legalName: PropTypes.string,
    registrationNumber: PropTypes.string.isRequired,
    taxId: PropTypes.string.isRequired,
    industry: PropTypes.string.isRequired,
    companySize: PropTypes.string.isRequired,
    yearEstablished: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    contactEmail: PropTypes.string.isRequired,
    contactPhone: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CompanyInfoStep;