export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  try {
    const { name, phone, page } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({
        ok: false,
        message: "Ism va telefon raqam kerak"
      });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({
        ok: false,
        message: "Telegram sozlamalari topilmadi"
      });
    }

    const text =
      `📩 Yangi lead\n\n` +
      `👤 Ism: ${name}\n` +
      `📞 Telefon: ${phone}\n` +
      `🌐 Sahifa: ${page || "-"}`;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text
      })
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResult.ok) {
      return res.status(500).json({
        ok: false,
        message: telegramResult.description || "Telegramga yuborilmadi"
      });
    }

    return res.status(200).json({
      ok: true
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}
