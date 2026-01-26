# RUNBOOK — 3A Agency (Next.js + Vercel)

## 1) Vérif rapide (1 minute)

### Healthcheck
- URL: /api/health
- Attendu: HTTP 200 + JSON `{"ok":true,...}`
- Si redirect => bug middleware (ne doit pas toucher /api)

### Pages clés
- / (redirige vers /en, /fr ou /de selon cookie/Accept-Language)
- /en, /fr, /de (200)
- Une 404 (ex: /en/__notfound_test__) => 404 + page not-found custom

## 2) Si le site est down

1. Vérifier l’uptime monitor (HTTP, latence)
2. Vercel → Deployments: dernier déploiement / rollback si besoin
3. Vercel → Runtime Logs: erreurs 5xx, routes qui cassent
4. Sentry → Issues: spike d’erreurs, route, release

## 3) Si Sentry ne reçoit rien

1. Vérifier que `/monitoring` répond:
   - GET /monitoring => 200 OK
2. Vérifier DSN:
   - NEXT_PUBLIC_SENTRY_DSN et SENTRY_DSN présents en env (local + Vercel)
3. Vérifier middleware:
   - `/monitoring` doit être exclu du middleware i18n

## 4) Si CSP casse un script

1. Regarder les reports CSP (endpoint /api/csp-report)
2. Vérifier que les scripts Next ont bien un nonce (`x-nonce` / `script nonce=...`)
3. Si ajout d’un script externe:
   - éviter inline
   - whitelister le domaine dans `connect-src` ou autre directive si nécessaire

## 5) Non-régression rapide (avant deploy)

- curl /api/health => 200
- curl / (avec cookie NEXT_LOCALE=de) => 307 vers /de
- curl /de => `html lang="de"` en SSR
- curl /de/__notfound_test__ => 404 + page not-found custom
- curl /monitoring => 200 OK
