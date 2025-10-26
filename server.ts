import http from "http";
import next from "next";
import { parse } from "url";
import { wss } from "./src/lib/wsServer";

// MODE DEV OU PROD
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

// Next donne un handler (req,res) pour servir les pages /api /app
const handleNextRequests = app.getRequestHandler();

async function start() {
  await app.prepare();

  // On crée un serveur HTTP Node "à la main"
  const server = http.createServer((req, res) => {
    // On laisse Next gérer toutes les requêtes HTTP normales
    // (pages, API routes, fichiers statiques, etc.)
    const parsedUrl = parse(req.url || "", true);
    handleNextRequests(req, res, parsedUrl);
  });

  // Ici on intercepte les upgrades WebSocket
  server.on("upgrade", (req, socket, head) => {
    // ex : l'admin se connecte à ws://localhost:3000/ws
    if (req.url === "/ws") {
      // On dit à notre WebSocketServer (wss) de prendre le relais
      wss.handleUpgrade(req, socket, head, (ws) => {
        // ws est la WebSocket du client connecté
        wss.emit("connection", ws, req);
      });
    } else {
      // si ce n'est pas pour nous, on ferme le socket proprement
      socket.destroy();
    }
  });

  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  server.listen(PORT, () => {
    console.log(`🚀 Burgerito Admin running at http://localhost:${PORT}`);
    console.log(`💬 WebSocket ready at ws://localhost:${PORT}/ws`);
  });
}

start().catch((err) => {
  console.error("Fatal server error:", err);
  process.exit(1);
});
