# CLIfficiency 🍅

[![npm version](https://badge.fury.io/js/clifficiency.svg)](https://badge.fury.io/js/clifficiency)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

A beautiful, feature-rich CLI Pomodoro timer with customizable presets, desktop notifications, and an elegant progress bar interface. Boost your productivity with the proven Pomodoro Technique right from your terminal.

## ✨ Features

- 🎯 **Classic Pomodoro Technique**: Traditional 25/5/15 minute work/break cycles
- 🔧 **Fully Customizable**: Adjust work, short break, long break durations and session counts
- 📋 **Smart Presets**: Quick-start with `fast`, `focus`, or `default` configurations
- 🎨 **Beautiful Progress Bar**: Colorful, animated progress indicator with time remaining
- 🔔 **Desktop Notifications**: Native OS notifications with custom sounds and images
- 💡 **Session Tracking**: Visual session counter to track your productivity streaks
- 🎵 **Custom Sound Alerts**: Distinctive notification sounds for phase transitions
- 🖥️ **Cross-Platform**: Works on macOS, Windows, and Linux
- ⚡ **Lightweight**: Fast startup and minimal resource usage

## 🚀 Quick Start

### Installation

Install globally via npm:

```bash
npm install -g clifficiency
```

### Basic Usage

Start a default Pomodoro session:

```bash
cliff
```

That's it! CLIfficiency will start a 25-minute work session, followed by 5-minute breaks, with a 15-minute long break every 4 sessions.

## 📖 Usage Guide

### Command Line Options

```bash
cliff [options]
```

#### Options

| Option | Short | Description | Example |
|--------|-------|-------------|---------|
| `--work <minutes>` | `-w` | Set work duration in minutes | `cliff -w 30` |
| `--short <minutes>` | `-s` | Set short break duration in minutes | `cliff -s 10` |
| `--long <minutes>` | `-l` | Set long break duration in minutes | `cliff -l 20` |
| `--sessions <number>` | `-n` | Sessions before long break | `cliff -n 3` |
| `--preset <name>` | `-p` | Use a predefined preset | `cliff -p focus` |
| `--version` | `-V` | Show version number | `cliff --version` |
| `--help` | `-h` | Display help information | `cliff --help` |

### Presets

CLIfficiency comes with three built-in presets:

#### Default Preset
```bash
cliff -p default
# or simply
cliff
```
- **Work**: 25 minutes
- **Short Break**: 5 minutes  
- **Long Break**: 15 minutes
- **Sessions**: 4 (classic Pomodoro)

#### Focus Preset
```bash
cliff -p focus
```
- **Work**: 50 minutes
- **Short Break**: 10 minutes
- **Long Break**: 30 minutes  
- **Sessions**: 4 (deep work sessions)

#### Fast Preset
```bash
cliff -p fast
```
- **Work**: 1 minute
- **Short Break**: 1 minute
- **Long Break**: 2 minutes
- **Sessions**: 2 (for testing/demo)

### Custom Configurations

Override any preset or create your own timing:

```bash
# Custom work and break times
cliff -w 45 -s 15 -l 25

# Custom session count with focus preset
cliff -p focus -n 3

# Completely custom configuration
cliff -w 30 -s 7 -l 20 -n 5
```

## 📊 Interface Overview

When running, CLIfficiency displays:

```
Work █████████████████████████████████████████████ 100% | (#2) 25:00 time remaining
```

- **Phase Name**: Current activity (Work, Short Break, Long Break)
- **Progress Bar**: Visual progress with completion percentage
- **Session Counter**: Current session number (#2)
- **Time Remaining**: Countdown timer in MM:SS format

## 🔔 Notifications

CLIfficiency sends native desktop notifications for each phase transition:

### Work Phase
- **Title**: "¡Hora de trabajar! 💻"
- **Message**: "Enfócate por unos minutos más."

### Short Break
- **Title**: "Tómate un respiro ☕"  
- **Message**: "Estira un poco o toma agua."

### Long Break
- **Title**: "¡Descanso largo! 🧘"
- **Message**: "Tómate tu merecido descanso."

Each notification includes:
- Custom CLIfficiency sound alert
- Application icon
- Automatic dismissal (non-blocking)

## 🎵 Sound Configuration

CLIfficiency automatically installs a custom notification sound (`CLIfficiency_noti.wav`) to your system's sound library. The sound is automatically copied to:

- **macOS**: `~/Library/Sounds/`
- **Windows**: System sounds directory
- **Linux**: User sound directory

## 🛠️ Technical Details

### Requirements

- **Node.js**: 14.0.0 or higher
- **npm**: 6.0.0 or higher
- **Operating System**: macOS, Windows 10+, or Linux

### Dependencies

- **commander**: CLI argument parsing
- **cli-progress**: Beautiful progress bars
- **ansi-colors**: Terminal color support
- **node-notifier**: Cross-platform notifications
- **TypeScript**: Type safety and modern JavaScript features

### File Structure

```
clifficiency/
├── dist/                 # Compiled JavaScript
├── src/
│   ├── core/
│   │   └── PomodoroTimer.ts   # Core timer logic
│   ├── ui/
│   │   └── ProgressBar.ts     # Progress bar interface
│   ├── cli.ts                 # Command line interface
│   ├── presets.ts             # Timer presets
│   └── index.ts               # Main application entry
├── assets/
│   ├── sounds/               # Notification sounds
│   └── images/               # Application icons
└── package.json
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JosueIsOffline/CLIfficiency.git
   cd CLIfficiency
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

### Testing

Test your changes with the fast preset:

```bash
npm run dev -- -p fast
```

This runs 1-minute cycles for quick testing.

### Pull Request Guidelines

- Fork the repository and create a feature branch
- Write clear, descriptive commit messages
- Test your changes thoroughly
- Update documentation if needed
- Submit a pull request with a detailed description

## 📝 Examples

### Daily Productivity Session
```bash
# Standard Pomodoro for focused work
cliff -p default
```

### Deep Work Session  
```bash
# Longer focus periods for complex tasks
cliff -p focus
```

### Custom Study Session
```bash
# 40-minute study periods with longer breaks
cliff -w 40 -s 10 -l 25 -n 3
```

### Quick Meeting Timer
```bash
# 15-minute focused sessions
cliff -w 15 -s 5 -l 10 -n 2
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Josué R. Hernández Montero**
- GitHub: [@JosueIsOffline](https://github.com/JosueIsOffline)
  
## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please create an issue on our [GitHub Issues](https://github.com/JosueIsOffline/CLIfficiency/issues) page.

When reporting bugs, please include:
- Your operating system and version
- Node.js version (`node --version`)
- CLIfficiency version (`cliff --version`)
- Steps to reproduce the issue
- Expected vs actual behavior

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/clifficiency)
- [GitHub Repository](https://github.com/JosueIsOffline/CLIfficiency)
- [Issue Tracker](https://github.com/JosueIsOffline/CLIfficiency/issues)

## 📊 Changelog

### v1.0.0
- Initial release
- Core Pomodoro timer functionality
- Three built-in presets (default, focus, fast)
- Desktop notifications with custom sounds
- Colorful progress bar interface
- Cross-platform compatibility
- Full TypeScript implementation

---

**Happy Productivity! 🍅✨**

*Made with ❤️ using TypeScript and the Pomodoro Technique*
