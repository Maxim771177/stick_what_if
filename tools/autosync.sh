#!/bin/bash
# Автосинхронизация с GitHub. Вызывается хуками Claude Code (.claude/settings.json).
#   autosync.sh push   : в конце ответа закоммитить всё изменённое и запушить
#   autosync.sh pull   : в начале сессии подтянуть свежее из GitHub
# Никогда не падает с ошибкой (exit 0), чтобы не мешать работе. Видео и звук в .gitignore.
cd "$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
GH=/opt/homebrew/bin/gh
[ -x "$GH" ] || GH=$(command -v gh)
git_net() { git -c credential.helper= -c credential.helper="!$GH auth git-credential" "$@"; }
BR=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

case "$1" in
pull)
  git_net fetch -q origin 2>/dev/null || { echo "autosync: нет связи с GitHub, fetch не удался"; exit 0; }
  if git rev-parse -q --verify "origin/$BR" >/dev/null; then
    git merge -q --ff-only "origin/$BR" 2>/dev/null || echo "autosync: ветка $BR разошлась с GitHub, нужен ручной разбор"
  fi
  AHEAD=$(git rev-list --count "HEAD..origin/main" 2>/dev/null)
  [ "${AHEAD:-0}" -gt 0 ] && echo "autosync: в main есть $AHEAD новых коммитов, которых нет в этой ветке (git merge origin/main)"
  ;;
push)
  if [ -n "$(git status --porcelain)" ]; then
    git add -A
    git commit -q -m "Автосохранение: $(date '+%d.%m.%Y %H:%M')

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>" 2>/dev/null
  fi
  if [ -n "$(git log '@{u}..HEAD' 2>/dev/null)" ] || ! git rev-parse -q --verify "origin/$BR" >/dev/null; then
    git_net push -q -u origin HEAD 2>&1 | tail -2 || echo "autosync: пуш не удался"
  fi
  ;;
esac
exit 0
