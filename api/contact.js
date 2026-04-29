import { Resend } from 'resend';
import formidable from 'formidable';
import { readFileSync } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_TOTAL_SIZE = 4 * 1024 * 1024;

const escapeHtml = (str) =>
  String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const firstValue = (field) => (Array.isArray(field) ? field[0] : field) || '';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  try {
    const form = formidable({
      maxFileSize: MAX_TOTAL_SIZE,
      maxTotalFileSize: MAX_TOTAL_SIZE,
      multiples: true,
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);

    const honeypot = firstValue(fields._honey);
    if (honeypot) {
      return res.status(200).json({ ok: true });
    }

    const name = firstValue(fields.name).trim();
    const email = firstValue(fields.email).trim();
    const mobile = firstValue(fields.mobile).trim();
    const brief = firstValue(fields.brief).trim();
    const budget = firstValue(fields.budget).trim();

    if (!name || !email || !mobile || !brief || !budget) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const rawAttachments = files.attachment;
    const fileList = rawAttachments
      ? Array.isArray(rawAttachments)
        ? rawAttachments
        : [rawAttachments]
      : [];

    const attachments = fileList
      .filter((f) => f && f.filepath && f.size > 0)
      .map((f) => ({
        filename: f.originalFilename || 'attachment',
        content: readFileSync(f.filepath),
      }));

    const html = `
      <div style="font-family: Arial, sans-serif; color: #050505; max-width: 640px;">
        <h2 style="color: #1907b7; margin-bottom: 16px;">New Contact Inquiry</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tbody>
            <tr><td style="padding: 10px 14px; border: 1px solid #e5e7eb; background: #f9fafb; width: 140px;"><strong>Name</strong></td><td style="padding: 10px 14px; border: 1px solid #e5e7eb;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 10px 14px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Email</strong></td><td style="padding: 10px 14px; border: 1px solid #e5e7eb;"><a href="mailto:${escapeHtml(email)}" style="color: #1907b7;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding: 10px 14px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Mobile</strong></td><td style="padding: 10px 14px; border: 1px solid #e5e7eb;">${escapeHtml(mobile)}</td></tr>
            <tr><td style="padding: 10px 14px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Budget</strong></td><td style="padding: 10px 14px; border: 1px solid #e5e7eb;">${escapeHtml(budget)}</td></tr>
            <tr><td style="padding: 10px 14px; border: 1px solid #e5e7eb; background: #f9fafb; vertical-align: top;"><strong>Brief</strong></td><td style="padding: 10px 14px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${escapeHtml(brief)}</td></tr>
          </tbody>
        </table>
        ${attachments.length ? `<p style="margin-top: 16px; color: #6b7280; font-size: 14px;">📎 ${attachments.length} attachment${attachments.length > 1 ? 's' : ''}</p>` : ''}
      </div>
    `;

    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: 'RESO Contact <noreply@resopr.com>',
      to: 'mjkim@resopr.com',
      cc: 'hayes@resopr.com',
      replyTo: email,
      subject: `New Contact Inquiry - ${name}`,
      html,
      attachments,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    if (err && (err.code === 1009 || err.code === 1015)) {
      return res.status(413).json({ error: 'File too large (max 4MB total)' });
    }
    console.error('Contact API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
