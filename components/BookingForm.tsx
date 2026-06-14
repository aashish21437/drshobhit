"use client";
import React, { useState } from 'react';

export default function BookingForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !time) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(false);
    setPreviewUrl(null);

    try {
      // Combine date and time to match "YYYY-MM-DDTHH:mm" format
      const dateTime = `${date}T${time}`;

      const res = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, dateTime, purpose }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit booking');
      }

      setSuccess(true);
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
      // Reset form
      setName('');
      setPhone('');
      setDate('');
      setTime('');
      setPurpose('');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8 space-y-4 relative z-10">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-3xl font-bold animate-pulse">
          ✓
        </div>
        <h4 className="text-xl font-bold text-slate-900">Booking Requested!</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          An email invitation has been sent to the doctor.
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
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

      {/* Phone Field */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 block">Phone Number</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-gray-400 outline-none transition-all focus:bg-white focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* Date & Time Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 block">Preferred Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 rounded-xl px-4 py-2.5 text-slate-800 text-sm outline-none transition-all focus:bg-white focus:ring-1 focus:ring-teal-500 [color-scheme:light]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 block">Preferred Time</label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 focus:border-teal-500 rounded-xl px-4 py-2.5 text-slate-800 text-sm outline-none transition-all focus:bg-white focus:ring-1 focus:ring-teal-500 [color-scheme:light]"
          />
        </div>
      </div>

      {/* Purpose Field (Optional) */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 block">Reason (Purpose of Visit)</label>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="e.g. Consultation, Checkup, Follow-up"
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
  );
}
