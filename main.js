function showPopup() {
    var tutorial = document.getElementById("tutorial");
    var game = document.getElementById("game");

    if (tutorial.style.display == "none") {
        tutorial.style.display = "flex";
        game.style.display = "none";
    } else {
        tutorial.style.display = "none";
        game.style.display = "flex";
    }
}

window.onload = play();

function play() {
    let blocks = generateBlocks();
    let board = generateBoard();

}

function generateBlocks() {
    console.log("generating blocks");
    let blocks = [getRandomBlock(), getRandomBlock(), getRandomBlock()]

    for(let i = 0; i < blocks.length; i++) {
        for(let j = 0; j < 9; j++) {
            if(blocks[i][j] == 1) {
                document.getElementById("b" + i + "-" + j).className = "cell cell-fill";
            }
        }
    }

    return blocks;
}

function getRandomBlock() {
    const blocks = [[0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0]];
    const randomIndex = Math.floor(Math.random() * 3);
    return blocks[randomIndex];
}

function generateBoard() {
    console.log("generating board");
    let board = [];
    for(let i = 0; i < 81; i++) {
        board[i] = 0;
    }
    return board;
}

function reset() {
    const collection = document.getElementsByClassName("cell cell-fill");
    while(collection.length > 0) {
        collection[0].className = "cell cell-empty";
    }
    play();
}

const squares = document.querySelectorAll('.square');

squares.forEach(square => {
    square.addEventListener('dragenter', dragEnter)
    square.addEventListener('dragover', dragOver);
    square.addEventListener('dragleave', dragLeave);
    square.addEventListener('drop', drop);
});

function dragEnter(e) {
    e.target.classList.add('drag-over');
    console.log('drag enter');
}

function dragOver(e) {
    e.target.classList.add('drag-over');
    console.log('drag over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
    console.log('drag leave');
}

function drop(e) {
    e.target.classList.remove('drag-over');
    console.log('drag drop');
}

