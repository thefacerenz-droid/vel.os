const storage = {
  get(key, fallback = "") {
    try {
      const value = window.localStorage.getItem(key);
      if (value === null) return fallback;
      if (typeof fallback === "number") {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? fallback : parsed;
      }
      return value;
    } catch (error) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, String(value));
    } catch (error) {
      return;
    }
  }
};

const localGameMeta = {
  snake: {
    category: "Arcade",
    title: "Google Snake",
    description:
      "Guide the snake, collect food, and avoid your own trail in a fast monochrome take on the classic.",
    best: "Classic arcade chasing",
    controls: "Swipe, arrows, or on-screen pad"
  },
  merge: {
    category: "Puzzle",
    title: "Merge",
    description:
      "Slide and combine matching tiles while the board slowly fills with pressure.",
    best: "Quick puzzle sessions",
    controls: "Swipe, arrows, or on-screen pad"
  },
  tap: {
    category: "Reflex",
    title: "Tap Rush",
    description:
      "A bright target jumps around the grid while the timer counts down.",
    best: "Short speed runs",
    controls: "Tap or click the bright cell"
  },
  word: {
    category: "Word",
    title: "Word Warp",
    description:
      "Unscramble themed words and keep your streak alive.",
    best: "Quick language breaks",
    controls: "Type your guess and submit"
  },
  memory: {
    category: "Match",
    title: "Orb Memory",
    description:
      "Flip cards, lock in the pairs, and clear the board in fewer moves.",
    best: "Relaxed pattern play",
    controls: "Tap or click cards"
  }
};

const featuredGameLaunches = {
  rocketgoal: {
    screen: "tap",
    category: "Sports",
    title: "RocketGoal Rush",
    description:
      "Run a fast shot clock and rack up points before the timer runs out.",
    best: "Quick goal-chasing rounds",
    controls: "Tap or click the bright shot target"
  },
  dune: {
    screen: "snake",
    category: "Runner",
    title: "Dune Drift",
    description:
      "Cut through the dunes, collect energy, and keep your trail clean.",
    best: "Fast survival runs",
    controls: "Swipe, arrows, or on-screen pad"
  },
  fourcolors: {
    screen: "memory",
    category: "Cards",
    title: "4 Colors Flip",
    description:
      "Match the color pairs and clear the deck as fast as you can.",
    best: "Short card-style sessions",
    controls: "Tap or click cards"
  }
};

const brandApps = {
  tubi: {
    title: "Tubi",
    tag: "Watch portal",
    description:
      "A local watch hub card using the real Tubi art so it still feels familiar on restricted networks.",
    longText:
      "This Tubi panel is a clean local shortcut page. It keeps the recognizable look and gives you a watch-style destination inside vel.os without requiring the live site to be reachable.",
    pills: ["Movies", "Shows", "Free"],
    image: "./assets/images/apps/tubi.png",
    imageAlt: "Tubi artwork",
    primaryLabel: "Open Velofy",
    primaryKind: "music",
    primaryValue: "music"
  },
  pluto: {
    title: "Pluto TV",
    tag: "Watch portal",
    description:
      "A local Pluto TV style hub with real artwork and a blocked-safe shell.",
    longText:
      "This custom Pluto TV page keeps the branding visible and gives you a clean place for free-watch vibes inside vel.os instead of failing out to a blocked page.",
    pills: ["Live", "TV", "Free"],
    image: "./assets/images/apps/pluto.jpg",
    imageAlt: "Pluto TV artwork",
    primaryLabel: "Open Velofy",
    primaryKind: "music",
    primaryValue: "music"
  }
};

const wallpaperOptions = {
  vel: {
    label: "Ink Eye",
    path: "./assets/images/wallpaper/vel.png"
  },
  snow: {
    label: "Snow Lake",
    path: "./assets/images/wallpaper/IMG_2063.png"
  },
  moon: {
    label: "Moon Tree",
    path: "./assets/images/wallpaper/IMG_2064.png"
  }
};

const velofyTracks = [
  {
    title: "Monkeys Spinning Monkeys",
    artist: "Kevin MacLeod",
    src: "./assets/audio/monkeys-spinning-monkeys.mp3"
  },
  {
    title: "Pixelland",
    artist: "Kevin MacLeod",
    src: "./assets/audio/pixelland.mp3"
  },
  {
    title: "Hyperfun",
    artist: "Kevin MacLeod",
    src: "./assets/audio/hyperfun.mp3"
  }
];

const drawers = {
  launcher: document.getElementById("launcherDrawer"),
  brand: document.getElementById("brandDrawer"),
  music: document.getElementById("musicDrawer"),
  game: document.getElementById("gameDrawer"),
  settings: document.getElementById("settingsDrawer")
};

const clockDay = document.getElementById("clockDay");
const clockTime = document.getElementById("clockTime");
const clockDate = document.getElementById("clockDate");
const taskbarTime = document.getElementById("taskbarTime");
const taskbarDate = document.getElementById("taskbarDate");
const nowPlayingChip = document.getElementById("nowPlayingChip");
const nowPlayingText = document.getElementById("nowPlayingText");
const taskbarNowPlaying = document.getElementById("taskbarNowPlaying");
const taskbarNowPlayingText = document.getElementById("taskbarNowPlayingText");

const openLauncherButton = document.getElementById("openLauncherButton");
const openMusicButton = document.getElementById("openMusicButton");
const openSettingsButton = document.getElementById("openSettingsButton");
const startButton = document.getElementById("startButton");
const closePanelButtons = [...document.querySelectorAll("[data-close-panel]")];
const panelOpenButtons = [...document.querySelectorAll("[data-open-panel]")];
const gameLaunchButtons = [...document.querySelectorAll("[data-launch-game]")];
const featuredGameButtons = [...document.querySelectorAll("[data-launch-feature]")];
const brandButtons = [...document.querySelectorAll("[data-open-brand]")];
const switchButtons = [...document.querySelectorAll("[data-game-switch]")];
const taskbarButtons = [
  openLauncherButton,
  openMusicButton,
  openSettingsButton,
  ...[...document.querySelectorAll(".taskbar-app[data-open-brand]")]
].filter(Boolean);

const brandTag = document.getElementById("brandTag");
const brandTitle = document.getElementById("brandTitle");
const brandDescription = document.getElementById("brandDescription");
const brandImage = document.getElementById("brandImage");
const brandPills = document.getElementById("brandPills");
const brandLongText = document.getElementById("brandLongText");
const brandPrimaryAction = document.getElementById("brandPrimaryAction");
const brandSecondaryAction = document.getElementById("brandSecondaryAction");

const gameScreens = [...document.querySelectorAll(".game-screen")];
const activeCategory = document.getElementById("activeCategory");
const activeTitle = document.getElementById("activeTitle");
const activeDescription = document.getElementById("activeDescription");
const activeBest = document.getElementById("activeBest");
const activeControls = document.getElementById("activeControls");

const audioElement = document.getElementById("velofyAudio");
const velofyArtwork = document.getElementById("velofyArtwork");
const velofyTitle = document.getElementById("velofyTitle");
const velofyArtist = document.getElementById("velofyArtist");
const velofyState = document.getElementById("velofyState");
const velofyProgress = document.getElementById("velofyProgress");
const velofyElapsed = document.getElementById("velofyElapsed");
const velofyDuration = document.getElementById("velofyDuration");
const velofyPrev = document.getElementById("velofyPrev");
const velofyPlay = document.getElementById("velofyPlay");
const velofyNext = document.getElementById("velofyNext");
const velofyPlaylist = document.getElementById("velofyPlaylist");

const settingsWallpaperButtons = [...document.querySelectorAll("[data-wallpaper-option]")];
const settingsFontButtons = [...document.querySelectorAll("[data-font-option]")];

let activeLocalGame = "snake";
let activeBrand = "tubi";
let activePanel = "";
let brandPrimaryConfig = null;
let currentTrackIndex = 0;
let currentWallpaperKey = storage.get("vel-wallpaper", "vel");
let currentFontKey = storage.get("vel-font", "system");

function setDrawerState(name, isOpen) {
  const drawer = drawers[name];
  if (!drawer) return;
  drawer.setAttribute("aria-hidden", String(!isOpen));
}

function isDrawerOpen(name) {
  return drawers[name]?.getAttribute("aria-hidden") === "false";
}

function syncTaskbarState() {
  taskbarButtons.forEach((button) => button.classList.remove("is-active"));

  if (activePanel === "launcher" || activePanel === "game") {
    openLauncherButton?.classList.add("is-active");
  }

  if (activePanel === "music") {
    openMusicButton?.classList.add("is-active");
  }

  if (activePanel === "settings") {
    openSettingsButton?.classList.add("is-active");
  }

  if (activePanel === "brand") {
    const activeBrandButton = document.querySelector(
      `.taskbar-app[data-open-brand="${activeBrand}"]`
    );
    activeBrandButton?.classList.add("is-active");
  }
}

function pauseDynamicGames(nextGame) {
  if (nextGame !== "snake") {
    snake.pause("Snake paused.");
  }
  if (nextGame !== "tap") {
    tapRush.stop(false, "Tap Rush paused.");
  }
}

function openPanel(name) {
  Object.keys(drawers).forEach((key) => {
    setDrawerState(key, key === name);
  });
  activePanel = name;

  if (name !== "game") {
    pauseDynamicGames("");
  }

  syncTaskbarState();

  if (name === "game" && activeLocalGame === "snake") {
    window.requestAnimationFrame(() => {
      snake.refresh();
    });
  }
}

function closeAllPanels() {
  Object.keys(drawers).forEach((key) => setDrawerState(key, false));
  activePanel = "";
  pauseDynamicGames("");
  syncTaskbarState();
}

function closePanel(name) {
  setDrawerState(name, false);
  if (name === "game") {
    pauseDynamicGames("");
  }
  if (activePanel === name) {
    activePanel = "";
  }
  syncTaskbarState();
}

function togglePanel(name) {
  if (isDrawerOpen(name)) {
    closePanel(name);
    return;
  }
  openPanel(name);
}

function formatTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function updateClock() {
  const now = new Date();
  clockDay.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long"
  }).format(now);
  clockTime.textContent = formatTime(now);
  clockDate.textContent = new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(now);

  taskbarTime.textContent = formatTime(now);
  taskbarDate.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "short"
  }).format(now);
}

function applyWallpaper(key) {
  const nextKey = wallpaperOptions[key] ? key : "vel";
  const choice = wallpaperOptions[nextKey];
  currentWallpaperKey = nextKey;

  document.documentElement.style.setProperty(
    "--wallpaper-image",
    `url("${choice.path}")`
  );
  velofyArtwork.src = choice.path;
  velofyArtwork.alt = `${choice.label} wallpaper`;

  settingsWallpaperButtons.forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.wallpaperOption === nextKey
    );
  });

  storage.set("vel-wallpaper", nextKey);
}

function applyFont(key) {
  const nextKey = ["system", "serif", "rounded"].includes(key)
    ? key
    : "system";
  currentFontKey = nextKey;

  document.body.dataset.font = nextKey;
  settingsFontButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.fontOption === nextKey);
  });

  storage.set("vel-font", nextKey);
}

function updateNowPlayingUi() {
  const track = velofyTracks[currentTrackIndex];
  const isPlaying = !audioElement.paused;
  const text = `${track.title} - ${track.artist}`;

  nowPlayingChip.hidden = !isPlaying;
  taskbarNowPlaying.hidden = !isPlaying;
  nowPlayingText.textContent = text;
  taskbarNowPlayingText.textContent = track.title;
  document.body.classList.toggle("is-music-playing", isPlaying);
  velofyState.textContent = isPlaying ? "Playing" : "Paused";
  velofyPlay.textContent = isPlaying ? "Pause" : "Play";
}

function formatSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function loadTrack(index, shouldPlay = false) {
  currentTrackIndex = (index + velofyTracks.length) % velofyTracks.length;
  const track = velofyTracks[currentTrackIndex];
  audioElement.src = track.src;
  velofyTitle.textContent = track.title;
  velofyArtist.textContent = track.artist;
  velofyPlaylist
    .querySelectorAll(".track-button")
    .forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === currentTrackIndex);
    });

  if (shouldPlay) {
    audioElement
      .play()
      .then(updateNowPlayingUi)
      .catch(() => updateNowPlayingUi());
  } else {
    audioElement.load();
    updateNowPlayingUi();
  }
}

function renderPlaylist() {
  velofyPlaylist.innerHTML = "";
  velofyTracks.forEach((track, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `track-button${index === currentTrackIndex ? " is-active" : ""}`;
    button.dataset.trackIndex = String(index);
    button.innerHTML = `
      <strong>${track.title}</strong>
      <span>${track.artist}</span>
    `;
    velofyPlaylist.appendChild(button);
  });
}

function setActiveLocalGame(gameId, displayMeta = null) {
  const meta = displayMeta ?? localGameMeta[gameId];
  if (!meta || !localGameMeta[gameId]) return;

  activeLocalGame = gameId;
  pauseDynamicGames(gameId);

  activeCategory.textContent = meta.category;
  activeTitle.textContent = meta.title;
  activeDescription.textContent = meta.description;
  activeBest.textContent = meta.best;
  activeControls.textContent = meta.controls;

  switchButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.gameSwitch === gameId);
  });

  gameScreens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === gameId);
  });

  if (gameId === "snake") {
    window.requestAnimationFrame(() => {
      snake.refresh();
    });
  }
}

function openGame(gameId, displayMeta = null) {
  setActiveLocalGame(gameId, displayMeta);
  openPanel("game");
}

function launchFeaturedGame(featureId) {
  const feature = featuredGameLaunches[featureId];
  if (!feature) return;
  openGame(feature.screen, feature);
}

function openBrand(name) {
  const brand = brandApps[name];
  if (!brand) return;

  activeBrand = name;
  brandTag.textContent = brand.tag;
  brandTitle.textContent = brand.title;
  brandDescription.textContent = brand.description;
  brandImage.src = brand.image;
  brandImage.alt = brand.imageAlt;
  brandLongText.textContent = brand.longText;

  brandPills.innerHTML = "";
  brand.pills.forEach((pillText) => {
    const pill = document.createElement("span");
    pill.className = "brand-pill";
    pill.textContent = pillText;
    brandPills.appendChild(pill);
  });

  brandPrimaryConfig = {
    kind: brand.primaryKind,
    value: brand.primaryValue
  };
  brandPrimaryAction.textContent = brand.primaryLabel;
  brandPrimaryAction.classList.add("brand-primary");

  openPanel("brand");
}

openLauncherButton?.addEventListener("click", () => {
  togglePanel("launcher");
});

startButton?.addEventListener("click", () => {
  togglePanel("launcher");
});

openMusicButton?.addEventListener("click", () => {
  togglePanel("music");
});

panelOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    togglePanel(button.dataset.openPanel);
  });
});

closePanelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closePanel(button.dataset.closePanel);
  });
});

gameLaunchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openGame(button.dataset.launchGame);
  });
});

featuredGameButtons.forEach((button) => {
  button.addEventListener("click", () => {
    launchFeaturedGame(button.dataset.launchFeature);
  });
});

brandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openBrand(button.dataset.openBrand);
  });
});

settingsWallpaperButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyWallpaper(button.dataset.wallpaperOption);
  });
});

settingsFontButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyFont(button.dataset.fontOption);
  });
});

brandPrimaryAction.addEventListener("click", () => {
  if (!brandPrimaryConfig) return;

  if (brandPrimaryConfig.kind === "game") {
    openGame(brandPrimaryConfig.value);
  }

  if (brandPrimaryConfig.kind === "music") {
    openPanel("music");
  }
});

brandSecondaryAction.addEventListener("click", () => {
  openPanel("launcher");
});

switchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveLocalGame(button.dataset.gameSwitch);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllPanels();
    return;
  }

  if (event.target instanceof HTMLInputElement) return;
  if (!isDrawerOpen("game")) return;

  const directions = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right"
  };

  if (!directions[event.key]) return;

  if (activeLocalGame === "merge") {
    event.preventDefault();
    merge.move(directions[event.key]);
  }

  if (activeLocalGame === "snake") {
    event.preventDefault();
    snake.setDirection(directions[event.key]);
  }
});

function bindSwipe(element, callback) {
  if (!element) return;

  let startX = 0;
  let startY = 0;

  element.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
  });

  element.addEventListener("pointerup", (event) => {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    const threshold = 24;

    if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) return;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      callback(deltaX > 0 ? "right" : "left");
    } else {
      callback(deltaY > 0 ? "down" : "up");
    }
  });
}

velofyPrev.addEventListener("click", () => {
  loadTrack(currentTrackIndex - 1, !audioElement.paused);
});
velofyNext.addEventListener("click", () => {
  loadTrack(currentTrackIndex + 1, !audioElement.paused);
});
velofyPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play().catch(() => {});
  } else {
    audioElement.pause();
  }
});

audioElement.addEventListener("play", updateNowPlayingUi);
audioElement.addEventListener("pause", updateNowPlayingUi);
audioElement.addEventListener("ended", () => loadTrack(currentTrackIndex + 1, true));
audioElement.addEventListener("loadedmetadata", () => {
  velofyProgress.max = String(Math.floor(audioElement.duration || 0));
  velofyDuration.textContent = formatSeconds(audioElement.duration || 0);
});
audioElement.addEventListener("timeupdate", () => {
  velofyProgress.value = String(Math.floor(audioElement.currentTime || 0));
  velofyElapsed.textContent = formatSeconds(audioElement.currentTime || 0);
});
velofyProgress.addEventListener("input", () => {
  audioElement.currentTime = Number(velofyProgress.value);
});
velofyPlaylist.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-track-index]");
  if (!button) return;
  loadTrack(Number(button.dataset.trackIndex), true);
});

const merge = (() => {
  const boardElement = document.getElementById("mergeBoard");
  const scoreElement = document.getElementById("mergeScore");
  const bestElement = document.getElementById("mergeBest");
  const statusElement = document.getElementById("mergeStatus");
  const resetButton = document.getElementById("mergeReset");
  const pad = document.querySelector('.mobile-pad[data-pad="merge"]');

  let board = Array(16).fill(0);
  let score = 0;
  let best = storage.get("vel-merge-best", 0);

  function emptyIndices() {
    return board
      .map((value, index) => ({ value, index }))
      .filter((item) => item.value === 0)
      .map((item) => item.index);
  }

  function addRandomTile() {
    const choices = emptyIndices();
    if (!choices.length) return;
    const pick = choices[Math.floor(Math.random() * choices.length)];
    board[pick] = Math.random() < 0.9 ? 2 : 4;
  }

  function updateBest() {
    if (score > best) {
      best = score;
      storage.set("vel-merge-best", best);
    }
    bestElement.textContent = String(best);
  }

  function render() {
    boardElement.innerHTML = "";
    board.forEach((value) => {
      const cell = document.createElement("div");
      cell.className = `merge-cell${value === 0 ? " empty" : ""}`;
      if (value > 0) {
        cell.dataset.value = String(value);
        cell.textContent = String(value);
      } else {
        cell.textContent = "0";
      }
      boardElement.appendChild(cell);
    });
    scoreElement.textContent = String(score);
    updateBest();
  }

  function slideLine(line) {
    const filtered = line.filter(Boolean);
    const merged = [];
    let moved = false;

    for (let index = 0; index < filtered.length; index += 1) {
      if (filtered[index] === filtered[index + 1]) {
        const value = filtered[index] * 2;
        merged.push(value);
        score += value;
        index += 1;
        moved = true;
      } else {
        merged.push(filtered[index]);
      }
    }

    while (merged.length < 4) {
      merged.push(0);
    }

    if (!moved) {
      moved = merged.some((value, index) => value !== line[index]);
    }

    return { line: merged, moved };
  }

  function applyDirection(direction) {
    const nextBoard = [...board];
    let moved = false;

    for (let outer = 0; outer < 4; outer += 1) {
      let indices = [];

      if (direction === "left" || direction === "right") {
        indices = [0, 1, 2, 3].map((inner) => outer * 4 + inner);
      } else {
        indices = [0, 1, 2, 3].map((inner) => inner * 4 + outer);
      }

      if (direction === "right" || direction === "down") {
        indices.reverse();
      }

      const values = indices.map((index) => board[index]);
      const result = slideLine(values);
      if (result.moved) moved = true;
      result.line.forEach((value, index) => {
        nextBoard[indices[index]] = value;
      });
    }

    if (moved) {
      board = nextBoard;
      addRandomTile();
      render();
      statusElement.textContent = isGameOver()
        ? "No more moves. Start a new board and go again."
        : "Clean move. Keep merging toward 2048.";
    }
  }

  function isGameOver() {
    if (emptyIndices().length > 0) return false;

    return !board.some((value, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      const right = col < 3 ? board[index + 1] : null;
      const down = row < 3 ? board[index + 4] : null;
      return value === right || value === down;
    });
  }

  function move(direction) {
    if (isGameOver()) {
      statusElement.textContent = "No more moves. Start a new board and go again.";
      return;
    }
    applyDirection(direction);
  }

  function reset() {
    board = Array(16).fill(0);
    score = 0;
    addRandomTile();
    addRandomTile();
    render();
    statusElement.textContent = "Fresh board loaded. Merge matching tiles to build momentum.";
  }

  resetButton.addEventListener("click", reset);
  pad?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-dir]");
    if (!button) return;
    move(button.dataset.dir);
  });
  bindSwipe(document.getElementById("mergeSwipeZone"), move);

  return { reset, move };
})();

const memory = (() => {
  const gridElement = document.getElementById("memoryGrid");
  const movesElement = document.getElementById("memoryMoves");
  const pairsElement = document.getElementById("memoryPairs");
  const statusElement = document.getElementById("memoryStatus");
  const resetButton = document.getElementById("memoryReset");

  const symbols = ["Nova", "Orbit", "Pulse", "Luna", "Ray", "Comet"];

  let deck = [];
  let revealed = [];
  let matched = 0;
  let moves = 0;
  let lockBoard = false;

  function shuffle(items) {
    const clone = [...items];
    for (let index = clone.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
    }
    return clone;
  }

  function updateCopy() {
    movesElement.textContent = String(moves);
    pairsElement.textContent = `${matched} / 6`;
  }

  function render() {
    gridElement.innerHTML = "";
    deck.forEach((card, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `memory-card${card.revealed ? " is-revealed" : ""}${card.matched ? " is-matched" : ""}`;
      button.dataset.index = String(index);
      button.innerHTML = `
        <span class="memory-card-inner">
          <span class="memory-face memory-front"></span>
          <span class="memory-face memory-back">
            <strong>${card.label}</strong>
          </span>
        </span>
      `;
      gridElement.appendChild(button);
    });
  }

  function reset() {
    const pairs = symbols.flatMap((label) => [
      { label, revealed: false, matched: false },
      { label, revealed: false, matched: false }
    ]);
    deck = shuffle(pairs);
    revealed = [];
    matched = 0;
    moves = 0;
    lockBoard = false;
    updateCopy();
    render();
    statusElement.textContent = "Grid shuffled. Flip cards and lock in the pairs.";
  }

  function checkRound() {
    if (revealed.length < 2) return;

    const [firstIndex, secondIndex] = revealed;
    const first = deck[firstIndex];
    const second = deck[secondIndex];

    moves += 1;
    updateCopy();

    if (first.label === second.label) {
      deck[firstIndex].matched = true;
      deck[secondIndex].matched = true;
      matched += 1;
      revealed = [];
      render();
      updateCopy();
      statusElement.textContent =
        matched === symbols.length
          ? `Board cleared in ${moves} moves. Shuffle for another round.`
          : "Pair found. Keep going.";
      return;
    }

    lockBoard = true;
    statusElement.textContent = "No match. Watch the board and try again.";

    window.setTimeout(() => {
      deck[firstIndex].revealed = false;
      deck[secondIndex].revealed = false;
      revealed = [];
      lockBoard = false;
      render();
    }, 720);
  }

  gridElement.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");
    if (!button || lockBoard) return;

    const index = Number(button.dataset.index);
    const card = deck[index];
    if (card.revealed || card.matched) return;

    deck[index].revealed = true;
    revealed.push(index);
    render();
    checkRound();
  });

  resetButton.addEventListener("click", reset);

  return { reset };
})();

const snake = (() => {
  const canvas = document.getElementById("snakeCanvas");
  const context = canvas.getContext("2d");
  const scoreElement = document.getElementById("snakeScore");
  const bestElement = document.getElementById("snakeBest");
  const statusElement = document.getElementById("snakeStatus");
  const startPauseButton = document.getElementById("snakeStartPause");
  const resetButton = document.getElementById("snakeReset");
  const pad = document.querySelector('.mobile-pad[data-pad="snake"]');

  const gridSize = 18;
  let snakeBody = [];
  let direction = "right";
  let nextDirection = "right";
  let food = { x: 10, y: 10 };
  let score = 0;
  let best = storage.get("vel-snake-best", 0);
  let intervalId = null;
  let running = false;

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }

  function updateCopy() {
    scoreElement.textContent = String(score);
    bestElement.textContent = String(best);
    startPauseButton.textContent = running ? "Pause" : "Start";
  }

  function randomFood() {
    let nextFood = null;
    do {
      nextFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
    } while (snakeBody.some((segment) => segment.x === nextFood.x && segment.y === nextFood.y));
    food = nextFood;
  }

  function resetState() {
    snakeBody = [
      { x: 6, y: 9 },
      { x: 5, y: 9 },
      { x: 4, y: 9 }
    ];
    direction = "right";
    nextDirection = "right";
    score = 0;
    randomFood();
    updateCopy();
  }

  function fillRoundedRect(x, y, width, height, radius) {
    if (typeof context.roundRect === "function") {
      context.beginPath();
      context.roundRect(x, y, width, height, radius);
      context.fill();
      return;
    }
    context.fillRect(x, y, width, height);
  }

  function drawGrid(size) {
    context.strokeStyle = "rgba(255, 255, 255, 0.05)";
    context.lineWidth = 1;
    for (let index = 0; index <= gridSize; index += 1) {
      context.beginPath();
      context.moveTo(index * size, 0);
      context.lineTo(index * size, gridSize * size);
      context.stroke();

      context.beginPath();
      context.moveTo(0, index * size);
      context.lineTo(gridSize * size, index * size);
      context.stroke();
    }
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const size = rect.width / gridSize;

    context.clearRect(0, 0, rect.width, rect.height);
    context.fillStyle = "#050505";
    context.fillRect(0, 0, rect.width, rect.height);
    drawGrid(size);

    snakeBody.forEach((segment, index) => {
      context.fillStyle = index === 0 ? "#ffffff" : "#d8d8d8";
      fillRoundedRect(segment.x * size + 2, segment.y * size + 2, size - 4, size - 4, 8);
    });

    context.beginPath();
    context.fillStyle = "#ffffff";
    context.arc(food.x * size + size / 2, food.y * size + size / 2, size * 0.24, 0, Math.PI * 2);
    context.fill();
  }

  function endGame() {
    running = false;
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
    if (score > best) {
      best = score;
      storage.set("vel-snake-best", best);
    }
    updateCopy();
    statusElement.textContent = `Crash. Final score ${score}. Reset or start a fresh run.`;
    draw();
  }

  function tick() {
    direction = nextDirection;
    const head = { ...snakeBody[0] };

    if (direction === "up") head.y -= 1;
    if (direction === "down") head.y += 1;
    if (direction === "left") head.x -= 1;
    if (direction === "right") head.x += 1;

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= gridSize ||
      head.y >= gridSize ||
      snakeBody.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      endGame();
      return;
    }

    snakeBody.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 1;
      if (score > best) {
        best = score;
        storage.set("vel-snake-best", best);
      }
      randomFood();
      statusElement.textContent = "Food collected. Keep the trail clean.";
    } else {
      snakeBody.pop();
    }

    updateCopy();
    draw();
  }

  function start() {
    if (running) {
      pause("Snake paused.");
      return;
    }
    running = true;
    updateCopy();
    statusElement.textContent = "Run live. Collect food and avoid your tail.";
    intervalId = window.setInterval(tick, 125);
  }

  function pause(message = "Snake paused.") {
    if (!running) return;
    running = false;
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
    updateCopy();
    statusElement.textContent = message;
  }

  function reset() {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
    running = false;
    resetState();
    statusElement.textContent = "Board reset. Press start when you are ready.";
    draw();
  }

  function setDirection(next) {
    const opposites = {
      up: "down",
      down: "up",
      left: "right",
      right: "left"
    };
    if (opposites[direction] === next) return;
    nextDirection = next;
  }

  startPauseButton.addEventListener("click", start);
  resetButton.addEventListener("click", reset);
  pad?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-dir]");
    if (!button) return;
    setDirection(button.dataset.dir);
  });
  bindSwipe(document.getElementById("snakeSwipeZone"), setDirection);
  window.addEventListener("resize", resizeCanvas);

  resetState();
  window.setTimeout(resizeCanvas, 0);

  return { start, reset, pause, refresh: resizeCanvas, setDirection };
})();

const wordWarp = (() => {
  const categoryElement = document.getElementById("wordCategory");
  const scrambleElement = document.getElementById("wordScramble");
  const hintElement = document.getElementById("wordHint");
  const statusElement = document.getElementById("wordStatus");
  const streakElement = document.getElementById("wordStreak");
  const solvedElement = document.getElementById("wordSolved");
  const form = document.getElementById("wordForm");
  const input = document.getElementById("wordInput");
  const shuffleButton = document.getElementById("wordShuffle");
  const nextButton = document.getElementById("wordNext");

  const words = [
    { word: "galaxy", category: "Theme: space", hint: "A huge island of stars." },
    { word: "meteor", category: "Theme: sky", hint: "A fast rock streaking through the atmosphere." },
    { word: "rocket", category: "Theme: launch", hint: "It blasts upward on a bright plume." },
    { word: "planet", category: "Theme: orbit", hint: "A world circling a star." },
    { word: "puzzle", category: "Theme: game", hint: "A challenge solved with logic." },
    { word: "arcade", category: "Theme: play", hint: "A place full of games." },
    { word: "comet", category: "Theme: sky", hint: "A bright traveler with a tail." },
    { word: "signal", category: "Theme: tech", hint: "A message or pattern sent out." }
  ];

  let currentWord = words[0];
  let streak = 0;
  let solved = 0;

  function shuffleLetters(word) {
    const letters = word.toUpperCase().split("");
    let shuffled = [...letters];

    do {
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
      }
    } while (shuffled.join("") === letters.join(""));

    return shuffled.join(" ");
  }

  function updateCopy() {
    categoryElement.textContent = currentWord.category;
    scrambleElement.textContent = shuffleLetters(currentWord.word);
    hintElement.textContent = `Hint: ${currentWord.hint}`;
    streakElement.textContent = String(streak);
    solvedElement.textContent = String(solved);
    input.value = "";
  }

  function pickNewWord() {
    const options = words.filter((item) => item.word !== currentWord.word);
    currentWord = options[Math.floor(Math.random() * options.length)];
    updateCopy();
    statusElement.textContent = "New word loaded. Keep the streak moving.";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const guess = input.value.trim().toLowerCase();

    if (!guess) {
      statusElement.textContent = "Type a guess before you submit.";
      return;
    }

    if (guess === currentWord.word) {
      streak += 1;
      solved += 1;
      updateCopy();
      statusElement.textContent = `Correct. ${currentWord.word.toUpperCase()} locked in.`;
      window.setTimeout(pickNewWord, 750);
      return;
    }

    streak = 0;
    streakElement.textContent = String(streak);
    statusElement.textContent = "Not quite. Try again or reshuffle the letters.";
  });

  shuffleButton.addEventListener("click", () => {
    scrambleElement.textContent = shuffleLetters(currentWord.word);
    statusElement.textContent = "Letters reshuffled. Fresh angle, same word.";
  });

  nextButton.addEventListener("click", pickNewWord);

  updateCopy();

  return { pickNewWord };
})();

const tapRush = (() => {
  const gridElement = document.getElementById("tapGrid");
  const scoreElement = document.getElementById("tapScore");
  const timeElement = document.getElementById("tapTime");
  const bestElement = document.getElementById("tapBest");
  const statusElement = document.getElementById("tapStatus");
  const startButton = document.getElementById("tapStart");

  const cellCount = 12;
  let score = 0;
  let timeLeft = 20;
  let best = storage.get("vel-tap-best", 0);
  let activeIndex = -1;
  let running = false;
  let moveTimer = null;
  let clockTimer = null;
  let speed = 680;

  function renderGrid() {
    gridElement.innerHTML = "";
    for (let index = 0; index < cellCount; index += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `tap-cell${index === activeIndex ? " is-target" : ""}`;
      button.dataset.index = String(index);
      gridElement.appendChild(button);
    }
    scoreElement.textContent = String(score);
    timeElement.textContent = String(timeLeft);
    bestElement.textContent = String(best);
  }

  function activateRandomCell() {
    let nextIndex = 0;
    do {
      nextIndex = Math.floor(Math.random() * cellCount);
    } while (nextIndex === activeIndex && cellCount > 1);
    activeIndex = nextIndex;
    renderGrid();
  }

  function clearTimers() {
    if (moveTimer) {
      window.clearInterval(moveTimer);
      moveTimer = null;
    }
    if (clockTimer) {
      window.clearInterval(clockTimer);
      clockTimer = null;
    }
  }

  function stop(updateBestScore = true, message = "Sprint over. Press start for another run.") {
    if (!running && !moveTimer && !clockTimer) {
      statusElement.textContent = message;
      activeIndex = -1;
      renderGrid();
      return;
    }

    running = false;
    clearTimers();
    if (updateBestScore && score > best) {
      best = score;
      storage.set("vel-tap-best", best);
    }
    activeIndex = -1;
    renderGrid();
    statusElement.textContent = message;
  }

  function start() {
    running = true;
    score = 0;
    timeLeft = 20;
    speed = 680;
    statusElement.textContent = "Sprint live. Hit the bright target before it jumps.";
    activateRandomCell();

    clearTimers();
    moveTimer = window.setInterval(() => {
      activateRandomCell();
    }, speed);

    clockTimer = window.setInterval(() => {
      timeLeft -= 1;
      timeElement.textContent = String(timeLeft);
      if (timeLeft <= 0) {
        stop(true, `Time. Final score ${score}. Press start to sprint again.`);
      }
    }, 1000);
  }

  gridElement.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");
    if (!button) return;

    const index = Number(button.dataset.index);
    if (!running) return;

    if (index === activeIndex) {
      score += 1;
      if (score > best) {
        best = score;
        storage.set("vel-tap-best", best);
      }
      if (score % 5 === 0 && speed > 320) {
        speed -= 50;
        clearTimers();
        moveTimer = window.setInterval(activateRandomCell, speed);
        clockTimer = window.setInterval(() => {
          timeLeft -= 1;
          timeElement.textContent = String(timeLeft);
          if (timeLeft <= 0) {
            stop(true, `Time. Final score ${score}. Press start to sprint again.`);
          }
        }, 1000);
      }
      activateRandomCell();
      renderGrid();
      statusElement.textContent = "Clean hit. Keep the pace up.";
      return;
    }

    button.classList.add("is-miss");
    window.setTimeout(() => button.classList.remove("is-miss"), 180);
    statusElement.textContent = "Miss. Chase the bright cell.";
  });

  startButton.addEventListener("click", start);

  renderGrid();

  return { start, stop };
})();

memory.reset();
merge.reset();
snake.reset();
wordWarp.pickNewWord();
tapRush.stop(false, "Press start, then tap the bright cell before it jumps away.");
renderPlaylist();
loadTrack(0, false);
applyWallpaper(currentWallpaperKey);
applyFont(currentFontKey);
setActiveLocalGame(activeLocalGame);
updateClock();
updateNowPlayingUi();
syncTaskbarState();
window.setInterval(updateClock, 1000);
