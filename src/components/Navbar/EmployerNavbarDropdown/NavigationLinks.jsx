import JobsLink from '../JobsLink';
import CompaniesDropdown from './CompaniesDropdown';
import ServicesDropdown from './ServicesDropdown';
import ResumeDropdown from './ResumeDropdown';

const NavigationLinks = () => {
  return (
    <div className="hidden md:flex items-center gap-0.5">
      <JobsLink />
      <CompaniesDropdown />
      <ServicesDropdown />
      <ResumeDropdown />
    </div>
  );
};

export default NavigationLinks;