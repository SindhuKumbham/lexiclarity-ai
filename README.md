# \# LexiClarity AI: Legal Accessibility \& Intelligence Suite

# 

# !\[License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)

# !\[Built with: Google Gemini](https://img.shields.io/badge/Built%20with-Google%20Gemini%202.5%20Flash-indigo.svg)

# 

# LexiClarity AI is a GenAI-powered prototype that helps tenants, freelancers, consumers, and small business owners understand, compare, and navigate legal documents without requiring a legal background.

# 

# \---

# 

# \## Key Highlights \& Core Capabilities

# 

# \- \*\*Dual-Mode Document Simplifier\*\*: Translates dense legal boilerplate into plain English with readability scoring.

# \- \*\*Side-by-Side Contract Comparator\*\*: Visual variance engine that highlights added, modified, and removed clauses between two document versions.

# \- \*\*Risk \& Inconsistency Radar\*\*: Flags liability shifts, indemnification traps, and internal contract contradictions.

# \- \*\*Options \& Q\&A Navigator\*\*: Document-grounded conversational Q\&A with clause citations, plus scenario-based option guidance.

# \- \*\*Action Deliverables Kit\*\*: Pre-signing checklists, critical dates tracking, and counter-offer drafting support.

# \- \*\*Attorney Consultation Dossier\*\*: A briefing packet summarizing key risks and suggested questions to bring to a lawyer.

# \- \*\*Regional Language Accessibility\*\*: Plain-language support for English, Hindi, Spanish, Telugu, and Tamil.

# 

# \---

# 

# \## Security \& Privacy

# 

# \- \*\*No persistent document storage\*\*: Uploaded or pasted documents are processed in-memory for the session and are not written to a database.

# \- \*\*Server-side API key handling\*\*: Gemini API calls are proxied through a server route; the API key is never exposed in client-side code.

# \- \*\*Ethical disclaimer\*\*: The app clearly states it provides educational information, not formal legal advice, and does not create an attorney-client relationship.

# 

# \---

# 

# \## Architecture

# 

# Input (User Document or Pasted Text) leads to Input Handling and Parsing, which leads to Gemini 2.5 Flash via the google/genai SDK, called through a server-side proxy at /api/legal-ai. The result feeds the multi-tab interface: Document Simplifier with multilingual jargon tooltips, Contract Comparator, Risk and Inconsistency Scanner, Options and Q\&A Navigator, Action Checklists and Deadlines, and the Attorney Briefing Dossier Generator.

# 

# If the Gemini API key is not configured or a request fails, the app falls back to a deterministic heuristic response so the interface remains functional.

# 

# \---

# 

# \## Getting Started

# 

# Run these commands in order:

# 1\. npm install --legacy-peer-deps

# 2\. cp .env.example .env (then add your own GEMINI\_API\_KEY to .env)

# 3\. npm run dev

# 

# \---

# 

# \## Disclaimer

# 

# This tool provides informational and educational assistance only. It does not constitute formal legal advice, does not create an attorney-client relationship, and should not be relied on as a substitute for consulting a licensed attorney.

