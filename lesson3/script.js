// ==========================================================================
// 3-Dars O'yini: CSS Sehrli Bo'yoqlari & Boss Battle (10-15 Daqiqa)
// ==========================================================================

// --- Audio System (Web Audio API) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let soundEnabled = true;

function playSound(type) {
  if (!soundEnabled) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'click') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
  } else if (type === 'coin') {
    // 8-bit coin sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987, now); // B5
    osc.frequency.setValueAtTime(1318, now + 0.08); // E6
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.start(now);
    osc.stop(now + 0.35);
  } else if (type === 'laser') {
    // Laser zap
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.start(now);
    osc.stop(now + 0.25);
  } else if (type === 'hit') {
    // Monster hit sound
    osc.type = 'square';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (type === 'success') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(554, now + 0.1);
    osc.frequency.setValueAtTime(659, now + 0.2);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'error') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (type === 'victory') {
    // Trumpet victory fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.connect(g);
      g.connect(audioCtx.destination);
      o.type = 'triangle';
      o.frequency.setValueAtTime(freq, now + i * 0.12);
      g.gain.setValueAtTime(0.15, now + i * 0.12);
      g.gain.linearRampToValueAtTime(0, now + i * 0.12 + 0.35);
      o.start(now + i * 0.12);
      o.stop(now + i * 0.12 + 0.35);
    });
  }
}

// Sound toggle
document.getElementById('soundToggleBtn').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  document.getElementById('soundIcon').innerText = soundEnabled ? '🔊' : '🔇';
  if (soundEnabled) playSound('coin');
});

// Mascot interaction
document.getElementById('kodiAvatar').addEventListener('click', () => {
  playSound('coin');
  const msg = document.getElementById('mascotMessage');
  msg.innerText = "Zirhni tayyorlaylik! Bug Maxluqi dars oxirida bizni kutmoqda! 🛡️⚡";
  addReward(5, 1, "Kodi bilan gaplashildi!");
});

// --- Player State & HUD ---
let playerState = {
  xp: 0,
  coins: 0,
  level: "1-Daraja: Bo'yoq Izquvari",
  currentStage: 1
};

function addReward(xpVal, coinVal, reason = "") {
  playerState.xp = Math.min(100, playerState.xp + xpVal);
  playerState.coins += coinVal;

  document.getElementById('xpText').innerText = `${playerState.xp} / 100 XP`;
  document.getElementById('xpBarFill').style.width = `${playerState.xp}%`;
  document.getElementById('coinsText').innerText = `${playerState.coins} Tanga`;

  if (playerState.xp >= 100) {
    playerState.level = "2-Daraja: CSS Qahramoni";
    document.getElementById('playerLevelText').innerText = playerState.level;
  }

  showRewardToast(`+${xpVal} XP ${coinVal > 0 ? `+${coinVal} 🪙` : ''}`, '⚡');
  playSound('coin');
}

function showRewardToast(text, icon = '⚡') {
  const toast = document.getElementById('rewardToast');
  toast.querySelector('.reward-text').innerText = text;
  toast.querySelector('.reward-icon').innerText = icon;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// --- Mission Stepper Navigation ---
function switchStage(stageNum) {
  playerState.currentStage = stageNum;
  playSound('click');

  // Update tabs
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`stepIndicator${i}`);
    const stageEl = document.getElementById(`stage${i}`);
    
    if (i < stageNum) {
      stepEl.className = 'step-item completed';
    } else if (i === stageNum) {
      stepEl.className = 'step-item active';
    } else {
      stepEl.className = 'step-item';
    }

    if (stageEl) {
      stageEl.classList.toggle('active', i === stageNum);
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Stage 1 Button
document.getElementById('btnStartStage2').addEventListener('click', () => {
  addReward(20, 5, "1-Bosqich yakunlandi!");
  switchStage(2);
});

// Stepper click allows jumping back
for (let i = 1; i <= 4; i++) {
  const stepEl = document.getElementById(`stepIndicator${i}`);
  stepEl.addEventListener('click', () => {
    if (i <= playerState.currentStage) {
      switchStage(i);
    }
  });
}

// --- STAGE 2: RAPID LAB & 3 MINI-QUESTS ---
const cssData = {
  color: {
    code: "color: #FF5376;",
    expl: "<b>color</b> — Yozuvlarning (matnning) rangini o'zgartiradi.",
    style: { color: "#FF5376" },
    quest: 1
  },
  background: {
    code: "background-color: #00D2FF;",
    expl: "<b>background-color</b> — Qutining ichki qismini to'liq bo'yaydi.",
    style: { backgroundColor: "#00D2FF", color: "white" },
    quest: 1
  },
  border: {
    code: "border: 4px dashed #FFC837;",
    expl: "<b>border</b> — Qutining atrofida himoya devori quradi.",
    style: { border: "4px dashed #FFC837" },
    quest: 2
  },
  borderRadius: {
    code: "border-radius: 20px;",
    expl: "<b>border-radius</b> — O'tkir burchaklarni silliqlab yumaloq qiladi.",
    style: { backgroundColor: "#FF5376", color: "white", borderRadius: "20px" },
    quest: 3
  },
  padding: {
    code: "padding: 30px;",
    expl: "<b>padding</b> — Yozuv va devor orasidagi ichki yostiqcha bo'shlig'i.",
    style: { backgroundColor: "#4E65FF", color: "white", padding: "30px" },
    quest: 3
  },
  margin: {
    code: "margin: 30px;",
    expl: "<b>margin</b> — Qutidan tashqaridagi masofa (dushmanni itaradi!).",
    style: { backgroundColor: "#00D2FF", color: "white", margin: "30px" },
    quest: 3
  }
};

const completedQuests = new Set();
const cssButtons = document.querySelectorAll('.tag-selector-btn');
const cssBox = document.getElementById('demoCssBox');
const btnGoToStage3 = document.getElementById('btnGoToStage3');

cssButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    playSound('click');
    cssButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const prop = btn.dataset.css;
    const data = cssData[prop];

    document.getElementById('cssWindowTitle').innerText = `${prop} xususiyati`;
    document.getElementById('cssCodeSnippet').innerText = data.code;
    document.getElementById('cssExplanation').innerHTML = data.expl;

    // Reset styles then apply new
    cssBox.style.cssText = "";
    Object.assign(cssBox.style, data.style);

    // Track mini-quest
    if (data.quest && !completedQuests.has(data.quest)) {
      completedQuests.add(data.quest);
      const qCheck = document.getElementById(`qCheck${data.quest}`);
      if (qCheck) {
        qCheck.classList.add('done');
        qCheck.querySelector('.q-icon').innerText = '✅';
      }
      addReward(15, 3, `Topshiriq ${data.quest} bajarildi!`);

      if (completedQuests.size === 3) {
        btnGoToStage3.disabled = false;
        btnGoToStage3.innerHTML = "<span>🎨</span> 3-Bosqich: Kodi'ni Kiyintirish (+20 XP)";
        btnGoToStage3.classList.add('primary-game-btn');
        playSound('success');
      }
    }
  });
});

// Stage 2 Buttons
document.getElementById('btnBackToStage1').addEventListener('click', () => switchStage(1));
btnGoToStage3.addEventListener('click', () => {
  if (completedQuests.size >= 3) {
    addReward(20, 5, "Laboratoriya yakunlandi!");
    switchStage(3);
  }
});

// --- STAGE 3: DRESS-UP KODI ---
const heroBgColor = document.getElementById('heroBgColor');
const heroTextColor = document.getElementById('heroTextColor');
const heroPadding = document.getElementById('heroPadding');
const heroRadius = document.getElementById('heroRadius');
const valHeroPadding = document.getElementById('valHeroPadding');
const valHeroRadius = document.getElementById('valHeroRadius');
const heroShield = document.getElementById('heroShield');
const heroCodeSnippet = document.getElementById('heroCodeSnippet');
const heroReactionText = document.getElementById('heroReactionText');

function updateHeroShield() {
  const bg = heroBgColor.value;
  const col = heroTextColor.value;
  const pad = heroPadding.value;
  const rad = heroRadius.value;

  valHeroPadding.innerText = `${pad}px`;
  valHeroRadius.innerText = `${rad}px`;

  heroShield.style.backgroundColor = bg;
  heroShield.style.color = col;
  heroShield.style.padding = `${pad}px ${pad * 1.5}px`;
  heroShield.style.borderRadius = `${rad}px`;
  heroShield.style.border = `4px solid ${col}`;

  heroCodeSnippet.innerText = `.kodi-qalqon {\n  background-color: ${bg};\n  color: ${col};\n  padding: ${pad}px;\n  border-radius: ${rad}px;\n  border: 4px solid ${col};\n}`;

  if (rad > 30) {
    heroReactionText.innerText = "🛡️ 'Ajoyib! Qalqon butunlay yumaloq va juda qulay bo'ldi!'";
  } else if (pad > 30) {
    heroReactionText.innerText = "⚡ 'Ushbu bahaybat qalqon bilan monsterning barcha zarbalari qaytadi!'";
  } else {
    heroReactionText.innerText = "✨ 'Juda chiroyli ranglar! Bug Monsterga dars berishga tayyorman!'";
  }
}

[heroBgColor, heroTextColor, heroPadding, heroRadius].forEach(inp => {
  inp.addEventListener('input', updateHeroShield);
});
updateHeroShield();

document.getElementById('heroCheerBtn').addEventListener('click', () => {
  playSound('coin');
  confetti();
});

document.getElementById('btnBackToStage2').addEventListener('click', () => switchStage(2));
document.getElementById('btnGoToStage4').addEventListener('click', () => {
  addReward(25, 5, "Super Zirh Tayyor!");
  switchStage(4);
  initBossBattle();
});

// --- STAGE 4: BOSS BATTLE (BUG MONSTER) ---
let monsterHp = 3;
let currentBattleQ = 0;

const battleQuestions = [
  {
    q: "1-Savol: Matn yozuvining rangini o'zgartiruvchi CSS sehr nima?",
    opts: ["color", "font-color", "text-paint", "background"],
    ans: 0,
    hint: "Yozuv rangi oddiygina 'color' deb ataladi!"
  },
  {
    q: "2-Savol: Zirh ichidagi yostiqcha (bo'shliq) orqali qutini kattalashtiruvchi sehr qaysi?",
    opts: ["border", "margin", "padding", "box-grow"],
    ans: 2,
    hint: "Ichki masofa — bu yostiqcha ya'ni 'padding'!"
  },
  {
    q: "3-Savol: Qutining o'tkir burchaklarini yumaloq qiluvchi xususiyat?",
    opts: ["border-circle", "border-radius", "border-soft", "margin-round"],
    ans: 1,
    hint: "Burchaklarni yumaloqlash — 'border-radius'!"
  }
];

function initBossBattle() {
  monsterHp = 3;
  currentBattleQ = 0;
  updateHpDisplay();
  document.getElementById('battleQuizBox').style.display = 'block';
  document.getElementById('bossVictoryScreen').style.display = 'none';
  loadBattleQuestion();
}

function updateHpDisplay() {
  const hpContainer = document.getElementById('monsterHpHearts');
  let hearts = '';
  for (let i = 0; i < monsterHp; i++) {
    hearts += '❤️';
  }
  for (let i = monsterHp; i < 3; i++) {
    hearts += '🖤';
  }
  hpContainer.innerText = hearts;
}

function loadBattleQuestion() {
  const qObj = battleQuestions[currentBattleQ];
  document.getElementById('battleQStep').innerText = `Hujum ${currentBattleQ + 1} / 3`;
  document.getElementById('battleQTitle').innerText = qObj.q;
  document.getElementById('battleFeedback').innerHTML = '';

  const grid = document.getElementById('battleOptionsGrid');
  grid.innerHTML = '';

  qObj.opts.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'battle-opt-btn';
    btn.innerText = opt;
    btn.onclick = () => handleBattleAnswer(idx, btn);
    grid.appendChild(btn);
  });
}

function handleBattleAnswer(idx, btnEl) {
  const qObj = battleQuestions[currentBattleQ];
  const grid = document.getElementById('battleOptionsGrid');
  const fb = document.getElementById('battleFeedback');
  const monsterEl = document.getElementById('monsterFighter');
  const laser = document.getElementById('laserBeam');

  Array.from(grid.children).forEach(b => b.disabled = true);

  if (idx === qObj.ans) {
    // Correct! Laser attack!
    btnEl.classList.add('correct');
    playSound('laser');

    // Laser animation
    laser.classList.add('shoot');
    setTimeout(() => {
      laser.classList.remove('shoot');
      playSound('hit');
      monsterEl.classList.add('hit');
      monsterHp--;
      updateHpDisplay();
      addReward(20, 5, "Monsterga zarba berildi!");

      setTimeout(() => monsterEl.classList.remove('hit'), 400);
    }, 280);

    fb.innerHTML = `<span class="feedback-success">🎯 ZARBA BERILDI! To'g'ri: ${qObj.opts[qObj.ans]}!</span>`;

    setTimeout(() => {
      currentBattleQ++;
      if (currentBattleQ < battleQuestions.length && monsterHp > 0) {
        loadBattleQuestion();
      } else {
        finishBossBattle();
      }
    }, 1800);

  } else {
    // Incorrect answer
    btnEl.classList.add('wrong');
    playSound('error');
    grid.children[qObj.ans].classList.add('correct');
    fb.innerHTML = `<span class="feedback-error">🛡️ Qalqon zarbani qaytardi! Maslahat: ${qObj.hint}</span>`;

    setTimeout(() => {
      currentBattleQ++;
      if (currentBattleQ < battleQuestions.length) {
        loadBattleQuestion();
      } else {
        finishBossBattle();
      }
    }, 2200);
  }
}

function finishBossBattle() {
  document.getElementById('battleQuizBox').style.display = 'none';
  document.getElementById('bossVictoryScreen').style.display = 'block';

  // Save to localStorage for passport progress
  try {
    localStorage.setItem('kodi_lesson3_completed', 'true');
    localStorage.setItem('kodi_lesson3_stars', '3');
    const prevXP = parseInt(localStorage.getItem('kodi_total_xp') || '0', 10);
    localStorage.setItem('kodi_total_xp', (prevXP + 100).toString());
  } catch(e) {
    console.log("Storage not available");
  }

  document.getElementById('finalXpText').innerText = `${playerState.xp} XP`;
  document.getElementById('monsterAvatar').innerText = '💥';

  playSound('victory');
  confetti();
}

document.getElementById('btnRestartBattle').addEventListener('click', () => {
  playSound('click');
  document.getElementById('monsterAvatar').innerText = '👾';
  initBossBattle();
});

// --- Confetti Generator ---
function confetti() {
  for (let i = 0; i < 40; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'fixed';
    conf.style.left = Math.random() * 100 + 'vw';
    conf.style.top = '-10px';
    conf.style.width = '12px';
    conf.style.height = '12px';
    conf.style.backgroundColor = ['#FF5376', '#FFC837', '#00F0FF', '#7928CA', '#22C55E'][Math.floor(Math.random()*5)];
    conf.style.zIndex = 9999;
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
