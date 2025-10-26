# 🧠 Burgerito Admin

**Burgerito Admin** est le panneau d’administration de l’application e-commerce **Burgerito**.  
Il permet aux administrateurs de gérer les commandes, suivre leur statut, et échanger en temps réel avec les clients via un système de **chat WebSocket** intégré.

Ce back-office est développé avec **Next.js**, **React**, et **Tailwind CSS**, en utilisant l’**Edge Runtime** pour la gestion des WebSockets.

---

## 🚀 Fonctionnalités principales

- 🔐 **Authentification administrateur** (accès sécurisé)
- ![22](https://github.com/user-attachments/assets/5a74e733-c813-45dc-b925-64831dd3ea82)

- 📦 **Gestion des commandes** : visualisation, mise à jour du statut (en cours, livré, annulé)
- 💬 **Support client en temps réel** (chat WebSocket)
- 📡 **Communication ** admin ↔ client
![11](https://github.com/user-attachments/assets/b6b06632-a575-4ae2-a0fb-9059a682caac)

- 🧭 **Navigation claire** (Dashboard, Orders, Support)
- <img width="1573" height="81" alt="image" src="https://github.com/user-attachments/assets/8b94eb4b-6200-41d3-9fba-6b16fe655756" />

- 🎨 **Interface moderne et responsive**

---

## 🧠 Stack technique

| Technologie | Usage |
|--------------|--------|
| **Next.js 15** | Framework principal |
| **React 19** | Interface utilisateur |
| **TypeScript** | Sécurité et typage fort |
| **Tailwind CSS 4** | Stylisation moderne |
| **WebSocket (Edge Runtime)** | Communication temps réel |
| **LocalStorage / API interne** | Stockage temporaire |

---

## 🧩 Installation & Lancement

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/mohamedbatri-6/Burgerito-Admin.git
cd Burgerito-Admin
npm install
npm run dev
burgerito-admin/


├── src/
│   ├── app/
│   │   ├── (admin)/
│   │   │   ├── login/
│   │   │   ├── support/
│   │   │   └── orders/
│   │   └── api/
│   │       └── ws/
│   │           └── route.ts   # Serveur WebSocket (Edge Runtime)
│   ├── components/
│   │   ├── AdminHeader.tsx
│   │   ├── Protected.tsx
│   │   ├── SupportChat.tsx
│   │   └── SupportConv.tsx
│   ├── lib/
│   │   ├── useSupportChat.ts   # Hook WebSocket (client)
│   │   └── ...
│   └── styles/
│       └── globals.css
├── public/
├── package.json
└── server.ts
└── tsconfig.json

