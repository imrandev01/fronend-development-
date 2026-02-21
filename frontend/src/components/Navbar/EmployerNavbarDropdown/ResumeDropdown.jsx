import DropdownMenu from './DropdownMenu';
import { resumeMenuItems } from '../navigationData';

const ResumeDropdown = () => {
  return <DropdownMenu title="Resume" items={resumeMenuItems} />;
};

export default ResumeDropdown;