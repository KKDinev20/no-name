//var width = window.innerWidth;

function openNav() {
    //if (width <= 700) {
    //  document.getElementById("sidenav").style.width = "100%";
    //} else {
      document.getElementById("sidenav").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    //}
    document.getElementById("menu-toggle").style.backgroundColor= "#94af97";
}
  
function closeNav() {
    //if (width <= 700) {
    //  document.getElementById("sidenav").style.width = "0";
    //} else {
      document.getElementById("sidenav").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
    //}
    document.getElementById("menu-toggle").style.backgroundColor= "#c6f1ca";
}