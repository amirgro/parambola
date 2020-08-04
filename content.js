chrome.runtime.onMessage.addListener(function (request) {debugger;
  const sendNewIconEvent = () => chrome.runtime.sendMessage({newIcon: {url: document.location.href}});
  if (request.message === 'TabUpdated') {
    if (document.readyState === 'complete') {
      sendNewIconEvent();
    } else {
      window.addEventListener("load", sendNewIconEvent);
    }
  }
})