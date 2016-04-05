#!/bin/bash

git add --all
git commit -a -m $1
git push heroku $2
git push heroku $2

