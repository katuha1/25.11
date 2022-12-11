
(function(){
	let dates = [];
	document.querySelectorAll(".block-task").forEach((elem) => {
		// console.log(elem.childNodes);
		let block_id = elem.id.match(/\d+/gi).join('');
		let block_date = new Date(elem.childNodes[2].childNodes[1].firstChild.data);
		// console.log(block_id);
		// console.log(block_date);
		dates.push({
			"block_id": block_id,
			"block_date": block_date
		})
	});
	dates.sort((a, b) => { return new Date(a.block_date) - new Date(b.block_date); });
	// console.log(dates[0].block_id);
	document.getElementById(`id_${dates[0].block_id}`).classList.add('deadline-task');
})();