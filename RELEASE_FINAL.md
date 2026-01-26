# RELEASE_FINAL — 3aagency.eu (Next.js / Vercel)

Ce document est la checklist finale “production-grade” pour éviter de casser :
- i18n SSR (1 seul `<html>` + `lang` correct)
- SEO (canonical + hreflang + x-default)
- CSP nonce-based + headers sécurité
- Sentry + tunnel `/monitoring`

---

## 0) Pré-requis

- Branche : `main`
- CI GitHub Actions verte (workflow `CI`)
- Vercel relié au repo et déploie sur `main`
- Domaine prod : https://www.3aagency.eu

---

## 1) Avant release (local)

### 1.1 Build + QA gate (obligatoire)

```bash
npm install
npm run build
node scripts/qa-prod.mjs
