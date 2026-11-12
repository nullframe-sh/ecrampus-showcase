# eCrampus · Browser-Demo

Interaktive Browserdemo auf Basis von **eCrampus 2.7.1**, ausschließlich mit erfundenen Beispieldaten.

**[Live-Demo öffnen](https://nullframe-sh.github.io/ecrampus-showcase/)**

![eCrampus, Startseite Heute im dunklen Design](docs/screenshots/heute-dunkel.png)

## Was eCrampus ist

eCrampus ist ein Desktop-Client für den Unterrichtsalltag in meiner Umschulung zum Fachinformatiker für Anwendungsentwicklung bei der WBS GRUPPE. Kursunterlagen, Berichtsheft, Prüfungsergebnisse und Posteingang der Lernplattform stehen in einer Anwendung, Neuigkeiten meldet sie von selbst. eCrampus ist mein eigenständiges Projekt und kein offizielles Angebot der WBS.

Laut integriertem Online-Zähler nutzen 10–12 der 22 Teilnehmenden meines Kurses eCrampus aktiv (Stand Oktober 2026).

## Stand dieser Demo

| | |
| --- | --- |
| Quelle | Vorschau auf Basis der Windows-Version 2.7.1 (Tag `v2.7.1`) |
| Oberfläche | Original-Renderer der Desktop-Anwendung (React), als eine statische HTML-Datei exportiert |
| Daten | Erfundene Testdaten der UI-Testsuite; Demo-Datum 23.09.2026, Klasse „US_IT-99.9“ |
| Anmeldung | Simuliert; es werden keine Zugangsdaten abgefragt oder verarbeitet |
| Darstellung | Die Demo verwendet immer das dunkle Design. Unter Einstellungen → Darstellung kannst du die Schriftgröße ändern. |

**Grenzen:** simpleclub, das Lernzeitkonto, Outlook Web und der Technik-Chatbot nutzen in der Desktop-Anwendung eigene Webansichten. Die Demo simuliert diese Abläufe. Downloads, Speichern und Senden sind Demo-Aktionen. Beim Neuladen beginnt alles von vorn. Der Online-Zähler ist ausgeblendet.

## Bereiche

| Bereich | Inhalt | Bild |
| --- | --- | --- |
| Heute | Tagesüberblick aus bereits geladenen Daten: Unterricht, Als Nächstes, Neu, Kalender, Lernzeit | [dunkel](docs/screenshots/heute-dunkel.png) · [375 px](docs/screenshots/heute-375.png) |
| Kursmaterial | Kurse und Ordner, Dateitabelle, Details und Vorschau | [dunkel](docs/screenshots/kursmaterial-dunkel.png) |
| Lernen | Einstieg in simpleclub mit „Kursmodule hinzufügen“ | [dunkel](docs/screenshots/lernen-dunkel.png) |
| Prüfungen | Anstehende und absolvierte Prüfungen mit Ergebnissen | [dunkel](docs/screenshots/pruefungen-dunkel.png) |
| Berichtsheft | Wochen mit Stunden und Vorbefüllung; eigene Einträge bleiben unangetastet | [dunkel](docs/screenshots/berichtsheft-dunkel.png) |
| Posteingang | Nachrichten der Lernplattform | [dunkel](docs/screenshots/posteingang-dunkel.png) |
| Klasse | Mitglieder, Informationen und Feedback | [dunkel](docs/screenshots/klasse-dunkel.png) |
| ChatGPT | Chat der Lernplattform mit Fragevorschlägen zum aktuellen Modul | [dunkel](docs/screenshots/chatgpt-dunkel.png) |
| Einstellungen | Eigene Seite für Darstellung, Konto und Daten | [dunkel](docs/screenshots/einstellungen-dunkel.png) |

Hilfe gibt es über F1 oder das Fragezeichen oben rechts, dazu einen geführten Rundgang.

## Datenschutz und Sicherheit

- Ausschließlich erfundene Namen, Kurse, Nachrichten und Noten. Die Versionshinweise der App nennen im Original die echte Kursgruppe; im Export ist sie durch die Testklasse ersetzt.
- Die Seite lädt nichts nach: Skripte, Stile, Bilder und Schriften sind eingebettet, und die Content Security Policy verbietet Netzwerkverbindungen (`connect-src 'none'`).
- Kein Electron-Hauptprozess, keine Source Maps. Der Quellcode der Desktop-Anwendung ist nicht öffentlich.

## Prüfung

Geprüft am 12.11.2026 in Chromium: das dunkle Design bei hellem und dunklem Betriebssystem, die Einstellungen und die Startansicht auf Desktop und Mobilgeräten. Einzelheiten stehen in [docs/validation-2.7.1.md](docs/validation-2.7.1.md). Quell-Commit und SHA-256 des Exports stehen in `demo-version.json`.

## Technik

| | |
| --- | --- |
| Desktop-Anwendung | Electron, React, TypeScript, electron-vite, Jest, electron-builder, electron-updater |
| Demo | Vite-Build des Renderers mit den Mock-Daten der UI-Testsuite, eingebettet in `index.html` |

## Meine Arbeit an eCrampus

Ich lege fest, welche Funktionen es gibt und wie sie sich bedienen, und arbeite Rückmeldungen aus dem Kurs ein. Fehler verfolge ich über Konsole, Logdateien und Entwicklerwerkzeuge bis in den Code. Den Code erstelle ich mit KI-Unterstützung und prüfe jede neue Version mit automatisierten Tests sowie einem Installations- und Upgrade-Test, bevor ich sie über meinen eigenen Update-Server veröffentliche.

## Lokal öffnen

`index.html` herunterladen und im Browser öffnen. Ein Webserver ist nicht nötig.

## Export neu erzeugen

Mit einem sauberen privaten Checkout am Commit `26639cc` und installierten Abhängigkeiten:

```sh
node tools/build-demo.mjs /pfad/zum/privaten/checkout
```

Danach Navigation, Screenshots und Netzwerkfreiheit erneut im Browser prüfen. Der Stand 2.3.0 bleibt über den Tag `archive/showcase-2.3.0` wiederherstellbar.

## Kontakt

**Philipp Schott**, Umschulung zum Fachinformatiker für Anwendungsentwicklung  
[nullframe.sh](https://nullframe.sh) · [phsc@nullframe.sh](mailto:phsc@nullframe.sh) · [github.com/nullframe-sh](https://github.com/nullframe-sh)
