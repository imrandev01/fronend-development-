import PropTypes from 'prop-types';
import { CheckCircle } from '@mui/icons-material';
import Button from '../../Common/Button';

const SuccessMessage = ({ onDashboardRedirect }) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle sx={{ fontSize: 48, color: '#10b981' }} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Verification Request Submitted!
      </h2>
      
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        Your company verification request has been submitted successfully. 
        Our team will review your documents and get back to you within 2-3 business days.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto mb-6">
        <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-800 space-y-2 text-left">
          <li className="flex items-start gap-2">
            <span>1.</span>
            <span>Our team will verify your documents (2-3 business days)</span>
          </li>
          <li className="flex items-start gap-2">
            <span>2.</span>
            <span>You'll receive an email notification about the verification status</span>
          </li>
          <li className="flex items-start gap-2">
            <span>3.</span>
            <span>Once approved, you can start posting jobs and hiring candidates</span>
          </li>
        </ul>
      </div>

      <div className="flex gap-3 justify-center">
        <Button variant="primary" onClick={onDashboardRedirect}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

SuccessMessage.propTypes = {
  onDashboardRedirect: PropTypes.func.isRequired,
};

export default SuccessMessage;