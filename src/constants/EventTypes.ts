enum EventTypes {
  // Mouse Events
  IDLE = 'idle',
  CLICK = 'click',
  MOUSE_UP = 'mouseup',
  DBLCLICK = 'dblclick',
  MOUSE_OUT = 'mouseout',
  MOUSE_DOWN = 'mousedown',
  MOUSE_MOVE = 'mousemove',
  MOUSE_OVER = 'mouseover',
  MOUSE_ENTER = 'mouseenter',
  MOUSE_LEAVE = 'mouseleave',
  CONTEXT_MENU = 'contextmenu',

  // Keyboard Events
  KEY_UP = 'keyup',
  ESCAPE = 'Escape',
  KEY_DOWN = 'keydown',
  KEY_PRESS = 'keypress',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',

  // Form Events
  BLUR = 'blur',
  INPUT = 'input',
  RESET = 'reset',
  FOCUS = 'focus',
  CHANGE = 'change',
  SUBMIT = 'submit',

  // Touch Events
  TOUCH_END = 'touchend',
  TOUCH_MOVE = 'touchmove',
  TOUCH_START = 'touchstart',
  TOUCH_CANCEL = 'touchcancel',

  // Pointer Events
  POINTER_UP = 'pointerup',
  POINTER_OUT = 'pointerout',
  POINTER_DOWN = 'pointerdown',
  POINTER_MOVE = 'pointermove',
  POINTER_OVER = 'pointerover',
  POINTER_ENTER = 'pointerenter',
  POINTER_LEAVE = 'pointerleave',
  POINTER_CANCEL = 'pointercancel',

  // Drag & Drop Events
  DRAG = 'drag',
  DROP = 'drop',
  DRAG_END = 'dragend',
  DRAG_OVER = 'dragover',
  DRAG_START = 'dragstart',
  DRAG_ENTER = 'dragenter',
  DRAG_LEAVE = 'dragleave',

  // Clipboard Events
  CUT = 'cut',
  COPY = 'copy',
  PASTE = 'paste',

  // Media Events
  PLAY = 'play',
  PAUSE = 'pause',
  ENDED = 'ended',
  TIME_UPDATE = 'timeupdate',
  VOLUME_CHANGE = 'volumechange',
  LOADED_METADATA = 'loadedmetadata',

  // Focus & Visibility Events
  FOCUS_IN = 'focusin',
  FOCUS_OUT = 'focusout',
  VISIBILITY_CHANGE = 'visibilitychange',

  // Scroll Events
  WHEEL = 'wheel',
  SCROLL = 'scroll',

  // Window Events
  LOAD = 'load',
  ERROR = 'error',
  RESIZE = 'resize',
  UNLOAD = 'unload',
  ONLINE = 'online',
  OFFLINE = 'offline',
  BEFORE_UNLOAD = 'beforeunload',
}

export default EventTypes;
