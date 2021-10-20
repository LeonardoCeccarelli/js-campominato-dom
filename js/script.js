"use strict"

// Individuo le tre sezioni dove dovrò lavorare e aggiungere tramite javascript nel DOM

// finestra dove imposto la difficoltà
const selectDifficult = document.getElementById("difficult_select")

// bottone per far apparire il riquadro e far partire il gioco
const btnStartGame = document.getElementById("btn_start_game")

// contenitore dove si formerà il quadrato con il nummero di celle in base alla difficoltà selezionata
const cellContainer = document.getElementById("square_container")

// Individuo il banner che uscira a gioco terminato
const bannerOverlay = document.getElementById("banner_game_end")

let resultClass
let resultContent
let resultScore

// Creo variabile che mi restituisce l'array delle bombe totali
let cellsBomb = []

// Creo le variabili indici che mi permettono di verificare quando
// l'utente ha vinto o ha perso

let indexWin = 0
let indexLose = 0

// Creo variabile dove indico il numero di bombe presenti
let totalBomb = 16

// porto fuori dall'evento click la variabile del numero esatto di celle
// così da calcolare quando l'utente ha vinto
let rightCells;

// Aggiungo l'evento al bottone che, se cliccato, mi genera il riquadro
btnStartGame.addEventListener("click", function () {

    indexWin = 0

    cellContainer.classList.add("border_active")

    // Creo costante che mi individua il valore della select
    const levelSelect = selectDifficult.value

    rightCells = checkCellNum(levelSelect)

    generateCellGrid(rightCells)

    cellsBomb = getRightNumBombs(totalBomb, rightCells)
    cellsBomb.sort((a, b) => a - b)
    console.log(cellsBomb);
})






