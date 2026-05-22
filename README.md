# Lohith Veepuri — Portfolio

Personal portfolio site with **Lohith's Copilot** (NVIDIA Kimi API).

## Local development

```bash
cp .env.example .env.local   # add NVIDIA_API_KEY
npm run dev
```

Open http://localhost:3000

## Deploy (Vercel)

- Production: https://lohithveepuri.vercel.app
- Set `NVIDIA_API_KEY` in Vercel → Project → Environment Variables (never commit `.env.local`).

Push to `main` on GitHub to trigger automatic Vercel deploys when the repo is connected.
