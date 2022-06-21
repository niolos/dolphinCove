const defaultBtn = document.querySelector(".default-btn");
const customBtn = document.querySelector("#custom-btn");
const img = document.querySelector("#upimg");
let something  = document.querySelectorAll(".eventCard");



//OVERLAY FOR EACH ITERATION OF EVENTCARD
something.forEach((element)=>{
    element.addEventListener("click", change);
});


function change(){
    document.querySelector(".overlayForm").classList.toggle("active");
}
function defaultBtnActive(){
    console.log(defaultBtn);
    defaultBtn.click();
}
defaultBtn.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(){
        const result = reader.result;
        img.src = result;
    }
    reader.readAsDataURL(file);
    }
});