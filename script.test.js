let battleship = require('./script');
describe('coordinates',()=>{
    test('first',()=>{
        expect(battleship.setShip('1f',3)).toBe(['1f','1g','1h']);
    })
})