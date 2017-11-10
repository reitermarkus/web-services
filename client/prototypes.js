Object.defineProperty(Number.prototype, 'positive', {
  get: function() {
    return this > 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'positiveOrZero', {
  get: function() {
    return this >= 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'negative', {
  get: function() {
    return this < 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'negativeOrZero', {
  get: function() {
    return this <= 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'zero', {
  get: function() {
    return this === 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'increment', {
  get: function() {
    return this + 1 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'decrement', {
  get: function() {
    return this - 1 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'clamp', {
  value: function(min, max) {
    return this <= min ? min : this >= max ? max : this
  },
})

Object.defineProperty(Number.prototype, 'between', {
  value: function(min, max) {
    return this >= min && this <= max
  },
})

Object.defineProperty(Array.prototype, 'first', {
  get: function() {
    return this[0] // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Array.prototype, 'last', {
  get: function() {
    return this[this.length - 1] // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Array.prototype, 'middle', {
  get: function() {
    return this[[Math.floor((this.length - 1) / 2)]] // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Array.prototype, 'tail', {
  get: function() {
    return this.slice(1) // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(String.prototype, 'join', {
  value: function() {
    return this // eslint-disable-line no-magic-numbers
  },
})
