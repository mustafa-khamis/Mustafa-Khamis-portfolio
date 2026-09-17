import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../sections/Footer";
import styles from "./StartProjectPage.module.css";
import { CATEGORY_ICONS } from "./icons";
import {
  CATEGORIES,
  TEMPLATES,
  TECH_GROUPS,
  FEATURES,
  BUDGET_OPTIONS,
  URGENCY_OPTIONS,
  STYLE_OPTIONS,
  THEME_OPTIONS,
} from "./data";

const STORAGE_KEY = "portfolio_onboarding_data_v3";
const TOTAL_STEPS = 7;

const STEP_TITLES = [
  "What are we building?",
  "Choose a starting point",
  "Stack & core features",
  "Tell me about the project",
  "Design direction",
  "Timeline & budget",
  "How do I reach you?",
];

const emptyForm = {
  categories: [],
  categoryNames: [],
  projectTypes: [],
  techStack: [],
  features: [],
  details: { name: "", description: "", goal: "", audience: "" },
  design: { style: "", theme: "", animation: "Subtle", colors: "", inspirations: "" },
  timeline: { budget: "", deadline: "", urgency: "Medium", longTerm: "No" },
  contact: { name: "", whatsapp: "", email: "", country: "" },
};

function loadInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...emptyForm, ...JSON.parse(saved) };
  } catch {
    // ignore corrupt storage
  }
  return emptyForm;
}

export default function StartProjectPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(loadInitial);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // storage unavailable — non-fatal
    }
  }, [formData]);

  const progress = (step / TOTAL_STEPS) * 100;

  // Union of templates across every selected category, since a client
  // planning a website *and* a mobile app should see both sets at once.
  const activeTemplates = useMemo(
    () => formData.categories.flatMap((id) => TEMPLATES[id] || []),
    [formData.categories]
  );

  const canContinue = useMemo(() => {
    if (step === 1) return formData.categories.length > 0;
    if (step === 2) return formData.projectTypes.length > 0;
    if (step === 4) return Boolean(formData.details.name.trim());
    return true;
  }, [step, formData.categories, formData.projectTypes, formData.details.name]);

  const canSubmit =
    formData.contact.name.trim() &&
    (formData.contact.whatsapp.trim() || formData.contact.email.trim());

  const handleNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const toggleCategory = (cat) => {
    setFormData((prev) => {
      const has = prev.categories.includes(cat.id);
      const categories = has
        ? prev.categories.filter((id) => id !== cat.id)
        : [...prev.categories, cat.id];
      const categoryNames = has
        ? prev.categoryNames.filter((n) => n !== cat.name)
        : [...prev.categoryNames, cat.name];

      // Drop any chosen templates that only existed under the category
      // that was just deselected.
      const stillValidNames = new Set(
        categories.flatMap((id) => (TEMPLATES[id] || []).map((t) => t.name))
      );
      const projectTypes = prev.projectTypes.filter((name) => stillValidNames.has(name));

      return { ...prev, categories, categoryNames, projectTypes };
    });
  };

  const toggleTemplate = (tpl) => {
    setFormData((prev) => {
      const has = prev.projectTypes.includes(tpl.name);
      const projectTypes = has
        ? prev.projectTypes.filter((n) => n !== tpl.name)
        : [...prev.projectTypes, tpl.name];
      const techStack = has
        ? prev.techStack
        : Array.from(new Set([...prev.techStack, ...tpl.stack]));
      return { ...prev, projectTypes, techStack };
    });
  };

  const toggleTech = (name) => {
    setFormData((prev) => {
      const has = prev.techStack.includes(name);
      return {
        ...prev,
        techStack: has
          ? prev.techStack.filter((t) => t !== name)
          : [...prev.techStack, name],
      };
    });
  };

  const toggleFeature = (id) => {
    setFormData((prev) => {
      const has = prev.features.includes(id);
      return {
        ...prev,
        features: has ? prev.features.filter((f) => f !== id) : [...prev.features, id],
      };
    });
  };

  const setField = (group, key, value) => {
    setFormData((prev) => ({ ...prev, [group]: { ...prev[group], [key]: value } }));
  };

  const handleCancel = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(emptyForm);
    setStep(1);
  };

  const handleSubmit = () => {
    const { categoryNames, projectTypes, techStack, features, details, design, timeline, contact } = formData;
    const featureNames = features
      .map((id) => FEATURES.find((f) => f.id === id)?.name)
      .filter(Boolean);

    const message = `
*NEW PROJECT INQUIRY*
----------------------------
*CATEGORY:* ${categoryNames.join(", ") || "Not specified"}
*STARTING POINT:* ${projectTypes.join(", ") || "Not specified"}
*TECH STACK:* ${techStack.join(", ") || "Not specified"}
*FEATURES:* ${featureNames.join(", ") || "Not specified"}

*PROJECT*
- Name: ${details.name}
- Description: ${details.description}
- Goal: ${details.goal}
- Audience: ${details.audience}

*DESIGN*
- Style: ${design.style}
- Theme: ${design.theme}
- Color direction: ${design.colors}
- Inspiration: ${design.inspirations}

*TIMELINE*
- Budget: ${timeline.budget}
- Deadline: ${timeline.deadline}
- Urgency: ${timeline.urgency}
- Ongoing partnership: ${timeline.longTerm}

*CONTACT*
- Name: ${contact.name}
- Email: ${contact.email}
- WhatsApp: ${contact.whatsapp}
- Country: ${contact.country}
----------------------------
Generated via Portfolio Project Planner.
    `.trim();

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/250794101251?text=${encoded}`, "_blank");
    localStorage.removeItem(STORAGE_KEY);
  };

  // Let Enter advance the wizard once a choice has been made, from anywhere
  // except a multi-line textarea (where Enter should insert a newline).
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Enter" || event.shiftKey) return;
      if (event.target.tagName === "TEXTAREA") return;

      event.preventDefault();

      if (step < TOTAL_STEPS) {
        if (canContinue) handleNext();
      } else if (canSubmit) {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step, canContinue, canSubmit, handleSubmit]);

  const stepVariants = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  };

  return (
    <div className={styles.page}>
      <TopNav />

      <section className={styles.wizardSection}>
        <div className="container">
          <div className={styles.wizardGrid}>
          <aside className={styles.sidebar}>
            <div className={styles.stickyContent}>
              <span className={styles.stepLabel}>Step {step} of {TOTAL_STEPS}</span>
              <h2 className={styles.sidebarTitle}>Project Planner</h2>

              <div className={styles.progressBarWrapper}>
                <motion.div
                  className={styles.progressBar}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              <p className={styles.currentStepTitle}>{STEP_TITLES[step - 1]}</p>

              <div className={styles.stepDots}>
                {STEP_TITLES.map((title, i) => (
                  <button
                    key={title}
                    type="button"
                    aria-label={`Go to step ${i + 1}: ${title}`}
                    className={`${styles.stepDot} ${step === i + 1 ? styles.stepDotActive : ""} ${step > i + 1 ? styles.stepDotDone : ""}`}
                    onClick={() => (i + 1 <= step ? setStep(i + 1) : null)}
                  >
                    {step > i + 1 ? CATEGORY_ICONS.check : i + 1}
                  </button>
                ))}
              </div>

              <div className={styles.summaryBlock}>
                <SummaryRow label="Category" value={formData.categoryNames.join(", ")} />
                <SummaryRow label="Starting point" value={formData.projectTypes.join(", ")} />
                <SummaryRow label="Stack" value={formData.techStack.length ? `${formData.techStack.length} selected` : ""} />
                <SummaryRow label="Budget" value={formData.timeline.budget} />
              </div>

              <button onClick={handleCancel} type="button" className={styles.cancelBtn}>
                Clear & start over
              </button>
            </div>
          </aside>

          <main className={styles.formContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "circOut" }}
                className={styles.stepWrapper}
              >
                {step === 1 && (
                  <CategoryStep formData={formData} onToggle={toggleCategory} />
                )}
                {step === 2 && (
                  <TemplateStep
                    templates={activeTemplates}
                    formData={formData}
                    onToggle={toggleTemplate}
                  />
                )}
                {step === 3 && (
                  <StackStep
                    formData={formData}
                    onToggleTech={toggleTech}
                    onToggleFeature={toggleFeature}
                  />
                )}
                {step === 4 && (
                  <DetailsStep formData={formData} setField={setField} />
                )}
                {step === 5 && (
                  <DesignStep formData={formData} setField={setField} />
                )}
                {step === 6 && (
                  <TimelineStep formData={formData} setField={setField} />
                )}
                {step === 7 && (
                  <ContactStep formData={formData} setField={setField} />
                )}
              </motion.div>
            </AnimatePresence>

            <div className={styles.navigation}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={handleBack}
                style={{ opacity: step === 1 ? 0 : 1, pointerEvents: step === 1 ? "none" : "auto" }}
              >
                {CATEGORY_ICONS.back}
                Back
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={handleNext}
                  disabled={!canContinue}
                >
                  Continue
                  {CATEGORY_ICONS.arrow}
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  Send Inquiry via WhatsApp
                  {CATEGORY_ICONS.arrow}
                </button>
              )}
            </div>
          </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ─────────────────────────────  Top Nav  ───────────────────────────── */

function TopNav() {
  return (
    <header className={styles.topNav}>
      <div className={`container ${styles.topNavInner}`}>
        <Link to="/" className={styles.topNavBack}>
          {CATEGORY_ICONS.back}
          <span>Back to Portfolio</span>
        </Link>
        <Link to="/" className={styles.topNavLogo}>
          Mustafa.Kh<span>.</span>
        </Link>
        <a
          href="https://wa.me/250794101251"
          target="_blank"
          rel="noreferrer"
          className={styles.topNavContact}
        >
          <span className={styles.topNavContactFull}>Prefer to chat? WhatsApp</span>
          <span className={styles.topNavContactShort}>WhatsApp</span>
        </a>
      </div>
    </header>
  );
}

/* ─────────────────────────────  Step 1: Category  ───────────────────────────── */

function CategoryStep({ formData, onToggle }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>What are we building?</h3>
      <p className={styles.stepDesc}>
        Pick every category that applies — happy to scope a website and a
        mobile app together.
      </p>

      <div className={styles.categoryGrid}>
        {CATEGORIES.map((cat) => {
          const active = formData.categories.includes(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={active}
              className={`${styles.categoryCard} ${active ? styles.categoryCardActive : ""}`}
              onClick={() => onToggle(cat)}
            >
              <span className={styles.selectBadge}>{CATEGORY_ICONS.check}</span>
              <span className={styles.categoryIcon}>{CATEGORY_ICONS[cat.icon]}</span>
              <span className={styles.categoryName}>{cat.name}</span>
              <span className={styles.categoryDesc}>{cat.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────  Step 2: Template  ───────────────────────────── */

function TemplateStep({ templates, formData, onToggle }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>Choose a starting point</h3>
      <p className={styles.stepDesc}>
        Common builds for <strong>{formData.categoryNames.join(", ")}</strong>. Select
        one or more — we&apos;ll refine everything together.
      </p>

      <div className={styles.templateGrid}>
        {templates.map((tpl) => {
          const active = formData.projectTypes.includes(tpl.name);
          return (
            <button
              key={tpl.id}
              type="button"
              aria-pressed={active}
              className={`${styles.templateCard} ${active ? styles.templateCardActive : ""}`}
              onClick={() => onToggle(tpl)}
            >
              <span className={styles.selectBadge}>{CATEGORY_ICONS.check}</span>
              <span className={styles.templateName}>{tpl.name}</span>
              <span className={styles.templateDesc}>{tpl.desc}</span>
              {tpl.stack.length > 0 && (
                <span className={styles.templateTags}>
                  {tpl.stack.map((t) => (
                    <span key={t} className={styles.templateTag}>{t}</span>
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────  Step 3: Stack & Features  ───────────────────────────── */

function StackStep({ formData, onToggleTech, onToggleFeature }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>Stack & core features</h3>
      <p className={styles.stepDesc}>
        Select any technologies you already prefer — skip this if you&apos;d
        rather I recommend the right stack.
      </p>

      <div className={styles.techGroups}>
        {TECH_GROUPS.map((group) => (
          <div key={group.label} className={styles.techGroup}>
            <h4 className={styles.techGroupLabel}>{group.label}</h4>
            <div className={styles.techGrid}>
              {group.items.map((tech) => (
                <button
                  type="button"
                  key={tech.name}
                  className={`${styles.techCard} ${formData.techStack.includes(tech.name) ? styles.techActive : ""}`}
                  onClick={() => onToggleTech(tech.name)}
                >
                  <span className={styles.techIconWrap}>
                    <img src={tech.icon} alt="" loading="lazy" />
                  </span>
                  <span>{tech.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h4 className={styles.techGroupLabel} style={{ marginTop: 36 }}>
        Feature checklist
      </h4>
      <div className={styles.featureGrid}>
        {FEATURES.map((feature) => (
          <button
            type="button"
            key={feature.id}
            className={`${styles.featureChip} ${formData.features.includes(feature.id) ? styles.featureChipActive : ""}`}
            onClick={() => onToggleFeature(feature.id)}
          >
            {feature.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────  Step 4: Details  ───────────────────────────── */

function DetailsStep({ formData, setField }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>Tell me about the project</h3>
      <p className={styles.stepDesc}>The more context, the sharper the proposal.</p>
      <div className={styles.inputGroup}>
        <TextField
          label="Project name"
          required
          placeholder="e.g. Acme SaaS Dashboard"
          value={formData.details.name}
          onChange={(e) => setField("details", "name", e.target.value)}
        />
        <TextAreaField
          label="Brief description"
          placeholder="What does it do, and who is it for?"
          value={formData.details.description}
          onChange={(e) => setField("details", "description", e.target.value)}
        />
        <TextField
          label="Primary goal"
          placeholder="e.g. generate leads, sell products"
          value={formData.details.goal}
          onChange={(e) => setField("details", "goal", e.target.value)}
        />
        <TextField
          label="Target audience"
          placeholder="e.g. small business owners"
          value={formData.details.audience}
          onChange={(e) => setField("details", "audience", e.target.value)}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────  Step 5: Design  ───────────────────────────── */

function DesignStep({ formData, setField }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>Design direction</h3>
      <p className={styles.stepDesc}>Help me understand the look and feel you're after.</p>

      <span className={styles.fieldLabel}>Style</span>
      <div className={styles.chipRow}>
        {STYLE_OPTIONS.map((s) => (
          <button
            key={s}
            type="button"
            className={`${styles.chip} ${formData.design.style === s ? styles.chipActive : ""}`}
            onClick={() => setField("design", "style", s)}
          >
            {s}
          </button>
        ))}
      </div>

      <span className={styles.fieldLabel}>Theme</span>
      <div className={styles.chipRow}>
        {THEME_OPTIONS.map((t) => (
          <button
            key={t}
            type="button"
            className={`${styles.chip} ${formData.design.theme === t ? styles.chipActive : ""}`}
            onClick={() => setField("design", "theme", t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={styles.inputGroup} style={{ marginTop: 28 }}>
        <TextField
          label="Color preference"
          placeholder="e.g. deep blues, brand palette"
          value={formData.design.colors}
          onChange={(e) => setField("design", "colors", e.target.value)}
        />
        <TextField
          label="Sites/apps you like the look of"
          placeholder="Links, optional"
          value={formData.design.inspirations}
          onChange={(e) => setField("design", "inspirations", e.target.value)}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────  Step 6: Timeline  ───────────────────────────── */

function TimelineStep({ formData, setField }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>Timeline & budget</h3>
      <p className={styles.stepDesc}>Rough numbers are perfectly fine.</p>

      <span className={styles.fieldLabel}>Budget range</span>
      <div className={styles.chipRow}>
        {BUDGET_OPTIONS.map((b) => (
          <button
            key={b}
            type="button"
            className={`${styles.chip} ${formData.timeline.budget === b ? styles.chipActive : ""}`}
            onClick={() => setField("timeline", "budget", b)}
          >
            {b}
          </button>
        ))}
      </div>

      <span className={styles.fieldLabel}>Urgency</span>
      <div className={styles.chipRow}>
        {URGENCY_OPTIONS.map((u) => (
          <button
            key={u}
            type="button"
            className={`${styles.chip} ${formData.timeline.urgency === u ? styles.chipActive : ""}`}
            onClick={() => setField("timeline", "urgency", u)}
          >
            {u}
          </button>
        ))}
      </div>

      <div className={styles.inputGroup} style={{ marginTop: 28 }}>
        <TextField
          label="Target launch date"
          placeholder="e.g. mid-March, or a specific date"
          value={formData.timeline.deadline}
          onChange={(e) => setField("timeline", "deadline", e.target.value)}
        />
      </div>

      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={formData.timeline.longTerm === "Yes"}
          onChange={(e) => setField("timeline", "longTerm", e.target.checked ? "Yes" : "No")}
        />
        Open to an ongoing partnership / retainer after launch
      </label>
    </div>
  );
}

/* ─────────────────────────────  Step 7: Contact  ───────────────────────────── */

function ContactStep({ formData, setField }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>How do I reach you?</h3>
      <p className={styles.stepDesc}>I&apos;ll follow up within 24 hours.</p>
      <div className={styles.inputGroup}>
        <TextField
          label="Full name"
          required
          placeholder="Your full name"
          value={formData.contact.name}
          onChange={(e) => setField("contact", "name", e.target.value)}
        />
        <TextField
          label="WhatsApp number"
          required
          placeholder="+250 7XX XXX XXX"
          value={formData.contact.whatsapp}
          onChange={(e) => setField("contact", "whatsapp", e.target.value)}
        />
        <TextField
          label="Email address"
          required
          placeholder="you@company.com"
          value={formData.contact.email}
          onChange={(e) => setField("contact", "email", e.target.value)}
        />
        <p className={styles.contactHint}>* Please provide at least one contact method.</p>
        <TextField
          label="Country / timezone"
          placeholder="e.g. Rwanda (CAT)"
          value={formData.contact.country}
          onChange={(e) => setField("contact", "country", e.target.value)}
        />
      </div>

      <div className={styles.reviewCard}>
        <h4>Quick review</h4>
        <ReviewLine label="Category" value={formData.categoryNames.join(", ")} />
        <ReviewLine label="Starting point" value={formData.projectTypes.join(", ")} />
        <ReviewLine label="Stack" value={formData.techStack.join(", ")} />
        <ReviewLine label="Budget" value={formData.timeline.budget} />
      </div>
    </div>
  );
}

/* ─────────────────────────────  Shared bits  ───────────────────────────── */

const SummaryRow = ({ label, value }) => (
  <div className={`${styles.summaryItem} ${value ? styles.summaryActive : ""}`}>
    <span className={styles.summaryLabel}>{label}</span>
    <span className={styles.summaryValue}>{value || "—"}</span>
  </div>
);

const ReviewLine = ({ label, value }) => (
  <div className={styles.reviewLine}>
    <span>{label}</span>
    <strong>{value || "—"}</strong>
  </div>
);

const TextField = ({ label, value, onChange, required, placeholder }) => (
  <div className={styles.fieldGroup}>
    <label className={styles.fieldTopLabel}>
      {label}
      {required && <span className={styles.requiredStar}> *</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={styles.inputField}
      placeholder={placeholder}
    />
  </div>
);

const TextAreaField = ({ label, value, onChange, required, placeholder }) => (
  <div className={styles.fieldGroup}>
    <label className={styles.fieldTopLabel}>
      {label}
      {required && <span className={styles.requiredStar}> *</span>}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      className={styles.textareaField}
      placeholder={placeholder}
    />
  </div>
);
