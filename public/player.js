'use strict';

class Player {
    constructor(x, y, color, name) {
        this.x = x
        this.y = y
        this.color = color
        this.name = name
        this.width = SNAKE_WIDTH
        this.speed = MOVEMENT_SPEED
        this.steeringSpeed = STEERING_SPEED
        this.left = false
        this.right = false
        this.dead = false
        this.jumping = false

        const randomAngle = getRandom(0, Math.PI * 2)
        this.heading = randomAngle
    }

    updateHeading() {
        if (this.left) {
            this.heading -= this.steeringSpeed % Math.PI * 2
        } else if (this.right) {
            this.heading += this.steeringSpeed % Math.PI * 2
        }
    }

    updatePosition() {
        const heading = {
            x: this.x + this.speed * Math.cos(this.heading),
            y: this.y + this.speed * Math.sin(this.heading)
        }
        this.x = heading.x
        this.y = heading.y
    }

    checkForColision() {
        const threshold = 2.3
        const heading = {
            x: this.x + (this.width + threshold) * Math.cos(this.heading),
            y: this.y + (this.width + threshold) * Math.sin(this.heading)
        }

        if (heading.x < 0 || heading.x > canvas.width) {
            this.dead = true
            return
        } else if (heading.y < 0 || heading.y > canvas.height) {
            this.dead = true
            return
        }

        const p = ctx.getImageData(heading.x, heading.y, 1, 1).data
        const filteredArray = p.filter((value) => {
            return value !== 0
        })
        this.dead = filteredArray.length !== 0
    }

    draw() {
        if (this.dead) { return }

        if (this.jumping) {
            clearCircle(this.x, this.y, this.width)
        }
        if (this.jumping === false && Math.random() < JUMP_PROBABILITY) {
            this.jumping = true
            setTimeout(() => {
                this.jumping = false
            }, getRandomInt(JUMPING_BOTTOM_LIMIT, JUMPING_TOP_LIMIT))
        }


        this.updateHeading()
        this.updatePosition()
        this.checkForColision()

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
}
