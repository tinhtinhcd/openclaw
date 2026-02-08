const fs = require("fs");

// Fix models.json - replace hardcoded key with env var reference
const modelsPath = "/home/node/.openclaw/agents/main/agent/models.json";
const data = JSON.parse(fs.readFileSync(modelsPath, "utf8"));

if (data.providers.google) {
  data.providers.google.apiKey = "GEMINI_API_KEY";
}
if (data.providers["vertex-express"]) {
  data.providers["vertex-express"].apiKey = "GEMINI_API_KEY";
}

fs.writeFileSync(modelsPath, JSON.stringify(data, null, 2));
console.log("models.json fixed - all providers use GEMINI_API_KEY env var reference");

// Fix auth.json with new key
const authPath = "/home/node/.openclaw/agents/main/agent/auth.json";
const auth = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "MISSING",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "MISSING",
  OLLAMA_API_KEY: "ollama",
};
fs.writeFileSync(authPath, JSON.stringify(auth, null, 2));
console.log("auth.json updated with current env vars");
console.log("GEMINI_API_KEY starts with:", (auth.GEMINI_API_KEY || "").substring(0, 10));
console.log("GROQ_API_KEY starts with:", (auth.GROQ_API_KEY || "").substring(0, 10));
