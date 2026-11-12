# Browserdemo 2.7.1

Geprüft am 12.11.2026. Die Browserdemo verwendet den Renderer des Desktop-Tags `v2.7.1` und die erfundenen Daten der UI-Testsuite.

- Die Startansicht öffnete in Chromium bei 1440, 900 und 375 CSS-Pixeln ohne horizontalen Seitenüberlauf.
- Alle Seitenleistenbereiche waren bei 1440 Pixeln in Hell und Dunkel erreichbar. Die fünf Bereichsüberschriften verwenden in beiden Designs die Markenfarbe `#ff5a1f`. Im hellen Browserdesign ergänzt eine dünne dunkle Kontur die orange Füllung.
- Der Export ist eine eigenständige HTML-Datei. Bei den geprüften Abläufen gab es keine zusätzlichen HTTP-Anfragen und keine JavaScript- oder CSP-Fehler. Der statische Export enthält keine Source Maps, absoluten Entwicklerpfade oder realen E-Mail-Domänen. Die SHA-256-Prüfsumme steht in `demo-version.json`.
- Anmeldungen und externe Kontoaktionen sind simuliert. Windows-Fensterfunktionen und eingebettete native Webansichten sind Funktionen der Desktop-App.
