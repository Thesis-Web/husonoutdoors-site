# Huson Outdoors — Website

Static landing page for Huson Outdoors (Lake Livingston, TX).

## Tech
- Vite + React + TypeScript
- Served as static assets by nginx

## Local dev
npm install
npm run dev

## Build
npm run build
npm run preview

## Deployment (on droplet)

Build output is deployed to the nginx docroot:

npm ci
npm run build
sudo rm -rf /var/www/husonoutdoors.com/html/*
sudo cp -r dist/* /var/www/husonoutdoors.com/html/
sudo chown -R www-data:www-data /var/www/husonoutdoors.com/html
sudo systemctl reload nginx

Contact

Phone: 936-239-1100

Email: LakeAreaLLC@gmail.com
