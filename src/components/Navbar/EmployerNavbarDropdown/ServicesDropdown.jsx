import DropdownMenu from './DropdownMenu';
import { servicesMenuItems } from '../navigationData';

const ServicesDropdown = () => {
  return <DropdownMenu title="Services" items={servicesMenuItems} />;
};

export default ServicesDropdown;