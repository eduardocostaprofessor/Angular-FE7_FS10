// uso do jQuery
$(document).ready(function () {
    // todas as suas funções jQuery

    $(".btn-buy").click(function(){
        alert("Este produto não está disponível");
    });
    
});


function abreFechaMenu() {
    // navbar -tag nav
    let navbar = document.querySelector(".menu");
    navbar.classList.toggle("mostraEscondeMenu");
}