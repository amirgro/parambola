chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const sendNewIconEvent = () => chrome.runtime.sendMessage({newIcon: document.location.href.includes('obAbtest') ? 'profiles/fms/fms.png' : 'profiles/fms/smartfeed.png'});// TODO get from profile config
  if (request.message === 'TabUpdated') {
    if (document.readyState === 'complete') {
      sendNewIconEvent();
    } else {
      window.addEventListener("load", sendNewIconEvent);
    }
  }
})