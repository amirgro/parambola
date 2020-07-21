
const profile = localStorage.getItem('parambola-profile');

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo?.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {
      message: 'TabUpdated'
    });
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.sendMessage(tabId, {
    message: 'TabUpdated'
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.newIcon) {
    chrome.browserAction.setIcon({path: request.newIcon});
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  const fmsParams = '?obAbtest=9820-43007-43247&adnginmode=true&obTestMode=true&skipContextValidation=true';
  const isFMS = tab?.url.includes('obAbtest');
  if(isFMS) {
    chrome.browserAction.setIcon({path: 'smartfeed.png'});
    chrome.tabs.update(tab.id, {url: tab.url.replace(fmsParams, '')});
  } else {
    chrome.browserAction.setIcon({path: 'fms.png'});
    chrome.tabs.update(tab.id, {url: tab.url+fmsParams});
  }
});