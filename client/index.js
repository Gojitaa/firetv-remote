const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  registerButtonHandlers();
});

const emit = msg => socket.emit("command", { type: 'adb', msg }) 

const listeners = Object.freeze({
  'power': () => emit('shell input keyevent 26'),
  'up': () => emit('shell input keyevent 19'),
  'left': () => emit('shell input keyevent 21'),
  'ok': () => emit('shell input keyevent 66'),
  'down': () => emit('shell input keyevent 20'),
  'right': () => emit('shell input keyevent 22'),
  'back': () => emit('shell input keyevent 4'),
  'home': () => emit('shell input keyevent 3'),
  'menu': () => emit('shell input keyevent 1'),
  'rewind': () => emit('shell input keyevent 88'),
  'play/pause': () => emit('shell input keyevent 85'),
  'fastforward': () => emit('shell input keyevent 87'),
  'sound+': () => emit('shell input keyevent 31'),
  'sound-': () => emit('shell input keyevent 32'),
  'mute': () => emit('shell input keyevent 91'),
})

const getButtons = () => {
  return document.querySelectorAll('button');
}

const registerButtonHandlers = () => {
  const btns = getButtons();

  btns.forEach(button => {
    button.addEventListener('click', listeners[button.id]);
  })
}
