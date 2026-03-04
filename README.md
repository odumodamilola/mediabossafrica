<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1lumlegRL99Op69b9lObaWvQd5OZnoufg

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
# mediabossafrica

## Security and Privacy Operations

### Form Data Retention
- Consultation, contact, and talent submissions are delivered to `info@mediabossafrica.com`.
- Submission emails should be retained for **90 days** and then deleted during monthly cleanup.
- Access is restricted to authorized operations staff only.

### Deletion Cadence
- Run mailbox cleanup at least once per month.
- Remove messages older than 90 days unless a legal or contractual requirement applies.

### Security Controls (Serverless)
- Distributed rate limiting and dedup require:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`
- Email delivery requires:
  - `RESEND_API_KEY`
- Optional anti-bot challenge (disabled unless configured):
  - `TURNSTILE_SECRET_KEY`

Production form endpoints fail closed (`503`) when distributed anti-abuse dependencies are unavailable.
