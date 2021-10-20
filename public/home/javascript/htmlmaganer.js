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

