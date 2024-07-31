DEST_DIR := "../exformalrecords.art-public"

add_release:
  ./themes/exformal/scripts/commands.sh add_release

add_artist:
  ./themes/exformal/scripts/commands.sh add_artist

add_text:
  ./themes/exformal/scripts/commands.sh add_text

remove_macos_files:
  find . -name '.DS_Store' -type f -delete

build: remove_macos_files
    hugo --minify=true --cleanDestinationDir --verbose --logLevel info --destination "{{DEST_DIR}}"

publish: build
    cd "{{DEST_DIR}}" && git add --all && git commit -m "autocommit $(date)" && git pull && git push

serve:
    hugo server --minify=true --cleanDestinationDir --verbose --logLevel info --gc --buildDrafts
