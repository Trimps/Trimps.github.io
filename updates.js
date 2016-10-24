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
 

var customUp;
var tooltipUpdateFunction = "";
var lastMousePos = [];

//"onmouseover="tooltip('*TOOLTIP_TITLE*', 'customText', event, '*TOOLTIP_TEXT*');" onmouseout="tooltip('hide')""
//in the event of what == 'confirm', numCheck works as a Title! Exciting, right?
function tooltip(what, isItIn, event, textString, attachFunction, numCheck, renameBtn, noHide) { //Now 20% less menacing. Work in progress.
	checkAlert(what, isItIn);
	if (game.global.lockTooltip) return;
	var elem = document.getElementById("tooltipDiv");
	swapClass("tooltipExtra", "tooltipExtraNone", elem);
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
	}
	var tooltipText;
	var costText = "";
	var toTip;
	var noExtraCheck = false;
	if (isItIn !== null && isItIn != "maps" && isItIn != "customText" && isItIn != "dailyStack"){
		toTip = game[isItIn];
		toTip = toTip[what];
		if (typeof toTip === 'undefined') console.log(what);
		else {
			tooltipText = toTip.tooltip;
			if (typeof tooltipText === 'function') tooltipText = tooltipText();
			if (typeof toTip.cost !== 'undefined') costText = addTooltipPricing(toTip, what, isItIn);
		}
	}
	if (isItIn == "dailyStack"){
		tooltipText = dailyModifiers[what].stackDesc(game.global.dailyChallenge[what].strength, game.global.dailyChallenge[what].stacks);
		costText = "";
		what = what[0].toUpperCase() + what.substr(1)
	}
	if (what == "Confirm Purchase"){
		if (attachFunction == "purchaseImport()" && !boneTemp.selectedImport) return;
		if (game.options.menu.boneAlerts.enabled == 0 && numCheck){
			eval(attachFunction);
			return;
		}
		var btnText = "Make Purchase";
		if (numCheck && game.global.b < numCheck){
			if (typeof kongregate === 'undefined') return;
			tooltipText = "You can't afford this bonus. Would you like to visit the shop?";
			attachFunction = "showPurchaseBones()";
			btnText = "Visit Shop";
		}
		else
		tooltipText = textString;
		costText += '<div class="maxCenter"><div id="confirmTooltipBtn" class="btn btn-info" onclick="' + attachFunction + '; cancelTooltip()">' + btnText + '</div><div class="btn btn-info" onclick="cancelTooltip()">Cancel</div></div>';
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Finish Daily"){
		var value = getDailyHeliumValue(countDailyWeight()) / 100;
		var reward = game.resources.helium.owned + game.stats.spentOnWorms.value;
		if (reward > 0) reward = Math.floor(reward * value);
		tooltipText = "Clicking <b>Finish</b> below will end your daily challenge and you will be unable to attempt it again. You will earn <b>" + prettify(reward) + " extra Helium!</b>";
		costText = '<div class="maxCenter"><div id="confirmTooltipBtn" class="btn btn-info" onclick="abandonChallenge(); cancelTooltip()">Finish</div><div class="btn btn-danger" onclick="cancelTooltip()">Cancel</div></div>';
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Switch Daily"){
		tooltipText = "You have one more day to run yesterday's daily challenge if you missed it! Click to switch between today and yesterday's dailies.";
		costText = "";
	}
	if (what == "Decay"){
		var decayedAmt = ((1 - Math.pow(0.995, game.challenges.Decay.stacks)) * 100).toFixed(2);
		tooltipText = "Things are quickly becoming tougher. Gathering, looting, and Trimp attack are reduced by " + decayedAmt + "%.";
		costText = "";
	}
	if (what == "Heirloom"){
		//attachFunction == location, numCheck == index
		tooltipText = displaySelectedHeirloom(false, 0, true, numCheck, attachFunction)
		costText = "";
		renameBtn = what;
		what = "";
		swapClass("tooltipExtra", "tooltipExtraHeirloom", elem);
		noExtraCheck = true;
	}
	if (what == "Respec"){
		tooltipText = "You can respec your perks once per portal. Clicking cancel after clicking this button will not consume your respec.";
		costText = "";
	}
	if (what == "Well Fed"){
		var tBonus = (game.talents.turkimp3.purchased) ? 75 : 50;
		tooltipText = "That Turkimp was delicious, and you have leftovers. If you set yourself to gather Food, Wood, or Metal while this buff is active, you can share with your workers to increase their gather speed by " + tBonus + "%";
		costText = "";
	}
	if (what == "Geneticistassist"){
		tooltipText = "I'm your Geneticistassist! I'll hire and fire Geneticists until your total breed time is as close as possible to the target time you choose. I will fire a Farmer, Lumberjack, or Miner at random if there aren't enough workspaces, I will never spend more than 1% of your food on a Geneticist, and you can customize my target time options in Settings. I have uploaded myself to your portal and will never leave you.";
		costText = "";
	}
	if (what == "Welcome"){
		tooltipText = "Welcome to Trimps! This game saves using Local Storage in your browser. Clearing your cookies or browser settings will cause your save to disappear! Please make sure you regularly back up your save file by either using the 'Export' button in the bar below or the 'Online Saving' option under 'Settings'.<br/><br/><b>Chrome and Firefox are currently the only fully supported browsers.</b><br/><br/><b>Would you like to enable online saving before you start?</b>";
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip(); toggleSetting(\"usePlayFab\");'>Enable Online Saving</div><div class='btn btn-danger' onclick='cancelTooltip()'>Don't Enable</div></div>";
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Trustworthy Trimps"){
		tooltipText = textString;
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Sweet, thanks.</div></div>";
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}	
	if (what == "Eggs"){
		tooltipText = '<span class="eggMessage">It seems as if some sort of animal has placed a bunch of brightly colored eggs in the world. If you happen to see one, you can click on it to send a Trimp to pick it up! According to your scientists, they have a rare chance to contain some neat stuff, but they will not last forever...</span>';
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>I'll keep an eye out.</div></div>";
		elem.style.left = "33.75%";
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
	if (what == "Customize Targets"){
		var steps = game.global.GeneticistassistSteps;
		tooltipText = "<div id='GATargetError'></div><div>Customize the target thresholds for your Geneticistassist! Use a number between 0.5 and 60 seconds for all 3 boxes. Each box corresponds to a Geneticistassist toggle threshold.</div><div style='width: 100%'><input class='GACustomInput' id='target1' value='" + steps[1] + "'/><input class='GACustomInput' id='target2' value='" + steps[2] + "'/><input class='GACustomInput' id='target3' value='" + steps[3] + "'/><hr class='noBotMarg'/><div id='GADisableCheck'><input type='checkbox'" + ((game.options.menu.GeneticistassistTarget.disableOnUnlock) ? " checked='true'" : "") + "' id='disableOnUnlockCheck' /> Start disabled when unlocked each run</div></div>";
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='customizeGATargets();'>Confirm</div> <div class='btn btn-danger' onclick='cancelTooltip()'>Cancel</div>"
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		
	}
	if (what == "Message Config"){
		tooltipText = "<div id='messageConfigMessage'>Here you can finely tune your message settings, to see only what you want from each category. Mouse over the name of a filter for more info.</div>";
		var msgs = game.global.messages;
		var toCheck = ["Loot", "Unlocks", "Combat"];
		tooltipText += "<div class='row'>";
		for (var x = 0; x < toCheck.length; x++){
			var name = toCheck[x];
			tooltipText += "<div class='col-xs-4'><span class='messageConfigTitle'>" + toCheck[x] + "</span><br/>";
			for (var item in msgs[name]){
				if (item == "essence" && game.global.highestLevelCleared <= 179) continue;
				if (item == 'enabled') continue;
				tooltipText += "<span class='messageConfigContainer'><span class='messageCheckboxHolder'><input id='" + name + item + "'" + ((msgs[name][item]) ? " checked='true'" : "") + "' type='checkbox' /></span><span onmouseover='messageConfigHover(\"" + name + item + "\", event)' onmouseout='tooltip(\"hide\")' class='messageNameHolder'> - " + item.charAt(0).toUpperCase() + item.substr(1) + "</span></span><br/>"; 
			}
			tooltipText += "</div>";
		}
		tooltipText += "</div>";
		
		game.global.lockTooltip = true;
		elem.style.top = "25%";
		elem.style.left = "25%";
		swapClass('tooltipExtra', 'tooltipExtraLg', elem);
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip();configMessages();'>Confirm</div> <div class='btn btn-danger' onclick='cancelTooltip()'>Cancel</div>"
	}
	if (what == "The Improbability"){
		tooltipText = "<span class='planetBreakMessage'>That shouldn't have happened. There should have been a Blimp there. Something is growing unstable.</span>";
		if (!game.global.autoUpgradesAvailable) tooltipText += "<br/><br/><span class='planetBreakMessage'><b>Your Trimps seem to understand that they'll need to help out more, and you realize how to permanently use them to automate upgrades!<b></span><br/>";
		costText = "<span class='planetBreakDescription'><span class='bad'>Trimp breed speed reduced by a factor of 10. 20% of enemy damage can now penetrate your block.</span><span class='good'> You have unlocked a new upgrade to learn a Formation. Helium harvested per zone is increased by a factor of 5. Equipment cost is dramatically cheaper. You have access to the 'Trimp' challenge!<span></span>";
		if (game.global.challengeActive == "Corrupted") costText += "<br/><br/><span class='corruptedBadGuyName'>Looks like the Corruption is starting early...</span>";
		costText += "<hr/><div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>I'll be fine</div><div class='btn btn-danger' onclick='cancelTooltip(); message(\"Sorry\", \"Notices\")'>I'm Scared</div></div>"
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (isItIn == "goldenUpgrades"){
		var upgrade = game.goldenUpgrades[what];
		var timesPurchased = upgrade.purchasedAt.length
		var s = (timesPurchased == 1) ? "" : "s";
		var three = (game.global.totalPortals >= 5) ? "three" : "two";
		tooltipText += " <b>You can only choose one of these " + three + " Golden Upgrades. Choose wisely...</b><br/><br/> Each time Golden Upgrades are unlocked, they will increase in strength. You are currently gaining " + prettify(upgrade.currentBonus * 100) + "% from purchasing this upgrade " + timesPurchased + " time" + s + " since your last portal.";
		if (what == "Void" && ((game.goldenUpgrades.Void.currentBonus + game.goldenUpgrades.Void.nextAmt()) >= 0.60)) tooltipText += "<br/><b class='red'>This upgrade would put you over 60% increased Void Map chance, which would destabilize the universe. You don't want to destabilize the universe, do you?</b>";
		costText = "Free";
		if (getAvailableGoldenUpgrades() > 1) costText += " (" + getAvailableGoldenUpgrades() + " remaining)";
		what = "Golden " + what + " (Tier " + romanNumeral(game.global.goldenUpgrades + 1) + ")";
	}
	if (isItIn == "talents"){
		var talent = game.talents[what];
		tooltipText = talent.description;
		var nextTalCost = getNextTalentCost();
		if (getHighestTalentTier() < talent.tier) costText = "<span style='color: red'>Locked</span>";
		else if (typeof talent.requires !== 'undefined' && !game.talents[talent.requires].purchased)
			costText = "<span style='color: red'>Requires " + game.talents[talent.requires].name + "</span>";
		else if (talent.purchased)
			costText = "<span style='color: green'>Purchased</span>";
		else if (game.global.essence < nextTalCost)
			costText = "<span style='color: red'>" + prettify(nextTalCost) + " Dark Essence (Use Scrying Formation to earn more)</span>";
		else costText = prettify(nextTalCost) + " Dark Essence";
		what = talent.name;
	}
	if (what == "Corruption"){
		if (game.global.challengeActive == "Corrupted"){
			tooltipText = "<span class='planetBreakMessage'>Though you've seen the Corruption grow since the planet broke, you can now see a giant spire pumping out tons of the purple goo. Things seem to be absorbing it at a higher rate now.</span><br/>";
			costText += "<span class='planetBreakDescription'><span class='bad'>Improbabilities and Void Maps are now more difficult.</span> <span class='good'>Improbabilities and Void Maps now drop 2x helium.</span></span>";
		}
		else {
			tooltipText = (game.talents.headstart.purchased) ? "Off in the distance, you can see a giant spire grow larger as you approach it." : "You can now see a giant spire only about 20 zones ahead of you.";
			tooltipText = "<span class='planetBreakMessage'>" + tooltipText + " Menacing plumes of some sort of goopy gas boil out of the spire and appear to be tainting the land even further. It looks to you like the zones are permanently damaged, poor planet. You know that if you want to reach the spire, you'll have to deal with the goo.</span><br/>";
			costText = "<span class='planetBreakDescription'><span class='bad'>From now on as you press further through zones, more and more corrupted cells of higher and higher difficulty will begin to spawn. Improbabilities and Void Maps are now more difficult.</span> <span class='good'>Improbabilities and Void Maps now drop 2x helium. Each corrupted cell will drop 15% of that zone's helium reward.</span></span> ";
		}
		costText += "<hr/><div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Bring it on</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Spire"){
		tooltipText = "<span class='planetBreakMessage'>The Spire looms menacingly above you, and you take in a deep breath of corruption. You take a look back at your Trimps to help gather some courage, and you push the door open. You slowly walk inside and are greeted by an incredibly loud, deep, human voice.<br/><br/><b>Do you know what you face? If you are defeated ten times in this place, you shall be removed from this space. If you succeed, then you shall see the light of knowledge that you seek.</b><span>";
		tooltipText += "<br/><hr/><span class='planetBreakDescription'><span class='bad'>This zone is considerably more difficult than the previous and next zones. If 10 groups of Trimps die in combat while in the spire, the world will return to normal.</span> <span class='good'>Each cell gives more and more helium. Every 10th cell gives a larger reward, and increases all loot gained until your next portal by 2% (including helium).</span>";
		if (game.options.menu.mapsOnSpire.enabled) tooltipText += "<br/><hr/>You were moved to Maps to protect your limited chances at the spire. You can disable this in settings!";
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='startSpire(true)'>Bring it on</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Exit Spire"){
		tooltipText = "This will exit the spire, and you will be unable to re-enter until your next portal. Are you sure?";
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='cancelTooltip(); endSpire()'>Exit Spire</div><div class='btn btn-danger' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";		
	}
	if (what == "Respec Talents"){
		tooltipText = "This will return all Dark Essence that was spent on talents at the cost of 20 bones. Are you sure?";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip(); respecTalents(true)'>Respec</div><div class='btn btn-danger' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";		
	}
	if (what == "The Geneticistassist"){
		tooltipText = "Greetings, friend! I'm your new robotic pal <b>The Geneticistassist</b> and I am here to assist you with your Geneticists. I will hang out in your Jobs tab, and will appear every run after Geneticists are unlocked. You can customize me in Settings under 'General'!";
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Thanks, Geneticistassist!</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "MagnetoShriek"){
		var shriekValue = ((1 - game.mapUnlocks.roboTrimp.getShriekValue()) * 100).toFixed(1);
		tooltipText = "Your pet RoboTrimp seems to be gifted at distorting the magnetic field around certain bad guys, especially Improbabilities. You can activate this ability once every 5 zones in order to tell your RoboTrimp to reduce the attack damage of the next Improbability by " + shriekValue + "%. This must be reactivated each time it comes off cooldown.";
		tooltipText += "<span id='roboTrimpTooltipActive' style='font-weight: bold'><br/><br/>";
		tooltipText += (game.global.useShriek) ? "MagnetoShriek is currently active and will fire on the next Improbability." : "MagnetoShriek is NOT active and will not fire.";
		tooltipText += "</span>";
		costText = "";
		//elem.style.top = "55%";
	}
	if (what == "Reset"){
		tooltipText = "Are you sure you want to reset? This will really actually reset your game. You won't get anything cool. It will be gone. <b style='color: red'>This is not the soft-reset you're looking for. This will delete your save.</b>";
		costText="<div class='maxCenter'><div class='btn btn-danger' onclick='resetGame();unlockTooltip();tooltip(\"hide\")'>Delete Save</div> <div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Fight"){
		tooltipText = "Send your poor Trimps to certain doom in the battlefield. You'll get cool stuff though, they'll understand.";
		var soldiers = (game.portal.Coordinated.level) ? game.portal.Coordinated.currentSend : game.resources.trimps.maxSoldiers;
		costText = (soldiers > 1) ? "s" : "";
		costText = prettify(soldiers) + " Trimp" + costText;
	}
	if (what == "AutoFight"){
		tooltipText = "Allow the Trimps to start fighting on their own whenever their town gets overcrowded";
		costText = "";
	}
	if (what == "New Achievements"){
		tooltipText = "The universe has taken an interest in your achievements, and has begun tracking them. You already have some completed thanks to your previous adventures, would you like to see them?";
		costText = "<div class='maxCenter'><div class='btn btn-success' onclick='toggleAchievementWindow(); cancelTooltip()'>Check Achievements</div> <div class='btn btn-danger' onclick='cancelTooltip()'>No, That Sounds Dumb</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}	
	if (what == "Queue"){
		tooltipText = "This is a building in your queue, you'll need to click \"Build\" to build it. Clicking an item in the queue will cancel it for a full refund.";
		costText = "";
	}
	if (what == "Toxic" && isItIn != "dailyStack"){
		tooltipText = "This bad guy is toxic. You will find " + (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks).toFixed(1) + "% more loot! Oh, also, this bad guy has 5x attack, 2x health, your Trimps will lose 5% health each time they attack, and the toxic air is causing your Trimps to breed " + (100 - (Math.pow(game.challenges.Toxicity.stackMult, game.challenges.Toxicity.stacks) * 100)).toFixed(2) + "% slower. These stacks will reset after clearing the zone.";
		costText = "";
	}
	if (what == "Momentum"){
		var stacks = game.challenges.Lead.stacks;
		tooltipText = "This bad guy has " + prettify(stacks * 4) + "% more damage and health, pierces an additional " + (stacks * 0.1).toFixed(1) + "% block, and each attack that does not kill it will cause your Trimps to lose " + (stacks * 0.03).toFixed(2) + "% of their health.";
		costText = "";
	}
	if (what == "Custom"){
		customUp = (textString) ? 2 : 1;
		tooltipText = "Type a number below to purchase a specific amount. You can also use shorthand such as 2e5 and 200k to select that large number, or fractions such as 1/2 and 50% to select that fraction of your available workspaces."
		if (textString) tooltipText += " <b>Max of 1,000 for most perks</b>";
		tooltipText += "<br/><br/><input id='customNumberBox' style='width: 50%' value='" + ((!isNaN(game.global.lastCustomExact)) ? prettify(game.global.lastCustomExact) : game.global.lastCustomExact) + "' />";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='numTab(5, " + textString + ")'>Apply</div><div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		ondisplay = function() {
			var box = document.getElementById("customNumberBox");
			// Chrome chokes on setSelectionRange on a number box; fall back to select()
			try { box.setSelectionRange(0, box.value.length); } 
			catch (e) { box.select(); }
			box.focus();
		};
		noExtraCheck = true;
	}
	if (what == "Max"){
		tooltipText = "No reason to spend everything in one place! Here you can set the ratio of your resources to spend when using the 'Max' button. Setting this to 0.5 will spend no more than half of your resources per click, etc."
		costText = "<ul id='buyMaxUl'><li onclick='setMax(1)'>Max</li><li onclick='setMax(0.5)'>0.5</li><li onclick='setMax(0.33)'>0.33</li><li onclick='setMax(0.25)'>0.25</li><li onclick='setMax(0.1)'>0.1</li></ul>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Export"){
		if (textString){
			tooltipText = textString + "<br/><br/><textarea spellcheck='false' style='width: 100%' rows='5'>" + save(true) + "</textarea>";
			what = "Thanks!";
		}
		else
		tooltipText = "This is your save string. There are many like it but this one is yours. Save this save somewhere safe so you can save time next time. <br/><br/><textarea spellcheck='false' id='exportArea' style='width: 100%' rows='5'>" + save(true) + "</textarea>";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip()'>Got it</div>"
		if (document.queryCommandSupported('copy')){
			costText += "<div id='clipBoardBtn' class='btn btn-success'>Copy to Clipboard</div>";
			ondisplay = function(){
				document.getElementById('exportArea').select();
				document.getElementById('clipBoardBtn').addEventListener('click', function(event) {
				    document.getElementById('exportArea').select();
					  try {
						document.execCommand('copy');
					  } catch (err) {
						document.getElementById('clipBoardBtn').innerHTML = "Error, not copied";
					  }
				});
			}
		}
		else ondisplay = function () {document.getElementById('exportArea').select}
		costText += "</div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Import"){
		tooltipText = "Import your save string! It'll be fun, I promise.<br/><br/><textarea spellcheck='false' id='importBox' style='width: 100%' rows='5'></textarea>";
		costText="<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip(); load(true);'>Import</div>"
		if (playFabId != -1) costText += "<div class='btn btn-primary' onclick='loadFromPlayFab()'>Import From PlayFab</div>";
		costText += "<div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		ondisplay = function () {
			document.getElementById('importBox').focus();
		}
	}
	if (what == "AutoPrestige"){
		tooltipText = '<p>Your scientists have come a long way since you first crashed here, and can now purchase prestige upgrades automatically for you with hardly any catastrophic mistakes. They understand the word "No" and the following three commands: </p><p><b>AutoPrestige All</b> will always purchase the cheapest prestige available first.</p><p><b>Weapons Only</b> as you may be able to guess, will only purchase Weapon prestiges.</p><p><b>Weapons First</b> will only purchase Weapon prestiges unless the cheapest Armor prestige is less than 5% of the cost of the cheapest Weapon.</p>';
	}
	if (what == "AutoUpgrade"){
		tooltipText = "Your scientists can finally handle some upgrades on their own! Toggling this on will cause most upgrades to be purchased automatically. Does not include equipment prestiges or upgrades that would trigger a confirmation popup.";
	}
	if (what == "Recycle All"){
		tooltipText = "Recycle all maps below the selected level.";
	}
	if (what == "PlayFab Login"){
		var tipHtml = getPlayFabLoginHTML();
		tooltipText = tipHtml[0];
		costText = tipHtml[1];
		game.global.lockTooltip = true;
		elem.style.top = "15%";
		elem.style.left = "25%";
		swapClass('tooltipExtra', 'tooltipExtraLg', elem);

	}
	if (what == "PlayFab Conflict"){
		tooltipText = "It looks like your save stored at PlayFab is further along than the save on your computer.<br/><b>Your save on PlayFab has earned " + prettify(textString) + " total Helium, defeated Zone " + attachFunction + ", and cleared " + prettify(numCheck) + " total Zones. The save on your computer only has " + prettify(game.global.totalHeliumEarned) + " total Helium, has defeated Zone " + game.global.highestLevelCleared + ", and cleared " + prettify(game.stats.zonesCleared.value + game.stats.zonesCleared.valueTotal) + " total Zones.</b><br/>Would you like to Download your save from PlayFab, Overwrite your online save with this one, or Cancel and do nothing?";
		costText = "<span class='btn btn-primary' onclick='playFabFinishLogin(true)'>Download From PlayFab</span><span class='btn btn-warning' onclick='playFabFinishLogin(false)'>Overwrite PlayFab Save</span><span class='btn btn-danger' onclick='cancelPlayFab();'>Cancel</span>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
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
		if (buyAmt == "Max") buyAmt = calculateMaxAfford(game.jobs[what], false, false, true);
		if (game.global.firing){
			var firstChar = what.charAt(0);
			var aAn = (firstChar == "A" || firstChar == "E" || firstChar == "I" || firstChar == "O" || firstChar == "U") ? " an " : " a ";
			tooltipText = "Fire " + aAn + " " + what + ". Refunds no resources, but frees up some workspace for your Trimps.";
			costText = "";
		}
		else{
			var workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
			if (workspaces < buyAmt) buyAmt = workspaces;
			costText = getTooltipJobText(what, buyAmt);
		}
		if (buyAmt > 1) what += " X " + prettify(buyAmt);
	}
	if (isItIn == "buildings"){
		costText = canAffordBuilding(what, false, true);
		if (game.global.buyAmt != 1) {
			if (game.buildings[what].percent){
				tooltipText += " <b>You can only purchase 1 " + what + " at a time.</b>";
				what += " X 1";
			}
			else {
				what += " X " + prettify((game.global.buyAmt == "Max") ? calculateMaxAfford(game.buildings[what], true) : game.global.buyAmt);
			}
		}
	}
	if (isItIn == "portal"){
		var resAppend = (game.global.kongBonusMode) ? " Bonus Points" : " Helium Canisters";
		var perkItem = game.portal[what];
		if (!perkItem.max || perkItem.max > perkItem.level + perkItem.levelTemp) costText = prettify(getPortalUpgradePrice(what)) + resAppend;
		else costText = "";
		if (game.global.buyAmt > 1) what += " X " + game.global.buyAmt;
		tooltipText += " <b>(You have spent " + prettify(perkItem.heliumSpent + perkItem.heliumSpentTemp) + " Helium on this Perk)</b>";
		what = what.replace("_", " ");
	}
	if (isItIn == "equipment"){
		costText = canAffordBuilding(what, false, true, true);
		if (what == "Shield" && game.equipment.Shield.blockNow){
			var blockPerShield = game.equipment.Shield.blockCalculated + (game.equipment.Shield.blockCalculated * game.jobs.Trainer.owned * (game.jobs.Trainer.modifier / 100));
			tooltipText += " (" + prettify(blockPerShield) + " after Trainers)";
		}
		if (game.global.buyAmt != 1) {
			what += " X " + ((game.global.buyAmt == "Max") ? calculateMaxAfford(game.equipment[what], false, true) : game.global.buyAmt);
		}
	}
	if (isItIn == "upgrades"){
		var mouseOverElem = (lastMousePos[0] && lastMousePos[1]) ? document.elementFromPoint(lastMousePos[0], lastMousePos[1]) : null;
		if (mouseOverElem && mouseOverElem.id == "upgradesHere"){
			cancelTooltip();
			return;
		}
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
		if (typeof tooltipText.split('?')[1] !== 'undefined' && what != 'Dominance'){
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
		costText = ' <div class="maxCenter" id="confirmTipCost"><div id="confirmTooltipBtn" class="btn btn-info" onclick="' + attachFunction + '">' + renameBtn + '</div><div class="btn btn-danger" onclick="cancelTooltip()">Cancel</div></div>';
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (isItIn == 'customText') {
		costText = "";
		tooltipText = textString;
		noExtraCheck = true;
	}
	if (!noExtraCheck){
		var tipSplit = tooltipText.split('$');
		if (typeof tipSplit[1] !== 'undefined'){
			if (tipSplit[1] == 'incby'){
				var increase = toTip.increase.by;
				if (game.portal.Carpentry.level && toTip.increase.what == "trimps.max") increase *= Math.pow(1.1, game.portal.Carpentry.level);
				if (game.portal.Carpentry_II.level && toTip.increase.what == "trimps.max") increase *= (1 + (game.portal.Carpentry_II.modifier * game.portal.Carpentry_II.level));
				tooltipText = tipSplit[0] + prettify(increase) + tipSplit[2];
			}
			else if (isItIn == "jobs" && toTip.increase != "custom"){
				var newValue = toTip[tipSplit[1]];
				if (game.portal.Motivation.level > 0) newValue *= (1 + (game.portal.Motivation.level * 0.05));
				if (game.portal.Motivation_II.level > 0) newValue *= (1 + (game.portal.Motivation_II.level * game.portal.Motivation_II.modifier));
				tooltipText = tipSplit[0] + prettify(newValue) + tipSplit[2];
			}
			else
			tooltipText = tipSplit[0] + prettify(toTip[tipSplit[1]]) + tipSplit[2];
		}
		if (isItIn == "buildings" && what.split(' ')[0] == "Warpstation" && game.global.lastWarp) {
			tooltipText += "<b> You had " + game.global.lastWarp + " Warpstations when you purchased your last Gigastation (" + game.upgrades.Gigastation.done + ").</b>";
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
	}
	document.getElementById("tipTitle").innerHTML = what;
	document.getElementById("tipText").innerHTML = tooltipText;
	document.getElementById("tipCost").innerHTML = costText;
	elem.style.display = "block";
	if (ondisplay !== null)
		ondisplay();
	if (event != "update") positionTooltip(elem, event, renameBtn);
}

function checkAlert(what, isItIn){
	if (document.getElementById(what + "Alert") === null) return;
		if (typeof game[isItIn] !== 'undefined') game[isItIn][what].alert = false;
		else return;
		document.getElementById(what + "Alert").innerHTML = "";
		if (document.getElementById(isItIn + "Alert") !== null)	document.getElementById(isItIn + "Alert").innerHTML = "";
}

function countAlertsIn(where){
	var count = 0;
	where = game[where];
	for (var item in where){
		item = where[item];
		if (item.alert) count++;
	}
	return count;
}

function positionTooltip(elem, event, extraInf){
	var cordx = 0;
	var cordy = 0;
	var e = event || window.event;
	if (!e) return;
	if (e.pageX || e.pageY) {
		cordx = e.pageX;
		cordy = e.pageY;
	} else if (e.clientX || e.clientY) {
		cordx = e.clientX;
		cordy = e.clientY;
	}
	lastMousePos = [cordx, cordy];
	var bodw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		bodh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		tiph = Math.max(elem.clientHeight, elem.scrollHeight, elem.offsetHeight),
		tipw = bodw * .325,
		center = cordx - (tipw / 2),
		spacing = bodh * 0.04,
		setLeft,
		setTop,
		setting;
		if (extraInf == "Heirloom") setting = 1;
		else setting = game.options.menu.tooltipPosition.enabled;
	if (setting == 0) {
		setLeft = cordx + spacing;
		if ((setLeft + tipw) > bodw) setLeft = (bodw - tipw);
		setTop = cordy - tiph - spacing;
	}
	if ((setting >= 1) || (setTop < 0)){
		setLeft = center;
		if (setLeft < 0) 
			setLeft = 0;
		else if (setLeft > (bodw - tipw)) 
			setLeft = bodw - tipw;
		var maxAbove = (cordy - tiph - spacing);
		if (setting == 1 ||  (maxAbove < 0)){
			setTop = cordy + spacing;
			if ((setTop + tiph) > bodh)
				setTop = maxAbove;
		}
		else
			setTop = maxAbove;
	}
	elem.style.left = Math.floor(setLeft) + "px";
	elem.style.top = Math.floor(setTop) + "px";
}

function addTooltipPricing(toTip, what, isItIn) {
	var costText = "";
	var price;
	var canAfford;
	var percentOfTotal = "";
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
	return costText;
}

function configMessages(){
	var toCheck = ["Loot", "Unlocks", "Combat"];
	for (var x = 0; x < toCheck.length; x++){
		var name = toCheck[x];
		for (var item in game.global.messages[name]){
			if (item == "enabled") continue;
			var checkbox = document.getElementById(name + item);
			if (checkbox == null) continue;
			game.global.messages[name][item] = checkbox.checked;
		}
	}
}

function messageConfigHover(what, event){
	var text = "";
	var title = "";
	switch(what){
		case 'Lootprimary':
			text = "Log the common loot items: Food, Wood, and Metal.";
			title = "Primary";
			break;
		case 'Lootsecondary':
			text = "Log the less common loot items: Gems, Fragments, Territory Bonus, and others.";
			title = "Secondary";
			break;
		case 'Lootevents':
			text = "Log drops and messages from temporary events, such as holidays.";
			title = "Events";
			break;
		case 'Lootexotic':
			text = "Log the rewards granted by Exotic Imports.";
			title = "Exotic";
			break;
		case 'Loothelium':
			text = "Log Helium rewards.";
			title = "Helium";
			break;
		case 'Unlocksrepeated':
			text = "Log all unlocks that drop more than once per run, such as Speedfarming or Coordination.";
			title = "Repeated";
			break;
		case 'Unlocksunique':
			text = "Log all unlocks that only drop once per portal, such as Gyms or Miners.";
			title = "Unique";
			break;
		case 'Combattrimp':
			text = "Log all combat messages involving your Trimps.";
			title = "Trimp";
			break;
		case 'Combatenemy':
			text = "Log all combat messages involving the enemy.";
			title = "Enemy";
			break;
		case 'Lootessence':
			text = "Log all Dark Essence found by scrying.";
			title = "Dark Essence";
			break;
		default: return;
	}
	document.getElementById('messageConfigMessage').innerHTML = "<b>" + title + "</b> - " + text;
	tooltip(title, 'customText', event, text);
}

// Correct function to call to cancel the current tooltip
function cancelTooltip(){
	unlockTooltip();
	tooltip("hide");
	tooltipUpdateFunction = "";
	document.getElementById("tipCost").innerHTML = "";
	customUp = 0;
	lastMousePos = [0, 0];
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
	if (game.portal.Motivation_II.level > 0){
		var motivationStrength = (game.portal.Motivation_II.level * game.portal.Motivation_II.modifier);
		currentCalc  *= (motivationStrength + 1);
		motivationStrength = prettify(motivationStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>Motivation_II</td><td class='bdPercent'>+ " + motivationStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Meditation
	if (game.portal.Meditation.level > 0){
		var meditation = game.portal.Meditation;
		var medStrength = meditation.getBonusPercent();
		if (medStrength > 0){
			currentCalc *= (1 + (medStrength * .01)).toFixed(2);
			textString += "<tr><td class='bdTitle'>Meditation</td><td class='bdPercent'>" + (meditation.getBonusPercent(true) * 10) + " minutes (+" + medStrength + "%)</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}	
	}
	//Add Size (challenge)
	if (game.global.challengeActive == "Size"){
		currentCalc *= 1.5;
		textString += "<tr><td class='bdTitle'>Huge (Size)</td><td class='bdPercent'>+ 50%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}	//Add meditate (challenge)
	if (game.global.challengeActive == "Meditate"){
		currentCalc *= 1.25;
		textString += "<tr><td class='bdTitle'>Meditate</td><td class='bdPercent'>+ 25%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Toxicity"){
		var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
		currentCalc *= (1 + toxMult);
		toxMult = (toxMult * 100).toFixed(1) + "%";
		textString += "<tr><td class='bdTitle'>Tweaky (Toxicity)</td><td class='bdPercent'>+ " + toxMult + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Balance"){
		currentCalc *= game.challenges.Balance.getGatherMult();
		textString += "<tr><td class='bdTitle'>Strength (Balance)</td><td class='bdPercent'>+ " + game.challenges.Balance.getGatherMult(true) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Decay"){
		currentCalc *= 10;
		textString += "<tr><td class='bdTitle'>Sanity (Decay)</td><td class='bdPercent'>x 10</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		var stackStr = Math.pow(0.995, game.challenges.Decay.stacks);
		currentCalc *= stackStr;
		textString += "<tr style='color: red'><td class='bdTitle'>Decay</td><td class='bdPercent'>x " + stackStr.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Watch"){
		currentCalc /= 2;
		textString += "<tr style='color: red'><td class='bdTitle'>Sleepy (Watch)</td><td class='bdPercent'>50%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}	
	if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Determined (Lead)</td><td class='bdPercent'>+ 100%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Daily"){
		var mult = 0;
		if (typeof game.global.dailyChallenge.dedication !== 'undefined'){
			mult = dailyModifiers.dedication.getMult(game.global.dailyChallenge.dedication.strength);
			currentCalc *= mult;
			textString += "<tr><td class='bdTitle'>Dedicated (Daily)</td><td class='bdPercent'>+ " + prettify((mult * 100) - 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
		if (typeof game.global.dailyChallenge.famine !== 'undefined' && what != "fragments" && what != "science"){
			mult = dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Famine (Daily)</td><td class='bdPercent'>" + prettify(mult * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	var heirloomBonus = calcHeirloomBonus("Staff", jobs[index] + "Speed", 0, true);
	if (heirloomBonus > 0){
		currentCalc *= ((heirloomBonus / 100) + 1);
		heirloomBonus = prettify(heirloomBonus) + '%';
		textString += "<tr><td class='bdTitle'>Heirloom (Staff)</td><td class='bdPercent'>+ " + heirloomBonus + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add player
	if (game.global.playerGathering == what){
		if (game.global.turkimpTimer > 0 && (what == "food" || what == "wood" || what == "metal")){
			var tBonus = (game.talents.turkimp3.purchased) ? 75 : 50;
			currentCalc *= (1 + (tBonus / 100));
			textString += "<tr><td class='bdTitle'>Sharing Food</td><td class='bdPercent'>+ " + tBonus + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
		var playerStrength = getPlayerModifier();
		currentCalc += playerStrength;
		textString += "<tr><td class='bdTitle'>You</td><td class='bdPercent'>+ " + prettify(playerStrength) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";

	}
	//Add Loot	ALWAYS LAST
	if (game.options.menu.useAverages.enabled){
		var avg = getAvgLootSecond(what);
		if (avg > 0) {
			currentCalc += avg;
			textString += "<tr><td class='bdTitle'>Average Loot</td><td class='bdPercent'>+ " + prettify(avg) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	if (rawNum) return currentCalc;
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getPsString('" + what + "')", what.charAt(0).toUpperCase() + what.substr(1, what.length) + " Per Second", "Refresh", true);
}

function getZoneStats(event, update) {
	if (!update && game.global.lockTooltip) return;
	var textString =  "<table class='bdTable table table-striped'><tbody>";
	textString += "<tr><td class='bdTitle bdZoneTitle' colspan='3'>Zone "  + game.global.world + ", Cell " + (game.global.lastClearedCell + 2) + "</td></tr>";
	textString += "<tr><td colspan='3'>You have been in this Zone for " + formatMinutesForDescriptions((new Date().getTime() - game.global.zoneStarted) / 1000 / 60) + "</td></tr>";
	if ((game.global.mapsActive || game.global.preMapsActive) && game.global.currentMapId){
		var map = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)];
		textString += "<tr><td class='bdTitle bdZoneTitle' colspan='3'>" + map.name + ", Level " + map.level + ", Cell " + (game.global.lastClearedMapCell + 2) + "</td></tr>";
		textString += '<tr><td><span class="' + getMapIcon(map) + '"></span> ' + getMapIcon(map, true) + '</td><td><span class="icomoon icon-gift2"></span>' + Math.floor(map.loot * 100) + '%</span> <span class="icomoon icon-cube2"></span>' + map.size + ' <span class="icon icon-warning"></span>' + Math.floor(map.difficulty * 100) + '%</td><td>' + ((map.location == "Void") ? '&nbsp' : ('Items: ' + addSpecials(true, true, map))) + '</td></tr>';
		textString += "<tr><td colspan='3'>You have been on this map for " + formatMinutesForDescriptions((new Date().getTime() - game.global.mapStarted) / 1000 / 60) + "</td></tr>";
		if (map.location == "Void") textString += "<tr><td colspan='3'>You have " + game.global.totalVoidMaps + " Void Maps.</td></tr>";
	}
	textString += "</tbody></table>";
	if (update) {
		document.getElementById("tipText").innerHTML = textString;
		return;
	}
	tooltip("World Info", "customText", event, textString) 
	tooltipUpdateFunction = function() {
		getZoneStats(null, true);
	}
	
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
		textString += "<tr style='color: red'><td class='bdTitle'>Geneticist</td><td class='bdPercent'>X  " + mult.toFixed(6) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
	}
	//Add quick trimps
	if (game.unlocks.quickTrimps){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Quick Trimps</td><td class='bdPercent'>+ 100%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Daily"){
		var mult = 0;
		if (typeof game.global.dailyChallenge.dysfunctional !== 'undefined'){
			mult = dailyModifiers.dysfunctional.getMult(game.global.dailyChallenge.dysfunctional.strength);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Dysfunctional (Daily)</td><td class='bdPercent'>X  " + mult.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
		}
		if (typeof game.global.dailyChallenge.toxic !== 'undefined'){
			mult = dailyModifiers.toxic.getMult(game.global.dailyChallenge.toxic.strength, game.global.dailyChallenge.toxic.stacks);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Toxic (Daily)</td><td class='bdPercent'>X  " + mult.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"		
		}
	}
	if (game.global.challengeActive == "Toxicity" && game.challenges.Toxicity.stacks > 0){
		var potencyMod = Math.pow(game.challenges.Toxicity.stackMult, game.challenges.Toxicity.stacks);
		currentCalc *= potencyMod;
		textString += "<tr style='color: red'><td class='bdTitle'>Toxic Air</td><td class='bdPercent'>X  " + potencyMod.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
	}
	if (game.global.voidBuff == "slowBreed"){
		currentCalc *= 0.2;
		textString += "<tr style='color: red'><td class='bdTitle'>Void Gas</td><td class='bdPercent'>X  0.2</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
	}
	var heirloomBonus = calcHeirloomBonus("Shield", "breedSpeed", 0, true);
	if (heirloomBonus > 0){
		currentCalc *= ((heirloomBonus / 100) + 1);
		heirloomBonus = prettify(heirloomBonus) + '%';
		textString += "<tr><td class='bdTitle'>Heirloom (Shield)</td><td class='bdPercent'>+ " + heirloomBonus + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getTrimpPs()", "Trimps Per Second", "Refresh", true);
}

function getFluctuation(number, minFluct, maxFluct){
	var min = Math.floor(number * (1 - minFluct));
    var max = Math.ceil(number + (number * maxFluct));	
	return "<td>" + prettify(min) + "</td><td>" + prettify(max) + "</td>";
}

function getBattleStatBd(what) {
	var equipment = {};
	var name = what.charAt(0).toUpperCase() + what.substr(1, what.length);
	var textString =  "<table class='bdTableSm table table-striped'><tbody><tr><td></td><td>Base</td><td>Level</td><td>Item " + name + "</td><td>Total</td>" + ((what == "attack") ? "<td>Min</td><td>Max</td>" : "") + "</tr>";
	var currentCalc = 0;
	var maxFluct = 0.2;
	var minFluct = 0.2;
	var percent = 0;
	if (what == "health" || what == "attack"){
		currentCalc += (what == "health") ? 50 : 6;
		textString += "<tr><td class='bdTitle'>Base</td><td class='bdPercentSm'>" + prettify(currentCalc) + "</td><td></td><td></td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? "<td>-20%</td><td>+20%</td>" : "") + "</tr>";
		if (what == "attack"){
			//Discipline
			if (game.global.challengeActive == "Discipline"){
				minFluct = 0.995;
				maxFluct = 0.995;
				textString += "<tr><td class='bdTitle'>Lack Discipline</td><td class='bdPercentSm'></td><td></td><td></td><td class='bdNumberSm'></td><td>-99.5%</td><td>+99.5%</td></tr>";
			}
			else {
				//Range
					if (game.portal.Range.level > 0){
						minFluct -= (0.02 * game.portal.Range.level);
						textString += "<tr><td class='bdTitle'>Range</td><td class='bdPercentSm'>+2% Min</td><td>" + game.portal.Range.level + "</td><td>+" + prettify(2 * game.portal.Range.level) + "% Min</td><td class='bdNumberSm'></td><td>-" + prettify(minFluct * 100) + "%</td><td>+" + prettify(maxFluct * 100) + "%</td></tr>";
					}
				//MinDamageDaily
					if (typeof game.global.dailyChallenge.minDamage !== 'undefined'){
						var addMin = dailyModifiers.minDamage.getMult(game.global.dailyChallenge.minDamage.strength);
						minFluct += addMin;
						if (minFluct > 1) minFluct = 1;
						textString += "<tr style='color: red'><td class='bdTitle'>Minimalist (Daily)</td><td class='bdPercentSm'>-" + prettify(addMin * 100) + "% Min</td><td></td><td></td><td class='bdNumberSm'></td><td>-" + prettify(minFluct * 100) + "%</td><td>+" + prettify(maxFluct * 100) + "%</td></tr>";
					}
				//MaxDamageDaily
					if (typeof game.global.dailyChallenge.maxDamage !== 'undefined'){
						var addMax = dailyModifiers.maxDamage.getMult(game.global.dailyChallenge.maxDamage.strength);
						maxFluct += addMax;
						textString += "<tr><td class='bdTitle'>Prodigal (Daily)</td><td class='bdPercentSm'>+" + prettify(addMax * 100) + "% Max</td><td></td><td></td><td class='bdNumberSm'></td><td>-" + prettify(minFluct * 100) + "%</td><td>+" + prettify(maxFluct * 100) + "%</td></tr>";
					}
			}
		}
		for (var equip in game.equipment){
			var temp = game.equipment[equip];
			if (typeof temp[what] === 'undefined' || temp.level <= 0 || temp.blockNow) continue;
			var equipStrength = temp[what + "Calculated"] * temp.level;
			currentCalc += equipStrength;
			percent = ((equipStrength / game.global[what]) * 100).toFixed(1) + "%";
			textString += "<tr><td class='bdTitle'>" + equip + "</td><td>" + prettify(temp[what + "Calculated"]) + "</td><td>" + temp.level + "</td><td>" + prettify(equipStrength) + " (" + percent + ")</td><td>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
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
			trainerStrength = calcHeirloomBonus("Shield", "trainerEfficiency", trainerStrength);
			currentCalc  *= (trainerStrength + 1);
			trainerStrength = prettify(trainerStrength * 100) + "%";
			textString += "<tr><td class='bdTitle'>Trainers</td><td>" + prettify(calcHeirloomBonus("Shield", "trainerEfficiency", trainer.modifier)) + "%</td><td>" + prettify(trainer.owned) + "</td><td>+ " + trainerStrength + "</td><td>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	//Add coordination
	currentCalc  *= game.resources.trimps.maxSoldiers;
	textString += "<tr><td class='bdTitle'>Soldiers</td><td class='bdPercentSm'></td><td></td><td>x " + prettify(game.resources.trimps.maxSoldiers) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	//Add achievements
	if (what == "attack" && game.global.achievementBonus > 0){
		currentCalc *= 1 + (game.global.achievementBonus / 100);
		textString += "<tr><td class='bdTitle'>Achievements</td><td class='bdPercentSm'></td><td></td><td>+ " + game.global.achievementBonus + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>"
	}
	//Add perk
	var perk = "";
	if (what == "health") perk = "Toughness";
	if (what == "attack") perk = "Power";
	if (perk && game.portal[perk].level > 0){
		var PerkStrength = (game.portal[perk].level * game.portal[perk].modifier);
		currentCalc  *= (PerkStrength + 1);
		PerkStrength = prettify(PerkStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>" + perk + "</td><td>" + (game.portal[perk].modifier * 100) + "%</td><td>" + game.portal[perk].level + "</td><td>+ " + PerkStrength + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	perk = perk + "_II";
	if (game.portal[perk] && game.portal[perk].level > 0){
		var PerkStrength = (game.portal[perk].level * game.portal[perk].modifier);
		currentCalc  *= (PerkStrength + 1);
		PerkStrength = prettify(PerkStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>" + perk + "</td><td>" + (game.portal[perk].modifier * 100) + "%</td><td>" + game.portal[perk].level + "</td><td>+ " + PerkStrength + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
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
		var geneticistStrength = Math.pow(1.01, game.global.lastLowGen);
		currentCalc  *= geneticistStrength;
		geneticistStrength = prettify((geneticistStrength * 100) - 100) + "%";
		textString += "<tr><td class='bdTitle'>Geneticists</td><td>1%</td><td>" + prettify(game.global.lastLowGen) + "</td><td>+ " + geneticistStrength + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Anticipation
	var anticipation = game.portal.Anticipation;
	if (anticipation.level > 0 && what == "attack"){
		var antiStrength = ((anticipation.level * anticipation.modifier * game.global.antiStacks) + 1);
		currentCalc *= antiStrength;
		antiStrength = prettify((antiStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Anticipation</td><td>2% (X" + game.global.antiStacks + ")</td><td>" + prettify(anticipation.level) + "</td><td>+ " + antiStrength + "</td><td>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	
	}
	//Add formations
	if (game.global.formation > 0){
		var formStrength = 0.5;
		if ((game.global.formation == 1 && what == "health") || (game.global.formation == 2 && what == "attack") || (game.global.formation == 3 && what == "block")) formStrength = 4;
		currentCalc *= formStrength;
		textString += "<tr><td class='bdTitle'>Formation</td><td></td><td></td><td>x " + formStrength + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";

	}
	//Add Titimp
	if (game.global.titimpLeft > 1 && game.global.mapsActive && what == "attack"){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Titimp</td><td></td><td></td><td>x 2</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	//Add map bonus
	if (!game.global.mapsActive && game.global.mapBonus > 0 && what == "attack"){
		var mapBonusMult = 0.2 * game.global.mapBonus;
		currentCalc *= (1 + mapBonusMult);
		mapBonusMult *= 100;
		textString += "<tr><td class='bdTitle'>Map Bonus</td><td>20%</td><td>" + game.global.mapBonus + "</td><td>+ " + prettify(mapBonusMult) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	//Add RoboTrimp
	if (what == "attack" && game.global.roboTrimpLevel > 0){
		var roboTrimpMod = 0.2 * game.global.roboTrimpLevel;
		currentCalc *= (1 + roboTrimpMod);
		roboTrimpMod *= 100;
		textString += "<tr><td class='bdTitle'><span class='icomoon icon-chain'></span> RoboTrimp <span class='icomoon icon-chain'></span></td><td>20%</td><td>" + game.global.roboTrimpLevel + "</td><td>+ " + prettify(roboTrimpMod) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	//Add challenges
	if (what == "health" && game.global.challengeActive == "Balance"){
		currentCalc *= game.challenges.Balance.getHealthMult();
		textString += "<tr style='color: red'><td class='bdTitle'>Weakness (Balance)</td><td>1%</td><td>" + game.challenges.Balance.balanceStacks + "</td><td>- " + game.challenges.Balance.getHealthMult(true) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (what == "attack" && game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)){
		currentCalc *= 1.5;
		textString += "<tr><td class='bdTitle'>Determined (Lead)</td><td></td><td></td><td>+ 50%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	var heirloomBonus = calcHeirloomBonus("Shield", "trimp" + capitalizeFirstLetter(what), 0, true);
	if (heirloomBonus > 0){
		currentCalc *= ((heirloomBonus / 100) + 1);
		heirloomBonus = prettify(heirloomBonus) + '%';
		textString += "<tr><td class='bdTitle'>Heirloom (Shield)</td><td></td><td></td><td>+ " + heirloomBonus + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	if (game.global.challengeActive == "Decay" && what == "attack"){
		currentCalc *= 5;
		textString += "<tr><td class='bdTitle'>Sanity (Decay)</td><td></td><td></td><td class='bdPercent'>x 5</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		var stackStr = Math.pow(0.995, game.challenges.Decay.stacks);
		currentCalc *= stackStr;
		textString += "<tr style='color: red'><td class='bdTitle'>Decay</td><td>x 0.995</td><td>" + game.challenges.Decay.stacks + "</td><td class='bdPercent'>x " + stackStr.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (game.global.challengeActive == "Daily"){
		var mult = 0;
		if (typeof game.global.dailyChallenge.weakness !== 'undefined' && what == "attack"){
			mult = dailyModifiers.weakness.getMult(game.global.dailyChallenge.weakness.strength, game.global.dailyChallenge.weakness.stacks);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Weakness (Daily)</td><td>x " + dailyModifiers.weakness.getMult(game.global.dailyChallenge.weakness.strength, 1).toFixed(2) + "</td><td>" + game.global.dailyChallenge.weakness.stacks + "</td><td class='bdPercent'>x " + mult.toFixed(2) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		}
		if (typeof game.global.dailyChallenge.oddTrimpNerf !== 'undefined' && what == "attack" && (game.global.world % 2 == 1)){
			mult = dailyModifiers.oddTrimpNerf.getMult(game.global.dailyChallenge.oddTrimpNerf.strength);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Oddly Weak (Daily)</td><td>x " + mult.toFixed(2) + "</td><td></td><td class='bdPercent'>x " + mult.toFixed(2) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		}
		if (typeof game.global.dailyChallenge.evenTrimpBuff !== 'undefined' && what == "attack" && (game.global.world % 2 == 0)){
			mult = dailyModifiers.evenTrimpBuff.getMult(game.global.dailyChallenge.evenTrimpBuff.strength);
			currentCalc *= mult;
			textString += "<tr><td class='bdTitle'>Even Stronger (Daily)</td><td>x " + mult.toFixed(2) + "</td><td></td><td class='bdPercent'>+ " + prettify((mult * 100) - 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		}
		if (typeof game.global.dailyChallenge.rampage !== 'undefined' && what == "attack"){
			mult = dailyModifiers.rampage.getMult(game.global.dailyChallenge.rampage.strength, game.global.dailyChallenge.rampage.stacks);
			currentCalc *= mult;
			textString += "<tr><td class='bdTitle'>Rampage (Daily)</td><td>x " + dailyModifiers.rampage.getMult(game.global.dailyChallenge.rampage.strength, 1).toFixed(3) + "</td><td>" + game.global.dailyChallenge.rampage.stacks + "</td><td class='bdPercent'>x " + mult.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		}
	}
	//Add golden battle
	if (what != "block" && game.goldenUpgrades.Battle.currentBonus > 0){
		amt = game.goldenUpgrades.Battle.currentBonus;
		currentCalc *= 1 + amt;
		textString += "<tr><td class='bdTitle'>Golden Battle</td><td></td><td></td><td>+ " + prettify(amt * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	if (what != "block" && game.talents.voidPower.purchased && game.global.voidBuff){
		amt = (game.talents.voidPower2.purchased) ? 35 : 15;
		currentCalc *= (1 + (amt / 100));
		textString += "<tr><td class='bdTitle'>Void Power (talent)</td><td></td><td>" + ((game.talents.voidPower2.purchased) ? 2 : 1) + "</td><td>+ " + amt + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";	
	}
	var critChance = getPlayerCritChance();
	if (what == "attack" && critChance){
		var critMult = getPlayerCritDamageMult();
		currentCalc *= critMult;
		textString += "<tr class='critRow'><td class='bdTitle'>Crit Chance</td><td>" + prettify(critChance * 100) + "%</td><td class='bdTitle'>Crit Damage</td><td>+ " + prettify((critMult - 1) * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getBattleStatBd('" + what + "')", name, "Refresh", true);
	if (what == "attack"){
	var tipElem = document.getElementById('tooltipDiv')
	swapClass('tooltipExtra', 'tooltipExtraLg', tipElem);
	tipElem.style.top = "15%";
	tipElem.style.left = "25%";
	}
}

function capitalizeFirstLetter(word){
	return word.charAt(0).toUpperCase() + word.slice(1);
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
	if (game.portal.Carpentry_II.level > 0){
		var carpentryStrength = game.portal.Carpentry_II.modifier * game.portal.Carpentry_II.level;
		currentCalc  *= (1 + carpentryStrength);
		currentCalc = Math.floor(currentCalc);
		carpentryStrength = prettify(carpentryStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>Carpentry_II</td><td class='bdPercent'>+ " + carpentryStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Size Challenge
	if (game.global.challengeActive == "Size"){
		currentCalc = Math.floor(currentCalc / 2);
		textString += "<tr style='color: red'><td class='bdTitle'>Huge</td><td class='bdPercent'>X 0.5</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Daily"){
		if (typeof game.global.dailyChallenge.large !== 'undefined'){
			var mult = dailyModifiers.large.getMult(game.global.dailyChallenge.large.strength);
			currentCalc = Math.floor(currentCalc * mult);
			textString += "<tr style='color: red'><td class='bdTitle'>Large (Daily)</td><td class='bdPercent'>X " + mult.toFixed(2) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getMaxTrimps()", "Max Trimps", "Refresh", true);
}

function getMaxResources(what) {
	var structure;
	switch (what) {
		case "Food":
			structure = "Barn";
			break;
		case "Wood":
			structure = "Shed";
			break;
		case "Metal":
			structure = "Forge";
			break;
	}
	if (!structure) return;
	var structureObj = game.buildings[structure];
	var base = 500;	
	var textString =  "<table class='bdTable table table-striped'><tbody>";
	//Add base
	var currentCalc = base;
	textString += "<tr><td class='bdTitle'>Base</td><td class='bdPercent'></td><td class='bdNumber'>" + base + "</td></tr>";
	//Add structure
	var structBonus = Math.pow(2, structureObj.owned);
	currentCalc *= structBonus;
	structBonus = prettify(structBonus * 100) + "%";
	textString += "<tr><td class='bdTitle'>" + structure + "</td><td class='bdPercent'>+ " + structBonus + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	//Add packrat
	if (game.portal.Packrat.level){
		var packAmt = (game.portal.Packrat.level * 0.2) + 1;
		currentCalc *= packAmt;
		packAmt = prettify((packAmt - 1) * 100) + '%';
		textString += "<tr><td class='bdTitle'>Packrat</td><td class='bdPercent'>+ " + packAmt + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.heirlooms.Shield.storageSize.currentBonus > 0){
		var hatAmt = calcHeirloomBonus("Shield", "storageSize", 0, true);
		currentCalc *= ((hatAmt / 100) + 1);
		hatAmt = prettify(hatAmt) + '%';
		textString += "<tr><td class='bdTitle'>Heirloom (Shield)</td><td class='bdPercent'>+ " + hatAmt + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getMaxResources('" + what + "')", "Max " + what, "Refresh", true);
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
	var textString = '	<div><ul id="lootBdTabs" class="nav nav-tabs nav-justified"><li role="presentation" onclick="getLootBd(\'Food/Wood/Metal\')"><a href="#">Food/Wood/Metal</a></li>';
	if (game.global.mapsUnlocked) textString += '<li role="presentation" onclick="getLootBd(\'Fragments\')"><a href="#">Fragments</a></li><li role="presentation" onclick="getLootBd(\'Gems\')"><a href="#">Gems</a></li>';
	if (game.global.world >= 20) textString += '<li role="presentation" onclick="getLootBd(\'Helium\')"><a href="#">Helium</a></li>';
	textString += '</ul></div>';
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
				currentCalc *= (game.talents.turkimp3.purchased) ? 1.249 : 1.166;
			}
			textString += "<tr><td class='bdTitle'>Base</td><td></td><td></td><td>" + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			amt = game.resources.trimps.realMax() * 0.16;
			currentCalc *= amt;
			textString += "<tr><td class='bdTitle'>Trimps</td><td>0.16</td><td>x " + prettify(game.resources.trimps.realMax()) + "</td><td>x " + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			break;
		case "Gems":
			level = (level - 400) * 1.35;
			if (level < 0) {
				level = 0;
			}
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
			amt = Math.pow(1.15, game.global.world);
			currentCalc = amt;
			textString += "<tr><td class='bdTitle'>Base</td><td></td><td></td><td>" + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			break;
		case "Helium":
			var level = scaleLootLevel(99);
			level = Math.round((level - 1900) / 100);
			level *= 1.35;			
			if (level < 0) level = 0;
			var baseAmt = 0;
			if (game.global.world < 59) baseAmt = 1;
			else if (game.global.world < mutations.Corruption.start(true)) baseAmt = 5;
			else baseAmt = 10;
			var amt = Math.round(baseAmt * Math.pow(1.23, Math.sqrt(level)));
			amt += Math.round(baseAmt * level);
			amt /= baseAmt;
			currentCalc = amt;
			textString += "<tr><td class='bdTitle'>Base</td><td></td><td></td><td>" + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			if (baseAmt >= 5){
				currentCalc *= 5;
				textString += "<tr><td class='bdTitle'>Improbability Bonus</td><td></td><td></td><td>X 5</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (baseAmt >= 10){
				currentCalc *= 2;
				textString += "<tr><td class='bdTitle'>Corruption Bonus</td><td></td><td></td><td>X 2</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (game.global.sLevel >= 5){
				amt = Math.pow(1.005, game.global.world);
				currentCalc *= amt;
				textString += "<tr><td class='bdTitle'>Scientist V</td><td></td><td></td><td>X " + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (game.goldenUpgrades.Helium.currentBonus > 0){
				amt = game.goldenUpgrades.Helium.currentBonus;
				currentCalc *= 1 + amt;
				textString += "<tr><td class='bdTitle'>Golden Helium</td><td></td><td></td><td>+ " + prettify(amt * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (game.global.voidBuff) {
				currentCalc *= 2;
				textString += "<tr><td class='bdTitle'>Void Map</td><td></td><td></td><td>X 2</td><td>" + prettify(currentCalc) + "</td></tr>";
			}					
			
	}
	if (game.global.mapsActive && what != "Helium") {
		var compareLv = game.global.world;
		if (game.talents.mapLoot.purchased)
			compareLv--;
		if (world < compareLv){

			//-20% loot compounding for each level below world
			amt = Math.pow(0.8, (compareLv - world));
			currentCalc *= amt;
			textString += "<tr style='color: red'><td class='bdTitle'>Low Map Level</td><td>-20%</td><td>x " + (compareLv - world) + "</td><td>" + prettify(amt * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
			
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
	if (game.portal.Looting_II.level){
		amt = (1 + (game.portal.Looting_II.level * game.portal.Looting_II.modifier));
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Looting_II (perk)</td><td>+ " + prettify(game.portal.Looting_II.modifier * 100) + "%</td><td>" + game.portal.Looting_II.level + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.unlocks.impCount.Magnimp && what != "Helium"){
	
		amt = Math.pow(1.003, game.unlocks.impCount.Magnimp);
		currentCalc = Math.floor(currentCalc * amt);
		textString += "<tr><td class='bdTitle'>Magnimp</td><td>+ 0.3%</td><td>" + game.unlocks.impCount.Magnimp + "</td><td>+ " + prettify((amt - 1)  * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";

	}
	if (game.global.challengeActive == "Toxicity"){
		var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
		currentCalc *= (1 + toxMult);
		toxMult = (toxMult * 100).toFixed(1) + "%";
		textString += "<tr><td class='bdTitle'>Tweaky (Toxicity)</td><td>+" + game.challenges.Toxicity.lootMult + "%</td><td>" + game.challenges.Toxicity.stacks + "</td><td>+ " + toxMult + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Decay" && what != "Helium"){
		currentCalc *= 10;
		textString += "<tr><td class='bdTitle'>Sanity (Decay)</td><td></td><td></td><td class='bdPercent'>x 10</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		var stackStr = Math.pow(0.995, game.challenges.Decay.stacks);
		currentCalc *= stackStr;
		textString += "<tr style='color: red'><td class='bdTitle'>Decay</td><td>x 0.995</td><td>" + game.challenges.Decay.stacks + "</td><td class='bdPercent'>x " + stackStr.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Watch" && what != "Helium"){
		currentCalc /= 2;
		textString += "<tr style='color: red'><td class='bdTitle'>Sleepy (Watch)</td><td></td><td></td><td class='bdPercent'>50%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}	
	if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Determined (Lead)</td><td></td><td></td><td class='bdPercent'>+ 100%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Daily"){
		if (typeof game.global.dailyChallenge.famine !== 'undefined' && what != "Fragments" && what != "Helium"){
			mult = dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Famine (Daily)</td><td class='bdPercent'>" + prettify(mult * 100) + "%</td><td></td><td>" + prettify(mult * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
		if (typeof game.global.dailyChallenge.karma !== 'undefined' && what != "Helium"){
			mult = dailyModifiers.karma.getMult(game.global.dailyChallenge.karma.strength, game.global.dailyChallenge.karma.stacks);
			currentCalc *= mult;
			textString += "<tr><td class='bdTitle'>Karma (Daily)</td><td class='bdPercent'>x  " + mult.toFixed(3) + "</td><td></td><td>x  " + mult.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"		
		}
	}
	if (game.global.spireRows > 0){
		amt = game.global.spireRows * 0.02;
		currentCalc *= (1 + amt);
		textString += "<tr><td class='bdTitle'>Spire Rows</td><td>+ 2%</td><td>" + game.global.spireRows + "</td><td>+ " + prettify(amt * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (what != "Helium" && game.global.formation == 4 && !game.global.waitToScry){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Formation</td><td></td><td></td><td>X 2</td><td>" + prettify(currentCalc) + "</td></tr>";	
	}
	var heirloomBonus = 0;
	if (what == "Food/Wood/Metal"){
		heirloomBonus = calcHeirloomBonus("Staff", "foodDrop", 0, true);
		if (heirloomBonus > 0){
			textString += "<tr><td class='bdTitle'>Heirloom - Food (Staff)</td><td></td><td></td><td>+ " + prettify(heirloomBonus) + "%</td><td>" + prettify(currentCalc * ((heirloomBonus / 100) + 1)) + "</td></tr>";
			heirloomBonus = 0;
		}
		heirloomBonus = calcHeirloomBonus("Staff", "woodDrop", 0, true);
		if (heirloomBonus > 0){
			textString += "<tr><td class='bdTitle'>Heirloom - Wood (Staff)</td><td></td><td></td><td>+ " + prettify(heirloomBonus) + "%</td><td>" + prettify(currentCalc * ((heirloomBonus / 100) + 1)) + "</td></tr>";
			heirloomBonus = 0;
		}
		heirloomBonus = calcHeirloomBonus("Staff", "metalDrop", 0, true);
		if (heirloomBonus > 0){
			textString += "<tr><td class='bdTitle'>Heirloom - Metal (Staff)</td><td></td><td></td><td>+ " + prettify(heirloomBonus) + "%</td><td>" + prettify(currentCalc * ((heirloomBonus / 100) + 1)) + "</td></tr>";
			heirloomBonus = 0;
		}
	}
	else if (what == "Fragments"){
		heirloomBonus = calcHeirloomBonus("Staff", "fragmentsDrop", 0, true);
		if (heirloomBonus > 0){
			textString += "<tr><td class='bdTitle'>Heirloom (Staff)</td><td></td><td></td><td>+ " + prettify(heirloomBonus) + "%</td><td>" + prettify(currentCalc * ((heirloomBonus / 100) + 1)) + "</td></tr>";
			heirloomBonus = 0;
		}
	}
	else if (what == "Gems"){
		heirloomBonus = calcHeirloomBonus("Staff", "gemsDrop", 0, true);
		if (heirloomBonus > 0){
			textString += "<tr><td class='bdTitle'>Heirloom (Staff)</td><td></td><td></td><td>+ " + prettify(heirloomBonus) + "%</td><td>" + prettify(currentCalc * ((heirloomBonus / 100) + 1)) + "</td></tr>";
			heirloomBonus = 0;
		}
	}

	if (what == "Helium" && (game.global.world >= 181 || (game.global.challengeActive == 'Corrupted' && game.global.world >= 60))){
		var corrVal = (game.global.challengeActive == "Corrupted") ? 7.5 : 15;
		textString += "<tr class='corruptedCalcRow'><td class='bdTitle'>Corruption Value</td><td>" + corrVal + "%</td><td></td><td></td><td>" + prettify(currentCalc * (corrVal / 100)) + "</td></tr>";
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
	if (!isFinite(number)) return "<span class='icomoon icon-infinity'></span>";
	if (number >= 1000 && number < 10000) return Math.floor(number);
	if (number === 0) return prettifySub(0);
	if (number < 0) return "-" + prettify(-number);

	var base = Math.floor(Math.log(number)/Math.log(1000));
	if (base <= 0) return prettifySub(number);
	number /= Math.pow(1000, base);
	if (number >= 999.5) {
		// 999.5 rounds to 1000 and we don’t want to show “1000K” or such
		number /= 1000;
		++base;
	}
	
	var suffices = [
		'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud',
		'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Od', 'Nd', 'V', 'Uv', 'Dv',
		'Tv', 'Qav', 'Qiv', 'Sxv', 'Spv', 'Ov', 'Nv', 'Tt'
	];
	var suffix;
	if (game.options.menu.standardNotation.enabled == 2 || (game.options.menu.standardNotation.enabled == 1 && base > suffices.length))
		suffix = "e" + ((base) * 3);
	else if (game.options.menu.standardNotation.enabled && base <= suffices.length)
		suffix = suffices[base-1];
	else
	{
		var exponent = parseFloat(numberTmp).toExponential(2);
		exponent = exponent.replace('+', '');
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
	number = parseFloat(number);
	var floor = Math.floor(number);
	if (number === floor) // number is an integer, just show it as-is
		return number;
	var precision = 3 - floor.toString().length; // use the right number of digits

	return number.toFixed(3 - floor.toString().length);
}

function resetGame(keepPortal) {
	if (game.options.menu.pauseGame.enabled){
		game.options.menu.pauseGame.enabled = 0;
		game.options.menu.pauseGame.onToggle();
	}
	game.resources.trimps.soldiers = 0;
	game.global.autoBattle = false;
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
	var log = document.getElementById("log");
	log.innerHTML = "";
	log.scrollTop = log.scrollHeight;
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
	document.getElementById("turkimpBuff").style.display = "none";
	document.getElementById("statsBtnRow").style.display = "block";
	document.getElementById("mapsBtn").innerHTML = "Maps";
	document.getElementById("mapBonus").innerHTML = "";
	document.getElementById("roboTrimpTurnsLeft").innerHTML = "";
	swapClass("shriekState", "shriekStateCooldown", document.getElementById("chainHolder"));
	document.getElementById("chainHolder").style.visibility = "hidden";
	swapClass("dmgColor", "dmgColorWhite", document.getElementById("badGuyAttack"));
	document.getElementById("badCrit").innerHTML = "";
	document.getElementById("badCanCrit").style.display = "none";
	document.getElementById("autoUpgradeBtn").style.display = "none";
	document.getElementById("autoPrestigeBtn").style.display = "none";
	document.getElementById("voidBuff").innerHTML = "";
	document.getElementById("voidMapsHere").innerHTML = "";
	document.getElementById("heirloomWrapper").style.display = "none";
	document.getElementById("heirloomBtnContainer").style.display = "none";
	document.getElementById("goodGuyName").innerHTML = 'Trimps (<span id="trimpsFighting">1</span>) <span id="anticipationSpan"></span> <span id="titimpBuff"></span> <span id="debuffSpan"></span>';
	document.getElementById("autoStorageBtn").style.display = "none";
	document.getElementById("repeatVoidsContainer").style.display = "none";
	document.getElementById('corruptionBuff').innerHTML = "";
	document.getElementById("portalTimer").className = "timerNotPaused";
	document.getElementById("grid").className = "";
	document.getElementById('exitSpireBtnContainer').style.display = "none";
	document.getElementById('badDebuffSpan').innerHTML = "";
	swapClass("col-xs", "col-xs-10", document.getElementById("gridContainer"));
	swapClass("col-xs", "col-xs-off", document.getElementById("extraMapBtns"));			
	heirloomsShown = false;
	goldenUpgradesShown = false;
	game.global.selectedHeirloom = [];
	resetOnePortalRewards();
	playFabLoginErrors = 0;
	
	setFormation("0");
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
	var pres;
	var roboTrimp;
	var autoStorage;
	var heirloomStuff = {};
	var lastPortal;
	var autoStorageActive;
	var autoPrestiges;
	var autoUpgrades;
	var heirloomBoneSeed;
	var voidMaxLevel;
	var autoUpgradesAvailable;
	var rememberInfo;
	var playFabLoginType;
	var GeneticistassistSetting;
	var Geneticistassist
	var GeneticistassistSteps;
	var essence;
	var spentEssence;
	var talents;
	var decayDone;
	var recentDailies;
	var trapBuildToggled;
	if (keepPortal){
		portal = game.portal;
		helium = game.global.heliumLeftover;
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
		autoStorage = game.global.autoStorageAvailable;
		autoUpgradesAvailable = game.global.autoUpgradesAvailable;
		decayDone = game.global.decayDone;
		if (game.global.dailyHelium) game.global.tempHighHelium -= game.global.dailyHelium;
		bestHelium = (game.global.tempHighHelium > game.global.bestHelium) ? game.global.tempHighHelium : game.global.bestHelium;
		if (game.stats.bestHeliumHour.valueTotal < game.stats.heliumHour.value(true)){
			game.stats.bestHeliumHour.valueTotal = game.stats.heliumHour.value(true);
		}
		stats = game.stats;
		repeat = game.global.repeatMap;
		if (game.global.selectedChallenge) challenge = game.global.selectedChallenge;
		achieves = game.achievements;
		pres = game.global.presimptStore;
		roboTrimp = game.global.roboTrimpLevel;
		lastPortal = game.global.world;
		recentDailies = game.global.recentDailies;
		trapBuildToggled = game.global.trapBuildToggled;
		recycleAllExtraHeirlooms();
		heirloomStuff = {
			heirloomsCarried: game.global.heirloomsCarried,
			StaffEquipped: game.global.StaffEquipped,
			ShieldEquipped: game.global.ShieldEquipped,
			nullifium: game.global.nullifium,
			maxCarriedHeirlooms: game.global.maxCarriedHeirlooms,
		};
		autoStorageActive = game.global.autoStorage;
		autoPrestiges = game.global.autoPrestiges;
		autoUpgrades = game.global.autoUpgrades;
		heirloomBoneSeed = game.global.heirloomBoneSeed;
		voidMaxLevel = game.global.voidMaxLevel;
		playFabLoginType = game.global.playFabLoginType;
		rememberInfo = game.global.rememberInfo;
		GeneticistassistSetting = game.global.GeneticistassistSetting;
		Geneticistassist = game.global.Geneticistassist;
		GeneticistassistSteps = game.global.GeneticistassistSteps;
		essence = game.global.essence;
		talents = game.talents;
		spentEssence = game.global.spentEssence;
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
		game.global.recentDailies = recentDailies;
		if (challenge == "Daily") game.global.dailyChallenge = getDailyChallenge(readingDaily, true, false);
		game.global.sLevel = sLevel;
		game.global.lastSkeletimp = lastSkele;
		game.global.totalHeliumEarned = totalHeliumEarned;
		game.global.prisonClear = prison;
		game.global.frugalDone = frugal;
		game.global.slowDone = slow;
		game.global.autoStorageAvailable = autoStorage;
		game.global.roboTrimpLevel = roboTrimp;
		game.global.lastPortal = lastPortal;
		game.global.autoStorage = autoStorageActive;
		game.global.autoPrestiges = autoPrestiges;
		game.global.autoUpgrades = autoUpgrades;
		game.global.autoUpgradesAvailable = autoUpgradesAvailable;
		game.global.playFabLoginType = playFabLoginType;
		game.global.rememberInfo = rememberInfo;
		game.global.heirloomBoneSeed = heirloomBoneSeed;
		game.global.trapBuildToggled = trapBuildToggled;
		game.global.GeneticistassistSetting = (game.options.menu.GeneticistassistTarget.disableOnUnlock) ? -1 : GeneticistassistSetting;
		game.global.Geneticistassist = Geneticistassist;
		game.global.GeneticistassistSteps = GeneticistassistSteps;
		game.global.essence = essence;
		game.global.spentEssence = spentEssence;
		game.talents = talents;
		game.global.decayDone = decayDone;
		for (var statItem in stats){
			statItem = stats[statItem];
			if (typeof statItem.value !== 'undefined' && typeof statItem.valueTotal !== 'undefined' && !statItem.noAdd) statItem.valueTotal += statItem.value;
			if (typeof statItem.value !== 'undefined' && typeof statItem.value !== 'function') statItem.value = 0;
			if (typeof statItem.onPortal === 'function') statItem.onPortal();
		}
		game.stats = stats;
		game.global.repeatMap = repeat;

		if (sLevel >= 1) applyS1();
		if (sLevel >= 2) applyS2();
		if (sLevel >= 3) applyS3();
		if (sLevel >= 4) game.buildings.Warpstation.craftTime = 0;
		if (sLevel >= 5) applyS5();
		if (game.global.autoUpgradesAvailable) document.getElementById("autoUpgradeBtn").style.display = "block";
		if (game.global.autoStorageAvailable) {
			document.getElementById("autoStorageBtn").style.display = "block";
			toggleAutoStorage(true);
		}
		if (challenge !== "" && typeof game.challenges[challenge].start !== 'undefined') game.challenges[challenge].start();
		game.portal.Coordinated.currentSend = 1;
		if (pres == "gems" || pres == "fragments"){
			pres = "food";
		}
		game.global.presimptStore = pres;
		swapClass("psColor", "psColorWhite", document.getElementById("trimpsPs"));
		for (var heirItem in heirloomStuff){
			game.global[heirItem] = heirloomStuff[heirItem];
		}
		if (game.global.totalPortals == 1) game.options.menu.extraMapBtns.enabled = 1;
		if (game.global.totalPortals == 5) message("Heavy use of the portal has created a chance for the Void to seep in to your world. Be alert.", "Story", null, "voidMessage");
		if (game.global.totalPortals >= 5) document.getElementById("heirloomBtnContainer").style.display = "block";
		recalculateHeirloomBonuses();
		if (lastPortal < voidMaxLevel) {
			voidMaxLevel = Math.floor(voidMaxLevel * 0.95);
			if (voidMaxLevel < lastPortal) voidMaxLevel = lastPortal;
		}
		game.global.voidMaxLevel = voidMaxLevel;
	}
	else {
		game.options.menu.darkTheme.enabled = 0;
		game.options.menu.darkTheme.restore();
		game.options.menu.usePlayFab.enabled = 0;
		toggleSetting("usePlayFab", null, false, true);
		playFabId = -1;
	}
	numTab(1);
	pauseFight(true);
	repeatClicked(true);
	toggleAutoTrap(true);
	toggleAutoUpgrades(true);
	toggleAutoPrestiges(true);
	toggleVoidMaps(true);
	fireMode(true);
	resetAdvMaps();
	cancelPortal();
	updateRadioStacks();
	updateDecayStacks();
	updateAntiStacks();
	setNonMapBox();
	initTalents();
	game.options.menu.tinyButtons.onToggle();
	if (keepPortal) checkAchieve("portals");
	document.getElementById("goodGuyAttack").innerHTML = "";
	document.getElementById("goodGuyBlock").innerHTML = "";
	document.getElementById("goodGuyBar").style.width = "0%";
	document.getElementById("goodGuyHealth").innerHTML = "0";
	document.getElementById("goodGuyHealthMax").innerHTML = "0";
	document.getElementById("trimpsFighting").innerHTML = "1";
	document.getElementById("critSpan").innerHTML = "";
}

function applyS1(){
	game.resources.science.owned += 5000;
	fadeIn("science", 10);
	document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades";
	game.resources.wood.owned += 100;
	game.resources.food.owned += 100;
	game.buildings.Trap.owned += 10;
	fadeIn("trimps", 10);
	game.global.autoCraftModifier += 0.25;
	document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 4) + " Foremen";
}

function applyS2(){
	game.triggers.upgrades.fire();
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
//4.39Qi 
function applyS5(){
	game.global.playerModifier = 10;
	game.buildings.Barn.owned = 50;
	game.buildings.Barn.purchased = 50;
	game.resources.food.max = 562949953421312000;
	game.buildings.Shed.owned = 50;
	game.buildings.Shed.purchased = 50;
	game.resources.wood.max = 562949953421312000;
	game.buildings.Forge.owned = 50;
	game.buildings.Forge.purchased = 50;
	game.resources.metal.max = 562949953421312000;
}


function message(messageString, type, lootIcon, extraClass, extraTag, htmlPrefix) {
	if (extraTag && typeof game.global.messages[type][extraTag] !== 'undefined' && !game.global.messages[type][extraTag]) return;
	var log = document.getElementById("log");
	var needsScroll = ((log.scrollTop + 10) > (log.scrollHeight - log.clientHeight));
	var displayType = (game.global.messages[type].enabled) ? "block" : "none";
	var prefix = "";
	var addId = "";
	if (messageString == "Game Saved!" || extraClass == 'save') {
		addId = " id='saveGame'";
		if (document.getElementById('saveGame') !== null){
			log.removeChild(document.getElementById('saveGame'));
		}
	}
	if (game.options.menu.timestamps.enabled){
		messageString = ((game.options.menu.timestamps.enabled == 1) ? getCurrentTime() : updatePortalTimer(true)) + " " + messageString;
	}
	if (!htmlPrefix){
		if (lootIcon && lootIcon.charAt(0) == "*") {
			lootIcon = lootIcon.replace("*", "");
			prefix =  "icomoon icon-";
		}
		else prefix = "glyphicon glyphicon-";
		if (type == "Story") messageString = "<span class='glyphicon glyphicon-star'></span> " + messageString;
		if (type == "Combat") messageString = "<span class='glyphicon glyphicon-flag'></span> " + messageString;
		if (type == "Loot" && lootIcon) messageString = "<span class='" + prefix + lootIcon + "'></span> " + messageString;
		if (type == "Notices"){
			messageString = "<span class='glyphicon glyphicon-off'></span> " + messageString;
		}
	}
	else messageString = htmlPrefix + " " + messageString;
	log.innerHTML += "<span" + addId + " class='" + type + "Message message" +  " " + extraClass + "' style='display: " + displayType + "'>" + messageString + "</span>";
	if (needsScroll) log.scrollTop = log.scrollHeight;
	if (type != "Story") trimMessages(type);
}

function getCurrentTime(){
	var date = new Date();
	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hours = date.getHours();
	if (seconds <= 9) seconds = "0" + seconds;
	if (minutes <= 9) minutes = "0" + minutes;
	if (hours <= 9) hours = "0" + hours;
	return hours + ":" + minutes + ":" + seconds;
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
	var displayed = game.global.messages[what].enabled;
	if (!updateOnly){
		displayed = (displayed) ? false : true;
		game.global.messages[what].enabled = displayed;
	}
	var toChange = document.getElementsByClassName(what + "Message");
	var btnText = (displayed) ? what : what + " off";
	var btnElem = document.getElementById(what + "Filter");
	if (btnElem == null) return;
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
	document.getElementById('talentsTab').style.display = (game.global.highestLevelCleared >= 180) ? "table-cell" : "none";
	enableDisableTab(game.global.buyTab, false);
	game.global.buyTab = what;
	enableDisableTab(what, true);
	var tabs = ["buildings", "jobs", "upgrades", "equipment", "talents"];
	for (var tab in tabs){
		tab = tabs[tab];
		document.getElementById(tab + "Container").style.display = ((what == "all" && tab != "talents") || tab == what) ? "block" : "none";
	}
	if (what == "talents") displayTalents();
	
}

function enableDisableTab(what, enable){
	var elem = document.getElementById(what + "Tab");
	if(enable)
		elem.className = elem.className.replace("tabNotSelected", "tabSelected");
	else
		elem.className = elem.className.replace("tabSelected", "tabNotSelected");
	//document.getElementById(what + "A").style.borderBottom = (enable) ? "0" : "1px solid #ddd";
}


function getTabClass(displayed){
	return (displayed) ? "btn btn-success logFlt" : "btn btn-danger logFlt";
}

function setMax(amount){
	game.global.maxSplit = amount;
	cancelTooltip();
	document.getElementById("tab6Text").innerHTML = (amount != 1) ? game.global.maxSplit : "Max";
}

function numTab(what, p) {
	var num = 0;
	if (what == "6" && game.global.buyAmt == "Max") tooltip('Max', null, 'update');
	if (what == 5){
		unlockTooltip();
		tooltip('hide');
		var numBox = document.getElementById("customNumberBox");
		if (numBox){
			num = numBox.value.toLowerCase();
			game.global.lastCustomExact = num;
			if (num.split('%')[1] == ""){
				num = num.split('%');
				num[0] = parseFloat(num[0]);
				if (num[0] <= 100 && num[0] >= 0){
					var workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed
					num = Math.floor(workspaces * (num[0] / 100));
				}
				else num = 1;
			}
			else if (num.split('/')[1]){
				num = num.split('/');
				num[0] = parseFloat(num[0]);
				num[1] = parseFloat(num[1]);
				var workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
				num = Math.floor(workspaces * (num[0] / num[1]));
				if (num < 0 || num > workspaces) num = 1;
			}
			else if (num.split('e')[1]){
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
		if (num > 0) {
			var text = "+" + prettify(num);
			document.getElementById("tab5Text").innerHTML = text;
			document.getElementById("ptab5Text").innerHTML = text;
			game.global.buyAmt = num;
			game.global.lastCustomAmt = num;
		}
		else {
			if (numBox.value == "pants" && game.global.sLevel >= 4) {
				//Dedicated to Sleeves, who would be upset if I never added a pants easter egg.
				pantsMode = true;
				message("Get a leg up with PANTS! Until your next trou... browser refresh, you can enable the useless but stylish PANTS ONLY AutoPrestige setting! Denim-ite!", "Notices");
				return;
			}
			message("Please use a number greater than 0!", "Notices");
			return;
		}
	}
	if (typeof what === 'undefined') what = game.global.numTab;
	else
	game.global.numTab = what;
	var tabType = (p) ? "ptab" : "tab";
	var count = (p) ? 5 : 6;
	for (var x = 1; x <= count; x++){
		var thisTab = document.getElementById(tabType + x);
		if(what == x)
			thisTab.className = thisTab.className.replace("tabNotSelected", "tabSelected");
		else
			thisTab.className = thisTab.className.replace("tabSelected", "tabNotSelected");
		if (x == 5) continue;
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
			case 6:
				num = 'Max';
		}
		if (x == what) game.global.buyAmt = num;
	}
	document.getElementById("tab6Text").innerHTML = (what == 6 && game.global.maxSplit != 1) ? game.global.maxSplit : "Max";
	if (p) {
		displayPortalUpgrades(true);
		updateAllPerkColors();
	}
}

//Buildings Specific
function removeQueueItem(what) {
	if (game.options.menu.pauseGame.enabled) return;
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
		if (childs[i].id == id) return ((i - 2)/ 3);
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
	elem.innerHTML += '<div class="queueItem" id="queueItem' + game.global.nextQueueId + '" onmouseover="tooltip(\'Queue\',null,event)" onmouseout="tooltip(\'hide\')" onClick="removeQueueItem(\'queueItem' + game.global.nextQueueId + '\'); cancelTooltip();"><span class="queueItemName">' + name + '</span><div id="animationDiv"></div></div>';
	if (game.global.nextQueueId === 0) setNewCraftItem();
	game.global.nextQueueId++;
}

function updateSkeleBtn(){
	document.getElementById("boneBtnContainer").style.display = "block";
	document.getElementById("boneBtnText").innerHTML = "Trade " + prettify(game.global.b) + " Bone" + (game.global.b == 1 ? "" : "s");
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
		document.getElementById(item + "Owned").innerHTML = prettify(Math.floor(toUpdate.owned));
		if (toUpdate.max == -1 || document.getElementById(item + "Max") === null) continue;
		var newMax = toUpdate.max;
		if (item != "trimps")
			newMax = calcHeirloomBonus("Shield", "storageSize", (newMax * (game.portal.Packrat.modifier * game.portal.Packrat.level + 1)));
		else if (item == "trimps") newMax = toUpdate.realMax();
		document.getElementById(item + "Max").innerHTML = prettify(newMax);
		var bar = document.getElementById(item + "Bar");
		if (game.options.menu.progressBars.enabled){
			var percentToMax = ((toUpdate.owned / newMax) * 100);
			swapClass("percentColor", getBarColorClass(100 - percentToMax), bar);
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
			var trap1 = document.getElementById("trimpTrapText")
			if (trap1) trap1.innerHTML = prettify(toUpdate.owned);
			var trap2 = document.getElementById("trimpTrapText2")
			if (trap2) trap2.innerHTML = prettify(toUpdate.owned);
		}
	}
	//Jobs, check PS here and stuff. Trimps per second is handled by breed() function
	for (var itemB in game.jobs){
		toUpdate = game.jobs[itemB];
		if (toUpdate.locked == 1 && toUpdate.increase == "custom") continue;
		if (toUpdate.locked == 1) {
			if (game.resources[toUpdate.increase].owned > 0)
			updatePs(toUpdate, false, itemB);
			continue;
		}
		if (document.getElementById(itemB) === null) unlockJob(itemB);
		document.getElementById(itemB + "Owned").innerHTML = (game.options.menu.menuFormatting.enabled) ? prettify(toUpdate.owned) : toUpdate.owned;
		var perSec = (toUpdate.owned * toUpdate.modifier);
		updatePs(toUpdate, false, itemB);
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
		if (document.getElementById(itemD) === null) drawAllEquipment();
		document.getElementById(itemD + "Owned").innerHTML = toUpdate.level;
	}
}

function updatePs(jobObj, trimps, jobName){ //trimps is true/false, send PS as first if trimps is true, like (32.4, true)
		if (jobObj.increase == "custom" || (typeof jobObj.increase === 'undefined' && !trimps)) return;
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
			if (game.portal.Motivation.level) psText *= (1 + (game.portal.Motivation.level * game.portal.Motivation.modifier));
			if (game.portal.Motivation_II.level) psText *= (1 + (game.portal.Motivation_II.level * game.portal.Motivation_II.modifier));
			if (game.portal.Meditation.level > 0) psText *= (1 + (game.portal.Meditation.getBonusPercent() * 0.01)).toFixed(2);
			if (game.global.challengeActive == "Meditate") psText *= 1.25;
			else if (game.global.challengeActive == "Size") psText *= 1.5;
			if (game.global.challengeActive == "Toxicity"){
					var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
					psText *= (1 + toxMult);
			}
			if (game.global.challengeActive == "Balance"){
				psText *= game.challenges.Balance.getGatherMult();
			}
			if (game.global.challengeActive == "Decay"){
				psText *= 10 * (Math.pow(0.995, game.challenges.Decay.stacks));
			}
			if (game.global.challengeActive == "Watch") psText /= 2;
			if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)) psText *= 2;
			psText = calcHeirloomBonus("Staff", jobName + "Speed", psText);
			if (game.global.playerGathering == increase){
				if (game.global.turkimpTimer > 0 && increase != "science"){
					psText *= 1.5;
				}
			psText += getPlayerModifier();
		}
			elem = document.getElementById(increase + "Ps");
			//Portal Packrat
			increase = game.resources[increase];
			if (increase.max != -1){
				var newMax = increase.max + (increase.max * game.portal.Packrat.modifier * game.portal.Packrat.level);
				newMax = calcHeirloomBonus("Shield", "storageSize", newMax);
				if (increase.owned >= newMax) psText = 0;
			}
			psText = psText.toFixed(1);
			
		}
		if (game.options.menu.useAverages.enabled) psText = parseFloat(psText) + getAvgLootSecond(jobObj.increase);
		psText = prettify(psText);
/*		var color = (psText < 0) ? "red" : "green";
		if (psText == 0) color = "black"; */
		psText = "+" + psText + "/sec";
		if (trimps && game.unlocks.quickTrimps) {
			psText += " (x2!)"; 
		}
		elem.innerHTML = psText;
		swapClass('sizeSec', ((psText.replace('.','').length >= 11) ? 'sizeSecReduced' : 'sizeSecRegular'), elem);
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
	var building = game.buildings[what];
	if (building.locked == 1) building.alert = true;
	building.locked = 0;
	drawAllBuildings();
}

function drawAllBuildings(){
	var elem = document.getElementById("buildingsHere");
	elem.innerHTML = "";
	for (var item in game.buildings){
		building = game.buildings[item];
		if (building.locked == 1) continue;
		drawBuilding(item, elem);
		if (building.alert && game.options.menu.showAlerts.enabled){
			document.getElementById("buildingsAlert").innerHTML = "!";
			if (document.getElementById(item + "Alert")) document.getElementById(item + "Alert").innerHTML = "!";
		}
	}
}

function drawBuilding(what, where){
	where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'buildings\',event)" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer buildingThing" id="' + what + '" onclick="buyBuilding(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">0</span></div>';
}

function unlockJob(what) {
	game.global.lastUnlock = new Date().getTime();
	var job = game.jobs[what];
	if (job.locked == 1) job.alert = true;
	job.locked = 0;
	drawAllJobs();
}

function drawAllJobs(){
	var elem = document.getElementById("jobsHere");
	elem.innerHTML = "";
	for (var item in game.jobs){
		if (game.jobs[item].locked == 1) continue;
		if (item == "Geneticist" && game.global.Geneticistassist){
			drawGeneticistassist(elem);
		}
		else
			drawJob(item, elem);
		if (game.jobs[item].alert && game.options.menu.showAlerts.enabled){
			document.getElementById("jobsAlert").innerHTML = "!";
			if (document.getElementById(item + "Alert")) document.getElementById(item + "Alert").innerHTML = "!";
		}
	}	
}

function drawJob(what, where){
	where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'jobs\',event)" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer jobThing" id="' + what + '" onclick="buyJob(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">0</span></div>';
}

function drawGeneticistassist(where){
	where.innerHTML += '<div id="GeneticistassistContainer" class="thing"><div onmouseover="tooltip(\'Geneticist\',\'jobs\',event)" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer jobThing" id="Geneticist" onclick="buyJob(\'Geneticist\')"><span class="thingName"><span id="GeneticistAlert" class="alert badge"></span>Geneticist</span><br/><span class="thingOwned" id="GeneticistOwned">0</span></div><div onmouseover="tooltip(\'Geneticistassist\',null,event)" onmouseout="tooltip(\'hide\')" class="thing noselect stateHappy pointer jobThing" id="Geneticistassist" onclick="toggleGeneticistassist()">Geneticistassist<span id="GAIndicator"></span><br/><span id="GeneticistassistSetting">&nbsp;</span></div></div>';
	toggleGeneticistassist(true);
}

function refreshMaps(){
	document.getElementById("mapsHere").innerHTML = "";
	document.getElementById("voidMapsHere").innerHTML = "";
	for (var item in game.global.mapsOwnedArray) {
			unlockMap(item);
	}
}

function getUniqueColor(item){
	if (item.location && game.mapConfig.locations[item.location].upgrade){
			var upgrade = game.mapConfig.locations[item.location].upgrade;
			upgrade = (typeof upgrade === 'object') ? upgrade[0] : upgrade;
			upgrade = game.mapUnlocks[upgrade];			
			if (upgrade.specialFilter){ 
				if (!upgrade.specialFilter(item.level)) return " noRecycleDone";
				if (upgrade.specialFilter(item.level) && typeof upgrade.canRunOnce === 'undefined') return " noRecycle";
			}
			if (upgrade.canRunOnce) return " noRecycle";		
		}
	return " noRecycleDone";	
}

function getMapIcon(mapObject, nameOnly) {
	var icon = mapObject.location;
	icon = game.mapConfig.locations[icon].resourceType;
	if (nameOnly) return icon;
	switch (icon){
		case "Food":
			return "glyphicon glyphicon-apple";
		case "Metal":
			return "icomoon icon-cubes";
		case "Wood":
			return "glyphicon glyphicon-tree-deciduous";
		case "Gems":
			return "icomoon icon-diamond";
		case "Any":
			return "icomoon icon-leaf2";
	}
	return "icomoon icon-cubes";
}

function unlockMap(what) { //what here is the array index
	var item = game.global.mapsOwnedArray[what];
	var btnClass = "mapElementNotSelected thing noselect pointer mapThing";
	if (game.unlocks.goldMaps && !item.noRecycle) btnClass += " goldMap";
	var level = item.level;
	var tooltip = "";
	var loc = "mapsHere";
	if (item.location == "Void") {
		btnClass += " voidMap";
		level = '<span class="glyphicon glyphicon-globe"></span>';
		tooltip = " onmouseover=\"tooltip('Void Map', 'customText', event, 'This Map will scale in level to your current Zone Number, enemies have a random buff, and the boss at the final cell will drop helium. This map will disappear after it is completed once, and leaving the map will reset its progress.');\" onmouseout=\"tooltip('hide')\"";
		loc = "voidMapsHere";
	}
	else if (item.noRecycle) btnClass += getUniqueColor(item);
	var elem = document.getElementById(loc);
	if (game.options.menu.extraStats.enabled) elem.innerHTML = '<div' + tooltip + ' class="' + btnClass + '" id="' + item.id + '" onclick="selectMap(\'' + item.id + '\')"><div class="onMapIcon"><span class="' + getMapIcon(item) + '"></span></div><div class="thingName onMapName">' + item.name + '</div><br/><span class="thingOwned mapLevel">Level ' + level + '</span><br/><span class="onMapStats"><span class="icomoon icon-gift2"></span>' + Math.floor(item.loot * 100) + '% </span><span class="icomoon icon-cube2"></span>' + item.size + ' <span class="icon icon-warning"></span>' + Math.floor(item.difficulty * 100) + '%</div>' + elem.innerHTML;
	else elem.innerHTML = '<div' + tooltip + ' class="' + btnClass + '" id="' + item.id + '" onclick="selectMap(\'' + item.id + '\')"><span class="thingName">' + item.name + '</span><br/><span class="thingOwned mapLevel">Level ' + level + '</span></div>' + elem.innerHTML;
	if (item.id == game.global.currentMapId) swapClass("mapElement", "mapElementSelected", document.getElementById(item.id));
	//onmouseover="tooltip(\'' + item.id + '\',\'maps\',event)" onmouseout="tooltip(\'hide\')"
}

function unlockUpgrade(what, displayOnly) {
	if (!displayOnly) game.global.lastUnlock = new Date().getTime();
	if (getAvailableGoldenUpgrades() >= 1) displayGoldenUpgrades(true);
	var upgrade = game.upgrades[what];
	upgrade.locked = 0;
	if (upgrade.prestiges){
		var resName = (what == "Supershield") ? "wood" : "metal";
		upgrade.cost.resources[resName] = getNextPrestigeCost(what);
	}
	if (!displayOnly) {
		upgrade.allowed++;
		upgrade.alert = true;
	}
	drawAllUpgrades();
}

function drawAllUpgrades(){
	var elem = document.getElementById("upgradesHere");
	elem.innerHTML = "";
	for (var item in game.upgrades){
		if (game.upgrades[item].locked == 1) continue;
		drawUpgrade(item, elem);
		if (game.upgrades[item].alert && game.options.menu.showAlerts.enabled){
			document.getElementById("upgradesAlert").innerHTML = "!";
			if (document.getElementById(item + "Alert")) document.getElementById(item + "Alert").innerHTML = "!";
		}
	}
	goldenUpgradesShown = false;
	displayGoldenUpgrades();
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
	where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'upgrades\',event)" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer upgradeThing" id="' + what + '" onclick="buyUpgrade(\'' + what + '\')"><span id="' + what + 'Alert" class="alert badge"></span><span class="thingName">' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">' + done + '</span></div>';
	if (dif >= 1) document.getElementById(what + "Owned").innerHTML = upgrade.done + "(+" + dif + ")";
}

function checkButtons(what) {
	var where = game[what];
	if (what == "jobs") {
		var workspaces = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
		for (var item in game.jobs){
			if (game.jobs[item].locked == 1) continue;
			if (workspaces <= 0) updateButtonColor(item, false, true);
			else updateButtonColor(item,canAffordJob(item, false, workspaces, true),true);
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
			updateButtonColor(itemBuild, canAffordBuilding(itemBuild, false, false, false, true));
		}
		return;
	}
	if (what == "equipment"){
		for (var itemEquip in game.equipment){
			var thisEquipment = game.equipment[itemEquip];
			if (thisEquipment.locked == 1) continue;
			updateButtonColor(itemEquip, canAffordBuilding(itemEquip, null, null, true, true));
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
	if (isJob && game.global.firing === true) {
		if(game.jobs[what].owned >= 1) {
			//note for future self:
			//if you need to add more states here, change these to use the swapClass func -grabz
			//with "thingColor" as first param
			swapClass("thingColor", "thingColorFiringJob", elem);
		}
		else{
			swapClass("thingColor", "thingColorCanNotAfford", elem);
		}
		return;
	}
	if (what == "Warpstation") {
		if(canAfford)
			elem.style.backgroundColor = getWarpstationColor();
		else
			elem.style.backgroundColor = "";
	}
	
	if(canAfford){
		if 
			(what == "Gigastation" && ctrlPressed) swapClass("thingColor", "thingColorCtrl", elem);
		else
		swapClass("thingColor", "thingColorCanAfford", elem);
	}
	else
		swapClass("thingColor", "thingColorCanNotAfford", elem);
}

function getWarpstationColor() {
	var amt = game.upgrades.Gigastation.done * 5;
	if (amt > 255) amt = 255;
	return "rgb(0, " + Math.floor(amt / 2) + ", " + amt + ")";

}

function unlockEquipment(what, fromCheck) {
	game.global.lastUnlock = new Date().getTime();
	var equipment = game.equipment[what];
	equipment.locked = 0;
	if (!fromCheck){
		drawAllEquipment();
		return;
	}
}

function drawAllEquipment(){
	var elem = document.getElementById("equipmentHere");
	elem.innerHTML = "";
	for (var item in game.equipment){
		if (game.equipment[item].locked == 1) continue;
		drawEquipment(item, elem);
	}
}

function drawEquipment(what, elem){
	var numeral = "";
	var equipment = game.equipment[what];
	if (equipment.prestige > 1){
		numeral = romanNumeral(equipment.prestige);
	}
	elem.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'equipment\',event)" onmouseout="tooltip(\'hide\')" class="noselect pointer thingColorCanNotAfford thing" id="' + what + '" onclick="buyEquipment(\'' + what + '\')"><span class="thingName">' + what + ' <span id="' + what + 'Numeral">' + numeral + '</span></span><br/><span class="thingOwned">Level: <span id="' + what + 'Owned">0</span></span></div>';	
}

//isPrevious returns the previous color, used for swapping with str.replace to know which one was before
function getBarColorClass(percent) {
	if (percent > 50) return "percentColorBlue";
	else if (percent > 25) return "percentColorYellow";
	else if (percent > 10) return "percentColorOrange";
	else return "percentColorRed";
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

var hasNewSetting = false;
function toggleSettingsMenu(){
	game.options.displayed = !game.options.displayed;
	var menuElem = document.getElementById("settingsHere");
	if (game.options.displayed) {
		var searchElem = document.getElementById('searchSettings');
		menuElem.style.display = "block";
		toggleSettingSection(true);
		settingTab(((hasNewSetting) ? "New" : "General"));
		return;
	}
	menuElem.style.display = "none";
	if (hasNewSetting) clearNewSettings();
}

function addNewSetting(name){
	game.options.menu[name].isNew = true;
	hasNewSetting = true;
	toggleSettingAlert();
}

function clearNewSettings(){
	for (var item in game.options.menu){
		if (game.options.menu[item].isNew) game.options.menu[item].isNew = false;
	}
	hasNewSetting = false;
	toggleSettingAlert();
	document.getElementById('NewTab').style.display = 'none';
}

function toggleSettingAlert(){
	var elem = document.getElementById('settingsAlert');
	if (elem == null) {
		if (hasNewSetting) document.getElementById('settingsText').innerHTML += ' <span class="alert" id="settingsAlert">!</span>';
		return;
	}
	if (hasNewSetting) elem.style.display = 'inline-block';
	else elem.style.display = 'none';
}

function displayAllSettings() {
	var settingsHere = document.getElementById("allSettingsHere");
	var html = "";
	for (var item in game.options.menu){
		var optionItem = game.options.menu[item];
		if (optionItem.locked) continue;
		if (typeof optionItem.lockUnless === 'function' && !optionItem.lockUnless()) continue;
		html += getSettingHtml(optionItem, item);
	}
	settingsHere.innerHTML = html;
}

function toggleSettingSection(toSearch){
	document.getElementById('searchSettingsWindow').style.display = (toSearch) ? "block" : "none";
	document.getElementById('allSettings').style.display = (toSearch) ? "none" : "block";
	document.getElementById(((toSearch) ? 'allSettingsHere' : 'settingSearchResults')).innerHTML = '';
	if (!toSearch) displayAllSettings();
	else searchSettings(document.getElementById('searchSettings'));
}

function settingTab(what){
	var elem = document.getElementById('searchSettings');
	elem.value = what;
	searchSettings(elem);
	clearSettingTabs();
	var tabElem = document.getElementById(what + "Tab");
	if (tabElem) swapClass('tab', 'tabSelected', tabElem);
	if (what == "New") document.getElementById('NewTab').style.display = "table-cell";
}

function clearSettingTabs(){
	var elems = document.getElementsByClassName('settingTab');
	for (var x = 0; x < elems.length; x++){
		swapClass('tab', 'tabNotSelected', elems[x])
	}
}

function searchSettings(elem){
	var search = elem.value.toLowerCase();
	var resultsElem = document.getElementById('settingSearchResults');
	if (search.length < 2) {
		resultsElem.innerHTML = "";
		return;
	}
	var results = [];
	for (var optionName in game.options.menu){
		var optionObject = game.options.menu[optionName];
		if (optionObject.locked) continue;
		if (search == "new"){
			if (!optionObject.isNew) continue;
			results.push(optionName);
			continue;
		}
		if (typeof optionObject.lockUnless === 'function' && !optionObject.lockUnless()) continue;
		if (optionObject.extraTags && optionObject.extraTags.search(search) != -1) results.push(optionName);
		else if (optionObject.description.toLowerCase().search(search) != -1) results.push(optionName);	
	}
	var text = "";
	var forceClass = "";
	if (results.length > 10) {
		if (results.length > 12) {
			resultsElem.innerHTML = "";
			return;
		}
		else forceClass = ' settingFit12';
		
	}
	clearSettingTabs();
	for (var x = 0; x < results.length; x++){
		text += getSettingHtml(game.options.menu[results[x]], results[x], forceClass);
	}
	resultsElem.innerHTML = text;
}

function getSettingHtml(optionItem, item, forceClass){
	if (!forceClass) forceClass = "";
	var text = optionItem.titles[optionItem.enabled];
	return "<div class='optionContainer" + forceClass + "'><div id='toggle" + item + "' class='noselect settingsBtn settingBtn" + optionItem.enabled + "' onclick='toggleSetting(\"" + item + "\", this)' onmouseover='tooltip(\"" + text + "\", \"customText\", event, \"" + optionItem.description + "\")' onmouseout='tooltip(\"hide\")'>" + text + "</div></div>";
}

function toggleSetting(setting, elem, fromPortal, updateOnly){
	if (setting == "GeneticistassistTarget") {
		tooltip('Customize Targets', null, 'update');
		return;
	}
	if (setting == "pauseGame" && game.options.menu.disablePause.enabled == 0) return;
	var menuOption = game.options.menu[setting];
	if (setting == "usePlayFab" && !updateOnly){
		if (menuOption.enabled == 0){
			authenticated = enablePlayFab();
			if (!authenticated) return;
		}
		else {
			game.global.playFabLoginType = -1;
			playFabId = -1;
		}
	}
	var toggles = menuOption.titles.length;
	if (!updateOnly){
		if (toggles == 2)	menuOption.enabled = (menuOption.enabled) ? 0 : 1;
		else {
			menuOption.enabled++;
			if (menuOption.enabled >= toggles) menuOption.enabled = 0;
		}
		if (menuOption.onToggle) menuOption.onToggle();
	}
	else if (setting == "usePlayFab") menuOption.onToggle();
	if (fromPortal){
		document.getElementById('ptabInfoText').innerHTML = (menuOption.enabled) ? "Less Info" : "More Info";
		displayPortalUpgrades(true);
		return;
	}
	var menuElem = [];
	menuElem[0] = (elem) ? elem : document.getElementById("toggle" + setting);
	if (typeof menuOption.secondLocation !== 'undefined') menuElem[1] = document.getElementById(menuOption.secondLocation);
	for (var x = 0; x < menuElem.length; x++){
		if (menuElem[x] === null) continue;
		menuElem[x].innerHTML = menuOption.titles[menuOption.enabled];
		swapClass("settingBtn", "settingBtn" + menuOption.enabled, menuElem[x]);
		if (setting == "deleteSave") return;
		if (!updateOnly && elem) cancelTooltip();
		menuElem[x].onmouseover = function(event) {tooltip(menuOption.titles[menuOption.enabled], "customText", event, menuOption.description)};
	}
	if (!updateOnly && elem) tooltip(menuOption.titles[menuOption.enabled], "customText", 'update', menuOption.description)
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
		if (!forHover && typeof achievement.finished === 'number') displayNumber = achievement.finished;
		var color = game.colorsList[achievement.tiers[displayNumber]];
		var prog = document.getElementById("achievementHoverProgress");
		var one = (typeof achievement.finished !== 'number');
		if (forHover && ((!one && !achievement.showAll && displayNumber > achievement.finished) || (one && (game.global.highestLevelCleared < achievement.filters[displayNumber] && !achievement.finished[displayNumber])))) {
			document.getElementById("achievement" + location).style.display = "block";
			document.getElementById("achievement" + location + "IconContainer").innerHTML = '<span style= "color: ' + color + ';" class="icomoon icon-locked achievementPopupIcon"></span>';
			document.getElementById("achievement" + location + "Title").innerHTML = "Locked";
			document.getElementById("achievement" + location + "Title").style.color = color;
			document.getElementById("achievement" + location + "Description").innerHTML = "Locked";
			document.getElementById("achievement" + location + "Reward").innerHTML = '<b>Reward:</b> +' + game.tierValues[achievement.tiers[displayNumber]] + "% Damage";
			prog.innerHTML = "";
			return;
		}
		document.getElementById("achievement" + location).style.display = "block";
		document.getElementById("achievement" + location + "IconContainer").innerHTML = '<span style= "color: ' + color + ';" class="' + achievement.icon + ' achievementPopupIcon"></span>';
		document.getElementById("achievement" + location + "Title").innerHTML = achievement.names[displayNumber];
		document.getElementById("achievement" + location + "Title").style.color = color;
		document.getElementById("achievement" + location + "Description").innerHTML = achievement.description(displayNumber);
		document.getElementById("achievement" + location + "Reward").innerHTML = '<b>Reward:</b> +' + game.tierValues[achievement.tiers[displayNumber]] + "% Damage";
		if (forHover && typeof achievement.progress !== 'undefined' && (typeof achievement.highest === 'undefined' || achievement.highest > 0)){
			prog.innerHTML = "Progress: " + achievement.progress();
		}
		else
			prog.innerHTML = "";
	}

	function checkAchieve(id, evalProperty, doubleChecking, noDisplay) {
		if (id == "housing" && checkHousing() >= 100) giveSingleAchieve(18);
		var achievement = game.achievements[id];		
		if (typeof achievement.evaluate !== 'undefined') evalProperty = achievement.evaluate();
		if (typeof achievement.highest !== 'undefined') {
			if (achievement.reverse) {
				if (achievement.highest === 0 || evalProperty < achievement.highest) achievement.highest = evalProperty;
			}
			else {
				if (evalProperty > achievement.highest) achievement.highest = evalProperty;
			}
		}
		if (achievement.finished == achievement.tiers.length) return;
		if (typeof achievement.breakpoints[achievement.finished] === 'number'){
			if (!achievement.reverse){
				if (evalProperty < achievement.breakpoints[achievement.finished]) return;	
			}
			else {
				if (evalProperty > achievement.breakpoints[achievement.finished]) return;
			}
		}
		else if (evalProperty != achievement.breakpoints[achievement.finished]) return;
		if (!noDisplay) displayAchievementPopup(id, false, achievement.finished);
		achievement.newStuff.push(achievement.finished);
		achievement.finished++;
		checkAchieve(id, evalProperty, true, noDisplay);
		if (!doubleChecking) calculateAchievementBonus();
		if (trimpAchievementsOpen && !doubleChecking) displayAchievements();
	}
	
	function giveSingleAchieve(index){
		var achievement = game.achievements.oneOffs;
		if (achievement.finished[index]) return;
		displayAchievementPopup("oneOffs", false, index);
		achievement.newStuff.push(index);
		achievement.finished[index] = true;
		calculateAchievementBonus();
		if (trimpAchievementsOpen) displayAchievements();
	}
	
	function calculateAchievementBonus(){
		var totalBonus = 0;
		for (var item in game.achievements){
			var achievement = game.achievements[item];
			var one = (typeof achievement.finished !== 'number'); //Check for one-off achievement
			var count = (one) ? achievement.finished.length : achievement.finished;
			for (var x = 0; x < count; x++){
				if (one && !achievement.finished[x]) continue;
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
			var one = (typeof achievement.finished !== 'number');
			var titleClass = 'class="achievementTitle';
			if (amount > 12 && (!one && achievement.finished < 10)) amount = 12;
			titleClass += (amount > 12) ? ' doubleTall"' : '"';
			htmlString += '<div class="achievementsContainer"><div ' + titleClass + '>' + achievement.title + '</div><span class="littleAchievementWrapper">';
			var calcAmount = (amount > 12) ? (amount / 2) : amount;
			var width = 7.3;
			for (var x = 0; x < amount; x++){
				if (one && achievement.filters[x] == -1 && !achievement.finished[x]) continue;
				var displayColor = "grey";
				var borderStyle = "";
				var tierValue = "<span style='color: black;' class='" + achievement.icon + "'></span>";
				if ((!one && achievement.finished == x) || (one && !achievement.finished[x] && game.global.highestLevelCleared >= achievement.filters[x])) {
					displayColor = (one && !checkFeatEarnable(x)) ? "#b32d00" : "#C5C515"; //Yellow
				}
				else if ((one && achievement.finished[x]) || (!one && achievement.finished > x)) {
					displayColor = "#159515"; //Greenz
					if (achievement.newStuff.length && achievement.newStuff.indexOf(x) != -1) tierValue = "<span id='" + item + x + "Alert' style='color: yellow;' class='icomoon icon-exclamation-circle'></span>&nbsp;" + tierValue;
				}
				else tierValue = "&nbsp;";
				borderStyle = "border-color: " + game.colorsList[achievement.tiers[x]] + ";";
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
		var fluff = [
			[", better get some more achievements", ", you'd do fine with a few more achievements", " but you wish you had a few more achievements"],
			[", your achievement game shows promise", " on your path to achievement", ", thanks to your achievements"],
			[", thanks to your bounty of achievements", ", must be all those achievements", ", you are one with the achievements", " and you water your achievements daily"],
			[", your Trimps are mighty impressed", ", your achievements are mind blowing", ". You wake up, achieve, then sleep", ", you have achievement in your blood"],
			[", your achievements are beyond mortal comprehension", ", Trimps far and wide tell stories of your achievement", ", you have achieved achievement", ", everything you touch turns to achievement"],
			[", your achievements have achieved achievement", ", news of your achievement spreads throughout the galaxy", ", achievements bend to your will", ", your achievements transcend reality"]
		];
		var fluffLevel = getAchievementStrengthLevel();		
		fluff = fluff[fluffLevel];
		fluff = fluff[Math.floor(Math.random() * fluff.length)]
		document.getElementById("achievementFluff").innerHTML = fluff;
		document.getElementById("achievementTotalPercent").innerHTML = game.global.achievementBonus;
		setGoldenBonusAchievementText();
	}
	
	function checkFeatEarnable(which){
		var failables = {
			f0: function (){
				return (game.global.world < 30 && game.global.canRespecPerks && !game.global.bonePortalThisRun && countHeliumSpent() <= 60);
			},
			f3: function (){
				return (game.global.world < 10 && game.stats.trimpsKilled.value <= 5);
			},
			f6: function () {
				return (game.global.world < 60 && game.stats.trimpsKilled.value <= 1000);
			},
			f7: function () {
				return (game.global.world < 120 && !game.global.researched);
			},
			f8: function () {
				return (game.global.world < 75 && checkHousing(true) == 0);
			},
			f11: function () {
				return (game.global.world < 60 && getHighestPrestige() <= 3);
			},
			f14: function () {
				return (game.global.challengeActive == "Crushed" && game.challenges.Crushed.critsTaken == 0);
			},
			f16: function () {
				var jobCount = 0; 
				for (var job in game.jobs) {
					jobCount += game.jobs[job].owned;
				}
				return (game.global.world < 60 && jobCount - game.jobs.Dragimp.owned == 0 && game.stats.trimpsFired.value == 0);
			},
			f17: function () {
				return (game.global.challengeActive == "Toxicity" && game.challenges.Toxicity.highestStacks <= 400);
			},
			f20: function () {
				return (game.global.challengeActive == "Watch" && !game.challenges.Watch.enteredMap);
			},
			f21: function () {
				return (game.global.challengeActive == "Lead" && game.upgrades.Gigastation.done <= 1);
			},
			f22: function () {
				return (game.global.challengeActive == "Corrupted" && !game.challenges.Corrupted.hiredGenes && game.jobs.Geneticist.owned == 0);
			},
			f23: function () {
				return (game.global.world <= 200 && game.global.spireDeaths == 0);
			}
		};
		if (typeof failables["f" + which] === 'function') return failables["f" + which]();
		else return true;
	}
	
	function setGoldenBonusAchievementText(){
		var elem = document.getElementById('achievementGoldenBonusContainer');
		var tier = getAchievementStrengthLevel();
		var tiers = [15, 100, 300, 600, 1000];
		var freq = getGoldenFrequency(tier);
		if (tier <= 0) {
			elem.innerHTML = "";
			return false;
		}
		var html = "You will find one Golden Upgrade every " + freq + " zones.";
		if (tier < tiers.length) html += " Frequency increases at " + tiers[tier] + "% bonus damage.";
		elem.innerHTML = html;
	}
	
	function getAchievementStrengthLevel(){
		var percent = game.global.achievementBonus;
		if (percent < 15) return 0;
		else if (percent < 100) return 1;
		else if (percent < 300) return 2;
		else if (percent < 600) return 3;
		else if (percent < 1000) return 4;
		return 5;
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
	
/* 	function showAchievementDescription(id, number){
		var elem = document.getElementById(id + "Description");
		var achievement = game.achievements[id];
		if (number > achievement.finished) return;
		elem.innerHTML = "<b>" + achievement.names[number] + ":</b> " + achievement.description(number) + "<br/><br/>";
	}
	
	function hideAchievementDescription(id){
		document.getElementById(id + "Description").innerHTML = "";
	} */
	
function updateDecayStacks(addStack){
	var elem = document.getElementById('decayStacks');
	if (game.global.challengeActive != "Decay"){
		if (elem == null) return;
		elem.style.display = "none";
		return;
	}
	if (addStack && game.challenges.Decay.stacks < 999) game.challenges.Decay.stacks++;
	if (elem == null){
		document.getElementById('debuffSpan').innerHTML += "<span id='decayStacks' onmouseout='tooltip(\"hide\")' class='badge antiBadge'><span id='decayStackCount'></span> <span class='glyphicon glyphicon-cloud'></span></span>";
		elem = document.getElementById('decayStacks');
	}
	var amt = ((1 - Math.pow(0.995, game.challenges.Decay.stacks)) * 100).toFixed(2);
	elem.setAttribute('onmouseover', 'tooltip("Decay", null, event)');
	document.getElementById('decayStackCount').innerHTML = game.challenges.Decay.stacks;
}

function swapClass(prefix, newClass, elem) {
if (elem == null) {
	console.log("swapClass, No element found");
	return;
	}
  var className = elem.className;
  if (typeof className.split('newClass')[1] !== 'undefined') return;
  className = className.split(prefix);
  if(typeof className[1] === 'undefined') {
	  console.log("swapClass function error: Tried to replace a class that doesn't exist at [" + elem.className + "] using " + prefix + " as prefix and " + newClass + " as target class.");
	  elem.className += " " + newClass;
	  return;
  } 
  var classEnd = className[1].indexOf(' ');
  if (classEnd >= 0)
  	className = className[0] + newClass + className[1].slice(classEnd, className[1].length);
  else
  	className = className[0] + newClass;
  elem.className = className;
}
