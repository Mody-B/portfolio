#!/usr/bin/env bash
# Push Lumen portfolio to github.com/<USER>/portfolio
# Usage: YOUR_GITHUB_USERNAME=youruser ./scripts/push-to-github.sh
set -euo pipefail

USER="${YOUR_GITHUB_USERNAME:-}"
if [[ -z "$USER" || "$USER" == "TBD" || "$USER" == "<YOUR_GITHUB_USERNAME>" ]]; then
  echo "Set YOUR_GITHUB_USERNAME to your real github.com username." >&2
  exit 1
fi

REPO_URL="https://github.com/${USER}/portfolio.git"
BRANCH="${BRANCH:-cursor/mohamad-bitar-portfolio-b1f0}"

cd "$(dirname "$0")/.."

if [[ ! -d .git ]]; then
  echo "Not inside a git repo (no .git). In WSL: clone Origin, then cd into portfolio before running this." >&2
  echo "See docs/github-com-setup.md" >&2
  exit 1
fi

if git remote get-url github >/dev/null 2>&1; then
  git remote set-url github "$REPO_URL"
else
  git remote add github "$REPO_URL"
fi

echo "Pushing ${BRANCH} → ${REPO_URL}"
git push -u github "$BRANCH"

echo "Updating main on github.com from ${BRANCH}"
git push github "${BRANCH}:main"

echo "Done. Open https://github.com/${USER}/portfolio"
echo "Then: Settings → Pages → Source: GitHub Actions → Custom domain: mohamadbit.me"
