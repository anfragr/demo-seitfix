#!/bin/bash
# ---------------------------------------------------------------------------
# Bilder für die Demo "Gauster Gastronomie" holen.
#
# Hintergrund: aus der Umgebung, in der die Demo gebaut wurde, sind die
# Bildserver von Wix und Jolioo nicht erreichbar. Dieses Skript lädt die
# Originalbilder von den Seiten der drei Betriebe herunter, benennt sie so,
# wie index.html sie erwartet, und wandelt sie nach WebP um, sofern cwebp
# oder ImageMagick auf dem Rechner liegt.
#
# Aufruf, einmal im Terminal, im Ordner dieser Datei:
#   bash bilder-holen.sh
#
# Fehlt cwebp und magick, bleiben die Originale in assets/img/original/
# liegen. Dann genügt eine kurze Nachricht, die Umwandlung geht auch hier.
# ---------------------------------------------------------------------------
set -u
cd "$(dirname "$0")" || exit 1
mkdir -p assets/img/original

hole () {
  ziel="$1"; url="$2"
  endung="${url##*.}"
  datei="assets/img/original/${ziel}.${endung}"
  if [ -f "$datei" ]; then
    echo "vorhanden: $datei"
    return
  fi
  echo "lade $ziel"
  curl -fsSL -A "Mozilla/5.0" -o "$datei" "$url" || echo "  fehlgeschlagen: $ziel"
}

# --- dreizehn by Gauster -----------------------------------------------------
hole hero            "https://static.wixstatic.com/media/089996_4b64b8a589cd43ac8ac9ca8c0751acfc~mv2.jpg"
hole haus-dreizehn   "https://static.wixstatic.com/media/089996_57e349ec198a4df8912d6171486ece44~mv2.jpg"
hole dreizehn-teller "https://static.wixstatic.com/media/089996_7ea20cc39a734bffb893eb0fa715a9ce~mv2.jpg"
hole dreizehn-raum   "https://static.wixstatic.com/media/089996_b44219ade72e4a6582e0b63607d5bf3b~mv2.jpg"

# --- Francis -----------------------------------------------------------------
hole haus-francis    "https://static.wixstatic.com/media/089996_5e89c5d410014823bbe47691a3f331d2~mv2.jpg"
hole francis-raum    "https://static.wixstatic.com/media/089996_1bd6a54794544704a60f861b779ba1aa~mv2.jpg"
hole francis-team    "https://static.wixstatic.com/media/089996_9ee8f2b4ae1c42ffa9019369fd99e9c3~mv2.jpg"

# --- Gutscheinmotive aus dem bestehenden Shop --------------------------------
hole gutschein-kreuzwirt "https://public.jolioo.com/generated/h1000w1000m1/static/files/9e0/1b9/66d/8cb/3eb/d88/a0a/366/a2104f966e6a3a5384ff9ec9cfbd1c6a220dd991.jpg"
hole gutschein-francis   "https://public.jolioo.com/generated/h1000w1000m1/static/files/7e3/bb9/4b8/63b/25b/4cd/73c/de0/87973b5917ad30cf50be5feffd8f793a7e53aeb3.jpg"
hole gutschein-dreizehn  "https://public.jolioo.com/generated/h1000w1000m1/static/files/2d5/b20/2bc/342/5fc/733/57e/cef/223294674da75d0468437940f17cbf37d7b47f85.jpg"

# Vom Kreuzwirt am Rosenberg liefert die Wix-Seite keine Bildadressen aus,
# die Fotos werden dort erst im Browser nachgeladen. Ein Foto des Hauses
# gehört von Hand nach assets/img/haus-kreuzwirt.webp.

echo
echo "Umwandlung nach WebP"
umgewandelt=0
for quelle in assets/img/original/*; do
  [ -e "$quelle" ] || continue
  name="$(basename "${quelle%.*}")"
  ziel="assets/img/${name}.webp"
  [ -f "$ziel" ] && continue
  if command -v cwebp >/dev/null 2>&1; then
    cwebp -quiet -q 80 -resize 1600 0 "$quelle" -o "$ziel" && umgewandelt=$((umgewandelt+1))
  elif command -v magick >/dev/null 2>&1; then
    magick "$quelle" -resize 1600x -quality 80 "$ziel" && umgewandelt=$((umgewandelt+1))
  fi
done

if [ "$umgewandelt" -gt 0 ]; then
  echo "$umgewandelt Bilder liegen jetzt in assets/img/ als WebP."
else
  echo "Kein cwebp und kein magick gefunden."
  echo "Die Originale liegen in assets/img/original/ und können von dort umgewandelt werden."
fi
