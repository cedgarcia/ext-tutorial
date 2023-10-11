console.log("Hello World!");

ext.runtime.onEnable.addListener(() => {
  console.log("Extension Enabled");
});

let myTab = null;
let myWindow = null;
let myWebview = null;

ext.runtime.onExtensionClick.addListener(async () => {
  console.log("Extension Clicked");
  if (myTab) return;
  myTab = await ext.tabs.create({
    text: "Tutorial Tab",
  });
  myWindow = await ext.windows.create();
  const myWindowSize = await ext.windows.getContentSize(myWindow.id);
  myWebview = await ext.webviews.create({
    window: myWindow,
    bounds: {
      x: 0,
      y: 0,
      width: myWindowSize.width,
      height: myWindowSize.height,
    },
    autoResize: { width: true, height: true },
  });
  await ext.webviews.loadURL(myWebview.id, "https://www.ext.store");
});

ext.tabs.onClickedClose.addListener(async () => {
  if (myTab && myTab.id) {
    await ext.tabs.remove(myTab.id);
    myTab = null;
  }
  if (myWindow && myWindow.id) {
    await ext.windows.remove(myWindow.id);
    myWindow = null;
  }
});

ext.tabs.onClicked.addListener(async () => {
  if (myWindow && myWindow.id) {
    await ext.windows.restore(myWindow.id);
    await ext.windows.focus(myWindow.id);
  }
});

// listen for window close events
ext.windows.onClosed.addListener(async () => {
  if (myTab && myTab.id) {
    await ext.tabs.remove(myTab.id);
    myTab = null;
  }
});
