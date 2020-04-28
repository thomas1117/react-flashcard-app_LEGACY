
const con = require('./db-client').connection

function createTable(sql, table) {
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(`${table} table created`)
    })
}

con.connect(function(err) {
    if (err) throw err

    const createDeckTable = `
    CREATE TABLE IF NOT EXISTS
    deck
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        language VARCHAR(255)
    )`
    createTable(createDeckTable, 'deck')

    const createSectionTable = `
    CREATE TABLE IF NOT EXISTS
    section
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        language VARCHAR(255)
    )
    `
    createTable(createSectionTable, 'section')

    const createDeckSectionTable = `
    CREATE TABLE IF NOT EXISTS
    deck_section
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        deck_id INT,
        section_id INT
    )
    `
    createTable(createDeckSectionTable, 'deck_section')

    const createCardTable = `
    CREATE TABLE IF NOT EXISTS
    card
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        front TEXT,
        back TEXT,
        meta TEXT,
        type VARCHAR(255)
    )
    `
    createTable(createCardTable, 'card')

    const createSectionCardTable = `
    CREATE TABLE IF NOT EXISTS
    section_card
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section_id INT,
        card_id INT
    )
    `
    createTable(createSectionCardTable, 'section_card')
})