/**
 * 1-Dars: Sehrli HTML Teglari Dunyosi
 * Bolalar uchun interaktiv darslik mantiqi va Web Audio tovush effektlari
 */

// ==========================================
// 1. Web Audio API Sintezatori (Tovushlar)
// ==========================================
class SoundFX {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playBoing() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.15);
    osc.frequency.linearRampToValueAtTime(300, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.3);
    });
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const melody = [440, 554.37, 659.25, 880];
    melody.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.1 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.1);
      osc.stop(this.ctx.currentTime + idx * 0.1 + 0.2);
    });
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }
}

const sfx = new SoundFX();

// ==========================================
// 2. Konfetti Saluti Effekti
// ==========================================
function launchConfetti(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  const colors = ['#FF5376', '#FFC837', '#00C897', '#4E65FF', '#9C27B0', '#FF9900'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = (Math.random() * 8 + 6) + 'px';
    p.style.height = (Math.random() * 12 + 8) + 'px';
    p.style.left = (x + (Math.random() * 120 - 60)) + 'px';
    p.style.top = (y + (Math.random() * 40 - 20)) + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }
}

// ==========================================
// 3. Kodi Mascoti Gapirishlari
// ==========================================
const kodiQuotes = [
  "HTML teglari xuddi Lego g'ishtlariga o'xshaydi — ularni birlashtirib butun sayt quramiz! 🧱",
  "Unutma: teglarning ko'pchiligi ochilish va yopilish qopqog'iga ega! 📦",
  "Sen ajoyib dasturchi bo'lasan, shunchaki harakat qil va o'rgan! 🚀",
  "Tugmani bosganda sehr sodir bo'lishi — dasturlashning eng zo'r tomoni! ✨",
  "Menga bosganing uchun rahmat! Men Kodi — doimo yordamga shayman! 🤖"
];

const kodiAvatar = document.getElementById('kodiAvatar');
const mascotMessage = document.getElementById('mascotMessage');

if (kodiAvatar) {
  kodiAvatar.addEventListener('click', () => {
    sfx.playBoing();
    const randomQuote = kodiQuotes[Math.floor(Math.random() * kodiQuotes.length)];
    mascotMessage.textContent = randomQuote;
    kodiAvatar.style.transform = 'scale(1.2) rotate(15deg)';
    setTimeout(() => {
      kodiAvatar.style.transform = '';
    }, 300);
  });
}

// Ovoz tugmasi
const soundToggleBtn = document.getElementById('soundToggleBtn');
const soundStatusText = document.getElementById('soundStatusText');
if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', () => {
    sfx.enabled = !sfx.enabled;
    soundStatusText.textContent = sfx.enabled ? "Yoniq" : "O'chiq";
    if (sfx.enabled) sfx.playPop();
  });
}

// ==========================================
// 4. Tablarni Almashtirish
// ==========================================
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    sfx.playPop();
    const targetTab = tab.getAttribute('data-tab');

    navTabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    const targetContent = document.getElementById(targetTab);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});

// ==========================================
// 5. Teglar Laboratoriyasi (Tags Explorer)
// ==========================================
const tagsData = {
  h1: {
    title: "<h1> — Bahaybat Sarlavha",
    code: "<h1>Salom, Dunyo! Men Katta Sarlavhaman!</h1>",
    explanation: `
      <h4>📢 Nima ish qiladi?</h4>
      <p><b>&lt;h1&gt;</b> — vebsaytdagi eng katta, eng bahaybat sarlavhadir! Xuddi kitobning muqovasidagi eng yirik harflar kabi ko'rinadi. Raqam kattalashgan sari (masalan, h6) harflar mitti bo'lib boradi!</p>
    `,
    render: () => {
      const el = document.createElement('h1');
      el.className = 'giant-h1';
      el.textContent = 'Men Katta Sarlavhaman! 🦁';
      return el;
    },
    animate: (container) => {
      const h1 = container.querySelector('.giant-h1');
      if (h1) {
        h1.classList.remove('seismic-shake');
        void h1.offsetWidth; // reflow
        h1.classList.add('seismic-shake');
        sfx.playBoing();
      }
    }
  },
  p: {
    title: "<p> — Ertakchi Matn (Paragraf)",
    code: "<p>Bir bor ekan, bir yo'q ekan, qadim o'tmishda bir dono dasturchi bo'lgan ekan...</p>",
    explanation: `
      <h4>📖 Nima ish qiladi?</h4>
      <p><b>&lt;p&gt;</b> so'zi inglizcha "Paragraph" (xatboshi) so'zidan olingan. U kitoblardagi ertaklar, hikoyalar va oddiy gaplarni sahifaga chiroyli qilib terib beradi!</p>
    `,
    render: () => {
      const el = document.createElement('p');
      el.className = 'story-paragraph';
      el.textContent = "Bir bor ekan, bir yo'q ekan, qadimda kichik robot Kodi do'stlari bilan birga ajoyib vebsayt yaratgan ekan! ✨";
      return el;
    },
    animate: (container) => {
      const p = container.querySelector('.story-paragraph');
      if (p) {
        p.style.opacity = '0';
        p.style.transform = 'translateY(10px)';
        setTimeout(() => {
          p.style.transition = 'all 0.5s ease';
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
          sfx.playPop();
        }, 100);
      }
    }
  },
  button: {
    title: "<button> — Sehrli Bosmachoq (Tugma)",
    code: '<button onclick="salut()">Meni Bosib Ko\'r!</button>',
    explanation: `
      <h4>🔘 Nima ish qiladi?</h4>
      <p><b>&lt;button&gt;</b> — bu ekrandagi sehrli tugmacha! Uni sichqoncha bilan yoki barmoq bilan bosganda o'yin boshlanishi, xat ketishi yoki ranglar o'zgarishi mumkin!</p>
    `,
    render: () => {
      const btn = document.createElement('button');
      btn.className = 'bouncy-button';
      btn.innerHTML = '<span>🚀</span> Meni Bosib Ko\'r!';
      btn.onclick = (e) => {
        sfx.playChime();
        const rect = btn.getBoundingClientRect();
        launchConfetti(rect.left + rect.width / 2, rect.top);
      };
      return btn;
    },
    animate: (container) => {
      const btn = container.querySelector('.bouncy-button');
      if (btn) {
        btn.click();
      }
    }
  },
  img: {
    title: "<img> — Sehrli Foto-Ramka",
    code: '<img src="kodi_mushukcha.png" alt="Quvnoq Mushukcha">',
    explanation: `
      <h4>🖼️ Nima ish qiladi?</h4>
      <p><b>&lt;img&gt;</b> tegi vebsaytga istalgan rasmni joylashtiradi! Uning yopilish tegi yo'q (u o'z-o'zidan to'liq quticha). "src" unga rasm manzilini ko'rsatadi!</p>
    `,
    render: () => {
      const frame = document.createElement('div');
      frame.className = 'polaroid-frame';
      frame.innerHTML = `
        <div class="polaroid-img-box">🐱</div>
        <div class="polaroid-caption">Sehrli Mushukcha</div>
      `;
      return frame;
    },
    animate: (container) => {
      const frame = container.querySelector('.polaroid-frame');
      if (frame) {
        frame.style.transform = 'scale(0.7) rotate(-15deg)';
        sfx.playBoing();
        setTimeout(() => {
          frame.style.transform = 'scale(1.08) rotate(3deg)';
        }, 150);
        setTimeout(() => {
          frame.style.transform = 'rotate(-2deg)';
        }, 350);
      }
    }
  },
  a: {
    title: "<a> — Teleport Havola (Link)",
    code: '<a href="https://google.com">Boshqa Saytga Sakrash!</a>',
    explanation: `
      <h4>🚪 Nima ish qiladi?</h4>
      <p><b>&lt;a&gt;</b> — bu sehrli teleport eshigi! Uni bosishing bilan u seni butunlay yangi veb-sahifaga, yangi o'yinga yoki video tomoshaga olib boradi!</p>
    `,
    render: () => {
      const link = document.createElement('a');
      link.className = 'portal-link';
      link.href = 'javascript:void(0)';
      link.innerHTML = '<span>🌀</span> Teleport Portaliga Sakrash! 🛸';
      link.onclick = () => {
        sfx.playSuccess();
        link.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
          link.style.transform = '';
        }, 600);
      };
      return link;
    },
    animate: (container) => {
      const link = container.querySelector('.portal-link');
      if (link) link.click();
    }
  },
  ul: {
    title: "<ul> va <li> — Sehrli Ro'yxat",
    code: `<ul>\n  <li>🍦 Muzqaymoq</li>\n  <li>🍕 Pitsa</li>\n  <li>🎮 Video o'yin</li>\n</ul>`,
    explanation: `
      <h4>📋 Nima ish qiladi?</h4>
      <p><b>&lt;ul&gt;</b> — ro'yxat qutisi, <b>&lt;li&gt;</b> esa uning ichidagi har bitta narsadir. Masalan, do'kondan olinadigan shirinliklar yoki robot qismlari ro'yxati!</p>
    `,
    render: () => {
      const ul = document.createElement('ul');
      ul.className = 'animated-list';
      ul.innerHTML = `
        <li style="animation-delay: 0.1s">🍦 1. Qulupnayli Muzqaymoq</li>
        <li style="animation-delay: 0.25s">🚀 2. Kosmik Raketa Qismi</li>
        <li style="animation-delay: 0.4s">🎮 3. Sehrli Joystik</li>
      `;
      return ul;
    },
    animate: (container) => {
      sfx.playPop();
      const ul = container.querySelector('.animated-list');
      if (ul) {
        ul.querySelectorAll('li').forEach((li, idx) => {
          li.style.animation = 'none';
          void li.offsetWidth;
          li.style.animation = `slideInRight 0.4s ease ${idx * 0.15}s both`;
        });
      }
    }
  },
  strong: {
    title: "<strong> — Baquvvat Mushakdor So'z",
    code: "Bugun biz <strong>eng zo'r</strong> dasturchimiz!",
    explanation: `
      <h4>💪 Nima ish qiladi?</h4>
      <p><b>&lt;strong&gt;</b> oddiy so'zlarni qalin, baquvvat va muhim qilib ko'rsatadi! Harflarga xuddi mushak o'sib chiqqandek ko'rinadi!</p>
    `,
    render: () => {
      const st = document.createElement('div');
      st.className = 'muscle-text';
      st.innerHTML = '💪 ENG ZO\'R DASTURCHI! 🔥';
      return st;
    },
    animate: (container) => {
      const st = container.querySelector('.muscle-text');
      if (st) {
        st.classList.remove('flex-anim');
        void st.offsetWidth;
        st.classList.add('flex-anim');
        sfx.playBoing();
      }
    }
  }
};

let currentTagKey = 'h1';
const tagWindowTitle = document.getElementById('tagWindowTitle');
const tagCodeSnippet = document.getElementById('tagCodeSnippet');
const tagExplanation = document.getElementById('tagExplanation');
const liveScreenViewport = document.getElementById('liveScreenViewport');
const animateTagBtn = document.getElementById('animateTagBtn');
const tagButtons = document.querySelectorAll('.tag-selector-btn');

function updateTagExplorer(tagKey) {
  currentTagKey = tagKey;
  const data = tagsData[tagKey];
  if (!data) return;

  tagWindowTitle.textContent = data.title;
  tagCodeSnippet.textContent = data.code;
  tagExplanation.innerHTML = data.explanation;

  liveScreenViewport.innerHTML = '';
  const renderedEl = data.render();
  liveScreenViewport.appendChild(renderedEl);

  // Trigger initial animation
  data.animate(liveScreenViewport);
}

tagButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sfx.playPop();
    tagButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tagKey = btn.getAttribute('data-tag');
    updateTagExplorer(tagKey);
  });
});

if (animateTagBtn) {
  animateTagBtn.addEventListener('click', () => {
    const data = tagsData[currentTagKey];
    if (data) {
      data.animate(liveScreenViewport);
    }
  });
}

// Initial setup for Tag 1
updateTagExplorer('h1');

// ==========================================
// 6. O'zing Sinab Ko'r! (Playground)
// ==========================================
const pgInputText = document.getElementById('pgInputText');
const pgTagPills = document.querySelectorAll('.pill-btn');
const colorDots = document.querySelectorAll('.color-dot');
const pgCodeOutput = document.getElementById('pgCodeOutput');
const pgPreviewBody = document.getElementById('pgPreviewBody');
const pgCheerBtn = document.getElementById('pgCheerBtn');

let currentPgTag = 'h1';
let currentPgColor = '#4E65FF';

function renderPlayground() {
  const text = pgInputText ? (pgInputText.value || 'Matn yo\'q') : 'Salom';
  pgCodeOutput.textContent = `<${currentPgTag}>${text}</${currentPgTag}>`;

  pgPreviewBody.innerHTML = '';
  const el = document.createElement(currentPgTag);
  el.textContent = text;
  el.style.color = currentPgColor;
  el.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';

  if (currentPgTag === 'button') {
    el.style.background = currentPgColor;
    el.style.color = '#FFFFFF';
    el.style.padding = '14px 28px';
    el.style.border = 'none';
    el.style.borderRadius = '999px';
    el.style.fontSize = '1.2rem';
    el.style.fontWeight = '700';
    el.style.cursor = 'pointer';
    el.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
    el.onclick = (e) => {
      sfx.playChime();
      const rect = el.getBoundingClientRect();
      launchConfetti(rect.left + rect.width / 2, rect.top);
    };
  } else if (currentPgTag === 'h1') {
    el.style.fontSize = '2.5rem';
    el.style.fontWeight = '900';
  } else if (currentPgTag === 'h2') {
    el.style.fontSize = '1.9rem';
    el.style.fontWeight = '800';
  } else if (currentPgTag === 'p') {
    el.style.fontSize = '1.3rem';
    el.style.fontWeight = '500';
  } else if (currentPgTag === 'strong') {
    el.style.fontSize = '1.8rem';
    el.style.fontWeight = '900';
  } else if (currentPgTag === 'em') {
    el.style.fontSize = '1.4rem';
    el.style.fontStyle = 'italic';
  }

  pgPreviewBody.appendChild(el);
}

if (pgInputText) {
  pgInputText.addEventListener('input', () => {
    renderPlayground();
  });
}

pgTagPills.forEach(pill => {
  pill.addEventListener('click', () => {
    sfx.playPop();
    pgTagPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentPgTag = pill.getAttribute('data-pgtag');
    renderPlayground();
  });
});

colorDots.forEach(dot => {
  dot.addEventListener('click', () => {
    sfx.playPop();
    colorDots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    currentPgColor = dot.getAttribute('data-color');
    renderPlayground();
  });
});

if (pgCheerBtn) {
  pgCheerBtn.addEventListener('click', () => {
    sfx.playSuccess();
    const rect = pgCheerBtn.getBoundingClientRect();
    launchConfetti(rect.left, rect.top);
  });
}

// Initial playground render
renderPlayground();

// ==========================================
// 7. Mini-Viktorina (Quiz)
// ==========================================
const quizQuestions = [
  {
    question: "1. Vebsayt sahifasiga chiroyli mushukcha rasmini qo'ymoqchimiz. Qaysi sehrli teg kerak?",
    options: [
      { text: "<a> (Teleport)", correct: false },
      { text: "<img> (Foto-ramka)", correct: true },
      { text: "<h1> (Sarlavha)", correct: false }
    ],
    hint: "Rasm ingliz tilida 'Image' deyiladi, shuning uchun teg <img> bo'ladi!"
  },
  {
    question: "2. Bosganda biror o'yin yoki ajoyib hodisa ro'y berishi uchun qaysi teg qo'yiladi?",
    options: [
      { text: "<button> (Sehrli Bosmachoq)", correct: true },
      { text: "<p> (Paragraf)", correct: false },
      { text: "<ul> (Ro'yxat)", correct: false }
    ],
    hint: "<button> — bu bolalar bosishi mumkin bo'lgan quvnoq tugmachadir!"
  },
  {
    question: "3. Dunyodagi eng katta va bahaybat sarlavha qaysi teg bilan yoziladi?",
    options: [
      { text: "<h6>", correct: false },
      { text: "<h1>", correct: true },
      { text: "<strong>", correct: false }
    ],
    hint: "<h1> — 1-raqamli eng ulkan sarlavha hisoblanadi!"
  },
  {
    question: "4. HTML teglarining yopilish qopqog'ida (masalan </p>) qaysi belgi bo'ladi?",
    options: [
      { text: "/ (Yotiq tayoqcha - Slash)", correct: true },
      { text: "* (Yulduzcha)", correct: false },
      { text: "! (Undov belgisi)", correct: false }
    ],
    hint: "Teg qutisi yopilganda oldiga / (slash) belgisi qo'yiladi!"
  }
];

let currentQuestionIndex = 0;
let quizStars = 0;

const quizBox = document.getElementById('quizBox');
const questionStep = document.getElementById('questionStep');
const questionText = document.getElementById('questionText');
const optionsGrid = document.getElementById('optionsGrid');
const quizFeedback = document.getElementById('quizFeedback');
const quizScore = document.getElementById('quizScore');
const quizProgressFill = document.getElementById('quizProgressFill');
const quizCelebration = document.getElementById('quizCelebration');
const restartQuizBtn = document.getElementById('restartQuizBtn');

function loadQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    // Finish Quiz
    showCelebration();
    return;
  }

  const q = quizQuestions[currentQuestionIndex];
  questionStep.textContent = `Savol ${currentQuestionIndex + 1} / ${quizQuestions.length}`;
  questionText.textContent = q.question;
  quizProgressFill.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

  optionsGrid.innerHTML = '';
  quizFeedback.className = 'quiz-feedback';
  quizFeedback.style.display = 'none';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.onclick = () => handleAnswer(opt, btn, q);
    optionsGrid.appendChild(btn);
  });
}

function handleAnswer(selectedOpt, clickedBtn, question) {
  const allBtns = optionsGrid.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  if (selectedOpt.correct) {
    sfx.playSuccess();
    clickedBtn.classList.add('correct');
    quizStars++;
    quizScore.textContent = `${quizStars} / ${quizQuestions.length}`;
    quizFeedback.className = 'quiz-feedback success';
    quizFeedback.innerHTML = `🎉 <b>To'ppa-to'g'ri!</b> Barakalla! ${question.hint}`;
    launchConfetti();
  } else {
    sfx.playError();
    clickedBtn.classList.add('wrong');
    allBtns.forEach(b => {
      if (b.textContent.includes(question.options.find(o => o.correct).text)) {
        b.classList.add('correct');
      }
    });
    quizFeedback.className = 'quiz-feedback error';
    quizFeedback.innerHTML = `💡 <b>Qayg'urma!</b> To'g'ri javobni eslab qol: ${question.hint}`;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 2200);
}

function showCelebration() {
  quizBox.style.display = 'none';
  quizCelebration.style.display = 'block';
  sfx.playChime();
  launchConfetti(window.innerWidth / 2, window.innerHeight / 3);

  const celebrationText = document.getElementById('celebrationText');
  if (quizStars === 4) {
    celebrationText.textContent = "Super! Sen barcha 4 ta savolga 100% to'g'ri javob berding! Haqiqiy HTML mutaxassisisan! 🎖️";
  } else {
    celebrationText.textContent = `Barakalla! Sen ${quizStars} ta yulduz yig'ding! Harakat qilsang, yana ham kuchliroq bo'lasan! 🌟`;
  }
}

if (restartQuizBtn) {
  restartQuizBtn.addEventListener('click', () => {
    sfx.playPop();
    currentQuestionIndex = 0;
    quizStars = 0;
    quizScore.textContent = `0 / ${quizQuestions.length}`;
    quizBox.style.display = 'block';
    quizCelebration.style.display = 'none';
    loadQuestion();
  });
}

// Initial Quiz load
loadQuestion();
