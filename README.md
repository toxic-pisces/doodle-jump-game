# 🎮 Doodle Jump Game

Ein modernes, browserbasiertes Doodle Jump-ähnliches Spiel, entwickelt mit HTML5 Canvas und Vanilla JavaScript.

## ✨ Features

- **Endloses Gameplay**: Springe so hoch wie möglich und sammle Punkte
- **4 auswählbare Skins**: Rot, Schwarz, Gelb und Blau
- **Collectibles**: Sammle goldene Sterne für einen Power-Boost
- **Touch-Steuerung**: Vollständig optimiert für mobile Geräte
- **Responsive Design**: Funktioniert auf Desktop und Mobilgeräten
- **Smooth Animations**: Flüssige Animationen und visuelle Effekte
- **Score-System**: Verfolge deinen Highscore

## 🎯 Gameplay

- Springe auf Plattformen, um nach oben zu gelangen
- Sammle goldene Sterne für einen extra Boost
- Weiche dem Fallen aus - wenn du unten herausfällst, ist das Spiel vorbei!
- Je höher du kommst, desto mehr Punkte sammelst du

## 🎮 Steuerung

### Desktop:
- **← / →** oder **A / D**: Bewege dich links/rechts
- **Leertaste**: Spiel starten/neustarten

### Mobile:
- **Touch linke Bildschirmhälfte**: Nach links bewegen
- **Touch rechte Bildschirmhälfte**: Nach rechts bewegen

## 🚀 Installation & Nutzung

### Einfache Methode (Python):

1. Repository klonen:
```bash
git clone https://github.com/DEIN-USERNAME/doodle-jump-game.git
cd doodle-jump-game
```

2. Python HTTP Server starten:
```bash
python3 -m http.server 8080
```

3. Im Browser öffnen:
```
http://localhost:8080
```

### Alternative Methoden:

- Nutze einen beliebigen lokalen Webserver (z.B. Live Server Extension in VS Code)
- Öffne einfach die `index.html` direkt im Browser (eingeschränkte Funktionalität möglich)

## 📁 Projektstruktur

```
projekt1/
├── index.html              # Haupt-HTML-Datei
├── css/
│   └── style.css          # Alle Styles
├── js/
│   ├── main.js            # Entry Point
│   ├── Game.js            # Haupt-Game-Engine
│   ├── config.js          # Game-Konfiguration
│   ├── skins.js           # Skin-Definitionen
│   ├── classes/
│   │   ├── Player.js      # Spieler-Logik
│   │   ├── Platform.js    # Plattform-Logik
│   │   └── Collectible.js # Collectible-Logik
│   └── utils/
│       └── input.js       # Input-Management (Keyboard + Touch)
└── README.md
```

## 🛠️ Technologie-Stack

- **HTML5 Canvas**: Für Rendering und Grafiken
- **ES6 JavaScript Modules**: Modulare Code-Struktur
- **CSS3**: Styling und Animationen
- **Vanilla JavaScript**: Keine Frameworks oder Libraries

## 🎨 Architektur-Highlights

- **Objektorientiertes Design**: Saubere Klassen-Struktur
- **Separation of Concerns**: CSS, HTML und JS getrennt
- **Konfigurierbar**: Zentrale Config-Datei für Game-Parameter
- **Erweiterbar**: Einfach neue Skins und Features hinzufügen

## 🔧 Konfiguration

Passe das Spiel in [`js/config.js`](js/config.js) an:

```javascript
export const CONFIG = {
    CANVAS_WIDTH: 400,
    CANVAS_HEIGHT: 600,
    PLAYER: {
        GRAVITY: 0.4,
        JUMP_POWER: -12,
        MOVE_SPEED: 5,
        // ...
    },
    COLLECTIBLE: {
        SPAWN_CHANCE: 0.25,
        BOOST_POWER: -20
    }
};
```

## 📱 Mobile-Optimierung

Das Spiel ist vollständig für mobile Geräte optimiert:
- Touch-Events für Steuerung
- Visuelle Indikatoren für Touch-Bereiche
- Verhindert ungewolltes Scrollen
- Responsive Layout

## 🎯 Geplante Features

- [ ] Verschiedene Plattform-Typen (beweglich, breakable)
- [ ] Power-Ups (Jetpack, Schutzschild, etc.)
- [ ] Sound-Effekte und Musik
- [ ] Highscore-Tabelle mit LocalStorage
- [ ] Mehrere Schwierigkeitsgrade
- [ ] Achievements System

## 📝 Lizenz

Dieses Projekt steht unter der MIT-Lizenz - siehe [LICENSE](LICENSE) Datei für Details.

## 👨‍💻 Entwickler

Entwickelt mit Claude Code und viel Spaß!

## 🙏 Danksagungen

- Inspiriert vom originalen Doodle Jump Spiel
- Entwickelt mit [Claude Code](https://claude.com/claude-code)
