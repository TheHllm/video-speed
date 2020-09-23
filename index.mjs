import { setVideoSpeedOnPage } from '/functions.mjs';
const localStorageName = "speedup"


window.onload = function (){
    //set the number of numInput
    const numInput = document.getElementById("numInput");
    const enabledChk = document.getElementById('enabled');
    //Get the previous speed from local storage
    var speedUp = localStorage.getItem(localStorageName);
    numInput.value = speedUp ? speedUp : 1; //use speedUp or if null 1
    var enabled = localStorage.getItem('enabled');
    enabledChk.checked = typeof enabled === "undefined" ? true : enabled==="true";
    if(numInput.value != 1){
        setVideoSpeedOnPage(numInput.value, enabledChk.checked);
    }

    numInput.addEventListener('change', function (){setVideoSpeedOnPage(numInput.value, enabledChk.checked);});
    enabledChk.addEventListener('change', function (){setVideoSpeedOnPage(numInput.value, enabledChk.checked);});
}

