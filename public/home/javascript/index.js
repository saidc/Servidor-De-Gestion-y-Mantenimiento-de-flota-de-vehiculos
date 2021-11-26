var host = "http://127.0.0.1:3000";//"https://fast-chamber-47171.herokuapp.com:/"
print(window.location.hostname)
print(window.location.href)
var payload = {
    pageNo: 0, count: 10
};
var filterViewFlag = 0;
var filterOption = {InitialDateTime: "", FinalDateTime: "", Status: "All"};

//inicializa evento del check burger
burgercheckbox();

//post request 
var postJsonData = async (jsonObject, id)=>{
    const response = await fetch(host+"/api/" + id, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonObject)
    });
    return await response.json();
}

var postJsonDataForWrite = async (jsonObject, id)=>{
    const response = await fetch(host+"/api/write" + id, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonObject)
    });
    return await response.json();
}

var postJsonDataForDelete = async (jsonObject, id)=>{
    const response = await fetch(host+"/api/delete" + id, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonObject)
    });
    return await response.json();
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
    updateLoader("contentboxloader");
    
    var addcontentbox = document.getElementById("addcontentbox");
    try {
        var res = await postJsonData(payload, id);
        if(!(res.error )){
            var h2 = res.res.name;
            var numusers = res.res.num;
            var button1 = "Create new";
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
                        createnew.setAttribute("onclick", "create_update_delete('" + str + "')");
                    if(id != "Alerts") headeractions.appendChild(createnew);
                contenboxheaderactions.appendChild(headerinfo);
                contenboxheaderactions.appendChild(headeractions);
            contentboxactionheader.appendChild(contentboxtreepath);
            contentboxactionheader.appendChild(contenboxheaderactions);
            addcontentbox.appendChild(contentboxactionheader);

            var tablewrapper = creatediv("tablewrapper");
            tablewrapper.appendChild(createTable(res.res.res, id))
            addcontentbox.appendChild(tablewrapper);

            if(res.res.name == "Vehicles") {
                IOTReports = res.res.report;
                filteredIOTReports = res.res.report;
                console.log("IOTReports", IOTReports);
            }
            updateLoader("contentboxloader");
        }else{
            addcontentbox.appendChild(createTable([]));
            updateLoader("contentboxloader");
        }
    } catch (error) {
        addcontentbox.appendChild(createTable([]));
        updateLoader("contentboxloader");
    }
}

var detail = async (str)=>{ 
    var data = JSON.parse(str);
    removeaddcontentbox();
    updateLoader("contentboxloader");

    var h2 = data.id;
    var button1 = "Update";
    var button2 = "Delete";
    var button4 = "Cancel";
    var contentboxactionheader = creatediv("contentboxactionheader");
        var contentboxtreepath = creatediv("contentboxtreepath");
        var contenboxheaderactions = creatediv("contenboxheaderactions");
            var headerinfo = creatediv("headerinfo");
                var contentheaderinfoh2 = createh2("contentheaderinfoh2", h2);
            headerinfo.appendChild(contentheaderinfoh2);
            var headeractions = creatediv("headeractions");
                var temp = {id: data.id, item: data.item, option: "update"};
                var str = JSON.stringify(temp);
                var update = createbutton("updatebtn",button1);
                update.setAttribute("onclick", "create_update_delete('" + str + "')");
                var remove = createbutton("deletebtn", button2);
                temp = {id: data.id, item: data.item, option: "delete"};
                str = JSON.stringify(temp);
                remove.setAttribute("onclick", "create_update_delete('" + str + "')");
            if(data.id != "Alerts") headeractions.appendChild(update);
            if(data.id != "Alerts") headeractions.appendChild(remove);
        contenboxheaderactions.appendChild(headerinfo);
        contenboxheaderactions.appendChild(headeractions);
    contentboxactionheader.appendChild(contentboxtreepath);
    contentboxactionheader.appendChild(contenboxheaderactions);
    addcontentbox.appendChild(contentboxactionheader);
    addcontentbox.appendChild(createTableForCRUD(data.id, "view", str));

    var bottomactions = creatediv("bottomactions");
        var cancel = createbutton("cancelbtn", button4);
        cancel.setAttribute("onclick", "cancel('" + data.id + "')");
    bottomactions.appendChild(cancel);
    addcontentbox.appendChild(bottomactions);

    if(data.id == "Vehicles"){
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
                filter.setAttribute("onclick", "filterView('" + str + "')");
            reportheaderactions.appendChild(filter);
        reportboxheaderactions.appendChild(reportheaderinfo);
        reportboxheaderactions.appendChild(reportheaderactions);
        reportboxactionheader.appendChild(reportboxtreepath);
        reportboxactionheader.appendChild(reportboxheaderactions);
        addreportbox.appendChild(reportboxactionheader);

        if(filterViewFlag == 0){
            
            addreportbox.appendChild(createTable(filteredIOTReports, "IOTReport"));
        }else{
            filterViewFlag = 0;
            filter.classList.add("displayoff");
            var temp = JSON.stringify({item: filterOption});
            addreportbox.appendChild(createTableForCRUD("IOTFilterItem", "update", temp));

            var bottomactions = creatediv("bottomactions");
                var filterConfirm = createbutton("filterConfirmbtn", "Filter");
                filterConfirm.setAttribute("onclick", "filterConfirm('" + str + "')");
                var filterCancel = createbutton("filterCancelbtn", "Cancel");
                filterCancel.setAttribute("onclick", "filterCancel('" + str + "')");
            bottomactions.appendChild(filterConfirm);
            bottomactions.appendChild(filterCancel);
            addreportbox.appendChild(bottomactions);
        }
        

    }
    updateLoader("contentboxloader");
}

var create_update_delete = async (str)=>{
    var data = JSON.parse(str);
    console.log("create_update_delete===========", data);
    removeaddcontentbox();
    removeaddreportbox();
    updateLoader("contentboxloader");

    var button1 = "Update";
    var button2 = "Delete";

    var h2 = "New " + data.id;
    if(data.option == "update") h2 = "Update " + data.id;
    if(data.option == "delete") h2 = "Delete " + data.id;
    var button3 = "Save";
    if(data.option == "delete") button3 = "OK";
    var button4 = "Cancel";

    var contentboxactionheader = creatediv("contentboxactionheader");
        var contentboxtreepath = creatediv("contentboxtreepath");
        var contenboxheaderactions = creatediv("contenboxheaderactions");
            var headerinfo = creatediv("headerinfo");
                var contentheaderinfoh2 = createh2("contentheaderinfoh2",h2);
            headerinfo.appendChild(contentheaderinfoh2);
            var headeractions = creatediv("headeractions");
                var temp = {id: data.id, item: data.item, option: "update"};
                var str = JSON.stringify(temp);
                var update = createbutton("updatebtn",button1);
                update.setAttribute("onclick", "create_update_delete('" + str + "')");
                var remove = createbutton("deletebtn", button2);
                temp = {id: data.id, item: data.item, option: "delete"};
                str = JSON.stringify(temp);
                remove.setAttribute("onclick", "create_update_delete('" + str + "')");

                if(data.option == "update") {
                    update.classList.add("hover");
                    remove.classList.remove("hover");
                }else if(data.option == "delete") {
                    update.classList.remove("hover");
                    remove.classList.add("hover");
                }
            if(data.id != "Alerts") headeractions.appendChild(update);
            if(data.id != "Alerts") headeractions.appendChild(remove);
        contenboxheaderactions.appendChild(headerinfo);
        contenboxheaderactions.appendChild(headeractions);
    contentboxactionheader.appendChild(contentboxtreepath);
    contentboxactionheader.appendChild(contenboxheaderactions);
    addcontentbox.appendChild(contentboxactionheader);

    if(data.option == "create"){
        addcontentbox.appendChild(createTableForCRUD(data.id, "create",""));
        update.classList.add("displayoff");
        remove.classList.add("displayoff");
    } else if(data.option == "delete") {
        addcontentbox.appendChild(createTableForCRUD(data.id, "view", str));
    }else {
        addcontentbox.appendChild(createTableForCRUD(data.id, "update", str));
    }

    var bottomactions = creatediv("bottomactions");
        var save = createbutton("savebtn", button3);
        if(data.option == "create"){
            save.setAttribute("onclick", "save('" + data.id + "' , '" + "" + "')");
        }else if(data.option == "update"){
            save.setAttribute("onclick", "save('" + data.id + "' , '" + data.item["Id"] + "')");
        }else{
            save.setAttribute("onclick", "remove('" + data.id + "' , '" + data.item["Id"] + "')");
        }
        
        var cancel = createbutton("savebtn", button4);
        cancel.setAttribute("onclick", "cancel('" + data.id + "')");
    bottomactions.appendChild(save);
    bottomactions.appendChild(cancel);
    addcontentbox.appendChild(bottomactions);
    updateLoader("contentboxloader");
}

function filterView(str) {
    filterViewFlag = 1;
    console.log("filterview", str);
    detail(str);
}

function filterConfirm(str) {
    var confirmfields = dataVariables["IOTFilterItem"];    
    confirmfields.forEach((field, index) => {
        var content = document.getElementsByClassName(field + "-input")[0];
        filterOption[field] = content.value;
    });
    console.log("confirmfields", filterOption);
    filterData(filterOption);
    detail(str);
}

function filterData(filterOption) {
    
    // InitialDateTime: "", FinalDateTime: "", Status: ""
    var temp = [];
    var start, end, date;
    start = new Date(filterOption["InitialDateTime"]).getTime();
    end = new Date(filterOption["FinalDateTime"]).getTime();

    IOTReports.forEach((item, index) => {
        date = new Date(item["Date"]).getTime();

        console.log(start, ":", end, ":", date, ":", isNaN)

        if((start <= date || isNaN(start)) 
        && (end >= date || isNaN(end)) 
        && (filterOption["Status"] == item["Status"] || filterOption["Status"] == "All")){
            temp.push(item);
        } 
    });
    filteredIOTReports = temp;
}

function filterCancel(str) {
    console.log("filterCancel", str);
    detail(str);
}

var save = async (id, data_id)=> {
    var savefields = dataVariables[id];    
    var savedata = {};
    savefields.forEach((field, index) => {
        var content = document.getElementsByClassName(field + "-input")[0];
        savedata[field] = content.value;
    });
    savedata["Id"] = data_id;
    console.log("savedata", savedata);
    
    var res = await postJsonDataForWrite(savedata, id);
    console.log("res", res);
    if(res.success == true) {
        sidebarnavelement(id);
    } else{
        alert("there are some errors!");
    } 

}
var remove = async (id, data_id)=> {
    console.log("deletedata", id + ":" + data_id)
    var deletedata = {Id: data_id}
    var res = await postJsonDataForDelete(deletedata, id);
    console.log("res", res);
    if(res.success == true) {
        sidebarnavelement(id);
    } else{
        alert("there are some errors!");
    } 

}

function cancel(id){
    sidebarnavelement(id);
}

var initView = ()=>{
    updateLoader("sidebarloader");
    fetch(host+"/api/homesidebar").then(response => {
        if(!response.ok){
            throw Error("Error");
        }
        return response.json();
    }).then(data => {
        if(!data.error){
            data.res.forEach((item, index)=>{
                document.getElementById("sidebarnav").appendChild(createli(item.content,item.id,false));
            });
        }else{
            document.getElementById("sidebarnav").appendChild(createli("error","error",true));
        }
        updateLoader("sidebarloader");
    }).catch(error => {
        document.getElementById("sidebarnav").appendChild(createli("error","error",true));
        updateLoader("sidebarloader");
    });

    updateLoader("contentboxloader");
    fetch(host+"/api/dataTypes").then(response => {
        if(!response.ok){
            throw Error("Error");
        }
        return response.json();
    }).then(res => {
        dataLabels = res.dataLabels;
        dataVariables = res.dataVariables;
        sidebarnavelement( "Users");
        updateLoader("contentboxloader");
    }).catch(error => {
        updateLoader("contentboxloader");
    });
};
// inicializa la lista de la barra de direcciones
initView(); 
/** cuando se presiona un elemento de 
 * la barra de direcciones donde 
 * el usuario puede navegar , permitiendo
 * hacer carga de la visualizacion de dicha 
 * seleccion 
 * */


