import React from 'react';
import SearchBar from '../Common/SearchBar';
import HeroHeader from './HeroHeader';
import HeroActions from './HeroActions';
import StatsGrid from './StatsGrid';
import FeaturedCompanies from './FeaturedCompanies/FeaturedCompanies';

export default function Hero() {
  return (
    <section className="text-center py-8 md:py-20 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <HeroHeader />

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-5">
          <SearchBar />
        </div>

        {/* Action Buttons */}
        <HeroActions />

        {/* Statistics Cards */}
        {/* <StatsGrid /> */}

        {/* Featured Companies */}
        <FeaturedCompanies />
      </div>
        

    </section>
  );
}