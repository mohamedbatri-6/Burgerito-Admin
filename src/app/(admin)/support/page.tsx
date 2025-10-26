"use client";

import { useState } from "react";
import SupportConversationsList from "@/components/SupportConversationsList";
import SupportChatWindow from "@/components/SupportChatWindow";

export default function SupportPage() {
  // conversation sélectionnée dans la colonne de gauche
  const [activeConvId, setActiveConvId] = useState<string>("conv1");

  return (
    <div className="flex w-full min-h-[500px] border border-white/10 rounded-lg overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderRadius: "var(--radius-card)",
      }}
    >
      {/* Liste des conversations à gauche */}
      <SupportConversationsList
        activeId={activeConvId}
        onSelect={setActiveConvId}
      />

      {/* Fenêtre de chat à droite */}
      <div className="flex-1 flex flex-col bg-[var(--color-bg-page)]">
        <SupportChatWindow conversationId={activeConvId} />
      </div>
    </div>
  );
}
