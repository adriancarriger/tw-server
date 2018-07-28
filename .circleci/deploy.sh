#!/bin/sh

set -e

apk add --update nodejs
npm install -g heroku

cat > ~/.netrc << EOF
machine api.heroku.com
  login $HEROKU_LOGIN
  password $HEROKU_TOKEN
machine git.heroku.com
  login $HEROKU_LOGIN
  password $HEROKU_TOKEN
EOF

heroku container:login
docker tag $IMAGE_ID registry.heroku.com/$HEROKU_TARGET/web
docker push registry.heroku.com/$HEROKU_TARGET/web
heroku config:set -a $HEROKU_TARGET \
  PRISMA_DATA_ENDPOINT=$PRISMA_DATA_ENDPOINT \
  PRISMA_SECRET=$PRISMA_SECRET
heroku container:release web -a $HEROKU_TARGET
