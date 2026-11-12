# Browserdemo auf Basis von eCrampus 2.7.1

Geprüft am 12.11.2026 in Chromium. Die Browserdemo verwendet den aktuellen Renderer auf Basis des Desktop-Tags `v2.7.1` und die erfundenen Daten der UI-Testsuite.

- Bei 1440, 900 und 375 CSS-Pixeln öffnet sich die Startansicht ohne horizontalen Überlauf. Die Demo rendert immer dunkel, auch bei hellem Betriebssystem und einer früher gespeicherten Auswahl von Hell oder System.
- Unter Einstellungen → Darstellung steht die Schriftgröße zur Auswahl. Die Begrüßung und die Überschrift im Posteingang verwenden die Markenfarbe `#ff5a1f`.
- Der Export besteht aus einer HTML-Datei. Bei den geprüften Abläufen gab es keine weiteren HTTP-Anfragen und keine JavaScript- oder CSP-Fehler. Die Prüfsumme und der Quell-Commit stehen in `demo-version.json`.
- Anmeldung und externe Kontoaktionen sind simuliert. Windows-Fensterfunktionen und eingebettete native Webansichten gehören zur Desktop-App.
