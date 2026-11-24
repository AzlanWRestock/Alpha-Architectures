import {
  CalendarClock,
  Check,
  Copy,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import {FormEvent, useEffect, useState} from 'react';
import {ContactPhoneItem, SITE_CONFIG} from '../data/siteConfig';

interface ContactSectionProps {
  preselectedService: string;
  preselectedNote: string;
}

const SERVICE_OPTIONS = [
  'Architectural Design',
  'Residential Construction',
  'Commercial Construction',
  'Renovation & Remodelling',
  'Project Management',
  'Property Development',
  'Other',
] as const;

function normalizeServiceOption(value: string): string {
  if (!value) return SERVICE_OPTIONS[0];
  if (value === 'Renovation & Remodeling') {
    return 'Renovation & Remodelling';
  }
  const match = SERVICE_OPTIONS.find(
    (opt) => opt.toLowerCase() === value.toLowerCase(),
  );
  return match ?? 'Other';
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  budget: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  location?: string;
  message?: string;
}

const EMAIL_SUBJECT =
  'New Construction Project Inquiry — Alpha Architecture & Developers';

export function ContactSection({
  preselectedService,
  preselectedNote,
}: ContactSectionProps) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    service: normalizeServiceOption(preselectedService),
    location: '',
    budget: '',
    message: preselectedNote || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [selectedWhatsappId, setSelectedWhatsappId] = useState<string>(
    SITE_CONFIG.contact.phones[0].id,
  );
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  );

  const phones: readonly ContactPhoneItem[] = SITE_CONFIG.contact.phones;
  const selectedWhatsappPhone =
    phones.find((p) => p.id === selectedWhatsappId) ?? phones[0];

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({
        ...prev,
        service: normalizeServiceOption(preselectedService),
      }));
      setSubmittedSummary(null);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedNote) {
      setForm((prev) => ({...prev, message: preselectedNote}));
      setSubmittedSummary(null);
    }
  }, [preselectedNote]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    const trimmedName = form.fullName.trim();
    const trimmedPhone = form.phone.trim();
    const trimmedEmail = form.email.trim();
    const trimmedLocation = form.location.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, '');
    if (!trimmedPhone) {
      nextErrors.phone = 'Please enter a phone or WhatsApp number.';
    } else if (phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!trimmedLocation) {
      nextErrors.location = 'Please enter your project location.';
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      nextErrors.message =
        'Please share your project details (at least 10 characters).';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildSummaryText = () => {
    const lines = [
      'New Construction Project Inquiry — Alpha Architecture & Developers',
      '',
      `Full Name: ${form.fullName.trim()}`,
      `Phone Number: ${form.phone.trim()}`,
      `Email Address: ${form.email.trim() || 'Not provided'}`,
      `Service Required: ${form.service}`,
      `Project Location: ${form.location.trim()}`,
      `Estimated Budget: ${form.budget.trim() || 'Not specified'}`,
      '',
      'Project Details:',
      form.message.trim(),
    ];
    return lines.join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCopyStatus('idle');

    if (!validate()) {
      return;
    }

    setSubmittedSummary(buildSummaryText());
  };

  const handleCopySummary = async () => {
    if (!submittedSummary) return;
    try {
      await navigator.clipboard.writeText(submittedSummary);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2800);
    } catch {
      setCopyStatus('failed');
      setTimeout(() => setCopyStatus('idle'), 3000);
    }
  };

  const mailtoHref = submittedSummary
    ? `${SITE_CONFIG.contact.emailHref}?subject=${encodeURIComponent(
        EMAIL_SUBJECT,
      )}&body=${encodeURIComponent(submittedSummary)}`
    : SITE_CONFIG.contact.emailHref;

  const whatsappHref = submittedSummary
    ? `${selectedWhatsappPhone.whatsappHref}?text=${encodeURIComponent(
        submittedSummary,
      )}`
    : selectedWhatsappPhone.whatsappHref;

  return (
    <section id="contact" className="bg-[#FAF8F4] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Official Business Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <p className="text-sm font-semibold text-[#1D4ED8] tracking-wide">
                {SITE_CONFIG.contact.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1B3B] [text-wrap:balance]">
                {SITE_CONFIG.contact.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                {SITE_CONFIG.contact.subtext}
              </p>

              {/* Contact Directory Cards */}
              <div className="mt-8 space-y-4">
                {phones.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-[#E5DFD2] bg-white p-4 transition-colors hover:border-[#1D4ED8]/50"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <Phone
                        className="h-5 w-5 text-[#1D4ED8] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs font-medium text-[#64748B]">
                          {item.label}
                        </p>
                        <a
                          href={item.phoneHref}
                          className="mt-0.5 inline-block text-sm sm:text-base font-semibold text-[#0B1B3B] hover:text-[#1D4ED8] transition-colors tabular-nums"
                        >
                          {item.display}
                        </a>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2.5 pl-8">
                      <a
                        href={item.phoneHref}
                        className="inline-flex items-center gap-1.5 rounded-md bg-[#0B1B3B] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors min-h-[38px]"
                      >
                        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Call</span>
                      </a>
                      <a
                        href={item.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-[#1D4ED8]/30 bg-[#EFF6FF] px-3.5 py-2 text-xs font-semibold text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-colors min-h-[38px]"
                      >
                        <MessageCircle
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}

                {/* Official Business Email Card */}
                <div className="rounded-xl border border-[#E5DFD2] bg-white p-4 transition-colors hover:border-[#1D4ED8]/50">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <Mail
                      className="h-5 w-5 text-[#1D4ED8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#64748B]">
                        {SITE_CONFIG.contact.emailLabel}
                      </p>
                      <a
                        href={SITE_CONFIG.contact.emailHref}
                        className="mt-0.5 inline-block text-sm font-semibold text-[#0B1B3B] hover:text-[#1D4ED8] transition-colors break-all"
                      >
                        {SITE_CONFIG.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="mt-3 pl-8">
                    <a
                      href={SITE_CONFIG.contact.emailHref}
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#0B1B3B] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors min-h-[38px]"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{SITE_CONFIG.contact.emailLabel}</span>
                    </a>
                  </div>
                </div>

                {/* Appointment-Based Consultation Note */}
                <div className="flex items-start gap-3.5 rounded-xl border border-[#E5DFD2] bg-white p-4">
                  <CalendarClock
                    className="h-5 w-5 text-[#1D4ED8] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-[#64748B]">
                      {SITE_CONFIG.contact.consultationHeading}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#334155]">
                      {SITE_CONFIG.contact.consultationNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-[#E5DFD2]">
              <p className="text-xs font-semibold text-[#475569]">
                Official Social Channels
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={SITE_CONFIG.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-[#E5DFD2] bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-[#0B1B3B] hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors min-h-[44px]"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                  <span>{SITE_CONFIG.contact.facebookLabel}</span>
                </a>
                {SITE_CONFIG.contact.instagramUrl && (
                  <a
                    href={SITE_CONFIG.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-[#E5DFD2] bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-[#0B1B3B] hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors min-h-[44px]"
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                    <span>{SITE_CONFIG.contact.instagramLabel}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Consultation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#E5DFD2] bg-white p-6 sm:p-8 lg:p-10">
              {submittedSummary ? (
                <div>
                  <div className="flex items-start gap-3 rounded-lg border border-[#1D4ED8]/25 bg-[#EFF6FF] p-4 text-[#0B1B3B]">
                    <Check
                      className="h-5 w-5 text-[#1D4ED8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-lg font-bold">
                        Your Project Inquiry Is Ready to Send
                      </h3>
                      <p className="mt-1 text-sm text-[#334155]">
                        Your enquiry has not been sent automatically. Choose an
                        option below to open it in your email app (addressed to{' '}
                        <span className="font-semibold">
                          {SITE_CONFIG.contact.email}
                        </span>
                        ), send via WhatsApp, or copy the summary.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-[#E5DFD2] bg-[#FAF8F4] p-4">
                    <p className="text-xs font-semibold text-[#64748B] mb-2">
                      Prepared Inquiry Summary
                    </p>
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#0B1B3B]">
                      {submittedSummary}
                    </pre>
                  </div>

                  {/* Email Inquiry Option */}
                  <div className="mt-6 rounded-lg border border-[#E5DFD2] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      Option 1 · Email Inquiry
                    </p>
                    <p className="mt-1 text-xs text-[#475569]">
                      Opens your default email application with{' '}
                      <span className="font-medium text-[#0B1B3B]">
                        {SITE_CONFIG.contact.email}
                      </span>{' '}
                      as recipient and all inquiry details filled in. Please
                      press <strong>Send</strong> inside your email app to
                      deliver your message.
                    </p>
                    <div className="mt-3">
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-2 rounded-md bg-[#0B1B3B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors min-h-[44px]"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        <span>Send Email Inquiry</span>
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp Inquiry Option with Primary / Alternate Selector */}
                  <div className="mt-4 rounded-lg border border-[#E5DFD2] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      Option 2 · WhatsApp Inquiry
                    </p>
                    <p className="mt-1 text-xs text-[#475569]">
                      Select either official WhatsApp line below to send your
                      formatted project brief directly on WhatsApp.
                    </p>

                    <div
                      role="radiogroup"
                      aria-label="Select WhatsApp contact number"
                      className="mt-3 flex flex-wrap gap-2.5"
                    >
                      {phones.map((item) => {
                        const isSelected = selectedWhatsappPhone.id === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setSelectedWhatsappId(item.id)}
                            className={`rounded-md border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer min-h-[40px] tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                              isSelected
                                ? 'border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8]'
                                : 'border-[#E5DFD2] bg-[#FAF8F4] text-[#334155] hover:border-[#1D4ED8]/50'
                            }`}
                          >
                            {item.label}: {item.display}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-3">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1E40AF] transition-colors min-h-[44px]"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        <span>
                          Send WhatsApp Inquiry ({selectedWhatsappPhone.display})
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Copy Inquiry Summary Option */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-2 rounded-md border border-[#E5DFD2] bg-white px-4 py-2.5 text-sm font-medium text-[#0B1B3B] hover:bg-[#FAF8F4] transition-colors min-h-[44px] cursor-pointer"
                    >
                      {copyStatus === 'copied' ? (
                        <>
                          <Check
                            className="h-4 w-4 text-[#1D4ED8]"
                            aria-hidden="true"
                          />
                          <span>Inquiry Summary Copied</span>
                        </>
                      ) : copyStatus === 'failed' ? (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>Copy Unavailable — Please Select Text Above</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>Copy Inquiry Summary</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedSummary(null)}
                      className="text-sm font-semibold text-[#1D4ED8] hover:text-[#0B1B3B] transition-colors cursor-pointer min-h-[40px]"
                    >
                      Edit Project Details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#0B1B3B]">
                      Request a Consultation
                    </h3>
                    <p className="mt-1.5 text-sm text-[#475569]">
                      Complete the form below to prepare your project inquiry.
                      Fields marked with <span className="text-[#1D4ED8]">*</span>{' '}
                      are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-[#0B1B3B]"
                      >
                        Full Name <span className="text-[#1D4ED8]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="fullName"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => {
                          setForm({...form, fullName: e.target.value});
                          if (errors.fullName) {
                            setErrors({...errors, fullName: undefined});
                          }
                        }}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? 'contact-name-error' : undefined
                        }
                        placeholder="Your full name"
                        className="mt-1.5 w-full rounded-md border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#0B1B3B] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-2 focus:outline-[#1D4ED8]/20 min-h-[44px]"
                      />
                      {errors.fullName && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-700"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-medium text-[#0B1B3B]"
                      >
                        Phone Number <span className="text-[#1D4ED8]">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => {
                          setForm({...form, phone: e.target.value});
                          if (errors.phone) {
                            setErrors({...errors, phone: undefined});
                          }
                        }}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? 'contact-phone-error' : undefined
                        }
                        placeholder="+92 300 000-0000"
                        className="mt-1.5 w-full rounded-md border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#0B1B3B] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-2 focus:outline-[#1D4ED8]/20 min-h-[44px]"
                      />
                      {errors.phone && (
                        <p
                          id="contact-phone-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-700"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-[#0B1B3B]"
                      >
                        Email Address{' '}
                        <span className="text-xs font-normal text-[#64748B]">
                          (Optional)
                        </span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm({...form, email: e.target.value});
                          if (errors.email) {
                            setErrors({...errors, email: undefined});
                          }
                        }}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? 'contact-email-error' : undefined
                        }
                        placeholder="you@example.com"
                        className="mt-1.5 w-full rounded-md border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#0B1B3B] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-2 focus:outline-[#1D4ED8]/20 min-h-[44px]"
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-700"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-sm font-medium text-[#0B1B3B]"
                      >
                        Service Required
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={form.service}
                        onChange={(e) =>
                          setForm({...form, service: e.target.value})
                        }
                        className="mt-1.5 w-full rounded-md border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#0B1B3B] focus:border-[#1D4ED8] focus:outline-2 focus:outline-[#1D4ED8]/20 min-h-[44px]"
                      >
                        {SERVICE_OPTIONS.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-location"
                        className="block text-sm font-medium text-[#0B1B3B]"
                      >
                        Project Location{' '}
                        <span className="text-[#1D4ED8]">*</span>
                      </label>
                      <input
                        id="contact-location"
                        name="location"
                        type="text"
                        required
                        value={form.location}
                        onChange={(e) => {
                          setForm({...form, location: e.target.value});
                          if (errors.location) {
                            setErrors({...errors, location: undefined});
                          }
                        }}
                        aria-invalid={Boolean(errors.location)}
                        aria-describedby={
                          errors.location ? 'contact-location-error' : undefined
                        }
                        placeholder="e.g., Bahria Enclave, Islamabad"
                        className="mt-1.5 w-full rounded-md border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#0B1B3B] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-2 focus:outline-[#1D4ED8]/20 min-h-[44px]"
                      />
                      {errors.location && (
                        <p
                          id="contact-location-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-700"
                        >
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-sm font-medium text-[#0B1B3B]"
                      >
                        Estimated Budget{' '}
                        <span className="text-xs font-normal text-[#64748B]">
                          (Optional)
                        </span>
                      </label>
                      <input
                        id="contact-budget"
                        name="budget"
                        type="text"
                        value={form.budget}
                        onChange={(e) =>
                          setForm({...form, budget: e.target.value})
                        }
                        placeholder="Optional target budget"
                        className="mt-1.5 w-full rounded-md border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#0B1B3B] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-2 focus:outline-[#1D4ED8]/20 min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-[#0B1B3B]"
                    >
                      Project Details <span className="text-[#1D4ED8]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => {
                        setForm({...form, message: e.target.value});
                        if (errors.message) {
                          setErrors({...errors, message: undefined});
                        }
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? 'contact-message-error' : undefined
                      }
                      placeholder="Describe your plot size, planned build, renovation scope, or timeline..."
                      className="mt-1.5 w-full rounded-md border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#0B1B3B] placeholder:text-[#94A3B8] focus:border-[#1D4ED8] focus:outline-2 focus:outline-[#1D4ED8]/20"
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0B1B3B] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] min-h-[44px] cursor-pointer shrink-0"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Send Project Inquiry</span>
                    </button>

                    <p className="text-xs text-[#64748B]">
                      Prepares your brief to send via your email app (addressed
                      to {SITE_CONFIG.contact.email}), WhatsApp, or clipboard.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
