var logoutbtn = document.getElementById("navbaropt");
document.getElementById("userboxlogoutbtn").addEventListener("click", function() {
    console.log(logoutbtn.style.display);
    if(logoutbtn.style.display == "none" || logoutbtn.style.display == "" ){
        logoutbtn.style.display = "inline-block";     
    }else{
        logoutbtn.style.display = "none";     
    }
});

function updateLoader(id) {
    var t = document.getElementById(id);
    if(t.className == "loader on"){
    	t.className = "loader off";
    }else{
    	t.className = 'loader on';
    }
}
/*
document.querySelector( '.burger' ).addEventListener( 'click', function ( e ) {
    e.preventDefault;
    var sw = this.className === 'burger';
    this.className = sw ? 'burger on' : 'burger';
    var sidebar = document.getElementById("sidebar");
    var viewbox = document.getElementById("viewbox");
    if(sw){
        sidebar.style.display = "inline-block";
        sidebar.style.left= "0px";
        viewbox.style.marginLeft = "302px";
    }else{
        sidebar.style.display = "none";
        sidebar.style.left= "-300px";
        viewbox.style.marginLeft = "0px";
    }
});
*/
/*
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            console.log('style changed!');
            var sidebar = document.getElementById("sidebar");
            var viewbox = document.getElementById("viewbox");
            var burger = document.getElementById("burger");
            if((sidebar.style.display == "none"|| sidebar.style.display == "" ) && (burger.style.display == "none"|| burger.style.display == "" ) ){
                if(viewbox.style.marginLeft == "0px"){
                    sidebar.style.display = "inline-block";
                }
            }
        });    
    });

    var target = document.getElementById('sidebar');
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });
*/