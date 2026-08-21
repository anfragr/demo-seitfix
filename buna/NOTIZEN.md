# BUNA Coffee Roasters, Graz

Demoseite für den öffentlichen Link `seitfix.at/demo/buna/`.
Recherche und Bau am 21. August 2026. Erste Demo für einen Händler statt für ein Wirtshaus.

Quellen sind ausschließlich buna.at und die dort erreichbaren Unterseiten.
Alles, was ich dort nicht gefunden habe, steht im Lückenprotokoll und nicht auf der Seite.

**Zwei Dateien statt einer.** `index.html` und `warenkorb.html`. Die Regel aus dem
Basis-Prompt, eine einzige `index.html` je Betrieb, ist hier auf ausdrückliche Anweisung
aufgehoben: der Warenkorb soll eine eigene Seite sein, so wie in einem echten Shopify-Store.
CSS und Skript sind in beiden Dateien identisch, der Korb liegt in `sessionStorage`.
Weiterhin kein Build, kein Framework, kein fremder Server.

---

## 0. Der wichtigste Fund

Am 21. August 2026 steht auf der Startseite von buna.at, dass der Onlineshop offline
geschaltet wurde und Kaffeebestellungen per Mail an walter@buna.at gehen sollen.

Der Shop ist nicht offline. Und der Kaffee ist auch nicht weg.

Drei Kaffees sind heute live, mit Preis, Varianten und funktionierendem Warenkorb:

| Kaffee | 250 g | 1000 g | Adresse |
|---|---|---|---|
| Uraga, Äthiopien | 15,50 Euro | 58,90 Euro | buna.at/shop/uraga-eth/ |
| Fazenda Mumbuca, Brasilien | 12,90 Euro | 49,20 Euro | buna.at/shop/fazenda-sertao-brasilien/ |
| DECAF Women ASOMUJER, Kolumbien | 12,70 Euro | 38,80 Euro | buna.at/shop/decaf-women-asomujer-kolumbien/ |

Jede dieser Seiten hat Geschmacksnoten, Herkunft, Region, Produzent, Seehöhe, Aufbereitung,
eine Mengenauswahl und eine Mahlgradauswahl. Fünf weitere Kaffees sind angelegt, aber
ausverkauft: Aricha ETHIOPIA, Buku Hambela, Huila Entkoffeiniert, Codech BIO-GUA und
Gwiza RUA, dazu zwei Abo-Produkte und ein Solidaritäts-Abo.

Gefunden werden kann davon nichts. `buna.at/product-category/kaffee/` meldet
"Es wurden keine Produkte gefunden, die deiner Auswahl entsprechen." Auf `buna.at/shop/`
stehen nur die Kategorien Zubehör mit 52 Artikeln und Kaffee-Workshops mit vier. Weder die
Startseite noch der Shop noch die FAQs verlinken einen einzigen Kaffee. Ich habe alle
geprüften Seiten danach durchsucht, kein Treffer.

Das verschiebt den Verkaufsanlass: es ist kein technisches Problem, sondern ein
Katalogproblem. Genau darauf zielt der Seitfix-Block, und genau deshalb lautet die Empfehlung
Shopify, wo Verfügbarkeit und Sichtbarkeit an einem Schalter im Backend hängen und nicht an
einer Einstellung, die jemand pflegen muss.

---

## 1. Designentscheidung

Die Farbwelt ist nicht erfunden, sie steht im Stylesheet von buna.at:
`#653804` als dunkle Fläche, `#c4533a` als erster Akzent, `#f9be58` als zweiter Akzent,
`#f7f7f9` als helle Fläche. Übernommen wurden alle vier. Der Akzent ist von `#c4533a` auf
`#b2462e` abgedunkelt, weil das Original auf der hellen Fläche nur 4,22:1 erreicht und damit
unter dem Mindestkontrast liegt. Das Gelb `#f9be58` trägt den Women-in-Coffee-Abschnitt, weil
die Packungen dieser Linie tatsächlich gelb sind. Damit wird aus einer Markenfarbe ein Inhalt.

Die Schrift ist Lato, dieselbe Familie, die buna.at verwendet. Drei Schnitte, 400, 700 und 900.
Nur eine Familie, dafür ein sehr großer Sprung von 17 auf 108 Pixel. Genau dieser Abstand
erzeugt den Eindruck, nicht die Schriftwahl. Lato liegt unter der SIL Open Font License und
wurde als woff2 nach `assets/fonts/` gelegt. Kein Aufruf an fonts.googleapis.com.

Abgrenzung zu den zehn Wirtshäusern: keine Serifenschrift, keine Zeitleiste, kein
Reservierungsformular, kein zweispaltiger Wege-Hero. Die Seite ist ein Katalog mit einem
Bestellblock und einem Warenkorb, kein Gasthausauftritt.

---

## 2. Jede Angabe auf der Seite und ihre Quelle

### Firma und Kontakt

| Angabe auf der Seite | Quelle |
|---|---|
| BUNA Coffee Roasters | buna.at, Fußzeile jeder Seite |
| Susanne Feier, Inhaberin | buna.at/impressum/ |
| Joanneumring 16, 8010 Graz | buna.at, Fußzeile und Impressum |
| Telefon 0316 228683 | buna.at/impressum/, steht dort und nur dort |
| office@buna.at | buna.at/impressum/ |
| walter@buna.at für Bestellungen | buna.at, Hinweiskasten auf der Startseite |
| UID ATU63526223, Magistrat der Stadt Graz | buna.at/impressum/, nicht auf der Demoseite verwendet, nur im JSON-LD als `vatID` |
| Bildnachweis Peter Oswald aka Tasty | buna.at/impressum/, Zeile "Bildernachweis" |

### Geschichte

| Angabe | Quelle |
|---|---|
| gegründet 2007 in Graz von Susanne Feier und Walter Jauk | buna.at/about/ |
| Buna ist Amharisch und bedeutet Kaffee, wichtigste Verkehrssprache Äthiopiens | buna.at/faqs/, wörtlich als Unterzeile im Hero übernommen |
| seit 2015 wird selbst geröstet, Röstung in Graz-Puntigam | buna.at/about/ |
| seit 2022 am Joanneumring 16 | buna.at/about/ und buna.at/faqs/ |

Nicht auf der Seite verwendet, obwohl belegt: der Standort Schmiedgasse von Oktober 2012 bis
April 2020 und der Zwischenstopp beim Dekagramm. Beides steht in buna.at/about/ und in den
FAQs, gehört aber auf die Unterseite Über uns und nicht auf die Startseite.
Ebenfalls belegt und bewusst weggelassen: "20 Jahre an Erfahrung von Meisterschaften, als
Trainer:innen und der Tätigkeit in Jurys" (buna.at/about/). Die Zahl steht in zwei Fassungen
online, siehe Lückenprotokoll.

### Kaffee

| Angabe | Quelle |
|---|---|
| sortenrein, 100 Prozent Arabica, Single Origin | buna.at/faqs/, Abschnittsüberschrift "Zu unserem Kaffee: 100% Arabica Single Origins" |
| schonend geröstet | buna.at/about/ |
| das Angebot wechselt, weil von kleinen Farmerinnen und Kooperativen gekauft wird | buna.at/faqs/, Frage "Warum ändert sich euer Angebot der Kaffeesorte von Zeit zu Zeit?" |
| es wird bewusst wenig Rohkaffee eingelagert | dieselbe FAQ-Antwort |
| noch nicht alle Kaffees sind Bio | buna.at/faqs/, Frage "Ist euer Kaffee bio?" |
| es wird ein Vielfaches des Börsenpreises bezahlt | buna.at/faqs/, Frage "Warum ist euer Kaffee so teuer?" |
| Packungsgrößen 250 g und 1000 g | die drei live stehenden Produktseiten, siehe Abschnitt 0 |

### Women in Coffee

Quelle für den ganzen Abschnitt: buna.at/ueber-women-in-coffee/, Beitrag vom 25. Juni 2021,
verlinkt über buna.at/womenincoffee/.

* Zitat "Wir wollen die Arbeit von Frauen in der Kaffeeindustrie sichtbar machen", Susanne Feier
* die Linie stärkt Frauen in allen Phasen der Wertschöpfungskette
* Produzentinnen aus Kolumbien, Guatemala und der Demokratischen Republik Kongo
* mit jeder verkauften Packung steigen die Prämien an die Produzentinnen
* Logo `assets/img/women-in-coffee.webp` aus `uploads/2021/06/WIC_byBUNA_WEB.png`

Auf der Seite steht der Hinweis, dass der Beitrag von Juni 2021 stammt und dass BUNA sagt,
welche Sorten heute in der gelben Verpackung stehen. Die drei im Beitrag genannten Sorten
Ajicito, Kalehe und Huehuetenango sind bewusst nicht übernommen, siehe Lückenprotokoll.

### Zubehör, vier Karten

Alle vier Artikel sind heute live auf buna.at, mit Preis und Verfügbarkeit. Geprüft am
21. August 2026 über die Produktseiten und über die WooCommerce Store API
(`buna.at/wp-json/wc/store/v1/products`). Preise brutto, Zusatz "inkl. MwSt." wie im Original.

| Artikel | Beschreibung, wörtlich von buna.at | Preis | Quelle |
|---|---|---|---|
| AeroPress Permanentfilter | "Dauerfilter aus Edelstahl für die Aeropress (Ø 62mm). Feinste Lochung, 0,2mm dick." | 8,90 Euro | buna.at/shop/aeropress-permanentfilter/ |
| Chemex | "Kaffeekaraffe aus Borosilikatglas für 8 Tassen Filterkaffee. 100 Stück Filterpapier inklusive!" | 64,90 Euro | buna.at/shop/chemex/ |
| Hario V60, Keramik | "Der Hario V60 Handfilter ist ein moderner Klassiker." | 19,80 Euro | buna.at/shop/hario-v60-keramik/ |
| Hario Skerton PRO, Handmühle | "Der überarbeitete Klassiker mit langlebigem Keramikmahlwerk." | 68,90 Euro | buna.at/shop/hario-skerton-pro-handmuehle/ |

Alle vier melden auf der Produktseite "Vorrätig".
Beim Hario V60 ist nur der erste Satz der Originalbeschreibung übernommen. Der zweite Satz
enthält einen Halbgeviertstrich, der laut Verbotsliste nicht ins Dokument darf.
Das Ausrufezeichen in der Chemex-Beschreibung bleibt, weil es ein wörtliches Zitat ist.

Die Produktbilder stammen aus dem Shop, `uploads/2021/12/aeropress_pf.png`,
`uploads/2020/04/chemex-classic-8cup-front_1.png`, `uploads/2020/05/KDC-02-B.jpg`,
`uploads/2020/04/Bildschirmfoto-2020-04-23-um-11.34.51.png`.
Beim Chemex-Bild war unten ein 12 Pixel hoher roter Balken eingebrannt, der abgeschnitten wurde.

Die Angabe "52 Zubehörartikel" und "vier Kaffee-Workshops" steht auf buna.at/shop/ als
Kategoriezähler.

### Workshops, vier Karten

Titel, Beschreibung, Dauer und Preis stehen auf den Produktseiten. Geprüft am 21. August 2026.

| Workshop | Dauer | Preis | Quelle, Adresse der Produktseite |
|---|---|---|---|
| Kaffeeverkostung | 2 Stunden | 39,00 Euro | buna.at/shop/kaffeeverkostung/ |
| Filterkaffee Workshop | 3 Stunden | 89,00 Euro | buna.at/shop/kaffeesieder/ |
| Espresso Workshop | 4 Stunden | 129,00 Euro | buna.at/shop/espressomaker/ |
| Latte Art Workshop | 4 Stunden | 195,00 Euro | buna.at/shop/latteartist/ |

**Abweichung vom Auftrag, bitte gegenlesen.** Im Auftrag steht, der Preis stehe nicht auf
buna.at, deshalb solle dort "Preis auf Anfrage" stehen. Das stimmt nicht mehr: die vier
Produktseiten nennen den Preis heute sichtbar, zum Beispiel "€ 39,00 inkl. MwSt." bei der
Kaffeeverkostung, dazu die Dauer als Produkteigenschaft und bei zweien eine Terminliste bis
April 2027. Ich habe deshalb den belegten Preis genommen statt "Preis auf Anfrage".
Der Grund dahinter ist derselbe: nichts erfinden. Wenn Ivo lieber "Preis auf Anfrage" möchte,
sind es vier Stellen im HTML, jeweils die Zeile mit `class="preis"` in den `.kurse`-Karten.

Die Karten tragen die heute angezeigten Titel. Die Adressen der Produktseiten heißen noch
`kaffeesieder`, `espressomaker` und `latteartist`, das sind die älteren Namen.

Weitere belegte Angaben zu den Workshops:

* Anmeldung und Bezahlung über den Webshop, bis sieben Tage vor dem Termin: Auftrag, bestätigt
  durch den Bestellvorgang auf den Produktseiten und buna.at/faqs/ ("Hier auf unserer Website
  findest du unter Workshops alle Informationen, Termine und auch die Anmeldemöglichkeit")
* eigene Termine für Gruppen ab vier Personen und für Unternehmen:
  buna.at/shop/espressomaker/, "wenn ihr mit Euren Freund:innen, Familien oder
  Arbeitskolleg:innen (mind. 4 Personen) zu uns kommen möchtet"
* Storno sieben Tage vorher, 50 Prozent Rückerstattung: Auftrag, siehe Lückenprotokoll

### Firmenkund:innen

Quelle für den ganzen Abschnitt: buna.at/business/.

* Zitat "Mit jedem Handgriff arbeiten wir daran, das qualitativ bestmögliche Produkt liefern
  zu können." steht dort im ersten Absatz und trägt hier die Überschrift
* Gastronomie und Handel: bestehende Sorten oder eigene Röstung, offene Gebinde und
  Einzelpackungen, Beratung und Vermietung von Equipment, Einschulung, Hilfe bei technischen
  Gebrechen. Alle fünf Punkte stehen dort als Liste
* Büro: Zustellung in Graz, Zustellung per Post in ganz Österreich, Miet-Maschinen und -mühlen,
  Begleitung von der Auswahl bis zur Einstellung
* Veranstaltungen: BUNA-Stand in adaptierbarer Größe, erfahrene Baristas, Espresso und
  Filterkaffee, Coldbrew und Nitrocoffee, vegane Kuchen

Nicht übernommen, obwohl auf buna.at/business/ belegt: die namentliche Liste der bestehenden
Kundinnen und Kunden in Gastronomie, Handel und Büro. Fremde Betriebe gehören nicht auf eine
Demoseite, die der Betrieb nicht freigegeben hat.

### Nachhaltigkeit

Quelle: buna.at/zero-waste-kaffee-ein-anfang/, Beitrag vom 20. Dezember 2020, erreichbar über
buna.at/category/nachhaltigkeit/.

* Kaffee auch offen, im eigenen Behälter oder im braunen Mehrwegglas, das vor UV-Strahlung
  schützt
* "unsere Packungen sind CO2-neutral"
* "die Verpackung macht nur rund 3%" der Umweltbelastung durch Kaffee aus
* Permanentfilter aus Edelstahl für V60 und Chemex, aus Gold für den Moccamaster
* faltbare Permanentfilter für die Chemex
* To-Go-Becher und dichte Thermosflaschen mit Trinkaufsatz von Kinto
* wart- und reparierfähige Geräte, Ersatzteile direkt vom Hersteller
* Kaffeesatz kompostieren, bei Zimmerpflanzen nur kleine, gut getrocknete Mengen

### Öffnungszeiten

Auf der Seite steht: Freitag 10:00 bis 18:00, alle anderen Tage geschlossen, Beratungstermine
nach Vereinbarung. Quelle ist der Öffnungszeitenkasten auf buna.at, die restriktivste der drei
kursierenden Angaben. Der Zusatz "nach Vereinbarung" ist über den Satz auf der Startseite
gedeckt: "Für einen persönlichen Beratungstermin außerhalb der Öffnungszeiten, oder wenn du
ein anderes Anliegen oder Fragen zum Thema Kaffee hast schreib uns gerne eine Email."

Der Widerspruch zu den FAQs steht im Seitfix-Block und im Lückenprotokoll.

### Versand und Zahlung

Quelle: buna.at/faqs/, Abschnitt "Zu unserem Onlineshop".

* Lieferung nur innerhalb Österreichs, Österreichische Post AG
* Bearbeitungsdauer 2 bis 4 Werktage
* Preise zuzüglich Versandkosten, außer anders angegeben
* Zahlung per Überweisung, Kreditkarte oder PayPal, Versand erst nach Zahlungseingang

Diese Angaben stehen an drei Stellen: im Bestellblock unter Zustellung, im `data-hinweis` des
Kasse-Knopfs und in der Zwischensumme des Warenkorbs.

**Die Bankdaten und die IBAN stehen zwar öffentlich in den FAQs, sind aber nirgends auf der
Demoseite übernommen.** Das war ausdrücklich so verlangt und ist auch ohne Vorgabe richtig.

### Bilder

Alle Bilder von buna.at, umgewandelt nach WebP. Bildrechte liegen bei BUNA, die Imagefotos
stammen laut Impressum von Peter Oswald aka Tasty. Der Hinweis steht in der Fußzeile.

| Datei | Original |
|---|---|
| roestung.webp, Hero | uploads/2025/08/kuehlen-nach-roesten.png |
| filterkaffee.webp | uploads/2020/03/BUNA@tasty_Peter-Oswald-027.jpg |
| maschine.webp, Bildband | uploads/2020/03/BUNA@tasty-Peter_Oswald-043.jpg |
| siebtraeger.webp | uploads/2020/03/BUNA@tasty_Peter-Oswald-031.jpg |
| verkostung.webp | uploads/2021/07/DSCF3904_edit_quad-scaled.jpg |
| laden.webp | uploads/2021/06/DSCF3913-2-scaled.jpg |
| women-in-coffee.webp | uploads/2021/06/WIC_byBUNA_WEB.png |
| pr-aeropress, pr-chemex, pr-v60, pr-skerton | Produktbilder aus dem Shop, siehe Zubehörtabelle |

---

## 3. Lückenprotokoll

Was nicht belegt ist, steht hier und nicht auf der Seite.

**Mahlung. Erledigt, die Annahme war falsch.** Auf den Produktseiten der drei live
stehenden Kaffees gibt es ein Auswahlfeld Mahlgrad. Belegt sind: Ganze Bohne,
Siebträger/Espresso, Mokkakanne, Filterkaffee, French Press, beim Decaf zusätzlich Cold Drip
und Cold Brew. BUNA mahlt also. Die Kaffeekarten auf der Demo tragen genau diese Optionen,
je Sorte die, die auf ihrer Produktseite steht.

**Sortennamen und Preise. Erledigt, die Annahme war falsch.** Drei Kaffees stehen live mit
Namen, Preis, Geschmacksnoten und Herkunftsdaten, siehe Abschnitt 0. Sie sind nur nicht
verlinkt. Fünf weitere sind angelegt und ausverkauft und stehen deshalb nicht auf der Demo.

**Packungsgrößen.** Der Auftrag nannte 100 g, 250 g und 1000 g. Auf den drei live stehenden
Produktseiten gibt es nur 250 Gramm und 1000 Gramm. Die Demo zeigt deshalb nur diese zwei.
Ob es 100 g weiterhin gibt, gehört gefragt.

**Fairtrade.** Auf buna.at ist Bio belegt (FAQ "Ist euer Kaffee bio?"). Ein Fairtrade-Siegel
habe ich auf keiner Seite gefunden, wohl aber die durchgehende Aussage zu fairer Bezahlung.
Fairtrade steht deshalb nur als wählbares Merkmal im Sortenfeld, nirgends als Behauptung über
das Sortiment.

**Workshop-Preise.** Der Auftrag sagt, sie seien nicht belegt. Sie sind es heute, siehe
Abschnitt 2. Bitte gegenlesen, ob die belegten Preise stehen bleiben sollen.

**Öffnungszeiten, drei Angaben, die sich widersprechen.**

| Quelle | Angabe |
|---|---|
| buna.at, Startseite | Freitag 10:00 bis 18:00, alle anderen Tage geschlossen |
| buna.at/faqs/ | "Mittwoch bis Freitag von 10-18 Uhr und Samstag von 10-15 Uhr" |
| nachhaltig-in-graz.at, echtgraz.at | freitags 10 bis 18 Uhr und nach Termin |

Die Demo nimmt die Startseite, weil sie am wenigsten verspricht. Wer am Mittwoch offen hat, es
aber nur in den FAQs stehen hat, verliert die Kundschaft, die am Mittwoch Kaffee braucht. Der
Punkt steht deshalb auch im Seitfix-Block.

**Telefonnummer nur im Impressum.** 0316 228683 steht auf buna.at ausschließlich im Impressum.
Weder Startseite noch Kontaktseite nennen sie. Auf der Demo steht sie im Kopfbereich als
Tippziel, im Kontaktblock, in der Fußzeile und in der Handy-Leiste.

**Kontaktseite ohne Kontaktdaten.** buna.at/kontakt/ enthält ein Formular mit Name, E-Mail,
Telefon und Nachricht. Keine Adresse, keine Telefonnummer, keine Öffnungszeiten. Wer über
Google auf die Kontaktseite kommt, findet dort nicht heraus, wo der Laden ist.

**Instagram.** Der Auftrag nennt @bunakaffee. Auf buna.at ist kein Instagram-Profil verlinkt
und der Name taucht im Quelltext keiner der geprüften Seiten auf. Deshalb steht kein
Social-Media-Verweis auf der Demoseite. Wenn das Profil stimmt, kann es in einer Minute in die
Fußzeile.

**BackCup.** Der Auftrag nennt den Mehrweg-Pfandbecher als belegt. Im Zero-Waste-Beitrag stehen
die Kinto To-Go-Becher und die Thermosflaschen, BackCup wird auf keiner Seite von buna.at
erwähnt. Auf dem Foto `laden.webp` sind allerdings weiße Becher mit dem Aufdruck zu sehen.
Auf der Seite steht deshalb nur, was auch geschrieben steht.

**Packungsgrößen 100 g, 250 g, 1000 g.** Diese drei stammen aus dem Auftrag. Da im Shop kein
Kaffeeprodukt mehr steht, konnte ich sie nicht an der Quelle gegenprüfen. Sie sind die
Grundlage der drei Mengenknöpfe im Bestellblock und gehören vor dem Versand bestätigt.

**Storno sieben Tage vorher, 50 Prozent.** Ebenfalls aus dem Auftrag. Auf den Produktseiten
und in den FAQs habe ich dazu nichts gefunden. Steht als einzelner Satz unter den
Workshop-Karten und gehört bestätigt.

**Zwanzig Jahre oder über zwanzig Jahre Erfahrung.** buna.at/about/ schreibt "20 Jahre an
Erfahrung", buna.at/business/ schreibt "über zwanzig Jahren Beschäftigung mit Kaffee" und
"fast fünfzehn Jahren Selbstständigkeit". Weil die Zahlen nicht zusammenpassen und ohne
Bezugsjahr laufend altern, steht auf der Demoseite keine davon.

**Warenkorb.** Rechnet mit echten Preisen für Kaffee, Zubehör und Workshops, weil alle drei
heute mit Preis online stehen. Nichts davon ist geschätzt oder gerundet, die Kaffeepreise
stammen aus den Variationsdaten der Produktseiten.

---

## 4. Gemessene Werte

Gemessen im Browser am gerenderten Dokument, nicht gerechnet.

### Größte Überschrift

| Fensterbreite | Schriftgröße h1 | Anteil an der Fensterbreite | Faktor zum Fließtext (17px) |
|---|---|---|---|
| 1440 px | **108,0 px** | **7,50 Prozent** | **6,35** |
| 768 px | 57,6 px | 7,50 Prozent | 3,39 |
| 390 px | 48,0 px | 12,31 Prozent | 2,82 |
| 360 px | 48,0 px | 13,33 Prozent | 2,82 |

Zielwert war 5 bis 8 Prozent bei 1440 Pixel und mindestens Faktor 5. Beides erreicht.
Die `clamp()`-Obergrenze liegt bei 9rem, also 144 Pixel, und schneidet den Wert bei 1440 nicht ab.

### Kopfbereich am Handy

| Fensterbreite | Höhe Kopfbereich | Betriebsname beginnt bei |
|---|---|---|
| 390 px | 115 px | 355 px |
| 360 px | 115 px | 321 px |

Grenzwerte waren 200 Pixel Kopfhöhe und 400 Pixel für den Namen. Beide eingehalten. Die
Navigation scrollt unter 640 Pixel waagrecht in einer Zeile, der letzte sichtbare Punkt ist am
rechten Rand angeschnitten. Kein Verlauf als Verblassen.

### Seitengewicht

| Teil | Größe |
|---|---|
| Teil | Größe |
|---|---|
| index.html mit CSS und JavaScript | 64,0 KB |
| warenkorb.html mit CSS und JavaScript | 40,0 KB |
| vierzehn Bilder, WebP | 474,4 KB |
| drei Schriftschnitte, woff2 | 41,2 KB |
| **gesamt** | **626,8 KB** |

Größte Einzeldatei ist das Hero-Bild mit 90,2 KB. Zielwert war unter 1 MB.
Die drei Kaffeefotos wiegen zusammen 86,8 KB.

### Schmalspalten-Prüfung

Der Prüfbefehl aus dem dritten Prompt liefert auf beiden Seiten bei 1440 und bei 390 Pixel
kein Ergebnis. Beim ersten Durchgang schlug er an: das Warenraster stand am Handy zweispaltig,
dadurch waren die vier Produktbeschreibungen 125 Pixel breit. Das Raster ist jetzt unter
640 Pixel einspaltig, ab 640 zweispaltig, ab 900 vierspaltig. Das Kaffeeraster hat ab 900
Pixel drei Spalten.

### Kontrast

Geprüft wurde auf beiden Seiten jedes Element, das eigenen Text enthält, mit der tatsächlich
gerenderten Vorder- und Hintergrundfarbe. Ergebnis: kein einziger Mangel.

Der große Preis im Seitfix-Block, jetzt 2500 Euro, liegt bei **15,49:1**, weiß auf `#242426`.
Er trägt kein inline gesetztes `style`, das eine spätere Korrektur überschreiben könnte.
Das war beim Thorbauer der Fehler.

Drei Werte mussten nachgebessert werden:

* `--farbe-akzent` von `#c4533a` auf `#b2462e`. Das Original von buna.at erreicht auf der
  hellen Fläche `#f7f7f9` nur 4,22:1, die neue Farbe 5,15:1.
* gedämpfter Text auf der gelben Fläche von `#5f5850` auf `#584200`, von 4,18:1 auf 5,71:1.
* die großen Ziffern 01 bis 03 im Firmenkundenblock von `#e0dad2` auf `#9c8368`,
  von 1,30:1 auf 3,35:1.

### Weitere Prüfungen

* kein horizontales Scrollen bei 360, 390, 768 und 1440 Pixel
* genau ein `h1`, Überschriftenhierarchie ohne Sprünge
* alle Bilder mit `alt`, `width` und `height`
* kein toter Link auf der ganzen Seite
* kein `alert()`, keine JavaScript-Fehler in der Konsole
* kein Aufruf an einen fremden Server, alle Anfragen gehen an den eigenen Ordner
* kein Emoji, kein Pfeilzeichen, kein Geviert- oder Halbgeviertstrich
* das einzige Ausrufezeichen steht in der wörtlich zitierten Chemex-Beschreibung
* sieben inaktive Punkte auf der Startseite, drei auf der Warenkorbseite, alle mit
  `tabindex="0"` beziehungsweise als `button` und alle mit eigenem `data-hinweis`
* `:focus-visible` überall sichtbar, Tastaturbedienung auf beiden Seiten vollständig
* Warenkorb geprüft: Menge plus und minus, Entfernen, Leerzustand, Summenwechsel und
  Übertrag zwischen den beiden Seiten stimmen. Beispielrechnung 58,90 plus 25,80 plus 8,90
  plus 195,00 ergibt 288,60 Euro

---

## 5. Feiertagstest

`FEIERTAG_REGEL = 'geschlossen'`, `FEIERTAG_TELEFON = '0316 228683'`.
Belegt über den Öffnungszeitenkasten der Startseite, der außer Freitag jeden Tag als
geschlossen führt.

| Zeitpunkt | Ausgabe |
|---|---|
| 26.10.2026, Nationalfeiertag, Montag | "Heute ist Nationalfeiertag, der Laden ist geschlossen" / "Wieder geöffnet am Freitag ab 10:00 Uhr. Nachbestellen geht rund um die Uhr" |
| 01.11.2026, Allerheiligen, Sonntag | "Heute ist Allerheiligen, der Laden ist geschlossen" / "Wieder geöffnet am Freitag ab 10:00 Uhr" |
| 24.12.2026, Heiliger Abend, Donnerstag | "Heute ist Heiliger Abend, der Laden ist geschlossen" / "Wieder geöffnet am Freitag ab 10:00 Uhr" |
| 25.12.2026, Christtag, Freitag | "Heute ist Christtag, der Laden ist geschlossen" / "Wieder geöffnet am Freitag ab 10:00 Uhr" |
| 29.03.2027, Ostermontag | "Heute ist Ostermontag, der Laden ist geschlossen" / "Wieder geöffnet am Freitag ab 10:00 Uhr" |
| 27.05.2027, Fronleichnam, Donnerstag | "Heute ist Fronleichnam, der Laden ist geschlossen" / "Wieder geöffnet am Freitag ab 10:00 Uhr" |
| Freitag 28.08.2026, 08:00 | "Heute ab 10:00 Uhr geöffnet" / "Bis 18:00 Uhr, Joanneumring 16" |
| Freitag 28.08.2026, 11:00 | "Jetzt geöffnet bis 18:00 Uhr" / "Joanneumring 16, 8010 Graz" |
| Freitag 28.08.2026, 19:00 | "Für heute geschlossen" / "Wieder geöffnet am Freitag ab 10:00 Uhr" |
| Mittwoch 26.08.2026, Gegenprobe | "Der Laden ist heute geschlossen" / "Geöffnet am Freitag ab 10:00 Uhr, Beratung nach Vereinbarung" |

**Eine Änderung gegenüber den zehn Wirtshäusern.** `naechsterOffenerTag` sucht dort über neun
Tage. Das reicht bei einem Betrieb mit einem einzigen offenen Wochentag nicht: fällt der
Freitag auf einen Feiertag, liegt der nächste offene Freitag vierzehn Tage später, weil am
25.12.2026 auch der 1.1.2027 ein Feiertag ist. Die Schleife läuft hier deshalb über 60 Tage.
Vorher stand am 24. und 25. Dezember gar kein nächster offener Tag, jetzt steht er korrekt da.
Die Logik ist sonst unverändert, samt Osterrechnung und Kommentaren.

---

## 6. Der Shop-Teil

Der Nachbestell-Block, der in der ersten Fassung unter dem Hero stand, ist entfernt. Er war
die Antwort auf die Annahme, dass es keine Sortendaten gibt. Diese Annahme ist widerlegt,
siehe Abschnitt 0. An seiner Stelle stehen jetzt echte Produktkarten, gebaut wie die
Zubehörkarten, weil das der Aufbau ist, den ein Shopify-Store hat.

**Kaffee, drei Karten**, im selben Aufbau wie die Zubehörkarten: Foto, Name,
Geschmacksnoten, ein kurzer Absatz, Preis für 250 Gramm, Verfügbarkeit, ein Knopf.
Keine Auswahlfelder auf der Karte. Menge, Mahlgrad und Abo sitzen auf der eigenen
Produktseite, die es im fertigen Shop gibt und auf der Demo nicht.

**Zu den Fotos, das ist eine bewusste Abweichung.** buna.at hat kein Foto je Sorte. Als
Produktbild verwenden die echten Produktseiten die farbige Etikettengrafik, also den
Schriftzug Ethiopia, Brazil oder Decaf Colombia auf farbigem Grund. Auf ausdrückliche
Anweisung stehen hier stattdessen Fotos. Alle drei stammen aus derselben Bildstrecke auf
buna.at (`uploads/2020/03/Foto-24.03.20-*.jpg`) und zeigen die echte BUNA Packung, jeweils
anders aufgebaut. Sie zeigen also den richtigen Betrieb und das richtige Produkt, aber nicht
die jeweilige Sorte, weil es solche Fotos nicht gibt. Sobald BUNA Sortenfotos liefert, sind
das drei Dateien in `assets/img/`.

**Zubehör, vier Karten**, unverändert. **Workshops, vier Karten**, unverändert.

**Unter jedem der drei Raster ein Knopf "Alle anzeigen"**, inaktiv, mit `data-hinweis` und
eigenem `role="status"`-Absatz darunter. Das ist derselbe Mechanismus wie in der Navigation,
nur an der Stelle, an der ein Kunde ihn tatsächlich drücken würde. Der Hinweis bei
"Alle Kaffees anzeigen" nennt, was auf der Sortenseite steht: das ganze Sortiment mit
Produzent, Region, Seehöhe und Aufbereitung, und dort auch die Abo-Einrichtung.

**Der Warenkorb ist eine eigene Seite**, `warenkorb.html`. Positionen mit Mengensteuerung
plus und minus, Entfernen je Position, eine Abo-Marke bei Abo-Positionen, Zwischensumme,
Versandzeile, Gesamtsumme, die belegten Versandangaben und der einzige inaktive Punkt
"Zur Kasse". Leerer Zustand mit Weg zurück zu den Kaffees. Der Korb überlebt den
Seitenwechsel über `sessionStorage`, ohne Cookie und ohne Server.

**Der E-Mail-Weg ist überall entfernt.** Kein Bestellformular, kein `mailto` für
Bestellungen, auch nicht mehr die Zeile "Bestellungen: walter@buna.at" im Kontaktblock.
Bestellt wird im Shop. Der einzige verbliebene `mailto`-Link ist die Anfrage an Seitfix.

**Der Hero ist vereinfacht.** Statt des mitlaufenden Status steht dort jetzt
"Laden freitags, 10 bis 18 Uhr" und "Bestellen geht rund um die Uhr". Der mitlaufende
Status samt Feiertagslogik ist nicht entfallen, sondern zur Öffnungszeitentabelle im
Abschnitt Laden gewandert, wo er inhaltlich hingehört. Die Logik ist unverändert, die
Testergebnisse in Abschnitt 5 gelten weiter.

## 7. Die Konstanten

Ganz oben im Skriptblock, jede Zahl genau einmal. Sie wird von dort in den Text geschrieben,
im HTML stehen nur leere `span`-Elemente mit einer id.

```js
var PREIS               = 2500;   // Euro einmalig, ohne Umsatzsteuer
var PREIS_BETREUUNG     = 30;     // Euro pro Monat, Seitfix, monatlich kündbar
var PREIS_SHOPIFY       = 32;     // Euro pro Monat an Shopify
var PREIS_SHOPIFY_JAHR  = 24;     // Euro pro Monat an Shopify bei jährlicher Zahlung
var RESERVIERUNG_EMPFAENGER = 'hallo@seitfix.at';  // nach Auftrag: walter@buna.at
var KONTAKT_SEITFIX         = 'hallo@seitfix.at';
```

`PREIS` steht im großen Preisblock und im Hinweistext jedes inaktiven Punkts, auf beiden
Seiten. `PREIS_SHOPIFY` steht zweimal im Shopify-Block, einmal in der ersten Zeile und einmal
im Ehrlich-dazu-Absatz. Geändert wird trotzdem nur die Zeile oben im Skript.

---

## 8. Seitenliste, sieben Seiten

Identisch in der inaktiven Navigation und im Seitfix-Block.

| Seite | Was darauf stünde |
|---|---|
| Kaffee | die einzelnen Kaffees als Produkte, jeder mit eigener Produktseite: Herkunft, Geschmacksnoten, Röstprofil, Preis. Dort werden Menge, Mahlung und Rhythmus gewählt und das Abo eingerichtet und verwaltet |
| Zubehör | alle 52 Artikel, nach Zubereitungsart sortiert und durchsuchbar |
| Maschinen | Espressomaschinen, Vollautomaten und Mühlen, mit Beratung und Vermietung als eigenem Weg |
| Firmenkund:innen | Gastronomie und Handel, Büro und Veranstaltungen, jeweils mit Anfrageformular |
| Blog | die Beiträge zu Brühmethoden, Rezepten und Verkostungen, mit einer Übersicht |
| Nachhaltigkeit | Verpackung, Mehrweg und Zero Waste, mit dem Sticker an sichtbarer Stelle |

Dazu die Startseite, das sind sieben. Für jeden dieser sechs Punkte gibt es bei BUNA Material,
keiner ist erfunden. Der Punkt Kaffee ist der einzige, für den das Material heute nicht online
steht, und genau darum geht es.

---

## 9. Offene Punkte für Ivo

1. **Der Fund aus Abschnitt 0 ist das Verkaufsargument.** Drei Kaffees sind kaufbar und
   unauffindbar. Das ist im Gespräch stärker als jede allgemeine Aussage über den Shop, und
   es ist in dreißig Sekunden vorführbar: Kategorie Kaffee öffnen, leer. Produktadresse
   öffnen, Warenkorb funktioniert.
2. **Preise und Verfügbarkeit ändern sich.** Die drei Kaffees und ihre Preise sind der Stand
   vom 21. August 2026. Vor dem Versand kurz gegenprüfen, ein Röster wechselt das Sortiment.
   Die Werte stehen im HTML je Karte in `data-preis`.
3. **Workshop-Preise.** Ich habe die belegten Preise genommen statt "Preis auf Anfrage",
   weil sie heute auf buna.at stehen. Bitte gegenlesen.
4. **Stornoregel** stammt aus dem Auftrag und ließ sich nicht an der Quelle prüfen.
5. **Instagram** ist auf buna.at nicht verlinkt und steht deshalb nicht auf der Seite.
6. **Zwei Dateien statt einer.** `warenkorb.html` kam auf Anweisung dazu. Falls die Demo
   doch einseitig sein soll, wandert der Warenkorbteil zurück in einen Abschnitt der
   Startseite, der Rest bleibt.

---

## 10. Umbau zum Onlineshop, 21. August 2026

`index.html` ist von Grund auf neu gebaut. Fakten, Bilder und Belege sind unverändert
übernommen, es ging nur um Aufbau und Gestaltung. Der alte Stand liegt als Sicherung unter
`/tmp/buna-index-alt.html`.

**Anmerkung zur Vorgabe.** Die genannte Referenzdatei `_system/shop-referenz.html` gibt es
nicht. Der Ordner `_system/` enthält nur noch `sushi-mori-market/NOTIZEN.md`. Auch
`sushi-mori-market/index.html` ist nicht die beschriebene Referenz: kein `.raster`, keine
`.lade`, dieselbe Broschürenstruktur wie der alte BUNA-Stand. Gebaut ist deshalb streng nach
der schriftlichen Vorgabe, die die Reihenfolge, die Farben, das Abstandsraster und beide
CSS-Blöcke wörtlich enthält.

### Was sich geändert hat

Die Ware liegt jetzt in zwei zusammenhängenden Rastern statt verstreut über die Seite.
Zwischen Kopf und erstem Produkt liegen genau zwei Abschnitte, Hero und Kategoriekacheln.
Die Reihenfolge ist: Demoleiste, Hinweisleiste, Kopf, Hero, Kategoriekacheln, Kaffee mit
Nachbestell-Block, Zubehör, Workshops, ein Band, Fuß, Seitfix-Block.

Der Seitfix-Block war mit rund 7000 Zeichen der längste Abschnitt der Seite. Er hat jetzt
**1232 Zeichen** und steht nach dem Fuß.

Der Warenkorb ist eine Lade, die von rechts hereinfährt. `warenkorb.html` bleibt bestehen und
ist auf denselben Stil und dasselbe Korbformat gebracht, im Alltag ersetzt die Lade sie.
Ein Element mit `id="warenkorb"` gibt es nicht mehr.

Dunkel sind genau drei Dinge: die Hinweisleiste, der Hero über dem Bild und der
Seitfix-Block. Alles dazwischen ist hell.

### Gemessene Werte

| Prüfpunkt | Ergebnis |
|---|---|
| 1. Waagrechtes Scrollen bei 390 und 1440 | keines, `scrollWidth` gleich `innerWidth` |
| 2. Produktkacheln einer Reihe gleich hoch | Kaffee 492/492/492 px, Zubehör 456/456/456/456 px bei 1440. Bei 390: Kaffee 367/367/367, Zubehör 331/331/331/331 |
| 2b. Knöpfe auf einer Linie | Kaffee alle bei 1693 px, Zubehör alle bei 2902 px |
| 3. Produktbild angeschnitten | keines, alle mit `object-fit: contain` |
| 4. `grep -c 'id="warenkorb"' index.html` | 0 |
| 5. Seitfix-Block | 1232 Zeichen, Grenze 2500 |
| 6. Abschnitte zwischen Kopf und erstem Produkt | 2 |
| 7. Lade schließt über Kreuz, Schatten, Escape | alle drei geprüft, jeweils `data-offen` entfernt |
| 8. Öffnungszeiten und Feiertage | unverändert, zehn Zeitpunkte geprüft, siehe unten |
| 9. `alert()`, Emojis, Gedankenstriche, Floskeln, Duzen | je 0 Treffer in beiden Dateien |
| 10. Seitengewicht | 607,1 KB gesamt |

Weitere Messwerte: Kopfbereich 69 px hoch, Hero 62 Prozent der Fensterhöhe, größte
Überschrift 108 px bei 1440 Pixel Fensterbreite, das sind 7,5 Prozent. Schmalspalten-Prüfung
auf beiden Seiten bei 390 und 1440 ohne Treffer. Kontrastprüfung über jedes Element mit
eigenem Text auf beiden Seiten: kein Mangel.

**Ein echter Fehler dabei gefunden und behoben:** `.seitfix a` hat die Farbe von
`.knopf-seitfix` überschrieben, weil es eine Stelle höher in der Spezifität liegt. Der Knopf
"Unverbindlich anfragen" stand dadurch in Türkis auf Türkis, Kontrast 1,00 zu 1. Korrigiert
über `.seitfix .knopf-seitfix`.

### Feiertagstest, zehn Zeitpunkte

`FEIERTAG_REGEL = 'geschlossen'`, Zeiten stehen als `ZEITEN_ROH` oben im Skript.

| Zeitpunkt | Ausgabe |
|---|---|
| 26.10.2026, Nationalfeiertag | "Heute ist Nationalfeiertag, das Geschäft ist geschlossen" |
| 01.11.2026, Allerheiligen | "Heute ist Allerheiligen, das Geschäft ist geschlossen" |
| 24.12.2026, Heiliger Abend | "Heute ist Heiliger Abend, das Geschäft ist geschlossen" |
| 25.12.2026, Christtag, ein Freitag | "Heute ist Christtag, das Geschäft ist geschlossen" |
| 29.03.2027, Ostermontag | "Heute ist Ostermontag, das Geschäft ist geschlossen" |
| 27.05.2027, Fronleichnam | "Heute ist Fronleichnam, das Geschäft ist geschlossen" |
| Freitag 28.08.2026, 08:00 | "Heute ab 10:00 Uhr geöffnet" |
| Freitag 28.08.2026, 11:00 | "Jetzt geöffnet bis 18:00 Uhr" |
| Freitag 28.08.2026, 19:00 | "Für heute geschlossen" |
| Mittwoch 26.08.2026, 11:00 | "Heute geschlossen" |

An allen Feiertagen wird zusätzlich der nächste offene Tag genannt, Feiertage werden dabei
übersprungen. Die Suchschleife läuft über 60 Tage, weil der Laden nur einen offenen Tag pro
Woche hat.

### Abweichungen, die Ivo kennen sollte

1. **Workshop-Preise stehen jetzt wieder als "Preis auf Anfrage"**, so wie in der Vorgabe
   verlangt. Belegt und live auf buna.at sind 39,00 / 89,00 / 129,00 / 195,00 Euro. Wenn die
   echten Preise hinein sollen, sind es vier Zeilen mit `class="preis"`.
2. **Der Nachbestell-Block nennt 100 g, 250 g und 1000 g**, wie in der Vorgabe. Auf den drei
   live stehenden Produktseiten gibt es nur 250 und 1000 Gramm.
3. **Die Suche im Kopf funktioniert wirklich**, sie filtert die Kacheln und Workshop-Karten
   nach Namen. Ein Lupensymbol, das nichts tut, wäre der unsauberere Weg gewesen.
4. **Keine Mobil-Aktionsleiste am unteren Rand.** Die Reihenfolge in der Vorgabe sieht sie
   nicht vor, und der klebende Kopf trägt Warenkorb und Suche ohnehin mit.
5. **Der Nachbestell-Block legt in die Lade**, als Position mit "Preis auf Anfrage". So bleibt
   der Block eine Shop-Handlung und es kommt kein Mailweg zurück.

### Nachschärfung nach dem ersten Ansehen

**Der Nachbestell-Block ist entfernt.** Ersatzlos, samt seinem CSS und seinem Skriptteil.
Er hatte mit den drei echten Kaffeekacheln darüber keine Aufgabe mehr. Der Satz, dass
Sortennamen bewusst nicht erfunden werden, ist damit auch weg, das Argument steht aber
weiterhin im Seitfix-Block: dort ist genannt, dass die drei Kaffees heute so in Ihrem Shop
liegen und nichts dazuerfunden wurde.

**Die Workshop-Karten haben Bilder bekommen.** Sie waren vorher rein typografisch und mit dem
starren Seitenverhältnis von 3 zu 2 überwiegend leer. Jetzt sitzt oben ein Bild im Verhältnis
3 zu 2, darunter Titel, Dauer, Beschreibung, Preis und Knopf. Die Karte selbst wächst mit dem
Inhalt, das Verhältnis liegt auf dem Bild.

Die Dauer ist neu auf den Karten und ist belegt: sie steht als Produkteigenschaft auf den
Workshop-Seiten von buna.at. Kaffeeverkostung 2 Stunden, Filterkaffee 3 Stunden, Espresso und
Latte Art je 4 Stunden.

Zwei Bilder sind dafür neu aus buna.at aufbereitet worden, beide aus der Bildstrecke von Peter
Oswald: `workshop-latteart.webp` aus `2020/03/BUNA@tasty_Peter-Oswald-021.jpg` und
`workshop-milchschaum.webp` aus `2020/03/BUNA@tasty_Peter-Oswald-038.jpg`, beide auf 3 zu 2
beschnitten. Damit kein Bild doppelt auftaucht, wurden zwei bestehende umgehängt: die
Kategoriekachel Workshops zeigt jetzt das Latte-Art-Bild, das Band zeigt `siebtraeger.webp`.

`women-in-coffee.webp` wird derzeit von keiner Seite verwendet. Ich habe die Datei bewusst
liegen gelassen, weil sie für einen späteren Women-in-Coffee-Abschnitt gebraucht würde.

### Messwerte nach der Nachschärfung

| Prüfpunkt | 1440 | 768 | 390 |
|---|---|---|---|
| Waagrechtes Scrollen | keines | keines | keines |
| Kaffeekacheln, Höhe | 492/492/492 | 425/425/425 | 367/367/367 |
| Kaffeekacheln, Knopfoberkante | alle 1693 | alle 1576 | Reihe 1 beide 2163 |
| Zubehörkacheln, Höhe | 456 mal vier | 389 mal vier | 331 mal vier |
| Workshopkarten, Höhe je Reihe | 677 mal vier | 530 mal vier | einspaltig |
| Produktbild angeschnitten | keines | keines | keines |
| Abschnitte vor dem ersten Produkt | 2 | 2 | 2 |
| Kontrastmängel | keine | keine | keine |
| Schmalspalten | keine | keine | keine |
| Kopfbereich | 69 px | 69 px | 69 px |
| Hero, Anteil Fensterhöhe | 62 Prozent | 62 Prozent | 62 Prozent |
| Größte Überschrift | 108 px | 57,6 px | 48 px |

Lade erneut geprüft: öffnet beim Hineinlegen, schließt über Kreuz, Schatten und Escape.
Beispielrechnung zwei mal Uraga plus AeroPress ergibt 39,90 Euro, die Workshop-Position mit
"Preis auf Anfrage" bleibt korrekt aus der Summe heraus. Keine JavaScript-Fehler.

Seitengewicht jetzt **680,3 KB**, davon `index.html` 52,7 KB und `warenkorb.html` 28,6 KB.
