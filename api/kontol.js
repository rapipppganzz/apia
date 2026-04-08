import nodemailer from "nodemailer";
export default function handler(req, res) {
  res.status(200).json({ message: "hidup" });
}
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
  const { nomor, nama } = req.body;

  if (!nomor || !nama) {
    return res.status(400).json({ message: "Nomor & nama wajib diisi" });
  }

  try {
    for (let acc of accounts) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: acc.user,
          pass: acc.pass,
        },
      });

      await transporter.sendMail({
        from: acc.user,
        to: "support@whatsapp.com",
        subject: "Appeal for Restricted WhatsApp Account",
        text: `Dear WhatsApp Support Team,

I am writing to formally appeal the restriction placed on my WhatsApp account associated with the number: ${nomor}.

I believe this action may have been taken in error or due to a misinterpretation of my recent activity. I have not engaged in spam, automated messaging, or any behavior that intentionally violates WhatsApp’s Terms of Service.

This account is essential for my daily communication, and the current restriction has significantly impacted my ability to stay connected.

I respectfully request a thorough review of my account. If any activity has been flagged incorrectly, I kindly ask for clarification so I can ensure full compliance moving forward.

Thank you for your time and consideration. I look forward to your response.

Sincerely,  
${nama}`,
      });

      // delay biar aman
      await new Promise(r => setTimeout(r, 10000));
    }

    res.status(200).json({ message: "Banding berhasil dikirim 🚀" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
