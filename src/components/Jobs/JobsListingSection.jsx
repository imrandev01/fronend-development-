import React, { useState, useEffect } from 'react';
import JobsFilter from './JobsFilter';
import JobCard from './JobCard';
import { jobsData } from './jobsListingData';

export default function JobsListingSection() {
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);

    // Filter jobs based on selected criteria
    let filtered = jobsData;

    // Apply role filter
    if (filters.roles.length > 0) {
      filtered = filtered.filter((job) =>
        filters.roles.some((role) => 
          job.title.toLowerCase().includes(role.toLowerCase())
        )
      );
    }

    // Apply location filter
    if (filters.locations.length > 0) {
      filtered = filtered.filter((job) =>
        filters.locations.includes(job.location)
      );
    }

    // Apply experience filter
    if (filters.experience.length > 0) {
      filtered = filtered.filter((job) => {
        return filters.experience.some((exp) => {
          // Extract years from filter (e.g., "3-5 years" -> [3, 5])
          const expMatch = exp.match(/(\d+)(-(\d+))?/);
          if (!expMatch) return false;
          
          const filterMin = parseInt(expMatch[1]);
          const filterMax = expMatch[3] ? parseInt(expMatch[3]) : filterMin;
          
          // Extract years from job experience
          const jobExpMatch = job.experience.match(/(\d+)(-(\d+))?/);
          if (!jobExpMatch) return false;
          
          const jobMin = parseInt(jobExpMatch[1]);
          const jobMax = jobExpMatch[3] ? parseInt(jobExpMatch[3]) : jobMin;
          
          // Check if there's overlap between ranges
          return (
            (jobMin >= filterMin && jobMin <= filterMax) ||
            (jobMax >= filterMin && jobMax <= filterMax) ||
            (filterMin >= jobMin && filterMin <= jobMax) ||
            (filterMax >= jobMin && filterMax <= jobMax)
          );
        });
      });
    }

    // Apply salary filter
    if (filters.salaryRanges.length > 0) {
      filtered = filtered.filter((job) => {
        return filters.salaryRanges.some((range) => {
          const [filterMin] = range.split('-').map(s => parseInt(s.trim()));
          const [jobMin] = job.salary.split('-').map(s => parseInt(s.trim()));
          return jobMin >= filterMin;
        });
      });
    }

    // Apply qualification filter (you can add this logic based on job data)
    // Apply employer type filter (you can add this logic based on job data)

    setFilteredJobs(filtered);
  };

  return (
    <section className="bg-slate-50">
      {/* Filter Bar */}
      <JobsFilter onFilterChange={handleFilterChange} />

      {/* Jobs Listing */}
      <div className="max-w-6xl mx-auto px-4 py-2 md:py-2">
        {/* Results Count */}
        <div className="mb-2 md:mb-2">
          <p className="text-xs md:text-sm text-slate-600">
            Showing <span className="font-semibold">{filteredJobs.length}</span> jobs
            {Object.values(activeFilters).some((arr) => arr.length > 0) && (
              <span> based on your filters</span>
            )}
          </p>
        </div>

        {/* Job Cards Grid - Smaller gap on mobile */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-16">
            <p className="text-slate-600 mb-2 text-sm md:text-base">No jobs found matching your criteria</p>
            <p className="text-xs md:text-sm text-slate-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </section>
  );
}