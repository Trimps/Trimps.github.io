//I made this, don't steal it and stuff.
/* 		Trimps
		Copyright (C) 2015 Zach Hood

		This program is free software: you can redistribute it and/or modify
		it under the terms of the GNU General Public License as published by
		the Free Software Foundation, either version 3 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.

		You should have received a copy of the GNU General Public License
		along with this program (if you are reading this on the original
		author's website, you can find a copy at
		<https://googledrive.com/host/0BwflTm9l-5_0fnFvVzI2TW1hU3J6TGc2NEt6VFc4N0hzaWpGX082LWY2aDJTSV85aVRxYVU/license.txt>). If not, see
		<http://www.gnu.org/licenses/>. */

function tooltip(what, isItIn, event, textString) {
	if (game.global.lockTooltip) return;
	var elem = document.getElementById("tooltipDiv");
	if (what == "hide"){
		elem.style.display = "none";
		return;
	}
	if (document.getElementById(what + "Alert") !== null)	document.getElementById(what + "Alert").innerHTML = "";
	if (document.getElementById(isItIn + "Alert") !== null)	document.getElementById(isItIn + "Alert").innerHTML = "";
	if (event != "update"){
		var cordx = 0;
		var cordy = 0;
		var e = event || window.event;
		if (e.pageX || e.pageY) {
			cordx = e.pageX + 25;
			cordy = e.pageY;
		} else if (e.clientX || e.clientY) {
			cordx = e.clientX + 25;
			cordy = e.clientY;
			
		}
		elem.style.left = (cordx - 5) + "px";
		elem.style.top = (cordy - 200) + "px";
	}
	var tooltipText;
	var costText = "";
	var toTip;
	var price;
	var canAfford;
	if (isItIn !== null && isItIn != "maps"){
		toTip = game[isItIn];
		toTip = toTip[what];
		tooltipText = toTip.tooltip;
		for (var cost in toTip.cost) {
			if (typeof toTip.cost[cost] === 'object' && typeof toTip.cost[cost][1] === 'undefined') {
				var costItem = toTip.cost[cost];
				for (var item in costItem) {
					price = costItem[item];
					if (typeof price === 'function') price = price();
					if (typeof price[1] !== 'undefined') price = resolvePow(price, toTip);
					var itemToCheck = game[cost];
					if (typeof itemToCheck[item] !== 'undefined'){
						canAfford = (itemToCheck[item].owned >= price) ? "green" : "red";
						costText += '<span class="' + canAfford + '">' + item + ':&nbsp;' + prettify(price) + '</span>, ';
					}
					else
					costText += item + ": " + prettify(price) + ", ";
				}
				continue;
			}
			price = (typeof toTip.cost[cost] === 'function') ? toTip.cost[cost]() : toTip.cost[cost];
			if (typeof price[1] !== 'undefined') price = resolvePow(price, toTip);
			if (typeof game.resources[cost] !== 'undefined'){
				canAfford = (game.resources[cost].owned >= price) ? "green" : "red";
				costText += '<span class="' + canAfford + '">' + cost + ':&nbsp;' + prettify(price) + '</span>, ';				
			}
			else
			costText += cost + ": " + prettify(price) + ", ";
		}
		costText = costText.slice(0, -2);
	}
	if (what == "Donate"){
		tooltipText = "I've spent a lot of hours working on this game, and I would love more than anything to be able to continue adding and expanding. I really enjoy making games, like a lot. Your donation, no matter how small, will help me to be able to make more games, and I will be forever indebted to you! <br/><form style='text-align: center' action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='hosted_button_id' value='MGFEJS3VVJG6U'><input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'><img alt='' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'></form>";
		game.global.lockTooltip = true;
		elem.style.left = "32.5%";
		elem.style.top = "25%";
		costText += "<div class='btn btn-info' onclick='unlockTooltip(); tooltip(\"hide\")'>Done</div>"

	}
	if (what == "Trustworthy Trimps"){
		tooltipText = textString;
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='unlockTooltip(); tooltip(\"hide\")'>Sweet, thanks.</div></div>";
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Portal"){
		tooltipText = "The portal device you found shines green in the lab. Such a familiar shade...";
		costText = "";
	}
	if (what == "Repeat Map"){
		tooltipText = "Allow the Trimps to find their way back to square 1 once they finish without your help. They grow up so fast.";
		costText = "";
	}
	if (what == "Reset"){
		tooltipText = "Are you sure you want to reset? This will really actually reset your game. You won't get anything cool. It will be gone.";
		costText="<div class='maxCenter'><div class='btn btn-info' onclick='resetGame();unlockTooltip();tooltip(\"hide\")'>Reset</div><div class='btn btn-info' onclick='unlockTooltip(); tooltip(\"hide\")'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Fight"){
		tooltipText = "Send your poor Trimps to certain doom in the battlefield. You'll get cool stuff though, they'll understand.";
		costText = (game.resources.trimps.maxSoldiers > 1) ? "s" : "";
		costText = game.resources.trimps.maxSoldiers + " Trimp" + costText;
	}
	if (what == "AutoFight"){
		tooltipText = "Allow the Trimps to start fighting on their own whenever their town gets overcrowded";
		costText = "";
	}
	if (what == "Queue"){
		tooltipText = "This is a building in your queue, you'll need to click \"Build\" to build it. Clicking an item in the queue will cancel it for a full refund.";
		costText = "";
	}
	if (what == "Custom"){
		tooltipText = "Type a number below to purchase a specific amount. (Max is 15000)<br/><br/><input type='number' id='customNumberBox' style='width: 50%' + value='" + game.global.lastCustomAmt + "'></input>"
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='numTab(5)'>Apply</div><div class='btn btn-info' onclick='unlockTooltip(); tooltip(\"hide\")'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Export"){
		tooltipText = "This is your save string. There are many like it but this one is yours. Save this save somewhere safe so you can save time next time. <br/><br/><textarea style='width: 100%' rows='5'>" + save(true) + "</textarea>";
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='unlockTooltip(); tooltip(\"hide\")'>Got it</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Import"){
		tooltipText = "Import your save string! It'll be fun, I promise.<br/><br/><textarea id='importBox' style='width: 100%' rows='5'></textarea>";
		costText="<div class='maxCenter'><div class='btn btn-info' onclick='load(true); unlockTooltip(); tooltip(\"hide\")'>Import</div><div class='btn btn-info' onclick='unlockTooltip(); tooltip(\"hide\")'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Fire Trimps"){
		if (!game.global.firing)
		tooltipText = "Activate firing mode, turning the job buttons red, and forcing them to fire trimps rather than hire them. The newly unemployed Trimps will start breeding instead of working, but you will not receive a refund on resources.";
		else
		tooltipText = "Disable firing mode";
		costText = "";
	}
	if (what == "Maps"){
		if (!game.global.mapsActive)
		tooltipText = "Leave your current world temporarily and enter the Map Chamber";
		else
		tooltipText = "Go back to to the World Map.";
		costText = "";
	}
	if (isItIn == "jobs"){
		if (game.global.firing){
			tooltipText = "Fire a " + what + ". Refunds no resources, but frees up some workspace for your Trimps.";
			costText = "";
		}
		else{
			costText = getTooltipJobText(what);
		}
		if (game.global.buyAmt > 1) what += " X" + game.global.buyAmt;
	}
	if (isItIn == "buildings"){
		if (game.global.buyAmt > 1) {
			if (game.buildings[what].percent){
				tooltipText += " <b>You can only purchase 1 " + what + " at a time.</b>";
				what += " X1";
			}
			else {
				costText = canAffordBuilding(what, false, true);
				what += " X" + game.global.buyAmt;
			}
		}
	}
	if (isItIn == "portal"){
		var resAppend = (game.global.kongBonusMode) ? " Bonus Points" : " Helium Canisters";
		costText = prettify(getPortalUpgradePrice(what)) + resAppend;
	}
	if (isItIn == "equipment"){
		if (game.global.buyAmt > 1) {
			costText = canAffordBuilding(what, false, true, true);
			what += " X" + game.global.buyAmt;
		}
	}
	if (isItIn == "upgrades"){
		if (typeof tooltipText.split('@')[1] !== 'undefined'){
			var prestigeCost = "<b>You may not want to do this right away.</b> Your next " + game.upgrades[what].prestiges + " will cost ";
			prestigeCost += prettify(getNextPrestigeCost(what));
			prestigeCost += (game.upgrades[what].prestiges == "Shield") ? " wood" : " metal";
			prestigeCost += " and grant " + getNextPrestigeValue(what) + ".";
			tooltipText = tooltipText.replace('@', prestigeCost);
		}
	}
	if (isItIn == "maps"){
		tooltipText = "This is a map. Click it to see its properties or to run it. Maps can be run as many times as you want.";
		costText = "";
	}
	var tipSplit = tooltipText.split('$');
	if (typeof tipSplit[1] !== 'undefined'){
		if (tipSplit[1] == 'incby'){
			tooltipText = tipSplit[0] + prettify(toTip.increase.by) + tipSplit[2];
		}
		else
		tooltipText = tipSplit[0] + prettify(toTip[tipSplit[1]]) + tipSplit[2];
	}
	document.getElementById("tipTitle").innerHTML = what;
	document.getElementById("tipText").innerHTML = tooltipText;
	document.getElementById("tipCost").innerHTML = costText;	
	elem.style.display = "block";
}

function unlockTooltip(){
	game.global.lockTooltip = false;
}

function swapNotation(updateOnly){
	if (!updateOnly) game.global.standardNotation = !game.global.standardNotation;
	document.getElementById("notationBtn").innerHTML = (game.global.standardNotation) ? "Standard Notation" : "Scientific Notation";
	if (game.global.fighting) updateAllBattleNumbers();
}

function prettify(number) {
	var numberTmp = number;
	number = Math.round(number * 1000000) / 1000000;
	if (number >= 1000 && number < 10000) return Math.floor(number);
	if(number === 0)
	{
		return prettifySub(0);
	}
	var base = Math.floor(Math.log(number)/Math.log(1000));
	
	if (base <= 0) return prettifySub(number);
	number /= Math.pow(1000, base);
	
	var suffices = [
		'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud',
		'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Od', 'Nd', 'V'
	];
	var suffix;
	if ((base <= suffices.length && base > 0) && game.global.standardNotation)
	{
		suffix = suffices[base-1];
	}
	else
	{
		var exponent = parseFloat(numberTmp).toExponential(2)
		exponent = exponent.replace('+','<sup>') + '</sup>';
		return exponent;
	}

	return prettifySub(number) + suffix;
}

function romanNumeral(number){
//This is only accurate up to 399, but that's more than plenty for this game. Probably not the cleanest converter ever, but I thought of it myself, it works, and I'm proud.
	var numeral = "";
	while (number >= 100){
		number -= 100;
		numeral += "C";
	}
	//77
	if (number >= 90){
		number -= 90;
		numeral += "XC";
	}
	if (number >= 50){
		number -= 50;
		numeral += "L";
	}
	if (number >= 40){
		number -= 40;
		numeral += "XL";
	}
	while (number >= 10){
		number -= 10;
		numeral += "X";
	}
	if (number >= 9){
		number -= 9;
		numeral += "IX";
	}
	if (number >= 5){
		number -= 5;
		numeral += "V";
	}
	if (number >= 4){
		number -= 4;
		numeral += "IV";
	}
	while (number >= 1){
		number -= 1;
		numeral += "I";
	}
	return numeral;
}

function prettifySub(number){
	number = number.toString();
	var hasDecimal = number.split('.');
	if (typeof hasDecimal[1] === 'undefined' || hasDecimal[0].length >= 3) return number.substring(0, 3);
	return number.substring(0, 4);	
}

function resetGame(keepPortal) {
	document.getElementById("wood").style.visibility = "hidden";
	document.getElementById("metal").style.visibility = "hidden";
	document.getElementById("trimps").style.visibility = "hidden";
	document.getElementById("gems").style.visibility = "hidden";
	document.getElementById("fragments").style.visibility = "hidden";
	document.getElementById("buyCol").style.visibility = "hidden";
	document.getElementById("unempHide").style.visibility = "hidden";
	document.getElementById("empHide").style.visibility = "hidden";
	document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades (research first)";
	document.getElementById("science").style.visibility = "hidden";
	document.getElementById("battleContainer").style.visibility = "hidden";
	document.getElementById("pauseFight").style.visibility = "hidden";
	document.getElementById("blockDiv").style.visibility = "hidden";
	document.getElementById("badGuyCol").style.visibility = "hidden";
	document.getElementById("jobsHere").innerHTML = "";
	document.getElementById("jobsTab").style.visibility = "hidden";
	document.getElementById("upgradesTab").style.visibility = "hidden";
	document.getElementById("equipmentTab").style.visibility = "hidden";
	document.getElementById("foremenCount").innerHTML = "";
	document.getElementById("upgradesHere").innerHTML = "";
	document.getElementById("mapsBtn").style.visibility = "hidden";
	document.getElementById("grid").style.display = "block";
	document.getElementById("preMaps").style.display = "none";
	document.getElementById("mapGrid").style.display = "none";
	document.getElementById("buildingsHere").innerHTML = "";
	document.getElementById("grid").innerHTML = "";
	document.getElementById("equipmentHere").innerHTML = "";
	document.getElementById("queueItemsHere").innerHTML = "";
	document.getElementById("log").innerHTML = "";
	document.getElementById("worldNumber").innerHTML = "1";
	document.getElementById("mapsHere").innerHTML = "";
	document.getElementById("sciencePs").innerHTML = "+0/sec";
	document.getElementById("repeatBtn").style.visibility = "hidden";
	document.getElementById("helium").style.visibility = "hidden";
	document.getElementById("jobsTitleDiv").style.display = "none";
	document.getElementById("upgradesTitleDiv").style.display = "none";
	document.getElementById("equipmentTitleDiv").style.display = "none";
	document.getElementById("portalBtn").style.display = "none";
	document.getElementById("respecPortalBtn").style.display = "none";
	filterTabs("all");
	var gatherBtns = ["buildings", "food", "wood", "metal", "science", "trimps"];
	for (var gatherBtn in gatherBtns){
		setGather(gatherBtns[gatherBtn], true);
	}
	var messages = game.global.messages;
	var autoSave = game.global.autoSave;
	var portal;
	var helium;
	if (keepPortal){
		portal = game.portal;
		helium = game.resources.helium.owned + game.global.heliumLeftover;
		totalPortals = game.global.totalPortals;
	}
	game = null;
	game = newGame();
	game.global.autoSave = autoSave;
	game.global.messages = messages;
	if (keepPortal){
		game.portal = portal;
		
		game.global.heliumLeftover = helium;
		game.global.totalPortals = totalPortals;
	}
	numTab(1);
}

function message(messageString, type) {
	var log = document.getElementById("log");
	var displayType = (game.global.messages[type]) ? "block" : "none";
	if (type == "Story") messageString = "<span class='glyphicon glyphicon-star'></span>" + messageString;
	if (type == "Combat") messageString = "<span class='glyphicon glyphicon-flag'></span>" + messageString;
	var addId = "";
	if (messageString == "Game Saved!") {
		addId = " id='saveGame'";
		if (document.getElementById('saveGame') !== null){
			log.removeChild(document.getElementById('saveGame'));
		}
	}
	if (type == "Notices"){
		messageString = "<span class='glyphicon glyphicon-off'></span>" + messageString;
	}
	log.innerHTML += "<span" + addId + " class='" + type + "Message message' style='display: " + displayType + "'>" + messageString + "</span>";
	log.scrollTop = log.scrollHeight;
	trimMessages(type);
}

function nodeToArray(nodeList){
	for(var a=[], l=nodeList.length; l--; a[l]=nodeList[l]);
    return a;
}

function trimMessages(what){
	var toChange = document.getElementsByClassName(what + "Message");
	toChange = nodeToArray(toChange);
	var messageCount = toChange.length;
	if (messageCount > 20){
		for (var count = 0; count < (messageCount - 20); count++){
			log.removeChild(toChange[count]);
		}
	}
}

function filterMessage(what, updateOnly){ //send true for updateOnly
	var log = document.getElementById("log");
	var displayed = game.global.messages[what];
	if (!updateOnly){
		displayed = (displayed) ? false : true;
		game.global.messages[what] = displayed;
	}
	var toChange = document.getElementsByClassName(what + "Message");
	var btnText = (displayed) ? what : what + " off";
	var btnElem = document.getElementById(what + "Filter");
	btnElem.innerHTML = btnText;
	btnElem.className = "";
	btnElem.className = getTabClass(displayed);
	displayed = (displayed) ? "block" : "none";
	for (var x = 0; x < toChange.length; x++){
		toChange[x].style.display = displayed;
	}
	
	log.scrollTop = log.scrollHeight;
}
//
//Menu Stuff
function filterTabs (what) {
	enableDisableTab(game.global.buyTab, false);
	game.global.buyTab = what;
	enableDisableTab(what, true);
	var tabs = ["buildings", "jobs", "upgrades", "equipment"];
	for (var tab in tabs){
		tab = tabs[tab];
		document.getElementById(tab + "Container").style.display = (what == "all" || tab == what) ? "block" : "none";
	}
}

function enableDisableTab(what, enable){
	document.getElementById(what + "Tab").style.background = (enable) ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.25)";
	document.getElementById(what + "A").style.borderBottom = (enable) ? "0" : "1px solid #ddd";
	
	


}


function getTabClass(displayed){
	return (displayed) ? "btn btn-success logFlt" : "btn btn-danger logFlt"
}


function numTab (what) {
	var num = 0;
	if (what == 5){
		
		unlockTooltip();
		tooltip('hide');
		num = Math.ceil(parseInt(document.getElementById("customNumberBox").value));
		if (num > 15000) num = 15000;
		if (num > 0) {
			document.getElementById("tab5Text").innerHTML = "+" + prettify(num);
			game.global.buyAmt = num;
			game.global.lastCustomAmt = num;
		}
		else {
			message("Please use a number greater than 0!", "Notices");
			return;
		}
	}
	if (what == null) what = game.global.numTab;
	else
	game.global.numTab = what;
	for (var x = 1; x <= 5; x++){
		var thisTab = document.getElementById("tab" + x);
		thisTab.style.background = (what == x) ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.25)";	
		if (x == 5) return;
		switch (x){
			case 1:
				num = 1;
				break;
			case 2:
				num = 10;
				break;
			case 3:
				num = 25;
				break;
			case 4:
				num = 100;
				break;	
		}
		if (x == what) game.global.buyAmt = num;
	}


}
/* function shrink(what) { //fired by player when clicking shrink on main menu item
	var toShrink = document.getElementById(what + "Here");
	var alreadyShown = game.global.menu[what];
	toShrink.style.display = (alreadyShown) ? "none" : "block";
	game.global.menu[what] = (alreadyShown) ? false : true;
	updateSideSize();
}

function updateSideSize() { //resizes main menu items
	var count = 0;
	for (var menuItem in game.global.menu) {
		if (game.global.menu[menuItem]) count++;
	}
	var percent = Math.floor(72 / count);
	for (menuItem in game.global.menu) {
		if (game.global.menu[menuItem]) {
			document.getElementById(menuItem + "Here").style.height = percent + "%";
		}
	}
} */

//
//Buildings Specific
function removeQueueItem(what) {
	var queue = document.getElementById("queueItemsHere");
	if (what == "first"){
		var elem = queue.firstChild;
		var name = game.global.buildingsQueue[0].split('.');
		if (name[1] > 1){
			name[1] = (parseInt(name[1]) - 1);
			var newQueue = name[0] + "." + name[1];
			name = name[0] + " X" + name[1];
			game.global.buildingsQueue[0] = newQueue;
			elem.innerHTML = '<span class="queueItemName">' + name + '</span>';
		}
		else{
			queue.removeChild(elem);
			game.global.buildingsQueue.splice(0, 1);
		}
		checkEndOfQueue();
		return;
	}
	var index = getQueueElemIndex(what, queue);
	var elem = document.getElementById(what);
	queue.removeChild(elem);
	refundQueueItem(game.global.buildingsQueue[index]);
	game.global.buildingsQueue.splice(index, 1);
	if (index === 0) {
		game.global.crafting = "";
		game.global.timeLeftOnCraft = 0;
		document.getElementById("buildingsBar").style.width = "0%";
	}
	checkEndOfQueue();
}

function getQueueElemIndex(id, queue){
	var childs = queue.getElementsByTagName('*');
	for (var i = 0, len = childs.length; i < len; i++){
	  if (childs[i].id == id) return (i / 2);
	}
}

function checkEndOfQueue(){
	if (game.global.buildingsQueue.length === 0){
		document.getElementById("noQueue").style.display = "block";
		game.global.nextQueueId = 0;
		game.global.crafting = "";
	}
}

function addQueueItem(what) {
	var elem = document.getElementById("queueItemsHere");
	document.getElementById("noQueue").style.display = "none";
	var name = what.split('.');
	if (name[1] > 1) name = name[0] + " X" + prettify(name[1]);
	else name = name[0];
	elem.innerHTML += '<div class="queueItem" id="queueItem' + game.global.nextQueueId + '" onmouseover="tooltip(\'Queue\',null,event)" onmouseout="tooltip(\'hide\')" onClick="removeQueueItem(\'queueItem' + game.global.nextQueueId + '\')"><span class="queueItemName">' + name + '</span></div>';
	game.global.nextQueueId++;
}

//
//Number updates
function updateLabels() { //Tried just updating as something changes, but seems to be better to do all at once all the time
	var toUpdate;
	//Resources (food, wood, metal, trimps, science). All but science have max and a bar. Per second will be handled in separate function, and called from job loop.
	for (var item in game.resources){
		toUpdate = game.resources[item];
		if (!(toUpdate.owned > 0)){
			toUpdate.owned = parseFloat(toUpdate.owned);
			if (!(toUpdate.owned > 0)) toUpdate.owned = 0;
		}
		document.getElementById(item + "Owned").innerHTML = prettify(Math.floor(toUpdate.owned), true);
		if (toUpdate.max == -1 || document.getElementById(item + "Max") === null) continue;
		document.getElementById(item + "Max").innerHTML = prettify(toUpdate.max);
		var bar = document.getElementById(item + "Bar");
		var percentToMax = ((toUpdate.owned / toUpdate.max) * 100);
		bar.style.backgroundColor = getBarColor(100 - percentToMax);
		bar.style.width = percentToMax + "%";
	}
	updateSideTrimps();
	//Buildings, trap is the only unique building, needs to be displayed in trimp area as well
	for (var itemA in game.buildings){
		toUpdate = game.buildings[itemA];
		if (toUpdate.locked == 1) continue;
		var elem = document.getElementById(itemA + "Owned");
		if (elem === null){
			unlockBuilding(itemA);
			elem = document.getElementById(itemA + "Owned");
		}
		elem.innerHTML = toUpdate.owned;
		if (itemA == "Trap") {
		document.getElementById("trimpTrapText").innerHTML = prettify(toUpdate.owned);
		document.getElementById("trimpTrapText2").innerHTML = prettify(toUpdate.owned);
		}
	}
	//Jobs, check PS here and stuff. Trimps per second is handled by breed() function
	for (var itemB in game.jobs){
		toUpdate = game.jobs[itemB];
		if (toUpdate.locked == 1 && toUpdate.increase == "custom") continue;
		if (toUpdate.locked == 1) {
			if (game.resources[toUpdate.increase].owned > 0)
			updatePs(toUpdate);
			continue;
		}
		if (document.getElementById(itemB) === null) unlockJob(itemB);
		document.getElementById(itemB + "Owned").innerHTML = toUpdate.owned;
		var perSec = (toUpdate.owned * toUpdate.modifier);
		updatePs(toUpdate);
	}
	//Upgrades, owned will only exist if 'allowed' exists on object
	for (var itemC in game.upgrades){
		toUpdate = game.upgrades[itemC];
		if (toUpdate.allowed - toUpdate.done >= 1) toUpdate.locked = 0;
		if (toUpdate.locked == 1) continue;
		if (document.getElementById(itemC) === null) unlockUpgrade(itemC, true);
	}
	//Equipment
	for (var itemD in game.equipment){
		toUpdate = game.equipment[itemD];
		if (toUpdate.locked == 1) continue;
		if (document.getElementById(itemD) === null) unlockEquipment(itemD);
		document.getElementById(itemD + "Owned").innerHTML = toUpdate.level;
	}
}

function updatePs(jobObj, trimps){ //trimps is true/false, send PS as first if trimps is true, like (32.4, true)
		if (jobObj.increase == "custom") return;
		var psText;
		var elem;
		if (trimps) {
			psText = jobObj.toFixed(3);
			elem = document.getElementById("trimpsPs");
		}
		else{
			var increase = jobObj.increase;
			psText = (jobObj.owned * jobObj.modifier);
			//portal Motivation
			if (game.portal.Motivation.level) psText += (game.portal.Motivation.level * game.portal.Motivation.modifier * psText);
			if (game.global.playerGathering == increase) psText += game.global.playerModifier;
			elem = document.getElementById(increase + "Ps");
			if (game.resources[increase].owned >= game.resources[increase].max && game.resources[increase].max != -1) psText = 0;
			psText = psText.toFixed(1);
			
		}
		psText = prettify(psText);
					

		
/*		var color = (psText < 0) ? "red" : "green";
		if (psText == 0) color = "black"; */
		var color = "white";
		psText = (psText < 0) ? "-" + psText : "+" + psText;
		psText += "/sec";
		elem.innerHTML = psText;
		elem.style.color = color;
}

function updateSideTrimps(){
	var trimps = game.resources.trimps;
	document.getElementById("trimpsEmployed").innerHTML = prettify(trimps.employed);
	var breedCount = (trimps.owned - trimps.employed > 2) ? prettify(Math.floor(trimps.owned - trimps.employed)) : 0;
	document.getElementById("trimpsUnemployed").innerHTML = breedCount;
	document.getElementById("maxEmployed").innerHTML = prettify(Math.ceil(trimps.max / 2));
	var free = (Math.ceil(trimps.max / 2) - trimps.employed);
	var s = (free > 1) ? "s" : "";
	document.getElementById("jobsTitleUnemployed").innerHTML = prettify(free) + " workspace" + s;
}

function unlockBuilding(what) {
	var locked = game.buildings[what].locked;
	game.buildings[what].locked = 0;
	if (game.global.spreadSheetMode) return;
	document.getElementById("buildingsHere").innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'buildings\',event)" onmouseout="tooltip(\'hide\')" class="thing noselect pointer buildingThing" id="' + what + '" onclick="buyBuilding(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">0</span></div>';
	if (locked == 1){
		document.getElementById("buildingsAlert").innerHTML = "!";
		document.getElementById(what + "Alert").innerHTML = "!";
	}
}

function unlockJob(what) {
	document.getElementById("jobsHere").innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'jobs\',event)" onmouseout="tooltip(\'hide\')" class="thing noselect pointer jobThing" id="' + what + '" onclick="buyJob(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">0</span></div>';
	if (game.jobs[what].locked == 1){
		document.getElementById("jobsAlert").innerHTML = "!";
		document.getElementById(what + "Alert").innerHTML = "!";
	}
	game.jobs[what].locked = 0;
}

function unlockMap(what) { //what here is the array index
	var item = game.global.mapsOwnedArray[what];
	var elem = document.getElementById("mapsHere");
	var btnClass = "thing noselect pointer mapThing"
	if (item.noRecycle) btnClass += " noRecycle";
	elem.innerHTML = '<div class="' + btnClass + '" id="' + item.id + '" onclick="selectMap(\'' + item.id + '\')"><span class="thingName">' + item.name + '</span><br/><span class="thingOwned mapLevel">Level ' + item.level + '</span></div>' + elem.innerHTML;
	//onmouseover="tooltip(\'' + item.id + '\',\'maps\',event)" onmouseout="tooltip(\'hide\')"
}

function unlockUpgrade(what, displayOnly) {
	if (game.global.spreadSheetMode){
		fireUpgrade(what);
		return;
	}
	var upgrade = game.upgrades[what];
	upgrade.locked = 0;
	var done = upgrade.done;
	var dif = upgrade.allowed - done;
	if (!displayOnly) {
		upgrade.allowed++;
	}
	else if (dif >= 1) dif -= 1;
	if (document.getElementById(what + "Owned") === null)
	document.getElementById("upgradesHere").innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'upgrades\',event)" onmouseout="tooltip(\'hide\')" class="thing noselect pointer upgradeThing" id="' + what + '" onclick="buyUpgrade(\'' + what + '\')"><span id="' + what + 'Alert" class="alert badge"></span><span class="thingName">' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">' + done + '</span></div>';
	if (dif >= 1) document.getElementById(what + "Owned").innerHTML = upgrade.done + "(+" + dif + ")";
	if (!displayOnly){
		document.getElementById("upgradesAlert").innerHTML = "!";
		document.getElementById(what + "Alert").innerHTML = "!";
	}
}

function checkButtons(what) {
	var where = game[what];
	if (what == "jobs") {
		for (var item in game.jobs){
			if (game.jobs[item].locked == 1) continue;
			updateButtonColor(item,canAffordJob(item),true);
		}
		return;
	}
	if (what == "upgrades"){
		for (var itemA in game.upgrades){
			if (game.upgrades[itemA].locked == 1) continue;
			updateButtonColor(itemA, canAffordTwoLevel(game.upgrades[itemA]));
		}
		return;
	}
	if (what == "buildings"){
		for (var itemBuild in game.buildings){
			var thisBuilding = game.buildings[itemBuild];
			if (thisBuilding.locked == 1) continue;
			updateButtonColor(itemBuild, canAffordBuilding(itemBuild))
		}
		return;
	}
	if (what == "equipment"){
		for (var itemEquip in game.equipment){
			var thisEquipment = game.equipment[itemEquip];
			if (thisEquipment.locked == 1) continue;
			updateButtonColor(itemEquip, canAffordBuilding(itemEquip, null, null, true))
		}
		return;
	}
	for (var itemB in where) {
		if (where[itemB].locked == 1) continue;
		var canAfford = true;
		for (var cost in where[itemB].cost) {
			var costItem = where[itemB].cost[cost];
			var numCost = (typeof costItem === 'function') ? costItem() : costItem;
			if (typeof costItem[1] !== 'undefined') numCost = resolvePow(costItem, where[itemB]);
			if (game.resources[cost].owned < numCost) {
				canAfford = false;
				break;
			}
		}
		if (canAfford === false) {
			updateButtonColor(itemB, false);
			continue;
		}
		updateButtonColor(itemB, true);
	}
}

function updateButtonColor(what, canAfford, isJob) {
	var color = (canAfford) ? "black" : "grey";
	if (isJob && game.global.firing === true) color = (game.jobs[what].owned >= 1) ? "red" : "grey";
	if (document.getElementById(what) === null) console.log(what);
	document.getElementById(what).style.backgroundColor = color;
}

function unlockEquipment(what) {
	var equipment = game.equipment[what];
	var elem = document.getElementById("equipmentHere");
	equipment.locked = 0;
	var numeral = "";
	if (equipment.prestige > 1){
		numeral = romanNumeral(equipment.prestige);
	}
	elem.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'equipment\',event)" onmouseout="tooltip(\'hide\')" class="noselect pointer thing" id="' + what + '" onclick="buyEquipment(\'' + what + '\')"><span class="thingName">' + what + ' <span id="' + what + 'Numeral">' + numeral + '</span></span><br/><span class="thingOwned">Level: <span id="' + what + 'Owned">0</span></span></div>';
}

function getBarColor(percent) {
	var color = "";
	if (percent > 50) color = "blue";
	else if (percent > 25) color = "yellow";
	else if (percent > 10) color = "orange";
	else color = "red";
	return color;
}