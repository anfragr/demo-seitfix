# Gauster Gastronomie, Graz

Demoseite für den öffentlichen Link `demo.seitfix.at/gauster-gastronomie/`.
Recherche und Bau am 25. August 2026. Erste Demo für eine Gruppe statt für einen einzelnen Betrieb.

Quellen sind ausschließlich kreuzwirtamrosenberg.at, dreizehnbygauster.at, francis-bistro.at
und der bestehende Gutscheinshop auf shop.jolioo.com. Was dort nicht steht, steht im
Lückenprotokoll und nicht auf der Seite.

**Zwei Dateien.** `index.html` und `warenkorb.html`, dieselbe Aufteilung wie bei BUNA.
CSS und Skript sind in beiden Dateien identisch, der Korb liegt in `sessionStorage`.
Kein Build, kein Framework, kein fremder Server zur Laufzeit.

---

## 0. Die Aufgabe und der Verkaufsanlass

Drei Betriebe, drei getrennte Wix-Seiten, ein Gutscheinshop auf einer fremden Domain.
Wer bei dreizehn, Francis oder Kreuzwirt einen Gutschein kaufen will, landet auf
`shop.jolioo.com`. Genau im Moment des Kaufs verlässt der Gast die Marke.

Dazu kommt: für einen Gast ist nirgends erkennbar, dass die drei Häuser zusammengehören.
Nur Francis führt einen Menüpunkt "Partnerbetriebe". Die Gruppe hat drei Lokale in Graz,
zwei davon an derselben Adresse, und tritt trotzdem dreimal einzeln auf.

Die Demo dreht beides um: eine Dachseite, die alle drei Häuser zeigt, mit dem Gutscheinshop
darin statt daneben.

---

## 1. Designentscheidung

**Das Dach ist neutral, die Farbe gehört den Häusern.** Grundfläche ist warmes Papier
`#f6f4ef` und Weiß, Text `#1b1b19`, alle Flächen und Knöpfe in einem tiefen Schwarzgrün
`#16211d`. Die einzigen Buntfarben im System sind die drei Hausfarben, und die treten nur
als Punkt, Zeile und Bildfläche auf, nie als Hintergrund eines Abschnitts:

| Haus | Farbe | Kontrast auf Papier |
|---|---|---|
| Kreuzwirt am Rosenberg | `#2f6b4f` | 5,73:1 |
| dreizehn by Gauster | `#7a2b38` | 8,57:1 |
| Francis | `#a1571f` | 4,90:1 |

So bleiben die drei Betriebe unterscheidbar, ohne dass die Seite bunt wird. Das ist der
inhaltliche Grund für die dritte und vierte Farbe, sonst gilt weiter die Regel aus dem
Basisauftrag.

**Schrift.** Space Grotesk für Überschriften, IBM Plex Sans für Fließtext, je zwei Schnitte,
beide unter der SIL Open Font License, beide lokal in `assets/fonts/` als woff2.
Kein Aufruf an fonts.googleapis.com.
Space Grotesk hat auffällige Ziffern, und diese Seite besteht zu einem guten Teil aus
Zahlen: Beträge, Preise, Uhrzeiten, die Hausnummer 13. Deshalb diese Wahl.

**Abgrenzung.** Keine Serifenschrift, kein Reservierungsformular, keine Zeitleiste, keine
Wirtshausfarben. Gegenüber BUNA, der anderen Shop-Demo: dort Braun, Rostrot und Lato,
eine einzige Marke, hier ein neutrales Dach mit drei Marken darunter. Gegenüber dem
Murstüberl, das mit der Franziskanergasse fast Nachbar ist: dort warmes Rot und Vollkorn
auf einer sehr kurzen Seite, hier ein Shop.

---

## 2. Jede Angabe auf der Seite und ihre Quelle

### Gruppe

| Angabe | Quelle |
|---|---|
| Gauster Gastronomie GmbH, Franziskanerplatz 13, 8010 Graz | francis-bistro.at/impressum |
| FN 484469 f, Landesgericht für ZRS Graz, UID ATU72964704 | francis-bistro.at/impressum |
| Geschäftsführer Michael Gauster | francis-bistro.at/impressum |
| Kreuzwirt Betriebs GmbH, FN 525682, UID ATU75138307 | kreuzwirtamrosenberg.at/impressum |
| dreizehn gehört zur Gauster Gastronomie GmbH | Fußzeile dreizehnbygauster.at, "© 2021, Gauster Gastronomie GmbH" |

### Kreuzwirt am Rosenberg

| Angabe | Quelle |
|---|---|
| Saumgasse 39, 8010 Graz | Startseite |
| +43 316 67 64 58, essen@kreuzwirtamrosenberg.at | Startseite |
| Mi bis Sa 12 bis 22 Uhr, Küche bis 21 Uhr | Startseite und Impressum |
| So 12 bis 18 Uhr, Küche bis 17 Uhr | Startseite und Impressum |
| Montag und Dienstag Ruhetag | Startseite |
| Mittagsmenü 15 Euro, Mittwoch bis Freitag | Startseite |
| Gulasch mit Spätzle, Backhendl, Beef Tatar | Startseite, Bildunterschriften |
| Junior Suite ab 130 Euro, 34 m², zwei Personen | Startseite |
| Business Suite ab 150 Euro, 53 m², zwei Personen | Startseite |
| Family Suite ab 250 Euro, 70 m², vier Personen | Startseite |
| Longstay ab 40 Euro pro Nacht, bis sechs Monate | Startseite |
| Ortstaxe 2,50 Euro pro Person und Nacht ab 15 Jahren | Startseite |
| Zusätzlicher Gast 25 Euro pro Nacht | Startseite |

### dreizehn by Gauster

| Angabe | Quelle |
|---|---|
| Franziskanerplatz 13, 8010 Graz | Startseite |
| +43 316 83 85 67, info@dreizehnbygauster.at | Startseite |
| Montag bis Samstag ab 11:30 Uhr, Sonn- und Feiertage geschlossen | Startseite |
| Zitat "Wir leben die Werte Ästhetik, Genuss und Qualität" | Startseite |
| Regionalität, Nachhaltigkeit, Saisonalität | Startseite |
| Dreizehn Lunch 19 Euro, Mo bis Fr ab 11:30, Vorspeise, Hauptspeise, Espresso mit Dessert | Startseite |

### Francis

| Angabe | Quelle |
|---|---|
| Franziskanerplatz 13, 8010 Graz | Startseite und Impressum |
| +43 664 403 10 01 | Startseite |
| hallo@francis-bistro.at | Startseite und Impressum |
| Montag bis Samstag 11:30 bis 24 Uhr, Sonn- und Feiertage geschlossen | Startseite |
| Küchenchef Jan Felix Punzer | Startseite |
| Zitat "Hier trifft Steiermark auf die Welt" | Startseite |
| Instagram francis_bistro, Facebook francisbistro | Startseite |

### Der Shop

Alle Produkte und Preise vom bestehenden Gutscheinshop, geprüft am 25. August 2026.

| Produkt | Preis | Quelle |
|---|---|---|
| Wertgutschein Kreuzwirt, dreizehn, Francis | frei wählbar, 10 bis 1.000 Euro | die drei Produktseiten im Shop |
| Francis Menu du Chef | 52,00 Euro | shop.jolioo.com, francis-menu-du-chef |
| Drei Gänge | 60,00 Euro | shop.jolioo.com |
| Drei Gänge mit Weinbegleitung | 87,00 Euro | shop.jolioo.com |
| Vier Gänge | 70,00 Euro | shop.jolioo.com |
| Vier Gänge mit Weinbegleitung | 106,00 Euro | shop.jolioo.com |
| Fünf Gänge | 80,00 Euro | shop.jolioo.com |
| Fünf Gänge mit Weinbegleitung | 125,00 Euro | shop.jolioo.com |

Weitere belegte Angaben aus den AGB des Shops, alle auf der Demoseite verwendet:

* "Alle Gutscheine sind 3 Jahre ab Ausstellungsdatum gültig"
* Rücktritt binnen 14 Tagen ohne Angabe von Gründen
* Zahlung mit Mastercard, Visa, Maestro
* Zustellung per E-Mail, Postversand möglich, Kosten werden im Bestellvorgang ausgewiesen
* Widmung bis 200 Zeichen, dazu die Felder Von, Für und Zustell-E-Mail

Die drei Schnellbeträge 30, 50, 75 und 100 Euro sind eine Gestaltungsentscheidung, kein
Fund. Der Shop lässt jeden Betrag zwischen 10 und 1.000 Euro zu, die Knöpfe sind nur
Abkürzungen. Das Eingabefeld daneben nimmt jeden anderen Betrag im erlaubten Bereich.

---

## 3. Lückenprotokoll

**Bilder.** Aus der Bauumgebung sind static.wixstatic.com und public.jolioo.com nicht
erreichbar. Die Seite ist deshalb so gebaut, dass jedes fehlende Bild durch eine Fläche in
der Hausfarbe mit dem Namen des Hauses ersetzt wird, sichtbar sauber statt kaputt.
`bilder-holen.sh` im Ordner lädt alle gefundenen Originale und wandelt sie um.
Dateinamen, die index.html erwartet:
`hero.webp`, `haus-kreuzwirt.webp`, `haus-dreizehn.webp`, `haus-francis.webp`,
`gutschein-kreuzwirt.webp`, `gutschein-dreizehn.webp`, `gutschein-francis.webp`.

**Vom Kreuzwirt gibt es keine Bildadressen.** Die Wix-Seite liefert die Fotos erst im
Browser nach, kein Werkzeug bekommt sie aus dem Quelltext. Ein Foto des Hauses muss von
Hand nach `assets/img/haus-kreuzwirt.webp`.

**Die Menügutscheine haben kein Haus.** Im Shop stehen "3-Gänge-Menü" bis
"5-Gänge-Menü mit Weinbegleitung" ohne Angabe, für welches der drei Häuser sie gelten.
Auf der Demo stehen sie deshalb ohne Hauszuordnung. Das gehört gefragt, denn ein
Gutschein ohne erkennbares Haus verkauft sich schlechter.

**Menüinhalte fehlen.** Weder im Shop noch auf den Seiten steht, welche Gänge in einem
3-, 4- oder 5-Gänge-Menü enthalten sind. Auf der Demo steht deshalb nur die Gangzahl.

**Öffnungszeiten dreizehn ohne Ende.** Die Seite nennt nur "ab 11:30 Uhr". Die
Statuszeile sagt deshalb "Jetzt geöffnet" ohne Endzeit. Sobald die Schließzeit bekannt ist,
ist das eine Zeile im Skript, `HAEUSER.dreizehn.tage`, und `offenesEnde` fällt weg.

**Feiertage beim Kreuzwirt unbekannt.** dreizehn und Francis nennen ausdrücklich
"Sonn- und Feiertage geschlossen", der Kreuzwirt nicht. An Feiertagen zeigt die Seite beim
Kreuzwirt deshalb keinen erfundenen Status, sondern den Hinweis, kurz anzurufen.
Steuerung über `HAEUSER.kreuzwirt.feiertag`, Werte `geschlossen` oder `unbekannt`.

**Zwei Telefonnummern für Francis.** Startseite +43 664 403 10 01, Impressum
+43 316 83 85 67. Auf der Demo steht die Nummer der Startseite, weil sie prominenter ist.
Gehört geklärt.

**Speisekarten.** Keiner der drei Betriebe hat eine Speisekarte als lesbaren Text online.
Bei dreizehn liegen die Karten als PNG-Dateien, bei Francis gibt es keine erreichbare
Unterseite. Auf der Demo ist "Speisekarten" deshalb ein inaktiver Navigationspunkt.

**Reservierung.** Kreuzwirt und Francis verlinken auf mytools.aleno.me. Beim Kreuzwirt
stand am Tag der Recherche "Hier gibt es gerade nichts zu buchen". Auf der Demo führen die
Knöpfe deshalb ans Telefon, und "Reservierung" ist ein inaktiver Navigationspunkt.

**City-Trip-Package.** Auf der Startseite des Kreuzwirt taucht ein Package
"Städtetrip für Genießer" als Knopf auf, ohne Inhalt dahinter. Nicht übernommen.

**Copyright-Jahre.** Kreuzwirt "© 2022", dreizehn "© 2021". Beides steht heute noch so
online. Nicht übernommen, aber als Argument im Gespräch brauchbar.

**Impressum dreizehn.** Die Adresse dreizehnbygauster.at/impressum zeigt die
Datenschutzerklärung mit Stand 30.04.2021, nicht die Pflichtangaben. Das ist ein rechtlicher
Mangel, nicht nur ein Schönheitsfehler. Im Verkaufsgespräch vorsichtig ansprechen.

---

## 4. Gemessene Werte

Gemessen im Browser am gerenderten Dokument.

| Prüfpunkt | Ergebnis |
|---|---|
| Waagrechtes Scrollen bei 360, 390, 768, 1440 | keines, scrollWidth gleich innerWidth |
| Größte Überschrift bei 1440 | 83,2 px |
| Kopfbereich mit Demoleiste, Handy | 104 px |
| Kopfbereich mit Demoleiste, Desktop | 133 px |
| Kontrastprüfung, jedes Element mit eigenem Text | kein Mangel, niedrigster Wert 4,90:1 |
| JavaScript-Fehler in der Konsole | keine |
| Emoji, Pfeil, Geviert- oder Halbgeviertstrich | je 0 Treffer |
| Ausrufezeichen im sichtbaren Text | 0, die Treffer im Quelltext sind Negationen im Skript |
| alert() | 0 |
| Warenkorb, Beispielrechnung | 75 plus 120 plus 87 ergibt 282,00 Euro |
| Übergabe an warenkorb.html | 50 plus 52 ergibt 102,00 Euro, Anzahl im Kopf stimmt |
| Lade schließt über Kreuz, Schatten und Escape | alle drei geprüft |
| Öffnungszeitenlogik | Dienstag geprüft, Kreuzwirt Ruhetag mit nächstem offenen Tag, dreizehn und Francis offen |

Bei 360 Pixel drängte der Warenkorbknopf zunächst 15 Pixel über den rechten Rand. Behoben,
indem die Navigation unter 640 Pixel in eine eigene Zeile unter der Wortmarke rückt.

---

## 5. Was auf der Seite steht, Reihenfolge

1. Demoleiste
2. Kopf mit Wortmarke, Navigation, Warenkorb
3. Hero mit den drei Häusern als Statusband, jedes mit heutigem Zustand
4. Die drei Häuser, je eine breite Zeile, Bildseite abwechselnd
5. Gutscheinshop, Wertgutscheine und Menügutscheine
6. Zustellung und Gültigkeit als zwei Karten
7. Apartments beim Kreuzwirt
8. Öffnungszeiten und Kontakt, drei Tabellen, heutiger Tag hervorgehoben
9. Fuß mit beiden Gesellschaften und Demo-Hinweis
10. Seitfix-Block nach dem Fuß

Inaktive Punkte, alle mit eigenem Hinweistext und ohne toten Link:
Speisekarten, Reservierung, Jobs, Firmengeschenke, Zur Kasse. Auf der Warenkorbseite
zusätzlich Konto.

---

## 6. Die Konstanten

Ganz oben im Skriptblock beider Dateien:

```js
var PREIS              = 2500;               // Euro einmalig, Kleinunternehmer
var PREIS_BETREUUNG    = 30;                 // Euro pro Monat
var KONTAKT_SEITFIX    = 'hallo@seitfix.at';
var BESTELL_EMPFAENGER = 'hallo@seitfix.at'; // nach Auftrag: Adresse der Gruppe
```

---

## 7. JOLIOO, was der bestehende Anbieter kostet

Recherchiert am 25. August 2026 auf jolioo.com und im Anbietervergleich von medienkraft.at.

**Was JOLIOO ist.** Kein reines Gutscheinsystem, sondern eine Kundenbindungsplattform der
JOLIOO Technologies GmbH. Die Basis heißt Loyalty Plattform und enthält Loyalty-Programm,
Kundenkarte, CRM, Newsletter, Couponing und Automatisierungen. Gutscheinsystem, Webshop und
eigene App sind Zusatzmodule, die JOLIOO Loyalty Booster nennt.

**Belegte Preisangaben.**

| Angabe | Quelle |
|---|---|
| Loyalty Plattform ab 49 Euro pro Monat | jolioo.com/preise |
| bei jährlicher Zahlung bis zu 16 Prozent günstiger | jolioo.com/preise |
| "Für JOLIOO fällt keine allgemeine Setup-Gebühr an" | jolioo.com/preise |
| für Gutscheinsystem und Webshop fällt jeweils eine einmalige Einrichtungsgebühr an | jolioo.com/preise |
| Preis steigt mit der Zahl der Kundendatensätze, Stufen 200, 500, 1.500, 3.000, 5.000, 10.000 | jolioo.com/preise |
| vier Pakete S, M, L, XL, Loyalty-Funktionen erst ab Paket M | medienkraft.at, Vergleich der Gutscheinsysteme |

**Was nicht öffentlich steht.** Die konkreten Beträge je Paketstufe und der Aufpreis für
Gutscheinsystem und Webshop. Die Preisseite ist ein Rechner, der die Zahlen erst nach
Auswahl im Browser einblendet, ohne sie in den Quelltext zu schreiben. Aus derselben
Umgebung war die Domain nicht mit einem Browser erreichbar. Wer die genaue Summe braucht,
ruft dort an oder fragt Herrn Gauster, was er zahlt. Die zweite Variante ist im Gespräch
ohnehin die bessere Frage.

**Einordnung für das Gespräch.** Vergleichbare Anbieter im selben Markt liegen bei 29 bis
89 Euro im Monat, firstvoucher verlangt statt einer Monatsgebühr 3,9 bis 4,9 Prozent je
Transaktion. 49 Euro im Monat sind 588 Euro im Jahr, plus Modulgebühren.

**Wichtig, damit das Argument nicht kippt.** Bei 2.500 Euro einmalig und 30 Euro Betreuung
im Monat ist die eigene Lösung über drei Jahre gerechnet nicht billiger als JOLIOO. Das
Argument ist deshalb nicht der Preis, sondern:

* der Kauf passiert auf der eigenen Domain, die Marke bricht nicht ab
* die drei Häuser treten erstmals gemeinsam auf, ein Gutschein bewirbt alle drei
* die Kundendaten aus dem Verkauf liegen beim Betrieb, nicht bei einem Dritten
* keine Abhängigkeit von einer Preisliste, die ein anderer ändert

Wenn im Gespräch der Preis zum Thema wird, ist die ehrliche Antwort: JOLIOO kann bleiben,
wenn die Loyalty-Funktionen genutzt werden. Was nicht bleiben muss, ist der Absprung des
Gastes auf eine fremde Seite.

---

## 8. Offene Punkte für Ivo

1. **Bilder.** `bilder-holen.sh` einmal ausführen. Vom Kreuzwirt fehlt ein Foto.
2. **Menügutscheine ohne Haus.** Vor dem Versand entscheiden, ob sie einem Haus
   zugeordnet werden oder als Gruppenprodukt stehen bleiben.
3. **Preis.** 2.500 Euro sind aus der BUNA-Demo übernommen. Hier stecken drei Betriebe,
   ein Shop und eine zweite Seite drin. Eine Zeile im Skript, falls das anders sein soll.
4. **Die Nummer von Francis** stimmt an zwei Stellen nicht überein.
5. **Zwei Gesellschaften.** Kreuzwirt läuft über eine eigene GmbH. Wenn ein gemeinsamer
   Shop über eine Kasse verkauft, ist das eine steuerliche Frage, keine technische.
   Im Gespräch nicht überhören, sondern zurückspielen.
6. **Reservierung.** Aleno ist im Einsatz und war beim Kreuzwirt leer. Das ist ein
   zweiter, unabhängiger Anlass für ein Gespräch.

---

# Zweiter Durchgang, 25. August 2026: fünf Seiten statt einer

Gebaut nach dem Masterprompt `_system/masterprompt-gauster-ueberseite.md`.
Alles ab hier ersetzt die Abschnitte 1, 4 und 5 des ersten Durchgangs, die Faktenlage
aus Abschnitt 2 und das Lückenprotokoll aus Abschnitt 3 gelten weiter.

## A. Design-Audit der drei Originalauftritte

Die Wix-Seiten liefern ihre Farb- und Schriftangaben nur über externe Stylesheets aus,
die aus dieser Umgebung nicht abrufbar sind. Als Primärquelle für die Markenfarben dienen
deshalb die offiziellen Gutscheinmotive des Betriebs aus dem bestehenden Shop, die als
Dateien vorliegen. Die Werte sind aus den Schriftzügen und Badges der Motive gesampelt.

| Haus | Farbe im Motiv | übernommen als | Kontrast auf Papier #f6f4ef |
|---|---|---|---|
| Kreuzwirt | dunkles Rotbraun, Badge #6e2317, Schriftzug um #612114 | `#6e2317`, unverändert | 9,97:1 |
| dreizehn | Bronze, Badge #7d5d42 | `#7d5d42`, unverändert | 5,43:1 |
| Francis | Grün, Schriftzug #126b55, Badge #3b8e7b | `#126b55`, unverändert | 5,86:1 |

Keine der drei Farben musste angepasst werden, alle liegen über 4,5:1.
Der wichtigste Fund des Audits steht unten unter C.

**Schrift der Originale.** Kreuzwirt: Schreibschrift für "Gutschein" plus fette
Versalien-Grotesk für den Namen. dreizehn: dünne, weit gesperrte Versalien plus
Schreibschrift-Logo. Francis: geometrische Grotesk plus Schreibschrift-Logo.
Gemeinsamer Nenner: alle drei kombinieren eine ruhige Grotesk mit einem
Schreibschrift-Logo, keines verwendet eine ornamentale Schrift.
Die neutralen Dachschriften Space Grotesk und IBM Plex Sans bleiben deshalb,
die Schreibschrift-Identität tragen die Gutscheinmotive selbst ins Bild.

**Bildsprache.** dreizehn: Teller von oben auf Holz, ruhig, warm (Lunch-Foto), Gastraum
mit Sitzbank und blauem Polster, Bar mit Leuchtschriftzug. Francis: Teller von oben auf
grauem Stein, bunt, dicht, dazu ein dunkler Innenraum mit bunten Stühlen, Ziegelwand und
grünem Neon-Schriftzug. Kreuzwirt: kein einziges Foto extrahierbar, siehe Lücke.
Die Hausseiten übernehmen genau diese Haltung: dreizehn warm und ruhig, Francis
dunkler Innenraum im Hero und bunte Teller darunter.

**Tonalität, wörtlich.** Kreuzwirt: "Bei uns erleben Sie die Region pur." dreizehn:
"- DENN DAS AUGE ISST AUCH MIT -", "Wir leben die Werte - Ästhetik, Genuss und Qualität".
Francis: "Das Francis ist der Ort, an dem Kulinarik neu gedacht wird", "Hier trifft
Steiermark auf die Welt". Je ein Satz pro Haus steht als gekennzeichnetes Zitat auf
seiner Seite.

## B. Seitenarchitektur, fünf Suchabsichten

| Datei | Suchabsicht | Titel (Zeichen) | Beschreibung (Zeichen) |
|---|---|---|---|
| index.html | Gauster Graz, die Gruppe | 55 | 157 |
| gutscheine.html | Restaurantgutschein Graz kaufen | 51 | 157 |
| kreuzwirt-am-rosenberg.html | Gasthaus Rosenberg, steirisch, Apartments | 53 | 158 |
| dreizehn.html | Restaurant Franziskanerplatz, Lunch | 53 | 155 |
| francis.html | Bistro Graz, offen bis Mitternacht | 53 | 152 |
| warenkorb.html | keine, noindex | 31 | 81 |

Roter Faden: zwei Wege. Weg A hingehen (drei Hausseiten), Weg B verschenken
(gutscheine.html plus warenkorb.html), index.html ist die Weiche mit genau zwei
Handlungen über dem Falz. Je Hausseite genau ein Shop-Verweis, im Shop keine
Reservierung. robots.txt und sitemap.xml liegen im Ordner, warenkorb.html ist
per robots ausgenommen und noindex.

## C. Neuer Fund: die Gutscheine gelten in allen drei Häusern

Auf allen drei Gutscheinmotiven aus dem Shop steht im Badge unten rechts wörtlich
"Auch einlösbar bei:" mit den Logos der jeweils anderen zwei Häuser. Ein Gutschein mit
Kreuzwirt-Motiv gilt also auch im dreizehn und im Francis. Der bestehende Shop sagt das
nirgends im Text, es steht nur im Bild.

Konsequenz auf der Demo: der Shop verkauft "ein Gutschein, drei Häuser" als
Kernaussage, der Filter filtert nur noch nach Motiv, und die FAQ beantwortet die
Einlösefrage ausdrücklich. Das ist zugleich ein Verkaufsargument im Gespräch: die
stärkste Eigenschaft des Produkts steht beim Betrieb nur als Bildpixel.

Die Menügutscheine tragen keinen solchen Aufdruck-Nachweis, ihre Hauszuordnung bleibt
offen wie im Lückenprotokoll vermerkt.

## D. Gemessene Werte, zweiter Durchgang

| Prüfpunkt | Ergebnis |
|---|---|
| Waagrechtes Scrollen, 6 Seiten mal 4 Breiten (360/390/768/1440) | keines |
| Niedrigster Kontrast im ganzen Set | 5,89:1 (Fußzeilentext auf Dunkel) |
| Klicks von der Startseite bis Gutschein im Warenkorb | 2 |
| Klicks von der Startseite bis zur Telefonnummer eines Hauses | 1 (Statusband), Nummer im Hero |
| Warenkorb über alle sechs Seitenwechsel | erhalten, Zahl im Kopf stimmt überall |
| Motiv-Filter | zeigt Wertgutschein des Hauses plus alle Menügutscheine |
| JSON-LD | auf allen sechs Seiten valide geparst |
| JavaScript-Fehler | keine (fehlende Bilddateien lösen den Ersatz aus, keinen Fehler) |
| Emojis, Pfeile, Geviert-/Halbgeviertstriche, alert() | je 0 Treffer |
| Ausrufezeichen im sichtbaren Text | 0 außerhalb gekennzeichneter Zitate |
| Wortgleiche Sätze über 40 Zeichen zwischen den Hauptinhalten zweier Seiten | 0 |
| Seitengewichte HTML | index 55 KB, gutscheine 63 KB, kreuzwirt 55 KB, dreizehn 53 KB, francis 53 KB, warenkorb 48 KB |
| Bilder gesamt (10 WebP) | 1,16 MB, größte Datei francis-team.webp 271 KB |
| Öffnungszeitenlogik | Dienstag geprüft: Kreuzwirt Ruhetag mit nächstem offenen Tag, dreizehn offen, Francis offen bis 24:00. Feiertagsfälle unverändert aus Durchgang 1 |

Behobene Fehler dieses Durchgangs: Überlauf bei 360/390 px durch lange E-Mail-Adressen
in den Kontaktkarten (overflow-wrap plus min-width:0 auf Rasterkindern), falsche
Alt-Texte bei zwei Francis-Bildern (Dessert war als Innenraum beschriftet), Ersatzfläche
im Hausseiten-Hero auf Seitenverhältnis 5:2 begrenzt.

## E. Bilderstand

`bilder-holen.sh` wurde von Ivo ausgeführt, die zehn Originale wurden hier nach WebP
gewandelt und liegen in `assets/img/`. Zuordnung:

| Datei | Verwendung |
|---|---|
| hero.webp | Startseite, Gruppenblock |
| gutschein-kreuzwirt/-dreizehn/-francis.webp | Shop und Startseiten-Vorschau |
| haus-dreizehn.webp | dreizehn Hero (Gastraum) |
| dreizehn-teller.webp, dreizehn-raum.webp | dreizehn Bildpaar (Lunch, Bar) |
| francis-team.webp | Francis Hero (Innenraum mit Neon) |
| haus-francis.webp, francis-raum.webp | Francis Bildpaar (Teller, Dessert) |
| haus-kreuzwirt.webp | **fehlt weiterhin**, der Hero des Kreuzwirt zeigt die Ersatzfläche |

## F. Änderungsprotokoll gegenüber Durchgang 1

Aus einer Seite wurden fünf plus Warenkorb, weil eine Adresse fünf Suchabsichten nicht
tragen kann. Die Hausfarben wurden aus den Gutscheinmotiven neu hergeleitet, vorher
waren sie erfunden und falsch verteilt (Grün gehörte Francis, nicht dem Kreuzwirt).
Die Kernaussage des Shops wurde auf "ein Gutschein, drei Häuser" umgestellt, belegt
durch die Motive. Startseite auf 900 Wörter als Weiche verdichtet, Apartments auf die
Kreuzwirt-Seite gewandert, FAQ mit FAQPage-Daten neu, robots.txt und sitemap.xml neu.
CSS und Skript sind über den Generator identisch auf allen Seiten.

## G. Fragen an den Betrieb, Stand dieses Durchgangs

1. Gilt die Kreuzüber-Einlösung auch für die Menügutscheine mit Gangzahl?
2. Welche Telefonnummer ist die richtige für Francis, Startseite oder Impressum?
3. Bis wann hat das dreizehn abends offen? Die Seite nennt nur den Beginn.
4. Hat der Kreuzwirt an Feiertagen offen?
5. Ein Foto vom Kreuzwirt (Haus, Gastraum oder Teller) für den Hero seiner Seite.
6. Verkauft ein gemeinsamer Shop über die Kasse der Gauster Gastronomie GmbH, obwohl
   der Kreuzwirt eine eigene GmbH ist? Steuerfrage, gehört zum Steuerberater.

---

# Dritter Durchgang, 25. August 2026: Neugestaltung

Ivo hat den zweiten Durchgang als zu nackt verworfen. Struktur, Inhalte, SEO und
Shop-Logik sind unverändert, neu ist die komplette Gestaltungsschicht.

**Was sich geändert hat**

* Hero der Startseite ist jetzt ein Vollbild-Foto (hero.webp, die Teller aus dem
  dreizehn) mit Verlaufsschutz nach unten, die Überschrift steht auf dem Bild.
  Vorher: leere dunkle Fläche, das war der Hauptkritikpunkt.
* Displayschrift ist Fraunces (SIL OFL, 600 aufrecht plus 400 kursiv), Fließtext bleibt
  IBM Plex Sans. Begründung aus dem Audit: alle drei Häuser kombinieren eine ruhige
  Grotesk mit einem Schreibschrift-Logo, die warme Serife übersetzt diese Haltung auf
  das Dach, die kursiven Akzente ("eine Familie.", "drei Häuser") übernehmen die Rolle
  der Schreibschrift. Space Grotesk ist raus.
* Hausseiten-Heros sind Vollbild-Fotos mit 5px-Farbkante des Hauses am unteren Rand.
* Statusband sind jetzt drei Karten mit Farbkante oben, Serifennamen und Hebe-Effekt.
* Die zwei Wege haben große Bildpaneele (Lunch-Foto, Gutscheinmotiv).
* Wärmeres Papier (#f4efe6), Elfenbein statt Reinweiß auf Dunkel, Akzentlinie vor
  jeder Überzeile, Preise in der Serife, sanfte Hover-Effekte, eine Transition-Dauer.

**Neu gemessen nach der Neugestaltung**

| Prüfpunkt | Ergebnis |
|---|---|
| Überlauf bei 360/390/768/1440, alle sechs Seiten | keiner |
| Niedrigster Kontrast außerhalb der Foto-Heros | 5,42:1 |
| Text auf den Foto-Heros | steht im unteren Drittel auf Verlauf 78 bis 92 Prozent Schwarz |
| Klicks bis Gutschein im Warenkorb | 2 |
| Korb über alle Seitenwechsel | erhalten |
| JSON-LD, JS-Fehler, Sprache, alert | alles sauber wie in Durchgang 2 |
| Statuszeile im Hausseiten-Hero | Fehler behoben, Skript setzt keine dunkle Inline-Farbe mehr |

Der Kreuzwirt-Hero zeigt bis zum Eintreffen eines Fotos eine ruhige Fläche im
Kreuzwirt-Rot ohne doppelten Namenszug. Die Punkte aus Abschnitt G gelten weiter.

## Nachtrag 25.08., Abend: Hausseiten als Steckbriefe

Auf Ivos Anweisung sind die drei Hausseiten von Vollseiten auf Steckbriefe verkürzt.
Die Dachseite ist die Übersicht, die Hauptadresse jedes Hauses bleibt seine eigene
Website. Je Hausseite steht jetzt: Hero mit Foto und Live-Status, ein Absatz mit
gekennzeichnetem Zitat, die groben Fakten (Küche oder Lunch, Preise, Adresse, Telefon,
E-Mail), die Öffnungszeitentabelle, der Gutschein-Verweis. Prominenter erster Knopf im
Hero ist der Absprung zur echten Website des Hauses (target blank). Entfallen sind die
langen Küche-Blöcke, das Bildpaar und der Apartment-Katalog; die Apartments stehen beim
Kreuzwirt als Faktenzeile. Navbar seit v3c: Wortmarke links, Navigation mittig,
Warenkorb rechts, 52 Pixel hoch, deckend. Menügutscheine tragen das Gruppen-Abzeichen
mit drei Hauspunkten, weil weder Shop noch Ivo ein Haus benennen können.

## Nachtrag 25.08., spaeter Abend: Status raus, Heros nach Referenz

Auf Ivos Anweisung ist die Live-Anzeige "Jetzt geöffnet / Heute Ruhetag" komplett
entfernt, weil die Pflege der Logik dem Betrieb nicht zumutbar ist. Die Zeiten stehen
jetzt als statischer Text im Statusband und in den Tabellen, geändert wird künftig nur
Text im HTML. Aus dem Skript sind HAEUSER, Feiertagsdaten, Osterrechnung und die ganze
Statuslogik gestrichen, geblieben ist einzig die wartungsfreie Hervorhebung des
heutigen Wochentags in den Öffnungszeitentabellen.

Die drei Hausseiten-Heros folgen jetzt Ivos Referenz (himalayamasala.netlify.app):
Vollbild-Foto fast über die ganze Fensterhöhe, kursive Serifenzeile mit Mittelpunkten
("Bistro · Cocktails · bis Mitternacht"), großer Name, ein Satz, zwei Knöpfe
(Tisch reservieren als Telefonlink, daneben der Absprung zur eigenen Website), und am
unteren Bildrand eine Merkmalreihe mit drei belegten Fakten über einer Haarlinie.
Abweichend von der Referenz bleiben die eckigen Knöpfe und die Hausfarben des Systems,
die Pillenform und das Orange der Referenz gehören dem anderen Betrieb.


## Nachtrag 25.08., Nacht: Kreuzwirt-Foto, Dreizehn gross, Preis 3.000

* Kreuzwirt-Hero: echtes Foto vom Ivo geliefert (Haus in der Abenddämmerung mit
  Gastgarten), als haus-kreuzwirt.webp eingebaut. Die letzte Bildlücke ist damit zu.
* Schreibweise "Dreizehn" jetzt mit grossem D im sichtbaren Text (Name, Navigation,
  Titel, Fliesstext). Domain dreizehnbygauster.at, E-Mail und Dateinamen bleiben klein.
* Preis im Seitfix-Block von 2.500 auf 3.000 Euro geändert (eine Konstante im Skript).
* Brotkrumen-Balken auf den Hausseiten entfernt, Foto beginnt direkt unter der Navigation.
