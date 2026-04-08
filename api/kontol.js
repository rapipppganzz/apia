import nodemailer from "nodemailer";

const accounts = [
  {
    user: "rapipstok@gmail.com",
    pass: "dwoy pyrr yqqg oowe",
  },
  {
    user: "rapipslebew23@gmail.com",
    pass: "yvkv pmhn xdjv ncpn",
  }
];

export default async function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).json({ message: "API siap 🔥 pakai POST ya" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { nomor, nama } = body || {};

    if (!nomor || !nama) {
      return res.status(400).json({ message: "Nomor & nama wajib diisi" });
    }

    // Eksekusi pengiriman email secara paralel (bersamaan) biar cepat dan ga kena timeout Vercel
    const emailPromises = accounts.map(acc => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: acc,
        tls: { rejectUnauthorized: false }
      });

      return transporter.sendMail({
        from: acc.user,
        to: "support@whatsapp.com",
        subject: "Appeal for Restricted WhatsApp Account",
        text: `Dear WhatsApp Support Team,\n\nI am writing to formally appeal the restriction placed on my WhatsApp account associated with the number: ${nomor}.\n\nI believe this action may have been taken in error or due to a misinterpretation of my recent activity. I have not engaged in spam, automated messaging, or any behavior that intentionally violates WhatsApp’s Terms of Service.\n\nThis account is essential for my daily communication, and the current restriction has significantly impacted my ability to stay connected.\n\nI respectfully request a thorough review of my account. If any activity has been flagged incorrectly, I kindly ask for clarification so I can ensure full compliance moving forward.\n\nThank you for your time and consideration. I look forward to your response.\n\nSincerely,\n${nama}`,
      });
    });

    // Tunggu semua proses pengiriman email selesai
    await Promise.allSettled(emailPromises);

    res.status(200).json({ message: "Banding berhasil dikirim 🚀" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
