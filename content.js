document.addEventListener(
  "copy",
  () => {
    chrome.runtime.sendMessage("copy");
  },
  true
);

chrome.runtime.onMessage.addListener(async (globalBlockUrl) => {
  const cb = await navigator.clipboard.readText();
  await navigator.clipboard.writeText(globalBlockUrl);
  document.execCommand("paste");
  navigator.clipboard.writeText(cb);
});
