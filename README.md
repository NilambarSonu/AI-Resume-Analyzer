# 🤖 AI Resume Analyzer

An advanced, AI-powered technical recruitment tool designed to bridge the gap between job descriptions and potential candidates. Leveraging state-of-the-art Large Language Models (LLMs), it provides high-precision resume screening and actionable feedback.

---

## 🎯 Project Overview & Problem Solved

Traditional recruitment often fails at scale. Recruiter bias, missed keywords, and the sheer volume of applications make it difficult to find the perfect candidate. 

**AI Resume Analyzer** solves this by:
- **Automating Screening**: Instant PDF parsing and analysis.
- **High Accuracy Matching**: Using **Llama 3.3 70B (via Groq)** to understand context beyond just keywords.
- **Objective Scoring**: Generating data-driven match scores (0-100) based on actual project experience and skill depth.
- **Actionable Gap Analysis**: Identifying precisely what skills are missing and providing a step-by-step "Action Plan" for candidates to improve.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) (for smooth animations)
- **Visualization**: [Recharts](https://recharts.org/) (Spider charts for skill comparison)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.org/)
- **AI Engine**: [Groq SDK](https://groq.com/) using the **Llama-3.3-70b-versatile** model.
- **Parsing**: [pdf-parse](https://www.npmjs.com/package/pdf-parse) for high-fidelity text extraction.
- **Validation**: [Zod](https://zod.dev/) for strict schema enforcement.
- **File Handling**: [Multer](https://github.com/expressjs/multer) for secure memory-buffer uploads.

### Database (Pre-configured)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: PostgreSQL (via `pg`)

---

## 🚀 Key Features

- ✅ **Instant PDF Analysis**: Upload your resume in PDF format and get results in seconds.
- ✅ **Dynamic Skill Comparison**: Visualizes your skills vs. job requirements using interactive Radar Charts.
- ✅ **Intelligent Feedback**: Not just a "yes/no"—it tells you *what* to learn next.
- ✅ **Zero Delays**: Powered by Groq’s LPU (Language Processing Unit) for near-instant inference.
- ✅ **Mobile Responsive**: Clean, premium UI that works on desktops and mobile devices.

---

## ⚙️ How It Works

1. **Upload**: User submits a PDF resume and a target job description.
2. **Parsing**: The backend extracts raw text using `pdf-parse`.
3. **AI Inference**: The text is sent to the **Llama 3.3 70B** model with a specialized recruitment prompt.
4. **Structured Output**: AI returns a precise JSON object containing:
    - Match Score
    - Detected Skills
    - Missing Keywords
    - Performance Radar Data
    - Step-by-step Action Plan
5. **Visualization**: The frontend renders these insights using interactive components and charts.

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- A Groq API Key (Get one at [console.groq.com](https://console.groq.com/))

### Steps

1. **Clone the Repo**
   ```bash
   git clone https://github.com/NilambarSonu/AI-Resume-Analyzer.git
   cd AI-Resume-Analyzer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   GROQ_API_KEY=your_api_key_here
   DATABASE_URL=your_postgres_url_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## 📄 License

This project is licensed under the MIT License - see the `package.json` file for details.

---
*Created with ❤️ by [Sonu Nilambar](https://github.com/NilambarSonu)*
