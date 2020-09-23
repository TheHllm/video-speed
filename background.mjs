import { setVideoSpeedOnPageLoad } from '/functions.mjs';
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        setVideoSpeedOnPageLoad(tab);
    }
});