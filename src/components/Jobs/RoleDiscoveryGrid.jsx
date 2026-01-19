import React from 'react';
import RoleCard from './RoleCard';
import { popularRoles } from './jobsData';

export default function RoleDiscoveryGrid() {
  return (
    <div className="mt-2 hidden md:block">
      <div className="text-center mb-5">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
          Browse Popular Roles
        </h2>
        {/* <p className="text-xs text-slate-600">
          Quick access to the most in-demand positions
        </p> */}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 gap-3">
        {popularRoles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}