/*
window.addEventListener('load', function () {
  const velocity = 5

  function Drop (x, speed, acc) {
    this.x = x
    this.y = 0
    this.speed = speed
    this.acc = acc
  }

  Drop.prototype.tick = function () {
    this.speed += this.acc
    this.y += this.speed
  }

  function updateArray (array, length, generator) {
    let diff = length - array.length

    if (diff < 0) {
      array.splice(length)
    } else {
      while (diff--) {
        array.push(generator(array.length))
      }
    }
  }

  function random (from, to) {
    return Math.random() * (to - from) + from
  }

  function resize () {
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight
    ctx.fillStyle = colors.prev
    ctx.fillRect(0, 0, cvs.width, cvs.height)
    ctx.fillStyle = colors.current

    updateArray(drops, cvs.width, function (x) {
      const prevDrop = drops[x - 1]
      const prevSpeed = prevDrop && prevDrop.speed || velocity
			 const speed = Math.max(velocity * 0.75, Math.min(velocity * 1.25, random(prevSpeed - 0.1, prevSpeed + 0.1)))

      return new Drop(x, speed, random(0, Math.abs(prevSpeed - speed) / 10))
    })
  }

  function render () {
    let i,
      length = drops.length,
		 drop,

		 finished = 0

    ctx.beginPath()

    for (i = 0; i < length; i++) {
      drop = drops[i]

      if (drop.y <= cvs.height) {
        drop.tick()
      } else {
        finished += 1
      }

      ctx.fillRect(drop.x, 0, 1, Math.floor(drop.y))
    }

    if (finished == cvs.width) {
      drops = []
      colors.next()
      resize()
    }
  }

  var cvs = document.createElement('canvas'),
	 ctx = cvs.getContext('2d'),
	 drops = [],

	 colors = (function () {
      const colors = [ 'PURPLE', 'gold', 'crimson', 'INDIGO', 'TOMATO', 'DARKCYAN' ]
      let currentIndex = 1

      return {
        prev: colors[0],
        current: colors[1],
        next: function () {
          this.prev = colors[currentIndex]
          currentIndex = (currentIndex + 1) % colors.length
          this.current = colors[currentIndex]
        }
      }
    })()

  document.body.appendChild(cvs)
  window.addEventListener('resize', resize)

  requestAnimationFrame(function anim () {
    render()
    requestAnimationFrame(anim)
  })

  resize()
})

export default drawer */
