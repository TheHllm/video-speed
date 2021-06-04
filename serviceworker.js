function setSpeedInWindowContext() {
    chrome.storage.sync.get(['speed'], function (result) {
        const videos = document.getElementsByTagName('video');
        for (const v of videos) {
            v.playbackRate = result.speed;
        }
    });
}

function setSpeedOnAllTabs(speed){
    chrome.tabs.query({}, function (tabs) {
        for(const tab of tabs) {
            if (!tab.url.startsWith("chrome://")) {
                try {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tab.id },
                            function: setSpeedInWindowContext,
                        },
                    );
                } catch { }
            }
        }
    });
}

function setSpeed(speed){
    chrome.storage.sync.set({ 'speed': speed }, setSpeedOnAllTabs.bind(this, speed));
}


chrome.runtime.onMessage.addListener(function (msg) {
    if (msg) {
        if (typeof msg.type === 'string') {
            switch (msg.type) {
                case 'speed':
                    setSpeed(msg.value);
                    break;
            }
            return;
        }
    }
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    console.log(tabId);
    if (changeInfo.status == 'complete') {
        chrome.scripting.executeScript({target:{tabId: tabId}, function: setSpeedInWindowContext});
    }
});