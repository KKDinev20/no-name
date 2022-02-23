function openNav() {
    if (window.innerWidth <= 700) {
      document.getElementById("nav").style.width = "100%";
    } else {
      document.getElementById("nav").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    }

    document.getElementById("menu-toggle").style.backgroundColor= "#94af97";
}

window.addEventListener("resize", openNav);

function closeNav() {
    if (window.innerWidth <= 700) {
      document.getElementById("nav").style.width = "0";
    } else {
      document.getElementById("nav").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
    }

    document.getElementById("menu-toggle").style.backgroundColor= "#c6f1ca";
}