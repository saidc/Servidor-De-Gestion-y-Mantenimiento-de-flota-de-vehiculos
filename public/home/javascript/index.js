var host = "http://127.0.0.1:3000";

//inicializa evento del check burger
burgercheckbox();

//post request 
var postJsonData = async (jsonObject,id)=>{
    const response = await fetch(host+"/api/"+id, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonObject)
    });
    return await response.json();
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
            console.log(data);
        }
        updateLoader("sidebarloader");
    }).catch(error => {
        document.getElementById("sidebarnav").appendChild(createli("error","error",true));
        console.log(error);
        updateLoader("sidebarloader");
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

var sidebarnavelement = async (id)=>{ 
    removeaddcontentbox();
    updateLoader("contentboxloader");
    var payload = {
        PosicionFila:0 ,NoFilas:10
    };
    var addcontentbox = document.getElementById("addcontentbox");
    try {
        var res = await postJsonData(payload,id);
        if(!(res.error )){
            var h2 = res.res.name;
            var numusers = res.res.num;
            var button1 = "create new";
            var button2 = "filter";
            var contentboxactionheader = createDiv("contentboxactionheader");
                var contentboxtreepath = createDiv("contentboxtreepath");
                var contenboxheaderactions = createDiv("contenboxheaderactions");
                    var headerinfo = createDiv("headerinfo");
                        var contentheaderinfoh2 = createh2("contentheaderinfoh2",h2);
                        var numerofcontent = createspan("numerofcontent",numusers);
                    headerinfo.appendChild(contentheaderinfoh2);
                    headerinfo.appendChild(numerofcontent);
                    var headeractions = createDiv("headeractions");
                        var createnew = createbutton("createnew",button1);
                        var filter = createbutton("filter",button2);
                    headeractions.appendChild(createnew);
                    headeractions.appendChild(filter);
                contenboxheaderactions.appendChild(headerinfo);
                contenboxheaderactions.appendChild(headeractions);
            contentboxactionheader.appendChild(contentboxtreepath);
            contentboxactionheader.appendChild(contenboxheaderactions);
            addcontentbox.appendChild(contentboxactionheader);
            addcontentbox.appendChild(createTable(res.res.res));
            updateLoader("contentboxloader");
        }else{
            addcontentbox.appendChild(createTable([]));
            updateLoader("contentboxloader");
        }
    } catch (error) {
        console.log(error);
        addcontentbox.appendChild(createTable([]));
        updateLoader("contentboxloader");
    }
}

var removeaddcontentbox = ()=>{
    var cbox = document.getElementById("addcontentbox");
    while (cbox.hasChildNodes()) {
        cbox.removeChild(cbox.childNodes[0]);
    }
}