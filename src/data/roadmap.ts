
export const roadmapStages = [
    {
        id: 'lvl-1',
        title: 'GROUND CONTROL',
        gravity: '1.0G',
        description: 'Фундамент. То, без чего не взлетит ни один проект.',
        color: 'from-emerald-500 to-teal-900',
        steps: [
            { id: 'html-css', label: 'HTML & CSS', resourceIds: [3, 5, 2] }, // W3Schools, HTML5Book, LearnJS (JS starter)
            { id: 'git', label: 'Git & Terminal', resourceIds: [81, 8, 89] }, // Git, LearnGitBranching, Sourcetree
            { id: 'editor', label: 'Ваш Редактор', resourceIds: [80] } // VS Code
        ]
    },
    {
        id: 'lvl-2',
        title: 'IGNITION',
        gravity: '0.8G',
        description: 'Зажигание. Начинаем программировать по-настоящему.',
        color: 'from-amber-500 to-orange-900',
        steps: [
            { id: 'js-depth', label: 'JavaScript Deep Dive', resourceIds: [2, 1, 4] }, // LearnJS, MDN, Hexlet
            { id: 'practice', label: 'Алгоритмы', resourceIds: [6, 7] }, // Codewars, Exercism
            { id: 'tools-basic', label: 'Инструменты', resourceIds: [84, 85, 86] } // CanIUse, TinyPNG, Regex101
        ]
    },
    {
        id: 'lvl-3',
        title: 'LIFT OFF',
        gravity: '0.5G',
        description: 'Отрыв. Фреймворки и современные подходы.',
        color: 'from-cyan-500 to-blue-900',
        steps: [
            { id: 'react-eco', label: 'React & Ecosystem', resourceIds: [40, 44, 41] }, // React, Next.js, Vue (alternative)
            { id: 'styling', label: 'Стилизация 2.0', resourceIds: [45, 46, 51] }, // Tailwind, Sass, shadcn
            { id: 'build', label: 'Сборка', resourceIds: [50] } // Vite
        ]
    },
    {
        id: 'lvl-4',
        title: 'ORBIT',
        gravity: '0.2G',
        description: 'Орбита. Бэкенд, базы данных и деплой.',
        color: 'from-violet-500 to-purple-900',
        steps: [
            { id: 'backend', label: 'Node & Backend', resourceIds: [60, 62, 63] }, // Node, Express, Nest
            { id: 'db', label: 'Базы Данных', resourceIds: [67, 68, 69] }, // Postgres, Mongo, Prisma
            { id: 'deploy', label: 'Деплой в облако', resourceIds: [120, 128] } // Vercel, Hosting items (need check)
        ]
    },
    {
        id: 'lvl-5',
        title: 'DEEP SPACE',
        gravity: '0.0G',
        description: 'Открытый космос. 3D, AI и архитектура.',
        color: 'from-fuchsia-500 to-pink-900',
        steps: [
            { id: '3d-creative', label: '3D & Creative', resourceIds: [49, 53, 48] }, // Three.js, Babylon, GSAP
            { id: 'ai-assist', label: 'AI Co-pilots', resourceIds: [100, 101, 107] }, // ChatGPT, Copilot, Codium
            { id: 'arch', label: 'Architecture', resourceIds: [91, 83] } // Playwright, Docker
        ]
    }
];
