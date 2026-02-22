import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Static keys configuration
const TEST_KEYS: Record<string, string[]> = {
  "kpop-chosengroup1": ["sa3hf7gub5", "6pmv14ezls", "0428"],
  "kpop-5generationtop": ["jkf1ua2giu", "8yxirmc9wq", "0428"]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/verify-key", (req, res) => {
    const { testId, key } = req.body;

    if (!testId || !key) {
      return res.status(400).json({ error: "Missing testId or key" });
    }

    const validKeys = TEST_KEYS[testId];

    if (!validKeys) {
      return res.status(404).json({ error: "Test ID not found" });
    }

    if (validKeys.includes(key.trim())) {
      return res.json({ success: true });
    } else {
      return res.status(401).json({ error: "Invalid key" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
