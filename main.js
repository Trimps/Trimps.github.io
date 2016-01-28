//This is my first javascript project, be nice.
//Feel free to read through the code and use stuff if you want, I don't know how to properly comment code so I just wrote stuff where I felt like it
//I will be continually cleaning up and making this code more readable as my javascript skills improve
//Contact me via Kongregate as GreenSatellite, reddit on /r/Trimps, or Email at trimpsgame@gmail.com
//This UI layout was made possible by bootstrap http://www.getbootstrap.com, and the icons are from Glyphicons http://www.glyphicons.com and Icomoon https://icomoon.io
//If you want to learn how to make javascript games, this is the short tutorial that got me started: http://dhmholley.co.uk/incrementals.html

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
"use strict";
if (typeof kongregate === 'undefined' && document.getElementById("boneBtn") !== null) {
	var boneBtn = document.getElementById("getBonesBtn");
	boneBtn.onclick = "";
	boneBtn.innerHTML = "Kongregate API not loaded! You cannot submit high scores or spend Kreds. Try refreshing or contacting Kongregate support!";
	boneBtn.style.backgroundColor = "#d9534f";
	document.getElementById("getBundleBtn").style.display = "none";
}
document.getElementById("versionNumber").innerHTML = game.global.version;

var sessionMapValues = {
	loot: 0,
	difficulty: 0,
	size: 0,
	biome: "Random"
}

function autoSave() {
    if (game.options.menu.autoSave.enabled) save();
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
	delete saveGame.tierValues;
	delete saveGame.colorsList;
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
		delete saveGame.upgrades[itemB].modifier;
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
		delete portal.otherModifier;
	}
	for (var itemS in saveGame.options.menu){
		var settingItem = saveGame.options.menu[itemS];
		delete settingItem.description;
		delete settingItem.titles;
	}
	for (var itemF in saveGame.challenges){
		var challenge = saveGame.challenges[itemF];
		delete challenge.description;
		delete challenge.unlockString;
	}
	for (var itemG in saveGame.achievements){
		var achievement = saveGame.achievements[itemG];
		delete achievement.tiers;
		delete achievement.breakpoints;
		delete achievement.names;
		delete achievement.title;
		delete achievement.icon;
		delete achievement.newStuff;
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
        savegame = JSON.parse(LZString.decompressFromBase64(document.getElementById("importBox").value.replace(/(\r\n|\n|\r|\s)/gm,"")));
        tooltip('hide');
		if (!savegame) {
			message("It looks like your import code isn't working properly. Please make sure that your export code is saved in a text file compatible with all of the characters. If you believe this code should be working, you can Email it to Trimpsgame@gmail.com and I will do my best to restore it for you!", "Notices");
			return;
		}
    } else  {
		var unparsedSave;
		try {
			unparsedSave = localStorage.getItem("trimpSave1");
		}
		catch (e) {
			message("Your browser is preventing Trimps from accessing localStorage, and you will not be able to save or load your progress. Please check your browser settings to ensure that 3rd party cookies are not disabled, and that you're not using any addons that might interrupt storage! <br/><br/> AutoSave has been disabled to prevent damage to your save. If you previously had a save file, it should still be waiting for you once you fix your browser settings.", "Notices");
			game.options.menu.autoSave.enabled = 0;
			game.options.menu.autoSave.onToggle();
			return;
		}
        if (unparsedSave !== null) savegame = JSON.parse(LZString.decompressFromBase64(unparsedSave));
		else return;
    }
    if (typeof savegame === 'undefined' || savegame === null || typeof savegame.global === 'undefined') {
		tooltip("Welcome", null, "update");
		return;
	}
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
    } 
	else if (game.global.isBeta) {
		message("Note: You are playing on the beta/dev version. You will be unable to export your save from this version to the live version, and this server may go down or change without warning. Thank you for helping test!", "Notices");
	}
	else if (savegame.global.isBeta) {
			message("You can't import a save from the beta version to this version!", "Notices");
			return;
	}
	savegame.global.version = game.global.version;
    
	
	if (typeof savegame.global !== 'undefined') {
        for (var item in game.global) {
            if (item == "time" || item == "start" || item == "lastFightUpdate" || item == "prestige") continue;
            if (typeof savegame.global[item] !== 'undefined') game.global[item] = savegame.global[item];
            if (item == "buildingsQueue") {
                for (var itemA in game.global.buildingsQueue) {
                    addQueueItem(game.global.buildingsQueue[itemA]);
                }
				game.global.nextQueueId = game.global.buildingsQueue.length;
            }
        }
    }
    for (var a in game) { //global, resources, jobs, buildings, upgrades, triggers, equipment, settings, options
        if (a == "global") continue;
        if (a == "badGuys") continue;
        if (a == "worldUnlocks") continue;
        if (a == "mapConfig") continue;
		if (a == "options" && savegame.options){
			for (var itemO in savegame.options.menu){
				if (game.options.menu[itemO]) game.options.menu[itemO].enabled = savegame.options.menu[itemO].enabled;
			}
			if (savegame.options.menu.pauseGame && savegame.options.menu.pauseGame.timeAtPause) game.options.menu.pauseGame.timeAtPause = savegame.options.menu.pauseGame.timeAtPause;
			continue;	
		}
		if (a == "unlocks" && savegame.unlocks) {
			game.unlocks.quickTrimps = savegame.unlocks.quickTrimps;
			game.unlocks.goldMaps = savegame.unlocks.goldMaps;
		}
        var topSave = savegame[a];
        if (typeof topSave === 'undefined' || topSave === null) continue;
		if (savegame.global.brokenPlanet) game.global.prestige.cost = 53;
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
	game.global.lockTooltip = false;
	
	//Compatibility
	
	if (oldVersion === 1.0){
		var hasPortal = false;
		for (var portItem in game.portal){
			var portUpgrade = game.portal[portItem];
			if (portUpgrade.level > 0) hasPortal = true;
			if (typeof portUpgrade.level === 'undefined') continue;
			for (var d = 0; d < portUpgrade.level; d++){
				portUpgrade.heliumSpent += Math.ceil((d / 2) + portUpgrade.priceBase * Math.pow(1.3, d));
			}
		}
		if (hasPortal) game.global.totalPortals = 1;
	}
	if (oldVersion === 1.01){
		game.jobs.Dragimp.modifier = (0.5 * Math.pow(1.05, game.buildings.Tribute.owned));
	}
	if (oldVersion <= 1.02){
		for (var checkResourceMax in game.resources){
			var toCheckMax = game.resources[checkResourceMax];
			if (toCheckMax.max == -1) continue;
			toCheckMax.max = parseFloat(toCheckMax.max);
		}
	}
	if (oldVersion <= 1.06){
		game.resources.trimps.max += (game.buildings.Mansion.owned * 2);
		game.buildings.Mansion.increase.by = 10;
	}
	if (oldVersion <= 1.07){
		game.global.highestLevelCleared = game.global.world;
		game.resources.trimps.max += (game.buildings.Wormhole.owned * 500);
		game.buildings.Wormhole.increase.by = "1000";
		if (game.global.world >= 33) game.worldUnlocks.Doom.fire();
	}
	if (oldVersion < 1.1){
		if (game.global.world >= 25){
			for (var mys = 0; mys < Math.floor((game.global.world - 20) / 5); mys++){
				unlockUpgrade("Gymystic");
			}
		}
	}
	if (oldVersion < 2.213) {
		for (var item in game.options.menu){
			game.options.menu[item].enabled = (game.options.menu[item].enabled) ? 1 : 0;
		}
	}
	if (oldVersion < 2.3){
		if (game.global.highestLevelCleared >= 80) game.global.prisonClear++;
		if (game.global.world >= 70) {
			message("Welcome to 2.3! Since you are currently past zone 70, you have automatically unlocked the new Challenge - 'Trapper' and the new Job - 'Geneticist'", "Notices");
			unlockJob("Geneticist");
		}
		else if (game.global.highestLevelCleared >= 69){
			message("Welcome to 2.3! Since you have previously cleared up to at least zone 70, you have unlocked the new Challenge - 'Trapper'!", "Notices");
		}
	}
	if (oldVersion < 2.7){
		for (var statName in game.stats){
			var statItem = game.stats[statName];
			if (typeof statItem.valueTotal !== 'undefined' && typeof statItem.value !== 'undefined') {
				statItem.valueTotal = statItem.value;
				statItem.value = 0;
			}
			else if (typeof statItem.valueTotal !== 'undefined' && typeof statItem.valueTotal !== 'function' && typeof savegame.stats !== 'undefined'){
				if (typeof savegame.stats[statName] !== 'undefined') {
					statItem.valueTotal = savegame.stats[statName].value;
					}
			}
		}
		if (game.global.totalHeliumEarned > 0){
			var totalHelium = 0;
			for (var item in game.portal){
				if (game.portal[item].locked) continue;
				var portUpgrade = game.portal[item];
				if (typeof portUpgrade.level === 'undefined' || portUpgrade.level <= 0) continue;
				totalHelium += portUpgrade.heliumSpent;
			}
			var newTHV = totalHelium + game.global.heliumLeftover + game.resources.helium.owned;
			if (game.global.totalHeliumEarned - newTHV > 0) game.stats.spentOnWorms.valueTotal = game.global.totalHeliumEarned - newTHV;
			game.global.totalHeliumEarned = newTHV;
		}
	}
	var noOfflineTooltip = false;
	if (oldVersion < 2.72){
		achievementCompatibilityUnlock();
		noOfflineTooltip = true;
	}
	if (oldVersion < 2.73){
		if (game.jobs.Geneticist.owned > 0) game.global.lastLowGen = (game.global.lowestGen > 0) ? game.global.lowestGen : game.jobs.Geneticist.owned;
	}
	if (oldVersion < 2.75){
		game.buildings.Wormhole.increase.by = 1500;
	}
	if (oldVersion < 2.81 && typeof game.global.lootAvgs !== 'undefined'){
		game.global.lootAvgs.fragments = [0];
		game.global.lootAvgs.fragmentsTotal = 0;
	}
	
	//End compatibility
	
    if (game.buildings.Gym.locked === 0) document.getElementById("blockDiv").style.visibility = "visible";
    if (game.global.gridArray.length > 0) {
        document.getElementById("battleContainer").style.visibility = "visible";
		fadeIn("equipmentTab", 10);
		fadeIn("equipmentTitleDiv", 10);
        drawGrid();
        document.getElementById('metal').style.visibility = "visible";
        for (var x = 0; x <= game.global.lastClearedCell; x++) {
            document.getElementById("cell" + x).className = document.getElementById("cell" + x).className.replace("cellNotBeaten", "cellBeaten");
        }
        if (game.global.battleClock > 0) document.getElementById("battleTimer").style.visibility = "visible";
    }
    if (game.global.mapGridArray.length > 0 && game.global.currentMapId !== "") {
        drawGrid(true);
        for (var y = 0; y <= game.global.lastClearedMapCell; y++) {
            document.getElementById("mapCell" + y).className =  document.getElementById("mapCell" + y).className.replace("cellNotBeaten", "cellBeaten");
        }
    } else if (game.global.mapGridArray.length === 0 && game.global.mapsActive) game.global.mapsActive = false;
    if (game.resources.trimps.owned > 0 || game.buildings.Trap.owned > 0) game.buildings.Trap.first();
    if (game.global.autoBattle) {
        fadeIn("pauseFight", 1);
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
	document.getElementById("worldNumber").innerHTML = game.global.world;
    mapsSwitch(true);
    checkTriggers(true);
	toggleAutoTrap(true);
    setGather(game.global.playerGathering);
    numTab(1);
	if (game.global.portalActive) {fadeIn("portalBtn", 10); fadeIn("helium", 10);}
	else if (game.resources.helium.owned > 0) fadeIn("helium", 10);
	if (game.jobs.Explorer.locked === 0) fadeIn("fragmentsPs", 10);
	if (game.buildings.Tribute.locked === 0) fadeIn("gemsPs", 10);
    if (game.global.autoCraftModifier > 0)
        document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 4) + " Foremen";
    if (game.global.fighting) startFight();
	if (!game.options.menu.pauseGame.enabled) checkOfflineProgress(noOfflineTooltip);
	if (game.options.menu.darkTheme.enabled != 1) game.options.menu.darkTheme.onToggle();
	updateLabels();
	if (game.global.viewingUpgrades) viewPortalUpgrades();
	if (game.global.respecActive) respecPerks();
	if (game.global.kongBonusMode) activateKongBonus();
	
	if (game.global.challengeActive && typeof game.challenges[game.global.challengeActive].onLoad !== 'undefined') game.challenges[game.global.challengeActive].onLoad();
	if (game.global.challengeActive != "Scientist") document.getElementById("scienceCollectBtn").style.display = "block";
	if (game.global.brokenPlanet) {
		document.getElementById("wrapper").style.background = "url(css/bg2_vert.png) center repeat-y";
		if (game.global.roboTrimpLevel > 0) displayRoboTrimp();
	}
	
	game.options.displayed = false;
	displaySettings();
	game.options.menu.barOutlines.onToggle();
	game.options.menu.progressBars.onToggle();
	game.options.menu.autoSave.onToggle();
	displayPerksBtn();
	
	fireMode(true);
	
	unlockFormation("all");
	setFormation();
	game.global.removingPerks = false;
	if (game.upgrades.Gigastation.done >= 1) loadGigastations();
	if (oldVersion < 2){
		if (game.global.world == 59){
			game.global.gridArray[99].name = "Improbability";
			message("Your Scientists have detected an anomaly at the end of this zone. Exercise caution.", "Notices");
		}
		else if (game.global.world == 60 && game.global.lastClearedCell <= 10){
			planetBreaker();
			game.global.world = 59;
			nextWorld();
		}
		else if (game.global.world >= 60){
			message("There is a new anomaly at 59, but you are too far past to reach it. You will have to use your portal to see the changes it brings. It looks like you have access to a new challenge, however!", "Notices");		
		}
		else {
			message("Your scientists have detected an anomaly at the end of Zone 59. They warn you to be careful if you intend to approach it.", "Notices");
		}
	}
	if (game.global.portalActive && game.global.challengeActive == "Discipline" && game.portal.Range.locked){
		game.global.challengeActive = "";
		game.challenges.Discipline.completed = true;
		game.portal.Range.locked = false;
		message("You have completed the <b>Discipline Challenge!</b> You have unlocked a new perk, and your Trimps have regained their Discipline.", "Notices");
	}
	document.getElementById("tab5Text").innerHTML = "+" + prettify(game.global.lastCustomAmt);
	game.global.lastUnlock = 0;
	if (game.resources.gems.owned > 0) fadeIn("gems", 10);
	if (game.global.lastSkeletimp > 0) updateSkeleBtn();
	if (game.global.turkimpTimer > 0) document.getElementById("turkimpBuff").style.display = "block";
/* 	for (var storyMsg in game.worldText){
		if (parseInt(storyMsg.split('w')[1]) > game.global.world) break;
		message(game.worldText[storyMsg], "Story");
	} */
	
	if(game.global.firing)
		document.getElementById("fireBtn").className += " fireBtnFiring";
	else
		document.getElementById("fireBtn").className += " fireBtnNotFiring";
}

function loadGigastations() {
	var modifier = Math.pow(1.75, game.upgrades.Gigastation.done);
	game.buildings.Warpstation.cost.gems[0] *= modifier;
	game.buildings.Warpstation.cost.metal[0] *= modifier;
}

var trimpStatsDisplayed = false;
function toggleStats(toggleMode){
	if (toggleMode) {
		game.global.statsMode = toggleMode;
		trimpStatsDisplayed = !trimpStatsDisplayed;
	}
	if (game.global.totalPortals == 0) document.getElementById("statsBtnRow").style.display = "none";
	document.getElementById("statsWrapper").style.display = (trimpStatsDisplayed) ? "none" : "block";
	document.getElementById("wrapper").style.display = (trimpStatsDisplayed) ? "block" : "none";
	trimpStatsDisplayed = !trimpStatsDisplayed;
	var mode = game.global.statsMode;
	if (mode == "current") {
		document.getElementById("currentSelectBtn").style.border = "5px solid yellow";
		document.getElementById("totalSelectBtn").style.border = "5px solid black";
	}
	else {
		document.getElementById("totalSelectBtn").style.border = "5px solid yellow";
		document.getElementById("currentSelectBtn").style.border = "5px solid black";
	}
	if (trimpStatsDisplayed){
		displayAllStats(true);
	}
}

function displayRoboTrimp() {
	if (game.global.roboTrimpLevel <= 0) return;
	var elem = document.getElementById("chainHolder");
	elem.style.visibility = "visible";
	if (game.global.roboTrimpCooldown > 0){
		elem.style.backgroundColor = "grey";
		document.getElementById('roboTrimpTurnsLeft').innerHTML = game.global.roboTrimpCooldown;
	}
	else {
		document.getElementById('roboTrimpTurnsLeft').innerHTML = "";
		elem.style.backgroundColor = (game.global.useShriek) ? '#5cb85c' : '#d9534f';
	}
}

function magnetoShriek() {
	if (game.global.roboTrimpCooldown > 0) return;
	game.global.useShriek = !game.global.useShriek;
	displayRoboTrimp();
	if (game.global.useShriek && !game.global.mapsActive){
        var cell = game.global.gridArray[game.global.lastClearedCell + 1];
		if (cell.name == "Improbability"){
			activateShriek();
		}
	}
}

function activateShriek() {
	game.global.usingShriek = true;
	game.global.useShriek = false;
	game.global.roboTrimpCooldown = 5;
	displayRoboTrimp();
	updateAllBattleNumbers();
}

function disableShriek() {
	game.global.usingShriek = false;
	game.global.useShriek = false;
	document.getElementById("badGuyAttack").style.color = "white";
}

function displayAllStats(buildAll) {
	if (buildAll) document.getElementById("statsRow").innerHTML = '<div class="col-xs-4" id="statCol1"></div><div class="col-xs-4" id="statCol2"></div><div class="col-xs-4" id="statCol3"></div>';
	var mode = game.global.statsMode;
	var column = 1;
	for (var item in game.stats){
		var stat = game.stats[item];
		if (typeof stat.display === 'function'){
			if (!stat.display()) continue;
		}
		if (typeof stat.value === 'undefined' && mode == 'current') continue;
		if (typeof stat.valueTotal == 'undefined' && mode == 'total') continue;
		var value = (mode == 'current') ? stat.value : stat.valueTotal;
		value = (typeof value === 'function') ? value() : value;
		if (mode == 'total' && typeof stat.valueTotal !== 'function' && typeof stat.value !== 'undefined') value += stat.value;
		value = prettify(value);
		if (buildAll){
			document.getElementById("statCol" + column).innerHTML += '<div class="statContainer" id="stat' + item + 'Container"><span class="statTitle">' + stat.title + '</span><br/><span class="statValue" id="stat' + item + 'Value">' + value + '</span></div><br/>'
			column++;
			if (column == 4) column = 1;
		}
		else {
			var elem = document.getElementById("stat" + item + "Value");
			if (elem && value) elem.innerHTML = value;
		}
	}
}

function portalClicked() {
	cancelTooltip();
	game.global.viewingUpgrades = false;
	game.global.respecActive = false;
	game.global.tempHighHelium = game.resources.helium.owned;
	document.getElementById("wrapper").style.display = "none";
	var bgColor = "";
	if (game.global.sLevel == 1) bgColor = "#00b386";
	else if (game.global.sLevel == 2) bgColor = "#3db0f8";
	else if (game.global.sLevel == 3) bgColor = "#2a6a93";
	else bgColor = "green";
	document.getElementById("portalWrapper").style.backgroundColor = bgColor;
	document.getElementById("portalWrapper").style.color = "black";
	fadeIn("portalWrapper", 10);
	var titleText = "Time Portal";
	if (game.global.sLevel == 1) titleText += " Mk. II";
	else if (game.global.sLevel == 2) titleText += " Mk. III";
	else if (game.global.sLevel == 3) titleText += " Mk. IV";
	document.getElementById("portalTitle").innerHTML = titleText;
	document.getElementById("portalStory").innerHTML = "Well, you did it. You followed your instincts through this strange world, made your way through the Dimension of Anger, and obtained this portal. But why? Maybe there will be answers through this portal... Your scientists tell you they can overclock it to bring more memories and items back, but they'll need helium to cool it.";
	document.getElementById("portalHelium").innerHTML = '<span id="portalHeliumOwned">' + prettify(game.resources.helium.owned + game.global.heliumLeftover) + '</span> Helium';
	document.getElementById("totalHeliumEarned").innerHTML = prettify(game.global.totalHeliumEarned);
	document.getElementById("totalPortals").innerHTML = game.global.totalPortals;
	document.getElementById("activatePortalBtn").style.display = "inline-block";
	document.getElementById("activatePortalBtn").innerHTML = "Activate Portal";
	document.getElementById("respecPortalBtn").style.display = "none";
	displayChallenges();
	displayPortalUpgrades();
	game.global.removingPerks = false;
}

function displayChallenges() {
	var challengeCount = 0;
	game.global.selectedChallenge = "";
	var challengesHere = document.getElementById("challengesHere");
	document.getElementById("specificChallengeDescription").innerHTML = "<br/><br/><br/>Click a challenge below to learn more about and/or run it!";
	challengesHere.innerHTML = '<div class="noselect pointer challengeThing thing" id="challenge0" onclick="selectChallenge(0)"><span class="thingName">None</span></div>';
	var firstFail = false;
	var extraClass = "";
	for (var what in game.challenges){
		var thisFail = false;
		var name = "";
		var challenge = game.challenges[what];
		if (!challenge.filter(true)) {
			if (firstFail) continue;
			firstFail = true;
			thisFail = true;
		}
		challengeCount++;
		var done = false;
		if (game.portal[game.challenges[what].unlocks]) done = (game.portal[game.challenges[what].unlocks].locked) ? false : true;
		else if (what == "Scientist" && game.global.sLevel > 0) {
			if (game.global.sLevel >= 2 && game.global.highestLevelCleared >= 89){
				name = "Scientist III";
				if (game.global.sLevel == 3) done = true;
			}
			else if (game.global.sLevel == 1 && game.global.highestLevelCleared < 44){
				done = true;
				name = "Scientist I";
				thisFail = false;
				firstFail = false;
			}
			else if (game.global.sLevel >= 1 && game.global.highestLevelCleared >= 49){
				name = (thisFail) ? "Scientist III" : "Scientist II";
				if (game.global.sLevel == 2) done = true;
			}
			else if (thisFail) name = "Scientist II";
			else done = true;			
		}
		else if (what == "Frugal") done = game.global.frugalDone;
		else if (what == "Slow") done = game.global.slowDone;
		done = (done) ? "finishedChallenge" : "";
		if (thisFail) done = "nextChallenge";
		if (!name) name = what;
		challengesHere.innerHTML += '<div class="noselect pointer challengeThing thing ' + done + '" id="challenge' + what + '" onclick="selectChallenge(\'' + what + '\')"><span class="thingName">' + name + '</span></div>';
	}
	if (challengeCount > 0) document.getElementById("challenges").style.display = "block";
	document.getElementById("flagMustRestart").style.display = "none";
}

function selectChallenge(what) {
	displayChallenges();
	document.getElementById("challenge" + what).style.border = "1px solid red";
	var addChallenge = document.getElementById("addChallenge");
	if (what === 0){
		game.global.selectedChallenge = "";
		document.getElementById("specificChallengeDescription").innerHTML = "<br/><br/><br/>Click a challenge below to learn more about and/or run it!";
		document.getElementById("flagMustRestart").style.display = "none";
		if (addChallenge !== null) addChallenge.innerHTML = "";
		return;
	}

	if (!game.challenges[what].filter()){
		var unlockString = (typeof game.challenges[what].unlockString === 'function') ? game.challenges[what].unlockString() : game.challenges[what].unlockString;
		document.getElementById("specificChallengeDescription").innerHTML = "You will unlock this challenge once you " + unlockString;
		game.global.selectedChallenge = "";
		document.getElementById("flagMustRestart").style.display = "none";
		if (addChallenge !== null) addChallenge.innerHTML = "";
		return;
	}
	

	var desc = game.challenges[what].description;
	desc += "<b>";
	if (game.portal[game.challenges[what].unlocks]) desc += (game.portal[game.challenges[what].unlocks].locked) ? " You will also earn a new Perk!" : " You will not earn a new perk.";
	else if (what == "Scientist") {
		var sciLev = getScientistLevel();
		if (sciLev == game.global.sLevel) desc += " You have already completed this challenge!";
		desc = desc.replace("_", getScientistInfo(sciLev));
		desc = desc.replace("*", getScientistInfo(sciLev, true));
	}
	desc += "</b>";
	document.getElementById("specificChallengeDescription").innerHTML = desc;
	game.global.selectedChallenge = what;
	document.getElementById("flagMustRestart").style.display = (what == "Scientist") ? "inline" : "none";
	
	if (addChallenge !== null) addChallenge.innerHTML = "You have the <b>" + what + " Challenge</b> active.";
}

function getScientistLevel() {
	if (game.global.sLevel == 0) return 1;
	if (game.global.highestLevelCleared >= 49 && game.global.sLevel == 1) return 2;
	if (game.global.highestLevelCleared >= 89) return 3;
	return 1;
}

function getScientistInfo(number, reward){
	switch (number){
		case 1: {
			return (reward) ? "5000 Science, 100 Food, 100 Wood, 10 Traps, and 1 Foreman" : 11500;
		}
		case 2: {
			return (reward) ? "5 Barns, 5 Sheds, 5 Forges, and T2 Equipment unlocked" : 8000;
		}
		case 3: {
			return (reward) ? "full Trimps and double Efficiency" : 1500;
		}
	}
}

function confirmAbandonChallenge(){
	var text = "Are you sure you want to abandon this challenge?";
	if (game.global.challengeActive == 'Scientist') text += " <b>Abandoning this challenge will cause the portal to become unstable and start you from the beginning of this run. (You'll keep your permanent rewards like helium and perks)</b>"; 
	tooltip('confirm', null, 'update', text, 'abandonChallenge()', 'Abandon Challenge');
	if (game.global.challengeActive == "Scientist") document.getElementById("confirmTipCost").innerHTML += '<div class="btn btn-success" onclick="abandonChallenge(true); cancelTooltip()">Restart Challenge</div>';
}

function abandonChallenge(restart){
	var challengeName = game.global.challengeActive;
	var challenge = game.challenges[challengeName];
	game.global.challengeActive = "";
	if (challenge.fireAbandon && typeof challenge.abandon !== 'undefined') challenge.abandon();
	cancelPortal();
	if (challengeName == "Scientist"){
		document.getElementById("scienceCollectBtn").style.display = "block";
		if (restart) game.global.selectedChallenge = "Scientist";
		resetGame(true);
	}
	message("Your challenge has been abandoned.", "Notices");
}

function viewPortalUpgrades() {
	if (game.global.totalPortals == 0) return;
	cancelTooltip();
	game.global.viewingUpgrades = true;
	game.resources.helium.respecMax = game.global.heliumLeftover;
	document.getElementById("viewChallenge").style.display = "block";
	var challengeText = "";
	if (game.global.challengeActive){
		var description = game.challenges[game.global.challengeActive].description;
		if (game.global.challengeActive == "Scientist"){
			var sciLevel = getScientistLevel();
			description = description.replace('_', getScientistInfo(sciLevel));
			description = description.replace('*', getScientistInfo(sciLevel, true));
		}
		challengeText = "You have the " + game.global.challengeActive + " challenge active. \"" + description + "\"";
	}
	else
		challengeText = "You don't have an active challenge.";
	document.getElementById("viewChallengeText").innerHTML = challengeText;
	document.getElementById("wrapper").style.display = "none";
	document.getElementById("portalWrapper").style.backgroundColor = "black";
	document.getElementById("portalWrapper").style.color = "white";
	fadeIn("portalWrapper", 10);
	document.getElementById("portalTitle").innerHTML = "View Perks";
	document.getElementById("portalHelium").innerHTML = '<span id="portalHeliumOwned">' + prettify(parseInt(game.global.heliumLeftover, 10)) + '</span> Helium Left Over';
	document.getElementById("portalStory").innerHTML = "These are all of your perks! You can reset them once per run.";
	document.getElementById("totalHeliumEarned").innerHTML = prettify(parseInt(game.global.totalHeliumEarned, 10));
	document.getElementById("totalPortals").innerHTML = game.global.totalPortals;
	document.getElementById("cancelPortalBtn").innerHTML = "Cancel";
	document.getElementById("activatePortalBtn").style.display = "none";
	if (game.global.canRespecPerks) {
		document.getElementById("respecPortalBtn").innerHTML = "Respec";
		document.getElementById("respecPortalBtn").style.display = "inline-block";
	}
	displayPortalUpgrades();
	if (game.global.challengeActive) document.getElementById("cancelChallengeBtn").style.display = "inline-block";
}

function displayPortalUpgrades(){
	numTab(1, true);
	toggleRemovePerks(true);
	var elem = document.getElementById("portalUpgradesHere");
	elem.innerHTML = "";
	game.resources.helium.totalSpentTemp = 0;
	for (var what in game.portal){
		if (game.portal[what].locked) continue;
		var portUpgrade = game.portal[what];
		if (typeof portUpgrade.level === 'undefined') continue;
		portUpgrade.levelTemp = 0;
		portUpgrade.heliumSpentTemp = 0;
		elem.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'portal\',event)" onmouseout="tooltip(\'hide\')" class="noselect pointer portalThing thing" id="' + what + '" onclick="buyPortalUpgrade(\'' + what + '\')"><span class="thingName">' + what + '</span><br/><span class="thingOwned">Level: <span id="' + what + 'Owned">' + portUpgrade.level + '</span></span></div>';
		updatePerkColor(what);
	}
}

function updatePerkColor(what){
	var elem = document.getElementById(what);
	if (!elem) return;
	var perk = game.portal[what];
	var price = getPortalUpgradePrice(what);
	var canSpend = (game.global.viewingUpgrades) ? game.resources.helium.respecMax :  (game.resources.helium.owned + game.global.heliumLeftover);
	elem.style.backgroundColor = ((canSpend >= game.resources.helium.totalSpentTemp + price) && (!perk.max || (perk.max >= perk.level + perk.levelTemp + game.global.buyAmt))) ? "black" : "grey";
}

function updateAllPerkColors(){
	for (var item in game.portal){
			if (game.portal[item].locked) continue;
			updatePerkColor(item);
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
		addText = "You still have " + helium + " bonus points to spend!";
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

//48 hours = 172800
function checkOfflineProgress(noTip){
	if (!game.global.lastOnline) return;
	var rightNow = new Date().getTime();
	var textArray = [];
	if (game.global.lastOfflineProgress > rightNow){
		game.global.cheater = true;
		if (typeof Kongregate !== 'undefined') message("It looks like you cheated by setting your clock forward and back again. While I won't penalize anyone for cheating in a single player game, your game will no longer submit high scores, and your Trimps don't respect you as much.", "Notices");
		game.global.lastOfflineProgress = rightNow;
		console.log("cheater");
		return;
	} 
	game.global.lastOfflineProgress = rightNow;
	var dif = rightNow - game.global.lastOnline;
	dif = Math.floor(dif / 1000);
	if (dif < 60) return;
	var textString = "";
	var compatible = ["Farmer", "Lumberjack", "Miner", "Dragimp", "Explorer"];
	for (var x = 0; x < compatible.length; x++){
		var job = game.jobs[compatible[x]];
		var resName = job.increase;
		var resource = game.resources[resName];
		var amt = job.owned * job.modifier;
		amt += (amt * game.portal.Motivation.level * game.portal.Motivation.modifier);
		if (game.portal.Meditation.level > 0) {
			var toAlter;
			var originalAmt = amt;
			//Find how many stacks of 10 minutes were already stacked before logging out
			var timeAtLastOnline = Math.floor((game.global.lastOnline - game.global.zoneStarted) / 600000);
			//Figure out what percentage of the total time offline one 10 minute chunk is. This will be used to modify amt to the proper amount in 10 minute chunks in order to mimic stacks
			var chunkPercent = 60000 / dif;
			//Start at 100% untouched
			var remaining = 100;
			//if a 10 minute chunk is larger than the time offline, no need to scale in chunks, skip to the end.
			if (timeAtLastOnline < 6 && chunkPercent < 100){
				//Start from however many stacks were held before logging out. End at 5 stacks, the 6th will be all time remaining rather than chunks and handled at the end
				for (var z = timeAtLastOnline; z < 6; z++){			
					//If no full chunks left, let the final calculation handle it
					if (remaining < chunkPercent) break;
					//Remove a chunk from remaining, as it is about to be calculated
					remaining -= chunkPercent;
					//Check for z == 0 after removing chunkPercent, that way however much time was left before the first stack doesn't get calculated as having a stack
					if (z == 0) continue;
					//Find out exactly how much of amt needs to be modified to make up for this chunk
					toAlter = (originalAmt * chunkPercent / 100);
					//Remove it from toAlter
					amt -= toAlter;
					//Modify and add back
					amt += (toAlter * (1 + (z * 0.01 * game.portal.Meditation.level)).toFixed(2));
				}
			}
			if (remaining){
				//Check again how much needs to be altered
				toAlter = (originalAmt * (remaining / 100));
				//Remove
				amt -= toAlter;
				//Modify and add back the final amount
				amt += (toAlter) * (1 + (game.portal.Meditation.getBonusPercent() * 0.01)).toFixed(2);
			}
		}
		if (game.global.challengeActive == "Meditate") amt *= 1.25;
		amt *= dif;
		if (x < 3){
			var newMax = resource.max + (resource.max * game.portal.Packrat.modifier * game.portal.Packrat.level);
			var allowed = (newMax - resource.owned);
			if (amt > allowed) amt = allowed;
		}
		if (amt > 0){
			resource.owned += amt;
			textString = prettify(amt) + " " + resName + ", ";
			textArray.push(textString);
			if (resName == "gems") game.stats.gemsCollected.value += amt;
		}
	}
	if (textArray.length === 0) return;
	textString = "While you were away, your Trimps were able to produce ";
	for (var y = 0; y < textArray.length; y++){
		textString += textArray[y];
		if (y == textArray.length -2) textString += "and ";
	}
	textString = textString.slice(0, -2);
	textString += ".";
	if (!noTip) tooltip("Trustworthy Trimps", null, "update", textString);
}

function respecPerks(){
	if (!game.global.canRespecPerks) return;
	if (!game.global.viewingUpgrades) return;
	game.global.respecActive = true;
	displayPortalUpgrades();
	game.resources.helium.respecMax = game.global.heliumLeftover;
	document.getElementById("portalHeliumOwned").innerHTML = prettify(game.resources.helium.respecMax);
	document.getElementById("respecPortalBtn").style.display = "none";
	document.getElementById("portalStory").innerHTML = "You can only respec once per run. Clicking cancel will not consume this use.";
	document.getElementById("portalTitle").innerHTML = "Respec Perks";
	document.getElementById("ptabRemove").style.display = "table-cell";
	document.getElementById("clearPerksBtn").style.display = "inline-block";
}

function clearPerks(){
	if (!game.global.respecActive) return;
	game.resources.helium.respecMax = game.global.heliumLeftover;
	game.resources.helium.totalSpentTemp = 0;
	for (var item in game.portal){
		if (game.portal[item].locked) continue;
		var portUpgrade = game.portal[item];
		if (typeof portUpgrade.level === 'undefined') continue;
		portUpgrade.levelTemp = 0;
		portUpgrade.levelTemp -= portUpgrade.level;
		game.resources.helium.respecMax += portUpgrade.heliumSpent;
		portUpgrade.heliumSpentTemp = 0;
		portUpgrade.heliumSpentTemp -= portUpgrade.heliumSpent;
		updatePerkLevel(item);
		updatePerkColor(item);
	}
	document.getElementById("portalHeliumOwned").innerHTML = prettify(game.resources.helium.respecMax);
}

function activateClicked(){	
	if (game.global.viewingUpgrades){
		var refund = game.resources.helium.respecMax - game.resources.helium.totalSpentTemp;
		if (!commitPortalUpgrades()) return;
		game.global.heliumLeftover = refund;
		if (game.global.respecActive) game.global.canRespecPerks = false;
		cancelPortal();
		game.resources.helium.respecMax = 0;
		return;
	}
	var newText = "";
	if (game.global.kongBonusMode){
		newText = "All set?";
	}
	else newText = "Are you sure you want to enter the portal? You will lose all progress other than the portal-compatible upgrades on this page. Who knows where or when it will send you.";
	if (game.global.selectedChallenge) newText += " <span id='addChallenge'>You have the <b>" + game.global.selectedChallenge + " Challenge</b> active.</span>";
	else newText += " <span id='addChallenge'></span>";
	newText += "<br/><div class='btn btn-info activatePortalBtn' onclick='activatePortal()'>Let's do it.</div>";
	document.getElementById("portalStory").innerHTML = newText;
}

function buyPortalUpgrade(what){
	if (!game.global.kongBonusMode && !game.global.portalActive && !game.global.respecActive && !game.global.viewingUpgrades) return;
	var toBuy = game.portal[what];
		if (game.global.removingPerks){
			removePerk(what);
			updateAllPerkColors();
			return;
	}
	if (toBuy.max < toBuy.level + toBuy.levelTemp + game.global.buyAmt) return;
	var price = getPortalUpgradePrice(what);
	var canSpend = (game.global.viewingUpgrades) ? game.resources.helium.respecMax :  (game.resources.helium.owned + game.global.heliumLeftover);
	if (canSpend >= (game.resources.helium.totalSpentTemp + price)){
		document.getElementById("ptabRemove").style.display = "table-cell";
		toBuy.levelTemp += game.global.buyAmt;
		game.resources.helium.totalSpentTemp += price;
		toBuy.heliumSpentTemp += price;
		updatePerkLevel(what);
		tooltip(what, "portal", "update");
		document.getElementById("portalHeliumOwned").innerHTML = prettify(canSpend - game.resources.helium.totalSpentTemp);
		if (game.global.viewingUpgrades) {
			document.getElementById("respecPortalBtn").style.display = "none";
			document.getElementById("activatePortalBtn").innerHTML = "Confirm";
			document.getElementById("activatePortalBtn").style.display = "inline-block";
		}
		updateAllPerkColors();
	}
}

function removePerk(what) {
	var toBuy = game.portal[what];
	var realTemp = (game.global.respecActive) ? toBuy.levelTemp + toBuy.level : toBuy.levelTemp;
	if (realTemp < game.global.buyAmt) return;
	var refund = getPortalUpgradePrice(what, true);
	toBuy.levelTemp -= game.global.buyAmt;
	toBuy.heliumSpentTemp -= refund;
	game.resources.helium.totalSpentTemp -= refund;
	updatePerkLevel(what);
	tooltip(what, "portal", "update");
	var canSpend = (game.global.viewingUpgrades) ? game.resources.helium.respecMax :  (game.resources.helium.owned + game.global.heliumLeftover);
	document.getElementById("portalHeliumOwned").innerHTML = prettify(canSpend - game.resources.helium.totalSpentTemp);
}

function updatePerkLevel(what){
	var textElem = document.getElementById(what + "Owned");
	var toBuy = game.portal[what];
	var num = 0;
	var text = toBuy.level + toBuy.levelTemp;
	if (toBuy.levelTemp){
		text += " ("
		if (toBuy.levelTemp > 0) text += "+";
		text += toBuy.levelTemp + ")";
	}
	textElem.innerHTML = text;
}

function toggleRemovePerks(noUpdate){
	var perkElem = document.getElementById("ptabRemove");
	var perkTextElem = document.getElementById("ptabRemoveText");
	if (!noUpdate) game.global.removingPerks = !game.global.removingPerks;
	if (!game.global.removingPerks){
		perkElem.style.background = "rgba(255, 255, 255, 0.25)";
		perkTextElem.style.color = "red";
	}
	else {
		perkElem.style.background = "rgba(214, 29, 29, 0.75)";
		perkTextElem.style.color = "white";
	}
	
}

function unlockMapStuff(){
	fadeIn("fragments", 10);
	fadeIn("gems", 10);
	fadeIn("mapsBtn", 10);
}

function getPortalUpgradePrice(what, removing){
	var toCheck = game.portal[what];
	var tempLevel;
	var nextLevel;
	if (!removing){	
		tempLevel = toCheck.level + toCheck.levelTemp;
		nextLevel = tempLevel + game.global.buyAmt;
	}
	else if (removing) {
		tempLevel = toCheck.level + toCheck.levelTemp - game.global.buyAmt;
		nextLevel = toCheck.level + toCheck.levelTemp;
	}
	var amt = 0;
	for (var x = 0; x < game.global.buyAmt; x++){
		amt += Math.ceil(((tempLevel + x) / 2) + toCheck.priceBase * Math.pow(1.3, tempLevel + x));
	}
	return amt;
}

function commitPortalUpgrades(){
	if (!canCommitCarpentry()) return false;
	checkHandleResourcefulRespec();
	for (var item in game.portal){
		if (game.portal[item].locked) continue;
		var portUpgrade = game.portal[item];
		if (typeof portUpgrade.level === 'undefined') continue;
		portUpgrade.level += portUpgrade.levelTemp;
		if (portUpgrade.levelTemp !== 0 && portUpgrade.onChange) portUpgrade.onChange();
		portUpgrade.levelTemp = 0;
		portUpgrade.heliumSpent += portUpgrade.heliumSpentTemp;
		portUpgrade.heliumSpentTemp = 0;
		
	} 
	if (game.global.respecActive || game.global.viewingUpgrades){
		game.global.heliumLeftover = game.resources.helium.maxRespec - game.resources.helium.totalSpentTemp;
		game.resources.helium.totalSpentTemp = 0;
		return true;
	}
	game.resources.helium.owned -= (game.resources.helium.totalSpentTemp);
	game.resources.helium.totalSpentTemp = 0;
	return true;
}

function canCommitCarpentry(){
	var newMax = game.resources.trimps.max * game.resources.trimps.maxMod;
	newMax = Math.floor(newMax * (Math.pow(1 + game.portal.Carpentry.modifier, game.portal.Carpentry.level + game.portal.Carpentry.levelTemp)));
	var error = document.getElementById("portalError");
	error.innerHTML = "";
	var good = true;
	var soldiers = (game.portal.Coordinated.level || game.portal.Coordinated.levelTemp) ? game.portal.Coordinated.onChange(true) : game.resources.trimps.maxSoldiers;
    if (newMax < (soldiers * 2.4)) {
        error.innerHTML += "You do not have enough max Trimps with this Perk setup to sustain your Coordination. ";
		error.style.display = "block";
		good = false;
    }
	if (Math.ceil(newMax / 2) < game.resources.trimps.employed){
		error.innerHTML += "You have too many workers assigned for this Perk setup.";
		error.style.display = "block";
		good = false;
	}
	return good;
}

function checkHandleResourcefulRespec(){
	if (game.portal.Resourceful.level > game.portal.Resourceful.levelTemp) clearQueue();
}

function clearQueue(specific) {
	var existing = 0;
	for (var x = 0; x < game.global.nextQueueId; x++){
		if (!document.getElementById("queueItem" + x)) continue;
		existing++;
		if (specific && game.global.buildingsQueue[existing - 1].split('.')[0] != specific) continue;
		else existing--;
		removeQueueItem("queueItem" + x);
	}
}

function activatePortal(){
	if (!commitPortalUpgrades()) return;	
	cancelPortal(true);
	game.global.totalPortals++;
	resetGame(true);
	displayPerksBtn();
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
	document.getElementById("clearPerksBtn").style.display = "none";
	document.getElementById("respecPortalBtn").style.display = "none";
	document.getElementById("portalUpgradesHere").innerHTML = "";
	document.getElementById("portalWrapper").style.display = "none";
	fadeIn("wrapper", 10);
	document.getElementById("challenges").style.display = "none";
	document.getElementById("viewChallenge").style.display = "none";
	document.getElementById("cancelChallengeBtn").style.display = "none";
	document.getElementById("portalError").style.display = "none";
	numTab(game.global.numTab);
	document.getElementById("ptabRemove").style.display = "none";
	game.global.removingPerks = false;
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
/*			console.log("Equipment: " + item + ". Updated from:");
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

function rewardResource(what, baseAmt, level, checkMapLootScale){
    var map;
	var world;
	var cell = level;
    if (checkMapLootScale) {
        map = getCurrentMapObject();
        level = scaleLootLevel(level, map.level);
		world = map.level;
    } else {
        level = scaleLootLevel(level);
		world = game.global.world;
    }
	var amt = 0;
	if (what == "food" || what == "metal" || what == "wood"){
		//Base * speed books
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
		if (game.global.turkimpTimer > 0 && (game.global.playerGathering == "food" || game.global.playerGathering == "metal" || game.global.playerGathering == "wood")) tempModifier *= 1.166;
		//Half of max can work, a little less than third on average are applied to one of these 3 jobs. 0.16 is pretty average.
		var avgSec = tempModifier * (game.resources.trimps.realMax() * 0.16);
		//Base is 7 seconds at 1 baseAmt
		if (game.global.world < 100)
			amt = avgSec * 7 * baseAmt;
		else 
			amt = avgSec * 10 * baseAmt;
	}
	else if (what == "fragments"){
		amt = Math.floor(Math.pow(1.15, game.global.world));
		if (baseAmt > 1) {
			amt *= baseAmt;
		}
	}
	else{
		if (what == "helium") level = Math.round((level - 1900) / 100);
		else if (what == "gems"){
			level = level - 400;
			//Adding 3 seconds worth of dragimp production on top of normal gem resource gains
			amt = game.jobs.Dragimp.modifier * 3 * baseAmt;
		}
		level *= 1.35;
		if (level < 0) level = 0;
		amt += Math.round(baseAmt * Math.pow(1.23, Math.sqrt(level)));
		amt += Math.round(baseAmt * level);
	}
	//Scale 20% across the zone, depending on cell number
	if (what != "helium" && what != "fragments"){
		amt = (amt * .8) + ((amt * .002) * (cell + 1));
	}
	if (checkMapLootScale){
		if (world < game.global.world){
			//-20% loot compounding for each level below world
			amt *= Math.pow(0.8, (game.global.world - world));
		}
		//Add map loot bonus
		amt = Math.round(amt * map.loot);
		
	}
	//Add Looting
	if (game.portal.Looting.level) amt += (amt * game.portal.Looting.level * game.portal.Looting.modifier);
	if (game.unlocks.impCount.Magnimp && what != "helium") amt *= Math.pow(1.003, game.unlocks.impCount.Magnimp);
	if (game.global.challengeActive == "Toxicity"){
		var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
		amt *= (1 + toxMult);
	}
	amt = Math.floor(amt);
    addResCheckMax(what, amt);
	if (game.options.menu.useAverages.enabled){
		addAvg(what, amt);
	}
    return amt;
};

function addResCheckMax(what, number, noStat, fromGather, nonFilteredLoot) {
    var res = game.resources[what];
	if (res.max == -1) {
		res.owned += number;
		if (!noStat && what == "gems") game.stats.gemsCollected.value += number;
		return;
	}
	var newMax = res.max + (res.max * game.portal.Packrat.modifier * game.portal.Packrat.level);
    if (res.owned + number <= newMax) res.owned += number;
    else res.owned = newMax;
	if (nonFilteredLoot && game.options.menu.useAverages.enabled){
		addAvg(what, number);
	}
}

function addAvg(what, number) {
	var avgA = game.global.lootAvgs[what];
	if (typeof avgA === 'undefined' || typeof game.global.lootAvgs[what + "Total"] === 'undefined') return;
	avgA[avgA.length - 1] += number;
	game.global.lootAvgs[what + "Total"] += number;
}

function getAvgLootSecond(what) {
	var avgA = game.global.lootAvgs[what];
	if (typeof avgA === 'undefined' || typeof game.global.lootAvgs[what + "Total"] === 'undefined') return 0;
	return (game.global.lootAvgs[what + "Total"] / avgA.length / 3);
}

function curateAvgs() {
	for (var what in game.global.lootAvgs) {
		if (!Array.isArray(game.global.lootAvgs[what])) continue;
		var avgA = game.global.lootAvgs[what];
		while (avgA.length >= 60) {
			game.global.lootAvgs[what + "Total"] -= avgA[0];
			if (game.global.lootAvgs[what + "Total"] <= 0) game.global.lootAvgs[what + "Total"] = 0;
			avgA.splice(0, 1);
		}
		avgA.push(0);
	}
}

function fireMode(noChange) {
    if (!noChange) game.global.firing = !game.global.firing;
    var elem = document.getElementById("fireBtn");
    if (game.global.firing) {
        elem.className = elem.className.replace("fireBtnNotFiring", "fireBtnFiring");
        elem.innerHTML = "Firing";
    } else {
        elem.className = elem.className.replace("fireBtnFiring", "fireBtnNotFiring");
        elem.innerHTML = "Fire";
    }
    if (!noChange) tooltip("Fire Trimps", null, "update");
}

function setGather(what, updateOnly) {
	if (game.options.menu.pauseGame.enabled && !updateOnly) return;
    var toGather = game.resources[what];
    var colorOn = "rgba(255,255,255,0.25)";
    var colorOff = "rgba(0,0,0,1)";
	var btnText = "";
	var collectBtn;
	if (game.global.turkimpTimer > 0 && (what == "food" || what == "wood" || what == "metal")){
		colorOn = "rgba(102, 51, 0, 0.7)";
		btnText = "<span class='icomoon icon-spoon-knife'></span>";
	}
    if (typeof toGather === 'undefined' && what != "buildings") return;
	var toUpdate = (updateOnly) ? what : game.global.playerGathering;
    if (toUpdate !== "") {
		collectBtn = document.getElementById(toUpdate + "CollectBtn");
        collectBtn.innerHTML = setGatherTextAs(toUpdate, false);
        collectBtn.style.background = colorOff;
    }
    if (updateOnly) return;
	game.global.playerGathering = what;
	updateBuildSpeed();
	collectBtn = document.getElementById(what + "CollectBtn");
    collectBtn.innerHTML = btnText + setGatherTextAs(what, true);
    collectBtn.style.background = colorOn;
}

function updateBuildSpeed(){
	var modifier = (game.global.autoCraftModifier > 0) ? game.global.autoCraftModifier : 0;
    if (game.global.playerGathering == "buildings") modifier += game.global.playerModifier;
	document.getElementById("buildSpeed").innerHTML = (modifier > 0) ? prettify(Math.floor(modifier * 100)) + "%" : "";
}

function setGatherTextAs(what, on) {
    var trimpTrapText = '(<span id="trimpTrapText">' + prettify(game.buildings.Trap.owned) + '</span>)';
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
	if (game.global.turkimpTimer > 0){
		updateTurkimpTime();
	}
    for (var job in game.jobs) {
		var perSec = 0;
		var increase = game.jobs[job].increase;
		if (increase == "custom") continue;
        if (game.jobs[job].owned > 0){
			perSec = (game.jobs[job].owned * game.jobs[job].modifier);
			if (game.portal.Motivation.level > 0) perSec += (perSec * game.portal.Motivation.level * game.portal.Motivation.modifier);
			if (game.portal.Meditation.level > 0) perSec *= (1 + (game.portal.Meditation.getBonusPercent() * 0.01)).toFixed(2);
			if (game.global.challengeActive == "Meditate") perSec *= 1.15;
			if (game.global.challengeActive == "Toxicity"){
				var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
				perSec *= (1 + toxMult);
			}
		}
		if (what && increase == what){
			if (game.global.turkimpTimer > 0 && (what == "food" || what == "wood" || what == "metal")){
				perSec *= 1.5;
			}
			perSec += game.global.playerModifier;
		}
        amount = perSec / game.settings.speed;
		if (game.options.menu.useAverages.enabled) perSec += getAvgLootSecond(increase);
		if (game.resources[increase].max > 0){
			var timeToFillElem = document.getElementById(increase + "TimeToFill");
			if (timeToFillElem) timeToFillElem.innerHTML = calculateTimeToMax(game.resources[increase], perSec, null, true);
		}
		addResCheckMax(increase, amount, null, true);
    }
    if (what === "" || what == "buildings") return;
    if (what == "trimps") {
        trapThings();
        return;
    }
}

function calculateTimeToMax(resource, perSec, toNumber, fromGather) {
	if (perSec <= 0) return "";
	var remaining = (toNumber > 0) ? toNumber : ((resource.max * (1 + game.portal.Packrat.modifier * game.portal.Packrat.level))) - resource.owned;
	if (remaining <= 0) return "";
	var toFill = Math.floor(remaining / perSec);
	var years = Math.floor(toFill / 31536000);
	var days = Math.floor(toFill / 86400) % 365;
	var hours = Math.floor( toFill / 3600) % 24;
	var minutes = Math.floor(toFill / 60) % 60;
	var seconds = (toFill % 60) + 1;
	if (seconds == 60){
		minutes++;
		seconds = 0;
		toFill++;
	}
	if (minutes == 60 && hours == 0){
		hours = 1;
		minutes = 0;
		toFill++;
	} 
	if (!isFinite(years)) return "Long Time";
	if (toFill < 60) {
		if (toFill < 1 && fromGather) return "";
		return Math.floor(seconds) + " Secs";
	}
	if (toFill < 3600) return minutes + " Mins " + seconds + " Secs";
	if (toFill < 86400) return hours + " Hours " + minutes + " Mins";
	if (toFill < 31536000) return days + " Days " + hours + " Hours";
	return prettify(years) + " Years " + days + " Days";
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
			if (typeof trigger.message == 'function') message(trigger.message(), "Story");
            else if (typeof trigger.message !== 'undefined') message(trigger.message, "Story");
        }
    }
}

function canAffordTwoLevel(whatObj, takeEm) {
	if (whatObj.specialFilter && !whatObj.specialFilter()) return false;
	if (whatObj.prestiges && game.equipment[whatObj.prestiges].locked) return false;
    for (var costGroup in whatObj.cost) {
        if (costGroup == "special") {
            var toReturn = whatObj.cost.special();
            return toReturn;
        }
        var group = game[costGroup];
        var whatObjCost = whatObj.cost[costGroup];
        for (var res in whatObjCost) {
			if (typeof group === 'undefined') return false;
            var realItem = group[res];
            var cost = whatObjCost[res];
            if (typeof cost === 'function') cost = cost();
            if (typeof cost[1] !== 'undefined') cost = resolvePow(cost, whatObj);
			if (whatObj.prestiges && (res == "metal" || res == "wood")) cost *= Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level);
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
	var toBuy;
	if (!isEquipment) toBuy = game.buildings[what];
	else toBuy = game.equipment[what];
	if (typeof toBuy === 'undefined') return false;
	for (var costItem in toBuy.cost) {
		var color = "green";
		var price = 0;
		price = parseFloat(getBuildingItemPrice(toBuy, costItem, isEquipment));
		if (isEquipment) price = Math.ceil(price * (Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level)));
		else if (game.portal.Resourceful.level) price = Math.ceil(price * (Math.pow(1 - game.portal.Resourceful.modifier, game.portal.Resourceful.level)));
		if (price > game.resources[costItem].owned || !(isFinite(price))) {
			if (buildCostString) color = "red";
			else return false;
		}
		if (buildCostString) {
			var percent;
			if (color == "red"){
				var thisPs = getPsString(costItem, true);
				if (thisPs > 0)
				{
					percent = calculateTimeToMax(null, thisPs, (price - game.resources[costItem].owned));		
					percent = "(" + percent + ")";
				}
				else percent = "(<span class='icomoon icon-infinity'></span>)";
			}
			else{
				percent = (game.resources[costItem].owned > 0) ? prettify(((price / game.resources[costItem].owned) * 100).toFixed(1)) : 0;
				percent = "(" + percent + "%)";
			}
			costString += '<span class="' + color + '">' + costItem + ':&nbsp;' + prettify(price) + '&nbsp;' + percent + '</span>, ';
		}
		if (take) game.resources[costItem].owned -= price;
		if (what == "Wormhole" && take && costItem == "helium") {
			game.global.totalHeliumEarned -= price;
			game.stats.spentOnWorms.value += price;
		}
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
			price =  Math.floor((thisCost[0] * Math.pow(thisCost[1], toBuy[compare])) * ((Math.pow(thisCost[1], game.global.buyAmt) - 1) / (thisCost[1] - 1)));
		}
		else if (typeof thisCost === 'function') {
			price = thisCost();
		}
		else {
			price = thisCost * game.global.buyAmt;
		}
	return price;
}

function buyBuilding(what, confirmed) {
	if (game.options.menu.pauseGame.enabled) return;
	if (game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) return;
	var toBuy = game.buildings[what];
    if (typeof toBuy === 'undefined') return;
    var canAfford = canAffordBuilding(what);
	if (what == "Wormhole" && !confirmed && game.options.menu.confirmhole.enabled){
		tooltip('Confirm Purchase', null, 'update', 'You are about to purchase ' + game.global.buyAmt + ' Wormholes, <b>which cost helium</b>. Make sure you can earn back what you spend!', 'buyBuilding(\'Wormhole\', true)');
		return;
	}
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
	struct.purchased -= parseInt(name[1], 10);
    for (var costItem in struct.cost) {
		var thisCostItem = struct.cost[costItem];
		var refund = 0;
		if (typeof thisCostItem[1] !== 'undefined')
			refund =  Math.floor((thisCostItem[0] * Math.pow(thisCostItem[1], struct.purchased)) * ((Math.pow(thisCostItem[1], name[1]) - 1) / (thisCostItem[1] - 1)));
		else if (typeof struct.cost[costItem] === 'function') refund += struct.cost[costItem]();
		else 
			refund = thisCostItem * name[1];
		if (game.portal.Resourceful.level) refund = Math.ceil(refund * (Math.pow(1 - game.portal.Resourceful.modifier, game.portal.Resourceful.level)));
		addResCheckMax(costItem, parseFloat(refund), true);
		if (what.split('.')[0] == "Wormhole" && costItem == "helium") {
			game.global.totalHeliumEarned += parseFloat(refund);
			game.stats.spentOnWorms.value -= parseFloat(refund);
		}
    }
}

function startQueue(what, count) {
    game.global.buildingsQueue.push(what + "." + (count));
    addQueueItem(what + "." + count);
}

function craftBuildings(makeUp) {
    var buildingsBar = document.getElementById("queueItemsHere").firstChild;
	if (buildingsBar == null) return;
	var timeRemaining = document.getElementById("queueTimeRemaining");
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
		var percent = 1 - (game.global.timeLeftOnCraft / game.buildings[game.global.crafting].craftTime);
        
		var timeLeft = (game.global.timeLeftOnCraft / modifier).toFixed(1);
		if (timeLeft < 0.1) timeLeft = 0.1;
        if (timeRemaining) timeRemaining.innerHTML = " - " + timeLeft + " Seconds";
		if (game.options.menu.queueAnimation.enabled) buildingsBar.style.background = "rgba(30, 144, 255, " + percent + ")";
		else buildingsBar.style.backgroundColor = "initial";
        if (game.global.timeLeftOnCraft > 0) return;
    }
    buildBuilding(game.global.crafting);
    removeQueueItem("first");
	if (game.global.buildingsQueue.length === 0){
		if (game.global.trapBuildToggled && game.global.trapBuildAllowed) {
			autoTrap();
			return;
		}
		checkEndOfQueue();
	}
	else{
		setNewCraftItem();
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
	checkAchieve("housing", what);
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
	if (typeof building.fire !== 'undefined') building.fire();
    numTab();
}

function setNewCraftItem() {
    var queueItem = game.global.buildingsQueue[0].split('.')[0];
    game.global.crafting = queueItem;
    game.global.timeLeftOnCraft = game.buildings[queueItem].craftTime;
	var elem = document.getElementById("queueItemsHere").firstChild;
	var timeLeft = (game.global.timeLeftOnCraft / (game.global.autoCraftModifier + game.global.playerModifier)).toFixed(1);
	if (timeLeft <= 0.1) {timeLeft = 0.1; if (game.options.menu.queueAnimation.enabled) elem.style.background = "rgb(30, 144, 255)";}
	if (elem && !document.getElementById("queueTimeRemaining")) elem.innerHTML += "<span id='queueTimeRemaining'> - " + timeLeft + " Seconds</span>";
}

function calculatePercentageBuildingCost(what, resourceToCheck, costModifier, replaceMax){
	var struct = game.buildings[what];
	var res = game.resources[resourceToCheck];
	var dif = struct.purchased - struct.owned;
	var max = (replaceMax) ? replaceMax : res.max;
	return Math.floor(costModifier * max * Math.pow(struct.increase.by, dif));
}

function trapThings() {
    var trap = game.buildings.Trap;
    var trimps = game.resources.trimps;
	var trimpsMax = trimps.realMax();
	var TrapOwned = document.getElementById("TrapOwned");
    if (game.global.timeLeftOnTrap == -1) {
        if (trimps.owned < trimpsMax && trap.owned >= 1)
            game.global.timeLeftOnTrap = trimps.speed;
        else {
            document.getElementById("trappingBar").style.width = "0%";
            if (TrapOwned) TrapOwned.innerHTML = trap.owned;
            return;
        }
    }
    game.global.timeLeftOnTrap -= ((1 / game.settings.speed) * game.global.playerModifier);
    if (game.global.timeLeftOnTrap <= 0 && trimps.owned < trimpsMax && trap.owned >= 1) {
        trap.owned--;
        trimps.owned++;
		//portal Bait
		if (game.portal.Bait.level > 0) trimps.owned += (game.portal.Bait.level * game.portal.Bait.modifier);
		if (trimps.owned > trimpsMax) trimps.owned = trimpsMax;
        game.global.timeLeftOnTrap = -1;
        if (TrapOwned) TrapOwned.innerHTML = trap.owned;
    }
    if (game.options.menu.progressBars.enabled) document.getElementById("trappingBar").style.width = (100 - ((game.global.timeLeftOnTrap / trimps.speed) * 100)) + "%";
}

function buyJob(what) {
	if (game.options.menu.pauseGame.enabled) return;
	if (game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) return;
	if (game.global.firing){
		if (game.jobs[what].owned < 1) return;
		game.resources.trimps.employed -= (game.jobs[what].owned < game.global.buyAmt) ? game.jobs[what].owned : game.global.buyAmt;
		game.jobs[what].owned -= game.global.buyAmt;
		if (game.jobs[what].owned < 0) game.jobs[what].owned = 0;
		if (game.resources.trimps.employed < 0) game.resources.trimps.employed = 0;
		return;
	}
	var workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
	if (workspaces <= 0) return;
	if (!canAffordJob(what, false, workspaces)) return;
	var added = canAffordJob(what, true, workspaces);
	game.jobs[what].owned += added;
	game.resources.trimps.employed += added;
	tooltip(what, "jobs", "update");
}

function getTooltipJobText(what, toBuy) {
    var job = game.jobs[what];
	if (toBuy <= 0) toBuy = game.global.buyAmt;
	var fullText = "";
    for (var item in job.cost) {
        var color = (checkJobItem(what, false, item, false, toBuy)) ? "green" : "red";
        fullText += '<span class="' + color + '">' + item + ':&nbsp;' + checkJobItem(what, false, item, true, toBuy) + '</span>, ';
    }
    fullText = fullText.slice(0, -2);
    return fullText;
}

function canAffordJob(what, take, workspaces) {
    var trimps = game.resources.trimps;
	var toBuy = game.global.buyAmt;
    if (workspaces >= 0 && workspaces < toBuy) toBuy = workspaces;
    if (trimps.owned - trimps.employed - toBuy < 0) return false;
    var job = game.jobs[what];
    for (var costItem in job.cost) {
        if (!checkJobItem(what, take, costItem, null, toBuy)) return false;
    }
	if (take) return toBuy;
    return true;
}

function checkJobItem(what, take, costItem, amtOnly, toBuy) {
    var job = game.jobs[what];
    var cost = job.cost[costItem];
    var price = 0;
	if (!toBuy) toBuy = game.global.buyAmt;
	if (typeof cost[1] !== 'undefined')
		price =  Math.floor((cost[0] * Math.pow(cost[1], job.owned)) * ((Math.pow(cost[1], toBuy) - 1) / (cost[1] - 1)));
	else
		price = cost * toBuy;
    if (amtOnly) {
		var percent;
		if (game.resources[costItem].owned < price){
			var thisPs = getPsString(costItem, true);
			if (thisPs > 0)
			{
				percent = calculateTimeToMax(null, thisPs, (price - game.resources[costItem].owned));		
				percent = "(" + percent + ")";
			}
			else percent = "(<span class='icomoon icon-infinity'></span>)";
		}
		else{
			percent = (game.resources[costItem].owned > 0) ? prettify(((price / game.resources[costItem].owned) * 100).toFixed(1)) : 0;
			percent = "(" + percent + "%)";
		}
		return prettify(price) + "&nbsp;" + percent;
	}
    if (take) {
        game.resources[costItem].owned -= price;
        return true;
    }
    if (game.resources[costItem].owned < price) {
        return false;
    }
    return true;
}

function canAffordCoordinationTrimps(){
	var compare = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend : game.resources.trimps.maxSoldiers ;
	return (game.resources.trimps.realMax() >= (compare * 3))
}

function buyUpgrade(what, confirmed) {
	if (game.options.menu.pauseGame.enabled) return;
	if (game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) return;
    if (what == "Coordination") {
       if (!canAffordCoordinationTrimps()) return;
    }
    var upgrade = game.upgrades[what];
    var canAfford = canAffordTwoLevel(upgrade);
    if (!canAfford) return;
	if (what == "Gigastation" && !confirmed && game.options.menu.confirmhole.enabled){
		tooltip('Confirm Purchase', null, 'update', 'You are about to purchase a Gigastation, <b>which is not a renewable upgrade</b>. Make sure you have purchased all of the Warpstations you can afford first!', 'buyUpgrade(\'Gigastation\', true)');
		return;
	}
	if (what == "Shieldblock" && !confirmed && game.options.menu.confirmhole.enabled && game.global.highestLevelCleared >= 30){
		tooltip('Confirm Purchase', null, 'update', 'You are about to modify your Shield, causing it to block instead of grant health until your next portal. Are you sure?', 'buyUpgrade(\'Shieldblock\', true)');
		return;
	}	
	canAfford = canAffordTwoLevel(upgrade, true);
    upgrade.fire();
	upgrade.done++;
	if (upgrade.prestiges){
		var resName = (what == "Supershield") ? "wood" : "metal";
		upgrade.cost.resources[resName] = getNextPrestigeCost(what);
	}
	if ((upgrade.allowed - upgrade.done) <= 0) upgrade.locked = 1;
    var dif = upgrade.allowed - upgrade.done;
    if (dif > 1) {
		dif -= 1;
        document.getElementById(what + "Owned").innerHTML = upgrade.done + "(+" + dif + ")";
		tooltip(what, "upgrades", "update");
        return;
    } else if (dif == 1) {
		tooltip(what, "upgrades", "update");
        document.getElementById(what + "Owned").innerHTML = upgrade.done;
        return;
    }
    document.getElementById("upgradesHere").removeChild(document.getElementById(what));
    tooltip("hide");
}

function breed() {
    var trimps = game.resources.trimps;
	checkAchieve("trimps", trimps.owned);
    var breeding = trimps.owned - trimps.employed;
	var trimpsMax = trimps.realMax();
	
    if (breeding < 2 || game.global.challengeActive == "Trapper") {
        updatePs(0, true);
		document.getElementById("trimpsTimeToFill").innerHTML = "";
        return;
    }

    var potencyMod = trimps.potency;
	//Broken Planet
	if (game.global.brokenPlanet) potencyMod /= 10;
	//Pheromones
	potencyMod *= 1+ (game.portal.Pheromones.level * game.portal.Pheromones.modifier);
	//Geneticist
	if (game.jobs.Geneticist.owned > 0) potencyMod *= Math.pow(.98, game.jobs.Geneticist.owned);
	//Quick Trimps
	if (game.unlocks.quickTrimps) potencyMod *= 2;
	if (game.global.challengeActive == "Toxicity" && game.challenges.Toxicity.stacks > 0){
		potencyMod *= Math.pow(game.challenges.Toxicity.stackMult, game.challenges.Toxicity.stacks);
	}
	breeding = breeding * potencyMod;
    updatePs(breeding, true);
	potencyMod = (1 + (potencyMod / 10));
	var timeRemaining = log10((trimpsMax - trimps.employed) / (trimps.owned - trimps.employed)) / log10(potencyMod);
	timeRemaining /= 10;
	timeRemaining = (game.options.menu.showFullBreed.enabled > 0) ? timeRemaining.toFixed(1) : Math.ceil(timeRemaining);
	timeRemaining += " Secs";
	var fullBreed = 0;
	if (game.options.menu.showFullBreed.enabled){
		var adjustedMax = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend : trimps.maxSoldiers;
		var totalTime;
		if (game.options.menu.showFullBreed.enabled == 1) totalTime = log10((trimpsMax - trimps.employed) / (trimpsMax - adjustedMax - trimps.employed)) / log10(potencyMod);
		else {
			var threshold = Math.ceil((trimpsMax - trimps.employed) * 0.95);
			totalTime = log10(threshold / (threshold - adjustedMax)) / log10(potencyMod);
		}
		totalTime /= 10;
		fullBreed = totalTime.toFixed(1) + " Secs";
		timeRemaining += " / " + fullBreed;
	}
	
	if (trimps.owned >= trimpsMax) {
        trimps.owned = trimpsMax;
		document.getElementById("trimpsTimeToFill").innerHTML = (fullBreed) ? fullBreed : "";
        return;
    }
	document.getElementById("trimpsTimeToFill").innerHTML = timeRemaining;
	
    trimps.owned += breeding / game.settings.speed;
	if (trimps.owned >= trimpsMax) trimps.owned = trimpsMax;
	else {
		if (game.portal.Anticipation.level) game.global.lastBreedTime += (1000 / game.settings.speed);
		if (game.jobs.Geneticist.locked == 0) {
			if (game.global.lowestGen < 0) game.global.lowestGen = game.jobs.Geneticist.owned;
			else if (game.jobs.Geneticist.owned < game.global.lowestGen) game.global.lowestGen = game.jobs.Geneticist.owned;
		}
	}
}

function log10(val) {
  return Math.log(val) / Math.LN10;
}

function testGymystic(oldPercent) {
	var number = game.buildings.Gym.increase.by;
	game.buildings.Gym.increase.by *= Math.pow(1 - oldPercent, game.buildings.Gym.owned);
	
	game.buildings.Gym.increase.by *= Math.pow(game.upgrades.Gymystic.modifier, game.buildings.Gym.owned);
	game.global.block -= (game.buildings.Gym.increase.by - number) * game.buildings.Gym.owned;

}

function prestigeEquipment(what, fromLoad, noInc) {
    var equipment = game.equipment[what];
	if (!fromLoad && !noInc) equipment.prestige++;
	var resource = (what == "Shield") ? "wood" : "metal";
	var cost = equipment.cost[resource];
	var prestigeMod = 0;
	if (equipment.prestige >= 4) prestigeMod = (((equipment.prestige - 3) * 0.85) + 2);
	else prestigeMod = (equipment.prestige - 1);
    cost[0] = Math.round(equipment.oc * Math.pow(1.069, ((prestigeMod) * game.global.prestige.cost) + 1));
	var stat;
	if (equipment.blockNow) stat = "block";
	else stat = (typeof equipment.health !== 'undefined') ? "health" : "attack";
	if (!fromLoad) game.global[stat] -= (equipment[stat + "Calculated"] * equipment.level);
	if (!fromLoad) game.global.difs[stat] -= (equipment[stat + "Calculated"] * equipment.level);
    equipment[stat + "Calculated"] = Math.round(equipment[stat] * Math.pow(1.19, ((equipment.prestige - 1) * game.global.prestige[stat]) + 1));
	//No need to touch level if it's newNum
	if (fromLoad) return;
	equipment.level = 0;
	if (!noInc && !fromLoad) levelEquipment(what, 1);
    if (document.getElementById(what + "Numeral") !== null) document.getElementById(what + "Numeral").innerHTML = romanNumeral(equipment.prestige);
}

function getNextPrestigeCost(what){
	var equipment = game.equipment[game.upgrades[what].prestiges];
	var prestigeMod;
	var nextPrestigeCount = equipment.prestige + 1;
	if (nextPrestigeCount >= 4) prestigeMod = (((nextPrestigeCount - 3) * 0.85) + 2);
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

function incrementMapLevel(amt){
	var elem = document.getElementById("mapLevelInput");
	var newNum = parseInt(elem.value, 10) + amt;
	if (newNum < 6 || isNaN(newNum)) elem.value = 6;
	else if (newNum > game.global.world) elem.value = game.global.world;
	else elem.value = newNum;
	updateMapCost();
}

function adjustMap(what, value) {
	var minMax = getMapMinMax(what, value);
	if (what != "size") {
		minMax[0] = Math.floor(minMax[0] * 100) + "%";
		minMax[1] = Math.floor(minMax[1] * 100) + "%";
	}
	document.getElementById(what + "AdvMapsText").innerHTML = "Min " + minMax[0] + ", Max " + minMax[1];
	updateMapCost();
}

function initializeInputText() {
	adjustMap('loot', 0);
	adjustMap('size', 0);
	adjustMap('difficulty', 0);
}

function updateMapCost(getValue){
	var baseCost = parseInt(document.getElementById("mapLevelInput").value, 10);
	if (baseCost > game.global.world || baseCost < 6 || isNaN(baseCost)) return;
	baseCost += (parseInt(document.getElementById("sizeAdvMapsRange").value, 10));
	baseCost += (parseInt(document.getElementById("lootAdvMapsRange").value, 10) * 2);
	baseCost += Math.floor(parseInt(document.getElementById("difficultyAdvMapsRange").value, 10) * 1.5);
	baseCost = Math.floor((baseCost / 4) + (Math.pow(1.15, baseCost - 1)));
	if (document.getElementById("biomeAdvMapsSelect").value != "Random") baseCost *= 2;
	if (getValue) return baseCost;
	document.getElementById("mapCostFragmentCost").innerHTML = prettify(baseCost);
	
}

function getMapMinMax(what, value){
	var base = game.mapConfig[what + "Base"];
	var range = game.mapConfig[what + "Range"];
	var minMax = [base - range, base + range];
	if (what == "loot"){
		minMax[0] += ((range / 5) * value);
	}
	else{
		minMax[1] -= ((range / 5) * value);
		if (what == "size") minMax[1] = Math.floor(minMax[1]);
	}
	return minMax;
}

function buyMap() {
	var cost = updateMapCost(true);
	var newLevel = parseInt(document.getElementById("mapLevelInput").value, 10);
	if (!newLevel || newLevel <= 5 || newLevel > game.global.world || isNaN(newLevel) || isNaN(cost)) {
		message("You must create a map between level 6 and your highest zone, " + game.global.world + ".", "Notices");
		return;
	}
	if (cost > 0 && game.resources.fragments.owned >= cost){
		game.resources.fragments.owned -= cost;	
		createMap(newLevel);
	}
	else message("You can't afford this map! You need " + prettify(cost) + " fragments.", "Notices");
}

function createMap(newLevel, nameOverride, locationOverride, lootOverride, sizeOverride,  difficultyOverride, setNoRecycle, messageOverride) {
    game.global.mapsOwned++;
    game.global.totalMapsEarned++;
    var world = (newLevel) ? newLevel : game.global.world;
	//(newLevel > 5 && newLevel <= game.global.world) ? newLevel : game.global.world;
    var mapName = getRandomMapName();
	mapName = mapName.split('.');
	var lootg = parseFloat(getRandomMapValue("loot"));
	if (game.unlocks.goldMaps) lootg += 1;
	if (lootOverride && game.unlocks.goldMaps) lootOverride += 1;
	if (typeof mapName[1] === 'undefined') mapName[1] = "All";
	if (nameOverride) mapName[0] = nameOverride;
	var mapDifficulty = (difficultyOverride) ? difficultyOverride : getRandomMapValue("difficulty");
	if (game.global.challengeActive == "Mapocalypse") mapDifficulty = parseFloat(mapDifficulty) + game.challenges.Mapocalypse.difficultyIncrease;
    game.global.mapsOwnedArray.push({
        id: "map" + game.global.totalMapsEarned,
        name: mapName[0],
		location: (locationOverride) ? locationOverride : mapName[1],
        clears: 0,
        level: world,
        difficulty: mapDifficulty,
        size: (sizeOverride) ? sizeOverride : Math.floor(getRandomMapValue("size")),
        loot: (lootOverride) ? lootOverride : lootg,
		noRecycle: setNoRecycle ? true : false
    });
    if (!messageOverride) message("You just made " + mapName[0] + "!", "Loot", "th-large");
    unlockMap(game.global.mapsOwnedArray.length - 1);
}



function getRandomMapValue(what) { //what can be size, difficulty, or loot for now
    var amt = game.mapConfig[what + "Base"];
    var range = game.mapConfig[what + "Range"];
	var advValue = document.getElementById(what + "AdvMapsRange").value;
	var min;
	var max;
	if (advValue > 0){
		var minMax = getMapMinMax(what, advValue);
		min = minMax[0];
		max = minMax[1];
		sessionMapValues[what] = advValue;
	}
	else{
		min = amt - range;
		max = amt + range;
		sessionMapValues[what] = 0;
    }
	var x = (Math.random() * (max - min) + min);
    x = x.toFixed(3);
    return x;
}

function getRandomMapName() {
    var namesObj = game.mapConfig.names;
    var roll = Math.floor(Math.random() * (namesObj.prefix.length - 1));
    var name = namesObj.prefix[roll];
	var suffix;
	var biome = document.getElementById("biomeAdvMapsSelect").value;
	sessionMapValues.biome = biome;
	if (biome != "Random"){
		var possibilities = [];
		for (var item in namesObj.suffix){
			if (namesObj.suffix[item].split('.')[1] == biome) possibilities.push(namesObj.suffix[item]);
		}
		roll = Math.floor(Math.random() * (possibilities.length - 1));
		suffix = possibilities[roll];
	}
	else{
		roll = Math.floor(Math.random() * (namesObj.suffix.length - 1));
		suffix = namesObj.suffix[roll];
	}
    return name + " " + suffix;
}

function buildMapGrid(mapId) {
	game.global.mapStarted = new Date().getTime();
    var map = game.global.mapsOwnedArray[getMapIndex(mapId)];
    var array = [];
	var imports = [];
	for (var item in game.unlocks.imps){
		if (!game.unlocks.imps[item]) continue;
		var badGuy = game.badGuys[item];
		if (badGuy.location == "Maps" && badGuy.world <= map.level){
			imports.push(item);
		}
	}
    for (var i = 0; i < map.size; i++) {
        array.push({
            level: i + 1,
            maxHealth: -1,
            health: -1,
            attack: -1,
            special: "",
            text: "",
            name: getRandomBadGuy(map.location, i + 1, map.size, map.level, imports)
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

var canSkeletimp = false;

function buildGrid() {
    var world = game.global.world;
    var array = [];
	var imports = [];
	for (var item in game.unlocks.imps){
		if (!game.unlocks.imps[item]) continue;
		var badGuy = game.badGuys[item];
		if (badGuy.location == "World" && badGuy.world <= world){
			imports.push(item);
		}
	}
	canSkeletimp = false;
	if ((new Date().getTime() - game.global.lastSkeletimp) >= 2700000) canSkeletimp = true;
    for (var i = 0; i < 100; i++) {
        array.push({
            level: i + 1,
            maxHealth: -1,
            health: -1,
            attack: -1,
            special: "",
            text: "",
            name: getRandomBadGuy(null, i + 1, 100, world, imports)
        });
    }
    game.global.gridArray = array;
    addSpecials();
}

function getRandomBadGuy(mapSuffix, level, totalCells, world, imports) {
	var selected;
	var force = false;
    var badGuysArray = [];
    for (var item in game.badGuys) {
		var badGuy = game.badGuys[item];
		if (badGuy.locked) continue;
		if (badGuy.location == "Maps" && !mapSuffix) continue;
		if (level == totalCells && badGuy.last && (badGuy.location == mapSuffix || (!mapSuffix && badGuy.location == "World")) && world >= badGuy.world) {
			if (item == "Blimp" && (world != 5 && world  != 10 && world < 15)) continue;
			if (!mapSuffix && (game.global.brokenPlanet || game.global.world == 59) && item == "Blimp") item = "Improbability";
			selected = item;
			force = true;
			break;
		}
		if (!badGuy.last && (badGuy.location == "All" || badGuy.location == mapSuffix || (!mapSuffix && badGuy.location == "World")) && (typeof badGuy.world === 'undefined' || game.global.world >= game.badGuys[item].world)){
		badGuysArray.push(item);
		}
	}
	if (!mapSuffix && canSkeletimp && !force && (Math.floor(Math.random() * 100) < 5)) {canSkeletimp = false; return (Math.floor(Math.random() * 100) < 10) ? "Megaskeletimp" : "Skeletimp";} 
	if (imports.length && !force && (Math.floor(Math.random() * 100) < (imports.length * 3))) return imports[Math.floor(Math.random() * imports.length)];
	if (!mapSuffix && !force) {
		var chance = .35 * (1 / (100 - 1 - (3 * imports.length)));
		
		chance = Math.round(chance * 100000);
		var roll = Math.floor(Math.random() * 100000);
		if (roll < chance) {
			return "Turkimp";
		}
	}
    if (!force) selected = badGuysArray[Math.floor(Math.random() * badGuysArray.length)];
	return selected;
	
}

function addSpecialToLast(special, array, item) {
	var title = "";
	if (special.title) title = "title='" + special.title + "' ";
	var prefix = "";
	var icon = special.icon;
		if (icon && icon.charAt(0) == "*") {
			icon = icon.replace("*", "");
			prefix =  "icomoon icon-" 
		}
		else prefix = "glyphicon glyphicon-";
    array[array.length - 1].text = '<span ' + title + 'class="' + prefix + icon + '"></span>';
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
	var prestigeItemsAvailable = [];
    for (var item in unlocksObj) {
        var special = unlocksObj[item];
		if (special.brokenPlanet && ((special.brokenPlanet == 1 && !game.global.brokenPlanet) || special.brokenPlanet == -1 && game.global.brokenPlanet)) continue;
		if (map && game.global.challengeActive == "Frugal" && special.prestige) continue;
		if (special.startAt < 0) continue;
		if (special.lastAt < game.global.world) continue;
		if ((maps) && (special.filterUpgrade) && (game.mapConfig.locations[map.location].upgrade != item)) continue;		
        if ((special.level == "last" && canLast && special.world <= world && (special.canRunOnce || special.canRunWhenever))) {
			if (typeof special.specialFilter !== 'undefined'){
				if (!special.specialFilter(world)) continue;
			}
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
		if ((special.world == -10) && ((world % 10) !== 0)) continue;
		if ((special.world == -20) && ((world % 20) !== 0)) continue;
		if ((special.world == -25) && ((world % 25) !== 0)) continue;
		if ((maps) && (special.filter) && game.mapConfig.locations[map.location].resourceType != item) continue;
		if (typeof special.specialFilter !== 'undefined'){
			if (!special.specialFilter()) continue;
		}
        if ((typeof special.startAt !== 'undefined') && (special.startAt > world)) continue;
        if (typeof special.canRunOnce === 'undefined' && (special.level == "last") && canLast && (special.last <= (world - 5))) {
			if (countOnly){
				specialCount += Math.floor((world - special.last) / 5);
				continue;
			}
			if (special.prestige && maps && game.options.menu.mapLoot.enabled == 0) {
				prestigeItemsAvailable.push(item);
				continue;
			}
            array = addSpecialToLast(special, array, item);
            canLast = false;
            continue;
        }
		if (special.level == "last") continue;
		if (special.canRunOnce === true && countOnly) {specialCount++; continue;}
        if (!countOnly)  findHomeForSpecial(special, item, array, max);
    }
	if (canLast && prestigeItemsAvailable.length && maps){
		var bestIndex = 0;
		var bestZone = game.mapUnlocks[prestigeItemsAvailable[0]].last;
		for (var x = 1; x < prestigeItemsAvailable.length; x++){
			var thisUpgrade = game.mapUnlocks[prestigeItemsAvailable[x]];
			if (thisUpgrade.last < bestZone){	
				bestIndex = x;
				bestZone = thisUpgrade.last;
			}
		}
		addSpecialToLast(game.mapUnlocks[prestigeItemsAvailable[bestIndex]], array, prestigeItemsAvailable[bestIndex]);
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
			var addClass = (special.addClass) ? special.addClass : "";
			var prefix = "";
			var icon = special.icon;
			if (icon && icon.charAt(0) == "*") {
				icon = icon.replace("*", "");
				prefix =  "icomoon icon-" 
			}
			else prefix = "glyphicon glyphicon-";
			if (typeof special.title !== 'undefined') 
			array[level].text = '<span title="' + special.title + '" class="' + prefix + icon + ' ' + addClass + '"></span>';
			else{
			array[level].text = '<span class="' + prefix + icon + ' ' + addClass +  '"></span>';
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
		if (map.size % cols === 0) rows = map.size / cols;
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
		grid.insertBefore(row, grid.childNodes[0]);
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
            cell.className = "battleCell cellNotBeaten";
            cell.innerHTML = (maps) ? game.global.mapGridArray[counter].text : game.global.gridArray[counter].text;
			if (cell.innerHTML === "") cell.innerHTML = "&nbsp;";
            counter++;
        }
    }
}

function fightManual() {
	if (game.options.menu.pauseGame.enabled) return;
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

function recycleBelow(confirmed){
	var level = parseInt(document.getElementById("mapLevelInput").value, 10);
	if (isNaN(level) || level < 6) return;
	if (!confirmed) {
		tooltip('confirm', null, 'update', 'You are about to recycle all maps below level ' + level + '. Are you sure?' , 'recycleBelow(true)', 'Mass Recycle');
		return;
	}
	var refund = 0;
	var total = 0;
	for (var x = game.global.mapsOwnedArray.length - 1; x >= 0; x--){
		var item = game.global.mapsOwnedArray[x];
		if (!item.noRecycle && item.level < level) {
			refund += recycleMap(x, true);
			total++;
			}
	}
	if (total > 0) message("Recycled " + total + " maps for " + prettify(refund) + " fragments.", "Notices");
}

function recycleMap(map, fromMass) {
    if (typeof map === 'undefined' && game.global.lookingAtMap === "") return;
    if (typeof map === 'undefined') map = getMapIndex(game.global.lookingAtMap);
    if (map === null) return;
	var mapObj = game.global.mapsOwnedArray[map];
	if (mapObj.noRecycle) {
		game.global.currentMapId = "";
		game.global.lastClearedMapCell = -1;
		game.global.mapGridArray = [];
		mapsSwitch(true);
		return;
	}
    document.getElementById("mapsHere").removeChild(document.getElementById(mapObj.id));
    if (game.global.currentMapId == mapObj.id){
		game.global.lookingAtMap = "";
		game.global.currentMapId = "";
		game.global.lastClearedMapCell = -1;
	}
	else if (game.global.lookingAtMap == mapObj.id) game.global.lookingAtMap = "";
	game.global.mapsOwned--;
	var refund = getRecycleValue(mapObj.level);
	game.resources.fragments.owned += refund;
	if (!fromMass) message("Recycled " + mapObj.name + " for " + prettify(refund) + " fragments.", "Notices");
	game.global.mapsOwnedArray.splice(map, 1);
    mapsSwitch(true, true);
	return refund;
}

function getRecycleValue(level) {
	var baseCost = level;
	if (baseCost > game.global.world || baseCost < 6 || isNaN(baseCost)) return;
	baseCost = Math.floor((baseCost / 4) + (Math.pow(1.15, baseCost - 1)));
	baseCost /= 4;
	return Math.floor(baseCost);
}

function updateMapCredits() {
	var s = (game.challenges.Mapology.credits == 1) ? "" : "s"
	document.getElementById("mapCreditsLeft").innerHTML = game.challenges.Mapology.credits + " Map Credit" + s;
}

function messageMapCredits() {
	var s = (game.challenges.Mapology.credits == 1) ? "" : "s"
	message("You have " + game.challenges.Mapology.credits + " Map Credit" + s + " left!", "Notices");
}

function mapsClicked() {
	if (game.options.menu.pauseGame.enabled) return;
    if (game.global.switchToMaps || game.global.switchToWorld) {
        game.global.soldierHealth = 0;
		game.resources.trimps.soldiers = 0;
		var bar = document.getElementById("goodGuyBar");
		bar.style.backgroundColor = "red";
		bar.style.width = "0%";
		if (game.global.challengeActive == "Nom") {
			var cell;
			var cellNum;
			if (game.global.mapsActive) {
				cellNum = game.global.lastClearedMapCell + 1;
				cell = game.global.mapGridArray[cellNum];
			} else {
				cellNum = game.global.lastClearedCell + 1;
				cell = game.global.gridArray[cellNum];
			}
			cell.nomStacks = (cell.nomStacks) ? cell.nomStacks + 1 : 1;
			if (cell.nomStacks > 100) cell.nomStacks = 100;
			updateNomStacks(cell.nomStacks);
			cell.health += (cell.maxHealth * 0.05);
			if (cell.health > cell.maxHealth) cell.health = cell.maxHealth;
			updateBadBar(cell);
		}
		mapsSwitch();
        return;
    }
    if (game.global.fighting && !game.global.preMapsActive) {
		message("Waiting to travel until your soldiers are finished.", "Notices");
		
		document.getElementById("mapsBtn").className = "btn btn-warning fightBtn shrinkBtnText";
		document.getElementById("mapsBtn").innerHTML = "Abandon Soldiers";
		}
    if (game.global.preMapsActive) {
        mapsSwitch();
        return;
    }
	game.global.switchToMaps = true;
}

function mapsSwitch(updateOnly, fromRecycle) {
	game.global.titimpLeft = 0;
	updateTitimp();
    if (!updateOnly) {
		game.global.fighting = false;
        game.global.switchToMaps = false;
        game.global.switchToWorld = false;
        if (game.global.preMapsActive) {
            game.global.mapsActive = false;
            game.global.preMapsActive = false;
        } else game.global.preMapsActive = true;
    }
	var currentMapObj;
	if (game.global.currentMapId !== "") currentMapObj = getCurrentMapObject();
	var mapsBtn = document.getElementById("mapsBtn");
	var recycleBtn = document.getElementById("recycleMapBtn");
	recycleBtn.innerHTML = "Recycle Map";
	document.getElementById("mapsBtn").className = "btn btn-warning fightBtn";
    if (game.global.preMapsActive) {
		game.global.mapsActive = false;
		setNonMapBox();
		document.getElementById("battleHeadContainer").style.display = "none";
		document.getElementById("mapsCreateRow").style.display = "block";
		if (!fromRecycle) resetAdvMaps();
        document.getElementById("grid").style.display = "none";
        document.getElementById("preMaps").style.display = "block";
        document.getElementById("mapGrid").style.display = "none";
        mapsBtn.innerHTML = "World";
		document.getElementById("repeatBtn").style.display = "none";
        if (game.global.lookingAtMap && !game.global.currentMapId) selectMap(game.global.lookingAtMap, true);
		else if (game.global.currentMapId === "") {
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
    }
	else if (game.global.mapsActive) {
		fadeIn("repeatBtn", 10);
		document.getElementById("battleHeadContainer").style.display = "block";
		document.getElementById("mapsCreateRow").style.display = "none";
        document.getElementById("grid").style.display = "none";
        document.getElementById("preMaps").style.display = "none";
        document.getElementById("mapGrid").style.display = "block";
		var btnText = "Maps";
		if (game.global.mapBonus > 0) btnText += " (" + game.global.mapBonus + ")";
        document.getElementById("mapsBtn").innerHTML = btnText;
        document.getElementById("worldNumber").innerHTML = "</br>Lv: " + currentMapObj.level;
        document.getElementById("worldName").innerHTML = currentMapObj.name;
		document.getElementById("mapBonus").innerHTML = "";
    } else {
		document.getElementById("battleHeadContainer").style.display = "block";
		document.getElementById("mapsCreateRow").style.display = "none";
        document.getElementById("grid").style.display = "block";
        document.getElementById("preMaps").style.display = "none";
        document.getElementById("mapGrid").style.display = "none";
		setNonMapBox();
		document.getElementById("repeatBtn").style.visibility = "hidden";
    }
}

function setNonMapBox(){
	document.getElementById("mapsBtn").innerHTML = "Maps";
	document.getElementById("worldNumber").innerHTML = game.global.world;
	var mapBonus = document.getElementById("mapBonus");
	if (game.global.mapBonus > 0) mapBonus.innerHTML = prettify(game.global.mapBonus * 20) + "% Map Bonus";
	else mapBonus.innerHTML = "";
	document.getElementById("worldName").innerHTML = "Zone";
}


function resetAdvMaps() {
	document.getElementById("mapLevelInput").value = game.global.world;
	var inputs = ["loot", "difficulty", "size"];
	for (var x = 0; x < inputs.length; x++){
		var thisVal = (sessionMapValues[inputs[x]]) ? sessionMapValues[inputs[x]] : 0;
		document.getElementById(inputs[x] + "AdvMapsRange").value = thisVal;
		adjustMap(inputs[x], thisVal);
	}
	document.getElementById("biomeAdvMapsSelect").value = (sessionMapValues.biome) ? sessionMapValues.biome : "Random";
	updateMapCost();
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
	if (game.options.menu.pauseGame.enabled && !force) return;
    if (!force && game.global.currentMapId !== "") {
        message("You must finish or recycle your current map before moving on.", "Notices");
        return;
    }
    var map = getMapIndex(mapId);
    map = game.global.mapsOwnedArray[map];
	if (!map) return;
    document.getElementById("selectedMapName").innerHTML = map.name;
	document.getElementById("mapStatsSize").innerHTML = (Math.floor(map.size));
	document.getElementById("mapStatsDifficulty").innerHTML = Math.floor(map.difficulty * 100) + "%";
	document.getElementById("mapStatsLoot").innerHTML = Math.floor(map.loot * 100) + "%";
	document.getElementById("mapStatsItems").innerHTML = addSpecials(true, true, map);
	document.getElementById("mapStatsResource").innerHTML = game.mapConfig.locations[map.location].resourceType;
	if (typeof game.global.mapsOwnedArray[getMapIndex(game.global.lookingAtMap)] !== 'undefined') {
		var prevSelected = document.getElementById(game.global.lookingAtMap);
		prevSelected.className = prevSelected.className.replace("mapElementSelected","mapElementNotSelected");
	}
	var currentSelected = document.getElementById(mapId);
	currentSelected.className = currentSelected.className.replace("mapElementNotSelected", "mapElementSelected");
    game.global.lookingAtMap = mapId;
    document.getElementById("selectMapBtn").innerHTML = "Run Map";
    document.getElementById("selectMapBtn").style.visibility = "visible";
	document.getElementById("recycleMapBtn").style.visibility = (map.noRecycle) ? "hidden" : "visible";
}

function runMap() {
	if (game.options.menu.pauseGame.enabled) return;
    if (game.global.lookingAtMap === "") return;

	if (game.global.challengeActive == "Mapology" && !game.global.currentMapId) {
		if (game.challenges.Mapology.credits < 1){
			message("You are all out of Map Credits! Clear some more zones to earn some more.", "Notices");
			return;
		}
		game.challenges.Mapology.credits--;
		if (game.challenges.Mapology.credits <= 0) game.challenges.Mapology.credits = 0;
		updateMapCredits();
		messageMapCredits()
	}
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
	var num = (game.portal.Agility.level) ? 1000 * Math.pow(1 - game.portal.Agility.modifier, game.portal.Agility.level) : 1000;
	if (game.global.battleCounter >= num) {
        game.global.battleCounter -= num; //Thanks grabz
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
	var trimpsMax = trimps.realMax();
    if (trimps.soldiers > 0) {
        startFight();
        return;
    }
    var breeding = (trimps.owned - trimps.employed);
	var adjustedMax = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend : trimps.maxSoldiers;
    if (breeding < adjustedMax) return;
    if (force) {
        trimps.soldiers = adjustedMax;
        trimps.owned -= adjustedMax;
    } else {
        var max = Math.ceil((trimpsMax - trimps.employed) * 0.05);
        if ((trimps.owned) >= (trimpsMax - max)) {
            trimps.soldiers = adjustedMax;
            trimps.owned -= adjustedMax;
        }
    }
    if (game.resources.trimps.soldiers < adjustedMax) {
        return;
    }
    startFight();
}

function getBadCoordLevel(){
	//For Coordinate challenge
	var world = (game.global.mapsActive) ? getCurrentMapObject().level : game.global.world;
	var amt = 1;
	for (var x = 0; x < world - 1; x++){
		amt = Math.ceil(amt * 1.25);
	}
	return amt;
}

function startFight() {
	game.global.battleCounter = 0;
    document.getElementById("badGuyCol").style.visibility = "visible";
    var cellNum;
    var cell;
    var cellElem;
	var badCoord;
    if (game.global.mapsActive) {
        cellNum = game.global.lastClearedMapCell + 1;
        cell = game.global.mapGridArray[cellNum];
        cellElem = document.getElementById("mapCell" + cellNum);
    } else {
        cellNum = game.global.lastClearedCell + 1;
        cell = game.global.gridArray[cellNum];
        cellElem = document.getElementById("cell" + cellNum);
    }
    cellElem.className = cellElem.className.replace("cellNotBeaten", "cellCurrent");
	var badName = cell.name;
	if (game.global.challengeActive == "Coordinate"){
		badCoord = getBadCoordLevel();
		badName += " (" + prettify(badCoord) + ")";	
	}
	if (game.global.brokenPlanet && !game.global.mapsActive)
		badName += ' <span class="badge badBadge" onmouseover="tooltip(\'Pierce\', \'customText\', event, \'20% of the damage from this Bad Guy pierces through block\')" onmouseout="tooltip(\'hide\')"><span class="glyphicon glyphicon-tint"></span></span>';	
	if (game.global.challengeActive == "Slow" || (game.badGuys[cell.name].fast && game.global.challengeActive != "Coordinate" && game.global.challengeActive != "Nom"))
		badName += ' <span class="badge badBadge" onmouseover="tooltip(\'Fast\', \'customText\', event, \'This Bad Guy is fast and attacks first\')" onmouseout="tooltip(\'hide\')"><span class="glyphicon glyphicon-forward"></span></span>';
	if ((game.global.challengeActive == "Electricity" || game.global.challengeActive == "Mapocalypse")){
		badName += ' <span class="badge badBadge" onmouseover="tooltip(\'Electric\', \'customText\', event, \'This Bad Guy is electric and stacks a debuff on your Trimps\')" onmouseout="tooltip(\'hide\')"><span class="icomoon icon-power-cord"></span></span>';
	}
	document.getElementById("badGuyName").innerHTML = badName;
	if (game.global.challengeActive == "Toxicity") updateToxicityStacks();
    if (cell.maxHealth == -1) {
        cell.attack = game.global.getEnemyAttack(cell.level, cell.name);
        cell.health = game.global.getEnemyHealth(cell.level, cell.name);
		if (game.global.challengeActive == "Coordinate") cell.health *= badCoord;
        if (game.global.mapsActive) {
            var difficulty = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)].difficulty;
            cell.attack *= difficulty;
            cell.health *= difficulty;
        }
		if (game.global.challengeActive == "Meditate") cell.health *= 2;
		else if (game.global.challengeActive == "Toxicity"){
			cell.attack *= 5;
			cell.health *= 2;
		}
        cell.maxHealth = cell.health;
		
    }
	else if (game.global.challengeActive == "Nom" && cell.nomStacks){
		cell.attack = Math.floor(game.global.getEnemyAttack(cell.level, cell.name) * Math.pow(1.25, cell.nomStacks));
		updateNomStacks(cell.nomStacks);
	}
	if (game.global.roboTrimpLevel && game.global.useShriek && game.global.roboTrimpCooldown <= 0 && cell.name == 'Improbability'){
		activateShriek();
	}
    var trimpsFighting = game.resources.trimps.maxSoldiers;
    if (game.global.soldierHealth <= 0) {
		game.global.battleCounter = 0;
		if (game.portal.Anticipation.level){
			game.global.antiStacks = Math.floor(game.global.lastBreedTime / 1000);
			if (game.global.antiStacks >= 30) game.global.antiStacks = 30;
			game.global.lastBreedTime = 0;
			updateAntiStacks();
		}
		if ((game.global.challengeActive == "Electricity" || game.global.challengeActive == "Mapocalypse")) {
			game.global.radioStacks = 0;
			updateRadioStacks();
		}
		game.global.difs.attack = 0;
		game.global.difs.health = 0;
		game.global.difs.block = 0;
		game.global.difs.trainers = game.jobs.Trainer.owned;
        game.global.soldierHealthMax = (game.global.health * trimpsFighting);
		//Toughness
		if (game.portal.Toughness.level > 0) game.global.soldierHealthMax += (game.global.soldierHealthMax * game.portal.Toughness.level * game.portal.Toughness.modifier);
		if (game.global.lowestGen >= 0) {
			game.global.soldierHealthMax *= Math.pow(1.01, game.global.lowestGen);
			game.global.lastLowGen = game.global.lowestGen;
			game.global.lowestGen = -1;
		}
        game.global.soldierCurrentAttack = (game.global.attack * trimpsFighting);
		//Resilience
		if (game.portal.Resilience.level > 0) game.global.soldierHealthMax *= Math.pow(game.portal.Resilience.modifier + 1, game.portal.Resilience.level);
		//Power
		if (game.portal.Power.level > 0) game.global.soldierCurrentAttack += (game.global.soldierCurrentAttack * game.portal.Power.level * game.portal.Power.modifier);
        game.global.soldierCurrentBlock = Math.floor((game.global.block * (game.jobs.Trainer.owned * (game.jobs.Trainer.modifier / 100)) + game.global.block) * trimpsFighting);
		if (game.global.formation !== 0){
			game.global.soldierHealthMax *= (game.global.formation == 1) ? 4 : 0.5;
			game.global.soldierCurrentAttack *= (game.global.formation == 2) ? 4 : 0.5;
			game.global.soldierCurrentBlock *= (game.global.formation == 3) ? 4 : 0.5;
		}
		game.global.soldierHealth = game.global.soldierHealthMax;
    }
	else {
		//Check differences in equipment, apply perks, bonuses, and formation
		if (game.global.difs.health !== 0) {
			var healthTemp = trimpsFighting * game.global.difs.health * ((game.portal.Toughness.modifier * game.portal.Toughness.level) + 1);
			if (game.jobs.Geneticist.owned > 0) healthTemp *= Math.pow(1.01, game.global.lastLowGen);
			if (game.portal.Resilience.level > 0) healthTemp *= Math.pow(game.portal.Resilience.modifier + 1, game.portal.Resilience.level);
			if (game.global.formation !== 0){
				healthTemp *= (game.global.formation == 1) ? 4 : 0.5;
			}
			game.global.soldierHealthMax += healthTemp;
			game.global.soldierHealth += healthTemp;
			game.global.difs.health = 0;
			if (game.global.soldierHealth <= 0) game.global.soldierHealth = 0;
		}
		if (game.global.difs.attack !== 0) {
			var attackTemp = trimpsFighting * game.global.difs.attack * ((game.portal.Power.modifier * game.portal.Power.level) + 1);
			if (game.global.formation !== 0){
				attackTemp *= (game.global.formation == 2) ? 4 : 0.5;
			}
			game.global.soldierCurrentAttack += attackTemp;
			game.global.difs.attack = 0;
		}
		if (game.global.difs.block !== 0) {
			var blockTemp = (trimpsFighting * game.global.difs.block * ((game.global.difs.trainers * (game.jobs.Trainer.modifier / 100)) + 1));
			if (game.global.formation !== 0){
				blockTemp *= (game.global.formation == 3) ? 4 : 0.5;
			}
			game.global.soldierCurrentBlock += blockTemp;
			game.global.difs.block = 0;
		}
	}
	var soldType = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend: game.resources.trimps.maxSoldiers;
	updateAllBattleNumbers(game.resources.trimps.soldiers < soldType);
    game.global.fighting = true;
    game.global.lastFightUpdate = new Date();	
}

function updateAllBattleNumbers (skipNum) {
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
	if (cellElem == null) return;
    cellElem.className = cellElem.className.replace("cellNotBeaten", "cellCurrent");
    document.getElementById("goodGuyHealthMax").innerHTML = prettify(game.global.soldierHealthMax);
	updateGoodBar();
	updateBadBar(cell);
	document.getElementById("badGuyHealthMax").innerHTML = prettify(cell.maxHealth);
	if (!skipNum) document.getElementById("trimpsFighting").innerHTML = (game.portal.Coordinated.level) ? prettify(game.portal.Coordinated.currentSend) : prettify(game.resources.trimps.maxSoldiers);
	document.getElementById("goodGuyBlock").innerHTML = prettify(game.global.soldierCurrentBlock);
	document.getElementById("goodGuyAttack").innerHTML = calculateDamage(game.global.soldierCurrentAttack, true, true);
	var badAttackElem = document.getElementById("badGuyAttack");
	badAttackElem.innerHTML = calculateDamage(cell.attack, true);
	if (game.global.usingShriek) {
		badAttackElem.style.color = "#d9534f";
		badAttackElem.innerHTML += '<span class="icomoon icon-chain"></span>';
	}
}

function updateGoodBar() {
    document.getElementById("goodGuyHealth").innerHTML = prettify(game.global.soldierHealth);
	if (!game.options.menu.progressBars.enabled) return;
	var barElem = document.getElementById("goodGuyBar");
    var percent = ((game.global.soldierHealth / game.global.soldierHealthMax) * 100);
    barElem.style.width = percent + "%";
    barElem.style.backgroundColor = getBarColor(percent);
}

function updateBadBar(cell) {
/*     var cell = (game.global.mapsActive) ? game.global.mapGridArray[game.global.lastClearedMapCell + 1] : game.global.gridArray[game.global.lastClearedCell + 1]; */
	document.getElementById("badGuyHealth").innerHTML = prettify(cell.health);
	if (!game.options.menu.progressBars.enabled) return;
	var barElem = document.getElementById("badGuyBar");
	var percent = ((cell.health / cell.maxHealth) * 100);
    barElem.style.width = percent + "%";
    barElem.style.backgroundColor = getBarColor(percent);
}

function calculateDamage(number, buildString, isTrimp, noCheckAchieve) { //number = base attack
    var fluctuation = .2; //%fluctuation
	var maxFluct = -1;
	var minFluct = -1;
	if (game.global.titimpLeft >= 1 && isTrimp && game.global.mapsActive){
		number *= 2;
	}
	if (game.global.achievementBonus > 0 && isTrimp){
		number *= (1 + (game.global.achievementBonus / 100));
	}
	if (game.global.challengeActive == "Discipline" && isTrimp){
		fluctuation = .995;
	}
	else if (game.portal.Range.level > 0 && isTrimp){
		minFluct = fluctuation - (.02 * game.portal.Range.level);
	}
	if (game.global.challengeActive == "Coordinate" && !isTrimp){
		number *= getBadCoordLevel();
	}
	if (!isTrimp && game.global.challengeActive == "Meditate"){
		number *= 1.5;
	}
	if (isTrimp && game.global.roboTrimpLevel > 0){
		number *= ((0.2 * game.global.roboTrimpLevel) + 1);
	}
	if (!isTrimp && game.global.usingShriek) {
		number *= game.mapUnlocks.roboTrimp.getShriekValue();
	}
	if (maxFluct == -1) maxFluct = fluctuation;
	if (minFluct == -1) minFluct = fluctuation;
	var min = Math.floor(number * (1 - minFluct));
    var max = Math.ceil(number + (number * maxFluct));
    if (buildString) {
		if (!game.global.mapsActive && isTrimp && game.global.mapBonus > 0){
			var mapBonusMult = 1 + (0.2 * game.global.mapBonus);
			min *= mapBonusMult;
			max *= mapBonusMult;
		}
		if (game.global.radioStacks > 0 && isTrimp){
			var mult = game.global.radioStacks * .1;
			mult = (mult > 1) ? 1 : 1 - mult;
			min *= mult;
			max *= mult;
		}
		if (game.global.antiStacks > 0 && isTrimp){
			var antiMult = (game.global.antiStacks * game.portal.Anticipation.level * game.portal.Anticipation.modifier) + 1;
			min *= antiMult;
			max *= antiMult;
		}
		if (isTrimp) {
			if (!noCheckAchieve) checkAchieve("damage", max);
			else return max;
		}
		return prettify(min) + "-" + prettify(max);
    }
	number = Math.floor(Math.random() * ((max + 1) - min)) + min;
    return number;
}

function nextWorld() {
	if (game.global.world > game.global.highestLevelCleared){
		game.global.highestLevelCleared = game.global.world;
	}
    game.global.world++;
    document.getElementById("worldNumber").innerHTML = game.global.world;
	game.global.mapBonus = 0;
	document.getElementById("mapBonus").innerHTML = "";
    game.global.lastClearedCell = -1;
    game.global.gridArray = [];
    document.getElementById("grid").innerHTML = "";
    buildGrid();
    drawGrid();
	if (game.worldText["w" + game.global.world]) message(game.worldText["w" + game.global.world], "Story");
	checkAchieve("zones");
	if (game.global.challengeActive == "Mapology") {
		game.challenges.Mapology.credits++;
		updateMapCredits();
	}
	game.global.zoneStarted = new Date().getTime();
	if (game.global.roboTrimpLevel && game.global.brokenPlanet) {
		if (game.global.roboTrimpCooldown > 0) game.global.roboTrimpCooldown--;
		displayRoboTrimp();
	}
	if (game.global.challengeActive == "Toxicity") {
		game.challenges.Toxicity.stacks = 0;
		updateToxicityStacks();
	}
}

function distributeToChallenges(amt) {
	var challenge = game.global.challengeActive;
	if (challenge == "Mapocalypse") challenge = "Electricity";
	if (!challenge || typeof game.challenges[challenge].heliumThrough === 'undefined') return;
	var challengeObj = game.challenges[challenge];
	if (game.global.world <= challengeObj.heliumThrough) challengeObj.heldHelium += amt;
}

function fight(makeUp) {
	var randomText;
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
    if (game.global.soldierHealth <= 0) {
		game.stats.trimpsKilled.value += game.resources.trimps.maxSoldiers;
        var s = (game.resources.trimps.maxSoldiers > 1) ? "s " : " ";
		randomText = game.trimpDeathTexts[Math.floor(Math.random() * game.trimpDeathTexts.length)];
        message(prettify(game.resources.trimps.maxSoldiers) + " Trimp" + s + "just " + randomText + ".", "Combat");
        game.global.fighting = false;
        game.resources.trimps.soldiers = 0;
		if (game.global.challengeActive == "Nom") {
			cell.nomStacks = (cell.nomStacks) ? cell.nomStacks + 1 : 1;
			if (cell.nomStacks > 100) cell.nomStacks = 100;
			updateNomStacks(cell.nomStacks);
			cell.health += (cell.maxHealth * 0.05);
			if (cell.health > cell.maxHealth) cell.health = cell.maxHealth;
			updateBadBar(cell);
		}
        return;
    }
    if (cell.health <= 0) {
		game.stats.battlesWon.value++;
		if (game.global.usingShriek) disableShriek();
		randomText = game.badGuyDeathTexts[Math.floor(Math.random() * game.badGuyDeathTexts.length)];
		var firstChar = cell.name.charAt(0);
		var aAn = (firstChar == "A" || firstChar == "E" || firstChar == "I" || firstChar == "O" || firstChar == "U") ? " an " : " a ";
		var killedText = "You " + randomText + aAn + cell.name;
		if (game.global.challengeActive == "Coordinate") killedText += " group";
		killedText += "!";
        message(killedText, "Combat");
        try{
			if (typeof ga !== 'undefined' && cell.level % 10 === 0 && !game.global.mapsActive) ga('send', 'event', 'Killed Bad Guy', 'W: ' + game.global.world + ' L:' + cell.level);
			}
		catch(err){
			console.debug(err);
		}
		try{
			if (typeof kongregate !== 'undefined' && !game.global.mapsActive && !game.global.cheater) kongregate.stats.submit("HighestLevel", ((game.global.world * 100) + cell.level));
		}
		catch(err){
			console.debug(err);
		}
        cellElem.className = cellElem.className.replace("cellCurrent", "cellBeaten");
        if (game.global.mapsActive) game.global.lastClearedMapCell = cellNum;
        else game.global.lastClearedCell = cellNum;
        game.global.fighting = false;
        document.getElementById("badGuyCol").style.visibility = "hidden";
        var unlock;
        if (game.global.mapsActive) unlock = game.mapUnlocks[cell.special];
        else unlock = game.worldUnlocks[cell.special];
        if (typeof unlock !== 'undefined' && typeof unlock.message !== 'undefined') message(cell.text + " " + unlock.message, "Unlocks");
        if (typeof unlock !== 'undefined' && typeof unlock.fire !== 'undefined') {
            unlock.fire(cell.level);
            if (game.global.mapsActive) {
                if (typeof game.mapUnlocks[cell.special].last !== 'undefined') {
					game.mapUnlocks[cell.special].last += 5;
/* 					if (typeof game.upgrades[cell.special].prestige && game.global.mapologyDone){
						unlock.fire(cell.level);
						game.mapUnlocks[cell.special].last += 5;
					} */
				}
                if (typeof game.mapUnlocks[cell.special].canRunOnce !== 'undefined') game.mapUnlocks[cell.special].canRunOnce = false;
				if (unlock.filterUpgrade) refreshMaps();
            }
			
        } else if (cell.special !== "") {
            unlockEquipment(cell.special);
        }
		if (typeof game.badGuys[cell.name].loot !== 'undefined') game.badGuys[cell.name].loot(cell.level);
        if (game.global.mapsActive && cellNum == (game.global.mapGridArray.length - 1)) {
			game.stats.mapsCleared.value++;
			checkAchieve("totalMaps");
			if (getCurrentMapObject().level >= (game.global.world - game.portal.Siphonology.level) && game.global.mapBonus < 10){
				game.global.mapBonus += 1;
			}
			if (game.global.repeatMap && (game.global.challengeActive != "Mapology" || game.challenges.Mapology.credits >= 1)){
				if (game.global.mapBonus > 0) document.getElementById("mapsBtn").innerHTML = "Maps (" + game.global.mapBonus + ")";
				game.global.lastClearedMapCell = -1;
				buildMapGrid(game.global.currentMapId);
				drawGrid(true);
				if (game.global.challengeActive == "Mapology") {
					game.challenges.Mapology.credits--;
					if (game.challenges.Mapology.credits <= 0) game.challenges.Mapology.credits = 0;
					updateMapCredits();
					messageMapCredits()
				}
				fightManual();
				return;
			}
			else{
				game.global.preMapsActive = true;
				game.global.mapsActive = false;
				game.global.lastClearedMapCell = -1;
				game.global.currentMapId = "";
				game.global.mapGridArray = [];
				game.global.fighting = false;
				game.global.switchToMaps = false;
				mapsSwitch(true);
				return;
			}
		}
        if (cellNum == 99) {
			nextWorld();
			game.stats.zonesCleared.value++;
			checkAchieve("totalZones");
		}
        battle(true);
        return;
    }
	var cellAttack = calculateDamage(cell.attack);
	var badCrit = false;
	if (game.global.challengeActive == "Crushed"){
		if (checkCrushedCrit()) {
			cellAttack *= 5;
			badCrit = true;
		}
	}
    var attackAndBlock = (cellAttack - game.global.soldierCurrentBlock);
	if (game.global.brokenPlanet && !game.global.mapsActive){
		var overpower = (game.global.formation == 3) ? cellAttack * 0.1 : cellAttack * 0.2;
		if (attackAndBlock < overpower) attackAndBlock = overpower;
	}
	if (attackAndBlock < 0) attackAndBlock = 0;
	var trimpAttack = calculateDamage(game.global.soldierCurrentAttack, false, true);
	if (game.global.radioStacks > 0) trimpAttack *= (1 - (game.global.radioStacks * 0.1));
	if (game.global.antiStacks > 0) {
		trimpAttack *= ((game.global.antiStacks * game.portal.Anticipation.level * game.portal.Anticipation.modifier) + 1);
		updateAntiStacks();
	}
	if (game.global.titimpLeft >= 1){
		trimpAttack *= 2;
	}
	if (!game.global.mapsActive && game.global.mapBonus > 0){
		trimpAttack *= ((game.global.mapBonus * .2) + 1);
	}
	updateTitimp();
	var gotCrit = false;
	var critSpan = document.getElementById("critSpan");
	critSpan.innerHTML = "";
	if (game.portal.Relentlessness.level > 0){
		if (Math.floor(Math.random() * (1 / (game.portal.Relentlessness.modifier * game.portal.Relentlessness.level))) == 1){
			trimpAttack += (trimpAttack * ((game.portal.Relentlessness.otherModifier * game.portal.Relentlessness.level) + 1));
			gotCrit = true;
		}
	}
	var attacked = false;
	var wasAttacked = false;
    if (game.global.challengeActive == "Slow" || (game.badGuys[cell.name].fast && game.global.challengeActive != "Coordinate" && game.global.challengeActive != "Nom")) {
        game.global.soldierHealth -= attackAndBlock;
		wasAttacked = true;
        if (game.global.soldierHealth > 0) {
			cell.health -= trimpAttack;
			attacked = true;
		}
        else {
            game.global.soldierHealth = 0;
			gotCrit = false;
		}
        if (cell.health <= 0) {cell.health = 0; 
		//fight(makeUp); return;
		}
    }
	else {
        cell.health -= trimpAttack;
		
		attacked = true;
        if (cell.health > 0) {
			game.global.soldierHealth -= attackAndBlock;
			wasAttacked = true;
		}
        else
            {
				cell.health = 0; 
				//fight(makeUp); return;
			}
        if (game.global.soldierHealth < 0) game.global.soldierHealth = 0;
    }
	if ((game.global.challengeActive == "Electricity" || game.global.challengeActive == "Mapocalypse") && attacked){
		game.global.soldierHealth -= game.global.soldierHealthMax * (game.global.radioStacks * 0.1);
		if (game.global.soldierHealth < 0) game.global.soldierHealth = 0;
	}
	if ((game.global.challengeActive == "Electricity" || game.global.challengeActive == "Mapocalypse") && wasAttacked){
		game.global.radioStacks++;
		updateRadioStacks();
	}
	if (game.global.challengeActive == "Toxicity" && attacked) {
		game.challenges.Toxicity.stacks++;
		if (game.challenges.Toxicity.stacks > game.challenges.Toxicity.maxStacks) game.challenges.Toxicity.stacks = game.challenges.Toxicity.maxStacks;			
		updateToxicityStacks();
	}
	if ((game.global.challengeActive == "Nom" || game.global.challengeActive == "Toxicity") && attacked){
		game.global.soldierHealth -= game.global.soldierHealthMax * 0.05;
		if (game.global.soldierHealth < 0) game.global.soldierHealth = 0;
	}	
	if (gotCrit) critSpan.innerHTML = "Crit!";
	document.getElementById("badCrit").innerHTML = (badCrit && wasAttacked) ? "Crit!" : "";
    if (cell.health <= 0) game.global.battleCounter = 800;
    if (makeUp) return;
    updateGoodBar();
	updateBadBar(cell);
    
    /*	if (game.jobs.Medic.owned >= 1) setTimeout(heal, 500); */
}

function updateToxicityStacks(){
	var elem = document.getElementById("toxicityBuff");
	var stackCount = game.challenges.Toxicity.stacks;
	if (elem === null) {
		document.getElementById("badGuyName").innerHTML += '&nbsp;<span class="badge badBadge" id="toxicityBuff" onmouseover="tooltip(\'Toxic\', null, event)" onmouseout="tooltip(\'hide\')"><span id="toxicityStacks">' + stackCount + '</span><span class="icomoon icon-radioactive"></span></span>';
		return;
	}
	document.getElementById("toxicityStacks").innerHTML = stackCount;
}

function checkCrushedCrit(){
	var badCrit = false;
	var canCritElem = document.getElementById("badCanCrit");
	if (game.global.soldierHealth > game.global.soldierCurrentBlock){
		canCritElem.style.display = "inline-block";
		if (Math.floor(Math.random() * 2) == 0) badCrit = true;
	}
	else canCritElem.style.display = "none";
	return badCrit;
}

function updateRadioStacks(tipOnly){
	var elem = document.getElementById("debuffSpan");
	if (game.global.radioStacks > 0){
		var number = game.global.radioStacks * 10;
		var addText = 'Your Trimps are dealing ' + number + '% less damage and taking ' + number + '% of their total health as damage per attack.';
		elem.innerHTML = '<span class="badge trimpBadge" onmouseover="tooltip(\'Electrified\', \'customText\', event, \'' + addText + '\'); updateRadioTip()" onmouseout="tooltip(\'hide\')">' + game.global.radioStacks + '<span class="icomoon icon-power"></span></span>';
		if (tipOnly){
			document.getElementById('tipText').innerHTML = addText;
			return;
		}
		document.getElementById("goodGuyAttack").innerHTML = calculateDamage(game.global.soldierCurrentAttack, true, true);
	}
	else elem.innerHTML = "";
}

function updateRadioTip(){
	tooltipUpdateFunction = function () {
		updateRadioStacks(true);
	};
}

function updateAntiStacks(){
	var elem = document.getElementById("anticipationSpan");
	if (game.global.antiStacks > 0){
		var number = ((game.global.antiStacks * game.portal.Anticipation.level * game.portal.Anticipation.modifier));
		number = Math.floor(number * 100);
		elem.innerHTML = '<span class="badge antiBadge" onmouseover="tooltip(\'Anticipation\', \'customText\', event, \'Your Trimps are dealing ' + number + '% extra damage for taking ' + game.global.antiStacks + ' seconds to populate.\')" onmouseout="tooltip(\'hide\')">' + game.global.antiStacks + '<span class="icomoon icon-target2"></span></span>';
	}
	else elem.innerHTML = "";
}

function updateTitimp(){
	var elem = document.getElementById("titimpBuff");
	if (game.global.titimpLeft < 1){
		elem.innerHTML = "";
		return;
	}
		var number = Math.floor(game.global.titimpLeft);
		elem.innerHTML = '<span class="badge antiBadge" onmouseover="tooltip(\'Titimp\', \'customText\', event, \'Your Trimps are dealing double damage, thanks to the Titimp!\');" onmouseout="tooltip(\'hide\')">' + number + '<span class="icomoon icon-hammer"></span></span>';
}

function updateNomStacks(number){
	var elem = document.getElementById('nomStack');
	if (elem == null){
		document.getElementById('badGuyName').innerHTML += ' <span class="badge badBadge" onmouseover="tooltip(\'Nom\', \'customText\', event, \'This Bad Guy is nice and plump from eating Trimps. Increases attack damage by 25% per stack\');" onmouseout="tooltip(\'hide\')"><span id="nomStack">' + number + '</span><span class="glyphicon glyphicon-scale"></span></span>';
	}
	else elem.innerHTML = number;
}

/* function heal() {
	var medics = game.jobs.Medic;
	if (game.global.soldierHealth > 0)
	game.global.soldierHealth += (medics.owned * medics.modifier);
	if (game.global.soldierHealth > game.global.soldierHealthMax) game.global.soldierHealth = game.global.soldierHealthMax;
	updateGoodBar();
} */

function buyEquipment(what) {
	if (game.options.menu.pauseGame.enabled) return;
	if (game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) return;
	var toBuy = game.equipment[what];
	if (typeof toBuy === 'undefined') return;
	var canAfford = canAffordBuilding(what, null, null, true);
	if (canAfford) {
		canAffordBuilding(what, true, null, true);
		levelEquipment(what);
	}
	tooltip(what, "equipment", "update");	
}

function levelEquipment(what, manualNumber) {
	var toBuy = game.equipment[what];
	var number = (manualNumber) ? manualNumber : game.global.buyAmt;
	toBuy.level += number;
	var stat;
	if (toBuy.blockNow) stat = "block";
	else stat = (typeof toBuy.health !== 'undefined') ? "health" : "attack";
	var toAdd = (toBuy[stat + "Calculated"] * number);
	game.global[stat] += toAdd;
	game.global.difs[stat] += toAdd;
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
	if (typeof game.options.menu.fadeIns && game.options.menu.fadeIns.enabled == 0) {
		elem.style.opacity = 1;
		return;
	}
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

function planetBreaker(){
	if (game.global.roboTrimpLevel > 0) document.getElementById("chainHolder").style.visibility = "visible";
	game.stats.planetsBroken.valueTotal++;
	game.global.brokenPlanet = true;
	document.getElementById("wrapper").style.background = "url(css/bg2_vert.png) center repeat-y";
	document.getElementById("extraGridInfoTitle").innerHTML = "The Improbability";
	document.getElementById("extraGridInfoSummary").innerHTML = "That shouldn't have happened. There should have been a Blimp there. Something is growing unstable.";
	document.getElementById("extraGridInfoSub").innerHTML = "Trimp breed speed reduced by a factor of 10. 20% of enemy damage can now penetrate your block. You have unlocked a new upgrade to learn a Formation. Helium harvested per zone is increased by a factor of 5. Equipment cost is dramatically cheaper. You have access to the 'Trimp' challenge!";
	document.getElementById("extraGridInfo").style.display = "block";
	document.getElementById("grid").style.display = "none";
	game.global.prestige.cost = 53;
	document.getElementById("upgradesHere").innerHTML = "";
	for (var item in game.equipment){
		prestigeEquipment(item, true, true);
	}
	unlockUpgrade("Formations");
}

function restoreGrid(){
	document.getElementById("extraGridInfo").style.display = "none";
	document.getElementById("grid").style.display = "block";
}

function setFormation(what) {
	if (what) {
		what = parseInt(what, 10);
		document.getElementById("formation" + game.global.formation).style.backgroundColor = "grey";
		if (game.global.fighting && game.global.soldierHealth > 0) {
			var health = 1;
			var block = 1;
			var attack = 1;
			switch (game.global.formation){
				case 1: 
					health /= 4;
					attack *= 2;
					block *= 2;
					break;
				case 2:
					health *= 2;
					attack /= 4;
					block *= 2;
					break;
				case 3:
					health *= 2;
					attack *= 2;
					block /= 4;
					break;
			}
			switch (what){
				case 1:
					health *= 4;
					attack /= 2;
					block /= 2;
					break;
				case 2:
					health /= 2;
					attack *= 4;
					block /= 2;
					break;
				case 3:
					health /= 2;
					attack /= 2;
					block *= 4;
					break;
			}
			var oldHealth = game.global.soldierHealthMax;
			game.global.soldierHealthMax *= health;
			game.global.soldierHealth -= oldHealth - game.global.soldierHealthMax;
			if (game.global.soldierHealth <= 0) game.global.soldierHealth = 0;
			game.global.soldierCurrentBlock *= block;
			game.global.soldierCurrentAttack *= attack;
			updateAllBattleNumbers(true);
		}
		game.global.formation = what;
	}
	else document.getElementById("formation0").style.backgroundColor = "grey";
	var toSet = (what) ? what : game.global.formation;
	document.getElementById("formation" + toSet).style.backgroundColor = "#5cb85c";
}

function unlockFormation(what){
	if (what == "start" || (what == "all" && game.upgrades.Formations.done == 1)){
		document.getElementById("formation0").style.display = "block";
		document.getElementById("formation1").style.display = "block";
	}
	if (what == 2 || (what == "all" && game.upgrades.Dominance.done == 1)){
		document.getElementById("formation2").style.display = "block";
	}
	if (what == 3 || (what == "all" && game.upgrades.Barrier.done == 1)){
		document.getElementById("formation3").style.display = "block";
	}
}

function hideFormations() {
	for (var x = 0; x < 4; x++){
		document.getElementById("formation" + x).style.display = "none";
	}
}

//Bones

var boneTemp = {
	selectedBoost: 0,
	selectedImport: "",
	selectedMisc: "",
	bundle: [],
	bundleMode: false
};

function showBones() {
	document.getElementById("boneWrapper").style.display = "block";
	selectBoost(0);
	updateBones();
	boneTemp.selectedImport = "";
	updateImports(0);
	hidePurchaseBones();
	boneTemp.bundle = [];
	if (game.global.totalPortals === 0) 
		document.getElementById("buyHeliumArea").style.display = "none";
	else
		document.getElementById("buyHeliumArea").style.display = "block";
	updateImportButton("First, select an Imp", false);
	if (game.unlocks.goldMaps) {
		document.getElementById("mapsPurchaseBtn").style.backgroundColor = "grey";
		document.getElementById("goldMapsDesc").innerHTML = "This bonus is active!";
	}
	if (game.unlocks.quickTrimps) {
		document.getElementById("trimpsPurchaseBtn").style.backgroundColor = "grey";
		document.getElementById("quickTrimpsDesc").innerHTML = "This bonus is active!";
	}
	document.getElementById("heliumGainedMisc").innerHTML = prettify(boostHe(true));
	if (typeof kongregate === 'undefined') return;
	if (countUnpurchasedImports() < 4) {
		document.getElementById("bundleRow").style.display = "none";
		document.getElementById("getBundleBtn").style.display = "none";
	}
}

function updateImportButton(text, enabled){
	var elem = document.getElementById("importPurchaseBtn");
	elem.innerHTML = text + " (50 bones)";
	elem.style.backgroundColor = enabled ? "#337ab7" : "grey";
}

function updateImports(which) {
	var count = 0;
	var world = document.getElementById("importsTableWorld" + which);
	var maps = document.getElementById("importsTableMaps" + which);
	world.innerHTML = "";
	maps.innerHTML = "";
	for (var item in game.unlocks.imps){
		var badGuy = game.badGuys[item];
		var elem = (badGuy.location == "World") ? world : maps;
		count++;
		var row = elem.insertRow();
		var toRun = (which == 1) ? 'addToBundle' : 'selectImp';
		toRun += '("' + item + '")';
		if (game.unlocks.imps[item]){
			row.style.backgroundColor = "green";
			row.style.color = "white";
		}
		else
		row.setAttribute('onclick', toRun);
		row.id = (which == 1) ? item + "1" : item;
		var name = row.insertCell();
		name.className = "importPreviewName";
		name.innerHTML = item;
		var loot = row.insertCell();
		loot.className = "importPreviewLoot";
		loot.innerHTML = badGuy.dropDesc;
	}
}

function selectImp(name){
	if (boneTemp.selectedImport) document.getElementById(boneTemp.selectedImport).className = "";
	document.getElementById(name).className = "tealColor";
	boneTemp.selectedImport = name;
	updateImportButton("Buy " + name, true);

}


function hideBones() {
	document.getElementById("boneWrapper").style.display = "none";
	updateSkeleBtn();
}

function simpleSeconds(what, seconds) {
		var compatible = ["Farmer", "Lumberjack", "Miner", "Dragimp", "Explorer"];
		var job;
		switch (what) {
			case "food": 
				job = "Farmer";
				break;
			case "wood":
				job = "Lumberjack";
				break;
			case "metal":
				job = "Miner";
				break;
			case "gems":
				job = "Dragimp";
				break;
			case "fragments":
				job = "Explorer";
				break;
			case "science":
				job = "Scientist";
				break;
		}
		job = game.jobs[job];
		var amt = job.owned * job.modifier * seconds;
		amt += (amt * game.portal.Motivation.level * game.portal.Motivation.modifier);
		if (game.portal.Meditation.level > 0) amt *= (1 + (game.portal.Meditation.getBonusPercent() * 0.01)).toFixed(2);
		if (game.global.challengeActive == "Toxicity"){
			var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
			amt *= (1 + toxMult);
		}
		if (game.global.playerGathering == what){		
			if (game.global.turkimpTimer > 0 && (what == "food" || what == "metal" || what == "wood")){
				amt *= 1.5;
			}
			amt += game.global.playerModifier;
		}
		return amt;
}

function scaleToCurrentMap(amt) {
    var map = getCurrentMapObject();
	var world = map.level;
		if (world < game.global.world){
			//-20% loot compounding for each level below world
			amt *= Math.pow(0.8, (game.global.world - world));
		}
		//Add map loot bonus
		amt = Math.round(amt * map.loot);
		if (game.unlocks.impCount.Magnimp) amt *= Math.pow(1.003, game.unlocks.impCount.Magnimp);
		if (game.portal.Looting.level) amt += (amt * game.portal.Looting.level * game.portal.Looting.modifier);
		return amt;
}

//12 - 43200
//36 - 129600
function addBoost(level, previewOnly) {
	var compatible = ["Farmer", "Lumberjack", "Miner", "Dragimp", "Explorer"];
	var storage = ["Barn", "Shed", "Forge"];
	var add = 43200;
	if (level == 1) add *= 3;
	for (var x = 0; x < compatible.length; x++){
		var job = game.jobs[compatible[x]];
		var resource = game.resources[job.increase];
		var amt = job.owned * job.modifier * add;
		amt += (amt * game.portal.Motivation.level * game.portal.Motivation.modifier);
		if (game.portal.Meditation.level > 0) amt *= (1 + (game.portal.Meditation.getBonusPercent() * 0.01)).toFixed(2);
		if (game.global.challengeActive == "Toxicity"){
			var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
			amt *= (1 + toxMult);
		}
		if (typeof storage[x] !== 'undefined'){
			var tempTotal = amt + resource.owned;
			var tempMax = resource.max;
			var structCount = 0;
			var storageBuilding = game.buildings[storage[x]];
			var packMod = game.portal.Packrat.level * game.portal.Packrat.modifier;
			while (tempTotal > (tempMax + (tempMax * packMod))){
				var nextCost = calculatePercentageBuildingCost(storage[x], job.increase, 0.25, tempMax);
				if (!previewOnly){
					resource.max *= 2;
					storageBuilding.purchased++;
					storageBuilding.owned++;
				}
				tempMax *= 2;
				tempTotal -= nextCost;
				amt -= nextCost;
				structCount++;
			}
			document.getElementById(storage[x] + "Added").innerHTML = structCount;
		}
		if (amt < 0) toggleMinusRes(true);
		if (!previewOnly) resource.owned += amt;
		if (!previewOnly && job.increase == "gems"){
			game.stats.gemsCollected.value += amt;
			checkAchieve("totalGems");
		}
		document.getElementById(job.increase + "BoostPreview").innerHTML = prettify(amt);
	}
}

function toggleMinusRes(on){
	document.getElementById("minusRes").style.display = (on) ? "block" : "none";
	document.getElementById("boostPreview").style.display = (on) ? "none" : "table";
}

function selectBoost(num){
	toggleMinusRes();
	addBoost(num, true);
	var other = (num === 0) ? 1 : 0;
	document.getElementById("boost" + other).style.backgroundColor = "grey";
	document.getElementById("boost" + num).style.backgroundColor = "#318696";
}

function purchaseBoost(num){
	var cost = (num === 0) ? 20 : 40;
	if (game.global.b < cost) {showPurchaseBones(); return;}
	game.global.b -= cost;
	updateBones();
	addBoost(num);
	addBoost(num, true);
	successPurchaseFlavor();
	try{
		if (typeof ga !== 'undefined') ga('send', 'event', 'MTX', 'Boost' + num);
			}
		catch(err){
			console.debug(err);
		}
}

function checkBundleForImp(what, justHighlight){
	for (var x = 0; x < boneTemp.bundle.length; x++) {
		if (boneTemp.bundle[x] == what) {
			if (!justHighlight) return true;
			document.getElementById("what").style.border = "2px solid green";
		}
	}
	return false;
}
//#337ab7
function addToBundle(what) {
	var bundleCount = boneTemp.bundle.length;
	var bundleBtn = document.getElementById("addBundleBtn");
	var bundleTitle = document.getElementById("bundleTitle");
	var bundleBtnColor;
	var bundleBtnText;
	var titleText;
	var rowColor;
	if (checkBundleForImp(what)){
		bundleCount--;
		rowColor = "";
		boneTemp.bundle.splice(boneTemp.bundle.indexOf(what), 1);
	}
	else {
		if (bundleCount == 4) return;
		boneTemp.bundle.push(what);
		bundleCount++;
		rowColor = "tealColor";
	}
	if (bundleCount == 4){
		bundleBtnColor = "#337ab7";
		bundleBtnText = 'Buy Bundle And 100 Bones (100 <span class="kredSpan"><img class="kredImg" src="imgs/kred_single.png"></img></span>)';
		titleText = "Everything seems to be in order here";
	}
	else{
		bundleBtnColor = "grey";
		bundleBtnText = "Select " + (4 - bundleCount) + " more Imps!";
		titleText = "Select " + (4 - bundleCount) + " Exotic Imports!";
	}
	bundleBtn.style.backgroundColor = bundleBtnColor;
	bundleBtn.innerHTML = bundleBtnText;
	bundleTitle.innerHTML = titleText;
	document.getElementById(what + "1").className = rowColor;
}

function purchaseBundleClicked(){
	if (boneTemp.bundle.length != 4) return;
	kredPurchase("0.imports");
}

function purchaseBundle(){
	game.global.b += 100;
	updateBones();
	boneTemp.selectedImport = "";
	for (var x = 0; x < boneTemp.bundle.length; x++){
		game.unlocks.imps[boneTemp.bundle[x]] = true;
	}
	updateImports(0);
	boneTemp.bundle = [];
}

function purchaseImport(){
	if (game.global.b < 50) {showPurchaseBones(); return;}
	if (!boneTemp.selectedImport) return;
	game.global.b -= 50;
	updateBones();
	game.unlocks.imps[boneTemp.selectedImport] = true;
	boneTemp.selectedImport = "";
	updateImports(0);
	boneTemp.bundle = [];
	updateImportButton("First, select an Imp", false);
	try{
	if (typeof ga !== 'undefined') ga('send', 'event', 'MTX', "Import");
		}
	catch(err){
		console.debug(err);
	}
}

function purchaseMisc(what){
	var cost;
	var result;
	switch (what){
		case "helium":
			if (game.global.b < 100) {showPurchaseBones(); return;}
			game.global.b -= 100;
			boostHe();
			break;
		case "maps":
			if (game.global.b < 20 || game.unlocks.goldMaps) {showPurchaseBones(); return;}
			game.global.b -= 20;
			buyGoldenMaps();
			break;
		case "trimps":
			if (game.global.b <20 || game.unlocks.quickTrimps) {showPurchaseBones(); return;}
			game.global.b -= 20;
			buyQuickTrimps();
			break;
	}
	updateBones();
	successPurchaseFlavor();
	if (game.unlocks.goldMaps) {
		document.getElementById("mapsPurchaseBtn").style.backgroundColor = "grey";
		document.getElementById("goldMapsDesc").innerHTML = "This bonus is active!";
	}
	if (game.unlocks.quickTrimps) {
		document.getElementById("trimpsPurchaseBtn").style.backgroundColor = "grey";
		document.getElementById("quickTrimpsDesc").innerHTML = "This bonus is active!";
	}
	try{
		if (typeof ga !== 'undefined') ga('send', 'event', 'MTX', what);
			}
		catch(err){
			console.debug(err);
		}
}


function resetOnePortalRewards() {
	if (game.unlocks.goldMaps) {
		document.getElementById("mapsPurchaseBtn").style.backgroundColor = "#337ab7";
		document.getElementById("goldMapsDesc").innerHTML = "All of your current and future maps will gain +100% loot <b>Until your next portal</b>";
	}
	if (game.unlocks.quickTrimps) {
		document.getElementById("trimpsPurchaseBtn").style.backgroundColor = "#337ab7";
		document.getElementById("quickTrimpsDesc").innerHTML = "All of your Trimps will breed 2x faster <br/><b>Until your next portal</b>";
	}
}

function successPurchaseFlavor(){
	document.getElementById("boneFlavorRow").innerHTML = "The Bone Trader takes the bones, casts a spell, then begins to make soup";
}

function updateBones() {
	document.getElementById("bonesOwned").innerHTML = prettify(game.global.b);
	updateSkeleBtn();
}

function boostHe(checkOnly) {
	var level = game.global.highestLevelCleared - 19;
	var amt = 30;
	if (!checkOnly) game.global.canRespecPerks = true;
	if (level <= 0) {
		if (checkOnly) return amt;
		game.global.heliumLeftover += amt;
		game.global.totalPortals++;
		displayPerksBtn();
		document.getElementById("pastUpgradesBtn").style.border = "1px solid red";
		return;
	}
	for (var x = 0; x < level; x++) {
		var tempAmt = 0;
		amt += Math.round(Math.pow(1.23, Math.sqrt(x + 1)));
		amt += (x + 1);
	}
	amt = (amt > game.global.bestHelium) ? amt : game.global.bestHelium;
	if (checkOnly) return amt;
	game.global.heliumLeftover += amt;
	game.global.totalHeliumEarned += amt;
	game.global.totalPortals++;
	displayPerksBtn();
	document.getElementById("pastUpgradesBtn").style.border = "1px solid red";
}

function buyGoldenMaps() {
	game.unlocks.goldMaps = true;
	for (var item in game.global.mapsOwnedArray){
		game.global.mapsOwnedArray[item].loot = parseFloat(game.global.mapsOwnedArray[item].loot) + 1;
		if (!game.global.mapsOwnedArray[item].noRecycle) document.getElementById(game.global.mapsOwnedArray[item].id).className += " goldMap"; //bug fix, was setting color previously
	}
}

function buyQuickTrimps() {
	game.unlocks.quickTrimps = true;
}

function countUnpurchasedImports(){
	var count = 0;
	for (var item in game.unlocks.imps){
		if (!game.unlocks.imps[item]) count++;
	}
	return count;
}

function showPurchaseBones() {
	document.getElementById("boneWrapper0").style.display = "none";
	document.getElementById("boneWrapper1").style.display = "block";
}

function hidePurchaseBones() {
	document.getElementById("boneWrapper0").style.display = "block";
	var elem1 = document.getElementById("boneWrapper1");
	if (elem1){
		elem1.style.display = "none";
		document.getElementById("boneWrapper2").style.display = "none";	
	}
}

function kredPurchase(what) {
	if (typeof kongregate === 'undefined') return;
	boneTemp.waitingFor = what;
	if (what == "0.imports" && boneTemp.bundle.length != 4) {
		hidePurchaseBones();
		document.getElementById("addToBundleRow").style.border = "1px solid green";
		return;
	}
	kongregate.mtx.purchaseItems([what], onPurchaseResult);
}

function startBundling(){
	document.getElementById("boneWrapper1").style.display = "none";
	document.getElementById("boneWrapper2").style.display = "block";
	document.getElementById("bundleTitle").innerHTML = "Select 4 Exotic Imports!";
	var btn = document.getElementById("addBundleBtn");
	btn.innerHTML = "First, Select 4 Imps";
	btn.style.backgroundColor = "grey";
	boneTemp.bundle = [];
	updateImports(1);
}

function onPurchaseResult(result) {
	if (!result.success)	{
		boneTemp.waitingFor = "";
		return;
	}
	if (result.success){
		var split = boneTemp.waitingFor.split('.');
		if (split[1] == "bones") game.global.b += parseInt(split[0], 10);
		if (split[1] == "imports") purchaseBundle();
		updateBones();
		hidePurchaseBones();
		var num = (split[0] > 0) ? split[0] : "";
		var tooltipText = "Your purchase of ";
		tooltipText += (split[0] > 0) ? split[0] + " bones has completed successfully!" : "the Exotic Imp-Ort Bundle has completed successfully, and your new bad guys will start spawning in your next zone/map!";  
		tooltipText += " Below is the export code for your save file. <b>Please copy, paste, and back this up to somewhere safe, just in case.</b> Thank you for your support!";
		tooltip('Export', null, 'update', tooltipText);
		boneTemp.waitingFor = "";
	}
}

function givePumpkimpLoot(){
	var elligible = ["food", "food", "food", "nothing", "nothing", "nothing", "nothing", "nothing", "wood", "metal", "science"];
	var success = [
		"Oops, that Pumpkimp just wanted to give you some candy. You found ",
		"When checking the Pumpkimp for loot, you find a pouch that says to take one. You take all ",
		"That Pumpkimp gave you ",
		"That Pumpkimp was so smashed that he gave you ",
		"You're not wearing a costume, but you'll still take this "];
	var failures = [
		"That Pumpkimp gave you nothing! What a jerk!",
		"As the Pumpkimp takes his final breath, he manages to mutter the word 'Trick'. No loot here.",
		"You search the Pumpkimp for loot, but find nothing. Someone wasn't in the holiday spirit!",
		"That Pumpkimp rolled away before you could finish him off, yelling stuff about tricks."];					
	if (game.jobs.Dragimp.owned > 0) elligible.push("gems");
	if (game.jobs.Explorer.locked == 0) elligible.push("fragments");
	var roll = Math.floor(Math.random() * elligible.length);
	var item = elligible[roll];
	if (item == "nothing") {
		var failNumber = Math.floor(Math.random() * failures.length);
		message(failures[failNumber], "Loot", "*magic-wand", "pumpkimp");
		return;
	}
	var seconds = Math.floor(Math.random() * 4);
	seconds++;
	var amt = simpleSeconds(item, seconds);
	if (game.global.mapsActive) amt = scaleToCurrentMap(amt);
	else if (game.portal.Looting.level) amt += (amt * game.portal.Looting.level * game.portal.Looting.modifier);
	addResCheckMax(item, amt);
	var messageNumber = Math.floor(Math.random() * success.length);
	message(success[messageNumber] + prettify(amt) + " " + item + "!", "Loot", "*magic-wand", "pumpkimp");		
}

function activateTurkimpPowers() {
	//15 mins = 900K ms
	//25 mins = 1.5M ms
	var timeToExpire = game.global.turkimpTimer;
	timeToExpire += 900000;
	if (timeToExpire > 1500000) timeToExpire = 1500000;
	game.global.turkimpTimer = timeToExpire;
	document.getElementById("turkimpBuff").style.display = "block";
	if (game.global.playerGathering) setGather(game.global.playerGathering);
	var possibilities = [
	"Yum, Turkimp! You eat some and put some in your pockets for later.",
	"You seem very happy to see that this land came with free food too! You gobble up some turkimp.",
	"You're quite grateful to finally eat some protein! You eat a bunch of Turkimp and find a Trimp to carry the rest back for you.",
	"Apparently your scientists are vegetarians. Hurray, more Turkimp for you!",
	"You hear a loud gobbling sound in the distance, it sounds angry. You disregard it because this Turkimp is delicious!",
	"Ah, Turkimp. Nature's version of a Chickimp with a weirder head. Sure is tasty! You eat your fill and save some for later."
	];
	var roll = Math.floor(Math.random() * possibilities.length);
	message(possibilities[roll], "Loot", "*spoon-knife", "turkimp");
	
}

function givePresimptLoot(){
	var elligible = ["food", "food", "food", "food", "wood", "wood", "wood", "wood", "metal", "metal", "metal", "metal", "bones"];
	var success = [
		"You hurriedly open up the Presimpt, and find ",
		"Ooh look, a Presimpt! You tear it open and receive ",
		"Nifty! That Presimpt was carrying around ",
		"Presimpts for everyone! Wait there's only one. Then Presimpt just for you! With ",
		"This Presimpt has little snowman markings all over it! Inside, you find "];			
	if (game.jobs.Dragimp.owned > 0) elligible.push("gems", "gems", "gems", "gems");
	else elligible.push("food", "wood", "metal", "metal");
	if (game.jobs.Explorer.locked == 0) elligible.push("fragments", "fragments", "fragments");
	else elligible.push("food", "wood", "metal"); 
	var roll = Math.floor(Math.random() * elligible.length);
	var item = game.global.presimptStore;
	game.global.presimptStore = elligible[roll];
	if (item == "bones") {
		message("You shake the Presimpt before opening it, and can tell there's something special in this one. Yup! That thoughtful Presimpt gave you a perfectly preserved bone!", "Loot", "*gift", "presimpt presimptBones");
		game.global.b++;
		updateSkeleBtn();
		return;
	}
	var randomBoost = Math.floor(Math.random() * 3) + 2;
	var amt = rewardResource(item, randomBoost, (game.global.lastClearedCell + 1));
	var messageNumber = Math.floor(Math.random() * success.length);
	message(success[messageNumber] + prettify(amt) + " " + item + "!", "Loot", "*gift", "presimpt");
}

function updateTurkimpTime() {
	game.global.turkimpTimer -= 100;
	var timeRemaining = game.global.turkimpTimer;
	if (timeRemaining <= 0) {
		game.global.turkimpTimer = 0;
		document.getElementById("turkimpBuff").style.display = "none";
		if (game.global.playerGathering) setGather(game.global.playerGathering);
	}
	timeRemaining /= 1000;
	var mins = Math.floor(timeRemaining / 60);
	var seconds = Math.ceil(timeRemaining % 60);
	if (seconds <= 9) seconds = "0" + seconds;
	if (seconds == 60){
		seconds = "00";
		mins++;
	}
	if (mins < 10) mins = "0" + mins;
	document.getElementById("turkimpTime").innerHTML = mins + ":" + seconds;
}

function formatMinutesForDescriptions(number){
	var text;
	var minutes = Math.round(number % 60);
	var hours = Math.floor(number / 60);
	if (hours == 0) text = minutes + " minutes";
	else if (minutes > 0) {
		if (minutes < 10) minutes = "0" + minutes;
		text = hours + ":" + minutes;
	}
	else {
		var s = (hours > 1) ? "s" : "";
		text = hours + " hour" + s;
	}
	return text;
}

function getMinutesThisPortal(){
	var timeSince = new Date().getTime() - game.global.portalTime;
	timeSince /= 1000;
	return Math.round(timeSince / 60);
}

function gameLoop(makeUp, now) {
/*	if (now < game.global.lastOfflineProgress) return;
	game.global.lastOnline = now; get4432*/
    gather(makeUp);
    craftBuildings();
	if (game.global.trapBuildToggled && game.global.trapBuildAllowed && game.global.buildingsQueue.length === 0) autoTrap();
    breed(makeUp);
    battleCoordinator(makeUp);
	if (game.global.titimpLeft) game.global.titimpLeft -= 0.1;
}

//Timeouts
function costUpdatesTimeout() {
	checkButtons("buildings");
    checkButtons("jobs");
    checkButtons("equipment");
    checkButtons("upgrades");
    checkTriggers();
	if (tooltipUpdateFunction) tooltipUpdateFunction();
	setTimeout(costUpdatesTimeout, 250);
}

function gameTimeout() {
	if (game.options.menu.pauseGame.enabled) return;
	var now = new Date().getTime();
	//4432
	if ((now - game.global.start - game.global.time) > 3600000){
		checkOfflineProgress();
		game.global.start = now;
		game.global.time = 0;
		game.global.lastOnline = now;
		setTimeout(gameTimeout(), (1000 / game.settings.speed));
		return;
	}
	game.global.lastOnline = now;
    var tick = 1000 / game.settings.speed;
    game.global.time += tick;
    var dif = (now - game.global.start) - game.global.time;
    while (dif >= tick) {
        gameLoop(true, now);
        dif -= tick;
        game.global.time += tick;
		ctrlPressed = false;
    }
    gameLoop(null, now);
    updateLabels();
    setTimeout(gameTimeout, (tick - dif));
}


function updatePortalTimer() {
	if (game.global.portalTime < 0) return;
	var timeSince = new Date().getTime() - game.global.portalTime;
	if (game.options.menu.pauseGame.enabled) timeSince -= new Date().getTime() - game.options.menu.pauseGame.timeAtPause;
	timeSince /= 1000;
	var days = Math.floor(timeSince / 86400);
	var hours = Math.floor( timeSince / 3600) % 24;
	var minutes = Math.floor(timeSince / 60) % 60;
	var seconds = Math.floor(timeSince % 60);
	var timeArray = [days, hours, minutes, seconds];
	var timeString = "";
	for (var x = 0; x < 4; x++){
		var thisTime = timeArray[x];
		thisTime = thisTime.toString();
		timeString += (thisTime.length < 2) ? "0" + thisTime : thisTime;
		if (x != 3) timeString += ":";
	}
	if (game.options.menu.pauseGame.enabled) timeString = "<span style='color: red; font-size: 0.9em;'>" + timeString + " (PAUSED)</span>";
	document.getElementById("portalTimer").innerHTML = timeString;
	checkAchieve("totalGems");
	if (trimpStatsDisplayed) displayAllStats();
	if (game.options.menu.useAverages.enabled && Math.floor(timeSince % 3) == 0) curateAvgs();
	setTimeout(updatePortalTimer, 1000);
}

var shiftPressed = false;
var ctrlPressed = false;
// X = 88, h = 72, d = 68, b = 66
document.addEventListener('keydown', function(e) {
	switch(e.keyCode){
		case 27:
			cancelTooltip();
			break;
		case 16:
			shiftPressed = true;
			break;
		case 17:
		case 224: 
		case 91:
		case 93:
			ctrlPressed = true;
			break;
		case 49:
		case 88:
		case 97:
			if (!game.global.preMapsActive && game.upgrades.Formations.done && !game.global.lockTooltip && !ctrlPressed) setFormation('0');
			break;
		case 50:
		case 72:
		case 98:
			if (!game.global.preMapsActive && game.upgrades.Formations.done && !game.global.lockTooltip && !ctrlPressed) setFormation('1');
			break;
		case 51:
		case 68:
		case 99:
			if (!game.global.preMapsActive && game.upgrades.Dominance.done && !game.global.lockTooltip && !ctrlPressed) setFormation('2');
			break;
		case 52:
		case 66:
		case 100:
			if (!game.global.preMapsActive && game.upgrades.Barrier.done && !game.global.lockTooltip && !ctrlPressed) setFormation('3');
			break;
		case 13:
			if (customUp == 1) numTab(5, false);
			else if (customUp == 2) numTab(5, true);
	}
}, true);
document.addEventListener('keyup', function(e) {
	if (e.keyCode == 16){
		if (game.options.menu.tooltips.enabled == false) cancelTooltip();
		shiftPressed = false;	
	}
	if (e.keyCode == 17 || e.keyCode == 224 || e.keyCode == 91 || e.keyCode == 93){
		ctrlPressed = false;
	}

}, true);


load();
updatePortalTimer();
displayPerksBtn();

setTimeout(autoSave, 60000);
costUpdatesTimeout();
setTimeout(gameTimeout(), (1000 / game.settings.speed));





