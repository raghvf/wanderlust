const btn = document.getElementById("userMenuBtn");
const menu = document.getElementById("userDropdown");

if(btn){
    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });

    window.addEventListener("click", (e)=>{
        if(!btn.contains(e.target)){
            menu.classList.add("hidden");
        }
    });
}