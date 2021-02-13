type SignType = '&#9830' | '&#9829' | '&#9827' | '&#9824';

class Cell {

    sign: SignType;

    constructor(sign: SignType) {
        this.sign = sign;
    }
}

class Field {
    cells: Cell[][] = [];
    private check: boolean[][] = [];
    private width: number = 6;
    private height: number = 7;

    private content: HTMLDivElement = <HTMLDivElement>document.getElementById('content');

    constructor() {

        for (let i = 0; i < this.height; i++) {
            this.cells[i] = [];
            this.check[i] = [];
            for (let j = 0; j < this.width; j++) {
                let rnd = Math.round(Math.random() * 3);
                this.cells[i][j] = new Cell(this.getCard(rnd));
                this.check[i][j] = false;
            }
        }

        this.generateTable();
    }

    private getCard(value: number): SignType {
        switch (value) {
            case 0:
                return '&#9827';
            case 1:
                return '&#9830';
            case 2:
                return '&#9829';
            case 3:
                return '&#9824';
            default:
                return '&#9827';
        }
    }

    findPath(e: MouseEvent) {
        const id: string = (<HTMLTableDataCellElement>e.target).id.substr(1);
        const dim1: number = +id.charAt(0);
        const dim2: number = +id.charAt(1);
        this.checkCells(dim1, dim2);
        console.log(this.check);
        this.update();
    }

    private checkCells(dim1: number, dim2: number) {
        this.check[dim1][dim2] = true;
        const sign: string = this.cells[dim1][dim2].sign;
        if (dim1 + 1 < this.height)
            if (sign === this.cells[dim1 + 1][dim2].sign && !this.check[dim1 + 1][dim2]) this.checkCells(dim1 + 1, dim2);
        if (dim1 - 1 >= 0)
            if (sign === this.cells[dim1 - 1][dim2].sign && !this.check[dim1 - 1][dim2]) this.checkCells(dim1 - 1, dim2);
        if (dim2 + 1 < this.width)
            if (sign === this.cells[dim1][dim2 + 1].sign && !this.check[dim1][dim2 + 1]) this.checkCells(dim1, dim2 + 1);
        if (dim2 - 1 >= 0)
            if (sign === this.cells[dim1][dim2 - 1].sign && !this.check[dim1][dim2 - 1]) this.checkCells(dim1, dim2 - 1);
    }

    private generateTable() {
        this.content.innerHTML = '';
        const insert: HTMLTableElement = document.createElement("table");
        let inner: string = '';
        for (let i = 0; i < this.cells.length; i++) {
            inner += '<tr>';
            for (let j = 0; j < this.cells[i].length; j++) {
                inner += `<td id="c${i}${j}">${this.cells[i][j].sign}</td>`
            }
            inner += '</tr>';
        }

        insert.innerHTML = inner;

        this.content.appendChild(insert);
    }

    update() {
        for (let i = 0; i < this.check.length; i++) {
            for (let j = 0; j < this.check[0].length; j++) {
                if (this.check[i][j]) (<HTMLTableDataCellElement>document.getElementById(`c${i}${j}`)).innerHTML = '';
            }

        }
    }

}

const field = new Field();

const cells = document.querySelectorAll("td");

cells.forEach((cell) => {
    cell.addEventListener('click', field.findPath.bind(field))
})
