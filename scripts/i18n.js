(function () {
  'use strict';

  var currentLang = 'es';

  var translations = {
    es: {
      'skip-link': 'Saltar al contenido',
      'nav-toggle-aria': 'Abrir menú',
      'theme-aria': 'Cambiar tema claro/oscuro',
      'top-aria': 'Volver arriba',
      'meta-description': 'Manager en Accenture al frente de un equipo full stack en Business Insights & Analytics (Corporate Finance). Más de 10 años en educación técnica.',
      'sk-team': 'Gestión de equipos',
      'sk-techlead': 'Liderazgo técnico',
      'sk-coaching': 'Coaching y mentoring',
      'sk-project': 'Gestión de proyectos',
      'sk-product': 'Gestión de productos digitales',
      'sk-digital': 'Transformación digital',
      'sk-training': 'Formación técnica',
      'nav-about': 'Acerca de Mí',
      'nav-skills': 'Conocimientos',
      'nav-experience': 'Experiencia',
      'skills-title': 'Conocimientos',
      'skills-frontend': 'Frontend',
      'skills-backend': 'Backend',
      'skills-cloud': 'Cloud & DevOps',
      'skills-ai': 'Datos & AI',
      'skills-mgmt': 'Gestión',
      'nav-education': 'Educación',
      'nav-certifications': 'Certificaciones',
      'nav-contact': 'Contacto',
      'hero-greeting': 'Hola!',
      'hero-title': 'Soy Ezequiel Binker',
      'hero-role': 'Manager @ Accenture',
      'hero-cta': 'Contactame!',
      'about-title': 'Hola! Me llamo Ezequiel Binker.',
      'about-p': 'Manager en Accenture, al frente de un equipo de desarrolladores full stack dentro de Business Insights &amp; Analytics, área de Corporate Finance. Lidero la construcción de productos digitales que aceleran la transformación digital y optimizan las herramientas de trabajo del negocio.<br><br>Complemento este perfil con más de 10 años de experiencia en educación técnica, lo que me da una capacidad clara para formar equipos y comunicar con eficacia.',
      'exp-title': 'Experiencia Laboral',
      'label-resp': 'Responsabilidades',
      'label-logros': 'Logros',
      'acn-title': 'Líder de Desarrollo Web',
      'acn-dates': '(Nov 2024 - Presente)',
      'acn-r1': 'Desarrollo web utilizando principalmente React.js y Node.js',
      'acn-r2': 'A cargo de 3 desarrolladores web con asignación a más de 20 proyectos web',
      'acn-l1': 'Mejoras en la velocidad de entrega de valor en los diferentes productos',
      'acn-l2': 'Construcción de un equipo de desarrollo web robusto y multidisciplinario',
      'rexx-title': 'Desarrollador Full Stack y Líder Técnico',
      'rexx-dates': '(May 2024 - Nov 2024)',
      'rexx-r1': 'Desarrollo Full Stack: Electron (JavaScript), Node, EJS, Laravel (PHP) y Angular',
      'rexx-r2': 'Decisiones de arquitectura de código para nuevos proyectos',
      'rexx-r3': 'Coaching a miembros del equipo de desarrollo',
      'rexx-l1': 'Mejoras en la gestión de proyectos usando GitHub Projects, Slack y organizaciones de GitHub',
      'rexx-l2': 'Mejoras en la documentación de código y diseño con Google Drive y Notion',
      'wad-title': 'Desarrollador Backend',
      'wad-dates': '(Nov 2021 - Nov 2023)',
      'wad-r1': 'Implementación de microservicios y REST con Nest.js (TypeScript) + SQL Server',
      'wad-r2': 'Mantenimiento de CI/CD mediante CircleCI y Microsoft Azure',
      'wad-r3': 'Investigación y desarrollo de aplicaciones descentralizadas con Solidity',
      'wad-l1': 'Liderazgo del proyecto core del banco a los 6 meses de ingreso',
      'wad-l2': 'Coaching de ingresantes transmitiendo filosofía y cultura de trabajo de la organización',
      'wad-l3': 'Mejora notable en el ritmo de salida de nuevas versiones del producto',
      'ort-title': 'Docente de Informática',
      'ort-dates': '(Mar 2016 - Presente)',
      'ort-r1': 'Planificación y ejecución de clases de desarrollo web',
      'ort-r2': 'Lenguajes y Frameworks: .NET MVC (C#), HTML, CSS, JavaScript',
      'ort-r3': 'Dirección de planes educativos dentro del departamento',
      'ort-l1': 'Aumento de hasta un 50% de estudiantes que eligen continuar la especialización',
      'ort-l2': 'Modernización de los planes educativos actuales en pos de las exigencias del mercado',
      'edu-title': 'Educación',
      'edu-1-degree': 'Licenciatura en Tecnologías de la Información',
      'edu-1-body': 'Trabajo Final de Grado: "Bot Docente". Proyecto desarrollado en Python utilizando Telegram Bot API y librerías de IA, como SpaCy y NLTK. Despliegue de un bot conversacional disponible en la plataforma Telegram, como apoyo complementario a la labor docente.',
      'edu-1-link': 'Enlace al proyecto &gt;',
      'edu-2-degree': 'Tecnicatura en Análisis de Sistemas',
      'edu-2-body': 'Proyecto Final destacado: Desarrollo de una aplicación web PHP para un emprendimiento de Yoga y Pilates.',
      'edu-2-tech': 'Tecnologías: Symfony Framework (PHP), MySQL, Amazon Web Services',
      'edu-3-degree': 'Bachiller Técnico - Informática',
      'edu-3-body': 'Proyecto final destacado: Desarrollo de una aplicación desktop para la creación de partituras musicales utilizando la tecnología de Microsoft Kinect, en el framework .NET.',
      'cert-title': 'Certificaciones',
      'cert-verify': 'Ver credencial ↗',
      'cert-anthropic-group': 'AI &amp; Agentes - 5 certificaciones',
      'contact-title': 'Contacto',
      'contact-heading': 'Sigamos en contacto!',
      'contact-text-1': 'Podés escribirme directamente a mi correo personal.',
      'contact-text-2': '¡Gracias por visitar mi sitio web!',
      'footer-role': 'Manager @ Accenture',
      'footer-rights': 'Todos los derechos reservados'
    },
    en: {
      'skip-link': 'Skip to content',
      'nav-toggle-aria': 'Open menu',
      'theme-aria': 'Toggle light/dark theme',
      'top-aria': 'Back to top',
      'meta-description': 'Manager at Accenture leading a full-stack development team in Business Insights & Analytics (Corporate Finance). 10+ years in technical education.',
      'sk-team': 'Team management',
      'sk-techlead': 'Technical leadership',
      'sk-coaching': 'Coaching & mentoring',
      'sk-project': 'Project management',
      'sk-product': 'Digital product management',
      'sk-digital': 'Digital transformation',
      'sk-training': 'Technical training',
      'nav-about': 'About Me',
      'nav-skills': 'Skills',
      'nav-experience': 'Experience',
      'skills-title': 'Skills',
      'skills-frontend': 'Frontend',
      'skills-backend': 'Backend',
      'skills-cloud': 'Cloud & DevOps',
      'skills-ai': 'Data & AI',
      'skills-mgmt': 'Management',
      'nav-education': 'Education',
      'nav-certifications': 'Certifications',
      'nav-contact': 'Contact',
      'hero-greeting': 'Hello!',
      'hero-title': "I'm Ezequiel Binker",
      'hero-role': 'Manager @ Accenture',
      'hero-cta': 'Contact me!',
      'about-title': "Hi! I'm Ezequiel Binker.",
      'about-p': "Manager at Accenture, leading a full-stack development team within Business Insights &amp; Analytics, Corporate Finance. I drive the development of digital products that accelerate digital transformation and optimize the business's working tools.<br><br>I complement this profile with more than 10 years of experience in technical education, which gives me a clear ability to build teams and communicate effectively.",
      'exp-title': 'Work Experience',
      'label-resp': 'Responsibilities',
      'label-logros': 'Achievements',
      'acn-title': 'Web Development Manager',
      'acn-dates': '(Nov 2024 - Present)',
      'acn-r1': 'Web development primarily using React.js and Node.js',
      'acn-r2': 'Managing 3 web developers across 20+ simultaneous web projects',
      'acn-l1': 'Improved delivery speed across multiple products',
      'acn-l2': 'Built a robust, multidisciplinary web development team',
      'rexx-title': 'Full Stack Developer & Technical Lead',
      'rexx-dates': '(May 2024 - Nov 2024)',
      'rexx-r1': 'Full Stack Development: Electron (JavaScript), Node, EJS, Laravel (PHP), Angular',
      'rexx-r2': 'Architectural decisions for new projects',
      'rexx-r3': 'Coaching team members',
      'rexx-l1': 'Improved project management using GitHub Projects, Slack, and GitHub organizations',
      'rexx-l2': 'Enhanced code and design documentation with Google Drive and Notion',
      'wad-title': 'Backend Developer',
      'wad-dates': '(Nov 2021 - Nov 2023)',
      'wad-r1': 'Microservices and REST implementation with Nest.js (TypeScript) + SQL Server',
      'wad-r2': 'CI/CD maintenance via CircleCI and Microsoft Azure',
      'wad-r3': 'R&D of decentralized applications using Solidity',
      'wad-l1': "Led the bank's core project after 6 months with the company",
      'wad-l2': "Onboarded new team members and transmitted the organization's work culture",
      'wad-l3': "Significantly improved the product's release pace after joining",
      'ort-title': 'Computer Science Teacher',
      'ort-dates': '(Mar 2016 - Present)',
      'ort-r1': 'Planning and delivering web development classes',
      'ort-r2': 'Languages & Frameworks: .NET MVC (C#), HTML, CSS, JavaScript',
      'ort-r3': 'Leading educational plans within the department',
      'ort-l1': 'Up to 50% increase in students choosing to continue the specialization',
      'ort-l2': 'Modernization of educational plans to meet current market demands',
      'edu-title': 'Education',
      'edu-1-degree': "Bachelor's in Information Technologies",
      'edu-1-body': '"Bot Docente" — Final Degree Project developed in Python using the Telegram Bot API and AI libraries such as SpaCy and NLTK. A conversational bot deployed on Telegram as a complementary support tool for teaching.',
      'edu-1-link': 'View project &gt;',
      'edu-2-degree': "Associate's in Systems Analysis",
      'edu-2-body': 'Outstanding Final Project: PHP web application for a Yoga and Pilates business.',
      'edu-2-tech': 'Technologies: Symfony Framework (PHP), MySQL, Amazon Web Services',
      'edu-3-degree': 'Technical High School Diploma — Computer Science',
      'edu-3-body': 'Outstanding Final Project: Desktop application for creating music scores using Microsoft Kinect technology, built on the .NET framework.',
      'cert-title': 'Certifications',
      'cert-verify': 'View credential ↗',
      'cert-anthropic-group': 'AI &amp; Agents - 5 certifications',
      'contact-title': 'Contact',
      'contact-heading': "Let's keep in touch!",
      'contact-text-1': 'Feel free to reach out directly by email.',
      'contact-text-2': 'Thank you for visiting my website!',
      'footer-role': 'Manager @ Accenture',
      'footer-rights': 'All rights reserved'
    }
  };

  function applyAttr(attr, target, lang) {
    document.querySelectorAll('[' + attr + ']').forEach(function (el) {
      var value = translations[lang][el.getAttribute(attr)];
      if (value !== undefined) {
        el.setAttribute(target, value);
      }
    });
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = translations[lang][el.getAttribute('data-i18n')];
      if (value !== undefined) {
        el.innerHTML = value;
      }
    });
    applyAttr('data-i18n-aria', 'aria-label', lang);
    applyAttr('data-i18n-content', 'content', lang);
    document.getElementById('lang-toggle').textContent = lang === 'es' ? 'EN' : 'ES';
    document.documentElement.lang = lang;
    currentLang = lang;
  }

  window.toggleLang = function () {
    var next = currentLang === 'es' ? 'en' : 'es';
    applyLang(next);
    localStorage.setItem('lang', next);
  };

  var savedLang = localStorage.getItem('lang');
  var initialLang = savedLang || (/^es/i.test(navigator.language || '') ? 'es' : 'en');
  if (initialLang !== 'es') {
    applyLang(initialLang);
  }
})();
