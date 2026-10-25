# Mile Xue Portfolio

A buildless, responsive personal portfolio based on Mile Xue's current resume and project materials. The visual direction uses an original pirate-adventure and nautical-map motif without relying on copyrighted character art or logos.

## Preview locally

From this directory, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish at `username.github.io`

1. Create a public GitHub repository named exactly `username.github.io`, replacing `username` with the GitHub username.
2. Copy the contents of this folder—not the enclosing folder—into the repository root.
3. Commit and push to the `main` branch.
4. Open **Settings → Pages** in GitHub.
5. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
6. GitHub will publish the site at `https://username.github.io/`.

No build step, package installation, or framework is required.

## Customize before publishing

- Replace `monkeydmile@gmail.com` in `index.html` if a different public contact address is preferred.
- Review the project summaries and metrics for public-disclosure comfort.
- Keep the seed-stage deal review anonymized unless written permission allows public attribution.

## Files

- `index.html` — content and structure
- `styles.css` — theme, layout, and responsive design
- `script.js` — navigation, reveal effects, and project filters
- `assets/favicon.svg` — original compass favicon
