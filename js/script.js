"use strict"

// Individuo le tre sezioni dove dovrò lavorare e aggiungere tramite javascript nel DOM

// finestra dove imposto la difficoltà
const selectDifficult = document.getElementById("difficult_select")

// bottone per far apparire il riquadro e far partire il gioco
const btnStartGame = document.getElementById("btn_start_game")

// contenitore dove si formerà il quadrato con il nummero di celle in base alla difficoltà selezionata
const cellContainer = document.getElementById("square_container")

// Aggiungo l'evento al bottone che, se cliccato, mi genera il riquadro
btnStartGame.addEventListener("click", function () {

    cellContainer.classList.add("border_active")

    // Creo costante che mi individua il valore della select
    const levelSelect = selectDifficult.value

    const rightCells = checkCellNum(levelSelect)

    generateCellGrid(rightCells)
})

console.log(getRightNumBombs(16, 81));