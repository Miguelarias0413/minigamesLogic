
const gridGameplay = document.querySelectorAll('.parent .child');
const player = document.querySelector('.player');

turn = Math.trunc(Math.random() * 2)
if (turn == 2) {
    turn = 0;
}
player.classList.add(turn ? 'playerX' : 'playerO')
player.textContent = ` ${turn ? '(X)' : '(O)'} `
let turnPlays = 0;




// LOGICA DEL JUEGO Y SELECCION DE TURNO DE JUGADOR
gridGameplay.forEach((grid) => {
    grid.addEventListener('click', (e) => {

        //validar si solo tiene una clase
        if (grid.classList.length == 1) {
            //si solo tiene una clase se le añade la clase clicked
            //que establece ciertos valores
            grid.classList.add('clicked');
            if (turn == 1) {
                grid.classList.add('childX');
                turn = 0;
                turnPlays++;
                player.classList.remove('playerX');

                player.classList.add('playerO');
                player.textContent = `  ${turn ? '(X)' : '(O)'} `;

            }
            else {
                grid.classList.add('childO');
                turn = 1;
                turnPlays++;
                player.classList.remove('playerX');
                player.classList.remove('playerO');
                player.classList.add('playerX');
                player.textContent = `  ${turn ? '(X)' : '(O)'} `;


            }
        }

        grid.classList.add('animation');
        setTimeout(() => {
            grid.classList.remove('animation');
        }, 300)

        hasWon();

    })


})
////////////////////////////////////////////////////////////

function restart() {
    gridGameplay.forEach(grid => {
        grid.classList.remove('clicked')
        grid.classList.remove('childX')
        grid.classList.remove('childO')
        player.classList.remove('playerX')
        player.classList.remove('playerO')

    })

    turn = Math.trunc(Math.random() * 2)
    if (turn == 2) {
        turn = 0;
    } else if (turn == 0) {
        player.classList.remove('playerX');
    }
    else {
        player.classList.remove('playerO');
    }

    player.classList.add(turn ? 'playerX' : 'playerO')
    player.textContent = ` ${turn ? '(X)' : '(O)'} `
    turnPlays = 0;


   
}



//RESTART BUTTON
const buttonStart = document.querySelector('#start');

buttonStart.addEventListener("click", () => {
    buttonStart.classList.add('animation');
    setTimeout(() => {
        buttonStart.classList.remove('animation');
    }, 300)
})


function hasWon() {
    let win = false;
    let winCases = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]
    let posicionesX = [];
    let posicionesO = [];

    winCases.forEach((wcase, inte) => {
        gridGameplay.forEach((grid, index) => {

            // console.log(index,grid)
            if (grid.classList.contains('childX')) {
                if (posicionesX.includes(index)) 
                {
                    
                } 
                else
                {
                    posicionesX.push(index);
                    console.log(`${posicionesX}__arrayX y index ${index}`)
                    console.log(posicionesX)
                   
                   
                }


            }
            if(grid.classList.contains('childO'))
            {
                //verifica si el indice en el array de posiciones O ya está para no volverlo a agregar en el ciclo
                if (posicionesO.includes(index)) 
                {
                    
                }
                else
                {
                    posicionesO.push(index);
                    console.log(`${posicionesO}__arrayO y index ${index}`)
                    console.log(posicionesO)

                }
                

            }
            


        })
        //se revisa cada caso de la instancia wcase y se le pasa el metodo every que evalua cada
        //indice de array y valida que las posiciones de cada jugador 
        let jugadorxGanador = wcase.every((indice)=>{ return posicionesX.includes(indice)})
        let jugadoroGanador = wcase.every((indice)=>{ return posicionesO.includes(indice)})

        if (jugadorxGanador || jugadoroGanador){
            jugadorxGanador ? xWinnerHandler(): false
            jugadoroGanador ? oWinnerHandler(): false
        }

    })


}
const modal = document.querySelector(".modal")
const modalContent = document.querySelector(".modal_winner")
console.log(modal)

function xWinnerHandler(){
    modalContent.textContent = "Felicidades jugador X"
    modalContent.classList.add('playerX')
    modal.classList.toggle('opened')
    setTimeout(()=>{
        modalContent.classList.remove("playerZ")
        modal.classList.remove('opened')
        restart()
    },2000)
    


}

function oWinnerHandler(){
    modalContent.textContent = "Felicidades jugador O"
    modalContent.classList.add('playerO')
    modal.classList.toggle('opened')
    setTimeout(()=>{
        modalContent.classList.remove("playerO")
        modal.classList.remove('opened')
        restart()
    },2000)

    

}