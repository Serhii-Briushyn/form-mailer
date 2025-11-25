# 📦 Form Mailer

**Form Mailer** — a web application designed to generate and send financial project emails.  
It allows project managers to quickly fill in project data, automatically calculate margins, and open a pre‑filled message in their email client.

Built with **React + TypeScript + Vite**, following a **Feature‑based architecture** for modularity and scalability.

---

## 🚀 Features

| Category              | Description                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| 🧾 Project Form       | Input all project data: numbers, customer, contact person, delivery date, etc.  |
| 💰 Margin Calculation | Automatically calculates _Initial Cost_ with either fixed (8%) or custom margin |
| ⚙️ Flexible Logic     | Allows manual editing and switching between margin modes                        |
| ✉️ Email Generation   | Builds a formatted `mailto:` link with all project details                      |
| 🌗 Dark Mode          | Toggle between light/dark theme with localStorage persistence                   |
| 🧩 Architecture       | Clean feature-based structure with isolated UI, hooks, and logic                |
| 🎨 UI System          | Reusable field components: `TextField`, `NumberField`, `SelectField`, etc.      |

---

## 🏗 Project Structure

```
📦 FORM-MAILER
│
├── src/
│   ├── app/
│   │   └── App.tsx
│   ├── features/
│   │   └── margin/
│   │       ├── model/
│   │       │   ├── useInitialCostUI.ts
│   │       │   ├── useMargin.ts
│   │       │   └── index.ts
│   │       ├── ui/
│   │       │   ├── MarginOptions.tsx
│   │       │   └── index.ts
│   │       └── index.ts
│   ├── pages/
│   │   └── project/
│   │       ├── lib/
│   │       │   ├── mapFormToMailData.ts
│   │       │   └── index.ts
│   │       ├── model/
│   │       │   ├── types.ts
│   │       │   ├── useFormHandlers.ts
│   │       │   └── index.ts
│   │       ├── ProjectPage.tsx
│   │       └── index.ts
│   ├── shared/
│   │   ├── constants/
│   │   │   ├── form.ts
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useEscapeToClose.ts
│   │   │   ├── useOutsideClick.ts
│   │   │   ├── useSelectKeyboard.ts
│   │   │   ├── useTheme.ts
│   │   │   └── index.ts
│   │   ├── lib/
│   │   │   ├── dates.ts
│   │   │   ├── mail.ts
│   │   │   ├── normalizeOptions.ts
│   │   │   ├── numbers.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── common.ts
│   │   │   ├── mail.ts
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   ├── fields/
│   │   │   │   ├── primitives/
│   │   │   │   │   ├── FormLabel.tsx
│   │   │   │   │   ├── InputBox.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── CheckboxField.tsx
│   │   │   │   ├── DateField.tsx
│   │   │   │   ├── NumberField.tsx
│   │   │   │   ├── SelectField.tsx
│   │   │   │   ├── TextField.tsx
│   │   │   │   └── index.ts
│   │   │   ├── help/
│   │   │   │   ├── HelpPopover.tsx
│   │   │   │   └── index.ts
│   │   │   ├── theme/
│   │   │   │   ├── ThemeToggle.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   └── main.tsx
│
├── public/
│   └── icons/
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Core Hooks

| Hook                | Purpose                                                 |
| ------------------- | ------------------------------------------------------- |
| `useMargin`         | Manages margin logic (modes, percentages, calculations) |
| `useInitialCostUI`  | Controls _Initial Cost_ UI state and auto-focus         |
| `useFormHandlers`   | Handles all form field changes                          |
| `useTheme`          | Toggles dark/light theme and persists to localStorage   |
| `useOutsideClick`   | Detects outside clicks (used for popovers and selects)  |
| `useSelectKeyboard` | Enables keyboard navigation for custom select lists     |

---

## ✉️ Email Generation Logic

```ts
const body = buildMailBody(mailData, formatDate(formData.delivery_date));
const subject = `New project ${formData.number_of_our_project}`;
const mailto = buildMailtoLink("finance@nmh-sro.com", subject, body);
window.location.href = mailto;
```

After clicking **Send**, the user’s default email client (Outlook, Gmail, etc.) opens  
with a fully formatted message containing all entered project data.

---

## 🧰 Tech Stack

| Category        | Technologies                            |
| --------------- | --------------------------------------- |
| ⚛️ Frontend     | React, TypeScript, Vite                 |
| 🧩 Architecture | Feature-based modular structure         |
| 🎨 Styling      | Tailwind-style classes                  |
| 🧠 State        | useState, useEffect (no Redux)          |
| ✉️ Mailing      | mailto links with utility functions     |
| 🌗 Theme        | Custom `useTheme` hook with persistence |
| 🧱 Typing       | Strict TypeScript setup                 |

---

## 📜 Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build production bundle          |
| `npm run preview` | Preview production build locally |

---

## 👤 Author

**Serhii Briushyn** — Full Stack Developer  
📍 Slovakia  
💼 Internal tool built for **NMH s.r.o.**
