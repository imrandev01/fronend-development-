import React from 'react';
import IndustryRoleSearch from './IndustryRoleSearch';
import RoleDiscoveryGrid from './RoleDiscoveryGrid';
import SearchBar from '../Common/SearchBar';

export default function JobsHero() {
  return (
    <section className="py-2 md:py-2 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Role Discovery Grid - First */}
        <RoleDiscoveryGrid />

        {/* Divider */}
        <div className="my-2 border-t border-slate-200"></div>

        {/* <div className="max-w-3xl mx-auto mb-5">
          <SearchBar />
        </div> */}
      
        {/* Header for Search */}
        {/* <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            Find Jobs by{' '}
            <span className="bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent">
              Role
            </span>
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Discover opportunities tailored to your expertise. Search by industry and role.
          </p>
        </div> */}

        {/* Search Component - Second */}
        {/* <IndustryRoleSearch /> */}

      </div>
    </section>
  );
}