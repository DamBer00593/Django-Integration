window.onload = function() {
    console.log('This is a popup!');
    document.querySelector("#costBtn").addEventListener("click", clickeded)
}
function clickeded(){
    sendCost(parseFloat(document.querySelector("#cost").value))
    console.log(document.querySelector("#cost").value)
}
async function sendCost(cost){
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {cost: cost});
        // do something with response here, not outside the function
        console.log(response);
}