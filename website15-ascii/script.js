// ASCII Terminal Portfolio - Interactive Script
(function() {
    'use strict';
    
    // Terminal state
    const state = {
        currentProject: 0,
        language: 'bg',
        soundEnabled: true,
        projects: [
            { name: 'Apartament Flavia Garden', year: 2024, budget: 45000, area: 120, folder: 'Apartament Flavia Garden 2024' },
            { name: 'Elite Clinic', year: 2021, budget: 75000, area: 200, folder: 'Elite Clinic 2021' },
            { name: 'Apartament K55', year: 2021, budget: 35000, area: 90, folder: 'Apartament K55_2021' },
            { name: 'Balev Corporation', year: 2020, budget: 95000, area: 350, folder: 'Balev Corporation 2020' },
            { name: 'Playground Grand Mall', year: 2018, budget: 120000, area: 450, folder: 'Playground Grand Mall Varna 2018' },
            { name: 'Apartament Chaika', year: 2017, budget: 40000, area: 100, folder: 'Apartament Кв. Чайка, Варна_2017' },
            { name: 'Simfonia Briz', year: 2019, budget: 55000, area: 130, folder: 'Apartament Симфония - Бриз, Варна_ 2019' },
            { name: 'Apartament Trakata', year: 2021, budget: 50000, area: 110, folder: 'Apartament Траката, Варна_2021' },
            { name: 'Oliv Villas', year: 2019, budget: 80000, area: 300, folder: 'Oliv vilas sv.Vlas 2019' },
            { name: 'Work Del Mar', year: 2022, budget: 60000, area: 150, folder: 'Work Del Mar 2022' },
            { name: 'Gichev Sped', year: 2019, budget: 70000, area: 250, folder: 'Gichev sped 2019' }
        ]
    };
    
    // DOM elements
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');
    const soundBtn = document.getElementById('sound-toggle');
    const matrixRain = document.getElementById('matrix-rain');
    
    // Sound effects
    const sounds = {
        keypress: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDGS0Oy9diMFl2z7zABAGle/8fpUyxEMrPH8L+r9OIHEN/j7k0Fz/G4Uo/T8jfj3QkVq7wADAGNj9mfe/l/+95TN7iABCxhlw+/72cYMHwXD7PvZ/4k8BQ'),
        enter: new Audio('data:audio/wav;base64,UklGRl4GAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAAA='),
        error: new Audio('data:audio/wav;base64,UklGRl4GAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAAA=')
    };
    
    // ASCII art components
    const asciiArt = {
        logo: `
╔═╗╔╦╗╦ ╦╔╦╗╦╔═╗  ╔═╗╦═╗╔╦╗╔═╗╔═╗╔╦╗╔═╗
╚═╗ ║ ║ ║ ║║║║ ║  ╠═╣╠╦╝ ║ ║╣ ╠═╣║║║║ ║
╚═╝ ╩ ╚═╝═╩╝╩╚═╝  ╩ ╩╩╚═ ╩ ╚═╝╩ ╩╩ ╩╚═╝`,
        welcome: {
            bg: 'ДОБРЕ ДОШЛИ В ТЕКСТОВИЯ СВЯТ НА ДИЗАЙНА',
            en: 'WELCOME TO THE TEXT WORLD OF DESIGN',
            ru: 'ДОБРО ПОЖАЛОВАТЬ В ТЕКСТОВЫЙ МИР ДИЗАЙНА',
            es: 'BIENVENIDO AL MUNDO TEXTUAL DEL DISEÑO'
        }
    };
    
    // Initialize
    function init() {
        setupEventListeners();
        startMatrixRain();
        showWelcomeMessage();
        input.focus();
    }
    
    // Event listeners
    function setupEventListeners() {
        input.addEventListener('keydown', handleKeyDown);
        input.addEventListener('input', handleInput);
        soundBtn.addEventListener('click', toggleSound);
        document.getElementById('close-gallery').addEventListener('click', closeGallery);
        
        // Keep focus on input
        document.addEventListener('click', () => input.focus());
    }
    
    // Handle keyboard input
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            processCommand(input.value.toUpperCase());
            input.value = '';
            playSound('enter');
        } else if (e.key === 'Tab') {
            e.preventDefault();
            autoComplete();
        }
    }
    
    function handleInput() {
        playSound('keypress');
    }
    
    // Process commands
    function processCommand(cmd) {
        addLine(`arteamo@portfolio:~$ ${cmd}`);
        
        const commands = {
            'HELP': showHelp,
            'PROJECTS': showProjects,
            'VIEW': viewProject,
            'NEXT': nextProject,
            'PREV': prevProject,
            'ABOUT': showAbout,
            'CONTACT': showContact,
            'CLEAR': clearTerminal,
            'MATRIX': toggleMatrix,
            'COLOR': changeColor,
            'BG': () => changeLanguage('bg'),
            'EN': () => changeLanguage('en'),
            'RU': () => changeLanguage('ru'),
            'ES': () => changeLanguage('es'),
            'SHOW ME REAL PHOTOS': showRealGallery,
            'GALLERY': showProjectGallery,
            'EXIT': exitTerminal
        };
        
        // Check if command exists
        const baseCmd = cmd.split(' ')[0];
        if (commands[baseCmd]) {
            commands[baseCmd](cmd);
        } else if (cmd.startsWith('VIEW ')) {
            viewProject(cmd);
        } else {
            showError(cmd);
        }
    }
    
    // Command implementations
    function showHelp() {
        const helpText = {
            bg: `
╔═══════════════════════════════════════════╗
║             НАЛИЧНИ КОМАНДИ               ║
╠═══════════════════════════════════════════╣
║ HELP      - Показва това меню             ║
║ PROJECTS  - Списък с проекти              ║
║ VIEW [N]  - Преглед на проект N           ║
║ NEXT      - Следващ проект                ║
║ PREV      - Предишен проект               ║
║ GALLERY   - Отваря галерия на проекта     ║
║ ABOUT     - За Studio Arteamo             ║
║ CONTACT   - Контакти                      ║
║ CLEAR     - Изчиства екрана               ║
║ MATRIX    - Матричен ефект                ║
║ COLOR     - Смяна на цвета                ║
║ BG/EN/RU/ES - Смяна на езика             ║
║ EXIT      - Изход                         ║
╚═══════════════════════════════════════════╝`,
            en: `
╔═══════════════════════════════════════════╗
║           AVAILABLE COMMANDS              ║
╠═══════════════════════════════════════════╣
║ HELP      - Shows this menu               ║
║ PROJECTS  - List all projects             ║
║ VIEW [N]  - View project N                ║
║ NEXT      - Next project                  ║
║ PREV      - Previous project              ║
║ GALLERY   - Open project gallery          ║
║ ABOUT     - About Studio Arteamo          ║
║ CONTACT   - Contact information           ║
║ CLEAR     - Clear screen                  ║
║ MATRIX    - Matrix effect                 ║
║ COLOR     - Change color theme            ║
║ BG/EN/RU/ES - Change language            ║
║ EXIT      - Exit terminal                 ║
╚═══════════════════════════════════════════╝`
        };
        
        addLine(helpText[state.language] || helpText.en);
    }
    
    function showProjects() {
        addLine('');
        addLine('╔═══════════════════════════════════════════════════════════╗');
        addLine('║                      ПРОЕКТИ / PROJECTS                   ║');
        addLine('╠═══════════════════════════════════════════════════════════╣');
        
        state.projects.forEach((project, index) => {
            const bar = generateProgressBar(project.budget / 150000);
            addLine(`║ ${index + 1}. ${project.name.padEnd(30)} ${project.year} ║`);
            addLine(`║    Budget: ${bar} €${project.budget.toLocaleString().padStart(7)} ║`);
            addLine(`║    Area: ${project.area}m² `.padEnd(60) + '║');
            if (index < state.projects.length - 1) {
                addLine('║' + '─'.repeat(59) + '║');
            }
        });
        
        addLine('╚═══════════════════════════════════════════════════════════╝');
        addLine('');
        addLine('Type VIEW [number] to see ASCII visualization');
    }
    
    function viewProject(cmd) {
        const num = parseInt(cmd.split(' ')[1]) - 1;
        
        if (isNaN(num) || num < 0 || num >= state.projects.length) {
            addLine('ERROR: Invalid project number. Type PROJECTS to see list.');
            playSound('error');
            return;
        }
        
        state.currentProject = num;
        const project = state.projects[num];
        
        addLine('');
        addLine(`Loading ${project.name}...`);
        
        setTimeout(() => {
            showASCIIVisualization(project);
        }, 1000);
    }
    
    function showASCIIVisualization(project) {
        clearTerminal();
        
        // Show different ASCII art based on project
        const visualizations = [
            document.getElementById('living-room-ascii').textContent,
            document.getElementById('kitchen-ascii').textContent,
            document.getElementById('bedroom-ascii').textContent
        ];
        
        const viz = visualizations[state.currentProject % visualizations.length];
        
        addLine(`PROJECT: ${project.name}`);
        addLine(`YEAR: ${project.year} | BUDGET: €${project.budget.toLocaleString()} | AREA: ${project.area}m²`);
        addLine('');
        
        // Animate ASCII art appearance
        const lines = viz.split('\n');
        lines.forEach((line, index) => {
            setTimeout(() => {
                addLine(line, false, true);
            }, index * 50);
        });
        
        setTimeout(() => {
            addLine('');
            addLine('Commands: NEXT, PREV, PROJECTS, GALLERY');
            addLine('Type GALLERY to open full image gallery for this project');
        }, lines.length * 50 + 500);
    }
    
    function nextProject() {
        state.currentProject = (state.currentProject + 1) % state.projects.length;
        viewProject(`VIEW ${state.currentProject + 1}`);
    }
    
    function prevProject() {
        state.currentProject = (state.currentProject - 1 + state.projects.length) % state.projects.length;
        viewProject(`VIEW ${state.currentProject + 1}`);
    }
    
    function showAbout() {
        const aboutText = {
            bg: `
╔═══════════════════════════════════════════╗
║            STUDIO ARTEAMO                 ║
╠═══════════════════════════════════════════╣
║                                           ║
║  Основано: 2008                          ║
║  Проекти: 500+                           ║
║  Екип: 12 дизайнери                      ║
║                                           ║
║  "Ние не показваме снимки.               ║
║   Ние създаваме преживявания."           ║
║                                           ║
║  Този терминал е нашият протест          ║
║  срещу визуалното пренасищане.           ║
║                                           ║
╚═══════════════════════════════════════════╝`,
            en: `
╔═══════════════════════════════════════════╗
║            STUDIO ARTEAMO                 ║
╠═══════════════════════════════════════════╣
║                                           ║
║  Founded: 2008                           ║
║  Projects: 500+                          ║
║  Team: 12 designers                      ║
║                                           ║
║  "We don't show photos.                  ║
║   We create experiences."                ║
║                                           ║
║  This terminal is our protest            ║
║  against visual oversaturation.          ║
║                                           ║
╚═══════════════════════════════════════════╝`
        };
        
        addLine(aboutText[state.language] || aboutText.en);
    }
    
    function showContact() {
        addLine('');
        addLine('╔═══════════════════════════════════════════╗');
        addLine('║              CONTACT                      ║');
        addLine('╠═══════════════════════════════════════════╣');
        addLine('║  📧 studio@arteamo.net                   ║');
        addLine('║  📱 +359 897 983 127                     ║');
        addLine('║  📍 Varna, Bulgaria                      ║');
        addLine('║                                           ║');
        addLine('║  > ssh studio@arteamo.net                ║');
        addLine('║  > telnet arteamo.net 23                ║');
        addLine('╚═══════════════════════════════════════════╝');
    }
    
    function clearTerminal() {
        output.innerHTML = '';
        addLine('STUDIO ARTEAMO TERMINAL v2.0.24');
        addLine('=====================================');
    }
    
    function toggleMatrix() {
        matrixRain.style.display = matrixRain.style.display === 'none' ? 'block' : 'none';
        addLine('Matrix rain: ' + (matrixRain.style.display === 'none' ? 'OFF' : 'ON'));
    }
    
    function changeColor() {
        if (document.body.classList.contains('amber')) {
            document.body.classList.remove('amber');
            addLine('Color theme: GREEN');
        } else {
            document.body.classList.add('amber');
            addLine('Color theme: AMBER');
        }
    }
    
    function changeLanguage(lang) {
        state.language = lang;
        addLine(`Language changed to: ${lang.toUpperCase()}`);
        
        // Update translations
        if (window.updateLanguage) {
            window.updateLanguage(lang);
        }
    }
    
    function showRealGallery() {
        // Easter egg - show real photos
        const gallery = document.getElementById('real-gallery');
        const grid = gallery.querySelector('.real-gallery-grid');
        
        // Clear and populate gallery
        grid.innerHTML = '';
        
        const images = [
            { src: '../Apartament Flavia Garden 2024/cam01.jpg', folder: 'Apartament Flavia Garden 2024', name: 'Flavia Garden' },
            { src: '../Elite Clinic 2021/Cam01.jpg', folder: 'Elite Clinic 2021', name: 'Elite Clinic' },
            { src: '../Apartament K55_2021/Vladi (1).jpg', folder: 'Apartament K55_2021', name: 'K55 Modern' },
            { src: '../Balev Corporation 2020/Balev (1).jpg', folder: 'Balev Corporation 2020', name: 'Balev Corporation' },
            { src: '../Playground Grand Mall Varna 2018/Playground (1).jpg', folder: 'Playground Grand Mall Varna 2018', name: 'Playground Grand Mall' }
        ];
        
        images.forEach(img => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.cursor = 'pointer';
            item.onclick = () => openProjectGallery(img.folder, img.name);
            item.innerHTML = `<img src="${img.src}" alt="${img.name}" loading="lazy">`;
            grid.appendChild(item);
        });
        
        gallery.classList.remove('hidden');
        addLine('CONGRATULATIONS! You found the secret gallery.');
    }
    
    function closeGallery() {
        document.getElementById('real-gallery').classList.add('hidden');
    }
    
    function exitTerminal() {
        addLine('');
        addLine('GOODBYE...');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    }
    
    function showError(cmd) {
        addLine(`ERROR: Command '${cmd}' not recognized.`);
        addLine('Type HELP for available commands.');
        playSound('error');
    }
    
    // Helper functions
    function addLine(text, isHtml = false, noTyping = false) {
        const line = document.createElement('div');
        line.className = 'line';
        
        if (noTyping) {
            line.textContent = text;
        } else {
            line.innerHTML = isHtml ? text : text;
        }
        
        output.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    function generateProgressBar(percentage) {
        const width = 20;
        const filled = Math.round(width * percentage);
        const empty = width - filled;
        return '[' + '█'.repeat(filled) + '░'.repeat(empty) + ']';
    }
    
    function playSound(type) {
        if (state.soundEnabled && sounds[type]) {
            sounds[type].currentTime = 0;
            sounds[type].play().catch(() => {});
        }
    }
    
    function toggleSound() {
        state.soundEnabled = !state.soundEnabled;
        soundBtn.classList.toggle('muted');
        soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
    }
    
    // Matrix rain effect
    function startMatrixRain() {
        const chars = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ0123456789@#$%^&*()';
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            createMatrixDrop(i, chars);
        }
    }
    
    function createMatrixDrop(column, chars) {
        const drop = document.createElement('div');
        drop.className = 'matrix-drop';
        drop.style.left = column * 20 + 'px';
        drop.style.animationDuration = (Math.random() * 5 + 5) + 's';
        drop.style.animationDelay = Math.random() * 5 + 's';
        drop.textContent = chars[Math.floor(Math.random() * chars.length)];
        matrixRain.appendChild(drop);
        
        // Change character periodically
        setInterval(() => {
            drop.textContent = chars[Math.floor(Math.random() * chars.length)];
        }, 200);
    }
    
    // Welcome message
    function showWelcomeMessage() {
        setTimeout(() => {
            addLine('');
            addLine(asciiArt.welcome[state.language]);
            addLine('');
            addLine('Type HELP for available commands');
            addLine('');
        }, 2000);
    }
    
    // Auto-complete
    function autoComplete() {
        const commands = ['HELP', 'PROJECTS', 'VIEW', 'NEXT', 'PREV', 'ABOUT', 'CONTACT', 'CLEAR', 'MATRIX', 'COLOR', 'EXIT'];
        const current = input.value.toUpperCase();
        
        for (let cmd of commands) {
            if (cmd.startsWith(current) && cmd !== current) {
                input.value = cmd;
                break;
            }
        }
    }
    
    function showProjectGallery() {
        const project = state.projects[state.currentProject];
        if (project && project.folder) {
            openProjectGallery(project.folder, project.name);
        } else {
            addLine('ERROR: No project selected. Use VIEW [number] first.');
        }
    }
    
    // Function to open project gallery
    function openProjectGallery(projectFolder, projectName) {
        const currentPath = window.location.pathname;
        const fromPath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        window.location.href = `../gallery-template.html?project=${encodeURIComponent(projectFolder)}&name=${encodeURIComponent(projectName)}&from=${encodeURIComponent(fromPath)}`;
    }
    
    // Make it globally available
    window.openProjectGallery = openProjectGallery;
    
    // Initialize on load
    init();
})();