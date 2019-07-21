(function() {
  	if (window.hasRun) {
		return;
	}
	const handleIncommingMessage = async (m) => {
		const img = document.getElementById("submissionImg")
		const split  = img.src.split('.')
		browser.runtime.sendMessage({
			"imgUrl": img.src,
			"fileName": split[split.length - 2] + '.' + split[split.length -1],
			"source": window.location.href,
			"clickedButton": m.clickedButton
		})
	}
	window.hasRun = true;
	browser.runtime.onMessage.addListener(handleIncommingMessage)
})()