document.addEventListener("DOMContentLoaded", pageReady(), false);
var score = 0;
function pageReady() {
    var table = [];
    var request = new XMLHttpRequest();
    request.open("GET", "save.json", false);
    request.send(null);
    var my_JSON_object = JSON.parse(request.responseText);
    var size = my_JSON_object.game.tableSave.size;

    createGrid(table, size, my_JSON_object.game);
    displayTable(table);
    displayHTMLGrid(table);

    function isLose(table, score) {
        var pseudo = document.getElementById("pseudo");
        var win = false;
        var losed = true;

        for (var i = table.length - 1; i > 0; i--) {
            for (var j = table.length - 1; j >= 0; j--) {
                if(table[i][j] == 2048) {
                    win = true;
                    if(confirm("You win -> " + score)) {
                        location.reload();
                    }
                }
            }
        }

        if (!win) {
            if (losed) {
                for (var i = table.length - 1; i > 0; i--) {
                    for (var j = table.length - 1; j >= 0; j--) {
                        if (table[i - 1][j] == 0 || table[i - 1][j] == table[i][j]) {
                            losed = false
                        }
                    }
                }
            }

            if (losed) {
                for (var i = 0; i < table.length - 1; i++) {
                    for (var j = 0; j < table.length; j++) {
                        if (table[i + 1][j] == 0 || table[i + 1][j] == table[i][j]) {
                            losed = false;
                        }
                    }
                }
            }

            if (losed) {
                for (var i = table.length - 1; i >= 0; i--) {
                    for (var j = table.length - 1; j >= 0; j--) {
                        if (table[i][j - 1] == 0 || table[i][j - 1] == table[i][j]) {
                            losed = false;
                        }
                    }
                }
            }

            if (losed) {
                for (var i = 0; i < table.length; i++) {
                    for (var j = 0; j < table.length; j++) {
                        if (table[i][j + 1] == 0 || table[i][j + 1] == table[i][j]) {
                            losed = false;
                        }
                    }
                }
            }

            if (losed) {
                if(confirm("Game Over : " + score)) {
                    location.reload();
                }
            }
        }
    }

    window.onkeyup = function (e) {
        var code = e.keyCode;
        switch (code) {
            case 37:
                moveLeft(table, score);
                addRandomTwo(table);
                break;
            case 38:
                moveUp(table, score);
                addRandomTwo(table);
                break;
            case 39:
                moveRight(table, score);
                addRandomTwo(table);
                break;
            case 40:
                moveDown(table, score);
                addRandomTwo(table);
                break;
        }
        showScore(score);
        displayHTMLGrid(table);
        isLose(table, score);
    }

    function showScore(score) {
        var divScore = document.getElementById('score');
        divScore.innerText = "Votre score " + score;
    }

    function incrementScore(value) {
        score += value;
    }
    function moveUp(table) {
        for (var i = table.length - 1; i > 0; i--) {
            for (var j = table.length - 1; j >= 0; j--) {
                if (table[i - 1][j] == 0) {
                    table[i - 1][j] = table[i][j];
                    table[i][j] = 0;
                } else if (table[i - 1][j] == table[i][j]) {
                    incrementScore(table[i][j] * 2)
                    table[i - 1][j] += table[i][j];
                    table[i][j] = 0;
                }
            }
        }
        for (var i = table.length - 1; i > 0; i--) {
            for (var j = table.length - 1; j >= 0; j--) {
                if (table[i - 1][j] == 0) {
                    table[i - 1][j] = table[i][j];
                    table[i][j] = 0;
                }
            }
        }

    }

    function moveDown(table, score) {
        for (var i = 0; i < table.length - 1; i++) {
            for (var j = 0; j < table.length; j++) {
                if (table[i + 1][j] == 0) {
                    table[i + 1][j] = table[i][j];
                    table[i][j] = 0;
                } else if (table[i + 1][j] == table[i][j]) {
                    incrementScore(table[i][j] * 2)
                    table[i + 1][j] += table[i][j];
                    table[i][j] = 0;
                }
            }
        }
        for (var i = 0; i < table.length - 1; i++) {
            for (var j = 0; j < table.length; j++) {
                if (table[i + 1][j] == 0) {
                    table[i + 1][j] = table[i][j];
                    table[i][j] = 0;
                }
            }
        }
    }

    function moveLeft(table, score) {
        for (var i = table.length - 1; i >= 0; i--) {
            for (var j = table.length - 1; j >= 0; j--) {
                if (table[i][j - 1] == 0) {
                    table[i][j - 1] = table[i][j];
                    table[i][j] = 0;
                } else if (table[i][j - 1] == table[i][j]) {
                    incrementScore(table[i][j] * 2)
                    table[i][j - 1] += table[i][j];
                    table[i][j] = 0;
                }
            }
        }
        for (var i = table.length - 1; i >= 0; i--) {
            for (var j = table.length - 1; j >= 0; j--) {
                if (table[i][j - 1] == 0) {
                    table[i][j - 1] = table[i][j];
                    table[i][j] = 0;
                }
            }
        }
    }

    function moveRight(table, score) {
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table.length; j++) {
                if (table[i][j + 1] == 0) {
                    table[i][j + 1] = table[i][j];
                    table[i][j] = 0;
                } else if (table[i][j + 1] == table[i][j]) {
                    incrementScore(table[i][j] * 2)
                    table[i][j + 1] += table[i][j];
                    table[i][j] = 0;
                }
            }
        }
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table.length; j++) {
                if (table[i][j + 1] == 0) {
                    table[i][j + 1] = table[i][j];
                    table[i][j] = 0;
                }
            }
        }
    }

    function createGrid(table, size, tableSaved) {
        for (var i = 0; i < size; i++) {
            var row = [];
            for (var j = 0; j < size; j++) {
                row.push(tableSaved.tableSave.placement[i][j]);
            }
            table.push(row);
        }
    }

    function displayTable(table) {
        var stockRow = '';
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table.length; j++) {
                stockRow += '[' + table[i][j] + ']';
            }
            stockRow = '';
        }
    }

    function addRandomTwo(table) {
        var emptyCells = [];
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table.length; j++) {
                if (table[i][j] == 0) {
                    emptyCells.push(i + '_' + j);
                }
            }
        }
        if (emptyCells.length > 0) {
            var rand = Math.round(Math.random() * (emptyCells.length - 1));
            var row = emptyCells[rand].split('_')[0];
            var col = emptyCells[rand].split('_')[1];
            table[row][col] = 2;
        }
    }

    function displayHTMLGrid(table) {
        var element = document.getElementById('2048');
        if (element != null) {
            element.remove();
        }
        var tableHTML = document.createElement('table');
        tableHTML.setAttribute('id', '2048');
        for (var i = 0; i < table.length; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < table.length; j++) {
                var col = document.createElement('td');
                switch (table[i][j]) {
                    case 0:
                        col.removeAttribute('class');
                        col.setAttribute('class', 'a');
                        break;
                    case 2:
                        col.removeAttribute('class');
                        col.setAttribute('class', 'b');
                        break;
                    case 4:
                        col.removeAttribute('class');
                        col.setAttribute('class', 'c');
                        break;
                    case 8:
                        col.removeAttribute('class');
                        col.setAttribute('class', 'd');
                        break;
                    case 16:
                        col.removeAttribute('class');
                        col.setAttribute('class', 'e');
                        break;
                    case 32:
                        col.removeAttribute('class');
                        col.setAttribute('class', 'f');
                        break;
                    case 64:
                        col.removeAttribute('class');
                        col.setAttribute('class', 'g');
                        break;
                    case 128:
                        col.removeAttribute('class');
                        col.setAttribute('class', 'h');
                        break;
                }
                col.innerText = table[i][j];
                row.appendChild(col);
            }
            tableHTML.appendChild(row)
        }
        document.body.appendChild(tableHTML);


    }
}