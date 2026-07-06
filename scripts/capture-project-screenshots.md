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

## Per featured project suggestions
- Frankates Marketplace: customer storefront, vendor dashboard, delivery tracking map
- TimeTrakker Logistics: driver dashboard, biometric enrollment, trip tracking
- CRM Consumer: virtual card, QR services, taxpayer dashboard
- ChurchOS: attendance, giving, events, member home

## Quick optimization tips
- Compress images before commit
- Keep large hero assets under ~300KB when possible
- Use descriptive alt text for every screenshot
