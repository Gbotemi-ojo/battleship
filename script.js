// class gameBoard {
//     constructor(coordinate) {
//         this.coordinate = coordinate;
//         this.available = true;
//         this.shipOnIt = false;
//     }
//     createCoordinates() {
//         let coordinateArray = coordinateGeneratorX()
//         for (let i = 0; i <= coordinateArray.length - 1; i++) {
//             let te = new gameBoard(coordinateArray[i]);
//             gameBoardArray.push(te);
//         }
//     }
// }


// class ship {
//     constructor(length) {
//         this.length = length;
//         this.hits = 0;
//         this.sunk = false;
//         this.takenCoordinates
//     }
//     hit() {
//         this.hits++;
//     }
//     getLength() {
//         return this.length;
//     }
//     getHits() {
//         return this.hits;
//     }
//     isSunk() {
//         if (this.getLength() === this.getHits()) {
//             return true;
//         }
//         else {
//             return false;
//         }
//     }
// }
let selectCruiser = document.querySelector('.cruiser');
let selectSubmarine = document.querySelector('.submarine');
let selectDestroyer = document.querySelector('.destroyer');
let selectBattleship = document.querySelector('.battleship');
let selectCarrier = document.querySelector('.carrier');
let gameBox = document.querySelectorAll('.gameBox');
let rotateBtn = document.querySelector('.rotate');
let hoverBoards = document.querySelectorAll('.hoverBoard')

function coordinateGeneratorX() {
    let coordinateArray = []
    let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = 0; i <= columns.length - 1; i++) {
        for (let j = 0; j <= rows.length - 1; j++) {
            coordinateArray.push(rows[i] + columns[j]);
        }
    }
    return coordinateArray;
}
function coordinateGeneratorY() {
    let coordinateArray = []
    let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = 0; i <= columns.length - 1; i++) {
        for (let j = 0; j <= rows.length - 1; j++) {
            coordinateArray.push(rows[j] + columns[i]);
        }
    }
    return coordinateArray;
}

console.log(coordinateGeneratorX());
console.log(coordinateGeneratorY());

let gameBoardArray = [];
let size = 3;
let invalidPositionsArray = [];
function updateInvalidPositionArraay() {
    let invalidEnteries = invalidEnteriesX();
    for (let i = 0; i <= invalidEnteries.length - 1; i++) {
        invalidPositionsArray.push(invalidEnteries[i])
    }
}

let currentAxis = 'X';
let targetCoordinates = '';
gameBox.forEach(element => {
    element.addEventListener('click', () => {
        targetCoordinates = element.getAttribute('id');
        // updateInvalidPositionArraay();
        let enteries = setShipX(size)
        let invalidEnteriesx = invalidEnteriesX()
        if (invalidPositionsArray.some(ai => enteries.includes(ai))) {
            console.log('hjk');
            return;
        }
        // targetCoordinates = element.getAttribute('id');
        updateInvalidPositionArraay();
        invalidEnteriesx = []
        if (currentAxis === 'X') {
            designShipX(size);
        }
        else if (currentAxis === 'Y') {
            designShipY(size);
        }
    })
});
function invalidEnteriesX() {
    let invalidPositions = [];
    let coordinateArray = coordinateGeneratorX();
    let currentCoordinates = setShipX(size);
    let head = currentCoordinates[0];
    let tail = currentCoordinates[currentCoordinates.length - 1]
    let headIndex = coordinateArray.indexOf(head);
    let tailIndex = coordinateArray.indexOf(tail);
    for (let i = 0; i <= currentCoordinates.length - 1; i++) {
        let currentIndex = coordinateArray.indexOf(currentCoordinates[i]);
        invalidPositions.push(currentCoordinates[i])
        if (head.includes('a')) {
            invalidPositions.push(coordinateArray[currentIndex - 10]);
            invalidPositions.push(coordinateArray[currentIndex + 10]);
            invalidPositions.push(coordinateArray[currentIndex + 1]);
            invalidPositions.push(coordinateArray[tailIndex + 11]);
            invalidPositions.push(coordinateArray[tailIndex - 9]);

        }
        else if (tail.includes('j')) {
            invalidPositions.push(coordinateArray[currentIndex - 10]);
            invalidPositions.push(coordinateArray[currentIndex + 10]);
            invalidPositions.push(coordinateArray[currentIndex - 1]);
            invalidPositions.push(coordinateArray[headIndex + 9]);
            invalidPositions.push(coordinateArray[headIndex - 11]);
        }
        else {
            invalidPositions.push(coordinateArray[currentIndex - 10]);
            invalidPositions.push(coordinateArray[currentIndex + 10]);
            invalidPositions.push(coordinateArray[currentIndex - 1]);
            invalidPositions.push(coordinateArray[currentIndex + 1]);
            invalidPositions.push(coordinateArray[currentIndex - 11]);
            invalidPositions.push(coordinateArray[currentIndex + 11]);
            invalidPositions.push(coordinateArray[currentIndex + 9]);
            invalidPositions.push(coordinateArray[currentIndex - 9]);
        }
    }
    let unique = [...new Set(invalidPositions)];
    unique = unique.filter(function (element) {
        return element !== undefined;
    })
    return unique;
}

function setShipX(size) {
    let gameBoardCoordinates = coordinateGeneratorX();
    let coordinateArray = [];
    if (currentAxis === 'X') {
        let head = gameBoardCoordinates.indexOf(targetCoordinates);
        for (let i = head; i < (head + size); i++) {
            coordinateArray.push(gameBoardCoordinates[i]);
        }
    }
    console.log(coordinateArray)
    let coordinateHead = coordinateArray[0];
    let coordinateTail = coordinateArray[coordinateArray.length - 1];
    if (coordinateHead.slice(0, 1) === coordinateTail.slice(0, 1)) {
        return coordinateArray;
    }
    else {
        return 'not possible';
    }
}
function setShipY(size) {
    let coordinateArray = [];
    if (currentAxis === 'Y') {
        let gameBoardCoordinates = coordinateGeneratorY();
        let head = gameBoardCoordinates.indexOf(targetCoordinates);
        for (let i = head; i < (head + size); i++) {
            coordinateArray.push(gameBoardCoordinates[i]);
        }
    }
    let coordinateHead = coordinateArray[0];
    let coordinateTail = coordinateArray[coordinateArray.length - 1];
    if (coordinateHead.slice(coordinateHead.length - 1) === coordinateTail.slice(coordinateTail.length - 1)) {
        return coordinateArray;
    }
    else return 'not possible';
}

function designShipX(size) {
    if (currentAxis === 'X') {
        let requiredCoordinates = setShipX(size);
        for (let i = 0; i <= requiredCoordinates.length; i++) {

            let element = document.getElementById(requiredCoordinates[i]);
            if (element !== null) {
                element.style.background = 'red';
            }
        }
    }
}

function designShipY(size) {
    if (currentAxis === 'Y') {
        let requiredCoordinates = setShipY(size);
        for (let i = 0; i <= requiredCoordinates.length; i++) {
            let element = document.getElementById(requiredCoordinates[i]);
            element.style.background = 'red';
        }
    }
}
selectCruiser.addEventListener('click', () => {
    size = 2;
    selectCruiser.classList.add('reduce')
})
selectSubmarine.addEventListener('click', () => {
    size = 3;
    selectSubmarine.classList.add('reduce')
})
selectDestroyer.addEventListener('click', () => {
    size = 3;
    selectDestroyer.classList.add('reduce')
})
selectBattleship.addEventListener('click', () => {
    size = 4;
    selectBattleship.classList.add('reduce')
})
selectCarrier.addEventListener('click', () => {
    size = 5;
    selectCarrier.classList.add('reduce')
})
rotateBtn.addEventListener('click', () => {
    if (currentAxis === 'X') {
        currentAxis = 'Y';
    }
    else {
        currentAxis = 'X';
    }
})
const setCoordinates = (function () {
    for (let i = 0; i <= gameBox.length - 1; i++) {
        let coordinate = coordinateGeneratorX()
        gameBox[i].setAttribute('id', coordinate[i]);
    }
})()
// module.exports = {
//     setShip
// }
// console.log(te);



