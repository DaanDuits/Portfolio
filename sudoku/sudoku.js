var numSelected = null;
var tileSelected = null;

var startBoard = null;
var board = null;

window.onload = function () {
    setGame();
}

function reset() {
    location.reload();
}

function setGame() {
    startBoard = generateSudoku();
    const size = 9;
    board = new Array(size);
    for (let i = 0; i < size; i++) {
        board[i] = new Array(size);
    }

    // Initialize the Sudoku grid with zeros
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board[i][j] = 0;
        }
    }
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            board[r][c] = startBoard[r][c];
        }
    }
    for (let i= 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.classList.add(board[r][c].toString());
            if (startBoard[r][c] != 0) {
                tile.innerText = startBoard[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5)
            {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5)
            {
                tile.classList.add("vertical-line");
            }
            tile.id = r.toString() + '-' + c.toString();
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    if (numSelected == this) {
        numSelected.classList.remove("number-selected");
        numSelected = null;
        return;
    }

    numSelected = this;
    numSelected.classList.add("number-selected");

    if (tileSelected) {
        
        tileSelected.innerText = numSelected.id;
        board[tileSelected.id[0]][tileSelected.id[2]] = parseInt(numSelected.id);
        tileSelected.classList.replace(tileSelected.classList[0], numSelected.id);
        if (isSudokuSolved(board)) {
            document.getElementById("win-panel").style.display = "block"; // Corrected display property value
        }

        numSelected.classList.remove("number-selected");
        numSelected = null;
    }
}

function selectTile() {
    if (tileSelected) {
        tileSelected.classList.remove("tile-selected");
        let highlighted = Array.from(document.getElementsByClassName("tile-highlighted"));  // Convert to array
        for (let i = 0; i < highlighted.length; i++) {
            highlighted[i].classList.remove("tile-highlighted");
        }
    }
    
    tileSelected = this;
    tileSelected.classList.add("tile-selected");

    if (tileSelected.classList[0] != '0') {
        let sameNumber = document.getElementsByClassName(tileSelected.classList[0]);
        
        for (let j = 0; j < sameNumber.length; j++) {
            if (sameNumber[j] === this) {
                continue;
            }
            sameNumber[j].classList.add("tile-highlighted");
        }
    }
}


function generateSudoku() {
    const size = 9;
    let sudoku = new Array(size);
    for (let i = 0; i < size; i++) {
        sudoku[i] = new Array(size);
    }

    // Initialize the Sudoku grid with zeros
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            sudoku[i][j] = 0;
        }
    }

    // Fill the grid with random numbers while ensuring Sudoku rules
    fillGrid(sudoku);

    // Remove some numbers randomly to create the puzzle
    removeNumbers(sudoku);

    return sudoku;
}

function fillGrid(sudoku) {
    // Fill the diagonal subgrids
    fillDiagonal(sudoku);
    
    // Solve the Sudoku puzzle
    solveSudoku(sudoku);
}

function fillDiagonal(sudoku) {
    const size = 9;
    const subgridSize = 3;
    for (let i = 0; i < size; i += subgridSize) {
        fillSubgrid(sudoku, i, i);
    }
}

function fillSubgrid(sudoku, row, col) {
    const size = 9;
    const subgridSize = 3;
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(nums);

    let index = 0;
    for (let i = 0; i < subgridSize; i++) {
        for (let j = 0; j < subgridSize; j++) {
            sudoku[row + i][col + j] = nums[index];
            index++;
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function solveSudoku(sudoku) {
    const size = 9;
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (sudoku[row][col] === 0) {
                for (let num = 1; num <= size; num++) {
                    if (isValid(sudoku, row, col, num)) {
                        sudoku[row][col] = num;
                        if (solveSudoku(sudoku)) {
                            return true;
                        }
                        sudoku[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(sudoku, row, col, num) {
    return (
        !usedInRow(sudoku, row, num) &&
        !usedInCol(sudoku, col, num) &&
        !usedInSubgrid(sudoku, row - (row % 3), col - (col % 3), num)
    );
}

function usedInRow(sudoku, row, num) {
    for (let col = 0; col < 9; col++) {
        if (sudoku[row][col] === num) {
            return true;
        }
    }
    return false;
}

function usedInCol(sudoku, col, num) {
    for (let row = 0; row < 9; row++) {
        if (sudoku[row][col] === num) {
            return true;
        }
    }
    return false;
}

function usedInSubgrid(sudoku, startRow, startCol, num) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (sudoku[row + startRow][col + startCol] === num) {
                return true;
            }
        }
    }
    return false;
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function removeNumbers(sudoku) {
    // Define the percentage of cells to be removed
    const removalPercentage = 0.6; // You can adjust this value as needed

    // Calculate the total number of cells in the Sudoku grid
    const totalCells = 9 * 9;

    // Calculate the number of cells to be removed
    const cellsToRemove = Math.floor(totalCells * removalPercentage);

    // Remove cells randomly
    for (let i = 0; i < cellsToRemove; i++) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (sudoku[row][col] !== 0) {
            sudoku[row][col] = 0;
        } else {
            // If the randomly selected cell is already empty, try another cell
            i--;
        }
    }
}

function isSudokuSolved(sudoku) {
    // Check if any cell is empty
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] === 0) {
                return false; // Sudoku is not fully filled
            }
        }
    }

    // Check rows and columns
    for (let i = 0; i < 9; i++) {
        let rowSet = new Set();
        let colSet = new Set();
        for (let j = 0; j < 9; j++) {
            // Check rows
            if (sudoku[i][j] !== 0) {
                if (rowSet.has(sudoku[i][j])) {
                    return false; // Duplicate in the row
                }
                rowSet.add(sudoku[i][j]);
            }
            // Check columns
            if (sudoku[j][i] !== 0) {
                if (colSet.has(sudoku[j][i])) {
                    return false; // Duplicate in the column
                }
                colSet.add(sudoku[j][i]);
            }
        }
    }

    // Check subgrids
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let subgridSet = new Set();
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    let num = sudoku[i + k][j + l];
                    if (num !== 0) {
                        if (subgridSet.has(num)) {
                            return false; // Duplicate in the subgrid
                        }
                        subgridSet.add(num);
                    }
                }
            }
        }
    }

    return true; // If no violations found
}
