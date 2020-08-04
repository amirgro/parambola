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

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  const profile = localStorage.getItem('parambola-profile');
  if (request.newIcon) {
    const config = await getConfig();
    const isParamsIncluded = request.newIcon.url.includes(config.removeParamsString);
    chrome.browserAction.setIcon({
      path: `profiles/${profile}/${isParamsIncluded ? config.icons.paramsDiscluded : config.icons.paramsIncluded}`
    });
  }
});

chrome.browserAction.onClicked.addListener(async function(tab) {
  const profile = localStorage.getItem('parambola-profile');
  if(!profile) alert('Please select a profile by right clicking on parambola and going to "options"');

  const config = await getConfig();
  const params = config.params;
  const isParamsIncluded = tab?.url.includes(config.removeParamsString);
  if(isParamsIncluded) {
    const newUrl = tab.url.substring(0, tab.url.indexOf('?'))
    chrome.browserAction.setIcon({path: `profiles/${profile}/${config.icons.paramsIncluded}`});
    chrome.tabs.update(tab.id, {url: newUrl});
  } else {
    const firstChar = tab?.url.includes('?') ? '&' : '?';
    chrome.browserAction.setIcon({path: `profiles/${profile}/${config.icons.paramsDiscluded}`});
    chrome.tabs.update(tab.id, {url: `${tab.url}${firstChar}${params}`});
  }
});

const getConfig = () => {
  const profile = localStorage.getItem('parambola-profile');
  return new Promise(resolve => {
    chrome.runtime.getPackageDirectoryEntry(function(root) {
      root.getFile(`profiles/${profile}/config.json`, {}, function(fileEntry) {
        fileEntry.file(function(file) {
          var reader = new FileReader();
          reader.onloadend = function(e) {
            const config = JSON.parse(e.currentTarget.result);
            resolve(config);
          };
          reader.readAsText(file);
        });
      });
    });
  });
}