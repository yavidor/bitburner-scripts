#!/usr/bin/env bash
docker rm -f bitburner-server
docker build -t bitburner .
docker run --rm -d -v "${PWD}/src/:/app/src/" -v "${PWD}/NetscriptDefinitions.d.ts:/app/NetscriptDefinitions.d.ts" -p 12525:12525 --name bitburner-server bitburner
