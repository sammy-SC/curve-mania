getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}

getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

getRandomColor = () => {
    return COLORS[getRandomInt(0, COLORS.length)]
}

clearCircle = (x, y, radius) => {
    ctx.save()
    ctx.beginPath()
    //ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2)
    ctx.arc(x, y, radius * 1.2, 0, 2 * Math.PI)
    ctx.clip()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
}
