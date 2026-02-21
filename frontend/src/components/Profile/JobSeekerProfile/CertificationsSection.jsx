import React from 'react';
import PropTypes from 'prop-types';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VerifiedIcon from '@mui/icons-material/Verified';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function CertificationsSection({ certifications, onAdd, onEdit, onDelete }) {
  const formatDate = (date) => {
    if (!date) return 'No expiry';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Certifications</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 px-3 py-1.5 text-violet-600 hover:bg-violet-50 rounded-lg text-sm font-semibold transition-colors"
        >
          <AddIcon sx={{ fontSize: 18 }} />
          Add Certification
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="group border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all relative"
          >
            {/* Edit/Delete Buttons */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center hover:bg-violet-50 text-violet-600">
                <EditIcon sx={{ fontSize: 14 }} />
              </button>
              <button className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-50 text-red-600">
                <DeleteIcon sx={{ fontSize: 14 }} />
              </button>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <CardMembershipIcon className="text-green-600" sx={{ fontSize: 24 }} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-1 mb-1">
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{cert.name}</h3>
                  {cert.credentialUrl && <VerifiedIcon className="text-green-600" sx={{ fontSize: 16 }} />}
                </div>
                <p className="text-xs text-slate-600 mb-2">{cert.issuer}</p>
                
                <div className="text-xs text-slate-500 space-y-1">
                  <p>Issued: {formatDate(cert.issueDate)}</p>
                  {cert.expiryDate && (
                    <p className={isExpired(cert.expiryDate) ? 'text-red-600' : ''}>
                      {isExpired(cert.expiryDate) ? 'Expired' : 'Expires'}: {formatDate(cert.expiryDate)}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="font-mono">ID: {cert.credentialId}</p>
                  )}
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium mt-3"
                  >
                    <OpenInNewIcon sx={{ fontSize: 12 }} />
                    View Credential
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {certifications.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <CardMembershipIcon sx={{ fontSize: 48 }} className="mb-2" />
          <p className="text-sm">No certifications added yet</p>
          <p className="text-xs mt-1">Add certifications to boost your profile</p>
        </div>
      )}
    </div>
  );
}

CertificationsSection.propTypes = {
  certifications: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};