#!/usr/bin/env sh

set -e
npm run build:gh_pages
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:proVject/mediumclone_vue.git master:gh-pages
cd -