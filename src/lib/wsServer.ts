import { WebSocketServer, WebSocket } from "ws";

interface IncomingWsMessage {
  type: string;
  convId?: string;
  text?: string;
}

interface BroadcastWsMessage {
  type: "support-message" | "system";
  from?: "admin" | "customer";
  convId?: string;
  text: string;
  time: string;
}

// type guard
function isIncomingWsMessage(value: unknown): value is IncomingWsMessage {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  if (typeof obj.type !== "string") return false;
  if ("convId" in obj && typeof obj.convId !== "string") return false;
  if ("text" in obj && typeof obj.text !== "string") return false;
  return true;
}

// construit le message de broadcast
function buildBroadcastPayload(
  input: IncomingWsMessage | null
): BroadcastWsMessage | null {
  if (!input) return null;

  if (input.type === "support-message") {
    if (!input.text || !input.convId) {
      return null;
    }

    const now = new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const out: BroadcastWsMessage = {
      type: "support-message",
      from: "admin",
      convId: input.convId,
      text: input.text,
      time: now,
    };

    return out;
  }

  return null;
}

// envoie à tous les admins connectés
function broadcast(payload: BroadcastWsMessage) {
  const data = JSON.stringify(payload);

  globalState.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  });
}

// état global pour éviter recréation en dev
interface GlobalWsState {
  wss: WebSocketServer;
  clients: Set<WebSocket>;
  initialized: boolean;
}

const globalRef = globalThis as unknown as {
  __BURGERITO_WS_STATE__?: GlobalWsState;
};

if (!globalRef.__BURGERITO_WS_STATE__) {
  globalRef.__BURGERITO_WS_STATE__ = {
    wss: new WebSocketServer({ noServer: true }),
    clients: new Set<WebSocket>(),
    initialized: false,
  };
}

const globalState = globalRef.__BURGERITO_WS_STATE__;

if (!globalState.initialized) {
  globalState.initialized = true;

  globalState.wss.on("connection", (ws: WebSocket) => {
    // on ajoute le nouvel admin connecté
    globalState.clients.add(ws);

    ws.on("message", (raw: Buffer) => {
      let parsed: IncomingWsMessage | null = null;

      try {
        const rawString = raw.toString();
        const asJson = JSON.parse(rawString);
        if (isIncomingWsMessage(asJson)) {
          parsed = asJson;
        }
      } catch {
        // ignore json invalide
      }

      const outgoing = buildBroadcastPayload(parsed);
      if (outgoing) {
        broadcast(outgoing);
      }
    });

    ws.on("close", () => {
      globalState.clients.delete(ws);
    });

    const welcome: BroadcastWsMessage = {
      type: "system",
      text: "✅ Connected to Burgerito Support WS",
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    ws.send(JSON.stringify(welcome));
  });
}

export const wss = globalState.wss;
export const wsClients = globalState.clients;
