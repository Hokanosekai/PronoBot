//const db = require('./db')
const mysql = require("mysql");
require('dotenv').config({path: '/root/botsdiscord/pronobot/.env'})


function Db(_db_host, _db_user, _db_password, _db_database) {
    let db_host = _db_host
    let db_user = _db_user
    let db_password = _db_password
    let db_database = _db_database

    let con = this.db_connect()

    this.db_connect = () => {
        let c = mysql.createConnection({
            host: db_host,
            user: db_user,
            password: db_password,
            database: db_database
        })

        return c.connect(err => {
            console.error(err)
        })
    }

    this.query = (sql) => {
        let p = new Promise((resolve, reject) => {
            con.query(sql, (err, res) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(res)
            })
        })
        return p
    }
}

const db = new Db(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DATABASE)

const getPromise = (sql) => {
    let p = new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        })
    })
    return p
}

module.exports = {
    getUser: (id_u) => {
        return db.query(`SELECT * FROM users WHERE id_user=${id_u}`)
    },
    getMatch: (id_g) => {
        return db.query(`SELECT * FROM matchs WHERE id_guild=${id_g}`)
    },
    getBetsByUser: (id_u) => {
        return db.query(`SELECT * FROM bets WHERE id_user=${id_u}`)
    },
    getBetsByGuild: (id_g) => {
        return db.query(`SELECT * FROM bets WHERE id_guild=${id_g}`)
    },
    getBetByUserByGuild: (id_u, id_g) => {
        return db.query(`SELECT * FROM bets WHERE id_user=${id_u} AND id_guild=${id_g} ORDER BY bet_time DESC`)
    },
    getBalTop: () => {
        return db.query(`SELECT * FROM users ORDER BY money DESC LIMIT 10`)
    },
    getTopWin: () => {
        return db.query(`SELECT * FROM users ORDER BY nb_win DESC LIMIT 10`)
    },
    getTopLoose: () => {
        return db.query(`SELECT * FROM users ORDER BY nb_loose DESC LIMIT 10`)
    },
    getTopGame: () => {
        return db.query(`SELECT * FROM users ORDER BY nb_game DESC LIMIT 10`)
    },

    removeUser: (id_u) => {
        return db.query(`DELETE FROM users WHERE id_user=${id_u}`)
    },
    removeBetById: (id) => {
        return db.query(`DELETE FROM bets WHERE id=${id}`)
    },
    removeBetByUser: (id_u) => {
        return db.query(`DELETE FROM bets WHERE id_user=${id_u}`)
    },
    removeBetByGuild: (id_g) => {
        return db.query(`DELETE FROM bets WHERE id_guild=${id_g}`)
    },
    removeMatch: (id_g) => {
        return db.query(`DELETE FROM matchs WHERE id_guild=${id_g}`)
    },

    addUser: (values) => {
        return db.query(`INSERT INTO users (id_user, tag_user) VALUES (${values.id_u}, '${values.tag}');`)
    },
    addBet: (values) => {
        return db.query(`INSERT INTO bets (id_guild, id_user, ville, cote, somme, gain) VALUES (${values.id_g}, ${values.id_u}, '${values.club}', ${values.cote}, ${values.somme}, ${values.gain})`)
    },
    addMatch: (values) => {
        return db.query(`INSERT INTO matchs (id_guild, id_author, atk_name, atk_cote, nul_name, nul_cote, def_name, def_cote, end_date) VALUES (${values.id_g}, ${values.id_u}, '${values.atk_n}', ${values.atk_c}, '${values.nul_n}', ${values.nul_c}, '${values.def_n}', ${values.def_c}, '${values.end}')`)
    },

    updateTag: (id_u, tag) => {
        return db.query(`UPDATE users SET tag_user='${tag}' WHERE id_user=${id_u}`)
    },
    updateMoney: (id_u, money) => {
        return db.query(`UPDATE users SET money=${money} WHERE id_user=${id_u}`)
    },
    updateDaily: (id_u, daily) => {
        return db.query(`UPDATE users SET daily_claimed='${daily}' WHERE id_user=${id_u}`)
    },
    updateGame: (id_u, game) => {
        return db.query(`UPDATE users SET nb_game=${game} WHERE id_user=${id_u}`)
    },
    updateWin: (id_u, win) => {
        return db.query(`UPDATE users SET nb_win=${win} WHERE id_user=${id_u}`)
    },
    updateLoose: (id_u, loose) => {
        return db.query(`UPDATE users SET nb_loose=${loose} WHERE id_user=${id_u}`)
    },
}