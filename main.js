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
    generateBlocks();
}



function generateBlocks() {
    console.log("generate blocks here")
    for(let i = 0; i < 3; i++) {
        const b = getRandomBlock();
        for(let j = 0; j < 9; j++) {
            if (b[j] == 1) {
                document.getElementById("b" + i + "-" + j).className = "cell cell-fill";
            }
        }
    }
}

function getRandomBlock() {
    const blocks = [[0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0]];
    const randomIndex = Math.floor(Math.random() * 3);
    return blocks[randomIndex];
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

