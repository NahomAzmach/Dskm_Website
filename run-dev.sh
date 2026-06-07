#!/bin/sh
set -eu

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
export PATH="$PROJECT_DIR/.tools/node-v22.22.3-darwin-x64/bin:$PATH"

exec npm run dev -- --host 127.0.0.1
