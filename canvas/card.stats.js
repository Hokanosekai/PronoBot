const Canvas = require('canvas')

module.exports.matchCard = async (author, stats) => {

    const user = author.tag
    const avatar = author.displayAvatarURL({format: 'png'})
    const presence = author.presence.status

    Canvas.registerFont(`${process.env.BOT_PATH}/fonts/OpenSans-Regular.ttf`, {family: 'OpenSansR'})
    Canvas.registerFont(`${process.env.BOT_PATH}/fonts/OpenSans-Light.ttf`, {family: 'OpenSansL'})

    const canvas = Canvas.createCanvas(700, 500)
    const ctx = canvas.getContext('2d')

    /* Set Card Background */
    ctx.fillStyle = '#451F55'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    /* Set Logo */
    const logo = await Canvas.loadImage(`${process.env.BOT_PATH}/images/logo.svg`)
    ctx.drawImage(logo, 5, 5, 50, 37.5)


    ctx.fillStyle = '#fff'
    ctx.font = '40px OpenSansL'
    ctx.textAlign = "center"
    ctx.fillText('Statistics', 350, 40)

    /* Set User Avatar */

    let statusColor = '#292929';
    switch (presence) {
        case 'dnd':
            statusColor = '#ff0000'
            break
        case 'online':
            statusColor = '#10ff00'
            break
        case 'offline':
            statusColor = '#444444'
            break
    }

    ctx.save()
    const avatarI = await Canvas.loadImage(avatar)
    ctx.beginPath();
    ctx.arc(50, 110, 40, 0, 2 * Math.PI, false);
    ctx.lineWidth = 6;
    ctx.strokeStyle = statusColor;
    ctx.stroke();
    ctx.clip()
    ctx.drawImage(avatarI, 10, 70, 80, 80)
    ctx.restore()

    /* Set User Tag */
    ctx.fillStyle = '#fff'
    ctx.font = '30px OpenSansL'
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText(user, 100, 110)


    /* Set Middle Bar */
    ctx.fillStyle = '#6d6d6d'
    ctx.fillRect(348, 150, 4, 320)

    /* Set nb Win */
    ctx.textAlign = "right"
    ctx.textBaseline = "top"
    ctx.font = '50px OpenSansR'
    ctx.fillStyle = '#fff'
    ctx.fillText(stats.win, 150, 190)
    const winI = await Canvas.loadImage('https://discord.com/assets/0a00e865c445d42dfb9f64bedfab8cf8.svg')
    ctx.drawImage(winI, 160, 200, 50, 50)


    /* Set nb Loose */
    ctx.textAlign = "right"
    ctx.textBaseline = "top"
    ctx.font = '50px OpenSansR'
    ctx.fillStyle = '#fff'
    ctx.fillText(stats.loose, 150, 290)
    const looseI = await Canvas.loadImage('https://discord.com/assets/8359db312f7319a4b0b23415e5fd1392.svg')
    ctx.drawImage(looseI, 160, 300, 50, 50)


    /* Set nb Game */
    ctx.textAlign = "right"
    ctx.textBaseline = "top"
    ctx.font = '50px OpenSansR'
    ctx.fillStyle = '#fff'
    ctx.fillText(stats.game, 150, 390)
    const gameI = await Canvas.loadImage('https://discord.com/assets/f1426431eb7c60fb8c072f90acb07ceb.svg')
    ctx.drawImage(gameI, 160, 400, 50, 50)


    /* Set tot Gain */
    const coinI = await Canvas.loadImage('https://discord.com/assets/11b9d8164d204c7fd48a88a515745c1d.svg')
    ctx.textAlign = "right"
    ctx.textBaseline = "top"
    ctx.font = '50px OpenSansR'
    ctx.fillStyle = '#fff'
    ctx.fillText(stats.gain, 500, 190)
    ctx.drawImage(coinI, 510, 200, 50, 50)


    /* Set tot Mise */
    ctx.textAlign = "right"
    ctx.textBaseline = "top"
    ctx.font = '50px OpenSansR'
    ctx.fillStyle = '#fff'
    ctx.fillText(stats.stake, 500, 290)
    ctx.drawImage(coinI, 510, 300, 50, 50)

    /* Set % */
    ctx.textAlign = "right"
    ctx.textBaseline = "top"
    ctx.font = '50px OpenSansR'
    ctx.fillStyle = '#fff'
    ctx.fillText(stats.taux, 500, 390)
    const barI = await Canvas.loadImage('https://discord.com/assets/7b4003ce2786fcf382c6b1ba5ac08f24.svg')
    ctx.drawImage(barI, 510, 400, 50, 50)

    return canvas.toBuffer()
}