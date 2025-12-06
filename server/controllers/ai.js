import { Ollama } from "ollama";

const ollama = new Ollama({
    host: "https://ollama.com",
    headers: {
       Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
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
