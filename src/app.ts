type SignType = 'diamond' | 'heart' | 'club' | 'spade';

class Cell {

    sign: SignType;

    constructor(sign: SignType) {
        this.sign = sign;
    }
}

class Field {
    cells: Cell[][] = [];
    private width: number = 6;
    private height: number = 7;

    constructor() {
        for (let i = 0; i < this.width; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.height; j++) {
                let rnd = Math.round(Math.random() * 3);
                this.cells[i][j] = new Cell(this.getCard(rnd));
            }
        }
    }

    private getCard(value: number): SignType {
        switch (value) {
            case 0:
                return 'club';
            case 1:
                return 'diamond';
            case 2:
                return 'heart';
            case 3:
                return 'spade';
            default:
                return 'club';
        }
    }

}

const field = new Field();

const content: HTMLDivElement = <HTMLDivElement>document.getElementById('content');

const insert: HTMLElement = document.createElement("table");

for (let i = 0; i < field.cells.length; i++) {
    insert.innerHTML += '<tr>';
    for (let j = 0; j < field.cells[i].length; j++) {
        insert.innerHTML += `<td>${field.cells[i][j].sign}</td>`
    }
    insert.innerHTML += '</tr>';
}

content.appendChild(insert);


