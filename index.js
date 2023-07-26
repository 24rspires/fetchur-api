const p = document.getElementById("json-target");

const test = async () => {
	const fet = await fetch("https://hypixel-skyblock.fandom.com/wiki/Fetchur");
	const text = await fet.text();

	const root = HTMLParser.parse(text);

	console.log(root.getElementById("Current_Request").textContent);
};

fetch(
	`https://api.allorigins.win/raw?url=${encodeURIComponent(
		"https://hypixel-skyblock.fandom.com/wiki/Fetchur"
	)}`
)
	.then((response) => {
		if (response.ok) return response.text();
		throw new Error("Network response was not ok.");
	})
	.then((data) => {
		const root = new DOMParser().parseFromString(data, "text/html");
		const questItem = root
			.getElementById("Current_Request")
			.parentElement.nextElementSibling.textContent.replace(/\n/g, " ");

		const ret = {
			currentItem: questItem,
		};

		p.innerHTML = JSON.stringify(ret);
	});
