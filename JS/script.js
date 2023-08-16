console.log('Welcome to Tic Tac Toe');


let photo_div1 = document.getElementById('p1_photo_div');
let photo_div2 = document.getElementById('p2_photo_div');
let photo1_inp = document.getElementById('Player1_pic_inp');
let photo2_inp = document.getElementById('Player2_pic_inp');

// Function to convert file to image on file input of p1
function readUrlP1(el) {
    if (el.files && el.files[0]) {
        var reader = new FileReader();
        reader.addEventListener('load', () => {
            let img = document.createElement('img');
            let image_check = document.getElementById('p1_image');
            if (image_check == undefined) {
                img.id = 'p1_image';
                img.src = reader.result;
                img.style.width = '150px';
                img.style.height = '150px';
                img.style.borderRadius = '100px';
                photo_div1.appendChild(img);
            }
            else {
                image_check.src = reader.result;
            }
            console.log(reader.result);
        })
        reader.readAsDataURL(el.files[0]);
    }
}

// Function to convert file to image on file input of p2
function readUrlP2(el) {
    if (el.files && el.files[0]) {
        var reader = new FileReader();
        reader.addEventListener('load', () => {
            let img = document.createElement('img');
            let image_check = document.getElementById('p2_image');
            if (image_check == undefined) {
                img.id = 'p2_image';
                img.src = reader.result;
                img.style.width = '150px';
                img.style.height = '150px';
                img.style.borderRadius = '100px';
                photo_div2.appendChild(img);
            }
            else {
                image_check.src = reader.result;
            }
            console.log(reader.result);
        })
        reader.readAsDataURL(el.files[0]);
    }
}


let current_player = 1;
const wining_pos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
[2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
let start_game_btn = document.getElementById('start_game_btn');
let player1_h = document.getElementById('player1_h');
let player2_h = document.getElementById('player2_h');

// When Start Game Button is clicked, remove the button
start_game_btn.addEventListener('click', () => {
    if(start_game_btn.innerText == 'Reset Game'){
        let elements = document.querySelectorAll('.btn_img');
    Array.from(elements).forEach((ele) => {
        ele.innerHTML = "";
        ele.classList.add('hover');
    });
    start_game_btn.innerText = 'Start Game';
    winnerText.innerText = '';
    winnerText.className = '';
    player1_h.style.color = 'white';
    player2_h.style.color = 'white';
    }

    else{
        start_game_btn.style.display = 'none';
    
    if(current_player == 1){
        player1_h.style.color = 'rgb(130, 44, 230)';
        player2_h.style.color = 'gray';
    }
    else if(current_player == 2){
        player2_h.style.color = 'rgb(130, 44, 230)';
        player1_h.style.color = 'gray';

    }
    }
});

let clicks = 0;
let winner;

// Function to set x or o image in button when user clicks
function setGridImage(index) {
    let btn = document.getElementById(`btn${index}`);

    // if start game is clicked, then only allow iput
    if (start_game_btn.style.display == 'none') {

        // if the button does not have an image in it, then allow to input an image, else do nothing  
        if (btn.children.length == 0) {

            // if current player is 1
            if (current_player == 1) {

                // creating an image elem and properties 
                let img = document.createElement('img');
                img.id = `x_${index}`;
                img.src = 'Images/x-tic-tac-toe.png';
                img.style.width = '10vw';
                img.style.height = '20vh';

                // this is a fake class to acces only x-image elements
                img.className = 'checkIfEndX';

                // adding image child to div
                btn.appendChild(img);
                btn.classList.remove('hover');
                
                // swapping players
                current_player = 2;
                player2_h.style.color = 'rgb(130, 44, 230)';
                player1_h.style.color = 'gray';
                
                // incrementing clicks
                clicks += 1;
                // console.log(clicks);
                
                // if cliks>4, then only game can end
                if (clicks > 4) {
                    
                    // set winner to p1 or p2
                    winner = checkGameEnd();
                    
                    // if we have a winner resetGame
                    if (winner != 0) {
                        resetGame();
                    }
                }

                // if clicks==9, then only game can be draw
                if (clicks == 9) {
                    winner = checkGameEnd();
                    // if winner == 0, means it is a draw 
                    if (winner == 0) {
                        console.log('Game Drawn');
                    }
                    resetGame();
                }
            }

            // if current player is 2
            else {
                let img = document.createElement('img');
                img.id = `o_${index}`;
                img.className = 'checkIfEndO';
                img.src = 'Images/o-tic-tac-toe.png';
                img.style.width = '9vw';
                img.style.height = '9vw';

                btn.appendChild(img);
                btn.classList.remove('hover');

                current_player = 1;
                player1_h.style.color = 'rgb(130, 44, 230)';
                player2_h.style.color = 'gray';
                clicks += 1;
                console.log(clicks);
                if (clicks > 4) {
                    winner = checkGameEnd();
                    if (winner != 0) {
                        winner = checkGameEnd();
                        resetGame();
                    }
                }
            }
        }
    }

    // if start game is not clicked, ask user to click it
    else {
        alert('Start the Game by clicking Start Game')
    }
}

// Function to check if game has ended
function checkGameEnd() {
    // getting all x elements by fake class
    let elems_x = document.querySelectorAll('.checkIfEndX');

    // getting all x elements by fake class
    let elems_o = document.querySelectorAll('.checkIfEndO');

    // Arrays to store indexes of x and o
    let array_x = [];
    let array_o = [];

    // setting winner to 0, so when noone wins, it gives draw
    let winner = 0;

    // assignig array its value using the id of image in that button
    Array.from(elems_x).forEach((element, i) => {
        array_x[i] = Number(element.id.charAt(2));
        // console.log(i);
    });

    // assignig array its value using the id of image in that button
    Array.from(elems_o).forEach((element, i) => {
        array_o[i] = Number(element.id.charAt(2));
        //  console.log(array_o[i]);
    });


    // checking if p1 wins
    wining_pos.forEach((e) => {
        // console.log(e);
        // console.log(array_x);
        let yes = 0;

        // traversing the array to check
        for (let i = 0; i < array_x.length; i++) {

            // if array includes the elemnt of winningposition array, increase yes by 1
            if (array_x.includes(e[i])) {
                yes++;
            }
        }

        // if all 3 elements of winningPosition are there in array then it is winner
        if (yes == 3) {
            console.log('Winner player 1!!');
            winner = 1;
        }
    });

    // checking if p2 wins
    wining_pos.forEach((e) => {
        // console.log(e);
        // console.log(array_o);
        let yes = 0;
        for (let i = 0; i < array_o.length; i++) {
            if (array_o.includes(e[i])) {
                yes++;
            }
        }
        if (yes == 3) {
            console.log('Winner player 2!!');
            winner = 2;
        }
    });
    return winner;
}


let p1_wins = 0;
let p2_wins = 0;
let p1_loss = 0;
let p2_loss = 0;
let matches = 0;
let p1_gameswon_h = document.getElementById('p1_gameswon_h');
let p1_gameslost_h = document.getElementById('p1_gameslost_h');
let p1_gamesplayed_h = document.getElementById('p1_gamesplayed_h');
let p2_gameswon_h = document.getElementById('p2_gameswon_h');
let p2_gameslost_h = document.getElementById('p2_gameslost_h');
let p2_gamesplayed_h = document.getElementById('p2_gamesplayed_h');

let winnerText = document.getElementById('winnerText');


// Function to reset to game  
function resetGame() {
    start_game_btn.style.display = 'inline';
    start_game_btn.innerText = 'Reset Game';
    winnerText.className = 'winner';
    matches++;
    clicks = 0;
    if(matches%2 == 0){
        current_player = 1;
    }
    else{
        current_player = 2;
    }
    if(winner == 1){
        p1_wins++;
        p2_loss++;
        winnerText.innerText = 'Player 1 Wins!!';
    }
    else if(winner == 2){
        p2_wins++;
        p1_loss++;
        winnerText.innerText = 'Player 2 Wins!!';
    }
    else{
        winnerText.innerText = 'Its a Draw!!';
    }
    p1_gameswon_h.innerText = `Games Won: ${p1_wins}`;
    p1_gameslost_h.innerText = `Games Lost: ${p1_loss}`;
    p1_gamesplayed_h.innerText = `Games Played: ${matches}`;
    p2_gameswon_h.innerText = `Games Won: ${p2_wins}`;
    p2_gameslost_h.innerText = `Games Lost: ${p2_loss}`;
    p2_gamesplayed_h.innerText = `Games Played: ${matches}`;
}
