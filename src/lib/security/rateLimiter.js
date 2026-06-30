export class RateLimiter {
  constructor({ windowMs = 60000, maxRequests = 5 } = {}) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
    this.requests = new Map()
  }

  check(identifier) {
    const now = Date.now()
    const key = `${identifier}`

    if (!this.requests.has(key)) {
      this.requests.set(key, [])
    }

    let times = this.requests.get(key)
    times = times.filter(t => now - t < this.windowMs)

    if (times.length >= this.maxRequests) {
      return { allowed: false, remaining: 0 }
    }

    times.push(now)
    this.requests.set(key, times)

    return {
      allowed: true,
      remaining: this.maxRequests - times.length,
      resetTime: times[0] + this.windowMs,
    }
  }

  reset(identifier) {
    this.requests.delete(identifier)
  }

  clear() {
    this.requests.clear()
  }
}
