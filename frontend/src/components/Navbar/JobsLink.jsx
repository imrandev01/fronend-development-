import { useNavigate } from 'react-router-dom';

const JobsLink = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/jobs')}
      className="px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors text-sm font-medium text-slate-700 hover:text-violet-600"
    >
      Jobs
    </button>
  );
};

export default JobsLink;