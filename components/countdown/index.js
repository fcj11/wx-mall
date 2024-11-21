Component({
  properties: {
    endTime: {
      type: Number,
      value: 0
    }
  },

  data: {
    timeLeft: '',
    timer: null
  },

  lifetimes: {
    attached() {
      this.startCountdown()
    },
    detached() {
      this.clearTimer()
    }
  },

  methods: {
    startCountdown() {
      this.clearTimer()
      this.calculateTime()
      this.data.timer = setInterval(() => {
        this.calculateTime()
      }, 1000)
    },

    calculateTime() {
      const now = Date.now()
      const diff = this.properties.endTime - now
      
      if (diff <= 0) {
        this.clearTimer()
        this.triggerEvent('timeup')
        return
      }

      const minutes = Math.floor(diff / 1000 / 60)
      const seconds = Math.floor(diff / 1000 % 60)
      
      this.setData({
        timeLeft: `${minutes}:${seconds.toString().padStart(2, '0')}`
      })
    },

    clearTimer() {
      if (this.data.timer) {
        clearInterval(this.data.timer)
        this.data.timer = null
      }
    }
  }
}) 