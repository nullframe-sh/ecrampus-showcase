# Browser-Vorschau 2.3.0

Quelle: `release/2.3.0`, Commit `492068c1212760b70edf774e25b44741d01332a0`.

Dies qualifiziert den Browser-Export. Die Desktop-Veröffentlichung von 2.3.0 ist damit nicht abgeschlossen.

Im Chromium-Browser am lokalen, eigenständigen HTML-Export geprüft:

- Alle neun Hauptansichten über die sichtbare Navigation geöffnet: Heute, Kursmaterial, Lernen, Prüfungen, Berichtsheft, Lernzeitkonto, Posteingang, Klasse und ChatGPT.
- Berichtsheft aus der Wochenliste im Editor geöffnet.
- Einstellungen geöffnet und geschlossen.
- Simulierte Anmeldung aus dem abgemeldeten Zustand bis zur Tagesübersicht.
- Helle und dunkle Darstellung, 1440 × 960 und kompakte Darstellung bei 900 × 740.
- Keine JavaScript- oder Konsolenfehler und keine HTTP-/HTTPS-Anfragen während dieses Durchlaufs.
- Aktuelle Screenshots unter `docs/screenshots/`.

simpleclub und Lernzeitkonto zeigen einen erklärenden Hinweis; native Webansichten sind im Browser-Export nicht enthalten. Downloads, Speichern und weitere Backend-Funktionen bleiben fiktive Demo-Aktionen. Die Testdaten werden beim Neuladen zurückgesetzt.

Der Export enthält keine Source Maps. `demo-version.json` hält den Quell-Commit und den SHA-256-Wert der HTML-Datei fest. Die Content Security Policy blockiert Netzwerkverbindungen.
