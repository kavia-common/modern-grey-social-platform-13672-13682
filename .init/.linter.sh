#!/bin/bash
cd /home/kavia/workspace/code-generation/modern-grey-social-platform-13672-13682/twitter_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

