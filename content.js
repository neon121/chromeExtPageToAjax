chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action && (request.action == "getDOM")) {
            sendResponse(document.documentElement.outerHTML);
        }
    }
);