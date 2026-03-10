var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// ---- Responsive canvas scaling ----
function resizeCanvas() {
  var controls = document.getElementById('touch-controls');
  var controlsH = controls.offsetHeight || 0;
  var maxW = window.innerWidth;
  var maxH = window.innerHeight - controlsH;
  var scale = Math.min(maxW / canvas.width, maxH / canvas.height);
  canvas.style.width = Math.floor(canvas.width * scale) + 'px';
  canvas.style.height = Math.floor(canvas.height * scale) + 'px';
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ---- Mobile detection ----
var isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

// ---- Score (persisted in localStorage) ----
var score = parseInt(localStorage.getItem('iskander_score') || '0', 10);

// ---- Constants ----
var RACE_DISTANCE_KM = 42;
var METERS_PER_KM = 1000;
var TOTAL_METERS = RACE_DISTANCE_KM * METERS_PER_KM;
var GROUND_Y = 320;
var RUNNER_X = 150;
var PITSTOP_EVERY_KM = 5;

// Pixels per meter for world scrolling
var PIXELS_PER_METER = 8;

// ---- Game State ----
var game = {
  state: 'title', // title, running, finished
  distance: 0,       // meters traveled
  speed: 0,          // current m/s
  maxSpeed: 6,
  stamina: 100,
  maxStamina: 100,
  power: 100,
  maxPower: 100,
  time: 0,           // seconds elapsed
  pressTimestamps: [],
  lastPressTime: 0,
  stepQueued: false,
  worldX: 0,         // camera scroll offset in pixels
  finishTime: null,
  raceResult: null,   // 'win' or 'lose'
  // NPCs
  npcRunners: [],
  spectators: [],
  // Rhythm zone
  rhythmZoneLow: 0.33,
  rhythmZoneHigh: 0.57,
  rhythmZoneCenter: 0.45,
  rhythmEfficiency: 1.0,
  inRhythmZone: false,
  // Heart rate
  heartRate: 65,          // current BPM
  restingHR: 65,
  maxHR: 195,
  heartBeatTimer: 0,      // accumulates time for beat animation
  heartBeatPhase: 0,      // 0-1 for current beat cycle
  heartScale: 1.0,        // visual scale for beat pulse
  hrZone: 0,              // 0=rest, 1=easy, 2=aerobic, 3=threshold, 4=anaerobic
  avgHeartRate: 65,        // running average for stats
  hrSamples: 0,
  maxHeartRateReached: 65,
  timeInZone: [0, 0, 0, 0, 0], // seconds spent in each zone
  // Pitstop state
  pitstopsUsed: [],   // km values of pitstops already used
  inPitstopZone: false,
  currentPitstopKm: 0,
  drinkingAnim: 0,    // 0 = not drinking, >0 = animation timer
  drinkingRestored: 0, // stamina restored display
  // Race stats
  maxSpeedReached: 0,
  totalPresses: 0,
  pitstopsDrunk: 0,
  // Runner animation
  runner: {
    y: GROUND_Y - 32,
    frame: 0,
    frameTimer: 0,
    bobY: 0,
    stepping: false,
    stepAnim: 0
  }
};
