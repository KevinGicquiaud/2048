$(document).ready(function () {
    var score = 0;
    var table = [];

    initialisation();

    function initialisation() {
        $.getJSON("save.json", function (data) {
            var size = data.game.tableSave.size;
            createGrid(table, size, data.game);
            displayHTMLGrid(table);
        }, 'json');
    }

    $(this).on("keyup", function (e) {
        var code = e.keyCode;
        console.log('keyup');
        switch (code) {
            case 37:
                console.log('gauche');
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
    });

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

    function moveDown(table) {
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

    function moveLeft(table) {
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

    function moveRight(table) {
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
        var tableHTML = $('<table></table>');
        tableHTML.attr('id', '2048');
        for (var i = 0; i < table.length; i++) {
            var row = $('<tr></tr>');
            for (var j = 0; j < table.length; j++) {
                var col = $('<td></td>');
                switch (table[i][j]) {
                    case 0:
                        col.removeAttr('class');
                        col.attr('class', 'a');
                        break;
                    case 2:
                        col.removeAttr('class');
                        col.attr('class', 'b');
                        break;
                    case 4:
                        col.removeAttr('class');
                        col.attr('class', 'c');
                        break;
                    case 8:
                        col.removeAttr('class');
                        col.attr('class', 'd');
                        break;
                    case 16:
                        col.removeAttr('class');
                        col.attr('class', 'e');
                        break;
                    case 32:
                        col.removeAttr('class');
                        col.attr('class', 'f');
                        break;
                    case 64:
                        col.removeAttr('class');
                        col.attr('class', 'g');
                        break;
                    case 128:
                        col.removeAttr('class');
                        col.attr('class', 'h');
                        break;
                }
                col.text(table[i][j]);
                row.append(col);
            }
            tableHTML.append(row);
        }
        $("body").append(tableHTML);
    }
});