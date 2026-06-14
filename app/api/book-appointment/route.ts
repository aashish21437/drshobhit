import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone, dateTime, purpose } = await request.json();

    if (!name || !phone || !dateTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Calculate appointment times strictly in Asia/Kolkata
    // We treat the inputs as Asia/Kolkata timezone:
    // Format required for iCalendar in local timezone with TZID is YYYYMMDDTHHmmSS (no 'Z' suffix)
    // E.g., DTSTART;TZID=Asia/Kolkata:20260518T100000
    
    // Parse the input 'YYYY-MM-DDTHH:mm'
    const startObj = new Date(`${dateTime}:00Z`); // parse using UTC representation for simple math
    if (isNaN(startObj.getTime())) {
      return NextResponse.json({ error: 'Invalid date/time format' }, { status: 400 });
    }

    const endObj = new Date(startObj.getTime() + 60 * 60 * 1000); // 1 hour duration

    const formatICSDate = (date: Date) => {
      const y = date.getUTCFullYear();
      const m = String(date.getUTCMonth() + 1).padStart(2, '0');
      const d = String(date.getUTCDate()).padStart(2, '0');
      const h = String(date.getUTCHours()).padStart(2, '0');
      const min = String(date.getUTCMinutes()).padStart(2, '0');
      const s = String(date.getUTCSeconds()).padStart(2, '0');
      return `${y}${m}${d}T${h}${min}${s}`;
    };

    const dtStart = formatICSDate(startObj);
    const dtEnd = formatICSDate(endObj);
    const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const uid = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}@drshobhit.com`;

    // 2. Format description and location
    const summary = `Appointment - ${name}`;
    const description = `Patient Name: ${name}\nPhone Number: ${phone}${purpose ? `\nReason: ${purpose}` : ''}`;
    const location = `Adult & Child Care, G-12/20, Sector-15, Rohini, Delhi-110089`;

    const escapeICS = (str: string) => {
      return str
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n');
    };

    // 3. Build iCalendar content
    // Method MUST be REQUEST for Gmail's native Calendar integration
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Adult and Child Care//Dr Shobhit Clinic//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VTIMEZONE',
      'TZID:Asia/Kolkata',
      'X-LIC-LOCATION:Asia/Kolkata',
      'BEGIN:STANDARD',
      'TZOFFSETFROM:+0530',
      'TZOFFSETTO:+0530',
      'TZNAME:IST',
      'DTSTART:19700101T000000',
      'END:STANDARD',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART;TZID=Asia/Kolkata:${dtStart}`,
      `DTEND;TZID=Asia/Kolkata:${dtEnd}`,
      `SUMMARY:${escapeICS(summary)}`,
      `DESCRIPTION:${escapeICS(description)}`,
      `LOCATION:${escapeICS(location)}`,
      'ORGANIZER;CN="Adult & Child Care Booking Portal":mailto:bookings@drshobhit.com',
      'ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="Ashish Chauhan":mailto:ashishchauhan4636@gmail.com',
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'TRANSP:OPAQUE',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    // 4. Format Date and Time for email content
    const dateObj = new Date(`${dateTime}:00Z`);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
    const formattedTime = dateObj.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });

    // 5. Build the exact text layout requested:
    const textContent = [
      'Dear Doctor.',
      '',
      `A new patient ${name} had requested for an appointment as per below details :`,
      '',
      `Date : ${formattedDate}`,
      `Time : ${formattedTime}`,
      `Reason : ${purpose || 'N/A'}`,
    ].join('\n');

    // 6. Send Mail via Resend REST API
    const resendApiKey = process.env.SMTP_PASSWORD || process.env.RESEND_API_KEY;
    const recipientEmail = process.env.DOCTOR_EMAIL || 'ashishchauhan4636@gmail.com';
    const toEmails = recipientEmail.split(',').map((email) => email.trim());
    const fromEmail = process.env.SMTP_FROM || 'onboarding@resend.dev';

    const base64Ics = Buffer.from(icsContent).toString('base64');

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Adult & Child Care Booking Portal <${fromEmail}>`,
        to: toEmails,
        subject: `🚨 New Appointment: ${name}`,
        text: textContent,
        attachments: [
          {
            filename: 'appointment.ics',
            content: base64Ics,
            content_type: 'text/calendar; charset="utf-8"; method=REQUEST',
          },
        ],
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      throw new Error(resendData.message || 'Failed to send email via Resend API');
    }

    return NextResponse.json({
      success: true,
      message: 'Booking request sent successfully!',
      previewUrl: null,
      icsContent,
    });
  } catch (error: any) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
