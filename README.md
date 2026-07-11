A Website

Safe contact form setup (no secret leaks)

- The frontend form in Scripts/email.html sends messages to /api/contact.
- If the API route is unavailable, the page falls back to the plain recipient address aybarhate12@gmail.com.
- Do not place SMTP passwords, API keys, or private tokens in any HTML/CSS/JS file.
- Keep secrets in host environment variables and send mail only from server-side code.

Recommended flow

1. Frontend collects name, email, subject, and message.
2. Frontend sends JSON to a same-origin API route (/api/contact).
3. Server validates input and sends email using environment secrets.
4. API returns a generic success/error response.

Included example

- api/contact.js is a secure server-side example route (Vercel-style function).
- It uses these environment variables:
	- RESEND_API_KEY
	- CONTACT_TO_EMAIL
	- CONTACT_FROM_EMAIL
- The API key is never sent to the browser.

Security notes

- Add server-side rate limiting and spam protection.
- Validate and sanitize all fields server-side (never trust client validation alone).
- Return generic errors so implementation details are not exposed.
