#! /bin/bash
DEST_DIR=../exformalrecords.art-public

function build() {
  hugo --cleanDestinationDir --verbose --logLevel info --destination "$DEST_DIR"
}

function publish() {
  cd "$DEST_DIR" || exit
  git add --all
  git commit -m "autocommit $(date)"
  git pull
  git push
}


function serve() {
  hugo server --verbose --logLevel info --buildDrafts
}

# Resolve commands
case $1 in
  build)
    build
    ;;
  publish)
    publish
    ;;
  serve)
    serve
    ;;
  *)
    echo "Usage: $0 {build|publish|serve}"
    exit 1
    ;;
esac
