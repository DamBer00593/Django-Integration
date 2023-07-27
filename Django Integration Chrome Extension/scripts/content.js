var cost = 0
var WhLast = 0;
var WhCurrent = 0;
window.onload = function(){
	//0.1128
	chrome.storage.local.get(["key"]).then((result) => {
		if(result.key){
			cost = result.key;
			change()
		}
	});
	const transactions = document.querySelectorAll(".field-id");
	document.querySelector("#changelist-form").innerHTML += "<p class = 'paginator' id = 'total'>asdfg</p>";
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


	document.querySelector("#total").innerHTML = "Kwh: " + WhCurrent/1000 + " | " + thisMonth + " -LAST MONTH- Kwh: " + WhLast/1000 + " | " + lastMonth;
}
function calculateEnergy(wh, cost){
	return ((wh/1000)*cost);
}
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  if (request.cost != 0)
		cost = parseFloat(request.cost)
	
		change();
		value = cost
		chrome.storage.local.set({ key: value }).then(() => {
		});
		  

		sendResponse({farewell: "goodbye"});
	}
  );

function curMonth(currDate){
	var str = currDate.split(" ");
	var currMonth = str[0]
	var month = 0;
	if(currMonth == ("January")){
		month = 1;
	}
	else if(currMonth == ("Febuary")){
		month = 2;
	}
	else if(currMonth == ("March")){
		month = 3;
	}
	else if(currMonth == ("April")){
		month = 4;
	}
	else if(currMonth == ("May")){
		month = 5;
	}
	else if(currMonth == ("June")){
		month = 6;
	}
	else if(currMonth == ("July")){
		month = 7;
	}
	else if(currMonth == ("August")){
		month = 8;
	}
	else if(currMonth == ("September")){
		month = 9;
	}
	else if(currMonth == ("October")){
		month = 10;
	}
	else if(currMonth == ("November")){
		month = 11;
	}
	else if(currMonth == ("December")){
		month = 12;
	}
	return month;
}