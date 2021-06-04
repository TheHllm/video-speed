export function setVideoSpeedOnPage(settings){
    saveSettings(settings)
    chrome.runtime.sendMessage({type:"speed", value: settings.getActualSpeed()});
}



export function saveSettings(settings){
    localStorage.setItem('settings',JSON.stringify(settings))
}

export function loadSettings(){
    return new Settings(localStorage.getItem('settings'));
}

export class Settings{
    constructor(speed, a){
        if(typeof speed === 'object' && speed != null){
            Object.assign(this, speed); // first argument is a object -> assign our functions
        }else if(typeof speed === 'string'){
            Object.assign(this, new Settings(JSON.parse(speed))); //assume first argument is json -> parse and assign
        }else{
            this.speed = typeof speed  === 'number'? speed: 1 ;
            this.enabled = typeof enabled.checked === 'boolean'? enabled.checked : true;
        }
    }
    getActualSpeed(){
        return this.enabled ? this.speed : 1;
    }
}