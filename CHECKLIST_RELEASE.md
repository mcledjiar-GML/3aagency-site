# CHECKLIST RELEASE — Non-régression (3A Agency)

## A) i18n / Routing
- [ ] `/` redirige vers `/en` (ou `/fr` / `/de` selon cookie)
- [ ] `/en` `/fr` `/de` = HTTP 200
- [ ] `curl -H "Cookie: NEXT_LOCALE=de" /` => 307 vers `/de`

## B) SSR / SEO
- [ ] `/de` contient `<!DOCTYPE html><html lang="de">` (SSR)
- [ ] canonical + hreflang présents en SSR (déjà validé)
- [ ] `robots.txt` et `sitemap.xml` OK

## C) CSP / Headers
- [ ] Header `content-security-policy` présent
- [ ] `script-src` contient `nonce-...`
- [ ] Endpoint CSP report OK: `/api/csp-report` (logs Vercel)
- [ ] `frame-ancestors 'none'` (anti-clickjacking)

## D) Monitoring
- [ ] `/api/health` => 200 + JSON `{ok:true}`
- [ ] `/monitoring` => 200 OK
- [ ] Sentry reçoit un event de test en staging/preview

## E) Pages d’erreur
- [ ] 404: `/en/__notfound_test__` => 404 + page not-found custom
- [ ] 500: `/de/error-test` => 500 (dev) / error boundary (prod)

## F) Perf
- [ ] PSI / Lighthouse stable (référence: 100)
