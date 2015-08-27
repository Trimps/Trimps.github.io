//I wrote all of this code by hand (now with some help by people on github, credits over there) with no libraries so I could learn stuff (except LZString for save import/export, string compression is out of my league. Credits in that file). This is my first javascript project, so be nice.
//Feel free to read through the code and use stuff if you want, I don't know how to properly comment code so I just wrote stuff where I felt like it
//I will be continually cleaning up and making this code more readable as my javascript skills improve
//Contact me via Kongregate as GreenSatellite, reddit on /r/Trimps, or Email at trimpsgame@gmail.com
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
if (typeof kongregate === 'undefined' && document.getElementById("boneBtn") !== null) document.getElementById("boneBtn").style.display = "none";
document.getElementById("versionNumber").innerHTML = game.global.version;
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
	for (var itemF in saveGame.challenges){
		var challenge = saveGame.challenges[itemF];
		delete challenge.description;
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
	else if (savegame.global.isBeta) {
		message("You can't import a save from the beta version to this version!", "Notices");
		return;
	}
	else savegame.global.version = game.global.version;
    
	
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
    for (var a in game) { //global, resources, jobs, buildings, upgrades, triggers, equipment, settings
        if (a == "global") continue;
        if (a == "badGuys") continue;
        if (a == "worldUnlocks") continue;
        if (a == "mapConfig") continue;
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
    if (game.global.mapGridArray.length > 0 && game.global.currentMapId !== "") {
        drawGrid(true);
        for (var y = 0; y <= game.global.lastClearedMapCell; y++) {
            document.getElementById("mapCell" + y).style.backgroundColor = "green";
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
	game.global.lockTooltip = false;
	swapNotation(true);
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
    toggleSave(true);
	checkOfflineProgress();
	updateLabels();
	if (game.global.viewingUpgrades) viewPortalUpgrades();
	if (game.global.respecActive) respecPerks();
	if (game.global.kongBonusMode) activateKongBonus();
	if (game.global.totalPortals >= 1) document.getElementById("pastUpgradesBtn").style.display = "inline-block";
	if (game.global.challengeActive && typeof game.challenges[game.global.challengeActive].onLoad !== 'undefined') game.challenges[game.global.challengeActive].onLoad();
	if (game.global.challengeActive != "Scientist") document.getElementById("scienceCollectBtn").style.display = "block";
	if (game.global.brokenPlanet) document.getElementById("wrapper").style.background = "url(css/bg2_vert.png) center repeat-y";
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
	
}

function loadGigastations() {
	var modifier = Math.pow(1.75, game.upgrades.Gigastation.done);
	game.buildings.Warpstation.cost.gems[0] *= modifier;
	game.buildings.Warpstation.cost.metal[0] *= modifier;
}

function portalClicked() {
	cancelTooltip();
	game.global.viewingUpgrades = false;
	game.global.respecActive = false;
	game.global.tempHighHelium = game.resources.helium.owned;
	document.getElementById("wrapper").style.display = "none";
	document.getElementById("portalWrapper").style.backgroundColor = (game.global.sLevel === 0) ? "green" : "#00b386";
	document.getElementById("portalWrapper").style.color = "black";
	fadeIn("portalWrapper", 10);
	var titleText = "Time Portal";
	if (game.global.sLevel == 1) titleText += " Mk. II";
	document.getElementById("portalTitle").innerHTML = titleText;	
	document.getElementById("portalStory").innerHTML = "Well, you did it. You followed your instincts through this strange world, made your way through the Dimension of Anger, and obtained this portal. But why? Maybe there will be answers through this portal... Your scientists tell you they can overclock it to bring more memories and items back, but they'll need helium to cool it.";
	document.getElementById("portalHelium").innerHTML = '<span id="portalHeliumOwned">' + prettify(game.resources.helium.owned + game.global.heliumLeftover) + '</span> Helium';
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
	document.getElementById("specificChallengeDescription").innerHTML = "";
	challengesHere.innerHTML = '<div class="noselect pointer challengeThing thing" id="challenge0" onclick="selectChallenge(0)"><span class="thingName">None</span></div>';
	for (var what in game.challenges){
		var challenge = game.challenges[what];
		if (!challenge.filter()) continue;
		challengeCount++;
		var done = false;
		if (game.portal[game.challenges[what].unlocks]) done = (game.portal[game.challenges[what].unlocks].locked) ? false : true;
		else if (what == "Scientist" && game.global.sLevel > 0) done = true;
		done = (done) ? "finishedChallenge" : "";
		challengesHere.innerHTML += '<div class="noselect pointer challengeThing thing ' + done + '" id="challenge' + what + '" onclick="selectChallenge(\'' + what + '\')"><span class="thingName">' + what + '</span></div>';
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
		document.getElementById("specificChallengeDescription").innerHTML = "";
		document.getElementById("flagMustRestart").style.display = "none";
		if (addChallenge !== null) addChallenge.innerHTML = "";
		return;
	}
	var desc = game.challenges[what].description;
	desc += "<b>";
	if (game.portal[game.challenges[what].unlocks]) desc += (game.portal[game.challenges[what].unlocks].locked) ? " You will also earn a new Perk!" : " You will not earn a new perk.";
	else if (what == "Scientist" && game.global.sLevel > 0) desc += " You have already completed this challenge!";
	desc += "</b>";
	document.getElementById("specificChallengeDescription").innerHTML = desc;
	game.global.selectedChallenge = what;
	document.getElementById("flagMustRestart").style.display = (what == "Scientist") ? "inline" : "none";
	
	if (addChallenge !== null) addChallenge.innerHTML = "You have the <b>" + what + " Challenge</b> active.";
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
	cancelTooltip();
	game.global.viewingUpgrades = true;
	game.resources.helium.respecMax = game.global.heliumLeftover;
	document.getElementById("viewChallenge").style.display = "block";
	document.getElementById("viewChallengeText").innerHTML = (game.global.challengeActive) ? "You have the " + game.global.challengeActive + " challenge active. \"" + game.challenges[game.global.challengeActive].description + "\"" : "You don't have an active challenge.";
	document.getElementById("wrapper").style.display = "none";
	document.getElementById("portalWrapper").style.backgroundColor = "black";
	document.getElementById("portalWrapper").style.color = "white";
	fadeIn("portalWrapper", 10);
	document.getElementById("portalTitle").innerHTML = "View Perks";
	document.getElementById("portalHelium").innerHTML = '<span id="portalHeliumOwned">' + prettify(parseInt(game.global.heliumLeftover, 10)) + '</span> Left Over';
	document.getElementById("portalStory").innerHTML = "These are all of your perks! You can reset them once per run.";
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
function checkOfflineProgress(){
	if (!game.global.lastOnline) return;
	var rightNow = new Date().getTime();
	var textArray = [];
	if (game.global.lastOfflineProgress > rightNow){
		game.global.cheater = true;
		if (typeof Kongregate !== 'undefined') message("It looks like you cheated by setting your clock forward and back again. While I won't penalize anyone for cheating in a single player game, your game will no longer submit high scores, and your Trimps don't respect you as much.", "Notices");
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
		var perSec = amt;
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
	tooltip("Trustworthy Trimps", null, "update", textString);
}

function respecPerks(){
	if (!game.global.canRespecPerks) return;
	if (!game.global.viewingUpgrades) return;
	game.global.respecActive = true;
	displayPortalUpgrades();
	game.resources.helium.respecMax = 0;
	for (var item in game.portal){
		if (game.portal[item].locked) continue;
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
	document.getElementById("portalStory").innerHTML = "You can only respec once per run. Clicking cancel will not consume this use.";
	document.getElementById("portalTitle").innerHTML = "Respec Perks";
	document.getElementById("ptabRemove").style.display = "table-cell";
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
	var text = "";
	if (game.global.respecActive){
		num = toBuy.level + toBuy.levelTemp;
		text = "0";
		if ((toBuy.level + toBuy.levelTemp) > 0)
			text +=  " (+" + num + ")";
		textElem.innerHTML = text;
	}
	else{
		text = toBuy.level;
		if (toBuy.levelTemp > 0)
			text += " (+" + toBuy.levelTemp + ")";
		textElem.innerHTML = text;	
	}
}

function toggleRemovePerks(){
	var perkElem = document.getElementById("ptabRemove");
	var perkTextElem = document.getElementById("ptabRemoveText");
	if (game.global.removingPerks){
		perkElem.style.background = "rgba(255, 255, 255, 0.25)";
		perkTextElem.style.color = "red";
	}
	else {
		perkElem.style.background = "rgba(214, 29, 29, 0.75)";
		perkTextElem.style.color = "white";
	}
	game.global.removingPerks = !game.global.removingPerks;
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
	document.getElementById("pastUpgradesBtn").style.display = "inline-block";
	if (!canCommitCarpentry()) return false;
	for (var item in game.portal){
		if (game.portal[item].locked) continue;
		var portUpgrade = game.portal[item];
		if (typeof portUpgrade.level === 'undefined') continue;
		portUpgrade.level += portUpgrade.levelTemp;
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
    if (newMax < (game.resources.trimps.maxSoldiers * 2.4)) {
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

function activatePortal(){
	if (!commitPortalUpgrades()) return;
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

function rewardResource(what, baseAmt, level, checkMapLootScale) {
    var map;
	var world;
    if (checkMapLootScale) {
        map = getCurrentMapObject();
        level = scaleLootLevel(level, map.level);
		world = map.level;
    } else {
        level = scaleLootLevel(level);
		world = game.global.world;
    }
	var amt;
	if (what == "fragments"){
		amt = Math.floor(Math.pow(1.15, world));
	}
	else{
		if (what == "helium") level = Math.round((level - 1900) / 100);
		if (what == "gems") level = level - 400;
		level *= 1.35;
		if (level < 0) level = 0;
		amt = Math.round(baseAmt * Math.pow(1.23, Math.sqrt(level)));
		amt += Math.round(baseAmt * level);
		//if (what != "helium" && what != "gems" && what != "fragments") amt *= (game.resources.trimps.realMax() / 100) + 1;
		amt = Math.round(amt);
	}
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
    for (var job in game.jobs) {
		var perSec = 0;
		var increase = game.jobs[job].increase;
		if (increase == "custom") continue;
        if (game.jobs[job].owned > 0){
			perSec = (game.jobs[job].owned * game.jobs[job].modifier);
			if (game.portal.Motivation.level > 0) perSec += (perSec * game.portal.Motivation.level * game.portal.Motivation.modifier);
		}
		if (what && increase == what) perSec += game.global.playerModifier;
        amount = perSec / game.settings.speed;
		if (game.resources[increase].max > 0){
			var timeToFillElem = document.getElementById(increase + "TimeToFill");
			if (timeToFillElem) timeToFillElem.innerHTML = calculateTimeToMax(game.resources[increase], perSec);
		}
		addResCheckMax(increase, amount);
    }
    if (what === "" || what == "buildings") return;
    if (what == "trimps") {
        trapThings();
        return;
    }
}

function calculateTimeToMax(resource, perSec) {
	if (perSec <= 0) return "";
	var remaining = ((resource.max * (1 + game.portal.Packrat.modifier * game.portal.Packrat.level))) - resource.owned;
	if (remaining <= 0) return "";
	var toFill = Math.floor(remaining / perSec);
	var years = Math.floor(toFill / 31536000);
	var days = Math.floor(toFill / 86400) % 365;
	var hours = Math.floor( toFill / 3600) % 24;
	var minutes = Math.floor(toFill / 60) % 60;
	var seconds = toFill % 60;
	if (toFill < 60) return Math.floor(toFill) + " Secs";
	if (toFill < 3600) return minutes + " Mins " + seconds + " Secs";
	if (toFill < 86400) return hours + " Hours " + minutes + " Mins";
	if (toFill < 31536000) return days + " Days " + hours + " Hours";
	return years + " Years " + days + " Days";
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
	if (whatObj.specialFilter && !whatObj.specialFilter()) return false;
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
		if (price > game.resources[costItem].owned || !(isFinite(price))) {
			if (buildCostString) color = "red";
			else return false;
		}
		if (buildCostString) {
			var percent = (game.resources[costItem].owned > 0) ? prettify(((price / game.resources[costItem].owned) * 100).toFixed(1)) : 0;
			percent = "(" + percent + "%)";
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
	struct.purchased -= parseInt(name[1], 10);
    for (var costItem in struct.cost) {
		var thisCostItem = struct.cost[costItem];
		var refund = 0;
		if (typeof thisCostItem[1] !== 'undefined')
			refund =  Math.floor((thisCostItem[0] * Math.pow(thisCostItem[1], struct.purchased)) * ((Math.pow(thisCostItem[1], name[1]) - 1) / (thisCostItem[1] - 1)));
		else if (typeof struct.cost[costItem] === 'function') refund += struct.cost[costItem]();
		else 
			refund = thisCostItem * name[1];
		addResCheckMax(costItem, parseFloat(refund));
    }
}

function startQueue(what, count) {
    game.global.buildingsQueue.push(what + "." + (count));
    addQueueItem(what + "." + count);
}

function craftBuildings(makeUp) {
    var buildingsBar = document.getElementById("queueItemsHere").firstChild;
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
		buildingsBar.style.background = "rgba(30, 144, 255, " + percent + ")";
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
	if (timeLeft <= 0.1) {timeLeft = 0.1; elem.style.background = "rgb(30, 144, 255)";}
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
		var percent = (game.resources[costItem].owned > 0) ? prettify(((price / game.resources[costItem].owned) * 100).toFixed(1)) : 0;
		return prettify(price) + "&nbsp;(" + percent + "%)";
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

function buyUpgrade(what) {
    if (what == "Coordination" && (game.resources.trimps.realMax() < (game.resources.trimps.maxSoldiers * 3))) {
        return;
    }
    var upgrade = game.upgrades[what];
    var canAfford = canAffordTwoLevel(upgrade);
    if (!canAfford) return;
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
        document.getElementById(what + "Owned").innerHTML = upgrade.done + "( +" + dif + ")";
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
    var breeding = trimps.owned - trimps.employed;
	var trimpsMax = trimps.realMax();
    if (breeding < 2) {
        updatePs(0, true);
        return;
    }

    breeding = breeding * trimps.potency;
	if (game.global.brokenPlanet) breeding /= 10;
	//Pheromones
	breeding += (breeding * game.portal.Pheromones.level * game.portal.Pheromones.modifier);
	if (game.unlocks.quickTrimps) breeding *= 2;
    updatePs(breeding, true);
	if (trimps.owned >= trimpsMax) {
        trimps.owned = trimpsMax;
        return;
    }
    trimps.owned += breeding / game.settings.speed;
	if (trimps.owned > trimpsMax) trimps.owned = trimpsMax;
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
	if (document.getElementById("biomeAdvMapsSelect").value != "Random") baseCost *= 4;
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
	if (game.resources.fragments.owned >= cost){
		var newLevel = parseInt(document.getElementById("mapLevelInput").value, 10);
		if (newLevel > 5 && newLevel <= game.global.world){
		game.resources.fragments.owned -= cost;
		
		createMap(newLevel);
		}
		else message("You must create a map between level 6 and your highest zone, " + game.global.world + ".", "Notices");
	}
	else message("You can't afford this map! You need " + prettify(cost) + " fragments.", "Notices");
}

function createMap(newLevel, nameOverride, locationOverride, lootOverride, sizeOverride,  difficultyOverride, setNoRecycle) {
    game.global.mapsOwned++;
    game.global.totalMapsEarned++;
    var world = (newLevel > 5 && newLevel <= game.global.world) ? newLevel : game.global.world;
    var mapName = getRandomMapName();
	mapName = mapName.split('.');
	var lootg = parseFloat(getRandomMapValue("loot"));
	if (game.unlocks.goldMaps) lootg += 1;
	if (lootOverride && game.unlocks.goldMaps) lootOverride += 1;
	if (typeof mapName[1] === 'undefined') mapName[1] = "All";
	if (nameOverride) mapName[0] = nameOverride;
    game.global.mapsOwnedArray.push({
        id: "map" + game.global.totalMapsEarned,
        name: mapName[0],
		location: (locationOverride) ? locationOverride : mapName[1],
        clears: 0,
        level: world,
        difficulty: (difficultyOverride) ? difficultyOverride : getRandomMapValue("difficulty"),
        size: (sizeOverride) ? sizeOverride : Math.floor(getRandomMapValue("size")),
        loot: (lootOverride) ? lootOverride : lootg,
		noRecycle: setNoRecycle ? true : false
    });
    message("You just made " + mapName[0] + "!", "Loot", "th-large");
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
	}
	else{
		min = amt - range;
		max = amt + range;
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
		if (special.brokenPlanet && ((special.brokenPlanet == 1 && !game.global.brokenPlanet) || special.brokenPlanet == -1 && game.global.brokenPlanet)) continue;
		if (special.startAt < 0) continue;
		if (special.lastAt < game.global.world) continue;
		if ((maps) && (special.filterUpgrade) && (game.mapConfig.locations[map.location].upgrade != item)) continue;		
        if ((special.level == "last" && canLast && special.world <= world && special.canRunOnce)) {
		if (typeof special.specialFilter !== 'undefined'){
			if (!special.specialFilter()) continue;
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
		if ((special.world == -25) && ((world % 25) !== 0)) continue;
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
		if (special.canRunOnce === true && countOnly) {specialCount++; continue;}
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
			var addClass = (special.addClass) ? special.addClass : "";
			if (typeof special.title !== 'undefined') 
			array[level].text = '<span title="' + special.title + '" class="glyphicon glyphicon-' + special.icon + ' ' + addClass + '"></span>';
			else{
			array[level].text = '<span class="glyphicon glyphicon-' + special.icon + ' ' + addClass +  '"></span>';
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
            cell.className = "battleCell";
            cell.innerHTML = (maps) ? game.global.mapGridArray[counter].text : game.global.gridArray[counter].text;
			if (cell.innerHTML === "") cell.innerHTML = "&nbsp;";
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
    mapsSwitch(true, true);

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
	game.global.switchToMaps = true;
}

function mapsSwitch(updateOnly, fromRecycle) {
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
	document.getElementById("mapsBtn").style.fontSize = "1.1vw";
    if (game.global.preMapsActive) {
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
    } else if (game.global.mapsActive) {
		fadeIn("repeatBtn", 10);
		document.getElementById("battleHeadContainer").style.display = "block";
		document.getElementById("mapsCreateRow").style.display = "none";
        document.getElementById("grid").style.display = "none";
        document.getElementById("preMaps").style.display = "none";
        document.getElementById("mapGrid").style.display = "block";
        document.getElementById("mapsBtn").innerHTML = "Maps";
        document.getElementById("worldNumber").innerHTML = "</br>Lv: " + currentMapObj.level;
        document.getElementById("worldName").innerHTML = currentMapObj.name;
    } else {
		document.getElementById("battleHeadContainer").style.display = "block";
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

function resetAdvMaps() {
	document.getElementById("mapLevelInput").value = game.global.world;
	var inputs = document.getElementsByClassName("mapInput");
	for (var x = 0; x < inputs.length; x++){
		inputs[x].value = 0;
	}
	document.getElementById("biomeAdvMapsSelect").value = "Random";
	initializeInputText();
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
	var num = (game.portal.Agility.level) ? 1000 * Math.pow(1 - game.portal.Agility.modifier, game.portal.Agility.level) : 1000;
	if (game.global.battleCounter >= num) {
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
	var trimpsMax = trimps.realMax();
    if (trimps.soldiers > 0) {
        startFight();
        return;
    }
    var breeding = (trimps.owned - trimps.employed);
    if (breeding < trimps.maxSoldiers) return;
    if (force) {
        trimps.soldiers = trimps.maxSoldiers;
        trimps.owned -= trimps.maxSoldiers;
    } else {
        var max = Math.ceil((trimpsMax - trimps.employed) * 0.05);
        if ((trimps.owned) >= (trimpsMax - max)) {
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
	var badName = cell.name;
	if (game.global.brokenPlanet && !game.global.mapsActive)
		badName += ' <span class="badge badBadge" title="20% of this Bad Guy\'s damage pierces through block"><span class="glyphicon glyphicon-tint"></span></span>';	
	if (game.badGuys[cell.name].fast)
		badName += ' <span class="badge badBadge" title="This Bad Guy is fast and attacks first"><span class="glyphicon glyphicon-forward"></span></span>';
	document.getElementById("badGuyName").innerHTML = badName;
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
        document.getElementById("badGuyBar").style.backgroundColor = "#00B2EE";
    }
    if (game.global.soldierHealth <= 0) {
		game.global.difs.attack = 0;
		game.global.difs.health = 0;
		game.global.difs.block = 0;
		game.global.difs.trainers = game.jobs.Trainer.owned;
        var trimpsFighting = game.resources.trimps.maxSoldiers;
        game.global.soldierHealthMax = (game.global.health * trimpsFighting);
		//Toughness
		if (game.portal.Toughness.level > 0) game.global.soldierHealthMax += (game.global.soldierHealthMax * game.portal.Toughness.level * game.portal.Toughness.modifier);
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
		document.getElementById("goodGuyBar").style.width = "100%";
    }
	else {
		//Check differences in equipment, apply perks, bonuses, and formation
		if (game.global.difs.health !== 0) {
			var healthTemp = game.resources.trimps.soldiers * game.global.difs.health * ((game.portal.Toughness.modifier * game.portal.Toughness.level) + 1);
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
			var attackTemp = game.resources.trimps.soldiers * game.global.difs.attack * ((game.portal.Power.modifier * game.portal.Power.level) + 1);
			if (game.global.formation !== 0){
				attackTemp *= (game.global.formation == 2) ? 4 : 0.5;
			}
			game.global.soldierCurrentAttack += attackTemp;
			game.global.difs.attack = 0;
		}
		if (game.global.difs.block !== 0) {
			var blockTemp = (game.resources.trimps.soldiers * game.global.difs.block * ((game.global.difs.trainers * (game.jobs.Trainer.modifier / 100)) + 1));
			if (game.global.formation !== 0){
				blockTemp *= (game.global.formation == 3) ? 4 : 0.5;
			}
			game.global.soldierCurrentBlock += blockTemp;
			game.global.difs.block = 0;
		}
	}
	updateAllBattleNumbers(game.resources.trimps.soldiers < game.resources.trimps.maxSoldiers);
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
    cellElem.style.backgroundColor = "yellow";
	document.getElementById("goodGuyHealth").innerHTML = prettify(game.global.soldierHealth);
    document.getElementById("goodGuyHealthMax").innerHTML = prettify(game.global.soldierHealthMax);
    document.getElementById("goodGuyBar").style.backgroundColor = getBarColor((game.global.soldierHealth / game.global.soldierHealthMax) * 100);
    document.getElementById("badGuyHealth").innerHTML = prettify(cell.health);
	document.getElementById("badGuyHealthMax").innerHTML = prettify(cell.maxHealth);
	if (!skipNum) document.getElementById("trimpsFighting").innerHTML = prettify(game.resources.trimps.maxSoldiers);
	document.getElementById("goodGuyBlock").innerHTML = prettify(game.global.soldierCurrentBlock);
	document.getElementById("goodGuyAttack").innerHTML = calculateDamage(game.global.soldierCurrentAttack, true, true);
	document.getElementById("badGuyAttack").innerHTML = calculateDamage(cell.attack, true);
}

function calculateDamage(number, buildString, isTrimp) { //number = base attack
    var fluctuation = .2; //%fluctuation
	var maxFluct = -1;
	var minFluct = -1;
	if (game.global.challengeActive == "Discipline" && isTrimp){
		fluctuation = .995;
	}
	else if (game.portal.Range.level > 0 && isTrimp){
		minFluct = fluctuation - (.02 * game.portal.Range.level);
	}
	if (maxFluct == -1) maxFluct = fluctuation;
	if (minFluct == -1) minFluct = fluctuation;
	var min = Math.floor(number * (1 - minFluct));
    var max = Math.ceil(number + (number * maxFluct));
    if (buildString) return prettify(min, 0) + "-" + prettify(max, 0);
    number = Math.floor(Math.random() * ((max + 1) - min)) + min;
    return number;
}

function nextWorld() {
	if (game.global.world > game.global.highestLevelCleared){
		game.global.highestLevelCleared = game.global.world;
	}
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
	var randomText;
    if (game.global.soldierHealth <= 0) {
        var s = (game.resources.trimps.maxSoldiers > 1) ? "s " : " ";
		randomText = game.trimpDeathTexts[Math.floor(Math.random() * game.trimpDeathTexts.length)];
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
		randomText = game.badGuyDeathTexts[Math.floor(Math.random() * game.badGuyDeathTexts.length)];
        message("You " + randomText + " a " + cell.name + "!", "Combat");
        try{
			if (typeof ga !== 'undefined' && cell.level % 2 === 0 && !game.global.mapsActive) ga('send', 'event', 'Killed Bad Guy', 'W: ' + game.global.world + ' L:' + cell.level);
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
        cellElem.style.backgroundColor = "green";
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
        if (cellNum == 99) nextWorld();
        battle(true);
        return;
    }
	var cellAttack = calculateDamage(cell.attack);
    var attackAndBlock = (cellAttack - game.global.soldierCurrentBlock);
	if (game.global.brokenPlanet && !game.global.mapsActive){
		var overpower = cellAttack * 0.2;
		if (attackAndBlock < overpower) attackAndBlock = overpower;
	}
	if (attackAndBlock < 0) attackAndBlock = 0;
	var trimpAttack = calculateDamage(game.global.soldierCurrentAttack, false, true);
	var gotCrit = false;
	var critSpan = document.getElementById("critSpan");
	critSpan.innerHTML = "";
	if (game.portal.Relentlessness.level > 0){
		if (Math.floor(Math.random() * (1 / (game.portal.Relentlessness.modifier * game.portal.Relentlessness.level))) == 1){
			trimpAttack += (trimpAttack * ((game.portal.Relentlessness.otherModifier * game.portal.Relentlessness.level) + 1));
			gotCrit = true;
		}
	}
    if (game.badGuys[cell.name].fast) {
        game.global.soldierHealth -= attackAndBlock;
        if (game.global.soldierHealth > 0) cell.health -= trimpAttack;
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
        if (cell.health > 0) game.global.soldierHealth -= attackAndBlock;
        else
            {
				cell.health = 0; 
				//fight(makeUp); return;
			}
        if (game.global.soldierHealth < 0) game.global.soldierHealth = 0;
    }
	if (gotCrit) critSpan.innerHTML = "Crit!";
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
			if (game.global.soldierHealth <= 0) game.global.soldierHealth = 1;
			game.global.soldierCurrentBlock *= block;
			game.global.soldierCurrentAttack *= attack;
			updateAllBattleNumbers(true);
		}
		game.global.formation = what;
	}
	else document.getElementById("formation0").style.backgroundColor = "grey";
	document.getElementById("formation" + game.global.formation).style.backgroundColor = "#5cb85c";
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
		document.getElementById("formation0").style.display = "none";
		document.getElementById("formation1").style.display = "none";
		document.getElementById("formation2").style.display = "none";
		document.getElementById("formation3").style.display = "none";
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

function successPurchaseFlavor(){
	document.getElementById("boneFlavorRow").innerHTML = "The Bone Trader takes the bones, casts a spell, then begins to make soup";
}

function updateBones() {
	document.getElementById("bonesOwned").innerHTML = prettify(game.global.b);
}

function boostHe(checkOnly) {
	var level = game.global.highestLevelCleared - 19;
	var amt = 30;
	if (!checkOnly) game.global.canRespecPerks = true;
	if (level <= 0) {
		if (checkOnly) return amt;
		game.global.heliumLeftover += amt;
		game.global.totalPortals++;
		document.getElementById("pastUpgradesBtn").style.display = "inline-block";
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
	game.global.totalPortals++;
	document.getElementById("pastUpgradesBtn").style.display = "inline-block";
	document.getElementById("pastUpgradesBtn").style.border = "1px solid red";
}

function buyGoldenMaps() {
	game.unlocks.goldMaps = true;
	for (var item in game.global.mapsOwnedArray){
		game.global.mapsOwnedArray[item].loot = parseFloat(game.global.mapsOwnedArray[item].loot) + 1;
		if (!game.global.mapsOwnedArray[item].noRecycle) document.getElementById(game.global.mapsOwnedArray[item].id).style.backgroundColor = "#998100";
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
	if (countUnpurchasedImports() < 4) {
		document.getElementById("bundleRow").style.display = "none";
		document.getElementById("getBundleBtn").style.display = "none";
	}
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

load();


setTimeout(autoSave, 60000);

function gameLoop(makeUp, now) {
/*	if (now < game.global.lastOfflineProgress) return;
	game.global.lastOnline = now; get4432*/
    gather(makeUp);
    craftBuildings();
	if (game.global.trapBuildToggled && game.global.trapBuildAllowed && game.global.buildingsQueue.length === 0) autoTrap();
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
	//4432
	game.global.lastOnline = now;
    var tick = 1000 / game.settings.speed;
    game.global.time += tick;
    var dif = (now - game.global.start) - game.global.time;
    while (dif >= tick) {
        gameLoop(true, now);
        dif -= tick;
        game.global.time += tick;
    }
    gameLoop(null, now);
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

