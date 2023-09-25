function concatenateString(text, maxLength) {
    if (text.length <= maxLength) {
        return text.toUpperCase();
    } else {
        return text.substring(0, maxLength).toUpperCase() + "...";
    }
}

const result = concatenateString("myroslav ostashchuk", 10);
console.log(result);

function createTableCells(rowAmount, cellsAmount) {
    var table = document.getElementById("table-name");

    for (var i = 0; i < rowAmount; i++) {
        var row = table.insertRow(i);

        for (var j = 0; j < cellsAmount; j++) {
            var cell = row.insertCell(j);
            cell.innerText = `(${(i + 1)}, ${(j + 1)})`;
        }
    }
}

createTableCells(5, 5);