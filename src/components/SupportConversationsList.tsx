"use client";

import { useState } from "react";

interface Conversation {
  id: string;
  customerName: string;
  lastMessagePreview: string;
  unread: number;
}

const mockConversations: Conversation[] = [
  {
    id: "conv1",
    customerName: "Sarah L.",
    lastMessagePreview: "",
    unread: 0,
  },
  {
    id: "conv2",
    customerName: "Hugo M.",
    lastMessagePreview: "",
    unread: 0,
  },
  {
    id: "conv3",
    customerName: "Lina P.",
    lastMessagePreview: "",
    unread: 0,
  },
];

export default function SupportConversationsList(props: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const { activeId, onSelect } = props;
  const [conversations] = useState<Conversation[]>(mockConversations);

  return (
    <aside
      className="w-full md:w-64 border-r border-white/10 flex-shrink-0"
      style={{ backgroundColor: "var(--color-bg-card)" }}
    >
      <div className="p-4 border-b border-white/10">
        <h2 className="text-sm font-semibold text-[var(--color-text-main)]">
          Conversations
        </h2>
        <p className="text-[12px] text-gray-400">
          {conversations.length} active
        </p>
      </div>

      <ul className="max-h-[calc(100vh-200px)] overflow-y-auto text-sm">
        {conversations.map((conv) => {
          const isActive = conv.id === activeId;
          return (
            <li
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`p-4 cursor-pointer border-b border-white/10 hover:bg-white/5 transition flex flex-col ${
                isActive ? "bg-white/10" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-medium"
                  style={{ color: "var(--color-text-main)" }}
                >
                  {conv.customerName}
                </span>

                {conv.unread > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-red-500 text-white font-semibold">
                    {conv.unread}
                  </span>
                )}
              </div>

              <p className="text-[12px] text-gray-400 mt-1 truncate">
                {conv.lastMessagePreview}
              </p>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
