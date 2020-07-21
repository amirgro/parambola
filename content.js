chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {debugger;
    chrome.runtime.sendMessage({newIcon: document.location.href.includes('obAbtest') ? 'fms.png' : 'smartfeed.png'});
  }
})