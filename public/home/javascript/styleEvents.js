var logoutbtn = document.getElementById("navbaropt");

document.getElementById("userboxlogoutbtn").addEventListener("click", function() {
    // console.log( "hidden", document.getElementsByClassName("hidden-menu"));
    var hiddensymbol = document.getElementsByClassName("hidden-menu")
    if(logoutbtn.style.display == "none" || logoutbtn.style.display == "" ){
        logoutbtn.style.display = "inline-block";  
        for ( i=0; i<hiddensymbol.length; i++){
            hiddensymbol[i].classList.add("red");
        }
    }else{
        logoutbtn.style.display = "none";
        for ( i=0; i<hiddensymbol.length; i++){
            hiddensymbol[i].classList.remove("red");
        }
    }
});

window.addEventListener('click', function(e){   
    var checkbox = document.getElementById("burgercheckbox");
    var sidebar = document.getElementById("sidebar");
    if (!sidebar.contains(e.target) && !checkbox.contains(e.target) && checkbox.checked){
        // Clicked in box
        checkbox.checked = false;
        sidebar.className = "sidebaroff";
    }
    if(sidebar.contains(e.target) && !checkbox.contains(e.target) && !checkbox.checked){
        checkbox.checked = true;
        sidebar.className = "sidebaron";
    }
  });

var updateLoader = (id)=>{
    var t = document.getElementById(id);
    if(t.className == "loader on"){
    	t.className = "loader off";
    }else{
    	t.className = 'loader on';
    }
}

var burgercheckbox = ()=>{
    var checkbox = document.getElementById("burgercheckbox");
    var sidebar = document.getElementById("sidebar");
    checkbox.addEventListener( 'change', function() {
        if(this.checked) {
            // Checkbox is checked..
            sidebar.className = "sidebaron";
            //// console.log("burger chequeado ");
        } else {
            sidebar.className = "sidebaroff";
            //// console.log("burger no chequeado ");
            // Checkbox is not checked..
        }
    });
}

