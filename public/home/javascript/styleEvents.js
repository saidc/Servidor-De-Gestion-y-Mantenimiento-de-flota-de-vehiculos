var logoutbtn = document.getElementById("navbaropt");
document.getElementById("userboxlogoutbtn").addEventListener("click", function() {
    console.log(logoutbtn.style.display);
    if(logoutbtn.style.display == "none" || logoutbtn.style.display == "" ){
        logoutbtn.style.display = "inline-block";     
    }else{
        logoutbtn.style.display = "none";     
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
            //console.log("burger chequeado ");
        } else {
            sidebar.className = "sidebaroff";
            //console.log("burger no chequeado ");
            // Checkbox is not checked..
        }
    });
}
