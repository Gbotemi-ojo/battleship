// import gameBoard from "./gameboard";
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

module.exports = ship;