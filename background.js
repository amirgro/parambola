
// const profile = localStorage.getItem('parambola-profile');

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo?.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {
      message: 'TabUpdated'
    });
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.sendMessage(activeInfo.tabId, {
    message: 'TabUpdated'
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.newIcon) {
    chrome.browserAction.setIcon({path: request.newIcon});
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  const params = 'obAbtest=9820-43007-43247&adnginmode=true&obTestMode=true&skipContextValidation=true'; // TODO get from profile config
  const isFMS = tab?.url.includes('obAbtest');
  if(isFMS) {
    const newUrl = tab.url.replace(`?${params}`, '').replace(`&${params}`, '');
    chrome.browserAction.setIcon({path: 'profiles/fms/fms.png'});// TODO get from profile config
    chrome.tabs.update(tab.id, {url: newUrl});
  } else {
    const firstChar = tab?.url.includes('?') ? '&' : '?';
    chrome.browserAction.setIcon({path: 'profiles/fms/smartfeed.png'});// TODO get from profile config + remove from manifest
    chrome.tabs.update(tab.id, {url: `${tab.url}${firstChar}${params}`});
  }
});