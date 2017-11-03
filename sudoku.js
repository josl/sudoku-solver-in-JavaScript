const readline = require('readline');
const fs = require('fs');


// 9x9 Matrix
function createSudokuBoard() {
    var rows = [];
    for (var i = 0; i < 9; i++) {
        rows[i] = [];
    }
    return rows
}

var sudoku = createSudokuBoard();

var numbers = [1, 2 ,3, 4, 5, 6, 7, 8, 9];

var regions = {
    '00': [2, 2],
    '01': [2, 2],
    '02': [2, 2],
    '03': [2, 5],
    '04': [2, 5],
    '05': [2, 5],
    '06': [2, 8],
    '07': [2, 8],
    '08': [2, 8],
    '10': [2, 2],
    '11': [2, 2],
    '12': [2, 2],
    '13': [2, 5],
    '14': [2, 5],
    '15': [2, 5],
    '16': [2, 8],
    '17': [2, 8],
    '18': [2, 8],
    '20': [2, 2],
    '21': [2, 2],
    '22': [2, 2],
    '23': [2, 5],
    '24': [2, 5],
    '25': [2, 5],
    '26': [2, 8],
    '27': [2, 8],
    '28': [2, 8],
    '30': [5, 2],
    '31': [5, 2],
    '32': [5, 2],
    '33': [5, 5],
    '34': [5, 5],
    '35': [5, 5],
    '36': [5, 8],
    '37': [5, 8],
    '38': [5, 8],
    '40': [5, 2],
    '41': [5, 2],
    '42': [5, 2],
    '43': [5, 5],
    '44': [5, 5],
    '45': [5, 5],
    '46': [5, 8],
    '47': [5, 8],
    '48': [5, 8],
    '50': [5, 2],
    '51': [5, 2],
    '52': [5, 2],
    '53': [5, 5],
    '54': [5, 5],
    '55': [5, 5],
    '56': [5, 8],
    '57': [5, 8],
    '58': [5, 8],
    '60': [8, 2],
    '61': [8, 2],
    '62': [8, 2],
    '63': [8, 5],
    '64': [8, 5],
    '65': [8, 5],
    '66': [9, 9],
    '67': [9, 9],
    '68': [9, 9],
    '70': [8, 2],
    '71': [8, 2],
    '72': [8, 2],
    '73': [8, 5],
    '74': [8, 5],
    '75': [8, 5],
    '76': [9, 9],
    '77': [9, 9],
    '78': [9, 9],
    '80': [8, 2],
    '81': [8, 2],
    '82': [8, 2],
    '83': [8, 5],
    '84': [8, 5],
    '85': [8, 5],
    '86': [9, 9],
    '87': [9, 9],
    '88': [9, 9]
};


var solved = {};

function loadSudoku(sudoku) {

    const rl = readline.createInterface({
      input: fs.createReadStream('sudoku.txt')
    });

    var row = 0;
    rl.on('line', function(line) {
        if (line != ''){
            line.match(/[0-9]/g).forEach(function(number, col) {
                // if (number !== 0) {
                    sudoku[row][col] = parseInt(number);
                    solved[row.toString(), col.toString()] = 1;
                // }
            })
            row++;
        }
    });

    rl.on('close', function() {
        printSudoku(sudoku);
        // solveSudoku(sudoku);

    });
}

function visited(row, col) {
    return solved[row.toString(), col.toString()];
}

function solveSudoku(sudoku) {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            numbers.forEach(function (candidate){
                if (!visited(row, col) && uniqueInColumn(candidate, row) &&
                    uniqueInRow(candidate, col) &&
                    uniqueInGrid(candidate, row, colj) &&
                    sudoku[row][col] === 0) {

                    sudoku[i][j] = candidate;
                    process.stdout.write(`Processing row: {i} col: {j}\n`);
                } else {

                }
            });
        }
    }


}

function uniqueInColumn(candidate, row) {
    for (var col = 0; col < 9; col++) {
        if (sudoku[row][col] === candidate){
            console.log('errorCol', row, col, sudoku[row][col], candidate);
            return false;
        }
    }
    return true;
}

function uniqueInRow(candidate, col) {
    for (var row = 0; row < 9; row++) {
        if (sudoku[row][col] === candidate){
            console.log('errorRow', row, col, sudoku[row][col], candidate);
            return false;
        }
    }
    return true;
}

function gridBoundaries(row, col) {
    return regions[row.toString() + col.toString()];
}

function uniqueInGrid(candidate, row, col) {
    var boundaries = gridBoundaries(row, col);
    for (var i = boundaries[0] - 3; i < boundaries[0]; i++) {
        for (var  j = boundaries[1] - 3; j < boundaries[1]; j++) {
            if (sudoku[row][col] === candidate){
                console.log('errorGrid', row, col, sudoku[row][col], candidate);
                return false;
            }
        }
    }
    return true;
}

function printBarsRows(bars, position) {
    var separators = {
        0: 1, 3: 1, 6: 1, 9:1
    };
    if (position in separators){
        process.stdout.write(bars);
    }
}

function printBarsCols(bars, position) {
    var separators = {
        0: 1, 3: 1, 6:1
    };
    if (position in separators){
        process.stdout.write(bars);
    }
}

function printSudoku(sudoku) {
    var rowBar = ' +-------+-------+-------+\n';
    var colBar = ' |';
    sudoku.forEach(function(row, i){
        printBarsRows(rowBar, i);
        row.forEach(function(element, j){
            printBarsCols(colBar, j);
            if (element === 0) {
                process.stdout.write(' ');
                process.stdout.write(' ');
            }else {
                process.stdout.write(' ');
                process.stdout.write(element.toString());
            }
        });
        process.stdout.write(colBar);
        process.stdout.write('\n');
    });
    process.stdout.write(rowBar);
}

loadSudoku(sudoku);
