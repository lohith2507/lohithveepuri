# Lohith Veepuri — Portfolio

Personal portfolio with **Lohith's Copilot** (Groq LLM).

**Live site:** https://lohithveepuri.vercel.app

## Local development

```bash
cp .env.example .env.local   # add GROQ_API_KEY
npm run dev
```

Open http://localhost:3000

## Deploy with GitHub + Vercel

### 1. Log in to GitHub (one time)

```powershell
gh auth login
```

Choose: GitHub.com → HTTPS → Yes (authenticate Git) → Login with browser.

### 2. Create repo and push

From this folder:

```powershell
cd c:\Users\lohit\OneDrive\Desktop\portifolio
gh repo create lohithveepuri --public --source=. --remote=origin --push
```

If the repo name is taken, pick another name and update the remote:

```powershell
git remote set-url origin https://github.com/lohith2507/YOUR-REPO-NAME.git
git push -u origin main
```

### 3. Connect Vercel to GitHub

**Option A — Dashboard**

1. https://vercel.com/lohithdattavarmaveepuri-2248s-projects/lohithveepuri/settings/git
2. **Connect Git Repository** → select `lohith2507/lohithveepuri`
3. Production branch: `main`

**Option B — CLI**

```powershell
npx vercel git connect https://github.com/lohith2507/lohithveepuri.git
```

### 4. Environment variable (required for Copilot)

Vercel → **lohithveepuri** → **Settings** → **Environment Variables**

| Name | Value |
|------|--------|
| `GROQ_API_KEY` | Your Groq API key from [console.groq.com](https://console.groq.com/keys) |

Apply to **Production**, **Preview**, and **Development**. Redeploy after adding.

---

**Never commit** `.env.local` — it is in `.gitignore`.

After Git is connected, every `git push` to `main` deploys automatically.
