import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import JobsHero from '../components/Jobs/JobsHero';
import Footer from '../components/Footer/Footer';

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Search */}
        <JobsHero />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}