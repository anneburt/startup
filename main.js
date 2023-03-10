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

    // create map from block name to array representation
    let blockNameToObject = new Map();
    blockNameToObject.set("left-block", blocks[0]);
    blockNameToObject.set("center-block", blocks[1]);
    blockNameToObject.set("right-block", blocks[2]);

    // add event listener to each block when picked up
    document.getElementById("left-block").addEventListener('dragstart', dragStart);
    document.getElementById("center-block").addEventListener('dragstart', dragStart);
    document.getElementById("right-block").addEventListener('dragstart', dragStart);

    // store current block
    function dragStart(e) {
        currentBlock = e.target.id;
    }

    let cells = document.querySelectorAll(".cell.cell-light, .cell.cell-dark");
    cells.forEach(cell => {
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragleave', dragLeave);
    });

    function dragEnter(e) {
        e.target.classList.add('drag-over');
        console.log("current block: ", blockNameToObject.get(currentBlock));
    }

    function dragLeave(e) {
        e.target.classList.remove('drag-over');
    }

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
    //TODO: add more block variations
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
