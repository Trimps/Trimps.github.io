//Contact me via Kongregate as GreenSatellite, reddit on /r/Trimps, or Email at trimpsgame@gmail.com
//This UI layout was made possible by bootstrap http://www.getbootstrap.com, and the icons are from Glyphicons http://www.glyphicons.com and Icomoon https://icomoon.io
//If you want to learn how to make javascript games, this is the short tutorial that got me started: http://dhmholley.co.uk/incrementals.html

/*		Trimps
		Copyright (C) 2016 Zach Hood

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

function autoSave() {
    if (game.options.menu.autoSave.enabled) save();
    setTimeout(autoSave, 60000);
}

var lastOnlineSave = -1800000;
var isSaving = false;
function save(exportThis, fromManual) {
	isSaving = true;
    var saveString = JSON.stringify(game);
    var saveGame = JSON.parse(saveString);
	isSaving = false;
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
		delete saveGame.buildings.origTime;
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
		delete portal.additiveInc;
	}
	for (var itemS in saveGame.options.menu){
		var settingItem = saveGame.options.menu[itemS];
		delete settingItem.description;
		delete settingItem.titles;
		delete settingItem.locked;
		delete settingItem.secondLocation;
		delete settingItem.extraTags;
	}
	for (var itemF in saveGame.challenges){
		var challenge = saveGame.challenges[itemF];
		delete challenge.unlockString;
		delete challenge.squaredDescription;
		delete challenge.replaceSquareFreq;
		delete challenge.replaceSquareReward;
		delete challenge.replaceSquareThresh;
		delete challenge.replaceSquareGrowth;
		delete challenge.description;
	}
	for (var itemG in saveGame.achievements){
		var achievement = saveGame.achievements[itemG];
		delete achievement.tiers;
		delete achievement.breakpoints;
		delete achievement.names;
		delete achievement.descriptions;
		delete achievement.title;
		delete achievement.icon;
		delete achievement.newStuff;
		delete achievement.filters;
	}
	delete saveGame.heirlooms.values;
	delete saveGame.heirlooms.defaultSteps;
	delete saveGame.heirlooms.rarityNames;
	delete saveGame.heirlooms.rarities;
	delete saveGame.heirlooms.rarityBreakpoints;
	for (var itemHT in saveGame.heirlooms){
		for (var itemHI in saveGame.heirlooms[itemHT]){
			var heirloom = saveGame.heirlooms[itemHT][itemHI];
			delete heirloom.name;
			delete heirloom.steps;
		}
	}
	for (var itemTL in saveGame.talents){
		var talent = saveGame.talents[itemTL];
		delete talent.icon;
		delete talent.description;
		delete talent.tier;
		delete talent.requires;
		delete talent.name;
	}
	for (var itemGU in saveGame.generatorUpgrades){
		var genUp = saveGame.generatorUpgrades[itemGU];
		delete genUp.base;
		delete genUp.baseCost;
		delete genUp.baseIncrease;
	}
	for (var itemPGU in saveGame.permanentGeneratorUpgrades){
		var genUp = saveGame.permanentGeneratorUpgrades[itemPGU];
		delete genUp.description;
		delete genUp.cost;
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
	catch(e){ 
		if(e.name == "NS_ERROR_FILE_CORRUPTED") {
        message("Sorry, it looks like your browser storage has been corrupted. Please clear your storage by going to Tools -> Clear Recent History -> Cookies and set time range to 'Everything'. This will remove the corrupted browser storage across all sites.", "Notices");
		}
		else
		message("For some reason, your game is not saving. Make sure you export and back up your save!", "Notices"); 
		}
		
	if (game.options.menu.usePlayFab.enabled == 1 && playFabId){
		var timeSinceSave = performance.now() - lastOnlineSave;
		if (timeSinceSave < 1800000 && !fromManual){
			return;
		}
		saveToPlayFab(saveString);
	}

}



function load(saveString, autoLoad, fromPf) {
    var savegame;
	var oldVersion = 0;
	var fromImport = false;
	if (saveString === true) fromImport = true
    if (saveString) {	
        savegame = JSON.parse(LZString.decompressFromBase64(((fromImport) ? document.getElementById("importBox").value.replace(/(\r\n|\n|\r|\s)/gm,"") : saveString)));
        tooltip('hide');
		if (!savegame) {
			message("It looks like your import code isn't working properly. Please make sure that your export code is saved in a text file compatible with all of the characters. If you believe this code should be working, you can Email it to Trimpsgame@gmail.com and I will do my best to restore it for you!", "Notices");
			return false;
		}
		else if (fromImport){
			game.options.menu.usePlayFab.enabled = 0;
			toggleSetting("usePlayFab", null, false, true);
			playFabId = -1;
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
			return false;
		}
        if (unparsedSave !== null) savegame = JSON.parse(LZString.decompressFromBase64(unparsedSave));
		else {
			tooltip("Welcome", null, "update");
			return false;
		}
    }
	if (typeof savegame === 'undefined' || savegame === null || typeof savegame.global === 'undefined') {
		tooltip("Welcome", null, "update");
		return false;
	}
	oldVersion = savegame.global.version;
	if (savegame.global.isBeta && !game.global.isBeta){
		message("You can't import a save from the beta version to this version!", "Notices");
		return false;
	}
	if (oldVersion > game.global.version) {
		message("Your save file is from a newer version of Trimps (v" + oldVersion + ") than what your computer is running (v" + game.global.version + "). Refresh or restart your browser!", "Notices");
		return false;
	}
	resetGame();
		
    if (game.global.killSavesBelow > oldVersion) {
		if (savegame.global.version == 0.07){
			game.global.kongBonusMode = true;
			activateKongBonus(savegame.global.world);
			return false;
		}
        message("I'm so terribly sorry, but your previous save game (version " + savegame.global.version + ") does not work in the new version. This should be the last reset!", "Notices");
        return false;
    } 
	else if (game.global.isBeta) {
		message("Note: You are playing on the beta/dev version. You will be unable to export your save from this version to the live version, and this server may go down or change without warning. Thank you for helping test!", "Notices");
		savegame.global.isBeta = true;
	}
	savegame.global.version = game.global.version;
	//Compatibility to new message filter config. Separated from other compatibility as it needs to go in to effect before game has the old booleans copied over it.
	if (oldVersion < 3.51){
		if (savegame.portal.Siphonology && !savegame.portal.Siphonology.locked) addNewSetting("siphonologyMapLevel");
		addNewSetting("timestamps");
		var oldMsg = savegame.global.messages;
		savegame.global.messages = game.global.messages;
		for (var item in oldMsg){
			savegame.global.messages.enabled = oldMsg[item];
		}
	}
	//Load global
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
	//Load the rest of the game.categories
    for (var a in game) { //global, resources, jobs, buildings, upgrades, triggers, equipment, settings, options
        if (a == "global") continue;
        if (a == "badGuys") continue;
        if (a == "worldUnlocks") continue;
        if (a == "mapConfig") continue;
		if (a == "options" && savegame.options){
			for (var itemO in savegame.options.menu){
				if (game.options.menu[itemO]) game.options.menu[itemO].enabled = savegame.options.menu[itemO].enabled;
			}
			if (typeof savegame.options.menu.GeneticistassistTarget !== 'undefined' && savegame.options.menu.GeneticistassistTarget.disableOnUnlock) game.options.menu.GeneticistassistTarget.disableOnUnlock = true;
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
					if (a == "heirlooms"){
						if (typeof botSave.currentBonus !== 'undefined')
							midGame[c].currentBonus = botSave.currentBonus;
						continue;
					}
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
	if (oldVersion < 2.9){
		if (game.options.menu.showFullBreed.enabled == 2) game.options.menu.showFullBreed.enabled = 1;
		if (game.global.totalPortals >= 5) message("Heavy use of the portal has created a chance for the Void to seep in to your world. Be alert.", "Story", null, "voidMessage");
	}
	if (oldVersion < 3){
		game.global.heirloomSeed = getRandomIntSeeded(game.global.voidSeed, 0, 1000000);
	}
	if (oldVersion < 3.1){
		game.global.heirloomBoneSeed = getRandomIntSeeded(game.global.heirloomSeed, 0, 1000000);
	}
	/* if (oldVersion < 3.11){
		game.global.eggSeed = getRandomIntSeeded(game.global.heirloomBoneSeed, 0, 1000000);
		cancelTooltip();
		noOfflineTooltip = true;
		tooltip("Eggs", null, 'update');	
	} */
	if (oldVersion < 3.2){
		game.global.researched = true;
	}
	if (oldVersion < 3.21){
		game.achievements.oneOffs.finished.push(false);
		game.achievements.oneOffs.filters.push(-1);
	}
	if (oldVersion < 3.22){
		if (game.global.totalPortals > 0) game.options.menu.extraMapBtns.enabled = 1;
	}
	if (oldVersion < 3.23){
		game.global.autoPrestiges = (game.global.autoPrestiges === true) ? 1 : 0;
		game.global.voidMaxLevel = game.global.highestLevelCleared;
	}
	if (oldVersion < 3.3){
		if (game.global.highestLevelCleared >= 59) game.global.autoUpgradesAvailable = true;
		if (game.global.sLevel >= 4) game.buildings.Warpstation.craftTime = 0;
	}
	if (oldVersion < 3.6){
		if (game.achievements.oneOffs.finished.length > 12)
			game.achievements.oneOffs.finished.splice(12, game.achievements.oneOffs.finished.length - 12);
		var newFinished = game.achievements.oneOffs.finished;
		var removed = newFinished.splice(10, 2);
		for (var x = 0; x < 12; x++) newFinished.push(false);
		newFinished.splice(18, 0, removed[0]);
		newFinished.splice(19, 0, removed[1]);
		game.achievements.oneOffs.finished = newFinished;
		addNewSetting("tinyButtons");
	}
	if (oldVersion < 3.7){
		game.global.messages.Loot.essence = true;
		if (game.global.highestLevelCleared >= 180) addNewSetting('masteryTab');
	}
	if (oldVersion < 3.71){
		checkAchieve("totalHelium");
	}
	if (oldVersion < 3.81){
		for (var x = 0; x < game.global.gridArray.length; x++){
			if (game.global.gridArray[x].corrupted) game.global.gridArray[x].mutation = "Corruption";
		}
	}
	if (oldVersion < 3.811){
		game.global.messages.Loot.events = true;
	}
	if (oldVersion < 4){
		if (game.global.world >= 230) game.global.canMagma = false;
		else if (game.global.highestLevelCleared > 229){
			game.global.highestLevelCleared = 229;
			if (game.global.roboTrimpLevel > 8)
				game.global.roboTrimpLevel = 8;
		}
		game.resources.trimps.potency = 0.0085;
		if (game.global.spentEssence > 0){
			for (var item in game.talents){
				game.talents[item].purchased = false;
				if (item == "foreman") continue;
				if (game.talents[item].purchased && typeof game.talents[item].onRespec === 'function') game.talents[item].onRespec();			
			}
			if (typeof savegame.talents.foreman !== 'undefined' && savegame.talents.foreman.purchased) game.global.autoCraftModifier -= 1250;
			if (typeof savegame.talents.foreman2 !== 'undefined' && savegame.talents.foreman2.purchased) game.global.autoCraftModifier -= 3750;
			game.global.essence += game.global.spentEssence;
			game.global.spentEssence = 0;
			message("Due to a rework of the current Masteries, all of your spent Dark Essence has been refunded for free! Don't forget to repurchase your Masteries!", "Notices");
			updateTalentNumbers();
		}
		game.global.messages.Loot.magma = true;
	}
	if (oldVersion < 4.01){
		game.global.messages.Loot.events = true;
		if (game.stats.trimpsGenerated.value > 0){
			game.global.trimpsGenerated = game.stats.trimpsGenerated.value;
			game.stats.trimpsGenerated.value = scaleNumberForBonusHousing(game.stats.trimpsGenerated.value);
		}
		if (game.stats.highestVoidMap.valueTotal > 230)
			game.stats.highestVoidMap.valueTotal = 230;
	}
	if (oldVersion < 4.1){
		game.achievements.humaneRun.earnable = false;
	}
	if (oldVersion < 4.2){
		if (game.global.highestLevelCleared > 64){
			tooltip("UnlockedChallenge2", null, 'update');
			noOfflineTooltip = true;
		}
	}
	if (oldVersion == 4.2){
		countChallengeSquaredReward();
	}
	if (oldVersion < 4.3){
		if (game.global.Geneticistassist)
			addNewSetting("geneSend");
		addNewSetting('fireForJobs');
		if (game.global.highestLevelCleared >= 59)
			addNewSetting('ctrlGigas');
		if (game.global.spentEssence > 0)
			respecTalents(false, true);
	}
	//End compatibility
	
	//Test server only
	//End test server only
	//Temporary until next patch
	if (!getCurrentMapObject()) {
		game.global.currentMapId = "";
		game.global.mapGridArray = []
		game.global.lastClearedMapCell = -1;
	}

	
    if (game.buildings.Gym.locked === 0) document.getElementById("blockDiv").style.visibility = "visible";
	
    if (game.global.gridArray.length > 0) {
        document.getElementById("battleContainer").style.visibility = "visible";
		fadeIn("equipmentTab", 10);
		fadeIn("equipmentTitleDiv", 10);
        drawGrid();
		if (game.global.world == 200 && !game.global.spireActive) clearSpireMetals();
        document.getElementById('metal').style.visibility = "visible";
        for (var x = 0; x <= game.global.lastClearedCell; x++) {
            swapClass("cellColor", "cellColorBeaten", document.getElementById("cell" + x));
        }
        if (game.global.battleClock > 0) document.getElementById("battleTimer").style.visibility = "visible";
    }
    if (game.global.mapGridArray.length > 0 && game.global.currentMapId !== "") {
        drawGrid(true);
        for (var y = 0; y <= game.global.lastClearedMapCell; y++) {
            swapClass("cellColor", "cellColorBeaten", document.getElementById("mapCell" + y));
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
		if (!game.global.messages[messageBool].enabled){
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
	toggleAutoStructure(true);
	toggleAutoGolden(true);
    setGather(game.global.playerGathering);
    numTab(1);
	if (!fromPf && game.options.menu.usePlayFab.enabled == 1) {
		game.options.menu.usePlayFab.enabled = 0;
		toggleSetting("usePlayFab", null, false, true);
		if (!enablePlayFab()) noOfflineTooltip = true;
	}
	if (fromPf){
		game.options.menu.usePlayFab.enabled = 1;
		toggleSetting("usePlayFab", null, false, true);
	}
	if (game.global.portalActive) {fadeIn("portalBtn", 10); fadeIn("helium", 10);}
	else if (game.resources.helium.owned > 0) fadeIn("helium", 10);
	if (game.jobs.Explorer.locked === 0) fadeIn("fragmentsPs", 10);
	if (game.buildings.Tribute.locked === 0) fadeIn("gemsPs", 10);
    if (game.global.autoCraftModifier > 0)
        document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 4) + " Foremen";
    if (game.global.fighting) startFight();
	if (!game.options.menu.pauseGame.enabled) {
		//If not paused and offline progress is enabled, run offline progress
		if (game.options.menu.offlineProgress.enabled)
			checkOfflineProgress(noOfflineTooltip);
		//If not paused and offline progress is disabled, fix clock
		else {
			game.global.portalTime += (new Date().getTime() - game.global.lastOnline);
		}
	}
	//If paused, set clock pulse
	else
		document.getElementById("portalTimer").className = "timerPaused";
	if (game.options.menu.darkTheme.enabled != 1) game.options.menu.darkTheme.onToggle();
	updateLabels();
	if (game.global.viewingUpgrades){
		viewPortalUpgrades();
		if (game.global.respecActive) respecPerks();
	}
	else game.global.respecActive = false;
	if (game.global.kongBonusMode) activateKongBonus();
	
	if (game.global.challengeActive && typeof game.challenges[game.global.challengeActive].onLoad !== 'undefined') game.challenges[game.global.challengeActive].onLoad();
	if (game.global.challengeActive != "Scientist") document.getElementById("scienceCollectBtn").style.display = "block";
	if (game.global.brokenPlanet) {
		document.getElementById("wrapper").style.background = "url(css/bg2_vert.png) center repeat-y";
		if (game.global.roboTrimpLevel > 0) displayRoboTrimp();
	}
	if (game.global.challengeActive == "Balance"){
		updateBalanceStacks();
	}
	if (game.global.spireActive) handleExitSpireBtn();
	game.options.displayed = false;
	game.options.menu.barOutlines.onToggle();
	game.options.menu.progressBars.onToggle();
	game.options.menu.autoSave.onToggle();
	game.options.menu.tinyButtons.onToggle();

	displayPerksBtn();
	displayGoldenUpgrades();
	if (game.global.highestLevelCleared >= 180) updateTalentNumbers();
	//3.6 bug fix
	if (getAchievementStrengthLevel() <= 0) {
		game.global.goldenUpgrades = 0;
		for (var item in game.goldenUpgrades){
			game.goldenUpgrades[item].currentBonus = 0;
		}
	}
	fireMode(true);

	if (game.global.autoUpgradesAvailable){
		document.getElementById("autoUpgradeBtn").style.display = "block";
		toggleAutoUpgrades(true);
	}
	if (game.global.autoStorageAvailable){
		document.getElementById("autoStorageBtn").style.display = "block";
		toggleAutoStorage(true);
	}
	unlockFormation("all");
	setFormation();
	toggleSetting("mapLoot", null, false, true);
	toggleSetting("repeatUntil", null, false, true);
	toggleSetting("exitTo", null, false, true);
	toggleSetting("repeatVoids", null, false, true);
	game.global.removingPerks = false;
	game.global.switchToMaps = false;

	if (game.global.voidBuff) setVoidBuffTooltip();
	if (game.upgrades.Gigastation.done >= 1) loadGigastations();
	checkChallengeSquaredAllowed();

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
	document.getElementById("tab5Text").innerHTML = "+" + prettify(game.global.lastCustomAmt);
	game.global.lastUnlock = 0;
	if (game.resources.gems.owned > 0) fadeIn("gems", 10);
	if (game.global.lastSkeletimp > 0) updateSkeleBtn();
	if (game.global.turkimpTimer > 0) document.getElementById("turkimpBuff").style.display = "block";
	if (game.global.totalPortals >= 5) document.getElementById("heirloomBtnContainer").style.display = "block";
	calculateAchievementBonus();
	if(game.global.firing)
		swapClass("fireBtn", "fireBtnFiring", document.getElementById("fireBtn"));
	else
		swapClass("fireBtn", "fireBtnNotFiring", document.getElementById("fireBtn"));	
	if(game.unlocks.quickTrimps)
		swapClass("psColor", "psColorOrange", document.getElementById("trimpsPs"));
	else
		swapClass("psColor", "psColorWhite", document.getElementById("trimpsPs"));
	return true;
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
		swapClass("shriekState", "shriekStateCooldown", elem);
		document.getElementById('roboTrimpTurnsLeft').innerHTML = game.global.roboTrimpCooldown;
	}
	else {
		document.getElementById('roboTrimpTurnsLeft').innerHTML = "";
		var swapIn = (game.global.useShriek) ? 'shriekStateEnabled' : 'shriekStateDisabled';
		swapClass("shriekState", swapIn, elem);
	}
}

function magnetoShriek() {
	if (game.global.roboTrimpCooldown > 0 || !game.global.roboTrimpLevel || game.global.world < 60) return;
	game.global.useShriek = !game.global.useShriek;
	displayRoboTrimp();
	if (game.global.useShriek && !game.global.mapsActive){
        var cell = game.global.gridArray[game.global.lastClearedCell + 1];
		if (cell.name == "Improbability" || cell.name  == "Omnipotrimp"){
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
	swapClass("dmgColor", "dmgColorWhite", document.getElementById("badGuyAttack"));
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
		if (mode == 'total' && typeof stat.valueTotal !== 'function' && typeof stat.value !== 'undefined' && !stat.noAdd) value += stat.value;
		if (!stat.noFormat) value = prettify(value);
		if (buildAll){
			document.getElementById("statCol" + column).innerHTML += '<div class="statContainer" id="stat' + item + 'Container"><span class="statTitle">' + stat.title + '</span><br/><span class="statValue" id="stat' + item + 'Value">' + value + '</span></div>'
			column++;
			if (column == 4) column = 1;
		}
		else {
			var elem = document.getElementById("stat" + item + "Value");
			if (elem && value) elem.innerHTML = value;
		}
	}
}

function countChallengeSquaredReward(){
	var reward = 0;
	for (var item in game.challenges){
		var challenge = game.challenges[item];
		if (!challenge.allowSquared) continue;
		reward += getIndividualSquaredReward(challenge);
	}
	game.global.totalSquaredReward = reward;
}

var squaredConfig = {
		rewardFreq: 10,
		rewardEach: 1,
		rewardGrowth: 1,
		thresh: 100,
}

function getIndividualSquaredReward(challenge, forceHighest){
	if (!forceHighest) forceHighest = challenge.highestSquared;
	if (forceHighest <= 1) return 0;
	var bonus = 0;
	var thresh = (challenge.replaceSquareThresh) ? challenge.replaceSquareThresh : squaredConfig.thresh;
	var reward = (challenge.replaceSquareReward) ? challenge.replaceSquareReward : squaredConfig.rewardEach;
	var rewardGrowth = (challenge.replaceSquareGrowth) ? challenge.replaceSquareGrowth : squaredConfig.rewardGrowth;
	var freq = (challenge.replaceSquareFreq) ? challenge.replaceSquareFreq : squaredConfig.rewardFreq;
	var addedBonuses = 0;
	var loops = Math.ceil(forceHighest / thresh);
	for (var x = 0; x < loops; x++){
		var count = (x == loops - 1) ? forceHighest - addedBonuses : thresh;
		addedBonuses += count - (count % freq);
		count = Math.floor(count / freq);
		bonus += count * ((rewardGrowth * x) + reward);
	}
	return Math.round(bonus);
}

var portalWindowOpen = false;
var challengeSquaredMode = false;
var savedBuyAmt = -1;
function portalClicked() {
	if (game.global.runningChallengeSquared && !game.global.challengeActive) game.global.runningChallengeSquared = false;
	challengeSquaredMode = false;
	portalWindowOpen = true;
	cancelTooltip();
	game.global.viewingUpgrades = false;
	game.global.respecActive = false;
	resetPresets();
	game.global.tempHighHelium = game.resources.helium.owned;
	game.resources.helium.respecMax = game.resources.helium.owned + game.global.heliumLeftover;
	game.resources.helium.totalSpentTemp = 0;
	document.getElementById("wrapper").style.display = "none";
	var bgColor = "";
	if (game.global.sLevel == 1) bgColor = "#00b386";
	else if (game.global.sLevel == 2) bgColor = "#3db0f8";
	else if (game.global.sLevel == 3) bgColor = "#2a6a93";
	else bgColor = "green";
	swapClass("portalMk", "portalMk" + (game.global.sLevel + 1), document.getElementById("portalWrapper"));
	fadeIn("portalWrapper", 10);
	var titleText = "Time Portal";
	if (game.global.sLevel >= 1) titleText += " Mk. " + romanNumeral(game.global.sLevel + 1);
	document.getElementById("portalTitle").innerHTML = titleText;
	document.getElementById("portalStory").innerHTML = "Well, you did it. You followed your instincts through this strange world, made your way through the Dimension of Anger, and obtained this portal. But why? Maybe there will be answers through this portal... Your scientists tell you they can overclock it to bring more memories and items back, but they'll need helium to cool it.";
	document.getElementById("portalHelium").innerHTML = '<span id="portalHeliumOwned">' + prettify(game.resources.helium.owned + game.global.heliumLeftover) + '</span> Helium';
	document.getElementById("totalHeliumEarned").innerHTML = prettify(game.global.totalHeliumEarned);
	document.getElementById("totalPortals").innerHTML = game.global.totalPortals;
	document.getElementById("activatePortalBtn").style.display = "inline-block";
	document.getElementById("activatePortalBtn").innerHTML = "Activate Portal";
	document.getElementById("challengeSquaredBonusAmt").innerHTML = prettify(game.global.totalSquaredReward);
	if (game.global.canRespecPerks) {
		document.getElementById("respecPortalBtn").innerHTML = "Respec";
		document.getElementById("respecPortalBtn").style.display = "inline-block";
	}
	document.getElementById('swapToCurrentChallengeBtn').style.display = (game.global.challengeActive) ? 'inline-block' : 'none';
	swapToCurrentChallenge(true);
	displayChallenges();
	savedBuyAmt = game.global.buyAmt;
	numTab(1, true);	
	game.global.buyAmt = 1;
	displayPortalUpgrades();
	game.global.removingPerks = false;
	if (game.global.canRespecPerks && game.global.totalPortals > 0)
		respecPerks();
}

function toggleChallengeSquared(){
	challengeSquaredMode = !challengeSquaredMode;
	displayChallenges();
}

function displayChallenges() {
	var challengeCount = 0;
	game.global.selectedChallenge = "";
	var challengesHere = document.getElementById("challengesHere");
	document.getElementById("specificChallengeDescription").innerHTML = "<br/><br/><br/>Click a challenge below to learn more about and/or run it!";
	var challengeHTML = '<div class="noselect pointer challengeThing thing" id="challenge0" onclick="selectChallenge(0)"><span class="thingName">None</span></div>';
	var firstFail = false;
	var extraClass = "";
	for (var what in game.challenges){
		var thisFail = false;
		var name = "";
		var challenge = game.challenges[what];
		if (challengeSquaredMode && !challenge.allowSquared) continue;
		if (!challenge.filter(true)) {
			if (firstFail || what == "Daily" || challengeSquaredMode) continue;
			firstFail = true;
			thisFail = true;
		}
		challengeCount++;
		var done = false;
		if (game.portal[game.challenges[what].unlocks]) done = (game.portal[game.challenges[what].unlocks].locked) ? false : true;
		else if (what == "Scientist" && game.global.sLevel > 0) {
			if (game.global.sLevel >= 4 && game.global.highestLevelCleared >= 129){
				name = "Scientist V";
				if (game.global.sLevel == 5) done = true;
			}
			else if (game.global.sLevel >= 3 && game.global.highestLevelCleared >= 109) {
				if (game.global.highestLevelCleared < 124 && game.global.sLevel == 4) {
					firstFail = false;
					thisFail = false;
				}
				name = (thisFail) ? "Scientist V" : "Scientist IV";
				if (game.global.sLevel == 4) done = true;
			}
			else if (game.global.sLevel >= 2 && game.global.highestLevelCleared >= 89){
				name = (thisFail) ? "Scientist IV" : "Scientist III";
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
		else if (what == "Decay") done = game.global.decayDone;
		else if (what == "Frugal") done = game.global.frugalDone;
		else if (what == "Slow") done = game.global.slowDone;
		done = (done) ? "finishedChallenge" : "";
		if (challenge.heliumThrough) done = "challengeRepeatable";
		if (challengeSquaredMode) done = "thingColorSquared";
		if (thisFail) done = "nextChallenge";
		if (!name) name = what;
		challengeHTML += '<div class="noselect pointer challengeThing thing ' + done + '" id="challenge' + what + '" onclick="selectChallenge(\'' + what + '\')"><span class="thingName">' + name + '</span></div>';
	}
	challengesHere.innerHTML = challengeHTML;
	if (challengeCount > 0) document.getElementById("challenges").style.display = "block";
	document.getElementById("flagMustRestart").style.display = "none";
	
}

function selectChallenge(what) {
	displayChallenges();
	document.getElementById("challenge" + what).className += " cBorderOn";
	document.getElementById('activatePortalBtn').style.display = 'inline-block';
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
	var desc = (challengeSquaredMode) ? game.challenges[what].squaredDescription + " " + getSpecialSquaredRewards(game.challenges[what]) : game.challenges[what].description;
	desc += "<b>";
	if (challengeSquaredMode) {
		var reward = getIndividualSquaredReward(game.challenges[what]);
		desc += " Your highest zone reached for this Challenge<sup>2</sup> is Z" + game.challenges[what].highestSquared + ", earning you " + prettify(reward) + "% extra attack and health, and " + prettify(reward / 10) + "% more Helium from all sources.";
	}
	else if (game.portal[game.challenges[what].unlocks]) desc += (game.portal[game.challenges[what].unlocks].locked) ? " You will also earn a new Perk!" : " You will not earn a new perk.";
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
	
	if (addChallenge !== null){
		addChallenge.innerHTML = "You have the <b>" + what + " Challenge</b> active.";
		addChallenge.className = (challengeSquaredMode) ? "colorSquared" : "";
	}
	if (what == "Daily") updateDailyClock();
}

function getScientistLevel() {
	if (game.global.sLevel == 0) return 1;
	if (game.global.highestLevelCleared >= 49 && game.global.sLevel == 1) return 2;
	if (game.global.highestLevelCleared >= 89 && game.global.sLevel == 2) return 3;
	if (game.global.highestLevelCleared >= 109 && game.global.sLevel == 3) return 4;
	if (game.global.highestLevelCleared >= 129 && game.global.sLevel >= 4) return 5;
	return 1;
}

function getScientistInfo(number, reward){
	switch (number){
		case 1: {
			return (reward) ? "start with 5000 Science, 100 Food, 100 Wood, 10 Traps, and 1 Foreman" : 11500;
		}
		case 2: {
			return (reward) ? "start with 5 Barns, 5 Sheds, 5 Forges, and T2 Equipment unlocked" : 8000;
		}
		case 3: {
			return (reward) ? "start with full Trimps and 200% player efficiency" : 1500;
		}
		case 4: {
			return (reward) ? "earn two levels of each prestige upgrade per map, unlock AutoPrestiges, and your Warpstations will build instantly, skipping the queue" : 70;
		}
		case 5: {
			return (reward) ? "permanently increase all helium found by 0.5% to the power of your current zone number. You'll also start with 1000% player efficiency and 50 Barns, Sheds, and Forges" : 1500;
		}
	}
}

function confirmAbandonChallenge(){
	if (game.global.challengeActive == "Daily"){
		tooltip("Finish Daily", null, 'update');
		return;
	}
	var text = "Are you sure you want to abandon this challenge?";
	if (game.global.challengeActive == 'Scientist') text += " <b>Abandoning this challenge will cause the portal to become unstable and start you from the beginning of this run. (You'll keep your permanent rewards like helium and perks)</b>"; 
	tooltip('confirm', null, 'update', text, 'abandonChallenge()', 'Abandon Challenge');
	if (game.global.challengeActive == "Scientist") document.getElementById("confirmTipCost").innerHTML += '<div class="btn btn-success" onclick="abandonChallenge(true); cancelTooltip()">Restart Challenge</div>';
}

function abandonChallenge(restart){
	var challengeName = game.global.challengeActive;
	var challenge = game.challenges[challengeName];
	if (game.global.runningChallengeSquared){
		fadeIn("helium", 10);
		if (game.global.world > game.challenges[game.global.challengeActive].highestSquared)
			game.challenges[game.global.challengeActive].highestSquared = game.global.world;
		countChallengeSquaredReward();
	}
	game.global.runningChallengeSquared = false;
	game.global.challengeActive = "";
	if (challenge.fireAbandon && typeof challenge.abandon !== 'undefined') challenge.abandon();
	cancelPortal();
	if (challengeName == "Scientist"){
		document.getElementById("scienceCollectBtn").style.display = "block";
		if (restart) game.global.selectedChallenge = "Scientist";
		resetGame(true);
	}
	if (challengeName != "Daily")
		message("Your challenge has been abandoned.", "Notices");
}

function checkChallengeSquaredAllowed(){
	document.getElementById('challengeTitleSquared').style.display = (game.global.highestLevelCleared >= 64) ? "block" : "none";
	document.getElementById('challengeTitleNoSquared').style.display = (game.global.highestLevelCleared >= 64) ? "none" : "block";
}

function formatDailySeedDate(){
	if (!game.global.dailyChallenge.seed) return "";
	var seed = String(game.global.dailyChallenge.seed);
	return seed.substr(0, 4) + '-' + seed.substr(4, 2) + '-' + seed.substr(6);
}

function getSpecialSquaredRewards(challenge){
	var description = "";
	if (challenge.replaceSquareReward || challenge.replaceSquareThresh || challenge.replaceSquareFreq || challenge.replaceSquareGrowth){ 
		var threshes = (challenge.replaceSquareThresh) ? challenge.replaceSquareThresh : squaredConfig.thresh;
		var reward = (challenge.replaceSquareReward) ? challenge.replaceSquareReward : squaredConfig.rewardEach;
		var freq = (challenge.replaceSquareFreq) ? challenge.replaceSquareFreq : squaredConfig.rewardFreq;
		var rewardIncrease = (challenge.replaceSquareGrowth) ? challenge.replaceSquareGrowth : squaredConfig.rewardGrowth;
		description += "<span class='colorSquared'>This challenge issues rewards differently than most other Challenge<sup>2</sup>s.";
		description += ((challenge.replaceSquareReward) ? "<b>" : "")  + " You will gain " + reward + "% attack and health, and " + prettify(reward / 10) + "% Helium" + ((challenge.replaceSquareReward) ? "</b>" : "");
		description += ((challenge.replaceSquareFreq) ? "<b>" : "") + " for every " + freq + " zones reached." + ((challenge.replaceSquareFreq) ? "</b>" : "");
		description += ((challenge.replaceSquareThresh) ? "<b>" : "") + " Every " + threshes + " zones reached," + ((challenge.replaceSquareThresh) ? "</b>" : "");
		description += ((challenge.replaceSquareGrowth) ? "<b>" : "") + " this bonus will increase by " + rewardIncrease + "% attack and health, and " + prettify(rewardIncrease / 10) + "% Helium.</span> " + ((challenge.replaceSquareGrowth) ? "</b>" : "");
	}
	return description;
}

function getSquaredDescriptionInRun(hideDesc){
	if (!game.global.runningChallengeSquared) return "";
	var challenge = game.challenges[game.global.challengeActive];
	var description = "";
	if (!hideDesc){
		description = challenge.squaredDescription + " " + getSpecialSquaredRewards(challenge);
	}
	description += "<b>You are currently at Zone " + game.global.world;
	var portalText = (game.global.viewingUpgrades) ? "abandon the challenge " : "use the portal ";
	var dif = getIndividualSquaredReward(challenge, game.global.world) - getIndividualSquaredReward(challenge);
	if (challenge.highestSquared > 0){
		if (dif >= 1){		
			description += ", <span class='greenText'>your previous highest for this challenge was Zone " + challenge.highestSquared + ". If you " + portalText + "now, you'll add " + prettify(dif) + "% damage and health to your total Challenge<sup>2</sup> bonus, bringing it to " + prettify(dif + game.global.totalSquaredReward) + "%.</span>";
		}
		else {
			description += ", <span class='redText'>your best for this challenge is Zone " + challenge.highestSquared + ". If you " + portalText + "now, your total Challenge<sup>2</sup> attack and health bonus will stay at " + prettify(game.global.totalSquaredReward) + "%.</span>";
		}
	}
	else{
		if (dif <= 0) 
			description += ". <span class='redText'>You'll need to reach at least Zone " + squaredConfig.rewardFreq + " before you'll add anything to your current Challenge<sup>2</sup> attack and health bonus of " + prettify(game.global.totalSquaredReward) + "%.</span>";
		else
			description += ". <span class='greenText'>If you " + portalText + "now, you'll add " + prettify(dif) + "% to your Challenge<sup>2</sup> bonus, bringing the total attack and health increase to " + prettify(dif + game.global.totalSquaredReward) + "%.</span>";
	}
	description += "</b>";
	return description;
}

function viewPortalUpgrades() {
	if (game.global.totalPortals == 0) return;
	var c2Btn = document.getElementById('challengeSquaredViewBtn');
	if (c2Btn){
		if (game.global.highestLevelCleared >= 64 && game.global.runningChallengeSquared){
			c2Btn.style.display = 'inline-block';
			document.getElementById('challengeSquaredBonusAmtView').innerHTML = prettify(game.global.totalSquaredReward);
		}
		else 
			c2Btn.style.display = 'none';
	}
	
	cancelTooltip();
	game.global.viewingUpgrades = true;
	game.resources.helium.respecMax = game.global.heliumLeftover;
	document.getElementById("viewChallenge").style.display = "block";
	resetPresets();
	var challengeText = "";
	if (game.global.challengeActive){
		challengeText = getCurrentChallengePane();
	}
	else
		challengeText = "You don't have an active challenge.";
	document.getElementById("viewChallengeText").innerHTML = challengeText;
	document.getElementById("wrapper").style.display = "none";
	swapClass("portalMk", "portalMkPreview", document.getElementById("portalWrapper"));
	fadeIn("portalWrapper", 10);
	document.getElementById("portalTitle").innerHTML = "View Perks";
	document.getElementById("portalHelium").innerHTML = '<span id="portalHeliumOwned">' + prettify(parseInt(game.global.heliumLeftover, 10)) + '</span> Helium Left Over';
	document.getElementById("portalStory").innerHTML = "These are all of your perks! You can reset them once per run.";
	document.getElementById("totalHeliumEarned").innerHTML = prettify(game.global.totalHeliumEarned);
	document.getElementById("totalPortals").innerHTML = game.global.totalPortals;
	document.getElementById("cancelPortalBtn").innerHTML = "Cancel";
	document.getElementById("activatePortalBtn").style.display = "none";
	if (game.global.canRespecPerks) {
		document.getElementById("respecPortalBtn").innerHTML = "Respec";
		document.getElementById("respecPortalBtn").style.display = "inline-block";
	}
	document.getElementById("swapToCurrentChallengeBtn").style.display = "none";
	savedBuyAmt = game.global.buyAmt;
	numTab(1, true);
	game.global.buyAmt = 1;
	displayPortalUpgrades();
	updatePortalChallengeAbandonButton();
}

var lookingAtCurrentChallenge = false;
function swapToCurrentChallenge(updateOnly){
	if (!updateOnly) lookingAtCurrentChallenge = !lookingAtCurrentChallenge;
	var btnElem = document.getElementById('swapToCurrentChallengeBtn');
	var viewChallengeElem = document.getElementById('viewChallenge');
	var challengesElem = document.getElementById('challenges');
	if (lookingAtCurrentChallenge){
		viewChallengeElem.style.display = 'block';
		challengesElem.style.display = 'none';
		document.getElementById('viewChallengeText').innerHTML = getCurrentChallengePane();
		updatePortalChallengeAbandonButton();
		btnElem.innerHTML = "Select New Challenge";
		var c2Reward = document.getElementById('challengeSquaredBonusAmtView');
		if (c2Reward !== null)
			c2Reward.innerHTML = prettify(game.global.totalSquaredReward);
	}
	else {
		viewChallengeElem.style.display = 'none';
		challengesElem.style.display = 'block';
		btnElem.innerHTML = "View Current Challenge";
	}
}

function getCurrentChallengePane(){
	var challengeText = "";
	var description;
	if (game.global.challengeActive == "Daily")
		description = getCurrentDailyDescription();
	else if (game.global.runningChallengeSquared)
		description = getSquaredDescriptionInRun();
	else
		description = game.challenges[game.global.challengeActive].description;
	if (game.global.challengeActive == "Scientist"){
		var sciLevel = getScientistLevel();
		description = description.replace('_', getScientistInfo(sciLevel));
		description = description.replace('*', getScientistInfo(sciLevel, true));
	}
	challengeText = "You have the ";
	challengeText += (game.global.challengeActive == "Daily") ? formatDailySeedDate() + " " + game.global.challengeActive + " challenge active. " + description : game.global.challengeActive + " challenge active. \"" + description + "\"";
	return challengeText;
}

function updatePortalChallengeAbandonButton(){
	var abandonElem = document.getElementById("cancelChallengeBtn");
	if (game.global.challengeActive){
		abandonElem.style.display = "inline-block";
		if (game.global.challengeActive == "Daily") {
			swapClass('btn-', 'btn-success', abandonElem);
			abandonElem.innerHTML = "Finish Daily";
		}
		else{
			abandonElem.innerHTML = "Abandon Challenge";
			swapClass('btn-', 'btn-warning', abandonElem);
		}
	}
	else abandonElem.style.display = 'none';
}

function displayPortalUpgrades(fromTab){
	document.getElementById('ptabInfoText').innerHTML = (game.options.menu.detailedPerks.enabled) ? "Less Info" : "More Info";
	toggleRemovePerks(true);
	var elem = document.getElementById("portalUpgradesHere");
	elem.innerHTML = "";
	if (!fromTab) game.resources.helium.totalSpentTemp = 0;
	for (var what in game.portal){
		if (game.portal[what].locked) continue;
		var portUpgrade = game.portal[what];
		if (typeof portUpgrade.level === 'undefined') continue;
		if (!fromTab){
			portUpgrade.levelTemp = 0;
			portUpgrade.heliumSpentTemp = 0;
		}
		var html = '<div onmouseover="tooltip(\'' + what + '\',\'portal\',event)" onmouseout="tooltip(\'hide\')" class="noselect pointer portalThing thing perkColorOff';
		if (game.options.menu.detailedPerks.enabled == 1) html += " detailed";
		if (portUpgrade.additive) html += " additive";
		html += '" id="' + what + '" onclick="buyPortalUpgrade(\'' + what + '\')"><span class="thingName">' + what.replace('_', ' ') + '</span>';
		if (game.options.menu.detailedPerks.enabled == 1){
		html += '<br/>Level:&nbsp;<span class="thingOwned"><b><span id="' + what + 'Owned">' + portUpgrade.level + '</span></b>';
		if (!portUpgrade.max || portUpgrade.max > portUpgrade.level + portUpgrade.levelTemp) html += "<br/>Price: <span id='" + what + "Price'>" + prettify(getPortalUpgradePrice(what)) + "</span>";
		else html += "<br/>Price: <span id='" + what + "Price'>Max</span>";
		html += '<br/>Spent: <span id="' + what + 'Spent">' + prettify(portUpgrade.heliumSpent + portUpgrade.heliumSpentTemp) + '</span>';
		}
		else html += '<br/><span class="thingOwned">Lv:&nbsp;<span id="' + what + 'Owned">' + portUpgrade.level + '</span>';
		html += '</span></div>';
		elem.innerHTML += html;
		updatePerkColor(what);
		updatePerkLevel(what);
	}
}

function updatePerkColor(what){
	var elem = document.getElementById(what);
	if (!elem) return;
	var perk = game.portal[what];
	var perkClass;
	if (game.global.removingPerks){
		var removableLevel = (game.global.respecActive) ? (perk.level + perk.levelTemp) : perk.levelTemp;
		perkClass = (removableLevel > 0) ? "perkColorOn" : "perkColorOff";
	}
	else
	{
		var price = getPortalUpgradePrice(what);
		var canSpend = game.resources.helium.respecMax;
		if (perk.max && (perk.max < perk.level + perk.levelTemp + game.global.buyAmt)) perkClass = "perkColorMaxed";
		else
		perkClass = ((canSpend >= game.resources.helium.totalSpentTemp + price)) ? "perkColorOn" : "perkColorOff";
	}
	swapClass("perkColor", perkClass, elem);
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
	game.resources.helium.respecMax = helium;
	displayPortalUpgrades();
	numTab(1, true);
}

//48 hours = 172800
var savedOfflineText = "";
function checkOfflineProgress(noTip){
	if (!game.global.lastOnline) return;
	var rightNow = new Date().getTime();
	var textArray = [];
	if (game.global.lastOfflineProgress > rightNow){
		game.global.lastOfflineProgress = rightNow;
		return;
	} 
	game.global.lastOfflineProgress = rightNow;
	var dif = rightNow - game.global.lastOnline;
	dif = Math.floor(dif / 1000);
	if (dif < 60) return;
	var textString = "";
	var storageBought = [];
	var compatible = ["Farmer", "Lumberjack", "Miner", "Dragimp", "Explorer"];
	var storages = ['Barn', 'Shed', 'Forge'];
	for (var x = 0; x < compatible.length; x++){
		var job = game.jobs[compatible[x]];
		var resName = job.increase;
		var resource = game.resources[resName];
		var amt = job.owned * job.modifier;
		amt += (amt * game.portal.Motivation.level * game.portal.Motivation.modifier);
		if (game.portal.Motivation_II.level > 0) amt *= (1 + (game.portal.Motivation_II.level * game.portal.Motivation_II.modifier));
		if (game.portal.Meditation.level > 0 || (game.jobs.Magmamancer.owned > 0 && resName == "metal")) {
			var toAlter;
			var originalAmt = amt;
			//Find how many stacks of 10 minutes were already stacked before logging out
			var timeAtLastOnline = Math.floor((game.global.lastOnline - game.global.zoneStarted) / 600000);
			//Figure out what percentage of the total time offline one 10 minute chunk is. This will be used to modify amt to the proper amount in 10 minute chunks in order to mimic stacks
			var chunkPercent = 60000 / dif;
			//Start at 100% untouched
			var remaining = 100;
			//if a 10 minute chunk is larger than the time offline, no need to scale in chunks, skip to the end.
			var loops = 6;
			if (game.jobs.Magmamancer.owned && resName == "metal") loops = 12;
			if (timeAtLastOnline < loops && chunkPercent < 100){				
				//Start from however many stacks were held before logging out. End at 5 stacks, the 6th will be all time remaining rather than chunks and handled at the end
				for (var z = timeAtLastOnline; z < loops; z++){
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
					if (game.portal.Meditation.level && z < 6)
						amt += (toAlter * (1 + (z * 0.01 * game.portal.Meditation.level)));
					//loops will only set to 72 if the current resource is metal and the player has Magmamancers
					if (loops == 12)
						amt += (toAlter * game.jobs.Magmamancer.getBonusPercent(false, z));
				}
			}
			if (remaining){
				//Check again how much needs to be altered
				toAlter = (originalAmt * (remaining / 100));
				//Remove
				amt -= toAlter;
				//Modify and add back the final amount
				if (game.portal.Meditation.level)
					amt += (toAlter) * (1 + (game.portal.Meditation.getBonusPercent() * 0.01));
				if (loops == 12)
					amt += (toAlter * game.jobs.Magmamancer.getBonusPercent());
			}
		}
		if (game.global.challengeActive == "Meditate") amt *= 1.25;
		if (game.global.challengeActive == "Balance") amt *= game.challenges.Balance.getGatherMult();
		if (game.global.challengeActive == "Daily"){
			if (typeof game.global.dailyChallenge.famine !== 'undefined' && x < 4){
				amt *= dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
			}
			if (typeof game.global.dailyChallenge.dedication !== 'undefined'){
				amt *= dailyModifiers.dedication.getMult(game.global.dailyChallenge.dedication.strength);
			}
		}
		amt = calcHeirloomBonus("Staff", compatible[x] + "Speed", amt);
		amt *= dif;
		if (x < 3){
			var newMax = resource.max + (resource.max * game.portal.Packrat.modifier * game.portal.Packrat.level);
			newMax = calcHeirloomBonus("Shield", "storageSize", newMax);
			var allowed = (newMax - resource.owned);
			if (amt > allowed){
				if (!game.global.autoStorage) {
					amt = allowed;
				}
				else {
					var storageBuilding = game.buildings[storages[x]];
					var count;
					for (count = 1; count < 300; count++){
						amt -= storageBuilding.cost[resName]();
						storageBuilding.owned++;
						storageBuilding.purchased++;
						resource.max *= 2;
						newMax = resource.max + (resource.max * game.portal.Packrat.modifier * game.portal.Packrat.level);
						newMax = calcHeirloomBonus("Shield", "storageSize", newMax);
						if (newMax > (resource.owned + amt)) break;
					}
					var s = (count > 1) ? "s" : "";
					storageBought.push(count + " " + storages[x] + s + ", ");
				}
			}
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
	if (storageBought.length) {
		textString += " <b>after buying</b> ";
		for (var z = 0; z < storageBought.length; z++){
			textString += storageBought[z];
			if (z == storageBought.length - 2) textString += "and ";
		}
		textString = textString.slice(0, -2);
	}
	textString += ".";
	if (!noTip) tooltip("Trustworthy Trimps", null, "update", textString);
	else savedOfflineText = textString;
}

function respecPerks(){
	if (!game.global.canRespecPerks) return;
	//if (!game.global.viewingUpgrades) return;
	game.global.respecActive = true;
	displayPortalUpgrades(true);
	numTab(1, true);
	game.resources.helium.respecMax = (game.global.viewingUpgrades) ? game.global.heliumLeftover : game.global.heliumLeftover + game.resources.helium.owned;
	document.getElementById("portalHeliumOwned").innerHTML = prettify(game.resources.helium.respecMax - game.resources.helium.totalSpentTemp);
	document.getElementById("respecPortalBtn").style.display = "none";
	document.getElementById("portalStory").innerHTML = "You can only respec once per run. Clicking cancel will not consume this use.";
	document.getElementById("portalTitle").innerHTML = "Respec Perks";
	document.getElementById("ptabRemove").style.display = "table-cell";
	document.getElementById("clearPerksBtn").style.display = "inline-block";
	if (selectedPreset)
		swapClass('tab', 'tabNotSelected', document.getElementById('presetTabLoad'));
}

function clearPerks(){
	if (!game.global.respecActive) return;
	game.resources.helium.respecMax = (game.global.viewingUpgrades) ? game.global.heliumLeftover : game.global.heliumLeftover + game.resources.helium.owned;
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
	if (game.global.viewingUpgrades) {
		document.getElementById("respecPortalBtn").style.display = "none";
		document.getElementById("activatePortalBtn").innerHTML = "Confirm";
		document.getElementById("activatePortalBtn").style.display = "inline-block";
	}	
}

function countHeliumSpent(){
	var count = 0;
	for (var item in game.portal){
		count += game.portal[item].heliumSpent;
	}
	return count;
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
	if (game.global.selectedChallenge){
		if (challengeSquaredMode)
			newText += " <span id='addChallenge' class='colorSquared'>You are about to run the <b style='font-size: 1.1em'>" + game.global.selectedChallenge + " Challenge<sup>2</sup></b></span><br/>";
		else
			newText += " <span id='addChallenge'>You are about to run the <b style='font-size: 1.1em'>" + game.global.selectedChallenge + " Challenge</b></span><br/>";
	}
	else newText += " <span id='addChallenge'></span>";
	if (game.global.kongBonusMode){
		newText = "All set?";
	}
	else newText += "<div id='portalConfirmStory'>Are you sure you want to enter the portal? You will lose all progress other than the portal-compatible upgrades you've earned, such as Helium, Perks, Bones, and Exotic Imports. Who knows where or when it will send you.</div><br/>";

	if (game.global.challengeActive == "Daily") newText += "<span class='dailyError portalError'>You still have the Daily challenge active! If you portal right now, your reward will be applied at the beginning of your next run. Alternatively, click 'Finish Daily' in the World or inside 'View Perks' to get the bonus now.</span>";
	if (game.global.runningChallengeSquared) newText += "<div class='squaredError portalError'>" + getSquaredDescriptionInRun(true) + "</div>";
	if (game.global.heirloomsExtra.length){
		var s = (game.global.heirloomsExtra.length > 1) ? "s" : "";
		newText += "<div class='heirloomRecycleWarning portalError'>You have " + game.global.heirloomsExtra.length + " extra Heirloom" + s + ", which will be recycled for " + prettify(recycleAllExtraHeirlooms(true)) + " Nullifium if you portal now. Make sure you carry any that you want to save!</div>";
	}
	if (game.global.world >= 230 && canAffordGeneratorUpgrade()){
		newText += "<div class='magmiteError portalError'>You have " + prettify(game.global.magmite) + " Magmite, which is enough purchase an upgrade for your Dimensional Generator! If you portal now, " + ((game.permanentGeneratorUpgrades.Shielding.owned) ? "20" : "30") + "% of your Magmite will decay.</div>";
	}
	var btnText = "<div class='btn btn-info btn-lg' onclick='activatePortal()'>Let's do it.</div>&nbsp;<div class='btn btn-lg btn-warning' onclick='cancelTooltip()'>Wait, I'm not ready!</div>";
	tooltip('Activate Portal', 'customText', 'update', newText, btnText);
	game.global.lockTooltip = true;
	var tooltipElem = document.getElementById('tooltipDiv');
	tooltipElem.style.left = "33.75%";
	tooltipElem.style.top = "25%";
}

function enablePerkConfirmBtn(){
	document.getElementById("activatePortalBtn").innerHTML = "Confirm";
	document.getElementById("activatePortalBtn").style.display = "inline-block";
}

function buyPortalUpgrade(what){
	if (!game.global.kongBonusMode && !game.global.portalActive && !game.global.respecActive && !game.global.viewingUpgrades) return;
	if (isNaN(game.global.buyAmt)) {
		numTab(1);
		return;
	}
	var toBuy = game.portal[what];
		if (game.global.removingPerks){
			removePerk(what);
			updateAllPerkColors();
			enablePerkConfirmBtn();
			return;
	}
	if (toBuy.max < toBuy.level + toBuy.levelTemp + game.global.buyAmt) return;
	var price = getPortalUpgradePrice(what);
	//var canSpend = (game.global.viewingUpgrades) ? game.resources.helium.respecMax :  (game.resources.helium.owned + game.global.heliumLeftover);
	var canSpend = game.resources.helium.respecMax;
	if (canSpend >= (game.resources.helium.totalSpentTemp + price)){
		document.getElementById("ptabRemove").style.display = "table-cell";
		toBuy.levelTemp += game.global.buyAmt;
		game.resources.helium.totalSpentTemp += price;
		toBuy.heliumSpentTemp += price;
		updatePerkLevel(what);
		tooltip(what, "portal", "update");
		document.getElementById("portalHeliumOwned").innerHTML = prettify(canSpend - game.resources.helium.totalSpentTemp);
		enablePerkConfirmBtn();
		updateAllPerkColors();
	}
}

var selectedPreset = 0;
function presetTab(tabNum){
	swapClass('tab', 'tabNotSelected', document.getElementById('presetTabSave'));
	if (game.global.respecActive)
		swapClass('tab', 'tabNotSelected', document.getElementById('presetTabLoad'));
	swapClass('tab', 'tabNotSelected', document.getElementById('presetTabRename'));
	swapClass('tab', 'tabSelected', document.getElementById('presetTab' + tabNum));
	if (selectedPreset > 0) swapClass('tab', 'tabNotSelected', document.getElementById('presetTab' + selectedPreset));
	selectedPreset = tabNum;
}

function resetPresets(){
	swapClass('tab', 'tabNotEnabled', document.getElementById('presetTabSave'));
	swapClass('tab', 'tabNotEnabled', document.getElementById('presetTabLoad'));
	swapClass('tab', 'tabNotEnabled', document.getElementById('presetTabRename'));
	selectedPreset = 0;
	for (var x = 1; x <= 3; x++){
		var preset = game.global["perkPreset" + x];
		swapClass('tab', 'tabNotSelected', document.getElementById('presetTab' + x));
		document.getElementById('presetTab' + x + 'Text').innerHTML = (preset.Name) ? preset.Name : "Preset " + x;
	}
}

function savePerkPreset(){
	var to = selectedPreset;
	if (to == 0) return;
	var saved = {};
	for(var item in game.portal){
		var temp = (game.portal[item].levelTemp) ? game.portal[item].levelTemp : 0;
		if (game.portal[item].locked || game.portal[item].level + temp == 0) continue;
		saved[item] = game.portal[item].level + temp;
	}
	if (game.global["perkPreset" + to].Name) saved.Name = game.global["perkPreset" + to].Name;
	game.global["perkPreset" + to] = saved;
	document.getElementById('presetTab' + to + 'Text').innerHTML = ((saved.Name) ? saved.Name : "Preset " + to);
}

function renamePerkPreset(needTooltip, name){
	if (selectedPreset == 0) return;
	if (game.global["perkPreset" + selectedPreset] == {}) return;
	if (needTooltip){
		tooltip("Rename Preset", null, "update");
		return;
	}
	var elem = document.getElementById('renamePresetBox');
	if (!elem || !elem.value) return;
	game.global["perkPreset" + selectedPreset].Name = htmlEncode(elem.value.substring(0, 25));
	cancelTooltip();
	for (var x = 1; x <= 3; x++){
		var preset = game.global["perkPreset" + x];
		document.getElementById('presetTab' + x + 'Text').innerHTML = (preset.Name) ? preset.Name : "Preset " + x;
	}
}

function loadPerkPreset(){
	if (!game.global.respecActive) return;
	if (selectedPreset == 0) return;
	var presetNumber = selectedPreset;
	var perkSetting = game.global["perkPreset" + presetNumber];
	if (isObjectEmpty(perkSetting)) return;
	clearPerks();
	for (var item in perkSetting){
		if (!game.portal[item] || game.portal[item].locked) continue;
		var changeAmt = perkSetting[item] - game.portal[item].level - game.portal[item].levelTemp;
		var price = (changeAmt != 0) ? getPortalUpgradePrice(item, (changeAmt < 0), changeAmt) : 0;
		game.portal[item].levelTemp += changeAmt;
		game.resources.helium.totalSpentTemp += price;
		game.portal[item].heliumSpentTemp += price;
		updatePerkLevel(item);
	}
	document.getElementById("portalHeliumOwned").innerHTML = prettify(game.resources.helium.respecMax - game.resources.helium.totalSpentTemp);
	enablePerkConfirmBtn();
	updateAllPerkColors();
}

function removePerk(what) {
	if (isNumberBad(game.global.buyAmt)){
		console.log("Buy Amount is " + game.global.buyAmt);
		return;
	}
	var toBuy = game.portal[what];
	var realTemp = (game.global.respecActive) ? toBuy.levelTemp + toBuy.level : toBuy.levelTemp;
	var removeAmt = game.global.buyAmt;
	if (realTemp < removeAmt) removeAmt = realTemp;
	var refund = getPortalUpgradePrice(what, true, removeAmt);
	//Error Checking
	var tempLevelTemp = toBuy.level + toBuy.levelTemp - removeAmt;
	if (isNumberBad(tempLevelTemp)) {
		console.log("Trying to set perk level to " + tempLevelTemp);
		return;
	}
	var tempHeliumSpentTemp = toBuy.heliumSpent + toBuy.heliumSpentTemp - refund;
	if (isNumberBad(tempHeliumSpentTemp)){
		console.log("Trying to set helium spent on perk to " + tempHeliumSpentTemp);
		return;
	}
	var tempTotalSpentTemp = game.resources.helium.totalSpentTemp - refund;
	if (isNaN(tempTotalSpentTemp) || !isFinite(tempTotalSpentTemp)){
		console.log("Trying to set spent helium to " + tempTotalSpentTemp);
		return;
	}
	toBuy.levelTemp -= removeAmt;
	toBuy.heliumSpentTemp -= refund;
	game.resources.helium.totalSpentTemp -= refund;
	updatePerkLevel(what);
	tooltip(what, "portal", "update");
	var canSpend = game.resources.helium.respecMax;
	document.getElementById("portalHeliumOwned").innerHTML = prettify(canSpend - game.resources.helium.totalSpentTemp);
}

function isNumberBad(number) {
	return (isNaN(number) || typeof number === 'undefined' || number < 0 || !isFinite(number));
}

function updatePerkLevel(what){
	var textElem = document.getElementById(what + "Owned");
	var nextCostElem = document.getElementById(what + "Price");
	var spentElem = document.getElementById(what + "Spent");
	var toBuy = game.portal[what];
	var num = 0;
	var text = toBuy.level + toBuy.levelTemp;
	if (toBuy.levelTemp){
		text += "&nbsp;("
		if (toBuy.levelTemp > 0) text += "+";
		text += toBuy.levelTemp + ")";
	}
	if (spentElem !== null){
		spentElem.innerHTML = prettify(toBuy.heliumSpent + toBuy.heliumSpentTemp);
		nextCostElem.innerHTML = (!toBuy.max || toBuy.max > toBuy.level + toBuy.levelTemp) ? prettify(getPortalUpgradePrice(what)) : "Max";
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
	updateAllPerkColors();
}

function unlockMapStuff(){
	fadeIn("fragments", 10);
	fadeIn("gems", 10);
	fadeIn("mapsBtn", 10);
}

function getPortalUpgradePrice(what, removing, forceAmt){
	var toCheck = game.portal[what];
	var tempLevel;
	var nextLevel;
	var toAmt;
	if (!removing){	
		toAmt = (forceAmt) ? forceAmt : game.global.buyAmt;
		nextLevel = tempLevel + toAmt;
	}
	tempLevel = toCheck.level + toCheck.levelTemp;
	var amt = 0;
	if (toCheck.additive){
		if (removing)
			nextLevel = tempLevel - forceAmt;
		else 
			nextLevel = tempLevel + toAmt;
		amt = getAdditivePrice(nextLevel, toCheck) - getAdditivePrice(tempLevel, toCheck);
		if (removing) amt = Math.abs(amt);
	}
	else {
		if (removing){
			toAmt = forceAmt;
			tempLevel -= forceAmt;			
		}
		if (toAmt > 1000) return Infinity;
		for (var x = 0; x < toAmt; x++){
			amt += Math.ceil(((tempLevel + x) / 2) + toCheck.priceBase * Math.pow(1.3, tempLevel + x));
		}
	}
	return amt;
}

function getAdditivePrice(atLevel, portalUpgrade){
	return (((atLevel - 1) * atLevel) / 2 * portalUpgrade.additiveInc) + (portalUpgrade.priceBase * atLevel);
}

function commitPortalUpgrades(usingPortal){
	if (!usingPortal && !canCommitCarpentry()) return false; //And coordinated
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

function canCommitCarpentry(){ //Uh, and Coordinated. This checks coordinated too.
	var newMax = game.resources.trimps.max * game.resources.trimps.maxMod;
	newMax = Math.floor(newMax * (Math.pow(1 + game.portal.Carpentry.modifier, game.portal.Carpentry.level + game.portal.Carpentry.levelTemp)));
	if (typeof game.portal.Carpentry_II.levelTemp !== 'undefined') newMax = Math.floor(newMax * (1 + (game.portal.Carpentry_II.modifier * (game.portal.Carpentry_II.level + game.portal.Carpentry_II.levelTemp))));
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
		removeQueueItem("queueItem" + x, true);
	}
}

function activatePortal(){
	if (game.global.selectedChallenge == "Daily"){
		if (getDailyChallenge(readingDaily, false, true) !== nextDaily) {
			document.getElementById("portalStory").innerHTML = "<span style='color: red'>The daily challenge has changed since you looked at it. The challenge description has been refreshed, click Activate Portal to run it!</span>";
			getDailyChallenge();
			return;
			}
	}
	if (game.global.challengeActive == "Daily"){
		abandonDaily();
	}
	if (game.global.runningChallengeSquared && game.global.challengeActive){
		if (game.global.world > game.challenges[game.global.challengeActive].highestSquared)
			game.challenges[game.global.challengeActive].highestSquared = game.global.world;
		game.global.challengeActive = "";
	}
	game.global.runningChallengeSquared = (game.global.selectedChallenge) ? challengeSquaredMode : false;
	var refund = game.resources.helium.respecMax - game.resources.helium.totalSpentTemp;
	if (!commitPortalUpgrades(true)) return;	
	game.global.heliumLeftover = refund;
	cancelPortal(true);
	game.resources.helium.respecMax = 0;
	game.global.totalPortals++;
	resetGame(true);
	if (game.global.totalPortals == 1) addNewSetting('extraMapBtns');
	displayPerksBtn();
	handleFinishDailyBtn();
	document.getElementById("portalUpgradesHere").innerHTML = "";
	message("A green shimmer erupts then disappears, and you hit the ground. You look pretty hungry...", "Story");
}

function cancelPortal(keep){
	portalWindowOpen = false;
	if (game.global.kongBonusMode){
		game.global.kongBonusMode = false;
		if (!keep) resetGame();		
		message("A green shimmer erupts then disappears, and you hit the ground. You look pretty hungry...", "Story");
	}
	game.global.viewingUpgrades = false;
	game.global.respecActive = false;
	resetPresets();
	document.getElementById("clearPerksBtn").style.display = "none";
	document.getElementById("respecPortalBtn").style.display = "none";
	document.getElementById("portalUpgradesHere").innerHTML = "";
	document.getElementById("portalWrapper").style.display = "none";
	fadeIn("wrapper", 10);
	document.getElementById("challenges").style.display = "none";
	document.getElementById("viewChallenge").style.display = "none";
	document.getElementById("cancelChallengeBtn").style.display = "none";
	document.getElementById("portalError").style.display = "none";
	document.getElementById("ptabRemove").style.display = "none";
	document.getElementById("swapToCurrentChallengeBtn").style.display = "none";
	lookingAtCurrentChallenge = false;
	game.global.removingPerks = false;
	game.resources.helium.respecMax = 0;
	restoreNumTab();
}

function restoreNumTab(){
	if (savedBuyAmt == -1)
		return;
	game.global.buyAmt = savedBuyAmt;
	switch(savedBuyAmt){
		case 1:
			numTab(1);
			break;
		case 10:
			numTab(2);
			break;
		case 25:
			numTab(3);
			break;
		case 100:
			numTab(4);
			break;
		case "Max":
			game.global.buyAmt = 1;
			numTab(6);
			break;
		default:
			numTab(5);
			break;
	}
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

function rewardResource(what, baseAmt, level, checkMapLootScale, givePercentage){
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
		if (game.global.turkimpTimer > 0 && (game.global.playerGathering == "food" || game.global.playerGathering == "metal" || game.global.playerGathering == "wood")) tempModifier *= (game.talents.turkimp3.purchased) ? 1.249 : 1.166;
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
		var compare = game.global.world;
		if (game.talents.mapLoot.purchased)
			compare--;
		if (world < compare){
			//-20% loot compounding for each level below world
			amt *= Math.pow(0.8, (compare - world));
		}
		//Add map loot bonus
		amt = Math.round(amt * map.loot);
		
	}
	//Add Looting
	if (game.portal.Looting.level) amt += (amt * game.portal.Looting.level * game.portal.Looting.modifier);
	if (game.portal.Looting_II.level) amt *= (1 + (game.portal.Looting_II.level * game.portal.Looting_II.modifier));
	if (game.global.spireRows > 0) amt *= 1 + (game.global.spireRows * 0.02);
	if (game.global.totalSquaredReward > 0 && what == "helium") amt *= ((game.global.totalSquaredReward / 1000) + 1);
	if (game.unlocks.impCount.Magnimp && what != "helium") amt *= Math.pow(1.003, game.unlocks.impCount.Magnimp);
	if (game.global.challengeActive == "Toxicity"){
		var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
		amt *= (1 + toxMult);
	}
	if (what != "helium") {
		if (game.global.challengeActive == "Decay"){
			amt *= 10;
			amt *= Math.pow(0.995, game.challenges.Decay.stacks);
		}
		amt = calcHeirloomBonus("Staff", what + "Drop", amt);
		if (game.global.formation == 4 && !game.global.waitToScry) amt *= 2;
		if (game.global.challengeActive == "Daily"){
			if (typeof game.global.dailyChallenge.famine !== 'undefined' && what != "fragments"){
				amt *= dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
			}
			if (typeof game.global.dailyChallenge.karma !== 'undefined'){
				amt *= dailyModifiers.karma.getMult(game.global.dailyChallenge.karma.strength, game.global.dailyChallenge.karma.stacks);
			}
		}
	}
	//Yes, Lead giving double helium and Watch not reducing helium is on purpose!
	if (game.global.challengeActive == "Watch" && what != "helium") amt /= 2;
	if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)) amt *= 2;
	if (what == "helium"){
		if (game.global.sLevel >= 5) amt *= Math.pow(1.005, game.global.world);
		if (game.goldenUpgrades.Helium.currentBonus > 0) amt *= 1 + game.goldenUpgrades.Helium.currentBonus;
	}
	if (givePercentage > 0) amt *= givePercentage;
	amt = Math.floor(amt);
	if (what == "helium") 
		addHelium(amt);
	else
		addResCheckMax(what, amt);
	if (game.options.menu.useAverages.enabled){
		addAvg(what, amt);
	}
    return amt;
};

function addHelium(amt){
	if (game.global.challengeActive) distributeToChallenges(amt);
	game.resources.helium.owned += amt;
	game.global.totalHeliumEarned += amt;
	if (portalWindowOpen){
		var heElem = document.getElementById('portalHelium');
		game.resources.helium.respecMax += amt;
		game.global.tempHighHelium += amt;
		if (heElem != null) heElem.innerHTML = '<span id="portalHeliumOwned">' + prettify(game.resources.helium.respecMax - game.resources.helium.totalSpentTemp) + '</span> Helium';			
	}
	checkAchieve("totalHelium");
}

function addResCheckMax(what, number, noStat, fromGather, nonFilteredLoot) {
    var res = game.resources[what];
	if (res.max == -1) {
		res.owned += number;
		if (!noStat && what == "gems") game.stats.gemsCollected.value += number;
		return;
	}
	var newMax = getMaxForResource(what);
    if (res.owned + number <= newMax) res.owned += number;
    else {
		if (game.global.autoStorage && game.global.improvedAutoStorage && (what == "food" || what == "wood" || what == "metal")){
			var storage = (what == "food") ? "Barn" : (what == "wood") ? "Shed" : (what == "metal") ? "Forge" : "";
			res.owned += number;
			while (res.owned > newMax){
				if (!buyBuilding(storage, true, true, 1))
					break;
				newMax *= 2;
			}
		}
		else
			res.owned = newMax;
	}
	if (nonFilteredLoot && game.options.menu.useAverages.enabled){
		addAvg(what, number);
	}
}

function getMaxForResource(what){
	var res = game.resources[what];
	if (!res.max) return 0;
	var newMax = res.max + (res.max * game.portal.Packrat.modifier * game.portal.Packrat.level);
	newMax = calcHeirloomBonus("Shield", "storageSize", newMax);
	return newMax;
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
    var colorOn = "workColorOn";
	var btnText = "";
	var collectBtn;
	if (game.global.turkimpTimer > 0 && (what == "food" || what == "wood" || what == "metal")){
		colorOn = "workColorTurkimp";
		btnText = "<span class='icomoon icon-spoon-knife'></span>";
	}
    if (typeof toGather === 'undefined' && what != "buildings") return;
	var toUpdate = (updateOnly) ? what : game.global.playerGathering;
    if (toUpdate !== "") {
		collectBtn = document.getElementById(toUpdate + "CollectBtn");
        collectBtn.innerHTML = setGatherTextAs(toUpdate, false);
        swapClass("workColor", "workColorOff", collectBtn);
    }
    if (updateOnly) return;
	game.global.playerGathering = what;
	updateBuildSpeed();
	collectBtn = document.getElementById(what + "CollectBtn");
    collectBtn.innerHTML = btnText + setGatherTextAs(what, true);
    swapClass("workColor", colorOn, collectBtn);
}

function updateBuildSpeed(){
	var modifier = (game.global.autoCraftModifier > 0) ? game.global.autoCraftModifier : 0;
    if (game.global.playerGathering == "buildings") modifier += getPlayerModifier();
	document.getElementById("buildSpeed").innerHTML = (modifier > 0) ? prettify(Math.floor(modifier * 100)) + "%" : "";
}

function setGatherTextAs(what, on) {
	if (what == "science") game.global.researched = true;
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
			if (game.portal.Motivation_II.level > 0) perSec *= (1 + (game.portal.Motivation_II.level * game.portal.Motivation_II.modifier));
			if (game.portal.Meditation.level > 0) perSec *= (1 + (game.portal.Meditation.getBonusPercent() * 0.01));
			if (game.jobs.Magmamancer.owned > 0 && increase == "metal") perSec *= game.jobs.Magmamancer.getBonusPercent();
			if (game.global.challengeActive == "Meditate") perSec *= 1.25;
			else if (game.global.challengeActive == "Size") perSec *= 1.5;
			if (game.global.challengeActive == "Toxicity"){
				var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
				perSec *= (1 + toxMult);
			}
			if (game.global.challengeActive == "Balance"){
				perSec *= game.challenges.Balance.getGatherMult();
			}
			if (game.global.challengeActive == "Decay"){
				perSec *= 10;
				perSec *= Math.pow(0.995, game.challenges.Decay.stacks);
			}
			if (game.global.challengeActive == "Daily"){
				if (typeof game.global.dailyChallenge.dedication !== 'undefined')
					perSec *= dailyModifiers.dedication.getMult(game.global.dailyChallenge.dedication.strength);
				if (typeof game.global.dailyChallenge.famine !== 'undefined' && increase != "fragments" && increase != "science")
					perSec *= dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
			}
			if (game.global.challengeActive == "Watch") perSec /= 2;
			if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)) perSec*= 2;
			perSec = calcHeirloomBonus("Staff", job + "Speed", perSec);
		}
		if (what && increase == what){
			if (game.global.turkimpTimer > 0 && (what == "food" || what == "wood" || what == "metal")){
				perSec *= game.talents.turkimp3.purchased ? 1.75 : 1.5;
			}
			perSec += getPlayerModifier();
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

function getPlayerModifier(){
	var playerModifier = game.global.playerModifier;
	return calcHeirloomBonus("Shield", "playerEfficiency", playerModifier);
}

function calculateTimeToMax(resource, perSec, toNumber, fromGather) {
	if (perSec <= 0) return "";
	var remaining = (toNumber != null) ? toNumber : calcHeirloomBonus("Shield", "storageSize", ((resource.max * (1 + game.portal.Packrat.modifier * game.portal.Packrat.level)))) - resource.owned;
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
		return Math.floor(seconds) + " Sec" + ((Math.floor(seconds) == 1) ? "" : "s");
	}
	if (toFill < 3600) return minutes + " Min" + ((minutes == 1) ? "" : "s") + " " + seconds + " Sec" + ((seconds == 1) ? "" : "s");
	if (toFill < 86400) return hours + " Hour" + ((hours == 1) ? "" : "s") + " " + minutes + " Min" + ((minutes == 1) ? "" : "s");
	if (toFill < 31536000) return days + " Day" + ((days == 1) ? "" : "s") + " " + hours + " Hour" + ((hours == 1) ? "" : "s");
	return prettify(years) + " Year" + ((years == 1) ? "" : "s") + " " + days + " Day" + ((days == 1) ? "" : "s");
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
			var artMult = Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level);
			if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.metallicThumb !== 'undefined'){
				artMult *= dailyModifiers.metallicThumb.getMult(game.global.dailyChallenge.metallicThumb.strength);
			}
			if (whatObj.prestiges && (res == "metal" || res == "wood")) cost *= artMult; 
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

//Now with equipment! buyAmt
function canAffordBuilding(what, take, buildCostString, isEquipment, updatingLabel, forceAmt, autoPerc){
	var costString = "";
	var toBuy;
	if (!isEquipment) toBuy = game.buildings[what];
	else toBuy = game.equipment[what];
	var purchaseAmt = 1;
	if (forceAmt) purchaseAmt = forceAmt;
	else {
		if (game.global.buyAmt == "Max"){
			if (!updatingLabel) purchaseAmt = calculateMaxAfford(toBuy, !isEquipment, isEquipment);
		}
		else purchaseAmt = game.global.buyAmt;
	}
	if (typeof toBuy === 'undefined') return false;
	for (var costItem in toBuy.cost) {
		var color = "green";
		var price = 0;
		price = parseFloat(getBuildingItemPrice(toBuy, costItem, isEquipment, purchaseAmt));
		if (isEquipment){
			var artMult = Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level);
			if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.metallicThumb !== 'undefined'){
				artMult *= dailyModifiers.metallicThumb.getMult(game.global.dailyChallenge.metallicThumb.strength);
			}
			price = Math.ceil(price * artMult);
		} 
		else if (game.portal.Resourceful.level) price = Math.ceil(price * (Math.pow(1 - game.portal.Resourceful.modifier, game.portal.Resourceful.level)));
		if (autoPerc > 0){
			if (price > game.resources[costItem].owned * (autoPerc / 100))
				return false;
			continue;
		}
		else if (price > game.resources[costItem].owned || !(isFinite(price))) {
			if (buildCostString) color = "red";
			else return false;
		}
		if (buildCostString) {
			var percent;
			if (color == "red"){
				if ((costItem == "food" || costItem == "wood" || costItem == "metal") && price > getMaxForResource(costItem))
					color = "orange";
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
	}
	if (buildCostString) {
		costString = costString.slice(0, -2);
		return costString;
	}
	return true;
}

function getBuildingItemPrice(toBuy, costItem, isEquipment, purchaseAmt){
	var price = 0;
	var compare = (isEquipment) ? "level" : "purchased";
	var thisCost = toBuy.cost[costItem];
		if (typeof thisCost[1] !== 'undefined'){
			price =  Math.floor((thisCost[0] * Math.pow(thisCost[1], toBuy[compare])) * ((Math.pow(thisCost[1], purchaseAmt) - 1) / (thisCost[1] - 1)));
		}
		else if (typeof thisCost === 'function') {
			price = thisCost();
		}
		else {
			price = thisCost * purchaseAmt;
		}
	return price;
}

function buyBuilding(what, confirmed, fromAuto, forceAmt) {
	if (game.options.menu.pauseGame.enabled) return false;
	if (!forceAmt && !confirmed && game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) return false;
/* 	if (what == "Nursery" && mutations.Magma.active()) return; */
	var toBuy = game.buildings[what];
	var purchaseAmt = 1;
	if (forceAmt) purchaseAmt = Math.min(forceAmt, calculateMaxAfford(toBuy, true, false, false, true));
	else if (!toBuy.percent) purchaseAmt = (game.global.buyAmt == "Max") ? calculateMaxAfford(toBuy, true, false) : game.global.buyAmt;
    if (typeof toBuy === 'undefined') return false;
    var canAfford = ((forceAmt) ? canAffordBuilding(what, false, false, false, false, purchaseAmt) : canAffordBuilding(what));
	if (canAfford){
		if (what == "Wormhole" && !confirmed && game.options.menu.confirmhole.enabled && !fromAuto){
			tooltip('Confirm Purchase', null, 'update', 'You are about to purchase ' + purchaseAmt + ' Wormholes, <b>which cost helium</b>. Make sure you can earn back what you spend!', 'buyBuilding(\'Wormhole\', true)');
			return false;
		}
		((forceAmt) ? canAffordBuilding(what, true, false, false, false, purchaseAmt) : canAffordBuilding(what, true));
		game.buildings[what].purchased += purchaseAmt;
		if (getCraftTime(game.buildings[what]) == 0) {
			for (var x = 0; x < purchaseAmt; x++) buildBuilding(what);
		}
		else
		startQueue(what, purchaseAmt);
	}
	else 
		return false;
	if (!fromAuto) tooltip(what, "buildings", "update");
	return true;
}

function getCraftTime(buildingObj){
	var time = buildingObj.craftTime;
	if (time == 0 && game.options.menu.forceQueue.enabled == 1) {
		return buildingObj.origTime;
	}
	return time;
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
    }
}

function startQueue(what, count) {
    game.global.buildingsQueue.push(what + "." + (count));
    addQueueItem(what + "." + count);
}

function craftBuildings(makeUp) {
    var buildingsBar = document.getElementById("animationDiv");
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
    if (game.global.playerGathering == "buildings") modifier += getPlayerModifier();
    if (!makeUp) {
        speedElem.innerHTML = prettify(Math.floor(modifier * 100)) + "%";
        game.global.timeLeftOnCraft -= ((1 / game.settings.speed) * modifier);
		var percent = 1 - (game.global.timeLeftOnCraft / getCraftTime(game.buildings[game.global.crafting]));
        
		var timeLeft = (game.global.timeLeftOnCraft / modifier).toFixed(1);
		if (timeLeft < 0.1) timeLeft = 0.1;
        if (timeRemaining) timeRemaining.innerHTML = " - " + timeLeft + " Seconds";
		if (game.options.menu.queueAnimation.enabled) buildingsBar.style.opacity = percent;
		else buildingsBar.style.opacity = "0";
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
		if (what == "Wormhole"){
			var spent = Math.floor((building.cost.helium[0] * Math.pow(building.cost.helium[1], building.owned - 1)));
			if (game.portal.Resourceful.level) spent = Math.ceil(spent * (Math.pow(1 - game.portal.Resourceful.modifier, game.portal.Resourceful.level)));
			game.global.totalHeliumEarned -= parseFloat(spent);
			game.stats.spentOnWorms.value += parseFloat(spent);
			if (game.stats.spentOnWorms.value + game.stats.spentOnWorms.valueTotal > 250000) giveSingleAchieve(10);
	}
    numTab();
}

function setNewCraftItem() {
    var queueItem = game.global.buildingsQueue[0].split('.')[0];
    game.global.crafting = queueItem;
    game.global.timeLeftOnCraft = getCraftTime(game.buildings[queueItem]);
	var elem = document.getElementById("queueItemsHere").firstChild;
	var timeLeft = (game.global.timeLeftOnCraft / (game.global.autoCraftModifier + getPlayerModifier())).toFixed(1);
	
	if (elem && !document.getElementById("queueTimeRemaining")) elem.innerHTML += "<span id='queueTimeRemaining'> - " + timeLeft + " Seconds</span><div id='animationDiv'></div>";
	if (elem && timeLeft <= 0.1) {timeLeft = 0.1; if (game.options.menu.queueAnimation.enabled) document.getElementById("animationDiv").style.opacity = '1'}
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
    game.global.timeLeftOnTrap -= ((1 / game.settings.speed) * getPlayerModifier());
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

function buyJob(what, confirmed, noTip) {
	if (game.options.menu.pauseGame.enabled) return;
	if (game.global.challengeActive == "Scientist" && what == "Scientist") return;
	if (game.global.challengeActive == "Corrupted" && what == "Geneticist") game.challenges.Corrupted.hiredGenes = true;
	if (!confirmed && game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) return;
	var purchaseAmt;
	if (game.global.firing){
		if (game.jobs[what].owned < 1) return;
		purchaseAmt = (game.global.buyAmt == "Max") ? calculateMaxAfford(game.jobs[what], false, false, true) : game.global.buyAmt;
		game.resources.trimps.employed -= (game.jobs[what].owned < purchaseAmt) ? game.jobs[what].owned : purchaseAmt;
		game.jobs[what].owned -= purchaseAmt;
		game.stats.trimpsFired.value += purchaseAmt;
		if (game.jobs[what].owned < 0) game.jobs[what].owned = 0;
		if (game.resources.trimps.employed < 0) game.resources.trimps.employed = 0;
		return;
	}
	var workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
	if (game.options.menu.fireForJobs.enabled && game.jobs[what].allowAutoFire){
		purchaseAmt = (game.global.buyAmt == "Max") ? calculateMaxAfford(game.jobs[what], false, false, true) : game.global.buyAmt;
		if (workspaces < purchaseAmt) {
			freeWorkspace(purchaseAmt - workspaces);
			workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
		}
	}
	if (workspaces <= 0) return;
	if (!canAffordJob(what, false, workspaces)) return;
	var added = canAffordJob(what, true, workspaces);
	game.jobs[what].owned += added;
	game.resources.trimps.employed += added;
	if (!noTip) tooltip(what, "jobs", "update");
}

function addGeneticist(amount){
	if (game.global.challengeActive == "Corrupted") game.challenges.Corrupted.hiredGenes = true;
	var workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
	var owned = game.resources.trimps.owned - game.resources.trimps.employed;
	if (owned < 1) return;
	if (owned < amount)
		amount = owned;
	if (workspaces <= 0) {
		//try to free up a workspace if possible
		if (!freeWorkspace(amount)){
			amount = 1;
			if (!freeWorkspace(amount))
				return;
		}
	}
	var cost = game.jobs.Geneticist.cost.food;
	var price = Math.floor((cost[0] * Math.pow(cost[1], game.jobs.Geneticist.owned)) * ((Math.pow(cost[1], amount) - 1) / (cost[1] - 1)));
	if (game.resources.food.owned < price) {
		price = getNextGeneticistCost();
		if (game.resources.food.owned < price) return;
		amount = 1;
	}
	game.resources.food.owned -= price;
	game.resources.trimps.employed += amount;
	game.jobs.Geneticist.owned += amount;
}

function removeGeneticist(amount){
	if (game.jobs.Geneticist.owned < amount) return;
	game.resources.trimps.employed -= amount;
	game.jobs.Geneticist.owned -= amount;
}

function getNextGeneticistCost(){
	var geneticist = game.jobs.Geneticist;
	return resolvePow(geneticist.cost.food, geneticist, 1);
}

function freeWorkspace(amount){
	if (!amount) amount = 1;
	var toCheck = [];
	if (game.jobs.Miner.owned >= amount) toCheck.push('Miner');
	if (game.jobs.Farmer.owned >= amount) toCheck.push('Farmer');
	if (game.jobs.Lumberjack.owned >= amount) toCheck.push('Lumberjack');
	if (toCheck.length == 0) return false;
	var selected = toCheck[Math.floor(Math.random() * toCheck.length)];
	game.jobs[selected].owned -= amount;
	game.resources.trimps.employed -= amount;
	return true;
}



function calculateMaxAfford(itemObj, isBuilding, isEquipment, isJob, forceMax){ //don't use forceMax for jobs until you fix that second return
	if (!itemObj.cost){
		console.log("no cost");
		return 1;
	}
	var mostAfford = -1;
	var currentOwned = (itemObj.purchased) ? itemObj.purchased : ((itemObj.level) ? itemObj.level : itemObj.owned);
	if (!currentOwned) currentOwned = 0;
	if (isJob && game.global.firing) return Math.floor(currentOwned * game.global.maxSplit);
	//if (itemObj == game.equipment.Shield) console.log(currentOwned);
	for (var item in itemObj.cost){
		var price = itemObj.cost[item];
		var toBuy;
		var resource = game.resources[item];
		var resourcesAvailable = resource.owned;
		if (game.global.maxSplit != 1 && !forceMax) resourcesAvailable = Math.floor(resourcesAvailable * game.global.maxSplit);
		if (!resource || typeof resourcesAvailable === 'undefined'){
			console.log("resource " + item + " not found");
			return 1;
		}
		if (typeof price[1] !== 'undefined'){
			var start = price[0];
			if (isEquipment){
				var artMult = Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level);
				if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.metallicThumb !== 'undefined'){
					artMult *= dailyModifiers.metallicThumb.getMult(game.global.dailyChallenge.metallicThumb.strength);
				}
				start = Math.ceil(start * artMult);
			} 
			if (isBuilding && game.portal.Resourceful.level) start = Math.ceil(start * (Math.pow(1 - game.portal.Resourceful.modifier, game.portal.Resourceful.level)));
			toBuy = Math.floor(log10(((resourcesAvailable / (start * Math.pow(price[1], currentOwned))) * (price[1] - 1)) + 1) / log10(price[1]));
			//if (itemObj == game.equipment.Shield) console.log(toBuy);
		}
		else if (typeof price === 'function') {
			return 1;
		}
		else {
			if (isBuilding && game.portal.Resourceful.level) price = Math.ceil(price * (Math.pow(1 - game.portal.Resourceful.modifier, game.portal.Resourceful.level)));
			toBuy = Math.floor(resourcesAvailable / price);
		}
		if (mostAfford == -1 || mostAfford > toBuy) mostAfford = toBuy;
	}
	if (isBuilding && mostAfford > 1000000000) return 1000000000;
	if (mostAfford <= 0) return 1;	
	return mostAfford;
}

function getTooltipJobText(what, toBuy) {
    var job = game.jobs[what];
	if (toBuy <= 0) toBuy = game.global.buyAmt;
	if (toBuy == "Max") toBuy = calculateMaxAfford(job, false, false, true);
	var fullText = "";
    for (var item in job.cost) {
		var result = (checkJobItem(what, false, item, false, toBuy))
        var color =  (result === 0) ? "orange" : ((result == true) ? "green" : "red");
        fullText += '<span class="' + color + '">' + item + ':&nbsp;' + checkJobItem(what, false, item, true, toBuy) + '</span>, ';
    }
    fullText = fullText.slice(0, -2);
    return fullText;
}

function canAffordJob(what, take, workspaces, updatingLabel) {
	var ignoreWorkspaces = (game.jobs[what].allowAutoFire && game.options.menu.fireForJobs.enabled && updatingLabel);
	if (workspaces <= 0 && !ignoreWorkspaces) return false;
    var trimps = game.resources.trimps;
	var toBuy = 1;
	if (game.global.buyAmt == "Max"){
		workspaces = Math.floor(workspaces * game.global.maxSplit);
		if (workspaces <= 0) workspaces++;
		if (!updatingLabel) toBuy = calculateMaxAfford(game.jobs[what], false, false, true);
	}
	else toBuy = game.global.buyAmt;
    if (!ignoreWorkspaces && workspaces >= 0 && workspaces < toBuy) toBuy = workspaces;
    if (!ignoreWorkspaces && (trimps.owned - trimps.employed - toBuy < 0)) return false;
    var job = game.jobs[what];
    for (var costItem in job.cost) {
        if (checkJobItem(what, take, costItem, null, toBuy) !== true) return false;
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
	if (game.resources[costItem].max > 0 && getMaxForResource(costItem) < price){
		return 0;
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

function buyUpgrade(what, confirmed, noTip, heldCtrl) {
	if (game.options.menu.pauseGame.enabled) return;
	if (!confirmed && !noTip && game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) return;
    if (what == "Coordination") {
       if (!canAffordCoordinationTrimps()) return false;
    }
    var upgrade = game.upgrades[what];
	if (upgrade.locked == 1) return;
    var canAfford = canAffordTwoLevel(upgrade);
    if (!canAfford) return false;
	var usingCtrl = (typeof heldCtrl !== 'undefined') ? heldCtrl : (game.options.menu.ctrlGigas.enabled && what == "Gigastation") ? true : ctrlPressed;
	if (what == "Gigastation" && !confirmed && game.options.menu.confirmhole.enabled){
		tooltip('Confirm Purchase', null, 'update', 'You are about to purchase a Gigastation, <b>which is not a renewable upgrade</b>. Make sure you have purchased all of the Warpstations you can afford first!', 'buyUpgrade(\'Gigastation\', true, false, ' + usingCtrl + ')');
		return;
	}
	if (what == "Shieldblock" && !confirmed && game.options.menu.confirmhole.enabled && game.global.highestLevelCleared >= 30){
		tooltip('Confirm Purchase', null, 'update', 'You are about to modify your Shield, causing it to block instead of grant health until your next portal. Are you sure?', 'buyUpgrade(\'Shieldblock\', true)');
		return;
	}
	canAfford = canAffordTwoLevel(upgrade, true);
    upgrade.fire(usingCtrl);
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
		if (!noTip) tooltip(what, "upgrades", "update");
        return true;
    } else if (dif == 1) {
		if (!noTip) tooltip(what, "upgrades", "update");
        document.getElementById(what + "Owned").innerHTML = upgrade.done;
        return true;
    }
    document.getElementById("upgradesHere").removeChild(document.getElementById(what));
    if (!noTip) tooltip("hide");
	return true;
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
	//Add potency (book)
	if (game.upgrades.Potency.done > 0) potencyMod *= Math.pow(1.1, game.upgrades.Potency.done);
	//Add Nurseries
	if (game.buildings.Nursery.owned > 0) potencyMod *= Math.pow(1.01, game.buildings.Nursery.owned);
	//Add Venimp
	if (game.unlocks.impCount.Venimp > 0) potencyMod *= Math.pow(1.003, game.unlocks.impCount.Venimp);
	//Broken Planet
	if (game.global.brokenPlanet) potencyMod /= 10;
	//Pheromones
	potencyMod *= 1+ (game.portal.Pheromones.level * game.portal.Pheromones.modifier);
	//Geneticist
	if (game.jobs.Geneticist.owned > 0) potencyMod *= Math.pow(.98, game.jobs.Geneticist.owned);
	//Quick Trimps
	if (game.unlocks.quickTrimps) potencyMod *= 2;
	if (game.global.challengeActive == "Daily"){
		if (typeof game.global.dailyChallenge.dysfunctional !== 'undefined'){
			potencyMod *= dailyModifiers.dysfunctional.getMult(game.global.dailyChallenge.dysfunctional.strength);
		}
		if (typeof game.global.dailyChallenge.toxic !== 'undefined'){
			potencyMod *= dailyModifiers.toxic.getMult(game.global.dailyChallenge.toxic.strength, game.global.dailyChallenge.toxic.stacks);
		}
	}
	if (game.global.challengeActive == "Toxicity" && game.challenges.Toxicity.stacks > 0){
		potencyMod *= Math.pow(game.challenges.Toxicity.stackMult, game.challenges.Toxicity.stacks);
	}
	if (game.global.voidBuff == "slowBreed"){
		potencyMod *= 0.2;
	}
	potencyMod = calcHeirloomBonus("Shield", "breedSpeed", potencyMod);
	breeding = breeding * potencyMod;
    updatePs(breeding, true);

	potencyMod = (1 + (potencyMod / 10));
	var timeRemaining = log10((trimpsMax - trimps.employed) / (trimps.owned - trimps.employed)) / log10(potencyMod);
	timeRemaining /= 10;
	

	//Calculate full breed time
	var fullBreed = 0;
	var adjustedMax = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend : trimps.maxSoldiers;
	var totalTime = log10((trimpsMax - trimps.employed) / (trimpsMax - adjustedMax - trimps.employed)) / log10(potencyMod);
	totalTime /= 10;
	game.global.breedTime = adjustedMax / breeding;
	if (game.jobs.Geneticist.locked == false && game.global.Geneticistassist && game.global.GeneticistassistSetting > 0){
		var target = game.global.GeneticistassistSetting;
		//tired of typing Geneticistassist
		var GAElem = document.getElementById('Geneticistassist');
		var GAIndicator = document.getElementById('GAIndicator');
		var canRun = false;
		var now = new Date().getTime();
		if (lastGAToggle == -1) canRun = true;
		else if (new Date().getTime() > lastGAToggle + 2000){
			lastGAToggle = -1;
			canRun = true;
		}
		if (GAElem && canRun){
			var tooSlow = potencyMod < 1.00000000001;
			var thresh = totalTime * 0.02;
			var compareTime = (timeRemaining > 1 && (timeRemaining > target + 1)) ? (timeRemaining - 1) : totalTime;
			if (!isFinite(thresh)) thresh = 0;
			if (!isFinite(compareTime)) compareTime = 999;
			var genDif = Math.ceil(log10(target / compareTime) / log10(1.02));
			if (compareTime < target) {
				swapClass("state", "stateHiring", GAElem);
				
				if (game.resources.food.owned * 0.01 < getNextGeneticistCost() && !tooSlow){
					GAIndicator.innerHTML = " (<span style='font-size: 0.8em' class='glyphicon glyphicon-apple'></span>)";
				}
				else if (!tooSlow && (timeRemaining < 1 || ((target - ((now - lastSoldierSentAt) / 1000)) > timeRemaining))) {
					if (genDif > 0){
						if (genDif > 10) genDif = 10;
						addGeneticist(genDif);
					}
					GAIndicator.innerHTML = " (+)";
				}
				else GAIndicator.innerHTML = " (<span style='font-size: 0.8em' class='icmoon icon-clock3'></span>)";
			}
			else if (compareTime - thresh > target || (potencyMod == 1)) {
				if (!isFinite(genDif)) genDif = -1;
				swapClass("state", "stateFiring", GAElem);
				GAIndicator.innerHTML = " (-)";
				if (genDif < 0){
					if (genDif < -10) genDif = -10;
					removeGeneticist(Math.abs(genDif));
				}
			}
			else {
				swapClass("state", "stateHappy", GAElem);
				GAIndicator.innerHTML = "";
			}
		}
	}
	timeRemaining = (game.options.menu.showFullBreed.enabled > 0) ? timeRemaining.toFixed(1) : Math.ceil(timeRemaining);
	timeRemaining += " Secs";	
		//Display full breed time if desired
	var totalTimeText = totalTime.toFixed(1);
	if (game.options.menu.showFullBreed.enabled){		
		fullBreed = totalTimeText + " Secs";
		timeRemaining += " / " + fullBreed;
	}
	
	if (trimps.owned >= trimpsMax) {
        trimps.owned = trimpsMax;
		document.getElementById("trimpsTimeToFill").innerHTML = (fullBreed) ? fullBreed : "";
		if (!game.global.fighting && totalTimeText == "0.0"){
			updateStoredGenInfo(breeding);
		}
        return;
    }
	document.getElementById("trimpsTimeToFill").innerHTML = timeRemaining;	
    trimps.owned += breeding / game.settings.speed;
	if (trimps.owned >= trimpsMax) trimps.owned = trimpsMax;
	if (game.portal.Anticipation.level) game.global.lastBreedTime += (1000 / game.settings.speed);
	updateStoredGenInfo(breeding);
}

function updateStoredGenInfo(breeding){
	if (game.jobs.Geneticist.locked == 0) {
		if (game.global.breedBack > 0) game.global.breedBack -= breeding / game.settings.speed;
		if (game.global.lowestGen == -1) game.global.lowestGen = game.jobs.Geneticist.owned;
		else if (game.jobs.Geneticist.owned < game.global.lowestGen) game.global.lowestGen = game.jobs.Geneticist.owned;
	}	
}

var lastGAToggle = -1;
var GATimeout;
function toggleGeneticistassist(updateOnly){
	var steps = game.global.GeneticistassistSteps;
	var currentStep = steps.indexOf(game.global.GeneticistassistSetting);
	var indicatorElem = document.getElementById('GAIndicator');
	if (indicatorElem == null) return;
	if (currentStep == -1){
		game.global.GeneticistassistSetting = steps[0];
		updateOnly = true;
	}
	indicatorElem.innerHTML = "";
	if (!updateOnly){
		currentStep++;
		if (currentStep > (steps.length - 1)) currentStep = 0;
		game.global.GeneticistassistSetting = steps[currentStep];
		if (currentStep > 0){ 
			indicatorElem.innerHTML = ' (2)';
			clearTimeout(GATimeout);
			GATimeout = setTimeout(function(){ indicatorElem.innerHTML = ' (1)' }, 1000);
			lastGAToggle = new Date().getTime();
		}
		else {lastGAToggle = -1; clearTimeout(GATimeout)};
	}
	swapClass("state", "stateDanger", document.getElementById('Geneticistassist'));
	currentStep = steps[currentStep];
	var text = "";
	if (currentStep == -1) {
		text = "Disabled";
	}
	else text = "<span class='icomoon icon-target'></span> " + currentStep + " Second" + ((currentStep > 1) ? "s" : "");
	document.getElementById("GeneticistassistSetting").innerHTML = text;
}

function customizeGATargets(){
	var error = "";
	var toKeep = [-1];
	var disableCheck = document.getElementById('disableOnUnlockCheck');
	if (disableCheck != null){
		game.options.menu.GeneticistassistTarget.disableOnUnlock = disableCheck.checked;
		if (disableCheck.checked && game.jobs.Geneticist.locked) game.global.GeneticistassistSetting = -1;
	}
	for (var x = 1; x <= 3; x++){
		var elem = document.getElementById('target' + x);
		if (!elem) {
			error = "Unable to pull info from input boxes. Try saving and refreshing?";
			break;
		}
		var val = parseFloat(elem.value);
		if (toKeep.indexOf(val) != -1) {
			error = val + " cannot be used twice. Please choose unique numbers!";
			break;
		}
		if (isNumberBad(val)){
			error = elem.value + " seconds would be really difficult to target. Could you pick a slightly more... numerical number?";
			break;
		}
		if (val > 60 || val < 0.5) {
			error = "All numbers must be between 0.5 and 60. " + elem.value + " is not within that range.";
			break;
		}
		toKeep.push(val);
	}
	if (error){
		document.getElementById("GATargetError").innerHTML = error;
		return;
	}
	var currentStep = game.global.GeneticistassistSteps.indexOf(game.global.GeneticistassistSetting);
	if (currentStep == -1) currentStep = 0;
	cancelTooltip();
	game.global.GeneticistassistSteps = toKeep;
	game.global.GeneticistassistSetting = toKeep[currentStep];
	toggleGeneticistassist(true);
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

function getHighestPrestige(){
	var lowest = -1;
	for (var item in game.equipment) {
		var prestige = game.equipment[item].prestige;
		if (lowest == -1) lowest = prestige;
		else if (lowest < prestige) lowest = prestige;
	}
	return lowest;
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
	if (game.options.menu.pauseGame.enabled == 1) return;
	var cost = updateMapCost(true);
	var newLevel = parseInt(document.getElementById("mapLevelInput").value, 10);
	if (!newLevel || newLevel <= 5 || newLevel > game.global.world || isNaN(newLevel) || isNaN(cost)) {
		message("You must create a map between level 6 and your highest zone, " + game.global.world + ".", "Notices");
		return -1;
	}
	if (cost > 0 && game.resources.fragments.owned >= cost){
		if (game.global.mapsOwnedArray.length >= 100) {
			message("Woah, that's a lot of maps. You're certain your Scientists will just lose them if you make any more. Better recycle a few of them, it's good for the environment anyways.", "Notices");
			return -2;
		}
		game.resources.fragments.owned -= cost;	
		createMap(newLevel);
		if (!game.global.currentMapId) selectMap(game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id);
		return 1;
	}
	else message("You can't afford this map! You need " + prettify(cost) + " fragments.", "Notices");
	return -3;
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
    var newMap = {
        id: "map" + game.global.totalMapsEarned,
        name: mapName[0],
		location: (locationOverride) ? locationOverride : mapName[1],
        clears: 0,
        level: world,
        difficulty: mapDifficulty,
        size: (sizeOverride) ? sizeOverride : Math.floor(getRandomMapValue("size")),
        loot: (lootOverride) ? lootOverride : lootg,
		noRecycle: setNoRecycle ? true : false
    };
	if (newMap.location == 'Plentiful' && game.global.decayDone){
		newMap.loot += .25;
	}
	game.global.mapsOwnedArray.push(newMap);
    if (!messageOverride) message("You just made " + mapName[0] + "!", "Loot", "th-large", null, 'secondary');
    unlockMap(game.global.mapsOwnedArray.length - 1);
}

function checkVoidMap() {
	if (game.global.totalPortals < 5) return;
	var dif = game.global.lastVoidMap;	
	var max = game.global.voidMaxLevel;
	if (game.global.lastPortal != -1){
			if (game.global.voidMaxLevel < game.global.world){
				game.global.voidMaxLevel = game.global.world;
				if ((game.global.lastPortal + 25) < game.global.world) 
					game.global.voidMaxLevel = game.global.highestLevelCleared;
			}
		if ((max - game.global.lastPortal) < 25) {
			max = game.global.lastPortal;
		}
	}
	if (max > 200) max = 200;
	var min = (max > 80) ? (1000 + ((max - 80) * 13)) : 1000;
	min *= (1 - (game.heirlooms.Shield.voidMaps.currentBonus / 100));
	min *= (1 - (game.goldenUpgrades.Void.currentBonus));
	var chance = (Math.floor((game.global.lastVoidMap - min) / 10) / 50000);
	game.global.lastVoidMap++;
	if (chance < 0) return;
	if (seededRandom(game.global.voidSeed++) >= chance) return;	
	createVoidMap();
	game.global.lastVoidMap = 0;
	return 1;
}

function seededRandom(seed){
	var x = Math.sin(seed++) * 10000;
	return parseFloat((x - Math.floor(x)).toFixed(7));
}

function getRandomIntSeeded(seed, minIncl, maxExcl) {
	return Math.floor(seededRandom(seed) * (maxExcl - minIncl)) + minIncl;
}

function createVoidMap() {
	var prefixes = ['Deadly', 'Poisonous', 'Heinous', 'Destructive']; //Must match size of void specials
	var suffixes = ['Nightmare', 'Void', 'Descent', 'Pit'];
	//Size/loot/dif
	var profiles = [[100, 3, 4], [90, 2.5, 4], [100, 2.5, 3.5], [85, 2, 4.5]]; //If a difficulty below 3.5 or above 5.5 is ever added, don't forget to work something out with planetBreaker and buffVoidMaps first. Sorry! -Past you
	var voidSpecials = ['doubleAttack', 'slowBreed', 'getCrit', 'bleed'];
	game.global.totalMapsEarned++;
	var prefixNum = Math.floor(Math.random() * prefixes.length);
	var suffixNum = Math.floor(Math.random() * suffixes.length);
	profiles = profiles[suffixNum];
	if (game.global.world <= 59) {
		profiles[2] -= 2;
		profiles[1] -= 1;
	}
	if (game.global.challengeActive == "Mapocalypse") profiles[2] = profiles[2] + game.challenges.Mapocalypse.difficultyIncrease;
	game.global.mapsOwnedArray.push({
		id: "map" + game.global.totalMapsEarned,
		name: prefixes[prefixNum] + " " + suffixes[suffixNum],
		location: "Void",
		clears: 0,
		level: -1,
		size: profiles[0],
		loot: (game.unlocks.goldMaps) ? (profiles[1] + 1) : profiles[1],
		difficulty: profiles[2],
		noRecycle: true,
		voidBuff: voidSpecials[prefixNum]
	});
	game.global.totalVoidMaps++;
	message("A chill runs down your spine, and the bad guy quickly frosts over. A purple glow radiates from the ground in front of you, and a Void Map appears.", "Loot", "th-large", "voidMessage", 'secondary');
	addVoidAlert();
	unlockMap(game.global.mapsOwnedArray.length - 1);
}

function buffVoidMaps(){
	for (var x = 0; x < game.global.mapsOwnedArray.length; x++){
		var map = game.global.mapsOwnedArray[x];
		if (map.location != "Void" || map.difficulty >= 3.5) continue;
		map.loot += 1;
		map.difficulty += 2;
	}
	refreshMaps();
	if (game.global.currentMapId === "") clearMapDescription();
}

function addVoidAlert(){ 
	var alert = document.getElementById('voidAlert')
	if (alert !== null) {
		alert.innerHTML = game.global.totalVoidMaps;
		return;
	}
	document.getElementById('mapsBtn').innerHTML += ' <span id="voidAlert" class="alert badge">' + game.global.totalVoidMaps + '</span>';
}

var voidBuffConfig = {
		doubleAttack: {
			icon: 'icomoon icon-pushpin',
			text: 'This bad guy attacks twice - once before you, and once again after you.',
			title: 'Void Attack',
		},
		slowBreed: {
			icon: 'icomoon icon-cloudy2',
			text: 'This map is reducing the repopulation speed of your Trimps by 80%.',
			title: 'Void Gas',
		},
		getCrit: {
			icon: 'icomoon icon-heart6',
			text: 'This bad guy has a 25% chance to crit you for 400% extra damage.',
			title: 'Void Strength',
		},
		bleed: {
			icon: "icomoon icon-drop",
			text: 'Every time this bad guy attacks, you will lose an additional 20% of your <b>current</b> health.',
			title: 'Void Bleed',
		}
}

function setVoidBuffTooltip(){
	var buff = voidBuffConfig[game.global.voidBuff];
	var stackCount = "";
	var elem = document.getElementById('voidBuff');
	elem.innerHTML = '<span class="badge badBadge voidBadge" onmouseover="tooltip(\'' + buff.title + '\', \'customText\', event, \'' + buff.text + '\')" onmouseout="tooltip(\'hide\')"><span class="' + buff.icon + '"></span></span>';
}

var heirloomsShown = false;
var selectedMod;
function toggleHeirlooms(){
	heirloomsShown = !heirloomsShown;
	document.getElementById("heirloomWrapper").style.display = (heirloomsShown) ? "block" : "none";
	document.getElementById("wrapper").style.display = (heirloomsShown) ? "none" : "block";
	if (heirloomsShown) populateHeirloomWindow();
	else {
		game.global.selectedHeirloom = [];
		if (game.options.menu.autoSave.enabled == 1) save();
	}
}

function calcHeirloomBonus(type, name, number, getValueOnly){
	var mod = game.heirlooms[type][name];
	if (!mod) return number;
	if (getValueOnly) return mod.currentBonus;
	if (mod.currentBonus <= 0) return number;
	return (number * ((mod.currentBonus / 100) + 1));
}

function populateHeirloomWindow(){
	//Reset
	hideHeirloomSelectButtons();
	//Equipped hat
	document.getElementById("ShieldEquipped").innerHTML = generateHeirloomIcon(game.global.ShieldEquipped, "Equipped");
	document.getElementById("ShieldEquippedName").innerHTML = (typeof game.global.ShieldEquipped.name !== 'undefined') ? game.global.ShieldEquipped.name : "Nothing.";
	//Equipped staff
	document.getElementById("StaffEquipped").innerHTML = generateHeirloomIcon(game.global.StaffEquipped, "Equipped");
	document.getElementById("StaffEquippedName").innerHTML = (typeof game.global.StaffEquipped.name !== 'undefined') ? game.global.StaffEquipped.name : "Nothing.";
	displayAddCarriedBtn();
	displayCarriedHeirlooms();
	displayExtraHeirlooms();
	document.getElementById("nullifiumCount").innerHTML = prettify(game.global.nullifium);
	document.getElementById("recycleAllHeirloomsBtn").style.display = (game.global.heirloomsExtra.length) ? "inline-block" : "none";
}

function displayCarriedHeirlooms(){
	var tempHtml = "";
	for (var x = 0; x < game.global.heirloomsCarried.length; x++){
		if (game.global.heirloomsCarried[x] == null) {
			game.global.heirloomsCarried.splice(x, 1);
			x--;
			continue;
		}
		tempHtml += generateHeirloomIcon(game.global.heirloomsCarried[x], "Carried", x);
	}
	if (!tempHtml) tempHtml += "You are not carrying any Heirlooms";
	document.getElementById("carriedHeirloomsHere").innerHTML = tempHtml;
}

function getNextCarriedCost(){
	return (game.heirlooms.values[game.global.maxCarriedHeirlooms - 1] * 4);
}

function displayAddCarriedBtn(){
	var s = (game.global.maxCarriedHeirlooms > 1) ? "s" : "";
	document.getElementById("carriedHeirloomsText").innerHTML = " - You can carry <b>" + game.global.maxCarriedHeirlooms + "</b> additional Heirloom" + s + " through the Portal.";
	var elem = document.getElementById("addCarriedBtn");
	if (game.global.maxCarriedHeirlooms > game.heirlooms.values.length){
		elem.style.display = "none";
		return;
	}
	elem.style.display = "inline-block";
	var cost = getNextCarriedCost();
	elem.innerHTML = "Add Slot (" + cost + " Nu)";
	if (game.global.nullifium < cost) swapClass("heirloomBtn", "heirloomBtnInactive", elem);
	else swapClass("heirloomBtn", "heirloomBtnActive", elem);
}

function addCarried(confirmed){
	if (game.global.maxCarriedHeirlooms > game.heirlooms.values.length){
		elem.style.display = "none";
		return;
	}
	var cost = getNextCarriedCost();
	if (game.global.nullifium < cost) return;
	if (!confirmed) {
		tooltip('confirm', null, 'update', 'You are about to purchase 1 extra slot to carry Heirlooms through the Portal for ' + cost + ' Nullifium. Are you sure?' , 'addCarried(true)', 'Upgrade Carried Slots');
		return;
	}
	game.global.nullifium -= cost;
	game.global.maxCarriedHeirlooms++;
	populateHeirloomWindow();
}

function toggleHeirloomHelp(){
	var elem = document.getElementById("heirloomHelp");
	elem.style.display = (elem.style.display == "block") ? "none" : "block";
}

function displayExtraHeirlooms(){
	var tempHtml = "";
	var extraExtraText = game.global.heirloomsExtra.length;
	if (!extraExtraText) {
		document.getElementById("extraHeirloomsHere").innerHTML = "You have no extra Heirlooms";
		document.getElementById("extraHeirloomsText").innerHTML = "";
		return;
	}
	for (var y = 0; y < extraExtraText; y++){
		tempHtml += generateHeirloomIcon(game.global.heirloomsExtra[y], "Extra", y);
	}
	document.getElementById("extraHeirloomsHere").innerHTML = tempHtml;
	var s = (extraExtraText > 1) ? "s" : "";
	document.getElementById("extraHeirloomsText").innerHTML = " - " + extraExtraText + " Heirloom" + s + ", recycled for " + recycleAllExtraHeirlooms(true) + " Nu on Portal";
	
}

function selectHeirloom(number, location, elem){
	game.global.selectedHeirloom = [number, location];
	populateHeirloomWindow();
	var heirloom = game.global[location];
	if (number > -1) heirloom = heirloom[number];
	switch (location){
		case "StaffEquipped":
		case "ShieldEquipped":
			document.getElementById("equippedHeirloomsBtnGroup").style.visibility = "visible";
			break;
		case "heirloomsCarried":	
			document.getElementById("carriedHeirloomsBtnGroup").style.visibility = "visible";
			document.getElementById("equipHeirloomBtn").innerHTML = (typeof game.global[heirloom.type + "Equipped"].name === 'undefined') ? "Equip" : "Swap";
			break;
		case "heirloomsExtra":
			document.getElementById("extraHeirloomsBtnGroup").style.visibility = "visible";
			document.getElementById("equipHeirloomBtn2").innerHTML = (typeof game.global[heirloom.type + "Equipped"].name === 'undefined') ? "Equip" : "Swap";
			if (game.global.heirloomsCarried.length < game.global.maxCarriedHeirlooms) swapClass("heirloomBtn", "heirloomBtnActive", document.getElementById("carryHeirloomBtn"));
			document.getElementById("recycleHeirloomBtn").innerHTML = "Recycle (+" + prettify(getTotalHeirloomRefundValue(heirloom)) + " Nullifium)";
			break;
	}
	displaySelectedHeirloom();
}

function recycleHeirloom(confirmed){
	var heirloom = getSelectedHeirloom();
	if (game.global.selectedHeirloom[0] == -1 || game.global.selectedHeirloom[1] == "heirloomsCarried") return;
	var value = Math.floor(getTotalHeirloomRefundValue(heirloom));
	if (!confirmed) {
		tooltip('confirm', null, 'update', 'You are about to recycle ' + heirloom.name + ' for ' + prettify(value) + ' Nullifium. Are you sure?' , 'recycleHeirloom(true)', 'Recycle Heirloom');
		return;
	}
	game.global.nullifium += value;
	game.global.heirloomsExtra.splice(game.global.selectedHeirloom[0], 1);
	populateHeirloomWindow();
}

function recycleAllExtraHeirlooms(valueOnly){
	var extraHeirlooms = game.global.heirloomsExtra;
	var value = 0;
	for (var item in extraHeirlooms){
		value += getTotalHeirloomRefundValue(extraHeirlooms[item]);
	}
	if (valueOnly) return value;
	game.global.nullifium += value;
	game.global.heirloomsExtra = [];
}

function recycleAllHeirloomsClicked(confirmed){
	if (!confirmed){
		var s = (game.global.heirloomsExtra.length == 1) ? "" : "s";
		var messageString = "You have " + game.global.heirloomsExtra.length + " extra Heirloom" + s + ", which will be recycled for " + prettify(recycleAllExtraHeirlooms(true)) + " Nullifium. Are you sure?";
		tooltip("confirm", null, "update", messageString, "recycleAllHeirloomsClicked(true)", "Recycle All Heirlooms");
		return;
	}
	recycleAllExtraHeirlooms();
	populateHeirloomWindow();
}

function recalculateHeirloomBonuses(){
	for (var item in game.heirlooms.Staff) game.heirlooms.Staff[item].currentBonus = 0;
	for (var item in game.heirlooms.Shield) game.heirlooms.Shield[item].currentBonus = 0;
	if (game.global.StaffEquipped){
		for (var item in game.global.StaffEquipped.mods){
			var mod = game.global.StaffEquipped.mods[item];
			game.heirlooms.Staff[mod[0]].currentBonus = mod[1];
		}	
	}
	if (game.global.ShieldEquipped){
		for (var item in game.global.ShieldEquipped.mods){
			var mod = game.global.ShieldEquipped.mods[item];
			game.heirlooms.Shield[mod[0]].currentBonus = mod[1];
		}	
	}
}


function unequipHeirloom(heirloom, toLocation){
	if (!heirloom) heirloom = getSelectedHeirloom();
	game.global[heirloom.type + "Equipped"] = {};
	if (toLocation == "heirloomsCarried") game.global.heirloomsCarried.push(heirloom);
	else game.global.heirloomsExtra.push(heirloom);
	//Remove bonuses
	for (var item in game.heirlooms[heirloom.type]){
		game.heirlooms[heirloom.type][item].currentBonus = 0;
	}
	populateHeirloomWindow();
}

function equipHeirloom(){
	var heirloom = getSelectedHeirloom();
	if (game.global.selectedHeirloom[1] == "heirloomsExtra") game.global.heirloomsExtra.splice(game.global.selectedHeirloom[0], 1);
	else game.global.heirloomsCarried.splice(game.global.selectedHeirloom[0], 1);
	if (typeof game.global[heirloom.type + "Equipped"].name !== 'undefined') unequipHeirloom(game.global[heirloom.type + "Equipped"], game.global.selectedHeirloom[1]);
	game.global[heirloom.type + "Equipped"] = heirloom;
	//Add bonuses
	for (var item in heirloom.mods){
		game.heirlooms[heirloom.type][heirloom.mods[item][0]].currentBonus += heirloom.mods[item][1];
	}
	populateHeirloomWindow();
	if (checkLowestHeirloom() >= 5) giveSingleAchieve(5);
}

function checkLowestHeirloom(){
	var lowest = game.global.StaffEquipped.rarity;
	if (lowest > game.global.ShieldEquipped.rarity) lowest = game.global.ShieldEquipped.rarity;
	return lowest;
}

function carryHeirloom(){
	var heirloom = getSelectedHeirloom();
	if (game.global.heirloomsCarried.length >= game.global.maxCarriedHeirlooms) return;
	game.global.heirloomsExtra.splice(game.global.selectedHeirloom[0], 1);
	game.global.heirloomsCarried.push(heirloom);
	populateHeirloomWindow();
}

function stopCarryHeirloom(){
	var heirloom = getSelectedHeirloom();
	game.global.heirloomsCarried.splice(game.global.selectedHeirloom[0], 1);
	game.global.heirloomsExtra.push(heirloom);
	populateHeirloomWindow();
}

function getSelectedHeirloom(locationOvr, indexOvr){
	if (typeof locationOvr === 'undefined') locationOvr = game.global.selectedHeirloom[1];
	if (typeof indexOvr === 'undefined') indexOvr = game.global.selectedHeirloom[0];
	var heirloom = game.global[locationOvr];
	if (indexOvr > -1) heirloom = heirloom[indexOvr];
	return heirloom;
}

function hideHeirloomSelectButtons(){
	document.getElementById("equippedHeirloomsBtnGroup").style.visibility = "hidden";
	document.getElementById("carriedHeirloomsBtnGroup").style.visibility = "hidden";
	document.getElementById("extraHeirloomsBtnGroup").style.visibility = "hidden";
	swapClass("heirloomBtn", "heirloomBtnInactive", document.getElementById("carryHeirloomBtn"));
	document.getElementById("selectedHeirloom").innerHTML = "";
	document.getElementById("modBreakdown").style.display = "none";
}

function generateHeirloomIcon(heirloom, location, number){
	if (typeof heirloom.name === 'undefined') return "<span class='icomoon icon-sad3'></span>";
	var icon = (heirloom.type == "Shield") ? 'icomoon icon-shield3' : 'glyphicon glyphicon-grain';
	var html = '<span class="heirloomThing heirloomRare' + heirloom.rarity;
	if (location == "Equipped") html += ' equipped';
	var locText = "";
	if (location == "Equipped") locText += '-1,\'' + heirloom.type + 'Equipped\'';
	else locText += number + ', \'heirlooms' + location + '\'';	
	html += '" onmouseover="tooltip(\'Heirloom\', null, event, null, ' + locText + ')" onmouseout="tooltip(\'hide\')" onclick="selectHeirloom(';
	html += locText + ', this)"> <span class="' + icon + '"></span></span>';
	return html;
}

function htmlEncode(text) {
	text = text.replace("&", "&amp;");
	text = text.replace("'", "&apos;");
	text = text.replace('"', "&quot;");
	text = text.replace("<", "&lt;");
	text = text.replace(">", "&gt;");
	return text;
}

function displaySelectedHeirloom(modSelected, selectedIndex, fromTooltip, locationOvr, indexOvr, fromPopup){
	if (fromPopup && !game.options.menu.voidPopups.enabled) return;
	var heirloom = getSelectedHeirloom(locationOvr, indexOvr);
	var icon = (heirloom.type == "Shield") ? 'icomoon icon-shield3' : 'glyphicon glyphicon-grain';
	var html = '<div class="selectedHeirloomItem heirloomRare' + heirloom.rarity + '"><div class="row selectedHeirloomRow"><div class="col-xs-2 selectedHeirloomIcon"><span class="' + icon + '"></span></div><div class="col-xs-10"><span onclick="renameHeirloom(';
	if (fromPopup) html += 'false, true';
	html += ')" id="selectedHeirloomTitle">' + heirloom.name + '</span> '
	if (!fromTooltip) html += '<span id="renameContainer"></span>';
	html+= '</div></div>';
	if (!fromTooltip && (game.global.selectedHeirloom[1] == "StaffEquipped" || game.global.selectedHeirloom[1] == "ShieldEquipped")) html += '<span class="heirloomEquipped">Equipped</span><br/>';
	var noneEmpty = true;
	var opacity = (modSelected) ? 'style="opacity: 0.5" ' : '';
	for (var x = 0; x < heirloom.mods.length; x++){
		if (heirloom.mods[x][0] == "empty"){
				html += '- <span class="heirloomMod heirloomModEmpty" '
				if (modSelected && selectedIndex != x) html += opacity; 
				html += 'onclick="selectMod(' + x;
				if (fromPopup) html += ', true';
				html+= ')">Empty</span><br/>';
			}
		else{
			html += '&bull; <span class="heirloomMod" ';
			if (modSelected && selectedIndex != x) html += opacity;
			html += 'onclick="selectMod(' + x;
			if (fromPopup) html += ', true';
			html += ')">' + heirloom.mods[x][1] + '% ' + game.heirlooms[heirloom.type][heirloom.mods[x][0]].name + '</span><br/>';
		}
	}
	if (fromTooltip) return html;
	if (fromPopup){
		document.getElementById("heirloomsPopupHere").innerHTML = html;
		document.getElementById("heirloomsPopup").style.display = "inline-block";
		return;
	}
	document.getElementById("selectedHeirloom").innerHTML = html;
}

function renameHeirloom(cancel, fromPopup){
	if (fromPopup && !swapFromPopup()) return;
	var inputText = document.getElementById("heirloomNameInput");
	var heirloom = getSelectedHeirloom();
	var titleElem = document.getElementById("selectedHeirloomTitle");
	var containerElem = document.getElementById("renameContainer");
	if (cancel){
		containerElem.innerHTML = "";
		titleElem.innerHTML = heirloom.name;
		return;
	}
	if (!inputText){
		containerElem.innerHTML = "<input maxlength='25' id='heirloomNameInput' value='" + heirloom.name + "'/> <span onclick='renameHeirloom()' class='renameHeirloomBtn'>Save</span><span class='renameHeirloomBtn' onclick='renameHeirloom(true)'>Cancel</span>";
		titleElem.innerHTML = "";
		return;
	}
	var value = inputText.value;
	if (value.length < 1) return;
	value = htmlEncode(value.substring(0, 25));
	heirloom.name = value;
	titleElem.innerHTML = value;
	if (game.global.selectedHeirloom[1] == (heirloom.type + "Equipped")) document.getElementById(heirloom.type + "EquippedName").innerHTML = value;
	containerElem.innerHTML = "";
}

function closeHeirPopup(){
	document.getElementById("heirloomsPopup").style.display = "none";
}

function swapFromPopup(){
	closeHeirPopup();
	if (!heirloomsShown) toggleHeirlooms();
	if (game.global.heirloomsExtra.length) {
		game.global.selectedHeirloom = [game.global.heirloomsExtra.length - 1, "heirloomsExtra"];
		displaySelectedHeirloom();
		return true;
	}
	return false;
}

function selectMod(which, fromPopup){
	if (fromPopup && !swapFromPopup()) return;
	selectedMod = which;
	displaySelectedHeirloom(true, which);
	var heirloom = getSelectedHeirloom();
	var mod = heirloom.mods[which];
	var modConfig = game.heirlooms[heirloom.type][mod[0]];
	document.getElementById("modBreakdown").style.display = "block";
	buildModOptionDdl(heirloom.type, heirloom.rarity);
	document.getElementById("modUpgradeBox").style.display = (mod[0] == "empty" || checkModCap(mod, modConfig, heirloom)) ? "none" : "block";
	var replaceCost = getModReplaceCost(heirloom, mod);
	var upgradeCost = getModUpgradeCost(heirloom, which);
	var replaceBtn = document.getElementById("modReplaceBtn");
	var upgradeBtn = document.getElementById("modUpgradeBtn");
	var newClass = (replaceCost > game.global.nullifium) ? "heirloomBtnInactive" : "heirloomBtnActive";
	swapClass("heirloomBtn", newClass, replaceBtn);
	newClass = (upgradeCost > game.global.nullifium) ? "heirloomBtnInactive" : "heirloomBtnActive";
	swapClass("heirloomBtn", newClass, upgradeBtn);
	replaceBtn.innerHTML = (mod[0] == "empty") ? "Add (" + prettify(replaceCost) + " Nu)" : "Replace (" + prettify(replaceCost) + " Nu)";
	document.getElementById("modUpgradeCost").innerHTML = "Upgrade to " + getModUpgradeValue(heirloom, which) + "%";
	upgradeBtn.innerHTML = "Upgrade (" + prettify(upgradeCost) + " Nu)";
}

function checkModCap(mod, modConfig, heirloom){
	if (!modConfig.cap) return false;
	var steps = (modConfig.steps) ? modConfig.steps : game.heirlooms.defaultSteps;
	steps = steps[heirloom.rarity];
	if (mod[1] >= steps[1]) return true;
	return false;
}

function getModUpgradeValue(heirloom, modIndex){
	var mod = heirloom.mods[modIndex]
	var modConfig = game.heirlooms[heirloom.type][mod[0]];
	var step = (typeof modConfig.steps !== 'undefined') ? modConfig.steps : game.heirlooms.defaultSteps;
	step = step[heirloom.rarity];
	var result = parseFloat(mod[1] + step[2]);
	if (modConfig.cap && result > step[1]) result = step[1];
	result = (Math.round(result * 10) / 10);
	return (result);
}

function getModUpgradeCost(heirloom, modIndex){
	var mod = heirloom.mods[modIndex]
	if (mod[0] == 'critChance' && mod[1] >= 30) return Infinity;
	if (mod[0] == 'voidMaps' && mod[1] >= 50) return Infinity;
	var cost = (game.heirlooms.values[heirloom.rarity] / 2);
	cost *= getStepPriceIncrease(heirloom, mod);
	return Math.floor(cost);
}

function getStepPriceIncrease(heirloom, mod){
	var modConfig = game.heirlooms[heirloom.type][mod[0]];
	var priceIncrease = [2, 1.5, 1.25, 1.19, 1.15, 1.12, 1.1, 1.06]
	var step = (typeof modConfig.steps !== 'undefined') ? modConfig.steps : game.heirlooms.defaultSteps;
	step = step[heirloom.rarity];
	if (mod[1] <= step[1]) return 1;
	return Math.pow(priceIncrease[heirloom.rarity], ((mod[1] - step[1]) / step[2]));
}

function getTotalHeirloomRefundValue(heirloom){
	var total = 0;
	for (var x = 0; x < heirloom.mods.length; x++){
		var thisMod = heirloom.mods[x];
		//Create a dummy heirloom with a copy of this mod at 0 upgrades to count price
		var dummyHeirloom = setupDummyHeirloom(heirloom, thisMod);
		total += countPriceOfUpgrades(dummyHeirloom, heirloom.mods[x][3]);
	}
	var result = Math.floor(total) + Math.floor(game.heirlooms.values[heirloom.rarity] / 2);
	if (isNumberBad(result)) return 0;
	return result;
}

//Dummy heirloom for mod recycle price calculating
function setupDummyHeirloom(heirloom, mod){
	var modConfig = game.heirlooms[heirloom.type][mod[0]];
	var step = (typeof modConfig.steps !== 'undefined') ? modConfig.steps : game.heirlooms.defaultSteps;
	step = step[heirloom.rarity];
	var dummyMod = [mod[0], mod[1] - (mod[3] * step[2]), mod[2], 0, mod[4]];
	var dummyHeirloom = {rarity: heirloom.rarity, step: step[2], type: heirloom.type, mods: [dummyMod]};
	return dummyHeirloom;
}

function countPriceOfUpgrades(dummyHeirloom, count){
	var total = 0;
	for (var x = 0; x < count; x++){
		total += Math.ceil(getModUpgradeCost(dummyHeirloom, 0));
		dummyHeirloom.mods[0][3]++;
		dummyHeirloom.mods[0][1] += dummyHeirloom.step;
	}
	return total;
}

function upgradeMod(confirmed){
	var heirloom = getSelectedHeirloom();
	var cost = Math.ceil(getModUpgradeCost(heirloom, selectedMod));
	if (game.global.nullifium < cost) return;
	if (!confirmed && game.options.menu.boneAlerts.enabled == 1) {
		tooltip('confirm', null, 'update', 'You are about to upgrade ' + game.heirlooms[heirloom.type][heirloom.mods[selectedMod][0]].name + ' for ' + prettify(cost) + ' Nullifium. Are you sure?' , 'upgradeMod(true)', 'Upgrade Mod');
		return;
	}
	game.global.nullifium -= cost;
	var newBonus = getModUpgradeValue(heirloom, selectedMod);
	var mod = heirloom.mods[selectedMod];
	mod[1] = newBonus;
	if (typeof mod[3] !== 'undefined') mod[3]++;
	else { //can remove this on launch
		mod[2] = 0;
		mod[3] = 1;
	}
	game.heirlooms[heirloom.type][heirloom.mods[selectedMod][0]].currentBonus = newBonus;
	displaySelectedHeirloom();
	selectHeirloom(game.global.selectedHeirloom[0], game.global.selectedHeirloom[1]);
	selectMod(selectedMod);
	document.getElementById("nullifiumCount").innerHTML = prettify(game.global.nullifium);
}

function getModReplaceCost(heirloom, mod){
	var value = game.heirlooms.values[heirloom.rarity];
	return (mod[0] == "empty") ? value : (value * 3);
}

function replaceMod(confirmed){
	var heirloom = getSelectedHeirloom();
	var mod = heirloom.mods[selectedMod];
	var cost = getModReplaceCost(heirloom, mod);
	var newModName = document.getElementById("modReplaceSelect").value;
	if (newModName == -1) return;
	var newMod = game.heirlooms[heirloom.type][newModName];
	if (typeof newMod === 'undefined'){
		console.log("something broke");
		return;
	}
	if (game.global.nullifium < cost) return;
	if (!confirmed && game.options.menu.boneAlerts.enabled == 1) {
		var oldName = game.heirlooms[heirloom.type][heirloom.mods[selectedMod][0]].name;
		var text = (oldName == "Empty") ? "You are about to add " : "You are about to replace " + oldName + " with ";
		text += newMod.name + ' for ' + prettify(cost) + ' Nullifium. ';
		if (oldName != "Empty"){
			if (mod[3] > 0){
				var cost = countPriceOfUpgrades(setupDummyHeirloom(heirloom, mod), mod[3]);
				text += "<br/><br/><b>You have already purchased " + mod[3] + " upgrades for " + oldName + " and spent a total of " + prettify(cost) + " Nullifium. <span style='color:red'>Replacing this mod will not refund your Nu, and it will be permanently lost</span></b>.";
			}
		}
		text += " Are you sure?";
		tooltip('confirm', null, 'update', text, 'replaceMod(true)', 'Replace Mod');
		return;
	}
	game.global.nullifium -= cost;
	var steps = (typeof newMod.steps !== 'undefined') ? newMod.steps : game.heirlooms.defaultSteps;
	steps = steps[heirloom.rarity];
	mod[0] = newModName;
	if (!heirloom.repSeed)
		heirloom.repSeed = getRandomIntSeeded(game.global.heirloomSeed, 1, 10e6);
	mod[4] = getRandomIntSeeded(heirloom.repSeed++, 1, 10e6);
	steps = getRandomBySteps(steps, mod);
	mod[1] = steps[0];
	mod[2] = steps[1];
	mod[3] = 0;
	recalculateHeirloomBonuses();
	displaySelectedHeirloom();
	selectMod(selectedMod);
	document.getElementById("nullifiumCount").innerHTML = prettify(game.global.nullifium);
}

function buildModOptionDdl(type, rarity){
	var html = '';
	var baseValue = game.heirlooms.values[rarity] * 5;
	html += '<option value="-1">Select a Mod</option>';
	for (var item in game.heirlooms[type]){
		if (item == 'empty') continue;
		
		if (checkSelectedModsFor(item)) continue;
		var thisMod = game.heirlooms[type][item];
		if (typeof thisMod.filter !== 'undefined' && !thisMod.filter()) continue;
		html += '<option value="' + item + '">' + thisMod.name + '</option>';
	}
	document.getElementById("modReplaceSelect").innerHTML = html;
}

function setHeirRareText(forBones){
	var rarityBreakpoint = (forBones) ? getHeirloomZoneBreakpoint(game.global.highestLevelCleared + 1) : getHeirloomZoneBreakpoint();
	var nextAt = "";
	var html = "";
	if (!forBones){
		if (rarityBreakpoint == game.heirlooms.rarityBreakpoints.length) nextAt = "Max Rarity";
		else nextAt = "Next Rarity Increase at Z" + game.heirlooms.rarityBreakpoints[rarityBreakpoint];
		html = "<b>Current Heirloom Drop Rates</b> - " + nextAt + "<br/>";
	}
	var rarities = game.heirlooms.rarities[rarityBreakpoint];	
	for (var x = 0; x < rarities.length; x++){
		if (rarities[x] == -1) continue;
		if (!forBones) html += "<div class='rarityBdBox heirloomRare" + x + "'>" + game.heirlooms.rarityNames[x] + "<br/>" + (rarities[x] / 100) + "%</div>";	
		else html += "<div class='rarityBdBox heirloomRare" + x + " forBones' title='" + game.heirlooms.rarityNames[x] + "'>" + (rarities[x] / 100) + "%</div>";
	}
	if (forBones) document.getElementById("heirloomRarityMisc").innerHTML = html;
	else	document.getElementById("heirRare").innerHTML = html;
}

function checkSelectedModsFor(what){
	var heirloom = getSelectedHeirloom();
	for (var mod in heirloom.mods){
		if (heirloom.mods[mod][0] == what) return true;
	}
	return false;
}

function createHeirloom(zone, fromBones){
	var slots = [1, 2, 2, 3, 3, 4, 4, 5];
	var rarityNames = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Magnificent', 'Ethereal', 'Magmatic'];
	//Determine Type
	var seed = (fromBones) ? game.global.heirloomBoneSeed : game.global.heirloomSeed;
	var type = (getRandomIntSeeded(seed++, 0, 2) == 0) ? "Shield" : "Staff";
	//Sort through modifiers and build a list of eligible items. Check filters if applicable
	var elligible = [];
	for (var item in game.heirlooms[type]){
		var heirloom = game.heirlooms[type][item];
		if (typeof heirloom.filter !== 'undefined' && !heirloom.filter()) continue;
		elligible.push(item);
	}
	//Determine type rarity
	var rarity = getHeirloomRarity(zone, seed++);
	slots = slots[rarity];
	var name = rarityNames[rarity] + " " + type;
	//Heirloom configuration
	//{name: "", type: "", rarity: #, mods: [[ModName, value, createdStepsFromCap, upgradesPurchased, seed]]}
	var buildHeirloom = {name: name, type: type, repSeed: getRandomIntSeeded(seed++, 1, 10e6), rarity: rarity, mods: []};
	var x = 0;
	for (x; x < slots; x++){
		var roll = getRandomIntSeeded(seed++, 0, elligible.length);
		var thisMod = elligible[roll];
		elligible.splice(roll, 1);
		var steps = (typeof game.heirlooms[type][thisMod].steps !== 'undefined') ? game.heirlooms[type][thisMod].steps : game.heirlooms.defaultSteps;
		steps = getRandomBySteps(steps[rarity], null, fromBones);
		buildHeirloom.mods.push([thisMod, steps[0], steps[1], 0, getRandomIntSeeded(seed++, 0, 1000)]);
	}
	seed += 6 - (x * 2);
	buildHeirloom.mods.sort(function(a, b){
		a = a[0].toLowerCase();
		b = b[0].toLowerCase();
		if (a == "empty") return 1;
		if (b == "empty") return -1;
		 if (a < b)
		  return -1;
		 if (a > b)
		  return 1;
		 return 0;
	})
	game.global.heirloomsExtra.push(buildHeirloom);
	displaySelectedHeirloom(false, 0, false, "heirloomsExtra", game.global.heirloomsExtra.length - 1, true);
	game.stats.totalHeirlooms.value++;
	checkAchieve("totalHeirlooms");
	if (heirloomsShown) displayExtraHeirlooms();
	if (fromBones) game.global.heirloomBoneSeed = seed;
	else game.global.heirloomSeed = seed;
}

function getRandomBySteps(steps, mod, fromBones){
		var seed;
		if (mod && typeof mod[4] !== 'undefined'){
			seed = mod[4]++;
		}
		else {
			seed = (fromBones) ? game.global.heirloomBoneSeed++ : game.global.heirloomSeed++;
		}
		var possible = ((steps[1] - steps[0]) / steps[2]);
		var roll = getRandomIntSeeded(seed, 0, possible + 1);
		var result = steps[0] + (roll * steps[2]);
		result = Math.floor(result * 10) / 10;
		return ([result, (possible - roll)]);
}

function getHeirloomZoneBreakpoint(zone){
	if (!zone) zone = game.global.world;
	var rarityBreakpoints = game.heirlooms.rarityBreakpoints;
	for (var x = 0; x < rarityBreakpoints.length; x++){
		if (zone < rarityBreakpoints[x]) return x;
	}
	return rarityBreakpoints.length;
}

function getHeirloomRarity(zone, seed){ //zone is optional, and will override world
	if (!zone) zone = game.global.world;
	var rarities = game.heirlooms.rarities[getHeirloomZoneBreakpoint(zone)];
	var nextTest = 0;
	var selectedRarity;
	var rarityRoll = getRandomIntSeeded(seed, 0, 10000);
	for (var y = 0; y < rarities.length; y++){
		if (rarities[y] == -1) continue;
		nextTest += rarities[y];
		if (rarityRoll < nextTest) {
			selectedRarity = y;
			break;
		}
	}
	if (zone >= 146 && selectedRarity == 1) giveSingleAchieve(9);
	return selectedRarity;
}

function getRandomMapValue(what) { //what can be size, difficulty, or loot for now
    var amt = game.mapConfig[what + "Base"];
    var range = game.mapConfig[what + "Range"];
	var advValue = document.getElementById(what + "AdvMapsRange").value;
	if (advValue > 9) advValue = 9;
	else if (advValue < 0) advValue = 0;
	var min;
	var max;
	if (advValue > 0){
		var minMax = getMapMinMax(what, advValue);
		min = minMax[0];
		max = minMax[1];
		game.global.sessionMapValues[what] = advValue;
	}
	else{
		min = amt - range;
		max = amt + range;
		game.global.sessionMapValues[what] = 0;
    }
	min *= 100;
	max *= 100;
	var x = Math.floor(Math.random() * (max + 1 - min)) + min;
	return (x / 100).toFixed(3)
}

function getRandomMapName() {
    var namesObj = game.mapConfig.names;
    var roll = Math.floor(Math.random() * (namesObj.prefix.length - 1));
    var name = namesObj.prefix[roll];
	var suffix;
	var biome = document.getElementById("biomeAdvMapsSelect").value;
	game.global.sessionMapValues.biome = biome;
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

var mutations = {
	Corruption: {
		start: function (ignoreCorrupted){
			var start = (game.talents.headstart.purchased && !game.global.runningChallengeSquared) ? ((game.talents.headstart2.purchased) ? ((game.talents.headstart3.purchased) ? 151 : 166) : 176) : 181;
			if (ignoreCorrupted) return start;
			return (game.global.challengeActive == "Corrupted") ? 60 : start;
		},
		active: function (){
			return (game.global.world >= this.start());
		},
		cellCount: function(){
			var possible = Math.floor((game.global.world - this.start()) / 3) + 2;
			if (possible > 80) possible = 80;
			return possible;
		},
		pattern: function (currentArray) {
		   var possible = this.cellCount();   
		   var spread = (Math.floor(possible / 6) + 1) * 10;
		   if (spread > 100) spread = 100;
		   var addCorrupteds = getAmountInRange(spread, possible);
		   for (var a = 0; a < addCorrupteds.length; a++){
			if (currentArray[addCorrupteds[a]] != "") continue;
			currentArray[addCorrupteds[a]] = "Corruption";
		   }
		   return currentArray;
		  },
		attack: function (cellNum, name) {
			return game.global.getEnemyAttack(cellNum, name, true) * this.statScale(3);
		},
		health: function (cellNum, name) {
			return game.global.getEnemyHealth(cellNum, name, true) * this.statScale(10);
		},
		statScale: function (base){
			var startPoint = (game.global.challengeActive == "Corrupted") ? 1 : 150;
			var scales = Math.floor((game.global.world - startPoint) / 6);
			base *= Math.pow(1.05, scales);
			return base;			
		},
		reward: function (effect) {
			if (game.global.world < 20 || game.global.runningChallengeSquared) return;
			var percentage = (game.global.challengeActive == "Corrupted") ? 0.075 : 0.15;
			var baseValue = (game.global.world >= this.start(true)) ? 10 : 5;
			if (mutations.Magma.active()) baseValue *= 3;
			var amt = rewardResource("helium", baseValue, 99, false, percentage);
			var text = "The corruption quickly swirls into the air and dissipates. <span class='helium'>You see " + prettify(amt) + " canisters of Helium left on the ground and pick them up. Useful!</span>";
			message(text, "Loot", "oil", "voidMessage", "helium");			
		},
		tooltip: function (effectName) {
			var text = "All corrupted enemies currently deal " + prettify(this.statScale(3)) + "X attack and have " + prettify(this.statScale(10)) + "X health. In addition, ";
			text += mutationEffects[effectName].text;
			text += " It will also drop " + ((game.global.challengeActive == "Corrupted") ? "7.5%" : "15%") + " of the helium you would normally get from completing this zone.";
			return text;
		},
		effects: ['corruptDbl', 'corruptBleed', 'corruptStrong', 'corruptTough', 'corruptDodge', 'corruptCrit'],
		namePrefix: 'Corrupt'
	},
	Magma: {
		start: function (){
			var number = 230;
			return number;
		},
		active: function (){
			return (game.global.canMagma && game.global.world >= this.start());
		},
        minBranchLength : 1,
        maxBranchLength : 2,
        get targetCells () {return (game.talents.magmaFlow.purchased) ? 18 : 16},
        get singlePathMaxSize () {return (game.talents.magmaFlow.purchased) ? 18 : 16},
        discardMultiplePaths: true,
        discardMaxThreshold: 20,
		multiplier: -1,
		lastCalculatedMultiplier: -1,
		getTrimpDecay: function (demandRecount){
			if (!this.active) return;
			if (this.multiplier == -1 || demandRecount) {
				var start = this.start();
				var zones = game.global.world - this.start() + 1;
				this.multiplier = 1;
				for (var x = 0; x < zones; x++){
					this.multiplier *= this.getTrimpDecayMult(x + start);
				}
				this.lastCalculatedMultiplier = game.global.world;
			}
			return this.multiplier;
		},
		increaseTrimpDecay: function () {
			if (this.lastCalculatedMultiplier >= game.global.world) return;
			if (this.multiplier == -1) {
				this.getTrimpDecay(true);
				return;
			}
			var newMult = this.getTrimpDecayMult();
			this.multiplier *= newMult;
			this.lastCalculatedMultiplier = game.global.world;
		},
		getTrimpDecayMult: function (world){
			return 0.8;
		},
        getEligibleOrigin: function(currentArray, riversPrior) {
			if(game.global.world % 5 === 0 && riversPrior === 0) {
				return {x: 9, y: 9};
			}
            var b,i,x,y;
           
            loop:
            for(b = 0; b < 100; b++) { //random a position on the edge
                var random = getRandomIntSeeded(game.global.mutationSeed++, 0, 10);
                var side = getRandomIntSeeded(game.global.mutationSeed++, 0, 4);
               
                var originX, originY;
               
                switch(side) {
                    case 0:
                        originX = 0;
                        originY = random;
                        break;
                    case 1:
                        originX = 9;
                        originY = random;
                        break;
                    case 2:
                        originX = random;
                        originY = 0;
                        break;
                    default:
                        originX = random;
                        originY = 9;
                }
               
                for(x = originX - 1; x <= originX + 1; x++) { //check all 9 cells around the randomed origin; retry if any of them is occupied
                    for(y = originY - 1; y <= originY + 1; y++) {
                        if(x < 0 || x > 9 || y < 0 || y > 9)
                            continue;
                       
                        if(currentArray[x * 10 + y] == "Magma")
                            continue loop;
                    }
                }
               
                return {x: originX, y: originY};
            }
           
            return null; //if there is no space available on edges
        },
        addBranch: function(currentArray, arr, length, direction) {
            var count = 0;
           
            if(direction !== undefined) {
                for(var i = 0; i < length; i++) {
                    var vector; //this is the x,y of the next cell to occupy
                    switch(direction) { //translate direction
                        case 0:
                            vector = {x: arr[arr.length - 1].x + 1, y: arr[arr.length - 1].y}; //up
                            break;
                        case 1:
                            vector = {x: arr[arr.length - 1].x - 1, y: arr[arr.length - 1].y}; //down
                            break;
                        case 2:
                            vector = {x: arr[arr.length - 1].x, y: arr[arr.length - 1].y + 1}; //right
                            break;
                        default:
                            vector = {x: arr[arr.length - 1].x, y: arr[arr.length - 1].y - 1}; //mystery
                    }
                   
                    if(vector.x < 0 || vector.x > 9 || vector.y < 0 || vector.y > 9) //end the branch if out of bounds
                        return count;
                   
                    switch(direction) { //check the 5 cells in the direction of which we're going
                                        //for example going up we'll be checking these cells:
                                        //-----
                                        //-XXX-
                                        //-X|X-
                                        //-----
                        case 0:
                            for(var x = vector.x; x <= vector.x + 1; x++) { //iterating over the 6 cells
                                for(var y = vector.y - 1; y <= vector.y + 1; y++) {
                                    if(x == vector.x && y == vector.y) //ignore origin
                                        continue;
                                   
                                    if(x < 0 || x > 9 || y < 0 || y > 9) //ignore out of bounds
                                        continue;
                                   
                                    if(currentArray[x * 10 + y] == "Magma") //end the branch if one of the cells is occupied
                                        return count;
                                }
                            }
                            break;
                        case 1:
                            for(var x = vector.x; x >= vector.x - 1; x--) {
                                for(var y = vector.y - 1; y <= vector.y + 1; y++) {
                                    if(x == vector.x && y == vector.y)
                                        continue;
                                   
                                    if(x < 0 || x > 9 || y < 0 || y > 9)
                                        continue;
                                   
                                    if(currentArray[x * 10 + y] == "Magma")
                                        return count;
                                }
                            }
                            break;
                        case 2:
                            for(var x = vector.x - 1; x <= vector.x + 1; x++) {
                                for(var y = vector.y; y <= vector.y + 1; y++) {
                                    if(x == vector.x && y == vector.y)
                                        continue;
                                   
                                    if(x < 0 || x > 9 || y < 0 || y > 9)
                                        continue;
                                   
                                    if(currentArray[x * 10 + y] == "Magma")
                                        return count;
                                }
                            }
                            break;
                        default:
                            for(var x = vector.x - 1; x <= vector.x + 1; x++) {
                                for(var y = vector.y; y >= vector.y - 1; y--) {
                                    if(x == vector.x && y == vector.y)
                                        continue;
                                   
                                    if(x < 0 || x > 9 || y < 0 || y > 9)
                                        continue;
                                   
                                    if(currentArray[x * 10 + y] == "Magma")
                                        return count;
                                }
                            }
                    }
                   
                    currentArray[vector.x * 10 + vector.y] = "Magma"; //if all is okay, continue the branch
                    arr.push(vector);
                    count++;
                }
            }
           
            return count; //return the number of cells this branch succesfully occupied
        },
        addPrettyRiver: function(currentArray, origin, length) {
            var arr = [origin]; //this is the full array of vectors of the path just as a helper to other functions
            var i,j,l;
           
            var branchLength, previousDirection = -1, pathDone;
           
            for(i = 0; i < 100; i++) {
                branchLength = getRandomIntSeeded(game.global.mutationSeed++,
                length < this.minBranchLength ? length : this.minBranchLength,
                length > this.maxBranchLength ? this.maxBranchLength + 1 : length + 1);
               
                var dirArr;
               
                if(i == 0) { //always generate first branch facing outwards from edge origin point
                    dirArr = [];
                    dirArr[0] = origin.x == 0 ? 0 : (origin.x == 9 ? 1 : (origin.y == 0 ? 2 : 3));
                }
                else { //next branches use a viable direction determined by this
                    dirArr = getAmountInRange(4, 4); //get a random array of directions
                    l = dirArr.length;
                    for(j = 0; j < l; j++) {
                        if(dirArr[j] == previousDirection ||
                           (dirArr[j] == 0 && previousDirection == 1) ||
                           (dirArr[j] == 1 && previousDirection == 0) ||
                           (dirArr[j] == 2 && previousDirection == 3) ||
                           (dirArr[j] == 3 && previousDirection == 2)
                           ) // don't go the same way as before or opposite
                            dirArr[j] = null;
                    }
                   
                    for(j = 0; j < 4; j++) { //delete the thrown away directions
                        l = dirArr.indexOf(null);
                        if(l > -1)
                            dirArr.splice(l, 1);
                        else
                            break;
                    }
                   
                    if(dirArr[0] === undefined) //if all directions were not viable, quit out of the entire river
                        return length;          //return leftover length
                }
               
               
                for(j = 0; j < 4; j++) {
                    pathDone = this.addBranch(currentArray, arr, branchLength, dirArr[0]); //try doing a branch in one of the directions from the array of directions
                    if(pathDone > 0) { //if the branch placed at least one cell, break out and do another branch
                        length -= pathDone; //reduce length leftover by number of cells done by branch
                        previousDirection = dirArr[0];
                        break;
                    }
                   
                    dirArr.splice(0, 1); //if the branch did not place any cells, remove the direction from the direction array
                   
                    if(dirArr[0] === undefined) //if all directions were not viable, quit out of the entire river
                        return length;          //return leftover length
                }
           
                if(length <= 0) //if there's no leftover length, we're done
                    break;
            }
           
            return length;
        },
        generateRivers : function (currentArray) {
            var i, origin, riversAmt = 0;
           
            var targetCells = this.targetCells;
			var singlePathMaxSize = this.singlePathMaxSize;
            for(var i = 0; i < 20; i++) {
                if(targetCells > 0) { //if we're still supposed to be adding cells
                    var newTarget = targetCells > singlePathMaxSize ? singlePathMaxSize : targetCells; //determine target river length
                   
                    origin = this.getEligibleOrigin(currentArray, riversAmt);
                    if(origin === null) { //this will never occur unless the edges of the map are completely filled up
                        return riversAmt;
                    }
                   
                    currentArray[origin.x * 10 + origin.y] = "Magma"; //the origin is not part of the path, so we're adding it here
                   
                    riversAmt++;
                   
                    if(newTarget - 1 <= 0 && targetCells - 1 <= 0) { // if there's only 1 length left to make a path, just do the origin, then leave
                        break;
                    }
                   
                    var cellsLeftOver = this.addPrettyRiver(currentArray, origin, newTarget - 1);
                    targetCells -= newTarget - cellsLeftOver;
                }
                else break;
            }
           
            return riversAmt;
        },
        pattern: function (currentArray) {
            var i, j, rivers;
           
            var tempCurrentArray = [];
            for(i = 0; i < currentArray.length; i++)
                tempCurrentArray[i] = currentArray[i];
           
            var threshold = this.discardMultiplePaths ? this.discardMaxThreshold : 1;
           
            for(i = 0; i <= threshold; i++) {
                rivers = this.generateRivers(currentArray);
				if(rivers == Math.ceil(this.targetCells / this.singlePathMaxSize))
					break;
                else if(i != threshold) {
                    for(j = 0; j < tempCurrentArray.length; j++)
                        currentArray[j] = tempCurrentArray[j];
                }
            }
           var replacedCorruptions = 0;
           
            for(i = 0; i < tempCurrentArray.length; i++) {
                if(tempCurrentArray[i] == "Corruption" && currentArray[i] == "Magma")
                    replacedCorruptions++;
            }
           
            if (replacedCorruptions > 0) {
                for(i = 0; i < currentArray.length; i++) {
                   if(currentArray[i] == "") {
                        currentArray[i] = "Corruption";
                        replacedCorruptions--;
                   
                        if(replacedCorruptions <= 0)
                            break;
                    }
                }
            }
           return currentArray;
          },
		attack: function (cellNum, name) {
			return game.global.getEnemyAttack(cellNum, name);
		},
		health: function (cellNum, name) {
			return game.global.getEnemyHealth(cellNum, name);
		},
		statScale: function (base){
			return base;			
		},
		reward: function (effect) {
			var amt;
			var text;
			if (game.global.generatorMode == 1 || (game.global.generatorMode == 2 && (getGeneratorFuelCap(false, true) - game.global.magmaFuel > 0.01))){
				amt = game.generatorUpgrades.Supply.modifier;
				var zoneCap = 0.2 + ((game.global.world - this.start()) * 0.01);
				amt = Math.min(amt, zoneCap);
				game.global.magmaFuel = Math.round((game.global.magmaFuel + amt) * 100) / 100;
				var cap = getGeneratorFuelCap(true);
				if (game.global.magmaFuel > cap){
					if (game.generatorUpgrades.Overclocker.upgrades > 0){
						var rate = getFuelBurnRate();
						var aboveCap = game.global.magmaFuel - cap;
						rate = Math.ceil(aboveCap / rate);
						text = "You earned " + prettify(amt) + " fuel, triggering " + rate + " Overclock" + ((rate > 1) ? "s" : "") + "!";
						for (var x = 0; x < rate; x++){
							generatorTick(true);
						}
						if (game.global.magmaFuel > cap) 
							game.global.magmaFuel = cap;
					}
					else {
						var dif = game.global.magmaFuel - cap;
						if (dif <= 0) dif = 0;
						amt -= dif;
						if (amt <= 0) amt = 0;
						text = "You earned " + prettify(amt) + " fuel! (" + prettify(dif) + " destroyed, not enough capacity)";
						game.global.magmaFuel = cap;
					}
				}
				else 
					text = "You earned " + prettify(amt) + " fuel!";
				changeGeneratorState(null, true);				
			}
			else{
				amt = getMagmiteReward();
				text = "You earned " + prettify(amt) + " Magmite!";
				game.global.magmite += amt;
				updateGeneratorUpgradeHtml();
				document.getElementById('upgradeMagmiteTotal').innerHTML = prettify(game.global.magmite) + " Mi";
			}
			updateGeneratorInfo();
			message(text, "Loot", "oil", "Magma", "magma");			
		},
		effects: ['none'],
		namePrefix: 'Magma'
	},
	Pumpkimp: {
		active: function (){
			return false;
		},
		pattern: function(currentArray) {
			var loc = getRandomIntSeeded(game.global.mutationSeed++, 0, 4);
			var design = [1,2,3,4,5,10,11,12,13,14,15,16,20,21,25,26,30,32,33,34,36,40,41,42,44,45,46,50,51,52,53,54,55,56,60,61,63,65,66,71,72,73,74,75,82,83,84,93];
			for (var x = 0; x < 100 - loc; x++){
				if (currentArray[x + loc] == "" && design.indexOf(x) != -1) currentArray[x + loc] = "Pumpkimp";
			}
            return currentArray;
        },
		effects: ['none'],
		namePrefix: 'Hallowed'
	},
	TrimpmasSnow: {
		active: function() {
			return false;
		},
		pattern: function(currentArray) {
			var winner, i, l = currentArray.length;
			for(i = 0; i < l; i++) {
				winner = "";
				if (currentArray[i] === ""){
					if ((i % 10) > 0 && currentArray[i - 1]){
						winner = currentArray[i - 1];
					}
					if (winner != "Magma" && i > 9 && currentArray[i - 10]){
						winner = currentArray[i - 10];
					}
					if (winner != "Magma" && i < 90 && currentArray[i + 10]){
						winner = currentArray[i + 10];
					}
					if (winner != "Magma" && (i % 10 < 9) && currentArray[i + 1]){
						winner = currentArray[i + 1];
					}
					if (winner == "Magma")
						winner = "HotSnow";
					else if (winner == "Corruption")
						winner = "CorruptSnow";
					else winner = "";
					currentArray[i] = (winner) ? winner : "TrimpmasSnow";
				}
			}
			return currentArray;
		},
		effects: ['none'],
		namePrefix: 'Snowy'
	},
	CorruptSnow: {
		active: function () {
			return false;
		},
		effects: ['none'],
		namePrefix: 'Snowy'
	},
	HotSnow: {
		active: function () {
			return false;
		},
		effects: ['none'],
		namePrefix: 'Snowy'	
	}
}

var mutationEffects = {
	corruptDbl: {
		icon: 'icomoon icon-pushpin',
		text: 'this bad guy attacks twice - once before you, and once again after you.',
		title: 'Corrupted Stamina'
	},
	corruptCrit: {
		icon: 'icomoon icon-heart6',
		text: 'this bad guy has a 25% chance to crit you for 400% extra damage.',
		title: 'Corrupted Precision'
	},
	corruptBleed: {
		icon: "icomoon icon-drop",
		text: 'every time this bad guy attacks, you will lose an additional 20% of your <b>current</b> health.',
		title: 'Corrupted Sharpness'
	},
	corruptStrong: {
		icon: 'icomoon icon-hammer',
		text: 'this bad guy has an additional 2x attack.',
		title: 'Corrupted Strength'
	},
	corruptTough: {
		icon: 'icomoon icon-shield2',
		text: 'this bad guy has an additional 5x health.',
		title: 'Corrupted Toughness'
	},
	corruptDodge: {
		icon: 'icomoon icon-air',
		text: 'this bad guy has a 30% chance to dodge your attacks.',
		title: 'Corrupted Agility'
	},
	magmaAttack: {
		icon: 'icomoon icon-pushpin',
		text: 'this bad guy has additional attack. On death, it will bestow 1 stack of magma attack on your Trimps',
		title: 'Magma Attack',
		onDeath: function (){
			game.magma.buffs.attack++;
		}
	},
	none: {
		icon: '',
		text: '',
		title: ''
	}
}

function startTheMagma(){
	tooltip('The Magma', null, 'update');
	var genSetting = game.options.menu.generatorStart.enabled;
	if (genSetting){
		if (genSetting == 3) game.global.generatorMode = 2;
		else if (genSetting == 2) game.global.generatorMode = 0;
		else if (genSetting == 1) game.global.generatorMode = 1;
	}
	drawAllBuildings();
	game.upgrades.Coordination.allowed += 100;
	drawAllUpgrades();
}

function decayNurseries(){
	if (game.buildings.Nursery.owned <= 0) return;
	game.buildings.Nursery.owned = Math.floor(game.buildings.Nursery.owned * 0.9);
}

function getMagmiteReward(){
/* 	var amt = game.global.world - 230;
	amt = Math.floor(amt / 5) + 1;
	return amt; */
	return 1;
}

function canAffordGeneratorUpgrade(){
	for (var unlock in game.generatorUpgrades){
		if (game.global.magmite >= game.generatorUpgrades[unlock].cost())
			return true;
	}
	for (var permUnlock in game.permanentGeneratorUpgrades){
		if (!game.permanentGeneratorUpgrades[permUnlock].owned && game.global.magmite >= game.permanentGeneratorUpgrades[permUnlock].cost)
			return true;
	}
	return false;
}


function getGeneratorFuelCap(includeStorage, checkingHybrid){
	var cap = game.generatorUpgrades.Capacity.modifier;
	if (checkingHybrid && game.permanentGeneratorUpgrades.Storage.owned){
		return cap * 1.5;
	}
	if (includeStorage && game.permanentGeneratorUpgrades.Storage.owned){
		return cap * 2;
	}
	else return cap;
}

function increaseTheHeat(){
	if (game.resources.trimps.soldiers > 0) {
		var newMult = mutations.Magma.getTrimpDecayMult(game.global.world);
		game.global.soldierCurrentAttack *= newMult;
		game.global.soldierHealthMax *= newMult;
		if (game.global.soldierHealth > game.global.soldierHealthMax) 
			game.global.soldierHealth = game.global.soldierHealthMax;
		if (game.global.soldierHealth <= 0) game.global.soldierHealth = 0;
	}	
}

function updateGeneratorInfo(){
	if (!mutations.Magma.active()) return;
	var elem = document.getElementById('generatorWindow');
	//update fuel
	var currentFuel = game.global.magmaFuel;
	//update efficiency
	var nextTickAmount = getGeneratorTickAmount();
	
	//get state
	var state = ['Passive', 'Active', 'Hybrid'];
	state = state[game.global.generatorMode];
	
	if (elem == null){
		var html = "<div class='thing generatorState' id='generatorWindow'><div id='genTitleContainer'> <div id='generatorTitle'>Dimensional Generator</div><div><span id='generatorActiveBtn' onclick='changeGeneratorState(1)' class='workBtn pointer noselect colorDanger hoverColor'>Gain Fuel</span> <span onclick='changeGeneratorState(0)' id='generatorPassiveBtn' class='workBtn pointer noselect colorPrimary hoverColor'>Gain Mi</span> <span onclick='changeGeneratorState(2)' id='generatorHybridBtn' class='workBtn pointer noselect colorTeal hoverColor' style='display: none'>Hybrid</span></div> <div id='generatorUpgradeBtn' onclick='tooltip(\"Upgrade Generator\", null, \"update\")'class='workBtn pointer noselect colorDark hoverColor'>Upgrade (<span id='upgradeMagmiteTotal'></span>)</div></div><div id='genGaugeContainer'><div class='row'><div class='col-xs-4'><div id='fuelContainer'><div id='fuelBar'></div><div id='fuelStorageBar'></div><div id='fuelGlass'></div><div id='fuelOwnedText'>Fuel<br/><span id='generatorFuelOwned'>0</span> / <span id='generatorFuelMax'>0</span></div></div></div><div class='col-xs-4'><div id='generatorProducingContainer'>Producing<br/><span id='generatorTrimpsPs'>0</span><br/>Housing/Tick</div></div><div class='col-xs-4'><div id='generatorTickContainer'> <div id='generatorRadialContainer' class='radial-progress'> <div class='radial-progress-circle'> <div class='radial-progress-arrow static''></div></div><div id='generatorRadial' class='radial-progress-circle'> <div class='radial-progress-arrow mobile'></div> </div> <div id='clockKnob' class='radial-progress-knob generatorState'></div></div><span id='generatorNextTick'>0</span></div></div></div></div></div>";
		document.getElementById('buildingsHere').innerHTML += html;
	}
	changeGeneratorState(null, true);
	if (game.permanentGeneratorUpgrades.Hybridization.owned) document.getElementById('generatorHybridBtn').style.display = 'inline';
	updateGeneratorFuel();
	document.getElementById('generatorTrimpsPs').innerHTML = prettify(scaleNumberForBonusHousing(nextTickAmount));
	document.getElementById('upgradeMagmiteTotal').innerHTML = prettify(game.global.magmite) + " Mi";	
}

function scaleNumberForBonusHousing(num){
	if (game.portal.Carpentry.level > 0) num = Math.floor(num * (Math.pow(1 + game.portal.Carpentry.modifier, game.portal.Carpentry.level)));
	if (game.portal.Carpentry_II.level > 0) num = Math.floor(num * (1 + (game.portal.Carpentry_II.modifier * game.portal.Carpentry_II.level)));
	if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.large !== "undefined") 
		num = Math.floor(num * dailyModifiers.large.getMult(game.global.dailyChallenge.large.strength));
	return num;
}

function buyGeneratorUpgrade(item){
	if (item == "Overclocker" && (!game.permanentGeneratorUpgrades.Hybridization.owned || !game.permanentGeneratorUpgrades.Storage.owned))
		return;
	var upgrade = game.generatorUpgrades[item];
	if (typeof upgrade === 'undefined') {
		buyPermanentGeneratorUpgrade(item);
		return;
	}
	var cost = upgrade.cost();
	if (game.global.magmite < cost) return;
	game.global.magmite -= cost;
	if (game.global.magmite <= 0) game.global.magmite = 0;
	if (typeof upgrade.nextModifier !== 'undefined') 
		upgrade.modifier = upgrade.nextModifier();
	upgrade.upgrades++;
	updateGeneratorUpgradeHtml();
	updateGeneratorInfo();
	showGeneratorUpgradeInfo(item);
}

function buyPermanentGeneratorUpgrade(item){
	var upgrade = game.permanentGeneratorUpgrades[item];
	if (typeof upgrade === 'undefined') return;
	var cost = upgrade.cost;
	if (game.global.magmite < cost) return;
	if (upgrade.owned) return;
	game.global.magmite -= cost;
	if (game.global.magmite <= 0) game.global.magmite = 0;
	upgrade.owned = true;
	updateGeneratorUpgradeHtml();
	updateGeneratorInfo();
	showGeneratorUpgradeInfo(item, true);
}

function getGeneratorUpgradeHtml(){
		var tooltipText = "<div id='generatorUpgradeTooltip'>";
		tooltipText += "<div class='generatorUpgradeTitle'>Multi Upgrades</div>";
		for (var item in game.generatorUpgrades){
			tooltipText += "<div class='thing pointer noselect thingColor' onclick='showGeneratorUpgradeInfo(\"" + item + "\")' id='generatorUpgrade" + item + "'></div>";		
		}
		tooltipText += "<div class='generatorUpgradeTitle'>One and Done Upgrades</div>";
		for (var item in game.permanentGeneratorUpgrades){
			tooltipText += "<div class='thing pointer noselect thingColor' onclick='showGeneratorUpgradeInfo(\"" + item + "\", true)' id='generatorUpgrade" + item + "'></div>";	
		}
		tooltipText += "<br/><div id='generatorUpgradeDescription' class='noselect'><b>Click an upgrade to learn more about it!</b><br/></div>";
		tooltipText += "</div>";
		return tooltipText;
}

function updateGeneratorUpgradeHtml(){
	if (document.getElementById('generatorUpgradeTooltip') == null) return;
	for (var item in game.generatorUpgrades){
		var elem = document.getElementById('generatorUpgrade' + item);
		if (elem == null) continue;
		var upgrade = game.generatorUpgrades[item];
		var cost = upgrade.cost();
		var text = item + "<br/>" + upgrade.upgrades;
		elem.innerHTML = text;
		var state = (game.global.magmite >= cost) ? "CanAfford" : "CanNotAfford";
		if (item == "Overclocker" && (!game.permanentGeneratorUpgrades.Hybridization.owned || !game.permanentGeneratorUpgrades.Storage.owned))
			state = "CanNotAfford";
		swapClass('thingColor', 'thingColor' + state, elem);
	}
	for (var item in game.permanentGeneratorUpgrades){
		var elem = document.getElementById('generatorUpgrade' + item);
		if (elem == null) continue;
		var upgrade = game.permanentGeneratorUpgrades[item];
		var cost = upgrade.cost;
		var text = item + "<br/>";
		text += (upgrade.owned) ? "Done" : prettify(cost) + " Mi";
		elem.innerHTML = text;
		var state;
		if (upgrade.owned) 
			state = "Done";
		else 
			state = (game.global.magmite >= cost) ? "CanAfford" : "CanNotAfford";
		swapClass('thingColor', 'thingColor' + state, elem);	
	}
	var magmiteElem = document.getElementById('magmiteOwned');
	if (magmiteElem != null) magmiteElem.innerHTML = "Magmite: " + prettify(game.global.magmite) + "<br/>";
	if (document.getElementById('magmiteCost') != null && lastViewedDGUpgrade)
		showGeneratorUpgradeInfo(lastViewedDGUpgrade[0], lastViewedDGUpgrade[1]);
}


function getGeneratorTickTime(){
	var baseTick = 60;
	var zoneMult = (game.talents.quickGen.purchased) ? 1.03 : 1.02;
	var tickTime = Math.ceil(1 / Math.pow(zoneMult, Math.floor((game.global.world - mutations.Magma.start()) / 3)) * baseTick * 10) / 10;
	return (tickTime < 5) ? 5 : tickTime;
}

function canGeneratorTick(){
	return (game.global.timeSinceLastGeneratorTick >= (getGeneratorTickTime() * 1000));
}

var lastViewedDGUpgrade;
function showGeneratorUpgradeInfo(item, permanent){
	var elem = document.getElementById('generatorUpgradeDescription');
	if (elem == null) return;
	var description;
	var cost;
	if (permanent) {
		description = game.permanentGeneratorUpgrades[item].description;
		cost = game.permanentGeneratorUpgrades[item].cost;
	}
	else {
		description = game.generatorUpgrades[item].description();
		cost = game.generatorUpgrades[item].cost();
	}
	var color = (game.global.magmite >= cost) ? "Success" : "Danger";
	if (item == "Overclocker" && (!game.permanentGeneratorUpgrades.Hybridization.owned || !game.permanentGeneratorUpgrades.Storage.owned))
			color = "Danger";
	var text;
	if (permanent && game.permanentGeneratorUpgrades[item].owned){
		color = "Grey";
		text = "Done";
	}
	else text = "Buy: " + prettify(cost) + " Magmite";
	elem.innerHTML = "<div id='generatorUpgradeName'>" + item + "</div><div onclick='buyGeneratorUpgrade(\"" + item + "\")' id='magmiteCost' class='pointer noSelect hoverColor color" + color + "'>" + text + "</div>" + description + "<br/>";
	lastViewedDGUpgrade = [item, permanent];
}

var thisTime = 0;
function updateNextGeneratorTickTime(){
    //update tick time
    var tickTime = getGeneratorTickTime();
    var nextTickIn = (tickTime * 1000) - game.global.timeSinceLastGeneratorTick;
    var framesPerVisual = 10;  
    nextTickIn /= 1000;
    nextTickIn = (isNumberBad(nextTickIn)) ? 0 : nextTickIn;
    nextTickIn = Math.round(nextTickIn * 10) / 10;
	if(Math.round((nextTickIn + 0.1) * 10) / 10 == tickTime) {
		thisTime = framesPerVisual - 1;
	}
    document.getElementById('generatorNextTick').innerHTML = prettify(Math.floor(nextTickIn + 1));
    var countingTick = Math.round((tickTime - nextTickIn) * 10) / 10;
    countingTick = Math.round(countingTick * 10) / 10;
	if (thisTime >= framesPerVisual - 1) {
		thisTime = 0;
		var timeRemaining = tickTime - countingTick;
		if(timeRemaining != 0 && timeRemaining <= framesPerVisual / 10) {
			timeRemaining -= 0.1;
			timeRemaining = Math.round(timeRemaining * 10) / 10;
			thisTime = framesPerVisual;
			framesPerVisual = timeRemaining * 10;
			thisTime -= framesPerVisual;
		}
		goRadial(document.getElementById('generatorRadial'), countingTick, tickTime, 100 * framesPerVisual);
	}
    else thisTime++;
}

function updateGeneratorFuel(){
	var currentFuel = game.global.magmaFuel;
	var maxFuel = getGeneratorFuelCap();
	document.getElementById('generatorFuelOwned').innerHTML = prettify(currentFuel);
	document.getElementById('generatorFuelMax').innerHTML = prettify(maxFuel);
	var bar = document.getElementById('fuelStorageBar');
	var percent;
	if (currentFuel > maxFuel) {
		var storageCap = getGeneratorFuelCap(true);
		
		percent = Math.ceil(((currentFuel - maxFuel) / (storageCap - maxFuel)) * 100);
		if (percent > 100) percent = 100;
		if (percent < 0) percent = 0;
		//bar.style.top = (100 - percent) + "%";
		bar.style.height = percent + "%";	
	}
	else {
		//bar.style.top = "100%";
		bar.style.height = "0%";
	}
	bar = document.getElementById('fuelBar');
	percent = Math.ceil((currentFuel / maxFuel) * 100);
	if (percent > 100) percent = 100;
	//bar.style.top = (100 - percent) + "%";
	bar.style.height = percent + "%";

}

function changeGeneratorState(to, updateOnly){
	//0 passive, 1 active, 2 hybrid
	if (!updateOnly)
		game.global.generatorMode = to;
	to = game.global.generatorMode;
	if (to == 2){
		if (game.global.magmaFuel < getGeneratorFuelCap(false, true)){
			to = 3;
		}
	}
	var state = ['Passive', 'Active', 'HybridPassive', 'HybridActive'];
	state = state[to];
	swapClass('generatorState', 'generatorState' + state, document.getElementById('generatorWindow'));
	swapClass('generatorState', 'generatorState' + state, document.getElementById('clockKnob'));
}

function generatorTick(fromOverclock){
	if (!mutations.Magma.active()) return;
	var fuelRate = getFuelBurnRate();
	if (!fromOverclock){
		if (game.global.magmaFuel < fuelRate) return;
		game.global.timeSinceLastGeneratorTick += 100;
		updateNextGeneratorTickTime();
		if (!canGeneratorTick()) {
			return;
		}
	}
	checkAchieve("housing", "Generator");
	var tickAmt = getGeneratorTickAmount();
	if (fromOverclock) tickAmt *= (1 - game.generatorUpgrades.Overclocker.modifier);
	game.stats.trimpsGenerated.value += scaleNumberForBonusHousing(tickAmt);
	game.global.trimpsGenerated += tickAmt;
	game.resources.trimps.max += tickAmt;
	game.global.magmaFuel = Math.round((game.global.magmaFuel - fuelRate) * 100) / 100;
	if (!fromOverclock){
		if (game.global.magmaFuel >= fuelRate)
			game.global.timeSinceLastGeneratorTick = 0;
		else {
			game.global.timeSinceLastGeneratorTick = 0;
			goRadial(document.getElementById('generatorRadial'), 0, 10, 0);
			document.getElementById('generatorNextTick').innerHTML = 0;
		}
	}
	updateGeneratorInfo();
	changeGeneratorState(null, true);
}

function getGeneratorTickAmount(){
	var fuelAmt = getGeneratorFuelCap();
	fuelAmt = (game.global.magmaFuel > fuelAmt) ? fuelAmt : game.global.magmaFuel;
	return game.generatorUpgrades.Efficiency.tickAtFuel(fuelAmt);
}

function getFuelBurnRate(){
	var rate = 0.5;
	if (game.permanentGeneratorUpgrades.Slowburn.owned) rate -= 0.1;
	return rate;
}

function getMagmiteDecayAmt(){
	var rate = 30;
	if (game.permanentGeneratorUpgrades.Shielding.owned) 
		rate -= 10;
	return rate;
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
	var skeleMin = 2700000;
	if (game.talents.skeletimp2.purchased) skeleMin -= 600000
	if ((new Date().getTime() - game.global.lastSkeletimp) >= skeleMin) canSkeletimp = true;
	var corrupteds = [];
	for (var w = 0; w < 100; w++){
		corrupteds.push("");
	}
	for (var item in mutations){
		if (mutations[item].active()){
			corrupteds = mutations[item].pattern(corrupteds);
		}
	}
    for (var i = 0; i < 100; i++) {
        var newCell = {
            level: i + 1,
            maxHealth: -1,
            health: -1,
            attack: -1,
            special: "",
            text: "",
            name: getRandomBadGuy(null, i + 1, 100, world, imports, corrupteds[i])
        };
		if (corrupteds[i] != "") {
			newCell.mutation = corrupteds[i];
			newCell.corrupted = getSeededRandomFromArray(game.global.mutationSeed++, mutations[corrupteds[i]].effects);
		}
		array.push(newCell);
    }
    game.global.gridArray = array;
    addSpecials();
}

function getSeededRandomFromArray(seed, array){
	return array[getRandomIntSeeded(seed, 0, array.length)];
}

function getAmountInRange(maxRange, toKeep)
{
	var toShuffle = [];
	for (var w = 0; w < maxRange; w++){
		if (w != 99) toShuffle.push(w);
	}
    for (var x = Math.floor(toShuffle.length / 2); x < toShuffle.length; x++)
    {
        var random = getRandomIntSeeded(game.global.mutationSeed++, 0, toShuffle.length);
        var hold = toShuffle[x];
        toShuffle[x] = toShuffle[random];
        toShuffle[random] = hold;
    }
    return toShuffle.slice(0, toKeep);
}

function setMutationTooltip(which, mutation){
	var elem = document.getElementById('corruptionBuff');
	var effect = mutationEffects[which];
	if (typeof effect === 'undefined') return;
	if (typeof mutations[mutation].tooltip === 'undefined') return;
	elem.innerHTML = '<span class="badge badBadge ' + mutation + '" onmouseover="tooltip(\'' + effect.title + '\', \'customText\', event, \'' + mutations[mutation].tooltip(which) + '\')" onmouseout="tooltip(\'hide\')"><span class="' + effect.icon + '"></span></span>';
}

function setVoidCorruptionIcon(regularMap){
	var attackScale = "";
	var healthScale = "";
	if (regularMap || !mutations.Magma.active()){
		attackScale = (mutations.Corruption.statScale(3) / 2);
		healthScale = (mutations.Corruption.statScale(10) / 2);
	}
	else {
		attackScale = (mutations.Corruption.statScale(3));
		healthScale = (mutations.Corruption.statScale(10));
	}
	var text = "This " + ((regularMap) ? "map" : "Void Map") + " has become unstable due to Corruption. Enemy attack increased by " + prettify(attackScale) + "X, and health increased by " + prettify(healthScale) + "X.";
	var title = "";
	if (!regularMap){
		text += " Helium at the end of the map is now double what you would earn from a World zone, including Corrupted cells!";
		title = "Void Corruption";
	}
	else title = "Map Corruption";
	document.getElementById('corruptionBuff').innerHTML = '<span class="badge badBadge voidBadge" onmouseover="tooltip(\'' + title + '\', \'customText\', event, \'' + text + '\')" onmouseout="tooltip(\'hide\')"><span class="glyphicon glyphicon-plus"></span></span>&nbsp;';
}

function getRandomBadGuy(mapSuffix, level, totalCells, world, imports, mutation) {
	var selected;
	var force = false;
    var badGuysArray = [];
    for (var item in game.badGuys) {
		var badGuy = game.badGuys[item];
		if (badGuy.locked) continue;
		if (badGuy.location == "Maps" && !mapSuffix) continue;
		if (level == totalCells && badGuy.last && (badGuy.location == mapSuffix || (!mapSuffix && badGuy.location == "World")) && world >= badGuy.world) {
			if (item == "Blimp" && (world != 5 && world  != 10 && world < 15)) continue;
			if (!mapSuffix && (game.global.brokenPlanet || game.global.world == 59) && item == "Blimp"){
				if (mutations.Magma.active())
					item = "Omnipotrimp";
				else
					item = "Improbability";
			}
			selected = item;
			force = true;
			break;
		}
		if (!badGuy.last && (typeof badGuy.world === 'undefined' || game.global.world >= game.badGuys[item].world) && (badGuy.location == "All" || (mapSuffix && (badGuy.location == "Maps" || badGuy.location == mapSuffix)) || (!mapSuffix && badGuy.location == "World"))){
			badGuysArray.push(item);
		}
	}
	if (!mapSuffix && canSkeletimp && !force && (Math.floor(Math.random() * 100) < 5)) {canSkeletimp = false; return (getRandomIntSeeded(game.global.skeleSeed++, 0, 100) < ((game.talents.skeletimp.purchased) ? 20 : 10)) ? "Megaskeletimp" : "Skeletimp";} 
	if (imports.length && !force && (Math.floor(Math.random() * 100) < (imports.length * 3))) return imports[Math.floor(Math.random() * imports.length)];
	if (!mapSuffix && !force) {
		var chance = .35 * (1 / (100 - 1 - (3 * imports.length)));
		
		chance = Math.round(chance * 100000);
		if (game.talents.turkimp2.purchased) chance *= 1.33;
		var roll = Math.floor(Math.random() * 100000);
		if (roll < chance) {
			return "Turkimp";
		}
	}
	//Halloween
	if (!mapSuffix && !force && mutation == 'Pumpkimp'){
		if (Math.floor(Math.random() * 10) < 5) return "Pumpkimp";
	}
	if (game.global.challengeActive == "Daily"  && typeof game.global.dailyChallenge.mutimps !== 'undefined' && !mapSuffix && !force){
		var mutStr = game.global.dailyChallenge.mutimps.strength;
		if (level <= dailyModifiers.mutimps.getMaxCellNum(mutStr)){
			var mobName = mutStr < 6 ? "Mutimp" : "Hulking_Mutimp";
			if (Math.floor((Math.random() * 10)) < 4)
				return mobName;
		}
	}
    if (!force) selected = badGuysArray[Math.floor(Math.random() * badGuysArray.length)];
	return selected;
	
}

function convertUnlockIconToSpan(special){
	var title = "";
	if (special.title) title = "title='" + special.title + "' ";
	var prefix = "";
	var icon = special.icon;
		if (icon && icon.charAt(0) == "*") {
			icon = icon.replace("*", "");
			prefix =  "icomoon icon-" 
		}
		else prefix = "glyphicon glyphicon-";
    return '<span ' + title + 'class="' + prefix + icon + '"></span>';
}

function addSpecialToLast(special, array, item) {
    array[array.length - 1].text = convertUnlockIconToSpan(special);
    array[array.length - 1].special = item;
    return array;
}

function addSpecials(maps, countOnly, map, getPrestiges) { //countOnly must include map. Only counts upgrades set to spawn on "last".
	var specialCount = 0;
	var array;
	var unlocksObj;
	var world;
	var max;
	var prestigeArray = [];
	if (getPrestiges) map = {location: "All", level: game.global.world, size: 100}
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
		if (special.locked) continue;
		if (item == "easterEgg"){
			game.global.eggSeed += 3;
			if (seededRandom(game.global.eggSeed) >= special.chance) continue;
		}
		if (special.brokenPlanet && ((special.brokenPlanet == 1 && !game.global.brokenPlanet) || special.brokenPlanet == -1 && game.global.brokenPlanet)) continue;
		if (map && game.global.challengeActive == "Frugal" && special.prestige) continue;
		if (special.startAt < 0) continue;
		if (special.lastAt < game.global.world) continue;
		if ((maps) && (special.filterUpgrade)){
			var mapConfigLoc = game.mapConfig.locations[map.location];
			if (typeof mapConfigLoc.upgrade === 'object'){
				var usable = false;
				for (var x = 0; x < mapConfigLoc.upgrade.length; x++){
					if (mapConfigLoc.upgrade[x] != item) continue;
					usable = true;
					break;
				}
				if (!usable) continue;
			}
			else if (mapConfigLoc.upgrade != item) continue;
		}
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
				if (getPrestiges && special.prestige) prestigeArray.push(item);
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
	if (getPrestiges) return prestigeArray;
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
			var addClass;
			if (special.addClass) addClass = (typeof special.addClass === 'function') ? special.addClass() : special.addClass;
			else addClass = "";
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

function dropPrestiges(){
	var toDrop = addSpecials(true, true, null, true);
	for (var x = 0; x < toDrop.length; x++){
		unlockUpgrade(toDrop[x]);
		var prestigeUnlock = game.mapUnlocks[toDrop[x]];
		if (game.global.sLevel >= 4) {
			unlockUpgrade(toDrop[x]);
			prestigeUnlock.last += 10;
		}
		else prestigeUnlock.last += 5;
	}
}

function drawGrid(maps) { //maps t or f. This function overwrites the current grid, be carefulz
    var grid = (maps) ? document.getElementById("mapGrid") : document.getElementById("grid");
	if (!maps && game.global.spireActive) grid.className = "spire";
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
			var className = "battleCell cellColorNotBeaten"
			if (maps && game.global.mapGridArray[counter].name == "Pumpkimp") className += " mapPumpkimp";
			if (maps && map.location == "Void") className += " voidCell";
			if (!maps && game.global.gridArray[counter].mutation) className += " " + game.global.gridArray[counter].mutation;
			else if (!maps && game.global.world == 200 && game.global.spireActive) className += " spireCell";
            cell.className = className;
            cell.innerHTML = (maps) ? game.global.mapGridArray[counter].text : game.global.gridArray[counter].text;
			if (cell.innerHTML === "") cell.innerHTML = "&nbsp;";            
			if (!maps && game.global.gridArray[counter].special == "easterEgg"){
				cell.onclick = function () { easterEggClicked(); };
				game.global.eggLoc = counter;
				cell.className += " eggCell";
			}
			counter++;
        }
    }
}

function easterEggClicked(){
	if (game.global.eggLoc == -1) return;
	var elem = document.getElementById("cell" + game.global.eggLoc);
	var gridLoc = game.global.gridArray[game.global.eggLoc];
	elem.innerHTML = "&nbsp;";
	elem.onclick = "";
	gridLoc.special = "";
	gridLoc.text = "";
	var startText;
	if (game.global.lastClearedCell == game.global.eggLoc - 1) startText = ["Oh, there seems to be an egg on the ground. You throw it really hard to break it, and find "];
	else if (game.global.lastClearedCell > game.global.eggLoc) startText = ["You use your amazing sense of hindsight, and send a Trimp to check behind you for eggs. It found one containing ", "You just remembered you wanted to look for treasure. You send a Trimp backwards to check and it found an egg containing "];
	else startText = ["You see a brightly colored egg off in the distance and send a Trimp to retrieve it for you. Inside is ", "You send a Trimp to sneak forward checking for eggs. After getting turned around multiple times, it found an egg that had ", "Hey there's an egg up there! You send a few Trimps to retrieve it and they bring back "];
	startText = startText[Math.floor(Math.random() * startText.length)];
	var roll = seededRandom(game.global.eggSeed - 1);
	if (game.global.totalPortals < 5){ //Give metal if player doesn't have 5 total portals and VM/Heirloom/Nu was rolled
		if (roll > 0.84 && (roll <= 0.92 || game.global.totalPortals == 0)) roll = 0.84;
	}
	if (roll <= 0.84 || (roll > 0.92 && game.global.runningChallengeSquared)){
		var reward = '';
		var rewardRoll = getRandomIntSeeded(game.global.eggSeed - 2, 1, 6);
		if (roll <= 0.25) reward = "food";
		else if (roll <= 0.54) reward = "wood";
		else reward = "metal";
		var amt = rewardResource(reward, (rewardRoll / 1.5), game.global.eggLoc);
		startText += prettify(amt) + " " + reward + "!";
	}
	else if (roll <= 0.89){
		var amt = Math.round(game.global.world / 4);
		if (amt <= 0) amt = 1;
		game.global.nullifium += amt;
		startText += amt + " Nullifium!";
	}
	else if (roll <= 0.91){
		createHeirloom();
		startText += "an Heirloom!";
	}
	else if (roll <= 0.92){
		createVoidMap();
		startText += "a Void Map!";
	}
	else{
		if (game.resources.helium.owned == 0) fadeIn("helium", 10);
		var amt = (game.global.world >= 59) ? 5 : 1;
		amt = rewardResource("helium", amt, 99);
		startText += prettify(amt) + " helium!";
	}
	message(startText, "Loot", "*droplet", "eggMessage easterEgg" + getRandomIntSeeded(game.global.eggSeed + 1, 0, 4));
	game.global.eggLoc = -1;
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

function recycleMap(map, fromMass, killVoid) {
    if (typeof map === 'undefined' || map == -1) {
		if (game.global.lookingAtMap === "") return;
		map = getMapIndex(game.global.lookingAtMap);
	}
    if (map === null) return;
	var mapObj = game.global.mapsOwnedArray[map];
	var loc = "mapsHere";
	if (killVoid){
		game.global.voidBuff = "";
		document.getElementById("voidBuff").innerHTML = "";
	}
	if (mapObj.location == "Void") loc = "voidMapsHere";
	if (mapObj.noRecycle) {
		game.global.currentMapId = "";
		game.global.lastClearedMapCell = -1;
		game.global.mapGridArray = [];
		mapsSwitch(true);
		return;
	}
    document.getElementById(loc).removeChild(document.getElementById(mapObj.id));
    if (game.global.currentMapId == mapObj.id){
		game.global.lookingAtMap = "";
		game.global.currentMapId = "";
		game.global.lastClearedMapCell = -1;
	}
	else if (game.global.lookingAtMap == mapObj.id) game.global.lookingAtMap = "";
	game.global.mapsOwned--;
	var refund;
	if (!killVoid) {
		refund = getRecycleValue(mapObj.level);
		game.resources.fragments.owned += refund;
		if (!fromMass) message("Recycled " + mapObj.name + " for " + prettify(refund) + " fragments.", "Notices");
	}
	game.global.mapsOwnedArray.splice(map, 1);
    if (killVoid) {
		game.global.totalVoidMaps--;
		return;
	}
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

function mapsClicked(confirmed) {
	if (game.options.menu.pauseGame.enabled) return;
	if (game.global.mapsActive && getCurrentMapObject().location == "Void" && !confirmed && !game.global.switchToMaps){
		tooltip('confirm', null, 'update', 'You are about to abandon this Void Map, which will cause you to lose all current progress in this map. Are you sure?' , 'mapsClicked(true)', 'Abandon Void Map');	
		return;
	}	
    if (game.global.switchToMaps || game.global.switchToWorld || game.options.menu.alwaysAbandon.enabled == 1) {
		if (!game.global.preMapsActive){
			if (game.global.spireActive && !game.global.mapsActive && game.global.fighting) deadInSpire();
			game.global.switchToMaps = true;
			if (game.resources.trimps.soldiers > 0){
				game.global.soldierHealth = 0;
				game.stats.trimpsKilled.value += game.resources.trimps.soldiers;
				game.stats.battlesLost.value++;
				game.resources.trimps.soldiers = 0;
			}
			
			var bar = document.getElementById("goodGuyBar");
			swapClass("percentColor", "percentColorRed", bar);
			bar.style.width = "0%";
			var healthElem = document.getElementById("goodGuyHealth");
			if (healthElem != null) healthElem.innerHTML = 0;
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
				if (cell.health > 0) cell.health += (cell.maxHealth * 0.05);
				else cell.health = 0;
				if (cell.health > cell.maxHealth) cell.health = cell.maxHealth;
				updateBadBar(cell);
			}
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
		game.global.voidBuff = "";
        if (game.global.preMapsActive) {
            game.global.mapsActive = false;
            game.global.preMapsActive = false;
        } else game.global.preMapsActive = true;
    }
	
	var currentMapObj;
	if (game.global.spireActive) handleExitSpireBtn();
	handleFinishDailyBtn();
	if (game.global.currentMapId !== "") currentMapObj = getCurrentMapObject();
	var mapsBtn = document.getElementById("mapsBtn");
	var recycleBtn = document.getElementById("recycleMapBtn");
	recycleBtn.innerHTML = "Recycle Map";
	document.getElementById("mapsBtn").className = "btn btn-warning fightBtn";
    if (game.global.preMapsActive) {
		if (currentMapObj && currentMapObj.location == "Void") {
			recycleMap(-1, true, true);
			currentMapObj = false;
		}
		game.global.mapsActive = false;
		setNonMapBox();
		document.getElementById("battleHeadContainer").style.display = "none";
		document.getElementById("mapsCreateRow").style.display = "block";
		if (!fromRecycle) resetAdvMaps();
        document.getElementById("grid").style.display = "none";
        document.getElementById("preMaps").style.display = "block";
        toggleMapGridHtml();
        mapsBtn.innerHTML = "World";
        if (game.global.lookingAtMap && !game.global.currentMapId) selectMap(game.global.lookingAtMap, true);
		else if (game.global.currentMapId === "") {
			clearMapDescription();
        } else {
            selectMap(game.global.currentMapId, true);
            document.getElementById("selectMapBtn").innerHTML = "Continue";
            document.getElementById("selectMapBtn").style.visibility = "visible";
            recycleBtn.style.visibility = "visible";
			if (currentMapObj.noRecycle) recycleBtn.innerHTML = "Abandon Map";
        }
    }
	else if (game.global.mapsActive) {
		if (game.global.usingShriek) {
			disableShriek();
			game.global.useShriek = true;
		}
		if (currentMapObj.location == "Void"){
			currentMapObj.level = game.global.world;
			document.getElementById("repeatVoidsContainer").style.display = "block";
		}
			else document.getElementById("repeatVoidsContainer").style.display = "none";
		document.getElementById("mapsCreateRow").style.display = "none";
        document.getElementById("grid").style.display = "none";
        document.getElementById("preMaps").style.display = "none";
        toggleMapGridHtml(true, currentMapObj);
    } else {
		if (game.global.lastClearedCell == 98 && game.global.useShriek && !game.global.usingShriek)
			activateShriek();
		document.getElementById("battleHeadContainer").style.display = "block";
		document.getElementById("mapsCreateRow").style.display = "none";
        document.getElementById("grid").style.display = "block";
        document.getElementById("preMaps").style.display = "none";
        toggleMapGridHtml();
		setNonMapBox();
		
    }
	toggleVoidMaps(true);
}

function toggleMapGridHtml(on, currentMapObj){
	var settings = (on) ? ["block", "2", "8", "block"] : ["none", "off", "10", "none"];
	document.getElementById("mapGrid").style.display = settings[0];
	if (game.options.menu.extraMapBtns.enabled){
		swapClass("col-xs", "col-xs-" + settings[1], document.getElementById("extraMapBtns"));
		swapClass("col-xs", "col-xs-" + settings[2], document.getElementById("gridContainer"));
	}
	document.getElementById("repeatBtn").style.display = settings[3];
	if (!on) return;
	document.getElementById("mapsBtn").innerHTML = (game.global.mapBonus) ? "Maps (" + game.global.mapBonus + ")" : "Maps";
	document.getElementById("mapBonus").innerHTML = "";
	document.getElementById("battleHeadContainer").style.display = "block";
	if (!currentMapObj) return; 
	var worldNumElem = document.getElementById("worldNumber");
	worldNumElem.style.display = 'inline';
	worldNumElem.innerHTML = "<br/>Lv: " + currentMapObj.level;
	document.getElementById("worldName").innerHTML = currentMapObj.name;
}

function clearMapDescription(){
	document.getElementById("selectMapBtn").style.visibility = "hidden";
	document.getElementById("recycleMapBtn").style.visibility = "hidden";
	document.getElementById("selectedMapName").innerHTML = "Select a Map!";
	document.getElementById("mapStatsSize").innerHTML = "";
	document.getElementById("mapStatsDifficulty").innerHTML = "";
	document.getElementById("mapStatsLoot").innerHTML = "";
	document.getElementById("mapStatsItems").innerHTML = "";
	document.getElementById("mapStatsResource").innerHTML = "";
}

function setNonMapBox(){
	document.getElementById("mapsBtn").innerHTML = "Maps";
	if (game.global.totalVoidMaps > 0) addVoidAlert();
	var worldNumElem = document.getElementById("worldNumber");
	worldNumElem.style.display = (game.global.spireActive) ? 'none' : 'inline';
	document.getElementById("worldNumber").innerHTML = game.global.world;
	var mapBonus = document.getElementById("mapBonus");
	if (game.global.mapBonus > 0) mapBonus.innerHTML = prettify(game.global.mapBonus * 20) + "% Map Bonus";
	else mapBonus.innerHTML = "";
	document.getElementById("worldName").innerHTML = (game.global.spireActive) ? "Spire" : "Zone";
}


function resetAdvMaps() {
	document.getElementById("mapLevelInput").value = (game.options.menu.siphonologyMapLevel.enabled) ? game.global.world - game.portal.Siphonology.level : game.global.world;
	var inputs = ["loot", "difficulty", "size"];
	for (var x = 0; x < inputs.length; x++){
		var thisVal = (game.global.sessionMapValues[inputs[x]]) ? game.global.sessionMapValues[inputs[x]] : 0;
		document.getElementById(inputs[x] + "AdvMapsRange").value = thisVal;
		adjustMap(inputs[x], thisVal);
	}
	var elem = document.getElementById("biomeAdvMapsSelect");
	
	if (game.global.decayDone && document.getElementById('gardenOption') === null) elem.innerHTML += "<option id='gardenOption' value='Plentiful'>Gardens</option>";
	elem.value = (game.global.sessionMapValues.biome) ? game.global.sessionMapValues.biome : "Random";
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
	document.getElementById("mapStatsItems").innerHTML = (map.location == "Void") ? "&nbsp;" : addSpecials(true, true, map);
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
	if (game.global.challengeActive == "Watch") game.challenges.Watch.enteredMap = true;
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
		var mapObj = getCurrentMapObject();
		if (mapObj.location == "Void"){
			game.global.voidDeaths = 0;
			game.global.voidBuff = mapObj.voidBuff;
			setVoidBuffTooltip();
		}
    }
}

function battleCoordinator(makeUp) {
    if (!game.global.fighting) {
        battle(null);
        return;
    }
    game.global.battleCounter += (1000 / game.settings.speed);
	var num = (game.portal.Agility.level) ? 1000 * Math.pow(1 - game.portal.Agility.modifier, game.portal.Agility.level) : 1000;
	if (game.talents.hyperspeed.purchased) num -= 100;
	if (game.talents.hyperspeed2.purchased && (game.global.world <= Math.floor((game.global.highestLevelCleared + 1) * 0.5)))
		num -= 100;
	if (game.global.battleCounter >= num) {
        game.global.battleCounter -= num; //Thanks grabz
        fight(makeUp);
    }
}

function battle(force) {
	var trimps = game.resources.trimps;
	var trimpsMax = trimps.realMax();
    if (game.global.fighting) return;
    if ((game.global.switchToMaps || game.global.switchToWorld) && trimps.soldiers === 0) {
        mapsSwitch();
        return;
    }
    if (game.global.preMapsActive) return;
    var pause = (force) ? false : game.global.pauseFight;
    if (!game.global.autoBattle && !force) return;
    if (pause) return;  	
    if (trimps.soldiers > 0) {
        startFight();
        return;
    }
    var breeding = (trimps.owned - trimps.employed);
	var adjustedMax = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend : trimps.maxSoldiers;
    if (breeding < adjustedMax) return;
	if (game.options.menu.geneSend.enabled && game.global.GeneticistassistSetting > 0 && game.jobs.Geneticist.owned > 0){
		if (game.global.lastBreedTime / 1000 > game.global.GeneticistassistSetting)
			force = true;
	}
    if (force) {
        trimps.soldiers = adjustedMax;
        trimps.owned -= adjustedMax;
    } else {
        //var max = Math.ceil((trimpsMax - trimps.employed) * 0.05);
        if (trimps.owned >= trimpsMax || game.global.breedTime <= 0.1) {
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

function getPierceAmt(){
	var base = 0.2;
	if (game.global.challengeActive == "Lead") base += (game.challenges.Lead.stacks * 0.001);
	if (game.global.formation == 3) base *= 0.5;	
	if (game.talents.pierce.purchased) base *= 0.75;
	return base;
}

var lastSoldierSentAt =  new Date().getTime();
function startFight() {
	game.global.battleCounter = 0;
    document.getElementById("badGuyCol").style.visibility = "visible";
    var cellNum;
    var cell;
    var cellElem;
	var badCoord;
	var instaFight = false;
	var madeBadGuy = false;
	var map = false;
    if (game.global.mapsActive) {
        cellNum = game.global.lastClearedMapCell + 1;
        cell = game.global.mapGridArray[cellNum];
        cellElem = document.getElementById("mapCell" + cellNum);
		map = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)];
    } else {
        cellNum = game.global.lastClearedCell + 1;
        cell = game.global.gridArray[cellNum];
        cellElem = document.getElementById("cell" + cellNum);
		if (cellElem == null){ //Not sure what causes this to be needed, but on very rare occasions, this can prevent some save files from freezing on load
			if (game.global.lastClearedCell != 99) {
				 if (game.global.lastClearedCell == -1){
					buildGrid();
					drawGrid();
					document.getElementById("battleContainer").style.visibility = "visible";
					document.getElementById('metal').style.visibility = "visible";
					console.log("Attempted to fight in World when no grid was initialized. Find an adult");
				}
				return;
			}
			nextWorld();
			game.stats.zonesCleared.value++;
			checkAchieve("totalZones");
			console.log("crisis averted");
			return;
		}
    }
    swapClass("cellColor", "cellColorCurrent", cellElem);
	var badName;
	var displayedName = (cell.name == "Improbability" && game.global.spireActive) ? "Druopitee" : cell.name.replace('_', ' ');
	if (displayedName == "Mutimp" || displayedName == "Hulking Mutimp"){
		displayedName = "<span class='Mutimp'>" + displayedName + "</span>";
	}
	if (cell.mutation) {
		badName = "<span class='badNameMutation " + cell.mutation + "'>" + mutations[cell.mutation].namePrefix + " " + displayedName + "</span>";
	}
	else
		badName = displayedName;
	if (game.global.challengeActive == "Coordinate"){
		badCoord = getBadCoordLevel();
		badName += " (" + prettify(badCoord) + ")";	
	}
	if (cell.name == "Omnipotrimp" && game.global.world % 5 == 0){
		badName += ' <span class="badge badBadge Magma" onmouseover="tooltip(\'Superheated\', \'customText\', event, \'This Omnipotrimp is Superheated, and will explode on death.\')" onmouseout="tooltip(\'hide\')"><span class="icomoon icon-fire2"></span></span>';
	}
	if (game.global.brokenPlanet && !game.global.mapsActive){
		badName += ' <span class="badge badBadge" onmouseover="tooltip(\'Pierce\', \'customText\', event, \'' + prettify(getPierceAmt() * 100) + '% of the damage from this Bad Guy pierces through block\')" onmouseout="tooltip(\'hide\')"><span class="glyphicon glyphicon-tint"></span></span>';
	}
	if (game.global.challengeActive == "Slow" || ((game.badGuys[cell.name].fast || cell.mutation == "Corruption") && game.global.challengeActive != "Coordinate" && game.global.challengeActive != "Nom"))
		badName += ' <span class="badge badBadge" onmouseover="tooltip(\'Fast\', \'customText\', event, \'This Bad Guy is fast and attacks first\')" onmouseout="tooltip(\'hide\')"><span class="glyphicon glyphicon-forward"></span></span>';
	if ((game.global.challengeActive == "Electricity" || game.global.challengeActive == "Mapocalypse")){
		badName += ' <span class="badge badBadge" onmouseover="tooltip(\'Electric\', \'customText\', event, \'This Bad Guy is electric and stacks a debuff on your Trimps\')" onmouseout="tooltip(\'hide\')"><span class="icomoon icon-power-cord"></span></span>';
	}
	document.getElementById("badGuyName").innerHTML = badName;
	var corruptionStart = mutations.Corruption.start(true);
	if (cell.mutation)
		setMutationTooltip(cell.corrupted, cell.mutation);
	else if (map && map.location == "Void" && game.global.world >= corruptionStart){
		setVoidCorruptionIcon();
	}
	else if (map && mutations.Magma.active()){
		setVoidCorruptionIcon(true);
	}
	else
		document.getElementById('corruptionBuff').innerHTML = "";
	if (game.global.challengeActive == "Balance") updateBalanceStacks();
	if (game.global.challengeActive == "Toxicity") updateToxicityStacks();
    if (cell.maxHealth == -1) {
		var overkill = 0;

		if (cell.health != -1) overkill = cell.health;
		if (cell.mutation && typeof mutations[cell.mutation].attack !== 'undefined')
			cell.attack = mutations[cell.mutation].attack(cell.level, cell.name);
		else
			cell.attack = game.global.getEnemyAttack(cell.level, cell.name);
		if (cell.mutation && typeof mutations[cell.mutation].health !== 'undefined')
			cell.health = mutations[cell.mutation].health(cell.level, cell.name);
		else
			cell.health = game.global.getEnemyHealth(cell.level, cell.name);
		if (game.global.spireActive && game.global.world == 200 && !game.global.mapsActive){
			cell.origAttack = cell.attack;
			cell.origHealth = cell.health;
			cell.attack = getSpireStats(cell.level, cell.name, "attack");
			cell.health = getSpireStats(cell.level, cell.name, "health");
			
		}
		if (cell.corrupted == "corruptStrong") cell.attack *= 2;
		if (cell.corrupted == "corruptTough") cell.health *= 5;
		if (game.global.challengeActive == "Daily"){
			if (typeof game.global.dailyChallenge.badHealth !== 'undefined'){
				cell.health *= dailyModifiers.badHealth.getMult(game.global.dailyChallenge.badHealth.strength);
			}
			if (typeof game.global.dailyChallenge.badMapHealth !== 'undefined' && game.global.mapsActive){
				cell.health *= dailyModifiers.badMapHealth.getMult(game.global.dailyChallenge.badMapHealth.strength);
			}
			if (typeof game.global.dailyChallenge.empower !== 'undefined'){
				cell.health *= dailyModifiers.empower.getMult(game.global.dailyChallenge.empower.strength, game.global.dailyChallenge.empower.stacks);
				updateDailyStacks("empower");
			}
		}
		if (game.global.challengeActive == "Coordinate") cell.health *= badCoord;
        if (game.global.mapsActive) {
            var difficulty = map.difficulty;
            cell.attack *= difficulty;
            cell.health *= difficulty;
			if (game.global.world >= corruptionStart){
				if (mutations.Magma.active() && map.location == "Void"){
					cell.attack *= (mutations.Corruption.statScale(3)).toFixed(1);
					cell.health *= (mutations.Corruption.statScale(10)).toFixed(1);
				}
				else if (map.location == "Void" || mutations.Magma.active()){
					cell.attack *= (mutations.Corruption.statScale(3) / 2).toFixed(1);
					cell.health *= (mutations.Corruption.statScale(10) / 2).toFixed(1);
				}
			}
        }
		if (game.global.challengeActive == "Meditate") cell.health *= 2;
		else if (game.global.challengeActive == "Toxicity"){
			cell.attack *= 5;
			cell.health *= 2;
		}
		else if (game.global.challengeActive == "Balance"){
			cell.attack *= (game.global.mapsActive) ? 2.35 : 1.17;
			cell.health *= 2;
		}
		else if (game.global.challengeActive == "Lead" && (game.challenges.Lead.stacks > 0)) cell.health *= (1 + (game.challenges.Lead.stacks * 0.04));
		if (cell.name == 'Improbability' || cell.name == "Omnipotrimp"){
			if (game.global.roboTrimpLevel && game.global.useShriek) activateShriek();
			if (game.global.world >= corruptionStart) {
				if (game.global.spireActive) {
					cell.origHealth *= mutations.Corruption.statScale(10);
					cell.origAttack *= mutations.Corruption.statScale(3);
				}
				else {
					cell.health *= mutations.Corruption.statScale(10);
					cell.attack *= mutations.Corruption.statScale(3);
				}
			}
		}
        cell.maxHealth = cell.health;
		if (game.portal.Overkill.level) cell.health -= (overkill * game.portal.Overkill.level * 0.005);
		if (cell.health < 1) {
			cell.health = 0;
			cell.overkilled = true;
			if (cell.name == "Improbability") giveSingleAchieve(12);
			instaFight = true;
			if (!game.global.mapsActive) game.stats.cellsOverkilled.value++;
		}
		else if (game.global.waitToScry) game.global.waitToScry = false;
		madeBadGuy = true;
    }
	else if (game.global.challengeActive == "Nom" && cell.nomStacks){
		updateNomStacks(cell.nomStacks);
	}
    var trimpsFighting = game.resources.trimps.maxSoldiers;
	var soldType = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend: game.resources.trimps.maxSoldiers;
    if (game.global.soldierHealth <= 0) {
				lastSoldierSentAt = new Date().getTime();
		game.global.battleCounter = 0;
		if (cell.name == "Voidsnimp" && !game.achievements.oneOffs.finished[2]) {
			if (!cell.killCount) cell.killCount = 1;
			else cell.killCount++;
			if (cell.killCount >= 50) giveSingleAchieve(2);
		}
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
		if (game.global.challengeActive == "Daily"){
			if (typeof game.global.dailyChallenge.plague !== 'undefined'){
				game.global.dailyChallenge.plague.stacks = 0;
				updateDailyStacks('plague');	
			}
			if (typeof game.global.dailyChallenge.weakness !== 'undefined'){
				game.global.dailyChallenge.weakness.stacks = 0;
				updateDailyStacks('weakness');	
			}
			if (typeof game.global.dailyChallenge.rampage !== 'undefined'){
				game.global.dailyChallenge.rampage.stacks = 0;
				updateDailyStacks('rampage');
			}
			if (!game.global.passive && typeof game.global.dailyChallenge.empower !== 'undefined'){
				game.global.dailyChallenge.empower.stacks += dailyModifiers.empower.stacksToAdd(game.global.dailyChallenge.empower.strength);
				var maxStack = dailyModifiers.empower.getMaxStacks(game.global.dailyChallenge.empower.strength);
				if (game.global.dailyChallenge.empower.stacks >= maxStack) game.global.dailyChallenge.empower.stacks = maxStack;
				updateDailyStacks('empower');
			}
		}
		game.global.difs.attack = 0;
		game.global.difs.health = 0;
		game.global.difs.block = 0;
		game.global.difs.trainers = game.jobs.Trainer.owned;
        game.global.soldierHealthMax = game.global.health;
		game.global.maxSoldiersAtStart = game.resources.trimps.maxSoldiers;
        game.global.soldierCurrentAttack = game.global.attack;
		//Magma;
		if (mutations.Magma.active()){
			var magMult = mutations.Magma.getTrimpDecay();
			game.global.soldierHealthMax *= magMult;
			game.global.soldierCurrentAttack *= magMult;
		}
		//Soldiers
		game.global.soldierHealthMax *= trimpsFighting;
		game.global.soldierCurrentAttack *= trimpsFighting;
		//Toughness
		if (game.portal.Toughness.level > 0) game.global.soldierHealthMax += (game.global.soldierHealthMax * game.portal.Toughness.level * game.portal.Toughness.modifier);
		if (game.portal.Toughness_II.level > 0) game.global.soldierHealthMax *= (1 + (game.portal.Toughness_II.modifier * game.portal.Toughness_II.level));
		if (game.global.lowestGen >= 0) {
			if (game.global.breedBack <= 0) {
				game.global.soldierHealthMax *= Math.pow(1.01, game.global.lowestGen);
				game.global.lastLowGen = game.global.lowestGen;
				game.global.lowestGen = -1;
			}
			else game.global.lastLowGen = 0;
			game.global.breedBack = soldType / 2;
		}
		if (game.goldenUpgrades.Battle.currentBonus > 0){
			game.global.soldierHealthMax *= game.goldenUpgrades.Battle.currentBonus + 1;
		}
		//Resilience
		if (game.portal.Resilience.level > 0) game.global.soldierHealthMax *= Math.pow(game.portal.Resilience.modifier + 1, game.portal.Resilience.level);
		//Power
		if (game.portal.Power.level > 0) game.global.soldierCurrentAttack += (game.global.soldierCurrentAttack * game.portal.Power.level * game.portal.Power.modifier);
        if (game.portal.Power_II.level > 0) game.global.soldierCurrentAttack *= (1 + (game.portal.Power_II.modifier * game.portal.Power_II.level));
		game.global.soldierCurrentBlock = Math.floor((game.global.block * (game.jobs.Trainer.owned * (calcHeirloomBonus("Shield", "trainerEfficiency", game.jobs.Trainer.modifier) / 100)) + game.global.block) * trimpsFighting);
		game.global.soldierHealthMax = calcHeirloomBonus("Shield", "trimpHealth", game.global.soldierHealthMax);
		game.global.soldierCurrentAttack = calcHeirloomBonus("Shield", "trimpAttack", game.global.soldierCurrentAttack);
		game.global.soldierCurrentBlock = calcHeirloomBonus("Shield", "trimpBlock", game.global.soldierCurrentBlock);
		if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.pressure !== 'undefined') game.global.soldierHealthMax *= dailyModifiers.pressure.getMult(game.global.dailyChallenge.pressure.strength, game.global.dailyChallenge.pressure.stacks);
		if (game.global.formation !== 0){
			game.global.soldierHealthMax *= (game.global.formation == 1) ? 4 : 0.5;
			game.global.soldierCurrentAttack *= (game.global.formation == 2) ? 4 : 0.5;
			game.global.soldierCurrentBlock *= (game.global.formation == 3) ? 4 : 0.5;
		}
		if (game.global.challengeActive == "Balance"){
			game.global.soldierHealthMax *= game.challenges.Balance.getHealthMult();
		}
		if (game.talents.voidPower.purchased && game.global.voidBuff){
			var vpAmt = (game.talents.voidPower2.purchased) ? 35 : 15;
			game.global.soldierHealthMax *= ((vpAmt / 100) + 1);
		}
		if (game.global.totalSquaredReward > 0)
			game.global.soldierHealthMax *= ((game.global.totalSquaredReward / 100) + 1);
		game.global.soldierHealth = game.global.soldierHealthMax;
		if (game.global.challengeActive == "Devastation") {
			if (game.challenges.Devastation.lastOverkill != -1) game.global.soldierHealth -= (game.challenges.Devastation.lastOverkill * 7.5);
			game.challenges.Devastation.lastOverkill = -1;
			if (game.global.soldierHealth < 1) game.global.soldierHealth = 0;
		}
		if (game.global.challengeActive == "Lead") manageLeadStacks();
    }
	else {
		if (game.global.challengeActive == "Lead") manageLeadStacks(!game.global.mapsActive && madeBadGuy);
		
		//Check differences in equipment, apply perks, bonuses, and formation
		if (game.global.difs.health !== 0) {
			var healthTemp = trimpsFighting * game.global.difs.health * ((game.portal.Toughness.modifier * game.portal.Toughness.level) + 1);
			if (mutations.Magma.active()){
				healthTemp *= mutations.Magma.getTrimpDecay();
			}
			if (game.portal.Toughness_II.level) healthTemp *= (1 + (game.portal.Toughness_II.modifier * game.portal.Toughness_II.level));
			if (game.jobs.Geneticist.owned > 0) healthTemp *= Math.pow(1.01, game.global.lastLowGen);
			if (game.goldenUpgrades.Battle.currentBonus > 0) healthTemp *= game.goldenUpgrades.Battle.currentBonus + 1;
			if (game.portal.Resilience.level > 0) healthTemp *= Math.pow(game.portal.Resilience.modifier + 1, game.portal.Resilience.level);
		if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.pressure !== 'undefined') healthTemp *= dailyModifiers.pressure.getMult(game.global.dailyChallenge.pressure.strength, game.global.dailyChallenge.pressure.stacks);
			if (game.global.formation !== 0){
				healthTemp *= (game.global.formation == 1) ? 4 : 0.5;
			}
			if (game.global.totalSquaredReward > 0)
				healthTemp *= ((game.global.totalSquaredReward / 100) + 1);
			if (game.global.challengeActive == "Balance"){
				healthTemp *= game.challenges.Balance.getHealthMult();
			}
			healthTemp = calcHeirloomBonus("Shield", "trimpHealth", healthTemp);
			game.global.soldierHealthMax += healthTemp;
			game.global.soldierHealth += healthTemp;
			game.global.difs.health = 0;
			if (game.global.soldierHealth <= 0) game.global.soldierHealth = 0;
		}
		if (game.global.difs.attack !== 0) {
			var attackTemp = trimpsFighting * game.global.difs.attack * ((game.portal.Power.modifier * game.portal.Power.level) + 1);
			if (mutations.Magma.active()){
				attackTemp *= mutations.Magma.getTrimpDecay();
			}
			if (game.portal.Power_II.level) attackTemp *= (1 + (game.portal.Power_II.modifier * game.portal.Power_II.level));
			if (game.global.formation !== 0){
				attackTemp *= (game.global.formation == 2) ? 4 : 0.5;
			}
			attackTemp = calcHeirloomBonus("Shield", "trimpAttack", attackTemp);
			game.global.soldierCurrentAttack += attackTemp;
			game.global.difs.attack = 0;
		}
		if (game.global.difs.block !== 0) {
			var blockTemp = (trimpsFighting * game.global.difs.block * ((game.global.difs.trainers * (calcHeirloomBonus("Shield", "trainerEfficiency", game.jobs.Trainer.modifier) / 100)) + 1));
			if (game.global.formation !== 0){
				blockTemp *= (game.global.formation == 3) ? 4 : 0.5;
			}
			blockTemp = calcHeirloomBonus("Shield", "trimpBlock", blockTemp);
			game.global.soldierCurrentBlock += blockTemp;
			game.global.difs.block = 0;
		}
		if (game.resources.trimps.soldiers != soldType && game.global.maxSoldiersAtStart > 0){
			var freeTrimps = (game.resources.trimps.owned - game.resources.trimps.employed);
			var newTrimps = ((game.resources.trimps.maxSoldiers - game.global.maxSoldiersAtStart)  / game.global.maxSoldiersAtStart) + 1;
			var requiredTrimps = (soldType - game.resources.trimps.soldiers);
			if (freeTrimps >= requiredTrimps) {
				game.resources.trimps.owned -= requiredTrimps;
				var oldHealth = game.global.soldierHealthMax;
				game.global.soldierHealthMax *= newTrimps;
				game.global.soldierHealth += (game.global.soldierHealthMax - oldHealth);
				game.global.soldierCurrentAttack *= newTrimps;
				game.global.soldierCurrentBlock *= newTrimps;
				game.resources.trimps.soldiers = soldType;
				game.global.maxSoldiersAtStart = game.resources.trimps.maxSoldiers;
			}
		}
	}
	
	updateAllBattleNumbers(game.resources.trimps.soldiers < soldType);
    game.global.fighting = true;
    game.global.lastFightUpdate = new Date();
	if (instaFight) fight();
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
    swapClass("cellColor", "cellColorCurrent", cellElem);
    document.getElementById("goodGuyHealthMax").innerHTML = prettify(game.global.soldierHealthMax);
	updateGoodBar();
	updateBadBar(cell);
	document.getElementById("badGuyHealthMax").innerHTML = prettify(cell.maxHealth);
	if (!skipNum) document.getElementById("trimpsFighting").innerHTML = (game.portal.Coordinated.level) ? prettify(game.portal.Coordinated.currentSend) : prettify(game.resources.trimps.maxSoldiers);
	document.getElementById("goodGuyBlock").innerHTML = prettify(game.global.soldierCurrentBlock);
	document.getElementById("goodGuyAttack").innerHTML = calculateDamage(game.global.soldierCurrentAttack, true, true);
	var badAttackElem = document.getElementById("badGuyAttack");
	badAttackElem.innerHTML = calculateDamage(cell.attack, true, false, false, cell);
	if (game.global.usingShriek) {
		swapClass("dmgColor", "dmgColorRed", badAttackElem);
		badAttackElem.innerHTML += '<span class="icomoon icon-chain"></span>';
	}
}

function updateGoodBar() {
    document.getElementById("goodGuyHealth").innerHTML = prettify(game.global.soldierHealth);
	if (!game.options.menu.progressBars.enabled) return;
	var barElem = document.getElementById("goodGuyBar");
    var percent = ((game.global.soldierHealth / game.global.soldierHealthMax) * 100);
    barElem.style.width = percent + "%";
    swapClass("percentColor", getBarColorClass(percent), barElem);
}

function updateBadBar(cell) {
	document.getElementById("badGuyHealth").innerHTML = prettify(cell.health);
	if (!game.options.menu.progressBars.enabled) return;
	var barElem = document.getElementById("badGuyBar");
	var percent = ((cell.health / cell.maxHealth) * 100);
    barElem.style.width = percent + "%";
	swapClass("percentColor", getBarColorClass(percent), barElem);
}

function calculateDamage(number, buildString, isTrimp, noCheckAchieve, cell) { //number = base attack
    var fluctuation = .2; //%fluctuation
	var maxFluct = -1;
	var minFluct = -1;
	if (isTrimp){
		//Situational Trimp damage increases
		if (game.global.radioStacks > 0) {
			number *= (1 - (game.global.radioStacks * 0.1));
		}
		if (game.global.antiStacks > 0) {
			number *= ((game.global.antiStacks * game.portal.Anticipation.level * game.portal.Anticipation.modifier) + 1);
			updateAntiStacks();
		}
		if (!game.global.mapsActive && game.global.mapBonus > 0){
			number *= ((game.global.mapBonus * .2) + 1);
		}
		if (game.global.titimpLeft >= 1 && game.global.mapsActive){
			number *= 2;
		}
		if (game.global.achievementBonus > 0){
			number *= (1 + (game.global.achievementBonus / 100));
		}
		if (game.global.challengeActive == "Discipline"){
			fluctuation = .995;
		}
		else if (game.portal.Range.level > 0){
			minFluct = fluctuation - (.02 * game.portal.Range.level);
		}
		if (game.global.challengeActive == "Decay"){
			number *= 5;
			number *= Math.pow(0.995, game.challenges.Decay.stacks);
		}
		if (game.global.roboTrimpLevel > 0){
			number *= ((0.2 * game.global.roboTrimpLevel) + 1);
		}
		if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)){
			number *= 1.5;
		}
		if (game.goldenUpgrades.Battle.currentBonus > 0){
			number *= game.goldenUpgrades.Battle.currentBonus + 1;
		}
		if (game.talents.voidPower.purchased && game.global.voidBuff){
			var vpAmt = (game.talents.voidPower2.purchased) ? 35 : 15;
			number *= ((vpAmt / 100) + 1);
		}
		if (game.global.totalSquaredReward > 0){
			number *= ((game.global.totalSquaredReward / 100) + 1)
		}

		if (game.global.challengeActive == "Daily"){
			if (typeof game.global.dailyChallenge.minDamage !== 'undefined'){
				if (minFluct == -1) minFluct = fluctuation;
				minFluct += dailyModifiers.minDamage.getMult(game.global.dailyChallenge.minDamage.strength);
			}
			if (typeof game.global.dailyChallenge.maxDamage !== 'undefined'){
				if (maxFluct == -1) maxFluct = fluctuation;
				maxFluct += dailyModifiers.maxDamage.getMult(game.global.dailyChallenge.maxDamage.strength);
			}
			if (typeof game.global.dailyChallenge.weakness !== 'undefined'){
				number *= dailyModifiers.weakness.getMult(game.global.dailyChallenge.weakness.strength, game.global.dailyChallenge.weakness.stacks);
			}
			if (typeof game.global.dailyChallenge.oddTrimpNerf !== 'undefined' && ((game.global.world % 2) == 1)){
					number *= dailyModifiers.oddTrimpNerf.getMult(game.global.dailyChallenge.oddTrimpNerf.strength);
			}
			if (typeof game.global.dailyChallenge.evenTrimpBuff !== 'undefined' && ((game.global.world % 2) == 0)){
					number *= dailyModifiers.evenTrimpBuff.getMult(game.global.dailyChallenge.evenTrimpBuff.strength);
			}
			if (typeof game.global.dailyChallenge.rampage !== 'undefined'){
				number *= dailyModifiers.rampage.getMult(game.global.dailyChallenge.rampage.strength, game.global.dailyChallenge.rampage.stacks);
			}
		}
	}
	else {
		//Situational bad guy damage increases
		if (game.global.challengeActive){
			//Challenge bonuses here
			if (game.global.challengeActive == "Coordinate"){
				number *= getBadCoordLevel();
			}
			else if (game.global.challengeActive == "Meditate"){
				number *= 1.5;
			}
			else if (game.global.challengeActive == "Nom" && typeof cell.nomStacks !== 'undefined'){
				number *= Math.pow(1.25, cell.nomStacks);
			}
			else if (game.global.challengeActive == "Watch") {
				number *= 1.25;
			}
			else if (game.global.challengeActive == "Lead"){
				number *= (1 + (game.challenges.Lead.stacks * 0.04));
			}
			else if (game.global.challengeActive == "Scientist" && getScientistLevel() == 5) {
				number *= 10;
			}
			else if (game.global.challengeActive == "Corrupted"){
				number *= 3;
			}
			if (game.global.challengeActive == "Daily"){
				if (typeof game.global.dailyChallenge.badStrength !== 'undefined'){
					number *= dailyModifiers.badStrength.getMult(game.global.dailyChallenge.badStrength.strength);
				}
				if (typeof game.global.dailyChallenge.badMapStrength !== 'undefined' && game.global.mapsActive){
					number *= dailyModifiers.badMapStrength.getMult(game.global.dailyChallenge.badMapStrength.strength);
				}
				if (typeof game.global.dailyChallenge.bloodthirst !== 'undefined'){
					number *= dailyModifiers.bloodthirst.getMult(game.global.dailyChallenge.bloodthirst.strength, game.global.dailyChallenge.bloodthirst.stacks)
				}
				if (typeof game.global.dailyChallenge.empower !== 'undefined'){
					number *= dailyModifiers.empower.getMult(game.global.dailyChallenge.empower.strength, game.global.dailyChallenge.empower.stacks);
				}
			}
		}
		if (game.global.usingShriek) {
			number *= game.mapUnlocks.roboTrimp.getShriekValue();
		}
	}
	if (minFluct > 1) minFluct = 1;
	if (maxFluct == -1) maxFluct = fluctuation;
	if (minFluct == -1) minFluct = fluctuation;
	var min = Math.floor(number * (1 - minFluct));
    var max = Math.ceil(number + (number * maxFluct));
    if (buildString) {
		if (isTrimp) {
			if (!noCheckAchieve) checkAchieve("damage", max);
			else return max;
		}
		return prettify(min) + "-" + prettify(max);
    }
	
	number = Math.floor(Math.random() * ((max + 1) - min)) + min;
    return number;
}

function updateForemenCount(){
	document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 4) + " Foremen";
	updateBuildSpeed();
}

function tryScry(){
	var roll = getRandomIntSeeded(game.global.voidSeed, 0, 100);
	if (roll < 50 || roll > 52) return;
	var reward = calculateScryingReward();
	if (reward <= 0) return;
	game.global.essence += reward;
	var maxCost = getTotalTalentCost();
	if (game.global.spentEssence + game.global.essence > maxCost){
		game.global.essence = Math.max(maxCost - game.global.spentEssence, 0);
		game.global.essence = Math.round(game.global.essence);
		message("You have no more use for Dark Essence!", "Loot", "*cloud3", "essenceMessage", "essence");
	}
	else {
		message("You found " + prettify(reward) + " Dark Essence!", "Loot", "*cloud3", "essenceMessage", "essence");
	}
	updateTalentNumbers();
	
}

function calculateScryingReward(){
	var scryableLevels = game.global.world - 180;
	if (scryableLevels <= 0) return 0;
	var modAmt = (game.global.canMagma) ? 1.1683885 : 1.11613; //4.0 compatibility
	var num = Math.floor((1 * Math.pow(modAmt, scryableLevels)) / 3);
	return (num < 1) ? 1 : num;
}

function displayTalents(){
	var html = "<div class='talentTierRow talentRowUnlocked'>";
	var currentTier = 1;
	var highestTier = getHighestTalentTier();
	for (var item in game.talents){
		var talent = game.talents[item];
		if (talent.tier > currentTier) {
			currentTier = talent.tier;
			html += "</div><div class='talentTierRow talentRow" + ((highestTier >= currentTier) ? 'Unlocked' : 'Locked') + "'>";		
		}
		var talentClass = "talentItem talent" + ((talent.purchased) ? "Purchased" : "NotPurchased");
		if (talent.requires && !game.talents[talent.requires].purchased) talentClass += " talentReqNeeded";
		var icon = (talent.icon.charAt(0) == "*") ? "icomoon icon-" + talent.icon.substr(1) : "glyphicon glyphicon-" + talent.icon;
		html += "<div class='" + talentClass + "' id='" + item + "' onmouseover='tooltip(\"" + item + "\", \"talents\", event)' onmouseout='tooltip(\"hide\")' onclick='purchaseTalent(\"" + item + "\")'><span class='talentIcon'><span class='" + icon + "'></span></span><br/><div class='talentName'>" + talent.name + "</div></div>";
	}
	html += "</div>";
	document.getElementById('talentsHere').innerHTML = html;
	updateTalentNumbers();
}

function updateTalentNumbers(){
	var mainEssenceElem = document.getElementById('essenceOwned')
	var nextCostElem = document.getElementById('talentsNextCost')
	var talentsNeededElem = document.getElementById('talentsNeeded');
	var talentsCostElem = document.getElementById('talentsCost');
	//Check primary elements, update
	if (mainEssenceElem == null || nextCostElem == null || talentsNeededElem == null) return;
		var nextCost = getNextTalentCost();
		mainEssenceElem.innerHTML = prettify(game.global.essence);
		if (nextCost == -1){
			talentsCostElem.style.display = 'none';
			return;
		}
		talentsCostElem.style.display = "block";
		nextCostElem.innerHTML = prettify(nextCost);
		talentsNeededElem.innerHTML = getHighestTalentTier(true);
	var alertElem = document.getElementById('talentsAlert');
	var countElem = document.getElementById('talentsEssenceTotal');
	//Check setting elements, update
	if (alertElem == null || countElem == null) return;
		alertElem.innerHTML = (game.options.menu.masteryTab.enabled == 1 && nextCost <= game.global.essence) ? "!" : "";
		countElem.innerHTML = (game.options.menu.masteryTab.enabled == 2) ? " (" + prettify(game.global.essence) + ")" : "";
}

function respecTalents(confirmed, force){
	if (!force){
		if (game.global.b < 20) return;
		if (!confirmed){
			tooltip('Respec Talents', null, 'update');
			return;
		}
			game.global.b -= 20;
			updateSkeleBtn();
	}
	for (var item in game.talents){
		if (game.talents[item].purchased && typeof game.talents[item].onRespec === 'function') game.talents[item].onRespec();
		game.talents[item].purchased = false;
	}
	game.global.essence += game.global.spentEssence;
	game.global.spentEssence = 0;
	displayTalents();
}

function purchaseTalent(what){
	var talent = game.talents[what];
	if (talent.purchased) return;
	if (talent.tier > getHighestTalentTier()) return;
	if (talent.requires && !game.talents[talent.requires].purchased) return;
	var cost = getNextTalentCost()
	if (game.global.essence < cost) return;
	game.global.essence -= cost;
	game.global.spentEssence += cost;
	talent.purchased = true;
	if (typeof talent.onPurchase === 'function') talent.onPurchase();
	displayTalents();
}

function getHighestTalentTier(countTilNext){
	var count = countPurchasedTalents();
	var requiredPerTier = [3, 7, 11, 16];
	for (var x = 0; x < requiredPerTier.length; x++){
		if (count < requiredPerTier[x]){
			if (countTilNext) return requiredPerTier[x] - count;
			return x + 1;
		}
	}
	if (countTilNext) return 0; 
	return requiredPerTier.length + 1;
}

function initTalents(){
	for (var item in game.talents){
		if (!game.talents[item].purchased) continue;
		if (typeof game.talents[item].onPurchase === 'function') game.talents[item].onPurchase();
	}
}

function countPurchasedTalents(){
	var count = 0;
	for (var item in game.talents){
		if (game.talents[item].purchased) count++;
	}
	return count;
}

function getNextTalentCost(){
	var count = countPurchasedTalents();
	if (count == Object.keys(game.talents).length) return -1;
	return Math.floor(10 * Math.pow(3, count));
}

function getTotalTalentCost(){
	var count = Object.keys(game.talents).length;
	return 10 * (Math.pow(3, count) - 1) / (3 - 1);
}

function nextWorld() {
	if (game.global.world > game.global.highestLevelCleared){
		game.global.highestLevelCleared = game.global.world;
		game.global.voidMaxLevel = game.global.world;
		if (game.global.world == 199) addNewSetting('mapsOnSpire'); 
		else if (game.global.world == 180) {
			unlockFormation(4);
			filterTabs('talents');
			addNewSetting('masteryTab');
		}
		else if (game.global.world == 64) tooltip("UnlockedChallenge2", null, 'update');
		else if (game.global.world == 59) addNewSetting("ctrlGigas");
	}
    game.global.world++;
    document.getElementById("worldNumber").innerHTML = game.global.world;
	game.global.mapBonus = 0;
	document.getElementById("mapBonus").innerHTML = "";
    game.global.lastClearedCell = -1;
    game.global.gridArray = [];
    document.getElementById("grid").innerHTML = "";
	if (game.global.world == 200) startSpire();
    buildGrid();
    drawGrid();
	if (game.worldText["w" + game.global.world]) message(game.worldText["w" + game.global.world], "Story");
	if (game.global.canMagma) checkAchieve("zones");
	
	game.global.zoneStarted = new Date().getTime();
	
	if (game.global.challengeActive == "Mapology") {
		game.challenges.Mapology.credits++;
		updateMapCredits();
	}
	if (game.global.roboTrimpLevel && game.global.brokenPlanet) {
		if (game.global.roboTrimpCooldown > 0) game.global.roboTrimpCooldown--;
		displayRoboTrimp();
	}
	if (game.global.challengeActive == "Toxicity") {
		game.challenges.Toxicity.stacks = 0;		
		updateToxicityStacks();
	}
	if (game.global.challengeActive == "Watch"){
		if (game.global.world > 6) dropPrestiges();
		assignExtraWorkers()
	}
	if (game.global.challengeActive == "Lead"){
		if ((game.global.world % 2) == 0) game.challenges.Lead.stacks = game.challenges.Lead.stacks = 201;
		manageLeadStacks();
	}
	if (game.global.challengeActive == "Decay"){
		game.challenges.Decay.stacks = 0;
		if (game.global.world == 56 && !game.global.runningChallengeSquared){
			game.challenges.Decay.completed = true;
			game.global.decayDone = true;
			game.global.challengeActive = "";
			game.challenges.Decay.abandon();
			message("You have completed the Decay challenge! All stats have been returned to normal, and you can now create more powerful Gardens maps at will!", "Notices")
		}
	}
	if (game.global.challengeActive == "Daily"){
		if (typeof game.global.dailyChallenge.toxic !== 'undefined'){
			game.global.dailyChallenge.toxic.stacks = 0;
			updateDailyStacks('toxic');
		}
		if (typeof game.global.dailyChallenge.karma !== 'undefined'){
			game.global.dailyChallenge.karma.stacks = 0;
			updateDailyStacks('karma');
		}
		if (typeof game.global.dailyChallenge.pressure !== 'undefined'){
			dailyModifiers.pressure.resetTimer();
		}
	}
	if (game.talents.blacksmith.purchased && (game.global.challengeActive != "Mapology" || !game.global.runningChallengeSquared)){
		if (game.global.world <= Math.floor((game.global.highestLevelCleared + 1) / 2))
			dropPrestiges();
		else if (game.talents.blacksmith2.purchased && game.global.world <= Math.floor((game.global.highestLevelCleared + 1) * 0.75))
			dropPrestiges();
	}
	if (game.talents.bionic.purchased){
		var bTier = ((game.global.world - 126) / 15);
		if (game.global.world >= 126) game.mapUnlocks.BionicWonderland.canRunOnce = false;
		if (bTier % 1 === 0 && bTier == game.global.bionicOwned && game.global.roboTrimpLevel >= bTier) {
			game.mapUnlocks.roboTrimp.createMap(bTier);
			refreshMaps();
		}
	}
	if (game.talents.housing.purchased) {
		autoUnlockHousing();
	}
	if (game.talents.portal.purchased && game.global.world == 21 && game.mapUnlocks.Portal.canRunOnce){
		game.mapUnlocks.Portal.fire(0, true);
		game.mapUnlocks.Portal.canRunOnce = false;
		refreshMaps();
	}
	if (game.talents.bounty.purchased && game.global.world == 16 && game.mapUnlocks.Bounty.canRunOnce){
		game.mapUnlocks.Bounty.fire();
		game.mapUnlocks.Bounty.canRunOnce = false;
		refreshMaps();
	}
	if (game.global.world == mutations.Corruption.start(true)){
		tooltip("Corruption", null, 'update');
	}
	if (mutations.Magma.active()){
		if (game.global.world == mutations.Magma.start()){
			startTheMagma();
		}
		mutations.Magma.increaseTrimpDecay();
		increaseTheHeat();
		decayNurseries();
	}
	if (game.global.world == 30 && game.global.canRespecPerks && !game.global.bonePortalThisRun && countHeliumSpent() <= 60) giveSingleAchieve(0);
	else if (game.global.world == 10 && game.stats.trimpsKilled.value <= 5) giveSingleAchieve(3);
	else if (game.global.world == 60){
		if (game.stats.trimpsKilled.value <= 1000) giveSingleAchieve(6);
		if (game.stats.cellsOverkilled.value == 2950) giveSingleAchieve(19);
		if (getHighestPrestige() <= 3) giveSingleAchieve(11);
		//Without Hiring Anything
		var jobCount = 0;
		for (var job in game.jobs) jobCount += game.jobs[job].owned; //Dragimp adds 1
		if (jobCount - game.jobs.Dragimp.owned == 0 && game.stats.trimpsFired.value == 0) giveSingleAchieve(16);
	}
	else if (game.global.world == 65) checkChallengeSquaredAllowed();
	else if (game.global.world == 75 && checkHousing(true) == 0) giveSingleAchieve(8);
	else if (game.global.world == 120 && !game.global.researched) giveSingleAchieve(7);
	displayGoldenUpgrades();
	if (game.achievements.humaneRun.earnable){
		if (game.stats.battlesLost.value > game.achievements.humaneRun.lastZone + 1){
			game.achievements.humaneRun.lastZone = game.global.world - 1;
			game.achievements.humaneRun.earnable = false;
		}
		else{
			checkAchieve("humaneRun");
			game.achievements.humaneRun.lastZone = game.stats.battlesLost.value;
			}
	}
	
}

function purgeBionics(){
	var bionicMaps = game.global.mapsOwnedArray.filter(function(map){return map.location == "Bionic";});
	if (bionicMaps.length > 3){
		var trim = bionicMaps.length - 3;
		for (var x = 0; x < trim; x++){
			var index = game.global.mapsOwnedArray.indexOf(bionicMaps[x]);
			if (game.global.mapsOwnedArray[index].id == game.global.currentMapId){
				if (game.global.mapsActive) continue;
				game.global.currentMapId = "";
				game.global.mapGridArray = [];
				game.global.lastClearedMapCell = -1;
			}
			message("Recycled " + bionicMaps[x].name + ".", "Notices");
			game.global.mapsOwnedArray.splice(index, 1);
		}
	}
}

function autoUnlockHousing(){
	var house = "";
		switch (game.global.world) {
			case 9:
				house = "Mansion";
				break;
			case 15: 
				house = "Hotel";
				break;
			case 24:
				house = "Nursery";
				break;
			case 26:
				house = "Resort";
				break;
			case 31:
				house = "Gateway";
				break;
			case 37: 
				house = "Wormhole";
				break;
			case 51:
				house = "Collector";
				break;
			default: return;
		}
		if (!house) return;
		house = game.mapUnlocks[house];
		if (!house.canRunOnce) return;
		house.fire();
		house.canRunOnce = false;
		message(house.message, "Unlocks", null, null, 'unique', convertUnlockIconToSpan(house));	
}

function startSpire(confirmed){
	if (!confirmed){
		game.global.spireActive = true;
		setNonMapBox();
		if (game.options.menu.mapsOnSpire.enabled){
			game.global.fighting = false;
			mapsSwitch();
		}
		cancelTooltip();
		tooltip("Spire", null, 'update');
		return;
	}
	cancelTooltip();
}

function handleExitSpireBtn(){
	var display = (game.global.spireActive && !game.global.mapsActive && !game.global.preMapsActive) ? "block" : "none";
	document.getElementById('exitSpireBtnContainer').style.display = display;
}

function getSpireStats(cellNum, name, what){
	var base = (what == "attack") ? 9.4e+62 : 8e+60;
	var mod = (what == "attack") ? 1.17 : 1.14;
	base *= Math.pow(mod, cellNum);
	base *= game.badGuys[name][what];
	return base;
}

function deadInSpire(){
	game.global.spireDeaths++;
	if (game.global.spireDeaths >= 10) {
		message("You're not yet ready. Maybe you'll be of use in the next lifetime.", "Story");
		endSpire();
		return;
	}
	var s = (game.global.spireDeaths > 1) ? "s" : "";
	message(game.global.spireDeaths + " group" + s + " of Trimps have perished in the Spire.", "Notices");
}

function endSpire(cancelEarly){
	game.global.spireActive = false;
	var cell = game.global.gridArray[game.global.lastClearedCell + 1];
	if (!cell) return;
	cell.health = cell.origHealth;
	cell.attack = cell.origAttack;
	cell.maxHealth = cell.origHealth;
	document.getElementById('grid').className = "";
	if (game.global.lastClearedCell == 98) {
		var elem = document.getElementById("badGuyName");
		elem.innerHTML = elem.innerHTML.replace("Druopitee", "Improbability");
	}
	clearSpireMetals();
	setNonMapBox();
	handleExitSpireBtn();
}

function clearSpireMetals(){
	var spireMetal = document.getElementsByClassName('spireMetals');
	for (var x = 0; x < spireMetal.length; x++){
		spireMetal[x].style.visibility = 'hidden';
	}	
}

//Big storyline spoilers in the function below, be careful if you care

function giveSpireReward(level){ 
	var amt = 0;
	if (level != 0 && level % 10 == 0) game.global.spireRows = Math.floor(level / 10);
	var text = "";
	switch(level){
		case 10:
			text = "The voice booms again, and sounds as if it is coming from the walls themselves.<br/><br/><span class='spirePoem'>It has been forever, yet now we meet,<br/>I'm not surprised you don't remember me.<br/>I believe it is I who you currently seek,<br/>Lifetimes ago I was Druopitee.</span>";
			if (game.portal.Toughness_II.locked) text += "<br/>You're glad you remembered his name correctly! You feel tougher as memories begin to flood back, and <b>unlocked Toughness II</b>!";
			message(text, "Story");
			game.portal.Toughness_II.locked = false;
			break;
		case 20:
			message("<span class='spirePoem'>On our planet you and I studied time,<br/>We realized Warp Speed could affect that line.<br/>I took our work in a ship of my own design,<br/>To test the effects of our new paradigm.</span><br/>Oh yeah. That's where you knew him from! Wait doesn't he owe you some money? You feel fair taking a vial of <b>40 Nullifium</b> from a research table.", "Story");
			game.global.nullifium += 40;
			break;
		case 30:
			text += "<span class='spirePoem'>My tests made other dimensions appear,<br/>I found this planet in one and flew here.<br/>There were hordes of enemies, if that wasn't clear,<br/>The finding was huge but the threat severe.</span><br/>Ah, so you're in a different dimension than your friends and family, comforting.";
			if (game.portal.Power_II.locked) text += " Your desire to go home some day causes strength to flow through you, and you <b>unlocked Power II</b>!";
			message(text, "Story");
			game.portal.Power_II.locked = false;
			break;
		case 40: 
			
			text = "<span class='spirePoem'>To stay safe, I built many large towers.<br/>I'd climb up, and I'd peer out for hours.<br/>I searched for lifetimes, my mind became devoured,<br/>then one day I found a way to gain power.</span><br/>Dammit Druopitee. This is all going to end up being his fault, isn't it? ";
			if (!game.global.runningChallengeSquared){
				amt = giveHeliumReward(15);
				text += "You help yourself to a container filled with " + prettify(amt) + " Helium, and figure he'll owe you a lot more than that once you hear some more.";
				}
			else
				text += "You look for something to steal to try and even the playing field, but can't find anything. Oh well.";
			message(text, "Story");
			break;
		case 50: 
			text = "<span class='spirePoem'>After many lifetimes of observation,<br/>I had finally found my salvation.<br/>An airborne chemical to cause great mutation,<br/>the Corruption was my new creation.</span><br/>Yup, totally his fault.";
			if (game.portal.Motivation_II.locked) text += "Your desire to stop him is so strong that you've <b>unlocked Motivation II</b>!"
			message(text, "Story");
			game.portal.Motivation_II.locked = false;
			break;
		case 60: 
			game.global.nullifium += 60;
			message("<span class='spirePoem'>I pumped Corruption up from my spires,<br/>I watched as it spread outward like wildfires.<br/>They now bowed to me, their brains freshly rewired,<br/>I had almost all that I desired.</span><br/>You feel like anyone willing to pump something called 'Corruption' into a planet's atmosphere probably qualifies as a supervillian. You feel no remorse taking another vial filled with <b>60 Nullifium</b>!", "Story");
			break;
		case 70:
			message("<span class='spirePoem'>But Trimps, who in numbers are tough as stone,<br/>weren't changed and I couldn't control them alone.<br/>So I got in my ship and I went to our home,<br/>I brought you here to the native Trimp Zones.</span><br/>You don't remember that, but are pretty sure you weren't OK with it. Kidnapping definitely justifies taking this research <b>Heirloom</b> you just found. ", "Story");
			createHeirloom(201);
			break;
		case 80:
			text = "<span class='spirePoem'>You disliked my plan and had to be forced,<br/>so I wiped your mind and plotted your course.<br/>I came up with plans for equipment and resorts,<br/>I wrote all I knew and left you reports.</span><br/> Oh HE wrote those? Now that you think about it, you can see a lot of ways the designs could be improved";
			text += (game.portal.Carpentry_II.locked) ? ", and <b>unlocked Carpentry II</b>!" : ".";
			message(text, "Story");
			game.portal.Carpentry_II.locked = false;
			break;
		case 90:
			message("<span class='spirePoem'>Your Trimps grew strong while I watched and waited,<br/>Their loyalty can not be debated.<br/>You knew not of my plan, yet participated,<br/>Now bow to me or be terminated.</span>Yeah you don't really feel too much like bowing and probably won't be doing that. You did find <b>5 Skeletimp Bones</b> which you feel no qualms about keeping for yourself.", "Story");
			game.global.b += 5;
			updateSkeleBtn();
			break;
		case 100:
			if (game.global.spireDeaths == 0) giveSingleAchieve(23);

			text = "Druopitee collapses to the floor. You were hoping he'd be a little more sane, but whatever. You shut down the corruption device and hope the planet will repair itself soon, then you rummage through his stuff and find keys, surely for the ship!";
			if (!game.global.runningChallengeSquared){
				amt = giveHeliumReward(100);
				text += "You also find a massive stockpile of <b>" + prettify(amt) + " Helium</b>.";
			}
			if (game.portal.Looting_II.locked) text += " Your skills at salvaging things from this Spire have helped you <b>unlock Looting II</b>.";
			text += " You've helped the Trimps establish a legendary population and economy, and have brought down the man responsible for the chaos in this world. You could leave now and the Universe will forever be better because you existed. Trimps will erect statues of you as long as their civilization survives. But you know there are still other spires out there, pumping Corruption in to the planet. Maybe the statues would be bigger if you stayed and helped out?";
			message(text, "Story");
			game.portal.Looting_II.locked = false;
			checkAchieve("spireTimed");
			game.global.spireActive = false;
			setNonMapBox();
			handleExitSpireBtn();
			break;
		default:
			if (game.global.runningChallengeSquared) return;
			amt = 0.5;
			amt *= Math.pow(1.01, level);
			amt = giveHeliumReward(amt);
			message("You found " + prettify(amt) + " helium!", "Loot", "oil", "helium", "helium");
	}
}

var goldenUpgradesShown = false;
function displayGoldenUpgrades(redraw) {
	if (goldenUpgradesShown && !redraw) return false;
	if (getAvailableGoldenUpgrades() <= 0) return false;
	if (!goldenUpgradesShown) game.global.lastUnlock = new Date().getTime();
	var html = "";
	for (var item in game.goldenUpgrades){
		var upgrade = game.goldenUpgrades[item];
		if (item == "Void" && game.global.totalPortals < 5) continue;
		var color = "thingColorGoldenUpgrade";
		if (
			(item == "Void" && (parseFloat((game.goldenUpgrades.Void.currentBonus + game.goldenUpgrades.Void.nextAmt()).toFixed(2)) > 0.60)) ||
			(item == "Helium" && game.global.runningChallengeSquared)
		){
			color = "thingColorCanNotAfford";
		}
		html += '<div onmouseover="tooltip(\'' + item + '\', \'goldenUpgrades\', event)" onmouseout="tooltip(\'hide\')" class="' + color + ' thing goldenUpgradeThing noselect pointer upgradeThing" id="' + item + 'Golden" onclick="buyGoldenUpgrade(\'' + item + '\'); tooltip(\'hide\')"><span class="thingName">Golden ' + item + ' ' + romanNumeral(game.global.goldenUpgrades + 1) + '</span><br/><span class="thingOwned" id="golden' + item + 'Owned">' + upgrade.purchasedAt.length + '</span></div>';
	}
	var elem = document.getElementById('upgradesHere');	
	elem.innerHTML =  html + elem.innerHTML;
	goldenUpgradesShown = true;
	return true;
}

function removeGoldenUpgrades() {
	if (!goldenUpgradesShown) return false;
	var elems = document.getElementsByClassName('goldenUpgradeThing');
	var parent = document.getElementById('upgradesHere');
	for (var x = elems.length - 1; x >= 0; x--){
		parent.removeChild(elems[x]);
	}
	goldenUpgradesShown = false;
	return true;
}

function getAvailableGoldenUpgrades(){
	var tier = getAchievementStrengthLevel();
	if (tier == 0) return 0;
	return Math.floor(game.global.world / getGoldenFrequency(tier)) - game.global.goldenUpgrades;
}

function getGoldenFrequency(fluffTier){
	return 50 - ((fluffTier - 1) * 5);
}

function buyGoldenUpgrade(what) {
	if (what == "Helium" && game.global.runningChallengeSquared) return;
	if (game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) return;
	var totalAvailable = getAvailableGoldenUpgrades();
	if (totalAvailable <= 0) return false;
	if (what == "Void" && (parseFloat((game.goldenUpgrades.Void.currentBonus + game.goldenUpgrades.Void.nextAmt()).toFixed(2)) > 0.60)) return;
	var upgrade = game.goldenUpgrades[what];
	upgrade.currentBonus += upgrade.nextAmt();
	upgrade.purchasedAt.push(game.global.goldenUpgrades);
	game.global.goldenUpgrades++;
	removeGoldenUpgrades();
	game.stats.goldenUpgrades.value++;
	if (game.stats.goldenUpgrades.valueTotal + game.stats.goldenUpgrades.value >= 300 && game.global.autoGolden == -1){
		unlockAutoGolden();
	}
	if (totalAvailable > 1) displayGoldenUpgrades();
	return true;
}

function unlockAutoGolden(){
	tooltip('AutoGolden Unlocked', null, 'update');
	game.global.autoGolden = 0;
	toggleAutoGolden(true);
}

function giveHeliumReward(mod){ //used for spire only
	var amt = rewardResource("helium", mod, 99);
	return amt;
}

function checkHousing(getHighest){
	//returns the lowest number of housing buildings
	var count = -1;
	for (var item in game.buildings){
		var building = game.buildings[item];
		if (building.increase && building.increase.what == "trimps.max") {
			if (count == -1) count = building.owned;
			else if (getHighest){
				if (count < building.owned) count = building.owned;
			}
			else {
				if (count > building.owned) count = building.owned;
			}
		}
	}
	return count;
}

function assignExtraWorkers(){
	var workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
	var freeTrimps = (game.resources.trimps.owned - game.resources.trimps.employed);
	//Won't leave you with less than 15% of your max as breeders
	if (freeTrimps - workspaces < Math.floor(game.resources.trimps.realMax() * 0.15)) return;
	if (freeTrimps < workspaces) workspaces = freeTrimps;
	if (workspaces <= 0) return;
	var jobs = ["Farmer", "Lumberjack", "Miner"];
	var split = Math.floor(workspaces / 3);
	if (game.resources.food.owned < (split * 30)) split = Math.floor(game.resources.food.owned / 30);
	for (var x = 0; x < jobs.length; x++){
		game.jobs[jobs[x]].owned += split;
	}
	game.resources.trimps.employed += Math.round(split * 3);
	game.resources.food.owned -= (split * 30);
}

function distributeToChallenges(amt) {
	var challenge = game.global.challengeActive;
	if (challenge == "Mapocalypse") challenge = "Electricity";
	if (!challenge || typeof game.challenges[challenge].heliumThrough === 'undefined') return;
	var challengeObj = game.challenges[challenge];
	if (game.global.world <= challengeObj.heliumThrough) challengeObj.heldHelium += amt;
}

var dailyModifiers = {
	minDamage: {
            description: function (str) {
                return "Trimp min damage reduced by " + prettify(this.getMult(str) * 100) + "% (additive).";
            },
            getMult: function (str) {
                return 0.1 + ((str - 1) * 0.01);
            },
            getWeight: function (str) {
				return (1 / ((1.2 + (1 - this.getMult(str))) / 2 / 1.1)) - 1;    
            },
            minMaxStep: [41, 90, 1],
            chance: 1
        },
        maxDamage: {
            description: function (str) {
                return "Trimp max damage increased by " + prettify(this.getMult(str) * 100) + "% (additive).";
            },
            getMult: function (str) {
                return str;
            },
            getWeight: function (str) {
                return (1 - ((1.2 + (1 + str)) / 2 / 1.1));
            },
            minMaxStep: [1, 5, 0.25],
            chance: 1
        },
		plague: { //Half of electricity
			description: function (str) {
                return "Enemies stack a debuff with each attack, damaging Trimps for " + prettify(this.getMult(str, 1) * 100) + "% of total health per turn per stack, resets on Trimp death."
            },
            getMult: function (str, stacks) {
                return 0.01 * str * stacks;
			},
			getWeight: function (str) {
				var count = (str < 2) ? 15 : ((str < 3) ? 11 : ((str < 4) ? 9 : ((str < 5) ? 8 : ((str < 7) ? 7 : ((str < 10) ? 6 : (str < 17) ? 5 : 4)))));
				return ((10 / 8) + 6 - ((0.2 * count)/2) + ((((500 * count + 400) / count) / 500)-1) - ((10 - str) / 8)) / 1.75;
			},
			minMaxStep: [1, 10, 1],
			chance: 0.6,
			icon: "*bug2",
			stackDesc: function (str, stacks) {
				return "Your Trimps are taking " + prettify(this.getMult(str, stacks) * 100) + "% damage after each attack.";
			}
        },
		weakness: {
			description: function (str) {
				return "Enemies stack a debuff with each attack, reducing Trimp attack by " + prettify(100 - this.getMult(str, 1) * 100) + "% per stack. Stacks cap at 9 and reset on Trimp death.";
			},
			getMult: function (str, stacks) {
				return 1 - (0.01 * str * stacks);
			},
			getWeight: function (str) {
				return str / 4;
			},
			minMaxStep: [1, 10, 1],
			chance: 0.6,
			icon: "fire",
			stackDesc: function (str, stacks) {
				return "Your Trimps have " + prettify(100 - this.getMult(str, stacks) * 100) + "% less attack.";
			}
		},
		large: {
            description: function (str) {
                return "All housing can store " + prettify(100 - this.getMult(str) * 100) + "% fewer Trimps";
            },
            getMult: function(str) {
                return 1 - (0.01 * str);
            },
            getWeight: function (str) {
                return (1 / this.getMult(str) - 1) * 2;
            },
            start: function (str) {
                game.resources.trimps.maxMod = this.getMult(str);
            },
            abandon: function (str) {
                game.resources.trimps.maxMod = 1;
            },
            minMaxStep: [10, 60, 1],
            chance: 1
        },
		dedication: {
			description: function (str) {
				return "Gain " + prettify((this.getMult(str) * 100) - 100) + "% more resources from gathering";
			},
			getMult: function(str) {
				return 1 + (0.1 * str);
			},
			getWeight: function (str) {
				return 0.075 * str * -1;
			},
			minMaxStep: [5, 40, 1],
			chance: 0.75
		},
		famine: {
            description: function (str) {
                return "Gain " + prettify(100 - (this.getMult(str) * 100)) + "% less Metal, Food, Wood, and Gems from all sources";
            },
            getMult: function (str) {
                return 1 - (0.01 * str);
            },
            getWeight: function (str) {
                return (1 / this.getMult(str) - 1) / 2;
            },
            minMaxStep: [40, 80, 1],
            chance: 2
        },
		badStrength: {
			description: function (str) {
				return "Enemy attack increased by " + prettify((this.getMult(str) * 100) - 100) + "%.";
			},
			getMult: function (str) {
				return 1 + (0.2 * str);
			},
			getWeight: function (str){
				return 0.1 * str;
			},
			minMaxStep: [5, 15, 1],
			chance: 1
		},
		badHealth: {
			description: function (str) {
				return "Enemy health increased by " + prettify((this.getMult(str) * 100) - 100) + "%.";
			},
			getMult: function (str) {
				return 1 + (0.2 * str);
			},
			getWeight: function (str){
				return 0.2 * str;
			},
			minMaxStep: [3, 15, 1],
			chance: 1
		},
		badMapStrength: {
            description: function (str) {
                return "Enemy attack in maps increased by " + prettify((this.getMult(str) * 100) - 100) + "%.";
            },
            getMult: function (str) {
                return 1 + (0.3 * str);
            },
            getWeight: function (str){
                return (0.1 * (1 + 1/3)) * str;
            },
            minMaxStep: [3, 15, 1],
            chance: 1
        },
        badMapHealth: {
            description: function (str) {
                return "Enemy health in maps increased by " + prettify((this.getMult(str) * 100) - 100) + "%.";
            },
            getMult: function (str) {
                return 1 + (0.3 * str);
            },
            getWeight: function (str){
                return (0.3 * str) * (5 / 8);
            },
            minMaxStep: [3, 10, 1],
            chance: 1
        },
		crits: {
            description: function (str) {
                return "Enemies have a 25% chance to crit for " + prettify(this.getMult(str) * 100) + "% of normal damage";
            },
            getMult: function (str) {
                return 1 + (0.5 * str);
            },
            getWeight: function (str) {
                return 0.15 * this.getMult(str);
            },
            minMaxStep: [1, 24, 1],
            chance: 0.75
        },
        bogged: {
            description: function (str) {
                return "Your Trimps lose " + prettify(this.getMult(str) * 100) + "% of their max health after each attack.";
            },
            getMult: function (str) {
                return 0.01 * str;
            },
            getWeight: function (str) {
                var count = Math.ceil(1 / this.getMult(str));
                return (6 - ((0.2 * (count > 60 ? 60 : count) / 2)) + ((((500 * count + 400) / count) / 500)-1)) / 1.5;
            },
            minMaxStep: [1, 5, 1],
            chance: 0.75
        },
		dysfunctional: {
            description: function (str) {
                return "Your Trimps breed " + prettify(100 - (this.getMult(str) * 100)) + "% slower";
            },
            getMult: function (str) {
                return 1 - (str * 0.05);
            },
            getWeight: function (str){
                return ((1 / this.getMult(str))-1)/6;
            },
            minMaxStep: [10, 18, 1],
            chance: 1
        },
		oddTrimpNerf: {
            description: function (str) {
                return "Trimps have " + prettify(100 - (this.getMult(str) * 100)) + "% less attack on odd numbered zones";
            },
            getMult: function (str) {
                return 1 - (str * 0.02);
            },
            getWeight: function (str){
                return (1 / this.getMult(str) - 1) / 1.5;
            },
            minMaxStep: [15, 40, 1],
            chance: 1
        },
        evenTrimpBuff: {
            description: function (str) {
                return "Trimps have " + prettify((this.getMult(str) * 100) - 100) + "% more attack on even numbered zones";
            },
            getMult: function (str) {
                return 1 + (str * 0.2);
            },
            getWeight: function (str){
                return (this.getMult(str) - 1) * -1;
            },
            minMaxStep: [1, 10, 1],
            chance: 1
        },
		karma: {
			description: function (str) {
				return 'Gain a stack after killing an enemy, increasing all non Helium loot by ' + prettify((this.getMult(str, 1) * 100) - 100) + '%. Stacks cap at ' + this.getMaxStacks(str) + ', and reset after clearing a zone.';
			},
			stackDesc: function (str, stacks){				
				return "Your Trimps are finding " + prettify((this.getMult(str, stacks) * 100) - 100) + "% more loot!";
			},
			getMaxStacks: function (str) {
				return Math.floor((str % 9) * 25) + 300;
			},
			getMult: function (str, stacks) {
				var realStrength = Math.ceil(str / 9);
				return 1 + (0.0015 * realStrength * stacks);
			},
			getWeight: function (str){
				return (this.getMult(str, this.getMaxStacks(str)) - 1) / -2;
			},
			icon: "*arrow-up",
			minMaxStep: [1, 45, 1],
			chance: 1
		},
		toxic: {
			description: function (str) {
				return "Gain a stack after killing an enemy, reducing breed speed by " + prettify(100 - (this.getMult(str, 1) * 100)) + '% (compounding). Stacks cap at ' + this.getMaxStacks(str) + ', and reset after clearing a zone.';
			},
			stackDesc: function (str, stacks){				
				return "Your Trimps are breeding " + prettify(100 - (this.getMult(str, stacks) * 100)) + "% slower.";
			},
			getMaxStacks: function (str) {
				return Math.floor((str % 9) * 25) + 300;
			},
			getMult: function (str, stacks) {
				var realStrength = Math.ceil(str / 9);
				return Math.pow((1 - 0.001 * realStrength), stacks);
			},
			getWeight: function (str){
				return (1 / this.getMult(str, this.getMaxStacks(str)) - 1) / 6;			
			},
			icon: "*radioactive",
			minMaxStep: [1, 45, 1],
			chance: 1
		},
		bloodthirst: {
			description: function (str) {
				return "Enemies gain a stack of Bloodthirst whenever Trimps die. Every " + this.getFreq(str) + " stacks, enemies will heal to full and gain an additive 50% attack. Stacks cap at " + this.getMaxStacks(str) + " and reset after killing an enemy.";
			},
			stackDesc: function (str, stacks) {
				var freq = this.getFreq(str);
				var max = this.getMaxStacks(str);
				var text = "This bad guy";
				if (stacks < max) {
					var next = (freq - (stacks % freq));
					text += " will heal to full and gain attack in " + next + " stack" + ((next == 1) ? "" : "s") + ", " + ((stacks >= freq) ? "" : " and") + " gains 1 stack whenever Trimps die";
				}
				if (stacks >= freq){
					if (stacks < max) text += ", and";
					text += " currently has " + prettify((this.getMult(str, stacks) * 100) - 100) + "% more attack";
				}
				text += ".";
				return text;
			},
			getMaxStacks: function (str) {
				return (this.getFreq(str) * (2 + Math.floor(str / 2)));
			},
			getFreq: function(str){
				return 10 - str;
			},
			getMult: function (str, stacks){
				var count = Math.floor(stacks / this.getFreq(str));
				return 1 + (0.5 * count);
			},
			getWeight: function (str) {
				return 0.5 + (0.25 * Math.floor(str / 2));
			},
			minMaxStep: [1, 7, 1],
			chance: 1,
			icon: "*flask",
			iconOnEnemy: true
		},
		explosive: {
			description: function (str) {
				var text = "Enemies instantly deal " + prettify(this.getMult(str) * 100) + "% of their attack damage when killed";
				if (str > 15) {
					text += " unless your block is as high as your maximum health";
				}
				text += ".";
				return text;
			},
			getMult: function (str) {
				return str;
			},
			getWeight: function (str) {
				var mult = this.getMult(str);
				if (str <= 15){
					return (3/20 * mult) + (1/4);
				}
				else {
					return (1/14 * mult) - (1/7);
				}
			},
			minMaxStep: [5, 30, 1],
			chance: 1
		},
		slippery: {
			description: function (str) {
				return "Enemies have a " + prettify(this.getMult(str) * 100) + "% chance to dodge your attacks on " + ((str <= 15) ? "odd" : "even") + " zones.";
			},
			getMult: function (str){
				if (str > 15) str -= 15;
				return 0.02 * str;
			},
			getWeight: function (str) {
				return (1 / (1 - this.getMult(str)) - 1) * 10 / 1.5;
			},
			minMaxStep: [1, 30, 1],
			chance: 1
		},
		rampage: {
			description: function (str) {
				return "Gain a stack after killing an enemy, increasing Trimp attack by " + prettify((this.getMult(str, 1) * 100) - 100) + '% (additive). Stacks cap at ' + this.getMaxStacks(str) + ', and reset when your Trimps die.';
			},
			stackDesc: function (str, stacks){             
				return "Your Trimps are dealing " + prettify((this.getMult(str, stacks) * 100) - 100) + "% more damage.";
			},
			getMaxStacks: function (str) {
				return Math.floor((str % 10 + 1) * 10);
			},
			getMult: function (str, stacks) {
				var realStrength = Math.ceil(str / 10);
				return 1 + (0.01 * realStrength * stacks);
			},
			getWeight: function (str){
				return (1 - this.getMult(str, 1)) * this.getMaxStacks(str);
			},
			icon: "*fire",
			minMaxStep: [1, 40, 1],
			chance: 1
		},
		mutimps: {
			description: function (str) {
				var size = str % 5;
				if (size == 0) size = "";
				else size = "the first " + prettify(size * 2) + " rows of";
				
				var name = (str < 4) ? "Mutimps" : "Hulking Mutimps";
				return "40% of bad guys in " + size + " the World will be mutated in to " + name + ".";
			},
			getWeight: function (str) {
				return (str / 10) * 1.5;
			},
			getMaxCellNum: function (str) {
				if (str > 5) str -= 5;
				str--;
				var values = [19, 39, 59, 79, 99];
				return values[str];
			},
			minMaxStep: [1, 10, 1],
			chance: 1
		},
		empower: {
			description: function (str) {
				return "All enemies gain " + str + " stacks of Empower whenever your Trimps die. Empower increases their attack and health by 0.2% per stack, can stack to 9999, and never resets.";
			},
			getWeight: function (str) {
				return (str / 6) * 2;
			},
			stackDesc: function (str, stacks){
				return "This bad guy is Empowered and has " + prettify((this.getMult(str, stacks) * 100) - 100) + "% more health and attack.";
			},
			stacksToAdd: function (str){
				return str;
			},
			getMult: function (str, stacks){
				return 1 + (0.002 * stacks);
			},
			getMaxStacks: function (str) {
				return 9999;
			},
			iconOnEnemy: true,
			icon: "baby-formula",
			minMaxStep: [1, 10, 1],
			chance: 1
		},
		pressure: {
			description: function (str) {
				return "Trimps gain a stack of Pressure every " + Math.round(this.timePerStack(str)) + " seconds. Each stack of pressure reduces Trimp health by 1%. Max of " + Math.round(this.getMaxStacks(str)) + " stacks, stacks reset after clearing a zone.";
			},
			getWeight: function(str){
				var time = (105 - this.timePerStack(str));
				var stacks = this.getMaxStacks(str);
				return (((time * 1.3) + stacks) / 200);
			},
			getMult: function(str, stacks){
				return Math.pow(0.99, min(stacks, this.getMagetMaxStacks(str)));
			},
			addSecond: function(){
				var modifier = game.global.dailyChallenge.pressure;
				modifier.timer = (modifier.timer) ? modifier.timer + 1 : 1;
				if (modifier.timer >= 60){
					this.addStack();
					modifier.timer = 0;
				}
				updateDailyStacks('pressure');
			},
			addStack: function() {
				var global = game.global;
				var challenge = global.dailyChallenge.pressure;
				if (this.getMaxStacks(challenge.strength) <= challenge.stacks) {
					return;
				}
				challenge.stacks++;
				if (global.fighting){
					global.soldierHealthMax *= 0.99;
					if (global.soldierHealthMax < global.soldierHealth)
						global.soldierHealth = global.soldierHealthMax;
					if (global.soldierHealth < 0)
						global.soldierHealth = 0;
				}
			},
			timePerStack: function(str){
				var thisStr = Math.ceil(str / 4) - 1;
				return (45 + (thisStr * 5));
			},
			resetTimer: function(){
				var modifier = game.global.dailyChallenge.pressure;
				modifier.timer = 0;
				modifier.stacks = 0;
				updateDailyStacks('pressure');
			},
			stackDesc: function(str, stacks){
				return "Your Trimps are under a lot of pressure. Maximum health is reduced by " + prettify((1 - this.getMult(str, stacks)) * 100) + "%.";
			},
			getMaxStacks: function(str){
				var thisStr = Math.floor(str % 4);
				return (45 + (thisStr * 5));
			},
			icon: "*heart3",
			minMaxStep: [1, 16, 1],
			chance: 1
		},
		mirrored: {
			description: function (str) {
				return "Enemies have an " + prettify(this.getReflectChance(str)) + "% chance to reflect an attack, dealing " + prettify(this.getMult(str) * 100) + "% of damage taken back to your Trimps.";
			},
			getReflectChance: function(str){
				return (Math.ceil(str / 10)) * 10;
			},
			getMult: function(str){
				return ((str % 10) + 1) / 10;
			},
			getWeight: function(str){
				return ((((this.getReflectChance(str) + 90) / 100) * 0.85) * ((this.getMult(str) + 0.9) * 0.85));
			},
			testWeights: function(){
				var min = 0;
				var max = 0;
				var results = []
				for (var x = this.minMaxStep[0]; x <= this.minMaxStep[1]; x += this.minMaxStep[2]){
					var result = this.getWeight(x);
					if (min == 0)
						min = result;
					else if (result < min)
						min = result;
					if (result > max)
						max = result;
					results.push(result);
				}
				console.log(results);
				return "Min: " + min + ", Max: " + max;
			},
			reflectDamage: function(str, attack){
				if (Math.floor(Math.random() * 100) >= this.getReflectChance(str))
					return 0;
				return this.getMult(str) * attack;
			},
			minMaxStep: [1, 100, 1],
			chance: 1
		},
		metallicThumb: {
			description: function (str) {
				return "Equipment is " + prettify((1 - this.getMult(str)) * 100) + "% cheaper.";
			},
			getWeight: function (str) {
				return ((str + 3) / 26);
			},
			getMult: function(str){
				return 1 - (str/100 * 5);
			},
			minMaxStep: [1, 10, 1],
			chance: 1
		}
/* 		disarmed: {
			equipmentList: ["Boots", "Mace", "Helmet", "Polearm", "Pants", "Battleaxe", "Shoulderguards", "Greatsword", "Breastplate", "Arbalest", "Gambeson"],
			description: function (str) {
				return "You can't use something"
			},
			getBannedEquipment(str, checkOne){
				if (checkOne) return (this.equipmentList.indexOf(checkOne) < str);
			},
			minMaxStep: [1, 11, 1],
			chance: 1
		} */
	};
	
function getCurrentDailyDescription(){
	var daily = game.global.dailyChallenge;
	if (!daily) return "";
	var returnText = "<ul style='text-align: left'>";
	for (var item in daily){
		if (item == 'seed') continue;
		returnText += "<li>" + dailyModifiers[item].description(daily[item].strength) + "</li>";
	}
	returnText += "</ul>Challenge has no end point, and grants an <u><b>additional "  + prettify(getDailyHeliumValue(countDailyWeight())) + "%</b></u> of all helium earned before finishing.";
	return returnText;
}

function testAllWeights(){
	for (var item in dailyModifiers){
		console.log(item, dailyModifiers[item].getWeight(dailyModifiers[item].minMaxStep[0]), dailyModifiers[item].getWeight(dailyModifiers[item].minMaxStep[1])); 
	}
}
	
function startDaily(){
	for (var item in game.global.dailyChallenge){
		if (item == "seed") continue;
		if (typeof dailyModifiers[item].start !== 'undefined') dailyModifiers[item].start(game.global.dailyChallenge[item].strength, game.global.dailyChallenge[item].stacks);
	}
	game.global.recentDailies.push(game.global.dailyChallenge.seed);
	handleFinishDailyBtn();
}

function countDailyWeight(dailyObj){
	var weight = 0;
	if (!dailyObj) dailyObj = game.global.dailyChallenge;
	for (var item in dailyObj){
		if (item == "seed") continue;
		weight += dailyModifiers[item].getWeight(dailyObj[item].strength);
	}
	return weight;
}

function getDailyHeliumValue(weight){
	//min 2, max 6
	var value = 75 * weight + 20;
	if (value < 100) value = 100;
	else if (value > 500) value = 500;
	return value;	
}

function handleFinishDailyBtn(){
	var display = (game.global.challengeActive == "Daily" && !game.global.mapsActive && !game.global.preMapsActive) ? "block" : "none";
	document.getElementById('finishDailyBtnContainer').style.display = display;
}

function abandonDaily(){
	for (var item in game.global.dailyChallenge){
		if (item == "seed") continue;
		if (typeof dailyModifiers[item].abandon !== 'undefined') dailyModifiers[item].abandon(game.global.dailyChallenge[item].strength, game.global.dailyChallenge[item].stacks);
		if (typeof dailyModifiers[item].icon !== 'undefined'){
			var stackElem = document.getElementById(item + 'DailyStacks');
			if (stackElem != null) stackElem.style.display = 'none';
		}
	}
	var value = getDailyHeliumValue(countDailyWeight()) / 100;
	var reward = game.resources.helium.owned + game.stats.spentOnWorms.value;
	if (reward > 0) reward = Math.floor(reward * value);
	if (!isNumberBad(reward)){
		addHelium(reward);
		game.global.dailyHelium += reward;
		game.stats.dailyBonusHelium.value += reward;
		checkAchieve('dailyHelium');
	}
	else console.log('attempted to give ' + reward + ' as daily challenge reward.');
	message("You have completed the Daily challenge! You have been rewarded with " + prettify(reward) + " extra Helium!", "Notices");
	game.global.dailyChallenge = {};
	handleFinishDailyBtn();
	return reward;
}

function checkCompleteDailies(){
	var currentCompleteObj = game.global.recentDailies;
	var newCompleteObj = [];
	for (var x = 0; x > -7; x--){
		var timeString = getDailyTimeString(x);
		if (currentCompleteObj.indexOf(timeString) != -1)
			newCompleteObj.push(timeString);
	}
	game.global.recentDailies = newCompleteObj;
}
	
function updateDailyStacks(what){
	var elem = document.getElementById(what + "DailyStacks");
	if (game.global.dailyChallenge[what].stacks == 0){
		if (elem == null) return;
		else elem.style.display = "none";
		return;
	}
	if (elem == null){
		var html = "<span id='" + what + "DailyStacks' class='badge antiBadge' onmouseover='tooltip(\"" + what + "\", \"dailyStack\", event)' onmouseout='tooltip(\"hide\")'><span id='" + what + "DailyStacksCount'>" + game.global.dailyChallenge[what].stacks + "</span>";
		var icon = (dailyModifiers[what].icon.charAt(0) == "*") ? "icomoon icon-" + dailyModifiers[what].icon.substr(1) : "glyphicon glyphicon-" + dailyModifiers[what].icon;
		html += "<span class='" + icon + "'></span></span>";
		var target = (dailyModifiers[what].iconOnEnemy) ? document.getElementById('badDebuffSpan') : document.getElementById('debuffSpan');
		target.innerHTML += html;	
		return;
	}
	else document.getElementById(what + "DailyStacksCount").innerHTML = game.global.dailyChallenge[what].stacks;
	elem.style.display = "inline-block";
}

function updateDailyClock(justTime){
	var elem = document.getElementById('dailyResetTimer');
	if (elem == null && !justTime) return;
	var now = new Date();
	var secondsRemaining = 59 - now.getUTCSeconds();
	var minutesRemaining = 59 - now.getUTCMinutes();
	var hoursRemaining = 23 - now.getUTCHours();
	if (secondsRemaining <= 9) secondsRemaining = "0" + secondsRemaining;
	if (minutesRemaining <= 9) minutesRemaining = "0" + minutesRemaining;
	if (hoursRemaining <= 9) hoursRemaining = "0" + hoursRemaining;
	var timeRemaining = hoursRemaining + ":" + minutesRemaining + ":" + secondsRemaining;
	if (justTime) return timeRemaining;
	elem.innerHTML = timeRemaining;
}

function getDailyTimeString(add, makePretty, getDayOfWeek){
	var today = new Date();
	if (!add) add = 0;
	today.setDate(today.getDate() + add + lastAdd);
	if (getDayOfWeek) return today.getDay();
	var year = today.getUTCFullYear();
	var month = today.getUTCMonth() + 1; //For some reason January is month 0? Why u do dis?
	if (month < 10) month = "0" + month;
	var day = today.getUTCDate();
	if (day < 10) day = "0" + day;
	if (makePretty) return year + "-" + month + "-" + day;
	var seedStr = String(year) + String(month) + String(day);
	seedStr = parseInt(seedStr);
	return seedStr;
}

function dayOfWeek(number){
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return days[number];
}

function getDailyTopText(add){
	readingDaily = add;
	var returnText = "<div class='row dailyTopRow'>";
	var checkedDayDone = false;
	var todayOfWeek = getDailyTimeString(0, false, true);
	for (var x = 0; x < 7; x++){
		var dayIndex = (todayOfWeek * -1) + x;
		if (dayIndex > 0)
			dayIndex = (x - todayOfWeek) - 7;
		var dayDone = (game.global.recentDailies.indexOf(getDailyTimeString(dayIndex)) != -1);
		if (add == dayIndex) checkedDayDone = dayDone;
		returnText += "<div onmouseover='tooltip(\"Switch Daily\", null, event, " + dayIndex + ")' onmouseout='cancelTooltip()' onclick='getDailyChallenge(" + dayIndex + ")' class='col-xs-1 seventhColumn noselect lowPad pointer dailyTop ";
		if (add == dayIndex)
			returnText += 'colorInfo';
		else if (dayDone)
			returnText += 'colorGrey';
		else
			returnText += 'colorSuccess';
		returnText += "'>" + dayOfWeek(getDailyTimeString(dayIndex, false, true)).charAt(0);
		if (!dayDone){
			var heliumValue = getDailyHeliumValue(countDailyWeight(getDailyChallenge(dayIndex, true)));
			returnText += "<br/>" + prettify(heliumValue) + "%";
		}
		else returnText += "<br/>Done";
		returnText += "</div>";
	}
	returnText += "</div><div class='row' style='margin: 0'><div class='col-xs-6 lowPad dailyTop' style='font-weight: bold'>" + dayOfWeek(getDailyTimeString(add, false, true)) + " " + getDailyTimeString(add, true) + "</div><div class='col-xs-6 dailyTop lowPad'>" + dayOfWeek(getDailyTimeString(1, false, true)) + " resets in <span id='dailyResetTimer'>00:00:00</span></div></div>";
	
	if (checkedDayDone)
		returnText += "<b class='redText'>You have already attempted this Daily Challenge!</b><br/><br/>";
	return [returnText, !checkedDayDone];
}

var nextDaily = "";
var lastAdd = 0; //internal starting seed
var readingDaily = 0;
function getDailyChallenge(add, objectOnly, textOnly){
	checkCompleteDailies();
	var now = new Date().getTime();
	var dateSeed  = getDailyTimeString(add);
	var returnText = "";
	if (!objectOnly){
		returnText = getDailyTopText(add);
		if (!returnText[1]){
			//if (document.getElementById('specificChallengeDescription') != null) document.getElementById('specificChallengeDescription').innerHTML = returnText[0];
			document.getElementById('activatePortalBtn').style.display = 'none';
			//return returnText[0];
		}
		else document.getElementById('activatePortalBtn').style.display = 'inline-block';
		returnText = returnText[0];
		returnText += "<ul style='text-align: left'>";
	}
	var seedStr = getRandomIntSeeded(dateSeed + 2, 1, 1e9);
	//seedStr = getRandomIntSeeded(seedStr, 1, 1e9);
	var weightTarget = getRandomIntSeeded(seedStr++, 20, 51) / 10;
	//Build a list of all modifiers to choose from
	var modifierList = [];
	var totalChance = 0;
	var dailyObject = {};
	
	for (var item in dailyModifiers){
		modifierList.push(item);
		totalChance += dailyModifiers[item].chance;
	}
	var chanceMod = 1000 / totalChance;
	var currentWeight = 0;
	var maxLoops = modifierList.length;
	var sizeCount = [0,0,0];// < 0.3, < 1, >= 1
	var sizeTarget = [getRandomIntSeeded(seedStr++, 0, 2), getRandomIntSeeded(seedStr++, 1, 5), getRandomIntSeeded(seedStr++, 2, 6)]
	if (weightTarget < 2.75) {
		sizeTarget[2] = 0; sizeTarget[0] += 2;
	}
	mainLoop: 
	for (var x = 0; x < maxLoops; x++){
		var maxZLoops = modifierList.length;
		var firstChoice = [];
		modLoop: 
		for (var z = 0; z < maxZLoops; z++){
			var roll = getRandomIntSeeded(seedStr++, 0, 1000);
			var selectedIndex;
			var checkedTotal = 0;
			lookupLoop:
			for (var y = 0; y < modifierList.length; y++){
				checkedTotal += dailyModifiers[modifierList[y]].chance * chanceMod;
				if ((roll < checkedTotal) || y == modifierList.length - 1){
					totalChance -= dailyModifiers[modifierList[y]].chance;
					chanceMod = 1000 / totalChance;
					selectedIndex = y;
					break lookupLoop;
				}
			}
			var selectedMod = modifierList[selectedIndex];
			var modObj = dailyModifiers[selectedMod];
			var str = modObj.minMaxStep[0] + (getRandomIntSeeded(seedStr++, 0, Math.floor(((modObj.minMaxStep[1] + modObj.minMaxStep[2]) * (1 / modObj.minMaxStep[2]))) - modObj.minMaxStep[0]) * modObj.minMaxStep[2]);
			var modWeight = modObj.getWeight(str);
			var modSize = (modWeight < 0.85) ? 0 : ((modWeight < 1.85) ? 1 : 2);
			if ((modWeight + currentWeight > weightTarget + 1) ) continue;
			if (everythingInArrayGreaterEqual(sizeTarget, sizeCount)){
				//use it and stuff
			}
			else if (sizeCount[modSize] >= sizeTarget[modSize] && z != maxZLoops - 1){
				if (!firstChoice.length) firstChoice = [selectedMod, str, selectedIndex, modSize, modWeight];
				continue modLoop;
			}
			else if (z == maxZLoops - 1 && firstChoice.length){
				selectedMod = firstChoice[0];
				modObj = dailyModifiers[selectedMod];
				selectedIndex = firstChoice[2];
				str = firstChoice[1];
				modSize = firstChoice[3];
				modWeight = firstChoice[4];
			}
			
			//It's been officially selected by this point
			sizeCount[modSize]++;
			if (!objectOnly) returnText += "<li>" + modObj.description(str) + "</li>";
			dailyObject[modifierList[selectedIndex]] = {strength: str, stacks: 0};
			//console.log(selectedMod + "(strength: " + str + ", weight: " + modObj.getWeight(str) + "): " + modObj.description(str));
			currentWeight += modWeight;
			if (x > 0 && (currentWeight > weightTarget || (currentWeight >= weightTarget - 0.5 && currentWeight <= weightTarget + 0.5))){
				break mainLoop;
			}
			modifierList.splice(selectedIndex, 1);
			break modLoop;
		}

	}
	dailyObject.seed = dateSeed;
	if (objectOnly) return dailyObject;
	if (countDailyWeight(dailyObject) != currentWeight) console.log('mismatch, objectCount = ' + countDailyWeight(dailyObject) + ", current = " + currentWeight);
	returnText += "</ul>Challenge has no end point, and grants an <u><b>additional "  + prettify(getDailyHeliumValue(currentWeight)) + "%</b></u> of all helium earned before finishing. <b>Can only be run once!</b> Reward does not count toward Bone Portals or affect best He/Hr stat.";	
	if (textOnly) return returnText;
	nextDaily = returnText;
	if (document.getElementById('specificChallengeDescription') != null) document.getElementById('specificChallengeDescription').innerHTML = returnText;
	updateDailyClock();
/* 	console.log("");
	console.log("Attempted challenge with weight of " + weightTarget + ", built challenge with weight of " + currentWeight);
	console.log("Target max for small, medium, large mods were: ", sizeTarget[0], sizeTarget[1], sizeTarget[2]);
	console.log("Actually made for small, medium large: ", sizeCount[0], sizeCount[1], sizeCount[2]);
	console.log("");
	console.log("Took " + (new Date().getTime() - now) + "ms");
	console.log("");
	console.log(""); */
	return returnText;
}

function everythingInArrayGreaterEqual(smaller, bigger){
	if (bigger.length < smaller.length) return false;
	for (var x = 0; x < smaller.length; x++){
		if (smaller[x] > bigger[x]) return false;
	}
	return true;
}

function fight(makeUp) {
	var randomText;
    var cellNum;
    var cell;
    var cellElem;
	var currentMapObj;
	var isVoid = false;
	game.global.passive = false;
    if (game.global.mapsActive) {
        cellNum = game.global.lastClearedMapCell + 1;
        cell = game.global.mapGridArray[cellNum];
        cellElem = document.getElementById("mapCell" + cellNum);
		currentMapObj = getCurrentMapObject();
		if (currentMapObj.location == "Void") isVoid = true;
    } else {
        cellNum = game.global.lastClearedCell + 1;
        cell = game.global.gridArray[cellNum];
        cellElem = document.getElementById("cell" + cellNum);
    }
    if (game.global.soldierHealth <= 0) {
		if (isVoid) game.global.voidDeaths++;
		game.stats.trimpsKilled.value += game.resources.trimps.soldiers;
		game.stats.battlesLost.value++;
		if (game.global.challengeActive == "Daily"){
			if (typeof game.global.dailyChallenge.bloodthirst !== 'undefined'){
				game.global.dailyChallenge.bloodthirst.stacks++;
				var maxStacks = dailyModifiers.bloodthirst.getMaxStacks(game.global.dailyChallenge.bloodthirst.strength);
				if (game.global.dailyChallenge.bloodthirst.stacks > maxStacks) {
					game.global.dailyChallenge.bloodthirst.stacks = maxStacks;
				}
				else if (game.global.dailyChallenge.bloodthirst.stacks % dailyModifiers.bloodthirst.getFreq(game.global.dailyChallenge.bloodthirst.strength) == 0){
					cell.health = cell.maxHealth;
				}
				updateDailyStacks('bloodthirst');
			}
		}
        var s = (game.resources.trimps.soldiers > 1) ? "s " : " ";
		randomText = game.trimpDeathTexts[Math.floor(Math.random() * game.trimpDeathTexts.length)];
        message(prettify(game.resources.trimps.soldiers) + " Trimp" + s + "just " + randomText + ".", "Combat", null, null, 'trimp');
		if (game.global.spireActive && !game.global.mapsActive) deadInSpire();
        game.global.fighting = false;
        game.resources.trimps.soldiers = 0;
		if (game.global.challengeActive == "Nom") {
			cell.nomStacks = (cell.nomStacks) ? cell.nomStacks + 1 : 1;
			if (cell.nomStacks > 100) cell.nomStacks = 100;
			updateNomStacks(cell.nomStacks);
			if (cell.health > 0) cell.health += (cell.maxHealth * 0.05);
			else cell.health = 0;
			if (cell.health > cell.maxHealth) cell.health = cell.maxHealth;
			updateBadBar(cell);
		}
        return;
    }
    if (cell.health <= 0 || !isFinite(cell.health)) {
		game.stats.battlesWon.value++;
		if (!game.global.mapsActive) game.global.voidSeed++;
		if (game.global.formation == 4 && !game.global.mapsActive && !game.global.waitToScry) tryScry();
		if (game.global.challengeActive == "Nom" && cell.nomStacks == 100) giveSingleAchieve(15);
		if (game.global.usingShriek) disableShriek();
		randomText = game.badGuyDeathTexts[Math.floor(Math.random() * game.badGuyDeathTexts.length)];
		var firstChar = cell.name.charAt(0);
		var aAn = (firstChar == "A" || firstChar == "E" || firstChar == "I" || firstChar == "O" || firstChar == "U") ? " an " : " a ";
		var killedText = "You " + randomText + aAn + cell.name;
		if (game.global.challengeActive == "Coordinate") killedText += " group";
		killedText += "!";
        if (!game.global.spireActive || cellNum != 99 || game.global.mapsActive) message(killedText, "Combat", null, null, 'enemy');
		try{
			if (typeof kongregate !== 'undefined' && !game.global.mapsActive) kongregate.stats.submit("HighestLevel", ((game.global.world * 100) + cell.level));
		}
		catch(err){
			console.debug(err);
		}
		if (game.global.challengeActive == "Balance" && game.global.world >= 6){
			if (game.global.mapsActive) game.challenges.Balance.removeStack();
			else game.challenges.Balance.addStack();
			updateBalanceStacks();
		}
		if (game.global.challengeActive == "Daily"){
			if (typeof game.global.dailyChallenge.karma !== 'undefined'){
				game.global.dailyChallenge.karma.stacks++;
				var maxStack = dailyModifiers.karma.getMaxStacks(game.global.dailyChallenge.karma.strength);
				if (game.global.dailyChallenge.karma.stacks >= maxStack) game.global.dailyChallenge.karma.stacks = maxStack;
				updateDailyStacks('karma');
			}
			if (typeof game.global.dailyChallenge.toxic !== 'undefined'){
				game.global.dailyChallenge.toxic.stacks++;
				var maxStack = dailyModifiers.toxic.getMaxStacks(game.global.dailyChallenge.toxic.strength);
				if (game.global.dailyChallenge.toxic.stacks >= maxStack) game.global.dailyChallenge.toxic.stacks = maxStack;
				updateDailyStacks('toxic');
			}			
			if (typeof game.global.dailyChallenge.rampage !== 'undefined'){
				game.global.dailyChallenge.rampage.stacks++;
				var maxStack = dailyModifiers.rampage.getMaxStacks(game.global.dailyChallenge.rampage.strength);
				if (game.global.dailyChallenge.rampage.stacks >= maxStack) game.global.dailyChallenge.rampage.stacks = maxStack;
				updateDailyStacks('rampage');
			}
			if (typeof game.global.dailyChallenge.bloodthirst !== 'undefined'){
				game.global.dailyChallenge.bloodthirst.stacks = 0;
				updateDailyStacks('bloodthirst');
			}
		}
		if (cell.overkilled && game.options.menu.overkillColor.enabled){
			if (game.options.menu.overkillColor.enabled == 2){
				var prevCellElem = document.getElementById(((game.global.mapsActive) ? "mapCell" : "cell") + (cellNum - 1));
				if (prevCellElem) swapClass("cellColor", "cellColorOverkill", prevCellElem);
			}
			swapClass("cellColor", "cellColorOverkill", cellElem);
		}
		else	swapClass("cellColor", "cellColorBeaten", cellElem);
        if (game.global.mapsActive) game.global.lastClearedMapCell = cellNum;
        else {
			game.global.lastClearedCell = cellNum;
		}
        game.global.fighting = false;
        document.getElementById("badGuyCol").style.visibility = "hidden";
		document.getElementById('corruptionBuff').innerHTML = "";
        var unlock;
        if (game.global.mapsActive) unlock = game.mapUnlocks[cell.special];
        else {
			checkVoidMap();
			unlock = game.worldUnlocks[cell.special];
		}
        var noMessage = false;
        if (typeof unlock !== 'undefined' && typeof unlock.fire !== 'undefined') {
            unlock.fire(cell.level);
            if (game.global.mapsActive) {
                if (typeof game.mapUnlocks[cell.special].last !== 'undefined') {
					game.mapUnlocks[cell.special].last += 5;
					if (typeof game.upgrades[cell.special].prestige && game.global.sLevel >= 4 && game.global.challengeActive != "Mapology"){
						unlock.fire(cell.level);
						game.mapUnlocks[cell.special].last += 5;
						message(unlock.message.replace("a book", "two books"), "Unlocks", null, null, 'repeated', cell.text);
						noMessage = true;
					}
				}
                if (typeof game.mapUnlocks[cell.special].canRunOnce !== 'undefined') game.mapUnlocks[cell.special].canRunOnce = false;
				if (unlock.filterUpgrade) refreshMaps();
            }
			
        } else if (cell.special !== "") {
            unlockEquipment(cell.special);
        }
		if (cell.mutation && typeof mutations[cell.mutation].reward !== 'undefined') mutations[cell.mutation].reward(cell.corrupted);
		var doNextVoid = false;
		if (typeof unlock !== 'undefined' && typeof unlock.message !== 'undefined' && !noMessage) message(unlock.message, "Unlocks", null, null, ((unlock.world > 0) ? 'unique' : 'repeated'), cell.text);
		if (typeof game.badGuys[cell.name].loot !== 'undefined') game.badGuys[cell.name].loot(cell.level);
		if (!game.global.mapsActive && game.global.spireActive && game.global.world == 200) {
			giveSpireReward(cell.level);
		}
        if (game.global.mapsActive && cellNum == (game.global.mapGridArray.length - 1)) {
			game.stats.mapsCleared.value++;
			checkAchieve("totalMaps");
			var shouldRepeat = (game.global.repeatMap);
			if ((currentMapObj.level >= (game.global.world - game.portal.Siphonology.level)) && game.global.mapBonus < 10) game.global.mapBonus += 1;
			if (game.options.menu.repeatUntil.enabled == 1 && game.global.mapBonus == 10) shouldRepeat = false;
			if (game.options.menu.repeatUntil.enabled == 2 && addSpecials(true, true, getCurrentMapObject()) == 0) shouldRepeat = false;
			var skip = false;
			if (isVoid) {
				currentMapObj.noRecycle = false;
				recycleMap(-1, true, true);
				if (game.options.menu.repeatVoids.enabled == 1){
					//repeat void maps
					if (game.global.totalVoidMaps > 0) doNextVoid = getNextVoidId();
				}
				skip = true;
			}
			if (shouldRepeat && !game.global.switchToMaps && (game.global.challengeActive != "Mapology" || game.challenges.Mapology.credits >= 1) && !skip){
				if (game.global.mapBonus > 0) document.getElementById("mapsBtn").innerHTML = "Maps (" + game.global.mapBonus + ")";
				game.global.lastClearedMapCell = -1;
				buildMapGrid(game.global.currentMapId);
				drawGrid(true);
				if (game.global.challengeActive == "Mapology") {
					game.challenges.Mapology.credits--;
					if (game.challenges.Mapology.credits <= 0) game.challenges.Mapology.credits = 0;
					updateMapCredits();
					messageMapCredits();
				}
				fightManual();
				return;
			}
			else{
				if (game.global.switchToMaps){
					game.global.soldierHealth = 0;
					game.resources.trimps.soldiers = 0;
					updateGoodBar();
				}
				game.global.preMapsActive = (game.options.menu.exitTo.enabled) ? false : true;
				game.global.mapsActive = false;
				game.global.lastClearedMapCell = -1;
				game.global.currentMapId = "";
				game.global.mapGridArray = [];
				game.global.fighting = false;
				game.global.switchToMaps = false;
				mapsSwitch(true);
				if (doNextVoid !== false){
					game.global.lookingAtMap = doNextVoid;
					runMap();
				}
				else if (isVoid && game.global.preMapsActive && game.global.totalVoidMaps > 0) {
					toggleVoidMaps();
				}
				return;
			}
		}
        if (cellNum == 99) {
			nextWorld();
			game.stats.zonesCleared.value++;
			checkAchieve("totalZones");
		}
        if (game.global.soldierHealth > 0) 
			battle(true);
        return;
    }
	var cellAttack = calculateDamage(cell.attack, false, false, false, cell);
	var badCrit = false;
	if (game.global.challengeActive == "Crushed"){
		if (checkCrushedCrit()) {
			cellAttack *= 5;
			badCrit = true;
			if (game.global.world > 5) game.challenges.Crushed.critsTaken++;
		}
	}
	if (game.global.voidBuff == "getCrit" || cell.corrupted == 'corruptCrit'){
		if (Math.floor(Math.random() * 4) == 0){
			cellAttack *= 5;
			badCrit = true;
		}
	}
	if (game.global.challengeActive == "Daily"){
		if (typeof game.global.dailyChallenge.crits !== 'undefined'){
			if (Math.floor(Math.random() * 4) == 0){
				cellAttack *= dailyModifiers.crits.getMult(game.global.dailyChallenge.crits.strength);
				badCrit = true;
			}
		}
	}
    var attackAndBlock = (cellAttack - game.global.soldierCurrentBlock);
	var pierce = 0;
	if (game.global.brokenPlanet && !game.global.mapsActive){
		pierce = getPierceAmt();
		var atkPierce = pierce * cellAttack;
		if (attackAndBlock < atkPierce) attackAndBlock = atkPierce;
	}
	if (attackAndBlock < 0) attackAndBlock = 0;
	var trimpAttack = calculateDamage(game.global.soldierCurrentAttack, false, true);
	updateTitimp();
	var gotCrit = false;
	var critSpan = document.getElementById("critSpan");
	critSpan.innerHTML = "";
	if (game.portal.Relentlessness.level > 0 || (game.heirlooms.Shield.critDamage.currentBonus > 0 && game.heirlooms.Shield.critChance.currentBonus > 0)){
		if (Math.random() < getPlayerCritChance()){
			trimpAttack *= getPlayerCritDamageMult();
			gotCrit = true;
		}
	}
	var attacked = false;
	var wasAttacked = false;
	var badDodge = false;
	if (cell.corrupted == "corruptDodge"){
		if (Math.random() < 0.3) badDodge = true;
	}
	if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.slippery !== 'undefined'){
		var slipStr = game.global.dailyChallenge.slippery.strength;
		if ((slipStr > 15 && game.global.world % 2 == 0) || (slipStr <= 15 && game.global.world % 2 == 1)){
			if (Math.random() < dailyModifiers.slippery.getMult(slipStr)) badDodge = true;
		}
	}
	var overkill = 0;
	var impOverkill = 0;
	var thisKillsTheTrimp = function() {
		impOverkill -= game.global.soldierHealth;
		game.global.soldierHealth = 0;
		gotCrit = false;
	};
    if (trimpAttack > 0 && (game.global.challengeActive == "Slow" || ((((game.badGuys[cell.name].fast || cell.mutation == "Corruption") && game.global.challengeActive != "Nom") || game.global.voidBuff == "doubleAttack") && game.global.challengeActive != "Coordinate"))) {
        game.global.soldierHealth -= attackAndBlock;
		wasAttacked = true;
        if (game.global.soldierHealth > 0) {
			if (!badDodge){
				if (trimpAttack >= cell.health) {
					overkill = trimpAttack - cell.health;
					if (cell.name == "Improbability" && cell.health == cell.maxHealth) giveSingleAchieve(12);
				}
				cell.health -= trimpAttack;
				attacked = true;
				if ((game.global.voidBuff == "doubleAttack" || cell.corrupted == 'corruptDbl') && cell.health > 0){
					game.global.soldierHealth -= attackAndBlock;
					if (game.global.soldierHealth < 0) thisKillsTheTrimp();
				}
			}
		}
        else thisKillsTheTrimp();
        if (cell.health <= 0) {cell.health = 0; 
		//fight(makeUp); return;
		}
    }
	else {
		if (game.global.soldierHealth > 0){
			if (!badDodge){
				if (trimpAttack >= cell.health){
					overkill = trimpAttack - cell.health;
					if (cell.name == "Improbability" && cell.health == cell.maxHealth) giveSingleAchieve(12);
				}
				cell.health -= trimpAttack;
				attacked = true;
			}
			if (cell.health > 0) {
				game.global.soldierHealth -= attackAndBlock;
				wasAttacked = true;
			}
			else
				{
					cell.health = 0;
					//fight(makeUp); return;
				}
			if (game.global.soldierHealth < 0) thisKillsTheTrimp();
		}
    }
	if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.mirrored !== 'undefined' && attacked && game.global.soldierHealth > 0){
		game.global.soldierHealth -= dailyModifiers.mirrored.reflectDamage(game.global.dailyChallenge.mirrored.strength, trimpAttack);
		if (game.global.soldierHealth <= 0)
			thisKillsTheTrimp();
	}
	if ((game.global.challengeActive == "Electricity" || game.global.challengeActive == "Mapocalypse") && attacked){
		game.global.soldierHealth -= game.global.soldierHealthMax * (game.global.radioStacks * 0.1);
		if (game.global.soldierHealth < 0) thisKillsTheTrimp();
	}
	if ((game.global.challengeActive == "Electricity" || game.global.challengeActive == "Mapocalypse") && wasAttacked){
		game.global.radioStacks++;
		updateRadioStacks();
	}
	if (game.global.challengeActive == "Daily"){
		if (typeof game.global.dailyChallenge.plague !== 'undefined'){
			if (attacked){
				game.global.soldierHealth -= game.global.soldierHealthMax * dailyModifiers.plague.getMult(game.global.dailyChallenge.plague.strength, game.global.dailyChallenge.plague.stacks);
				if (game.global.soldierHealth < 0) thisKillsTheTrimp();
			}
			if (wasAttacked) {
				game.global.dailyChallenge.plague.stacks++;
				updateDailyStacks('plague');
			}		
		}
		if (typeof game.global.dailyChallenge.bogged !== 'undefined'){
			if (attacked){
				game.global.soldierHealth -= game.global.soldierHealthMax * dailyModifiers.bogged.getMult(game.global.dailyChallenge.bogged.strength);
				if (game.global.soldierHealth < 0) thisKillsTheTrimp();
			}
		}
		if (typeof game.global.dailyChallenge.weakness !== 'undefined'){
			if (wasAttacked) {
				game.global.dailyChallenge.weakness.stacks++;
				if (game.global.dailyChallenge.weakness.stacks >= 9) game.global.dailyChallenge.weakness.stacks = 9;
				updateDailyStacks('weakness');
			}
		}
	}
	if (game.global.challengeActive == "Toxicity" && attacked) {
		var tox = game.challenges.Toxicity;
		tox.stacks++;
		if (tox.stacks > tox.maxStacks) tox.stacks = tox.maxStacks;
		if (tox.stacks > tox.highestStacks) tox.highestStacks = tox.stacks;
		updateToxicityStacks();
	}
	if ((game.global.challengeActive == "Nom" || game.global.challengeActive == "Toxicity") && attacked){
		game.global.soldierHealth -= game.global.soldierHealthMax * 0.05;
		if (game.global.soldierHealth < 0) thisKillsTheTrimp();
	}
	else if (game.global.challengeActive == "Lead" && attacked && cell.health > 0){
		game.global.soldierHealth -= (game.global.soldierHealthMax * game.challenges.Lead.stacks * 0.0003);
		if (game.global.soldierHealth < 0) thisKillsTheTrimp();
	}
	if ((game.global.voidBuff == "bleed" || cell.corrupted == 'corruptBleed') && wasAttacked) {
		game.global.soldierHealth -= (game.global.soldierHealth * 0.2);
		if (game.global.soldierHealth < 1) thisKillsTheTrimp();
	}
	if (gotCrit) critSpan.innerHTML = "Crit!";
	var badCritText;
	if (badDodge) badCritText = "Dodge!";
	else if (badCrit && wasAttacked) badCritText = "Crit!";
	else badCritText = "";
	document.getElementById("badCrit").innerHTML =  badCritText;
    if (cell.health <= 0) game.global.battleCounter = 800;
    if (overkill) {
		var nextCell = (game.global.mapsActive) ? game.global.mapGridArray[cellNum + 1] : game.global.gridArray[cellNum + 1];
		if (nextCell) nextCell.health = overkill;	
	}
	if (game.global.challengeActive == "Devastation" && impOverkill){
		game.challenges.Devastation.lastOverkill = impOverkill;
	}
	if (cell.health <= 0 && typeof game.global.dailyChallenge.explosive !== 'undefined'){
		if (game.global.dailyChallenge.explosive.strength <= 15 || game.global.soldierHealthMax > game.global.soldierCurrentBlock){
			var explodeDamage = cellAttack * dailyModifiers.explosive.getMult(game.global.dailyChallenge.explosive.strength);
			var explodeAndBlock = explodeDamage - game.global.soldierCurrentBlock;
			if (explodeAndBlock < 0) explodeAndBlock = 0;
			if (pierce > 0){
				var explodePierce = pierce * explodeDamage;
				if (explodeAndBlock < explodePierce) explodeAndBlock = explodePierce;
			}
			game.global.soldierHealth -= explodeAndBlock;
			if (game.global.soldierHealth <= 0) thisKillsTheTrimp();
		}
	}
    if (makeUp) return;
    updateGoodBar();
	updateBadBar(cell);
}

function getNextVoidId(){
	for (var x = 0; x < game.global.mapsOwnedArray.length; x++){
		 if (game.global.mapsOwnedArray[x].location == "Void") return game.global.mapsOwnedArray[x].id;
	}
	return false;
}

function getPlayerCritChance(){ //returns decimal: 1 = 100%
	return (game.portal.Relentlessness.modifier * game.portal.Relentlessness.level) + (game.heirlooms.Shield.critChance.currentBonus / 100);
}

function getPlayerCritDamageMult(){
	var critMult = (((game.portal.Relentlessness.otherModifier * game.portal.Relentlessness.level) + (game.heirlooms.Shield.critDamage.currentBonus / 100)) + 1);
	if (game.portal.Relentlessness.level > 0) critMult += 1;
	return critMult;
}

function manageLeadStacks(remove){
	var challenge = game.challenges.Lead;
	
	var elem = document.getElementById("leadBuff");

	var determinedBuff = document.getElementById("determinedBuff");
	if ((game.global.world % 2) == 1){	
		if (determinedBuff == null) {
			document.getElementById("goodGuyName").innerHTML += '&nbsp<span class="badge antiBadge" id="determinedBuff" onmouseover="tooltip(\'Determined\', \'customText\', event, \'Your Trimps are determined to succeed. They gain 50% attack and earn double resources from all sources.\')" onmouseout="tooltip(\'hide\')"><span class="icomoon icon-sun2"></span></span>';
			determinedBuff = document.getElementById("determinedBuff");
		}
		determinedBuff.style.display = "inline";
	}
	else if (determinedBuff != null) determinedBuff.style.display = "none";
	
	if (challenge.stacks <= 0){
		return;
	}
	if (remove && challenge.stacks) challenge.stacks--;
	
	if (elem === null) {
		document.getElementById("badGuyName").innerHTML += '&nbsp;<span class="badge badBadge" id="leadBuff" onmouseover="tooltip(\'Momentum\', null, event)" onmouseout="tooltip(\'hide\')"><span id="leadStacks">' + challenge.stacks + '</span><span id="momentumIcon" class="icomoon icon-hourglass"></span></span>';
	}
	else	document.getElementById("leadStacks").innerHTML = challenge.stacks;
	swapClass('icon-hourglass', 'icon-hourglass-' + (3 - Math.floor(challenge.stacks / 67)), document.getElementById('momentumIcon'));
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

function updateBalanceStacks(){
	var elem = document.getElementById('balanceSpan');
	if (elem === null) {
		document.getElementById("goodGuyName").innerHTML += "<span id='balanceSpan'></span>";
		elem = document.getElementById("balanceSpan");
	}
	var stacks = game.challenges.Balance.balanceStacks;
	if (stacks > 0) {
		elem.style.display = "inline-block";
		elem.innerHTML = ' <span class="badge antiBadge" onmouseover="tooltip(\'Unbalance\', \'customText\', event, \'Your Trimps have ' + game.challenges.Balance.getHealthMult(true) + ' less health, but all Trimps can gather ' + game.challenges.Balance.getGatherMult(true) + ' faster. You will gain one stack from killing Bad Guys in the world, and lose one stack for killing Bad Guys in maps.\');" onmouseout="tooltip(\'hide\')"><span id="balanceStack">' + stacks + '</span><span class="icomoon icon-balance-scale"></span></span>';
	}
	else elem.style.display = "none";
}

function buyEquipment(what, confirmed, noTip) {
	if (game.options.menu.pauseGame.enabled) return;
	if (!confirmed && game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) return;
	var toBuy = game.equipment[what];
	var purchaseAmt = 1;
	if (!toBuy.percent) purchaseAmt = (game.global.buyAmt == "Max") ? calculateMaxAfford(toBuy, false, true) : game.global.buyAmt;
	if (typeof toBuy === 'undefined') return;
	var canAfford = canAffordBuilding(what, null, null, true);
	if (canAfford) {
		canAffordBuilding(what, true, null, true);
		levelEquipment(what, purchaseAmt);
	}
	if (!noTip) tooltip(what, "equipment", "update");	
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
	tooltip("The Improbability", null, 'update');
	if (!game.global.autoUpgradesAvailable){
		game.global.autoUpgradesAvailable = true;
		document.getElementById("autoUpgradeBtn").style.display = "block";
	}
	game.global.prestige.cost = 53;
	document.getElementById("upgradesHere").innerHTML = "";
	for (var item in game.equipment){
		prestigeEquipment(item, true, true);
	}
	unlockUpgrade("Formations");
	buffVoidMaps();
}

function restoreGrid(){
	document.getElementById("extraGridInfo").style.display = "none";
	document.getElementById("grid").style.display = "block";
}

function setFormation(what) {
	if (what) {
		what = parseInt(what, 10);
		swapClass("formationState", "formationStateDisabled", document.getElementById("formation" + game.global.formation));
		if (what == 4 && game.global.formation != 4) game.global.waitToScry = true;
		if (game.global.soldierHealth > 0) {
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
				case 4:
					health *= 2;
					attack *= 2;
					block *= 2;
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
				case 4:
					health /= 2;
					attack /= 2;
					block /= 2;
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
	else swapClass("formationState", "formationStateDisabled", document.getElementById("formation0"));
	var toSet = (what) ? what : game.global.formation;
	swapClass("formationState", "formationStateEnabled", document.getElementById("formation" + toSet));
}

function unlockFormation(what){
	if (what != "start" && !game.upgrades.Formations.done) return;
	if (what == "start" || (what == "all" && game.upgrades.Formations.done == 1)){
		document.getElementById("formation0").style.display = "block";
		document.getElementById("formation1").style.display = "block";
	}
	if (what == 2 || (game.upgrades.Dominance.done == 1)){
		document.getElementById("formation2").style.display = "block";
	}
	if (what == 3 || (game.upgrades.Barrier.done == 1)){
		document.getElementById("formation3").style.display = "block";
	}
	if ((game.global.world >= 60 && game.global.highestLevelCleared >= 180) && (what == "start" || what == "all" || what == 4)){
		document.getElementById("formation4").style.display = "block";
	}
}

function hideFormations() {
	for (var x = 0; x < 5; x++){
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
	if (game.global.totalPortals == 0) {
		document.getElementById("buyHeliumArea").style.display = "none";
		document.getElementById("buyHeirloomArea").style.display = "none";
	}
	else {
		if (game.global.totalPortals >= 5) {
			document.getElementById("buyHeirloomArea").style.display = "block";
			setHeirRareText(true);
		}
		else document.getElementById("buyHeirloomArea").style.display = "none";
	}
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
	swapClass('boneBtnState', 'boneBtnState' + ((enabled) ? 'On' : 'Off'), elem);
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
			row.className = 'importOwned';
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
		var jobName;
		switch (what) {
			case "food": 
				jobName = "Farmer";
				break;
			case "wood":
				jobName = "Lumberjack";
				break;
			case "metal":
				jobName = "Miner";
				break;
			case "gems":
				jobName = "Dragimp";
				break;
			case "fragments":
				jobName = "Explorer";
				break;
			case "science":
				jobName = "Scientist";
				break;
		}
		var job = game.jobs[jobName];
		var amt = job.owned * job.modifier * seconds;
		amt += (amt * game.portal.Motivation.level * game.portal.Motivation.modifier);
		if (game.portal.Motivation_II.level > 0) amt *= (1 + (game.portal.Motivation_II.level * game.portal.Motivation_II.modifier));
		if (game.portal.Meditation.level > 0) amt *= (1 + (game.portal.Meditation.getBonusPercent() * 0.01));
		if (game.jobs.Magmamancer.owned > 0 && what == "metal") amt *= game.jobs.Magmamancer.getBonusPercent();
		if (game.global.challengeActive == "Meditate") amt *= 1.25;
		else if (game.global.challengeActive == "Size") amt *= 1.5;
		if (game.global.challengeActive == "Toxicity"){
			var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
			amt *= (1 + toxMult);
		}
		if (game.global.challengeActive == "Watch") amt /= 2;
		if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)) amt *= 2;
		if (game.global.challengeActive == "Balance"){
			amt *= game.challenges.Balance.getGatherMult();
		}
		if (game.global.challengeActive == "Daily"){
			if (typeof game.global.dailyChallenge.famine !== 'undefined' && what != "fragments" && what != "science"){
				amt *= dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
			}
			if (typeof game.global.dailyChallenge.dedication !== 'undefined'){
				amt *= dailyModifiers.dedication.getMult(game.global.dailyChallenge.dedication.strength);
			}
		}
		if (game.global.challengeActive == "Decay"){
			amt *= 10;
			amt *= Math.pow(0.995, game.challenges.Decay.stacks);
		}
		amt = calcHeirloomBonus("Staff", jobName + "Speed", amt);
		if (game.global.playerGathering == what){		
			if (game.global.turkimpTimer > 0 && (what == "food" || what == "metal" || what == "wood")){
				amt *= (game.talents.turkimp3.purchased) ? 1.75 : 1.5;
			}
			amt += getPlayerModifier() * seconds;
		}
		return amt;
}

function scaleToCurrentMap(amt, ignoreBonuses) {
    var map = getCurrentMapObject();
	var world = map.level;
	var compare = game.global.world;
	if (game.talents.mapLoot.purchased)
		compare--;
		if (world < compare){
			//-20% loot compounding for each level below world
			amt *= Math.pow(0.8, (compare - world));
		}
		//Add map loot bonus
		amt = Math.round(amt * map.loot);
		if (ignoreBonuses) return amt;
		if (game.unlocks.impCount.Magnimp) amt *= Math.pow(1.003, game.unlocks.impCount.Magnimp);
		if (game.portal.Looting.level) amt += (amt * game.portal.Looting.level * game.portal.Looting.modifier);
		if (game.portal.Looting_II.level) amt *= (1 + (game.portal.Looting_II.level * game.portal.Looting_II.modifier));
		if (game.global.formation == 4 && !game.global.waitToScry) amt *= 2;
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
		if (game.portal.Motivation_II.level > 0) amt *= (1 + (game.portal.Motivation_II.level * game.portal.Motivation_II.modifier));
		if (game.portal.Meditation.level > 0) amt *= (1 + (game.portal.Meditation.getBonusPercent() * 0.01));
		if (game.jobs.Magmamancer.owned > 0 && job.increase == "metal") amt *= game.jobs.Magmamancer.getBonusPercent();
		if (game.global.challengeActive == "Meditate") amt *= 1.25;
		if (game.global.challengeActive == "Toxicity"){
			var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
			amt *= (1 + toxMult);
		}
		if (game.global.challengeActive == "Watch") amt /= 2;
		if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)) amt *= 2;
		amt = calcHeirloomBonus("Staff", compatible[x] + "Speed", amt);
		if (typeof storage[x] !== 'undefined'){
			var tempTotal = amt + resource.owned;
			var tempMax = resource.max;
			var structCount = 0;
			var storageBuilding = game.buildings[storage[x]];
			var packMod = game.portal.Packrat.level * game.portal.Packrat.modifier;
			while (tempTotal > calcHeirloomBonus("Shield", "storageSize", tempMax + (tempMax * packMod))){
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
	swapClass('boneBtnState', 'boneBtnStateOff', document.getElementById("boost" + other));
	swapClass('boneBtnState', 'boneBtnStateTeal', document.getElementById("boost" + num));
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
			if (game.unlocks.goldMaps) return;
			if (game.global.b < 20) {showPurchaseBones(); return;}
			game.global.b -= 20;
			buyGoldenMaps();
			break;
		case "trimps":
			if (game.unlocks.quickTrimps) return;
			if (game.global.b < 20) {showPurchaseBones(); return;}
			game.global.b -= 20;
			buyQuickTrimps();
			break;
		case "heirloom":
			if (game.global.b < 30) return;
			game.global.b -= 30;
			createHeirloom(game.global.highestLevelCleared + 1, true);
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
	document.getElementById("bonesOwned").innerHTML = prettify(game.global.b) + " " + ((game.global.b == 1) ? "Bone" : "Bones");
	updateSkeleBtn();
}

function boostHe(checkOnly) {
	var level = game.global.highestLevelCleared - 19;
	var amt = 30;
	if (!checkOnly) {
		if (!game.global.canRespecPerks) game.global.bonePortalThisRun = true;
		game.global.canRespecPerks = true;		
	}
	if (level <= 0) {
		if (checkOnly) return amt;
		game.global.heliumLeftover += amt;
		game.global.totalPortals++;
		checkAchieve("portals", null, false, true);
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
	checkAchieve("portals", null, false, true);
	checkAchieve("totalHelium");
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
	swapClass("psColor", "psColorOrange", document.getElementById("trimpsPs"));
}

function countUnpurchasedImports(){
	var count = 0;
	for (var item in game.unlocks.imps){
		if (!game.unlocks.imps[item]) count++;
	}
	return count;
}

function showPurchaseBones() {
	if (typeof kongregate === 'undefined') return;
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
		message(failures[failNumber], "Loot", "*magic-wand", "pumpkimp", "events");
		return;
	}
	var lootStrength = (game.global.mapsActive) ? 3 : 20;
	var minRoll = (game.global.mapsActive) ? 1 : 30;
	var seconds = Math.floor(Math.random() * lootStrength) + minRoll;
	var lootRoll = Math.floor(Math.random() * lootStrength) + minRoll;
	var amt = simpleSeconds(item, seconds);
	if (item != "science") amt += rewardResource(item, 0.5 * lootRoll, 50);
	if (game.global.mapsActive){
		amt = scaleToCurrentMap(amt, true);
	}
	addResCheckMax(item, amt);
	var messageNumber = Math.floor(Math.random() * success.length);
	message(success[messageNumber] + prettify(amt) + " " + item + "!", "Loot", "*magic-wand", "pumpkimp", "events");		
}

function activateTurkimpPowers() {
	//15 mins = 900K ms
	//25 mins = 1.5M ms
	var addEach = (game.talents.turkimp.purchased) ? 1200000 : 900000;
	var maxTurk = (game.talents.turkimp.purchased) ? 2100000 : 1500000;
	var timeToExpire = game.global.turkimpTimer;
	timeToExpire += addEach;
	if (timeToExpire > maxTurk) timeToExpire = maxTurk;
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
	message(possibilities[roll], "Loot", "*spoon-knife", "turkimp", "secondary");
	
}

function givePresimptLoot(){
	var elligible = ["food", "food", "wood", "wood", "metal",  "metal", "metal", "metal", "metal", "metal", "metal"];
	var boneTime = 30;
	boneTime *= 60000;
	if (new Date().getTime() > (game.global.lastBonePresimpt + boneTime))
		elligible.push("bones");
	var success = [
		"You hurriedly open up the Presimpt, and find ",
		"Ooh look, a Presimpt! You tear it open and receive ",
		"Nifty! That Presimpt was carrying around ",
		"Presimpts for everyone! Wait there's only one. Then Presimpt just for you! With ",
		"This Presimpt has little snowman markings all over it! Inside, you find "];			
	if (game.jobs.Dragimp.owned > 0) elligible.push("gems", "gems", "gems", "gems");
	else elligible.push("food", "food", "wood", "metal");
	if (game.jobs.Explorer.locked == 0) elligible.push("fragments", "fragments", "fragments");
	else elligible.push("food", "wood", "metal"); 
	var roll = Math.floor(Math.random() * elligible.length);
	var item = game.global.presimptStore;
	game.global.presimptStore = elligible[roll];
	if (item == "bones") {
		message("You shake the Presimpt before opening it, and can tell there's something special in this one. Yup! That thoughtful Presimpt gave you a perfectly preserved bone!", "Loot", "*gift", "presimpt presimptBones");
		game.global.lastBonePresimpt = new Date().getTime();
		game.global.b++;
		updateSkeleBtn();
		return;
	}
	var randomBoost = Math.floor(Math.random() * 4) + 2;
	var amt = rewardResource(item, randomBoost, (game.global.lastClearedCell + 1));
	var messageNumber = Math.floor(Math.random() * success.length);
	message(success[messageNumber] + prettify(amt) + " " + item + "!", "Loot", "*gift", "presimpt", "events");
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

function toggleVoidMaps(updateOnly){
	var elem = document.getElementById("voidMapsBtn");
	var mapsHere = document.getElementById("mapsHere");
	var voidMapsHere = document.getElementById("voidMapsHere");
	var mapsCreate = document.getElementById("mapsCreateRow");
	var advMaps = document.getElementById("advMapsRow");
	var heirRare = document.getElementById("heirRare"); //it rhymes
	if (!updateOnly) game.global.voidMapsToggled = !game.global.voidMapsToggled;
	else if (!game.global.preMapsActive) game.global.voidMapsToggled = false;
	if (!game.global.voidMapsToggled){
		voidMapsHere.style.display = "none";
		mapsHere.style.display = "block";
		mapsCreate.style.display = "block";
		advMaps.style.display = "block";
		heirRare.style.display = "none";
		elem.innerHTML = "Void Maps (" + game.global.totalVoidMaps + ")";
		elem.style.display = (game.global.totalVoidMaps <= 0 || !game.global.preMapsActive) ? "none" : "block";
		return;
	}
	elem.style.display = "block";
	voidMapsHere.style.display = "block";
	mapsHere.style.display = "none";
	mapsCreate.style.display = "none";
	heirRare.style.display = "block";
	setHeirRareText();
	advMaps.style.display = "none";
	elem.innerHTML = "Back";
}

function toggleAutoStructure(noChange, forceOff){
	var setting = game.global.autoStructureSetting;
	if (!noChange) setting.enabled = !setting.enabled;
	var btnElem = document.getElementById('autoStructureBtn');
	if (game.talents.autoStructure.purchased && !forceOff)
		btnElem.style.display = 'block';
	else{
		btnElem.style.display = 'none';
		return;
	}
	var color = (setting.enabled) ? "colorSuccess" : "colorDanger";
	swapClass("color", color, btnElem);
	var text = (setting.enabled) ? "AutoStructure On" : "AutoStructure Off";
	document.getElementById('autoStructureText').innerHTML = text;
}

var lastAutoGoldenToggle = -1;
function toggleAutoGolden(noChange){
	if (!noChange && game.global.autoGolden != -1){
		game.global.autoGolden++;
		if (game.global.autoGolden == 4)
			game.global.autoGolden = 0;
		lastAutoGoldenToggle = new Date().getTime();
	}
	var setting = game.global.autoGolden;
	var btnElem = document.getElementById('autoGoldenBtn');
	if (setting != -1)
		btnElem.style.display = 'block';
	else{
		btnElem.style.display = 'none';
		return;
	}
	var color = "settingBtn" + setting;
	swapClass("settingBtn", color, btnElem);
	var texts = ["AutoGolden Off", "AutoGolden Helium", "AutoGolden Battle", "AutoGolden Void"];
	var text = texts[setting];
	if (!noChange && setting != 0) text += ' <span id="autoGoldenTimeLeft">(4)</span>';
	document.getElementById('autoGoldenText').innerHTML = text;
}

function saveAutoStructureConfig(){
	var setting = game.global.autoStructureSetting;
	var checkboxes = document.getElementsByClassName('structConfigCheckbox');
	var quantboxes = document.getElementsByClassName('structConfigQuantity');
	for(var x = 0; x < checkboxes.length; x++){
		var name = checkboxes[x].id.split('structConfig')[1];
		if (!checkboxes[x].checked && !setting[name]) continue;
		if (!setting[name]) setting[name] = {};
		setting[name].enabled = checkboxes[x].checked;
		setting[name].value = document.getElementById('structSelect' + name).value;
		var max = parseInt(quantboxes[x].value);
		if (max > 10000) max = 10000;
		max = (isNumberBad(max)) ? 0 : max;
		setting[name].buyMax = max;
	}
	cancelTooltip();
}

function buyAutoStructures(){
	setTimeout(buyAutoStructures, 350);
	if (game.options.menu.pauseGame.enabled)
		return;
	var setting = game.global.autoStructureSetting;
	if (!setting.enabled || !game.talents.autoStructure.purchased) return;
	for (var item in setting){
		if (item == "enabled" || item == "unlocked") continue;
		var building = game.buildings[item];
		if (typeof setting[item].buyMax !== 'undefined' && setting[item].buyMax > 0 && building.purchased >= setting[item].buyMax)
			continue;
		if (!game.buildings[item].locked && setting[item].enabled){
			if (game.global.buildingsQueue.length < 10){
				if ((!setting[item].buyMax || building.purchased < (setting[item].buyMax - 1)) && canAffordBuilding(item, false, false, false, false, 2, setting[item].value)){
					buyBuilding(item, true, true, 2);
				}
				else if (canAffordBuilding(item, false, false, false, false, 1, setting[item].value))
					buyBuilding(item, true, true, 1);
			}
		}
	}
}


function toggleAutoTrap(updateOnly) {
	var elem = document.getElementById("autoTrapBtn");
	if (!game.global.trapBuildAllowed){
		elem.style.display = "none";
		elem.innerHTML = "AutoTraps Off";
		swapClass("color", "colorDanger", elem);
		return;
	}
	else if (elem.style.display == "none") fadeIn("autoTrapBtn", 10);
	if (!updateOnly) game.global.trapBuildToggled = !game.global.trapBuildToggled;
	if (game.global.trapBuildToggled){
		swapClass("color", "colorSuccess", elem);
		elem.innerHTML = "AutoTraps On";
		return;
	}
	swapClass("color", "colorDanger", elem);
	elem.innerHTML = "AutoTraps Off";
}

function toggleAutoStorage(noChange){
	if (!noChange) game.global.autoStorage = !game.global.autoStorage;
	var elem = document.getElementById("autoStorageBtn");
	if (game.global.autoStorage) {
		swapClass("color", "colorSuccess", elem);
		elem.innerHTML = "AutoStorage On";
	}
	else {
		swapClass("color", "colorDanger", elem);
		elem.innerHTML = "AutoStorage Off";
	}
}


function autoStorage(){
	var toCheck = ["food", "wood", "metal"];
	var storage = ["Barn", "Shed", "Forge"];
	for (var x = 0; x < 3; x++){
		var resource = game.resources[toCheck[x]];
		var max = Math.floor(resource.max + (resource.max * game.portal.Packrat.modifier * game.portal.Packrat.level));
		max = calcHeirloomBonus("Shield", "storageSize", max);
		if (resource.owned >= (max * 0.99) && canAffordBuilding(storage[x], false)) {
			buyBuilding(storage[x], false, true);
			break;
		}
	}
}

function toggleAutoUpgrades(noChange){
	if (!game.global.autoUpgradesAvailable) {
		game.global.autoUpgrades = false;
		noChange = true;
	}
	var elem = document.getElementById("autoUpgradeBtn");
	if (!noChange) game.global.autoUpgrades = !game.global.autoUpgrades;
	if (game.global.autoUpgrades){
		swapClass("color", "colorSuccess", elem);
		elem.innerHTML = "AutoUpgrade On";

	}
	else {
		swapClass("color", "colorDanger", elem);
		elem.innerHTML = "AutoUpgrade Off";
	}
	if (game.global.autoUpgrades && game.global.sLevel >= 4){
		document.getElementById("autoPrestigeBtn").style.display = "block";
	}
	else {
		game.global.autoPrestiges = 0;		
		document.getElementById("autoPrestigeBtn").style.display = "none";
	}
	toggleAutoPrestiges(true);
}

var lastAutoPrestigeToggle = -1;
var pantsMode = false;
function toggleAutoPrestiges(noChange){
	var autoPrestigeToggles = ["AutoPrestige Off", "AutoPrestige All", "Weapons Only", "Weapons First"];
	if (pantsMode) autoPrestigeToggles.push("PANTS ONLY");
	if (!noChange) {
		game.global.autoPrestiges++;	
		lastAutoPrestigeToggle = new Date().getTime();
	}
	if (game.global.autoPrestiges >= autoPrestigeToggles.length) game.global.autoPrestiges = 0;
	var elem = document.getElementById("autoPrestigeBtn");
	swapClass("settingBtn", "settingBtn" + game.global.autoPrestiges, elem);
	elem.innerHTML = autoPrestigeToggles[game.global.autoPrestiges];
}

function autoUpgrades() {
	autoGoldenUpgrades();
	if (!game.global.autoUpgrades) return;
	if (game.options.menu.pauseGame.enabled == 1) return;
	var timerCheck = (lastAutoPrestigeToggle == -1 || (new Date().getTime() - lastAutoPrestigeToggle >= 2000));
	if (timerCheck) lastAutoPrestigeToggle = -1;
	var equipmentAvailable = {armor: [], weapons: []}
	var boughtUpgrade = false;
	for (var item in game.upgrades){
		var upgradeObj = game.upgrades[item];
		if (upgradeObj.locked || item == "Shieldblock" || item == "Gigastation") continue;
		if (upgradeObj.prestiges){
			if (game.global.autoPrestiges == 0) continue;
			if (game.equipment[upgradeObj.prestiges].locked == 1) continue;
			var type = (typeof game.equipment[upgradeObj.prestiges].health === 'undefined') ? "weapons" : "armor";
			equipmentAvailable[type].push(item);
			continue;
		}
		if (!boughtUpgrade && autoBuyUpgrade(item)){
			if (game.global.autoPrestiges != 0 && timerCheck)
				boughtUpgrade = true;
			else
				return;
		}
	}
	if (game.global.autoPrestiges != 0 && timerCheck) autoPrestiges(equipmentAvailable);
}

function autoGoldenUpgrades(){
	if (game.global.autoGolden <= 0)
		return;
	if (lastAutoGoldenToggle != -1){
		var timeRemaining = Math.floor((new Date().getTime() - lastAutoGoldenToggle) / 1000);
		var timeLeftElem = document.getElementById('autoGoldenTimeLeft');
		if (timeRemaining <= 3){
			timeRemaining = 4 - timeRemaining;
			if (timeLeftElem === null)
				document.getElementById('autoGoldenText').innerHTML += ' <span id="autoGoldenTimeLeft">(' + timeRemaining + ')</span>';
			else timeLeftElem.innerHTML = '(' + timeRemaining + ')';
			return;
		}
		else{
			lastAutoGoldenToggle = -1;
			if (timeLeftElem !== null)
				timeLeftElem.innerHTML = "";
		}
			
	}
	if (!goldenUpgradesShown || getAvailableGoldenUpgrades() <= 0)
		return;
	var selections = ["", "Helium", "Battle", "Void"];
	var selected = selections[game.global.autoGolden];
	if ((selected == "Void" && (parseFloat((game.goldenUpgrades.Void.currentBonus + game.goldenUpgrades.Void.nextAmt()).toFixed(2)) > 0.60)) ||
			(selected == "Helium" && game.global.runningChallengeSquared)
		)
		return;
	buyGoldenUpgrade(selected);
}

function autoPrestiges(equipmentAvailable) {
	var cheapestWeapon = getCheapestPrestigeUpgrade(equipmentAvailable.weapons);
	if (game.global.autoPrestiges == 2) { //Weapons Only
		if (cheapestWeapon[0])	autoBuyUpgrade(cheapestWeapon[0]);
		return;
	}
	if (game.global.autoPrestiges == 4){ // Pants only
		if (equipmentAvailable.armor.indexOf("Pantastic") != -1) autoBuyUpgrade("Pantastic");
		return;
	}
	var cheapestArmor = getCheapestPrestigeUpgrade(equipmentAvailable.armor);
	if (!cheapestWeapon[0]) {
		if (cheapestArmor[0])
		autoBuyUpgrade(cheapestArmor[0]);
		return;
	}
	else if (!cheapestArmor[0]){
		autoBuyUpgrade(cheapestWeapon[0]);
		return;
	}
	var toBuy;
	if (game.global.autoPrestiges == 1) //All
		toBuy = (cheapestWeapon[1] < cheapestArmor[1]) ? cheapestWeapon[0] : cheapestArmor[0];
	else if (game.global.autoPrestiges == 3) //Weapons First
		toBuy = (cheapestWeapon[1] < (cheapestArmor[1] * 20)) ? cheapestWeapon[0] : cheapestArmor[0];
	if (!toBuy) return;
	var bought = autoBuyUpgrade(toBuy);
	if (toBuy == "Supershield" && !bought && (game.global.autoPrestiges == 1 || game.global.autoPrestiges == 3)) autoBuyUpgrade(cheapestWeapon[0]);
	else if (cheapestArmor[0] == "Supershield" && !bought && game.global.autoPrestiges == 1) autoBuyUpgrade(cheapestArmor[0]);
}

function getCheapestPrestigeUpgrade(upgradeArray) {
	var cheapest = [false, -1]; //0 is name, 1 is cost
	var shieldCheck = false;
	var shieldCost = -1;
	var artMult = (game.portal.Artisanistry.level) ? Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level) : -1;
	if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.metallicThumb !== 'undefined'){
		var mtMult = dailyModifiers.metallicThumb.getMult(game.global.dailyChallenge.metallicThumb.strength);
		artMult = (artMult == -1) ? mtMult : artMult * mtMult;
	}
	for (var x = 0; x < upgradeArray.length; x++) {
		var upgradeObj = game.upgrades[upgradeArray[x]];
		if (!upgradeObj || upgradeObj.locked) continue;
		var res = (typeof upgradeObj.cost.resources.metal !== 'undefined') ? 'metal' : 'wood';
		var thisCost = upgradeObj.cost.resources[res];
		if  (artMult != -1) thisCost *= artMult;
		if (res == "wood" && upgradeArray.length > 1 && game.resources.wood.owned < thisCost)	continue;
		else if (res == "wood") {
			shieldCheck = true;
			shieldCost = thisCost;
		}	
		if (cheapest[1] == -1 || thisCost < cheapest[1]) cheapest = [upgradeArray[x], thisCost];
	}
	if (cheapest[0] && cheapest[0] != 'Supershield' && shieldCheck && shieldCost != -1 && game.resources.metal.owned < cheapest[1]) cheapest = ['Supershield', shieldCost];
	return cheapest;
}

function autoBuyUpgrade(item){
	var purchase = buyUpgrade(item, false, true);
	if (!purchase) return false;
	if (game.upgrades[item].locked){
		game.upgrades[item].alert = false;
		if (countAlertsIn("upgrades") <= 0) document.getElementById("upgradesAlert").innerHTML = "";
	}
	return true;	
}

//PlayFab Stuff

var playFabId = -1;

function enablePlayFab(){
	var loggedIn = (playFabId != -1);
	if (!loggedIn){
		tooltip("PlayFab Login", null, "update");
		loggedIn = tryPlayFabAutoLogin();
	}
	if (playFabId == -1) {
		return false;
	}
	return true;
}

function tryPlayFabAutoLogin(){
	var type = game.global.playFabLoginType;
	//-1 = not set, 1 = Kongregate, 2 = PlayFab
	if (type == -1) return false;
	if (type == 1){
		playFabLoginWithKongregate();
		return true;
	}
	if (type == 2){
		var info = readPlayFabInfo();
		if (!info) return false;
		playFabLoginWithPlayFab(info[0], info[1], (type == 2));
		game.global.playFabLoginType = type;
		return true;
	}
	return false;
}


function getPlayFabLoginHTML(){
	var tipHtml = [];
	tipHtml[0] = "<div id='playFabLoginError'></div><div class='row playFabRow'>";
	if (typeof kongregate !== 'undefined'){
		var userId = (kongregate && kongregate.services && kongregate.services.getUserId) ? kongregate.services.getUserId() : 0;
		tipHtml[0] += "<div id='playFabKongregateContainer' class='col-xs-6'><b>Login With Kongregate</b><br/>"
		if (userId > 0){
			tipHtml[0] += "<div id='playFabKongLoggedIn'>Click the button below to link a PlayFab account to your Kongregate account and begin or resume backing up your save online!<br/><br/><div class='alignCenter'><span class='btn btn-sm btn-primary' onclick='playFabLoginWithKongregate()'>Connect Kongregate<br/>To PlayFab</span></div></div>";	
		}
		else 
			tipHtml[0] += "<div id='playFabKongNotLoggedIn'>You are playing from Kongregate, but not logged in.<span class='inactiveBtn''>Must Be Logged In</span></div>";
		tipHtml[0] += "</div>";
	}
	else {
	var info = false;
	if (game.global.rememberInfo) {
		info = readPlayFabInfo();
	}
		tipHtml[0] += "<div id='playFabLoginContainer' class='col-xs-6'><b id='playFabLoginTitle'>Login to PlayFab</b><br/><span id='playFabEmailHidden' style='display: none'>Your Email<br/><span id='emailNotice' style='font-size: 0.8em'>(For recovery, not required)<br/></span><input type='text' id='registerEmail' /></span><span id='usernameBox'>PlayFab Username<br/><input type='text' id='loginUserName' " + ((info) ? "value='" + info[0] + "'" : "") + "/></span><span id='playFabPasswordBox'><br/>Password <span style='font-size: 0.8em'>(6-30 Chars)</span><br/><input type='password' id='loginPassword'" + ((info) ? " value='" + info[1] + "'" : "") + "/></span><br/><div id='playFabConfirmPasswordHidden' style='display: none'>Confirm Password<br/><input type='password' id='confirmPassword' /><br/></div><span id='rememberInfoBox'>Remember Account Info<br/><input type='checkbox' id='rememberInfo' " + ((info) ? "checked='true'" : "") + "/><br/></span><div id='playFabLoginBtn' class='btn btn-sm btn-info' onclick='playFabLoginWithPlayFab()'>Login</div><div id='playFabRegisterBtn' class='btn btn-sm btn-info' style='display: none' onclick='playFabRegisterPlayFabUser()'>Register</div><span style='display: none' id='playFabRecoverBtns'><div class='btn btn-sm btn-info' onclick='playFabRecoverInfo(false)' style='display: none'>Get Username</div><div class='btn btn-sm btn-primary' onclick='playFabRecoverInfo(true)'>Send Password Reset Email</div></span><div id='playFabSwitchRegisterBtn' onclick='switchForm(true)' class='btn btn-sm btn-primary'>Register Playfab Account</div><div id='playFabSwitchRecoveryBtn' onclick='switchForm(false)' class='btn btn-sm btn-warning'>Recover Account Info</div></div>"
	}
	tipHtml[0] += "<div id='playFabLoginInfo' class='col-xs-6'><ul><li>While connected to PlayFab, every time you manually save and <b>once per 30 minutes when auto-saving</b>, your file will also be sent to PlayFab's servers.</li><li>Data will be cleared from PlayFab's servers after 3 months of inactivity, this is not a permanent save!</li></ul>"
	tipHtml[1] = "<div class='btn btn-sm btn-danger' onclick='cancelTooltip()'>Cancel</div>";
	return tipHtml;
}

function switchForm(register){ //true for register, false for recovery
	var title = document.getElementById("playFabLoginTitle");
	var emailInput = document.getElementById("playFabEmailHidden");
	var loginBtn = document.getElementById("playFabLoginBtn");
	var registerBtn = document.getElementById("playFabRegisterBtn");
	var recoverBtn = document.getElementById("playFabRecoverBtns");
	var switchBtn = document.getElementById("playFabSwitchRegisterBtn");
	var passBox = document.getElementById("playFabPasswordBox");
	var nameBox = document.getElementById("usernameBox");
	var rememberBox = document.getElementById("rememberInfoBox");
	var emailNotice = document.getElementById("emailNotice");
	var switchRecoveryBtn = document.getElementById("playFabSwitchRecoveryBtn");
	var confirmPasswordBtn = document.getElementById("playFabConfirmPasswordHidden");
	if (emailInput != null) emailInput.style.display = "block";
	if (loginBtn != null) loginBtn.style.display = "none";
	if (registerBtn != null && register) registerBtn.style.display = "inline-block";
	else if (recoverBtn != null && !register) recoverBtn.style.display = "inline-block";
	if (nameBox != null && !register) nameBox.style.display = "none";
	if (emailNotice != null && !register) emailNotice.style.display = "none";
	if (switchBtn != null) switchBtn.style.display = "none";
	if (passBox != null && !register) passBox.style.display = "none";
	if (rememberBox != null && !register) rememberBox.style.display = "none";
	if (switchRecoveryBtn != null) switchRecoveryBtn.style.display = "none";
	if (confirmPasswordBtn != null && register) confirmPasswordBtn.style.display = "block";
	if (title != null) title.innerHTML = (register) ? "Register a PlayFab Account" : "Recover PlayFab Account Info - <i>Must have provided Email during registration</i>";
}

function playFabRecoverInfo(needsPassword){
	var error = document.getElementById("playFabLoginError");
	var emailElem = document.getElementById("registerEmail");
	var requestData = {
			TitleId: "9186",
			Email: emailElem.value
		}
	if (needsPassword){
		try {
			PlayFab.ClientApi.SendAccountRecoveryEmail(requestData, playFabRecoverCallback);
		}
		catch (e) {
			if (error != null) error.innerHTML = e.errorMessage;
		}
		return;
	}
	try {
		PlayFab.ClientApi.GetAccountInfo(requestData, playFabRecoverCallback);
	}
	catch (e) {
		console.log(e);
		if (error != null) error.innerHTML = e.errorMessage;
	}
}

function playFabRecoverCallback(data, error){
	var errorElem = document.getElementById("playFabLoginError");
	console.log(data, error);
	if (errorElem == null) return;
	if (error) {
		errorElem.innerHTML = error.errorMessage;
		return;
	}
	if (data.Username) {
		errorElem.innerHTML = "<span style='color: green'>Username is " + data.Username + "</span>";
		return;
	}
	if (data.status == "OK") errorElem.innerHTML = "<span style='color: green'>Recovery Email Sent!</span>";
	
}

function switchFormToRecovery(){
	var title = document.getElementById("playFabLoginTitle");
	if (title != null) 
	var emailInput = document.getElementById("playFabEmailHidden");
	if (emailInput != null) emailInput.style.display = block;
	
}

function playFabRegisterPlayFabUser(){
	var error = document.getElementById("playFabLoginError");
	if (typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined'){
		error.innerHTML = "Unable to Initialize the PlayFab API. Please check to make sure third-party scripts are enabled for Trimps, and that PlayFab is not blocked.";
		return;
	}
	var saveLogin = false;
	var nameElem = document.getElementById("loginUserName");
	var passElem = document.getElementById("loginPassword");
	var emailElem = document.getElementById("registerEmail");
	var rememberElem = document.getElementById("rememberInfo");
	var confirmPasswordElem = document.getElementById("confirmPassword");
	if (rememberElem && rememberElem.checked == true) saveLogin = true;
	if (nameElem == null || passElem == null || emailElem == null || rememberElem == null || confirmPasswordElem == null){
		//Elements required to register are missing, rebuild login screen
		tooltip("PlayFab Login", null, "update");
		return;
	}
	if (confirmPasswordElem.value != passElem.value){
		error.innerHTML = "Passwords do not match!";
		return;
	}
	var requestData = {
		TitleId: "9186",
		Username: nameElem.value,
		Password: passElem.value,
		RequireBothUsernameAndEmail: false
	}
	if (emailElem.value) {
		requestData.Email = emailElem.value;
		requestData.RequireBothUsernameAndEmail = true;
	}
	try {
		PlayFab.ClientApi.RegisterPlayFabUser(requestData, playFabLoginCallback);
		if (saveLogin) {
			storePlayFabInfo(username, pass); 
			game.global.playFabLoginType = 2;
		}
		else game.global.playFabLoginType = -1;
	}
	catch (e){
		error.innerHTML = "Unable to send registration request to PlayFab.";
	}
}

function playFabLoginWithPlayFab(username, pass){
	var error = document.getElementById("playFabLoginError");
	if (typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined'){
		error.innerHTML = "Unable to Initialize the PlayFab API. Please check to make sure third-party scripts are enabled for Trimps, and that PlayFab is not blocked.";
		return;
	}
	var saveLogin = false;
	if (!username || !pass){
		var nameElem = document.getElementById("loginUserName");
		var passElem = document.getElementById("loginPassword");
		var rememberElem = document.getElementById("rememberInfo");
		if (rememberElem && rememberElem.checked == true) saveLogin = true;
		if (nameElem == null || passElem == null){
			//Elements required to login are missing, rebuild login screen
			tooltip("PlayFab Login", null, "update");
			return;
		}
		else{
			username = nameElem.value;
			pass = passElem.value;
		}
	}
	var requestData = {
		TitleId: "9186",
		Username: username,
		Password: pass
	}
	try {
		PlayFab.ClientApi.LoginWithPlayFab(requestData, playFabLoginCallback);
		if (saveLogin) {
			storePlayFabInfo(username, pass); 
			game.global.playFabLoginType = 2;
			game.global.rememberInfo = true;
		}
		else {
			game.global.playFabLoginType = -1;
			game.global.rememberInfo = false;
			}
	}
	catch (e){
		error.innerHTML = "Unable to send login request to PlayFab.";
	}
}


function playFabLoginWithKongregate(attempt){
	var error = document.getElementById("playFabLoginError");
	if (typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined'){
		error.innerHTML = "Unable to Initialize the PlayFab API. Please check to make sure third-party scripts are enabled for Trimps, and that PlayFab is not blocked.";
		return;
	}
	if (typeof kongregate === 'undefined'){
		console.log("something went wrong... Kongregate defined but not defined?");
		//This should really never get to this function if Kongregate isn't defined
		return;
	}
	var userId = (kongregate && kongregate.services && kongregate.services.getUserId) ? kongregate.services.getUserId() : 0;
	if (userId == 0){
			if (!error) tooltip("PlayFab Login", null, "update");
			if (error) error.innerHTML = "You must be logged in to Kongregate to do that.";
			if (kongregate && (typeof kongregate.services === 'undefined' || typeof kongregate.services.getUserId === 'undefined')) {
				if (!attempt) attempt = 2;
				else attempt++;
				if (attempt < 6) {
					if (error) error.innerHTML += "&nbsp;<span class='greenText'>Attempting to Connect again, attempt: " + attempt + "/5</span>";
					setTimeout(function() {
						playFabLoginWithKongregate(attempt);
					}, 1500)
				}
				else if (error) error.innerHTML += " Unable to connect after 5 tries.";
			}
		return;
	}
	var authTicket = kongregate.services.getGameAuthToken();
	var requestData = {
		TitleId: "9186",
		KongregateId: userId,
		AuthTicket: authTicket,
		CreateAccount: true
	}
	try {
		PlayFab.ClientApi.LoginWithKongregate(requestData, playFabLoginCallback);
		game.global.playFabLoginType = 1;
	}
	catch (e){
		error.innerHTML = "Unable to send login request to PlayFab.";
		//Not sure if this will ever trigger, better safe
	}
}

function playFabLoginCallback(data, error){
	if (error){
		var errorElem = document.getElementById("playFabLoginError");
		if (errorElem != null && error.errorMessage){
			errorElem.style.display = "block";
			errorElem.innerHTML = error.errorMessage;
		}
		return;
	}
	if (data){
		playFabId = data.data.PlayFabId;
		if (playFabSaveErrors > 0) {
			playFabAttemptReconnect(true);
			return;
		}
		cancelTooltip();
		playFabSaveCheck();
	}
}

function cancelPlayFab(){
	cancelTooltip();
	playFabId = -1;
	game.global.playFabLoginType = -1;
}

function playFabSaveCheck(){
	if (playFabId == -1) return false;
	if (typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined'){
		//Should never get this far without the api
		console.log(error);
		return;
	}
	var requestData = {
		Keys: ["totalHeliumEarned", "highestLevelCleared", "totalZones"],
		PlayFabId: playFabId
	}
	try {
		PlayFab.ClientApi.GetUserData(requestData, playFabSaveCheckCallback);
	}
	catch (e){console.log(e);}
}

function playFabSaveCheckCallback(data, error){
	if (error){
		console.log("error checking existing PlayFab data");
		console.log(error);
		return;
	}
	if (data){
		var playFabHelium = (data.data.Data.totalHeliumEarned) ? parseFloat(data.data.Data.totalHeliumEarned.Value) : 0;
		var playFabHighestZone = (data.data.Data.highestLevelCleared) ? parseFloat(data.data.Data.highestLevelCleared.Value) : 0;
		var playFabTotalZones = (data.data.Data.totalZones) ? parseFloat(data.data.Data.totalZones.Value) : 0;
		if (playFabHelium > parseFloat(game.global.totalHeliumEarned) || playFabHighestZone > parseFloat(game.global.highestLevelCleared) || (playFabTotalZones > (game.stats.zonesCleared.value + game.stats.zonesCleared.valueTotal))){
			tooltip("PlayFab Conflict", null, "update", playFabHelium, playFabHighestZone, playFabTotalZones);
			return;
		}
		playFabFinishLogin(false);
	}
}

function playFabFinishLogin(downloadFirst){
	if (downloadFirst){
		loadFromPlayFab();
		return;
	}
	cancelTooltip();
	game.options.menu.usePlayFab.enabled = 1;
	toggleSetting("usePlayFab", null, false, true);
}

function saveToPlayFab(saveString){
	if (game.global.isBeta) return;
	if (!playFabId || typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined') return false;
	var requestData = {
		TitleId: "9186",
		Data: {
			saveString: saveString,
			totalHeliumEarned: game.global.totalHeliumEarned,
			highestLevelCleared: game.global.highestLevelCleared,
			totalZones: (game.stats.zonesCleared.value + game.stats.zonesCleared.valueTotal)
		}
	}
	try{
		PlayFab.ClientApi.UpdateUserData(requestData, saveToPlayFabCallback);
	}
	catch(e){console.log(e);}
	
}

var playFabSaveErrors = 0;

function saveToPlayFabCallback(data, error){
	if (error){
		playFabSaveErrors++;
		message("Unable to back up your save to PlayFab! Double check your internet connection, and don't forget to back up your save manually.", "Notices");
		swapClass("iconState", "iconStateBad", document.getElementById('playFabIndicator'));
		console.log(error);
		if (playFabId != -1) {
			playFabAttemptReconnect();
		}
		return false;
	}
	if (data){
		swapClass("iconState", "iconStateGood", document.getElementById('playFabIndicator'));
		lastOnlineSave = performance.now();
		message("Game saved and backed up to PlayFab! Next automatic online save in 30 minutes.", "Notices", null, "save");
		return true;
	}
}

function playFabAttemptReconnect(reconnected){
	console.log((reconnected) ? "Reconnected" : "Attempting to reconnect");
	if (reconnected){
		playFabSaveErrors = 0;
		message("Reconnected to PlayFab!", "Notices", null, "save");
		swapClass("iconState", "iconStateGood", document.getElementById('playFabIndicator'));
		return;
	}
	if (game.global.playFabLoginType >= 1) tryPlayFabAutoLogin();
}

function loadFromPlayFab(){
	if (!playFabId || typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined') return false;
	var requestData = {
		Keys: ["saveString"],
		PlayFabId: playFabId
	}
	try{
		PlayFab.ClientApi.GetUserData(requestData, loadFromPlayFabCallback);
	}
	catch(e){console.log(e);}
}

function loadFromPlayFabCallback(data, error){
	if (error){
		console.log(error);
		return;
	}
	if (data){
		var id = playFabId;
		if (load(data.data.Data.saveString.Value, false, true)){
			playFabId = id;
			playFabFinishLogin();
			game.options.displayed = (document.getElementById('settingsHere').style.display == "block");
			return;
		}
		game.options.menu.usePlayFab.enabled = 0;
		toggleSetting("usePlayFab", null, false, true);
		playFabId = -1;
	}
}

function storePlayFabInfo(name, pass){
	try{
		localStorage.setItem("playFabName", name);
		localStorage.setItem("playFabPass", pass);
	}
	catch(e){console.log(e)}
	return false;
}

function readPlayFabInfo(){	
	var info = [false, false];
	try {
		info[0] = localStorage.getItem("playFabName");
		info[1] = localStorage.getItem("playFabPass");
	}
	catch (e) {console.log(e)}
	if (info[0] && info[1]) return info;
	return false;
}

var loops = 0;
function gameLoop(makeUp, now) {
    gather(makeUp);
    craftBuildings();
	if (game.global.trapBuildToggled && game.global.trapBuildAllowed && game.global.buildingsQueue.length === 0) autoTrap();
    breed(makeUp);
    battleCoordinator(makeUp);
	if (game.global.titimpLeft) game.global.titimpLeft -= 0.1;
	loops++;
	if (loops % 10 == 0){
		if (game.global.challengeActive == "Decay") updateDecayStacks(true);
		if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.pressure !== 'undefined') dailyModifiers.pressure.addSecond();
		if (game.global.autoUpgradesAvailable) autoUpgrades();
		if (savedOfflineText && !game.global.lockTooltip) {
			tooltip("Trustworthy Trimps", null, "update", savedOfflineText);
			savedOfflineText = "";
		}
	}
	if (mutations.Magma.active()) generatorTick();
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
		setTimeout(gameTimeout, (1000 / game.settings.speed));
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


function updatePortalTimer(justGetTime) {
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
	if (justGetTime) return timeString;
	if (game.options.menu.pauseGame.enabled) timeString = timeString + "&nbsp;(PAUSED)";
	else {
		checkAchieve("totalGems");
		if (trimpStatsDisplayed) displayAllStats();
		if (game.options.menu.useAverages.enabled && Math.floor(timeSince % 3) == 0) curateAvgs();
		if (game.resources.helium.owned > 0) game.stats.bestHeliumHourThisRun.evaluate();
		if (game.global.autoStorage == true) autoStorage();
		if (game.resources.helium.owned) document.getElementById("heliumPh").innerHTML = prettify(game.stats.heliumHour.value()) + "/hr";
		if (Math.floor(game.stats.heliumHour.value()) == 1337) giveSingleAchieve(4);
		if (game.buildings.Trap.owned > 1000000) giveSingleAchieve(1);
		if (game.global.selectedChallenge == "Daily") updateDailyClock();
	}
	document.getElementById("portalTime").innerHTML = timeString;
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
			checkButtons("upgrades");
			break;
		case 49:
		case 88:
		case 97:
			if (!game.global.preMapsActive && game.upgrades.Formations.done && !game.global.lockTooltip && !ctrlPressed && !heirloomsShown) setFormation('0');
			break;
		case 50:
		case 72:
		case 98:
			if (!game.global.preMapsActive && game.upgrades.Formations.done && !game.global.lockTooltip && !ctrlPressed && !heirloomsShown) setFormation('1');
			break;
		case 51:
		case 68:
		case 99:
			if (!game.global.preMapsActive && game.upgrades.Dominance.done && !game.global.lockTooltip && !ctrlPressed && !heirloomsShown) setFormation('2');
			break;
		case 52:
		case 66:
		case 100:
			if (!game.global.preMapsActive && game.upgrades.Barrier.done && !game.global.lockTooltip && !ctrlPressed && !heirloomsShown) setFormation('3');
			break;
		case 53:
		case 83:
		case 101:
			if (!game.global.preMapsActive && game.upgrades.Formations.done && game.global.highestLevelCleared >= 180 && !game.global.lockTooltip && !ctrlPressed && !heirloomsShown) setFormation('4');
			break;
		case 13:
			var confirmCheck = document.getElementById("confirmTooltipBtn");
			if (confirmCheck !== null && typeof confirmCheck.onclick == 'function'){
				confirmCheck.onclick();
			}
	}
}, true);
document.addEventListener('keyup', function(e) {
	if (e.keyCode == 16){
		if (game.options.menu.tooltips.enabled == false) cancelTooltip();
		shiftPressed = false;	
	}
	if (e.keyCode == 17 || e.keyCode == 224 || e.keyCode == 91 || e.keyCode == 93){
		ctrlPressed = false;
		checkButtons("upgrades");
	}

}, true);


load();
updatePortalTimer();
displayPerksBtn();

setTimeout(autoSave, 60000);
setTimeout(buyAutoStructures, 2000);
costUpdatesTimeout();
setTimeout(gameTimeout, (1000 / game.settings.speed));
