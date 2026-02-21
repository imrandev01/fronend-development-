import React, { useState } from 'react';
import ProfileHeader from '../components/Profile/JobSeekerProfile/ProfileHeader';
import ProfileCompletion from '../components/Profile/JobSeekerProfile/ProfileCompletion';
import AboutSection from '../components/Profile/JobSeekerProfile/AboutSection';
import ExperienceSection from '../components/Profile/JobSeekerProfile/ExperienceSection';
import EducationSection from '../components/Profile/JobSeekerProfile/EducationSection';
import SkillsSection from '../components/Profile/JobSeekerProfile/SkillsSection';
import ProjectsSection from '../components/Profile/JobSeekerProfile/ProjectsSection';
import CertificationsSection from '../components/Profile/JobSeekerProfile/CertificationsSection';
import ResumeSection from '../components/Profile/JobSeekerProfile/ResumeSection';
import PreferencesSection from '../components/Profile/JobSeekerProfile/PreferencesSection';
import SocialLinksSection from '../components/Profile/JobSeekerProfile/SocialLinksSection';
import { initialProfileData, calculateProfileCompletion } from '../components/Profile/JobSeekerProfile/profileData';

export default function EmployeeProfile() {
  const [profile, setProfile] = useState(initialProfileData);
  const [profileCompletion, setProfileCompletion] = useState(
    calculateProfileCompletion(initialProfileData)
  );

  // Update profile completion whenever profile changes
  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    setProfileCompletion(calculateProfileCompletion(newProfile));
  };

  // Handler for editing profile header
  const handleHeaderEdit = (field, value) => {
    const newProfile = { ...profile, [field]: value };
    updateProfile(newProfile);
  };

  // Handler for saving About section
  const handleAboutSave = (about) => {
    const newProfile = { ...profile, about };
    updateProfile(newProfile);
  };

  // Handlers for Experience
  const handleAddExperience = () => {
    console.log('Add experience modal');
    // Open modal to add experience
  };

  const handleEditExperience = (id) => {
    console.log('Edit experience:', id);
    // Open modal to edit experience
  };

  const handleDeleteExperience = (id) => {
    const newExperience = profile.experience.filter((exp) => exp.id !== id);
    const newProfile = { ...profile, experience: newExperience };
    updateProfile(newProfile);
  };

  // Handlers for Education
  const handleAddEducation = () => {
    console.log('Add education modal');
  };

  const handleEditEducation = (id) => {
    console.log('Edit education:', id);
  };

  const handleDeleteEducation = (id) => {
    const newEducation = profile.education.filter((edu) => edu.id !== id);
    const newProfile = { ...profile, education: newEducation };
    updateProfile(newProfile);
  };

  // Handlers for Skills
  const handleAddSkill = (type, skill) => {
    const newSkills = { ...profile.skills };
    if (type === 'technical') {
      newSkills.technical = [...newSkills.technical, skill];
    } else {
      newSkills.soft = [...newSkills.soft, skill];
    }
    const newProfile = { ...profile, skills: newSkills };
    updateProfile(newProfile);
  };

  const handleDeleteSkill = (type, index) => {
    const newSkills = { ...profile.skills };
    if (type === 'technical') {
      newSkills.technical = newSkills.technical.filter((_, i) => i !== index);
    } else {
      newSkills.soft = newSkills.soft.filter((_, i) => i !== index);
    }
    const newProfile = { ...profile, skills: newSkills };
    updateProfile(newProfile);
  };

  // Handlers for Projects
  const handleAddProject = () => {
    console.log('Add project modal');
  };

  const handleEditProject = (id) => {
    console.log('Edit project:', id);
  };

  const handleDeleteProject = (id) => {
    const newProjects = profile.projects.filter((proj) => proj.id !== id);
    const newProfile = { ...profile, projects: newProjects };
    updateProfile(newProfile);
  };

  // Handlers for Certifications
  const handleAddCertification = () => {
    console.log('Add certification modal');
  };

  const handleEditCertification = (id) => {
    console.log('Edit certification:', id);
  };

  const handleDeleteCertification = (id) => {
    const newCertifications = profile.certifications.filter((cert) => cert.id !== id);
    const newProfile = { ...profile, certifications: newCertifications };
    updateProfile(newProfile);
  };

  // Handlers for Resume
  const handleUploadResume = (file) => {
    console.log('Upload resume:', file);
    // Implement file upload logic
    const newResume = {
      id: Date.now(),
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${Math.round(file.size / 1024)} KB`,
      default: profile.resumes.length === 0,
    };
    const newProfile = { ...profile, resumes: [...profile.resumes, newResume] };
    updateProfile(newProfile);
  };

  const handleDeleteResume = (id) => {
    const newResumes = profile.resumes.filter((resume) => resume.id !== id);
    // If deleted resume was default and there are other resumes, make first one default
    if (newResumes.length > 0 && !newResumes.find(r => r.default)) {
      newResumes[0].default = true;
    }
    const newProfile = { ...profile, resumes: newResumes };
    updateProfile(newProfile);
  };

  const handleSetDefaultResume = (id) => {
    const newResumes = profile.resumes.map((resume) => ({
      ...resume,
      default: resume.id === id,
    }));
    const newProfile = { ...profile, resumes: newResumes };
    updateProfile(newProfile);
  };

  // Handler for Preferences
  const handleSavePreferences = (preferences) => {
    const newProfile = { ...profile, preferences };
    updateProfile(newProfile);
  };

  // Handler for Social Links
  const handleSaveSocialLinks = (socialLinks) => {
    const newProfile = { ...profile, socialLinks };
    updateProfile(newProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <ProfileHeader profile={profile} onEdit={handleHeaderEdit} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Completion */}
            <ProfileCompletion completion={profileCompletion} profile={profile} />

            {/* Social Links */}
            <SocialLinksSection 
              socialLinks={profile.socialLinks} 
              onSave={handleSaveSocialLinks} 
            />

            {/* Job Preferences */}
            <PreferencesSection 
              preferences={profile.preferences} 
              onSave={handleSavePreferences} 
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <AboutSection about={profile.about} onSave={handleAboutSave} />

            {/* Work Experience */}
            <ExperienceSection
              experiences={profile.experience}
              onAdd={handleAddExperience}
              onEdit={handleEditExperience}
              onDelete={handleDeleteExperience}
            />

            {/* Education */}
            <EducationSection
              education={profile.education}
              onAdd={handleAddEducation}
              onEdit={handleEditEducation}
              onDelete={handleDeleteEducation}
            />

            {/* Skills */}
            <SkillsSection
              skills={profile.skills}
              onAdd={handleAddSkill}
              onDelete={handleDeleteSkill}
            />

            {/* Projects */}
            <ProjectsSection
              projects={profile.projects}
              onAdd={handleAddProject}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />

            {/* Certifications */}
            <CertificationsSection
              certifications={profile.certifications}
              onAdd={handleAddCertification}
              onEdit={handleEditCertification}
              onDelete={handleDeleteCertification}
            />

            {/* Resume */}
            <ResumeSection
              resumes={profile.resumes}
              onUpload={handleUploadResume}
              onDelete={handleDeleteResume}
              onSetDefault={handleSetDefaultResume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}