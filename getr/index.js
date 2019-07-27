const clickCallback = async (event) => {
	const sendEvent = (tabs, clickedButton) => {
		browser.tabs.sendMessage(tabs[0].id, {
			"clickedButton": clickedButton
		})	
	}
	const tab = await browser.tabs.query({active: true, currentWindow: true})
	if(event.target.classList.contains("download")) {
		sendEvent(tab, "download")
	} else if(event.target.classList.contains("telegram")) {
		sendEvent(tab, "telegram")
	} else if(event.target.classList.contains("settings")) {
		let settingsWindow = browser.windows.create({
			type: "detached_panel",
			url: browser.runtime.getURL("extensionPage/settings.html"),
			width: 600,
			height: 300,
			titlePreface: "Getr Settings"
		})
	}
}

const telegramMessegeBuilder = (directImgUrl, srcUrl) => {
	const base = "tg://msg_url?url="
	const textBase = "&text="
	const sourceText = "%0A%0ASource:%20"
	const final = base + directImgUrl + textBase + sourceText + srcUrl
	return final
}

const contentScriptMessageHandler = async (m) => {
	if(m.clickedButton === "download") {
		const download = await browser.downloads.download({
			url: m.imgUrl,
			saveAs: true,
			filename: m.fileName
		})
	} else if(m.clickedButton === "telegram") {
		window.location.href = telegramMessegeBuilder(m.imgUrl, m.source)
	}
}

browser.tabs.executeScript({file: "/content_scripts/content_script.js"})
browser.runtime.onMessage.addListener(contentScriptMessageHandler)
document.addEventListener("click", clickCallback)