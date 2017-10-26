Object.defineProperty(Number.prototype, 'positive', {
  get: function positive() {
    return this > 0 /* eslint no-magic-numbers: 0 */
  },
})

Object.defineProperty(Number.prototype, 'positiveOrZero', {
  get: function positiveOrZero() {
    return this >= 0 /* eslint no-magic-numbers: 0 */
  },
})

Object.defineProperty(Number.prototype, 'negative', {
  get: function negative() {
    return this < 0 /* eslint no-magic-numbers: 0 */
  },
})

Object.defineProperty(Number.prototype, 'negativeOrZero', {
  get: function negativeOrZero() {
    return this <= 0 /* eslint no-magic-numbers: 0 */
  },
})

Object.defineProperty(Number.prototype, 'zero', {
  get: function zero() {
    return this === 0 /* eslint no-magic-numbers: 0 */
  },
})

Object.defineProperty(Number.prototype, 'increment', {
  get: function increment() {
    return this + 1 /* eslint no-magic-numbers: 0 */
  },
})

Object.defineProperty(Number.prototype, 'decrement', {
  get: function decrement() {
    return this - 1 /* eslint no-magic-numbers: 0 */
  },
})

Number.prototype.clamp = function(min, max) {
  return this <= min ? min : this >= max ? max : this
}
