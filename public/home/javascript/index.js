var host = "http://127.0.0.1:3000";

var createli = (content,id, haserror)=>{
    var li = document.createElement('li');
    var div = document.createElement('div');
        div.classList.add("sidebarnavelement");
        if(!haserror){
            div.setAttribute("onclick", "sidebarnavelement('"+id+"')");
        }
    var i = document.createElement('i');
        i.innerHTML=content;
        i.classList.add("zmdi");
    div.appendChild(i);
    li.appendChild(div);
    return li;
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

var sidebarnavelement = (id)=>{
    updateLoader("contentboxloader");
    var payload = {
        a: 1,
        b: 2
    };
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );
    console.log("request to:",host+"/api/"+id);
    fetch(host+"/api/"+id,
    {
        method: "POST",
        body: data
    })
    .then(res=>{ return res.json(); })
    .then(data=>{ 
        updateLoader("contentboxloader");
        console.log(data);
    }).catch(error => {
        console.log(error);
        updateLoader("contentboxloader");
    });
}
