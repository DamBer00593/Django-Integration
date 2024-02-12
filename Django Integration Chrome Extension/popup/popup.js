let cost = 0;
let position = "bottom";
window.onload = function() {
    console.log('This is a popup!');
    chrome.storage.local.get(["key"]).then((result) => {
		if(result.key){
			cost = result.key;
			change()
		}
	});
	chrome.storage.local.get(["pos"]).then((result) => {
		if(result.pos){
			position = result.pos;
			change()
		}
	});
    
    document.querySelector("#posBtn").addEventListener("click",processButton);
}

function change(){
    document.querySelector("#cost").value = cost;
    document.querySelector("#posDropdown").value = position;
}
function processButton(){
    console.log(document.querySelector("#posDropdown").value)
    sendInfo(parseFloat(document.querySelector("#cost").value), document.querySelector("#posDropdown").value);
}
async function sendInfo(tempCost, tempPosition){
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {cost: [tempCost, tempPosition]});
}

