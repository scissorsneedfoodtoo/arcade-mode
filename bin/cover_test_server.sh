#! /bin/bash

node_modules/.bin/babel-node node_modules/.bin/babel-istanbul cover node_modules/.bin/_mocha -- --recursive test/server
istanbul report --root coverage html --dir coverage_html_server
