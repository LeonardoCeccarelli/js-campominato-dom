"use strict"

/**********************************************
FUNZIONI
**********************************************/

/**
 * Funzione che mi calcola il numero di celle grazie
 * alla difficoltà inserità
 *
 * @param {number}
 * @param {number}
 */

function checkCellNum(num) {
    // creo variabile che darò al return per assegnare un valore alla funzione
    let numResult = ""

    // in base alla scelta dell'utente cambio il risultato in 100/81/49
    switch (parseInt(num)) {
        case 1:
            numResult = 100
            break;

        case 2:
            numResult = 81
            break;

        case 3:
            numResult = 49
            break;

    }

    return numResult;
}

/**
 * Funzione che genera la griglia principale basandosi
 * sul valore ricevuto dalla variabile rightCells passandolo
 * come argomento della funzione
 *
 * @param {number}
 * @param {number}
 */

function generateCellGrid(cellsNumber) {
    // se c'è del contenuto lo resetto evitando che il browser 
    // lo riaggiunga in automatico
    cellContainer.innerHTML = ""

    // con questa operazione trovo i quadrati per
    // riga nel mio container principale
    const numRowCells = Math.sqrt(cellsNumber)

    // così trovo la giusta larghezza e altezza in 
    // percentuale (sempre in base alla difficoltà)
    const sizeCell = 100 / numRowCells

    // creo il ciclo che mi crea nell'html tutte 
    // le celle

    for (let i = 0; i < cellsNumber; i++) {
        const numCell = cellsNumber[i];

        // creo l'elemento da inserire nel DOM e 
        // aggiungo le varie classi
        const cell = document.createElement("div")
        cell.classList.add("box")
        cell.style.width = sizeCell + "%"
        cell.style.height = sizeCell + "%"
        cell.textContent = i + 1

        // Inserisco fin da subito una classe che mi identifica 
        // che quella cella è una bomba
        if (cellsBomb.includes(parseInt(cell.textContent))) {
            cell.classList.add("single_bomb")
        }

        cell.addEventListener("click", clickChangeColor)

        // aggiungo il tutto
        cellContainer.append(cell)
    }
}

/**
 * Funzione che cambia il colore della singola cella al click
 */

function clickChangeColor() {

    // Individuo la cella corrente cliccata
    const currentCell = parseInt(this.textContent)

    if (!cellsBomb.includes(currentCell)) {
        this.classList.add("active")
        indexWin++
    } else {
        this.classList.add("danger")
        indexLose++
    }
    // console.log(indexWin, indexLose);

    // Resetto il contenuto del banner
    bannerOverlay.innerHTML = ""

    // rintraccio tutte le caselle bomba
    const nowCellsBomb = document.querySelectorAll(".single_bomb")
    const listNowCellsBomb = nowCellsBomb.length

    if (indexLose === 1) {
        bannerOverlay.classList.add("active")
        resultClass = "c_lose"
        resultContent = "Hai perso!"
        resultScore = `Hai ottenuto un punteggio di <span class="c_score"> ${indexWin}/${rightCells - totalBomb}</span>`
        // a fine gioco faccio apparire tutte le caselle bomba
        for (let x = listNowCellsBomb - 1; x >= 0; x--) {
            nowCellsBomb.item(x).className += " bg_all_bomb"
        }
    } else if (indexWin === (rightCells - totalBomb)) {
        bannerOverlay.classList.add("active")
        resultClass = "c_win"
        resultContent = "Hai vinto!"
        resultScore = `Hai ottenuto un punteggio di <span class="c_score">${indexWin}/${rightCells - totalBomb}</span>`
        // a fine gioco faccio apparire tutte le caselle bomba
        for (let x = listNowCellsBomb - 1; x >= 0; x--) {
            nowCellsBomb.item(x).className += " bg_all_bomb"
        }
    }

    // Creo il contenuto del banner
    bannerOverlay.innerHTML += `<div class="overlay_banner_content">
                                <h2 class="${resultClass}">${resultContent}</h2>
                                <p>${resultScore}</p>
                                <form>
                                    <button class="btn_banner" type="submit">Rigioca!</button>
                                </form>
                            </div>`
    // console.log(resultClass, resultContent, resultScore);
}

/**
 * Funzione che genera randomicamente n numeri in un range da 1 a 100/81/49
 * secondo la sceltà dell'utente
 * 
 * @param {number} nBomb numero bombe presenti
 * @param {number} maxNumbRandom rappresenta il limite massimo in cui generare il numero casuale
 */
function getRightNumBombs(nBomb, maxNumbRandom) {

    // Creo array vuoto dove verranno inseriri numeri random
    let bombsArray = []

    // uso while per riempire l'array di numeri casuali evitando
    // di inserirne 2 o + uguali
    while (bombsArray.length < nBomb) {
        const singleBomb = getRandomNums(1, maxNumbRandom)

        // Verifico se il numero generato è presente nell'array
        // se NO lo inserisco, altrimenti non faccio nulla
        if (!bombsArray.includes(singleBomb)) {
            bombsArray.push(singleBomb)
        }
    }

    return bombsArray;
}


/**
 * Funzione che genera un numero casuale compreso tra 
 * min (incluso) e max (incluso)
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number} casual number
 */
function getRandomNums(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    const intNumb = Math.floor(Math.random() * (max - min + 1) + min)

    return intNumb;
}