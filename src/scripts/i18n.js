// ─── i18n Engine ──────────────────────────────────────────────────────────────
// Vanilla JS — zero deps. Uses data-i18n attributes on elements.
// Usage: window.I18n.setLang('en')

const TRANSLATIONS = {
  pt: {
    // Nav
    'nav.search':           'SEARCH',
    'nav.search.shortcut':  'CTRL+K',

    // Hero
    'hero.tagline':         '[ SOFTWARE ENGINEER ]',
    'hero.desc':            'Estudante de Ciência da Computação na Mackenzie. Construo arquiteturas de sistemas distribuídos em velocidade 10x — usando Engenharia de Software e Inteligência Artificial como alavanca.',
    'hero.btn.dev':         'SOU RECRUTADOR / DEV',
    'hero.btn.curious':     'SOU CURIOSO / DESIGNER',

    // Marquee
    'marquee.1': 'BACKEND',
    'marquee.2': 'MOBILE',
    'marquee.3': 'FRONT-END',
    'marquee.4': 'DISTRIBUTED SYSTEMS',

    // Dashboard
    'dashboard.title.1':    'MEU',
    'dashboard.title.2':    'TOOLKIT',
    'dashboard.subtitle':   'O que eu uso no dia a dia',
    'dashboard.desc':       'Sistemas distribuídos no backend, React Native no mobile, animações feitas na mão no front. Aqui embaixo, as ferramentas.',
    'dashboard.focus':      'CS FUNDAMENTALS & ARCHITECTURE',

    // Arsenal / Projects
    'arsenal.title':        'PROJETOS',
    'arsenal.desc':         'Cada projeto nasceu de uma pergunta que eu queria responder construindo.',
    'arsenal.explore':      'EXPLORAR PROJETO',
    'arsenal.wip':          'EM DESENVOLVIMENTO',

    // Project descriptions
    'proj.raftkv.name':     'RAFT K-V STORE',
    'proj.raftkv.desc':     'Banco de dados distribuído que elege seu próprio líder. Construído do zero em Rust.',
    'proj.gigamq.name':     'GIGA MQ',
    'proj.gigamq.desc':     'Message broker que processa 100k mensagens por segundo. Escrito em Go puro.',
    'proj.saga.name':       'SAGA COMMERCE',
    'proj.saga.desc':       'Quando um pagamento falha no e-commerce, quem desfaz a operação? Este sistema.',
    'proj.cloud.name':      'GIGA CLOUD',
    'proj.cloud.desc':      'Infraestrutura serverless com TypeScript. Foco em cold start e observabilidade.',
    'proj.aura.name':       'AURA BALANCER',
    'proj.aura.desc':       'Load balancer em C++ com roteamento Layer 7 e POSIX sockets.',
    'proj.skate.name':      'SKATETECH',
    'proj.skate.desc':      'App de skate para encontrar picos em SP. React Native com mapa em tempo real.',
    'proj.showroom.name':   'SHOWROOM VELOCIDADE',
    'proj.showroom.desc':   'SaaS real para concessionárias. Multi-tenant, 100/100 Lighthouse, conversão via WhatsApp.',

    // Web & Front-end
    'web.title.1':          'WEB &',
    'web.title.2':          'FRONT-END',
    'web.btn.view':         'VISUALIZAR SITE',
    'web.catavento.name':   'ESCOLA CATAVENTO',
    'web.catavento.desc':   'Identidade digital lúdica para educação infantil. Acessibilidade, UI suave e performance.',
    'web.rustica.name':     'RÚSTICA MICROPADARIA',
    'web.rustica.desc':     'E-commerce hiperlocal com branding artesanal. Design limpo voltado à conversão.',

    // Architecture (now SagaCommerce real architecture)
    'arch.title':           'SYSTEM\nTOPOLOGY',
    'arch.step1.title':     '01. ORQUESTRADOR DE SAGA',
    'arch.step1.desc':      'O OrderSagaCoordinator recebe a ordem e dispara os passos em sequência. Se um falha, emite compensações pra desfazer o que já foi feito.',
    'arch.step2.title':     '02. KAFKA BACKBONE',
    'arch.step2.desc':      'Eventos fluem por tópicos Kafka. Cada serviço escuta o seu. At-least-once delivery — por isso cada handler tem guarda de idempotência.',
    'arch.step3.title':     '03. COMPENSAÇÃO',
    'arch.step3.desc':      'Inventário falhou? O orquestrador emite COMPENSATE_PAYMENT. O pagamento é revertido. A ordem é marcada como cancelada.',

    // Bento / About
    'bento.title.1':        'UM POUCO',
    'bento.title.2':        'SOBRE MIM',
    'bento.academic.tag':   '3º SEMESTRE',
    'bento.academic.title': 'CIÊNCIA DA COMPUTAÇÃO',
    'bento.academic.desc':  'Algoritmos, estruturas de dados, sistemas operacionais. A universidade constrói a base; eu testo tudo construindo projetos reais.',
    'bento.lead.tag':       'AUTODIDATA',
    'bento.lead.title':     'APRENDO RÁPIDO',
    'bento.lead.desc':      'Gosto de pegar documentação densa e transformar em código funcionando. Go, Rust, Kafka — tudo que está neste portfólio eu aprendi por conta.',
    'bento.rnd.tag':        'CONSTRUTOR',
    'bento.rnd.title':      'FAÇO PRA ENTENDER',
    'bento.rnd.desc':       'Cada projeto aqui nasceu de uma pergunta. Como funciona consenso distribuído? Implementei o Raft. Como escalar um broker? Construí o GigaMQ.',

    // Timeline
    'timeline.title.1':     'LINHA DO',
    'timeline.title.2':     'TEMPO',
    'timeline.item1.date':  '2024 - Presente',
    'timeline.item1.title': 'CIÊNCIA DA COMPUTAÇÃO @ MACKENZIE',
    'timeline.item1.desc':  'Estruturas de dados, algoritmos e sistemas operacionais na universidade. Em paralelo, construo projetos backend como autodidata.',
    'timeline.item2.date':  '2024 - Presente',
    'timeline.item2.title': 'CAPITÃO DE E-SPORTS (UNIVERSIDADE)',
    'timeline.item2.desc':  'Liderança de equipe. Empatia, inteligência emocional e resolução de conflitos — habilidades que carrego pra qualquer time de engenharia.',
    'timeline.item3.date':  '2022 - 2024',
    'timeline.item3.title': 'INÍCIO E FUNDAMENTOS',
    'timeline.item3.desc':  'Cursos de formação (Alura, EBAC). Aqui construí minha base em desenvolvimento web, APIs e bancos de dados.',

    // Kinetic Grid
    'kinetic.title':        'ENGINEERING<br>AT SCALE',

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
    'hero.tagline':         '[ SOFTWARE ENGINEER ]',
    'hero.desc':            'Computer Science student at Mackenzie University. Building distributed systems architectures at 10x speed — using Software Engineering and AI as leverage.',
    'hero.btn.dev':         'I AM A RECRUITER / DEV',
    'hero.btn.curious':     'I AM CURIOUS / DESIGNER',

    // Marquee
    'marquee.1': 'BACKEND',
    'marquee.2': 'MOBILE',
    'marquee.3': 'FRONT-END',
    'marquee.4': 'DISTRIBUTED SYSTEMS',

    // Dashboard
    'dashboard.title.1':    'MY',
    'dashboard.title.2':    'TOOLKIT',
    'dashboard.subtitle':   'What I use on a daily basis',
    'dashboard.desc':       'Distributed systems on the backend, React Native on mobile, hand-crafted animations on the front. Below, the tools.',
    'dashboard.focus':      'CS FUNDAMENTALS & ARCHITECTURE',

    // Arsenal / Projects
    'arsenal.title':        'PROJECTS',
    'arsenal.desc':         'Each project was born from a question I wanted to answer by building.',
    'arsenal.explore':      'EXPLORE PROJECT',
    'arsenal.wip':          'IN DEVELOPMENT',

    // Project descriptions
    'proj.raftkv.name':     'RAFT K-V STORE',
    'proj.raftkv.desc':     'A distributed database that elects its own leader. Built from scratch in Rust.',
    'proj.gigamq.name':     'GIGA MQ',
    'proj.gigamq.desc':     'A message broker that processes 100k messages per second. Written in pure Go.',
    'proj.saga.name':       'SAGA COMMERCE',
    'proj.saga.desc':       'When a payment fails in e-commerce, who undoes the operation? This system.',
    'proj.cloud.name':      'GIGA CLOUD',
    'proj.cloud.desc':      'Serverless infrastructure with TypeScript. Focus on cold start and observability.',
    'proj.aura.name':       'AURA BALANCER',
    'proj.aura.desc':       'C++ load balancer with Layer 7 routing and POSIX sockets.',
    'proj.skate.name':      'SKATETECH',
    'proj.skate.desc':      'Skate app to find spots in São Paulo. React Native with real-time mapping.',
    'proj.showroom.name':   'SHOWROOM VELOCIDADE',
    'proj.showroom.desc':   'A real SaaS for car dealerships. Multi-tenant, 100/100 Lighthouse, WhatsApp-driven conversion.',

    // Web & Front-end
    'web.title.1':          'WEB &',
    'web.title.2':          'FRONT-END',
    'web.btn.view':         'VIEW SITE',
    'web.catavento.name':   'CATAVENTO SCHOOL',
    'web.catavento.desc':   'Playful digital identity for early childhood education. Accessibility, smooth UI and performance.',
    'web.rustica.name':     'RUSTICA BAKERY',
    'web.rustica.desc':     'Hyper-local e-commerce with artisan branding. Clean design focused on conversion.',

    // Architecture (now SagaCommerce real architecture)
    'arch.title':           'SYSTEM\nTOPOLOGY',
    'arch.step1.title':     '01. SAGA ORCHESTRATOR',
    'arch.step1.desc':      'The OrderSagaCoordinator receives the order and fires steps in sequence. If one fails, it emits compensations to undo what was already done.',
    'arch.step2.title':     '02. KAFKA BACKBONE',
    'arch.step2.desc':      'Events flow through Kafka topics. Each service listens to its own. At-least-once delivery — that\'s why every handler has an idempotency guard.',
    'arch.step3.title':     '03. COMPENSATION',
    'arch.step3.desc':      'Inventory failed? The orchestrator emits COMPENSATE_PAYMENT. The payment is reversed. The order is marked as cancelled.',

    // Bento / About
    'bento.title.1':        'A BIT',
    'bento.title.2':        'ABOUT ME',
    'bento.academic.tag':   '3RD SEMESTER',
    'bento.academic.title': 'COMPUTER SCIENCE',
    'bento.academic.desc':  'Algorithms, data structures, operating systems. University builds the foundation; I test everything by building real projects.',
    'bento.lead.tag':       'SELF-TAUGHT',
    'bento.lead.title':     'FAST LEARNER',
    'bento.lead.desc':      'I enjoy diving into dense documentation and turning it into working code. Go, Rust, Kafka — everything in this portfolio I learned on my own.',
    'bento.rnd.tag':        'BUILDER',
    'bento.rnd.title':      'BUILD TO UNDERSTAND',
    'bento.rnd.desc':       'Every project here was born from a question. How does distributed consensus work? I implemented Raft. How to scale a broker? I built GigaMQ.',

    // Timeline
    'timeline.title.1':     'CAREER',
    'timeline.title.2':     'PATH',
    'timeline.item1.date':  '2024 - Present',
    'timeline.item1.title': 'COMPUTER SCIENCE @ MACKENZIE',
    'timeline.item1.desc':  'Data structures, algorithms and operating systems at university. In parallel, building backend projects as a self-taught engineer.',
    'timeline.item2.date':  '2024 - Present',
    'timeline.item2.title': 'UNIVERSITY E-SPORTS CAPTAIN',
    'timeline.item2.desc':  'Team leadership. Empathy, emotional intelligence and conflict resolution — skills I bring to any engineering team.',
    'timeline.item3.date':  '2022 - 2024',
    'timeline.item3.title': 'START & FUNDAMENTALS',
    'timeline.item3.desc':  'Training courses (Alura, EBAC). This is where I built my foundation in web development, APIs and databases.',

    // Kinetic Grid
    'kinetic.title':        'ENGINEERING<br>AT SCALE',

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
      if (val && typeof val === 'string') {
        el.innerHTML = val.replace(/\n/g, '<br>');
      } else {
        el.innerHTML = key;
      }
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
