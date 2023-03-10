const blockNames = ["left-block", "center-block", "right-block"];
window.onload = play();

function play(board=generateBoard()) {
    const blocks = generateBlocks();
    const blockNameToIndex = createBlockNameToIndexMap();

    createBlockBoardInteraction(blocks, board, blockNameToIndex);
}

function generateBoard() {
    console.log("generating board");
    let board = [];
    for(let i = 0; i < 81; i++) {
        board[i] = 0;
    }
    return board;
}

function generateBlocks() {
    console.log("generating blocks");
    const blocks = [getRandomBlock(), getRandomBlock(), getRandomBlock()]

    for(let i = 0; i < blocks.length; i++) {
        changeCellClass(blocks[i], i, "cell cell-fill");
    }

    return blocks;
}

function getRandomBlock() {
    //TODO: add more block variations
    const blocks = [[0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0]];
    const randomIndex = Math.floor(Math.random() * 3);
    return blocks[randomIndex];
}

function changeCellClass(block, blockIndex, newCellClass) {
    for(let i = 0; i < 9; i++) {
        if(block[i] == 1) {
            document.getElementById("b" + blockIndex + "-" + i).className = newCellClass;
        }
    }
}

function createBlockNameToIndexMap() {
    const blockNameToIndex = new Map();
    for(let i = 0; i < blockNames.length; i++) {
        blockNameToIndex.set(blockNames[i], i);
    }
    return blockNameToIndex;
}

function createBlockBoardInteraction(blocks, board, blockNameToIndex) {
    // add drag event listeners to each block
    for(let i = 0; i < blockNames.length; i++) {
        document.getElementById(blockNames[i]).addEventListener('dragstart', dragStart);
    }

    let blocksPlaced = 0;

    // store current block
    function dragStart(e) {
        currentBlock = e.target.id;
    }

    // add event listeners to each block
    let cells = document.querySelectorAll(".cell.cell-light, .cell.cell-dark");
    cells.forEach(cell => {
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', dragDrop);
    });

    function dragEnter(e) {
        e.preventDefault();

        const targetCells = getTargetCells(blocks[blockNameToIndex.get(currentBlock)], Number(e.target.id), board);
        addDragOverClassToTargetCells(targetCells);
    }

    function dragOver(e) {
        e.preventDefault();

        const targetCells = getTargetCells(blocks[blockNameToIndex.get(currentBlock)], Number(e.target.id), board);
        addDragOverClassToTargetCells(targetCells);
    }

    function dragLeave(e) {
        const targetCells = getTargetCells(blocks[blockNameToIndex.get(currentBlock)], Number(e.target.id), board);
        removeDragOverClassFromTargetCells(targetCells);
    }

    function dragDrop(e) {
        currentBlockObject = blocks[blockNameToIndex.get(currentBlock)]
        const targetCells = getTargetCells(currentBlockObject, Number(e.target.id), board);

        // update board with new block
        for(let i = 0; i < targetCells.length; i++) {
            board[targetCells[i]] = 1;

            document.getElementById(targetCells[i]).removeEventListener('dragstart', dragStart);
            document.getElementById(targetCells[i]).removeEventListener('dragover', dragOver);
            document.getElementById(targetCells[i]).removeEventListener('dragleave', dragLeave);
            document.getElementById(targetCells[i]).removeEventListener('drop', dragDrop);

            document.getElementById(Number(targetCells[i])).className = "cell cell-fill";
        }

        // remove block from view from block container
        changeCellClass(currentBlockObject, blockNameToIndex.get(currentBlock), "cell cell-empty");

        // check if all current blocks have been placed
        blocksPlaced++;
        if(blocksPlaced > 2) {
            // remove event listeners
            let cells = document.querySelectorAll(".cell.cell-light, .cell.cell-dark");
            cells.forEach(cell => {
                cell.removeEventListener('dragenter', dragEnter);
                cell.removeEventListener('dragover', dragOver);
                cell.removeEventListener('dragleave', dragLeave);
                cell.removeEventListener('drop', dragDrop);
            });

            play(board);
        }
    }
}

function getTargetCells(block, cellId, board) {
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

            if(targetCell < 0 || targetCell > 80) {
                // out of game board range

                //TODO: consider out of row range
                return;
            }

            if(board[targetCell] == 1) {
                // board already filled
                return;
            }

            targetCells.push(targetCell);
        }
    }
    return targetCells;
}

function addDragOverClassToTargetCells(targetCells) {
    for(let i = 0; i < targetCells.length; i++) {
        document.getElementById(Number(targetCells[i])).classList.add('drag-over');
    }
}

function removeDragOverClassFromTargetCells(targetCells) {
    for(let i = 0; i < targetCells.length; i++) {
        document.getElementById(Number(targetCells[i])).classList.remove('drag-over');
    }
}

function reset() {
    //TODO: proper reset (remove listeners)
    const collection = document.getElementsByClassName("cell cell-fill");
    while(collection.length > 0) {
        collection[0].className = "cell cell-empty";
    }
    play();
}

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