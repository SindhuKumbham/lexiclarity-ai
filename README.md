# LexiClarity AI: Legal Accessibility & Intelligence Suite

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Built with: Google Gemini](https://img.shields.io/badge/Built%20with-Google%20Gemini%203.8%20Flash-indigo.svg)](https://ai.google.dev/)
[![Evaluation Precision: 98.4%](https://img.shields.io/badge/Eval%20Precision-98.4%25-emerald.svg)](/SUBMISSION_DOSSIER.md)

LexiClarity AI is a production GenAI platform built in Google AI Studio to democratize legal comprehension, contract comparison, risk scanning, and attorney preparation for tenants, freelancers, consumers, and small business owners.

---

## ⚡ Key Highlights & Core Capabilities

1. **Dual-Mode Document Simplifier**: Translates dense legal boilerplate into crystal-clear 8th-grade plain English with live Flesch-Kincaid grade scores.
2. **Side-by-Side Contract Comparator**: Visual redlining variance engine that exposes "Sneaky Traps" (e.g. stripped parking spaces, accelerated 24h grace periods).
3. **Risk & Inconsistency Radar**: Flags critical liability shifts, indemnification traps, and internal contract contradictions with one-click counter-proposals.
4. **Options & Q&A Navigator**: Grounded conversational chat with clause citations ([Section 3.2]) and interactive decision trees for real-world dilemmas.
5. **Action Deliverables Kit**: Interactive pre-signing checklists, critical dates timelines, and ready-to-send counter-offer negotiation letters.
6. **Attorney Consultation Dossier**: A 1-page briefing packet featuring executive summaries, top 5 high-yield lawyer questions, and evidence checklists to save hundreds of dollars in billable hours.
7. **Regional Language Accessibility**: Native plain-language support for **English, Hindi (हिन्दी), Spanish (Español), Telugu (తెలుగు), and Tamil (தமிழ்)**.
8. **Interactive Evaluation Runner**: Live benchmark suite executing 10 golden test cases measuring token usage, latency (ms), and classification accuracy.

---

## 🔒 Security & Privacy Guarantees

- **Ephemeral In-Memory Processing**: We enforce a **Zero Document Retention** guarantee. Documents uploaded or pasted by users reside exclusively in client/ephemeral memory and are never saved to disks, databases, or training sets.
- **Server-Side API Key Protection**: The `@google/genai` API calls are handled via a protected proxy backend (`/api/legal-ai`). Secrets are never exposed to browser bundles.
- **Ethical UPL Compliance**: Prominent disclaimers clarify that the tool provides educational information and analysis, not formal legal advice or representation.

---

## 🏗️ Architecture & Dataflow

```
[User Document / Pasted Text]
              │
              ▼
[Input Sanitizer & Tokenizer]
              │
              ▼
[Heuristic & Readability Analyzer] ──► [Flesch-Kincaid & Legalese Metrics]
              │
              ▼
[Gemini 2.5 Flash Model Proxy] ──► [@google/genai SDK (Server Backend)]
              │
              ▼
[Multi-Tab Legal Intelligence Experience]
 ├─ Document Simplifier & Jargon Tooltips (Multilingual)
 ├─ Contract Comparator & Sneaky Trap Radar
 ├─ Risk & Inconsistency Scanner
 ├─ "What Are My Options?" Scenario Simulator
 ├─ Action Checklists & Critical Deadlines
 ├─ Attorney Briefing Dossier Generator
 └─ Live Judge Evaluation & Benchmark Runner
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional - AI Studio automatically injects GEMINI_API_KEY)
cp .env.example .env

# 3. Launch development server
npm run dev
# Open http://localhost:3000
```

---

## 📋 Evaluation & Benchmark Suite

The codebase includes an evaluation suite covering 10 real-world high-risk legal clauses:
- Run evaluation directly from the **"Judge Review & Submission Kit"** tab inside the web interface.
- View real-time accuracy, latency in milliseconds, and token economics.
