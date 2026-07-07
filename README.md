# [ UM_OS_v2.0 ] 🖥️ | Embedded Firmware Portfolio

[![GitHub Pages Deployment](https://github.com/umangmishra/umang-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/umangmishra/umang-portfolio/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Embedded Systems](https://img.shields.io/badge/Focus-Embedded_Systems-00f0ff.svg)](#)
[![Processor](https://img.shields.io/badge/Processor-ARM_Cortex--M-ff9f00.svg)](#)

A high-performance, interactive portfolio website for **Umang Mishra | Embedded Firmware Engineer**. The site is themed as a retro-futuristic embedded firmware terminal emulator (`UM_OS_v2.0`) running on virtual ARM Cortex-M hardware.

🔗 **Live Demo:** [Deploy your site to see it live!]

---

## 🚀 Key Features

*   **Interactive OS Terminal Simulator (CLI):** A fully functional CLI simulator mimicking a firmware bootloader. Users can query virtual registers, load resumes, clear the screen, and inspect projects using specialized command parameters.
*   **Hardware Diagnostic Dashboard:** An interactive printed circuit board (PCB) / MCU visualization. Users can click different sub-modules (CPU, RTOS, Protocols, Debugger, Linux Build) to trigger real-time signal waveforms and view details.
*   **Real-time CPU Telemetry:** Simulates hardware system telemetry metrics, including core voltage checks, clock speed monitor, and variable CPU temperature updates.
*   **Logic Signal Waveform Canvas:** Visualizes active signal lines with a custom HTML5 canvas oscilloscope waveform generator (supporting Square, Sawtooth, Pulse, and Noise wave types).
*   **Responsive & Smooth UX:** Implements custom mouse cursor delay smoothing (Lerp), scroll-triggered reveal hooks, drawer inspectors, and modern Tailwind CSS design.
*   **Contact Telemetry Transceiver:** Standard EmailJS integration to send secure contact requests directly from the terminal console.

---

## 🛠️ Technology Stack

*   **Core Structure:** HTML5
*   **Logic Engine:** JavaScript (ES6+, HTML Canvas API, custom scroll observer system)
*   **Styling & Theme:** Tailwind CSS (CDN Configured) & Custom Vanilla CSS (Keyframe animations, PCB graphics, custom cursor styling)
*   **Communication SDK:** EmailJS Client-side Integration
*   **Typography:** Google Fonts (Outfit & Fira Code for monospaced code parity)
*   **Icons:** FontAwesome v6.4.0

---

## 📁 Repository Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline for automated GitHub Pages deployment
├── .gitignore              # Standard git exclusion configurations
├── index.html              # Core webpage & Tailwind configurations
├── script.js               # Terminal simulator logic, signal canvas, and event routers
├── style.css               # PCB styles, logic canvas lines, and custom cursor animations
├── LICENSE                 # License configuration (MIT)
└── README.md               # Repository documentation (this file)
```

---

## 💻 Terminal Command Registry

Once inside the interactive terminal, you can type the following commands and press `Enter`:

| Command | Description |
| :--- | :--- |
| `help` | Outputs the list of available commands and instructions. |
| `about` | Prints Umang's engineering profile, M.Tech background, and core focus. |
| `skills` | Dumps the system hardware register containing technical skill metrics. |
| `projects` | Lists compiled project profiles available in flash memory. |
| `inspect [0\|1\|2]` | Inspects specific registers (`0` = Performance Framework, `1` = CAN Bus Monitor, `2` = FreeRTOS Subsystem). |
| `contact` | Displays transceiver communication details (Email, Phone, LinkedIn). |
| `resume` | Automatically triggers the transmission pipeline download for `GET_RESUME.BIN`. |
| `submit` | Focuses the screen directly to the physical Transmit Form. |
| `clear` | Wipes the console screen buffer. |

---

## 🔧 Local Development & Setup

Since the portfolio utilizes vanilla CSS/JS, it runs directly in the browser with no build step required.

### Prerequisites

You need a simple HTTP server or browser to run it locally.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/umang-portfolio.git
    cd umang-portfolio
    ```

2.  **Run a local development server:**
    Using Python (Recommended):
    ```bash
    python -m http.server 8000
    ```
    Or if you have Node.js / npm:
    ```bash
    npx serve
    ```
    Alternatively, if you use VS Code, you can use the **Live Server** extension to launch a live browser window.

3.  **Open the local server:**
    Navigate to `http://localhost:8000` (or the respective port indicated by your server).

---

## 🌐 Automated GitHub Pages Deployment

The repository includes a GitHub Actions CI/CD workflow that automates the deployment.

1.  Push your code to the `main` branch.
2.  GitHub Actions will trigger `.github/workflows/deploy.yml`.
3.  The workflow compiles and publishes your portfolio page to `https://YOUR_USERNAME.github.io/umang-portfolio/` automatically.

To configure GitHub Pages, go to **Settings** > **Pages** in your GitHub repository and set the source to **GitHub Actions**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
