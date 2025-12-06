import { Ollama } from "ollama";

const ollama = new Ollama({
    host: "https://ollama.com",
    headers: {
        Authorization: "Bearer 3b7b34eb1c2e4b9aa74d9f4d6af7ceef.SIrejJrFgPaHKiFWam19V3MY",
    },
});

const chat = async (req, res) => {
    const response = await ollama.chat({
        model: "gpt-oss:120b-cloud",
        messages: [{ role: "user", content: req.query.message || "Explain quantum computing" }],
        stream: false,
    });

    res.json({ response });
}

export default chat;
