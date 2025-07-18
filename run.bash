#!/usr/bin/env bash
docker rm -f bitburner-filesync
docker build -t bitburner .
docker run --rm -d -v "${PWD}/src/:/app/src/" -v "${PWD}/NetscriptDefinitions.d.ts:/app/NetscriptDefinitions.d.ts" -p 12525:12525 --name bitburner-filesync bitburner
