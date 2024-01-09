// Get the form and file field
let form = document.querySelector('#upload');
let file = document.querySelector('#file');

function logFile(event) {
    let str = event.target.result;
    let json = JSON.parse(str);
    console.log('string', str);
    console.log('json', json);
    let countsTable = createTable('Table1', ['Count'], [json.count]);
    let productsTable = createTable('Table2', ['Product'], [json.products]);
    document.getElementById('table-container').appendChild(countsTable);
    document.getElementById('table-container').appendChild(productsTable);
}

function createTable(title, headers, data) {
    // Create a table for a specific data type
    let table = document.createElement('table');
    table.border = '1';
    // Create table header
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    let tbody = document.createElement('tbody');
    let dataRow = document.createElement('tr');
    data.forEach(item => {
        let td = document.createElement('td');
        // If the item is an object, create a nested table
        if (typeof item === 'object') {
            td.appendChild(createNestedTable(item));
        } else {
            td.textContent = item;
        }
        dataRow.appendChild(td);
    });
    tbody.appendChild(dataRow);
    table.appendChild(tbody);
    // Add a title to the table
    let titleElement = document.createElement('h2');
    titleElement.textContent = title;
    document.getElementById('table-container').appendChild(titleElement);
    return table;
}

function createNestedTable(object) {
    // Create a nested table for an object
    let nestedTable = document.createElement('table');
    nestedTable.border = '1';
    // Create table body for the nested table
    let nestedTbody = document.createElement('tbody');
    // Iterate over object properties and create rows
    for (let key in object) {
        let nestedRow = document.createElement('tr');
        // Property name
        let keyCell = document.createElement('td');
        keyCell.textContent = key;
        nestedRow.appendChild(keyCell);
        // Property value
        let valueCell = document.createElement('td');
        // If the property value is an object, create a nested table
        if (typeof object[key] === 'object') {
            valueCell.appendChild(createNestedTable(object[key]));
        } else {
            valueCell.textContent = object[key];
        }
        nestedRow.appendChild(valueCell);
        nestedTbody.appendChild(nestedRow);
    }
    nestedTable.appendChild(nestedTbody);
    return nestedTable;
}

function handleFileSelect(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = logFile;
        reader.readAsText(file);
    }
}

function handleSubmit(event) {
    event.preventDefault();
    if (!file.value.length) return;
    let reader = new FileReader();
    reader.onload = logFile;
    // Read the file
    reader.readAsText(file.files[0]);
}

// Listen for submit events
form.addEventListener('submit', handleSubmit);