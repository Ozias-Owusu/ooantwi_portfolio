# Project screenshot capture guide

Use these steps when you want to replace the generated placeholder visuals with real product screenshots.

## Recommended capture workflow
1. Run the real project locally or open the deployed build.
2. Capture at least these views:
   - Home/dashboard
   - Primary workflow screen
   - Analytics, map, or details screen
3. Prefer desktop screenshots at 1440px width and mobile screenshots around 430px width.
4. Save optimized images as WebP when possible.
5. Replace the generated SVG placeholder at:
   - public/projects/{slug}-cover.svg
6. For case-study galleries, you can extend the data model to include dedicated screenshots.

## ChurchOS (Flutter mobile)
1. Clone `church_os_mobile_app` on the `test` branch.
2. `flutter build web` in that repo.
3. From the portfolio repo: `npm run capture:churchos`
4. Screenshots land in `public/projects/churchos/`.

The web build supports `?capture=<scene>` query params for reliable screenshots (e.g. `member-home`, `admin-attendance`). Demo logins: `member@churchos.demo` / `admin@churchos.demo` with password `password123`.

## VMS Host (Flutter mobile · employer)
1. Use `vms_host_app` on the `test` branch (no OIDC gate).
2. `flutter build web` in that repo (capture mode uses illustrative portfolio data).
3. From the portfolio repo: `npm run capture:vms-host`
4. Screenshots land in `public/projects/vms-host-app/`.

Capture scenes: `onboarding`, `home`, `pending`, `today`, `past`, `notifications`, `profile`, `security`.

## Lend Ledger (Flutter + ASP.NET Core)
1. Use `lend_ledger` on the `test` branch.
2. `flutter build web` in that repo (capture mode uses illustrative portfolio mock data — no SQL Server required).
3. From the portfolio repo: `npm run capture:lend-ledger`
4. Screenshots land in `public/projects/lend-ledger/`.

Companion backend: `github.com/Ozias-Owusu/lendledgerBackend` (ASP.NET Core 8, SQL Server, JWT).

Capture scenes: `landing`, `login`, `dashboard`, `customers`, `ledger`, `insights`, `notifications`, `settings`.

## Frankates Driver (Flutter mobile)
1. Use `frankatesdeliverymobile` on the `master` branch.
2. `flutter build web` in that repo (capture mode uses illustrative portfolio mock data).
3. From the portfolio repo: `npm run capture:frankates-driver`
4. Screenshots land in `public/projects/frankates-driver/`.

Capture scenes: `splash`, `login`, `home-offline`, `home-online`, `job-assigned`, `job-navigation`, `job-in-transit`, `forgot-password`.

## WhatsApp Clone (Flutter mobile)
1. Use `whatsapp` on the `master` branch.
2. `flutter build web` in that repo (Hive seeds demo chats locally).
3. From the portfolio repo: `npm run capture:whatsapp-clone`
4. Screenshots land in `public/projects/whatsapp-clone/`.

Capture scenes: `chats`, `chat-detail`, `chat-voice`, `updates`, `calls`, `communities`, `contact-info`, `settings`.

## Per featured project suggestions
- Frankates Marketplace: customer storefront, vendor dashboard, delivery tracking map
- TimeTrakker Logistics: driver dashboard, biometric enrollment, trip tracking
- CRM Consumer: virtual card, QR services, taxpayer dashboard
- ChurchOS: attendance, giving, events, member home

## Quick optimization tips
- Compress images before commit
- Keep large hero assets under ~300KB when possible
- Use descriptive alt text for every screenshot
