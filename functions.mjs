const localStorageName = "speedup"

export function setVideoSpeedOnPage(speed, enabled){
    //Save the speed
    localStorage.setItem(localStorageName, speed);
    localStorage.setItem('enabled', enabled);
    //Send code to be executed in the tab
    speed = enabled ? speed : 1;
    chrome.tabs.executeScript({
        code:  getSpeedupCode(speed)
    });
}

export function setVideoSpeedOnPageLoad(tab){
    if(localStorage.getItem('enabled')==="true" || typeof localStorage.getItem('enabled') === 'undefined'){
        var speedUp = localStorage.getItem(localStorageName);
        var speed = speedUp ? speedUp : 1;
        if(speed != 1){
            chrome.tabs.executeScript(tab.id,{
                code: getSpeedupCode(speed),
                allFrames: true
            });
        }
    }
}

function getSpeedupCode(speed){
    return '\
    var videos = document.getElementsByTagName("video");\
    for(var i = 0; i < videos.length; i++){\
        var video = videos[i];\
        video.playbackRate = '+speed+';\
    }';

    /*
        var videos = document.getElementsByTagName("video");\
    if(document.location.hostname.includes("youtube") && videos.length > 0){\
        document.getElementsByClassName("more-button")[0].click();\
        setTimeout(function (){\
            var has=false;\
            var as = document.getElementById("meta-contents").getElementsByTagName("a");\
            for (var i = 0; i < as.length; i++) {\
                if(as[i].href == "https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ"){\
                    has = true;\
                }\
            }\
            if(has){\
                var videos = document.getElementsByTagName("video");\
                for(var i = 0; i < videos.length; i++){\
                    var video = videos[i];\
                    video.playbackRate = 1;\
                }\
            }\
        }, 1000);\
    }\
    */
}