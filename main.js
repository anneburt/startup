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

