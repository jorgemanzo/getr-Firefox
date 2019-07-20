const clickCallback = async (event) => {
	console.log("In Background Script: ", event.target)
	let sendEvent = (tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {
			"command": "download"
		})	
	}
	if(event.target.classList.contains("download")) {
		let tab = await browser.tabs.query({active: true, currentWindow: true})
		sendEvent(tab)
	}
}

const contentScriptMessageHandler = async (m) => {
	console.log("In BG Script, message from Content script: ", m)
	const download = await browser.downloads.download({
		url: m.imgUrl,
		saveAs: true,
		filename: m.fileName
	})
}

browser.tabs.executeScript({file: "/content_scripts/content_script.js"})
browser.runtime.onMessage.addListener(contentScriptMessageHandler)
document.addEventListener("click", clickCallback)

