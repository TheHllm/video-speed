import { setVideoSpeedOnPage } from '/functions.mjs';
import {loadSettings} from '/functions.mjs';
import {Settings} from '/functions.mjs';

window.onload = function (){
    //set the number of numInput
    const numInput = document.getElementById("numInput");
    const enabledChk = document.getElementById('enabled');
    //Get the previous speed from local storage
    let settings = loadSettings();
    let speed = settings.getActualSpeed();
    numInput.value = settings.speed;
    enabledChk.checked = settings.enabled;
    if(speed != 1){
        setVideoSpeedOnPage(settings);
    }

    numInput.addEventListener('input', function (){setVideoSpeedOnPage(new Settings(numInput.value, enabledChk.checked));});
    enabledChk.addEventListener('input', function (){setVideoSpeedOnPage(new Settings(numInput.value, enabledChk.checked));});
}

