// data for select
var dataLabels = []; // from index.js
var dataVariables = [];
var IOTReports = [];
var filteredIOTReports = [];;
var fieldForSelection = ["Gender", "VehicleTypeId", "VehiculoName", "MainteinRoutin", "State", "MedicionTime", "MedicionDist", "Status"];
var optionForSelect = {
    Gender: ["male", "female"],
    VehicleTypeId: ["Toyoda-739515", "Nissan-1596548", "Nissan-4985321"],
    VehiculoName: ["ELM327", "UTP350", "ELN321"],
    MainteinRoutin: ["Toyoda-739515", "Nissan-1596548", "Nissan-4985321"],
    State: ["SUCCESS", "WAIT", "CANCEL"],
    MedicionTime: ["HOURS", "DAYS", "MONTHS"],
    MedicionDist: ["KILOS", "KILOMETERS"],
    Status: ["All", "Moving", "Stopped", "Turn on", "Turn off"],
}
var fieldForText = ["Description", "OBSERVATION", "Details"];
var fieldForDate = ["InitialDate", "FinalDate", "InitialDateTime", "FinalDateTime", "importacionFecha", "FechaMatricula", "FechaExp"];
var fieldForHalfSize = ["Tiempo", "Distancia", "Titulo"]; // locate half size with the item next to it.

// creacion de un elemento li de html
var createli = (content,id, haserror)=>{
    var li = document.createElement('li');
    var div = document.createElement('div');
    div.classList.add("sidebarnavelement");
    if(!haserror){
        div.setAttribute("onclick", "sidebarnavelement('" + id + "')");
    }
    var i = document.createElement('i');
    i.innerHTML=content;
    i.classList.add("zmdi");
    div.appendChild(i);
    li.appendChild(div);
    return li;
}

var createTable = (list, id)=>{
    var table = document.createElement('table');
    table.setAttribute("data-table", "col-four");
    table.setAttribute("class", "list-table-class");
    if(list.length > 0){
        var datakeys = dataVariables[id];
        var tr = document.createElement('tr');
        dataLabels[id].forEach((item, index)=>{
            if(item == "Id" || item == "id"){
            }else{
                var th = document.createElement('th');
                th.setAttribute("class", "table-th-class");
                th.innerHTML= item;
                tr.appendChild(th);
            }
        });
        if(id != "IOTReport"){
            var th = document.createElement('th');
            th.classList.add("operation-col");
            th.innerHTML= "";
            tr.appendChild(th);
        }
        var thead = document.createElement('thead');
        thead.appendChild(tr);       
        var tbody = document.createElement('tbody');
        list.forEach((item, index)=>{
            var tr = document.createElement('tr');
            for(var i = 0; i< datakeys.length; i++){
                if(datakeys[i] == "Id" || datakeys[i] == "id"){}
                else{
                    var td = document.createElement('td');
                    td.setAttribute("data-heading", datakeys[i]);
                    td.innerHTML= item[datakeys[i]];
                    tr.appendChild(td);
                }
                
            }
            // view button
            if(id != "IOTReport"){
                var td = document.createElement('td');
                td.setAttribute("data-heading", "operation");
                td.classList.add("operation-col");
                var viewbtn = createbutton(item[datakeys[0]] + "-" + item[datakeys[1]], "view");
                viewbtn.setAttribute("class", "item-view-button button");
                var str = JSON.stringify({item: item, id: id});
                viewbtn.setAttribute("onclick", "detail('" + str + "')");
                td.appendChild(viewbtn);
                tr.appendChild(td);
            }
            

            tbody.appendChild(tr);
        });
        
        table.appendChild(thead);
        table.appendChild(tbody);
        
    }
    return table;
}

var createTableForCRUD = (id, option, item)=>{
    var table = document.createElement('table');
    table.setAttribute("data-table", "col-two");
    table.setAttribute("class", "detail-table-class");
    var data;
    if(option != "create") data = JSON.parse(item);
    else data = "";

    var datakeys = dataVariables[id]
    var tbody = document.createElement('tbody');
    var nextHalfFlag = 0;
    var temp_tr = document.createElement('tr');
    var temp_td = document.createElement('td');
    temp_td.classList.add("display-inline");

    dataLabels[id].forEach((field, index)=>{

        var tr = document.createElement('tr');
        if(fieldForHalfSize.indexOf(datakeys[index]) < 0 && !nextHalfFlag){
            var td = document.createElement('td');
            td.innerHTML= field;
            td.setAttribute("class", "table-col-field")
            tr.appendChild(td);

            var td = document.createElement('td');
            td.setAttribute("field-name", field);

            if(option == "view") td.innerHTML= data.item[datakeys[index]];
            if(option == "update") {
                var input =  createinput(datakeys[index], data.item[datakeys[index]]);
                if(fieldForSelection.indexOf(datakeys[index]) >= 0) {
                    var input =  createselect(datakeys[index], data.item[datakeys[index]], optionForSelect[datakeys[index]]);
                } else if(fieldForText.indexOf(datakeys[index]) >= 0){
                    var input =  createtextarea(datakeys[index], data.item[datakeys[index]]);
                } else if(fieldForDate.indexOf(datakeys[index]) >= 0){
                    var input =  createdateinput(datakeys[index], data.item[datakeys[index]]);
                } else{
                    var input =  createinput(datakeys[index], data.item[datakeys[index]]);
                }
                td.appendChild(input);
            }
            if(option == "create") {
                if(fieldForSelection.indexOf(datakeys[index]) >= 0) {
                    var input =  createselect(datakeys[index], "", optionForSelect[datakeys[index]]);
                } else if(fieldForText.indexOf(datakeys[index]) >= 0){
                    var input =  createtextarea(datakeys[index], "");
                } else if(fieldForDate.indexOf(datakeys[index]) >= 0){
                    var input =  createdateinput(datakeys[index], "");
                } else {
                    var input =  createinput(datakeys[index], "");
                }
                td.appendChild(input);
            }
            tr.appendChild(td);
            tbody.appendChild(tr);
        }else{
            
            nextHalfFlag = nextHalfFlag == 0 ? 1 : 0;
            if(nextHalfFlag){
                var td = document.createElement('td');
                td.innerHTML= field;
                td.setAttribute("class", "table-half-field-" + nextHalfFlag);
                temp_tr.appendChild(td);
            }else{
                var label =createlabel("red", field);
                temp_td.appendChild(label);
            }

            if(option == "view") {
                console.log("data.item[datakeys[index]]", data.item[datakeys[index]]);
                var input = createlabel("half-size-"+ nextHalfFlag, data.item[datakeys[index]]);
                temp_td.appendChild(input);
            }
            if(option == "update") {
                var input =  createinput(datakeys[index], data.item[datakeys[index]]);
                if(fieldForSelection.indexOf(datakeys[index]) >= 0) {
                    var input =  createselect(datakeys[index], data.item[datakeys[index]], optionForSelect[datakeys[index]]);
                } else if(fieldForText.indexOf(datakeys[index]) >= 0){
                    var input =  createtextarea(datakeys[index], data.item[datakeys[index]]);
                } else if(fieldForDate.indexOf(datakeys[index]) >= 0){
                    var input =  createdateinput(datakeys[index], data.item[datakeys[index]]);
                } else{
                    var input =  createinput(datakeys[index], data.item[datakeys[index]]);
                }
                input.classList.add("half-size-" + nextHalfFlag);
                temp_td.appendChild(input);
            }
            if(option == "create") {
                if(fieldForSelection.indexOf(datakeys[index]) >= 0) {
                    var input =  createselect(datakeys[index], "", optionForSelect[datakeys[index]]);
                } else if(fieldForText.indexOf(datakeys[index]) >= 0){
                    var input =  createtextarea(datakeys[index], "");
                } else if(fieldForDate.indexOf(datakeys[index]) >= 0){
                    var input =  createdateinput(datakeys[index], "");
                } else {
                    var input =  createinput(datakeys[index], "");
                }
                input.classList.add("half-size-" + nextHalfFlag);
                temp_td.appendChild(input);
            }

            if(!nextHalfFlag) {
                temp_tr.appendChild(temp_td);
                tbody.appendChild(temp_tr);

                temp_tr = document.createElement('tr');
                temp_td = document.createElement('td');
                temp_td.classList.add("display-inline");
            } else {
            }

        }
    });
    
    table.appendChild(tbody);
    return table;
}

var creatediv = (id)=>{
    var div = document.createElement('div');
    div.setAttribute("id", id);
    return div;
}

var createh2 = (id,content)=>{
    var h2 = document.createElement('h2');
    h2.setAttribute("id", id);
    h2.setAttribute("class", id + " title" );
    h2.innerHTML= content;
    return h2;
}
var createspan = (id,content)=>{
    var span = document.createElement('span');
    span.setAttribute("id", id);
    span.setAttribute("class", id + " span" );
    span.innerHTML= content;
    return span;
}

var createbutton = (id, content)=>{
    var button = document.createElement('button');
    button.setAttribute("id", id);
    button.setAttribute("class", id + " button");
    button.innerHTML= content;
    return button;
}

var createinput = (id, content)=>{
    var input = document.createElement('input');
    
    if(id == "Password" || content == "password") input.type = "password";
    else input.type = "text";
    input.value = content;
    input.setAttribute("id", id);
    input.setAttribute("class", id + "-input" + " inputbox");
    return input;
}

var createselect = (id, value, option)=>{
    var select = document.createElement('select');
    select.setAttribute("id", id);
    select.setAttribute("class", id + "-input" + " select");
    
    for (var i = 0; i < option.length; i++) {
        var o = document.createElement("option");
        var t = document.createTextNode(option[i]);
        o.setAttribute("value", option[i]);
        o.appendChild(t);
        select.appendChild(o);
    }
    if(value != ""){
        select.value = value;
    }else{
        select.value = option[0];
    }
    return select;
}

var createtextarea = (id, content)=>{
    var text = document.createElement('textarea');
    text.value = content;
    text.setAttribute("row", 3);
    text.setAttribute("id", id);
    text.setAttribute("class", id + "-input" + " textarea");
    return text;
}

var createdateinput = (id, content)=>{
    var input = document.createElement('input');
    input.type = "datetime-local";
    input.value = content;
    input.setAttribute("id", id);
    input.setAttribute("class", id + "-input" + " dateinput");
    return input;
}

var createlabel = (id, content)=>{
    var label = document.createElement('label');
    label.innerHTML = content;
    label.setAttribute("id", id);
    label.setAttribute("class", id + "-input" + " label");
    return label;
}