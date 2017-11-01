Object.defineProperty(Number.prototype, 'positive', {
  get: function positive() {
    return this > 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'positiveOrZero', {
  get: function positiveOrZero() {
    return this >= 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'negative', {
  get: function negative() {
    return this < 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'negativeOrZero', {
  get: function negativeOrZero() {
    return this <= 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'zero', {
  get: function zero() {
    return this === 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'increment', {
  get: function increment() {
    return this + 1 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'decrement', {
  get: function decrement() {
    return this - 1 // eslint-disable-line no-magic-numbers
  },
})

Number.prototype.clamp = function(min, max) {
  return this <= min ? min : this >= max ? max : this
}

Object.defineProperty(Array.prototype, 'first', {
  get: function first() {
    return this[0] // eslint-disable-line no-magic-numbers
  },
  enumerable: false,
})

Object.defineProperty(Array.prototype, 'last', {
  get: function last() {
    return this[this.length - 1] // eslint-disable-line no-magic-numbers
  },
  enumerable: false,
})

Object.defineProperty(Array.prototype, 'middle', {
  get: function middle() {
    return this[[Math.floor((this.length - 1) / 2)]] // eslint-disable-line no-magic-numbers
  },
  enumerable: false,
})

Object.defineProperty(Array.prototype, 'tail', {
  get: function tail() {
    return this.slice(1) // eslint-disable-line no-magic-numbers
  },
  enumerable: false,
})
