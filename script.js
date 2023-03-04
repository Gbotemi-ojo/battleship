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
    getShips() {
        let ships = []
        let cruiser = new ship(2);
        let submarine = new ship(3);
        let destroyer = new ship(3);
        let battleship = new ship(4);
        let carrier = new ship(5);
        ships.push(cruiser, submarine, destroyer, battleship, carrier);
        return ships;
    }
    recieveAttacks() {

    }
}
let gameBoardArray = [];
let size = 0;
let currentAxis = 'X';
let invalidPositionsArray = [];
let gameStarted = false;
let selectedShip = true;
let placedShip = false;
let shipPlaceMentCount = 0
let Board = new gameBoard();
let ships = Board.getShips();
let computerShips = Board.getShips();
let shipCount = 0;

let selectCruiser = document.querySelector('.cruiser');
let selectSubmarine = document.querySelector('.submarine');
let selectDestroyer = document.querySelector('.destroyer');
let selectBattleship = document.querySelector('.battleship');
let selectCarrier = document.querySelector('.carrier');
let gameBox = document.querySelectorAll('.gameBox');
let rotateBtn = document.querySelector('.rotate');
let hoverBoards = document.querySelectorAll('.hoverBoard');
let exitBtn = document.querySelector('.exit');
let infoCard = document.querySelector('.infoCard');
function disableClicksOnShips() {
    if (selectedShip === true) {
        selectCruiser.style.pointerEvents = 'none';
        selectSubmarine.style.pointerEvents = 'none';
        selectDestroyer.style.pointerEvents = 'none';
        selectBattleship.style.pointerEvents = 'none';
        selectCarrier.style.pointerEvents = 'none';
    }
    else {
        return
    }
}
function enableClicksOnShips() {
    if (selectedShip === false) {
        selectCruiser.style.pointerEvents = 'all';
        selectSubmarine.style.pointerEvents = 'all';
        selectDestroyer.style.pointerEvents = 'all';
        selectBattleship.style.pointerEvents = 'all';
        selectCarrier.style.pointerEvents = 'all';
    }
    else {
        return
    }
}
exitBtn.addEventListener('click', () => {
    infoCard.remove()
})

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

function updateInvalidPositionArraay() {
    let invalidEnteriesx = invalidEnteriesX(setShipX(size, targetCoordinates));
    let invalidEnteriesy = invalidEnteriesY(setShipY(size, targetCoordinates));
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
            let enteriesX = setShipX(size, targetCoordinates);
            if (invalidPositionsArray.some(x => enteriesX.includes(x))) {
                console.log('hjk');
                return;
            }
            updateInvalidPositionArraay();
            if (currentAxis === 'X') {
                designShipX(size, targetCoordinates);
                size = 0;
            }
        }
        enableClicksOnShips();
    })
});
gameBox.forEach(element => {
    element.addEventListener('click', () => {
        selectedShip = false;
        alerting();
        enableClicksOnShips();
        if (currentAxis === 'Y') {
            targetCoordinates = element.getAttribute('id');
            let enteriesY = setShipY(size, targetCoordinates)
            if (invalidPositionsArray.some(y => enteriesY.includes(y))) {
                console.log('hjk');
                return;
            }
            updateInvalidPositionArraay();
            if (currentAxis === 'Y') {
                designShipY(size, targetCoordinates);
                size = 0;
            }
        }
        else {
            return;
        }
    })
});
function invalidEnteriesX(currentCoordinates) {
    if (currentAxis === 'X') {
        let invalidPositions = [];
        let coordinateArray = coordinateGeneratorX();
        let head = currentCoordinates[0];
        let tail = currentCoordinates[currentCoordinates.length - 1];
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
function invalidEnteriesY(currentCoordinates) {
    if (currentAxis === 'Y') {
        let invalidPositions = [];
        let coordinateArray = coordinateGeneratorY();
        let head = currentCoordinates[0];
        let tail = currentCoordinates[currentCoordinates.length - 1]
        let headIndex = coordinateArray.indexOf(head);
        let tailIndex = coordinateArray.indexOf(tail);
        for (let i = 0; i <= currentCoordinates.length - 1; i++) {
            let currentIndex = coordinateArray.indexOf(currentCoordinates[i]);
            invalidPositions.push(currentCoordinates[i]);
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

function setShipX(size, targetCoordinates) {
    let gameBoardCoordinates = coordinateGeneratorX();
    let coordinateArray = [];
    if (currentAxis === 'X') {
        let head = gameBoardCoordinates.indexOf(targetCoordinates);
        for (let i = head; i < (head + size); i++) {
            coordinateArray.push(gameBoardCoordinates[i]);
        }
        console.log(coordinateArray);
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
        return 'not po';
    }
}

function setShipY(size, targetCoordinates) {
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

function designShipX(size, targetCoordinates) {
    if (currentAxis === 'X') {
        let requiredCoordinates = setShipX(size, targetCoordinates);
        for (let i = 0; i <= requiredCoordinates.length; i++) {
            let element = document.getElementById(requiredCoordinates[i]);
            if (element !== null) {
                element.style.background = 'red';
            }
        }
    }
}

function designShipY(size, targetCoordinates) {
    if (currentAxis === 'Y') {
        let requiredCoordinates = setShipY(size, targetCoordinates);
        for (let i = 0; i <= requiredCoordinates.length; i++) {
            let element = document.getElementById(requiredCoordinates[i]);
            if (element !== null) {
                element.style.background = 'red';
            }
        }
    }
}
selectCruiser.addEventListener('click', () => {
    selectedShip = true;
    disableClicksOnShips();
    selectedShip = true;
    shipCount++
    size = 2;
    selectCruiser.classList.add('reduce')
    if (currentAxis === 'X') {
        ships[0].takenCoordinates.push(setShipX(size, targetCoordinates));
        computerShips[0].takenCoordinates.push(getComputerChoicesX(size));
    }
    else {
        ships[0].takenCoordinates.push(setShipY(size, targetCoordinates));
        computerShips[0].takenCoordinates.push(getComputerChoicesY(size));
    }
})
selectSubmarine.addEventListener('click', () => {
    selectedShip = true;
    disableClicksOnShips();
    selectedShip = true;
    shipCount++
    size = 3;
    selectSubmarine.classList.add('reduce')
    if (currentAxis === 'X') {
        ships[1].takenCoordinates.push(setShipX(size, targetCoordinates));
        computerShips[1].takenCoordinates.push(getComputerChoicesX(size));
    }
    else {
        ships[1].takenCoordinates.push(setShipY(size, targetCoordinates));
        computerShips[1].takenCoordinates.push(getComputerChoicesY(size));
    }
})
selectDestroyer.addEventListener('click', () => {
    selectedShip = true;
    disableClicksOnShips();
    selectedShip = true;
    size = 3;
    shipCount++
    selectDestroyer.classList.add('reduce')
    if (currentAxis === 'X') {
        ships[2].takenCoordinates.push(setShipX(size, targetCoordinates));
        computerShips[2].takenCoordinates.push(getComputerChoicesX(size));
    }
    else {
        ships[2].takenCoordinates.push(setShipY(size, targetCoordinates));
        computerShips[2].takenCoordinates.push(getComputerChoicesY(size));
    }
})
selectBattleship.addEventListener('click', () => {
    selectedShip = true;
    disableClicksOnShips();
    selectedShip = true;
    size = 4;
    shipCount++
    selectBattleship.classList.add('reduce')
    if (currentAxis === 'X') {
        ships[3].takenCoordinates.push(setShipX(size, targetCoordinates));
        computerShips[3].takenCoordinates.push(getComputerChoicesX(size));
    }
    else {
        ships[3].takenCoordinates.push(setShipY(size, targetCoordinates));
        computerShips[3].takenCoordinates.push(getComputerChoicesY(size));
    }
})
selectCarrier.addEventListener('click', () => {
    selectedShip = true;
    disableClicksOnShips();
    selectedShip = true;
    size = 5;
    shipCount++
    selectCarrier.classList.add('reduce')
    if (currentAxis === 'X') {
        computerShips[4].takenCoordinates.push(getComputerChoicesX(size));
        ships[4].takenCoordinates.push(setShipX(size, targetCoordinates));
    }
    else {
        computerShips[4].takenCoordinates.push(getComputerChoicesY(size));
        ships[4].takenCoordinates.push(setShipY(size, targetCoordinates));
    }
})
function alerting() {
    if (shipCount === 5 && selectedShip === false) {
        alert('yellow')
    }
}
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
        let requiredCoordinates = setShipX(size, targetCoordinates);
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
        let coordinate = setShipX(size, targetCoordinates);
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
let invalidComputerPositionsArray = [];
function updateInvalidComputerPositionArray(arr){
    for (let i = 0; i <= arr.length - 1; i++) {
        invalidComputerPositionsArray.push(arr[i]);
    }
}
function getComputerChoicesX(size) {
    let chosenCoordinates = [];
    let coordinate1 = coordinateGeneratorX();
    while (chosenCoordinates.length < size) {
        let randomNumber = Math.floor(Math.random() * 100);
        let targetCoordinates = coordinate1[randomNumber];
        let setX = setShipX(size, targetCoordinates);
        console.log(setX);
        for (let i = 0; i <= setX.length - 1; i++) {
            chosenCoordinates.push(setX[i]);
        }
        if (chosenCoordinates[0] === 'n' || setX[0] === undefined || invalidComputerPositionsArray.some(x => setX.includes(x))){
            chosenCoordinates = [];
            console.log('tried again');
        }
        else{
        let arr = invalidEnteriesX(chosenCoordinates);
        updateInvalidComputerPositionArray(arr);
        }
    }
    return chosenCoordinates;
}
function getComputerChoicesY(size) {
    let chosenCoordinates = [];
    let coordinate1 = coordinateGeneratorY();
    while (chosenCoordinates.length < size) {
        let randomNumber = Math.floor(Math.random() * 100);
        let targetCoordinates = coordinate1[randomNumber];
        let setY = setShipY(size, targetCoordinates);
        console.log(setY);
        for (let i = 0; i <= setY.length - 1; i++) {
            chosenCoordinates.push(setY[i]);
        }
        if (chosenCoordinates[0] === 'n' || setY[0] === undefined || invalidComputerPositionsArray.some(y => setY.includes(y))) {
            chosenCoordinates = [];
            console.log('tried again');
        }
        else {
            let arr = invalidEnteriesY(chosenCoordinates);
            updateInvalidComputerPositionArray(arr);
        }
    }
    return chosenCoordinates;
}
