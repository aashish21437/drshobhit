import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateICS } from '@/lib/ics';

export async function POST(request: Request) {
  try {
    const { name, whatsapp, dateTime, purpose } = await request.json();

    if (!name || !whatsapp || !dateTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Parse date and calculate start/end times for Google Calendar URL
    // Input format from datetime-local is: "YYYY-MM-DDTHH:mm"
    const startObj = new Date(dateTime);
    
    // In case the parsed date is invalid
    if (isNaN(startObj.getTime())) {
      return NextResponse.json({ error: 'Invalid date/time format' }, { status: 400 });
    }

    const endObj = new Date(startObj.getTime() + 30 * 60 * 1000); // Default to a 30-minute meeting duration

    // Format date as YYYYMMDDTHHmmSSZ
    const formatGCalDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const gcalStart = formatGCalDate(startObj);
    const gcalEnd = formatGCalDate(endObj);

    // 2. Generate Google Calendar URL
    const gcalTitle = encodeURIComponent(`Appointment: ${name}`);
    const gcalDates = `${gcalStart}/${gcalEnd}`;
    const gcalDetails = encodeURIComponent(
      `Patient Name: ${name}\nWhatsApp: ${whatsapp}\nPreferred Time: ${startObj.toLocaleString('en-IN')}${purpose ? `\nPurpose of Visit: ${purpose}` : ''}`
    );
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&dates=${gcalDates}&details=${gcalDetails}`;

    // 3. Setup Nodemailer Transporter
    // In local development, we configure a secure default or use Ethereal for dummy SMTP testing.
    let transporter;
    
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Fallback: Create a mock testing account using ethereal.email
      // This allows immediate plug-and-play testing without env variables!
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // 4. HTML Template for Email
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #f1f5f9; border-radius: 24px; background-color: #ffffff; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
        <div style="text-align: center; margin-bottom: 25px;">
          <div style="display: inline-block; background-color: #f0fdf4; color: #15803d; padding: 8px 16px; border-radius: 9999px; font-size: 14px; font-weight: 600;">
            📅 New Appointment Booking
          </div>
        </div>
        
        <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 20px; font-size: 22px; font-weight: 700; text-align: center; letter-spacing: -0.025em;">
          Appointment Request Received
        </h2>
        
        <p style="color: #475569; font-size: 15px; line-height: 1.5; text-align: center; margin-bottom: 30px;">
          Hello Dr. Shobhit, you have received a new appointment request. Below are the details:
        </p>
        
        <div style="background-color: #f8fafc; border-radius: 16px; padding: 20px; margin-bottom: 35px; border: 1px solid #f1f5f9;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 14px; width: 140px;">Patient Name</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 14px;">WhatsApp Number</td>
              <td style="padding: 8px 0; color: #0d9488; font-size: 15px; font-weight: 600;">
                <a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" style="color: #0d9488; text-decoration: none;">
                  ${whatsapp}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 14px;">Preferred Time</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 600; color: #0369a1;">
                ${startObj.toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
              </td>
            </tr>
            ${purpose ? `
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 14px;">Purpose of Visit</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 500;">${purpose}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div style="text-align: center; margin-bottom: 10px;">
          <a href="${gcalUrl}" target="_blank" style="background-color: #0d9488; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-size: 16px; font-weight: 700; display: inline-block; box-shadow: 0 4px 14px 0 rgba(13, 148, 136, 0.3); transition: all 0.2s;">
            ➕ Add to Google Calendar
          </a>
        </div>
        
        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
          This is an automated request sent from the Dr. Shobhit Patient Booking Portal.
        </p>
      </div>
    `;

    // 5. Send Mail
    const mailOptions = {
      from: `"Adult & Child Care Booking Portal" <${process.env.SMTP_FROM || 'bookings@drshobhit.com'}>`,
      to: process.env.DOCTOR_EMAIL || 'dr.shobhitgupta1978@gmail.com', // Recipient doctor
      subject: `🚨 New Appointment: ${name}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    const previewUrl = nodemailer.getTestMessageUrl(info);

    const icsContent = generateICS({ name, dateTime, whatsapp, purpose });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request sent successfully!',
      previewUrl: previewUrl || null,
      icsContent
    });
  } catch (error: any) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
