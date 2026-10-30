#!/usr/bin/env bash
# Faza 0: skini videe, izvuci kadrove, napravi kontakt-listove i OCR.
#
#   scripts/videi.sh <youtube-id> [<youtube-id> ...]
#
# Sve ide u istrazivanje/videi/<id>/ (gitignored, tuđi sadržaj):
#   video.mp4, video.info.json  yt-dlp
#   k2/tNNN.jpg                 kadar svake 2 s (kadar N je na (N-1)*2 s)
#   kontakt.jpg                 svi kadrovi u mreži 6 stupaca, istim redom
#   ocr.txt                     Apple Vision OCR po kadru
#   ocr-novo.txt                samo novi retci po kadru, s vremenom
#   zvuk.txt                    glasnoća i broj tišina (govor ili glazba?)
#
# Rezanje na promjeni scene (gt(scene,0.3)) za ove animirane snimke ekrana
# daje 1–5 kadrova, zato je osnova kadar svake 2 s. Homebrew ffmpeg nema
# drawtext, pa kontakt-list nema oznake vremena.
set -euo pipefail

korijen=$(cd "$(dirname "$0")/.." && pwd)
for id in "$@"; do
  d="$korijen/istrazivanje/videi/$id"
  mkdir -p "$d/k2"
  [ -f "$d/video.mp4" ] || yt-dlp -q --no-warnings \
    -f "bv*[height<=1080][ext=mp4]+ba[ext=m4a]/b[ext=mp4]/b" --merge-output-format mp4 \
    --write-info-json -o "$d/video.%(ext)s" -- "https://www.youtube.com/watch?v=$id"

  rm -f "$d"/k2/t*.jpg
  ffmpeg -nostdin -loglevel error -i "$d/video.mp4" -vf "fps=1/2" -q:v 3 "$d/k2/t%03d.jpg"
  n=$(ls "$d"/k2/t*.jpg | wc -l | tr -d ' ')
  ffmpeg -nostdin -loglevel error -y -framerate 1 -i "$d/k2/t%03d.jpg" \
    -vf "scale=400:-2,tile=6x$(( (n + 5) / 6 )):padding=4:color=white" \
    -frames:v 1 -q:v 4 "$d/kontakt.jpg"

  {
    ffmpeg -nostdin -i "$d/video.mp4" -af volumedetect -vn -f null - 2>&1 | grep -E "mean_volume|max_volume"
    echo "tišine (-35 dB, 0.5 s): $(ffmpeg -nostdin -i "$d/video.mp4" -af silencedetect=n=-35dB:d=0.5 -vn -f null - 2>&1 | grep -c silence_start || true)"
  } > "$d/zvuk.txt"

  swift "$korijen/scripts/ocr.swift" "$d"/k2/t*.jpg > "$d/ocr.txt"
  awk '/^== /{match($0,/t[0-9]+/); t=(substr($0,RSTART+1,RLENGTH-1)-1)*2; h=1; next}
       !($0 in vidjeno){vidjeno[$0]=1; if(h){printf "\n[%ds] ", t; h=0} printf "%s | ", $0}
       END{print ""}' "$d/ocr.txt" > "$d/ocr-novo.txt"
  echo "$id: $n kadrova"
done
