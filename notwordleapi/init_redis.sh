#!/bin/ash
set -e

until redis-cli -h redis -p 6379 ping; do
  sleep 1
done

exec 3>&1 4>&2
exec > /dev/null 2>&1
cat /app/data/words.txt | while read word; do redis-cli -h redis -p 6379 SADD wordlist "$word"; done
cat /app/data/dict.txt | while read word; do redis-cli -h redis -p 6379 SADD dict "$word"; done
exec >&3 2>&4
echo "redis init completed"