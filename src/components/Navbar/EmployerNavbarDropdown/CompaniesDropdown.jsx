import DropdownMenu from './DropdownMenu';
import { companiesMenuItems } from '../navigationData';

const CompaniesDropdown = () => {
  return <DropdownMenu title="Companies" items={companiesMenuItems} />;
};

export default CompaniesDropdown;