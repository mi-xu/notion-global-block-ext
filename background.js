const notionUrl = /(https:\/\/www\.notion\.so\/)(.*#)(.*)/;
const notionBlockUrlToGlobal = (url) => {
  const m = url.match(notionUrl);
  return m ? `${m[1]}${m[3]}` : null;
};

function getClipboardText() {
  document.body.innerHTML = "";
  const textTarget = document.createElement("input");
  document.body.appendChild(textTarget);
  textTarget.focus();
  document.execCommand("paste");
  const text = textTarget.value;
  document.body.removeChild(textTarget);
  return text;
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg === "copy") {
    chrome.contextMenus.removeAll();
    const text = getClipboardText();
    const globalBlockUrl = notionBlockUrlToGlobal(text);
    if (globalBlockUrl) {
      chrome.contextMenus.create({
        id: "PASTE_NOTION_GLOBAL_BLOCK_URL",
        title: "Paste Global Block URL",
        contexts: ["editable"],
        documentUrlPatterns: ["https://*.notion.so/*"],
      });
      chrome.contextMenus.onClicked.addListener((_, tab) => {
        chrome.tabs.sendMessage(tab.id, globalBlockUrl);
      });
    }
  }
});
