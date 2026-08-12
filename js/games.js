/**
 * Interactive Games - Plateforme Autisme Sénégal
 * UI strings follow the current page language (FR root / EN under /en/).
 */

function gamesLang() {
  try {
    if (window.PAS_I18N && typeof window.PAS_I18N.detectLang === 'function') {
      return window.PAS_I18N.detectLang();
    }
  } catch (e) { /* ignore */ }
  var path = (window.location && window.location.pathname) || '';
  return /(?:^|\/)en(?:\/|$)/i.test(path) ? 'en' : 'fr';
}

function t(fr, en) {
  return gamesLang() === 'en' ? en : fr;
}

let gameSettings = {
  volume: 70,
  animationSpeed: 'normal',
  contrastMode: false,
  focusMode: false,
  currentGame: null
};

document.addEventListener('DOMContentLoaded', function () {
  initializeGameSettings();
  initializeAccessibilityControls();

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeGame();
  });

  const modal = document.getElementById('gameModal');
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeGame();
    });
  }
});

function initializeGameSettings() {
  const volumeControl = document.getElementById('volumeControl');
  const volumeValue = document.getElementById('volumeValue');
  const animationSpeed = document.getElementById('animationSpeed');
  const contrastMode = document.getElementById('contrastMode');
  const focusMode = document.getElementById('focusMode');

  if (volumeControl) {
    volumeControl.addEventListener('input', function () {
      gameSettings.volume = this.value;
      if (volumeValue) volumeValue.textContent = this.value + '%';
    });
  }

  if (animationSpeed) {
    animationSpeed.addEventListener('change', function () {
      gameSettings.animationSpeed = this.value;
      updateAnimationSpeed(this.value);
    });
  }

  if (contrastMode) {
    contrastMode.addEventListener('change', function () {
      gameSettings.contrastMode = this.checked;
      toggleContrastMode(this.checked);
    });
  }

  if (focusMode) {
    focusMode.addEventListener('change', function () {
      gameSettings.focusMode = this.checked;
      toggleFocusMode(this.checked);
    });
  }
}

function initializeAccessibilityControls() {
  const savedSettings = localStorage.getItem('gameSettings');
  if (savedSettings) {
    gameSettings = JSON.parse(savedSettings);
    applySettings();
  }
}

function applySettings() {
  if (document.getElementById('volumeControl')) {
    document.getElementById('volumeControl').value = gameSettings.volume;
    document.getElementById('volumeValue').textContent = gameSettings.volume + '%';
  }
  if (document.getElementById('animationSpeed')) {
    document.getElementById('animationSpeed').value = gameSettings.animationSpeed;
  }
  if (document.getElementById('contrastMode')) {
    document.getElementById('contrastMode').checked = gameSettings.contrastMode;
    toggleContrastMode(gameSettings.contrastMode);
  }
  if (document.getElementById('focusMode')) {
    document.getElementById('focusMode').checked = gameSettings.focusMode;
    toggleFocusMode(gameSettings.focusMode);
  }
}

function saveSettings() {
  localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
}

function toggleContrastMode(enabled) {
  document.body.classList.toggle('high-contrast', !!enabled);
  saveSettings();
}

function toggleFocusMode(enabled) {
  document.body.classList.toggle('focus-mode', !!enabled);
  saveSettings();
}

function updateAnimationSpeed(speed) {
  const speedValues = { slow: '0.8s', normal: '0.5s', fast: '0.3s' };
  document.documentElement.style.setProperty('--animation-speed', speedValues[speed] || '0.5s');
  saveSettings();
}

function launchGame(gameId) {
  gameSettings.currentGame = gameId;
  const modal = document.getElementById('gameModal');
  const gameTitle = document.getElementById('gameTitle');
  const gameContent = document.getElementById('gameContent');
  if (!modal || !gameContent) return;

  const gameTitles = {
    'emotions-puzzle': t('Puzzle des Émotions', 'Emotions Puzzle'),
    sequences: t('Séquences Logiques', 'Logical Sequences'),
    'colors-garden': t('Jardin des Couleurs', 'Color Garden'),
    'shapes-sorting': t('Tri des Formes', 'Shape Sorting'),
    'musical-piano': t('Piano Musical', 'Musical Piano'),
    piano: t('Piano Musical', 'Musical Piano'),
    'daily-routine': t('Routine Quotidienne', 'Daily Routine'),
    routine: t('Routine Quotidienne', 'Daily Routine'),
    'soap-bubbles': t('Bulles de Savon', 'Soap Bubbles'),
    bubbles: t('Bulles de Savon', 'Soap Bubbles'),
    'animal-sounds': t('Sons des Animaux', 'Animal Sounds'),
    'creative-drawing': t('Dessin Créatif', 'Creative Drawing'),
    drawing: t('Dessin Créatif', 'Creative Drawing'),
    'matching-game': t('Jeu de Correspondance', 'Matching Game'),
    memory: t('Jeu de Correspondance', 'Matching Game')
  };

  if (gameTitle) {
    gameTitle.innerHTML =
      '<i class="fas fa-gamepad"></i> ' + (gameTitles[gameId] || t('Jeu Interactif', 'Interactive Game'));
  }

  loadGame(gameId, gameContent);
  modal.style.display = 'flex';
  setTimeout(function () {
    modal.classList.add('active');
  }, 10);
}

function loadGame(gameId, container) {
  container.innerHTML = '';

  switch (gameId) {
    case 'emotions-puzzle':
      loadEmotionsPuzzle(container);
      break;
    case 'sequences':
      loadSequencesGame(container);
      break;
    case 'colors-garden':
      loadColorsGarden(container);
      break;
    case 'shapes-sorting':
      loadShapesSorting(container);
      break;
    case 'piano':
    case 'musical-piano':
      loadMusicalPiano(container);
      break;
    case 'routine':
    case 'daily-routine':
      loadDailyRoutine(container);
      break;
    case 'bubbles':
    case 'soap-bubbles':
      loadSoapBubbles(container);
      break;
    case 'animal-sounds':
      loadAnimalSounds(container);
      break;
    case 'drawing':
    case 'creative-drawing':
      loadCreativeDrawing(container);
      break;
    case 'memory':
    case 'matching-game':
      loadMatchingGame(container);
      break;
    default:
      container.innerHTML =
        '<p>' + t('Jeu en cours de développement...', 'Game under development...') + '</p>';
  }
}

function loadEmotionsPuzzle(container) {
  const emotions = [
    t('😊 Joyeux', '😊 Happy'),
    t('😢 Triste', '😢 Sad'),
    t('😠 Fâché', '😠 Angry'),
    t('😨 Peur', '😨 Scared'),
    t('😲 Surpris', '😲 Surprised')
  ];
  let score = 0;

  container.innerHTML =
    '<div class="game-area" style="padding: 2rem; text-align: center;">' +
    '<h3 style="margin-bottom: 2rem; color: #1f2937;">' +
    t("Identifie l'émotion", 'Identify the emotion') +
    '</h3>' +
    '<div style="font-size: 6rem; margin: 2rem 0;" id="emotionDisplay">😊</div>' +
    '<div id="emotionChoices" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">' +
    emotions
      .map(function (e) {
        return (
          '<button class="emotion-btn" style="padding: 1rem 2rem; font-size: 1.2rem; border: 2px solid #2563eb; background: white; border-radius: 10px; cursor: pointer; transition: all 0.3s;" onclick="checkEmotion(\'' +
          e.replace(/'/g, "\\'") +
          '\')">' +
          e +
          '</button>'
        );
      })
      .join('') +
    '</div>' +
    '<div style="margin-top: 2rem; font-size: 1.5rem; font-weight: bold; color: #10b981;" id="scoreDisplay">' +
    t('Score', 'Score') +
    ': 0</div></div>';

  window.checkEmotion = function (emotion) {
    const display = document.getElementById('emotionDisplay').textContent;
    if (emotion.includes(display)) {
      score += 10;
      document.getElementById('scoreDisplay').textContent = t('Score', 'Score') + ': ' + score;
      playSuccessSound();
      setTimeout(nextEmotion, 1000);
    } else {
      playErrorSound();
    }
  };

  function nextEmotion() {
    const randomEmoji = emotions[Math.floor(Math.random() * emotions.length)].split(' ')[0];
    document.getElementById('emotionDisplay').textContent = randomEmoji;
  }
}

function loadSequencesGame(container) {
  const sequences = [
    ['🌅', '☀️', '🌆', '🌙'],
    ['🍳', '🍞', '🥪', '🍽️'],
    ['👕', '🧼', '💧', '👔']
  ];

  let currentSeq = sequences[0].slice().sort(function () {
    return Math.random() - 0.5;
  });
  let correct = sequences[0];

  container.innerHTML =
    '<div class="game-area" style="padding: 2rem;">' +
    '<h3 style="text-align: center; margin-bottom: 2rem;">' +
    t("Remets les images dans l'ordre", 'Put the images in order') +
    '</h3>' +
    '<div id="sequenceArea" style="display: flex; gap: 1rem; justify-content: center; margin: 2rem 0; min-height: 100px; border: 2px dashed #cbd5e1; padding: 1rem; border-radius: 10px;">' +
    currentSeq
      .map(function (item, idx) {
        return (
          '<div class="seq-item" draggable="true" data-index="' +
          idx +
          '" style="font-size: 4rem; cursor: move; padding: 1rem; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">' +
          item +
          '</div>'
        );
      })
      .join('') +
    '</div>' +
    '<div style="text-align: center;">' +
    '<button onclick="checkSequence()" style="padding: 1rem 2rem; background: #2563eb; color: white; border: none; border-radius: 10px; font-size: 1.1rem; cursor: pointer;">' +
    t('Vérifier', 'Check') +
    '</button></div>' +
    '<div id="seqResult" style="text-align: center; margin-top: 1rem; font-size: 1.2rem; font-weight: bold;"></div></div>';

  const items = container.querySelectorAll('.seq-item');
  items.forEach(function (item) {
    item.addEventListener('dragstart', function (e) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
      this.classList.add('dragging');
    });
    item.addEventListener('dragover', function (e) {
      e.preventDefault();
      return false;
    });
    item.addEventListener('drop', function (e) {
      e.stopPropagation();
      const dragging = container.querySelector('.dragging');
      const tempHTML = this.innerHTML;
      this.innerHTML = dragging.innerHTML;
      dragging.innerHTML = tempHTML;
      return false;
    });
    item.addEventListener('dragend', function () {
      this.classList.remove('dragging');
    });
  });

  window.checkSequence = function () {
    const ordered = Array.from(container.querySelectorAll('.seq-item')).map(function (el) {
      return el.textContent.trim();
    });
    const isCorrect = JSON.stringify(ordered) === JSON.stringify(correct);
    const result = document.getElementById('seqResult');
    if (isCorrect) {
      result.innerHTML =
        '<span style="color: #10b981;">✅ ' +
        t("Bravo! C'est correct!", 'Well done! That is correct!') +
        '</span>';
      playSuccessSound();
    } else {
      result.innerHTML =
        '<span style="color: #ef4444;">❌ ' +
        t('Pas tout à fait... Essaie encore!', 'Not quite... Try again!') +
        '</span>';
      playErrorSound();
    }
  };
}

function loadColorsGarden(container) {
  const colors = {
    '🌹': '#ef4444',
    '🌻': '#fbbf24',
    '🌿': '#10b981',
    '🌸': '#ec4899',
    '🌺': '#f97316'
  };

  container.innerHTML =
    '<div class="game-area" style="padding: 2rem;">' +
    '<h3 style="text-align: center; margin-bottom: 2rem;">' +
    t('Plante les fleurs dans le bon pot', 'Plant the flowers in the right pot') +
    '</h3>' +
    '<div style="display: flex; gap: 2rem; justify-content: center; margin: 2rem 0;">' +
    Object.entries(colors)
      .map(function (entry) {
        return (
          '<div class="flower-item" draggable="true" data-color="' +
          entry[1] +
          '" style="font-size: 3rem; cursor: move; padding: 1rem; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">' +
          entry[0] +
          '</div>'
        );
      })
      .join('') +
    '</div>' +
    '<div style="display: flex; gap: 2rem; justify-content: center; margin-top: 3rem;">' +
    Object.values(colors)
      .map(function (color) {
        return (
          '<div class="pot" data-color="' +
          color +
          '" style="width: 80px; height: 80px; background: ' +
          color +
          '; border-radius: 10px; border: 3px solid #1f2937; display: flex; align-items: center; justify-content: center; font-size: 2rem;"></div>'
        );
      })
      .join('') +
    '</div>' +
    '<div id="gardenScore" style="text-align: center; margin-top: 2rem; font-size: 1.5rem; font-weight: bold; color: #10b981;">' +
    t('Score', 'Score') +
    ': 0/5</div></div>';

  let score = 0;
  container.querySelectorAll('.flower-item').forEach(function (flower) {
    flower.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('color', this.dataset.color);
      e.dataTransfer.setData('flower', this.textContent.trim());
    });
  });

  container.querySelectorAll('.pot').forEach(function (pot) {
    pot.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    pot.addEventListener('drop', function (e) {
      e.preventDefault();
      const flowerColor = e.dataTransfer.getData('color');
      const flower = e.dataTransfer.getData('flower');
      if (flowerColor === this.dataset.color && !this.hasChildNodes()) {
        this.textContent = flower;
        score++;
        document.getElementById('gardenScore').textContent = t('Score', 'Score') + ': ' + score + '/5';
        playSuccessSound();
        if (score === 5) {
          setTimeout(function () {
            alert(t('🎉 Félicitations! Tu as planté toutes les fleurs!', '🎉 Congratulations! You planted all the flowers!'));
          }, 300);
        }
      } else {
        playErrorSound();
      }
    });
  });
}

function loadShapesSorting(container) {
  const shapes = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟤'];
  const circles = ['🔴', '🔵', '🟢'];
  let score = 0;

  container.innerHTML =
    '<div class="game-area" style="padding: 2rem;">' +
    '<h3 style="text-align: center; margin-bottom: 2rem;">' +
    t('Trouve tous les cercles', 'Find all the circles') +
    '</h3>' +
    '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 400px; margin: 2rem auto;">' +
    shapes
      .map(function (shape) {
        return (
          '<button class="shape-btn" data-shape="' +
          shape +
          '" style="font-size: 4rem; padding: 1.5rem; background: white; border: 3px solid #cbd5e1; border-radius: 15px; cursor: pointer; transition: all 0.3s;" onclick="selectShape(\'' +
          shape +
          '\', this)">' +
          shape +
          '</button>'
        );
      })
      .join('') +
    '</div>' +
    '<div id="shapeScore" style="text-align: center; margin-top: 2rem; font-size: 1.5rem; font-weight: bold; color: #2563eb;">' +
    t('Cercles trouvés', 'Circles found') +
    ': 0/3</div></div>';

  window.selectShape = function (shape, btn) {
    if (circles.includes(shape) && !btn.classList.contains('found')) {
      btn.style.background = '#10b981';
      btn.style.color = 'white';
      btn.classList.add('found');
      score++;
      document.getElementById('shapeScore').textContent =
        t('Cercles trouvés', 'Circles found') + ': ' + score + '/3';
      playSuccessSound();
      if (score === 3) {
        setTimeout(function () {
          alert(t('🎉 Excellent! Tu as trouvé tous les cercles!', '🎉 Excellent! You found all the circles!'));
        }, 300);
      }
    } else if (!circles.includes(shape)) {
      btn.style.background = '#ef4444';
      setTimeout(function () {
        btn.style.background = 'white';
      }, 500);
      playErrorSound();
    }
  };
}

function loadMusicalPiano(container) {
  const notes = gamesLang() === 'en'
    ? ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    : ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  const noteKeys = ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  const colors = ['#ef4444', '#f97316', '#fbbf24', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6'];

  container.innerHTML =
    '<div class="game-area" style="padding: 2rem;">' +
    '<h3 style="text-align: center; margin-bottom: 2rem;">' +
    t('Piano Musical - Clique sur les notes', 'Musical Piano - Click the notes') +
    '</h3>' +
    '<div style="display: flex; gap: 0.5rem; justify-content: center; margin: 2rem 0;">' +
    notes
      .map(function (note, idx) {
        return (
          '<button class="piano-key" data-note="' +
          noteKeys[idx] +
          '" style="width: 60px; height: 200px; background: ' +
          colors[idx] +
          '; border: 2px solid #1f2937; border-radius: 0 0 10px 10px; cursor: pointer; transition: all 0.1s; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 1rem; color: white; font-weight: bold;" onclick="playNote(\'' +
          noteKeys[idx] +
          "', '" +
          colors[idx] +
          "', this)\">" +
          note +
          '</button>'
        );
      })
      .join('') +
    '</div>' +
    '<div style="text-align: center; font-size: 1.2rem; color: #6b7280;"><p>🎵 ' +
    t('Clique sur les touches pour jouer de la musique!', 'Click the keys to play music!') +
    '</p></div></div>';

  window.playNote = function (note, color, btn) {
    btn.style.transform = 'scale(0.95)';
    setTimeout(function () {
      btn.style.transform = 'scale(1)';
    }, 150);
    const frequencies = {
      Do: 261.63,
      Ré: 293.66,
      Mi: 329.63,
      Fa: 349.23,
      Sol: 392.0,
      La: 440.0,
      Si: 493.88
    };
    playTone(frequencies[note], 0.3);
  };
}

function playSuccessSound() {
  playTone(800, 0.1);
  setTimeout(function () {
    playTone(1000, 0.1);
  }, 100);
}

function playErrorSound() {
  playTone(200, 0.2);
}

function playTone(frequency, duration) {
  if (gameSettings.volume === 0) return;
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.value = (gameSettings.volume / 100) * 0.3;
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (e) {
    console.log('Audio not supported');
  }
}

function loadDailyRoutine(container) {
  const items = [
    t('🛏️ Se réveiller', '🛏️ Wake up'),
    t('🦷 Se brosser les dents', '🦷 Brush your teeth'),
    t('🍳 Petit déjeuner', '🍳 Breakfast'),
    t("🎒 Aller à l'école", '🎒 Go to school')
  ];
  const buttons = items
    .map(function (item) {
      return (
        '<button style="padding: 1.5rem; font-size: 1.2rem; background: white; border: 2px solid #2563eb; border-radius: 10px; cursor: pointer;" onclick="alert(\'' +
        t('Bien joué!', 'Well done!') +
        "')\">" +
        item +
        '</button>'
      );
    })
    .join('');

  container.innerHTML =
    '<div class="game-area" style="padding: 2rem; text-align: center;">' +
    '<h3>' +
    t('Routine Quotidienne', 'Daily Routine') +
    '</h3>' +
    '<p style="font-size: 1.2rem; margin: 2rem 0;">' +
    t('Que fais-tu le matin?', 'What do you do in the morning?') +
    '</p>' +
    '<div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">' +
    buttons +
    '</div></div>';
}

function loadSoapBubbles(container) {
  container.innerHTML =
    '<div class="game-area" style="padding: 2rem; text-align: center; position: relative; height: 400px; background: linear-gradient(to bottom, #dbeafe, #e0f2fe); border-radius: 15px;">' +
    '<h3>' +
    t('Bulles de Savon - Clique pour éclater!', 'Soap Bubbles - Click to pop!') +
    '</h3>' +
    '<div id="bubblesContainer" style="position: relative; height: 300px; margin-top: 2rem;"></div>' +
    '<div id="bubbleScore" style="margin-top: 1rem; font-size: 1.5rem; font-weight: bold; color: #2563eb;">' +
    t('Bulles éclatées', 'Bubbles popped') +
    ': 0</div></div>';

  let score = 0;
  const bubblesContainer = document.getElementById('bubblesContainer');

  function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.cssText =
      'position: absolute; width: 60px; height: 60px; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(59,130,246,0.3)); border: 2px solid rgba(255,255,255,0.5); border-radius: 50%; bottom: 0; left: ' +
      Math.random() * 90 +
      '%; cursor: pointer; animation: floatUp 4s linear;';
    bubble.onclick = function () {
      this.remove();
      score++;
      document.getElementById('bubbleScore').textContent =
        t('Bulles éclatées', 'Bubbles popped') + ': ' + score;
      playSuccessSound();
    };
    bubblesContainer.appendChild(bubble);
    setTimeout(function () {
      if (bubble.parentNode) bubble.remove();
    }, 4000);
  }

  const bubbleInterval = setInterval(createBubble, 1000);
  setTimeout(function () {
    clearInterval(bubbleInterval);
  }, 30000);

  const style = document.createElement('style');
  style.textContent = '@keyframes floatUp { to { transform: translateY(-400px); opacity: 0; } }';
  document.head.appendChild(style);
}

function loadAnimalSounds(container) {
  const animals =
    gamesLang() === 'en'
      ? { '🐶': 'Woof woof!', '🐱': 'Meow!', '🐮': 'Moo!', '🐷': 'Oink oink!', '🐔': 'Cluck cluck!', '🦆': 'Quack quack!' }
      : { '🐶': 'Ouaf ouaf!', '🐱': 'Miaou!', '🐮': 'Meuh!', '🐷': 'Groin groin!', '🐔': 'Cot cot!', '🦆': 'Coin coin!' };

  const animalButtons = Object.entries(animals)
    .map(function (entry) {
      return (
        '<button style="font-size: 4rem; padding: 2rem; background: white; border: 3px solid #2563eb; border-radius: 15px; cursor: pointer; transition: all 0.3s;" onclick="showSound(\'' +
        entry[1].replace(/'/g, "\\'") +
        "', this)\">" +
        entry[0] +
        '</button>'
      );
    })
    .join('');

  container.innerHTML =
    '<div class="game-area" style="padding: 2rem; text-align: center;">' +
    '<h3 style="margin-bottom: 2rem;">' +
    t('Sons des Animaux', 'Animal Sounds') +
    '</h3>' +
    '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 500px; margin: 0 auto;">' +
    animalButtons +
    '</div>' +
    '<div id="animalSound" style="margin-top: 2rem; font-size: 2rem; font-weight: bold; color: #2563eb; min-height: 3rem;"></div></div>';

  window.showSound = function (sound, btn) {
    document.getElementById('animalSound').textContent = sound;
    btn.style.transform = 'scale(1.1)';
    playSuccessSound();
    setTimeout(function () {
      btn.style.transform = 'scale(1)';
    }, 300);
  };
}

function loadCreativeDrawing(container) {
  container.innerHTML =
    '<div class="game-area" style="padding: 2rem;">' +
    '<h3 style="text-align: center; margin-bottom: 1rem;">' +
    t('Dessin Créatif', 'Creative Drawing') +
    '</h3>' +
    '<div style="text-align: center; margin-bottom: 1rem;">' +
    '<input type="color" id="drawColor" value="#2563eb" style="width: 60px; height: 40px; border: none; cursor: pointer;">' +
    '<button onclick="clearCanvas()" style="margin-left: 1rem; padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 5px; cursor: pointer;">' +
    t('Effacer', 'Clear') +
    '</button></div>' +
    '<canvas id="drawingCanvas" width="600" height="400" style="border: 3px solid #2563eb; border-radius: 10px; background: white; display: block; margin: 0 auto; cursor: crosshair;"></canvas></div>';

  const canvas = document.getElementById('drawingCanvas');
  const ctx = canvas.getContext('2d');
  const colorPicker = document.getElementById('drawColor');
  let isDrawing = false;

  canvas.addEventListener('mousedown', function () {
    isDrawing = true;
  });
  canvas.addEventListener('mouseup', function () {
    isDrawing = false;
  });
  canvas.addEventListener('mouseleave', function () {
    isDrawing = false;
  });
  canvas.addEventListener('mousemove', function (e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.fillStyle = colorPicker.value;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  window.clearCanvas = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

function loadMatchingGame(container) {
  const pairs = ['🍎', '🍌', '🍇', '🍊', '🍓', '🥝'];
  const cards = pairs.concat(pairs).sort(function () {
    return Math.random() - 0.5;
  });
  let flipped = [];
  let matched = 0;

  container.innerHTML =
    '<div class="game-area" style="padding: 2rem;">' +
    '<h3 style="text-align: center; margin-bottom: 2rem;">' +
    t('Jeu de Mémoire - Trouve les paires', 'Memory Game - Find the pairs') +
    '</h3>' +
    '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; max-width: 500px; margin: 0 auto;">' +
    cards
      .map(function (card, idx) {
        return (
          '<button class="memory-card" data-card="' +
          card +
          '" data-index="' +
          idx +
          '" style="width: 100px; height: 100px; font-size: 3rem; background: #2563eb; border: none; border-radius: 10px; cursor: pointer; color: white;" onclick="flipCard(' +
          idx +
          ", '" +
          card +
          "', this)\">?</button>"
        );
      })
      .join('') +
    '</div>' +
    '<div id="matchScore" style="text-align: center; margin-top: 2rem; font-size: 1.5rem; font-weight: bold; color: #10b981;">' +
    t('Paires trouvées', 'Pairs found') +
    ': 0/6</div></div>';

  window.flipCard = function (idx, card, btn) {
    if (flipped.length >= 2 || btn.classList.contains('matched') || btn.classList.contains('flipped')) return;
    btn.textContent = card;
    btn.style.background = 'white';
    btn.classList.add('flipped');
    flipped.push({ idx: idx, card: card, btn: btn });

    if (flipped.length === 2) {
      setTimeout(function () {
        if (flipped[0].card === flipped[1].card) {
          flipped.forEach(function (f) {
            f.btn.classList.add('matched');
            f.btn.style.background = '#10b981';
          });
          matched++;
          document.getElementById('matchScore').textContent =
            t('Paires trouvées', 'Pairs found') + ': ' + matched + '/6';
          playSuccessSound();
          if (matched === 6) {
            setTimeout(function () {
              alert(t('🎉 Bravo! Tu as trouvé toutes les paires!', '🎉 Well done! You found all the pairs!'));
            }, 300);
          }
        } else {
          flipped.forEach(function (f) {
            f.btn.textContent = '?';
            f.btn.style.background = '#2563eb';
            f.btn.classList.remove('flipped');
          });
          playErrorSound();
        }
        flipped = [];
      }, 1000);
    }
  };
}

function closeGame() {
  const modal = document.getElementById('gameModal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(function () {
      modal.style.display = 'none';
      gameSettings.currentGame = null;
    }, 300);
  }
}

function restartGame() {
  if (gameSettings.currentGame) {
    const gameContent = document.getElementById('gameContent');
    loadGame(gameSettings.currentGame, gameContent);
  }
}

function pauseGame() {
  alert(
    t(
      'Jeu en pause. Clique sur Fermer pour quitter ou Recommencer pour relancer.',
      'Game paused. Click Close to quit or Restart to play again.'
    )
  );
}
