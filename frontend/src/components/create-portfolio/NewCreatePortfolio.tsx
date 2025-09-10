import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../lib/api';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import PortfolioCard3D from './PortfolioCard3D';

const NewCreatePortfolio: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({
    skills: [{ name: '', level: '' }],
    projects: [{ title: '', description: '', tech: '', thumbnail: '', github: '', live: '', collaborators: '' }],
    certificates: [{ name: '', issuer: '', date: '', validTill: '', fileUrl: '', relatedSkills: '' }],
    experiences: [{ role: '', org: '', location: '', start: '', end: '', bullets: '' }],
    education: [{ title: '', org: '', dateRange: '', bullets: '' }]
  });
  const [errors, setErrors] = useState<any>({});

  // Load existing portfolio data for editing
  useEffect(() => {
    const loadExistingPortfolio = async () => {
      // Wait for auth to complete loading
      if (authLoading) {
        return;
      }

      // If no user after auth loading is complete, something is wrong
      if (!user) {
        setLoading(false);
        return;
      }

      // Wait for user to be fully loaded and authenticated with username
      if (!user.username) {
        console.log('User loaded but no username yet, waiting...');
        // If we have a user but no username, just initialize with defaults for now
        setFormData((prev: any) => ({
          ...prev,
          name: user.fullname || '',
          email: user.email || '',
        }));
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.getPortfolio(user.username);
        if (response.success && response.data) {
          setIsEditing(true);

          // Pre-populate form with existing data
          const portfolio = response.data;
          setFormData({
            name: user.fullname || '',
            email: portfolio.email || user.email || '',
            phone: portfolio.phone || '',
            location: portfolio.location || '',
            taglineLeft: portfolio.taglineLeft || '',
            taglineHighlight: portfolio.taglineHighlight || '',
            taglineRight: portfolio.taglineRight || '',
            subTagline: portfolio.subTagline || '',
            aboutShort: portfolio.aboutShort || '',
            yearsExperience: portfolio.yearsExperience || '',
            projectsCount: portfolio.projectsCount || '',
            social: {
              github: portfolio.social?.github || '',
              linkedin: portfolio.social?.linkedin || '',
              website: portfolio.social?.website || '',
            },
            skills: portfolio.skills?.length > 0 ? portfolio.skills.map((skill: any) => ({
              name: skill.name || '',
              level: skill.level || ''
            })) : [{ name: '', level: '' }],
            projects: portfolio.projects?.length > 0 ? portfolio.projects.map((project: any) => ({
              title: project.title || '',
              description: project.description || '',
              tech: project.tech?.join(', ') || '',
              thumbnail: project.thumbnail || '',
              github: project.links?.find((link: any) => link.label === 'GitHub')?.href || '',
              live: project.links?.find((link: any) => link.label === 'Live')?.href || '',
              collaborators: project.collaborators?.join(', ') || ''
            })) : [{ title: '', description: '', tech: '', thumbnail: '', github: '', live: '', collaborators: '' }],
            certificates: portfolio.certificates?.length > 0 ? portfolio.certificates.map((cert: any) => ({
              name: cert.name || '',
              issuer: cert.issuer || '',
              date: cert.date ? new Date(cert.date).toISOString().split('T')[0] : '',
              validTill: cert.validTill ? new Date(cert.validTill).toISOString().split('T')[0] : '',
              fileUrl: cert.fileUrl || '',
              relatedSkills: cert.relatedSkills?.join(', ') || ''
            })) : [{ name: '', issuer: '', date: '', validTill: '', fileUrl: '', relatedSkills: '' }],
            experiences: portfolio.experiences?.length > 0 ? portfolio.experiences.map((exp: any) => ({
              role: exp.role || '',
              org: exp.org || '',
              location: exp.location || '',
              start: exp.start ? new Date(exp.start).toISOString().split('T')[0] : '',
              end: exp.end && !exp.current ? new Date(exp.end).toISOString().split('T')[0] : '',
              bullets: exp.bullets?.join('\n') || ''
            })) : [{ role: '', org: '', location: '', start: '', end: '', bullets: '' }],
            education: portfolio.education?.length > 0 ? portfolio.education.map((edu: any) => ({
              title: edu.title || '',
              org: edu.org || '',
              dateRange: edu.dateRange || '',
              bullets: edu.bullets?.join('\n') || ''
            })) : [{ title: '', org: '', dateRange: '', bullets: '' }]
          });
        } else {
          // Portfolio doesn't exist yet, initialize with default form data including user info
          setFormData((prev: any) => ({
            ...prev,
            name: user.fullname || '',
            email: user.email || '',
          }));
        }
      } catch (error) {
        // Portfolio doesn't exist or user not found - this is normal for new users
        console.log('No existing portfolio found, starting fresh');
        // Initialize form with user data
        setFormData((prev: any) => ({
          ...prev,
          name: user.fullname || '',
          email: user.email || '',
        }));
      } finally {
        setLoading(false);
      }
    };

    loadExistingPortfolio();
  }, [user, authLoading]);

  const validateStep = () => {
    let newErrors: any = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    } else if (step === 2) {
      if (!formData.aboutShort) newErrors.aboutShort = 'About is required';
    } else if (step === 3) {
      if (!formData.social?.github) {
        newErrors.github = 'GitHub URL is required';
      } else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(formData.social.github)) {
        newErrors.github = 'GitHub URL is invalid';
      }
      if (!formData.social?.linkedin) {
        newErrors.linkedin = 'LinkedIn URL is required';
      } else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(formData.social.linkedin)) {
        newErrors.linkedin = 'LinkedIn URL is invalid';
      }
    } else if (step === 4) {
      if (formData.skills.length === 0) {
        newErrors.skills = 'At least one skill is required';
      } else {
        formData.skills.forEach((skill: any, index: number) => {
          if (!skill.name) {
            newErrors[`skill_name_${index}`] = 'Skill name is required';
          }
          if (!skill.level) {
            newErrors[`skill_level_${index}`] = 'Skill level is required';
          }
        });
      }
    } else if (step === 5) {
      if (formData.projects.length === 0) {
        newErrors.projects = 'At least one project is required';
      } else {
        formData.projects.forEach((project: any, index: number) => {
          if (!project.title) {
            newErrors[`project_title_${index}`] = 'Project title is required';
          }
          if (!project.description) {
            newErrors[`project_description_${index}`] = 'Project description is required';
          }
        });
      }
    } else if (step === 6) {
      if (formData.certificates.length === 0) {
        newErrors.certificates = 'At least one certificate is required';
      } else {
        formData.certificates.forEach((certificate: any, index: number) => {
          if (!certificate.name) {
            newErrors[`certificate_name_${index}`] = 'Certificate name is required';
          }
          if (!certificate.issuer) {
            newErrors[`certificate_issuer_${index}`] = 'Certificate issuer is required';
          }
          if (!certificate.date) {
            newErrors[`certificate_date_${index}`] = 'Certificate date is required';
          }
        });
      }
    } else if (step === 7) {
      if (formData.experiences.length === 0) {
        newErrors.experiences = 'At least one experience is required';
      } else {
        formData.experiences.forEach((experience: any, index: number) => {
          if (!experience.role) {
            newErrors[`experience_role_${index}`] = 'Role is required';
          }
          if (!experience.org) {
            newErrors[`experience_org_${index}`] = 'Organization is required';
          }
        });
      }
    } else if (step === 8) {
      if (formData.education.length === 0) {
        newErrors.education = 'At least one education is required';
      } else {
        formData.education.forEach((education: any, index: number) => {
          if (!education.title) {
            newErrors[`education_title_${index}`] = 'Title is required';
          }
          if (!education.org) {
            newErrors[`education_org_${index}`] = 'Organization is required';
          }
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleChange = (input: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (input.includes('.')) {
      const [key, subkey] = input.split('.');
      setFormData((prev: any) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subkey]: value,
        },
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [input]: value }));
    }
  };

  const handleFileChange = (input: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [input]: e.target.files[0] });
    }
  };

  const handleDynamicChange = (section: string, index: number, field: string, value: string) => {
    const newSection = [...formData[section]];
    newSection[index] = { ...newSection[index], [field]: value };
    setFormData({ ...formData, [section]: newSection });
  };

  const handleAddDynamic = (section: string, newItem: any) => {
    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

  const handleRemoveDynamic = (section: string, index: number) => {
    const newSection = [...formData[section]];
    newSection.splice(index, 1);
    setFormData({ ...formData, [section]: newSection });
  };


  const handleCreatePortfolio = async () => {
    try {
      setIsSubmitting(true);

      // Import API client dynamically to avoid circular imports
      const { apiClient } = await import('../../lib/api');

      // Upload avatar if exists
      let avatarUrl = '';
      if (formData.avatar && formData.avatar instanceof File) {
        try {
          const uploadResult = await apiClient.uploadFile(formData.avatar, 'avatars');
          if (uploadResult.success && uploadResult.url) {
            avatarUrl = uploadResult.url;
          } else {
            console.error('Failed to upload avatar:', uploadResult.error);
            // Continue without avatar
          }
        } catch (error) {
          console.error('Avatar upload error:', error);
          // Continue without avatar
        }
      }

      // Upload resume if exists
      let resumeUrl = '';
      if (formData.resume && formData.resume instanceof File) {
        try {
          const uploadResult = await apiClient.uploadFile(formData.resume, 'resumes');
          if (uploadResult.success && uploadResult.url) {
            resumeUrl = uploadResult.url;
          } else {
            console.error('Failed to upload resume:', uploadResult.error);
            // Continue without resume
          }
        } catch (error) {
          console.error('Resume upload error:', error);
          // Continue without resume
        }
      }

      // Prepare portfolio data - map form data to match backend schema
      const portfolioData = {
        taglineLeft: formData.taglineLeft,
        taglineHighlight: formData.taglineHighlight,
        taglineRight: formData.taglineRight,
        subTagline: formData.subTagline,
        aboutShort: formData.aboutShort,
        yearsExperience: parseInt(formData.yearsExperience) || 0,
        projectsCount: parseInt(formData.projectsCount) || 0,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        avatarUrl,
        resumeUrl,
        social: {
          github: formData.social?.github,
          linkedin: formData.social?.linkedin,
          website: formData.social?.website,
        },
        projects: formData.projects.map((project: any) => ({
          title: project.title,
          description: project.description,
          tech: project.tech ? project.tech.split(',').map((t: string) => t.trim()) : [],
          thumbnail: project.thumbnail,
          links: project.github || project.live ? [{
            label: project.github ? 'GitHub' : 'Live',
            href: project.github || project.live
          }] : [],
          collaborators: project.collaborators ? project.collaborators.split(',').map((c: string) => c.trim()) : [],
        })),
        certificates: formData.certificates.filter((cert: any) => cert.name && cert.issuer && cert.date).map((cert: any) => ({
          name: cert.name,
          issuer: cert.issuer,
          date: new Date(cert.date),
          validTill: cert.validTill ? new Date(cert.validTill) : undefined,
          fileUrl: cert.fileUrl,
          relatedSkills: cert.relatedSkills ? cert.relatedSkills.split(',').map((s: string) => s.trim()) : [],
        })),
        skills: formData.skills.map((skill: any) => ({
          name: skill.name,
          level: parseInt(skill.level) || 0,
        })),
        tools: [], // Will be populated from skills or separate field
        experiences: formData.experiences.map((exp: any) => ({
          role: exp.role,
          org: exp.org,
          location: exp.location,
          start: exp.start ? new Date(exp.start) : new Date(),
          end: exp.end && exp.end !== 'Present' ? new Date(exp.end) : undefined,
          current: exp.end === 'Present' || !exp.end,
          bullets: exp.bullets ? exp.bullets.split('\n').filter((b: string) => b.trim()) : [],
        })),
        education: formData.education.map((edu: any) => ({
          title: edu.title,
          org: edu.org,
          dateRange: edu.dateRange,
          bullets: edu.bullets ? edu.bullets.split('\n').filter((b: string) => b.trim()) : [],
        })),
      };

      const response = await apiClient.updatePortfolio(portfolioData);

      if (response.success) {
        // Navigate to the user's portfolio
        navigate(`/portfolio/${user?.username}`);
      } else {
        console.error('Failed to create portfolio:', response.error);
        // You could show an error message to the user here
      }
    } catch (error) {
      console.error('Error creating portfolio:', error);
      // You could show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    <Step1 key={1} formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} errors={errors} />,
    <Step2 key={2} formData={formData} handleChange={handleChange} errors={errors} />,
    <Step3 key={3} formData={formData} handleChange={handleChange} errors={errors} />,
    <Step4 key={4} items={formData.skills} handleItemChange={(index, field, value) => handleDynamicChange('skills', index, field, value)} handleAddItem={() => handleAddDynamic('skills', { name: '', level: '' })} handleRemoveItem={(index) => handleRemoveDynamic('skills', index)} errors={errors} />,
    <Step5 key={5} items={formData.projects} handleItemChange={(index, field, value) => handleDynamicChange('projects', index, field, value)} handleAddItem={() => handleAddDynamic('projects', { title: '', description: '', tech: '', thumbnail: '', github: '', live: '', collaborators: '' })} handleRemoveItem={(index) => handleRemoveDynamic('projects', index)} errors={errors} />,
    <Step6 key={6} items={formData.certificates} handleItemChange={(index, field, value) => handleDynamicChange('certificates', index, field, value)} handleAddItem={() => handleAddDynamic('certificates', { name: '', issuer: '', date: '', validTill: '', fileUrl: '', relatedSkills: '' })} handleRemoveItem={(index) => handleRemoveDynamic('certificates', index)} errors={errors} />,
    <Step7 key={7} items={formData.experiences} handleItemChange={(index, field, value) => handleDynamicChange('experiences', index, field, value)} handleAddItem={() => handleAddDynamic('experiences', { role: '', org: '', location: '', start: '', end: '', bullets: '' })} handleRemoveItem={(index) => handleRemoveDynamic('experiences', index)} errors={errors} />,
    <Step8 key={8} items={formData.education} handleItemChange={(index, field, value) => handleDynamicChange('education', index, field, value)} handleAddItem={() => handleAddDynamic('education', { title: '', org: '', dateRange: '', bullets: '' })} handleRemoveItem={(index) => handleRemoveDynamic('education', index)} errors={errors} />
  ];

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // If user is not authenticated or doesn't have required data, show error
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p>Please log in to create your portfolio.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 m-4">
        <h1 className="text-4xl font-bold text-center mb-2 text-white">
          {isEditing ? 'Edit Your Portfolio' : 'Create Your Portfolio'}
        </h1>
        <p className="text-center text-gray-300 mb-8">
          {isEditing ? 'Update your portfolio to showcase your latest work.' : 'Showcase your skills and projects to the world.'}
        </p>
        <div className="mb-8">
          {/* Progress Bar */}
          <div className="relative h-2 bg-white/20 rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 8) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {steps[step - 1]}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button onClick={prevStep} className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-6 rounded-lg">
              Previous
            </button>
          )}
          {step < 8 ? (
            <button onClick={nextStep} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-lg">
              Next
            </button>
          ) : (
            <button onClick={handleCreatePortfolio} className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-6 rounded-lg">
              {isEditing ? 'Update Portfolio' : 'Create Portfolio'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCreatePortfolio;