import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CampaignIcon from '@mui/icons-material/Campaign';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StorageIcon from '@mui/icons-material/Storage';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PsychologyIcon from '@mui/icons-material/Psychology';

// Icon mapping
const iconMap = {
  code: CodeIcon,
  dashboard: DashboardIcon,
  analytics: AnalyticsIcon,
  design_services: DesignServicesIcon,
  campaign: CampaignIcon,
  trending_up: TrendingUpIcon,
  people: PeopleIcon,
  account_balance: AccountBalanceIcon,
  edit: EditIcon,
  settings: SettingsIcon,
  business: BusinessIcon,
  receipt: ReceiptIcon,
  storage: StorageIcon,
  support_agent: SupportAgentIcon,
  local_shipping: LocalShippingIcon,
  psychology: PsychologyIcon,
};

export default function RoleCard({ role }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/jobs/search?role=${encodeURIComponent(role.name)}`);
  };

  // Get the icon component
  const IconComponent = iconMap[role.icon] || CodeIcon;

  return (
    <button
      onClick={handleClick}
      className="group bg-white rounded-lg p-3 border border-slate-200 hover:border-violet-400 hover:shadow-md transition-all duration-300 text-left"
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center mb-2 group-hover:bg-violet-100 transition-colors">
          <IconComponent className="text-violet-600" sx={{ fontSize: 20 }} />
        </div>

        {/* Role Name */}
        <h3 className="text-xs font-semibold text-slate-900 mb-1 group-hover:text-violet-600 transition-colors line-clamp-2">
          {role.name}
        </h3>

        {/* Job Count */}
        <p className="text-[0.625rem] text-slate-500">
          {role.count >= 1000 ? `${(role.count / 1000).toFixed(1)}k` : role.count} jobs
        </p>
      </div>
    </button>
  );
}

RoleCard.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    industry: PropTypes.string.isRequired,
  }).isRequired,
};