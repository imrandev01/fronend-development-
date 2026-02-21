// src/App.jsx

import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import EmployerNavbar from './components/Navbar/EmployerNavbar';
import Footer from './components/Footer/Footer';

const Home = lazy(() => import('./pages/Home'));
const Jobs = lazy(() => import('./pages/Jobs'));
const EmployeeProfile = lazy(() => import('./pages/EmployeeMenu'));
const EmployerHome = lazy(() => import('./pages/EmployerHome'));
const CompanyVerificationForm = lazy(() => import('./components/Employer/CompanyVerification/CompanyVerificationForm'));

function AppContent() {
  const location = useLocation();
  const isEmployerArea = location.pathname.startsWith('/employer');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Conditional Navbar */}
      {isEmployerArea ? <EmployerNavbar /> : <Navbar />}

      <main className="flex-1">
        <Suspense fallback={<div className="p-20 text-center text-slate-500">Loading page...</div>}>
          <Routes>
            {/* Job Seeker Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/search" element={<Jobs />} />
            <Route path="/profile" element={<EmployeeProfile />} />

            {/* Employer Routes */}
            <Route path="/employer" element={<EmployerHome />} />
            <Route path="/employer/register" element={<div className="p-20 text-center">Employer Register Page - Coming Soon</div>} />
            <Route path="/employer/login" element={<div className="p-20 text-center">Employer Login Page - Coming Soon</div>} />
            <Route path="/employer/dashboard" element={<div className="p-20 text-center">Employer Dashboard Page - Coming Soon</div>} />
            {/* Add more employer routes as needed */}
            <Route path="/employer/verify-company" element={<CompanyVerificationForm />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
