/* eslint-disable no-magic-numbers */

import '../client/prototypes'

describe('Number.prototype.positive', () => {
  it('returns true if the number is > 0', () => {
    expect((1).positive).toBe(true)
  })

  it('returns false if the number is 0', () => {
    expect((0).positive).toBe(false)
  })

  it('returns false if the number is < 0', () => {
    expect((-1).positive).toBe(false)
  })
})

describe('Number.prototype.positiveOrZero', () => {
  it('returns true if the number is > 0', () => {
    expect((1).positiveOrZero).toBe(true)
  })

  it('returns true if the number is 0', () => {
    expect((0).positiveOrZero).toBe(true)
  })

  it('returns false if the number is < 0', () => {
    expect((-1).positiveOrZero).toBe(false)
  })
})

describe('Number.prototype.zero', () => {
  it('returns false if the number is > 0', () => {
    expect((1).zero).toBe(false)
  })

  it('returns true if the number is 0', () => {
    expect((0).zero).toBe(true)
  })

  it('returns false if the number is < 0', () => {
    expect((-1).zero).toBe(false)
  })
})

describe('Number.prototype.negative', () => {
  it('returns false if the number is > 0', () => {
    expect((1).negative).toBe(false)
  })

  it('returns false if the number is 0', () => {
    expect((0).negative).toBe(false)
  })

  it('returns true if the number is < 0', () => {
    expect((-1).negative).toBe(true)
  })
})

describe('Number.prototype.negativeOrZero', () => {
  it('returns false if the number is > 0', () => {
    expect((1).negativeOrZero).toBe(false)
  })

  it('returns true if the number is 0', () => {
    expect((0).negativeOrZero).toBe(true)
  })

  it('returns true if the number is < 0', () => {
    expect((-1).negativeOrZero).toBe(true)
  })
})

describe('Number.prototype.increment', () => {
  it('returns 1 when the initial number is 0', () => {
    expect((0).increment).toBe(1)
  })
})

describe('Number.prototype.decrement', () => {
  it('returns -1 when the initial number is 0', () => {
    expect((0).decrement).toBe(-1)
  })
})

describe('Number.prototype.clamp', () => {
  expect((-100).clamp(-50, 50)).toBe(-50)
  expect((0).clamp(-50, 50)).toBe(0)
  expect((100).clamp(-50, 50)).toBe(50)
})

describe('Array.prototype.first', () => {
  it('returns the first element of an array', () => {
    expect([1, 2, 3].first).toBe(1)
  })
})

describe('Array.prototype.last', () => {
  it('returns the last element of an array', () => {
    expect([1, 2, 3].last).toBe(3)
  })
})

describe('Array.prototype.tail', () => {
  it('returns a new array without the first element', () => {
    expect([1, 2, 3].tail).toEqual([2, 3])
  })

  it('returns an empty array if the array contains only one value', () => {
    expect([1].tail).toHaveLength(0)
  })

  it('returns an empty array if the array is empty', () => {
    expect([].tail).toHaveLength(0)
  })
})