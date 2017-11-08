Object.defineProperty(Number.prototype, 'positive', {
  value: function() {
    return this > 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'positiveOrZero', {
  value: function() {
    return this >= 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'negative', {
  value: function() {
    return this < 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'negativeOrZero', {
  value: function() {
    return this <= 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'zero', {
  value: function() {
    return this === 0 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'increment', {
  value: function() {
    return this + 1 // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Number.prototype, 'decrement', {
  value: function() {
    return this - 1 // eslint-disable-line no-magic-numbers
  },
})

Number.prototype.clamp = function(min, max) {
  return this <= min ? min : this >= max ? max : this
}

Object.defineProperty(Array.prototype, 'first', {
  value: function() {
    return this[0] // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Array.prototype, 'last', {
  value: function() {
    return this[this.length - 1] // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Array.prototype, 'middle', {
  value: function() {
    return this[[Math.floor((this.length - 1) / 2)]] // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(Array.prototype, 'tail', {
  value: function() {
    return this.slice(1) // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(String.prototype, 'join', {
  value: function(s) {
    return this // eslint-disable-line no-magic-numbers
  },
})

Object.defineProperty(String.prototype, 'startsWith', {
  value: function(s) {
    return (this.substring(0, s.length) == s) // eslint-disable-line no-magic-numbers
  },
})
