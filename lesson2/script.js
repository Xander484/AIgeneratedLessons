/**
 * 2-Dars: Sehrli Qutilar va Formalar (HTML Yakuni)
 * Ibrat School • Bolalar uchun interaktiv darslik mantiqi va Web Audio tovushlari
 */

// ==========================================
// 1. Web Audio API Sintezatori
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
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.08);
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
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(650, this.ctx.currentTime + 0.15);
    osc.frequency.linearRampToValueAtTime(320, this.ctx.currentTime + 0.28);
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.28);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.28);
  }

  playLaser() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
    });
  }

  playTune() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.12 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.12);
      osc.stop(this.ctx.currentTime + idx * 0.12 + 0.2);
    });
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.09 + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.09);
      osc.stop(this.ctx.currentTime + idx * 0.09 + 0.22);
    });
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 0.25);
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
  const colors = ['#7928CA', '#FF0080', '#00DFD8', '#FFB800', '#00DF89'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = (Math.random() * 8 + 6) + 'px';
    p.style.height = (Math.random() * 12 + 8) + 'px';
    p.style.left = (x + (Math.random() * 140 - 70)) + 'px';
    p.style.top = (y + (Math.random() * 50 - 25)) + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }
}

// ==========================================
// 3. Kodi Mascoti Maslahatlari
// ==========================================
const kodiQuotes = [
  "<div> xuddi o'yinchoqlar shkafiga o'xshaydi — u barcha narsani bitta joyga yig'adi! 📦",
  "<input> darchasi — vebsaytning qulog'i va ko'zi, odamlar u yerga o'z fikrini yozadi! 👁️",
  "Parol yozganda nuqtachalar chiqishi — bu vebsaytning maxfiy josuslik qobiliyati! 🕵️‍♂️",
  "Rang tanlagich (<input type='color'>) orqali butun vebsaytni kamalakka aylantirsa bo'ladi! 🌈",
  "Qoyil! Bugun HTML to'liq yakunlanadi, endi sen haqiqiy veb-ustasisan! 🏆"
];

const kodiAvatar = document.getElementById('kodiAvatar');
const mascotMessage = document.getElementById('mascotMessage');

if (kodiAvatar) {
  kodiAvatar.addEventListener('click', () => {
    sfx.playBoing();
    const q = kodiQuotes[Math.floor(Math.random() * kodiQuotes.length)];
    mascotMessage.textContent = q;
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
  div: {
    title: "<div> — Katta Sehrli Shkaf (Bo'lim)",
    code: `<div class="mening-qutim">\n  <h3>O'yinchoqlar</h3>\n  <p>Lego va mashinalar</p>\n</div>`,
    explanation: `
      <h4>📦 Nima ish qiladi?</h4>
      <p><b>&lt;div&gt;</b> — vebsaytning eng mashhur tegi! U xuddi xonadagi katta shkaf kabi, bir nechta sarlavhalar, matnlar va tugmalarni bitta joyga jamlab turadi.</p>
    `,
    render: () => {
      const box = document.createElement('div');
      box.className = 'demo-div-box';
      box.innerHTML = `
        <h4 style="color:#7928CA; margin-bottom:6px;">📦 Mening Sehrli Qutim (&lt;div&gt;)</h4>
        <p style="color:#475569; font-size:0.95rem;">Bu quti ichida matn ham, tugma ham birga yashaydi!</p>
        <button style="margin-top:10px; background:#7928CA; color:white; border:none; padding:8px 18px; border-radius:999px; font-weight:700; cursor:pointer;">Quti Ichidagi Tugma</button>
      `;
      return box;
    },
    animate: (container) => {
      const box = container.querySelector('.demo-div-box');
      if (box) {
        box.style.transform = 'scale(0.85)';
        sfx.playBoing();
        setTimeout(() => {
          box.style.transform = 'scale(1.05)';
        }, 150);
        setTimeout(() => {
          box.style.transform = 'scale(1)';
        }, 300);
      }
    }
  },
  span: {
    title: "<span> — Mitti So'z Qutisi",
    code: `<p>Mening sevimli mevam bu <span class="yaltiroq">QULUPNAY</span>!</p>`,
    explanation: `
      <h4>🏷️ Nima ish qiladi?</h4>
      <p><b>&lt;span&gt;</b> butun qatorni egallamaydi! U matn ichidagi faqat bitta so'zga rang berish yoki uni alohida ko'rsatish uchun ishlatiladigan mitti quticha.</p>
    `,
    render: () => {
      const p = document.createElement('div');
      p.className = 'demo-span-sentence';
      p.innerHTML = `Bugun darsda biz <span class="magic-span" id="testSpan">Sehrli Kod</span> yozyapmiz! ✨`;
      return p;
    },
    animate: (container) => {
      const span = container.querySelector('#testSpan');
      if (span) {
        span.classList.remove('sparkle');
        void span.offsetWidth;
        span.classList.add('sparkle');
        sfx.playPop();
      }
    }
  },
  inputText: {
    title: "<input type='text'> — Matn Yozish Darchasi",
    code: `<input type="text" placeholder="Ismingizni yozing...">`,
    explanation: `
      <h4>✍️ Nima ish qiladi?</h4>
      <p><b>&lt;input type="text"&gt;</b> foydalanuvchiga kompyuterda yoki telefonda o'z ismini, xabarini yoki qidiruv so'zini yozish imkonini beradi!</p>
    `,
    render: () => {
      const wrap = document.createElement('div');
      wrap.innerHTML = `
        <input type="text" class="demo-input-text" placeholder="Bu yerga biror narsa yozing..." value="Salom, Kodi!">
        <div style="margin-top:12px; font-weight:700; color:#7928CA;" id="liveTypeEcho">Siz yozdingiz: Salom, Kodi!</div>
      `;
      const input = wrap.querySelector('input');
      const echo = wrap.querySelector('#liveTypeEcho');
      input.addEventListener('input', () => {
        echo.textContent = 'Siz yozdingiz: ' + (input.value || '...');
        sfx.playPop();
      });
      return wrap;
    },
    animate: (container) => {
      const input = container.querySelector('input');
      if (input) {
        input.focus();
        sfx.playPop();
      }
    }
  },
  inputPassword: {
    title: "<input type='password'> — Maxfiy Parol Darchasi",
    code: `<input type="password" placeholder="Maxfiy parolingiz...">`,
    explanation: `
      <h4>🔒 Nima ish qiladi?</h4>
      <p><b>type="password"</b> qilinganda, yozilgan harflar o'rniga yulduzchalar yoki qora nuqtachalar ko'rinadi! Shunda yoningizdagi odam parolingizni bilolmaydi!</p>
    `,
    render: () => {
      const wrap = document.createElement('div');
      wrap.innerHTML = `
        <input type="password" class="demo-input-text" value="SuperJosus2026" id="demoPassField">
        <div style="margin-top:10px;">
          <button id="toggleEyeBtn" style="background:#E9D5FF; border:none; padding:6px 14px; border-radius:999px; font-weight:700; cursor:pointer; color:#7928CA;">
            👁️ Parolni Ko'rish
          </button>
        </div>
      `;
      const pass = wrap.querySelector('#demoPassField');
      const btn = wrap.querySelector('#toggleEyeBtn');
      btn.onclick = () => {
        sfx.playLaser();
        if (pass.type === 'password') {
          pass.type = 'text';
          btn.textContent = "🙈 Parolni Yashirish";
        } else {
          pass.type = 'password';
          btn.textContent = "👁️ Parolni Ko'rish";
        }
      };
      return wrap;
    },
    animate: (container) => {
      const btn = container.querySelector('#toggleEyeBtn');
      if (btn) btn.click();
    }
  },
  inputColor: {
    title: "<input type='color'> — Sehrli Bo'yoq Tanlagich",
    code: `<input type="color" value="#7928CA">`,
    explanation: `
      <h4>🎨 Nima ish qiladi?</h4>
      <p><b>type="color"</b> ekranda sehrli ranglar palitrasini ochadi! Foydalanuvchi istalgan rangni tanlashi mumkin.</p>
    `,
    render: () => {
      const wrap = document.createElement('div');
      wrap.innerHTML = `
        <input type="color" class="demo-color-picker" value="#00DF89" id="colorLiveDemo">
        <div style="margin-top:10px; font-weight:700; color:#1E1B4B;" id="colorHexText">Tanlangan rang: #00DF89</div>
      `;
      const picker = wrap.querySelector('#colorLiveDemo');
      const label = wrap.querySelector('#colorHexText');
      picker.addEventListener('input', (e) => {
        sfx.playPop();
        label.textContent = 'Tanlangan rang: ' + e.target.value;
        liveScreenViewport.style.background = e.target.value + '22';
      });
      return wrap;
    },
    animate: (container) => {
      sfx.playChime();
      const picker = container.querySelector('#colorLiveDemo');
      if (picker) {
        picker.click();
      }
    }
  },
  inputCheckbox: {
    title: "<input type='checkbox'> — Belgilash Qushchasi",
    code: `<input type="checkbox" id="shirinlik"> Muzqaymoq yoqadimi?`,
    explanation: `
      <h4>☑️ Nima ish qiladi?</h4>
      <p><b>type="checkbox"</b> orqali biror narsani tanlash yoki rozilik bildirish mumkin. Masalan: "Robotlarni yaxshi ko'raman!"</p>
    `,
    render: () => {
      const wrap = document.createElement('div');
      wrap.innerHTML = `
        <label class="demo-checkbox-label">
          <input type="checkbox" id="lampCheckbox" checked>
          <span id="lampText">💡 Chiroq Yoniq!</span>
        </label>
      `;
      const check = wrap.querySelector('#lampCheckbox');
      const text = wrap.querySelector('#lampText');
      check.onchange = () => {
        if (check.checked) {
          sfx.playSuccess();
          text.textContent = "💡 Chiroq Yoniq!";
        } else {
          sfx.playPop();
          text.textContent = "🌑 Chiroq O'chiq!";
        }
      };
      return wrap;
    },
    animate: (container) => {
      const check = container.querySelector('#lampCheckbox');
      if (check) {
        check.checked = !check.checked;
        check.onchange();
      }
    }
  },
  media: {
    title: "<audio> va <video> — Musiqa va Video",
    code: `<audio src="kodi_kuy.mp3" controls></audio>\n<video src="film.mp4" controls></video>`,
    explanation: `
      <h4>🎬 Nima ish qiladi?</h4>
      <p>Saytda musiqa tinglash uchun <b>&lt;audio&gt;</b>, multfilm va videolarni tomosha qilish uchun esa <b>&lt;video&gt;</b> tegi ishlatiladi!</p>
    `,
    render: () => {
      const box = document.createElement('div');
      box.className = 'demo-media-box';
      box.innerHTML = `
        <div style="font-size:3.5rem;">🎵 📻</div>
        <button class="synth-beat-btn" id="playSynthBtn">▶️ Kodi Kuyini Tinglash!</button>
        <div style="font-size:0.85rem; color:#64748B;">Web Audio API yordamida jonli musiqiy kuy</div>
      `;
      const btn = box.querySelector('#playSynthBtn');
      btn.onclick = () => {
        sfx.playTune();
        launchConfetti();
      };
      return box;
    },
    animate: (container) => {
      const btn = container.querySelector('#playSynthBtn');
      if (btn) btn.click();
    }
  },
  form: {
    title: "<form> — Sehrli Konvert (Forma)",
    code: `<form action="/jo-natish">\n  <input type="text">\n  <button type="submit">Jo'natish</button>\n</form>`,
    explanation: `
      <h4>✉️ Nima ish qiladi?</h4>
      <p><b>&lt;form&gt;</b> — bu barcha yozilgan ma'lumotlarni, ism va parollarni xat qilib xat tashuvchi pochtachiga (serverga) topshiruvchi katta konvertdir!</p>
    `,
    render: () => {
      const wrap = document.createElement('div');
      wrap.innerHTML = `
        <div style="font-size:3.5rem; margin-bottom:8px;">💌 ➡️ 🚀</div>
        <button style="background:linear-gradient(135deg, #7928CA, #FF0080); color:white; border:none; padding:12px 24px; border-radius:999px; font-weight:800; cursor:pointer;" id="formSendDemoBtn">
          Xatni Jo'natish! (Submit)
        </button>
      `;
      const btn = wrap.querySelector('#formSendDemoBtn');
      btn.onclick = () => {
        sfx.playSuccess();
        launchConfetti();
      };
      return wrap;
    },
    animate: (container) => {
      const btn = container.querySelector('#formSendDemoBtn');
      if (btn) btn.click();
    }
  }
};

let currentTagKey = 'div';
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

  liveScreenViewport.style.background = '#FAF8FF';
  liveScreenViewport.innerHTML = '';
  const renderedEl = data.render();
  liveScreenViewport.appendChild(renderedEl);

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

// Initial setup
updateTagExplorer('div');

// ==========================================
// 6. Playground: Superqahramon Guvohnomasi
// ==========================================
const heroNameInput = document.getElementById('heroNameInput');
const heroSuitColor = document.getElementById('heroSuitColor');
const colorValLabel = document.getElementById('colorValLabel');
const powerFly = document.getElementById('powerFly');
const powerLaser = document.getElementById('powerLaser');
const powerSpeed = document.getElementById('powerSpeed');
const saveHeroBtn = document.getElementById('saveHeroBtn');

const superheroBadge = document.getElementById('superheroBadge');
const badgeTopStrip = document.getElementById('badgeTopStrip');
const badgeHeroName = document.getElementById('badgeHeroName');
const badgePowers = document.getElementById('badgePowers');

function updateHeroBadge() {
  const name = heroNameInput ? (heroNameInput.value || 'Nomsiz Qahramon') : 'Qahramon';
  const color = heroSuitColor ? heroSuitColor.value : '#7928CA';

  if (badgeHeroName) badgeHeroName.textContent = name;
  if (colorValLabel) colorValLabel.textContent = color;

  if (superheroBadge) superheroBadge.style.borderColor = color;
  if (badgeTopStrip) badgeTopStrip.style.background = color;

  // Powers
  if (badgePowers) {
    badgePowers.innerHTML = '';
    if (powerFly && powerFly.checked) {
      const span = document.createElement('span');
      span.className = 'power-tag';
      span.style.color = color;
      span.textContent = '🚀 Uchish';
      badgePowers.appendChild(span);
    }
    if (powerLaser && powerLaser.checked) {
      const span = document.createElement('span');
      span.className = 'power-tag';
      span.style.color = color;
      span.textContent = '⚡ Lazer';
      badgePowers.appendChild(span);
    }
    if (powerSpeed && powerSpeed.checked) {
      const span = document.createElement('span');
      span.className = 'power-tag';
      span.style.color = color;
      span.textContent = '🏃 Tezlik';
      badgePowers.appendChild(span);
    }
  }
}

if (heroNameInput) {
  heroNameInput.addEventListener('input', () => {
    updateHeroBadge();
  });
}

if (heroSuitColor) {
  heroSuitColor.addEventListener('input', () => {
    sfx.playPop();
    updateHeroBadge();
  });
}

[powerFly, powerLaser, powerSpeed].forEach(chk => {
  if (chk) {
    chk.addEventListener('change', () => {
      sfx.playPop();
      updateHeroBadge();
    });
  }
});

if (saveHeroBtn) {
  saveHeroBtn.addEventListener('click', () => {
    sfx.playChime();
    launchConfetti();
    if (superheroBadge) {
      superheroBadge.style.transform = 'scale(1.1) rotate(4deg)';
      setTimeout(() => {
        superheroBadge.style.transform = '';
      }, 350);
    }
    if (mascotMessage) {
      mascotMessage.textContent = `Ajoyib! Qahramon "${heroNameInput.value}" guvohnomasi tasdiqlandi! Sen haqiqiy HTML yaratuvchisisan! 🦸`;
    }
  });
}

// Initial hero badge update
updateHeroBadge();

// ==========================================
// 7. Mini-Viktorina (HTML Champion Quiz)
// ==========================================
const quizQuestions = [
  {
    question: "1. Bir nechta elementlarni bitta katta qutiga solib tartibga keltirish uchun qaysi teg kerak?",
    options: [
      { text: "<div> (Katta Shkaf)", correct: true },
      { text: "<span> (Mitti so'z)", correct: false },
      { text: "<img> (Rasm)", correct: false }
    ],
    hint: "<div> — vebsaytda elementlarni guruhlash uchun eng asosiy katta qutidir!"
  },
  {
    question: "2. Foydalanuvchi o'z ismini yozishi uchun qaysi sehrli teg qo'yiladi?",
    options: [
      { text: "<button>", correct: false },
      { text: "<input type='text'>", correct: true },
      { text: "<audio>", correct: false }
    ],
    hint: "<input type='text'> — bu foydalanuvchi matn yozishi mumkin bo'lgan darchadir!"
  },
  {
    question: "3. Parol yozganda harflar ko'rinmasdan nuqtacha bo'lib turishi uchun nima yozamiz?",
    options: [
      { text: "type='password'", correct: true },
      { text: "type='color'", correct: false },
      { text: "type='secret'", correct: false }
    ],
    hint: "Ingliz tilida parol 'password' bo'ladi, shuning uchun type='password' qilinadi!"
  },
  {
    question: "4. Vebsaytga musiqa yoki qo'shiq qo'yish uchun qaysi teg ishlatiladi?",
    options: [
      { text: "<music>", correct: false },
      { text: "<sound>", correct: false },
      { text: "<audio>", correct: true }
    ],
    hint: "Musiqa va tovushlar uchun rasmiy teg — <audio> hisoblanadi!"
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
    quizFeedback.innerHTML = `🎉 <b>To'ppa-to'g'ri!</b> Ajoyib! ${question.hint}`;
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
    quizFeedback.innerHTML = `💡 <b>Qayg'urma!</b> Eslab qol: ${question.hint}`;
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
    celebrationText.textContent = "DAHSHAT! Barcha 4 ta savolga 100% to'g'ri javob berding! Sen butun HTML qismini a'lo baho bilan yakunlading! 🚀";
  } else {
    celebrationText.textContent = `Barakalla! Sen ${quizStars} ta yulduz to'plading va HTML ni to'liq o'rganib chiqding! 🎉`;
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
