import ship from "./ships";
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
    setShipX(size) {
        let gameBoardCoordinates = this.coordinateGeneratorX()
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
    setShipY(size) {
        let coordinateArray = [];

        if (currentAxis === 'Y') {
            let gameBoardCoordinates = this.coordinateGeneratorY()
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
    designShipX(size) {
        if (currentAxis === 'X') {
            let requiredCoordinates = this.setShipX(size);
            for (let i = 0; i <= requiredCoordinates.length; i++) {
                let element = document.getElementById(requiredCoordinates[i]);
                if (element !== null) {
                    element.style.background = 'red';
                }
            }
        }
    }
    designShipY(size) {
        if (currentAxis === 'Y') {
            let requiredCoordinates = this.setShipY(size);
            for (let i = 0; i <= requiredCoordinates.length; i++) {
                let element = document.getElementById(requiredCoordinates[i]);
                if (element !== null) {
                    element.style.background = 'red';
                }
            }
        }
    }
    hoverX() {
        if (currentAxis === 'X') {
            let requiredCoordinates = this.setShipX(size);
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
    removeHoverX() {
        if (currentAxis === 'X') {
            let coordinate = this.setShipX(size);
            for (let i = 0; i <= coordinate.length - 1; i++) {
                let elem = document.getElementById(coordinate[i])
                elem.classList.remove('hover');
            }
        }
        else {
            return;
        }
    }
    hoverY() {
        if (currentAxis === 'Y') {
            let requiredCoordinates = this.setShipY(size);
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
    removeHoverY() {
        if (currentAxis === 'Y') {
            let coordinate = this.setShipY(size);
            for (let i = 0; i <= coordinate.length - 1; i++) {
                let elem = document.getElementById(coordinate[i])
                elem.classList.remove('hover2');
            }
        }
        else {
            return;
        }
    }
    invalidEnteriesX() {
        if (currentAxis === 'X') {
            let invalidPositions = [];
            let coordinateArray = this.coordinateGeneratorX();
            let currentCoordinates = this.setShipX(size);
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
    invalidEnteriesY() {
        if (currentAxis === 'Y') {
            let invalidPositions = [];
            let coordinateArray = this.coordinateGeneratorY();
            let currentCoordinates = this.setShipY(size);
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
    setCoordinate() {
        for (let i = 0; i <= gameBox.length - 1; i++) {
            let coordinate = this.coordinateGeneratorX()
            gameBox[i].setAttribute('id', coordinate[i]);
        }
    }
}
module.exports = gameBoard;