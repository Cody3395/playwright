#!/bin/bash

# 自動安裝 Playwright Browsers
# 用於 CI/CD 環境，確保所有必要的瀏覽器都已安裝

set -e

echo "Installing Playwright browsers..."
npx playwright install

echo "Installing Playwright system dependencies..."
npx playwright install-deps

echo "✓ Playwright browsers and dependencies installed successfully!"
