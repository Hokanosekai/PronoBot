/**
 * Generate 4 random chars
 *
 * @returns {string}
 */
module.exports.roomCode = () => {
    let code = "";
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
    for (let i = 0; i < 4; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}


module.exports.capitalize = (str) => {
    return str.replace(/^\w/, c => { return c.toUpperCase()})
}

module.exports.addXp = (cote, mise, money) => {

    //console.log('BASE', mise, money, cote)
    const m = mise/(money + mise)

    //console.log('m', m)
    //console.log('xp', l)
    return cote * 2 * Math.exp(1 + m)
}

module.exports.removeXp = (cote, mise, money) => {

    //console.log('BASE', mise, money, cote)
    const m = mise/(money + mise)

    //console.log('m', m)
    const l = Math.exp(1 - m - cote) * (cote ** 2) * (1 - (1 / (1 + cote / 4))) * 100

    //console.log('xp', -l)
    return -l
}