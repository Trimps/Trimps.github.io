//I wrote all of this code by hand with no libraries so I could learn stuff (except LZString for save import/export, string compression is out of my league. Credits in that file). This is my first javascript project, so be nice.
//Feel free to read through the code and use stuff if you want, I don't know how to properly comment code so I just wrote stuff where I felt like it
//I will be continually cleaning up and making this code more readable as my javascript skills improve
//Contact me via reddit, /u/brownprobe, or trimpsgame@gmail.com
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
    var elem = gameElements.getElementById("toggleBtn");
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
    var saveString = JSON.stringify(game);
    var saveGame = JSON.parse(saveString);
    saveGame.worldUnlocks = null;
    saveGame.badGuys = null;
    saveGame.mapConfig = null;
    for (var item in saveGame.equipment) {
        saveGame.equipment[item].tooltip = null;
        saveGame.equipment[item].cost = null;
    }
    for (var itemA in saveGame.buildings) {
        saveGame.buildings[itemA].tooltip = null;
        saveGame.buildings[itemA].cost = null;
    }
    for (var itemB in saveGame.upgrades) {
        saveGame.upgrades[itemB].tooltip = null;
        saveGame.upgrades[itemB].cost = null;
    }
    for (var itemC in saveGame.jobs) {
        saveGame.jobs[itemC].tooltip = null;
        saveGame.jobs[itemC].cost = null;
    }
    for (var itemD in saveGame.triggers) {
        saveGame.triggers[itemD].message = null;
        saveGame.triggers[itemD].cost = null;
    }
    saveString = LZString.compressToBase64(JSON.stringify(saveGame));
    if (exportThis) return saveString;
	try{
		localStorage.setItem("trimpSave1",saveString);
		if (localStorage.getItem("trimpSave1") == saveString){
			message("Game Saved!", "Notices");
		}
		else {
			console.log(saveString, localStorage.getItem('trimpSave1'));
			message("For some reason, your game is not saving. Make sure you export and back up your save!", "Notices");
		}
	}
	catch(err){ message("For some reason, your game is not saving. Make sure you export and back up your save!", "Notices"); }

}

function load(saveString, autoLoad) {
    var savegame;
    if (saveString) {
        savegame = JSON.parse(LZString.decompressFromBase64(gameElements.getElementById("importBox").value));
        tooltip('hide');
    } else if (localStorage.getItem("trimpSave1") !== null) {
        savegame = JSON.parse(LZString.decompressFromBase64(localStorage.getItem("trimpSave1")));
    }
    if (typeof savegame === 'undefined' || savegame === null || typeof savegame.global === 'undefined') return;
    resetGame();
    if (game.global.killSavesBelow > savegame.global.version) {
        message("I'm so terribly sorry, but your previous save game (version " + savegame.global.version + ") does not work in the new version. This game is still in early alpha, and a lot is still changing! Thank you for helping test!", "Notices");
        message("Since you already had a save, and since the game is still alpha, I unlocked a little cheat button for you. It will make you twice as efficient, allowing you to get through the beginning a little faster.", "Notices");
        gameElements.getElementById("cheatTd").style.display = "block";
        return;
    } else savegame.global.version = game.global.version;
    if (typeof savegame.global !== 'undefined') {
        for (var item in game.global) {
            if (item == "time" || item == "start" || item == "lastFightUpdate" || item == "prestigeCostMod" || item == "prestigeValueMod") continue;
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
        var topGame = game[a];
        for (var b in topGame) { //each item in main category (resource names, job names, etc)
            var midSave = topSave[b];
            if (typeof midSave === 'undefined' || midSave === null) continue;
            var midGame = topGame[b];
            if (typeof midSave !== 'object') midGame = midSave;
            else
                for (var c in midGame) { //purchased, cost, etc
                    if (a == "equipment" && c == "cost") {
                        if (typeof midGame[c].metal !== 'undefined') midGame[c].metal[0] *= (topSave[b].prestige > 1) ? ((topSave[b].prestige - 1) * game.global.prestigeCostMod) : 1;
                        if (typeof midGame[c].wood !== 'undefined') midGame[c].wood[0] *= (topSave[b].prestige > 1) ? ((topSave[b].prestige - 1) * game.global.prestigeCostMod) : 1;
                        continue;
                    }
                    if (c == "cost") continue;
                    if (c == "tooltip") continue;
                    var botSave = midSave[c];
                    if (typeof botSave === 'undefined' || botSave === null) continue;
                    midGame[c] = botSave;
                }
        }
    }

    if (game.buildings.Gym.locked === 0) gameElements.getElementById("blockDiv").style.visibility = "visible";
    if (game.global.gridArray.length > 0) {
        gameElements.getElementById("battleContainer").style.visibility = "visible";
		fadeIn("EquipmentFilter", 10);
		fadeIn("equipmentTitleDiv", 10);
        drawGrid();
        gameElements.getElementById('metal').style.visibility = "visible";
        for (var x = 0; x <= game.global.lastClearedCell; x++) {
            gameElements.getElementById("cell" + x).style.backgroundColor = "green";
        }
        if (game.global.battleClock > 0) gameElements.getElementById("battleTimer").style.visibility = "visible";
    }
    if (game.global.mapGridArray.length > 0) {
        drawGrid(true);
        for (var y = 0; y <= game.global.lastClearedMapCell; y++) {
            gameElements.getElementById("mapCell" + y).style.backgroundColor = "green";
        }
    } else if (game.global.mapGridArray.length === 0 && game.global.mapsActive) game.global.mapsActive = false;
    if (game.resources.trimps.owned > 0 || game.buildings.Trap.owned > 0) game.buildings.Trap.first();
    if (game.global.autoBattle) {
        gameElements.getElementById("pauseFight").style.visibility = "visible";
        pauseFight(true);
    }
    for (var itemC in game.global.mapsOwnedArray) {
        unlockMap(itemC);
    }
	for (var messageBool in game.global.messages){
		if (!game.global.messages[messageBool]){
			filterMessage(messageBool, true);
		}
	}
	for (var tabBool in game.global.buyTabs){
		if (!game.global.buyTabs[tabBool]){
			filterTabs(tabBool, true);
		}
	}
	gameElements.getElementById("worldNumber").innerHTML = game.global.world;
    mapsSwitch(true);
    checkTriggers(true);
    setGather(game.global.playerGathering);
    numTab(1);
    if (game.global.autoCraftModifier > 0)
        gameElements.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 2) + " Foremen";
    if (game.global.fighting) startFight();
    toggleSave(true);
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
    if (what == "gems") level -= 600;
    level += 1122;
    var amt = Math.round(baseAmt * Math.pow(1.0046, level));
    //var amt = Math.round(baseAmt * (Math.pow(1.02, level)));
    //var otherAmt = Math.round(baseAmt * level);
    //if (otherAmt > amt) amt = otherAmt;
    if (checkMapLootScale) amt = Math.round(amt * map.loot);
    addResCheckMax(what, amt);
    return amt;
}

function addResCheckMax(what, number) {
    var res = game.resources[what];
    if (res.owned + number <= res.max || res.max == -1) res.owned += number;
    else res.owned = res.max;
}

function fireMode(noChange) {
    if (!noChange) game.global.firing = !game.global.firing;
    var elem = gameElements.getElementById("fireBtn");
    if (game.global.firing) {
        elem.style.background = "rgba(255,0,0,0.5)";
        elem.innerHTML = "Firing";
    } else {
        elem.style.background = "rgba(255,255,255,0.25)";
        elem.innerHTML = "Fire";
    }
    tooltip("Fire Trimps", null, "update");

}

function setGather(what) {
    var toGather = game.resources[what];
    var colorOn = "rgba(255,255,255,0.25)";
    var colorOff = "rgba(0,0,0,1)";
    if (typeof toGather === 'undefined' && what != "buildings") return;
    if (game.global.playerGathering !== "") {
        gameElements.getElementById(game.global.playerGathering + "CollectBtn").innerHTML = setGatherTextAs(game.global.playerGathering, false);
        gameElements.getElementById(game.global.playerGathering + "CollectBtn").style.background = colorOff;
    }
    game.global.playerGathering = what;
    gameElements.getElementById(what + "CollectBtn").innerHTML = setGatherTextAs(what, true);
    gameElements.getElementById(what + "CollectBtn").style.background = colorOn;
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
        return (on) ? ("Trapping " + trimpTrapText) : ("Trap " + trimpTrapText);
    }
}

function gather() {
    var what = game.global.playerGathering;
    var whatPs = 0;
    var amount;
    for (var job in game.jobs) {
        if (game.jobs[job].owned < 1) continue;
        var perSec = (game.jobs[job].owned * game.jobs[job].modifier);
        var increase = game.jobs[job].increase;
        if (increase == "custom") continue;
        amount = perSec / game.settings.speed;
        if ((game.resources[increase].max != -1) && ((game.resources[increase].owned + amount) > game.resources[increase].max)) game.resources[increase].owned = game.resources[increase].max;
        else game.resources[increase].owned += amount;
        if (what == increase) {
            whatPs = perSec;
            perSec += game.global.playerModifier;
        }
    }
    if (what === "" || what == "buildings") return;
    if (what == "trimps") {
        trapThings();
        return;
    }
    var toGather = game.resources[what];
    if (typeof toGather === 'undefined') return;
    amount = (game.global.playerModifier) / game.settings.speed;
    if ((toGather.max != -1) && ((toGather.owned + amount) > toGather.max)) toGather.owned = toGather.max;
    else toGather.owned += amount;
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
    var compare;
    if (typeof whatObj.done !== 'undefined') compare = 'done';
    if (typeof whatObj.level !== 'undefined') compare = 'level';
    if (typeof whatObj.owned !== 'undefined') compare = 'owned';
	if (typeof whatObj.purchased !== 'undefined') compare = 'purchased';
    return (Math.floor(cost[0] * Math.pow(cost[1], (whatObj[compare] + addOwned))));
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
		price = getBuildingItemPrice(toBuy, costItem, isEquipment)
		if (price > game.resources[costItem].owned) {
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
			if (thisCost.lastCheckCount != game.global.buyAmt || thisCost.lastCheckOwned != toBuy[compare]){
				for (var x = 0; x < game.global.buyAmt; x++){
						price += resolvePow(thisCost, toBuy, x);
				}
				thisCost.lastCheckCount = game.global.buyAmt;
				thisCost.lastCheckAmount = price;
				thisCost.lastCheckOwned = toBuy[compare];
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
		for (var x = 0; x < game.global.buyAmt; x++){
			game.buildings[what].purchased++;
			startQueue(what);
			if (game.buildings[what].percent) break;
		}
		tooltip(what, "buildings", "update");	
	}
}

function cancelQueueItem(what) {
    var queue = game.global.buildingsQueue;
    var index = queue.indexOf(what);
    removeQueueItem(what);
    what = what.split('.')[0];
    game.buildings[what].purchased--;
    refundQueueItem(what);
    queue.splice(index, 1);
    if (index === 0) {
        game.global.crafting = "";
        game.global.timeLeftOnCraft = 0;
        gameElements.getElementById("buildingsBar").style.width = "0%";
    }
}

function refundQueueItem(what) {
    var struct = game.buildings[what];
    for (var costItem in struct.cost) {
        game.resources[costItem].owned += (typeof struct.cost[costItem] === 'function') ? struct.cost[costItem]() : struct.cost[costItem];
		var test = (typeof struct.cost[costItem] === 'function') ? struct.cost[costItem]() : struct.cost[costItem];
    }
}

function startQueue(what) {
    var alreadyIn = false;
    var count = 0;
    for (var queueItem in game.global.buildingsQueue) {
        if (game.global.buildingsQueue[queueItem].split('.')[0] == what) {
            count++;
            alreadyIn = true;
            break;
        }
    }
    if (!alreadyIn) count = 0;
    game.global.buildingsQueue.push(what + "." + (count));
    addQueueItem(what + "." + count);
}

function craftBuildings(makeUp) {
    var buildingsBar = gameElements.getElementById("buildingsBar");
    var speedElem = gameElements.getElementById("buildSpeed");
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
        speedElem.innerHTML = Math.floor(modifier * 100) + "%";
        game.global.timeLeftOnCraft -= ((1 / game.settings.speed) * modifier);
        buildingsBar.style.width = (100 - ((game.global.timeLeftOnCraft / game.buildings[game.global.crafting].craftTime) * 100)) + "%";
        buildingsBar.innerHTML = (game.global.timeLeftOnCraft / modifier).toFixed(1) + " Seconds";
        if (game.global.timeLeftOnCraft > 0) return;
        buildingsBar.innerHTML = "";
        buildingsBar.style.width = "0%";
    }
    buildBuilding(game.global.crafting);
    removeQueueItem(game.global.buildingsQueue[0]);
    game.global.buildingsQueue.splice(0, 1);
    if (game.global.buildingsQueue.length <= 0) {
        game.global.crafting = "";
        gameElements.getElementById("noQueue").style.display = "block";
        return;
    }
    var nextCraft = game.global.buildingsQueue[0].split('.')[0];
    game.global.crafting = nextCraft;
    game.global.timeLeftOnCraft = game.buildings[nextCraft].craftTime;
}

function buildBuilding(what) {
    var building = game.buildings[what];
    var toIncrease;
    building.owned++;
    if (building.owned == 1 && typeof building.first !== 'undefined') building.first();
    if (gameElements.getElementById(what + "Owned") === null) return;
    gameElements.getElementById(what + "Owned").innerHTML = building.owned;
    if (typeof building.increase === 'undefined') return;
    var buildingSplit = building.increase.what.split('.');
    if (buildingSplit[0] == "global") toIncrease = game.global;
    else
        toIncrease = game.resources[buildingSplit[0]];
    if (buildingSplit[2] == "mult") Math.floor(toIncrease[buildingSplit[1]] *= building.increase.by);
    else
        toIncrease[buildingSplit[1]] += building.increase.by;
    numTab();
}

function setNewCraftItem() {
    var queueItem = game.global.buildingsQueue[0].split('.')[0];
    game.global.crafting = queueItem;
    game.global.timeLeftOnCraft = game.buildings[queueItem].craftTime;
    gameElements.getElementById("buildingsBar").style.width = "0%";
}

function calculatePercentageBuildingCost(what, resourceToCheck, costModifier){
	var struct = game.buildings[what];
	var res = game.resources[resourceToCheck];
	var resSim = res.max;
	var dif = struct.purchased - struct.owned;
	for (var x = 0; x < dif; x++){
		resSim = Math.floor(resSim * struct.increase.by);
	}
	return Math.floor(resSim * costModifier);
}

function trapThings() {
    var trap = game.buildings.Trap;
    var trimps = game.resources.trimps;
    if (game.global.timeLeftOnTrap == -1) {
        if (trimps.owned < trimps.max && trap.owned >= 1)
            game.global.timeLeftOnTrap = trimps.speed;
        else {
            gameElements.getElementById("trappingBar").style.width = "0%";
            gameElements.getElementById("TrapOwned").innerHTML = trap.owned;
            return;
        }
    }
    game.global.timeLeftOnTrap -= ((1 / game.settings.speed) * game.global.playerModifier);
    if (game.global.timeLeftOnTrap <= 0 && trimps.owned < trimps.max && trap.owned >= 1) {
        trap.owned--;
        trimps.owned++;
        game.global.timeLeftOnTrap = -1;
        gameElements.getElementById("TrapOwned").innerHTML = trap.owned;
    }
    gameElements.getElementById("trappingBar").style.width = (100 - ((game.global.timeLeftOnTrap / trimps.speed) * 100)) + "%";
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
	if (cost.lastCheckCount != game.global.buyAmt || cost.lastCheckOwned != job.owned){
		for (var x = 0; x < game.global.buyAmt; x++) {
			price += Math.floor(cost[0] * Math.pow(cost[1], (job.owned + x)));
		}
		cost.lastCheckCount = game.global.buyAmt;
		cost.lastCheckAmount = price;
		cost.lastCheckOwned = job.owned;
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
    upgrade.locked = 1;
    upgrade.done++;
    var dif = upgrade.allowed - upgrade.done;
    if (dif > 1) {
        gameElements.getElementById(what + "Owned").innerHTML = upgrade.done + "( +" + dif + ")";
        return;
    } else if (dif == 1) {
        gameElements.getElementById(what + "Owned").innerHTML = upgrade.done;
        return;
    }
    gameElements.getElementById("upgradesHere").removeChild(gameElements.getElementById(what));
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
    updatePs(breeding, true);
    trimps.owned += breeding / game.settings.speed;
}

function prestigeEquipment(what) {
    var equipment = game.equipment[what];
    if (typeof equipment.cost.wood !== 'undefined') {
        equipment.cost.wood[0] *= game.global.prestigeCostMod;
    } else
        equipment.cost.metal[0] *= game.global.prestigeCostMod;
    if (typeof equipment.health !== 'undefined') {
        game.global.health -= (equipment.health * equipment.level);
        equipment.health *= game.global.prestigeValueMod;

    } else {
        game.global.attack -= (equipment.attack * equipment.level);
        equipment.attack *= game.global.prestigeValueMod;

    }
    equipment.level = 0;
    equipment.prestige++;
    if (gameElements.getElementById(what + "Numeral") !== null) gameElements.getElementById(what + "Numeral").innerHTML = romanNumeral(equipment.prestige);
}

function createMap() {
    game.global.mapsOwned++;
    game.global.totalMapsEarned++;
    var world = game.global.world;
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
        size: getRandomMapValue("size"),
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
            name: getRandomBadGuy(map.location)
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
            name: getRandomBadGuy()
        });
    }
    game.global.gridArray = array;
    addSpecials();
}

function getRandomBadGuy(mapSuffix) {
    var badGuysArray = [];
    for (var item in game.badGuys) {
        if (game.badGuys[item].location == "All" || game.badGuys[item].location == mapSuffix) badGuysArray.push(item);
    }
    return badGuysArray[Math.floor(Math.random() * badGuysArray.length)];
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
        if ((special.level == "last" && canLast && special.world <= world && special.canRunOnce)) {
            if (countOnly){
				specialCount++;
				continue;
			}
			array = addSpecialToLast(special, array, item);
            canLast = false;
            continue;
        }
        if (typeof special.canRunOnce !== 'undefined' && !special.canRunOnce) continue;
        if ((special.world != world && special.world > 0)) continue;
        if ((special.world == -2) && ((world % 2) !== 0)) continue;
        if ((special.world == -3) && ((world % 2) != 1)) continue;
        if ((special.world == -5) && ((world % 5) !== 0)) continue;
        if ((special.world == -33) && ((world % 3) !== 0)) continue;
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
    var grid = (maps) ? gameElements.getElementById("mapGrid") : gameElements.getElementById("grid");
    grid.innerHTML = "";
    var cols = (maps) ? (game.global.mapGridArray.length / 10) : 10;
    var counter = 0;
    var idText = (maps) ? "mapCell" : "cell";
    var size = 0;
    if (maps) size = game.global.mapGridArray.length;
    for (var i = 0; i < 10; i++) {
        if (maps && counter >= size) return;
        var row = grid.insertRow(0);
        row.id = "row" + i;
        for (var x = 0; x < cols; x++) {
            if (maps && counter >= size) return;
            var cell = row.insertCell(x);
            cell.id = idText + counter;
            cell.className = "battleCell";
            cell.innerHTML = (maps) ? game.global.mapGridArray[counter].text : game.global.gridArray[counter].text;
            counter++;
        }
    }
}

function fightManual() {
    battle(true);
}

function pauseFight(setup) {
    if (setup) game.global.pauseFight = (game.global.pauseFight) ? false : true;
    if (game.global.pauseFight) {
        game.global.pauseFight = false;
        gameElements.getElementById("pauseFight").innerHTML = "Pause";
    } else {
        game.global.pauseFight = true;
        gameElements.getElementById("pauseFight").innerHTML = "AutoBattle";
    }
}

function recycleMap() {
    if (game.global.lookingAtMap === "") return;
    var map = getMapIndex(game.global.lookingAtMap);
    if (map === null) return;
    game.global.mapsOwnedArray.splice(map, 1);
    gameElements.getElementById("mapsHere").removeChild(gameElements.getElementById(game.global.lookingAtMap));
    game.global.lookingAtMap = "";
    game.global.currentMapId = "";
    game.global.mapsOwned--;
    game.global.lastClearedMapCell = -1;
    game.resources.fragments.owned++;
    gameElements.getElementById("selectedMapName").innerHTML = "Select a Map!";
    gameElements.getElementById("selectedMapStats").innerHTML = "";
    gameElements.getElementById("selectMapBtn").style.visibility = "hidden";
    gameElements.getElementById("recycleMapBtn").style.visibility = "hidden";

}

function buyMap() {
	if (game.resources.fragments.owned >= 3){
		game.resources.fragments.owned -= 3;
		createMap();
	}
}

function mapsClicked() {
    if (game.global.fighting && !game.global.preMapsActive) message("Waiting to travel until your soldiers are finished.", "Notices");
    if (game.global.preMapsActive) {
        mapsSwitch();
        return;
    }
    if (game.global.switchToMaps || game.global.switchToWorld) {
        message("Already waiting to switch.", "Notices");
        return;
    }
    if (game.global.mapsActive) game.global.switchToWorld = true;
    else game.global.switchToMaps = true;
}

function mapsSwitch(updateOnly) {
    if (!updateOnly) {
        game.global.switchToMaps = false;
        game.global.switchToWorld = false;
        if (game.global.mapsActive || game.global.preMapsActive) {
            game.global.mapsActive = false;
            game.global.preMapsActive = false;
        } else game.global.preMapsActive = true;
    }
    if (game.global.preMapsActive) {
        gameElements.getElementById("grid").style.display = "none";
        gameElements.getElementById("preMaps").style.display = "block";
        gameElements.getElementById("mapGrid").style.display = "none";
        gameElements.getElementById("mapsBtn").innerHTML = "World";
        if (game.global.currentMapId === "") {
            gameElements.getElementById("selectMapBtn").style.visibility = "hidden";
            gameElements.getElementById("recycleMapBtn").style.visibility = "hidden";
            gameElements.getElementById("selectedMapName").innerHTML = "Select a Map!";
            gameElements.getElementById("selectedMapStats").innerHTML = "";
        } else {
            selectMap(game.global.currentMapId, true);
            gameElements.getElementById("selectMapBtn").innerHTML = "Continue";
            gameElements.getElementById("selectMapBtn").style.visibility = "visible";
            gameElements.getElementById("recycleMapBtn").style.visibility = "visible";
        }
    } else if (game.global.mapsActive) {
        var currentMapObj = getCurrentMapObject();
        gameElements.getElementById("grid").style.display = "none";
        gameElements.getElementById("preMaps").style.display = "none";
        gameElements.getElementById("mapGrid").style.display = "table";
        gameElements.getElementById("mapsBtn").innerHTML = "World";
        gameElements.getElementById("worldNumber").innerHTML = "Lv: " + currentMapObj.level;
        gameElements.getElementById("worldName").innerHTML = currentMapObj.name;
    } else {
        gameElements.getElementById("grid").style.display = "table";
        gameElements.getElementById("preMaps").style.display = "none";
        gameElements.getElementById("mapGrid").style.display = "none";
        gameElements.getElementById("mapsBtn").innerHTML = "Maps";
        gameElements.getElementById("worldNumber").innerHTML = game.global.world;
        gameElements.getElementById("worldName").innerHTML = "World";
    }
}

function selectMap(mapId, force) {
    if (!force && game.global.currentMapId !== "") {
        message("You must finish or recycle your current map before moving on.", "Notices");
        return;
    }
    var map = getMapIndex(mapId);
    map = game.global.mapsOwnedArray[map];
    gameElements.getElementById("selectedMapName").innerHTML = map.name;
    gameElements.getElementById("selectedMapStats").innerHTML = "Size: " + Math.floor(map.size) + ". Difficulty: " + Math.floor(map.difficulty * 100) + "%. Loot Bonus: " + Math.floor(map.loot * 100) + "%.<br/>There are " + addSpecials(true, true, map) + " items to be earned from level " + map.level + "+ maps.";
    if (typeof game.global.mapsOwnedArray[getMapIndex(game.global.lookingAtMap)] !== 'undefined') gameElements.getElementById(game.global.lookingAtMap).style.border = "1px solid white";
    gameElements.getElementById(mapId).style.border = "1px solid red";
    game.global.lookingAtMap = mapId;
    gameElements.getElementById("selectMapBtn").innerHTML = "Run Map";
    gameElements.getElementById("selectMapBtn").style.visibility = "visible";
    gameElements.getElementById("recycleMapBtn").style.visibility = "visible";
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
        battle(null, makeUp);
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
    gameElements.getElementById("badGuyCol").style.visibility = "visible";
    var cellNum;
    var cell;
    var cellElem;
    if (game.global.mapsActive) {
        cellNum = game.global.lastClearedMapCell + 1;
        cell = game.global.mapGridArray[cellNum];
        cellElem = gameElements.getElementById("mapCell" + cellNum);
    } else {
        cellNum = game.global.lastClearedCell + 1;
        cell = game.global.gridArray[cellNum];
        cellElem = gameElements.getElementById("cell" + cellNum);
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
        gameElements.getElementById("badGuyBar").style.width = "100%";
        gameElements.getElementById("badGuyName").innerHTML = cell.name;
        gameElements.getElementById("badGuyBar").style.backgroundColor = "blue";
        gameElements.getElementById("badGuyAttack").innerHTML = calculateDamage(cell.attack, true);
    }
    if (game.global.soldierHealth === 0) {
        var trimpsFighting = game.resources.trimps.maxSoldiers;
        game.global.soldierHealthMax = (game.global.health * trimpsFighting);
        game.global.soldierHealth = game.global.soldierHealthMax;
        game.global.soldierCurrentAttack = (game.global.attack * trimpsFighting);
        game.global.soldierCurrentBlock = Math.floor((game.global.block * (game.jobs.Trainer.owned * (game.jobs.Trainer.modifier / 100)) + game.global.block) * trimpsFighting);
        gameElements.getElementById("trimpsFighting").innerHTML = prettify(trimpsFighting, 0);
        gameElements.getElementById("goodGuyBar").style.width = "100%";
        gameElements.getElementById("goodGuyBlock").innerHTML = prettify(game.global.soldierCurrentBlock);
        gameElements.getElementById("goodGuyAttack").innerHTML = calculateDamage(game.global.soldierCurrentAttack, true);
    }
    game.global.fighting = true;
    game.global.lastFightUpdate = new Date();
    gameElements.getElementById("goodGuyHealth").innerHTML = prettify(game.global.soldierHealth, 0);
    gameElements.getElementById("goodGuyHealthMax").innerHTML = prettify(game.global.soldierHealthMax, 0);
    gameElements.getElementById("goodGuyBar").style.backgroundColor = "blue";
    gameElements.getElementById("badGuyHealth").innerHTML = prettify(cell.health, 0);
    gameElements.getElementById("badGuyHealthMax").innerHTML = prettify(cell.maxHealth, 0);

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
    //ga('send', 'event', 'Next World', 'World: ' + game.global.world);
    gameElements.getElementById("worldNumber").innerHTML = game.global.world;
    game.global.lastClearedCell = -1;
    game.global.gridArray = [];
    gameElements.getElementById("grid").innerHTML = "";
    buildGrid();
    drawGrid();
}

function fight(makeUp) {
    if (game.global.soldierHealth <= 0) {
        var s = (game.resources.trimps.maxSoldiers > 1) ? "s" : "";
        message(game.resources.trimps.maxSoldiers + " Trimp" + s + " just bit the dust.", "Combat");
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
        cellElem = gameElements.getElementById("mapCell" + cellNum);
    } else {
        cellNum = game.global.lastClearedCell + 1;
        cell = game.global.gridArray[cellNum];
        cellElem = gameElements.getElementById("cell" + cellNum);
    }
    if (cell.health <= 0) {
        message("You killed a " + cell.name + "!", "Combat");
        //if (cell.level % 2 === 0) ga('send', 'event', 'Killed Bad Guy', 'W: ' + game.global.world + ' L:' + cell.level);
        cellElem.style.backgroundColor = "green";
        if (game.global.mapsActive) game.global.lastClearedMapCell = cellNum;
        else game.global.lastClearedCell = cellNum;
        game.global.fighting = false;
        gameElements.getElementById("badGuyCol").style.visibility = "hidden";
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
        if (game.global.mapsActive && cellNum == (game.global.mapGridArray.length - 1)) {
            game.global.preMapsActive = true;
            game.global.mapsActive = false;
            game.global.lastClearedMapCell = -1;
            game.global.currentMapId = "";
            game.global.mapGridArray = [];
            game.global.fighting = false;
            mapsSwitch(true);
            return;
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
        if (cell.health < 0) cell.health = 0;
    } else {
        cell.health -= calculateDamage(game.global.soldierCurrentAttack);
        if (cell.health > 0) game.global.soldierHealth -= (attackAndBlock > 0) ? attackAndBlock : 0;
        else
            cell.health = 0;
        if (game.global.soldierHealth < 0) game.global.soldierHealth = 0;
    }
    game.global.lastFightUpdate = new Date();
    if (makeUp) return;
    gameElements.getElementById("badGuyHealth").innerHTML = prettify(cell.health, 0);
    updateGoodBar();
    var percent = ((cell.health / cell.maxHealth) * 100);
    gameElements.getElementById("badGuyBar").style.width = percent + "%";
    gameElements.getElementById("badGuyBar").style.backgroundColor = getBarColor(percent);
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
    gameElements.getElementById("goodGuyHealth").innerHTML = prettify(game.global.soldierHealth, 0);
    var percent = ((game.global.soldierHealth / game.global.soldierHealthMax) * 100);
    gameElements.getElementById("goodGuyBar").style.width = percent + "%";
    gameElements.getElementById("goodGuyBar").style.backgroundColor = getBarColor(percent);
}

function buyEquipment(what) {
	var toBuy = game.equipment[what];
	if (typeof toBuy === 'undefined') return;
	var canAfford = canAffordBuilding(what, null, null, true);
	if (canAfford){
		canAffordBuilding(what, true, null, true);
		toBuy.level += game.global.buyAmt;
		if (typeof obj.attack !== 'undefined') game.global.attack += (obj.attack * game.global.buyAmt);
		if (typeof obj.health !== 'undefined') game.global.health += (obj.health * game.global.buyAmt);
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
    elem = gameElements.getElementById(elem);
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

function cheatALittle() {
    if (game.global.playerModifier <= 2) {
        game.global.playerModifier = 2;
        gameElements.getElementById("cheatTd").style.display = "none";
        message("Your player modifier has been boosted to 200%!", "Notices");
        return;
    }
    message("You already cheated, save some for the other kids.", "Notices");
}
setTimeout(autoSave, 60000);

function gameLoop(makeUp) {
    gather(makeUp);
    craftBuildings();
    breed(makeUp);
    battleCoordinator(makeUp);
}

function costUpdatesTimeout() {
	checkButtons("buildings");
    checkButtons("jobs");
    checkButtons("equipment");
    checkButtons("upgrades");
    checkTriggers();
	setTimeout(costUpdatesTimeout, 500);
}

costUpdatesTimeout();

function gameTimeout() {
    var tick = 1000 / game.settings.speed;
    game.global.time += tick;
    var dif = (new Date().getTime() - game.global.start) - game.global.time;
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


load();
gameElements.getElementById("versionNumber").innerHTML = game.global.version;