//const { getNumberOfusuario_vehiculo } = require("../../../services/sql/CRUD/usuariovehiculo");

var host = (window.location.hostname)
if(host == "127.0.0.1"){
    host = "http://"+window.location.hostname +":3000";
}else{
    host = "https://"+window.location.hostname ; 
}
console.log(host)
// console.log(window.location.href)
var payload = {
    pageNo: 0, count: 10
};
var filterVisualizarFlag = 0;
var statefiltroReporte = false;
var filterOption = {FECHAINICIAL: "", FECHAFINAL: "", ESTADO_DE_VEHICULO: "All"};

//inicializa evento del check burger
burgercheckbox();

//post request 
var postJsonData = async (jsonObject, id)=>{
    // console.log("buscar:" , id)
    try {
        const response = await fetch(host+"/api/" + id, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonObject)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        location.reload();
        return null
    }
}

var postJsonDataForWrite = async (jsonObject, id)=>{
    try {
        const response = await fetch(host+"/api/write" + id, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonObject)
        });
        return await response.json();
        
    } catch (error) {
        console.log(error);
        location.reload();
        return null
    }
}

var postJsonDataForEliminar = async (jsonObject, id)=>{
    try {
        const response = await fetch(host+"/api/eliminar" + id, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonObject)
        });
        return await response.json();
        
    } catch (error) {
        console.log(error);
        location.reload();
        return null
    }
}

var removeaddcontentbox = ()=>{
    var cbox = document.getElementById("addcontentbox");
    while (cbox.hasChildNodes()) {
        cbox.removeChild(cbox.childNodes[0]);
    }
}
var removeaddreportbox = ()=>{
    var cbox = document.getElementById("addreportbox");
    while (cbox.hasChildNodes()) {
        cbox.removeChild(cbox.childNodes[0]);
    }
}

var sidebarnavelement = async (id)=>{ 
    removeaddcontentbox();
    removeaddreportbox();
    actualizarLoader("contentboxloader"); 
    
    var addcontentbox = document.getElementById("addcontentbox");
    try {
        var res = await postJsonData(payload, id);
        // console.log(res)
        if(!(res.error )){
            var h2 = res.res.name;
            var numusers = res.res.num;
            var button1 = "Crear nuevo";
            var contentboxactionheader = creatediv("contentboxactionheader");
                var contentboxtreepath = creatediv("contentboxtreepath");
                var contenboxheaderactions = creatediv("contenboxheaderactions");
                    var headerinfo = creatediv("headerinfo");
                        var contentheaderinfoh2 = createh2("contentheaderinfoh2",h2);
                        var numerofcontent = createspan("numerofcontent",numusers);
                    headerinfo.appendChild(contentheaderinfoh2);
                    headerinfo.appendChild(numerofcontent);
                    var headeractions = creatediv("headeractions");
                        var createnew = createbutton("createnew", button1);
                        createnew.setAttribute("data-type", id);
                        var temp = {id: id, item: "", option: "create"};
                        var str = JSON.stringify(temp);
                        createnew.setAttribute("onclick", "create_actualizar_eliminar('" + str + "')");
                    if(id != "Alertas") headeractions.appendChild(createnew);
                contenboxheaderactions.appendChild(headerinfo);
                contenboxheaderactions.appendChild(headeractions);
            contentboxactionheader.appendChild(contentboxtreepath);
            contentboxactionheader.appendChild(contenboxheaderactions);
            addcontentbox.appendChild(contentboxactionheader);

            var tablewrapper = creatediv("tablewrapper");
            tablewrapper.appendChild(createTable(res.res.res, id))
            addcontentbox.appendChild(tablewrapper);

            if(res.res.name == "Vehiculos") {
                IOTReports = []//res.res.report;
                filteredIOTReports = []//res.res.report;
            }

            actualizarLoader("contentboxloader");
        }else{
            console.log(res.error)
            addcontentbox.appendChild(createTable([]));
            actualizarLoader("contentboxloader");
        }
    } catch (error) {
        console.log(error)
        addcontentbox.appendChild(createTable([]));
        actualizarLoader("contentboxloader");
    }
}
//"albertoarecohomingdiolipesodestetofarolarigeofangitis@gmail.com"
var detail = async (str)=>{
    var data = JSON.parse(str);
    removeaddcontentbox();
    actualizarLoader("contentboxloader");

    // actualizar options for select 
    await actualizaroptionsforselect(data.id)

    var h2 = data.id;

    var button1 = "Actualizar";
    var button2 = "Eliminar";
    var button4 = "Cancelar";
    var contentboxactionheader = creatediv("contentboxactionheader");
        var contentboxtreepath = creatediv("contentboxtreepath");
        var contenboxheaderactions = creatediv("contenboxheaderactions");
            var headerinfo = creatediv("headerinfo");
                var contentheaderinfoh2 = createh2("contentheaderinfoh2", h2);
            headerinfo.appendChild(contentheaderinfoh2);
            var headeractions = creatediv("headeractions");
                var temp = {id: data.id, item: data.item, option: "actualizar"};
                var str = JSON.stringify(temp);
                var actualizar = createbutton("actualizarbtn",button1);
                actualizar.setAttribute("onclick", "create_actualizar_eliminar('" + str + "')");
                var remove = createbutton("eliminarbtn", button2);
                temp = {id: data.id, item: data.item, option: "eliminar"};
                str = JSON.stringify(temp);
                remove.setAttribute("onclick", "create_actualizar_eliminar('" + str + "')");
            if(data.id != "Alertas") headeractions.appendChild(actualizar);
            if(data.id != "Alertas") headeractions.appendChild(remove);
        contenboxheaderactions.appendChild(headerinfo);
        contenboxheaderactions.appendChild(headeractions);
    contentboxactionheader.appendChild(contentboxtreepath);
    contentboxactionheader.appendChild(contenboxheaderactions);
    addcontentbox.appendChild(contentboxactionheader);
    addcontentbox.appendChild(createTableForCRUD(data.id, "visualizar", str));

    var bottomactions = creatediv("bottomactions");
        var cancel = createbutton("cancelbtn", button4);
        cancel.setAttribute("onclick", "cancel('" + data.id + "')");
    bottomactions.appendChild(cancel);
    addcontentbox.appendChild(bottomactions);

    if(data.id == "Vehiculos"){

        if(!statefiltroReporte){
            try {// obtiene el reporte de el vehiculo seleccionado
                var payload = { id : data.item["PLACA"]}
                var res = await postJsonData(payload, "reporte");
                console.log("reporte de ",payload ," : ",res)
                filteredIOTReports = res["result"]
                
            } catch (error) {
                console.log(error)
            }
        }else{
            statefiltroReporte = false; // para la proxima recarga vuelva a la normalidad
        }

        removeaddreportbox();
        var addreportbox = document.getElementById("addreportbox");
        var h2filter = "IoT Reports";
        var buttonfilter = "Filter";
        var reportboxactionheader = creatediv("reportboxactionheader");
        var reportboxtreepath = creatediv("reportboxtreepath");
        var reportboxheaderactions = creatediv("reportboxheaderactions");
            var reportheaderinfo = creatediv("reportheaderinfo");
                var reportheaderinfoh2 = createh2("reportheaderinfoh2", h2filter);
                reportheaderinfo.appendChild(reportheaderinfoh2);
            var reportheaderactions = creatediv("reportheaderactions");
                var filter = createbutton("filterbtn", buttonfilter);
                filter.setAttribute("onclick", "filterVisualizar('" + str + "')");
            reportheaderactions.appendChild(filter);
        reportboxheaderactions.appendChild(reportheaderinfo);
        reportboxheaderactions.appendChild(reportheaderactions);
        reportboxactionheader.appendChild(reportboxtreepath);
        reportboxactionheader.appendChild(reportboxheaderactions);
        addreportbox.appendChild(reportboxactionheader);

        if(filterVisualizarFlag == 0){
            addreportbox.appendChild(createTable(filteredIOTReports, "IOTReport"));
        }else{
            filterVisualizarFlag = 0;
            filter.classList.add("displayoff");
            var temp = JSON.stringify({item: filterOption});
            addreportbox.appendChild(createTableForCRUD("IOTFilterItem", "actualizar", temp));

            var bottomactions = creatediv("bottomactions");
                var filterConfirm = createbutton("filterConfirmbtn", "Filter");
                filterConfirm.setAttribute("onclick", "filterConfirm('" + str + "')");
                var filterCancelar = createbutton("filterCancelarbtn", "Cancelar");
                filterCancelar.setAttribute("onclick", "filterCancelar('" + str + "')");
            bottomactions.appendChild(filterConfirm);
            bottomactions.appendChild(filterCancelar);
            addreportbox.appendChild(bottomactions);
        }
        
    }
    actualizarLoader("contentboxloader");
    
}

var create_actualizar_eliminar = async (str)=>{
    var data = JSON.parse(str);
    // console.log("create_actualizar_eliminar===========", data);
    removeaddcontentbox();
    removeaddreportbox();
    actualizarLoader("contentboxloader");
    // actualizar options for select 
    await actualizaroptionsforselect(data.id)

    var button1 = "Actualizar";
    var button2 = "Eliminar";

    var h2 = "New " + data.id;
    if(data.option == "actualizar") h2 = "Actualizar " + data.id;
    if(data.option == "eliminar") h2 = "Eliminar " + data.id;
    var button3 = "Guardar";
    if(data.option == "eliminar") button3 = "ACEPTAR";
    var button4 = "Cancelar";

    var contentboxactionheader = creatediv("contentboxactionheader");
        var contentboxtreepath = creatediv("contentboxtreepath");
        var contenboxheaderactions = creatediv("contenboxheaderactions");
            var headerinfo = creatediv("headerinfo");
                var contentheaderinfoh2 = createh2("contentheaderinfoh2",h2);
            headerinfo.appendChild(contentheaderinfoh2);
            var headeractions = creatediv("headeractions");
                var temp = {id: data.id, item: data.item, option: "actualizar"};
                var str = JSON.stringify(temp);
                var actualizar = createbutton("actualizarbtn",button1);
                actualizar.setAttribute("onclick", "create_actualizar_eliminar('" + str + "')");
                var remove = createbutton("eliminarbtn", button2);
                temp = {id: data.id, item: data.item, option: "eliminar"};
                str = JSON.stringify(temp);
                remove.setAttribute("onclick", "create_actualizar_eliminar('" + str + "')");

                if(data.option == "actualizar") {
                    actualizar.classList.add("hover");
                    remove.classList.remove("hover");
                }else if(data.option == "eliminar") {
                    actualizar.classList.remove("hover");
                    remove.classList.add("hover");
                }
            if(data.id != "Alertas") headeractions.appendChild(actualizar);
            if(data.id != "Alertas") headeractions.appendChild(remove);
        contenboxheaderactions.appendChild(headerinfo);
        contenboxheaderactions.appendChild(headeractions);
    contentboxactionheader.appendChild(contentboxtreepath);
    contentboxactionheader.appendChild(contenboxheaderactions);
    addcontentbox.appendChild(contentboxactionheader);

    if(data.option == "create"){
        addcontentbox.appendChild(createTableForCRUD(data.id, "create",""));
        actualizar.classList.add("displayoff");
        remove.classList.add("displayoff");
    } else if(data.option == "eliminar") {
        addcontentbox.appendChild(createTableForCRUD(data.id, "visualizar", str));
    }else {
        addcontentbox.appendChild(createTableForCRUD(data.id, "actualizar", str));
    }

    var bottomactions = creatediv("bottomactions");
    var save = createbutton("savebtn", button3);
    if(data.option == "create"){
        save.setAttribute("onclick", "save('" + data.id + "' , '" + "" + "')");
    }else if(data.option == "actualizar"){
        save.setAttribute("onclick", "save('" + data.id + "' , '" + data.item["id"] + "')");
    }else{
        save.setAttribute("onclick", "remove('" + data.id + "' , '" + data.item["id"] + "')");
    }
    
    var cancel = createbutton("savebtn", button4);
    cancel.setAttribute("onclick", "cancel('" + data.id + "')");
    bottomactions.appendChild(save);
    bottomactions.appendChild(cancel);
    addcontentbox.appendChild(bottomactions);
    actualizarLoader("contentboxloader");

}

var actualizaroptionsforselect = async (id)=>{
    var payload = { id : id}
    try {
        var res = await postJsonData(payload, "actualizaroptionsforselect");
        console.log(res);
        if(res.hasOwnProperty('optionForSelect') ){
            var keys = Object.keys(res["optionForSelect"])
            keys.forEach((key, index)=>{
                for(var i = 0; i< res["optionForSelect"][key].length;i++){
                    res["optionForSelect"][key][i] = res["optionForSelect"][key][i]
                }
                //console.log(res["optionForSelect"][key])
                optionForSelect[key] = res["optionForSelect"][key]
            });
            console.log("optionForSelect ",optionForSelect) 
        }
    } catch (error) {
        console.log("error al cargar actualizaroptionsforselect: "+error)
    }
}

var redirectVisualizar = async(str)=>{
    var data = JSON.parse(str);
    key = data.key
    id = data.id
    if(key == "id_tipodevehiculo"){
        var payload = { id : data.id}
        var res = await postJsonData(payload, "gettipodevehiculosbyId");
        if(res.result.length > 0 ){
            var str = JSON.stringify({item: res.result[0], id: "Tiposdevehiculos"});
            detail(str) 
        }
    }else if(key == "PLACA_DE_VEHICULO"){
        var payload = { placa : data.id}
        var res = await postJsonData(payload, "getVEHICULO_BY_PLACA_DE_VEHICULO");
        if(res.result.length > 0 ){
            var str = JSON.stringify({item: res.result[0], id: "Vehiculos"});
            detail(str) 
        }
    }else if(key == "id_rutinademantenimiento"){
        var payload = { id : data.id}
        var res = await postJsonData(payload, "getRutinademantenimientobyid");
        if(res.result.length > 0 ){
            var str = JSON.stringify({item: res.result[0], id: "RutinasDeMantenimiento"});
            detail(str) 
        }
    }else if(key == "CORREO_DE_USUARIO"){
        var payload = { correo : data.id}
        var res = await postJsonData(payload, "getUSUARIO_BY_CORREO");
        if(res.result.length > 0 ){
            var str = JSON.stringify({item: res.result[0], id: "Usuarios"});
            detail(str) 
        }

    } 
}

function filterVisualizar(str) {
    filterVisualizarFlag = 1;
    // console.log("filtervisualizar", str);
    detail(str);
}

var filterConfirm = async(str)=>{
    var confirmfields = dataVariables["IOTFilterItem"];    
    confirmfields.forEach((field, index) => {
        var content = document.getElementsByClassName(field + "-input")[0];
        filterOption[field] = content.value;
    });
    console.log("confirmfields", filterOption);
    await filterData(filterOption,str);
    detail(str);
}

var filterData = async(filterOption,str)=>{
    var data = JSON.parse(str);
    // FECHAINICIAL: "", FECHAFINAL: "", Status: ""
    
    try {// obtiene el reporte de el vehiculo seleccionado
        var temp = [];
        var start, end, date, placa;

        placa = data.item["PLACA"]
        d = new Date(filterOption["FECHAINICIAL"]); 
        start = d.getFullYear() + "-" + (d.getMonth()+1) +"-"+ d.getUTCDate() +" "+ d.getHours()+":"+d.getMinutes()+":"+d.getSeconds() 
        d = new Date(filterOption["FECHAFINAL"]);
        end = d.getFullYear() + "-" + (d.getMonth()+1) +"-"+ d.getUTCDate() +" "+ d.getHours()+":"+d.getMinutes()+":"+d.getSeconds() 
        state = filterOption["ESTADO_DE_VEHICULO"]
        
        var payload = { PLACA_DE_VEHICULO: placa, ESTADO_DE_VEHICULO : state, FECHAINICIAL:start, FECHAFINAL:end}
        var res = await postJsonData(payload, "reportefiltro");
        console.log("reporte de ",payload ," : ",res)
        filteredIOTReports = res["result"]
        statefiltroReporte = true; // indicara que se realizo un filtro
    } catch (error) {
        console.log(error)
    }
}

function filterCancelar(str) {
    // console.log("filterCancelar", str);
    detail(str);
}

var save = async (id, data_id)=> {
    var savefields = dataVariables[id];    
    var savedata = {};
    savefields.forEach((field, index) => {
        var content = document.getElementsByClassName(field + "-input")[0];
        savedata[field] = content.value;
        
    });
    savedata["id"] = data_id;
    // console.log("savedata", savedata);
    
    var res = await postJsonDataForWrite(savedata, id);

    // console.log("res", res);
    if(res.success == true) {
        sidebarnavelement(id);
    } else{
        alert("there are some errors!");
    } 
}

var remove = async (id, data_id)=> {
    // console.log("eliminardata", id + ":" + data_id)
    var eliminardata = {id: data_id}
    var res = await postJsonDataForEliminar(eliminardata, id);
    // console.log("res", res);
    if(res.success == true) {
        sidebarnavelement(id);
    } else{
        alert("there are some errors!");
    } 

}

function cancel(id){
    sidebarnavelement(id);
}

var actualizarLogindata = (login)=>{
    document.getElementById("userboxemail").innerHTML = login.correo 
    document.getElementById("userboxrol").innerHTML =  String(login.rol).toLowerCase()
}

var isValidJSON = (str)=>{
    try {
        JSON.parse(string);
        return true;
    } catch (e) {
        return false;
    }
}

var initVisualizar = ()=>{
    actualizarLoader("sidebarloader");
    fetch(host+"/api/homesidebar").then(response => {
        if(!response.ok){
            throw Error("Error");
        }
        return response.json();
    }).then(data => {
        actualizarLogindata(data.login)
        if(!data.error){
            data.res.forEach((item, index)=>{
                document.getElementById("sidebarnav").appendChild(createli(item.content,item.id,false));
            });
        }else{
            document.getElementById("sidebarnav").appendChild(createli("error","error",true));
        }
        actualizarLoader("sidebarloader");
    }).catch(error => {
        console.log(error);
        document.getElementById("sidebarnav").appendChild(createli("error","error",true));
        actualizarLoader("sidebarloader");
        location.reload();
    });

    actualizarLoader("contentboxloader");
    fetch(host+"/api/dataTypes").then(response => {
        if(!response.ok){
            throw Error("Error");
        }
        return response.json();
    }).then(res => {
        dataLabels = res.dataLabels;
        dataVariables = res.dataVariables;
        sidebarnavelement( "Usuarios");
        actualizarLoader("contentboxloader");
    }).catch(error => {
        console.log(error);
        location.reload();
        actualizarLoader("contentboxloader");

    });
};
// inicializa la lista de la barra de direcciones
initVisualizar(); 
/** cuando se presiona un elemento de 
 * la barra de direcciones donde 
 * el usuario puede navegar , permitiendo
 * hacer carga de la visualizacion de dicha 
 * seleccion 
 * */


