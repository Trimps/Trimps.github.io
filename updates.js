/*		Trimps
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
		<trimps.github.io/license.txt>). If not, see
		<http://www.gnu.org/licenses/>. */
 
//in the event of what == 'confirm', numCheck works as a Title! Exciting, right?
var customUp;
var tooltipUpdateFunction = "";
function tooltip(what, isItIn, event, textString, attachFunction, numCheck, renameBtn, noHide) {
	
	if (document.getElementById(what + "Alert") !== null)	document.getElementById(what + "Alert").innerHTML = "";
	if (document.getElementById(isItIn + "Alert") !== null)	document.getElementById(isItIn + "Alert").innerHTML = "";
	if (game.global.lockTooltip) return;
	
	var elem = document.getElementById("tooltipDiv");
	var ondisplay = null; // if non-null, called after the tooltip is displayed
	if (what == "hide"){
		elem.style.display = "none";
		tooltipUpdateFunction = "";
		return;
	}
	if ((event != 'update' || isItIn) && !game.options.menu.tooltips.enabled && !shiftPressed && what != "Well Fed") return;
	if (event != "update"){
		var whatU = what, isItInU = isItIn, eventU = event, textStringU = textString, attachFunctionU = attachFunction, numCheckU = numCheck, renameBtnU = renameBtn, noHideU = noHide;
		var newFunction = function () {
			tooltip(whatU, isItInU, eventU, textStringU, attachFunctionU, numCheckU, renameBtnU, noHideU);
		};
		tooltipUpdateFunction = newFunction;
		var cordx = 0;
		var cordy = 0;
		var e = event || window.event;
		if (e.pageX || e.pageY) {
			cordx = e.pageX;
			cordy = e.pageY;
		} else if (e.clientX || e.clientY) {
			cordx = e.clientX;
			cordy = e.clientY;
			
		}
		elem.style.left = (cordx + 20) + "px";
		elem.style.top = (cordy - 200) + "px";
	}
	var tooltipText;
	var costText = "";
	var toTip;
	var price;
	var canAfford;
	var percentOfTotal = "";
	if (isItIn !== null && isItIn != "maps"){
		toTip = game[isItIn];
		toTip = toTip[what];
		if (typeof toTip === 'undefined') console.log(what);
		tooltipText = toTip.tooltip;
		for (var cost in toTip.cost) {
			if (typeof toTip.cost[cost] === 'object' && typeof toTip.cost[cost][1] === 'undefined') {
				var costItem = toTip.cost[cost];
				for (var item in costItem) {
					price = costItem[item];
					if (isItIn == "upgrades" && game.upgrades[what].prestiges && (item == "metal" || item == "wood")) 
						price *= Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level);
					if (typeof price === 'function') price = price();
					if (typeof price[1] !== 'undefined') price = resolvePow(price, toTip);
					var itemToCheck = game[cost];
					if (typeof itemToCheck[item] !== 'undefined'){
						canAfford = (itemToCheck[item].owned >= price) ? "green" : "red";
						if (typeof itemToCheck[item].owned !== 'undefined'){
							if (itemToCheck[item].owned < price && (typeof game.resources[item] !== 'undefined')){
								var thisPs = getPsString(item, true);
								if (thisPs > 0){
									percentOfTotal = calculateTimeToMax(null, thisPs, (price - itemToCheck[item].owned));
									percentOfTotal = "(" + percentOfTotal + ")";
								}
								else percentOfTotal = "(<span class='icomoon icon-infinity'></span>)"						
							}
							else {
								percentOfTotal = (itemToCheck[item].owned > 0) ? prettify(((price / itemToCheck[item].owned) * 100).toFixed(1)) : 0;
								percentOfTotal = "(" + percentOfTotal + "%)";
							}
						}
						costText += '<span class="' + canAfford + '">' + item + ':&nbsp;' + prettify(price) + '&nbsp;' + percentOfTotal + '</span>, ';
					}
					else
					costText += item + ": " + prettify(price) + ", ";
				}
				continue;
			}
		}
		costText = costText.slice(0, -2);
	}
	if (what == "Confirm Purchase"){
		if (attachFunction == "purchaseImport()" && !boneTemp.selectedImport) return;
		var btnText = "Make Purchase";
		if (numCheck && game.global.b < numCheck){
			if (typeof kongregate === 'undefined') return;
			tooltipText = "You can't afford this bonus. Would you like to visit the shop?";
			attachFunction = "showPurchaseBones()";
			btnText = "Visit Shop";
		}
		else
		tooltipText = textString;
		costText += '<div class="maxCenter"><div class="btn btn-info" onclick="' + attachFunction + '; cancelTooltip()">' + btnText + '</div><div class="btn btn-info" onclick="cancelTooltip()">Cancel</div></div>';
		game.global.lockTooltip = true;
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Respec"){
		tooltipText = "You can respec your perks once per portal. Clicking cancel after clicking this button will not consume your respec.";
		costText = "";
	}
	if (what == "Well Fed"){
		tooltipText = "That Turkimp was delicious, and you have leftovers. If you set yourself to gather Food, Wood, or Metal while this buff is active, you can share with your workers to increase their gather speed by 50%";
		costText = "";
		elem.style.top = "0";
	}
	if (what == "Welcome"){
		tooltipText = "Welcome to Trimps! This game saves using Local Storage in your browser. Clearing your cookies or browser settings will cause your save to disappear. Please make sure you regularly back up your save file by using the 'Export' button in the bar below and saving that somewhere safe. I recommend using Chrome or Firefox. <br/><br/> Thank you for playing, and I hope you enjoy the game!";
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='cancelTooltip()'>Start</div></div>";
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Trustworthy Trimps"){
		tooltipText = textString;
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='cancelTooltip()'>Sweet, thanks.</div></div>";
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
		tooltipText = "Are you sure you want to reset? This will really actually reset your game. You won't get anything cool. It will be gone. <b style='color: red'>This is not the soft-reset you're looking for. This will delete your save.</b>";
		costText="<div class='maxCenter'><div class='btn btn-danger' onclick='resetGame();unlockTooltip();tooltip(\"hide\")'>Delete Save</div> <div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
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
	if (what == "New Achievements"){
		tooltipText = "The universe has taken an interest in your achievements, and has begun tracking them. You already have some completed thanks to your previous adventures, would you like to see them?";
		costText = "<div class='maxCenter'><div class='btn btn-success' onclick='toggleAchievementWindow(); cancelTooltip()'>Check Achievements</div> <div class='btn btn-danger' onclick='cancelTooltip()'>No, That Sounds Dumb</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Queue"){
		tooltipText = "This is a building in your queue, you'll need to click \"Build\" to build it. Clicking an item in the queue will cancel it for a full refund.";
		costText = "";
	}
	if (what == "Custom"){
		customUp = (textString) ? 2 : 1;
		tooltipText = "Type a number below to purchase a specific amount. You can also use shorthand such as 2e5 or 200k."
		if (textString) tooltipText += " <b>Max of 1,000 for perks</b>";
		tooltipText += "<br/><br/><input id='customNumberBox' style='width: 50%' value='" + prettify(game.global.lastCustomAmt) + "'></input>";
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='numTab(5, " + textString + ")'>Apply</div><div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "32.5%";
		elem.style.top = "25%";
		ondisplay = function() {
			var box = document.getElementById("customNumberBox");
			// Chrome chokes on setSelectionRange on a number box; fall back to select()
			try { box.setSelectionRange(0, box.value.length); } 
			catch (e) { box.select(); }
			box.focus();
		};
	}
	if (what == "Export"){
		if (textString){
			tooltipText = textString + "<br/><br/><textarea style='width: 100%' rows='5'>" + save(true) + "</textarea>";
			what = "Thanks!";
		}
		else
		tooltipText = "This is your save string. There are many like it but this one is yours. Save this save somewhere safe so you can save time next time. <br/><br/><textarea style='width: 100%' rows='5'>" + save(true) + "</textarea>";
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='cancelTooltip()'>Got it</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	if (what == "Import"){
		tooltipText = "Import your save string! It'll be fun, I promise.<br/><br/><textarea id='importBox' style='width: 100%' rows='5'></textarea>";
		costText="<div class='maxCenter'><div class='btn btn-info' onclick='cancelTooltip(); load(true);'>Import</div><div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
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
		if (!game.global.preMapsActive)
		tooltipText = "Travel to the Map Chamber. Maps are filled with goodies, and for each max level map you clear you will gain a 20% stacking damage bonus for that zone (stacks up to 10 times).";
		else
		tooltipText = "Go back to to the World Map.";
		costText = "";
	}
	if (isItIn == "jobs"){
		var buyAmt = game.global.buyAmt;
		if (game.global.firing){
			tooltipText = "Fire a " + what + ". Refunds no resources, but frees up some workspace for your Trimps.";
			costText = "";
		}
		else{
			var workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
			if (workspaces < buyAmt && workspaces > 0) buyAmt = workspaces;
			costText = getTooltipJobText(what, buyAmt);
		}
		if (game.global.buyAmt > 1) what += " X" + buyAmt;
	}
	if (isItIn == "buildings"){
		costText = canAffordBuilding(what, false, true);
		if (game.global.buyAmt > 1) {
			if (game.buildings[what].percent){
				tooltipText += " <b>You can only purchase 1 " + what + " at a time.</b>";
				what += " X1";
			}
			else {
				what += " X" + game.global.buyAmt;
			}
		}
	}
	if (isItIn == "portal"){
		var resAppend = (game.global.kongBonusMode) ? " Bonus Points" : " Helium Canisters";
		var perkItem = game.portal[what];
		if (!perkItem.max || perkItem.max > perkItem.level + perkItem.levelTemp) costText = prettify(getPortalUpgradePrice(what)) + resAppend;
		else costText = "";
		if (game.global.buyAmt > 1) what += " X" + game.global.buyAmt;
	}
	if (isItIn == "equipment"){
		costText = canAffordBuilding(what, false, true, true);
		if (what == "Shield" && game.equipment.Shield.blockNow){
			var blockPerShield = game.equipment.Shield.blockCalculated + (game.equipment.Shield.blockCalculated * game.jobs.Trainer.owned * (game.jobs.Trainer.modifier / 100));
			tooltipText += " (" + prettify(blockPerShield) + " after Trainers)";
		}
		if (game.global.buyAmt > 1) {
			what += " X" + game.global.buyAmt;
		}
	}
	if (isItIn == "upgrades"){
		if (typeof tooltipText.split('@')[1] !== 'undefined'){
			var prestigeCost = "<b>You may not want to do this right away.</b> Your next " + game.upgrades[what].prestiges + " will grant " + getNextPrestigeValue(what) + ".";
			tooltipText = tooltipText.replace('@', prestigeCost);
		}
		if (typeof tooltipText.split('$')[1] !== 'undefined'){
			var upgradeTextSplit = tooltipText.split('$');
			var color = game.upgrades[what].specialFilter();
			color = color ? "green" : "red";
			tooltipText = upgradeTextSplit[0] + "<span style='color: " + color + "; font-weight: bold;'>" + upgradeTextSplit[1]  + "</span>";
		}
		if (typeof tooltipText.split('?')[1] !== 'undefined'){
			var percentNum = (game.global.frugalDone) ? '60' : '50';
			tooltipText = tooltipText.replace('?', percentNum);
		}
		if (what == "Coordination"){
			var coordReplace = (game.portal.Coordinated.level) ? (25 * Math.pow(game.portal.Coordinated.modifier, game.portal.Coordinated.level)).toFixed(3) : 25;
			tooltipText = tooltipText.replace('<coord>', coordReplace);
			if (!canAffordCoordinationTrimps()){
				var nextCount = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend : game.resources.trimps.maxSoldiers;
				var amtToGo = ((nextCount * 3) - game.resources.trimps.realMax());
				tooltipText += "<b>You need enough room for " + prettify(nextCount * 3) + " max Trimps. You are short " + prettify(Math.floor(amtToGo)) + " Trimps.</b>";
			}
		}
	}
	if (isItIn == "maps"){
		tooltipText = "This is a map. Click it to see its properties or to run it. Maps can be run as many times as you want.";
		costText = "";
	}
	if (what == 'confirm'){
		if (!renameBtn) renameBtn = "Confirm";
		what = numCheck;
		tooltipText = textString;
		if (!noHide) attachFunction = attachFunction + "; cancelTooltip()";
		costText = ' <div class="maxCenter" id="confirmTipCost"><div class="btn btn-info" onclick="' + attachFunction + '">' + renameBtn + '</div><div class="btn btn-danger" onclick="cancelTooltip()">Cancel</div></div>';
		game.global.lockTooltip = true;
		elem.style.left = "32.5%";
		elem.style.top = "25%";
	}
	var tipSplit = tooltipText.split('$');
	if (typeof tipSplit[1] !== 'undefined'){
		if (tipSplit[1] == 'incby'){
			var increase = toTip.increase.by;
			if (game.portal.Carpentry.level && toTip.increase.what == "trimps.max") increase *= Math.pow(1.1, game.portal.Carpentry.level);
			tooltipText = tipSplit[0] + prettify(increase) + tipSplit[2];
		}
		else if (isItIn == "jobs" && game.portal.Motivation.level && toTip.increase != "custom"){
			tooltipText = tipSplit[0] + prettify(toTip[tipSplit[1]] * ((game.portal.Motivation.level * 0.05) + 1)) + tipSplit[2];
		}
		else
		tooltipText = tipSplit[0] + prettify(toTip[tipSplit[1]]) + tipSplit[2];
	}
	if (typeof tooltipText.split('~') !== 'undefined') {
		var percentIncrease = game.upgrades.Gymystic.done;
		var text = ".";
		if (percentIncrease > 0){
			percentIncrease += 4;
			text = " and increase the base block of all other Gyms by " + percentIncrease + "%.";
		}
		tooltipText = tooltipText.replace('~', text);
	}
	document.getElementById("tipTitle").innerHTML = what;
	document.getElementById("tipText").innerHTML = tooltipText;
	document.getElementById("tipCost").innerHTML = costText;
	elem.style.display = "block";
	if (ondisplay !== null)
		ondisplay();
}

// Correct function to call to cancel the current tooltip
function cancelTooltip(){
	unlockTooltip();
	tooltip("hide");
	tooltipUpdateFunction = "";
	customUp = 0;
}

function unlockTooltip(){
	game.global.lockTooltip = false;
}

function getPsString(what, rawNum) {
	if (what == "helium") return;
	var resOrder = ["food", "wood", "metal", "science", "gems", "fragments"];
	var books = ["farming", "lumber", "miner", "science"];
	var jobs = ["Farmer", "Lumberjack", "Miner", "Scientist", "Dragimp", "Explorer"];
	var index = resOrder.indexOf(what);
	var job = game.jobs[jobs[index]];
	var book = game.upgrades["Speed" + books[index]];
	var mBook = game.upgrades["Mega" + books[index]];
	var base = (what == "fragments") ? 0.1 : 0.5;
	var textString =  "<table class='bdTable table table-striped'><tbody>";
	//Add base
	textString += "<tr><td class='bdTitle'>Base</td><td class='bdPercent'></td><td class='bdNumber'>" + prettify(base) + "</td></tr>";
	//Add job count
	var currentCalc = job.owned * base;
	textString += "<tr><td class='bdTitle'>" + jobs[index] + "s</td><td class='bdPercent'>" + prettify(job.owned) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	//Add books
	if (typeof book !== 'undefined' && book.done > 0){
		var bookStrength = Math.pow(1.25, book.done);
		currentCalc *= bookStrength;
		bookStrength = prettify((bookStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Speed" + books[index] + "</td><td class='bdPercent'>+ " + bookStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Megabooks
	if (typeof mBook !== 'undefined' && mBook.done > 0){
		var mod = (game.global.frugalDone) ? 1.6 : 1.5;
		var mBookStrength = Math.pow(mod, mBook.done);
		currentCalc *= mBookStrength;
		mBookStrength = prettify((mBookStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Mega" + books[index] + "</td><td class='bdPercent'>+ " + mBookStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	
	//Add bounty
	if (what != "gems" && game.upgrades.Bounty.done > 0){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Bounty</td><td class='bdPercent'>+ 100%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Tribute
	if (what == "gems" && game.buildings.Tribute.owned > 0){
		var tributeStrength = Math.pow(game.buildings.Tribute.increase.by, game.buildings.Tribute.owned);
		currentCalc *= tributeStrength;
		tributeStrength = prettify((tributeStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Tribute</td><td class='bdPercent'>+ " + tributeStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Whipimp
	if (game.unlocks.impCount.Whipimp > 0){
		var whipStrength = Math.pow(1.003, game.unlocks.impCount.Whipimp);
		currentCalc *= (whipStrength);
		whipStrength = prettify((whipStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Whipimp</td><td class='bdPercent'>+ " + whipStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add motivation
	if (game.portal.Motivation.level > 0){
		var motivationStrength = (game.portal.Motivation.level * game.portal.Motivation.modifier);
		currentCalc  *= (motivationStrength + 1);
		motivationStrength = prettify(motivationStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>Motivation</td><td class='bdPercent'>+ " + motivationStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add player
	if (game.global.playerGathering == what){
		if (game.global.turkimpTimer > 0 && (what == "food" || what == "wood" || what == "metal")){
			currentCalc *= 1.5;
			textString += "<tr><td class='bdTitle'>Sharing Food</td><td class='bdPercent'>+ 50%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
		var playerStrength = game.global.playerModifier;
		currentCalc += playerStrength;
		textString += "<tr><td class='bdTitle'>You</td><td class='bdPercent'>+ " + prettify(playerStrength) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";

	}
	if (rawNum) return currentCalc;
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getPsString('" + what + "')", what.charAt(0).toUpperCase() + what.substr(1, what.length) + " Per Second", "Refresh", true);
}



function getTrimpPs() {
	if (game.global.challengeActive == "Trapper") return;
	var trimps = game.resources.trimps;
	var base = 0.0085;
	var textString =  "<table class='bdTable table table-striped'><tbody>";
	//Add base
	textString += "<tr><td class='bdTitle'>Base</td><td class='bdPercent'></td><td class='bdNumber'>" + base + "</td></tr>";
	//Add job count
	var breeding = trimps.owned - trimps.employed;
	var currentCalc = breeding * base;
	textString += "<tr><td class='bdTitle'>Breeding</td><td class='bdPercent'>" + prettify(breeding) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	//Add Potency
	if (game.upgrades.Potency.done > 0){
		var potencyStrength = Math.pow(1.1, game.upgrades.Potency.done);
		currentCalc *= potencyStrength;
		potencyStrength = prettify((potencyStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Potency</td><td class='bdPercent'>+ " + potencyStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Nurseries
	if (game.buildings.Nursery.owned > 0){
		var nurseryStrength = Math.pow(1.01, game.buildings.Nursery.owned);
		currentCalc *= nurseryStrength;
		nurseryStrength = prettify((nurseryStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Nurseries</td><td class='bdPercent'>+ " + nurseryStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Venimp
	if (game.unlocks.impCount.Venimp > 0){
		var venimpStrength = Math.pow(1.003, game.unlocks.impCount.Venimp);
		currentCalc *= (venimpStrength);
		venimpStrength = prettify((venimpStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Venimp</td><td class='bdPercent'>+ " + venimpStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.brokenPlanet){
		currentCalc /= 10;
		textString += "<tr style='color: red'><td class='bdTitle'>Broken Planet</td><td class='bdPercent'>X 0.1</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	
	}
	//Add pheromones
	if (game.portal.Pheromones.level > 0){
		var PheromonesStrength = (game.portal.Pheromones.level * game.portal.Pheromones.modifier);
		currentCalc  *= (PheromonesStrength + 1);
		PheromonesStrength = prettify(PheromonesStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>Pheromones</td><td class='bdPercent'>+ " + PheromonesStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Geneticist
	if (game.jobs.Geneticist.owned > 0) {
		var mult = Math.pow(.98, game.jobs.Geneticist.owned);
		currentCalc *= mult;
		textString += "<tr style='color: red'><td class='bdTitle'>Geneticist</td><td class='bdPercent'>X  " + mult.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
	}
	//Add quick trimps
	if (game.unlocks.quickTrimps){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Quick Trimps</td><td class='bdPercent'>+ 100%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getTrimpPs()", "Trimps Per Second", "Refresh", true);
}

function getBattleStatBd(what) {
	var equipment = {};
	var name = what.charAt(0).toUpperCase() + what.substr(1, what.length);
	var textString =  "<table class='bdTableSm table table-striped'><tbody><tr><td></td><td>Base</td><td>Level</td><td>Item " + name + "</td><td>Total</td></tr>";
	var currentCalc = 0;
	var percent = 0;
	if (what == "health" || what == "attack"){
		currentCalc += (what == "health") ? 50 : 6;
		for (var equip in game.equipment){
			var temp = game.equipment[equip];
			if (typeof temp[what] === 'undefined' || temp.level <= 0 || temp.blockNow) continue;
			var equipStrength = temp[what + "Calculated"] * temp.level;
			currentCalc += equipStrength;
			percent = ((equipStrength / game.global[what]) * 100).toFixed(1) + "%";
			textString += "<tr><td class='bdTitle'>" + equip + "</td><td>" + prettify(temp[what + "Calculated"]) + "</td><td>" + temp.level + "</td><td>" + prettify(equipStrength) + " (" + percent + ")</td><td>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	else if (what == "block"){
		//Add Gym
		var gym = game.buildings.Gym;
		if (gym.owned > 0){
			var gymStrength = gym.owned * gym.increase.by;
			percent = ((gymStrength / game.global.block) * 100).toFixed(1) + "%";
			currentCalc += gymStrength;
			textString += "<tr><td class='bdTitle'>Gym</td><td>" + prettify(gym.increase.by) + "</td><td>" + prettify(gym.owned) + "</td><td>" + prettify(gymStrength) + " (" + percent + ")</td><td>" + prettify(currentCalc) + "</td></tr>";
		}
		var shield = game.equipment.Shield;
		if (shield.blockNow && shield.level > 0){
			var shieldStrength = shield.level * shield.blockCalculated;
			percent = ((shieldStrength / game.global.block) * 100).toFixed(1) + "%";
			currentCalc += shieldStrength;
			textString += "<tr><td class='bdTitle'>Shield</td><td>" + prettify(shield.blockCalculated) + "</td><td>" + prettify(shield.level) + "</td><td>" + prettify(shieldStrength) + " (" + percent + ")</td><td>" + prettify(currentCalc) + "</td></tr>";
		}
		var trainer = game.jobs.Trainer;
		if (trainer.owned > 0){
			var trainerStrength = trainer.owned * (trainer.modifier / 100);
			currentCalc  *= (trainerStrength + 1);
			trainerStrength = prettify(trainerStrength * 100) + "%";
			textString += "<tr><td class='bdTitle'>Trainers</td><td>" + prettify(trainer.modifier) + "%</td><td>" + prettify(trainer.owned) + "</td><td>+ " + trainerStrength + "</td><td>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	//Add coordination
	currentCalc  *= game.resources.trimps.maxSoldiers;
	textString += "<tr><td class='bdTitle'>Soldiers</td><td class='bdPercentSm'></td><td></td><td>x " + prettify(game.resources.trimps.maxSoldiers) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	//Add achievements
	if (what == "attack" && game.global.achievementBonus > 0){
		currentCalc *= 1 + (game.global.achievementBonus / 100);
		textString += "<tr><td class='bdTitle'>Achievements</td><td class='bdPercentSm'></td><td></td><td>+ " + game.global.achievementBonus + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>"
	}
	//Add perk
	var perk = "";
	if (what == "health") perk = "Toughness";
	if (what == "attack") perk = "Power";
	if (perk && game.portal[perk].level > 0){
		var PerkStrength = (game.portal[perk].level * game.portal[perk].modifier);
		currentCalc  *= (PerkStrength + 1);
		PerkStrength = prettify(PerkStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>" + perk + "</td><td>" + (game.portal[perk].modifier * 100) + "%</td><td>" + game.portal[perk].level + "</td><td>+ " + PerkStrength + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add resilience
	if (what == "health" && game.portal.Resilience.level > 0){
		var resStrength = Math.pow(game.portal.Resilience.modifier + 1, game.portal.Resilience.level);
		currentCalc *= resStrength;
		resStrength = prettify((resStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Resilience</td><td>" + (game.portal.Resilience.modifier * 100) + "%</td><td>" + game.portal.Resilience.level + "</td><td>+ " + resStrength + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Geneticist
	var geneticist = game.jobs.Geneticist;
	if (geneticist.owned > 0 && what == "health"){
		var geneticistStrength = Math.pow(1.01, geneticist.owned);
		currentCalc  *= geneticistStrength;
		geneticistStrength = prettify((geneticistStrength * 100) - 100) + "%";
		textString += "<tr><td class='bdTitle'>Geneticists</td><td>1%</td><td>" + prettify(geneticist.owned) + "</td><td>+ " + geneticistStrength + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Anticipation
	var anticipation = game.portal.Anticipation;
	if (anticipation.level > 0 && what == "attack"){
		var antiStrength = ((anticipation.level * anticipation.modifier * game.global.antiStacks) + 1);
		currentCalc *= antiStrength;
		antiStrength = prettify((antiStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Anticipation</td><td>2% (X" + game.global.antiStacks + ")</td><td>" + prettify(anticipation.level) + "</td><td>+ " + antiStrength + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	
	}
	//Add formations
	if (game.global.formation > 0){
		var formStrength = 0.5;
		if ((game.global.formation == 1 && what == "health") || (game.global.formation == 2 && what == "attack") || (game.global.formation == 3 && what == "block")) formStrength = 4;
		currentCalc *= formStrength;
		textString += "<tr><td class='bdTitle'>Formation</td><td></td><td></td><td>x " + formStrength + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";

	}
	//Add Titimp
	if (game.global.titimpLeft > 1 && game.global.mapsActive && what == "attack"){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Titimp</td><td></td><td></td><td>x 2</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add map bonus
	if (!game.global.mapsActive && game.global.mapBonus > 0 && what == "attack"){
		var mapBonusMult = 0.2 * game.global.mapBonus;
		currentCalc *= (1 + mapBonusMult);
		mapBonusMult *= 100;
		textString += "<tr><td class='bdTitle'>Map Bonus</td><td>20%</td><td>" + game.global.mapBonus + "</td><td>+ " + prettify(mapBonusMult) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
		
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getBattleStatBd('" + what + "')", name, "Refresh", true);
}

function getMaxTrimps() {
	var trimps = game.resources.trimps;
	var base = 10;
	var textString =  "<table class='bdTable table table-striped'><tbody>";
	//Add base
	textString += "<tr><td class='bdTitle'>Base</td><td class='bdPercent'></td><td class='bdNumber'>" + base + "</td></tr>";
	//Add job count
	var housing = trimps.max - game.global.totalGifts - game.unlocks.impCount.TauntimpAdded - base;
	var currentCalc = housing + base;
	textString += "<tr><td class='bdTitle'>Housing</td><td class='bdPercent'>+ " + prettify(housing) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	//Add Territory Bonus
	if (game.global.totalGifts > 0){
		currentCalc += game.global.totalGifts;
		textString += "<tr><td class='bdTitle'>Territory Bonus</td><td class='bdPercent'>+ " + prettify(game.global.totalGifts) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Tauntimp
	if (game.unlocks.impCount.TauntimpAdded > 0){
		currentCalc += game.unlocks.impCount.TauntimpAdded;
		textString += "<tr><td class='bdTitle'>Tauntimp</td><td class='bdPercent'>+ " + prettify(game.unlocks.impCount.TauntimpAdded) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Carpentry
	if (game.portal.Carpentry.level > 0){
		var carpentryStrength = Math.pow(1.1, game.portal.Carpentry.level);
		currentCalc  *= (carpentryStrength);
		currentCalc = Math.floor(currentCalc);
		carpentryStrength = prettify((carpentryStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Carpentry</td><td class='bdPercent'>+ " + carpentryStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getMaxTrimps()", "Max Trimps", "Refresh", true);
}

function getLootBd(what) {
    var map;
	var world;
	var level = "";
	var cell;
    if (game.global.mapsActive) {
        map = getCurrentMapObject();
		cell = game.global.lastClearedMapCell + 1;
        level = scaleLootLevel(cell, map.level);
		world = map.level;
    } else {
		cell = game.global.lastClearedCell + 1;
        level = scaleLootLevel(cell);
		world = game.global.world;
    }
	var textString = '	<div><ul id="lootBdTabs" class="nav nav-tabs nav-justified"><li role="presentation" onclick="getLootBd(\'Food/Wood/Metal\')"><a href="#">Food/Wood/Metal</a></li>'
	if (game.global.mapsUnlocked) textString += '<li role="presentation" onclick="getLootBd(\'Fragments\')"><a href="#">Fragments</a></li><li role="presentation" onclick="getLootBd(\'Gems\')"><a href="#">Gems</a></li>'
	textString += '</ul></div>'
	textString +=  "<table class='bdTableSm table table-striped'><tbody><tr><td style='font-weight: bold; font-size: 1.1em'>" + what + "</td><td>Base</td><td>Amount</td><td>Line Total</td><td>Total</td></tr>";
	var currentCalc = 0;
	var percent = 0;
	var amt = 0;
	switch(what) {
		case "Food/Wood/Metal":
			var tempModifier = 0.5 * Math.pow(1.25, (game.global.world >= 59) ? 59 : game.global.world);
			//Mega books
			if (game.global.world >= 60) {	
				if (game.global.frugalDone) tempModifier *= Math.pow(1.6, game.global.world - 59);
				else tempModifier *= Math.pow(1.5, game.global.world - 59);
			}
			//Bounty
			if (game.global.world >= 15) tempModifier *= 2;
			//Whipimp
			if (game.unlocks.impCount.Whipimp) tempModifier *= Math.pow(1.003, game.unlocks.impCount.Whipimp);
			var avgSec = tempModifier;
			if (game.global.world < 100)
				amt = avgSec * 3.5;
			else 
				amt = avgSec * 5;
			amt = (amt * .8) + ((amt * .002) * (cell + 1));
			currentCalc = amt;
			if (game.global.turkimpTimer > 0 && (game.global.playerGathering == "food" || game.global.playerGathering == "metal" || game.global.playerGathering == "wood")){
				currentCalc *= 1.166;
			}
			textString += "<tr><td class='bdTitle'>Base</td><td></td><td></td><td>" + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			amt = game.resources.trimps.realMax() * 0.16;
			currentCalc *= amt;
			textString += "<tr><td class='bdTitle'>Trimps</td><td>0.16</td><td>x " + prettify(game.resources.trimps.realMax()) + "</td><td>x " + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			break;
		case "Gems":
			level = (level - 400) * 1.35;
			amt = Math.round(0.5 * Math.pow(1.23, Math.sqrt(level)));
			amt += Math.round(0.5 * level);
			amt = (amt * .8) + ((amt * .002) * (cell + 1));
			currentCalc = amt;
			textString += "<tr><td class='bdTitle'>Base</td><td></td><td></td><td>" + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			if (game.jobs.Dragimp.owned >= 1){
				amt = 1.5 * game.jobs.Dragimp.modifier;
				amt = (amt * .8) + ((amt * .002) * (cell + 1));
				currentCalc += amt;
				textString += "<tr><td class='bdTitle'>Dragimp Scouting</td><td></td><td></td><td>+ " + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			break;
		case "Fragments":
			amt = Math.pow(1.15, world);
			currentCalc = amt;
			textString += "<tr><td class='bdTitle'>Base</td><td></td><td></td><td>" + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			break;
	}
	if (game.global.mapsActive) {
		if (world < game.global.world){
			//-20% loot compounding for each level below world
			amt = Math.pow(0.8, (game.global.world - world));
			currentCalc *= amt;
			textString += "<tr><td class='bdTitle'>Low Map Level</td><td>-20%</td><td>x " + (game.global.world - world) + "</td><td>x " + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			
		}
		//Add map loot bonus	
		currentCalc = Math.round(currentCalc * map.loot);
		textString += "<tr><td class='bdTitle'>Map Loot</td><td></td><td></td><td>+ " + Math.floor((map.loot  - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.portal.Looting.level){
		amt = (1 + (game.portal.Looting.level * game.portal.Looting.modifier));
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Looting (perk)</td><td>+ 5%</td><td>" + game.portal.Looting.level + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.unlocks.impCount.Magnimp){
	
		amt = Math.pow(1.003, game.unlocks.impCount.Magnimp);
		currentCalc = Math.floor(currentCalc * amt);
		textString += "<tr><td class='bdTitle'>Magnimp</td><td>+ 0.3%</td><td>" + game.unlocks.impCount.Magnimp + "</td><td>+ " + prettify((amt - 1)  * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";

	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getLootBd('" + what + "')", what + " Loot Breakdown", "Refresh", true);
}

function swapNotation(updateOnly){
	if (!updateOnly) game.options.menu.standardNotation.enabled = !game.options.menu.standardNotation.enabled;
	document.getElementById("notationBtn").innerHTML = (game.options.menu.standardNotation.enabled) ? "Standard Notation" : "Scientific Notation";
	if (game.global.fighting) updateAllBattleNumbers();
}

function prettify(number) {
	var numberTmp = number;
	number = Math.round(number * 1000000) / 1000000;
	if (!isFinite(number)) return "<span class='icomoon icon-infinity'></span>";
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
		'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Od', 'Nd', 'V', 'Uv', 'Dv',
		'Tv', 'Qav', 'Qiv', 'Sxv', 'Spv', 'Ov', 'Nv', 'Tt'
	];
	var suffix;
	if ((base <= suffices.length && base > 0) && game.options.menu.standardNotation.enabled)
	{
		suffix = suffices[base-1];
	}
	else
	{
		var exponent = parseFloat(numberTmp).toExponential(2);
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
	number = parseFloat(number.toFixed(3));
	if (number >= 1000) number = 999;
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
	document.getElementById("pauseFight").style.display = "none";
	document.getElementById("blockDiv").style.visibility = "hidden";
	document.getElementById("badGuyCol").style.visibility = "hidden";
	document.getElementById("jobsHere").innerHTML = "";
	document.getElementById("jobsTab").style.visibility = "hidden";
	document.getElementById("upgradesTab").style.visibility = "hidden";
	document.getElementById("equipmentTab").style.visibility = "hidden";
	document.getElementById("foremenCount").innerHTML = "";
	document.getElementById("upgradesHere").innerHTML = "";
	document.getElementById("mapsBtn").style.display = "none";
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
	document.getElementById("repeatBtn").style.display = "none";
	document.getElementById("helium").style.visibility = "hidden";
	document.getElementById("jobsTitleDiv").style.display = "none";
	document.getElementById("upgradesTitleDiv").style.display = "none";
	document.getElementById("equipmentTitleDiv").style.display = "none";
	document.getElementById("portalBtn").style.display = "none";
	document.getElementById("respecPortalBtn").style.display = "none";
	document.getElementById("battleHeadContainer").style.display = "block";
	document.getElementById("mapsCreateRow").style.display = "none";
	document.getElementById("worldName").innerHTML = "Zone";
	document.getElementById("wrapper").style.background = "url(css/bg2.png) center repeat-x";
	document.getElementById("tab5Text").innerHTML = "+1";
	document.getElementById("goodGuyAttack").innerHTML = "";
	document.getElementById("goodGuyBlock").innerHTML = "";
	document.getElementById("goodGuyBar").style.width = "0%";
	document.getElementById("goodGuyHealth").innerHTML = "0";
	document.getElementById("goodGuyHealthMax").innerHTML = "0";
	document.getElementById("trimpsFighting").innerHTML = "1";
	document.getElementById("turkimpBuff").style.display = "none";
	document.getElementById("statsBtnRow").style.display = "block";
	document.getElementById("mapsBtn").innerHTML = "Maps";
	resetOnePortalRewards();
	setFormation(0);
	hideFormations();
	hideBones();
	cancelTooltip();
	
	for (var item in game.resources){
		var elem = document.getElementById(item + "Ps");
		if (elem !== null) elem.innerHTML = "+0/sec";
	}
	filterTabs("all");
	var gatherBtns = ["buildings", "food", "wood", "metal", "science", "trimps"];
	for (var gatherBtn in gatherBtns){
		setGather(gatherBtns[gatherBtn], true);
	}
	var messages = game.global.messages;
	var portal;
	var helium;
	var b;
	var imps;
	var highestLevel;
	var challenge = "";
	var sLevel = 0;
	var lastSkele;
	var bestHelium;
	var totalHeliumEarned;
	var options = game.options;
	var prison;
	var frugal;
	var slow;
	var stats;
	var repeat;
	var achieves;
	if (keepPortal){
		portal = game.portal;
		helium = game.resources.helium.owned + game.global.heliumLeftover;
		totalPortals = game.global.totalPortals;
		b = game.global.b;
		imps = game.unlocks.imps;
		highestLevel = game.global.highestLevelCleared;
		sLevel = game.global.sLevel;
		lastSkele = game.global.lastSkeletimp;
		totalHeliumEarned = game.global.totalHeliumEarned;
		prison = game.global.prisonClear;
		frugal = game.global.frugalDone;
		slow = game.global.slowDone;
		bestHelium = (game.global.tempHighHelium > game.global.bestHelium) ? game.global.tempHighHelium : game.global.bestHelium;
		if (game.stats.bestHeliumHour.valueTotal < game.stats.heliumHour.value(true)){
			game.stats.bestHeliumHour.valueTotal = game.stats.heliumHour.value(true);
		}
		stats = game.stats;
		repeat = game.global.repeatMap;
		if (game.global.selectedChallenge) challenge = game.global.selectedChallenge;
		achieves = game.achievements;
	}
	game = null;
	game = newGame();
	game.global.autoSave = autoSave;
	game.global.messages = messages;
	game.options = options;
	if (keepPortal){
		game.achievements = achieves;
		calculateAchievementBonus();
		game.global.bestHelium = bestHelium;
		game.portal = portal;
		game.global.b = b;
		game.global.heliumLeftover = helium;
		game.global.totalPortals = totalPortals;
		game.unlocks.imps = imps;
		game.global.highestLevelCleared = highestLevel;
		game.global.challengeActive = challenge;
		game.global.sLevel = sLevel;
		game.global.lastSkeletimp = lastSkele;
		game.global.totalHeliumEarned = totalHeliumEarned;
		game.global.prisonClear = prison;
		game.global.frugalDone = frugal;
		game.global.slowDone = slow;
		for (var statItem in stats){
			statItem = stats[statItem];
			if (typeof statItem.value !== 'undefined' && typeof statItem.valueTotal !== 'undefined') statItem.valueTotal += statItem.value;
			if (typeof statItem.value !== 'undefined' && typeof statItem.value !== 'function') statItem.value = 0;
		}
		game.stats = stats;
		game.global.repeatMap = repeat;

		if (sLevel >= 1) applyS1();
		if (sLevel >= 2) applyS2();
		if (sLevel >= 3) applyS3();
		
		if (challenge !== "" && typeof game.challenges[challenge].start !== 'undefined') game.challenges[challenge].start();
		game.portal.Coordinated.currentSend = 1;
	}
	numTab(1);
	pauseFight(true);
	repeatClicked(true);
	toggleAutoTrap(true);
	resetAdvMaps();
	cancelPortal();
	updateRadioStacks();
	updateAntiStacks();
	checkAchieve("portals");
}

function applyS1(){
	game.resources.science.owned += 5000;
	game.resources.wood.owned += 100;
	game.resources.food.owned += 100;
	game.global.autoCraftModifier += 0.25;
	document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 4) + " Foremen";
}

function applyS2(){
	if (game.global.challengeActive != "Frugal"){
		var toUnlock = ["Supershield", "Dagadder", "Bootboost", "Megamace", "Hellishmet", "Polierarm", "Pantastic", "Axeidic", "Smoldershoulder", "Greatersword", "Bestplate"];
		if (game.global.slowDone){
			toUnlock.push("Harmbalest");
			toUnlock.push("GambesOP");
		}
		for (var x = 0; x < toUnlock.length; x++){
			var upgradeToUnlock = game.mapUnlocks[toUnlock[x]];
			upgradeToUnlock.fire();
			upgradeToUnlock.last += 5;
		}
	}
	game.buildings.Barn.owned = 5;
	game.buildings.Barn.purchased = 5;
	game.resources.food.max = 16000;
	game.buildings.Shed.owned = 5;
	game.buildings.Shed.purchased = 5;
	game.resources.wood.max = 16000;
	game.buildings.Forge.owned = 5;
	game.buildings.Forge.purchased = 5;
	game.resources.metal.max = 16000;
}

function applyS3(){
	game.global.playerModifier = 2;
	game.resources.trimps.owned = game.resources.trimps.realMax();
	if (document.getElementById("trimps").style.visibility == "hidden") fadeIn("trimps", 10);
}


function message(messageString, type, lootIcon, extraClass) {
	var log = document.getElementById("log");
	var needsScroll = ((log.scrollTop + 10) > (log.scrollHeight - log.clientHeight));
	var displayType = (game.global.messages[type]) ? "block" : "none";
	var prefix = "";
	if (lootIcon && lootIcon.charAt(0) == "*") {
		lootIcon = lootIcon.replace("*", "");
		prefix =  "icomoon icon-" 
	}
	else prefix = "glyphicon glyphicon-";
	if (type == "Story") messageString = "<span class='glyphicon glyphicon-star'></span> " + messageString;
	if (type == "Combat") messageString = "<span class='glyphicon glyphicon-flag'></span> " + messageString;
	if (type == "Loot" && lootIcon) messageString = "<span class='" + prefix + lootIcon + "'></span> " + messageString;
	var addId = "";
	if (messageString == "Game Saved!") {
		addId = " id='saveGame'";
		if (document.getElementById('saveGame') !== null){
			log.removeChild(document.getElementById('saveGame'));
		}
	}
	if (type == "Notices"){
		messageString = "<span class='glyphicon glyphicon-off'></span> " + messageString;
	}
	log.innerHTML += "<span" + addId + " class='" + type + "Message message" +  " " + extraClass + "' style='display: " + displayType + "'>" + messageString + "</span>";
	if (needsScroll) log.scrollTop = log.scrollHeight;
	if (type != "Story") trimMessages(type);
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
	return (displayed) ? "btn btn-success logFlt" : "btn btn-danger logFlt";
}


function numTab (what, p) {
	var num = 0;
	
	if (what == 5){	
		unlockTooltip();
		tooltip('hide');
		var numBox = document.getElementById("customNumberBox");
		if (numBox){
			num = numBox.value.toLowerCase();
			if (num.split('e')[1]){
				num = num.split('e');
				num = Math.floor(parseFloat(num[0]) * (Math.pow(10, parseInt(num[1]))));
			}
			else {
				var letters = num.replace(/[^a-z]/gi, "");
				var base = 0;
				if (letters.length){			
					var suffices = [
						'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud',
						'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Od', 'Nd', 'V', 'Uv', 'Dv',
						'Tv', 'Qav', 'Qiv', 'Sxv', 'Spv', 'Ov', 'Nv', 'Tt'
					];
					for (var x = 0; x < suffices.length; x++){
						if (suffices[x].toLowerCase() == letters){
							base = x + 1;
							break;
						}
					}
					if (base) num = Math.round(parseFloat(num.split(letters)[0]) * Math.pow(1000, base));
				}
				if (!base) num = parseInt(num);
			}
		}
		else num = game.global.lastCustomAmt;
		if (p && num > 1000){
			return;
		}
		if (num > 0) {
			var text = "+" + prettify(num);
			document.getElementById("tab5Text").innerHTML = text;
			document.getElementById("ptab5Text").innerHTML = text;
			game.global.buyAmt = num;
			game.global.lastCustomAmt = num;
		}
		else {
			message("Please use a number greater than 0!", "Notices");
			return;
		}
	}
	if (typeof what === 'undefined') what = game.global.numTab;
	else
	game.global.numTab = what;
	var tabType = (p) ? "ptab" : "tab";
	for (var x = 1; x <= 5; x++){
		var thisTab = document.getElementById(tabType + x);
		thisTab.style.background = (what == x) ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.25)";	
		if (x == 5) break;
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
	
	if (p) {
		updateAllPerkColors();
	}


}

//Buildings Specific
function removeQueueItem(what) {
	var queue = document.getElementById("queueItemsHere");
	var elem;
	if (what == "first"){
		elem = queue.firstChild;
		var name = game.global.buildingsQueue[0].split('.');
		if (name[1] > 1){
			name[1] = (parseInt(name[1], 10) - 1);
			var newQueue = name[0] + "." + name[1];
			name = name[0] + " X" + name[1];
			game.global.buildingsQueue[0] = newQueue;
			elem.firstChild.innerHTML = name;
		}
		else{
			queue.removeChild(elem);
			game.global.buildingsQueue.splice(0, 1);
		}
		checkEndOfQueue();
		return;
	}
	var index = getQueueElemIndex(what, queue);
	elem = document.getElementById(what);
	if (!game.global.buildingsQueue[index]) index = 0;
	queue.removeChild(elem);
	refundQueueItem(game.global.buildingsQueue[index]);
	game.global.buildingsQueue.splice(index, 1);
	if (index === 0) {
		game.global.crafting = "";
		game.global.timeLeftOnCraft = 0;
	}
	checkEndOfQueue();
}

function getQueueElemIndex(id, queue){
	var childs = queue.getElementsByTagName('*');
	for (var i = 0, len = childs.length; i < len; i++){
		if (childs[i].id == id) return ((i - 1)/ 2);
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
	elem.innerHTML += '<div class="queueItem" id="queueItem' + game.global.nextQueueId + '" onmouseover="tooltip(\'Queue\',null,event)" onmouseout="tooltip(\'hide\')" onClick="removeQueueItem(\'queueItem' + game.global.nextQueueId + '\'); cancelTooltip();"><span class="queueItemName">' + name + '</span></div>';
	if (game.global.nextQueueId === 0) setNewCraftItem();
	game.global.nextQueueId++;
}

function updateSkeleBtn(){
	document.getElementById("boneBtnContainer").style.display = "block";
	document.getElementById("boneBtnText").innerHTML = "Trade " + prettify(game.global.b) + " Bones";
}

//
//Number updates
function updateLabels() { //Tried just updating as something changes, but seems to be better to do all at once all the time
	var toUpdate;
	//Resources (food, wood, metal, trimps, science). Per second will be handled in separate function, and called from job loop.
	for (var item in game.resources){
		toUpdate = game.resources[item];
		if (!(toUpdate.owned > 0)){
			toUpdate.owned = parseFloat(toUpdate.owned);
			if (!(toUpdate.owned > 0)) toUpdate.owned = 0;
		}
		document.getElementById(item + "Owned").innerHTML = prettify(Math.floor(toUpdate.owned), true);
		if (toUpdate.max == -1 || document.getElementById(item + "Max") === null) continue;
		var newMax = toUpdate.max;
		if (item != "trimps")
			newMax += (newMax * game.portal.Packrat.modifier * game.portal.Packrat.level);
		else if (item == "trimps") newMax = toUpdate.realMax();
		document.getElementById(item + "Max").innerHTML = prettify(newMax);
		var bar = document.getElementById(item + "Bar");
		if (game.options.menu.progressBars.enabled){
			var percentToMax = ((toUpdate.owned / newMax) * 100);
			bar.style.backgroundColor = getBarColor(100 - percentToMax);
			bar.style.width = percentToMax + "%";
		}
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
		elem.innerHTML = (game.options.menu.menuFormatting.enabled) ? prettify(toUpdate.owned) : toUpdate.owned;
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
		document.getElementById(itemB + "Owned").innerHTML = (game.options.menu.menuFormatting.enabled) ? prettify(toUpdate.owned) : toUpdate.owned;
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
	checkAndDisplayEquipment();
}

function checkAndDisplayEquipment() {
		for (var itemD in game.equipment){
		var toUpdate = game.equipment[itemD];
		if (toUpdate.locked == 1) continue;
		if (document.getElementById(itemD) === null) unlockEquipment(itemD, true);
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
			 
			if (game.global.playerGathering == increase){
				if (game.global.turkimpTimer > 0){
					psText *= 1.5;
				}
			psText += game.global.playerModifier;
		}
			elem = document.getElementById(increase + "Ps");
			//Portal Packrat
			increase = game.resources[increase];
			if (increase.max != -1){
				var newMax = increase.max + (increase.max * game.portal.Packrat.modifier * game.portal.Packrat.level);
				if (increase.owned >= newMax) psText = 0;
			}
			psText = psText.toFixed(1);
			
		}
		psText = prettify(psText);
/*		var color = (psText < 0) ? "red" : "green";
		if (psText == 0) color = "black"; */
		var color = "white";
		psText = (psText < 0) ? "-" + psText : "+" + psText;
		psText += "/sec";
		if (trimps && game.unlocks.quickTrimps) {
			psText += " (x2!)"; 
			color = "orange";
		}
		elem.innerHTML = psText;
		elem.style.color = color;
}

function updateSideTrimps(){
	var trimps = game.resources.trimps;
	document.getElementById("trimpsEmployed").innerHTML = prettify(trimps.employed);
	var breedCount = (trimps.owned - trimps.employed > 2) ? prettify(Math.floor(trimps.owned - trimps.employed)) : 0;
	document.getElementById("trimpsUnemployed").innerHTML = breedCount;
	document.getElementById("maxEmployed").innerHTML = prettify(Math.ceil(trimps.realMax() / 2));
	var free = (Math.ceil(trimps.realMax() / 2) - trimps.employed);
	var s = (free > 1) ? "s" : "";
	document.getElementById("jobsTitleUnemployed").innerHTML = prettify(free) + " workspace" + s;
}

function unlockBuilding(what) {
	game.global.lastUnlock = new Date().getTime();
	var locked = game.buildings[what].locked;
	var elem = document.getElementById("buildingsHere");
	elem.innerHTML = "";
	game.buildings[what].locked = 0;
	for (var item in game.buildings){
		if (game.buildings[item].locked == 1) continue;
		drawBuilding(item, elem);	
	}
	if (locked == 1){
		document.getElementById("buildingsAlert").innerHTML = "!";
		document.getElementById(what + "Alert").innerHTML = "!";
	}
}

function drawBuilding(what, where){
	where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'buildings\',event)" onmouseout="tooltip(\'hide\')" class="thing noselect pointer buildingThing" id="' + what + '" onclick="buyBuilding(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">0</span></div>';
}

function unlockJob(what) {
	game.global.lastUnlock = new Date().getTime();
	var locked = game.jobs[what].locked;
	game.jobs[what].locked = 0;
	var elem = document.getElementById("jobsHere");
	elem.innerHTML = "";
	for (var item in game.jobs){
		if (game.jobs[item].locked == 1) continue;
		drawJob(item, elem);
	}
	if (locked == 1){
		document.getElementById("jobsAlert").innerHTML = "!";
		document.getElementById(what + "Alert").innerHTML = "!";
	}
}

function drawJob(what, where){
	where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'jobs\',event)" onmouseout="tooltip(\'hide\')" class="thing noselect pointer jobThing" id="' + what + '" onclick="buyJob(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">0</span></div>';
}
function refreshMaps(){
	document.getElementById("mapsHere").innerHTML = "";
	for (var item in game.global.mapsOwnedArray) {
			unlockMap(item);
	}
}

function getUniqueColor(item){
	if (item.location && game.mapConfig.locations[item.location].upgrade){
			var upgrade = game.mapUnlocks[game.mapConfig.locations[item.location].upgrade];
			if (upgrade.specialFilter && !upgrade.specialFilter()) return " noRecycleDone";
			if (upgrade.canRunOnce) return " noRecycle";
			
		}
	return " noRecycleDone";	
}

function unlockMap(what) { //what here is the array index
	var item = game.global.mapsOwnedArray[what];
	var elem = document.getElementById("mapsHere");
	var btnClass = "thing noselect pointer mapThing";
	if (game.unlocks.goldMaps && !item.noRecycle) btnClass += " goldMap";
	if (item.noRecycle)	btnClass += getUniqueColor(item);
	elem.innerHTML = '<div class="' + btnClass + '" id="' + item.id + '" onclick="selectMap(\'' + item.id + '\')"><span class="thingName">' + item.name + '</span><br/><span class="thingOwned mapLevel">Level ' + item.level + '</span></div>' + elem.innerHTML;
	//onmouseover="tooltip(\'' + item.id + '\',\'maps\',event)" onmouseout="tooltip(\'hide\')"
}

function unlockUpgrade(what, displayOnly) {
	if (!displayOnly) game.global.lastUnlock = new Date().getTime();
	var elem = document.getElementById("upgradesHere");
	elem.innerHTML = "";
	var upgrade = game.upgrades[what];
	upgrade.locked = 0;
	if (upgrade.prestiges){
		var resName = (what == "Supershield") ? "wood" : "metal";
		upgrade.cost.resources[resName] = getNextPrestigeCost(what);
	}
	
	if (!displayOnly) {
		upgrade.allowed++;
	}
	for (var item in game.upgrades){
		if (game.upgrades[item].locked == 1) continue;
		drawUpgrade(item, elem);
	}
	if (!displayOnly){
		document.getElementById("upgradesAlert").innerHTML = "!";
		document.getElementById(what + "Alert").innerHTML = "!";
	}
}

function drawUpgrade(what, where){
	var upgrade = game.upgrades[what];
	if (upgrade.prestiges && (!upgrade.cost.resources[metal] || !upgrade.cost.resources[wood])){
		var resName = (what == "Supershield") ? "wood" : "metal";
		upgrade.cost.resources[resName] = getNextPrestigeCost(what);
	}
	var done = upgrade.done;
	var dif = upgrade.allowed - done;
	if (dif >= 1) dif -= 1;
	where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'upgrades\',event)" onmouseout="tooltip(\'hide\')" class="thing noselect pointer upgradeThing" id="' + what + '" onclick="buyUpgrade(\'' + what + '\')"><span id="' + what + 'Alert" class="alert badge"></span><span class="thingName">' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">' + done + '</span></div>';
	if (dif >= 1) document.getElementById(what + "Owned").innerHTML = upgrade.done + "(+" + dif + ")";
}

function checkButtons(what) {
	var where = game[what];
	if (what == "jobs") {
		var workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
		for (var item in game.jobs){
			if (game.jobs[item].locked == 1) continue;
			if (workspaces <= 0) updateButtonColor(item, false, true);
			else updateButtonColor(item,canAffordJob(item, false, workspaces),true);
		}
		return;
	}
	if (what == "upgrades"){
		for (var itemA in game.upgrades){
			if (game.upgrades[itemA].locked == 1) continue;
			if (itemA == "Coordination")
				updateButtonColor(itemA, (canAffordTwoLevel(game.upgrades[itemA]) && canAffordCoordinationTrimps()));
			else
				updateButtonColor(itemA, canAffordTwoLevel(game.upgrades[itemA]));
		}
		return;
	}
	if (what == "buildings"){
		for (var itemBuild in game.buildings){
			var thisBuilding = game.buildings[itemBuild];
			if (thisBuilding.locked == 1) continue;
			updateButtonColor(itemBuild, canAffordBuilding(itemBuild));
		}
		return;
	}
	if (what == "equipment"){
		for (var itemEquip in game.equipment){
			var thisEquipment = game.equipment[itemEquip];
			if (thisEquipment.locked == 1) continue;
			updateButtonColor(itemEquip, canAffordBuilding(itemEquip, null, null, true));
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
	var elem = document.getElementById(what);
	if (elem === null){
		return;
	}
	if (game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) canAfford = false;
	var color = (canAfford) ? "black" : "grey";
	if (isJob && game.global.firing === true) color = (game.jobs[what].owned >= 1) ? "red" : "grey";
	if (what == "Warpstation" && color == "black") color = getWarpstationColor();
	elem.style.background = color;
}

function getWarpstationColor() {
	var amt = game.upgrades.Gigastation.done * 5;
	if (amt > 255) amt = 255;
	return "rgb(0, " + Math.floor(amt / 2) + ", " + amt + ")";

}

function unlockEquipment(what, fromCheck) {
	game.global.lastUnlock = new Date().getTime();
	var equipment = game.equipment[what];
	var elem = document.getElementById("equipmentHere");
	equipment.locked = 0;
	if (!fromCheck){
		elem.innerHTML = "";
		checkAndDisplayEquipment();
		return;
	}
	var numeral = "";
	if (equipment.prestige > 1){
		numeral = romanNumeral(equipment.prestige);
	}
	elem.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'equipment\',event)" onmouseout="tooltip(\'hide\')" class="noselect pointer thing" id="' + what + '" onclick="buyEquipment(\'' + what + '\')"><span class="thingName">' + what + ' <span id="' + what + 'Numeral">' + numeral + '</span></span><br/><span class="thingOwned">Level: <span id="' + what + 'Owned">0</span></span></div>';
}

function getBarColor(percent, forText) {
	if (percent > 50) return "#00B2EE";
	else if (percent > 25) return "yellow";
	else if (percent > 10) return "#FFA824";
	else return "red";
}

function displayPerksBtn(){
	var btn = document.getElementById("pastUpgradesBtn");
	if (game.global.totalPortals == 0){
		btn.className = "btn";
		btn.innerHTML = "???";
	}
	else {
		btn.className = "btn btn-primary";
		btn.innerHTML = "View Perks";
	}
}


function toggleSettingsMenu(){
	game.options.displayed = !game.options.displayed;
	var menuElem = document.getElementById("settingsHere");
	if (menuElem.innerHTML == "") displaySettings();
	if (game.options.displayed) menuElem.style.display = "block";
	else
	menuElem.style.display = "none";
	
	
}

function displaySettings() {
	var settingsHere = document.getElementById("settingsHere");
	var html = "";
	for (var item in game.options.menu){
		var optionItem = game.options.menu[item];
		var text = optionItem.titles[optionItem.enabled];
		html += "<div class='optionContainer'><div id='toggle" + item + "' class='noselect settingBtn settingBtn" + optionItem.enabled + "' onclick='toggleSetting(\"" + item + "\")'>" + text + "</div><div class='optionItemDescription'>" + optionItem.description + "</div></div> ";
	}
	settingsHere.innerHTML = html;
}

function toggleSetting(setting){
	var menuOption = game.options.menu[setting];
	var toggles = menuOption.titles.length;
	if (toggles == 2)	menuOption.enabled = (menuOption.enabled) ? 0 : 1;
	else {
		menuOption.enabled++;
		if (menuOption.enabled >= toggles) menuOption.enabled = 0;
	}
	if (menuOption.onToggle) menuOption.onToggle();
	var menuElem = document.getElementById("toggle" + setting);
	menuElem.innerHTML = menuOption.titles[menuOption.enabled];
	menuElem.className = "";
	menuElem.className = "settingBtn settingBtn" + menuOption.enabled;
}
	
	function achievementCompatibilityUnlock() {
		checkAchieve("zones", null, false, true);
		checkAchieve("damage", calculateDamage(game.global.soldierCurrentAttack, true, true, true), false, true);
		checkAchieve("trimps", game.resources.trimps.owned, false, true);
		checkAchieve("portals", null, false, true);
		checkAchieve("totalZones", null, false, true);
		checkAchieve("totalMaps", null, false, true);
		game.stats.gemsCollected.value += game.resources.gems.owned;
		checkAchieve("totalGems", null, false, true);
		for (var item in game.achievements.housing.breakpoints){
			item = game.achievements.housing.breakpoints[item];
			if (game.buildings[item].owned > 0) checkAchieve("housing", item, false, true);
			else break;
		}
		if (game.global.achievementBonus > 0){
			cancelTooltip();
			tooltip("New Achievements", null, 'update');
		}
	}

	function displayAchievementPopup(id, forHover, displayNumber){
		if (!forHover && game.options.menu.achievementPopups.enabled == 0) return;
		var achievement = game.achievements[id];
		var index = achievement.newStuff.indexOf(displayNumber);
		if (index != -1) {
			document.getElementById(id + displayNumber + "Alert").style.display = "none";
			achievement.newStuff.splice(index, 1);
		}
		var location = (forHover) ? "Hover" : "Popup";
		if (!forHover) displayNumber = achievement.finished;
		var color = game.colorsList[achievement.tiers[displayNumber]];
		if (forHover && displayNumber > achievement.finished) {
			document.getElementById("achievement" + location).style.display = "block";
			document.getElementById("achievement" + location + "IconContainer").innerHTML = '<span style= "color: ' + color + ';" class="icomoon icon-locked achievementPopupIcon"></span>';
			document.getElementById("achievement" + location + "Title").innerHTML = "Locked";
			document.getElementById("achievement" + location + "Title").style.color = color;
			document.getElementById("achievement" + location + "Description").innerHTML = "Locked";
			document.getElementById("achievement" + location + "Reward").innerHTML = '<b>Reward:</b> +' + game.tierValues[achievement.tiers[displayNumber]] + "% Damage";	
			return;
		}
		document.getElementById("achievement" + location).style.display = "block";
		document.getElementById("achievement" + location + "IconContainer").innerHTML = '<span style= "color: ' + color + ';" class="' + achievement.icon + ' achievementPopupIcon"></span>';
		document.getElementById("achievement" + location + "Title").innerHTML = achievement.names[displayNumber];
		document.getElementById("achievement" + location + "Title").style.color = color;
		document.getElementById("achievement" + location + "Description").innerHTML = achievement.description(displayNumber);
		document.getElementById("achievement" + location + "Reward").innerHTML = '<b>Reward:</b> +' + game.tierValues[achievement.tiers[displayNumber]] + "% Damage";
	}

	function checkAchieve(id, evalProperty, doubleChecking, noDisplay) {
		var achievement = game.achievements[id];
		if (achievement.finished == achievement.tiers.length) return;
		if (typeof achievement.evaluate !== 'undefined') evalProperty = achievement.evaluate();
		if (typeof achievement.breakpoints[achievement.finished] === 'number'){
			if (!achievement.reverse){
				if (evalProperty < achievement.breakpoints[achievement.finished]) return;	
			}
			else {
				if (evalProperty > achievement.breakpoints[achievement.finished]) return;
			}
		}
		else if (evalProperty != achievement.breakpoints[achievement.finished]) return;
		if (!noDisplay) displayAchievementPopup(id);
		achievement.newStuff.push(achievement.finished);
		achievement.finished++;
		checkAchieve(id, evalProperty, true, noDisplay);
		if (!doubleChecking) calculateAchievementBonus();
		if (trimpAchievementsOpen && !doubleChecking) displayAchievements();
	}
	
	function calculateAchievementBonus(){
		var totalBonus = 0;
		for (var item in game.achievements){
			var achievement = game.achievements[item];
			for (var x = 0; x < achievement.finished; x++){
				totalBonus += game.tierValues[achievement.tiers[x]];
			}	
		}
		game.global.achievementBonus = totalBonus.toFixed(1);
	}
	
	function displayAchievements(){
		var htmlString = "";
		for (var item in game.achievements) {
			var achievement = game.achievements[item];
			if (typeof achievement.display !== 'undefined' && !achievement.display()) continue;
			var amount = achievement.tiers.length;
			var titleClass = 'class="achievementTitle';
			if (amount > 12 && achievement.finished < 10) amount = 12;
			titleClass += (amount > 12) ? ' doubleTall"' : '"';
			htmlString += '<div class="achievementsContainer"><div ' + titleClass + '>' + achievement.title + '</div><span class="littleAchievementWrapper">';
			var calcAmount = (amount > 12) ? (amount / 2) : amount;
			width = 7.3;
			for (var x = 0; x < amount; x++){
				var displayColor = "grey";
				var borderStyle = "";
				var tierValue = "<span style='color: black;' class='" + achievement.icon + "'></span>";
				if (achievement.finished == x) displayColor = "#C5C515"; //Yellow
				else if (achievement.finished > x) {
					displayColor = "#159515"; //Greenz
					if (achievement.newStuff.length && achievement.newStuff.indexOf(x) != -1) tierValue = "<span id='" + item + x + "Alert' style='color: yellow;' class='icomoon icon-exclamation-circle'></span>&nbsp;" + tierValue;
				}
				else tierValue = "&nbsp;";
				borderStyle = "border: 0.2vw solid " + game.colorsList[achievement.tiers[x]] + ";";
				htmlString += '<div onmouseover="displayAchievementPopup(\'' + item + '\', true, ' + x + ')" class="achievementContainer" style="background-color: ' + displayColor + '; width: ' + width + '%;' + borderStyle + '">' + tierValue + '</div>';
			}
			htmlString += '</span><div id="' + item + 'Description" class="achievementDescription")"></div></div>';		
		}
		document.getElementById("achievementsHere").innerHTML = htmlString;
		document.getElementById("achievementTotalPercent").innerHTML = game.global.achievementBonus;
	}
	
	var trimpAchievementsOpen = false;
	function toggleAchievementWindow(){
		closeAchievementPopup();
		document.getElementById("achievementWrapper").style.display = (trimpAchievementsOpen) ? "none" : "block";
		document.getElementById("wrapper").style.display = (trimpAchievementsOpen) ? "block" : "none";
		trimpAchievementsOpen = !trimpAchievementsOpen;
		if (trimpAchievementHelpOn) toggleAchievementHelp();
		if (!trimpAchievementsOpen) return;
		displayAchievements();
		var fluff = {
			high: [", thanks to your bounty of achievements", ", must be all those achievements", ", you are one with the achievements", " and you water your achievements daily"],
			mid: [", your achievement game shows promise", " on your path to achievement", ", thanks to your achievements"],
			low: [", better get some more achievements", ", you'd do fine with a few more achievements", " but you wish you had a few more achievements"]
		};
		var percent = game.global.achievementBonus;
		var fluffLevel;
		if (percent < 15) fluffLevel = "low";
		else if (percent < 150) fluffLevel = "mid";
		else fluffLevel = "high";
		fluff = fluff[fluffLevel];
		fluff = fluff[Math.floor(Math.random() * fluff.length)]
		document.getElementById("achievementFluff").innerHTML = fluff;
		document.getElementById("achievementTotalPercent").innerHTML = percent;
	}
	
	var trimpAchievementHelpOn = false;
	function toggleAchievementHelp(){
		document.getElementById("achievementHelp").style.color = (trimpAchievementHelpOn) ? "#202080" : "#6060C0";
		document.getElementById("achievementHeader").style.display = (trimpAchievementHelpOn) ? "block" : "none";
		document.getElementById("achievementHelpContainer").style.display = (trimpAchievementHelpOn) ? "none" : "block";
		trimpAchievementHelpOn = !trimpAchievementHelpOn;
	}
	
	function closeAchievementPopup(forHover){
		var location = (forHover) ? "Hover" : "Popup";
		document.getElementById("achievement" + location).style.display = "none";
	}
	
	function showAchievementDescription(id, number){
		var elem = document.getElementById(id + "Description");
		var achievement = game.achievements[id];
		if (number > achievement.finished) return;
		elem.innerHTML = "<b>" + achievement.names[number] + ":</b> " + achievement.description(number) + "<br/><br/>";
	}
	
	function hideAchievementDescription(id){
		document.getElementById(id + "Description").innerHTML = "";
	}






















