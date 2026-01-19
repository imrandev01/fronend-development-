import PropTypes from 'prop-types';
import { Check } from '@mui/icons-material';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-all duration-300
                    ${isCompleted 
                      ? 'bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white' 
                      : isCurrent
                      ? 'bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white ring-4 ring-purple-100'
                      : 'bg-slate-200 text-slate-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check sx={{ fontSize: 20 }} />
                  ) : (
                    stepNumber
                  )}
                </div>
                
                {/* Step Label */}
                <p
                  className={`
                    mt-2 text-xs font-medium text-center
                    ${isCurrent ? 'text-purple-600' : 'text-slate-500'}
                  `}
                >
                  {step.label}
                </p>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-1 mx-2 rounded transition-all duration-300
                    ${isCompleted 
                      ? 'bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]' 
                      : 'bg-slate-200'
                    }
                  `}
                  style={{ marginBottom: '2rem' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

StepIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StepIndicator;