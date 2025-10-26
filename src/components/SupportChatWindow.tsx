"use client";

import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: string;
  from: "customer" | "admin" | "system";
  text: string;
  time: string;
  convId: string;
}

// historique initial par conversation
const initialMessagesByConv: Record<string, ChatMessage[]> = {
  conv1: [
    {
      id: "m1",
      from: "customer",
      text: "",
      time: "12:41",
      convId: "conv1",
    },
    {
      id: "m2",
      from: "admin",
      text: "",
      time: "12:42",
      convId: "conv1",
    },
  ],
  conv2: [
    {
      id: "m4",
      from: "customer",
      text: "",
      time: "13:02",
      convId: "conv2",
    },
    {
      id: "m5",
      from: "admin",
      text: "",
      time: "13:03",
      convId: "conv2",
    },
  ],
  conv3: [
    {
      id: "m6",
      from: "customer",
      text: "",
      time: "13:10",
      convId: "conv3",
    },
    {
      id: "m7",
      from: "admin",
      text: "",
      time: "13:11",
      convId: "conv3",
    },
  ],
};

export default function SupportChatWindow(props: { conversationId: string }) {
  const { conversationId } = props;

  const [messagesByConv, setMessagesByConv] = useState<
    Record<string, ChatMessage[]>
  >(initialMessagesByConv);

  const [draft, setDraft] = useState("");

  // ref sur la websocket
  const wsRef = useRef<WebSocket | null>(null);

  // ref pour autoscroll
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesByConv, conversationId]);

  // Connexion WebSocket au serveur custom
  useEffect(() => {
    if (wsRef.current) return; // déjà connectée

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${protocol}://${window.location.host}/ws`;

    const socket = new WebSocket(wsUrl);
    wsRef.current = socket;

    socket.addEventListener("open", () => {
      console.log("✅ WS connected");
    });

    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data as string);

        // On s'attend à recevoir un objet { type, from, convId, text, time }
        if (
          data &&
          typeof data === "object" &&
          "type" in data &&
          (data.type === "support-message" || data.type === "system")
        ) {
          const convIdVal =
            typeof data.convId === "string"
              ? data.convId
              : conversationId;

          const newMsg: ChatMessage = {
            id: `live-${Date.now()}`,
            from:
              data.type === "system"
                ? "system"
                : "admin", // pour l'instant on ne reçoit que l'admin
            text:
              typeof data.text === "string"
                ? data.text
                : "",
            time:
              typeof data.time === "string"
                ? data.time
                : new Date().toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
            convId: convIdVal,
          };

          setMessagesByConv((prev) => {
            const list = prev[convIdVal] ?? [];
            return {
              ...prev,
              [convIdVal]: [...list, newMsg],
            };
          });
        }
      } catch (err) {
        console.warn("WS message parse error:", err);
      }
    });

    socket.addEventListener("close", () => {
      console.log("WS closed");
    });

    socket.addEventListener("error", (err) => {
      console.error("WS error", err);
    });
  }, [conversationId]);

  // envoyer un message depuis l'admin
  function handleSend() {
    const text = draft.trim();
    if (!text) return;

    const socket = wsRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      const outgoing = {
        type: "support-message",
        convId: conversationId,
        text,
      };
      socket.send(JSON.stringify(outgoing));
    }

    // affichage optimiste immédiat
    const optimistic: ChatMessage = {
      id: `local-${Date.now()}`,
      from: "admin",
      text,
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      convId: conversationId,
    };

    setMessagesByConv((prev) => {
      const list = prev[conversationId] ?? [];
      return {
        ...prev,
        [conversationId]: [...list, optimistic],
      };
    });

    setDraft("");
  }

  const activeMessages = messagesByConv[conversationId] ?? [];

  const friendlyName =
    conversationId === "conv1"
      ? "Sarah L."
      : conversationId === "conv2"
      ? "Hugo M."
      : conversationId === "conv3"
      ? "Lina P."
      : "Customer";

  return (
    <section className="flex flex-col flex-1 min-h-[400px]">
      {/* Header conv */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-white/10"
        style={{ backgroundColor: "var(--color-bg-card)" }}
      >
        <div>
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--color-text-main)" }}
          >
            Chat with {friendlyName}
          </h2>
          <p className="text-[12px] text-gray-400">
            Last message at{" "}
            {activeMessages[activeMessages.length - 1]?.time ?? "--:--"}
          </p>
        </div>

        <span className="text-[10px] text-gray-400">#{conversationId}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--color-bg-page)]">
        {activeMessages.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-10">
            No messages yet in this conversation.
          </p>
        ) : (
          activeMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.from === "admin"
                  ? "justify-end"
                  : msg.from === "system"
                  ? "justify-center"
                  : "justify-start"
              }`}
            >
              <div
                className={
                  msg.from === "system"
                    ? "text-[11px] text-gray-400 italic max-w-[80%] text-center"
                    : "max-w-[70%] rounded-lg px-3 py-2 text-sm shadow border border-white/10"
                }
                style={
                  msg.from === "system"
                    ? undefined
                    : {
                        backgroundColor:
                          msg.from === "admin"
                            ? "var(--color-accent)"
                            : "var(--color-bg-card)",
                        color:
                          msg.from === "admin"
                            ? "var(--color-bg-card)"
                            : "var(--color-text-main)",
                      }
                }
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                {msg.from !== "system" && (
                  <div className="text-[10px] text-right mt-1 opacity-70">
                    {msg.time}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="border-t border-white/10 p-4 flex items-center gap-3"
        style={{ backgroundColor: "var(--color-bg-card)" }}
      >
        <input
          className="flex-1 text-sm rounded-md bg-black/40 border border-gray-700 outline-none px-3 py-2 text-white focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
          placeholder="Write a reply…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          className="text-sm font-semibold rounded-md px-3 py-2 hover:opacity-90 transition"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg-card)",
          }}
        >
          Send
        </button>
      </div>
    </section>
  );
}
