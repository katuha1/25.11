function dragStart(e) {
	e.dataTransfer.setData("text/plain", e.target.id);
}


function dragEnter(e) {
	e.preventDefault();
	return true;
}

async function dragDrop(e) {
	if (e.target.id != "") {
		if (e.target.id.match("[a-zA-Z]+")[0] == "field") {
			var data = await e.dataTransfer.getData("text/plain");
			await e.target.appendChild(document.getElementById(data));
			// console.log(e.target.id.match(/\d+/gi).join('')); // Столбец
			// console.log(e.target.lastChild.id.match(/\d+/gi).join('')); // Блок
			
			await fetch("/api/editstatus", { 
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: await JSON.stringify({
					"field": e.target.id.match(/\d+/gi).join(''),
					"block_id": e.target.lastChild.id.match(/\d+/gi).join('')
					})
				})
		}
	}
}

function dragOver(e) {
	e.preventDefault();
}