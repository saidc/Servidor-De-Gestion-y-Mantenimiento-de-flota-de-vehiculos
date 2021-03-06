// data for select
var dataLabels = []; // from index.js
var dataVariables = [];
var IOTReports = [];
var filteredIOTReports = [];;

var fieldForSelection = [
    "GENERO", "PLACA_DE_VEHICULO", "id_tipodevehiculo", "id_rutinademantenimiento", 
    "ESTADO_DE_VEHICULO", "ESTADO_DE_RUTINA", "ESTADO_DE_PLAN", "MEDICION_DE_TIEMPO",
    "MEDICION_DE_DISTANCIA", "COMBUSTIBLE", "TIPO_DE_RUTINA","CORREO_DE_USUARIO","ROL","OPERACION_DE_MANTENIMIENTO"];

var optionForSelect = {
    // Datos que hay que obtener de base de datos
    id_tipodevehiculo: [],
    id_rutinademantenimiento: [],
    PLACA_DE_VEHICULO: [],
    CORREO_DE_USUARIO: [],
    
    // datos estatico o fijos
    GENERO: ["MASCULINO", "FEMENINO"],
    ESTADO_DE_VEHICULO: ["","MOVIMIENTO", "DETENIDO", "ENCENDIDO", "APAGADO"],
    ESTADO_DE_RUTINA: ["ACTIVA", "INACTIVA"],
    ESTADO_DE_PLAN: ["ESPERA", "CANCELADO", "EXITOSO"],
    MEDICION_DE_TIEMPO: ["HORA", "DIA", "MES"],
    MEDICION_DE_DISTANCIA: ["KILOMETROS", "MILLAS"],
    COMBUSTIBLE: ["DIESEL", "GASOLINA", "GAS", "ELECTRICO"],
    TIPO_DE_RUTINA: ["PREVENTIVO", "CORRECTIVO"],
    ROL:["ADMINISTRADOR","CONDUCTOR","TRABAJADOR"],
    OPERACION_DE_MANTENIMIENTO:["INSPECCIONAR","REEMPLAZAR - CAMBIAR - LUBRICAR","LUBRICAR","APRETAR"]
}

var fieldForText = ["DESCRIPCION", "OBSERVACION"];
var fieldForDate = ["FECHA","FECHAINICIAL", "FECHAFINAL","FECHA DE IMPORTACION", "FECHA MATRICULA", "FECHA EXP LIC TTO","InitialDateTime","FinalDateTime"];
var fieldForHalfSize = ["TIEMPO", "DISTANCIA"]; // locate half size with the item next to it.

// creacion de un elemento li de html
var createli = (content,id, haserror)=>{
    var li = document.createElement('li');
    var div = document.createElement('div');
    div.classList.add("sidebarnavelement");
    console.log(id)
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
                    if(datakeys[i].includes("id_") || datakeys[i] == "PLACA_DE_VEHICULO" || datakeys[i] == "CORREO_DE_USUARIO"){
                        if(!(item[datakeys[i]] == null || item[datakeys[i]] == "")){
                            var str = JSON.stringify({key: datakeys[i], id: item[datakeys[i]]});
                            td.setAttribute("onclick", "redirectVisualizar('" + str + "')");
                            td.setAttribute("onmouseover", "this.style.color='red';this.style.cursor='pointer';");
                            td.setAttribute("onmouseout" , "this.style.color='';");
                        }
                    }
                    td.innerHTML= item[datakeys[i]];
                    tr.appendChild(td);
                }
                
            }
            // visualizar button
            if(id != "IOTReport"){
                var td = document.createElement('td');
                td.setAttribute("data-heading", "operation");
                td.classList.add("operation-col");
                var visualizarbtn = createbutton(item[datakeys[0]] + "-" + item[datakeys[1]], "visualizar");
                visualizarbtn.setAttribute("class", "item-visualizar-button button");
                var str = JSON.stringify({item: item, id: id});
                visualizarbtn.setAttribute("onclick", "detail('" + str + "')");
                td.appendChild(visualizarbtn);
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

            if(option == "visualizar") td.innerHTML= data.item[datakeys[index]];
            if(option == "actualizar") {
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

            if(option == "visualizar") {
                console.log("data.item[datakeys[index]]", data.item[datakeys[index]]);
                var input = createlabel("half-size-"+ nextHalfFlag, data.item[datakeys[index]]);
                temp_td.appendChild(input);
            }
            if(option == "actualizar") {
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
    
    if(id == "PASSWORD" || content == "PASSWORD") input.type = "password";
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
        var valor  = null
        var nombre = null
        
        try {
            nombre = option[i]["name"]
            valor =  option[i]["value"] 
        } catch (error) {
            valor  = null
            nombre = null
        }
        
        if( valor != null && nombre != null){
            var o = document.createElement("option");
            var t = document.createTextNode(option[i]["name"]);
            o.setAttribute("value", option[i]["value"]);
            o.appendChild(t);
            select.appendChild(o);
        }else{
            var o = document.createElement("option");
            var t = document.createTextNode(option[i]);
            o.setAttribute("value", option[i]);
            o.appendChild(t);
            select.appendChild(o);
        }
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