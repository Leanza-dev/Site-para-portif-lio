// ─── i18n Engine ──────────────────────────────────────────────────────────────
// Vanilla JS — zero deps. Uses data-i18n attributes on elements.
// Usage: window.I18n.setLang('en')

const TRANSLATIONS = {
  pt: {
    // Nav
    'nav.search':           'SEARCH',
    'nav.search.shortcut':  'CTRL+K',

    // Hero
    'hero.tagline':         '[ AI-AUGMENTED CS STUDENT ]',
    'hero.desc':            'Estudante de Ciência da Computação construindo arquiteturas de sistemas distribuídos em velocidade 10x — usando Engenharia de Software e Inteligência Artificial como alavanca.',

    // Marquee
    'marquee.1': 'AI-AUGMENTED ENGINEERING',
    'marquee.2': 'SISTEMAS DISTRIBUÍDOS',
    'marquee.3': 'APRENDIZADO CONTÍNUO',
    'marquee.4': 'VELOCIDADE 10X',

    // Dashboard
    'dashboard.title':      'NÍVEL\nTÉCNICO',
    'dashboard.subtitle':   'Fundamentos + IA como Alavanca',
    'dashboard.desc':       'Apaixonado por fundamentos de computação. Utilizo Inteligência Artificial como co-piloto para projetar sistemas que normalmente exigiriam uma equipe inteira.',
    'dashboard.focus':      'CS FUNDAMENTALS · AI-AUGMENTED',

    // Arsenal / Projects
    'arsenal.title':        'MEUS PROJETOS',
    'arsenal.desc':         'Projetos construídos para explorar, dominar e questionar os princípios que sustentam sistemas de alto nível.',
    'arsenal.explore':      'EXPLORAR PROJETO',
    'arsenal.wip':          'EM DESENVOLVIMENTO',

    // Project descriptions
    'proj.raftkv.name':     'RAFT K-V STORE',
    'proj.raftkv.desc':     'Construído para entender consenso distribuído na prática. Implementa o algoritmo Raft do zero em Rust para explorar eleição de líderes e replicação de log com consistência forte.',
    'proj.gigamq.name':     'GIGA MESSAGE QUEUE',
    'proj.gigamq.desc':     'Projeto para dominar concorrência real em Go. Explora Goroutines, Channels e fan-out para atingir 100k+ msg/s com latência de sub-milissegundo em broker in-memory.',
    'proj.saga.name':       'SAGA COMMERCE',
    'proj.saga.desc':       'Construído para entender transações distribuídas sem two-phase commit. Implementa o padrão Saga via Apache Kafka para estudar compensação e consistência eventual em microsserviços.',
    'proj.cloud.name':      'GIGA CLOUD INFRA',
    'proj.cloud.desc':      'Exploração de infraestrutura Serverless com TypeScript e padrões AWS-native. Foco em cold start mitigation e observabilidade estruturada para ambientes globais.',
    'proj.aura.name':       'AURA BALANCER',
    'proj.aura.desc':       'Projeto para dominar programação de sistemas em C++. Implementa roteamento Layer 7 com POSIX Sockets e round-robin para entender gerenciamento de memória e I/O de baixo nível.',
    'proj.skate.name':      'SKATETECH APP',
    'proj.skate.desc':      'Aplicação mobile full-cycle para explorar React Native, TypeScript e UX de geolocalização em tempo real. Da UI ao mapa de picos, construído para skatistas de SP.',
    'proj.showroom.name':   'SHOWROOM VELOCIDADE',
    'proj.showroom.desc':   'SaaS comercial real. WaaS multi-tenant para concessionárias com 100/100 Lighthouse, SSG/ISR e deep link WhatsApp como canal primário de conversão.',

    // Architecture
    'arch.title':           'SYSTEM\nTOPOLOGY',
    'arch.step1.title':     '01. INGRESS GATEWAY',
    'arch.step1.desc':      'Roteamento de alta performance com rate limiting em Redis e terminação TLS. Padrão para sistemas que suportam 15k+ req/sec sem degradação.',
    'arch.step2.title':     '02. EVENT STREAMING',
    'arch.step2.desc':      'Apache Kafka como backbone assíncrono. Desacoplamento de produtores e consumidores para tolerância a picos e zero perda de dados em falhas.',
    'arch.step3.title':     '03. WORKER NODES',
    'arch.step3.desc':      'Microsserviços autônomos consumindo partições Kafka em paralelo. Escalabilidade horizontal por latência — o modelo que me fascina estudar.',

    // Bento / About
    'bento.title':          'UM POUCO\nSOBRE MIM',
    'bento.academic.tag':   'ESTUDANTE · CIÊNCIA DA COMPUTAÇÃO',
    'bento.academic.title': 'UNIVERSIDADE MACKENZIE',
    'bento.academic.desc':  'Apaixonado pelos fundamentos: algoritmos, estruturas de dados, sistemas operacionais. A universidade me dá a base; a curiosidade me empurra para ir além dela.',
    'bento.lead.tag':       'IA COMO CO-PILOTO',
    'bento.lead.title':     'ENGENHARIA AUMENTADA',
    'bento.lead.desc':      'Uso Inteligência Artificial não como atalho, mas como alavanca. Com ela, projeto, itero e entrego arquiteturas que normalmente exigiriam uma equipe inteira — mantendo total domínio técnico sobre cada decisão.',
    'bento.rnd.tag':        'MÃO NA MASSA',
    'bento.rnd.title':      'CONSTRUIR PARA APRENDER',
    'bento.rnd.desc':       'Não acredito em aprender só lendo. Cada projeto aqui foi construído para questionar um conceito que eu queria entender de verdade: consenso, concorrência, tolerância a falhas, performance.',

    // Timeline
    'timeline.title':       'CAREER\nPATH',

    // Vault
    'vault.title':          'NÚCLEO\nDE DADOS',

    // Footer CTA
    'footer.cta':           'LET\'S BUILD\nSOMETHING.',

    // Theater
    'theater.back':         '← VOLTAR AO SISTEMA',
    'theater.github':       'VER CÓDIGO NO GITHUB',
    'theater.wip':          '[ DIAGRAMA DE ARQUITETURA EM BREVE ]',
    'theater.standby':      'SYSTEM STANDBY... AWAITING DEPLOYMENT',

    // Command palette
    'cmd.placeholder':      'O que você está procurando? (Projetos, Skills...)',
    'cmd.item1':            'Laboratório de Projetos',
    'cmd.item2':            'Sobre Mim',
    'cmd.item3':            'Linha do Tempo',
    'cmd.item4':            '» Abrir Terminal UNIX',
  },

  en: {
    // Nav
    'nav.search':           'SEARCH',
    'nav.search.shortcut':  'CTRL+K',

    // Hero
    'hero.tagline':         '[ AI-AUGMENTED CS STUDENT ]',
    'hero.desc':            'Computer Science student building distributed systems architecture at 10x speed — leveraging Software Engineering and Artificial Intelligence as a force multiplier.',

    // Marquee
    'marquee.1': 'AI-AUGMENTED ENGINEERING',
    'marquee.2': 'DISTRIBUTED SYSTEMS',
    'marquee.3': 'CONTINUOUS LEARNING',
    'marquee.4': '10X VELOCITY',

    // Dashboard
    'dashboard.title':      'TECHNICAL\nLEVEL',
    'dashboard.subtitle':   'Fundamentals + AI as Leverage',
    'dashboard.desc':       'Passionate about CS fundamentals. I use Artificial Intelligence as my co-pilot to design and ship systems that would normally require an entire engineering team.',
    'dashboard.focus':      'CS FUNDAMENTALS · AI-AUGMENTED',

    // Arsenal / Projects
    'arsenal.title':        'MY PROJECTS',
    'arsenal.desc':         'Projects built to explore, master and question the principles behind high-level distributed systems.',
    'arsenal.explore':      'EXPLORE PROJECT',
    'arsenal.wip':          'IN DEVELOPMENT',

    // Project descriptions
    'proj.raftkv.name':     'RAFT K-V STORE',
    'proj.raftkv.desc':     'Built to understand distributed consensus in practice. Implements the Raft algorithm from scratch in Rust — exploring leader election, log replication and strong consistency.',
    'proj.gigamq.name':     'GIGA MESSAGE QUEUE',
    'proj.gigamq.desc':     'A project to master real concurrency in Go. Explores Goroutines, Channels and fan-out patterns to achieve 100k+ msg/s with sub-millisecond latency in an in-memory broker.',
    'proj.saga.name':       'SAGA COMMERCE',
    'proj.saga.desc':       'Built to understand distributed transactions without two-phase commit. Implements the Saga pattern via Apache Kafka to study compensation and eventual consistency in microservices.',
    'proj.cloud.name':      'GIGA CLOUD INFRA',
    'proj.cloud.desc':      'An exploration of Serverless infrastructure with TypeScript and AWS-native patterns. Focus on cold start mitigation and structured observability for global-scale environments.',
    'proj.aura.name':       'AURA BALANCER',
    'proj.aura.desc':       'Built to master systems programming in C++. Implements Layer 7 routing with POSIX Sockets and round-robin to deeply understand memory management and low-level I/O.',
    'proj.skate.name':      'SKATETECH APP',
    'proj.skate.desc':      'Full-cycle mobile app to explore React Native, TypeScript and real-time geolocation UX. From UI to spot mapping — built for São Paulo\'s skate community.',
    'proj.showroom.name':   'SHOWROOM VELOCIDADE',
    'proj.showroom.desc':   'A real commercial SaaS. Multi-tenant WaaS for car dealerships: 100/100 Lighthouse, SSG/ISR and WhatsApp deep links as the primary conversion channel.',

    // Architecture
    'arch.title':           'SYSTEM\nTOPOLOGY',
    'arch.step1.title':     '01. INGRESS GATEWAY',
    'arch.step1.desc':      'High-performance routing with Redis rate-limiting and TLS termination. The standard for systems handling 15k+ req/sec without degradation.',
    'arch.step2.title':     '02. EVENT STREAMING',
    'arch.step2.desc':      'Apache Kafka as the async backbone. Producer-consumer decoupling for spike tolerance and zero data loss on failures.',
    'arch.step3.title':     '03. WORKER NODES',
    'arch.step3.desc':      'Autonomous microservices consuming Kafka partitions in parallel. Latency-based horizontal scaling — the model I find most fascinating to study.',

    // Bento / About
    'bento.title':          'A BIT\nABOUT ME',
    'bento.academic.tag':   'STUDENT · COMPUTER SCIENCE',
    'bento.academic.title': 'MACKENZIE UNIVERSITY',
    'bento.academic.desc':  'Passionate about fundamentals: algorithms, data structures, operating systems. University gives me the foundation; curiosity pushes me beyond it.',
    'bento.lead.tag':       'AI AS CO-PILOT',
    'bento.lead.title':     'AUGMENTED ENGINEERING',
    'bento.lead.desc':      'I use Artificial Intelligence not as a shortcut, but as a force multiplier. With it, I design, iterate and ship architectures that would normally require a full team — while maintaining complete technical ownership over every decision.',
    'bento.rnd.tag':        'HANDS ON',
    'bento.rnd.title':      'BUILD TO LEARN',
    'bento.rnd.desc':       'I don\'t believe in learning by just reading. Every project here was built to challenge a concept I wanted to truly understand: consensus, concurrency, fault tolerance, performance.',

    // Timeline
    'timeline.title':       'CAREER\nPATH',

    // Vault
    'vault.title':          'DATA\nCORE',

    // Footer CTA
    'footer.cta':           'LET\'S BUILD\nSOMETHING.',

    // Theater
    'theater.back':         '← BACK TO SYSTEM',
    'theater.github':       'VIEW CODE ON GITHUB',
    'theater.wip':          '[ ARCHITECTURE DIAGRAM COMING SOON ]',
    'theater.standby':      'SYSTEM STANDBY... AWAITING DEPLOYMENT',

    // Command palette
    'cmd.placeholder':      'What are you looking for? (Projects, Skills...)',
    'cmd.item1':            'Project Lab',
    'cmd.item2':            'About Me',
    'cmd.item3':            'Timeline',
    'cmd.item4':            '» Open UNIX Terminal',
  }
};


// ─── Engine ───────────────────────────────────────────────────────────────────

window.I18n = (() => {
  let currentLang = localStorage.getItem('portfolio-lang') || 'pt';

  function t(key) {
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS['pt'][key] || key;
  }

  function applyLang() {
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      // Support newlines via <br> in innerHTML
      el.innerHTML = val.replace(/\n/g, '<br>');
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });

    // Update toggle button state
    const btn = document.getElementById('lang-toggle-btn');
    if (btn) {
      btn.querySelector('.lang-active').textContent  = currentLang.toUpperCase();
      btn.querySelector('.lang-inactive').textContent = currentLang === 'pt' ? 'EN' : 'PT';
    }

    // Notify other modules (e.g. GSAP text splits that need re-splitting)
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  }

  function setLang(lang) {
    if (lang !== 'pt' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem('portfolio-lang', lang);
    applyLang();
  }

  function toggle() {
    setLang(currentLang === 'pt' ? 'en' : 'pt');
  }

  function init() {
    applyLang();
    const btn = document.getElementById('lang-toggle-btn');
    if (btn) btn.addEventListener('click', toggle);
  }

  return { init, setLang, toggle, t, get lang() { return currentLang; } };
})();
