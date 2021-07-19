const levels = [
    {
        nb: 1,
        name: 'Canard Boiteux',
        xp: [0,250]
    },
    {
        nb: 2,
        name: 'Cadet',
        xp: [250,750]
    },
    {
        nb: 3,
        name: "Novice",
        xp: [750,1300]
    },
    {
        nb: 4,
        name: "Chanceux",
        xp: [1300,2000]
    },
    {
        nb: 5,
        name: "Assidu",
        xp: [2000,2800]
    },
    {
        nb: 6,
        name: "Confirmé",
        xp: [2800,3700]
    },
    {
        nb: 7,
        name: "Compulsif",
        xp: [3700,4700]
    },
    {
        nb: 8,
        name: "Acharné",
        xp: [4700,5900]
    },
    {
        nb: 9,
        name: "Chevronné",
        xp: [5900,7200]
    },
    {
        nb: 10,
        name: "Expert",
        xp: [7200,8700]
    },
    {
        nb: 11,
        name: "Vétéran",
        xp: [8700,10300]
    },
    {
        nb: 12,
        name: "Loup Blanc",
        xp: [10300,12000]
    },
    {
        nb: 13,
        name: "Devin",
        xp: [12000,13900]
    },
    {
        nb: 14,
        name: "Ardent",
        xp: [13900,16000]
    },
    {
        nb: 15,
        name: "Jack l’Eventreur",
        xp: [16000,18300]
    },
    {
        nb: 16,
        name: "Ambre",
        xp: [18300,20700]
    },
    {
        nb: 17,
        name: "Ruby",
        xp: [20700,23200]
    },
    {
        nb: 18,
        name: "Saphir",
        xp: [23200,25800]
    },
    {
        nb: 19,
        name: "Émeraude",
        xp: [25800,28500]
    },
    {
        nb: 20,
        name: "Diamant",
        xp: [28500,31400]
    },
    {
        nb: 21,
        name: "Philosophe",
        xp: [31400,34400]
    },
    {
        nb: 22,
        name: "Anarchiste",
        xp: [34400,37500]
    },
    {
        nb: 23,
        name: "Divin",
        xp: [37500,42000]
    }
]

module.exports = {
    getLvl: (lvl, xp) => {
        if (xp === undefined) return levels.filter(l => lvl === l.nb)[0];
        if (lvl === undefined) return levels.filter(l => xp < l.xp[1] && xp > l.xp[0])[0]
    }
}