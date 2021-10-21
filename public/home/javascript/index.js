var host = "http://127.0.0.1:3000";

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
    updateLoader("contentboxloader");
    var payload = {
        PosicionFila:0 ,NoFilas:10
    };
    var res = await postJsonData(payload,id);
    if(!res.error){
        var numusers = res.res.numusers;
        document.getElementById("contentbox").appendChild(createTable(res.res.users));
        updateLoader("contentboxloader");
    }else{
        document.getElementById("contentbox").appendChild(createTable([]));
        updateLoader("contentboxloader");
    }
    
}
