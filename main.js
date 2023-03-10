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
    const blocks = generateBlocks();
    const board = generateBoard();

    // create map from block name to array representation
    const blockNameToObject = new Map();
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
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('dragDrop', dragDrop);
    });

    function dragEnter(e) {
        e.preventDefault();
        const targetCells = getTargetCells(blockNameToObject.get(currentBlock), Number(e.target.id));

        for(let j = 0; j < targetCells.length; j++) {
            document.getElementById(Number(targetCells[j])).classList.add('drag-over');
        }
    }


    function dragOver(e) {
        e.preventDefault();
        const targetCells = getTargetCells(blockNameToObject.get(currentBlock), Number(e.target.id));

        for(let j = 0; j < targetCells.length; j++) {
            document.getElementById(Number(targetCells[j])).classList.add('drag-over');
        }
    }

    function dragLeave(e) {
        const targetCells = getTargetCells(blockNameToObject.get(currentBlock), Number(e.target.id));

        for(let j = 0; j < targetCells.length; j++) {
            document.getElementById(Number(targetCells[j])).classList.remove('drag-over');
        }
    }

    function dragDrop(e) {
        const targetCells = getTargetCells(blockNameToObject.get(currentBlock), Number(e.target.id));

        for(let j = 0; j < targetCells.length; j++) {
            document.getElementById(Number(targetCells[j])).classList.remove('drag-over');
        }
    }

}

function getTargetCells(block, cellId) {
    let calculateTargetCells = [(x) => x - 10,
        (x) => x - 9,
        (x) => x - 8,
        (x) => x - 1,
        (x) => x,
        (x) => x + 1,
        (x) => x + 8,
        (x) => x + 9,
        (x) => x + 10]

    let targetCells = []
    for(let i = 0; i < block.length; i++) {
        if(block[i] == 1) {
            const targetCell = calculateTargetCells[i](cellId);
            console.log("target cell:", targetCell);

            if(targetCell < 0 || targetCell > 80) {
                // out of game board range

                //TODO: consider out of row range
                return;
            }

            console.log("appending target cell");
            targetCells.push(targetCell);
        }
    }
    return targetCells;
}

function generateBlocks() {
    console.log("generating blocks");
    const blocks = [getRandomBlock(), getRandomBlock(), getRandomBlock()]

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
    //TODO: proper reset (remove listeners)
    const collection = document.getElementsByClassName("cell cell-fill");
    while(collection.length > 0) {
        collection[0].className = "cell cell-empty";
    }
    play();
}
