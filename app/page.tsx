"use client";
import React, { useState } from 'react';
import Image from 'next/image';

// Icons components
const IconShare = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>);
const IconCalendar = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const IconLocation = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const IconPhone = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>);
const IconBriefcase = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
const IconAcademic = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>);
const IconBadge = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>);
const IconHeart = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>);

function StaticCardItem({ title, children, icon = null }: any) {
  return (
    <div className="bg-white mb-3 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-50">
        <div className="flex items-center gap-4">
          {icon && <span className="text-teal-600 bg-teal-50 p-2.5 rounded-xl shadow-sm">{icon}</span>}
          <span className="text-[1.05rem] font-semibold text-gray-800">{title}</span>
        </div>
      </div>
      <div className="p-5">
        <div className={`text-gray-600 leading-relaxed ${icon ? 'ml-[3.5rem]' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ title, children, defaultOpen = false, icon = null }: any) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-0 bg-white mb-3 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-gray-50 focus:outline-none"
      >
        <div className="flex items-center gap-4">
          {icon && <span className="text-teal-600 bg-teal-50 p-2.5 rounded-xl shadow-sm">{icon}</span>}
          <span className="text-[1.05rem] font-semibold text-gray-800">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 pb-5 px-5" : "max-h-0 opacity-0 px-5"}`}>
        <div className={`text-gray-600 leading-relaxed ${icon ? 'ml-[3.5rem]' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Main page component
export default function DoctorProfile() {
  const [selectedDate, setSelectedDate] = useState<number | null>(18);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dateTime, setDateTime] = useState('2026-05-18T10:00');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp || !dateTime) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(false);
    setPreviewUrl(null);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, dateTime, purpose }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit booking');
      }
      setSuccess(true);
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
      // Reset form on success
      setName('');
      setWhatsapp('');
      setPurpose('');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Dr. Shobhit - M.D. Physician',
      text: 'M.D. Physician & Specialist Medical Officer at BLK MAX Super Speciality Hospital. Runs private practice at Adult & Child Care, Rohini, Delhi.',
      url: typeof window !== 'undefined' ? window.location.href : 'https://www.drshobhit.com',
    };

    // 1. Copy to clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch (err) {
        console.error('Failed to copy to clipboard: ', err);
      }
    }

    // 2. Trigger native OS share command
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Native share failed or cancelled: ', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-teal-200 selection:text-teal-900">
      {/* Navigation */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                ACC
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-teal-800 leading-none">
                  Adult & Child Care
                </span>
                <span className="text-xs text-teal-600/80 font-semibold mt-0.5">Rohini Clinic Portal</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Dr. Shobhit</a>
              <a href="#about" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Experience</a>
              <a href="#timings" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">OPD Timings</a>
              <a href="#faqs" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">FAQs</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+919312017930" className="hidden md:flex items-center gap-2 text-teal-700 font-semibold bg-teal-50 px-4 py-2 rounded-full hover:bg-teal-100 transition-colors">
                <IconPhone />
                <span>+91 93120-17930</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-slate-900 pt-12 pb-12 lg:pt-16 lg:pb-16 overflow-hidden">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Doctor Info */}
              <div className="flex-1 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="relative group shrink-0">
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                    <img
                      src="/dr-shobhit.png"
                      alt="Dr. Shobhit"
                      className="w-full h-full object-cover object-top scale-[1.4] origin-top transition-transform duration-500 group-hover:scale-[1.45]"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center py-2">
                  <div className="inline-flex items-center gap-1.5 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold w-fit mb-3">
                    🏥 DMC No. 30312
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                    Dr. Shobhit
                  </h1>
                  <p className="text-xl text-teal-100 font-medium mb-1">
                    M.D. Physician
                  </p>
                  <p className="text-lg text-teal-200/80 mb-1 flex items-center justify-center md:justify-start gap-2">
                    <IconHeart />
                    Adult & Child Care (General Practice)
                  </p>
                  <p className="text-sm text-teal-200/60 mb-4 flex items-center justify-center md:justify-start gap-2">
                    🏥 Specialist Medical Officer, BLK MAX Super Speciality Hospital
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                    <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                      <IconBriefcase />
                      Experience: 20+ Years
                    </span>
                    <button
                      onClick={handleShare}
                      className={`inline-flex items-center gap-1.5 border px-4 py-1.5 rounded-full text-sm font-medium transition-all ${shareSuccess
                        ? "bg-emerald-600 border-emerald-500 text-white"
                        : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
                        }`}
                    >
                      <IconShare />
                      {shareSuccess ? "Link Copied! ✓" : "Share Profile"}
                    </button>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 -mt-8 relative z-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* Left Column: Details */}
            <div className="flex-1 space-y-10">

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 id="about" className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">About Dr. Shobhit</h2>
                <div className="space-y-4">
                  <StaticCardItem title="Professional History & Experience" icon={<IconBriefcase />}>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-teal-100/70">
                      
                      {/* Current Roles */}
                      <div className="relative pl-8">
                        <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-teal-600 ring-4 ring-teal-100"></div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                          <span className="text-gray-900 font-bold text-base">Consulting Physician & Founder</span>
                          <span className="inline-flex items-center bg-teal-50 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full w-fit">
                            Present
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-teal-600 mt-0.5">Adult & Child Care</p>
                        <p className="text-sm text-gray-500 mt-1">Private Practice, G-12/20, Sector-15, Rohini, Delhi-110089</p>
                      </div>

                      <div className="relative pl-8">
                        <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-teal-600 ring-4 ring-teal-100"></div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                          <span className="text-gray-900 font-bold text-base">Specialist Medical Officer</span>
                          <span className="inline-flex items-center bg-teal-50 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full w-fit">
                            Apr 2012 - Present
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-teal-600 mt-0.5">BLK MAX Super Speciality Hospital</p>
                        <p className="text-sm text-gray-500 mt-1">Serving as Specialist Medical Officer since April 2012.</p>
                      </div>

                      {/* Past Roles */}
                      <div className="relative pl-8">
                        <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-gray-400 ring-4 ring-gray-100"></div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                          <span className="text-gray-800 font-semibold text-base">Senior Resident</span>
                          <span className="inline-flex items-center bg-gray-50 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full w-fit">
                            Mar 2008 - 2012
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-gray-600 mt-0.5">ESIC Hospital</p>
                        <p className="text-sm text-gray-500 mt-1">Sec-15, Rohini, Delhi.</p>
                      </div>

                      <div className="relative pl-8">
                        <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-gray-400 ring-4 ring-gray-100"></div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                          <span className="text-gray-800 font-semibold text-base">Junior Resident (Surgery)</span>
                          <span className="inline-flex items-center bg-gray-50 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full w-fit">
                            Sep 2007 - Feb 2008
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-gray-600 mt-0.5">Hindu Rao Hospital</p>
                        <p className="text-sm text-gray-500 mt-1">Delhi.</p>
                      </div>

                      <div className="relative pl-8">
                        <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-gray-400 ring-4 ring-gray-100"></div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                          <span className="text-gray-800 font-semibold text-base">Junior Resident (Paediatrics)</span>
                          <span className="inline-flex items-center bg-gray-50 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full w-fit">
                            Jul 2006 - Aug 2007
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-gray-600 mt-0.5">Dr. Ram Manohar Lohia Hospital</p>
                        <p className="text-sm text-gray-500 mt-1">Delhi.</p>
                      </div>

                    </div>
                  </StaticCardItem>

                  <StaticCardItem title="Education & Qualifications" icon={<IconAcademic />}>
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <span className="text-teal-600 mt-1 font-semibold text-lg">•</span>
                        <div>
                          <p className="font-semibold text-gray-900">M.D. Physician</p>
                          <p className="text-sm text-gray-500">Completed in 2001 — Lugansk State Medical University, Ukraine.</p>
                          <p className="text-xs text-gray-400 mt-0.5">Advanced medical training specializing in comprehensive diagnosis, internal medicine, and patient care.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="text-teal-600 mt-1 font-semibold text-lg">•</span>
                        <div>
                          <p className="font-semibold text-gray-900">Medical Council Registrations</p>
                          <div className="mt-2 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-semibold bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-100">DMC No. 30312</span>
                              <span className="text-xs text-gray-500">Delhi Medical Council (Registered 10/05/2006, Renewal done in 2017)</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-semibold bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-100">MCI No. 28024</span>
                              <span className="text-xs text-gray-500">Medical Council of India (Registered 18-04-2006)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaticCardItem>

                  <StaticCardItem title="Clinical Focus & Core Specialities" icon={<IconHeart />}>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Adult Care:</strong> Management of chronic hypertension, Type 2 diabetes, thyroid conditions, dynamic viral fevers, respiratory infections, and preventative annual checkups.</li>
                      <li><strong>Child Care:</strong> Pediatric consultation, wellness monitoring, common juvenile allergies, seasonal infections, and developmental checks.</li>
                      <li><strong>Preventive Medicine:</strong> Guidance on diet, healthy lifestyle integrations, screening schedules, and community wellness.</li>
                    </ul>
                  </StaticCardItem>

                  <StaticCardItem title="Professional Strengths" icon={<IconBadge />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                          <span className="text-teal-600 font-bold">✓</span> Clinical Policy & Care
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Possesses extensive, up-to-date knowledge of medical guidelines and healthcare policies.</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                          <span className="text-teal-600 font-bold">✓</span> Strong Communication
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Effective command over verbal and written communication with exceptional interpersonal skills.</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                          <span className="text-teal-600 font-bold">✓</span> Analytical Judgment
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Demonstrates sound medical judgment, diagnosis accuracy, and strong analytical skills.</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                          <span className="text-teal-600 font-bold">✓</span> Resilient & Adaptive
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Flexible and highly capable of working effectively under high-pressure clinical environments.</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-3">
                      <p className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                        <span className="text-teal-600 font-bold">✓</span> Multi-Tasking Capability
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Proven ability to manage multiple complex tasks, patient cases, and administrative duties simultaneously.</p>
                    </div>
                  </StaticCardItem>
                </div>
              </div>

              <div id="faqs" className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  <AccordionItem title="How do I book an appointment with Dr. Shobhit?">
                    Booking an appointment is simple. You can fill out the booking form on this website directly, or call the clinic at +91 9312017930 or +91 9818410364 to check timing slots.
                  </AccordionItem>
                  <AccordionItem title="Where does Dr. Shobhit practice?">
                    Dr. Shobhit conducts his private practice at <strong>Adult & Child Care</strong> in Rohini, Delhi (G-12/20, Sector-15, Rohini, Delhi-110089) during the evening.
                  </AccordionItem>
                  <AccordionItem title="What are the clinic evening timings?">
                    Adult & Child Care is open in the evenings from <strong>6:30 PM to 9:30 PM</strong>.
                  </AccordionItem>
                  <AccordionItem title="Is Dr. Shobhit registered with the medical council?">
                    Yes, Dr. Shobhit is a fully licensed M.D. Physician registered with the Delhi Medical Council (DMC No. 30312) and the Medical Council of India (MCI No. 28024).
                  </AccordionItem>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Sidebar */}
            <div id="timings" className="w-full lg:w-[400px] shrink-0 lg:-mt-64 relative z-20">
              <div className="sticky top-28 space-y-6">

                {/* Booking Widget */}
                <div className="w-full lg:w-[400px] shrink-0">
                  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                    <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2 relative z-10">
                      <span className="text-teal-600"><IconCalendar /></span>
                      Book an Appointment
                    </h3>

                    {success ? (
                      <div className="text-center py-8 space-y-4 relative z-10">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-3xl font-bold animate-pulse">
                          ✓
                        </div>
                        <h4 className="text-xl font-bold text-slate-900">Booking Requested!</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          An email notification has been dispatched to the doctor with appointment details and a quick-add Google Calendar button.
                        </p>

                        {previewUrl && (
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-6 text-left">
                            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1">🔬 Developer Mailbox Preview</p>
                            <p className="text-xs text-gray-500 mb-3">Since this is local dev, we captured the test email using Ethereal:</p>
                            <a
                              href={previewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all shadow-md hover:scale-[1.02]"
                            >
                              ✉️ View Sent Email
                            </a>
                          </div>
                        )}

                        <button
                          onClick={() => setSuccess(false)}
                          className="text-sm text-teal-600 underline hover:text-teal-700 mt-4 block mx-auto font-medium transition-colors"
                        >
                          Book Another Appointment
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleBooking} className="space-y-4 relative z-10">
                        {/* Name Field */}
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 block">Patient Name</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter patient full name"
                            className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-1 focus:ring-teal-500"
                          />
                        </div>

                        {/* WhatsApp Field */}
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 block">WhatsApp Number</label>
                          <input
                            type="tel"
                            required
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-1 focus:ring-teal-500"
                          />
                        </div>

                        {/* Date & Time Field */}
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 block">Preferred Date & Time</label>
                          <input
                            type="datetime-local"
                            required
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 rounded-xl px-4 py-2.5 text-slate-800 text-sm outline-none transition-all focus:bg-white focus:ring-1 focus:ring-teal-500 [color-scheme:light]"
                          />
                        </div>

                        {/* Purpose Field (Optional) */}
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 block">Purpose of Visit (Optional)</label>
                          <input
                            type="text"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            placeholder="e.g. Consultation, Checkup, Second Opinion"
                            className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-1 focus:ring-teal-500"
                          />
                        </div>

                        {error && (
                          <p className="text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-200 p-3 rounded-xl">
                            ⚠️ {error}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-teal-600 text-white font-bold text-base py-3.5 rounded-xl shadow-lg hover:bg-teal-700 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              📅 Book Appointment
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* OPD Timings Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-teal-600 p-5">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <IconCalendar />
                      Clinic Evening Timings
                    </h3>
                  </div>
                  <div className="p-5">
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-start gap-2 mb-2">
                        <span className="text-teal-600 mt-0.5"><IconLocation /></span>
                        Adult & Child Care
                      </h4>
                      <p className="text-xs text-gray-500 ml-7 mb-3 leading-relaxed">
                        G-12/20, Sector-15, Rohini, Delhi-110089
                      </p>
                      <div className="ml-7 bg-teal-50 text-teal-800 text-sm font-semibold py-2 px-3 rounded-lg inline-block">
                        Evening: 6:30 pm to 9:30 pm
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action Card */}
                <div className="bg-slate-900 rounded-3xl p-6 text-center text-white relative overflow-hidden">
                  <h4 className="text-xl font-bold mb-2 relative z-10">Need Assistance?</h4>
                  <p className="text-teal-100 text-sm mb-5 relative z-10">Call us directly to schedule a checkup or consult with Dr. Shobhit.</p>
                  <div className="space-y-2.5 relative z-10">
                    <a href="tel:+919312017930" className="inline-flex items-center justify-center gap-2 bg-white text-teal-900 font-bold py-3 px-6 rounded-xl w-full hover:bg-teal-50 transition-colors shadow-lg">
                      <IconPhone />
                      +91 93120-17930
                    </a>
                    <a href="tel:+919818410364" className="inline-flex items-center justify-center gap-2 bg-teal-700/50 backdrop-blur-md border border-teal-500/20 text-white font-bold py-2.5 px-6 rounded-xl w-full hover:bg-teal-700/80 transition-colors">
                      <IconPhone />
                      +91 98184-10364
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              ACC
            </div>
            <span className="text-lg font-bold text-white">Adult & Child Care</span>
          </div>
          <div className="text-xs text-slate-500 text-center md:text-left">
            Clinic: G-12/20, Sector-15, Rohini, Delhi-110089 | Email: dr.shobhitgupta1978@gmail.com
          </div>
          <div className="text-sm">
            &copy; 2026 Adult & Child Care. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
