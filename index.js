function myBars() {
    let bars = document.querySelector("#bar");
    let nav = document.querySelector(".navigation");
    bars.onclick = function () {
        if (nav.style.right == "0%") {
            nav.style.right = "-50%";
            bars.src = "/img/menu.png"
        } else {
            nav.style.right = "0%";
            bars.src = "/img/x.png"
        }
        nav.classList.toggle("new")
    }

}
myBars()