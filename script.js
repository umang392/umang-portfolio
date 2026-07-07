// ==========================================================================
// UMANG MISHRA PORTFOLIO INTERACTIVE ENGINES (script.js)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    initCustomCursor();
    initScrollReveal();
    initHeroParticles();
    initSignalBackground();
    initTerminalBoot();
    initModuleSelector();
    initProjectFilter();
    initProjectDrawer();
    initCardExpansion();
    initContactEmailJS();
    initCpuTempTracker();
    initMobileNav();
});

/* ==========================================================================
   1. CUSTOM ANIMATED CURSOR
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.getElementById("custom-cursor");
    const dot = document.getElementById("custom-cursor-dot");
    if (!cursor || !dot) return;

    let targetX = 0, targetY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener("mousemove", (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Smooth cursor follow delay (Lerp)
    function animateCursor() {
        // Lerp for outer ring
        cursorX += (targetX - cursorX) * 0.15;
        cursorY += (targetY - cursorY) * 0.15;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

        // Lerp for inner dot (slightly faster)
        dotX += (targetX - dotX) * 0.35;
        dotY += (targetY - dotY) * 0.35;
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect trackers on interactive items
    const interactives = document.querySelectorAll("a, button, input, textarea, .mcu-block, .toggle-card-btn, .inspect-btn");
    interactives.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });
        item.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });
    });
}

/* ==========================================================================
   2. SMOOTH SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
    const revealItems = document.querySelectorAll(".reveal-item");
    if (!revealItems.length) return;

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                // Unobserve after revealing to prevent repeated triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealItems.forEach((item) => {
        observer.observe(item);
    });
}

/* ==========================================================================
   3. HERO AMBIENT PARTICLE BACKGROUND EFFECT
   ========================================================================== */
function initHeroParticles() {
    const canvas = document.getElementById("heroParticles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    window.addEventListener("resize", () => {
        width = (canvas.width = canvas.parentElement.offsetWidth);
        height = (canvas.height = canvas.parentElement.offsetHeight);
    });

    const particles = [];
    const particleCount = 45;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? "rgba(0, 240, 255, 0.35)" : "rgba(255, 159, 0, 0.25)";
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce boundaries
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach((p) => {
            p.update();
            p.draw();
        });

        // Draw electrical signal trace links between close nodes
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    const alpha = (1 - dist / 100) * 0.15;
                    ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   4. LOGIC WAVEFORM BACKGROUND CANVAS
   ========================================================================== */
function initSignalBackground() {
    const canvas = document.getElementById("signalCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
    });

    const lineY = height * 0.85;
    let phase = 0;

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw running logic analyser streams
        ctx.beginPath();
        ctx.strokeStyle = "rgba(57, 255, 20, 0.08)";
        ctx.lineWidth = 1;

        phase += 0.02;

        for (let x = 0; x < width; x += 15) {
            const rawSine = Math.sin(x * 0.005 - phase);
            // Translate sine signal to clean square pulses (Logic High / Low states)
            const yOffset = rawSine >= 0 ? 15 : -15;
            
            if (x === 0) {
                ctx.moveTo(x, lineY + yOffset);
            } else {
                ctx.lineTo(x, lineY + yOffset);
            }
        }
        ctx.stroke();
        requestAnimationFrame(draw);
    }
    draw();
}

/* ==========================================================================
   5. INTERACTIVE TERMINAL SIMULATOR
   ========================================================================== */
const BOOT_SEQUENCE = [
    { text: "Initializing Umang_OS Kernel v2.0.26...", delay: 200, type: "system" },
    { text: "Target Hardware: ARM Cortex-M4 STM32F4xx [Detected]", delay: 300, type: "system" },
    { text: "Core clock configuration: SYSCLK = 168 MHz... OK", delay: 200, type: "success" },
    { text: "Checking memory ranges: SRAM (192KB) & Flash (1MB)... OK", delay: 400, type: "success" },
    { text: "Booting FreeRTOS kernel schedulers... OK", delay: 300, type: "success" },
    { text: "Enabling peripherals: SPI1, I2C2, USART3, CAN1... ACTIVE", delay: 400, type: "info" },
    { text: "Tracing network stacks: TCP/IP Ethernet link... UP (192.168.1.100)", delay: 300, type: "info" },
    { text: "Connecting JTAG Debug trace probe... Lauterbach Trace32 Ready", delay: 300, type: "info" },
    { text: "==================================================", delay: 100, type: "system" },
    { text: "WELCOME TO UMANG_OS. SYSTEM BOOT COMPLETED SUCCESSFUL.", delay: 300, type: "success" },
    { text: "Umang Mishra - Elite Embedded Firmware Engineer.", delay: 200, type: "info" },
    { text: "Type 'help' to query firmware command registers.", delay: 100, type: "warning" },
    { text: "==================================================", delay: 100, type: "system" }
];

const CLI_RESPONSES = {
    help: `Available registers (commands):
  about     - Output professional engineering profile summary.
  skills    - Print technical skills and peripheral registry.
  projects  - Dump compiled descriptions of completed works.
  contact   - Display communication transceiver channels.
  resume    - Download GET_RESUME.BIN.
  clear     - Wipe console buffers.
  help      - Print this listing details.`,
    
    about: `Umang Mishra - Embedded Firmware Engineer
----------------------------------------
Specializing in low-level driver development, RTOS board bring-up, 
and hardware-software co-validation. Hands-on experience developing 
critical firmware for automotive chips (NXP) and commercial IoT (Pretlist).
Holds an M.Tech from NIT Jamshedpur (CGPA 8.77) and B.Tech in Electronics.
A passionate hardware enthusiast with deep interest in SoC validation.`,
    
    skills: `Peripherals & System Registries:
----------------------------------------
* Programming: Embedded C, C++, Python, Assembly
* RTOS & OS: FreeRTOS, Zephyr RTOS, Embedded Linux, Yocto Project
* SoC Cores: ARM Cortex-M (STM32, NXP LPC), RISC-V Cores
* Protocols: SPI, I2C, UART, CAN Bus, TCP/IP, MQTT, GPIO, Timers
* Debug/Test: Lauterbach Trace32 JTAG, GDB, logic analyzers, Oscilloscopes`,
    
    projects: `Compiled Projects:
----------------------------------------
1. ARM Cortex-M Performance Framework
   - Custom benchmarks measuring kernel scheduling & latency.
2. CAN Bus-Based Vehicle Monitor
   - Interrupt-driven ECU transceiver simulator.
3. FreeRTOS Multi-threaded Subsystem
   - Pre-emptive task synchronization module.
Type 'inspect [0|1|2]' or click project cards below for telemetry maps.`,
    
    contact: `Comm Transceiver Channels:
----------------------------------------
* Email: umangmishra392@gmail.com
* Phone: +919650870928
* LinkedIn: linkedin.com/in/umangmishra
Type 'submit' to jump to form transmission terminal.`,
    
    resume: `Triggering download download... GET_RESUME.BIN [OK]`
};

function initTerminalBoot() {
    const outputDiv = document.getElementById("terminalOutput");
    const inputField = document.getElementById("terminalInput");
    if (!outputDiv || !inputField) return;

    let index = 0;

    function typeNextLine() {
        if (index < BOOT_SEQUENCE.length) {
            const line = BOOT_SEQUENCE[index];
            const p = document.createElement("p");
            
            if (line.type === "success") p.style.color = "var(--accentGreen)";
            else if (line.type === "info") p.style.color = "var(--primary)";
            else if (line.type === "warning") p.style.color = "var(--secondary)";
            else p.style.color = "#8b949e";

            p.textContent = line.text;
            outputDiv.appendChild(p);
            outputDiv.scrollTop = outputDiv.scrollHeight;
            
            index++;
            setTimeout(typeNextLine, line.delay);
        } else {
            inputField.disabled = false;
            inputField.focus();
        }
    }

    inputField.disabled = true;
    typeNextLine();

    inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const cmdText = inputField.value.trim().toLowerCase();
            inputField.value = "";
            
            if (!cmdText) return;

            const echoP = document.createElement("p");
            echoP.innerHTML = `<span style="color:var(--primary)">umang_os:~$</span> ${cmdText}`;
            outputDiv.appendChild(echoP);

            processCommand(cmdText, outputDiv);
            outputDiv.scrollTop = outputDiv.scrollHeight;
        }
    });
}

function processCommand(command, outputElement) {
    const p = document.createElement("p");
    p.style.whiteSpace = "pre-wrap";

    if (command.startsWith("inspect ")) {
        const id = command.split(" ")[1];
        if (id === "0" || id === "1" || id === "2") {
            openDrawer(parseInt(id));
            p.textContent = `Launching register inspect module for Repository ID: ${id}... Success.`;
            p.style.color = "var(--accentGreen)";
        } else {
            p.textContent = "Invalid Repository ID. Choose 0, 1, or 2.";
            p.style.color = "var(--accentRed)";
        }
        outputElement.appendChild(p);
        return;
    }

    if (command === "clear") {
        outputElement.innerHTML = "";
        return;
    }

    if (command === "submit") {
        document.getElementById("contact-section").scrollIntoView();
        p.textContent = "Transferred focus to Telemetry Comms Form.";
        p.style.color = "var(--accentGreen)";
        outputElement.appendChild(p);
        return;
    }

    if (command === "resume") {
        p.textContent = CLI_RESPONSES.resume;
        p.style.color = "var(--accentGreen)";
        outputElement.appendChild(p);
        triggerResumeDownload();
        return;
    }

    const response = CLI_RESPONSES[command];
    if (response) {
        p.textContent = response;
        if (command === "help") p.style.color = "var(--secondary)";
    } else {
        p.textContent = `err: '${command}' command register not found. Type 'help' to read valid instructions.`;
        p.style.color = "var(--accentRed)";
    }
    outputElement.appendChild(p);
}

function triggerResumeDownload() {
    const link = document.createElement("a");
    link.href = "#"; 
    link.download = "Umang_Mishra_Resume.pdf";
    document.body.appendChild(link);
    
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;bottom:20px;right:20px;background:var(--surface);border:1px solid var(--accentGreen);padding:1rem;border-radius:4px;z-index:1000;box-shadow:0 0 10px var(--accentGreen);font-family:monospace;font-size:0.8rem;";
    overlay.innerHTML = "<span style='color:var(--accentGreen)'>[SUCCESS]</span> GET_RESUME.BIN successfully transmitted via browser pipeline.";
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 3000);
}

/* ==========================================================================
   6. BOARD DIAGNOSTIC DASHBOARD (SKILLS BOARD)
   ========================================================================== */
const BOARD_MODULES = {
    cpu: {
        title: "ARM Cortex-M & SoC Architecture",
        desc: "Deep knowledge of embedded systems architecture. Highly proficient in low-level startups, vector mapping, bus hierarchies (AHB/APB), memory protection, pipeline execution, cache coherence, and register-level peripheral manipulation.",
        telemetry: [
            { title: "ARM C & Assembler startup scripts", pct: 90 },
            { title: "Interrupt nesting & Priority management", pct: 88 },
            { title: "Memory protection & MPU settings", pct: 80 }
        ],
        wave: "square"
    },
    rtos: {
        title: "Deterministic RTOS Engines",
        desc: "Experienced developing thread-safe preemptive systems on FreeRTOS and Zephyr RTOS cores. Deep competency in scheduling structures, hardware interrupt hooks, mutexes, counting semaphores, queues, and task profilers.",
        telemetry: [
            { title: "Preemptive Multi-Task Schedulers", pct: 92 },
            { title: "Task synchronization primitives", pct: 86 },
            { title: "Deterministic execution profiling", pct: 82 }
        ],
        wave: "sawtooth"
    },
    protocols: {
        title: "Hardware Protocols & Bus Drivers",
        desc: "Writing bare-metal and kernel drivers for communication buses. Thorough debugging of CAN Bus frame logic, SPI clock setups, I2C handshake sequences, and serial UART channels. Networking implementations with TCP/IP and MQTT.",
        telemetry: [
            { title: "CAN/CAN-FD device drivers", pct: 90 },
            { title: "SPI & I2C peripheral controllers", pct: 92 },
            { title: "TCP/IP & MQTT IoT connectivity", pct: 84 }
        ],
        wave: "pulse"
    },
    debugger: {
        title: "JTAG Debugging & System Validation",
        desc: "Root-cause diagnostics of system exceptions. Advanced usage of Lauterbach Trace32 debugger and hardware logic probes. Resolving hard faults, memory leaks, stack overflows, and register configuration mismatches.",
        telemetry: [
            { title: "Lauterbach JTAG tracing", pct: 88 },
            { title: "GDB diagnostics & Register auditing", pct: 90 },
            { title: "Regression automation setups", pct: 85 }
        ],
        wave: "noise"
    },
    "build-env": {
        title: "Embedded Linux & Automation",
        desc: "Working in host Linux environments. Designing custom builds using Yocto Project recipes. Building automation workflows via Python and Jenkins CI systems, reducing manual build and validation workloads by ~40%.",
        telemetry: [
            { title: "Yocto builds & recipe design", pct: 78 },
            { title: "Python test automation scripts", pct: 86 },
            { title: "Jenkins pipeline CI automation", pct: 84 }
        ],
        wave: "sine"
    }
};

function initModuleSelector() {
    const blocks = document.querySelectorAll(".mcu-block");
    const diagTitle = document.getElementById("diag-module-title");
    const diagDesc = document.getElementById("diag-module-desc");
    const diagTelemetry = document.getElementById("diag-telemetry");

    if (!blocks.length || !diagTitle || !diagDesc || !diagTelemetry) return;

    let activeWaveType = "square";
    animateOscilloscope(() => activeWaveType);

    blocks.forEach((block) => {
        block.addEventListener("click", () => {
            blocks.forEach((b) => b.classList.remove("active"));
            block.classList.add("active");

            const modId = block.getAttribute("data-module");
            const data = BOARD_MODULES[modId];
            if (!data) return;

            diagTitle.textContent = data.title;
            diagDesc.textContent = data.desc;
            activeWaveType = data.wave;

            diagTelemetry.innerHTML = "";
            data.telemetry.forEach((t) => {
                const item = document.createElement("div");
                item.className = "telemetry-bar-item flex flex-col";
                item.innerHTML = `
                    <div class="bar-info flex justify-between font-mono text-xs text-[#e2e8f0] mb-1.5">
                        <span>${t.title}</span>
                        <span>${t.pct}%</span>
                    </div>
                    <div class="bar-container-inner h-1.5 bg-[#1f2735]/60 rounded-full overflow-hidden border border-white/5">
                        <div class="bar-fill h-full bg-gradient-to-r from-primary to-primary/40 shadow-[0_0_10px_var(--primary-glow)]" style="width: 0%"></div>
                    </div>
                `;
                diagTelemetry.appendChild(item);

                setTimeout(() => {
                    const fill = item.querySelector(".bar-fill");
                    if (fill) fill.style.width = `${t.pct}%`;
                }, 50);
            });
        });
    });
}

function animateOscilloscope(getWaveType) {
    const oscPath = document.getElementById("oscPath");
    if (!oscPath) return;

    let time = 0;
    
    function run() {
        time += 0.15;
        const waveType = getWaveType();
        let pathD = "M 0,50";

        for (let x = 0; x <= 400; x += 5) {
            let y = 50;
            const phase = x * 0.05 - time;
            
            if (waveType === "sine") {
                y = 50 + Math.sin(phase) * 30;
            } else if (waveType === "square") {
                y = Math.sin(phase) >= 0 ? 20 : 80;
            } else if (waveType === "sawtooth") {
                y = 50 + ((x - time * 20) % 60) * 1 - 30;
            } else if (waveType === "pulse") {
                y = (x % 80 < 10) ? 20 : 70;
            } else if (waveType === "noise") {
                y = 50 + (Math.random() - 0.5) * 40;
            }
            pathD += ` L ${x},${y}`;
        }

        oscPath.setAttribute("d", pathD);
        requestAnimationFrame(run);
    }
    run();
}

/* ==========================================================================
   7. FILTERABLE PROJECT GRID
   ========================================================================== */
function initProjectFilter() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");

    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            buttons.forEach((b) => b.classList.remove("active", "border-primary", "text-primary"));
            btn.classList.add("active", "border-primary", "text-primary");

            const filterVal = btn.getAttribute("data-filter");

            cards.forEach((card) => {
                const category = card.getAttribute("data-category");

                if (filterVal === "all" || category === filterVal) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.9)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   8. PROJECT EXPANDABLE CARD DESCRIPTION
   ========================================================================== */
function initCardExpansion() {
    const toggleButtons = document.querySelectorAll(".toggle-card-btn");
    
    toggleButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".project-card");
            const expandArea = card.querySelector(".card-expand");
            const chevron = btn.querySelector("i");
            const labelText = btn.querySelector("span");

            expandArea.classList.toggle("expanded");
            
            if (expandArea.classList.contains("expanded")) {
                chevron.style.transform = "rotate(180deg)";
                labelText.textContent = "COLLAPSE";
            } else {
                chevron.style.transform = "rotate(0deg)";
                labelText.textContent = "READ_CASE_STUDY";
            }
        });
    });
}

/* ==========================================================================
   9. PROJECT DETAILS DRAWER (MODAL)
   ========================================================================== */
const PROJECT_DETAILS = [
    {
        title: "ARM Cortex-M Performance & Validation Framework",
        category: "AUTOMATION_VALIDATION",
        desc: "This framework was designed to validate ARM microcontrollers performance under stress workloads. Written in Embedded C, it exercises CPU caches, runs RTOS tasks concurrently to profile context-switch speeds, and logs response latency during simultaneous interrupts. The result collection and regression validation is automated via Python scripts.",
        features: [
            "Analyzed ISR overhead and context switching jitter on Cortex-M platforms.",
            "Created stress routines evaluating processor pipelines and memory bounds.",
            "Wrote automation scripts parsing GDB print logs into regression telemetry dashboards.",
            "Integrated into Jenkins CI build servers to flags latency performance regressions."
        ],
        code: `// Cortex-M Performance profiling core
#include "stm32f4xx_hal.h"

#define BENCH_ITERATIONS 1000
volatile uint32_t t_start = 0;
volatile uint32_t t_stop = 0;
volatile uint32_t latency_ticks = 0;

void TIM3_IRQHandler(void) {
    if (__HAL_TIM_GET_FLAG(&htim3, TIM_FLAG_UPDATE) != RESET) {
        t_stop = DWT->CYCCNT; // Capture cycle count
        __HAL_TIM_CLEAR_IT(&htim3, TIM_IT_UPDATE);
        
        latency_ticks = t_stop - t_start;
        log_latency(latency_ticks);
    }
}

void trigger_latency_test(void) {
    CoreDebug->DEMCR |= CoreDebug_DEMCR_TRCENA_Msk;
    DWT->CTRL |= DWT_CTRL_CYCCNTENA_Msk; // Enable Cycle Counter
    
    t_start = DWT->CYCCNT;
    HAL_TIM_Base_Start_IT(&htim3);
}`
    },
    {
        title: "CAN Bus-Based Vehicle Monitoring System",
        category: "PROTOCOLS_DRIVERS",
        desc: "Designed and implemented a distributed network simulation executing on STM32 modules communicating over a CAN loop. The firmware handles custom interrupt-driven frame assembly, filters identifiers inside hardware controllers to reduce processor overload, and guarantees real-time delivery bounds for critical diagnostic parameters.",
        features: [
            "Programmed STM32 bxCAN registers for hardware acceptance filter masks.",
            "Optimized TX mailbox arbitration schemas for message prioritization.",
            "Built error recovery mechanisms handling bus-off conditions.",
            "Structured low-latency, thread-safe rings buffers for CAN receive payloads."
        ],
        code: `// bxCAN Hardware Filter Configuration
#include "stm32f4xx_hal.h"

CAN_HandleTypeDef hcan1;

void CAN_Filter_Config(void) {
    CAN_FilterTypeDef filter;
    
    filter.FilterBank = 0;
    filter.FilterMode = CAN_FILTERMODE_IDMASK;
    filter.FilterScale = CAN_FILTERSCALE_32BIT;
    
    filter.FilterIdHigh = (0x100 << 5); 
    filter.FilterIdLow = 0x0000;
    filter.FilterMaskIdHigh = (0xF00 << 5); 
    filter.FilterMaskIdLow = 0x0000;
    
    filter.FilterFIFOAssignment = CAN_RX_FIFO0;
    filter.FilterActivation = ENABLE;
    
    if (HAL_CAN_ConfigFilter(&hcan1, &filter) != HAL_OK) {
        Error_Handler();
    }
}`
    },
    {
        title: "RTOS-Based Multi-Threaded System",
        category: "RTOS_SYSTEMS",
        desc: "A custom embedded operating profile designed on FreeRTOS for scheduling real-time processes. The application executes asynchronous tasks controlling SPI transceivers, sensor telemetry, and terminal console threads. Employs mutexes with priority inheritance to prevent priority inversions, and implements strict stack monitors to catch memory exceptions.",
        features: [
            "Configured pre-emptive scheduler tasks with precise thread priority grids.",
            "Secured peripheral access using binary semaphores and mutex controls.",
            "Implemented task monitors tracing stack watermarks and heap leaks.",
            "Programmed FreeRTOS tick hooks entering low-power Sleep mode on idle cycles."
        ],
        code: `// FreeRTOS task creation and mutex control
#include "FreeRTOS.h"
#include "task.h"
#include "semphr.h"

SemaphoreHandle_t xSpiMutex;

void vSensorTask(void *pvParameters) {
    for (;;) {
        if (xSemaphoreTake(xSpiMutex, pdMS_TO_TICKS(10)) == pdTRUE) {
            read_sensor_register(0x2A);
            xSemaphoreGive(xSpiMutex);
        }
        vTaskDelay(pdMS_TO_TICKS(50));
    }
}

void vTelemetryTask(void *pvParameters) {
    for (;;) {
        if (xSemaphoreTake(xSpiMutex, pdMS_TO_TICKS(100)) == pdTRUE) {
            transmit_sensor_packet();
            xSemaphoreGive(xSpiMutex);
        }
        vTaskDelay(pdMS_TO_TICKS(200));
    }
}

int main(void) {
    xSpiMutex = xSemaphoreCreateMutex();
    
    xTaskCreate(vSensorTask, "Sensor", 128, NULL, 3, NULL);
    xTaskCreate(vTelemetryTask, "Comms", 256, NULL, 2, NULL);
    
    vTaskStartScheduler();
    while(1);
}`
    }
];

function initProjectDrawer() {
    const drawer = document.getElementById("projectDrawer");
    const closeBtn = drawer ? drawer.querySelector(".close-drawer") : null;
    const inspectButtons = document.querySelectorAll(".inspect-btn");

    if (!drawer || !closeBtn) return;

    inspectButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const pId = parseInt(btn.getAttribute("data-project"));
            openDrawer(pId);
        });
    });

    closeBtn.addEventListener("click", closeDrawer);
    drawer.addEventListener("click", (e) => {
        if (e.target === drawer) closeDrawer();
    });
}

function openDrawer(id) {
    const drawer = document.getElementById("projectDrawer");
    const drawerCategory = document.getElementById("drawerCategory");
    const drawerTitle = document.getElementById("drawerTitle");
    const drawerDesc = document.getElementById("drawerDesc");
    const drawerFeatures = document.getElementById("drawerKeyFeatures");
    const drawerCode = document.getElementById("drawerCode");

    const data = PROJECT_DETAILS[id];
    if (!data || !drawer) return;

    drawerCategory.textContent = data.category;
    drawerTitle.textContent = data.title;
    drawerDesc.textContent = data.desc;

    drawerFeatures.innerHTML = "";
    data.features.forEach((feat) => {
        const li = document.createElement("li");
        li.className = "text-sm text-[#e2e8f0] mb-2 relative pl-5 before:content-['➔'] before:text-primary before:absolute before:left-0 before:text-xs before:top-0.5";
        li.textContent = feat;
        drawerFeatures.appendChild(li);
    });

    drawerCode.textContent = data.code;
    drawer.style.transform = "translateX(0%)";
    document.body.style.overflow = "hidden";
}

function closeDrawer() {
    const drawer = document.getElementById("projectDrawer");
    if (!drawer) return;
    drawer.style.transform = "translateX(100%)";
    document.body.style.overflow = "";
}

/* ==========================================================================
   10. CONTACT TELEMETRY FORM & EMAILJS INTEGRATION
   ========================================================================== */
function initContactEmailJS() {
    const form = document.getElementById("telemetryForm");
    const statusDiv = document.getElementById("formStatus");
    const bitStream = document.getElementById("bitStream");
    const txLed = document.getElementById("txLed");
    const rxLed = document.getElementById("rxLed");

    if (!form || !statusDiv) return;

    // Initialize EmailJS with placeholder user public key.
    // Replace with your real EmailJS Public Key in production
    const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY"; 
    
    // Check if public key is updated, otherwise run simulation
    const isMock = (EMAILJS_PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY");
    if (!isMock) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // Bitstream flashing updates
    setInterval(() => {
        if (bitStream) {
            let bits = "";
            for (let i = 0; i < 40; i++) {
                bits += Math.round(Math.random());
            }
            bitStream.textContent = bits;
        }
        if (txLed) txLed.classList.toggle("green");
        if (rxLed && Math.random() > 0.6) rxLed.classList.toggle("green");
    }, 250);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const sName = document.getElementById("senderName").value;
        const sEmail = document.getElementById("senderEmail").value;
        const sMsg = document.getElementById("payloadData").value;

        statusDiv.style.display = "flex";
        statusDiv.innerHTML = `
            <div class="status-icon"><i class="fa-solid fa-spinner fa-spin"></i></div>
            <div class="status-msg">UART TRANSLATING DATA...</div>
            <div class="status-sub" style="font-size:0.7rem;opacity:0.7;">PACKING FRAME [SIZE: ${sMsg.length + sName.length + sEmail.length} bytes]</div>
        `;

        if (isMock) {
            // Simulated Send
            setTimeout(() => {
                txLed.classList.add("green");
                rxLed.classList.add("green");
                statusDiv.innerHTML = `
                    <div class="status-icon" style="color:var(--secondary)"><i class="fa-solid fa-server fa-bounce"></i></div>
                    <div class="status-msg">SENDING COMMS PAYLOAD TO MAILSERVER...</div>
                `;
                
                setTimeout(() => {
                    statusDiv.innerHTML = `
                        <div class="status-icon text-accentGreen"><i class="fa-solid fa-square-check"></i></div>
                        <div class="status-msg">TRANSMISSION SUCCESSFUL (MOCK MODE)</div>
                        <div class="status-sub" style="font-size:0.7rem;opacity:0.7;margin-top:4px;">COM4: PACKET ACCEPTED (CRC32: OK). Set EmailJS public key in script.js to dispatch live mails.</div>
                        <button class="btn-primary" style="margin-top:1rem;padding:0.4rem 1rem;" id="resetFormBtn">TRANSMIT_NEW_FRAME</button>
                    `;
                    form.reset();
                    document.getElementById("resetFormBtn").addEventListener("click", () => {
                        statusDiv.style.display = "none";
                    });
                }, 1500);
            }, 1200);
        } else {
            // Real EmailJS Send
            emailjs.send("YOUR_EMAILJS_SERVICE_ID", "YOUR_EMAILJS_TEMPLATE_ID", {
                from_name: sName,
                reply_to: sEmail,
                message: sMsg
            }).then(() => {
                txLed.classList.add("green");
                rxLed.classList.add("green");
                statusDiv.innerHTML = `
                    <div class="status-icon text-accentGreen"><i class="fa-solid fa-square-check"></i></div>
                    <div class="status-msg">TRANSMISSION SUCCESSFUL</div>
                    <div class="status-sub" style="font-size:0.7rem;opacity:0.7;">COM PORT COM4: PACKET DISPATCHED (EMAILJS SUCCESS)</div>
                    <button class="btn-primary" style="margin-top:1rem;padding:0.4rem 1rem;" id="resetFormBtn">TRANSMIT_NEW_FRAME</button>
                `;
                form.reset();
                document.getElementById("resetFormBtn").addEventListener("click", () => {
                    statusDiv.style.display = "none";
                });
            }, (error) => {
                statusDiv.innerHTML = `
                    <div class="status-icon text-accentRed"><i class="fa-solid fa-triangle-exclamation"></i></div>
                    <div class="status-msg">TRANSMIT FAILED: PORT LOCKED</div>
                    <div class="status-sub" style="font-size:0.7rem;opacity:0.7;">${error.text || error}</div>
                    <button class="btn-primary" style="margin-top:1rem;padding:0.4rem 1rem;" id="resetFormBtn">RETRY_TRANSMIT</button>
                `;
                document.getElementById("resetFormBtn").addEventListener("click", () => {
                    statusDiv.style.display = "none";
                });
            });
        }
    });
}

/* ==========================================================================
   11. FLOATING CPU TEMPERATURE TRACKER
   ========================================================================== */
function initCpuTempTracker() {
    const tempSpan = document.getElementById("cpu-temp");
    if (!tempSpan) return;

    setInterval(() => {
        const currentTemp = (32.0 + Math.random() * 4.5).toFixed(1);
        tempSpan.textContent = `${currentTemp}°C`;
    }, 2000);
}

/* ==========================================================================
   12. MOBILE NAVIGATION & LINKS
   ========================================================================== */
function initMobileNav() {
    const toggle = document.querySelector(".mobile-nav-toggle");
    const overlay = document.querySelector(".mobile-nav-overlay");
    const links = document.querySelectorAll(".mobile-link");

    if (!toggle || !overlay) return;

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("open");
        overlay.classList.toggle("open");
        document.body.classList.toggle("nav-open");
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            toggle.classList.remove("open");
            overlay.classList.remove("open");
            document.body.classList.remove("nav-open");
        });
    });
}
