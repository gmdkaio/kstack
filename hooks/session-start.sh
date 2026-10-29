#!/usr/bin/env bash
# prints the routing context at session start. KSTACK_HOOK=off in the env block of a settings file turns it off
[ "$KSTACK_HOOK" = off ] && exit 0
cat "$(dirname "$0")/context.md"
