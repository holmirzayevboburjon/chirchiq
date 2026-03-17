export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  try {
    const { name, phone, page } = req.body;

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbymnCM3nG5g_H-vlAiODkyeb-jK1zW1hvP7ctzLbm0_RYXHkjTann4ZjeghoMGfg8lK/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          page
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Server error"
    });
  }
}
