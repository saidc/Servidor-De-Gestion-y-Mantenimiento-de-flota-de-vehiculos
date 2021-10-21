// creacion de un elemento li de html
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
    
var createTable = (list)=>{
    var table = document.createElement('table');
    table.setAttribute("data-table", "col-two");
    console.log("user list:",list);
    if(list.length > 0){
        var data = Object.keys(list[0]);
        console.log(data);
        var tr = document.createElement('tr');
        data.forEach((item, index)=>{
            console.log(item);
            var th = document.createElement('th');
            th.innerHTML= item;
            tr.appendChild(th);
        });
        
        var thead = document.createElement('thead');
        thead.appendChild(tr);
        
        var tbody = document.createElement('tbody');
        
        list.forEach((item, index)=>{
            var tr = document.createElement('tr');
            for(var i = 0; i< data.length; i++){
                var td = document.createElement('td');
                td.setAttribute("data-heading", data[i]);
                td.innerHTML= item[data[i]];
                console.log(data[i],item[data[i]]);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
        
        
        table.appendChild(thead);
        table.appendChild(tbody);
        
    }
    return table;
}
