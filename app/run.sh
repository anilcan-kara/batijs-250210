#!/bin/sh
# run.sh - Load environment variables from .env and start the app

# Check if the .env file exists in /app
if [ ! -f /app/.env ]; then
  echo ".env file not found. Exiting."
  exit 1
fi

# Automatically export all variables defined in .env.
set -a
. /app/.env
set +a

echo "Environment variables loaded from .env."
echo "AUTH_TRUST_HOST is: $AUTH_TRUST_HOST"

# Start the application.
# 'exec' replaces the shell with the process, so signals are forwarded properly.
exec /app/myapp