import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './StartProject.module.css';

const PROJECT_TYPES = [
  'Website', 'Web Application', 'Admin Dashboard', 'Backend System', 
  'SaaS Platform', 'Portfolio Website', 'E-commerce Store', 'Landing Page', 'Custom System'
];

const FEATURES = [
  { id: 'auth', name: 'User Authentication', icon: '/icons/auth.png' }, // Re-using existing icon if available, or just keeping the structure
  { id: 'payments', name: 'Payment Integration', icon: '/icons/responsive.png' },
  { id: 'admin', name: 'Admin Dashboard', icon: '/icons/react.png' },
  { id: 'analytics', name: 'Analytics & Reporting', icon: '/icons/nextjs.png' },
  { id: 'cms', name: 'Content Management', icon: '/icons/node.png' },
  { id: 'api', name: 'Custom API/Integrations', icon: '/icons/express.png' },
  { id: 'booking', name: 'Booking/Scheduling', icon: '/icons/mysql.png' },
  { id: 'ecommerce', name: 'E-Commerce Logic', icon: '/icons/postgres.png' },
  { id: 'realtime', name: 'Real-time Features', icon: '/icons/mongodb.png' },
  { id: 'ai', name: 'AI/LLM Integration', icon: '/icons/supabase.png' },
  { id: 'seo', name: 'Advanced SEO', icon: '/icons/tailwind.png' },
  { id: 'multilingual', name: 'Multi-lingual Support', icon: '/icons/responsive.png' },
];

const STORAGE_KEY = 'portfolio_onboarding_data';

const StartProject = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    techStack: [],
    details: { name: '', description: '', goal: '', audience: '', features: '', references: '', style: '' },
    design: { colors: '', style: 'Modern', theme: 'Dark', animation: 'Subtle', inspirations: '' },
    timeline: { budget: '', deadline: '', urgency: 'Medium', longTerm: 'No' },
    contact: { name: '', whatsapp: '', email: '', country: '' }
  });

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const toggleTech = (tech) => {
    const current = formData.techStack;
    const next = current.includes(tech) 
      ? current.filter(t => t !== tech) 
      : [...current, tech];
    setFormData({ ...formData, techStack: next });
  };

  const handleCancel = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  const handleSubmit = () => {
    const { contact, details, projectType, techStack, timeline } = formData;
    
    const message = `
*NEW PROJECT INQUIRY*
----------------------------
*PROJECT TYPE:* ${projectType}
*TECH STACK:* ${techStack.join(', ')}

*DETAILS:*
- Name: ${details.name}
- Goal: ${details.goal}
- Budget: ${timeline.budget}
- Deadline: ${timeline.deadline}

*CLIENT INFO:*
- Name: ${contact.name}
- Email: ${contact.email}
- WhatsApp: ${contact.whatsapp}
- Country: ${contact.country}
----------------------------
Generated via Portfolio Onboarding.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/250794101251?text=${encodedMessage}`, '_blank');
    localStorage.removeItem(STORAGE_KEY);
  };

  // Animation variants
  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <section id="startproject" className={styles.section}>
      <div className={styles.container}>
        
        {/* Left Side: Summary & Progress */}
        <aside className={styles.sidebar}>
          <div className={styles.stickyContent}>
            <div className={styles.progressHeader}>
              <span className={styles.stepLabel}>Step {step} of {totalSteps}</span>
              <h2 className={styles.sidebarTitle}>Project Onboarding</h2>
            </div>

            <div className={styles.progressBarWrapper}>
              <motion.div 
                className={styles.progressBar} 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            <div className={styles.summaryList}>
              <SummaryItem label="Type" value={formData.projectType} active={step > 1} />
              <SummaryItem label="Stack" value={formData.techStack.length + ' selected'} active={step > 2} />
              <SummaryItem label="Budget" value={formData.timeline.budget} active={step > 5} />
            </div>

            <button onClick={handleCancel} className={styles.cancelBtn}>Cancel Inquiry</button>
          </div>
        </aside>

        {/* Right Side: Form Steps */}
        <main className={styles.formContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "circOut" }}
              className={styles.stepWrapper}
            >
              {step === 1 && (
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>What are we building?</h3>
                  <p className={styles.stepDesc}>Select the project category that best fits your needs.</p>
                  <div className={styles.gridOptions}>
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        className={`${styles.optionCard} ${formData.projectType === type ? styles.activeOption : ''}`}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Core Features</h3>
                  <p className={styles.stepDesc}>What functionalities does the project require? (Multi-select)</p>
                  <div className={styles.techGrid}>
                    {FEATURES.map((tech) => (
                      <div
                        key={tech.id}
                        className={`${styles.techCard} ${formData.techStack.includes(tech.name) ? styles.techActive : ''}`}
                        onClick={() => toggleTech(tech.name)}
                      >
                        <img src={tech.icon} alt={tech.name} className={styles.techIcon} />
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Project Details</h3>
                  <div className={styles.inputGroup}>
                    <FloatingInput 
                      label="Project Name" 
                      value={formData.details.name}
                      onChange={(e) => setFormData({...formData, details: {...formData.details, name: e.target.value}})}
                    />
                    <FloatingTextarea 
                      label="Brief Description" 
                      value={formData.details.description}
                      onChange={(e) => setFormData({...formData, details: {...formData.details, description: e.target.value}})}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Design Direction</h3>
                  <div className={styles.gridOptions}>
                    {['Minimal', 'Modern', 'Futuristic', 'Luxury'].map(s => (
                      <button 
                        key={s}
                        className={`${styles.optionCard} ${formData.design.style === s ? styles.activeOption : ''}`}
                        onClick={() => setFormData({...formData, design: {...formData.design, style: s}})}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Timeline & Budget</h3>
                  <div className={styles.inputGroup}>
                    <FloatingInput 
                      label="Budget Range (e.g. $5k - $10k)" 
                      value={formData.timeline.budget}
                      onChange={(e) => setFormData({...formData, timeline: {...formData.timeline, budget: e.target.value}})}
                    />
                    <FloatingInput 
                      label="Expected Deadline" 
                      value={formData.timeline.deadline}
                      onChange={(e) => setFormData({...formData, timeline: {...formData.timeline, deadline: e.target.value}})}
                    />
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Contact Information</h3>
                  <div className={styles.inputGroup}>
                    <FloatingInput 
                      label="Full Name" 
                      value={formData.contact.name}
                      onChange={(e) => setFormData({...formData, contact: {...formData.contact, name: e.target.value}})}
                    />
                    <FloatingInput 
                      label="WhatsApp Number" 
                      value={formData.contact.whatsapp}
                      onChange={(e) => setFormData({...formData, contact: {...formData.contact, whatsapp: e.target.value}})}
                    />
                    <FloatingInput 
                      label="Email Address" 
                      value={formData.contact.email}
                      onChange={(e) => setFormData({...formData, contact: {...formData.contact, email: e.target.value}})}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className={styles.navigation}>
            <button 
              className={styles.backBtn} 
              onClick={handleBack}
              style={{ opacity: step === 1 ? 0 : 1, pointerEvents: step === 1 ? 'none' : 'auto' }}
            >
              Back
            </button>
            
            {step < totalSteps ? (
              <button className={styles.nextBtn} onClick={handleNext}>Continue</button>
            ) : (
              <button className={styles.submitBtn} onClick={handleSubmit}>Send Inquiry</button>
            )}
          </div>
        </main>
      </div>
    </section>
  );
};

// Sub-components
const SummaryItem = ({ label, value, active }) => (
  <div className={`${styles.summaryItem} ${active ? styles.summaryActive : ''}`}>
    <span className={styles.summaryLabel}>{label}</span>
    <span className={styles.summaryValue}>{value || '---'}</span>
  </div>
);

const FloatingInput = ({ label, value, onChange }) => (
  <div className={styles.floatingGroup}>
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      className={styles.inputField} 
      placeholder=" " 
      required 
    />
    <label className={styles.floatingLabel}>{label}</label>
  </div>
);

const FloatingTextarea = ({ label, value, onChange }) => (
  <div className={styles.floatingGroup}>
    <textarea 
      value={value} 
      onChange={onChange} 
      className={styles.textareaField} 
      placeholder=" " 
      required 
    />
    <label className={styles.floatingLabel}>{label}</label>
  </div>
);

export default StartProject;