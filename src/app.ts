// Type for special characters: diamonds, hearts, clubs and spades.
type SignType = '&#9830' | '&#9829' | '&#9827' | '&#9824';


// Class used for cells.
class Cell {

    // Saves the character of the cell.
    sign: SignType;

    constructor(sign: SignType) {
        this.sign = sign;
    }
}


// Class used for the game field.
class Field {

    // The array with cells.
    private cells: Cell[][] = [];

    // The array which saves the information about tracked cells after the cell click.
    private check: boolean[][] = [];

    // Width of the game field.
    private width: number = 6;

    // Height of the game field.
    private height: number = 7;

    constructor() {

        // Generates random initial state for the game field.
        for (let i = 0; i < this.height; i++) {
            this.cells[i] = [];
            this.check[i] = [];
            for (let j = 0; j < this.width; j++) {
                let rnd = Math.round(Math.random() * 3);
                this.cells[i][j] = new Cell(this.getCard(rnd));
                this.check[i][j] = false;
            }
        }

    }

    // Renders the game table.
    renderField() {
        const content: HTMLDivElement = <HTMLDivElement>document.getElementById('content');
        content.innerHTML = '';
        const insert: HTMLTableElement = document.createElement("table");
        let inner: string = '';
        for (let i = 0; i < this.cells.length; i++) {
            inner += '<tr>';
            for (let j = 0; j < this.cells[i].length; j++) {
                inner += `<td id="c${i}${j}">${this.cells[i][j].sign}</td>`
            }
            inner += '</tr>';
        }

        inner += '<div><button id="new-game">New game</button></div>'

        insert.innerHTML = inner;

        content.appendChild(insert);
    }

    // Return to the initial state with new random cells.
    startNewGame() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                let rnd = Math.round(Math.random() * 3);
                this.cells[i][j].sign = this.getCard(rnd);
                this.check[i][j] = false;
            }
        }
        this.update();
    }

    // Finds and delete the characters group.
    findPath(e: MouseEvent) {
        const id: string = (<HTMLTableDataCellElement>e.target).id.substr(1);
        const dim1: number = +id.charAt(0);
        const dim2: number = +id.charAt(1);
        this.checkCells(dim1, dim2);
        console.log(this.check);
        this.update();
    }

    // Returns the special character according to the random number.
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

    /** Check all neighbors and store the info in the array @see check */
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

    // Updates the game field (delete or change the signs).
    private update() {
        for (let i = 0; i < this.check.length; i++) {
            for (let j = 0; j < this.check[0].length; j++) {
                if (this.check[i][j]) (<HTMLTableDataCellElement>document.getElementById(`c${i}${j}`)).innerHTML = '';
                else (<HTMLTableDataCellElement>document.getElementById(`c${i}${j}`)).innerHTML = `${this.cells[i][j].sign}`;
            }

        }
    }

}


// Get the start button element.
const startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('start');
// Create variable for new game button.
let newButton: HTMLButtonElement;
// Create the new instance for the game field.
const field = new Field();

startButton.addEventListener('click', () => {
    // hide the start game button.
    startButton.style.display = "none";

    // Show the game field.
    field.renderField();

    // Get the new game button element.
    newButton = <HTMLButtonElement>document.getElementById('new-game');
    // Get all cells from the table.
    const cells = document.querySelectorAll("td");

    cells.forEach((cell) => {
        cell.addEventListener('click', field.findPath.bind(field))
    })

    newButton.addEventListener('click', field.startNewGame.bind(field));
});



