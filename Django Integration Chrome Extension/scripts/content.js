let cost = 0
let WhLast = 0;
let WhCurrent = 0;
let position = "bottom";
window.onload = function(){
	//0.1128
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
	const transactions = document.querySelectorAll(".field-id");
	document.querySelector("#result_list").insertAdjacentHTML("beforebegin", "<p class = 'paginator' id = 'topTotal'></p>")
	document.querySelector("#changelist-form").innerHTML += "<p class = 'paginator' id = 'bottomTotal'></p>";
	if (transactions){
		for (i = 0; i <
 		transactions.length; i++){
			currTransaction = transactions[i].parentElement;
			const dateFormat = currTransaction.querySelector(".field-started_at").innerHTML;
			var date = new Date();
			if((date.getMonth()+1) == curMonth(dateFormat)){
				WhCurrent += parseInt(currTransaction.querySelector(".field-meter_stop").innerHTML);
			}
			else if((date.getMonth()) == curMonth(dateFormat)){
				WhLast += parseInt(currTransaction.querySelector(".field-meter_stop").innerHTML);
			}
		    
		}

		change()
	}
}
function change(){

	let CAD = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'CAD',
	});
	
	var thisMonth = CAD.format(calculateEnergy(WhCurrent,cost))
	var lastMonth = CAD.format(calculateEnergy(WhLast,cost))
	console.log(position)
	if(position == "bottom"){
		document.querySelector("#bottomTotal").innerHTML = "Kwh: " + WhCurrent/1000 + " | " + thisMonth + " -LAST MONTH- Kwh: " + WhLast/1000 + " | " + lastMonth;
		document.querySelector("#topTotal").innerHTML = "";
	}else if(position == "top"){
		document.querySelector("#topTotal").innerHTML = "Kwh: " + WhCurrent/1000 + " | " + thisMonth + " -LAST MONTH- Kwh: " + WhLast/1000 + " | " + lastMonth;
		document.querySelector("#bottomTotal").innerHTML = "";
	}
	
}
function calculateEnergy(wh, cost){
	return ((wh/1000)*cost);
}
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request.cost)
		
		value = parseFloat(request.cost[0]);
	
		value2 = request.cost[1];
		position = value2;
		cost = value;
		chrome.storage.local.set({ key: value }).then(() => {});
		chrome.storage.local.set({ pos: value2 }).then(() => {});
		change();
		sendResponse({farewell: "goodbye"});
		
	}
	
  );

function curMonth(currDate){
	var str = currDate.split(" ");
	var currMonth = str[0]
	var month = 0;
	if(currMonth == ("Jan.")){
		month = 1;
	}
	else if(currMonth == ("Feb.")){
		month = 2;
	}
	else if(currMonth == ("Mar.")){
		month = 3;
	}
	else if(currMonth == ("Apr.")){
		month = 4;
	}
	else if(currMonth == ("May.")){
		month = 5;
	}
	else if(currMonth == ("June")){
		month = 6;
	}
	else if(currMonth == ("July")){
		month = 7;
	}
	else if(currMonth == ("Aug.")){
		month = 8;
	}
	else if(currMonth == ("Sept.")){
		month = 9;
	}
	else if(currMonth == ("Oct.")){
		month = 10;
	}
	else if(currMonth == ("Nov.")){
		month = 11;
	}
	else if(currMonth == ("Dec.")){
		month = 12;
	}
	return month;
}
