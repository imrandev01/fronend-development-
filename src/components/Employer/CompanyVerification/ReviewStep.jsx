import PropTypes from 'prop-types';
import { 
  Business, 
  Description, 
  AttachFile,
  CheckCircle 
} from '@mui/icons-material';

const ReviewStep = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">
          Review Your Information
        </h3>
        <p className="text-sm text-slate-500">
          Please verify all details before submitting
        </p>
      </div>

      {/* Company Information */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Business className="text-purple-600" sx={{ fontSize: 20 }} />
          <h4 className="font-semibold text-slate-800">Company Information</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReviewItem label="Company Name" value={formData.companyName} />
          {formData.legalName && (
            <ReviewItem label="Legal Name" value={formData.legalName} />
          )}
          <ReviewItem label="Registration Number" value={formData.registrationNumber} />
          <ReviewItem label="Tax ID" value={formData.taxId} />
          <ReviewItem label="Industry" value={formData.industry} />
          <ReviewItem label="Company Size" value={formData.companySize} />
          <ReviewItem label="Year Established" value={formData.yearEstablished} />
          <ReviewItem label="Website" value={formData.website} />
          <ReviewItem 
            label="Address" 
            value={formData.address} 
            fullWidth 
          />
          <ReviewItem label="Contact Email" value={formData.contactEmail} />
          <ReviewItem label="Contact Phone" value={formData.contactPhone} />
        </div>
      </div>

      {/* Company Description */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Description className="text-purple-600" sx={{ fontSize: 20 }} />
          <h4 className="font-semibold text-slate-800">Company Description</h4>
        </div>
        <p className="text-sm text-slate-700">{formData.description}</p>
      </div>

      {/* Documents */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <AttachFile className="text-purple-600" sx={{ fontSize: 20 }} />
          <h4 className="font-semibold text-slate-800">Uploaded Documents</h4>
        </div>
        <div className="space-y-2">
          {Object.entries(formData.documents).map(([key, file]) => (
            file && (
              <div 
                key={key} 
                className="flex items-center justify-between p-2 bg-white rounded border border-slate-200"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" sx={{ fontSize: 18 }} />
                  <span className="text-sm text-slate-700">{getDocumentLabel(key)}</span>
                </div>
                <span className="text-xs text-slate-500">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </span>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Agreement */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <input 
            type="checkbox" 
            id="agreement" 
            className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            required
          />
          <label htmlFor="agreement" className="text-sm text-slate-700">
            I confirm that all the information provided above is accurate and true to the best of my knowledge. 
            I understand that providing false information may result in rejection of my application or 
            termination of services.
          </label>
        </div>
      </div>
    </div>
  );
};

// Helper Component
const ReviewItem = ({ label, value, fullWidth = false }) => (
  <div className={fullWidth ? 'md:col-span-2' : ''}>
    <p className="text-xs text-slate-500 mb-1">{label}</p>
    <p className="text-sm text-slate-800 font-medium">{value}</p>
  </div>
);

ReviewItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
};

// Helper Function
const getDocumentLabel = (key) => {
  const labels = {
    registration: 'Company Registration Certificate',
    taxDocument: 'Tax Registration Document',
    addressProof: 'Address Proof',
    panCard: 'Company PAN Card',
  };
  return labels[key] || key;
};

ReviewStep.propTypes = {
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
    documents: PropTypes.object.isRequired,
  }).isRequired,
};

export default ReviewStep;