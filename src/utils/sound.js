const STORAGE_KEY = 'cyberdeck-sound'
const MASTER_VOLUME = 0.6
const AMBIENT_VOLUME = 0.035
const AMBIENT_FADE_IN = 4

const SAMPLE_FILES = {
  hover: 'ui-hover.mp3',
  click: 'ui-click.mp3',
  transition: 'transition.mp3',
  success: 'breach-success.mp3',
  fail: 'breach-fail.mp3',
}

let context = null
let master = null
let ambientStarted = false
const samples = {}
const playing = {}
let muted = readStoredMute()

function readStoredMute() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'off'
  } catch {
    return false
  }
}

function storeMute(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? 'off' : 'on')
  } catch {
    return
  }
}

function tone({ type, from, to, duration, volume, delay = 0 }) {
  const start = context.currentTime + delay
  const oscillator = context.createOscillator()
  const gain = context.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(from, start)

  if (to) {
    oscillator.frequency.exponentialRampToValueAtTime(to, start + duration)
  }

  gain.gain.setValueAtTime(volume, start)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  oscillator.connect(gain)
  gain.connect(master)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.02)
}

function noise({ duration, volume, frequency, delay = 0 }) {
  const start = context.currentTime + delay
  const length = Math.floor(context.sampleRate * duration)
  const buffer = context.createBuffer(1, length, context.sampleRate)
  const data = buffer.getChannelData(0)

  for (let index = 0; index < length; index += 1) {
    data[index] = Math.random() * 2 - 1
  }

  const source = context.createBufferSource()
  const filter = context.createBiquadFilter()
  const gain = context.createGain()

  source.buffer = buffer
  filter.type = 'bandpass'
  filter.frequency.value = frequency
  gain.gain.setValueAtTime(volume, start)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  source.connect(filter)
  filter.connect(gain)
  gain.connect(master)
  source.start(start)
}

function loadSamples() {
  const base = import.meta.env.BASE_URL

  Object.entries(SAMPLE_FILES).forEach(([name, file]) => {
    fetch(`${base}sounds/${file}`)
      .then(response => response.arrayBuffer())
      .then(data => context.decodeAudioData(data))
      .then(buffer => {
        samples[name] = buffer
      })
      .catch(() => {})
  })
}

function playSample(name) {
  const source = context.createBufferSource()

  if (playing[name]) {
    playing[name].stop()
  }

  source.buffer = samples[name]
  source.connect(master)
  source.start()
  playing[name] = source
}

const SOUNDS = {
  hover: () => {
    tone({ type: 'square', from: 1800, to: 2600, duration: 0.05, volume: 0.05 })
  },

  click: () => {
    tone({ type: 'sine', from: 520, duration: 0.08, volume: 0.14 })
    tone({ type: 'square', from: 1040, to: 780, duration: 0.07, volume: 0.07, delay: 0.035 })
  },

  pick: () => {
    tone({ type: 'triangle', from: 880, to: 1320, duration: 0.1, volume: 0.16 })
    noise({ duration: 0.05, volume: 0.05, frequency: 3000 })
  },

  type: () => {
    tone({ type: 'square', from: 2200, duration: 0.025, volume: 0.035 })
  },

  transition: () => {
    noise({ duration: 0.4, volume: 0.18, frequency: 1800 })
    tone({ type: 'sawtooth', from: 120, to: 900, duration: 0.35, volume: 0.07 })
  },

  success: () => {
    const notes = [523, 659, 784, 1047]

    notes.forEach((frequency, index) => {
      tone({ type: 'triangle', from: frequency, duration: 0.22, volume: 0.16, delay: index * 0.09 })
    })
  },

  fail: () => {
    tone({ type: 'sawtooth', from: 240, to: 60, duration: 0.55, volume: 0.16 })
    noise({ duration: 0.35, volume: 0.1, frequency: 600 })
  },
}

function startAmbient() {
  if (ambientStarted) {
    return
  }

  ambientStarted = true

  const now = context.currentTime
  const ambientGain = context.createGain()
  const filter = context.createBiquadFilter()
  const sweep = context.createOscillator()
  const sweepDepth = context.createGain()

  ambientGain.gain.setValueAtTime(0, now)
  ambientGain.gain.linearRampToValueAtTime(AMBIENT_VOLUME, now + AMBIENT_FADE_IN)

  filter.type = 'lowpass'
  filter.frequency.value = 220
  filter.Q.value = 5

  sweep.frequency.value = 0.07
  sweepDepth.gain.value = 90
  sweep.connect(sweepDepth)
  sweepDepth.connect(filter.frequency)
  sweep.start(now)

  const drones = [
    { type: 'sawtooth', frequency: 55 },
    { type: 'sawtooth', frequency: 55.4 },
    { type: 'sine', frequency: 110 },
  ]

  drones.forEach(({ type, frequency }) => {
    const oscillator = context.createOscillator()

    oscillator.type = type
    oscillator.frequency.value = frequency
    oscillator.connect(filter)
    oscillator.start(now)
  })

  filter.connect(ambientGain)
  ambientGain.connect(master)
}

export function unlockAudio() {
  if (!context) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext

    if (!AudioContextClass) {
      return
    }

    context = new AudioContextClass()
    master = context.createGain()
    master.gain.value = muted ? 0 : MASTER_VOLUME
    master.connect(context.destination)
    loadSamples()
  }

  if (context.state === 'suspended') {
    context.resume()
  }

  startAmbient()
}

export function playSound(name) {
  if (!context || muted || context.state !== 'running') {
    return
  }

  if (samples[name]) {
    playSample(name)
    return
  }

  const sound = SOUNDS[name]

  if (sound) {
    sound()
  }
}

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = value
  storeMute(value)

  if (master) {
    master.gain.setTargetAtTime(value ? 0 : MASTER_VOLUME, context.currentTime, 0.05)
  }
}
