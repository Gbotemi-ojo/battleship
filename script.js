class ship {
    constructor(size) {
        this.length = size;
        this.hits = 0;
        this.sunk = false;
        this.takenCoordinates = [];
    }
    hit() {
        this.hits++;
    }
    getSize() {
        return this.size;
    }
    getHits() {
        return this.hits;
    }
    isSunk() {
        if (this.getLength() === this.getHits()) {
            return true;
        }
        else {
            return false;
        }
    }
}
class gameBoard {
    constructor() {
        this.coordinateGeneratorX = this.coordinateGeneratorX();
        this.coordinateGeneratorY = this.coordinateGeneratorY();
    }
    coordinateGeneratorX() {
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
    coordinateGeneratorY() {
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
    getShips(){
        let ships = []
        let cruiser = new ship(2);
        let submarine = new ship(3);
        let destroyer = new ship(3);
        let battleship = new ship(4);
        let carrier = new ship(5);
        ships.push(cruiser,submarine,destroyer,battleship,carrier);
        return ships;
    }
}
let Board = new gameBoard();
let ships = Board.getShips();
console.log(Board.getShips()[0]);

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

let gameBoardArray = [];
let size = 3;
let currentAxis = 'X';
let invalidPositionsArray = [];
function updateInvalidPositionArraay() {
    let invalidEnteriesx = invalidEnteriesX();
    let invalidEnteriesy = invalidEnteriesY();
    if (currentAxis === 'X') {
        for (let i = 0; i <= invalidEnteriesx.length - 1; i++) {
            invalidPositionsArray.push(invalidEnteriesx[i]);
        }
    }
    else {
        for (let i = 0; i <= invalidEnteriesy.length - 1; i++) {
            invalidPositionsArray.push(invalidEnteriesy[i]);
        }
    }
}
let targetCoordinates = '';
gameBox.forEach(element => {
    element.addEventListener('click', () => {
        if (currentAxis === 'X') {
            targetCoordinates = element.getAttribute('id');
            let enteriesX = setShipX(size);
            if (invalidPositionsArray.some(x => enteriesX.includes(x))) {
                console.log('hjk');
                return;
            }
            updateInvalidPositionArraay();
            if (currentAxis === 'X') {
                designShipX(size);
                size = 0;
            }
        }
    })
});
gameBox.forEach(element => {
    element.addEventListener('click', () => {
        if (currentAxis === 'Y') {
            targetCoordinates = element.getAttribute('id');
            let enteriesY = setShipY(size)
            if (invalidPositionsArray.some(y => enteriesY.includes(y))) {
                console.log('hjk');
                return;
            }
            updateInvalidPositionArraay();
            if (currentAxis === 'Y') {
                designShipY(size);
                size = 0;
            }
        }
        else {
            return;
        }
    })
});
function invalidEnteriesX() {
    if (currentAxis === 'X') {
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
    else {
        return;
    }
}
function invalidEnteriesY() {
    if (currentAxis === 'Y') {
        let invalidPositions = [];
        let coordinateArray = coordinateGeneratorY();
        let currentCoordinates = setShipY(size);
        let head = currentCoordinates[0];
        let tail = currentCoordinates[currentCoordinates.length - 1]
        let headIndex = coordinateArray.indexOf(head);
        let tailIndex = coordinateArray.indexOf(tail);
        for (let i = 0; i <= currentCoordinates.length - 1; i++) {
            let currentIndex = coordinateArray.indexOf(currentCoordinates[i]);
            invalidPositions.push(currentCoordinates[i])
            if (head.includes('1')) {
                invalidPositions.push(coordinateArray[currentIndex - 10]);
                invalidPositions.push(coordinateArray[currentIndex + 10]);
                invalidPositions.push(coordinateArray[currentIndex + 1]);
                invalidPositions.push(coordinateArray[tailIndex + 11]);
                invalidPositions.push(coordinateArray[tailIndex - 9]);

            }
            else if (tail.includes('10')) {
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
    else {
        return
    }
}

function setShipX(size) {
    let gameBoardCoordinates = coordinateGeneratorX();
    let coordinateArray = [];
    if (currentAxis === 'X') {
        let head = gameBoardCoordinates.indexOf(targetCoordinates);
        for (let i = head; i < (head + size); i++) {
            coordinateArray.push(gameBoardCoordinates[i]);
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
    else {
        return;
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
        let coordinateHead = coordinateArray[0];
        let coordinateTail = coordinateArray[coordinateArray.length - 1];
        if (coordinateHead.slice(coordinateHead.length - 1) === coordinateTail.slice(coordinateTail.length - 1)) {
            console.log(coordinateArray);
            return coordinateArray;
        }
        else return 'not possible';
    }
    else {
        return;
    }
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
            if (element !== null) {
                element.style.background = 'red';
            }
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
gameBox.forEach(element => {
    if (currentAxis === 'X') {
        element.addEventListener('mouseenter', () => {
            targetCoordinates = element.getAttribute('id');
            hoverX();
        })
        element.addEventListener('mouseleave', () => {
            targetCoordinates = element.getAttribute('id');
            removeHoverX();
        })
    }
});
gameBox.forEach(element => {
    if (currentAxis === 'Y') {
        element.addEventListener('mouseenter', () => {
            targetCoordinates = element.getAttribute('id');
            hoverY();
        })
        element.addEventListener('mouseleave', () => {
            targetCoordinates = element.getAttribute('id');
            removeHoverY()
        })
    }
});
function hoverX() {
    if (currentAxis === 'X') {
        let requiredCoordinates = setShipX(size);
        for (let i = 0; i <= requiredCoordinates.length; i++) {
            let element = document.getElementById(requiredCoordinates[i]);
            if (element !== null) {
                element.classList.add('hover');
            }
        }
    }
    else {
        return
    }
}
function removeHoverX() {
    if (currentAxis === 'X') {
        let coordinate = setShipX(size);
        for (let i = 0; i <= coordinate.length - 1; i++) {
            let elem = document.getElementById(coordinate[i])
            elem.classList.remove('hover');
        }
    }
    else {
        return;
    }
}
function hoverY() {
    if (currentAxis === 'Y') {
        let requiredCoordinates = setShipY(size);
        for (let i = 0; i <= requiredCoordinates.length; i++) {
            let element = document.getElementById(requiredCoordinates[i]);
            if (element !== null) {
                element.classList.add('hover2');
            }
        }
    }
    else {
        return
    }
}
function removeHoverY() {
    if (currentAxis === 'Y') {
        let coordinate = setShipY(size);
        for (let i = 0; i <= coordinate.length - 1; i++) {
            let elem = document.getElementById(coordinate[i])
            elem.classList.remove('hover2');
        }
    }
    else {
        return;
    }
}
const setCoordinates = (function () {
    for (let i = 0; i <= gameBox.length - 1; i++) {
        let coordinate = coordinateGeneratorX()
        gameBox[i].setAttribute('id', coordinate[i]);
    }
})();

