# Prüfung der Browser-Demo 2.5.0

Quelle: Tag `v2.5.0`, Commit `6c6621490afdb807955afef86631f2a9db4ebe4a` (veröffentlicht am 20.10.2026). Export mit `tools/build-demo.mjs`, geprüft am 28.10.2026 mit Playwright in Chromium, Seite direkt aus der Datei geöffnet.

## Ablauf

- Alle zehn Bereiche über die Seitenleiste geöffnet: Heute, Kursmaterial, Lernen, Prüfungen, Berichtsheft, Lernzeitkonto, Posteingang, Klasse, ChatGPT, Einstellungen.
- Je einmal mit hellem und dunklem Farbschema des Systems, bei 1440 × 900 Pixeln.
- Startseite zusätzlich bei 900 × 740 und 375 × 812 Pixeln.

## Ergebnis

| Prüfung | Ergebnis |
| --- | --- |
| Bereiche geöffnet | 20 von 20 (10 Bereiche × 2 Farbschemata) |
| Fehler in der Konsole oder Seitenfehler | keine |
| Anfragen außerhalb der Datei (http, https) | keine |
| Seitliches Überlaufen bei 900 und 375 Pixeln | 0 Pixel |

## Inhaltsprüfung des Exports

- Keine Source Maps, keine Pfade des Entwicklungsrechners, keine Zugangsdaten oder Tokens.
- Die echte Kursgruppe aus den Versionshinweisen der App ist durch die Testklasse „US_IT-99.9“ ersetzt.
- Alle Bilder und Hilfsskripte sind als `data:`-Adressen eingebettet; die Content Security Policy erlaubt keine Netzwerkverbindungen.
- Der Online-Zähler ist per Stylesheet ausgeblendet.

## Grenzen

simpleclub und das Lernzeitkonto zeigen einen erklärenden Hinweis statt der eingebetteten Webansicht. Downloads, Speichern und Senden sind Demo-Aktionen; beim Neuladen wird der Testbestand zurückgesetzt. Unveröffentlichte Funktionen späterer Entwicklungsstände sind nicht enthalten.
