export function generateICS({
  name,
  dateTime,
  whatsapp,
  purpose,
}: {
  name: string;
  dateTime: string;
  whatsapp: string;
  purpose?: string;
}) {
  const startObj = new Date(dateTime);
  const endObj = new Date(startObj.getTime() + 30 * 60 * 1000); // 30 mins duration

  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const dtStart = formatICSDate(startObj);
  const dtEnd = formatICSDate(endObj);
  const dtStamp = formatICSDate(new Date());
  const uid = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}@drshobhit.com`;

  const summary = `Appointment - ${name}`;
  const description = `Patient Name: ${name}\nWhatsApp: ${whatsapp}${purpose ? `\nPurpose of Visit: ${purpose}` : ''}`;
  const location = `Adult & Child Care, G-12/20, Sector-15, Rohini, Delhi-110089`;

  const escapeICS = (str: string) => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  };

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Adult and Child Care//Dr Shobhit Clinic//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeICS(summary)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return icsLines.join('\r\n');
}
