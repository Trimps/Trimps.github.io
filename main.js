//I wrote all of this code by hand with no libraries so I could learn stuff (except LZString for save import/export, string compression is out of my league. Credits in that file). This is my first javascript project, so be nice.
//Feel free to read through the code and use stuff if you want, I don't know how to properly comment code so I just wrote stuff where I felt like it
//I will be continually cleaning up and making this code more readable as my javascript skills improve
//Contact me via Kongregate as GreenSatellite, reddit on /r/Trimps, or Email at trimpsgame@gmail.com
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
"use strict";

function toggleSave(updateOnly) {
    var elem = document.getElementById("toggleBtn");
    if (updateOnly) game.global.autoSave = (game.global.autoSave) ? false : true;
    if (game.global.autoSave) {
        game.global.autoSave = false;
        elem.innerHTML = "Not Saving";
        elem.className = "";
        elem.className = "btn btn-danger";
    } else {
        game.global.autoSave = true;
        elem.innerHTML = "Auto-Saving";
        elem.className = "";
        elem.className = "btn btn-info";
    }
}

function autoSave() {
    if (game.global.autoSave) save();
    setTimeout(autoSave, 60000);
}

function save(exportThis) {
	//This has gotten really sloppy and really needs to be rethought, and I feel like the save string should be considerably shorter. Some day.
    var saveString = JSON.stringify(game);
    var saveGame = JSON.parse(saveString);
    delete saveGame.worldUnlocks;
    delete saveGame.badGuys;
    delete saveGame.mapConfig;
	delete saveGame.global.prestige;
	delete saveGame.worldText;
	delete saveGame.trimpDeathTexts;
	delete saveGame.badGuyDeathTexts;
    for (var item in saveGame.equipment) {
		delete saveGame.equipment[item].tooltip;
		delete saveGame.equipment[item].blocktip;
        delete saveGame.equipment[item].cost;
    }
    for (var itemA in saveGame.buildings) {
        delete saveGame.buildings[itemA].tooltip;
        delete saveGame.buildings[itemA].cost;
		delete saveGame.buildings.Barn.increase;
		delete saveGame.buildings.Forge.increase;
		delete saveGame.buildings.Shed.increase;
    }
    for (var itemB in saveGame.upgrades) {
        delete saveGame.upgrades[itemB].tooltip;
        delete saveGame.upgrades[itemB].cost;
		delete saveGame.upgrades[itemB].prestiges;
    }
    for (var itemC in saveGame.jobs) {
        delete saveGame.jobs[itemC].tooltip;
        delete saveGame.jobs[itemC].cost;
    }
    for (var itemD in saveGame.triggers) {
        delete saveGame.triggers[itemD].message;
        delete saveGame.triggers[itemD].cost;
    }
	for (var itemE in saveGame.mapUnlocks){
		var unlock = saveGame.mapUnlocks[itemE];
		delete unlock.level;
		delete unlock.message;
		delete unlock.icon;
		delete unlock.world;
		delete unlock.repeat;
		delete unlock.startAt;
	}
	for (var itemP in saveGame.portal){
		var portal = saveGame.portal[itemP];
		delete portal.modifier;
		delete portal.priceBase;
		delete portal.tooltip;
	}
    saveString = LZString.compressToBase64(JSON.stringify(saveGame));
    if (exportThis) return saveString;
	try{
		localStorage.setItem("trimpSave1",saveString);
		if (localStorage.getItem("trimpSave1") == saveString){
			message("Game Saved!", "Notices");
		}
		else {
			message("For some reason, your game is not saving. Make sure you export and back up your save!", "Notices");
		}
	}
	catch(err){ message("For some reason, your game is not saving. Make sure you export and back up your save!", "Notices"); }

}

function load(saveString, autoLoad) {
    var savegame;
	var oldVersion = 0;
    if (saveString) {
        savegame = JSON.parse(LZString.decompressFromBase64(document.getElementById("importBox").value));
        tooltip('hide');
    } else if (localStorage.getItem("trimpSave1") !== null) {
        savegame = JSON.parse(LZString.decompressFromBase64(localStorage.getItem("trimpSave1")));
    }
    if (typeof savegame === 'undefined' || savegame === null || typeof savegame.global === 'undefined') return;
	oldVersion = savegame.global.version;
	resetGame();
		
    if (game.global.killSavesBelow > oldVersion) {
		if (savegame.global.version == 0.07){
			game.global.kongBonusMode = true;
			activateKongBonus(savegame.global.world);
			return;
		}
        message("I'm so terribly sorry, but your previous save game (version " + savegame.global.version + ") does not work in the new version. This should be the last reset!", "Notices");
        return;
    } else savegame.global.version = game.global.version;
    if (typeof savegame.global !== 'undefined') {
        for (var item in game.global) {
            if (item == "time" || item == "start" || item == "lastFightUpdate" || item == "prestige") continue;
            if (typeof savegame.global[item] !== 'undefined') game.global[item] = savegame.global[item];
            if (item == "buildingsQueue") {
                for (var itemA in game.global.buildingsQueue) {
                    addQueueItem(game.global.buildingsQueue[itemA]);
                }
            }
        }
    }

    if (typeof savegame.global.messages.Notices === 'undefined') savegame.global.messages.Notices = true; //compatibility from 0.3 to 0.4, this line can be removed next time saves are wiped

    if (typeof savegame.resources !== 'undefined') {
        for (var itemB in game.resources) {
            if (typeof savegame.resources[itemB] !== 'undefined') game.resources[itemB] = savegame.resources[itemB];
        }
    }
    for (var a in game) { //global, resources, jobs, buildings, upgrades, triggers, equipment, settings
        if (a == "global") continue;
        if (a == "badGuys") continue;
        if (a == "worldUnlocks") continue;
        if (a == "mapConfig") continue;
        var topSave = savegame[a];
        if (typeof topSave === 'undefined' || topSave === null) continue;
		if (a == "equipment"){
			loadEquipment(topSave); 
			continue;
		}
		var topGame = game[a];
        for (var b in topGame) { //each item in main category (resource names, job names, etc)
            var midSave = topSave[b];
            if (typeof midSave === 'undefined' || midSave === null) continue;
            var midGame = topGame[b];
            if (typeof midSave !== 'object') midGame = midSave;
            else
                for (var c in midGame) { //purchased, cost, etc
                    if (c == "cost") continue;
                    if (c == "tooltip") continue;
					if (a == "mapUnlocks" && c == "repeat") continue;
					if (a == "resources" && c == "owned"){
						//check bad entries here.
					}
					if (a == "buildings" && c == "purchased"){
						if (savegame.buildings[b].purchased < 0) savegame.buildings[b].purchased = 0;
					}
                    var botSave = midSave[c];
                    if (typeof botSave === 'undefined' || botSave === null) continue;
                    midGame[c] = botSave;
                }
        }
    }
	if (oldVersion === 1.0){
		var hasPortal = false;
		for (var portItem in game.portal){
			var portUpgrade = game.portal[portItem];
			if (portUpgrade.level > 0) hasPortal = true;
			if (typeof portUpgrade.level === 'undefined') continue;
			for (var c = 0; c < portUpgrade.level; c++){
				portUpgrade.heliumSpent += Math.ceil((c / 2) + portUpgrade.priceBase * Math.pow(1.3, c));
			}
		}
		if (hasPortal) game.global.totalPortals = 1;
	}
	if (oldVersion === 1.01){
		game.jobs.Dragimp.modifier = (.5 * Math.pow(1.05, game.buildings.Tribute.owned));
	}
	if (oldVersion === 1.02){
		for (var checkResourceMax in game.resources){
			var toCheckMax = game.resources[checkResourceMax];
			if (toCheckMax.max == -1) continue;
			toCheckMax.max = parseFloat(toCheckMax.max);
		}
	}
    if (game.buildings.Gym.locked === 0) document.getElementById("blockDiv").style.visibility = "visible";
    if (game.global.gridArray.length > 0) {
        document.getElementById("battleContainer").style.visibility = "visible";
		fadeIn("equipmentTab", 10);
		fadeIn("equipmentTitleDiv", 10);
        drawGrid();
        document.getElementById('metal').style.visibility = "visible";
        for (var x = 0; x <= game.global.lastClearedCell; x++) {
            document.getElementById("cell" + x).style.backgroundColor = "green";
        }
        if (game.global.battleClock > 0) document.getElementById("battleTimer").style.visibility = "visible";
    }
    if (game.global.mapGridArray.length > 0 && game.global.currentMapId != "") {
        drawGrid(true);
        for (var y = 0; y <= game.global.lastClearedMapCell; y++) {
            document.getElementById("mapCell" + y).style.backgroundColor = "green";
        }
    } else if (game.global.mapGridArray.length === 0 && game.global.mapsActive) game.global.mapsActive = false;
    if (game.resources.trimps.owned > 0 || game.buildings.Trap.owned > 0) game.buildings.Trap.first();
    if (game.global.autoBattle) {
        document.getElementById("pauseFight").style.visibility = "visible";
        pauseFight(true);
    }
    for (var itemC in game.global.mapsOwnedArray) {
		if (game.global.mapsOwnedArray[itemC].name == "Dimension of Anger") game.global.mapsOwnedArray[itemC].level = 20;
        unlockMap(itemC);
    }
	for (var messageBool in game.global.messages){
		if (!game.global.messages[messageBool]){
			filterMessage(messageBool, true);
		}
	}
	game.global.buyTab = "all";
	filterTabs("all");
	if (game.global.mapsUnlocked) unlockMapStuff();
	repeatClicked(true);
	game.global.lockTooltip = false;
	swapNotation(true);
	document.getElementById("worldNumber").innerHTML = game.global.world;
    mapsSwitch(true);
    checkTriggers(true);
	toggleAutoTrap(true);
    setGather(game.global.playerGathering);
    numTab(1);
	if (game.global.portalActive) {fadeIn("portalBtn", 10); fadeIn("helium", 10);}
	if (game.jobs.Explorer.locked == 0) fadeIn("fragmentsPs", 10);
	if (game.buildings.Tribute.locked == 0) fadeIn("gemsPs", 10);
    if (game.global.autoCraftModifier > 0)
        document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 4) + " Foremen";
    if (game.global.fighting) startFight();
    toggleSave(true);
	checkOfflineProgress();
	updateLabels();
	if (game.global.viewingUpgrades) viewPortalUpgrades();
	if (game.global.respecActive) respecPerks();
	if (game.global.kongBonusMode) activateKongBonus();
	if (game.global.totalPortals >= 1) document.getElementById("pastUpgradesBtn").style.display = "inline-block";
}

function portalClicked() {
	document.getElementById("wrapper").style.display = "none";
	document.getElementById("portalWrapper").style.backgroundColor = "green";
	document.getElementById("portalWrapper").style.color = "black";
	fadeIn("portalWrapper", 10);
	document.getElementById("portalTitle").innerHTML = "Time Portal";
	document.getElementById("portalStory").innerHTML = "Well, you did it. You followed your instincts through this strange world, made your way through the Dimension of Anger, and obtained this portal. But why? Maybe there will be answers through this portal... Your scientists tell you they can overclock it to bring more memories and items back, but they'll need helium to cool it.";
	document.getElementById("portalHelium").innerHTML = '<span id="portalHeliumOwned">' + prettify(game.resources.helium.owned + game.global.heliumLeftover) + '</span> Helium';
	document.getElementById("activatePortalBtn").style.display = "inline-block";
	displayPortalUpgrades();
}

function viewPortalUpgrades() {
	game.global.viewingUpgrades = true;
	document.getElementById("wrapper").style.display = "none";
	document.getElementById("portalWrapper").style.backgroundColor = "black";
	document.getElementById("portalWrapper").style.color = "white";
	fadeIn("portalWrapper", 10);
	document.getElementById("portalTitle").innerHTML = "View Perks";
	document.getElementById("portalHelium").innerHTML = '<span id="portalHeliumOwned">' + prettify(parseInt(game.global.heliumLeftover)) + '</span> Left Over';
	document.getElementById("portalStory").innerHTML = "These are all of your perks! You can reset them once per run.";
	document.getElementById("cancelPortalBtn").innerHTML = "Cancel";
	document.getElementById("activatePortalBtn").style.display = "none";
	if (game.global.canRespecPerks) {
		document.getElementById("respecPortalBtn").innerHTML = "Respec";
		document.getElementById("respecPortalBtn").style.display = "inline-block";
	}
	displayPortalUpgrades();
}

function displayPortalUpgrades(){
	var elem = document.getElementById("portalUpgradesHere");
	elem.innerHTML = "";
	game.resources.helium.totalSpentTemp = 0;
	for (var what in game.portal){
		var portUpgrade = game.portal[what];
		if (typeof portUpgrade.level === 'undefined') continue;
		portUpgrade.levelTemp = 0;
		portUpgrade.heliumSpentTemp = 0;	
		elem.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'portal\',event)" onmouseout="tooltip(\'hide\')" class="noselect pointer portalThing thing" id="' + what + '" onclick="buyPortalUpgrade(\'' + what + '\')"><span class="thingName">' + what + '</span><br/><span class="thingOwned">Level: <span id="' + what + 'Owned">' + portUpgrade.level + '</span></span></div>';
	}
}

function activateKongBonus(oldWorld){
	var helium = 0;
	var addText = "";
	if (oldWorld > 0){
		helium = Math.floor(oldWorld / 2);
		addText = "You earned " + helium + " bonus points for reaching World " + oldWorld + ".";
	}
	else {
		helium = game.resources.helium.owned;
		addText = "You still have " + helium + " bonus points to spend!"
	}
	document.getElementById("wrapper").style.display = "none";
	var portalWrapper = document.getElementById("portalWrapper");
	portalWrapper.style.backgroundColor = "black";
	portalWrapper.style.color = "white";
	document.getElementById("portalTitle").innerHTML = "Beta Bonus";
	document.getElementById("portalStory").innerHTML = "Thank you so much for helping test the beta version of Trimps. All of the support and feedback was amazing! This version still needs some feedback and tweaks before it will be perfect, but saves will not be purposely reset again. Enjoy! " + addText;
	document.getElementById("portalHelium").innerHTML = '<span id="portalHeliumOwned">' + helium + '</span> Bonus Points';
	document.getElementById("cancelPortalBtn").innerHTML = "No Thanks";
	document.getElementById("activatePortalBtn").innerHTML = "Finished";
		document.getElementById("activatePortalBtn").style.display = "inline-block";

	fadeIn("portalWrapper", 10);
	game.resources.helium.owned = helium;
	displayPortalUpgrades();
}


function checkOfflineProgress(){
	if (!game.global.lastOnline) return;
	var rightNow = new Date().getTime();
	var dif = rightNow - game.global.lastOnline;
	dif = Math.floor(dif / 1000);
	if (dif < 60) return;
	var textString = "While you were away, your Trimps were able to produce ";
	var compatible = ["Farmer", "Lumberjack", "Miner"];
	for (var x = 0; x < compatible.length; x++){
		var job = game.jobs[compatible[x]];
		var resName = job.increase;
		var resource = game.resources[resName];
		var amt = job.owned * job.modifier;
		amt += (amt * game.portal.Motivation.level * game.portal.Motivation.modifier);
		var perSec = amt;
		amt *= dif;
		var newMax = resource.max + (resource.max * game.portal.Packrat.modifier * game.portal.Packrat.level);
		var allowed = (newMax - resource.owned);
		if (amt > allowed) amt = allowed;
		resource.owned += amt;
		textString += prettify(amt) + " " + resName + ", ";
		if (x == (compatible.length - 2)) textString += "and ";
	}
	textString = textString.slice(0, -2);
	textString += ".";
	tooltip("Trustworthy Trimps", null, "update", textString);
}

function respecPerks(){
	if (!game.global.canRespecPerks) return;
	if (game.global.buildingsQueue.length > 0
	&& !(game.global.buildingsQueue.length == 1 && game.global.buildingsQueue[0] == "Trap.1")){
		cancelPortal();
		tooltip("Unable to Respec", null, "update");
		return;
	}
	game.global.respecActive = true;
	displayPortalUpgrades();
	game.resources.helium.respecMax = 0;
	for (var item in game.portal){
		var portUpgrade = game.portal[item];
		if (typeof portUpgrade.level === 'undefined') continue;
		portUpgrade.levelTemp -= portUpgrade.level;
		portUpgrade.heliumSpentTemp -= portUpgrade.heliumSpent;
		game.resources.helium.respecMax += portUpgrade.heliumSpent;
		document.getElementById(item + "Owned").innerHTML = "0";
	}

	game.resources.helium.respecMax += game.global.heliumLeftover;
	document.getElementById("portalHeliumOwned").innerHTML = prettify(game.resources.helium.respecMax);
	document.getElementById("respecPortalBtn").style.display = "none";
	document.getElementById("activatePortalBtn").innerHTML = "Confirm";
	document.getElementById("activatePortalBtn").style.display = "inline-block";
	document.getElementById("portalStory").innerHTML = "You can only respec once per run. Clicking cancel will not consume this use.";
	document.getElementById("portalTitle").innerHTML = "Respec Perks";
}

function activateClicked(){	
	if (game.global.respecActive){
		var refund = game.resources.helium.respecMax - game.resources.helium.totalSpentTemp;
		commitPortalUpgrades();
		game.global.heliumLeftover = refund;
		game.global.canRespecPerks = false;
		cancelPortal();
		game.resources.helium.respecMax = 0;
		return;
	}
	var newText = "";
	if (game.global.kongBonusMode){
		newText = "All set?";
	}
	else newText = "Are you sure you want to enter the portal? You will lose all progress other than the portal-compatible upgrades on this page. Who knows where or when it will send you.";
	newText += "<br/><div class='btn btn-info activatePortalBtn' onclick='activatePortal()'>Let's do it.</div>"
	document.getElementById("portalStory").innerHTML = newText;
}

function buyPortalUpgrade(what){
	if (!game.global.kongBonusMode && !game.global.portalActive && !game.global.respecActive) return;
	if (game.global.viewingUpgrades && !game.global.respecActive) return;
	var toBuy = game.portal[what];
	var price = getPortalUpgradePrice(what);
	var canSpend = (game.global.respecActive) ? game.resources.helium.respecMax :  (game.resources.helium.owned + game.global.heliumLeftover);
	if (canSpend >= (game.resources.helium.totalSpentTemp + price)){
		toBuy.levelTemp++;
		game.resources.helium.totalSpentTemp += price;
		toBuy.heliumSpentTemp += price;
		document.getElementById(what + "Owned").innerHTML = toBuy.level + toBuy.levelTemp;
		tooltip(what, "portal", "update");
		document.getElementById("portalHeliumOwned").innerHTML = prettify(canSpend - game.resources.helium.totalSpentTemp);
	}
}

function unlockMapStuff(){
	fadeIn("fragments", 10);
	fadeIn("gems", 10);
	fadeIn("mapsBtn", 10);
}

function getPortalUpgradePrice(what){
	var toCheck = game.portal[what];
	var tempLevel = toCheck.level + toCheck.levelTemp;
	return Math.ceil((tempLevel / 2) + toCheck.priceBase * Math.pow(1.3, tempLevel));
}

function commitPortalUpgrades(){
document.getElementById("pastUpgradesBtn").style.display = "inline-block";
	for (var item in game.portal){
		var portUpgrade = game.portal[item];
		if (typeof portUpgrade.level === 'undefined') continue;
		portUpgrade.level += portUpgrade.levelTemp;
		portUpgrade.levelTemp = 0;
		portUpgrade.heliumSpent += portUpgrade.heliumSpentTemp;
		portUpgrade.heliumSpentTemp = 0;
		
	} 
	if (game.global.respecActive){
		game.global.heliumLeftover = game.resources.helium.maxRespec - game.resources.helium.totalSpentTemp;
		game.resources.helium.totalSpentTemp = 0;
		return;
	}
	if (!game.global.respecActive) game.resources.helium.owned -= (game.resources.helium.totalSpentTemp);
	game.resources.helium.totalSpentTemp = 0;
	
}

function activatePortal(){
	commitPortalUpgrades();
	cancelPortal(true);
	resetGame(true);
	game.global.totalPortals++;
	document.getElementById("portalUpgradesHere").innerHTML = "";
	message("A green shimmer erupts then disappears, and you hit the ground. You look pretty hungry...", "Story");
}

function cancelPortal(keep){
	if (game.global.kongBonusMode){
		game.global.kongBonusMode = false;
		if (!keep) resetGame();		
		message("A green shimmer erupts then disappears, and you hit the ground. You look pretty hungry...", "Story");
	}
	game.global.viewingUpgrades = false;
	game.global.respecActive = false;
	document.getElementById("portalUpgradesHere").innerHTML = "";
	document.getElementById("portalWrapper").style.display = "none";
	fadeIn("wrapper", 10);
}

function loadEquipment(oldEquipment){
	//Now with 100% less save breaking on balance tweaks! Flexibility ftw.
	var newEquipment = game.equipment;
	for (var item in oldEquipment){
		//Name changes would go here, I suppose
		if (typeof newEquipment[item] === 'undefined') continue;
		var oldEquip = oldEquipment[item];
		var newEquip = newEquipment[item];
		newEquip.locked = oldEquip.locked;
		newEquip.modifier = oldEquip.modifier;
		newEquip.level = oldEquip.level;
		newEquip.prestige = oldEquip.prestige;
		var stat;
		if (oldEquip.blockNow){
			stat = "block"; 
			newEquip.blockNow = true;
			newEquip.tooltip = newEquip.blocktip;
		}
		else stat = (typeof newEquip.health !== 'undefined') ? "health" : "attack";

		if (newEquip.prestige > 1) prestigeEquipment(item, newEquip.prestige);
		
		if (typeof oldEquip[stat + "Calculated"] === 'undefined') oldEquip[stat + "Calculated"] = oldEquip[stat];
		if (newEquip[stat + "Calculated"] != oldEquip[stat + "Calculated"]){
			var dif = newEquip[stat + "Calculated"] - oldEquip[stat + "Calculated"];
			//Leaving the debug stuff for this just in case. This function could be nasty if stuff goes wrong.
/* 			console.log("Equipment: " + item + ". Updated from:");
			console.log(oldEquip);
			console.log("Updated to: ");
			console.log(newEquip);
			console.log("dif is " + dif); */
			game.global[stat] += dif * newEquip.level;
		}
	}
}


function getCurrentMapObject() {
    return game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)];
}

function scaleLootLevel(level, mapLevel) {
    var world = game.global.world;
    if (mapLevel > 0) world = mapLevel;
    level += ((world - 1) * 100);
    return level;
}

function rewardResource(what, baseAmt, level, checkMapLootScale) {
    var map;
    if (checkMapLootScale) {
        map = getCurrentMapObject();
        level = scaleLootLevel(level, map.level);
    } else {
        level = scaleLootLevel(level);
    }
	var amt;
	if (what == "helium") level = Math.round((level - 1900) / 100);
    if (what == "gems") level = level - 400;
	level *= 1.35;
	if (level < 0) level = 0;
    var amt = Math.round(baseAmt * Math.pow(1.23, Math.sqrt(level)));
	amt += Math.round(baseAmt * level);
    //var amt = Math.round(baseAmt * (Math.pow(1.02, level)));
    //var otherAmt = Math.round(baseAmt * level);
    //if (otherAmt > amt) amt = otherAmt;
    if (checkMapLootScale) amt = Math.round(amt * map.loot);
	if (game.portal.Looting.level) amt += (amt * game.portal.Looting.level * game.portal.Looting.modifier);
    addResCheckMax(what, amt);
    return amt;
}

function addResCheckMax(what, number) {
    var res = game.resources[what];
	if (res.max == -1) {
		res.owned += number;
		return;
	}
	var newMax = res.max + (res.max * game.portal.Packrat.modifier * game.portal.Packrat.level);
    if (res.owned + number <= newMax) res.owned += number;
    else res.owned = newMax;
}

function fireMode(noChange) {
    if (!noChange) game.global.firing = !game.global.firing;
    var elem = document.getElementById("fireBtn");
    if (game.global.firing) {
        elem.style.background = "rgba(255,0,0,0.5)";
        elem.innerHTML = "Firing";
    } else {
        elem.style.background = "rgba(255,255,255,0.25)";
        elem.innerHTML = "Fire";
    }
    tooltip("Fire Trimps", null, "update");

}

function setGather(what, updateOnly) {
    var toGather = game.resources[what];
    var colorOn = "rgba(255,255,255,0.25)";
    var colorOff = "rgba(0,0,0,1)";
    if (typeof toGather === 'undefined' && what != "buildings") return;
	var toUpdate = (updateOnly) ? what : game.global.playerGathering;
    if (toUpdate !== "") {
        document.getElementById(toUpdate + "CollectBtn").innerHTML = setGatherTextAs(toUpdate, false);
        document.getElementById(toUpdate + "CollectBtn").style.background = colorOff;
    }
    if (updateOnly) return;
	game.global.playerGathering = what;
    document.getElementById(what + "CollectBtn").innerHTML = setGatherTextAs(what, true);
    document.getElementById(what + "CollectBtn").style.background = colorOn;
}

function setGatherTextAs(what, on) {
    var trimpTrapText = '(<span id="trimpTrapText">1</span>)';
    switch (what) {
    case "food":
        return (on) ? "Gathering" : "Gather";
    case "wood":
        return (on) ? "Chopping" : "Chop";
    case "metal":
        return (on) ? "Mining" : "Mine";
    case "science":
        return (on) ? "Researching" : "Research";
    case "buildings":
        return (on) ? "Building" : "Build";
    case "trimps":
        return (on) ? ("Trapping " + trimpTrapText) : ("Check Traps " + trimpTrapText);
    }
}

function gather() {
    var what = game.global.playerGathering;	
    var amount;
    for (var job in game.jobs) {
        if (game.jobs[job].owned < 1) continue;
        var perSec = (game.jobs[job].owned * game.jobs[job].modifier);
        var increase = game.jobs[job].increase;
        if (increase == "custom") continue;
        amount = perSec / game.settings.speed;
		//Motivation
		if (game.portal.Motivation.level > 0) amount += (amount * game.portal.Motivation.level * game.portal.Motivation.modifier);
        addResCheckMax(increase, amount);
    }
    if (what === "" || what == "buildings") return;
    if (what == "trimps") {
        trapThings();
        return;
    }
    var toGather = game.resources[what];
    if (typeof toGather === 'undefined') return;
    amount = (game.global.playerModifier) / game.settings.speed;
    addResCheckMax(what, amount);
}

function checkTriggers(force) {
    for (var item in game.triggers) {
        var trigger = game.triggers[item];
        if (force) {
            if ((trigger.done == 1) && (typeof trigger.once === 'undefined')) trigger.fire();
            else if (typeof trigger.once == 'function' && trigger.done == 1) {
                trigger.once();
            }
            continue;
        }
        if (trigger.done === 0 && canAffordTwoLevel(game.triggers[item])) {
            trigger.fire();
            trigger.done = 1;
            if (typeof trigger.message !== 'undefined') message(trigger.message, "Story");
        }
    }
}

function canAffordTwoLevel(whatObj, takeEm) {
    for (var costGroup in whatObj.cost) {
        if (costGroup == "special") {
            var toReturn = whatObj.cost.special();
            return toReturn;
        }
        var group = game[costGroup];
        var whatObjCost = whatObj.cost[costGroup];
        for (var res in whatObjCost) {
			if (typeof group === 'undefined') console.log(costGroup);
            var realItem = group[res];
            var cost = whatObjCost[res];
            if (typeof cost === 'function') cost = cost();
            if (typeof cost[1] !== 'undefined') cost = resolvePow(cost, whatObj);
            if (group[res].owned < cost) return false;
            if (takeEm) group[res].owned -= cost;
        }
    }
    return true;
}

function resolvePow(cost, whatObj, addOwned) {
	if (!addOwned) addOwned = 0;
    var compare,
		mod = 1;
    if (typeof whatObj.done !== 'undefined') compare = 'done';
    if (typeof whatObj.level !== 'undefined') compare = 'level';
    if (typeof whatObj.owned !== 'undefined') compare = 'owned';
	if (typeof whatObj.purchased !== 'undefined') compare = 'purchased';
	if (typeof whatObj.craftTime !== 'undefined') mod = 1 - (game.portal.Resourcefulness.modifier * game.portal.Resourcefulness.level);
    return (Math.floor((cost[0] * mod) * Math.pow(cost[1], (whatObj[compare] + addOwned))));
}

//Now with equipment!
function canAffordBuilding(what, take, buildCostString, isEquipment){
	var costString = "";
	if (!isEquipment) var toBuy = game.buildings[what];
	else var toBuy = game.equipment[what];
	if (typeof toBuy === 'undefined') console.log(what);
	for (var costItem in toBuy.cost) {
		var color = "green";
		var price = 0;
		price = parseFloat(getBuildingItemPrice(toBuy, costItem, isEquipment))
		if (price > game.resources[costItem].owned || !(isFinite(price))) {
			if (buildCostString) color = "red";
			else return false;
		}
		if (buildCostString) costString += '<span class="' + color + '">' + costItem + ':&nbsp;' + prettify(price) + '</span>, ';
		if (take) game.resources[costItem].owned -= price;
	}
	if (buildCostString) {
		costString = costString.slice(0, -2);
		return costString;
	}
	return true;
}

function getBuildingItemPrice(toBuy, costItem, isEquipment){
	var price = 0;
	var compare = (isEquipment) ? "level" : "purchased";
	var thisCost = toBuy.cost[costItem];
		if (typeof thisCost[1] !== 'undefined'){
			if (thisCost.lastCheckCount != game.global.buyAmt
				|| thisCost.lastCheckOwned != toBuy[compare]
				|| (!isEquipment && thisCost.lastCheckResourcefulness != game.portal.Resourcefulness.level)
			){
				for (var x = 0; x < game.global.buyAmt; x++){
						price += resolvePow(thisCost, toBuy, x);
				}
				thisCost.lastCheckCount = game.global.buyAmt;
				thisCost.lastCheckAmount = price;
				thisCost.lastCheckOwned = toBuy[compare];
				if (!isEquipment) thisCost.lastCheckResourcefulness = game.portal.Resourcefulness.level;
			}
			else price = thisCost.lastCheckAmount;
		}
		else if (typeof thisCost === 'function') {
			price = thisCost();
		}
		else {
			price = thisCost * game.global.buyAmt;
		}
	return price;
}

function buyBuilding(what) {
    var toBuy = game.buildings[what];
    if (typeof toBuy === 'undefined') return;
    var canAfford = canAffordBuilding(what);
	if (canAfford){
		canAffordBuilding(what, true);
		var purchaseAmt = (game.buildings[what].percent) ? 1 : game.global.buyAmt; 
		game.buildings[what].purchased += purchaseAmt;
		startQueue(what, purchaseAmt);
	}
	tooltip(what, "buildings", "update");	
}



function refundQueueItem(what) {
	var name = what.split('.');
    var struct = game.buildings[name[0]];
	struct.purchased -= parseInt(name[1]);
    for (var costItem in struct.cost) {
		var thisCostItem = struct.cost[costItem];
		var refund = 0;
		for (var x = 0; x < parseInt(name[1]); x++){
			if (typeof thisCostItem[1] !== 'undefined') refund += resolvePow(thisCostItem, struct);
			else if (typeof struct.cost[costItem] === 'function') refund += struct.cost[costItem]();
			else refund += thisCostItem;
			
		}
		addResCheckMax(costItem, parseFloat(refund));
    }
}

function startQueue(what, count) {
    game.global.buildingsQueue.push(what + "." + (count));
    addQueueItem(what + "." + count);
}

function craftBuildings(makeUp) {
    var buildingsBar = document.getElementById("buildingsBar");
    var speedElem = document.getElementById("buildSpeed");
    if (game.global.crafting === "" && game.global.buildingsQueue.length > 0) {
        setNewCraftItem();
    }
    if ((game.global.autoCraftModifier <= 0 && game.global.playerGathering != "buildings") || game.global.crafting === "") {
        speedElem.innerHTML = "";
        return;
    }
    var modifier = (game.global.autoCraftModifier > 0) ? game.global.autoCraftModifier : 0;
    if (game.global.playerGathering == "buildings") modifier += game.global.playerModifier;
    if (!makeUp) {
        speedElem.innerHTML = prettify(Math.floor(modifier * 100)) + "%";
        game.global.timeLeftOnCraft -= ((1 / game.settings.speed) * modifier);
        buildingsBar.style.width = (100 - ((game.global.timeLeftOnCraft / game.buildings[game.global.crafting].craftTime) * 100)) + "%";
        buildingsBar.innerHTML = (game.global.timeLeftOnCraft / modifier).toFixed(1) + " Seconds";
        if (game.global.timeLeftOnCraft > 0) return;
        buildingsBar.innerHTML = "";
        buildingsBar.style.width = "0%";
    }
    buildBuilding(game.global.crafting);
    removeQueueItem("first");
	if (game.global.buildingsQueue.length === 0){
		checkEndOfQueue()
	}
	else{
		var nextCraft = game.global.buildingsQueue[0].split('.')[0];
		game.global.crafting = nextCraft;
		game.global.timeLeftOnCraft = game.buildings[nextCraft].craftTime;
	}
}

function toggleAutoTrap(updateOnly) {
	var elem = document.getElementById("autoTrapBtn");
	elem.className = "";
	elem.className = "workBtn pointer noselect";
	if (!game.global.trapBuildAllowed){
		elem.style.display = "none";
		elem.innerHTML = "Traps Off";
		elem.className += " dangerColor";
		return;
	}
	else if (elem.style.display == "none") fadeIn("autoTrapBtn", 10);
	if (!updateOnly) game.global.trapBuildToggled = !game.global.trapBuildToggled;
	if (game.global.trapBuildToggled){
		elem.className += " successColor";
		elem.innerHTML = "Traps On";
		return;
	}
	elem.className += " dangerColor";
	elem.innerHTML = "Traps Off";
}

function buildBuilding(what) {
    var building = game.buildings[what];
    var toIncrease;
    building.owned++;
    if (building.owned == 1 && typeof building.first !== 'undefined') building.first();
    if (document.getElementById(what + "Owned") === null) return;
    document.getElementById(what + "Owned").innerHTML = building.owned;
    if (typeof building.increase === 'undefined') return;
    var buildingSplit = building.increase.what.split('.');
    if (buildingSplit[0] == "global") toIncrease = game.global;
	else if (buildingSplit[0] == "Dragimp") toIncrease = game.jobs.Dragimp;
    else
        toIncrease = game.resources[buildingSplit[0]];
    if (buildingSplit[2] == "mult") toIncrease[buildingSplit[1]] = parseFloat(toIncrease[buildingSplit[1]]) * parseFloat(building.increase.by).toFixed(5);
    else
        toIncrease[buildingSplit[1]] += parseFloat(building.increase.by);
    numTab();
}

function setNewCraftItem() {
    var queueItem = game.global.buildingsQueue[0].split('.')[0];
    game.global.crafting = queueItem;
    game.global.timeLeftOnCraft = game.buildings[queueItem].craftTime;
    document.getElementById("buildingsBar").style.width = "0%";
}

function calculatePercentageBuildingCost(what, resourceToCheck, costModifier){
	var struct = game.buildings[what];
	var res = game.resources[resourceToCheck];
	var dif = struct.purchased - struct.owned;
	return Math.floor(((costModifier * res.max) * (1 - (game.portal.Resourcefulness.modifier * game.portal.Resourcefulness.level))) * Math.pow(struct.increase.by, dif));
}

function trapThings() {
    var trap = game.buildings.Trap;
    var trimps = game.resources.trimps;
    if (game.global.timeLeftOnTrap == -1) {
        if (trimps.owned < trimps.max && trap.owned >= 1)
            game.global.timeLeftOnTrap = trimps.speed;
        else {
            document.getElementById("trappingBar").style.width = "0%";
            document.getElementById("TrapOwned").innerHTML = trap.owned;
            return;
        }
    }
    game.global.timeLeftOnTrap -= ((1 / game.settings.speed) * game.global.playerModifier);
    if (game.global.timeLeftOnTrap <= 0 && trimps.owned < trimps.max && trap.owned >= 1) {
        trap.owned--;
        trimps.owned++;
		//portal Bait
		if (game.portal.Bait.level > 0) trimps.owned += (game.portal.Bait.level * game.portal.Bait.modifier);
		if (trimps.owned > trimps.max) trimps.owned = trimps.max;
        game.global.timeLeftOnTrap = -1;
        document.getElementById("TrapOwned").innerHTML = trap.owned;
    }
    document.getElementById("trappingBar").style.width = (100 - ((game.global.timeLeftOnTrap / trimps.speed) * 100)) + "%";
}

function buyJob(what) {
	if (game.global.firing){
		if (game.jobs[what].owned < 1) return;
		game.resources.trimps.employed -= (game.jobs[what].owned < game.global.buyAmt) ? game.jobs[what].owned : game.global.buyAmt;
		game.jobs[what].owned -= game.global.buyAmt;
		if (game.jobs[what].owned < 0) game.jobs[what].owned = 0;
		if (game.resources.trimps.employed < 0) game.resources.trimps.employed = 0;
		return;
	}
	if (!canAffordJob(what)) return;
	canAffordJob(what, true);
	game.jobs[what].owned += game.global.buyAmt;
	game.resources.trimps.employed += game.global.buyAmt;
	tooltip(what, "jobs", "update");
}

function getTooltipJobText(what) {
    var job = game.jobs[what];
    var fullText = "";
    for (var item in job.cost) {
        var color = (checkJobItem(what, false, item)) ? "green" : "red";
        fullText += '<span class="' + color + '">' + item + ':&nbsp;' + prettify(checkJobItem(what, false, item, true)) + '</span>, ';
    }
    fullText = fullText.slice(0, -2);
    return fullText;
}

function canAffordJob(what, take) {
    var trimps = game.resources.trimps;
    if (Math.ceil(trimps.max / 2) < trimps.employed + game.global.buyAmt) return false;
    if (trimps.owned - trimps.employed - game.global.buyAmt < 0) return false;
    var job = game.jobs[what];
    for (var costItem in job.cost) {
        if (!checkJobItem(what, take, costItem)) return false;
    }
    return true;
}

function checkJobItem(what, take, costItem, amtOnly) {
    var job = game.jobs[what];
    var cost = job.cost[costItem];
    var price = 0;
	if (cost.lastCheckCount != game.global.buyAmt
		|| cost.lastCheckOwned != job.owned
		|| thisCost.lastCheckCheapskate != game.portal.Cheapskate.level
	){
		for (var x = 0; x < game.global.buyAmt; x++) {
			price += Math.floor((cost[0] * (1 - (game.portal.Cheapskate.modifier * game.portal.Cheapskate.level))) * Math.pow(cost[1], (job.owned + x)));
		}
		cost.lastCheckCount = game.global.buyAmt;
		cost.lastCheckAmount = price;
		cost.lastCheckOwned = job.owned;
		cost.lastCheckCheapskate = game.portal.Cheapskate.level;
	}
	else {
		price = cost.lastCheckAmount;
	}
    if (amtOnly) return price;
    if (take) {
        game.resources[costItem].owned -= price;
        return true;
    }
    if (game.resources[costItem].owned < price) {
        return false;
    }
    return true;
}

function buyUpgrade(what) {
    if (what == "Coordination" && (Math.ceil(game.resources.trimps.max / 2) < (game.resources.trimps.maxSoldiers * 2))) {
        message("You should probably expand your territory a bit first.", "Notices");
        return;
    }
    var upgrade = game.upgrades[what];
    var canAfford = canAffordTwoLevel(upgrade);
    if (!canAfford) return;
    canAfford = canAffordTwoLevel(upgrade, true);
    upgrade.fire();
	upgrade.done++;
	if ((upgrade.allowed - upgrade.done) <= 0) upgrade.locked = 1;
    var dif = upgrade.allowed - upgrade.done;
    if (dif > 1) {
        document.getElementById(what + "Owned").innerHTML = upgrade.done + "( +" + dif + ")";
        return;
    } else if (dif == 1) {
        document.getElementById(what + "Owned").innerHTML = upgrade.done;
        return;
    }
    document.getElementById("upgradesHere").removeChild(document.getElementById(what));
    tooltip("hide");
}

function breed() {
    var trimps = game.resources.trimps;
    var breeding = trimps.owned - trimps.employed;
    if (breeding < 2) {
        updatePs(0, true);
        return;
    }
    if (trimps.owned >= trimps.max) {
        trimps.owned = trimps.max;
        return;
    }
    breeding = breeding * trimps.potency;
	//Pheromones
	breeding += (breeding * game.portal.Pheromones.level * game.portal.Pheromones.modifier);
    updatePs(breeding, true);
    trimps.owned += breeding / game.settings.speed;
}

function prestigeEquipment(what, fromLoad, noInc) {
    var equipment = game.equipment[what];
	if (!fromLoad && !noInc) equipment.prestige++;
	var resource = (what == "Shield") ? "wood" : "metal";
	var cost = equipment.cost[resource];
	var prestigeMod = 0;
	if (equipment.prestige >= 4) prestigeMod = (((equipment.prestige - 3) * .85) + 2);
	else prestigeMod = (equipment.prestige - 1);
    cost[0] = Math.round(equipment.oc * Math.pow(1.069, ((prestigeMod) * game.global.prestige.cost) + 1));
	cost.lastCheckAmount = null;
	cost.lastCheckCount = null;
	cost.lastCheckOwned = null;
	var stat;
	if (equipment.blockNow) stat = "block";
	else stat = (typeof equipment.health !== 'undefined') ? "health" : "attack";
	if (!fromLoad) game.global[stat] -= (equipment[stat + "Calculated"] * equipment.level);
    equipment[stat + "Calculated"] = Math.round(equipment[stat] * Math.pow(1.19, ((equipment.prestige - 1) * game.global.prestige[stat]) + 1));
	//No need to touch level if it's newNum
	if (fromLoad) return;
	equipment.level = 0;
    if (document.getElementById(what + "Numeral") !== null) document.getElementById(what + "Numeral").innerHTML = romanNumeral(equipment.prestige);
}

function getNextPrestigeCost(what){
	var equipment = game.equipment[game.upgrades[what].prestiges];
	var prestigeMod;
	var nextPrestigeCount = equipment.prestige + 1;
	if (nextPrestigeCount >= 4) prestigeMod = (((nextPrestigeCount - 3) * .85) + 2);
	else prestigeMod = (nextPrestigeCount - 1);
    return Math.round(equipment.oc * Math.pow(1.069, ((prestigeMod) * game.global.prestige.cost) + 1));
}

function getNextPrestigeValue(what){
	var name = game.upgrades[what].prestiges;
	var equipment = game.equipment[name];
	var stat;
	if (equipment.blockNow) stat = "block";
	else stat = (typeof equipment.health !== 'undefined') ? "health" : "attack";
	var toReturn = Math.round(equipment[stat] * Math.pow(1.19, ((equipment.prestige) * game.global.prestige[stat]) + 1));
	return prettify(toReturn) + " " + stat;
}



function createMap(newLevel) {
    game.global.mapsOwned++;
    game.global.totalMapsEarned++;
    var world = (newLevel > 5 && newLevel <= game.global.world) ? newLevel : game.global.world;
    var mapName = getRandomMapName();
	mapName = mapName.split('.');
	if (typeof mapName[1] === 'undefined') mapName[1] = "All";
    game.global.mapsOwnedArray.push({
        id: "map" + game.global.totalMapsEarned,
        name: mapName[0],
		location: mapName[1],
        clears: 0,
        level: world,
        difficulty: getRandomMapValue("difficulty"),
        size: Math.floor(getRandomMapValue("size")),
        loot: getRandomMapValue("loot")
    });
    message("You just made " + mapName[0] + "!", "Notices");
    unlockMap(game.global.mapsOwnedArray.length - 1);
}

function getRandomMapValue(what) { //what can be size, difficulty, or loot for now
    var amt = game.mapConfig[what + "Base"];
    var range = game.mapConfig[what + "Range"];
    var min = amt - range;
    var x = ((Math.random() * ((amt + range) - min)) + min);
    x = x.toFixed(3);
    return x;
}

function getRandomMapName() {
    var namesObj = game.mapConfig.names;
    var roll = Math.floor(Math.random() * (namesObj.prefix.length - 1));
    var name = namesObj.prefix[roll];
    roll = Math.floor(Math.random() * (namesObj.suffix.length - 1));
    return name + " " + namesObj.suffix[roll];
}

function buildMapGrid(mapId) {
    var map = game.global.mapsOwnedArray[getMapIndex(mapId)];
    var array = [];
    for (var i = 0; i < map.size; i++) {
        array.push({
            level: i + 1,
            maxHealth: -1,
            health: -1,
            attack: -1,
            special: "",
            text: "",
            name: getRandomBadGuy(map.location, i + 1, map.size, map.level)
        });
    }
    game.global.mapGridArray = array;
    addSpecials(true);
}

function getMapIndex(mapId) {
        for (var x = 0; x < game.global.mapsOwnedArray.length; x++) {
            if (game.global.mapsOwnedArray[x].id == mapId) return x;
        }
    }
    
function buildGrid() {
    var world = game.global.world;
    var array = [];
    for (var i = 0; i < 100; i++) {
        array.push({
            level: i + 1,
            maxHealth: -1,
            health: -1,
            attack: -1,
            special: "",
            text: "",
            name: getRandomBadGuy(null, i + 1, 100, world)
        });
    }
    game.global.gridArray = array;
    addSpecials();
}

function getRandomBadGuy(mapSuffix, level, totalCells, world) {
	var selected;
	var force = false;
    var badGuysArray = [];
    for (var item in game.badGuys) {
		var badGuy = game.badGuys[item];
		if (level == totalCells && badGuy.last && (badGuy.location == mapSuffix || (!mapSuffix && badGuy.location == "World")) && world >= badGuy.world) {
			if (item == "Blimp" && (world != 5 && world  != 10 && world < 15)) continue;
			selected = item;
			force = true;
			break;
		}
		if (!badGuy.last && (badGuy.location == "All" || badGuy.location == mapSuffix || (!mapSuffix && badGuy.location == "World")) && (typeof badGuy.world === 'undefined' || game.global.world >= game.badGuys[item].world)){
		badGuysArray.push(item);
		}
	}
    if (!force) selected = badGuysArray[Math.floor(Math.random() * badGuysArray.length)];

	return selected;
}

function addSpecialToLast(special, array, item) {
    array[array.length - 1].text = '<span class="glyphicon glyphicon-' + special.icon + '"></span>';
    array[array.length - 1].special = item;
    return array;
}

function addSpecials(maps, countOnly, map) { //countOnly must include map. Only counts upgrades set to spawn on "last".
	var specialCount = 0;
	var array;
	var unlocksObj;
	var world;
	var max;
    if (maps) {
        array = game.global.mapGridArray;
        unlocksObj = game.mapUnlocks;
        if (!countOnly) map = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)];
		world = map.level;	
        max = map.size;
    } else {
        array = game.global.gridArray;
        unlocksObj = game.worldUnlocks;
        world = game.global.world;
        max = 100;
    }
    var canLast = true;
    for (var item in unlocksObj) {
        var special = unlocksObj[item];
		if ((maps) && (special.filterUpgrade) && (game.mapConfig.locations[map.location].upgrade != item)) continue;		
        if ((special.level == "last" && canLast && special.world <= world && special.canRunOnce)) {
			if (special.startAt > world) continue;
            if (countOnly){
				specialCount++;
				continue;
			}
			array = addSpecialToLast(special, array, item);
            canLast = false;
            continue;
        }
		
		
        if (typeof special.canRunOnce !== 'undefined' && !special.canRunOnce) continue;
		
        if (special.world != world && special.world > 0) continue;
        if ((special.world == -2) && ((world % 2) !== 0)) continue;
        if ((special.world == -3) && ((world % 2) != 1)) continue;
        if ((special.world == -5) && ((world % 5) !== 0)) continue;
        if ((special.world == -33) && ((world % 3) !== 0)) continue;
		if ((maps) && (special.filter) && game.mapConfig.locations[map.location].resourceType != item) continue;
		if (typeof special.specialFilter !== 'undefined'){
			if (!special.specialFilter()) continue;
		}
        if ((typeof special.startAt !== 'undefined') && (special.startAt > world)) continue;
        if (typeof special.canRunOnce === 'undefined' && (special.level == "last") && canLast && (special.last <= (world - 5))) {
			if (countOnly){
				specialCount++;
				continue;
			}
            array = addSpecialToLast(special, array, item);
            canLast = false;
            continue;
        }
		if (special.level == "last") continue;
		if (special.canRunOnce == true && countOnly) {specialCount++; continue;}
        if (!countOnly)  findHomeForSpecial(special, item, array, max);
    }
	if (countOnly) return specialCount;
}

function findHomeForSpecial(special, item, array, max){
	var level;
	var repeat = (typeof special.repeat !== 'undefined');
	var repeatFreq = (repeat) ? special.repeat : 0;
	var x = 0;
	var done = false;
	while (done === false) {
		if (typeof special.level === 'object') level = ((Math.floor(Math.random() * (special.level[1] - special.level[0])) + special.level[0]) + (x * repeatFreq));
		else level = special.level + (x * repeatFreq);
		if (level >= max) break;
		//Resolve resource conflicts. Try +5, reverse, -5, then bail out.
		var hax = 5;
		if (typeof array[level] === 'undefined') console.log(level + ", " + item);
		while (array[level].special !== "") {
			if (hax >= 5) {
				hax++;
				level++;
			}
			if (hax <= 4) {
				hax--;
				level--;
			}
			if (hax == 10 || level >= max) {
				hax = 4;
				level -= 6;
			}
			if (hax === 0 || level <= 0) {
				break;
			}
		}
		if (hax !== 0 && level < max) {
			 if (typeof special.title !== 'undefined') 
			array[level].text = '<span title="' + special.title + '" class="glyphicon glyphicon-' + special.icon + '"></span>';
			else{
			array[level].text = '<span class="glyphicon glyphicon-' + special.icon + '"></span>';
			}
			array[level].special = item;
		}
		if (!repeat) done = true;
		x++;
		if (x == max) {
			done = true;
			break;
		}
	}
}

function drawGrid(maps) { //maps t or f. This function overwrites the current grid, be carefulz
    var grid = (maps) ? document.getElementById("mapGrid") : document.getElementById("grid");
	var map;
    grid.innerHTML = "";
    var cols = 10;
	var rows = 10;
	if (maps){
		map = getCurrentMapObject();
		cols = Math.floor(Math.sqrt(map.size));
		if (map.size % cols == 0) rows = map.size / cols;
		else	rows = ((map.size - (cols * cols)) > cols) ? cols + 2 : cols + 1;
	}
	var width = (100 / cols);
    var counter = 0;
    var idText = (maps) ? "mapCell" : "cell";
    var size = 0;
    if (maps) size = game.global.mapGridArray.length;
    for (var i = 0; i < rows; i++) {
        if (maps && counter >= size) return;
        var row = document.createElement("ul");
		grid.insertBefore(row, grid.childNodes[0])
        row.setAttribute("id", "row" + i);
		row.className = "battleRow";
        for (var x = 0; x < cols; x++) {
            if (maps && counter >= size) return;
			var cell = document.createElement("li");
			cell.setAttribute("id", idText + counter);
			row.appendChild(cell);
			cell.style.width = (100 / cols) + "%";
			cell.style.paddingTop = ((100 / cols) / 19)+ "vh";
			cell.style.paddingBottom = ((100 / cols) / 19) + "vh";
			cell.style.fontSize = ((cols / 14) + 1) + "vh";
            cell.className = "battleCell";
            cell.innerHTML = (maps) ? game.global.mapGridArray[counter].text : game.global.gridArray[counter].text;
			if (cell.innerHTML == "") cell.innerHTML = "&nbsp;";
            counter++;
        }
    }
}

function fightManual() {
    battle(true);
}

function pauseFight(updateOnly) {
    if (!updateOnly) game.global.pauseFight = !game.global.pauseFight;
	var color = (!game.global.pauseFight) ? "btn-success" : "btn-danger";
	var elem = document.getElementById("pauseFight");
	elem.className = "";
	elem.className = "btn fightBtn " + color;
	elem.innerHTML = (!game.global.pauseFight) ? "AutoFight On" : "AutoFight Off";
}

function recycleMap() {
    if (game.global.lookingAtMap === "") return;
    var map = getMapIndex(game.global.lookingAtMap);
    if (map === null) return;
	var mapObj = game.global.mapsOwnedArray[map];
	if (mapObj.noRecycle) {
		game.global.currentMapId = "";
		game.global.lastClearedMapCell = -1;
		game.global.mapGridArray = [];
		mapsSwitch(true);
		return;
	}
    game.global.mapsOwnedArray.splice(map, 1);
    document.getElementById("mapsHere").removeChild(document.getElementById(game.global.lookingAtMap));
    game.global.lookingAtMap = "";
    game.global.currentMapId = "";
    game.global.mapsOwned--;
    game.global.lastClearedMapCell = -1;
    game.resources.fragments.owned++;
	if (map.id == game.global.currentMapId){
		game.global.mapGridArray = [];
	}
    mapsSwitch(true);

}

function buyMap() {
	if (game.resources.fragments.owned >= 3){
		var newLevel = parseInt(document.getElementById("mapLevelInput").value);
		if (newLevel > 5 && newLevel <= game.global.world){
		game.resources.fragments.owned -= 3;
		
		createMap(newLevel);
		}
		else message("You must create a map between level 6 and your highest zone, " + game.global.world + ".", "Notices");
	}
}

function mapsClicked() {
    if (game.global.switchToMaps || game.global.switchToWorld) {
        game.global.soldierHealth = 0;
		game.resources.trimps.soldiers = 0;
		var bar = document.getElementById("goodGuyBar");
		bar.style.backgroundColor = "red";
		bar.style.width = "0%";
		mapsSwitch();
        return;
    }
    if (game.global.fighting && !game.global.preMapsActive) {
		message("Waiting to travel until your soldiers are finished.", "Notices");
		document.getElementById("mapsBtn").innerHTML = "Abandon Soldiers";
		document.getElementById("mapsBtn").style.fontSize = ".9vw";
		}
    if (game.global.preMapsActive) {
        mapsSwitch();
        return;
    }
    if (game.global.mapsActive) game.global.switchToWorld = true;
    else game.global.switchToMaps = true;
}

function incrementMapLevel(amt){
	var elem = document.getElementById("mapLevelInput");
	var newNum = parseInt(elem.value) + amt;
	if (newNum > 5 && newNum <= game.global.world){
		elem.value = newNum;
	} 
}

function mapsSwitch(updateOnly) {
    if (!updateOnly) {
		game.global.fighting = false;
        game.global.switchToMaps = false;
        game.global.switchToWorld = false;
        if (game.global.mapsActive || game.global.preMapsActive) {
            game.global.mapsActive = false;
            game.global.preMapsActive = false;
        } else game.global.preMapsActive = true;
    }
	var currentMapObj;
	if (game.global.currentMapId != "") currentMapObj = getCurrentMapObject();
	var mapsBtn = document.getElementById("mapsBtn");
	var recycleBtn = document.getElementById("recycleMapBtn");
	recycleBtn.innerHTML = "Recycle Map";
	document.getElementById("mapsBtn").style.fontSize = "1.1vw";
    if (game.global.preMapsActive) {
		document.getElementById("battleStatsRow").style.display = "none";
		document.getElementById("mapsCreateRow").style.display = "block";
		document.getElementById("mapLevelInput").value = game.global.world;
        document.getElementById("grid").style.display = "none";
        document.getElementById("preMaps").style.display = "block";
        document.getElementById("mapGrid").style.display = "none";
        mapsBtn.innerHTML = "World";
		document.getElementById("repeatBtn").style.visibility = "hidden";
        if (game.global.currentMapId === "") {
            document.getElementById("selectMapBtn").style.visibility = "hidden";
            recycleBtn.style.visibility = "hidden";
            document.getElementById("selectedMapName").innerHTML = "Select a Map!";
            document.getElementById("mapStatsSize").innerHTML = "";
			document.getElementById("mapStatsDifficulty").innerHTML = "";
			document.getElementById("mapStatsLoot").innerHTML = "";
			document.getElementById("mapStatsItems").innerHTML = "";
			document.getElementById("mapStatsResource").innerHTML = "";
        } else {
            selectMap(game.global.currentMapId, true);
            document.getElementById("selectMapBtn").innerHTML = "Continue";
            document.getElementById("selectMapBtn").style.visibility = "visible";
            recycleBtn.style.visibility = "visible";
			if (currentMapObj.noRecycle) recycleBtn.innerHTML = "Abandon Map";
        }
    } else if (game.global.mapsActive) {
		fadeIn("repeatBtn", 10);
		document.getElementById("battleStatsRow").style.display = "block";
		document.getElementById("mapsCreateRow").style.display = "none";
        document.getElementById("grid").style.display = "none";
        document.getElementById("preMaps").style.display = "none";
        document.getElementById("mapGrid").style.display = "block";
        document.getElementById("mapsBtn").innerHTML = "World";
        document.getElementById("worldNumber").innerHTML = "</br>Lv: " + currentMapObj.level;
        document.getElementById("worldName").innerHTML = currentMapObj.name;
    } else {
		document.getElementById("battleStatsRow").style.display = "block";
		document.getElementById("mapsCreateRow").style.display = "none";
        document.getElementById("grid").style.display = "block";
        document.getElementById("preMaps").style.display = "none";
        document.getElementById("mapGrid").style.display = "none";
        document.getElementById("mapsBtn").innerHTML = "Maps";
        document.getElementById("worldNumber").innerHTML = game.global.world;
        document.getElementById("worldName").innerHTML = "Zone";
		document.getElementById("repeatBtn").style.visibility = "hidden";
    }
}

function repeatClicked(updateOnly){
	if (!updateOnly) game.global.repeatMap = !game.global.repeatMap;
	var color = (game.global.repeatMap) ? "btn-success" : "btn-danger";
	var elem = document.getElementById("repeatBtn");
	elem.className = "";
	elem.className = "btn fightBtn " + color;
	elem.innerHTML = (game.global.repeatMap) ? "Repeat On" : "Repeat Off";
}

function selectMap(mapId, force) {
    if (!force && game.global.currentMapId !== "") {
        message("You must finish or recycle your current map before moving on.", "Notices");
        return;
    }
    var map = getMapIndex(mapId);
    map = game.global.mapsOwnedArray[map];
    document.getElementById("selectedMapName").innerHTML = map.name;
	document.getElementById("mapStatsSize").innerHTML = (Math.floor(map.size));
	document.getElementById("mapStatsDifficulty").innerHTML = Math.floor(map.difficulty * 100) + "%";
	document.getElementById("mapStatsLoot").innerHTML = Math.floor(map.loot * 100) + "%";
	document.getElementById("mapStatsItems").innerHTML = addSpecials(true, true, map);
	document.getElementById("mapStatsResource").innerHTML = game.mapConfig.locations[map.location].resourceType;
	
    if (typeof game.global.mapsOwnedArray[getMapIndex(game.global.lookingAtMap)] !== 'undefined') document.getElementById(game.global.lookingAtMap).style.border = "1px solid white";
    document.getElementById(mapId).style.border = "1px solid red";
    game.global.lookingAtMap = mapId;
    document.getElementById("selectMapBtn").innerHTML = "Run Map";
    document.getElementById("selectMapBtn").style.visibility = "visible";
	document.getElementById("recycleMapBtn").style.visibility = (map.noRecycle) ? "hidden" : "visible";
}

function runMap() {
    if (game.global.lookingAtMap === "") return;
    var mapId = game.global.lookingAtMap;
    game.global.preMapsActive = false;
    game.global.mapsActive = true;
    game.global.currentMapId = mapId;
    mapsSwitch(true);
    if (game.global.lastClearedMapCell == -1) {
        buildMapGrid(mapId);
        drawGrid(true);
    }
}

function battleCoordinator(makeUp) {
    if (!game.global.fighting) {
        battle(null);
        return;
    }
    game.global.battleCounter += (1000 / game.settings.speed);
    if (game.global.battleCounter >= 1000) {
        game.global.battleCounter = 0;
        fight(makeUp);
    }
}

function battle(force) {
    if (game.global.fighting) return;
    if ((game.global.switchToMaps || game.global.switchToWorld) && game.resources.trimps.soldiers === 0) {
        mapsSwitch();
        return;
    }
    if (game.global.preMapsActive) return;
    var pause = (force) ? false : game.global.pauseFight;
    if (!game.global.autoBattle && !force) return;
    if (pause) return;
    var trimps = game.resources.trimps;
    if (trimps.soldiers >= trimps.maxSoldiers) {
        startFight();
        return;
    }
    var breeding = (trimps.owned - trimps.employed);
    if (breeding < trimps.maxSoldiers) return;
    if (force) {
        trimps.soldiers = trimps.maxSoldiers;
        trimps.owned -= trimps.maxSoldiers;
    } else {
        var max = Math.ceil((trimps.max - trimps.employed) * 0.05);
        if ((trimps.owned) >= (trimps.max - max)) {
            trimps.soldiers = trimps.maxSoldiers;
            trimps.owned -= trimps.maxSoldiers;
        }
    }
    if (game.resources.trimps.soldiers < trimps.maxSoldiers) {
        return;
    }
    startFight();
}

function startFight() {
    game.global.battleCounter = 0;
    document.getElementById("badGuyCol").style.visibility = "visible";
    var cellNum;
    var cell;
    var cellElem;
    if (game.global.mapsActive) {
        cellNum = game.global.lastClearedMapCell + 1;
        cell = game.global.mapGridArray[cellNum];
        cellElem = document.getElementById("mapCell" + cellNum);
    } else {
        cellNum = game.global.lastClearedCell + 1;
        cell = game.global.gridArray[cellNum];
        cellElem = document.getElementById("cell" + cellNum);
    }
    cellElem.style.backgroundColor = "yellow";
    if (cell.maxHealth == -1) {
        cell.attack = game.global.getEnemyAttack(cell.level, cell.name);
        cell.health = game.global.getEnemyHealth(cell.level, cell.name);
        if (game.global.mapsActive) {
            var difficulty = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)].difficulty;
            cell.attack *= difficulty;
            cell.health *= difficulty;
        }
        cell.maxHealth = cell.health;
        document.getElementById("badGuyBar").style.width = "100%";
        document.getElementById("badGuyName").innerHTML = cell.name;
        document.getElementById("badGuyBar").style.backgroundColor = "blue";
/*         document.getElementById("badGuyAttack").innerHTML = calculateDamage(cell.attack, true); */
    }
    if (game.global.soldierHealth === 0) {
        var trimpsFighting = game.resources.trimps.maxSoldiers;
        game.global.soldierHealthMax = (game.global.health * trimpsFighting);
		//Toughness
		if (game.portal.Toughness.level > 0) game.global.soldierHealthMax += (game.global.soldierHealthMax * game.portal.Toughness.level * game.portal.Toughness.modifier);
        game.global.soldierHealth = game.global.soldierHealthMax;
        game.global.soldierCurrentAttack = (game.global.attack * trimpsFighting);
		//Power
		if (game.portal.Power.level > 0) game.global.soldierCurrentAttack += (game.global.soldierCurrentAttack * game.portal.Power.level * game.portal.Power.modifier);
        game.global.soldierCurrentBlock = Math.floor((game.global.block * (game.jobs.Trainer.owned * (game.jobs.Trainer.modifier / 100)) + game.global.block) * trimpsFighting);
		document.getElementById("goodGuyBar").style.width = "100%";
		/*         document.getElementById("trimpsFighting").innerHTML = prettify(trimpsFighting);
        
        document.getElementById("goodGuyBlock").innerHTML = prettify(game.global.soldierCurrentBlock);
        document.getElementById("goodGuyAttack").innerHTML = calculateDamage(game.global.soldierCurrentAttack, true); */
    }
    game.global.fighting = true;
    game.global.lastFightUpdate = new Date();
/*     document.getElementById("goodGuyHealth").innerHTML = prettify(game.global.soldierHealth);
    document.getElementById("goodGuyHealthMax").innerHTML = prettify(game.global.soldierHealthMax);
    document.getElementById("goodGuyBar").style.backgroundColor = getBarColor((game.global.soldierHealth / game.global.soldierHealthMax) * 100);
    document.getElementById("badGuyHealth").innerHTML = prettify(cell.health);
    document.getElementById("badGuyHealthMax").innerHTML = prettify(cell.maxHealth); */
	updateAllBattleNumbers();
}

function updateAllBattleNumbers () {
	var cellNum;
    var cell;
    var cellElem;
    if (game.global.mapsActive) {
        cellNum = game.global.lastClearedMapCell + 1;
        cell = game.global.mapGridArray[cellNum];
        cellElem = document.getElementById("mapCell" + cellNum);
    } else {
        cellNum = game.global.lastClearedCell + 1;
        cell = game.global.gridArray[cellNum];
        cellElem = document.getElementById("cell" + cellNum);
    }
    cellElem.style.backgroundColor = "yellow";
	document.getElementById("goodGuyHealth").innerHTML = prettify(game.global.soldierHealth);
    document.getElementById("goodGuyHealthMax").innerHTML = prettify(game.global.soldierHealthMax);
    document.getElementById("goodGuyBar").style.backgroundColor = getBarColor((game.global.soldierHealth / game.global.soldierHealthMax) * 100);
    document.getElementById("badGuyHealth").innerHTML = prettify(cell.health);
	document.getElementById("badGuyHealthMax").innerHTML = prettify(cell.maxHealth);
	document.getElementById("trimpsFighting").innerHTML = prettify(game.resources.trimps.maxSoldiers);
	document.getElementById("goodGuyBlock").innerHTML = prettify(game.global.soldierCurrentBlock);
	document.getElementById("goodGuyAttack").innerHTML = calculateDamage(game.global.soldierCurrentAttack, true);
	document.getElementById("badGuyAttack").innerHTML = calculateDamage(cell.attack, true);
	document.getElementById("trimpsFighting").innerHTML = game.resources.trimps.maxSoldiers;
}

function calculateDamage(number, buildString) { //number = base attack
    var fluctuation = 20; //%fluctuation
    var multiplier = (fluctuation / 100);
    var min = Math.floor(number * (1 - multiplier));
    var max = Math.ceil(number + (number * multiplier));
    if (buildString) return prettify(min, 0) + "-" + prettify(max, 0);
    number = Math.floor(Math.random() * ((max + 1) - min)) + min;
    return number;
}

function nextWorld() {
    game.global.world++;
    document.getElementById("worldNumber").innerHTML = game.global.world;
    game.global.lastClearedCell = -1;
    game.global.gridArray = [];
    document.getElementById("grid").innerHTML = "";
    buildGrid();
    drawGrid();
	if (game.worldText["w" + game.global.world]) message(game.worldText["w" + game.global.world], "Story");
}

function fight(makeUp) {
    if (game.global.soldierHealth <= 0) {
        var s = (game.resources.trimps.maxSoldiers > 1) ? "s " : " ";
		var randomText = game.trimpDeathTexts[Math.floor(Math.random() * game.trimpDeathTexts.length)];
        message(game.resources.trimps.maxSoldiers + " Trimp" + s + "just " + randomText + ".", "Combat");
        game.global.fighting = false;
        game.resources.trimps.soldiers = 0;
        return;
    }
    var cellNum;
    var cell;
    var cellElem;
    if (game.global.mapsActive) {
        cellNum = game.global.lastClearedMapCell + 1;
        cell = game.global.mapGridArray[cellNum];
        cellElem = document.getElementById("mapCell" + cellNum);
    } else {
        cellNum = game.global.lastClearedCell + 1;
        cell = game.global.gridArray[cellNum];
        cellElem = document.getElementById("cell" + cellNum);
    }
    if (cell.health <= 0) {
		var randomText = game.badGuyDeathTexts[Math.floor(Math.random() * game.badGuyDeathTexts.length)];
        message("You " + randomText + " a " + cell.name + "!", "Combat");
        try{
			if (typeof ga !== 'undefined' && cell.level % 2 == 0 && !game.global.mapsActive) ga('send', 'event', 'Killed Bad Guy', 'W: ' + game.global.world + ' L:' + cell.level);
			}
		catch(err){
			console.debug(err);
		}
		try{
			if (typeof kongregate !== 'undefined') kongregate.stats.submit("BadGuys", 1);
			if (typeof kongregate !== 'undefined' && !game.global.mapsActive) kongregate.stats.submit("HighestLevel", ((game.global.world * 100) + cell.level));
		}
		catch(err){
			console.debug(err);
		}

        cellElem.style.backgroundColor = "green";
        if (game.global.mapsActive) game.global.lastClearedMapCell = cellNum;
        else game.global.lastClearedCell = cellNum;
        game.global.fighting = false;
        document.getElementById("badGuyCol").style.visibility = "hidden";
        var unlock;
        if (game.global.mapsActive) unlock = game.mapUnlocks[cell.special];
        else unlock = game.worldUnlocks[cell.special];
        if (typeof unlock !== 'undefined' && typeof unlock.message !== 'undefined') message(cell.text + unlock.message, "Unlocks");
        if (typeof unlock !== 'undefined' && typeof unlock.fire !== 'undefined') {
            unlock.fire(cell.level);
            if (game.global.mapsActive) {
                if (typeof game.mapUnlocks[cell.special].last !== 'undefined') game.mapUnlocks[cell.special].last += 5;
                if (typeof game.mapUnlocks[cell.special].canRunOnce !== 'undefined') game.mapUnlocks[cell.special].canRunOnce = false;
            }
        } else if (cell.special !== "") {
            unlockEquipment(cell.special);
        }
		if (typeof game.badGuys[cell.name].loot !== 'undefined') game.badGuys[cell.name].loot(cell.level);
        if (game.global.mapsActive && cellNum == (game.global.mapGridArray.length - 1)) {
			if (game.global.repeatMap){
				game.global.lastClearedMapCell = -1;
				buildMapGrid(game.global.currentMapId);
				drawGrid(true);
				return;
			}
			else{
				game.global.preMapsActive = true;
				game.global.lookingAtMap = "";
				game.global.mapsActive = false;
				game.global.lastClearedMapCell = -1;
				game.global.currentMapId = "";
				game.global.mapGridArray = [];
				game.global.fighting = false;
				mapsSwitch(true);
				return;
			}
		}
        if (cellNum == 99) nextWorld();
        battle(true);
        return;
    }
    var attackAndBlock = (calculateDamage(cell.attack) - game.global.soldierCurrentBlock);
    if (game.badGuys[cell.name].fast) {
        game.global.soldierHealth -= (attackAndBlock > 0) ? attackAndBlock : 0;
        if (game.global.soldierHealth > 0) cell.health -= calculateDamage(game.global.soldierCurrentAttack);
        else
            game.global.soldierHealth = 0;
        if (cell.health <= 0) {cell.health = 0; 
		//fight(makeUp); return;
		}
    }
	else {
        cell.health -= calculateDamage(game.global.soldierCurrentAttack);
        if (cell.health > 0) game.global.soldierHealth -= (attackAndBlock > 0) ? attackAndBlock : 0;
        else
            {cell.health = 0; 
			//fight(makeUp); return;
			}
        if (game.global.soldierHealth < 0) game.global.soldierHealth = 0;
    }
    if (cell.health <= 0) game.global.battleCounter = 800;
    if (makeUp) return;
    document.getElementById("badGuyHealth").innerHTML = prettify(cell.health, 0);
    updateGoodBar();
    var percent = ((cell.health / cell.maxHealth) * 100);
    document.getElementById("badGuyBar").style.width = percent + "%";
    document.getElementById("badGuyBar").style.backgroundColor = getBarColor(percent);
    /*	if (game.jobs.Medic.owned >= 1) setTimeout(heal, 500); */
}

/* function heal() {
	var medics = game.jobs.Medic;
	if (game.global.soldierHealth > 0)
	game.global.soldierHealth += (medics.owned * medics.modifier);
	if (game.global.soldierHealth > game.global.soldierHealthMax) game.global.soldierHealth = game.global.soldierHealthMax;
	updateGoodBar();
} */

function updateGoodBar() {
    document.getElementById("goodGuyHealth").innerHTML = prettify(game.global.soldierHealth, 0);
    var percent = ((game.global.soldierHealth / game.global.soldierHealthMax) * 100);
    document.getElementById("goodGuyBar").style.width = percent + "%";
    document.getElementById("goodGuyBar").style.backgroundColor = getBarColor(percent);
}

function buyEquipment(what) {
	var toBuy = game.equipment[what];
	if (typeof toBuy === 'undefined') return;
	var canAfford = canAffordBuilding(what, null, null, true);
	if (canAfford){
		canAffordBuilding(what, true, null, true);
		toBuy.level += game.global.buyAmt;
		var stat;
		if (toBuy.blockNow) stat = "block";
		else stat = (typeof toBuy.health !== 'undefined') ? "health" : "attack";
		game.global[stat] += (toBuy[stat + "Calculated"] * game.global.buyAmt);
	}
	tooltip(what, "equipment", "update");	
}

function affordOneTier(what, whereFrom, take) {
    //take, true/false to take resources or not or something like that probably
    //don't send shit in here to take without checking first though
    var buyFrom = game[whereFrom];
    var toBuy = game.equipment[what];
    for (var item in toBuy.cost) {
        var cost;
        if (typeof toBuy.cost[item] === 'function') cost = toBuy.cost[item]();
        if (typeof toBuy.cost[item][1] !== 'undefined') cost = resolvePow(toBuy.cost[item], toBuy);
        if (cost > buyFrom[item].owned) return false;
        if (take) buyFrom[item].owned -= cost;
    }
    return true;
}

function fadeIn(elem, speed) {
    var opacity = 0;
    elem = document.getElementById(elem);
    elem.style.opacity = 0;
    if (elem.style.display == "none") elem.style.display = "block";
    if (elem.style.visibility == "hidden") elem.style.visibility = "visible";

    var fadeInt = setInterval(function () {
        opacity = opacity + 0.01;
        elem.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeInt);
        }
    }, speed);

}

function autoTrap() {
	if (game.resources.food.owned >= 10 && game.resources.wood.owned >= 10){
		game.resources.food.owned -= 10;
		game.resources.wood.owned -= 10;
		game.buildings.Trap.purchased++;
		startQueue("Trap", 1);
	}
}

load();


setTimeout(autoSave, 60000);

function gameLoop(makeUp) {
    gather(makeUp);
    craftBuildings();
	if (game.global.trapBuildToggled && game.global.trapBuildAllowed && game.global.buildingsQueue.length == 0) autoTrap();
    breed(makeUp);
    battleCoordinator(makeUp);
}

function costUpdatesTimeout() {
	checkButtons("buildings");
    checkButtons("jobs");
    checkButtons("equipment");
    checkButtons("upgrades");
    checkTriggers();
	setTimeout(costUpdatesTimeout, 250);
}

costUpdatesTimeout();

function gameTimeout() {
	var now = new Date().getTime();
	game.global.lastOnline = now;
    var tick = 1000 / game.settings.speed;
    game.global.time += tick;
    var dif = (now - game.global.start) - game.global.time;
    while (dif >= tick) {
        gameLoop(true);
        dif -= tick;
        game.global.time += tick;
    }
    gameLoop();
    updateLabels();
    setTimeout(gameTimeout, (tick - dif));
	
}

setTimeout(gameTimeout(), (1000 / game.settings.speed));

document.addEventListener('keydown', function(e) {
	if (e.keyCode == 27) { // ESC
		// cancel the current dialog box
		cancelTooltip();
	}
}, true);

document.getElementById("versionNumber").innerHTML = game.global.version;