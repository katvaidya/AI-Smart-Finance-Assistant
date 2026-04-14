exports.checkScam = (req, res) => {
    const { message } = req.body;

    const scamWords = ["otp", "urgent", "click", "win", "prize", "account blocked"];

    let risk = "Safe ✅";

    scamWords.forEach(word => {
        if (message.toLowerCase().includes(word)) {
            risk = "⚠️ Scam Detected!";
        }
    });

    res.json({ risk });
};