export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const { name, email, subject, message } = req.body || {};

  const safeName = String(name || "").trim();
  const safeEmail = String(email || "").trim();
  const safeSubject = String(subject || "New HYb inquiry").trim();
  const safeMessage = String(message || "").trim();

  if (!safeName || !safeEmail || !safeMessage) {
    res.status(400).json({ ok: false, error: "Invalid input" });
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(safeEmail)) {
    res.status(400).json({ ok: false, error: "Invalid input" });
    return;
  }

  if (safeMessage.length > 3000 || safeSubject.length > 160 || safeName.length > 120) {
    res.status(400).json({ ok: false, error: "Invalid input" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL;
  const fromAddress = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toAddress || !fromAddress) {
    res.status(500).json({ ok: false, error: "Email service is not configured" });
    return;
  }

  try {
    const sendResult = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        subject: safeSubject,
        reply_to: safeEmail,
        text: [
          `Name: ${safeName}`,
          `Email: ${safeEmail}`,
          "",
          safeMessage
        ].join("\n")
      })
    });

    if (!sendResult.ok) {
      res.status(502).json({ ok: false, error: "Upstream email provider error" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Failed to send message" });
  }
}