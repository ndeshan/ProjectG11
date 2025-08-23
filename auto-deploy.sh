#!/bin/bash
# Auto-deploy when files change

echo "Watching for file changes..."
while inotifywait -r -e modify,create,delete /home/nipuna/ProjectG1; do
    echo "Files changed, deploying..."
    npx vercel --prod
    echo "Deployed!"
done