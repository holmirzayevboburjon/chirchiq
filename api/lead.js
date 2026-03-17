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

    const googleScriptUrl =
      "https://script.google.com/macros/s/AKfycbymnCM3nG5g_H-vlAiODkyeb-jK1zW1hvP7ctzLbm0_RYXHkjTann4ZjeghoMGfg8lK/exec";

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        page: page || ""
      })
    });

    const text = await response.text();

    let result = {};
    try {
      result = JSON.parse(text);
    } catch (e) {
      result = { status: "error", raw: text };
    }

    if (!response.ok) {
      return res.status(500).json({
        ok: false,
        message: "Google Sheetga yuborilmadi"
      });
    }

    return res.status(200).json({
      ok: true,
      google: result
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}
