// functions expression using lambda
/**
 * This function builds a dinamic table.
 * @param {array} arr 
 * @param {array} headers 
 * @returns string with HTML table code 
 */
const buildTable = (arr, headers) => {
    let txt = `<table><tr>`;
    for(const h of headers) {
        txt+=`<th>${h}</th>`;
    }
    txt += `</tr>`;
    for (const item of arr) {
        txt+=`<tr>`;
        for(const prop in item){
           txt += `<td>${item[prop]}</td>`;
        }
        txt+=`</tr>`;
    }
    txt += `</table>`;
    return txt;
}

/**
 * Reads text from text file
 * @param {file} file 
 * @param function nameFunction (text) {} callback
 */
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

