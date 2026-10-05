// ==========================================================================
// Tezkor Kodchi: HTML & CSS Klaviatura O'yini (Game Logic)
// ==========================================================================

// --- Audio Synthesizer (Web Audio API) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let soundEnabled = true;

function playSound(type) {
  if (!soundEnabled) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'type') {
    // Mechanical key click
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650 + Math.random() * 80, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.start(now);
    osc.stop(now + 0.04);
  } else if (type === 'error') {
    // Soft error buzz
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.12);
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
  } else if (type === 'line_complete') {
    // Satisfying chord on line complete
    const chord = [523.25, 659.25, 783.99]; // C5, E5, G5
    chord.forEach((freq, idx) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.connect(g);
      g.connect(audioCtx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + idx * 0.05);
      g.gain.setValueAtTime(0.1, now + idx * 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.3);
      o.start(now + idx * 0.05);
      o.stop(now + idx * 0.05 + 0.3);
    });
  } else if (type === 'victory') {
    // Arcade victory fanfare
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.connect(g);
      g.connect(audioCtx.destination);
      o.type = 'triangle';
      o.frequency.setValueAtTime(freq, now + i * 0.12);
      g.gain.setValueAtTime(0.12, now + i * 0.12);
      g.gain.linearRampToValueAtTime(0, now + i * 0.12 + 0.35);
      o.start(now + i * 0.12);
      o.stop(now + i * 0.12 + 0.35);
    });
  }
}

document.getElementById('soundToggleBtn').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  document.getElementById('soundIcon').innerText = soundEnabled ? '🔊' : '🔇';
  if (soundEnabled) playSound('type');
});

// --- Typing Game Datasets ---
const gameLevels = {
  html_basic: [
    {
      title: "1. Sehrli Bosmachoq (Button)",
      code: "<button>Meni Bos!</button>",
      kodi: "Sehrli tugma kodini teramiz! Har bir harfni to'g'ri bosing!",
      render: () => '<button class="spawn-anim" style="padding: 14px 28px; font-size: 1.2rem; background: #FF5376; color: white; border: none; border-radius: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 8px 20px rgba(255,83,118,0.4);">Meni Bos!</button>'
    },
    {
      title: "2. Bahaybat Sarlavha (H1)",
      code: "<h1>Salom Kodi!</h1>",
      kodi: "Bahaybat sarlavha yaratamiz! `<h1>` tegi eng kattasi!",
      render: () => '<h1 class="spawn-anim" style="font-size: 2.2rem; color: #4E65FF; font-weight: 900;">Salom Kodi!</h1>'
    },
    {
      title: "3. Qiziqarli Ertak Matni (P)",
      code: "<p>Dasturlash juda zo'r!</p>",
      kodi: "`<p>` tegi matnlar va ertaklar yozish uchun xizmat qiladi!",
      render: () => '<p class="spawn-anim" style="font-size: 1.25rem; color: #1E1B4B; background: #EEF2FF; padding: 12px 24px; border-radius: 8px; font-weight: 600;">Dasturlash juda zo\'r!</p>'
    },
    {
      title: "4. Teleport Havola (A)",
      code: "<a href='#'>Sehrli Havola</a>",
      kodi: "`<a>` tegi boshqa saytlarga teleport qiladi!",
      render: () => '<a href="#" class="spawn-anim" style="font-size: 1.2rem; color: #00D2FF; font-weight: bold; text-decoration: underline;">Sehrli Havola 🚀</a>'
    },
    {
      title: "5. Baquvvat So'z (Strong)",
      code: "<strong>Super Qahramon</strong>",
      kodi: "`<strong>` tegi so'zlarga baquvvat mushaklar beradi!",
      render: () => '<strong class="spawn-anim" style="font-size: 1.4rem; color: #DC2626; background: #FEE2E2; padding: 6px 16px; border-radius: 6px;">💪 Super Qahramon</strong>'
    }
  ],
  html_adv: [
    {
      title: "1. Sehrli Matn Katagi (Input)",
      code: "<input type='text'>",
      kodi: "Foydalanuvchi matn yoza oladigan quticha yasaymiz!",
      render: () => '<input class="spawn-anim" type="text" placeholder="Bu yerga yozing..." style="padding: 12px 18px; font-size: 1.1rem; border: 2px solid #4E65FF; border-radius: 10px; outline: none; width: 250px;">'
    },
    {
      title: "2. Katta Sehrli Quti (Div)",
      code: "<div class='box'>Katta Quti</div>",
      kodi: "`<div>` — bu har xil elementlarni bitta uyga yig'uvchi quti!",
      render: () => '<div class="spawn-anim" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px 35px; border-radius: 16px; font-weight: bold; font-size: 1.2rem;">📦 Katta Quti</div>'
    },
    {
      title: "3. Sehrli Tanlov Qutisi (Checkbox)",
      code: "<input type='checkbox'>",
      kodi: "Belgilab qo'yish mumkin bo'lgan quvnoq pitichka!",
      render: () => '<label class="spawn-anim" style="display: flex; align-items: center; gap: 10px; font-size: 1.2rem; font-weight: bold; cursor: pointer;"><input type="checkbox" checked style="width: 26px; height: 26px; accent-color: #22C55E;"> Kodi bilan do\'stman</label>'
    },
    {
      title: "4. Ranglar Tanlagichi (Color)",
      code: "<input type='color'>",
      kodi: "Sevimli rangingizni tanlash imkonini beruvchi tugmacha!",
      render: () => '<input class="spawn-anim" type="color" value="#FF5376" style="width: 60px; height: 60px; border: none; border-radius: 50%; cursor: pointer;">'
    },
    {
      title: "5. So'rovnoma Formasi (Form)",
      code: "<form><button>Yuborish</button></form>",
      kodi: "Barcha ma'lumotlarni yuboruvchi anketa!",
      render: () => '<form class="spawn-anim" onsubmit="event.preventDefault(); alert(\'Yuborildi!\');"><button style="background: #22C55E; color: white; border: none; padding: 12px 24px; border-radius: 999px; font-size: 1.1rem; font-weight: bold; cursor: pointer;">✉️ Yuborish</button></form>'
    }
  ],
  css_style: [
    {
      title: "1. Yozuv Rangi (Color)",
      code: "color: #FF5376;",
      kodi: "Yozuvni chiroyli qizg'ish rangga bo'yaymiz!",
      render: () => '<div class="spawn-anim" style="font-size: 1.6rem; font-weight: 800; color: #FF5376;">Yozuv Qizg\'ish Bo\'ldi! 🎨</div>'
    },
    {
      title: "2. Orqa Fon Rangi (Background)",
      code: "background-color: #00F0FF;",
      kodi: "Qutining butun ichki qismini moviy rangga kiyintiramiz!",
      render: () => '<div class="spawn-anim" style="background-color: #00F0FF; color: #1E1B4B; padding: 18px 30px; border-radius: 12px; font-weight: 900; font-size: 1.2rem;">Orqa Fon Moviy! 🌊</div>'
    },
    {
      title: "3. Yumaloq Burchaklar (Border-Radius)",
      code: "border-radius: 25px;",
      kodi: "O'tkir burchaklarni silliqlab yumaloq qilib qo'yamiz!",
      render: () => '<div class="spawn-anim" style="background: #FFC837; color: #854D0E; padding: 18px 30px; border-radius: 25px; font-weight: 900; font-size: 1.2rem; border: 3px solid #EAB308;">Burchaklar Yumaloq! 🔘</div>'
    },
    {
      title: "4. Ichki Yostiqcha (Padding)",
      code: "padding: 30px;",
      kodi: "Yozuv devorga tegib ketmasligi uchun ichki bo'shliq beramiz!",
      render: () => '<div class="spawn-anim" style="background: #7928CA; color: white; padding: 30px; border-radius: 16px; font-weight: 800; font-size: 1.2rem;">Katta Havo Yostiqchasi! ☁️</div>'
    },
    {
      title: "5. Lazer Devor (Border)",
      code: "border: 4px dashed gold;",
      kodi: "Quti atrofida uzuq-uzuq oltin devor quramiz!",
      render: () => '<div class="spawn-anim" style="border: 4px dashed gold; background: #FFFBEB; padding: 20px 30px; border-radius: 12px; font-weight: 800; font-size: 1.2rem; color: #B45309;">Oltin Lazer Devor! 🧱</div>'
    }
  ],
  boss_rush: [
    {
      title: "1. Super Bosmachoq (HTML + CSS)",
      code: "<button class='super'>Kodi</button>",
      kodi: "Super-qahramon tugmasini chaqiramiz!",
      render: () => '<button class="spawn-anim" style="background: linear-gradient(135deg, #FF5376, #FFC837); color: white; border: none; padding: 16px 36px; border-radius: 999px; font-size: 1.3rem; font-weight: 900; box-shadow: 0 10px 25px rgba(255,83,118,0.5);">⚡ SUPER KODI</button>'
    },
    {
      title: "2. Oltin Sarlavha (Style)",
      code: "<h1 style='color: gold;'>Yulduz</h1>",
      kodi: "Teg ichida to'g'ridan-to'g'ri oltin uslub beramiz!",
      render: () => '<h1 class="spawn-anim" style="color: gold; text-shadow: 0 0 15px orange; font-size: 2.5rem; font-weight: 900;">⭐ YULDUZ KODCHI</h1>'
    },
    {
      title: "3. Shakl O'zgarishi (Transform)",
      code: "transform: scale(1.2);",
      kodi: "Elementni 1.2 barobar kattalashtiramiz!",
      render: () => '<div class="spawn-anim" style="transform: scale(1.2); background: #22C55E; color: white; padding: 15px 30px; border-radius: 14px; font-weight: 900;">🚀 KATTALASHDI!</div>'
    }
  ]
};

// --- Game State ---
let currentCategory = 'html_basic';
let currentTaskIndex = 0;
let currentCharIndex = 0;
let targetCode = "";
let totalTypedChars = 0;
let totalErrors = 0;
let startTime = null;
let coins = 0;

const codeDisplayArea = document.getElementById('codeDisplayArea');
const hiddenInput = document.getElementById('hiddenInput');
const currentKeyBadge = document.getElementById('currentKeyBadge');
const taskTitle = document.getElementById('taskTitle');
const roundBadge = document.getElementById('roundBadge');
const kodiBubble = document.getElementById('kodiBubble');
const sandboxViewport = document.getElementById('sandboxViewport');
const sandboxStatus = document.getElementById('sandboxStatus');
const cpmText = document.getElementById('cpmText');
const accText = document.getElementById('accText');
const coinsText = document.getElementById('coinsText');
const terminalBox = document.getElementById('terminalBox');

// Load stored coins
try {
  coins = parseInt(localStorage.getItem('kodi_coins') || '0', 10);
  coinsText.innerText = coins;
} catch (e) {}

// Focus hidden input on clicking terminal
terminalBox.addEventListener('click', () => {
  hiddenInput.focus();
});
document.addEventListener('click', () => {
  hiddenInput.focus();
});

// Category Switcher
document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    playSound('type');
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCategory = tab.dataset.cat;
    currentTaskIndex = 0;
    loadTask();
  });
});

// Skip task button
document.getElementById('skipTaskBtn').addEventListener('click', () => {
  playSound('type');
  nextTask();
});

// --- Load Task ---
function loadTask() {
  const tasks = gameLevels[currentCategory];
  if (currentTaskIndex >= tasks.length) {
    showVictoryModal();
    return;
  }

  const currentTask = tasks[currentTaskIndex];
  targetCode = currentTask.code;
  currentCharIndex = 0;

  // Header info
  taskTitle.innerText = currentTask.title;
  roundBadge.innerText = `Vazifa ${currentTaskIndex + 1} / ${tasks.length}`;
  kodiBubble.innerText = currentTask.kodi;

  // Reset sandbox preview
  sandboxViewport.innerHTML = `
    <div class="sandbox-placeholder" id="sandboxPlaceholder">
      ✨ Kodni to'g'ri terib tugatishingiz bilan ushbu joyda jonli element paydo bo'ladi!
    </div>
  `;
  sandboxStatus.innerText = "Yozilmoqda...";

  // Render character spans
  codeDisplayArea.innerHTML = '';
  for (let i = 0; i < targetCode.length; i++) {
    const span = document.createElement('span');
    span.className = 'char-span ' + (i === 0 ? 'char-current' : 'char-pending');
    span.innerText = targetCode[i];
    codeDisplayArea.appendChild(span);
  }

  updateKeyHint();
  hiddenInput.value = '';
  hiddenInput.focus();

  if (!startTime) {
    startTime = Date.now();
  }
}

function updateKeyHint() {
  if (currentCharIndex < targetCode.length) {
    const nextChar = targetCode[currentCharIndex];
    if (nextChar === ' ') {
      currentKeyBadge.innerText = 'SPACE (Bo\'sh joy)';
    } else {
      currentKeyBadge.innerText = nextChar;
    }
  } else {
    currentKeyBadge.innerText = 'TUGADI! 🎉';
  }
}

// --- Typing Input Listener ---
window.addEventListener('keydown', (e) => {
  // Ignore special navigation keys
  if (e.key === 'Tab' || e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
    return;
  }

  // Prevent default scrolling on space
  if (e.key === ' ' && currentCharIndex < targetCode.length) {
    e.preventDefault();
  }

  handleKeyPress(e.key);
});

function handleKeyPress(key) {
  if (currentCharIndex >= targetCode.length) return;

  const expectedChar = targetCode[currentCharIndex];
  const charSpans = codeDisplayArea.querySelectorAll('.char-span');
  const currentSpan = charSpans[currentCharIndex];

  totalTypedChars++;

  if (key === expectedChar) {
    // CORRECT KEY!
    playSound('type');
    currentSpan.className = 'char-span char-correct';

    currentCharIndex++;

    if (currentCharIndex < targetCode.length) {
      charSpans[currentCharIndex].className = 'char-span char-current';
    } else {
      // Completed line!
      finishCurrentTask();
    }
  } else {
    // WRONG KEY
    totalErrors++;
    playSound('error');
    currentSpan.classList.add('char-wrong');
    setTimeout(() => {
      currentSpan.classList.remove('char-wrong');
    }, 300);
  }

  updateKeyHint();
  updateMetrics();
}

function finishCurrentTask() {
  playSound('line_complete');
  const currentTask = gameLevels[currentCategory][currentTaskIndex];

  // Render the real live result in sandbox
  sandboxStatus.innerText = "✅ Tayyor bo'ldi!";
  sandboxViewport.innerHTML = currentTask.render();

  kodiBubble.innerText = "Ofarin! Element ekranda paydo bo'ldi! 🎉";
  addCoins(5);
  showToast("+15 XP & +5 🪙!", "⚡");

  setTimeout(() => {
    nextTask();
  }, 1600);
}

function nextTask() {
  currentTaskIndex++;
  loadTask();
}

function updateMetrics() {
  if (!startTime) return;
  const elapsedMinutes = (Date.now() - startTime) / 60000;
  if (elapsedMinutes > 0.05) {
    const cpm = Math.round(totalTypedChars / elapsedMinutes);
    cpmText.innerText = cpm;
  }

  const accuracy = totalTypedChars > 0 
    ? Math.max(0, Math.round(((totalTypedChars - totalErrors) / totalTypedChars) * 100))
    : 100;
  accText.innerText = `${accuracy}%`;
}

function addCoins(amount) {
  coins += amount;
  coinsText.innerText = coins;
  try {
    localStorage.setItem('kodi_coins', coins.toString());
    const prevXP = parseInt(localStorage.getItem('kodi_total_xp') || '0', 10);
    localStorage.setItem('kodi_total_xp', (prevXP + 25).toString());
  } catch(e) {}
}

function showToast(text, icon = '⚡') {
  const toast = document.getElementById('rewardToast');
  toast.querySelector('.reward-text').innerText = text;
  toast.querySelector('.reward-icon').innerText = icon;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// --- Victory Modal ---
function showVictoryModal() {
  playSound('victory');
  confetti();

  const modal = document.getElementById('victoryModal');
  const finalCpm = cpmText.innerText;
  const finalAcc = accText.innerText;

  document.getElementById('finalCpmVal').innerText = finalCpm;
  document.getElementById('finalAccVal').innerText = finalAcc;
  document.getElementById('finalCoinsVal').innerText = `+${gameLevels[currentCategory].length * 5} 🪙`;

  modal.classList.add('active');
}

document.getElementById('nextLevelBtn').addEventListener('click', () => {
  playSound('type');
  document.getElementById('victoryModal').classList.remove('active');

  const categories = Object.keys(gameLevels);
  const nextIdx = (categories.indexOf(currentCategory) + 1) % categories.length;
  currentCategory = categories[nextIdx];

  document.querySelectorAll('.cat-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === currentCategory);
  });

  currentTaskIndex = 0;
  loadTask();
});

// Confetti Particle Generator
function confetti() {
  for (let i = 0; i < 40; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'fixed';
    conf.style.left = Math.random() * 100 + 'vw';
    conf.style.top = '-10px';
    conf.style.width = '12px';
    conf.style.height = '12px';
    conf.style.backgroundColor = ['#FF5376', '#FFC837', '#00F0FF', '#4E65FF', '#22C55E'][Math.floor(Math.random()*5)];
    conf.style.zIndex = 99999;
    conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    conf.style.pointerEvents = 'none';
    document.body.appendChild(conf);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 4 + Math.random() * 6;
    let x = 0;
    let y = 0;

    const anim = setInterval(() => {
      x += Math.cos(angle) * velocity;
      y += 6;
      conf.style.transform = `translate(${x}px, ${y}px) rotate(${y*3}deg)`;
      if (y > window.innerHeight) {
        clearInterval(anim);
        conf.remove();
      }
    }, 20);
  }
}

// Start Game
loadTask();
