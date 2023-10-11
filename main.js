let myTab = null;
let myWindow = null;

ext.runtime.onExtensionClick.addListener(async () => {
  console.log("Extension Clicked");
  if (myTab) return;
  myTab = await ext.tabs.create({
    text: "Tutorial Tab",
  });
  myWindow = await ext.windows.create();
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
