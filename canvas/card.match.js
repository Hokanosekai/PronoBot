const Canvas = require('canvas')

module.exports.matchCard = async (name, clubA, clubB, cotes) => {

    Canvas.registerFont(`${process.env.BOT_PATH}/fonts/OpenSans-Regular.ttf`, {family: 'OpenSansR'})
    Canvas.registerFont(`${process.env.BOT_PATH}/fonts/OpenSans-Light.ttf`, {family: 'OpenSansL'})

    const canvas = Canvas.createCanvas(600, 300)
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
    ctx.fillText(name, 300, 40)

    /* Set Club 1 */
    const club1 = await Canvas.loadImage(`${process.env.BOT_PATH}/images/club1.png`)
    ctx.drawImage(club1, 115, 90,  50, 50)
    ctx.textAlign = "center"
    ctx.font = "23px OpenSansR"
    ctx.fillStyle = '#ababab'
    ctx.fillText(clubA, 140, 170)


    /* Set Club 2 */
    const club2 = await Canvas.loadImage(`${process.env.BOT_PATH}/images/club2.png`)
    ctx.drawImage(club2, 435, 90,  50, 50)
    ctx.textAlign = "center"
    ctx.font = "23px OpenSansR"
    ctx.fillStyle = '#ababab'
    ctx.fillText(clubB, 460, 170)

    /* Set VS image */
    const vsImg = await Canvas.loadImage(`${process.env.BOT_PATH}/images/matchVS.png`)
    ctx.drawImage(vsImg, 265, 95, 70, 70);


    /* Set Cote BG 1 */

    let xs = 140;
    cotes.forEach(c => {
        ctx.fillStyle = '#22162B'

        let width = 110
        let height = 60
        let x = xs - width/2
        let y = 250 - height/2
        let radius = 10
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill()

        ctx.fillStyle = '#fff'
        ctx.textAlign = "center"
        ctx.fillText(c, xs, 260)

        xs += 160
    })

    return canvas.toBuffer()
}