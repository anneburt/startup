const blockNames = ["left-block", "center-block", "right-block"];
//TODO: generate these numbers more eloquently
const lightCells = [3,4,5,12,13,14,21,22,23,27,28,29,33,34,35,36,37,38,42,
    43,44,45,46,47,51,52,53,57,58,59,66,67,68,75,76,77];
const squares = [[0,1,2,9,10,11,18,19,20],[3,4,5,12,13,14,21,22,23],[6,7,8,15,16,17,24,25,26],
                 [27,28,29,36,37,38,45,46,47],[30,31,32,39,40,41,48,49,50],[33,34,35,42,43,44,51,52,53],
                 [54,55,56,63,64,65,72,73,74],[57,58,59,66,67,68,75,76,77],[60,61,62,69,70,71,78,79,80]];
const blockNameToIndex = createBlockNameToIndexMap();
window.onload = play();

function play(board=generateBoard(), blocks=generateBlocks(), blocksLeft=blockNames) {

    // add drag event listeners to each block
    for(let i = 0; i < blocksLeft.length; i++) {
        document.getElementById(blocksLeft[i]).addEventListener('dragstart', dragStart);
    }

    // store current block
    function dragStart(e) {
        currentBlock = e.target.id;
    }

    // add event listeners to each block
    let cells = document.querySelectorAll(".cell.cell-light, .cell.cell-dark");
    cells.forEach(cell => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', dragDrop);
    });

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

            document.getElementById(targetCells[i]).removeEventListener('dragover', dragOver);
            document.getElementById(targetCells[i]).removeEventListener('dragleave', dragLeave);
            document.getElementById(targetCells[i]).removeEventListener('drop', dragDrop);

            document.getElementById(Number(targetCells[i])).className = "cell cell-fill";
        }

        // remove block from view from block container
        changeCellClass(currentBlockObject, blockNameToIndex.get(currentBlock), "cell cell-empty");

        updateScore(currentBlockObject);

        blocksLeft = blocksLeft.filter(x => x != currentBlock);

        if(checkClears(board) && blocksLeft.length > 0) {
            let cells = document.querySelectorAll(".cell.cell-light, .cell.cell-dark");
            cells.forEach(cell => {
                cell.removeEventListener('dragover', dragOver);
                cell.removeEventListener('dragleave', dragLeave);
                cell.removeEventListener('drop', dragDrop);
            });

            play(board, blocks, blocksLeft);
        }

        // check if all current blocks have been placed
        if(blocksLeft.length < 1) {
            // remove event listeners
            let cells = document.querySelectorAll(".cell.cell-light, .cell.cell-dark");
            cells.forEach(cell => {
                cell.removeEventListener('dragover', dragOver);
                cell.removeEventListener('dragleave', dragLeave);
                cell.removeEventListener('drop', dragDrop);
            });

            play(board);
        }
    }
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

function getTargetCells(block, cellId, board) {
    let calculateTargetCells = [
        (x) => x - 10,
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
            let targetCell = calculateTargetCells[i](cellId);

            if(targetCell < 0 || targetCell > 80) {
                // out of game board range

                //TODO: consider out of row range
                return;
            }

            if(i == 2 || i == 5 || i == 8) {
                if(targetCell % 9 == 0) {
                    // out of row range
                    return;
                }
            }

            if(i == 0 || i == 3 || i == 6) {
                if(targetCell % 9 == 8) {
                    //out of row range
                    return
                }
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

function updateScore(block) {
    let score = Number(document.getElementById("score").textContent);
    for(let i = 0; i < block.length; i++) {
        if(block[i] == 1) {
            score += 1;
        }
    }
    document.getElementById("score").textContent = score;
}

function checkClears(board) {
    let clearCells = new Set();
    //TODO: remove code duplication in these functions
    let rowCleared = checkRowClears(board, clearCells);
    let columnCleared = checkColumnClears(board, clearCells);
    let squareCleared = checkSquareClears(board, clearCells);

    // clear target cells on board
    clearCells.forEach((value) => {
        board[value] = 0;
    });

    return rowCleared || columnCleared || squareCleared;
}

function checkRowClears(board, clearCells) {
    cleared = false;
    for(let row = 0; row < 9; row++) {
        let needsClear = true
        for(let column = 0; column < 9; column++) {
            if(board[column + (9 * row)] == 0) {
                needsClear = false;
            }
        }

        if(needsClear) {
            clearRow(row, clearCells);
            cleared = true;
        }
    }
    return cleared;
}

function checkColumnClears(board, clearCells) {
    cleared = false;
    for(let column = 0; column < 9; column++) {
        let needsClear = true;
        for(let row = 0; row < 9; row++) {
            if(board[column + (9 * row)] == 0) {
                needsClear = false;
            }
        }

        if(needsClear) {
            clearColumn(column, clearCells);
            cleared = true;
        }
    }
    return cleared;
}

function checkSquareClears(board, clearCells) {
    cleared = false;
    for(let square = 0; square < 9; square++) {
        let needsClear = true;
        for(let i = 0; i < 9; i++) {
            if(board[squares[square][i]] == 0) {
                needsClear = false;
            }
        }

        if(needsClear) {
            clearSquare(square, clearCells);
            cleared = true;
        }
    }
    return cleared;
}

function clearRow(rowIndex, clearCells) {
    for(let i = 0; i < 9; i++) {
        let targetCell = i + (9 * rowIndex);
        clearCells.add(targetCell);

        if(lightCells.includes(targetCell)) {
            document.getElementById(targetCell).className = "cell cell-light";
        } else {
            document.getElementById(targetCell).className = "cell cell-dark";
        }
    }
}

function clearColumn(columnIndex, clearCells) {
    for(let i = 0; i < 9; i++) {
        let targetCell = columnIndex + (9 * i);
        clearCells.add(targetCell);

        if(lightCells.includes(targetCell)) {
            document.getElementById(targetCell).className = "cell cell-light";
        } else {
            document.getElementById(targetCell).className = "cell cell-dark";
        }
    }
}

function clearSquare(squareIndex, clearCells) {
    for(let i = 0; i < 9; i++) {
        let targetCell = squares[squareIndex][i];
        clearCells.add(targetCell);

        if(lightCells.includes(targetCell)) {
            document.getElementById(targetCell).className = "cell cell-light";
        } else {
            document.getElementById(targetCell).className = "cell cell-dark";
        }
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

function showTutorial() {
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

function showLogin() {
    var login = document.getElementById("login");
    var game = document.getElementById("game");

    if (login.style.display == "none") {
        login.style.display = "flex";
        game.style.display = "none";
    } else {
        login.style.display = "none";
        game.style.display = "flex";
    }
}