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

//Spoilers ahead, proceed with caution
function newGame () {
var toReturn = {
	global: {
		//New and accurate version
		stringVersion: '4.10.4',
		//Leave 'version' at 4.914 forever, for compatability with old saves
		version: 4.914,
		isBeta: false,
		betaV: 0,
		killSavesBelow: 0.13,
		playerGathering: "",
		playerModifier: 1,
		buildingsQueue: [],
		timeLeftOnCraft: 0,
		crafting: "",
		timeLeftOnTrap: -1,
		world: 1,
		gridArray: [],
		mapGridArray: [],
		mapsOwnedArray: [],
		currentMapId: "",
		lastClearedCell: -1,
		lastClearedMapCell: -1,
		pauseFight: true,
		soldierHealth: 0,
		soldierHealthMax: 0,
		soldierHealthRemaining: 0,
		soldierCurrentAttack: 0,
		soldierCurrentBlock: 0,
		fighting: false,
		health: 50,
		attack: 6,
		block: 0,
		autoBattle: false,
		autoCraftModifier: 0,
		start: new Date().getTime(),
		time: 0,
		portalTime: new Date().getTime(),
		lastFightUpdate: "",
		battleCounter: 0,
		firing: false,
		mapsActive: false,
		preMapsActive: false,
		switchToMaps: false,
		switchToWorld: false,
		lookingAtMap: "",
		mapsOwned: 0,
		totalMapsEarned: 0,
		freshFight: false,
		tab: "All",
		repeatMap: false,
		buyAmt: 1,
		numTab: 1,
		spreadsheetMode: false,
		lockTooltip: false,
		portalActive: false,
		mapsUnlocked: false,
		lastOnline: 0,
		buyTab: "all",
		nextQueueId: 0,
		kongBonusMode: false,
		canRespecPerks: true,
		respecActive: false,
		heliumLeftover: 0,
		viewingUpgrades: false,
		totalPortals: 0,
		lastCustomAmt: 1,
		trapBuildAllowed: false,
		trapBuildToggled: false,
		lastSkeletimp: 0,
		pp: [],
		highestLevelCleared: 0,
		b: 0,
		challengeActive: "",
		selectedChallenge: "",
		lastOfflineProgress: "",
		sLevel: 0,
		totalGifts: 0,
		brokenPlanet: false,
		formation: 0,
		bestHelium: 0,
		tempHighHelium: 0,
		totalHeliumEarned: 0,
		removingPerks: false,
		lastBreedTime: 0,
		antiStacks: 0,
		prisonClear: 0,
		frugalDone: false,
		lastUnlock: 0,
		lowestGen: -1,
		breedBack: -1,
		titimpLeft: 0,
		mapBonus: 0,
		slowDone: false,
		turkimpTimer: 0,
		statsMode: "current",
		achievementBonus: 0,
		lastLowGen: 0,
		presimptStore: "food",
		lastWarp: 0,
		zoneStarted: new Date().getTime(),
		mapStarted: new Date().getTime(),
		bionicOwned: 0,
		roboTrimpLevel: 0,
		roboTrimpCooldown: 0,
		useShriek: false,
		usingShriek: false,
		autoUpgrades: false,
		autoUpgradesAvailable: false,
		autoPrestiges: 0,
		autoStorage: false,
		autoStorageAvailable: false,
		totalVoidMaps: 0,
		voidMapsToggled: false,
		voidBuff: "",
		lastVoidMap: 0,
		voidSeed: Math.floor(Math.random() * 1000000),
		scrySeed: Math.floor(Math.random() * 1000000),
		heirloomSeed: Math.floor(Math.random() * 1000000),
		heirloomBoneSeed: Math.floor(Math.random() * 1000000),
		eggSeed: Math.floor(Math.random() * 1000000),
		mutationSeed: Math.floor(Math.random() * 1000000),
		enemySeed: Math.floor(Math.random() * 1000000),
		heirloomsExtra: [],
		heirloomsCarried: [],
		StaffEquipped: {},
		ShieldEquipped: {},
		nullifium: 0,
		maxCarriedHeirlooms: 1,
		selectedHeirloom: [],
		lastPortal: -1,
		addonUser: false,
		eggLoc: -1,
		researched: false,
		bonePortalThisRun: false,
		maxSplit: 1,
		maxSoldiersAtStart: -1,
		playFabLoginType: -1,
		lastCustomExact: 1,
		voidMaxLevel: -1,
		rememberInfo: false,
		spireActive: false,
		spireDeaths: 0,
		Geneticistassist: false,
		GeneticistassistSetting: -1,
		GeneticistassistSteps: [-1, 1, 10, 30],
		spireRows: 0,
		goldenUpgrades: 0,
		voidDeaths: 0,
		essence: 0,
		spentEssence: 0,
		skeleSeed: Math.floor(Math.random() * 1000000),
		decayDone: false,
		dailyChallenge: {},
		recentDailies: [],
		dailyHelium: 0,
		breedTime: 1,
		magmite: 0,
		magmaFuel: 0,
		generatorMode: 1, //0 passive, 1 active, 2 hybrid
		trimpsGenerated: 0,
		timeSinceLastGeneratorTick: -1,
		canMagma: true,
		lastBonePresimpt: 0,
		runningChallengeSquared: false,
		totalSquaredReward: 0,
		perkPreset1: {},
		perkPreset2: {},
		perkPreset3: {},
		improvedAutoStorage: false,
		firstCustomAmt: -1,
		firstCustomExact: -1,
		autoGolden: -1,
		autoStructureSetting: {enabled: false},
		autoJobsSetting: {enabled: false},
		passive: true,
		spiresCompleted: 0,
		lastSpireCleared: 0,
		sugarRush: 0,
		holidaySeed: Math.floor(Math.random() * 100000),
		hideMapRow: false,
		mapExtraBonus: "",
		realBreedTime: 0,
		fluffyExp: 0,
		fluffyPrestige: 0,
		selectedMapPreset: 1,
		runFluffyExp: 0,
		bestFluffyExp: 0,
		runTokens: 0,
		bestTokens: 0,
		genPaused: false,
		canMapAtZone: false,
		capTrimp: false,
		lastSoldierSentAt: new Date().getTime(),
		supervisionSetting: 100,
		canScryCache: false,
		waitToScry: false,
		waitToScryMaps: false,
		freeTalentRespecs: 3,
		genStateConfig: [],
		mapPresets: {
			p1: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'
			},
			p2: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'	
			},
			p3: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'
			}
		},
		lootAvgs: {
			food: {average:0, accumulator: 0},
			wood: {average:0, accumulator: 0},
			metal: {average:0, accumulator: 0},
			gems: {average:0, accumulator: 0},
			fragments: {average:0, accumulator: 0},
		},
		menu: {
			buildings: true,
			jobs: false,
			upgrades: false
		},
		messages: {
			Story: {
				enabled: true
			},
			Loot: {
				enabled: true,
				primary: true,
				secondary: true,
				bone: true,
				exotic: true,
				helium: true,
				essence: true,
				token: true,
				magma: true,
				events: true,
				cache: true
			},
			Unlocks: {
				enabled: true,
				repeated: true,
				unique: true
			},
			Combat: {
				enabled: true,
				trimp: true,
				enemy: true
			},
			Notices: {
				enabled: true
			}
		},
		prestige: {
			attack: 13,
			health: 14,
			cost: 57,
			block: 10
		},
		difs: {
			attack: 0,
			health: 0,
			block: 0,
			trainers: 0
		},
		getEnemyAttack: function (level, name, ignoreImpStat) {
			var world = getCurrentMapObject();
			var amt = 0;
			world = (game.global.mapsActive) ? world.level : game.global.world;
			amt += 50 * Math.sqrt(world) * Math.pow(3.27, world / 2);
			amt -= 10;
			if (world == 1){
				amt *= 0.35;
				amt = (amt * 0.20) + ((amt * 0.75) * (level / 100));
			}
			else if (world == 2){
				amt *= 0.5;
				amt = (amt * 0.32) + ((amt * 0.68) * (level / 100));
			}
			else if (world < 60)
				amt = (amt * 0.375) + ((amt * 0.7) * (level / 100));
			else{
				amt = (amt * 0.4) + ((amt * 0.9) * (level / 100));
				amt *= Math.pow(1.15, world - 59);
			}
			if (world < 60) amt *= 0.85;
			if (world > 6 && game.global.mapsActive) amt *= 1.1;
			if (!ignoreImpStat)
				amt *= game.badGuys[name].attack;
			return Math.floor(amt);
		},
		getEnemyHealth: function (level, name, ignoreImpStat) {
			var world = getCurrentMapObject();
			world = (game.global.mapsActive) ? world.level : game.global.world;
			var amt = 0;
			amt += 130 * Math.sqrt(world) * Math.pow(3.265, world / 2);
			amt -= 110;
			if (world == 1 || world == 2 && level < 10){
				amt *= 0.6;
			amt = (amt * 0.25) + ((amt * 0.72) * (level / 100));
			}
			else if (world < 60)
				amt = (amt * 0.4) + ((amt * 0.4) * (level / 110));
			else{
				amt = (amt * 0.5) + ((amt * 0.8) * (level / 100));
				amt *= Math.pow(1.1, world - 59);
			}
			if (world < 60) amt *= 0.75;
			if (world > 5 && game.global.mapsActive) amt *= 1.1;
			if (!ignoreImpStat)
				amt *= game.badGuys[name].health;
			return Math.floor(amt);
		}
	},
	empowerments: {
		Poison: {
			description: function () {
				return "When this Empowerment is active, each successful attack by your Trimps stacks a debuff on the enemy, causing it to take <b>" + this.formatModifier(this.getModifier()) + "%</b> of the damage you dealt every attack until it dies. Each attack by your Trimps will further add to the poison effect.";
			},
			upgradeDescription: function () {
				return "Increases the percentage of damage that sticks to enemies as poison during the Empowerment of Poison by <b>" + this.formatModifier(this.baseModifier) + "%</b>. You currently poison for <b>" + this.formatModifier(this.getModifier()) + "%</b>, and next level will cause you to poison for <b>" + this.formatModifier(this.getModifier(1)) + "%</b>.";
			},
			baseModifier: 0.01,
			getModifier: function (change) {
				if (!change) change = 0;
				var bonusLevels = (game.talents.nature3.purchased) ? 5 : 0;
				return ((this.level + change + bonusLevels) * this.baseModifier);
			},
			formatModifier: function (number){
				return prettify(number * 100);
			},
			color: "#33bb33",
			currentDebuffPower: 0,
			level: 1,
			retainLevel: 0,
			tokens: 0
		},
		Wind: {
			description: function () {
				return "When this Empowerment is active, each successful attack by your Trimps stacks a debuff on the enemy, causing winds to swell and knock extra resources into your reach. Each stack increases Helium gained from all sources by <b>" + this.formatModifier(this.getModifier(0, true)) + "%</b> and increases all other resources gained by <b>" + this.formatModifier(this.getModifier()) + "%</b> until that enemy dies (maximum of 200 stacks). This bonus does not apply to Fragments, and the helium bonus does not apply to maps.";
			},
			upgradeDescription: function () {
				return "Increases the amount of extra Helium you find by <b>" + this.formatModifier(this.baseModifier) + "%</b> and non-Helium resources by <b>" + this.formatModifier(this.baseModifier * 10) + "%</b> per stack when the Empowerment of Wind is active. Your current bonus is <b>" + this.formatModifier(this.getModifier(0, true)) + "%</b> Helium, and next level will bring your bonus to <b>" + this.formatModifier(this.getModifier(1, true)) + "%</b> extra helium. Non-Helium resource gain is always " + ((Fluffy.isRewardActive('naturesWrath')) ? "double" : "10x") + " that of Helium, and the Helium bonus does not apply in maps.";
			},
			baseModifier: 0.001,
			getModifier: function (change, forHelium) {
				if (!change) change = 0;
				var bonusLevels = (game.talents.nature3.purchased) ? 5 : 0;
				var mod = ((this.level + change + bonusLevels) * this.baseModifier);
				if (!forHelium) mod *= 10;
				if (forHelium && Fluffy.isRewardActive("naturesWrath")){
					mod *= 5;
				}
				return mod;
			},
			formatModifier: function (number) {
				return prettify(number * 100);
			},
			getCombatModifier: function (forHelium) {
				return this.currentDebuffPower * this.getModifier(0, forHelium);
			},
			currentDebuffPower: 0,
			color: "#337733",
			level: 1,
			retainLevel: 0,
			maxStacks: 200,
			tokens: 0
		},
		Ice: {
			description: function () {
				return "When this Empowerment is active, enemies will be Chilled each time your Trimps attack. The Chill debuff stacks, reduces the damage that enemy deals by <b>" + this.formatModifier(this.getModifier()) + "%</b> (compounding) per stack, and increases the damage your Trimps deal to that enemy by " + ((Fluffy.isRewardActive('naturesWrath')) ? " twice that amount (with diminishing returns, max of +200% attack)" : "the same amount (with diminishing returns, max of 100%)") + " until it dies.";
			},
			upgradeDescription: function () {
				return "Reduces the enemy's damage dealt from each stack of Chilled when the Empowerment of Ice is active by <b>" + this.formatModifier(1 - this.baseModifier) + "%</b> (compounding), and increases the damage your Trimps deal to that enemy by " + ((Fluffy.isRewardActive('naturesWrath')) ? " twice that amount (with diminishing returns, max of +200% attack)" : "the same amount (with diminishing returns, max of 100%)") + ". Your current bonus is <b>" + this.formatModifier(this.getModifier()) + "%</b>, and next level will bring your bonus to <b>" + this.formatModifier(this.getModifier(1)) + "%</b>.";
			},
			baseModifier: 0.01,
			getModifier: function (change) {
				if (!change) change = 0;
				var bonusLevels = (game.talents.nature3.purchased) ? 5 : 0;
				return Math.pow(1 - this.baseModifier, (this.level + change + bonusLevels));
			},
			getCombatModifier: function () {
				return Math.pow(this.getModifier(), this.currentDebuffPower);
			},
			getDamageModifier: function() {
				var mod = 1 - this.getCombatModifier();
				if (Fluffy.isRewardActive('naturesWrath')) mod *= 2;
				return mod;
			},
			formatModifier: function (number){
				return prettify((1 - number) * 100);
			},
			color: "#3333bb",
			currentDebuffPower: 0,
			level: 1,
			retainLevel: 0,
			tokens: 0
		}
	},
	singleRunBonuses: {
		goldMaps: {
			name: "Golden Maps",
			text: "+100% Map Loot",
			cost: 20,
			confirmation: "You are about to purchase Golden Maps for 20 bones. All of your current and future maps will gain +100% loot added to their normal loot roll <b>until your next Portal</b>. Is this what you wanted to do?", 
			owned: false,
			fire: function () {
				game.unlocks.goldMaps = true;
				refreshMaps();
			}
		},
		quickTrimps: {
			name: "Quick Trimps",
			text: "+100% Breed Speed",
			cost: 20,
			confirmation: "You are about to purchase Quick Trimps for 20 bones. This will cause your Trimps to breed twice as fast <b>until your next Portal</b>. Is this what you wanted to do?",
			owned: false,
			fire: function () {
				swapClass("psColor", "psColorOrange", document.getElementById("trimpsPs"));
			},
			reset: function () {
				swapClass("psColor", "psColorWhite", document.getElementById("trimpsPs"));
			},
			load: function () {
				this.fire();
			}
		},
		sharpTrimps: {
			name: "Sharp Trimps",
			text: "+50% Trimp Damage",
			cost: 25,
			confirmation: "You are about to purchase Sharp Trimps for 25 bones. This will cause your Trimps to deal 50% more damage <b>until your next Portal</b>. Is this what you wanted to do?",
			owned: false,
			fire: function () {
				swapClass("attackColor", "attackColorOrange", document.getElementById("goodGuyAttack"));
			},
			reset: function () {
				swapClass("attackColor", "attackColorNormal", document.getElementById("goodGuyAttack"));
			},
			load: function () {
				this.fire();
			}

		},
		heliumy: {
			name: "Heliumy",
			text: "+25% Helium",
			cost: 100,
			confirmation: "You are about to purchase Heliumy for 100 bones. This will cause you to earn 25% more Helium from all sources <b>until your next Portal</b>. Is this what you wanted to do?",
			owned: false,
			fire: function () {
				swapClass("hePhColor", "hePhColorOrange", document.getElementById("heliumPh"));
			},
			reset: function () {
				swapClass("hePhColor", "hePhColorNormal", document.getElementById("heliumPh"));
			},
			load: function () {
				this.fire();
			}
		}
	},
	options: {
		displayed: false,
		menu: {
			autoSave: {
				enabled: 1,
				extraTags: "popular general",
				description: "Automatically save the game once per minute",
				titles: ["Not Saving", "Auto Saving"],
				onToggle: function () {
					var elem = document.getElementById("saveIndicator");
					if (this.enabled) elem.innerHTML = "<span class='autosaving'>(AutoSaving)</span>";
					else elem.innerHTML = "<span class='notAutosaving'>(Not AutoSaving)</span>";
				}
			},
			usePlayFab: {
				enabled: 0,
				extraTags: "popular general cloud",
				description: "When the game saves, every 30 minutes also back up a copy online with PlayFab. While using this setting, you will be asked if you want to download your online save if it is ever ahead of the version on your computer. You can also manually import your save from PlayFab through the Import menu.",
				titles: ["Not Saving Online", "Saving with PlayFab"],
				onToggle: function () {
					var indicatorElem = document.getElementById("playFabIndicator");
					if (this.enabled == 1) indicatorElem.className = "icomoon icon-wifi iconStateGood";
					else indicatorElem.className = "";
				},
				//lockUnless: function (){return false}
			},
			standardNotation: {
				enabled: 1,
				extraTags: "layout",
				description: "Swap between Standard Formatting (12.7M, 540B), Engineering Notation (12.7e6, 540e9), Scientific Notation (1.27e7, 5.40e11), Alphabetic Notation (12.7b, 540c), and Hybrid Notation (Standard up to e96, then Engineering. Mimics Standard pre 4.6).",
				titles: ["Scientific Notation", "Standard Formatting", "Engineering Notation", "Alphabetic Notation", "Hybrid Notation"],
				onToggle: function () {
					document.getElementById("tab5Text").innerHTML = "+" + prettify(game.global.lastCustomAmt);
				}
			},
			tooltips: {
				enabled: 1,
				extraTags: "alerts",
				description: "<p><b>Showing Tooltips<b> will ensure that all tooltips are shown when you mouse over them.</p><p><b>Shift for Tooltips</b> will hide most tooltips by default, unless you are holding your shift key. Keep this setting in mind when unlocking new things to do, as much of the game is explained in tooltips!</p>",
				titles: ["Shift for Tooltips", "Showing Tooltips"]
			},
			tooltipPosition: {
				enabled: 0,
				extraTags: "alerts",
				description: "Toggle the position of your tooltips between top right, centered above or centered below the mouse.",
				titles: ["Top Right Tips", "Center Bottom Tips", "Center Top Tips"]
			},
			queueAnimation: {
				enabled: 1,
				extraTags: "layout animation performance",
				description: "Toggle on or off the building queue blue color animation.",
				titles: ["No Queue Animation", "Queue Animation"]
			},
			barOutlines: {
				enabled: 1,
				extraTags: "layout",
				description: "Toggle on or off a black bar at the end of all progress bars. Can help discern where the progress bar ends.",
				titles: ["No Outline", "Outline"],
				onToggle: function () {
					var outlineStyle = (this.enabled) ? "2px solid black" : "none";
					var bars = document.getElementsByClassName("progress-bar");
					for (var x = 0; x < bars.length; x++){
						bars[x].style.borderRight = outlineStyle;
					}
				}
			},
			menuFormatting: {
				enabled: 1,
				extraTags: "layout",
				description: "Toggle on or off large number formatting for jobs and buildings on the left menu.",
				titles: ["No Menu Formatting", "Formatting Menu"]
			},
			formatPerkLevels: {
				enabled: 1,
				extraTags: "layout",
				description: "Toggle on or off large number formatting for Perk levels.",
				titles: ["No Perk Formatting", "Formatting Perk Levels"]
			},
			smallPerks: {
				extraTags: "layout",
				enabled: 0,
				description: "Shrink the size of perk buttons in the Portal and View Perks windows. <b>Large Perk Buttons</b> is default and fits 5 buttons per row. <b>Small Perk Buttons</b> shrinks the size to fit 6 per row, and <b>Tiny Perk Buttons</b> fits 7 per row.",
				titles: ["Large Perk Buttons", "Small Perk Buttons", "Tiny Perk Buttons"]
			},
			progressBars: {
				enabled: 1,
				extraTags: "performance",
				description: "Toggle progress bars to on, off, or performance. Performance and off will reduce CPU usage.",
				titles: ["No Progress Bars", "Progress Bars", "Performance Bars"],
				onToggle: function () {
				var bars = document.getElementsByClassName("progress-bar");
					for (var x = 0; x < bars.length; x++){
						if (this.enabled == 2) bars[x].className += " noTransition";
						else {
							bars[x].className = bars[x].className.replace(" noTransition", "");
							if (this.enabled == 0) bars[x].style.width = "0%";
						}
					}
				}
			},
			confirmhole: {
				enabled: 1,
				extraTags: "alerts",
				description: "Toggles on or off the confirmation popup on scary purchases like Wormholes.",
				titles: ["Not Confirming", "Confirming"],
			},
			lockOnUnlock: {
				enabled: 0,
				extraTags: "qol",
				description: "Enables/disables the locking of buildings, jobs, upgrades, and equipment for 1 second after unlocking something new. Useful to prevent accidental purchases.",
				titles: ["Not Locking", "Locking"],
			},
			achievementPopups: {
				enabled: 1,
				extraTags: "alerts",
				description: "Decide whether or not you want popups on completing an achievement.",
				titles: ["No Achieve Popup", "Popup Achievements"]
			},
			mapLoot: {
				enabled: 0,
				extraTags: "qol",
				description: "<p>Choose which upgrades you want first if it has been a while since you last ran maps.</p><p><b>Tier first</b> will cause maps to drop all items for the lowest tier before moving to the next. (Greatsword II -> Breastplate II -> Shield III)</p><p><b>Equip first</b> will start from Shield and drop all available Shield prestiges before continuing to Dagger and so on. (Shield III -> Shield IV -> Dagger III)</p>",
				titles: ["Tier First", "Equip First"],
				secondLocation: ["togglemapLoot2", "togglemapLootCM"]
			},
			repeatUntil: {
				enabled: 0,
				description: "<p><b>Repeat Forever</b> will cause the map to continually repeat if Repeat Maps is enabled.</p><p><b>Repeat to 10</b> will repeat unless you have 10 Map Bonus stacks.</p><p><b>Repeat for Items</b> will repeat unless there are no more special items left for that level of map.</p><p><b>Repeat for Any</b> will repeat unless there are no special items available AND you can not earn more Map Bonus stacks.</p><p><b>This setting only matters if Repeat is on. Toggling Repeat off will still leave the map when it is finished no matter what.</b></p>",
				titles: ["Repeat Forever", "Repeat to 10", "Repeat for Items", "Repeat for Any"],
				locked: true,
				secondLocation: ['togglerepeatUntilCM']
			},
			exitTo: {
				enabled: 0,
				description: "Choose whether to go to the Maps Screen or World after completing a map.",
				titles: ["Exit to Maps", "Exit to World"],
				locked: true,
				secondLocation: ['toggleexitToCM']
			},
			repeatVoids: {
				enabled: 0,
				description: "Decide if you want to continue running the rest of your Void Maps after finishing one.",
				titles: ["One Void Map", "Finish All Voids"],
				locked: true,
				secondLocation: ['togglerepeatVoidsCM']
			},
			boneAlerts: {
				enabled: 1,
				extraTags: "alerts",
				description: "Hide popup confirmation messages when in the Bone Trader or Heirlooms menus.",
				titles: ["Not Confirming Bones", "Confirming Bones"]
			},
			showAlerts: {
				enabled: 1,
				extraTags: "alerts",
				description: "Toggle on or off the display of yellow alert icons when unlocking something new.",
				titles: ["Not Alerting", "Alerting"]
			},
			showFullBreed: {
				enabled: 0,
				extraTags: "popular general",
				description: "Display time to breed a full group of soldiers next to the current breed timer.",
				titles: ["Less Breed Timer", "More Breed Timer"]
			},
			darkTheme: {
				extraTags: "general",
				enabled: 1,
				description: "Toggle between the default Trimps theme, a custom dark theme made by u/Grabarz19, a gradient theme by u/k1d_5h31d0n, and the default theme with a black background.",
				titles: ["Black Background", "Default Theme", "Dark Theme", "Gradient Theme"],
				//styleName index should always be equal to title index minus 2, and should match the css file name
				styleNames: ["dark", "gradient"],
				removeStyles: function () {
					for (var x = 0; x < this.styleNames.length; x++){
						var link = document.getElementById(this.styleNames[x] + "Theme");
						if (!link) continue;
						document.head.removeChild(link);
					}
					document.getElementById("innerWrapper").style.backgroundColor = "initial";
				},
				applyStyle: function (titleIndex){
					var styleName = this.styleNames[titleIndex - 2];
					var link = document.createElement('link');
					link.type = 'text/css';
					link.rel = 'stylesheet';
					link.href = 'css/' + styleName + '.css';
					link.id = styleName + 'Theme';
					document.head.appendChild(link);
				},
				onToggle: function () {
					this.removeStyles();
					if (this.enabled == 1) return;
					if (this.enabled == 0){
						document.getElementById("innerWrapper").style.backgroundColor = "black";
						return;
					}
					this.applyStyle(this.enabled);
				}
			},
			fadeIns: {
				enabled: 1,
				extraTags: "layout performance animation",
				description: "Toggle on or off the fade in effect on elements.",
				titles: ["Not Fading", "Fading"]
			},
			extraStats: {
				enabled: 1,
				extraTags: "layout",
				description: "Toggle on or off adding extra information to map items.",
				titles: ["Minimalist Maps", "Extra Map Info"],
				onToggle: function () {
					refreshMaps();
				}
			},
			useAverages: {
				extraTags: "popular general",
				enabled: 0,
				description: "Toggle whether or not loot from maps and the world should be counted in the loot breakdown and tooltip calculations. Calculates a moving average of the loot. If you want to clear the average, try toggling it off and on again.",
				titles: ["Not Averaging", "Averaging"],
				onToggle: function () {
					for (var item in game.global.lootAvgs){
						game.global.lootAvgs[item] = {
							average: 0,
							accumulator: 0
						};
					}
					document.getElementById('gemsPs').style.display = 'block';
				}
			},
			voidPopups: {
				extraTags: "alerts",
				enabled: 1,
				description: "Decide whether or not you want popups on looting an Heirloom.",
				titles: ["No Heirloom Pop", "Popping Heirlooms"]
			},
			detailedPerks: {
				extraTags: "qol",
				enabled: 0,
				description: "Decide whether or not to show extra information on Perk buttons",
				titles: ["Minimal Perk Info", "Extra Perk Info"]
			},
			alwaysAbandon: {
				extraTags: "general",
				enabled: 0,
				description: "Decide whether or not to wait for soldiers to die on switching between maps and world. Toggling this on will automatically abandon your soldiers.",
				titles: ["Wait to Travel", "Auto Abandon"]
			},
			extraMapBtns: {
				extraTags: "layout",
				enabled: 0,
				description: "Toggle the button menu to the right of the map grid",
				titles: ["Less Map Buttons", "Extra Map Buttons"],
				onToggle: function () {
					if (!game.global.mapsActive) return;
					var setTo = (this.enabled) ? ["8", "2"] : ["10", "off"];
					swapClass("col-xs", "col-xs-" + setTo[0], document.getElementById("gridContainer"));
					swapClass("col-xs", "col-xs-" + setTo[1], document.getElementById("extraMapBtns"));
				},
				lockUnless: function () {
					return (game.global.totalPortals > 0)
				},
			},
			GeneticistassistTarget: {
				enabled: 0,
				disableOnUnlock: false,
				extraTags: "popular general",
				description: "Customize your three available Geneticistassist targets, choose options for firing and sending, and decide whether or not Geneticistassist should start automatically when unlocked each run.",
				titles: ["Geneticistassist Settings"],
				lockUnless: function () {
					return (game.global.Geneticistassist);
				}
			},
			liquification: {
				enabled: 1,
				extraTags: "general",
				description: "Enable or disable Liquification. Nothing in game should be impossible to complete with Liquification enabled, but if you just want to slow things down then you have every right to do so.",
				titles: ["Liquification Off", "Liquification On"],
				lockUnless: function () {
					return (game.global.spiresCompleted > 0);
				}

			},
			overkillColor: {
				enabled: 1,
				extraTags: "layout",
				description: "Choose if you would like to see a different cell color for cells that you overkilled. <b>No Overcolors</b> will not change any colors based on Overkill. <b>Normal Overkill Colors</b> is the default setting, and shows a special color for cells that were Overkilled. <b>Connected Overkill Colors</b> will show the Overkill cell colors for all cells while Overkilling.",
				titles: ["No Overcolors", "Normal Overkill Colors", "Connected Overkill Colors"],
				lockUnless: function () {
					return (!game.portal.Overkill.locked)
				},
			},
			forceQueue: {
				enabled: 0,
				extraTags: "qol",
				get description() {
					var appliesTo = " only to Warpstation";
					if (game.global.improvedAutoStorage) appliesTo = " to Warpstation and AutoStorage";
					return "Choose whether or not to force instant-craft buildings to use the queue. Currently applies " + appliesTo + ". May be useful for double checking prices before building!";
				},
				titles: ["Not Forcing Queue", "Forcing Queue"],
				lockUnless: function () {
					return (game.global.sLevel >= 4);
				}
			},
			mapsOnSpire: {
				enabled: 1,
				extraTags: "other",
				description: "Choose whether you would like the game to pause combat by sending you to maps when you reach a Spire. <b>Keep Fighting at Spires</b> will not interrupt you when reaching a Spire, <b>Map at Spires</b> will send you to maps on every Spire, <b>Map at Top 2 Spires</b> will send you to maps at the highest and second highest level Spire reached, and <b>Map at Top Spire</b> will switch to maps only on the single highest Spire reached.",
				titles: ["Keep Fighting at Spires", "Map at Spires", "Map at Top 2 Spires", "Map at Top Spire"],
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 199);
				},
				secondLocation: ["togglemapsOnSpireCM"]
			},
			mapAtZone: {
				enabled: 0,
				extraTags: "other",
				description: "When enabled, you will automatically abandon your Trimps in the World and enter the Map Chamber as soon as you hit your specified Zone number.",
				get titles(){
					var nextZone = "";
					if (this.setZone.length == 1) nextZone = this.setZone;
					else {
						for (var x = 0; x < this.setZone.length; x++){
							if (game.global.world < this.setZone[x]){
								nextZone = this.setZone[x];
								if (x < this.setZone.length - 1) nextZone += "+";
								break;
							}
						}
						if (nextZone == "") 
							nextZone = this.setZone[0];
					}
					return ["No Map At Zone", "Map At Z" + nextZone];
				},
				setZone: [200],
				secondLocation: ["togglemapAtZone2", "togglemapAtZoneCM"],
				lockUnless: function () {
					return game.global.canMapAtZone;
				}
			},
			timestamps: {
				enabled: 0,
				extraTags: "qol",
				description: "Choose whether or not to display timestamps in the message log. <b>Local Timestamps</b> will log the current time according to your computer, <b>Run Timestamps</b> will log how long it has been since your run started. Note that toggling this setting will not add or remove timestamps from previous messages, but will add or remove them to or from any new ones.",
				titles: ["No Timestamps", "Local Timestamps", "Run Timestamps"]
			},
			gaFire: {
				enabled: 1,
				locked: true,
				extraTags: "qol",
				description: "<p>Toggle between <b>Limited GA Firing</b>, <b>Geneticistassist Fire</b> and <b>No GA Firing</b>.</p><p><b>Limited GA Firing</b> will prevent Geneticistassist from firing Farmers, Lumberjacks, or Miners.</p><p><b>Geneticistassist Fire</b> is the default value, and allows Geneticistassist to fire anything.</p><p><b>No GA Firing</b> prevents your Geneticistassist from being able to fire anything at all, including other Geneticists.</p>",
				titles: ["Limited GA Firing", "Geneticistassist Fire", "No GA Firing"],
				lockUnless: function () {
					return game.global.Geneticistassist
				}
			},
			tinyButtons: {
				enabled: 0,
				extraTags: "layout",
				description: "Shrink the buttons in the menu where you purchase Buildings, Upgrades, Jobs, and Equipment. <b>Large Buttons</b> is default and fits 4 buttons per row. <b>Small Buttons</b> shrinks the size to fit 5 per row, and <b>Tiny Buttons</b> fits 6 per row. Small and Tiny may not be readable on small screens.",
				titles: ["Large Buttons", "Small Buttons", "Tiny Buttons"],
				onToggle: function () {
					var classNames = ["buttonSizeLarge", "buttonSizeSmall", "buttonSizeTiny"];
					swapClass("buttonSize", classNames[this.enabled], document.getElementById('buyHere'));
				}
			},
			masteryTab: {
				enabled: 1,
				extraTags: "alerts",
				description: "Choose what you would like to see on your Mastery Tab! <b>No Mastery Info</b> will keep the tab clean and static. <b>Alert Mastery</b> will show an alert on the tab as soon as a new Mastery becomes affordable. <b>Show Essence</b> will always show your total amount of unspent essence on the tab. <b>Hybrid Essence</b> will show your total amount of unspent essence on the tab, but will switch to the alert icon once you have enough essence for a new Mastery.",
				titles: ["No Mastery Info", "Alert Mastery", "Show Essence", "Hybrid Alerts"],
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 180)
				},
				onToggle: function () {
					updateTalentNumbers();
				}
			},
			bigPopups: {
				enabled: 1,
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 79);
				},
				get description(){
					var text = "<p>This setting applies to big popups that occur after hitting certain milestones each portal. This setting will currently block: the Improbability popup";
					if (game.global.highestLevelCleared >= 199) text += ", the popup at Corruption";
					if (game.global.highestLevelCleared >= 219) text += ", the popup at The Spire";
					if (game.global.highestLevelCleared >= 249) text += ", and the popup on reaching Magma.";
					text += "</p><p>Note that this setting only blocks large popups once your Highest Zone Reached is 20 Zones past the location of the popup</p>";
					return text;
				},
				extraTags: "alerts popups",
				titles: ["Block Big Popups", "Allow Big Popups"]

			},
			generatorStart: {
				enabled: 0,
				extraTags: "general",
				get description(){
					var text = "<p>Choose what mode the Dimensional Generator should start each run on. <b>Default Generator</b> will continue with whatever setting you were using at the end of your last run. <b>The Rest of The Settings<b> are named by what mode will be set to active at the start of each run.</p>";
					if (game.permanentGeneratorUpgrades.Supervision.owned) text += "<p><b>Hold Ctrl while clicking to open the Generator State Configuration menu</b></p>";
					return text;
				},
				get titles () {
					var arr = ["Default Generator", "Gain Fuel", "Gain Mi"];
					if (game.permanentGeneratorUpgrades.Hybridization.owned) arr.push("Hybrid");
					return arr;
				},
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 229);
				},
				secondLocation: ["togglegeneratorStartPopup"]
			},
			// showSnow: {
			// 	enabled: 1,
			// 	extraTags: "general",
			// 	description: "Disable the snow effect in the world. <b>This will take effect on the next Zone after this setting is changed</b>. This setting is temporary, and will melt when the snow does.",
			// 	titles: ["No Snow", "Show Snow"]
			// },
/*			showHoliday: {
				enabled: 1,
				extraTags: "general",
				description: "<p>Choose between <b>Show Pumpkimps</b>, <b>Bordered Pumpkimps</b>, and <b>No Pumpkimps</b>. This setting applies only to the visual effect of Pumpkimp Zones in the world, does not apply to maps, and has no impact on how many Pumpkimps or Pumpkimp Zones actually spawn. This setting is temporary and will rot away after the Pumpkimp season!</p><p><b>Show Pumpkimps</b> is the default, and displays Pumpkimp Zones as normal.</p><p><b>Bordered Pumpkimps</b> displays Pumpkimp cells by changing the border color instead of the background color.</p><p><b>No Pumpkimps</b> will not show any indicator at all that a world Zone is a Pumpkimp Zone. Pumpkimps will still spawn at the same rate.</p>",
				titles: ["No Pumpkimps", "Show Pumpkimps", "Bordered Pumpkimps"],
				locked: true
			},*/
			geneSend: {
				enabled: 0,
				locked: true,
				extraTags: "other",
				description: "<p>When <b>Using Gene Send</b> is enabled, as long as you have one Geneticist, AutoFight will automatically send soldiers to fight if they have been breeding for longer than your Geneticistassist setting.</p><p>When <b>Enforce Gene Send</b> is enabled, as long as you have one Geneticist, AutoFight will never send a group of Trimps to fight unless you are at max population or you have reached your set Geneticistassist timer.</p><p>Finally, if you choose <b>Wait For Gene Send</b> and have at least one Geneticist, AutoFight will only send Trimps to fight after they have been breeding long enough to reach your set Geneticistassist timer. This guarantees that Anticipation and Geneticist levels build up for as long as your set timer, but may result in no soldiers being sent for some time while you sit at full population.</p>",
				titles: ["No Gene Sending", "Using Gene Send", "Enforce Gene Send", "Wait For Gene Send"]
			},
			fireForJobs: {
				enabled: 0,
				extraTags: "other",
				description: "When enabled, hiring Trimps for jobs with scaling price increases (Trainer, Explorer, etc) while you have no workspaces will attempt to fire Farmers, Lumberjacks and Miners until you have enough room.",
				titles: ["Not Firing For Jobs", "Firing For Jobs"]
			},
			ctrlGigas: {
				enabled: 0,
				extraTags: "other",
				description: "When enabled, all Gigastation purchases will act as if the Ctrl key was held, regardless of whether or not it actually was held. When disabled, you will have to hold Ctrl to tell Gigastations to automatically purchase Warpstations (See Gigastation tooltip for more info).",
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 60);
				},
				titles: ["Dynamic Giga Ctrl", "Always Giga Ctrl"]
			},
			showHeirloomAnimations: {
				enabled: 1,
				extraTags: "performance",
				description: "Enable/Disable animations on Heirlooms.",
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 499);
				},
				titles: ["No Heirloom Animations", "Heirloom Animations"]
			},
			hotkeys: {
				enabled: 1,
				extraTags: "other",
				description: "Enable or disable hotkeys.",
				titles: ["Disable Hotkeys", "Enable Hotkeys"]
			},
			offlineProgress: {
				enabled: 1,
				extraTags: "other",
				description: "Disables or enables earning resources while offline. <b>Warning: If this is toggled off, no resources will be earned from Trustworthy Trimps when coming back to the game after being offline.</b> This also stops the current run timer when offline and can be helpful if you are analysing stats and do not want resources counted when there is no timer running",
				titles: ["No Offline Progress", "Offline Progress"]
			},
			pauseGame: {
				enabled: 0,
				extraTags: "other",
				description: "Pause your game. This will pause all resource gathering, offline progress, and timers. (Hotkey: Space)",
				titles: ["Not Paused", "Paused"],
				timeAtPause: 0,
				onToggle: function () {
					if (this.enabled) {
						this.timeAtPause = new Date().getTime();
						if (game.options.menu.autoSave.enabled == 1) save(false, true);
						swapClass("timer", "timerPaused", document.getElementById("portalTimer"));
						handlePauseMessage(true);
					}
					else if (this.timeAtPause) {
						var now = new Date().getTime();
						var dif = now - this.timeAtPause;
						game.global.portalTime += dif;
						game.global.lastSkeletimp += dif;
						game.global.zoneStarted += dif;
						game.global.mapStarted += dif;
						game.global.lastGeneratorTick += dif;
						game.global.lastSoldierSentAt += dif;
						this.timeAtPause = 0;
						game.global.time = 0;
						game.global.lastOnline = now;
						game.global.start = now;
						swapClass("timer", "timerNotPaused", document.getElementById("portalTimer"));
						handlePauseMessage(false);
					}
				},
				locked: true
			},
			disablePause: {
				enabled: 1,
				extraTags: "other",
				description: "You can pause the game by clicking the run timer in the bottom right of the screen. This setting allows you to remove that ability!",
				titles: ["Disable Pausing", "Enable Pausing"]
			},
			deleteSave: {
				enabled: 0,
				extraTags: "reset hard wipe clear other",
				description: "Delete your save and start fresh. Your Trimps will not be happy.",
				titles: ["Delete Save"],
				onToggle: function () {
					cancelTooltip();
					tooltip('Reset', null, 'update');
					game.global.lockTooltip = true;
					tooltipUpdateFunction = "";
					this.enabled = 0;
				}
			}
		}
	},
	talents: {
		portal: {
			description: "Unlock Portal immediately after clearing Z20.",
			name: "Portal Generator",
			tier: 1,
			purchased: false,
			icon: "eye-open",
		},
		bionic: {
			description: "<p>Automatically pick up each level of Bionic Wonderland (BW) as you pass a BW Zone. Will not work if you have already missed any BWs this run, or if you reach a Zone higher than any BW you have ever cleared before.</p><p>In addition, give all current and future copies of Bionic Wonderland the 'Fast Attacks' special modifier.</p>",
			name: "Bionic Magnet I",
			onPurchase: function (clear) {
				addMapModifier('Bionic', 'fa');
			},
			onRespec: function () {
				addMapModifier('Bionic', null, true);
			},
			tier: 1,
			purchased: false,
			icon: "magnet"
		},
		bounty: {
			description: "Unlock Bounty immediately after clearing Z15.",
			name: "Bounty Hunter",
			tier: 1,
			purchased: false,
			icon: "th-large",
		},
		housing: {
			description: "Unlock Mansion, Hotel, Nursery, Resort, Gateway, Wormhole, and Collector automatically when passing the Zone they drop at.",
			name: "Home Detector",
			tier: 1,
			purchased: false,
			icon: "home"
		},
		turkimp: {
			description: "Increases the bonus time from each Turkimp by 5 minutes, and increases the time cap by 10 minutes.",
			name: "Turkimp Tamer I",
			tier: 1,
			purchased: false,
			icon: "*spoon-knife"
		},
		explorers: {
			description: "Automatically picks up SpeedExplorer books when you pass their Zone.",
			name: "Explorer Aura I",
			tier: 1,
			purchased: false,
			icon: "*map-signs"
		},
		voidPower: {
			description: "Your Trimps gain 15% attack and health inside Void Maps.",
			name: "Void Power I",
			tier: 2,
			purchased: false,
			icon: "*heart5"
		},
		pierce: {
			description: "Reduce the amount of enemy damage that can pierce block by 25%.",
			name: "Metallic Coat",
			tier: 2,
			purchased: false,
			icon: "tint"
		},
		headstart: {
			description: "Corruption begins 5 levels earlier, at Zone 176.",
			name: "Headstart I",
			tier: 2,
			purchased: false,
			icon: "road"
		},
		foreman: {
			description: "Summon 50000 foremen to aid in construction.",
			name: "Foremany",
			tier: 2,
			purchased: false,
			onPurchase: function () {
				game.global.autoCraftModifier += 12500;
				updateForemenCount();
			},
			onRespec: function () {
				game.global.autoCraftModifier -= 12500;
				updateForemenCount();
			},
			icon: "user",
		},
		turkimp2: {
			description: "Increase the chance of finding a Turkimp by 33%.",
			name: "Turkimp Tamer II",
			tier: 2,
			purchased: false,
			requires: "turkimp",
			icon: "*spoon-knife"
		},
		scry: {
			get description(){
				return "When fighting Corrupted " + ((game.global.spiresCompleted >= 2) ? "or Healthy " : "") + "cells in Scryer Formation, grants 50% more Dark Essence and doubles your attack.";
			},
			name: "Scryhard I",
			tier: 2,
			purchased: false,
			icon: "*spinner9"
		},
		voidPower2: {
			description: "Your Trimps gain an additional 20% attack and health inside Void Maps.",
			name: "Void Power II",
			tier: 3,
			purchased: false,
			icon: "*heart5",
			requires: "voidPower"
		},
		mapLoot: {
			description: "Reduces the starting point of the Low Map Level Loot Penalty by 1 level. This allows you to earn the same amount of loot by doing a map at your current Zone number, or at your current Zone number minus 1.",
			name: "Map Reducer I",
			tier: 3,
			purchased: false,
			icon: "*gift2"
		},
		headstart2: {
			description: "Corruption begins an additional 10 levels earlier, at Zone 166.",
			name: "Headstart II",
			tier: 3,
			purchased: false,
			icon: "road",
			requires: "headstart"
		},
		doubleBuild: {
			description: "Stacked items in the Building Queue will be constructed two at a time.",
			name: "Double Build",
			tier: 3,
			purchased: false,
			icon: "*hammer"
		},
		skeletimp: {
			description: "Double the chance for a Megaskeletimp to appear instead of a Skeletimp.",
			name: "King of Bones I",
			tier: 3,
			purchased: false,
			icon: "italic",
		},
		daily: {
			description: "Gain +50% attack when running a Daily Challenge.",
			name: "Legs for Days",
			tier: 3,
			purchased: false,
			icon: "*calendar4"
		},
		hyperspeed: {
			description: "Reduce the time in between fights and attacks by 100ms.",
			name: "Hyperspeed I",
			tier: 4,
			purchased: false,
			icon: "fast-forward"
		},
		blacksmith: {
			get description () {
				return "Each cleared Zone through Z" + Math.floor((game.global.highestLevelCleared + 1) / 2) + " (half of your highest Zone reached) will drop all available equipment prestiges from maps.";
			},
			name: "Blacksmithery I",
			tier: 4,
			purchased: false,
			icon: "*hammer2"
		},
		headstart3: {
			description: "Corruption begins an additional 15 levels earlier, at Zone 151.",
			name: "Headstart III",
			tier: 4,
			purchased: false,
			icon: "road",
			requires: "headstart2"
		},
		autoStructure: {
			get description(){
				 var text = "Unlock the AutoStructure tool, allowing you to automatically purchase structures. In addition, all housing and battle territory bonuses will come with ready-to-fight Trimps inside";
				 if (game.global.highestLevelCleared >= 229) text += " (Not including the Dimensional Generator)";
				 text += "!";
				 return text;
			},
			name: "AutoStructure",
			tier: 4,
			purchased: false,
			icon: "home",
			requires: "doubleBuild",
			onPurchase: function () {
				toggleAutoStructure(true);
			},
			onRespec: function () {
				toggleAutoStructure(true, true);
			}
		},
		turkimp3: {
			description: "Increase the bonus resources gained while Well Fed from a Turkimp by 25%, from 50% to 75%.",
			name: "Turkimp Tamer III",
			tier: 4,
			purchased: false,
			requires: "turkimp2",
			icon: "*spoon-knife"
		},
		autoJobs: {
			description: "Unlock the Job Automator, the envy of Human Resourceimps across the Universe.",
			name: "AutoJobs",
			tier: 4,
			purchased: false,
			icon: "*group",
			onPurchase: function () {
				toggleAutoJobs(true);
			},
			onRespec: function () {
				toggleAutoJobs(true, true);
			}
		},
		hyperspeed2: {
			get description(){
				return "Reduce the time in between fights and attacks by an additional 100ms through Z" + Math.floor((game.global.highestLevelCleared + 1) * 0.5) + " (50% of your highest Zone reached)";
			},
			name: "Hyperspeed II",
			tier: 5,
			purchased: false,
			requires: "hyperspeed",
			icon: "fast-forward"
		},
		blacksmith2: {
			get description () {
				return "Each cleared Zone through Z" + Math.floor((game.global.highestLevelCleared + 1) * 0.75) + " (75% of your highest Zone reached) will drop all available equipment prestiges from maps.";
			},
			name: "Blacksmithery II",
			requires: "blacksmith",
			tier: 5,
			purchased: false,
			icon: "*hammer2"
		},
		magmaFlow: {
			description: "Cause two extra Magma cells to appear on any Zone that already has Magma.",
			name: "Magma Flow",
			tier: 5,
			purchased: false,
			icon: "*fire",
		},
		quickGen: {
			description: "Increase the amount of speed that the Dimensional Generator gains per Zone by 50%.",
			name: "Quick Gen",
			tier: 5,
			purchased: false,
			icon: "*diamonds"
		},
		skeletimp2: {
			description: "Reduce the minimum time between Skeletimp spawns by 10 minutes",
			name: "King of Bones II",
			tier: 5,
			purchased: false,
			icon: "italic",
			requires: "skeletimp"
		},
		explorers2: {
			description: "Start with an extra SpeedExplorer book after each Portal.",
			name: "Explorer Aura II",
			tier: 5,
			purchased: false,
			requires: "explorers",
			icon: "*map-signs"
		},
		voidPower3: {
			description: "Your Trimps gain an additional 30% attack and health inside Void Maps, and all current and future Void Maps gain the 'Fast Attacks' special modifier.",
			name: "Void Power III",
			onPurchase: function (clear) {
				if(game.global.world > 1)
				addMapModifier('Void', 'fa');
			},
			onRespec: function () {
				addMapModifier('Void', null, true);
			},
			tier: 6,
			purchased: false,
			icon: "*heart5",
			requires: "voidPower2"
		},
		blacksmith3: {
			get description () {
				return "Each cleared Zone through Z" + Math.floor((game.global.highestLevelCleared + 1) * 0.9) + " (90% of your highest Zone reached) will drop all available equipment prestiges from maps.";
			},
			name: "Blacksmithery III",
			requires: "blacksmith2",
			tier: 6,
			purchased: false,
			icon: "*hammer2"
		},
		nature: {
			description: "Increase your token trading ratio from 10:5 to 10:6",
			name: "Natural Diplomacy I",
			tier: 6,
			purchased: false,
			icon: "*tree3"
		},
		liquification: {
			get description () {
				var text = (this.purchased) ? "This mastery is increasing " : "This mastery would increase ";
				var totalSpires = game.global.spiresCompleted;
				var fluffyCount = Fluffy.isRewardActive("liquid");
				var fluffyText = "Y";
				if (fluffyCount > 0){
					if (fluffyCount == 1) fluffyText = "Counting your Fluffy bonus as half of a Spire, y";
					else fluffyText = "Counting your two Fluffy bonuses as one Spire, y"
					totalSpires += (fluffyCount * 0.5);
				}
				return "Increase your Liquification bonus by 5%, as if you had completed 1 extra Spire. " + fluffyText + "ou have completed " + totalSpires + " unique Spire" + ((totalSpires == 1) ? "" : "s") + ", giving you " + (totalSpires * 5) + "% of your highest Zone reached (through Z" + Math.floor((totalSpires / 20) * (game.global.highestLevelCleared + 1)) + "). " + text + " your bonus to " + ((totalSpires + 1) * 5) + "% of your highest Zone reached (through Z" + Math.floor(((totalSpires + 1) / 20) * (game.global.highestLevelCleared + 1)) + ").";
			},
			name: "Liquification I",
			tier: 6,
			purchased: false,
			icon: "*water"
		},
		turkimp4: {
			description: "Learn to grow your own Turkimp, increasing the bonus to +100%, and making the bonus available permanently.",
			name: "Turkimp Tamer IV",
			tier: 6,
			purchased: false,
			requires: "turkimp3",
			icon: "*spoon-knife",
			onPurchase: function(){
				document.getElementById("turkimpBuff").style.display = "block";
				if (game.global.playerGathering) setGather(game.global.playerGathering);
			},
			onRespec: function(){
				if (game.global.turkimpTimer <= 0)
					document.getElementById("turkimpBuff").style.display = "none";
				if (game.global.playerGathering) setGather(game.global.playerGathering);

			}
		},
		scry2: {
			description: "Complete an entire Void Map in Scryer Formation to earn an additional 50% Helium.",
			name: "Scryhard II",
			tier: 6,
			purchased: false,
			icon: "*spinner9",
			requires: "scry"
		},
		magmamancer: {
			description: "Magmamancers will now increase Trimp Attack by the same amount that they increase Metal. In addition, start every post-magma Zone with 5 minutes of credit already applied to your Magmamancers.",
			name: "Magmamancermancy",
			tier: 7,
			purchased: false,
			icon: "*fire2"
		},
		mapLoot2: {
			description: "Reduces the min and max number of cells by 5 when creating maps.",
			name: "Map Reducer II",
			tier: 7,
			purchased: false,
			requires: "mapLoot",
			icon: "*gift2"
		},
		nature2: {
			description: "Increase your token trading ratio more, from 10:6 to 10:8",
			name: "Natural Diplomacy II",
			tier: 7,
			purchased: false,
			requires: "nature",
			icon: "*tree3"
		},
		deciBuild: {
			description: "Buildings in the queue are constructed 10 at a time. In addition, buildings added to the queue via AutoStructure are added 10 at a time if needed.",
			name: "Deca Build",
			tier: 7,
			purchased: false,
			icon: "*hammer",
			requires: "doubleBuild"
		},
		stillRowing: {
			description: "Increase the looting bonus for completing a full row in a Spire by 50%, from 2% extra loot to 3%.",
			name: "Still Rowing I",
			tier: 7,
			purchased: false,
			icon: "align-justify"
		},
		patience: {
			description: "Anticipation can now reach 45 stacks.",
			name: "Patience",
			tier: 7,
			purchased: false,
			icon: "*clock2"
		},
		voidSpecial: {
			get description() {
				var text = "<p>Receive 1 free Void Map after using your Portal for each 100 Zones cleared last run. Helium from Void Maps is also increased by 0.25% for each Zone cleared last run.</p>";
				var amt = (game.global.lastPortal * 0.0025);
				text += "<p>You reached <b>Z" + game.global.lastPortal + "</b> last Portal, ";
				if (this.purchased) text += " earning you a bonus of ";
				else text += " which would earn you a bonus of ";
				text +=  prettify(amt * 100) + "% extra Helium and " + Math.floor(game.global.lastPortal / 100) + " Void Maps.</p>"
				return text;
			},
			name: "Void Specialization I",
			tier: 8,
			purchased: false,
			icon: "*feed"
		},
		healthStrength: {
			description: "Your Trimps gain 15% additive damage per Healthy cell in your current Zone.",
			name: "Strength in Health",
			tier: 8,
			purchased: false,
			icon: "*aid-kit"
		},
		nature3: {
			description: "Add 5 levels to the Upgrade and Stack Transfer of all 3 Empowerments of Nature, without increasing the costs.",
			name: "Natural Diplomacy III",
			tier: 8,
			purchased: false,
			requires: "nature2",
			icon: "*tree3"
		},
		liquification2: {
			get description () {
				var text = (this.purchased) ? "This mastery is increasing " : "This mastery would increase ";
				var totalSpires = game.global.spiresCompleted;
				if (game.talents.liquification.purchased) totalSpires++;
				var fluffyCount = Fluffy.isRewardActive("liquid");
				var fluffyText = "";
				if (fluffyCount > 0){
					if (fluffyCount == 1) fluffyText = " and your Fluffy bonus as half of a Spire";
					else fluffyText += " and your two Fluffy bonuses as another"
					totalSpires += (fluffyCount * 0.5);
				}
				return "Increase your Liquification bonus by another 5%, as if you had completed 1 extra Spire. Counting Liquification I as one Spire" + fluffyText + ", you have completed the equivalent of " + totalSpires + " unique Spire" + ((totalSpires == 1) ? "" : "s") + ", giving you " + (totalSpires * 5) + "% of your highest Zone reached (through Z" + Math.floor((totalSpires / 20) * (game.global.highestLevelCleared + 1)) + "). " + text + " your bonus to " + ((totalSpires + 1) * 5) + "% of your highest Zone reached (through Z" + Math.floor(((totalSpires + 1) / 20) * (game.global.highestLevelCleared + 1)) + ").";
			},
			name: "Liquification II",
			tier: 8,
			requires: "liquification",
			purchased: false,
			icon: "*water"
		},
		stillRowing2: {
			description: "Your Trimps will now gain attack equal to 2x their looting bonus from each Spire row cleared.",
			name: "Still Rowing II",
			tier: 8,
			purchased: false,
			requires: "stillRowing",
			icon: "align-justify"
		},
		amalg: {
			description: "Causes the 50% damage bonus from each Amalgamator to be compounding rather than additive.",
			name: "Amalgagreater",
			tier: 8,
			purchased: false,
			icon: "scale"
		},
		voidSpecial2: {
			get description(){
				 var text = "<p>Gain a second Void Map per 100 Zones cleared last run, but the first one is earned at Z50 (then 150, 250 etc). In addition, if Fluffy's level 6 bonus is active, this allows Fluffy to stack 1 additional Void Map, adding another 50% Helium bonus to the stack.</p>";
				 text += "<p>You reached <b>Z" + game.global.lastPortal + "</b> last Portal,";
				 if (this.purchased) text += " earning you a bonus of ";
				 else text += " which would earn you a bonus of ";
				 var maps = Math.floor((game.global.lastPortal + 50) / 100);
				 text += maps + " more Void Maps (" + (maps + Math.floor((game.global.lastPortal) / 100)) + " including Void Specialization I).</p>"
				 return text;
			},
			name: "Void Specialization II",
			tier: 9,
			purchased: false,
			icon: "*feed",
			requires: "voidSpecial"
		},
		bionic2: {
			description: "Adds Prestigious to Bionic Wonderland maps. This will make every Bionic Wonderland have two Prestige upgrades, including your first run that normally just has a RoboTrimp upgrade. In addition, gain +50% attack whenever you're in a map that is higher than your current World.",
			name: "Bionic Magnet II",
			tier: 9,
			purchased: false,
			onPurchase: function () {
				refreshMaps();
			},
			afterRespec: function () {
				refreshMaps();
			},
			icon: "magnet"
		},
		fluffyExp: {
			get description(){
				return "Fluffy gains +25% more Exp per Zone for each completed Evolution. Fluffy has Evolved " + game.global.fluffyPrestige + " time" + needAnS(game.global.fluffyPrestige) + ", " + ((this.purchased) ? "earning" : "which would earn") + " you a bonus of +" + prettify(game.global.fluffyPrestige * 25) + "% Exp.";
			},
			name: "Flufffocus",
			tier: 9,
			purchased: false,
			icon: "*library"
		},
		fluffyAbility: {
			description: "Gain one extra Fluffy ability. This works as if Fluffy Evolved, but doesn't increase Fluffy's damage bonus.",
			name: "Flufffinity",
			tier: 9,
			purchased: false,
			icon: "*infinity"
		},
		overkill: {
			description: "Allows you to Overkill yet another cell.",
			name: "Excessive",
			tier: 9,
			purchased: false,
			icon: "*fighter-jet"
		},
		crit: {
			get description(){
				var text = "<p>Adds +1 to your MegaCrit modifier, and adds 50% of your Shield Heirloom's Crit Chance to your Crit Chance again.</p>";
				if (game.heirlooms.Shield.critChance.currentBonus > 0) text += "<p>Your Shield currently has a bonus of " + game.heirlooms.Shield.critChance.currentBonus + "%, so this Mastery " + ((this.purchased) ? "is giving you" : "would give you") + " +" + (game.heirlooms.Shield.critChance.currentBonus / 2) + "% additional Crit Chance.</p>";
				else text += "<p>However, you do not currently have Crit Chance on your Shield.</p>";
				return text;
			},
			name: "Charged Crits",
			tier: 9,
			purchased: false,
			icon: "*power"
		}
		//don't forget to add new talent tier to getHighestTalentTier()
	},
	//portal
	portal: {
		Looting_II: {
			level: 0,
			locked: true,
			priceBase: 100000,
			heliumSpent: 0,
			tooltip: "Apply your skills at salvaging things from the Spire to increase all loot gained by 0.25% per level. The price for this perk increases additively, and each level will cost exactly 10000 more than the previous level.",
			additive: true,
			additiveInc: 10000,
			modifier: 0.0025
		},
		Carpentry_II: {
			level: 0,
			locked: true,
			priceBase: 100000,
			heliumSpent: 0,
			tooltip: "You've learned to look more objectively at the no longer mysterious building designs, allowing you to increase housing space by 0.25% per level. This multiplies on top of Carpentry I, but the bonus stacks additively. The price for this perk also increases additively, and each level will cost exactly 10000 more than the previous level.",
			additive: true,
			additiveInc: 10000,
			modifier: 0.0025
		},
		Motivation_II: {
			level: 0,
			locked: true,
			priceBase: 50000,
			heliumSpent: 0,
			tooltip: "Corruption and impending doom are great motivators to work a bit harder! Increases Trimp gather speed by 1% per level. The price for this perk increases additively, and each level will cost exactly 1000 more than the previous level.",
			additive: true,
			additiveInc: 1000,
			modifier: 0.01
		},
		Power_II: {
			level: 0,
			locked: true,
			priceBase: 20000,
			heliumSpent: 0,
			tooltip: "You find strength in the desire to some day return home. Anger your Trimps by making them listen to you talk about it all the time, increasing their damage by 1% per level. The price for this perk increases additively, and each level will cost exactly 500 more than the previous level.",
			additive: true,
			additiveInc: 500,
			modifier: 0.01
		},
		Toughness_II: {
			level: 0,
			locked: true,
			priceBase: 20000,
			heliumSpent: 0,
			tooltip: "You feel more grounded as you remember where you came from. Spread your toughness to your Trimps, increasing health by 1% per level. The price for this perk increases additively, and each level will cost exactly 500 more than the previous level.",
			additive: true,
			additiveInc: 500,
			modifier: 0.01
		},
		Capable: {
			level: 0,
			locked: true,
			priceBase: 1e8,
			heliumSpent: 0,
			tooltip: "You can sense great power within Fluffy, but he'll need some training. Each level of Capable allows Fluffy to gain 1 level of Experience. Respeccing to remove Capable will temporarily remove any bonuses associated with Fluffy's level and Experience, but all Exp will be saved until you add points back. Each level of Capable is 10x more expensive than the last, and buying the first level will allow Fluffy to take Portals with you.",
			max: 10,
			specialGrowth: 10,
			onChange: function(){
				Fluffy.handleBox();
			}
		},
		Cunning: {
			level: 0,
			locked: true,
			modifier: 0.25,
			priceBase: 1e11,
			heliumSpent: 0,
			get tooltip(){
				return "Fluffy demands more helium! Each level of Cunning will increase the final amount of Experience Fluffy gains from each Zone by " + Math.round(this.modifier * 100) + "% (additive)."
			}
		},
		Curious: {
			level: 0,
			locked: true,
			modifier: 30,
			priceBase: 1e14,
			heliumSpent: 0,
			get tooltip() {
				return "Fluffy is coming along, but he's coming along slowly. Each point of Curious will speed up Fluffy's progression by adding " + this.modifier + " Exp to the base amount he gains per Zone clear."
			}
		},
		Classy: {
			level: 0,
			locked: true,
			modifier: 2,
			priceBase: 1e17,
			heliumSpent: 0,
			max: 50,
			get tooltip() {
				var level = (this.levelTemp) ? this.level + this.levelTemp : this.level;
				return "Reduce the Zone that Fluffy can start earning Experience at by " + this.modifier + "." + " With " + level + " level" + needAnS(level) + " in Classy, Fluffy will start earning Experience at Z" + (301 - (level * this.modifier)) + ".";
			}
		},
		Overkill: {
			level: 0,
			locked: true,
			priceBase: 1000000,
			heliumSpent: 0,
			tooltip: "You have overcome the otherworldly objective of obtaining Overkill, outstanding! Each level of this perk will allow 0.5% of your overkill damage to harm the next enemy. If this damage kills the next enemy, you will lose no time moving through that cell. Maximum of 30 levels.",
			max: 30
		},
		Resourceful: {
			level: 0,
			locked: true,
			modifier: 0.05,
			priceBase: 50000,
			heliumSpent: 0,
			tooltip: "Spending time with limited maps has taught you how to be more resourceful. Each level will allow you to spend 5% fewer resources <b>than the current cost</b> per level on all structures."
		},
		Coordinated: {
			level: 0,
			locked: true,
			priceBase: 150000,
			modifier: 0.98,
			heliumSpent: 0,
			currentSend: 1,
			onChange: function (overrideLevel) {
				var newValue = 1;
				var level = (overrideLevel) ? this.level + this.levelTemp : this.level;
				var currentMod = 0.25 * Math.pow(this.modifier, level);
				currentMod += 1;
				for (var x = 0; x < game.upgrades.Coordination.done; x++){
					newValue = Math.ceil(newValue * currentMod);
				}
				if (overrideLevel) return newValue;
				this.currentSend = newValue;
			},
			tooltip: "Use knowledge gained while studying Coordinated Bad Guys to reduce the amount of Trimps required per level of Coordination by 2% <b>of current amount (compounding)</b>, while keeping the stat bonus the same."
		},
		Siphonology: {
			level: 0,
			locked: true,
			max: 3,
			priceBase: 100000,
			heliumSpent: 0,
			tooltip: "Use strategies discovered in alternate dimensions to siphon Map Bonus Damage stacks from lower level maps. For each level of Siphonology, you will earn stacks from maps one level lower than your current Zone number. Maximum of 3 levels.",
		},
		Anticipation: {
			level: 0,
			locked: true,
			max: 10,
			modifier: 0.02,
			priceBase: 1000,
			heliumSpent: 0,
			onChange: function () {
				if (this.level <= 0) {
					game.global.antiStacks = 0;
					updateAntiStacks();
				}
			},
			get tooltip(){
				var time = game.talents.patience.purchased ? 45 : 30;
				return "Use your experiences in understanding the attention span of Trimps to increase the damage dealt by all soldiers based on how long it took to get an army together. Increases damage by 2% per level per second up to " + time + " seconds. Maximum of 10 levels."
			}
		},
		Resilience: {
			level: 0,
			locked: true,
			modifier: 0.1,
			priceBase: 100,
			heliumSpent: 0,
			tooltip: "Use your acquired skills in Trimp strengthening to gain a 10% <b>compounding</b> increase to total Trimp health."
		},
		Meditation: {
			level: 0,
			locked: true,
			modifier: 1,
			priceBase: 75,
			heliumSpent: 0,
			max: 7,
			tooltip: "Your experiences in the Dimension of Strong Things have taught you the value of taking your time. Every level of Meditation will increase your Trimps' gather speed by 1% for every 10 minutes spent on the same Zone, up to 1 hour, even when offline. This bonus is reset after clearing the current Zone. Maximum of 7 levels.",
			getBonusPercent: function (justStacks) {
				var timeOnZone = getGameTime() - game.global.zoneStarted;
				timeOnZone = Math.floor(timeOnZone / 600000);
				if (timeOnZone > 6) timeOnZone = 6;
				else if (timeOnZone <= 0) return 0;
				if (justStacks) return timeOnZone;
				return (timeOnZone * this.modifier * this.level);
			}
		},
		Relentlessness:{
			level: 0,
			locked: true,
			modifier: 0.05,
			otherModifier: 0.3,
			priceBase: 75,
			heliumSpent: 0,
			tooltip: "You've seen too many Trimps fall, it's time for more aggressive training. Bringing back these memories will cause your Trimps to gain a 5% chance to critically strike for +130% damage at level 1, and they will gain an additional 5% crit chance and 30% crit damage per level. Maximum of 10 levels.",
			max: 10
		},
		Carpentry: {
			level: 0,
			locked: true,
			modifier: 0.1,
			priceBase: 25,
			heliumSpent: 0,
			tooltip: "You've built quite a few houses and you're getting pretty good at it. Bringing your expertise in construction back through the portal will allow you to house 10% more Trimps per level <b>than the current amount (compounds)</b>."
		},
		Artisanistry: {
			level: 0,
			locked: true,
			modifier: 0.05,
			priceBase: 15,
			heliumSpent: 0,
			tooltip: "You're beginning to notice ways to make equally powerful equipment with considerably fewer resources. Bringing back these new ideas will allow you to spend 5% fewer resources <b>than the current cost</b> per level on all equipment."
		},
		Range: {
			level: 0,
			locked: true,
			modifier: 2,
			max: 10,
			priceBase: 1,
			heliumSpent: 0,
			tooltip: "Use your new-found leadership skills in order to increase the minimum damage your Trimps deal by 2% per level. Stacks up to 10 times, doesn't affect max damage. At 10 levels, you will get a minimum of 100% benefit from all attack damage per strike.",
		},
		Agility: {
			level: 0,
			modifier: 0.05,
			priceBase: 4,
			heliumSpent: 0,
			tooltip: "Crank your portal into overdrive, requiring extra helium but increasing the clock speed of the Universe. Each level reduces the time between Trimp and Bad Guy attacks by 5% <b>of the current time (compounds)</b>. Maximum of 20 levels.",
			max: 20
		},
		Bait: {
			level: 0,
			modifier: 1,
			priceBase: 4,
			heliumSpent: 0,
			tooltip: "A few of these in your traps are sure to bring in extra Trimps. Each level allows traps to catch $modifier$ extra Trimp."
		},
		Trumps: {
		//fiveTrimpMax worldUnlock
			locked: 0,
			level: 0,
			modifier: 1,
			priceBase: 3,
			heliumSpent: 0,
			tooltip: "Practicing aggressive strategizing allows you to earn $modifier$ extra max population from each battle territory bonus."
		},
		//breed main
		Pheromones: {
			level: 0,
			modifier: 0.1,
			priceBase: 3,
			heliumSpent: 0,
			tooltip: "Bring some pheromones with you to ensure that your Trimps will permanently breed 10% faster."
		},
		//trapThings main
		Packrat: {
			modifier: 0.2,
			heliumSpent: 0,
			tooltip: "Study the ancient, secret Trimp methods of hoarding. Each level increases the amount of stuff you can shove in each Barn, Shed, and Forge by 20%.",
			priceBase: 3,
			level: 0
		},
		//updatePs updates
		//gather main
		Motivation: {
			modifier: 0.05,
			heliumSpent: 0,
			tooltip: "Practice public speaking with your Trimps. Each level increases the amount of resources that workers produce by 5%.",
			priceBase: 2,
			level: 0
		},
		//startFight main
		Power: {
			level: 0,
			modifier: 0.05,
			priceBase: 1,
			heliumSpent: 0,
			tooltip: "Trimps learn through example. Spending some time bench pressing dead Elephimps should inspire any future Trimps to become stronger too. Adds 5% attack permanently to your Trimps."
		},
		//startFight main
		Toughness: {
			modifier: 0.05,
			priceBase: 1,
			heliumSpent: 0,
			tooltip: "Pay your Trimps to knock you around a little bit. By learning to not be such a wuss, your Trimps will be less wussy as well. Adds 5% health permanently to your Trimps.",
			level: 0
		},
		//rewardResources main
		Looting: {
			modifier: 0.05,
			priceBase: 1,
			heliumSpent: 0,
			tooltip: "Walk back through the empty Zones, learning how to milk them for every last drop. Each level permanently increases the amount of resources gained from battle by 5%.",
			level: 0
		},
	},
	c2: {
		Discipline: 0,
		Metal: 0,
		Size: 0,
		Balance: 0,
		Meditate: 0,
		Trimp: 0,
		Trapper: 0,
		Electricity: 0,
		Coordinate: 0,
		Slow: 0,
		Nom: 0,
		Mapology: 0,
		Toxicity: 0,
		Watch: 0,
		Lead: 0,
		Obliterated: 0,
		Eradicated: 0
	},
	challenges: {
		Daily: {
			get description(){
				return (isSaving) ? "" : getDailyChallenge(0);
			},
			filter: function () {
				return (game.global.highestLevelCleared >= 99);
			},
			start: function () {
				startDaily();
			},
			abandon: function () {
				abandonDaily();
			},
			fireAbandon: true,
			unlockString: "reach Zone 100"
		},
		Discipline: {
			description: "Tweak the portal to bring you back to a universe where Trimps are less disciplined, in order to teach you how to be a better Trimp trainer. Your Trimps' minimum damage will be drastically lower, but their high end damage will be considerably higher. Completing The Dimension Of Anger will cause Trimp damage to return to normal.",
			filter: function () {
				return (game.resources.helium.owned >= 30 || game.global.totalHeliumEarned >= 30);
			},
			allowSquared: true,
			squaredDescription: "Tweak the portal to bring you back to a universe where Trimps are less disciplined, in order to teach you how to be a better Trimp trainer. Your Trimps' minimum damage will be drastically lower, but their high end damage will be considerably higher.",
			unlocks: "Range",
			unlockString: "have 30 total helium"
		},
		Metal: {
			description: "Tweak the portal to bring you to an alternate reality, where the concept of Miners does not exist, to force yourself to become frugal with equipment crafting strategies. If you complete The Dimension Of Anger without disabling the challenge, miners will re-unlock.",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 24);
			},
			abandon: function () {
				game.worldUnlocks.Miner.fire();
				if (this.heldBooks >= 1){
					game.upgrades.Speedminer.locked = 0;
					if (this.heldBooks > 1){
						game.upgrades.Speedminer.allowed += this.heldBooks - 1;
					}
					unlockUpgrade("Speedminer");
				}
				if (this.heldMegaBooks >= 1){
					game.upgrades.Megaminer.locked = 0;
					if (this.heldMegaBooks > 1){
						game.upgrades.Megaminer.allowed += this.heldMegaBooks - 1;
					}
					unlockUpgrade("Megaminer");
				}
				if (this.holdMagma)
					unlockUpgrade("Magmamancers");
			},
			allowSquared: true,
			squaredDescription: "Tweak the portal to bring you to alternate reality, where the concept of Miners does not exist, to force yourself to become frugal with equipment crafting strategies.",
			fireAbandon: false,
			heldBooks: 0,
			heldMegaBooks: 0,
			holdMagma: false,
			unlocks: "Artisanistry",
			unlockString: "reach Zone 25"
		},
		Size: {
			description: "Tweak the portal to bring you to an alternate reality, where Trimps are bigger and stronger, to force yourself to figure out a way to build larger housing. Your Trimps will gather 50% more resources, but your housing will fit 50% fewer Trimps. If you complete The Dimension of Anger without disabling the challenge, your stats will return to normal.",
			completed: false,
			filter: function () {
				return (game.global.world >= 35 || game.global.highestLevelCleared >= 34);
			},
			abandon: function () {
				game.jobs.Farmer.modifier *= (2/3);
				game.jobs.Lumberjack.modifier *= (2/3);
				game.jobs.Miner.modifier *= (2/3);
				game.resources.trimps.maxMod = 1;
			},
			start: function () {
				game.jobs.Farmer.modifier *= 1.5;
				game.jobs.Lumberjack.modifier *= 1.5;
				game.jobs.Miner.modifier *= 1.5;
				game.resources.trimps.maxMod = 0.5;
			},
			allowSquared: true,
			squaredDescription: "Tweak the portal to bring you to an alternate reality, where Trimps are bigger and stronger, to force yourself to figure out a way to build larger housing. Your Trimps will gather 50% more resources, but your housing will fit 50% fewer Trimps.",
			fireAbandon: true,
			unlocks: "Carpentry",
			unlockString: "reach Zone 35"
		},
		Balance: {
			description: "Your scientists have discovered a chaotic dimension filled with helium. All enemies have 100% more health, enemies in world deal 17% more damage, and enemies in maps deal 135% more damage. Starting at Zone 6, every time an enemy in the world is slain you will gain a stack of 'Unbalance'. Every time an enemy in a map is slain, you will lose a stack of Unbalance. Each stack of Unbalance reduces your health by 1%, but increases your Trimps' gathering speed by 1%. Unbalance can only stack to 250. Completing <b>Zone 40</b> with this challenge active will grant an additional 100% of all helium earned up to that point. This challenge is repeatable!",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 39);
			},
			balanceStacks: 0,
			addStack: function () {
				this.balanceStacks++;
				if (this.balanceStacks > 250) this.balanceStacks = 250;
				else {
					game.global.soldierHealthMax *= 0.99;
					if (game.global.soldierHealth > game.global.soldierHealthMax) game.global.soldierHealth = game.global.soldierHealthMax;
				}
				if (this.balanceStacks > this.highestStacks) this.highestStacks = this.balanceStacks;
			},
			removeStack: function () {
				this.balanceStacks--;
				if (this.balanceStacks < 0) this.balanceStacks = 0;
				else {
					game.global.soldierHealthMax /= 0.99;
				}
			},
			abandon: function () {
				this.balanceStacks = 0;
				updateBalanceStacks();
			},
			getHealthMult: function (formatText) {
				var num = Math.pow(0.99, this.balanceStacks);
				if (formatText) return Math.floor((1 - num) * 100) + "%";
				return num;
			},
			getGatherMult: function (formatText) {
				if (formatText) return this.balanceStacks + "%";
				return ((this.balanceStacks * 0.01) + 1);
			},
			allowSquared: true,
			squaredDescription: "Your scientists have discovered a chaotic dimension filled with unharvestable but pretty helium. All enemies have 100% more health, enemies in world deal 17% more damage, and enemies in maps deal 135% more damage. Starting at Zone 6, every time an enemy in the world is slain you will gain a stack of 'Unbalance'. Every time an enemy in a map is slain, you will lose a stack of Unbalance. Each stack of Unbalance reduces your health by 1%, but increases your Trimps' gathering speed by 1%. Unbalance can only stack to 250.",
			highestStacks: 0,
			fireAbandon: true,
			heldHelium: 0,
			heliumThrough: 40,
			unlockString: "reach Zone 40"
		},
		Scientist: {
			get description (){
				var is5 = (game.global.highestLevelCleared >= 129 && game.global.sLevel >= 4);
				return "Attempt modifying the portal to " + ((is5) ? "retain positive qualities from previous dimensions" : "harvest resources when travelling") + ". Until you perfect the technique, you will start with <b>_</b> science but will be unable to research or hire scientists" + ((is5) ? " and <b style='color: maroon'>all enemy damage will be 10X higher</b>" : "") + ". Choose your upgrades wisely! Clearing <b>'The Block' (11)</b> with this challenge active will cause you to * each time you use your portal."
			},
			mustRestart: true,
			completed: false,
			heldBooks: 0,
			filter: function (fromCheck) {
				if (game.global.sLevel == 0) return (game.global.highestLevelCleared >= 39);
				else if (game.global.sLevel == 1) return (game.global.highestLevelCleared >= 49);
				else if (game.global.sLevel == 2) {
					return (game.global.highestLevelCleared >= 89);
				}
				else if (game.global.sLevel == 3){
					 return (game.global.highestLevelCleared >= 109);
				}
				else if (game.global.sLevel >= 4){
					return (game.global.highestLevelCleared >= 129);
				}
				else return true;
			},
			abandon: function () {
				game.worldUnlocks.Scientist.fire();
				document.getElementById("scienceCollectBtn").style.display = "block";
				for (var x = 0; x < this.heldBooks; x++){
					unlockUpgrade("Speedscience");
				}
				message("You can research science again!", "Notices");
				if (game.global.sLevel >= 4) {
					if (game.buildings.Warpstation.craftTime > 0){
						game.buildings.Warpstation.craftTime = 0;
						addNewSetting('forceQueue');
					}
					document.getElementById("autoPrestigeBtn").style.display = "block";
				}
			},
			start: function () {
				document.getElementById("scienceCollectBtn").style.display = "none";
				game.resources.science.owned = getScientistInfo(getScientistLevel());
				game.global.autoUpgrades = false;
				game.global.autoPrestiges = 0;
				toggleAutoPrestiges(true);
				toggleAutoUpgrades(true);
			},
			onLoad: function () {
				document.getElementById("scienceCollectBtn").style.display = "none";
			},
			fireAbandon: false,
			unlockString: function () {
				if (game.global.sLevel == 0) return "reach Zone 40";
				else if (game.global.sLevel == 1) return "reach Zone 50";
				else if (game.global.sLevel == 2) return "reach Zone 90";
				else if (game.global.sLevel == 3) return "reach Zone 110";
				else if (game.global.sLevel >= 4) return "reach Zone 130";
			}
		},
		Meditate: {
			description: "Visit a dimension where everything is stronger, in an attempt to learn how to better train your Trimps. All enemies will have +100% health and +50% attack, but your Trimps will gather 25% faster. Completing <b>'Trimple of Doom' (33)</b> will return the world to normal.",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 44);
			},
			allowSquared: true,
			squaredDescription: "Visit a dimension where everything is stronger, in an attempt to learn how to better train your Trimps. All enemies will have +100% health and +50% attack, but your Trimps will gather 25% faster.",
			unlocks: "Meditation",
			unlockString: "reach Zone 45"
		},
		Decay: {
			description: "Tweak the portal to bring you to an alternate reality, where added chaos will help you learn to create a peaceful place. You will gain 10x loot (excluding helium), 10x gathering, and 5x Trimp attack, but a stack of Decay will accumulate every second. Each stack of Decay reduces loot, gathering, and Trimp attack by 0.5% of the current amount. These stacks reset each time a Blimp is killed and cap at 999. Completing <b>Zone 55</b> with this challenge active will allow you to select the Gardens biome when creating maps, and all future Gardens maps created will gain +25% loot.",
			completed: false,
			abandon: function () {
				updateDecayStacks();
			},
			fireAbandon: true,
			stacks: 0,
			filter: function () {
				return (game.global.highestLevelCleared >= 54);
			},
			unlockString: "reach Zone 55",
		},
		Trimp: {
			description: "Tweak the portal to bring you to a dimension where Trimps explode if more than 1 fights at a time. You will not be able to learn Coordination, but completing <b>'The Block' (11)</b> will teach you how to keep your Trimps alive for much longer.",
			completed: false,
			heldBooks: 0,
			fireAbandon: true,
			allowSquared: true,
			squaredDescription: "Tweak the portal to bring you to a dimension where Trimps explode if more than 1 fights at a time. You will not be able to learn Coordination.",
			replaceSquareThresh: 40,
			replaceSquareReward: 3,
			replaceSquareGrowth: 3,
			unlocks: "Resilience",
			filter: function () {
				return (game.global.world >= 60 || game.global.highestLevelCleared >= 59);
			},
			abandon: function () {
				if (game.challenges.Trimp.heldBooks > 1)
					game.upgrades.Coordination.allowed += game.challenges.Trimp.heldBooks - 1;
				if (game.challenges.Trimp.heldBooks > 0)
					unlockUpgrade("Coordination");
				document.getElementById("realTrimpName").innerHTML = "Trimps";
			},
			start: function () {
				document.getElementById("realTrimpName").innerHTML = "Trimp";
			},
			onLoad: function () {
				this.start();
			},
			unlockString: "reach Zone 60"
		},
		Trapper: {
			description: "Travel to a dimension where Trimps refuse to breed in captivity, teaching yourself new ways to take advantage of situations where breed rate is low. Clearing <b>'Trimple Of Doom' (33)</b> with this challenge active will return your breeding rate to normal.",
			completed: false,
			heldBooks: 0,
			fireAbandon: true,
			allowSquared: true,
			squaredDescription: "Travel to a dimension where Trimps refuse to breed in captivity, good luck!",
			replaceSquareThresh: 50,
			replaceSquareGrowth: 2,
			unlocks: "Anticipation",
			filter: function () {
				return (game.global.highestLevelCleared >= 69);
			},
			start: function () {
				document.getElementById('trimpsBreedingTitle').innerHTML = "bored";
			},
			onLoad: function () {
				this.start();
			},
			abandon: function () {
				document.getElementById('trimpsBreedingTitle').innerHTML = "breeding";
				for (var x = 0; x < game.challenges.Trapper.heldBooks; x++){
					unlockUpgrade("Potency");
				}
			},
			unlockString: "reach Zone 70"
		},
		Electricity: {
			description: "Use the keys you found in the Prison to bring your portal to an extremely dangerous dimension. In this dimension enemies will electrocute your Trimps, stacking a debuff with each attack that damages Trimps for 10% of total health per turn per stack, and reduces Trimp attack by 10% per stack. Clearing <b>'The Prison' (80)</b> will reward you with an additional 200% of all helium earned up to but not including Zone 80. This is repeatable!",
			completed: false,
			hasKey: false,
			filter: function () {
				return (game.global.prisonClear > 0);
			},
			fireAbandon: true,
			abandon: function () {
				game.challenges.Electricity.stacks = 0;
				updateElectricityStacks();
			},
			heldHelium: 0,
			heliumThrough: 79,
			allowSquared: true,
			attacksInARow: 0,
			squaredDescription: "Use the keys you found in the Prison to bring your portal to an extremely dangerous dimension. In this dimension enemies will electrocute your Trimps, stacking a debuff with each attack that damages Trimps for 10% of total health per turn per stack, and reduces Trimp attack by 10% per stack.",
			stacks: 0,
			unlockString: "clear 'The Prison' at Zone 80"
		},
		Frugal: {
			description: "Bring yourself to a dimension where Equipment is cheap but unable to be prestiged, in order to teach yourself better resource and equipment management. Completing <b>'Dimension of Anger' (20)</b> with this challenge active will return missing books to maps, and your new skills in Frugality will permanently cause MegaBooks to increase gather speed by 60% instead of 50%.",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 99);
			},
			start: function (reset) {
				var mod = (reset) ? 1.2 : 1.1;
				for (var item in game.equipment){
					var cost = (item == "Shield") ? "wood" : "metal";
					game.equipment[item].cost[cost][1] = mod;
				}
			},
			onLoad: function () {
				this.start();
			},
			fireAbandon: true,
			abandon: function () {
				this.start(true);
			},
			unlockString: "reach Zone 100"
		},
		Life: {
			description: "Explore a dimension that is normally populated by the Undead, but is currently plagued by a quickly moving virus that can bring things back to life. All enemies in this dimension have 500% extra attack and 1000% extra health. Attacking a normal undead enemy gives your Trimps 1 stack of Unliving, which increases Trimp attack and health by 10% (additive) per stack. Trimps can have a maximum of 150 stacks of Unliving, and attacking a Living enemy will remove 5 stacks of Unliving. Completing <b>Zone 110</b> will reward you with an additional 400% of all helium earned up to that point. This is repeatable!",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 109)
			},
			heliumMultiplier: 4,
			heldHelium: 0,
			heliumThrough: 110,
			unlockString: "reach Zone 110",
			stacks: 150,
			maxStacks: 150,
			fireAbandon: true,
			lowestStacks: 150,
			getHealthMult: function(forDisplay){
				var mult = (this.stacks / 10);
				if (forDisplay) return (prettify(mult * 100) + "%");
				return 1 + mult;
			},
			arrayHolder: [[]],
			start: function () {
				updateLivingStacks();
			},
			abandon: function () {
				if (document.getElementById('livingBuff')) document.getElementById('goodGuyName').removeChild(document.getElementById('livingBuff'));
			}
		},
		Mapocalypse: {
			description: "Experience a slightly distorted version of the 'Electricity' dimension, to help understand the relationship between maps and the world. Everything will work exactly the same as Electricity, but all maps will have an extra 300% difficulty. Clearing <b>'The Prison' (80)</b> will cause the world to return to normal. You <b>will</b> receive the Helium reward from Electricity.",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 114);
			},
			fireAbandon: true,
			abandon: function () {
				for (var x = 0; x < game.global.mapsOwnedArray.length; x++){
					game.global.mapsOwnedArray[x].difficulty = parseFloat(game.global.mapsOwnedArray[x].difficulty) - this.difficultyIncrease;
				}
			},
			unlocks: "Siphonology",
			unlockString: "reach Zone 115",
			difficultyIncrease: 3
		},
		Coordinate: {
			description: "Visit a dimension where Bad Guys are Coordinated but never fast, to allow you to study naturally evolved Coordination. Completing <b>'Dimension of Anger' (20)</b> with this challenge active will cause all enemies to lose their Coordination.",
			completed: false,
			allowSquared: true,
			squaredDescription: "Visit a dimension where Bad Guys are Coordinated but never fast, chip 'em down!",
			replaceSquareFreq: 3,
			replaceSquareThresh: 30,
			filter: function () {
				return (game.global.highestLevelCleared >= 119);
			},
			unlocks: "Coordinated",
			unlockString: "reach Zone 120"
		},
		Crushed: {
			description: "Journey to a dimension where the atmosphere is rich in helium, but Bad Guys have a 50% chance to Critical Strike for +400% damage unless your Block is as high as your current Health. Clearing <b>Bionic Wonderland (Z125)</b> will reward you with an additional 400% of all helium earned up to but not including Z125. This challenge is repeatable.",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 124);
			},
			critsTaken: 0,
			fireAbandon: true,
			abandon: function () {
				document.getElementById("badCrit").innerHTML = "";
				document.getElementById("badCanCrit").style.display = "none";
			},
			heldHelium: 0,
			heliumThrough: 124,
			unlockString: "reach Zone 125"
		},
		Slow: {
			description: "Legends tell of a dimension inhabited by incredibly fast Bad Guys, where blueprints exist for a powerful yet long forgotten weapon and piece of armor. All Bad Guys will attack first in this dimension, but clearing <b>Zone 120</b> with this challenge active will forever-after allow you to create these new pieces of equipment.",
			completed: false,
			allowSquared: true,
			squaredDescription: "Legends tell of a dimension inhabited by incredibly fast Bad Guys, and you seem to want to go there to prove something. All Bad Guys will attack first in this dimension, watch your health!",
			filter: function () {
				return (game.global.highestLevelCleared >= 129);
			},
			unlockString: "reach Zone 130"
		},
		Nom: {
			description: "Travel to a dimension where Bad Guys enjoy the taste of Trimp. Whenever a group of Trimps dies, the Bad Guy will eat them, gaining 25% (compounding) more attack damage and healing for 5% of their maximum health. The methane-rich atmosphere causes your Trimps to lose 5% of their total health after each attack, but the Bad Guys are too big and slow to attack first. Clearing <b>Zone 145</b> will reward you with an additional 350% of all helium earned up to that point. This is repeatable!",
			completed: false,
			allowSquared: true,
			squaredDescription: "Travel to a dimension where Bad Guys enjoy the taste of Trimp. Whenever a group of Trimps dies, the Bad Guy will eat them, gaining 25% (compounding) more attack damage and healing for 5% of their maximum health. The methane-rich atmosphere causes your Trimps to lose 5% of their total health after each attack, but the Bad Guys are too big and slow to attack first.",
			heliumMultiplier: 3.5,
			filter: function () {
				return (game.global.highestLevelCleared >= 144);
			},
			heldHelium: 0,
			heliumThrough: 145,
			unlockString: "reach Zone 145"
		},
		Mapology: {
			description: "Travel to a dimension where maps are scarce, in an attempt to learn to be more resourceful. You will earn one map Credit for each World Zone you clear, and it costs 1 credit to run 1 map. Completing <b>Zone 100</b> with this challenge active will return you to your original dimension. Double prestige from Scientist IV will not work during this challenge.",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 149);
			},
			fireAbandon: true,
			allowSquared: true,
			squaredDescription: "Travel to a dimension where maps are scarce, in an attempt to learn to be more resourceful. You will earn one map Credit for each World Zone you clear, and it costs 1 credit to run 1 map. <b>Double prestige from Scientist IV and the Blacksmithery mastery will not function while this challenge is active.</b>",
			abandon: function (){
				document.getElementById("mapCreditsLeft").innerHTML = "";
			},
			onLoad: function () {
				updateMapCredits();
			},
			unlocks: "Resourceful",
			credits: 0,
			unlockString: "reach Zone 150"
		},
		Toxicity: {
			description: "Travel to a dimension rich in helium, but also rich in toxic Bad Guys. All Bad Guys have 5x attack and 2x health. Each time you attack a Bad Guy, your Trimps lose 5% of their health, and toxins are released into the air which reduce the breeding speed of your Trimps by 0.3% (of the current amount), but also increase all resources obtained by 0.15%, stacking up to 1500 times. These stacks will reset when you clear a Zone. Completing <b>Zone 165</b> with this challenge active will reward you with an additional 200% of all helium earned up to that point. This is repeatable!",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 164);
			},
			highestStacks: 0,
			heldHelium: 0,
			heliumThrough: 165,
			heliumMultiplier: 2,
			stacks: 0,
			maxStacks: 1500, //Changing this breaks the feat spaghetti
			stackMult: 0.997,
			lootMult: 0.15,
			allowSquared: true,
			squaredDescription: "Travel to a dimension filled with the glory that comes from killing toxic Bad Guys. All Bad Guys have 5x attack and 2x health. Each time you attack a Bad Guy, your Trimps lose 5% of their health, and toxins are released into the air which reduce the breeding speed of your Trimps by 0.3% (of the current amount), but also increase all loot found by 0.15%, stacking up to 1500 times. These stacks will reset when you clear a Zone.",
			unlockString: "reach Zone 165"
		},
		Devastation: {
			description: "Travel to a harsh dimension where Trimps are penalized for the mistakes of previous generations. If your army is killed at any point, any overkill damage will be applied 750% to the next group of Trimps to fight. Completing <b>Imploding Star (Zone 170)</b> will return the world to normal.",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 169);
			},
			lastOverkill: -1,
			unlocks: "Overkill",
			unlockString: "reach Zone 170"
		},
		Watch: {
			description: "Travel to a strange dimension where life is easier but harder at the same time. At the end of each World Zone any available equipment upgrades will drop, and any unassigned Trimps will be split evenly amongst Farmer, Lumberjack, and Miner. However, resource production and drops from all sources will be halved, and all enemies will deal 25% more damage. Completing <b>Zone 180</b> with this challenge active will reward you with an additional 200% of all helium earned up to that point.",
			filter: function () {
				return (game.global.highestLevelCleared >= 179);
			},
			allowSquared: true,
			squaredDescription: "Travel to a strange dimension where life is easier but harder at the same time. At the end of each World Zone any available equipment upgrades will drop, and any unassigned Trimps will be split evenly amongst Farmer, Lumberjack, and Miner. However, resource production and drops from all sources will be halved, and all enemies will deal 25% more damage. Relax and let the Trimps figure it out for themselves, you know you want to.",
			heliumMultiplier: 2,
			heldHelium: 0,
			heliumThrough: 180,
			unlockString: "reach Zone 180",
			enteredMap: false
		},
		Lead: {
			description: "Travel to a dimension where life is easier or harder depending on the time. Odd numbered Zones will cause double resources to be earned from all sources, and will give your Trimps 50% extra attack. Starting an even numbered Zone will cause all enemies to gain 200 stacks of <b>Momentum</b>. Clearing a World cell will cause 1 stack to be lost, and each stack will increase the enemy's damage and health by 4%, and block pierce by 0.1%. If your Trimps attack without killing their target, they will lose 0.03% of their health per enemy stack. Completing <b>Zone 180</b> with this challenge active will reward you with an additional 300% of all helium earned up to that point.",
			filter: function () {
				return (game.global.highestLevelCleared >= 179);
			},
			heliumMultiplier: 3,
			stacks: 0,
			heldHelium: 0,
			allowSquared: true,
			squaredDescription: "Travel to a dimension where life is easier or harder depending on the time. Odd numbered Zones will cause double resources to be earned from all sources, and will give your Trimps 50% extra attack. Starting an even numbered Zone will cause all enemies to gain 200 stacks of <b>Momentum</b>. Clearing a World cell will cause 1 stack to be lost, and each stack will increase the enemy's damage and health by 4%, and block pierce by 0.1%. If your Trimps attack without killing their target, they will lose 0.03% of their health per enemy stack.",
			heliumThrough: 180,
			unlockString: "reach Zone 180",
			fireAbandon: true,
			abandon: function () {
				if (document.getElementById('determinedBuff')) document.getElementById('determinedBuff').style.display = "none";
			}
		},
		Corrupted: {
			get description(){ return "Travel to a dimension where enemies have 3X attack and Corruption runs rampant, beginning at Z60. The Corruption in this dimension grants helium, but 50% less than normal. Improbabilities and Void Maps will still not gain strength or double reward until Z" + mutations.Corruption.start(true) + ". Completing <b>Zone 190</b> with this challenge active will reward you with an extra 200% helium earned from any source up to that point, and will instantly transport you back to your normal dimension."},
			filter: function () {
				return (game.global.highestLevelCleared >= 189);
			},
			heliumMultiplier: 2,
			heldHelium: 0,
			heliumThrough: 190,
			hiredGenes: false,
			unlockString: "reach Zone 190"
		},
		Domination: {
			description: "Travel to a dimension where the strongest Bad Guys gain strength from those weaker than them. Most Bad Guys have 90% less health and attack, but the final Bad Guy in every World Zone and Map has 2.5x more damage, 7.5x more health, and heal for 5% every time they attack your Trimps. But they also drop three times as much Helium! Clearing <b>Zone 215</b> will also reward you with an extra 100% of helium earned from any source up to that point, and will instantly teleport you back to your normal dimension!",
			filter: function () {
				return (game.global.highestLevelCleared >= 214);
			},
			heliumMultiplier: 1,
			heldHelium: 0,
			heliumThrough: 215,
			unlockString: "reach Zone 215",
			fireAbandon: true,
			abandon: function(){
				var elem = document.getElementById('dominationDebuffContainer');
				if (elem) elem.style.display = 'none';
			}
		},
		Obliterated: {
			get squaredDescription() {
				var num = prettify(1e12);
				return "Against your better judgement, travel to a dimension that's simply just not very friendly. Liquimps are unable to liquify, enemies have " + num + "x attack and health, and equipment is " + num + "x more expensive. Every 10 Zones, enemy attack and health will increase by another 10x."
			},
			filter: function () {
				return (game.global.highestLevelCleared >= 424);
			},
			replaceSquareFreq: 1,
			replaceSquareThresh: 10,
			onlySquared: true,
			allowSquared: true,
			fireAbandon: true,
			unlockString: "reach Zone 425",
			mustRestart: true,
			zoneScaling: 10,
			zoneScaleFreq: 10
		},
		Eradicated: {
			get squaredDescription() {
				var num = prettify(game.challenges.Eradicated.scaleModifier);
				return "If you thought Obliterated was not very friendly, wait until you see this dimension! Liquimps are unable to liquify, enemies have " + num + "x attack and health, and equipment is " + num + "x more expensive. Every 2 Zones, enemy attack and health will increase by another " + game.challenges.Eradicated.zoneScaling + "x. <b>However, you'll earn 1 extra Coordination per Zone you clear! Oh and Magma, Corruption, and Nature start at Z1.</b>"
			},
			filter: function () {
				return (game.global.totalSquaredReward >= 4500);
			},
			replaceSquareFreq: 1,
			replaceSquareThresh: 2,
			replaceSquareReward: 10,
			replaceSquareGrowth: 2,
			scaleModifier: 1e20,
			onlySquared: true,
			allowSquared: true,
			fireAbandon: true,
			unlockString: "reach 4500% Challenge<sup>2</sup> bonus",
			mustRestart: true,
			zoneScaling: 3,
			zoneScaleFreq: 2,
			start: function(){
				startTheMagma();
			}
		}
	},
	stats:{
		trimpsKilled: {
			title: "Dead Trimps",
			value: 0,
			valueTotal: 0
		},
		battlesWon: {
			title: "Battles Won",
			value: 0,
			valueTotal: 0
		},
		battlesLost: {
			title: "Battles Lost",
			value: 0,
			valueTotal: 0
		},
		gemsCollected: {
			title: "Gems Collected",
			value: 0,
			valueTotal: 0,
			display: function () {
				return ((this.value + this.valueTotal) > 0)
			}
		},
		mapsCleared: {
			title: "Maps Cleared",
			value: 0,
			valueTotal: 0
		},
		zonesCleared: {
			title: "Zones Cleared",
			value: 0,
			valueTotal: 0
		},
		trimpsFired: {
			title: "Trimps Fired",
			value: 0,
			valueTotal: 0,
			//This stat was added in 3.6 and the numbers will look bad for a few months.
			//Open maybe 10/21/16ish
			display: function () {return false;}
		},
		spentOnWorms: {
			title: "Wormholed Helium",
			display: function () {
				return ((this.value + this.valueTotal) > 0)
			},
			value: 0,
			valueTotal: 0
		},
		goldenUpgrades: {
			title: "Golden Upgrades",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0
		},
		heliumHour: {
			title: "He/Hour this Run",
			display: function () {
				return (game.resources.helium.owned > 0);
			},
			value: function (useTemp) {
				var timeThisPortal = new Date().getTime() - game.global.portalTime;
				if (timeThisPortal < 1) return 0;
				timeThisPortal /= 3600000;
				var resToUse = (useTemp) ? game.global.tempHighHelium : game.resources.helium.owned;
				return Math.floor(resToUse / timeThisPortal);
			}
		},
		bestHeliumHourThisRun: {
			title: "Best He/Hr this Run",
			display: function () {
				return (this.storedValue > 0);
			},
			storedValue: 0,
			atZone: 0,
			value: function () {
				return prettify(game.stats.bestHeliumHourThisRun.storedValue) + ", Z:" + game.stats.bestHeliumHourThisRun.atZone;
			},
			evaluate: function () { //called from portalTime
				var heHr = game.stats.heliumHour.value();
				if (heHr > this.storedValue){
					this.storedValue = heHr;
					this.atZone = game.global.world;
				}
			},
			onPortal: function () {
				this.storedValue = 0;
				this.atZone = 0;
			},
			noFormat: true
		},
		totalHelium: {
			title: "Total Helium Earned",
			display: function () {
				return (game.global.totalHeliumEarned > 0);
			},
			valueTotal: function () {
				return game.global.totalHeliumEarned;
			}
		},
		bestHeliumHour: {
			title: "Best He/Hour all Runs",
			display: function () {
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		dailyBonusHelium: {
			title: "Daily Challenge Helium",
			display: function () {
				return (this.value >0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0
		},
		zonesLiquified: {
			title: "Zones Liquified",
			display: function() {
				return (this.value > 0 || this.valueTotal > 0)
			},
			value: 0,
			valueTotal: 0
		},
		highestVoidMap: {
			title: "Highest Void Map Clear",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0,
			noAdd: true,
			evaluate: function() { //called on completion of void map
				if (game.global.world > this.value) this.value = game.global.world;
				if (game.global.world > this.valueTotal) this.valueTotal = game.global.world;
			}
		},
		totalVoidMaps: {
			title: "Total Void Maps Cleared",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0,
		},
		totalHeirlooms: { //added from createHeirloom to value
			title: "Heirlooms Found",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0
		},
		cellsOverkilled: {
			title: "World Cells Overkilled",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0
		},
		trimpsGenerated: {
			title: "Trimps from Generator",
			display: function() {
				return (this.value > 0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0
		},
		decayedNurseries: {
			title: "Burned Nurseries",
			display: function() {
				return (this.value > 0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0
		},
		bestTokens: {
			get title () {
				if (game.global.statsMode == "current") return "Tokens This Run"
				return "Most Tokens";
			},
			display: function () {
				return (this.value > 0 || this.valueTotal > 0)
			},
			value: 0,
			valueTotal: 0,
			noAdd: true,
			keepHighest: true
		},
		amalgamators: {
			title: "Amalgamators Befriended",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0)
			},
			value: 0,
			valueTotal: 0
		},
		bestFluffyExp: {
			get title () {
				 if (game.global.statsMode == "current") return "Fluffy Exp This Run"
				 return "Best Fluffy Exp"
			},
			display: function () {
				return (this.value > 0 || this.valueTotal > 0)
			},
			value: 0,
			valueTotal: 0,
			noAdd: true,
			keepHighest: true
		},
		fluffyExpHour: {
			title: "Fluffy Exp/Hr this Run",
			display: function () {
				return (game.stats.bestFluffyExp.value > 0);
			},
			value: function () {
				var timeThisPortal = new Date().getTime() - game.global.portalTime;
				if (timeThisPortal < 1) return 0;
				timeThisPortal /= 3600000;
				return Math.floor(game.stats.bestFluffyExp.value / timeThisPortal);
			}
		},
		bestFluffyExpHourThisRun: {
			title: "Best Fluffy Exp/Hr this Run",
			display: function () {
				return (this.storedValue > 0);
			},
			storedValue: 0,
			atZone: 0,
			value: function () {
				return prettify(game.stats.bestFluffyExpHourThisRun.storedValue) + ", Z:" + game.stats.bestFluffyExpHourThisRun.atZone;
			},
			evaluate: function () { //called from portalTime
				var xpHr = game.stats.fluffyExpHour.value();
				if (xpHr > this.storedValue){
					this.storedValue = xpHr;
					this.atZone = game.global.world;
				}
			},
			onPortal: function () {
				this.storedValue = 0;
				this.atZone = 0;
			},
			noFormat: true
		},
		bestFluffyExpHour: {
			title: "Best Fluffy Exp/Hr",
			display: function () {
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		totalPortals: {
			title: "Total Portals Used",
			display: function () {
				return (game.global.totalPortals > 0);
			},
			valueTotal: function () {
				return game.global.totalPortals;
			}
		},
		planetsBroken: {
			title: "Planets Broken",
			display: function () {
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		highestLevel: {
			title: "Highest Zone",
			valueTotal: function () {
				return game.global.highestLevelCleared + 1;
			}
		},
		tdKills: {
			title: "Trap/Tower Kills",
			value: 0,
			valueTotal: 0,
			display: function(){
				return (playerSpire.initialized);
			}
		}
	},
	generatorUpgrades: {
		Efficiency: {
			base: 5e8,
			baseCost: 8,
			upgrades: 0,
			modifier: 1,
			tickAtFuel: function(fuel){
				return Math.floor(Math.sqrt(fuel) * ((this.base * 0.1 * this.upgrades) + this.base));
			},
			cost: function(){
				return this.baseCost + (8 * this.upgrades);
			},
			description: function(){
				var burnRate = getFuelBurnRate();
				return "Your Generator currently grants " + prettify(scaleNumberForBonusHousing(this.tickAtFuel(burnRate))) + " Max Trimps per tick at " + burnRate + " fuel (the amount of fuel needed to tick). Purchase this to increase the Generator's efficiency by 10% (additive)";
			}
		},
		Capacity: {
			base: 3,
			baseCost: 32,
			upgrades: 0,
			modifier: 3,
			baseIncrease: 0.4,
			cost: function(){
				return this.baseCost + (32 * this.upgrades);
			},
			nextModifier: function(){
				return this.baseIncrease + this.modifier;
			},
			description: function(){
				return "Your Generator can currently store " + prettify(this.modifier) + " fuel. Purchase this to increase the fuel capacity by " + prettify(this.baseIncrease) + ". The more fuel you have in storage, the more housing you'll create per tick!";
			}
		},
		Supply: {
			base: 0.2,
			baseCost: 64,
			baseIncrease: 0.02,
			upgrades: 0,
			modifier: 0.2,
			cost: function(){
				return this.baseCost + (64 * this.upgrades);
			},
			nextModifier: function(){
				return this.baseIncrease + this.modifier;
			},
			description: function(){
				var currentAmt = this.modifier;
				var maxZone = ((currentAmt - 0.2) / 0.01) + mutations.Magma.start();
				return "The Magma at Zone " + mutations.Magma.start() + " contains 0.2 fuel per cell, and each Zone after that can drop 0.01 more. Your generator can currently only harvest a max of " + prettify(this.modifier) + " per cell, meaning some fuel after Z" + prettify(maxZone) + " will be unharvestable. Purchase this upgrade to increase the amount you can harvest per cell by <b>0.02</b>, taking advantage of <b>2 extra Zones</b>.";
			}
		},
		Overclocker: {
			base: 0.5,
			baseCost: 512,
			baseIncrease: 0.01,
			upgrades: 0,
			modifier: 0.5,
			cost: function () {
				return this.baseCost + (32 * this.upgrades);
			},
			nextModifier: function () {
				if (this.upgrades == 0) return this.modifier;
				return this.modifier * (1 - this.baseIncrease);
			},
			description: function () {
				var requires = "<p class='" + ((game.permanentGeneratorUpgrades.Hybridization.owned && game.permanentGeneratorUpgrades.Storage.owned) ? "green" : "red") + "'>Requires Hybridization and Storage.</p>";
				var text = requires + "<p>The first level of this upgrade will cause the Dimensional Generator to overclock instead of wasting fuel whenever you find more fuel than you can store. Overclocking will cause an instant Generator tick at a base of 50% effectiveness.</p><p>Every upgrade purchased after the first will reduce the Overclocking penalty by 1%, compounding.</p>";
				if (this.upgrades > 0)
					text += "<p>Your current Overclocker effectiveness is " + ((1 - this.modifier) * 100).toFixed(2) + "%. Next level, your Overclocker effectiveness will be " + ((1 - (this.modifier * (1 - this.baseIncrease))) * 100).toFixed(2) + "%.</p>";
				return text;
			}
		}
	},
	permanentGeneratorUpgrades: {
		Hybridization: {
			description: "Unlock the ability to switch your Dimensional Generator to Hybrid mode. Hybrid mode will automatically switch to Gain Fuel when fuel is below max, and Gain Mi when fuel is full.",
			cost: 300,
			owned: false
		},
		Storage: {
			description: "Unlock extra fuel storage. This storage will always be equal to your normal fuel cap and will only store extra fuel above your normal cap. Fuel in this extra storage does not increase generator Trimps/tick, but acts as nice padding to help prevent wasted fuel. Hybrid mode will attempt to fill your extra storage halfway.",
			cost: 600,
			owned: false
		},
		Shielding: {
			description: "Reduce the amount of Magmite that decays after each portal by 10% (additive)",
			cost: 1050,
			owned: false
		},
		Slowburn: {
			description: "Reduce the rate of fuel consumption per tick by 0.1, from 0.5 to 0.4",
			cost: 1875,
			owned: false
		},
		Supervision: {
			description: "<p>Gain 3 Automation/Micromanagement tools for your Generator!</p><ul><li>Gain the ability to pause the Dimensional Generator by clicking the clock.</li><li>Get a sweet button to configure specific Zones to switch Generator states at. You'll also gain the ability to Ctrl + Click the Generator Start setting in the Settings menu to open up the same interface.</li><li>Add a Slider to your Generator window, allowing you to lower your maximum fuel capacity and gain greater control over Overclocker. Lowering your capacity below your stored amount of fuel will not waste any fuel, but the first time Overclocker is triggered, all extra fuel will be consumed.</li></ul>",
			cost: 2000,
			owned: false,
			onPurchase: function() {
				var elem = document.getElementById('generatorWindow');
				if (elem != null)
					elem.innerHTML = getGeneratorHtml();
				updateGeneratorInfo();
			}
		},
		Simulacrum: {
			description: "All new generated dimensions now come with copies of your Trimps inside them. Gone are the days of ramping up breeding to fill your dimensions with Trimps!",
			cost: 2500,
			owned: false
		}
	},
	//Total 4448% after 4.6
	tierValues: [0, 0.3, 1, 2.5, 5, 10, 20, 40, 80, 160],
	//rip colorsList, 11/28/15 - 11/28/17. He served us well until it became obvious that CSS was better.
	//colorsList: ["white", "#155515", "#151565", "#551555", "#954515", "#651515", "#951545", "#35a5a5", "#d58565", "#d53535"],
	achievements: {
		zones: {
			finished: 0,
			title: "Zone Progress",
			description: function (number) {
				return "Complete Zone " + this.breakpoints[number];
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return game.global.highestLevelCleared + " / " + this.breakpoints[this.finished];
				return "Highest is " + game.global.highestLevelCleared;
			},
			evaluate: function () { return game.global.highestLevelCleared},
			breakpoints: [2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 350, 400, 450, 500],
			tiers: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8],
			names: ["This is Easy", "Blimp Slayer", "Groundbreaker", "The Beginning", "Determined", "Professor", "Trimp Aficionado", "Slayer of Planets", "Motivated", "Electric", "Stronk", "Endurance", "Unwavering", "Coordinated", "Resolved", "Steadfast", "Grit", "Perseverance", "Persistence", "Tenacity", "The Instigator", "The Destroyer", "The Eradicator", "The Exterminator", "Heat Maker", "Heat Hater", "Heat Breaker", "Heat Slayer", "Heat Expert", "Heat Bender", "Volcanic", "Magma Master", "Acre of Nature", "Aspirer", "Insane", "Spire Master"],
			icon: "icomoon icon-compass2",
			newStuff: []
		},
		damage: {
			finished: 0,
			title: "Trimp Damage",
			description: function (number) {
				return "Reach " + prettify(this.breakpoints[number]) + " displayed damage";
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(this.highest) + " / " + prettify(this.breakpoints[this.finished]);
				return "Highest is " + prettify(this.highest);
			},
			highest: 0,
			breakpoints: [100, 100000, 1e+11, 1e+17, 1e+23, 1e+29, 1e+35, 1e+41, 1e+47, 1e+53, 1e+60, 1e+67],
			tiers: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
			names: ["Lead Trimps", "Silver Trimps", "Golden Trimps", "Copper Trimps", "Platinum Trimps", "Iron Trimps", "Steel Trimps", "Obsidian Trimps", "Cobalt Trimps", "Topaz Trimps", "Diamond Trimps", "Transcendental Trimps"],
			icon: "icomoon icon-bomb",
			newStuff: []
		},
		trimps: {
			finished: 0,
			highest: 0,
			title: "Trimps Owned",
			description: function (number) {
				return "Have  " + prettify(this.breakpoints[number]) + " total Trimps";
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(Math.floor(this.highest)) + " / " + prettify(this.breakpoints[this.finished]);
				return "Highest is " + prettify(Math.floor(this.highest));
			},
			breakpoints: [50, 150, 300, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000],
			tiers: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4],
			names: ["Too Many Trimps", "Overcrowding", "This Is Trimp", "It Takes a Tribe", "It Takes a Town", "It Takes a City", "A Milli Trimpi", "Trimpsponential Growth", "MMMEGATRIMPS", "It Takes a Nation", "It Takes a Planet", "It Takes a Universe"],
			icon: "icomoon icon-group",
			newStuff: []
		},
		housing: {
			finished: 0,
			title: "Real Estate",
			description: function (number) {
				if (number == 9) return "Use the Dimensional Generator";
				return "Build your first  " + this.breakpoints[number];
			},
			breakpoints: ["Hut", "House", "Mansion", "Hotel", "Resort", "Gateway", "Wormhole", "Collector", "Warpstation", "Generator"],
			tiers: [1, 1, 1, 1, 2, 2, 2, 2, 3, 5],
			names: ["Tiny Homes", "Residential Development", "Taste for Luxury", "Fancy", "The Skyline", "Dimensional Drift", "Too Cool For Helium", "Space From Stars", "To Infinity and Beyond", "Mass Generation"],
			icon: "icomoon icon-building-o",
			newStuff: []
		},
		portals: {
			finished: 0,
			title: "Total Portals",
			description: function (number) {
				var s = (number > 0) ? "s" : "";
				return "Use the Portal " + prettify(this.breakpoints[number]) + " time" + s;
			},
			display: function () {
				return (game.global.totalPortals > 0);
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return this.evaluate() + " / " + this.breakpoints[this.finished];
				return this.evaluate() + " total";
			},
			evaluate: function () { return game.global.totalPortals},
			breakpoints: [1, 3, 10, 20, 50, 100, 200, 500],
			tiers: [1, 2, 2, 2, 3, 3, 4, 4],
			names: ["A Trimp Through Time", "When The Wild Things Are", "A Time Like No Other", "Venti Timeachino", "Time of Your Life", "Centennial Trimper", "Amnesia", "Dedicated Traveller"],
			icon: "icomoon icon-history",
			newStuff: []
		},
		totalZones: {
			finished: 0,
			title: "Total Zone Clears",
			description: function (number) {
				return "Clear  " + prettify(this.breakpoints[number]) + " total Zones";
			},
			evaluate: function () {
				return game.stats.zonesCleared.value + game.stats.zonesCleared.valueTotal;
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return this.evaluate() + " / " + this.breakpoints[this.finished];
				return prettify(this.evaluate()) + " total";
			},
			breakpoints: [30, 70, 130, 200, 400, 777, 1000, 1500, 10000, 50000],//total Zones according to stats
			tiers: [2, 2, 3, 3, 3, 4, 4, 5, 7, 7],
			names: ["Pathfinder", "Bushwhacker", "Pioneer", "Seeker", "Adventurer", "Lucky Resolve", "GigaClearer", "Globetrotter", "Vanquisher", "Conquistador"],
			icon: "icomoon icon-globe3",
			newStuff: []
		},
		totalMaps: {
			finished: 0,
			title: "Total Map Clears",
			description: function (number) {
				return "Clear  " + prettify(this.breakpoints[number]) + " total Maps";
			},
			display: function () {
				return (this.evaluate() > 0);
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(this.evaluate()) + " / " + prettify(this.breakpoints[this.finished]);
				return prettify(this.evaluate()) + " total";
			},
			evaluate: function () {
				return game.stats.mapsCleared.value + game.stats.mapsCleared.valueTotal;
			},
			breakpoints: [50, 100, 2000, 5000, 10000, 20000, 50000, 100000],//total maps according to stats
			tiers: [1, 2, 2, 3, 3, 4, 4, 5],
			names: ["Map Maker", "Map Runner", "Map Destroyer", "Map Annihilator", "Map Slaughterer", "Map Commander", "Maptain", "Cartographer"],
			icon: "icomoon icon-map4",
			newStuff: []
		},
		totalHelium: {
			finished: 0,
			title: "Helium Collection",
			description: function (number) {
				return "Gather " + prettify(this.breakpoints[number]) + " total Helium";
			},
			progress: function (){
				if (this.breakpoints.length > this.finished) return prettify(Math.floor(this.evaluate() * 10000) / 10000) + " / " + prettify(this.breakpoints[this.finished]);
				return prettify(this.evaluate()) + " total";
			},
			evaluate: function () {
				return game.global.totalHeliumEarned;
			},
			display: function () {
				return (game.global.totalHeliumEarned > 0);
			},
			breakpoints: [100, 10e2, 10e3, 10e4, 10e5, 10e6, 10e7, 10e8, 10e10, 10e11, 10e13, 10e15],
			tiers: [1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 8, 8],
			names: ["Cool", "Crisp", "Brisk", "Chilly", "Frosty", "Frigid", "Frozen", "Gelid", "Glacial", "Freaking Cold", "Arctic", "Absolute Zero"],
			icon: "glyphicon glyphicon-oil",
			newStuff: []
		},
		heliumHour: {
			finished: 0,
			title: "Helium Per Hour",
			description: function (number) {
				return "Reach " + prettify(this.breakpoints[number]) + " Helium Per Hour";
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(Math.floor(this.evaluate() * 10000) / 10000) + " / " + prettify(this.breakpoints[this.finished]);
				return "Currently at " + prettify(this.evaluate());
			},
			evaluate: function () {
				return game.stats.heliumHour.value();
			},
			display: function () {
				return (game.global.totalHeliumEarned > 0);
			},
			breakpoints: [10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e9, 1e11, 1e13, 1e15, 5e17],
			tiers: [2, 3, 3, 4, 4, 5, 6, 7, 7, 8, 8, 9],
			names: ["Coldlector", "Centelium", "Frosty Tanker", "Blimp Snatcher", "Squeaky Dasher", "Quick N Cool", "Hour Bender", "Acquired Frost", "Vacuum", "Levitator", "Soarer", "Cool Runnings"],
			icon: "icomoon icon-cloudy2",
			newStuff: []
		},
		totalHeirlooms: {
			finished: 0,
			title: "Heirloom Collection",
			description: function (number) {
				var number = this.breakpoints[number];
				var s = (number > 1) ? "s" : "";
				return "Collect " + prettify(number) + " Heirloom" + s;
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return this.evaluate() + " / " + this.breakpoints[this.finished];
				return prettify(this.evaluate()) + " total";
			},
			evaluate: function () {
				return game.stats.totalHeirlooms.value + game.stats.totalHeirlooms.valueTotal;
			},
			display: function () {
				return (game.global.totalPortals >= 5);
			},
			breakpoints: [1, 10, 40, 100, 500, 1111, 2000, 5000, 10000],
			tiers: [2, 2, 3, 3, 4, 5, 6, 7, 8],
			names: ["Finder", "Gatherer", "Accumulator", "Fancier", "Aficionado", "Devotee", "Connoisseur", "Expert", "Curator"],
			icon: "icomoon icon-archive",
			newStuff: []
		},
		totalGems: {
			finished: 0,
			title: "Gem Collection",
			description: function (number) {
				var number = this.breakpoints[number];
				var s = (number > 1) ? "s" : "";
				return "Collect  " + prettify(number) + " Gem" + s;
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(this.evaluate()) + " / " + prettify(this.breakpoints[this.finished]);
				return prettify(this.evaluate()) + " total";
			},
			evaluate: function () {
				return game.stats.gemsCollected.value + game.stats.gemsCollected.valueTotal;
			},
			breakpoints: [1, 1e+9, 1e+21, 1e+30, 1e+39, 1e+48],//total gems according to statistics
			tiers: [1, 2, 3, 4, 5, 6],
			names: ["What's This For?", "Collector of Shinies", "Dragimp Lover", "Expert of Shinies", "Jeweller", "Gemaster"],
			icon: "icomoon icon-diamond",
			newStuff: []
		},
		dailyHelium: {
			finished: 0,
			title: "Daily Bonus",
			description: function (number) {
				var number = this.breakpoints[number];
				return "Earn " + prettify(number) + " Helium from the Daily Challenge";
			},
			evaluate: function () {
				return game.stats.dailyBonusHelium.value + game.stats.dailyBonusHelium.valueTotal;
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(this.evaluate()) + " / " + prettify(this.breakpoints[this.finished]);
				return prettify(this.evaluate()) + " total";
			},
			breakpoints: [5e5, 1e6, 5e6, 2.5e7, 2e9, 1e12, 1e15, 1e21],
			display: function () {
				return (game.global.highestLevelCleared >= 99);
			},
			tiers: [3, 4, 5, 6, 7, 8, 8, 9],
			names: ["Daytermined", "Daydicated", "Daystiny", "Daylighted", "Daystroyer", "Daylusional", "Dayrailed", "Daypocalyptic"],
			icon: "icomoon icon-sun",
			newStuff: []
		},
		humaneRun: {
			finished: 0,
			title: "Humane Run",
			description: function (number){
				var number = this.breakpoints[number];
				return "<span style='font-size: .8em'>Reach Z" + number + " after losing no more than one fight per Zone.</span>";
			},
			evaluate: function () {
				if (!this.earnable || game.stats.battlesLost.value > this.lastZone + 1) return 0;
				return game.global.world;
			},
			progress: function () {
				if (!this.earnable && this.lastZone == -1) return "You need to portal to become eligible";
				if (!this.earnable) return "You lost more than once on Z" + this.lastZone;
				if (game.stats.battlesLost.value > this.lastZone + 1) return "You lost too many fights!";
				if (game.stats.battlesLost.value == this.lastZone + 1) return "You've lost once this Zone, be careful!";
				return "Still Earnable!";
			},
			earnable: true,
			lastZone: 0,
			breakpoints: [5, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600],
			tiers: [1, 4, 5, 6, 7, 7, 7, 7, 8, 8, 8, 9],
			names: ["Sitter", "Watchdog", "Nanny", "Caretaker", "Supervisor", "Advocate", "Guardian", "Coddler", "Savior", "Defender", "Trimp Lover", "Righteous"],
			icon: "glyphicon glyphicon-eye-open",
			newStuff: []
		},
		blockTimed: {
			finished: 0,
			title: "Speed: The Block",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "Clear The Block in less than " + number + " from start of run";
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			display: function () {
				return (game.global.totalPortals >= 1 || this.finished >= 1);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 240, 120, 60],//In minutes
			tiers: [1, 1, 2, 2],
			names: ["Block Hobbyist", "Block Apprentice", "Block Professional", "Block Rockstar"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		wallTimed: {
			finished: 0,
			title: "Speed: The Wall",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "Clear The Wall in less than " + number + " from start of run";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 10 && (game.global.totalPortals >= 1 || this.finished >= 1));
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 240, 120, 60],//In minutes
			tiers: [2, 2, 2, 3],
			names: ["Wall Novice", "Wall Student", "Wall Contender", "Wall Scaler"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		angerTimed: {
			finished: 0,
			title: "Speed: Anger",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "Clear DoA in less than " + number + " from start of run";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 14 && (game.global.totalPortals >= 1 || this.finished >= 1));
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 240, 120, 60, 1],//In minutes
			tiers: [2, 2, 3, 3, 8],
			names: ["Angry Jogger", "Angry Runner", "Angry Sprinter", "Angry Racer", "Angry Teleporter"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		doomTimed: {
			finished: 0,
			title: "Speed: Doom",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "Clear ToD in less than " + number + " from start of run";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 19 && (game.global.totalPortals >= 1 || this.finished >= 1));
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 240, 120, 60],//In minutes
			tiers: [2, 3, 3, 4],
			names: ["Walk to Doom", "Trot to Doom", "Canter to Doom", "Gallop to Doom"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		prisonTimed: {
			finished: 0,
			title: "Speed: The Prison",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "Clear Prison in less than " + number + " from start of run";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 32 && (game.global.totalPortals >= 1 || this.finished >= 1));
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 360, 240, 180, 150, 120, 105, 90, 10], //In minutes
			tiers: [3, 4, 4, 5, 5, 5, 6, 6, 8],
			names: ["Prison Odyssey", "Prison Expedition", "Prison Adventure", "Prison Trek", "Prison Tour", "Prison Road Trip", "Prison Hike", "Prison Jog", "Prison Sprint"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		bionicTimed: {
			finished: 0,
			title: "Speed: Bionic",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Bionic Wonderland in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 79);
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [1440, 1200, 720, 480, 210, 150], //In minutes
			tiers: [4, 4, 5, 5, 6, 6],
			names: ["Lover of Bots", "Friend of Bots", "Acquaintance of Bots", "Bot Disliker", "Bot Hater", "Bot Slayer"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		starTimed: {
			finished: 0,
			title: "Speed: Star",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Imploding Star in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 124);
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [1680, 1080, 390, 180, 150, 50, 5], //In minutes
			tiers: [5, 5, 5, 6, 6, 7, 8],
			names: ["Cosmic Curiosity", "Star Struck", "Space Speeder", "Intense Inertia", "Stellar Striker", "Insane Imploder", "Born Imploded"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		spireTimed: {
			finished: 0,
			title: "Speed: Spire",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear the Spire in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 169);
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [1300, 900, 500, 200, 175, 60, 2],
			tiers: [6, 6, 6, 7, 7, 7, 8],
			names: ["Spire Trialer", "Spire Rider", "Spire Strider", "Spire Glider", "Spire Flier", "Inspired", "Spire Spirer"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		spire2Timed: {
			finished: 0,
			title: "Speed: Spire II",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Spire II in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 269);
			}, 
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [500, 200, 120, 60, 10],
			tiers: [6, 7, 8, 8, 9],
			names: ["Toxic Treader", "Toxic Trotter", "Toxic Traveller", "Toxic Tempo", "Toxic Teleporter"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		spire3Timed: {
			finished: 0,
			title: "Speed: Spire III",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Spire III in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 369);
			}, 
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 240, 120, 80, 20],
			tiers: [6, 7, 8, 8, 9],
			names: ["Chillin", "Arctic Accelerator", "Rimy Runner", "Subzero Sprinter", "Frigid and Furious"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		spire4Timed: {
			finished: 0,
			title: "Speed: Spire IV",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Spire IV in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 469);
			}, 
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [4320, 2880, 1440, 300, 60],
			tiers: [8, 8, 8, 8, 9],
			names: ["Windy Walker", "Gusty Gait", "Breeze Breaker", "Zippy Zephyr", "Temporal Tempest"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		oneOffs: {
			//Turns out this method of handling the feats does NOT scale well... adding stuff to the middle is a nightmare
			finished: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			title: "Feats",
			get descriptions () {
				return ["Complete the Dimension of Anger before buying Bounty", "Reach Z30 with no respec and 60 or less He spent", "Have over " + prettify(1e6) + " traps at once", "Die 50 times to a single Voidsnimp", "Beat Balance, never having more than 100 stacks", "Reach Zone 10 with 5 or fewer dead Trimps", "Reach exactly 1337 he/hr", "Attack 20 times without dying in Electricity", "Create a perfect Map", "Use up all 7 Daily Challenges", "Equip a magnificent or better Staff and Shield", "Reach Z60 with 1000 or fewer dead Trimps", "Reach Z120 without using manual research", "Reach Z75 without buying any housing", "Find an uncommon heirloom at Z146 or higher", "Spend over " + prettify(250e3) + " total He on Wormholes", "Reach Z60 with rank III or lower equipment", "Kill an Improbability in one hit", "Beat a Lv 60+ Destructive Void Map with no deaths", "Beat Crushed without being crit past Z5", "Kill an enemy with 100 stacks of Nom", "Break the Planet with 5 or fewer lost battles", "Reach Z60 without hiring a single Trimp", "Complete a Zone above 99 without falling below 150 stacks on Life", "Spend at least 10 minutes breeding an army with Geneticists", "Beat Toxicity, never having more than 400 stacks", "Own 100 of all housing buildings", "Overkill every possible world cell before Z60", "Complete Watch without entering maps or buying Nurseries", "Complete Lead with 100 or fewer lost battles", "Build your 10th Spire Floor", "Kill " + prettify(1e6) + " enemies in your Spire", "Equip a Magmatic Staff and Shield", "Bring a world enemy's attack below 1", "Complete Lead with 1 or fewer Gigastations", "Complete Corrupted without Geneticists", "Complete a Void Map at Z215 on Domination", "Complete The Spire with 0 deaths", "Overkill an Omnipotrimp", "Defeat a Healthy enemy with 200 stacks of wind", "Build up a Poison debuff that's 1000x higher than your attack", "Earn a Challenge<sup>2</sup> bonus of 2000%", "Complete a Bionic Wonderland map 45 levels higher than your Zone number", "Beat the Spire with no respec and " + prettify(100e6) + " or less He Spent", "Defeat an enemy on Obliterated", "Find an Amalgamator on Z1", "Get 10 Red Crits in a row", "Beat Z75 on the Scientist V challenge", "Gain at least 01189998819991197253 He from one Bone Portal", "Kill an Enemy on Eradicated", "Complete Spire V with no deaths", "Build your 20th Spire Floor", "Complete a Bionic Wonderland map 200 levels higher than your Zone number", "Complete Spire II on the Coordinate challenge", "Beat Spire II with no respec and " + prettify(1e9) + " or less He spent", "Beat Imploding Star on Obliterated", "Close 750 Nurseries at the same time", "Earn Dark Essence with no respec and 0 He spent", "Reach Magma on Obliterated", "Break the Planet on Eradicated"];
			},
			tiers: [2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9],
			description: function (number) {
				return this.descriptions[number];
			},
			filters: [19, 29, 29, -1, 39, 59, -1, 79, -1, 99, 124, 59, 119, 74, -1, -1, 59, 59, 59, 124, 144, 59, 59, 109, -1, 164, 59, -1, 179, 179, 199, 199, 229, 245, 179, 189, 214, 199, 229, 299, 299, 65, 169, 199, 424, 349, -1, 129, 399, 549, 599, 199, 324, 299, 299, 424, 229, 179, 424, 549],
			icon: "icomoon icon-flag",
			names: ["Forgot Something", "Underachiever", "Hoarder", "Needs Block", "Underbalanced", "Peacekeeper", "Elite Feat", "Grounded", "Maptastic", "Now What", "Swag", "Workplace Safety", "No Time for That", "Tent City", "Consolation Prize", "Holey", "Shaggy", "One-Hit Wonder", "Survivor", "Thick Skinned", "Great Host", "Unbroken", "Unemployment", "Very Sneaky", "Extra Crispy", "Trimp is Poison", "Realtor", "Gotta Go Fast", "Grindless", "Leadership", "Defender", "Stoned", "Swagmatic", "Brr", "Unsatisfied Customer", "Organic Trimps", "Fhtagn", "Invincible", "Mighty", "Mother Lode", "Infected", "Challenged", "Bionic Sniper", "Nerfed", "Obliterate", "M'Algamator", "Critical Luck", "AntiScience", "HeMergency", "Eradicate", "Invisible", "Power Tower", "Bionic Nuker", "Hypercoordinated", "Nerfeder", "Imploderated", "Wildfire", "Unessenceted", "Melted", "Screwed"],
			newStuff: []
		}
	},

	heirlooms: { //Basic layout for modifiers. Steps can be set specifically for each modifier, or else default steps will be used
		//NOTE: currentBonus is the only thing that will persist!
		values: [10, 20, 30, 50, 150, 300, 800, 2000, 5000],
		slots: [1,2,2,3,3,4,4,5,5],
		defaultSteps: [[1, 2, 1], [2, 3, 1], [3, 6, 1], [6, 12, 1], [16, 40, 2], [32, 80, 4], [64, 160, 8], [128, 320, 16], [256, 640, 32]],
		rarityNames: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Magnificent', 'Ethereal', 'Magmatic', 'Plagued'],
		rarities:[[7500,2500,-1,-1,-1,-1,-1,-1,-1],[2000,6500,1500,-1,-1,-1,-1,-1,-1],[500,4500,5000,-1,-1,-1,-1,-1,-1],[-1,3200,4300,2500,-1,-1,-1,-1,-1],[-1,1600,3300,5000,100,-1,-1,-1,-1],[-1,820,2400,6500,200,80,-1,-1,-1],[-1,410,1500,7500,400,160,30,-1,-1],[-1,200,600,8000,800,320,80,-1,-1],[-1,-1,-1,7600,1600,640,160,-1,-1],[-1,-1,-1,3500,5000,1200,300,-1,-1],[-1,-1,-1,-1,8000,1570,350,80,-1],[-1,-1,-1,-1,6000,3170,680,150,-1],[-1,-1,-1,-1,3000,5000,1650,350,-1],[-1,-1,-1,-1,-1,4500,3000,2000,500]],
		rarityBreakpoints:[41,60,80,100,125,146,166,181,201,230,300,400,500],
		priceIncrease: [2, 1.5, 1.25, 1.19, 1.15, 1.12, 1.1, 1.06, 1.04],
		canReplaceMods: [true, true, true, true, true, true, true, true, false],
		Staff: {
			metalDrop: {
				name: "Metal Drop Rate",
				currentBonus: 0,
			},
			foodDrop: {
				name: "Food Drop Rate",
				currentBonus: 0,
			},
			woodDrop: {
				name: "Wood Drop Rate",
				currentBonus: 0,
			},
			gemsDrop: {
				name: "Gem Drop Rate",
				currentBonus: 0,
			},
			fragmentsDrop: {
				name: "Fragment Drop Rate",
				currentBonus: 0,
			},
			FarmerSpeed: {
				name: "Farmer Efficiency",
				currentBonus: 0,
			},
			LumberjackSpeed: {
				name: "Lumberjack Efficiency",
				currentBonus: 0,
			},
			MinerSpeed: {
				name: "Miner Efficiency",
				currentBonus: 0,
			},
			DragimpSpeed: {
				name: "Dragimp Efficiency",
				currentBonus: 0,
			},
			ExplorerSpeed: {
				name: "Explorer Efficiency",
				currentBonus: 0,
			},
			ScientistSpeed: {
				name: "Scientist Efficiency",
				currentBonus: 0,
			},
			FluffyExp: {
				name: "Fluffy Exp",
				currentBonus: 0,
				steps: [-1, -1, -1, -1, -1, -1, -1, -1, [25, 50, 1]]
			},
			empty: {
				name: "Empty",
				currentBonus: 0,
			}
		},
		Shield: {
			playerEfficiency: {
				name: "Player Efficiency",
				currentBonus: 0,
				steps: [[2,4,1],[4,8,1],[8,16,1],[16,32,2],[32,64,4],[64,128,8],[128,256,16],[256,512,32],[512,1024,64]]
			},
			trainerEfficiency: {
				name: "Trainer Efficiency",
				currentBonus: 0,
				steps: [[1,5,1],[5,10,1],[10,20,1],[20,40,2],[40,60,2],[60,80,2],[80,100,2],[100,120,2],[120,140,2]]
			},
			storageSize: {
				name: "Storage Size",
				currentBonus: 0,
				steps: [[8,16,4],[16,32,4],[32,64,4],[64,128,4],[128,256,8],[256,512,16],[512,768,16],[768,1024,16],[1024,1280,16]]
			},
			breedSpeed: {
				name: "Breed Speed",
				currentBonus: 0,
				steps: [[1,2,1],[2,5,1],[5,10,1],[10,20,1],[70,100,3],[100,130,3],[130,160,3],[160,190,3],[190,220,3]]
			},
			trimpHealth: {
				name: "Trimp Health",
				currentBonus: 0,
				steps: [[1,2,1],[2,6,1],[6,20,2],[20,40,2],[50,100,5],[100,150,5],[150,200,5],[200,260,6],[260,356,8]]
			},
			trimpAttack: {
				name: "Trimp Attack",
				currentBonus: 0,
				steps: [[1,2,1],[2,6,1],[6,20,2],[20,40,2],[50,100,5],[100,150,5],[150,200,5],[200,260,6],[260,356,8]]
			},
			trimpBlock: {
				name: "Trimp Block",
				currentBonus: 0,
				steps: [[1,2,1],[2,4,1],[4,7,1],[7,10,1],[28,40,1],[48,60,1],[68,80,1],[88,100,1],[108,120,1]]
			},
			critDamage: {
				name: "Crit Damage, additive",
				currentBonus: 0,
				steps: [[10,20,5],[20,40,5],[40,60,5],[60,100,5],[100,200,10],[200,300,10],[300,400,10],[400,500,10],[500,650,15]],
				filter: function () {
					return (!game.portal.Relentlessness.locked);
				}
			},
			critChance: {
				name: "Crit Chance, additive",
				currentBonus: 0,
				steps: [[0.2,0.6,0.2],[0.6,1.4,0.2],[1.4,2.6,0.2],[2.6,5,0.2],[5,7.4,0.2],[7.4,9.8,0.2],[9.8,12.2,0.2],[12.3,15.9,0.3],[20,30,0.5]],
				filter: function () {
					return (!game.portal.Relentlessness.locked);
				},
				max: [30,30,30,30,30,30,30,30,100]
			},
			voidMaps: {
				name: "Void Map Drop Chance",
				currentBonus: 0,
				steps: [[0.5,1.5,0.5],[2.5,4,0.5],[5,7,0.5],[8,11,0.5],[12,16,0.5],[17,22,0.5],[24,30,0.5],[32,38,0.5],[40,50,0.25]],
				max: [50,50,50,50,50,50,50,50,80]
			},
			plaguebringer: {
				name: "Plaguebringer",
				specialDescription: function (modifier) {
					return modifier + "% of all non-lethal damage and nature stacks you afflict on your current enemy are copied onto the next enemy. Plaguebringer damage cannot bring an enemy below 5% health, but nature stacks will continue to accumulate."
				},
				currentBonus: 0,
				steps: [-1, -1, -1, -1, -1, -1, -1, -1, [1, 15, 0.5]],
				max: [0,0,0,0,0,0,0,0,75]
			},
			empty: {
				name: "Empty",
				currentBonus: 0,
				rarity: 1
			}
		}

	},


	worldText: {
		w2: "Your Trimps killed a lot of Bad Guys back there. It seems like you're getting the hang of this. However, the world is large, and there are many more Zones to explore. Chop chop.",
		w3: "By your orders, your scientists have begun to try and figure out how large this planet is.",
		w4: "You order your Trimps to search the area for the keys to your ship, but nobody finds anything. Bummer.",
		w5: "Do you see that thing at the end of this Zone? It's huge! It's terrifying! You've never seen anything like it before, but you know that it is a Blimp. How did you know that? Stop knowing things and go kill it.",
		w6: "You step over the corpse of the Blimp as it rapidly deflates, and one of your Trimps chuckles at the sound produced. You all cross the sulfuric river to the next Zone, and can feel the presence of an ancient knowledge. Better explore.",
		w7: "Slow and steady wins the race. Unless you're racing someone who is actually trying.",
		w8: "Your settlement is getting crowded, there's Trimps in the streets, and you're taking heat. You feel a sudden strong desire to create a map, though you're not quite sure how that would help.",
		w9: "You can't shake the feeling that you've been here before. Déjà-vu?",
		w10: "Looks like another Blimp up ahead. Hard to tell from far away, but it looks like it has more heads than the last one.",
		w11: "You're unstoppable as long as nothing stops you. Unfortunately, it seems like something really wants to stop you.",
		w12: "Did you see that green light flash by? Weird. Oh well.",
		w13: "Your scientists have finally concluded their report on the analysis of the size of the world. According to the report, they're pretty sure it's infinitely large, but you're pretty sure they just got bored of checking.",
		w14: "You were trying to help bring back some of the Equipment your Trimps left on the ground in that last Zone, and you got a splinter. This planet is getting dangerous, stay alert.",
		w15: "Another day, another Blimp at the end of the Zone.",
		w16: "Seriously? Another Blimp so soon?",
		w17: "You climb a large cliff and look out over the new Zone. Red dirt, scorched ground, and devastation. Is that a Dragimp flying around out there?!",
		w18: "There seems to be a strange force urging you to keep going. The atmosphere is becoming... angrier. Part of you wants to turn around and go back, but most of you wants to keep going.",
		w19: "You look behind and see your kingdom. You have gems, a colony, and territory. You wonder if enough Trimps have already fallen in battle. After contemplation, one word falls out of your mouth as you begin to move forward. 'Nah'",
		w20: "You can sense that you're close to your goal.",
		get w22 () {
			if (game.global.challengeActive == "Trimp" && game.jobs.Amalgamator.owned > 0) return toZalgo("You hear a strange humming noise that seems to draw you towards it, though it also seems to come from no direction in particular. You can feel that it's being created by " + ((game.jobs.Amalgamator.owned == 1) ? "the" : "an") + " Amalgamator, though you've never heard such a sound before. It's both unsettling and enchanting, and the Universe seems to hate it.", 4, 1);
			return "Strange, the sky seems to be getting darker. You ask one of your Trimps for the time, but he doesn't know what a clock is.";
		},
		w25: "You're a rebel. The universe pointed you into that portal, but you kept pushing forward. You feel... less like you've been here before.",
		w27: "It seems like the further you press on, the less you know. You still feel an urge to use the portal, though the urge has begun to dwindle.",
		w29: "Your Trimps came up with a pretty catchy battle song that got stuck in your head. None of them survived the next fight though, and you can't remember most of it. Life's tough.",
		w33: "You climb over a large hill that was separating this Zone from the last. The sky is pitch black and lightning crackles in the distance. This is a site of heavy corruption.",
		w35: "You start to wonder how long you've been doing the same thing over and over. There must be something you can do to start to break the cycle. Perhaps you could alter the portal...",
		w40: "You can't help but notice that the Trimps seem to be the only creatures on this planet not immediately hostile towards outsiders. You ask a nearby Trimp soldier what he thinks you are, and he drools a bit.",
		w42: "The world seems so barren out this far. You feel like you're finally starting to get ahead of the curve, but you know by now not to get comfortable.",
		w44: "Each day and night seems to grow longer than the one before. Is time slowing down? Argh! You fall to your knees with a splitting headache and a strong desire to use the portal. After a few minutes, it passes and you forget what happened. What are we talking about?",
		w46: "All traces of hills and mountains have long since been trudged past. The world is flat and hostile. You wish your Trimps were better conversationalists.",
		w48: "As your Trimps scavenge every last bit of helium from that Blimp, one of them begins freaking out. He runs around waving his little arms and making funny noises for a while, eats some dirt, then takes a little nap. You wonder if that's normal. Yeah... probably fine.",
		w50: "It's been a long time since you've found any blueprints in the maps. You start to wonder where those things even come from.",
		w51: "Your scientists have detected an anomaly at the end of Zone 59. They recommend that you stop doing whatever it is that you're doing.",
		w53: "As you get closer to the anomaly, you start to notice more and more strange behaviour from your Trimps. Holes in your memory are starting to become noticeable as multiple existences blend into one. Trippy.",
		w54: "As you get closer to the anomaly, you start to notice more and more strange behaviour from your Trimps. Holes in your memory are starting to become noticeable as multiple existences blend into one. Trippy.",
		w56: "A loud boom echoes in the distance, and one of your Trimps runs up to you with outstretched arms, looking quite frightened. He probably just wants some armor and weapons! You hand him some gear, and he accepts it with excitement.",
		w58: "A huge storm has formed and daylight has become a luxury you have mostly forgotten about. Your Trimps seem to want to go back home, but you're pretty sure you're supposed to keep going this way, so you do. You're very close to the anomaly.",
		w59: "There it is. The anomaly is at the end of the Zone. You can see it but you don't know what you're seeing. Where did that... thing... come from?! This is highly Improbable.",
		w60: "The ground instantly cracks and large plumes of green gas escape from the planet's core to the atmosphere. The planet feels different. Everything feels different. This Universe has grown unstable, the planet has broken. What have you done?",
		w61: "Other than all the dead Trimps, that wasn't so bad.",
		get w65 () {
			if (game.global.challengeActive == "Trimp" && game.jobs.Amalgamator.owned > 0) return toZalgo("The Universe seems even more upset than you expected here, but your Amalgamator" + ((game.jobs.Amalgamator.owned == 1) ? " doesn't" : "s don't") + " really seem to care. You walk towards " + ((game.jobs.Amalgamator.owned == 1) ? "it" : "one") + " to get a better look, but find yourself further away than you were.", 2, 2);
			return "You feel more powerful than ever. The universe seems to be constantly adjusting itself to get rid of you, yet you rise against and persist. Something as tiny as you taking on an entire universe!";
		},
		w68: "You figure some entertainment wouldn't be awful, and decide to teach your Trimps how to play soccer. A few hours and zero progress later, you really regret that decision.",
		w70: "The Improbabilities haven't seemed to slow down. You know you need to figure out a plan, but you don't know what to plan for.",
		w72: "You slash through another Improbability with relative ease, but something isn't right. A sour smell hits your nose and in disgust, you whip around in search of the source. Oh, wait, it's just the Trimps.",
		w80: "When's the last time you made a map? You have a feeling you should probably do that.",
		w82: "Whew, that was an exhilarating kill. You decide to reward your Trimps with some Improbability stew. It's pretty tasty.",
		w83: "That stew was probably a bad idea. Anyone else feeling sick?",
		w85: "An ancient and fuzzy memory just crept back into your head. You're not quite sure where it came from, but you know the memory is yours. You remember being on a ship, and seeing this planet from orbit. There was someone with you!",
		w87: "Bits and pieces of memories continue trickling back in as you continue to put distance between yourself and the source of Anger. You can almost see in your mind who you came here with. Where could they be...",
		w90: "You decide to ask your scientists to come up with an extravagant machine that can scan your brain for old memories to see if there's anything helpful up there. They seem excited about a new project and quickly get to work.",
		w92: "You hear a huge explosion from the science lab and realize that the brain scan machine will probably never be finished.",
		get w95 () {
			if (game.global.challengeActive == "Trimp" && game.jobs.Amalgamator.owned > 0) return toZalgo(((game.jobs.Amalgamator.owned == 1) ? "The Amalgamator is" : "The Amalgamators are") + " starting to rapidly switch between different colors. It would be slightly entertaining if the fabric of existence wasn't falling apart around " + ((game.jobs.Amalgamator.owned == 1) ? "it." : "them."), 3, 2);
			return "Need some motivation? You can do it! Maybe.";
		},
		w100: "You stop dead in your tracks. You remember who you came here with, and you remember that you are not happy with Captain Druopitee for bringing you here. You know he landed with you. You know the ship is still here. He's here.",
		w105: "You call a meeting with all of your Trimps to explain the situation. After giving an extremely long, epic, and motivational speech but hearing no reaction from the crowd, you remember that your Trimps cannot understand you. Will you ever learn?",
		w106: "How long have you been trapped on this planet? Months? Decades? Travelling through time sure screws up your chronological perception.",
		w109: "Though you have no idea which direction your home planet is, you still believe the ship's GPS could get you home. Maybe Druopitee has the keys. You really want to find him.",
		w115: "You just remembered what a taco was. You could really use a taco right now.",
		w120: "Your stamina is quickly dwindling. Trying to keep up with so many more extra Trimps each Zone is beginning to wear you down. You'll need to practice fighting with stronger, smaller groups to succeed.",
		w123: "Woah, you have a lot of Trimps right now. You hadn't really stopped to think about just how many individual Trimps you have directly under your control in a while. Neat!",
		w125: "You smell metal and gears, and suddenly feel like you should run a map.",
		w130: "You decide to sit down and take a breather, when suddenly a Trimp comes waddle-galloping towards you holding a piece of paper. Hurriedly scrawled on the paper is a drawing of a strange weapon and piece of armor, along with numbers that seem to be dimensional coordinates. You would ask where he found it, but you know better by now.",
		w132: "You can't stop thinking about where that Trimp found the coordinates for the Slow dimension. Why can't whatever is helping you just come out and help you?",
		w135: "Ugh, your back is getting sore. It seems like travelling back in time does not reverse the ageing process for the traveller. Bummer.",
		w136: "One of your scientists has informed you that his team was able to successfully create a cure for a non-existent disease. He explains that it's best to be prepared. You sigh heavily.",
		w137: "One of your scientists has informed you that an outbreak of a new disease was detected in the laboratory. You go to check on your scientists, and it's quite obvious that they're faking it for attention. You sigh heavily.",
		w138: "You spot another scientist running full speed towards you. He hurriedly informs you that they discovered a new dimension near Zone 35 that is occupied by gigantic Trimps. You sigh heavily.",
		w139: "Another scientist is coming. You sigh heavily. He says something dumb. You decide to ignore the scientists for a little bit.",
		w140: "It sure is calm and peaceful now. You watch a Falcimp turn a few circles in the sky. You wouldn't mind having wings, but overall you're pretty happy with your species.",
		w143: "There's a scientist jumping around trying to get your attention. There's nothing interesting in the sky so you pretend to be fascinated with a rock. The scientist can see you're busy and waits patiently.",
		w145: "Your Scientists are not making it easy to ignore them. You not-so-calmly ask what they want. One of them explains that they discovered a new dimension with lots of extra helium. You'll probably check it out, but you won't tell them that.",
		w150: "Wow. These structures are getting expensive. There's probably a dimension for that...",
		w153: "You remember a person from your past. From your old life. There's someone you need to get back to. You'll make it back.",
		w156: "You watch in amazement as a Trimp grabs on to one of those weird tree things and swings around by its arms. These things are getting pretty strong.",
		w157: "You watch in less amazement as a Trimp tries to take a bite out of a very large rock. These things are not getting much smarter.",
		w159: "That's quite a sunset. You know once you finally make it out of here, you'll definitely never forget the sights. Unless, of course, you do.",
		w160: "A small horde of Trimps comes running up towards you, making excited sounding noises. One of them walks to the front of the loud congregation and proudly holds up a boot, slightly larger but the same style as your own. It must be Druopitee's, confirmation that you're heading the right direction. You reward the Trimp who found it with some food and a few pats on the head, then send the boot to the lab to look for any further clues. You wonder why he took his boot off.",
		w163: "Your scientists have informed you that half of the boot is now lost in another dimension, thanks to an 'important' test. The results were inconclusive. You ask them to please leave the remaining half in our current dimension, and they look disappointed.",
		w165: "What's this now?! You found a little green piece of metal. Your scientists tell you that it came from a toxic dimension, but that it is also from a dimension rich in helium. They let you know that they can tune your portal to travel to the dimension it originated from, should you want to check it out.",
		w166: "That last Improbability seemed like a nice guy.",
		w168: "Hopefully spaceships don't rust.",
		w170: "You reach the top of an incredibly large mountain. You can see at least 50 Zones sprawled out before you. About 30 Zones away, you can see a gigantic spire. It looks like architecture from your home world. You hope it's not a mirage...",
		w172: "Something smells purple. That's probably not good.",
		w174: "Strange smells continue to swell around you. Judging by changes in wind direction, the smells are coming from the spire. You still can't describe it other than purple.",
		w175: "Your Trimps seem happy. They're not used to having a purpose, and having one seems to positively affect them! You call a Trimp over and ask him how he's doing, then you remember that he can't talk.",
		w178: "You're still not quite sure what that smell is. You feel slightly more powerful, and you fear that your enemies may feel the same way.",
		get w180 () {
		if (game.global.challengeActive != "Corrupted") return "After clearing out the previous Zone, you decide to take a day hike to the top of another gigantic mountain to try to find more info about the smell. As you reach the top, your jaw drops. Clear as day, a healthy amount of purple goo is pouring into the atmosphere from the top of the spire. You can see the Zones in front of you beginning to change. This really can't be good.";
		return "After clearing out the previous Zone, you decide to take a day hike to the top of another gigantic mountain to try to find more info about the smell. As you reach the top, your jaw drops. Clear as day, a healthy amount of purple goo is pouring into the atmosphere from the top of the spire. This must be what's causing all of this Corruption you've been trudging through. The planet seems pretty heavily Corrupted already, you wonder if you're too late.";
		},
		w182: "Well, there's not really much doubt about it anymore. Some sort of intelligence is intentionally making life more difficult for you and your Trimps. You take this as a sign that you're pretty important, why else would something risk destroying an entire planet to stop you? Your parents would be so proud.",
		get w184 () {
				return "The corruption seems to be more pronounced the closer you get to the Spire. Looks like there's " + mutations.Corruption.cellCount() + " of em now."
			},
		w185: "You have trouble putting into words exactly what the Corruption does to the creatures on this planet. They seem to be stripped of all natural abilities and given powers that you didn't know could exist in the primary dimension.",
		w187: "None of these corrupted enemies seem to have eyes, so you decide to see if you can get away with flipping one off. As it reacts by roaring and stomping around in a rage, you realize that these things are powerful enough not to need eyes to observe the world. What <i>are</i> these?!",
		w190: "You awaken from your sleep in a cold sweat to a frantic and terrified noise from the back of the cave where you were sleeping. With urgency, you run to the source of the noise to make sure your Trimps are okay. As you reach the back, you see a handful of Trimps trying to use a small and very angry Snimp as a musical instrument. You put some sand in your ears and go back to sleep.",
		w193: "The corruption continues to thicken as you near the Spire. You're beginning to grow accustomed to the smell of the Spire, and really don't mind it anymore. It reminds you of blueberries. Evil blueberries.",
		w198: "You're so close to the source of corruption that you can taste it, and it doesn't taste good.",
		get w205 () {
			if (game.global.spireRows < 10)
				return "You look back at The Spire and feel kinda bad that there's still a ton of Corruption coming out of it, but you'll get him some time.";
			return "You don't miss Druopitee too much. You don't remember all that much to miss, but the point stands.";
		},
		get w210 () {
			if (game.global.spireRows < 10)
				return "It smells extra corrupt. That Spire can't be healthy for the environment.";
			return "There's still Corruption, but it feels less threatening. You feel more at peace with the planet and feel like you're on track to repairing it. Surely nothing else terrible will happen any time soon.";
		},
		get w220 () {
			if (game.global.spireRows < 10)
				return "Your Trimps seem content. They kinda wish that spire wasn't still pumping purple stuff into their world, but they don't mind too much.";
			return "Your Trimps seem content. You taught some basic puppetry to them and they've been putting on some great shows with defeated Snimps.";
		},
		w225: "You wake up in a sweat after a good night's sleep in a cool, dark cave. You dreamt that you were overheating, though that's never really been a problem before. Oh well, strange dreams and memories haven't really indicated anything important before, it's probably nothing.",
		w231: "It's pretty hot.",
		w235: "The heat intensifies as you move further and further through the Zones. Instinct says to turn away from the heat, but that wouldn't be any fun.",
		get w245 () {
			if (game.jobs.Magmamancer.owned > 0)
				return "Your Magmamancers have figured out how to make little fountains in the Magma around the base. You like the effect.";
			return "You remember Magmamancers as being pretty cool.";
		},
		w251: "You asked that Omnipotrimp nicely not to explode after you killed it, but it exploded anyways. Pretty rude.",
		w255: "Your Trimps continue to lose strength as you press through the Zones, but they seem to be adapting well in spirits. It seems like each generation likes the heat more and more.",
		w265: "You're determined to repair the planet, though you feel like it's not yet possible. Either way, you know you're gaining strength and that your Trimps would follow you anywhere.",
		w270: "This planet is really freaking big. You feel like you've been walking around it for years and still haven't seen everything there is to offer. Shouldn't there be another spire around here or something?",
		w277: "It's starting to smell purple again. You must be getting close to another spire.",
		get w283() {
			var soldiers = game.resources.trimps.getCurrentSend();
			return "During a boring night while waiting to cross a particularly rough Magma river, you managed to teach your Trimps how to stack on each other to create some funny shapes. You almost feel bad for the first Snimp to come across " + prettify(soldiers) + " Trimps stuck together in the shape of a humongous Moongooseimp.";
		},
		get w285(){
			if (game.global.spireRows >= 10)
				return "You can finally see it, clear as day. No more than 15 Zones in the distance stands a giant spire, even more menacing than the first. A loud, echoing voice booms from the tower, matching the tone and cadence of Druopitee himself. It's a little far away to hear perfectly, but it sounds like he's asking you nicely to please leave him be.";
			return "Something feels wrong, but you can't quite figure out what. You eventually find a pebble in your shoe and everything seems much better!";
		},
		get w286() {
			if (game.global.spireRows >= 10)
				return "You hear the voice again, and can tell there's definitely something weird about it - as if it was coming from a ghost or something. Though you suppose that makes sense, since you've already killed Druopitee.";
			return "You hear something rustling in a bush and get totally psyched up for something new and exciting. As you walk cautiously towards the bush, a Rabbimp quickly runs out and away."
		},
		get w290() {
			if (game.global.spireRows >= 10)
				return "As you get closer and closer to the spire, the voice gets clearer and clearer. You can pick up notes of terror from whatever being is up there, as if he wants to just be left alone to destroy the world. You don't feel much sympathy though.";
			return "You trip over a rock and stumble a bit, but fix your footing before totally falling over. You glance around and it doesn't seem like any of the Trimps noticed!";
		},
		get w295() {
			if (game.global.spireRows >= 10)
				return "You're now so close to this new spire that you can taste it, literally. These things are gross.";
			return "You wonder if you could get your scientists to invent chewing gum..."
		},
		get w298() {
			if (game.global.spireRows >= 10)
				return "The deranged spirit in the tower is now begging that you stay back. It obviously knows you destroyed the last tower and doesn't want you taking out another. Too bad, buddy. You're coming.";
			return "A voice in the back of your mind tells you there should be something big soon, but you see nothing. Oh well."
		},
		get w303() {
			if (game.global.spireRows >= 15 || game.portal.Capable.level > 0) return "You're glad you have Fluffy around now. He seems to be getting along well with the other Trimps, and seems happy to have found others like him. He doesn't seem to be any smarter than a normal Trimp so you're sure you'll get some entertainment out of him.";
			return "You wish you had a pet.";
		},
		get w315(){
			if (game.global.lastSpireCleared == 2) return "These healthy spots of land seem to be increasing as the Spire pumps more and more into the air! Hopefully that's a good thing. You ask Fluffy what he thinks and he nods in approval.";
			return "Geeze, this Corruption is starting to look pretty nasty. Those Spires need to fall soon...";
		},
		w340: "Watch your step, there's some Magma on the ground over there.",
		w350: "If Druopitee has really immortalized himself in an infinite amount of Spires, you might be here for a while.",
		get w360(){
			if (game.global.spireRows >= 15 || game.portal.Capable.level > 0) return "You attempt to put Fluffy through your rigorous Scientist training program, but he doesn't want to. He wouldn't have any trouble, but he doesn't want the label. You still couldn't be happier to have the little guy around!";
			return "You really feel like something is missing from your life. Everything feels hollow and sad.";
		},
		w375: "Should be coming up on another Spire Zone soon. You stop and sit beside a beautiful Magma river and wonder what kinds of crazy stuff could be waiting for you up there. Then you realize it's probably just another Spire, so you get up and keep moving.",
		w385: "Some familiar Spirish odors begin hitting your nostrils again and you sneeze, hilariously startling a few billion Trimps. Never gets old.",
		get w390(){
			if (game.global.lastSpireCleared == 2) return "You can finally see the next Spire in the distance, a thick purple cloud boiling out of the top. Hard to believe there's an infinite amount of these things, how big even is this planet?";
			return "Weird, you feel like you should be able to see the next Spire by now, but it's not there. Maybe you should have checked the other Spires a bit more thoroughly.";
		},
		get w395(){
			if (game.global.lastSpireCleared == 2) return "Ahh, that gross old taste of Spire. You'll never get used to that. Most of your Trimps are trying to stay under trees, but Fluffy is running around with his tongue out as if he was trying to catch snowflakes.";
			return "Did you leave the oven on? Oh yeah, you don't have an oven. Now you wonder what an oven even is. Oh well.";
		},
		get w405(){
			if (game.global.lastSpireCleared == 3) return "It really seemed like you weakened Druopitee back there. Maybe you'll be able to at least shut off any last conscious parts of him with just one more Spire?";
			return "You can't shake the feeling like you forgot to do something.";
		},
		get w415(){
			if (game.global.lastSpireCleared == 3) return "The Healthy mutation is starting to spread nicely now. The Bad Guys hurt quite a bit more, but you're pretty sure you're doing the right thing which kinda makes you feel good.";
			if (game.global.lastSpireCleared == 2) return "It seems like the Healthy mutation has stopped spreading. That's alright though, some other version of you will probably take care of it.";
			if (game.global.spireRows >= 15 || game.portal.Capable.level > 0) return "The land sure looks terrible and corrupted, but at least you have Fluffy.";
			return "What do you have against Fluffy?";
		},
		w430: "The Trimps tried tying two Turkimps to this tall tree, then the Turkimps thrashed those three trillion Trimps, throwing the Trimps tumbling towards the tall tree. The Trimps truly tried. Those Turkimps though... they tough.",
		w440: "Wow, you've gotten pretty far. You would have never guessed there'd be this many Zones out there, but here you are.",
		w450: "It's just about time for another Spire, don't you think?",
		w460: "This part of the world seems to be at a much higher elevation than any other part that you've been at. The air is strangely clear, and you can see more of the planet sprawled out around you than ever before. It feels good to see everything you're fighting for and feel like it's worth it.",
		w470: "This part of the world seems to be at a really low elevation, and lots of Corruption is building up in it. Gross.",
		get w485(){
			if (game.global.lastSpireCleared == 3) return "Once again, you can taste the Spire, it must just be over that next hill now. Fluffy seems excited.";
			return "Hey! Is that... oh, nope, just some dirt.";
		},
		get w495(){
			if (game.global.lastSpireCleared == 3) return "It's time. He's weak. You've got this. Time to make this planet Healthy again.";
			return "You're feeling rather itchy today. You ask some Trimps to scratch your back but they don't really want to.";
		},
		get w505(){
			if (game.global.lastSpireCleared == 4) return "Well you've totally 100% eradicated Druopitee's consciousness, now you figure it's just time to clear the rest of his brainless Echoes out of the remaining Spires.";
			return "Druopitee is just over there getting stronger, someone should really do something about him.";
		}
	},
	trimpDeathTexts: ["ceased to be", "bit the dust", "took a dirt nap", "expired", "kicked the bucket", "evaporated", "needed more armor", "exploded", "melted", "fell over", "swam the river Styx", "turned into jerky", "forgot to put armor on", "croaked", "flatlined", "won't follow you to battle again", "died. Lame", "lagged out", "imp-loded"],
	badGuyDeathTexts: ["slew", "killed", "destroyed", "extinguished", "liquidated", "vaporized", "demolished", "ruined", "wrecked", "obliterated"],

	settings: {
		speed: 10,
		speedTemp: 0,
		slowdown: false,
                ewma_alpha: 0.05,
                ewma_ticks: 10, // 1 second
	},

	resources: {
		food: {
			owned: 0,
			max: 500
		},
		wood: {
			owned: 0,
			max: 500
		},
		metal: {
			owned: 0,
			max: 500
		},
		trimps: {
			owned: 0,
			max: 10,
			maxMod: 1,
			realMax: function () {
				var num = this.max;
				num *= this.maxMod;
				if (game.portal.Carpentry.level > 0) num = Math.floor(num * (Math.pow(1 + game.portal.Carpentry.modifier, game.portal.Carpentry.level)));
				if (game.portal.Carpentry_II.level > 0) num = Math.floor(num * (1 + (game.portal.Carpentry_II.modifier * game.portal.Carpentry_II.level)));
				return num;
			},
			working: 0,
			speed: 5,
			get employed () {
				var total = 0;
				for (var job in game.jobs) {
					total += game.jobs[job].owned;
				}
				total -= game.jobs.Dragimp.owned;
				return total;
			},
			set employed (value) {
				console.warn('employed is now a getter, and does not need to be set');
				return;
			},
			soldiers: 0,
			maxSoldiers: 1,
			getCurrentSend: function (checkLevelTemp) {
				var amt = (game.portal.Coordinated.level) ? ((checkLevelTemp) ? game.portal.Coordinated.onChange(true) : game.portal.Coordinated.currentSend) : game.resources.trimps.maxSoldiers;
				if (game.jobs.Amalgamator.owned > 0) {
					amt *= game.jobs.Amalgamator.getPopulationMult();
				}
				return amt;
			},
			potency: 0.0085
		},
		science: {
			owned: 0,
			max: -1
		},
		gems: {
			owned: 0,
			max: -1
		},
		fragments: {
			owned: 0,
			max: -1
		},
		helium: {
			owned: 0,
			max: -1
		}
	},
	equipment: {
		Shield: {
			locked: 1,
			tooltip: "A big, wooden shield. Adds $healthCalculated$ health to each soldier per level.",
			blocktip: "A big, wooden shield. Adds $blockCalculated$ block to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				wood: [40, 1.2]
			},
			oc: 40,
			health: 4,
			healthCalculated: 4,
			blockNow: false,
			block: 1.5,
			blockCalculated: 1.5,
			prestige: 1
		},
		Dagger: {
			locked: 1,
			tooltip: "Better than nothing. Adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [40, 1.2]
			},
			oc: 40,
			attack: 2,
			attackCalculated: 2,
			prestige: 1
		},
		Boots: {
			locked: 1,
			tooltip: "At least their feet will be safe. Adds $healthCalculated$ health to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [55, 1.2]
			},
			oc: 55,
			health: 6,
			healthCalculated: 6,
			prestige: 1
		},
		//2
		Mace: {
			locked: 1,
			tooltip: "It's kind of heavy for your Trimps, but they'll manage. Adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [80, 1.2]
			},
			oc: 80,
			attack: 3,
			attackCalculated: 3,
			prestige: 1
		},
		Helmet: {
			locked: 1,
			tooltip: "Provides a decent amount of protection to the Trimps' heads, adding $healthCalculated$ health to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [100, 1.2]
			},
			oc: 100,
			health: 10,
			healthCalculated: 10,
			prestige: 1
		},
		//3
		Polearm: {
			locked: 1,
			tooltip: "This thing is big and pointy. It adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [140, 1.2]
			},
			oc: 140,
			attack: 4,
			attackCalculated: 4,
			prestige: 1
		},
		Pants: {
			locked: 1,
			tooltip: "Pants designed specificially for the little Trimps! Adds $healthCalculated$ health to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [160, 1.2]
			},
			oc: 160,
			health: 14,
			healthCalculated: 14,
			prestige: 1
		},
		//4
		Battleaxe: {
			locked: 1,
			tooltip: "This weapon is pretty intimidating, but your Trimps think they can handle it. Adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [230, 1.2]
			},
			oc: 230,
			attack: 7,
			attackCalculated: 7,
			prestige: 1
		},
		Shoulderguards: {
			locked: 1,
			tooltip: "These shoulderguards will help keep your Trimps' necks and shoulders safe, and they look cool too. Adds $healthCalculated$ health to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [275, 1.2]
			},
			oc: 275,
			health: 23,
			healthCalculated: 23,
			prestige: 1
		},
		//5
		Greatsword: {
			locked: 1,
			tooltip: "This sword looks sweet. Seriously, if you could see it you'd think it looked sweet. Trust me. Adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [375, 1.2]
			},
			oc: 375,
			attack: 9,
			attackCalculated: 9,
			prestige: 1
		},
		Breastplate: {
			locked: 1,
			tooltip: "Some real, heavy duty armor. Everyone looks badass in heavy duty armor. Adds $healthCalculated$ health to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [415, 1.2]
			},
			oc: 415,
			health: 35,
			healthCalculated: 35,
			prestige: 1
		},
		Arbalest: {
			locked: 1,
			tooltip: "A powerful ranged weapon. Your Trimps can do some damage with this sucker. Adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [450, 1.2]
			},
			oc: 450,
			attack: 15,
			attackCalculated: 15,
			prestige: 1
		},
		Gambeson: {
			locked: 1,
			tooltip: "A cozy and thick padded jacket that goes under the breastplate. Your Trimps think they're great! Adds $healthCalculated$ health to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [500, 1.2]
			},
			oc: 500,
			health: 60,
			healthCalculated: 60,
			prestige: 1
		}
	},

	badGuys: {
		Liquimp: {
			location: "None",
			locked: 1,
			attack: 3,
			health: 200,
			fast: true,
			loot: function () {
				rewardLiquidZone();
			}
		},
		Presimpt: {
			location: "World",
			locked: 1,
			attack: 1.1,
			health: 1.5,
			fast: false,
			loot: function () {
				//Happy Politically Correct Holidays, everyone!
				givePresimptLoot();
			}
		},
		Turkimp: {
			location: "World",
			locked: 1,
			attack: 1,
			health: 1.6,
			fast: false,
			loot: function () {
				//Happy Thanksgiving and stuff.
				//Also, happy post thanksgiving and stuff.
				//Also, happy normal days now I guess
				activateTurkimpPowers();
			}
		},
		Pumpkimp: {
			location: "None",
			attack: 0.9,
			health: 1.5,
			fast: false,
			loot: function () {
				//Happy Halloween and stuff.
				givePumpkimpLoot();
			}
		},
		Squimp: {
			location: "All",
			attack: 0.8,
			health: 0.7,
			fast: true
		},
		Elephimp: {
			location: "All",
			attack: 0.9,
			health: 1.3,
			fast: false
		},
		Turtlimp: {
			location: "All",
			attack: 0.9,
			health: 1.3,
			fast: false
		},
		Chimp: {
			location: "All",
			attack: 1,
			health: 1,
			fast: false
		},
		Penguimp: {
			location: "All",
			attack: 1.1,
			health: 0.7,
			fast: false
		},
		Snimp: {
			location: "All",
			attack: 1.05,
			health: 0.8,
			fast: true
		},
		Gorillimp: {
			location: "All",
			attack: 0.9,
			health: 1.1,
			fast: true
		},
		Shrimp: {
			location: "Sea",
			attack: 0.8,
			health: 0.9,
			fast: true
		},
		Mountimp: {
			location: "Mountain",
			attack: 0.5,
			health: 2,
			fast: false
		},
		Frimp: {
			location: "Forest",
			attack: 0.75,
			health: 1.2,
			fast: true
		},
		Chickimp: {
			location: "Sea",
			attack: 0.8,
			health: 1.1,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("food", 0.5, level, true);
				message("That Chickimp dropped " + prettify(amt) + " food!", "Loot", "apple", null, 'primary');
			}
		},
		Hippopotamimp: {
		   location: "Sea",
		   attack: 1.4,
		   health: 1.1,
		   fast: false
		},
		Onoudidimp: {
			location: "Mountain",
			attack: 0.8,
			health: 1.4,
			fast: false
		},
		//Honorary Imps
		Kittimp: {
			//Designed by K1d_5h31d0n
			location: "Forest",
			location2: "Mountain",
			attack: 1,
			health: 0.85,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("food", 0.5, level, true);
				message("You hear nearby Kittimps running away in fear and decide to check out their former home. There, you find a prey pile with " + prettify(amt) + " food!", "Loot", "apple", null, 'primary');
			}
		},
		Grimp: {
			//Designed by Grabarz
			location: "Forest",
			attack: 1.1,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("wood", 0.5, level, true);
				message("That Grimp dropped " + prettify(amt) + " wood!", "Loot", "tree-deciduous", null, 'primary');
			}
		},
		Golimp: {
			//Designed by Syc_Golem
			location: "Depths",
			attack: 1.2,
			health: 1.4,
			fast: false,
			loot: function (level) {
				var random = Math.floor(Math.random() * 5);
				var amt;
				var res;
				var icon;
				var tag;
				if (random === 0) {
					amt = rewardResource("fragments", 1, level, true);
					res = "fragments";
					icon = "th";
					tag = "secondary";
				}
				else {
					amt = rewardResource("metal", 0.3, level, true);
					res = "bars of metal";
					icon = "*cubes";
					tag = "primary";
				}
				message("The Golimp fell to pieces! You manage to grab " + prettify(amt) + " " + res + " before it begins pulling itself together.", "Loot", icon, null, tag);
			}
		},
		Seirimp: {
			//Designed by Seiyria
			location: "Mountain",
			attack: 1.15,
			health: 1.4,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", 0.5, level, true);
				message("That Seirimp dropped " + prettify(amt) + " metal! Neat-O.", "Loot", "*cubes", null, 'primary');
			}
		},
		Slagimp: {
			location: "Depths",
			attack: 0.9,
			health: 1,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("gems", 0.3, level, true);
				message("That Slagimp fell over, and " + prettify(amt) + " gems popped out! How about that?!", "Loot", "*diamond", null, 'secondary');
			}
		},
		Moltimp: {
			location: "Depths",
			attack: 1.2,
			health: 0.7,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", 0.2, level, true);
				message("The Moltimp thanked you for the combat, and handed you " + prettify(amt) + " bars of metal! Then he died.", "Loot", "*cubes", null, 'primary');
			}
		},
		Lavimp: {
			location: "Depths",
			attack: 1,
			health: 0.8,
			fast: true
		},
		Flowimp: {
			location: "Plentiful",
			attack: 1.3,
			health: 0.95,
			fast: false
		},
		Kangarimp: {
			location: "Plentiful",
			attack: 0.95,
			health: 0.95,
			fast: true
		},
		Gnomimp: {
			location: "Plentiful",
			attack: 0.8,
			health: 1,
			fast: false
		},
		Slosnimp: {
			location: "Plentiful",
			attack: 1.05,
			health: 0.8,
			fast: false
		},
		Entimp: {
			location: "Plentiful",
			attack: 0.6,
			health: 1.3,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("wood", 0.35, level, true);
				message("The Entimp is no more. You manage to salvage " + prettify(amt) + " logs of wood from his trunk!", "Loot", "tree-deciduous", null, 'primary');
			}
		},
		Squirrimp: {
			location: "Plentiful",
			attack: 1,
			health: 1.1,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("food", 0.35, level, true);
				message("Time for some stew! You scored " + prettify(amt) + " food from that Squirrimp!", "Loot", "apple", null, 'primary');
			}
		},
		Gravelimp: {
			location: "Plentiful",
			attack: 0.8,
			health: 1.4,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", 0.35, level, true);
				message("You sift through the Gravelimp, and manage to find " + prettify(amt) + " bars of metal! Good on you!", "Loot", "*cubes", null, 'primary');
			}
		},
		Blimp: {
			location: "World",
			last: true,
			world: 5,
			attack: 1.2,
			health: 2,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("food", 2, level);
				rewardResource("wood", 2, level);
				rewardResource("metal", 2, level);
				message("That Blimp dropped " + prettify(amt) + " Food, Wood and Metal! That should be useful.", "Loot", "piggy-bank", null, 'primary');
				if (game.global.runningChallengeSquared) return;
				if (game.global.world >= 21 && (game.global.totalPortals >= 1 || game.global.portalActive)){
					if (game.resources.helium.owned == 0) fadeIn("helium", 10);
					amt = 1;
					if (game.global.challengeActive == "Domination") amt *= 3;
					amt = rewardResource("helium", amt, level);
					message("You were able to extract " + prettify(amt) + " Helium canisters from that Blimp!", "Loot", "oil", "helium", "helium");
					if (game.global.world >= 40 && game.global.challengeActive == "Balance") {
						if (game.challenges.Balance.highestStacks <= 100) giveSingleAchieve("Underbalanced");
						var reward = game.challenges.Balance.heldHelium;
						message("You have completed the Balance challenge! You have been rewarded with " + prettify(reward) + " Helium, and you may repeat the challenge.", "Notices");
						game.challenges.Balance.abandon();
						game.global.challengeActive = "";
						addHelium(reward);
					}
				}
			}
		},
		Cthulimp: {
			location: "Void",
			last: true,
			world: 6,
			attack: 2,
			health: 5,
			fast: true,
			loot: function (level, fromFluffy, fluffyCount) {
				if (game.resources.helium.owned == 0) fadeIn("helium", 10);
				var amt = (game.global.world >= 60) ? 10 : 2;
				if (mutations.Magma.active()) amt *= 3;
				if (game.global.challengeActive == "Domination"){
					amt *= 3;
					if (game.global.world == 215) giveSingleAchieve("Fhtagn");
				}
				var percentage = 1;
				var rewardPercent = 1;
				if (game.global.world >= mutations.Corruption.start(true)){
					rewardPercent = 2;
					percentage = (game.global.challengeActive == "Corrupted") ? 0.075 : 0.15;
					var corrCount = mutations.Corruption.cellCount();
					if (mutations.Healthy.active()) corrCount -= mutations.Healthy.cellCount();
					percentage *= corrCount;
					if (mutations.Healthy.active()){
						amt *= ((mutations.Healthy.cellCount() * 0.45) + percentage + 1);
					}
					else {
						amt *= (percentage + 1);
					}
				}
				if (game.talents.voidSpecial.purchased){
					amt *= ((game.global.lastPortal * 0.0025) + 1);
				}
				if (fromFluffy){
					 amt *= (1 + (0.5 * fluffyCount));
					amt *= fluffyCount;
				}

				if (game.talents.scry2.purchased && game.global.canScryCache) amt *= 1.5;

				//Void map helium modifiers above here
				
				if (game.global.runningChallengeSquared)
					amt = 0;
				else
					amt = rewardResource("helium", amt, level, false, rewardPercent);
				
				game.stats.highestVoidMap.evaluate();
				game.stats.totalVoidMaps.value += (fromFluffy && fluffyCount) ? fluffyCount : 1;
				var msg = "Cthulimp and the map it came from crumble into the darkness. You find yourself instantly teleported to ";				
				if (fromFluffy && fluffyCount == 1){
					msg = "Before you even realized you were in a new Void Map, Fluffy snuck to the end and quickly stole all the loot.";
					if (!game.global.runningChallengeSquared) msg += " You gained another " + prettify(amt) + " Helium!";
					message(msg, "Loot", "oil", "helium", "helium");
					return;
				}
				else if (fromFluffy){
					msg = "Before you even realize what's happening, Fluffy has entered and cleared the remaining " + fluffyCount + " Void Maps and quickly stole all the loot!";
					if (!game.global.runningChallengeSquared) msg += " After earning a bonus on each of +" + prettify(50 * fluffyCount) + "% Helium, you've earned an additional " + prettify(amt) + " Helium!";
					message(msg, "Loot", "oil", "helium", "helium");
					return;
				}
				if (game.options.menu.repeatVoids.enabled && game.global.totalVoidMaps > 1){
					msg += "the next Void map";
				}
				else {
					msg += ((game.options.menu.exitTo.enabled) ? "the world " : "your map chamber");
				}
				if (game.global.runningChallengeSquared) msg += ".";
				else msg += " with an extra " + prettify(amt) + " Helium!";
				message(msg, "Loot", "oil", "helium", "helium");
				
			}
		},
		Shadimp: {
			location: "Void",
			world: 6,
			attack: 1.2,
			health: 1.3,
			fast: true
		},
		Voidsnimp: {
			location: "Void",
			world: 6,
			attack: 2.1,
			health: 0.5,
			fast: true
		},
		Megablimp: {
			location: "Hell",
			last: true,
			world: 20,
			attack: 1.1,
			health: 4,
			fast: false,
			loot: function (level) {
				checkAchieve("angerTimed");
				if (game.upgrades.Bounty.done == 0) giveSingleAchieve("Forgot Something");
			}
		},
		Dragimp: {
			location: "World",
			world: 17,
			attack: 1,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("gems", 0.35, level, false);
				message("That Dragimp dropped " + prettify(amt) + " gems!", "Loot", "*diamond", null, 'secondary');
			}
		},
		Mitschimp: {
			location: "Block",
			last: true,
			world: 10,
			attack: 1.2,
			health: 2.5,
			fast: false,
			loot: function (level) {
				checkAchieve("blockTimed");
				var amt = rewardResource("wood", 2, level, true);
				message("Mitschimp dropped " + prettify(amt) + " wood!", "Loot", "tree-deciduous", null, 'primary');
			}
		},
		Brickimp: {
			location: "Wall",
			last: true,
			world: 15,
			attack: 1.2,
			health: 2.5,
			fast: false,
			loot: function (level) {
				checkAchieve("wallTimed")
			}
		},
		Indianimp: {
			location: "Doom",
			last: true,
			world: 33,
			attack: 1.07,
			health: 0.9,
			fast: true,
			loot: function (level) {
				checkAchieve("doomTimed");
				var amt = rewardResource("metal", 2, level, true);
				message("Indianimp dropped " + prettify(amt) + " metal!", "Loot", "*cubes", null, 'primary');
				if (game.global.runningChallengeSquared) return;
				if (game.global.challengeActive == "Trapper"){
					game.global.challengeActive = "";
					game.challenges.Trapper.abandon();
					game.portal.Anticipation.locked = false;
					message("You have completed the 'Trapper' challenge! Your Trimps now remember how to breed, and you have unlocked a new perk!", "Notices");
				}
				if (game.global.challengeActive == "Meditate"){
					game.global.challengeActive = "";
					game.portal.Meditation.locked = false;
					message("You have completed the 'Meditate' challenge! The dimension has returned to normal, and you have unlocked a new perk!", "Notices");
				}
			}
		},
		Warden: {
			location: "Prison",
			last: true,
			world: 80,
			attack: 2,
			health: 3,
			fast: false,
			loot: function (level) {
				checkAchieve("prisonTimed");
				if (game.global.runningChallengeSquared) return;
				if (game.global.challengeActive == "Electricity" || game.global.challengeActive == "Mapocalypse") {
					var reward = Math.floor(game.challenges.Electricity.heldHelium * 2);
					if (game.global.challengeActive == "Electricity") message("You have completed the Electricity challenge! You have been rewarded with " + prettify(reward) + " Helium, and you may repeat the challenge.", "Notices");
					else if (game.global.challengeActive == "Mapocalypse") {
						message("You have completed the Mapocalypse challenge! You have unlocked the 'Siphonology' Perk, and have been rewarded with " + prettify(reward) + " Helium.", "Notices");
						game.portal.Siphonology.locked = false;
						game.challenges.Mapocalypse.abandon();
					}
					game.challenges.Electricity.heldHelium = 0;
					game.global.challengeActive = "";
					addHelium(reward);
					game.challenges.Electricity.stacks = 0;
					updateElectricityStacks();
					refreshMaps();
				}
			}
		},
		//Putting Bionic Wonderland stuff right.... here cause why not
		Robotrimp: {
			location: "Bionic",
			last: true,
			world: 125,
			attack: 2.1,
			health: 2.9,
			fast: false,
			loot: function (level) {
				var mapLevel = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)].level;
				if (mapLevel >= game.global.world + 45) giveSingleAchieve("Bionic Sniper");
				if (mapLevel >= game.global.world + 200) giveSingleAchieve("Bionic Nuker");
				checkAchieve("bionicTimed");
				var amt1 = rewardResource("wood", 1, level, true);
				var amt2 = rewardResource("food", 1, level, true);
				message("Robotrimp discombobulated. Loot inspection reveals: " + prettify(amt1) + " wood and " + prettify(amt2) + " food. Splendiferous.", "Loot", "*cogs", null, 'primary');
				if (game.global.challengeActive == "Crushed") {
					var heliumAdded = (game.challenges.Crushed.heldHelium * 4);
					message("You have completed the Crushed challenge! You have been rewarded with " + prettify(heliumAdded) + " Helium.", "Notices");
					game.challenges.Crushed.heldHelium = 0;
					game.global.challengeActive = "";
					addHelium(heliumAdded);
					if (game.challenges.Crushed.critsTaken == 0) giveSingleAchieve("Thick Skinned");
					game.challenges.Crushed.abandon();
				}
			}
		},
		Mechimp: {
			location: "Bionic",
			world: 125,
			attack: 1,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", .25, level, true);
				message("Mechimp disengaged. Reward encountered: " + prettify(amt) + " bars of metal. Huzzah.", "Loot", "*cubes", null, 'primary');
			}
		},
		Destructimp: {
			location: "Bionic",
			world: 125,
			attack: 1.4,
			health: 0.8,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", .25, level, true);
				message("Destructimp shorted out. Salvage results: " + prettify(amt) + " bars of metal. Acceptable.", "Loot", "*cubes", null, 'primary');
			}
		},
		Terminatimp: {
			location: "Bionic",
			world: 125,
			attack: 1.2,
			health: 1.2,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", .25, level, true);
				message("Terminatimp Terminated. Findings: " + prettify(amt) + " bars of metal. Hasta la Vista.", "Loot", "*cubes", null, 'primary');
			}
		},
		Autoimp: {
			location: "Bionic",
			world: 125,
			attack: 1.4,
			health: 1.3,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", .5, level, true);
				message("Autoimp force quit. Memory dump provides " + prettify(amt) + " bars of metal and no clues. It's a feature!", "Loot", "*cubes", null, 'primary');
			}
		},
		Artimp: {
			location: "Bionic",
			world: 125,
			attack: 1.3,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", 0.3, level, true);
				message("The Artimp wordlessly sputters, whirrs, beeps, then drops " + prettify(amt) + " perfect cubes of metal on the ground. Cubist art is your favorite!", "Loot", "*cubes", null, 'primary');
			}
		},
		//End Bionic Wonderland stuff
		//Start Imploding Star stuff
		Neutrimp: {
			location: "Star",
			last: true,
			world: 170,
			attack: 1.3,
			health: 2.5,
			fast: true,
			loot: function (level) {
				checkAchieve("starTimed");
				var amt1 = rewardResource("wood", 1.5, level, true);
				var amt2 = rewardResource("metal", 1.5, level, true);
				message("The Neutrimp gasps, shimmers, squeaks, then poofs into a quickly dispersing purple cloud. You spend a few moments trying to make sense of what you've just seen, but look around and find " + prettify(amt1) + " wood and " + prettify(amt2) + " metal instead!", "Loot", "*cogs", null, 'primary');
				if (game.global.challengeActive == "Devastation") {
					message("You have completed the Devastation challenge! Your world has been returned to normal, and you have unlocked the Overkill perk!", "Notices");
					game.global.challengeActive = "";
					game.portal.Overkill.locked = false;
					addNewSetting('overkillColor');
					refreshMaps();
				}
				if (game.global.challengeActive == "Obliterated"){
					giveSingleAchieve("Imploderated")
				}
			}
		},
		Fusimp: {
			location: "Star",
			world: 170,
			attack: 1.4,
			health: 1.8,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("metal", .5, level, true);
				message("The Fusimp explodes, leaving behind " + prettify(amt) + " bars of metal and a nice dose of radiation.", "Loot", "*cubes", null, 'primary');
			}
		},
		Hydrogimp: {
			location: "Star",
			world: 170,
			attack: 1.8,
			health: 2.2,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("food", 1, level, true);
				message("Before you can blink, the Hydrogimp vaporizes. That's fine though, it left " + prettify(amt) + " food for you!", "Loot", "apple", null, 'primary');
			}
		},
		Carbimp: {
			location: "Star",
			world: 170,
			attack: 1,
			health: 4,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("wood", 1, level, true);
				message("The Carbimp begins to crackle and shrink. Within a few seconds, all that's left is " + prettify(amt) + " wood.", "Loot", "tree-deciduous", null, 'primary');
			}
		},
		//End Imploding Star stuff
		Improbability: {
			locked: 1,
			location: "World",
			last: true,
			world: 59,
			attack: 1.2,
			health: 6,
			fast: true,
			loot: function (level) {
				if (game.global.spireActive) return;
				if (!game.global.brokenPlanet) planetBreaker();
				if (game.global.runningChallengeSquared) return;
				var amt = (game.global.world >= mutations.Corruption.start(true)) ? 10 : 5;
				if (game.global.challengeActive == "Domination") amt *= 3;
				amt = rewardResource("helium", amt, level);
				message("You managed to steal " + prettify(amt) + " Helium canisters from that Improbability. That'll teach it.", "Loot", "oil", 'helium', 'helium');
				if (game.global.challengeActive == "Slow" && game.global.world == 120){
					message("You have completed the Slow challenge! You have found the patterns for the Gambeson and the Arbalest!", "Notices");
					game.global.challengeActive = "";
					if (!game.global.slowDone){
						unlockEquipment("Arbalest");
						unlockEquipment("Gambeson");
					}
					game.global.slowDone = true;
				}
				else if ((game.global.challengeActive == "Life" && game.global.world == 110) || (game.global.challengeActive == "Nom" && game.global.world == 145) || (game.global.challengeActive == "Toxicity" && game.global.world == 165) || ((game.global.challengeActive == "Watch" || game.global.challengeActive == "Lead") && game.global.world >= 180) || (game.global.challengeActive == "Corrupted" && game.global.world >= 190) || (game.global.challengeActive == "Domination" && game.global.world >= 215)){
					var challenge = game.global.challengeActive;
					if (game.global.challengeActive == "Watch" && !game.challenges.Watch.enteredMap && game.buildings.Nursery.purchased == 0) giveSingleAchieve("Grindless");
					if (game.global.challengeActive == "Lead" && game.upgrades.Gigastation.done <= 1) giveSingleAchieve("Unsatisfied Customer");
					if (game.global.challengeActive == "Lead" && game.stats.battlesLost.value <= 100) giveSingleAchieve("Leadership");
					if (game.global.challengeActive == "Corrupted" && !game.challenges.Corrupted.hiredGenes && game.jobs.Geneticist.owned == 0) giveSingleAchieve("Organic Trimps");
					if (game.global.challengeActive == "Toxicity" && game.challenges.Toxicity.highestStacks <= 400) giveSingleAchieve("Trimp is Poison");
					if (game.global.challengeActive == "Life"){
						if (game.challenges.Life.lowestStacks == 150) giveSingleAchieve("Very Sneaky");
						game.challenges.Life.abandon();
					}
					var reward = (game.challenges[challenge].heliumMultiplier) ? game.challenges[challenge].heliumMultiplier : 2;
					reward = game.challenges[challenge].heldHelium * reward;
					message("You have completed the " + challenge + " challenge! You have been rewarded with " + prettify(reward) + " Helium, and you may repeat the challenge.", "Notices");
					game.challenges[challenge].heldHelium = 0;
					game.global.challengeActive = "";
					addHelium(reward);
					if (challenge == "Domination") game.challenges.Domination.abandon();
				}
				else if (game.global.challengeActive == "Mapology" && game.global.world == 100){
					message("You have completed the Mapology challenge! You have unlocked the 'Resourceful' Perk! Cheaper stuff!", "Notices");
					game.global.challengeActive = "";
					game.portal.Resourceful.locked = false;
					game.challenges.Mapology.abandon();
				}
			}
		},
		Omnipotrimp: {
			locked: 1,
			location: "World",
			last: true,
			world: 59,
			attack: 1.2,
			health: 6,
			fast: true,
			loot: function (level) {
				if (game.global.spireActive){
					return;
				}
				if (game.global.challengeActive == "Eradicated" && game.global.world >= 59 && !game.global.brokenPlanet) planetBreaker();
				if (!game.global.runningChallengeSquared){
					var amt = 30;
					amt = rewardResource("helium", amt, level);
					message("You managed to steal " + prettify(amt) + " Helium canisters from that Omnipotrimp. That'll teach it.", "Loot", "oil", 'helium', 'helium');
				}
				if (game.global.world % 5 == 0){
					message("The Omnipotrimp explodes, killing all of your soldiers!", "Combat", null, null, 'trimp');
					game.stats.trimpsKilled.value += game.resources.trimps.soldiers;
					game.global.soldierHealth = 0;
					game.global.fighting = false;
					game.resources.trimps.soldiers = 0;
					updateGoodBar();
				}
			}
		},
		Mutimp: {
			location: "World",
			locked: 1,
			attack: 3,
			health: 6,
			fast: true,
			loot: function (level) {
				amt = rewardResource("metal", 5, level);
				message("Radioactive waste spills to the ground as the Mutimp falls. You send a few Trimps to grab the shiny stuff in the toxic sludge, which ends up being " + prettify(amt) + " bars of metal!", "Loot", "*cubes", null, 'primary');
			}
		},
		Hulking_Mutimp: {
			location: "World",
			locked: 1,
			attack: 5,
			health: 12,
			fast: true,
			loot: function (level) {
				amt = rewardResource("metal", 8, level);
				message("Radioactive waste spills to the ground as the Hulking Mutimp falls. You send a few Trimps to grab the shiny stuff in the toxic sludge, which ends up being " + prettify(amt) + " bars of metal!", "Loot", "*cubes", null, 'primary');
			}
		},
		//Exotics
		Goblimp: {
			location: "Maps",
			locked: 1,
			world: 6,
			attack: 1,
			health: 1,
			dropDesc: "Drops 6x Gems",
			fast: false,
			loot: function (level) {
				var amt = rewardResource("gems", 3, level, true);
				message("That Goblimp dropped " + prettify(amt) + " gems! What a bro!", "Loot", "*diamond", "exotic", 'exotic');
				game.unlocks.impCount.Goblimp++;
			}
		},
		Feyimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			dropDesc: "Drops 15x Gems",
			fast: false,
			loot: function (level) {
				if (game.resources.gems.owned == 0) 	fadeIn("gems", 10);
				var amt = rewardResource("gems", 7.5, level);
				message("That Feyimp gave you " + prettify(amt) + " gems! Thanks Feyimp!", "Loot", "*diamond", "exotic", "exotic");
				game.unlocks.impCount.Feyimp++;
			}
		},
		Flutimp: {
			location: "Maps",
			locked: 1,
			world: 6,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "Drops Fragments",
			loot: function (level) {
				var amt = rewardResource("fragments", 1, level, true);
				message("You stole " + prettify(amt) + " fragments from that Flutimp! It really didn't look like she needed them though, don't feel bad.", "Loot", "th", "exotic", "exotic");
				game.unlocks.impCount.Flutimp++;
			}
		},
		Tauntimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "Grants an extra 0.3% of current Trimps",
			loot: function () {
				var amt = Math.ceil(game.resources.trimps.max * 0.003);
				game.unlocks.impCount.Tauntimp++;
				game.unlocks.impCount.TauntimpAdded += amt;
				amt = (game.global.challengeActive == "Trapper") ? addMaxHousing(amt, false) : addMaxHousing(amt, true);
				var msg = "It's nice, warm, and roomy in that dead Tauntimp. ";
				if (game.global.challengeActive != "Trapper"){
					msg += "You found ";
					if (amt == 1) msg += prettify(amt) + " Trimp inside, and it looks hella bored.";
					else msg += prettify(amt) + " Trimps inside, and they all seem content to stay living there!";
					message(msg, "Loot", "gift", "exotic", "exotic");
				}
				else {
					message(msg + " There's enough room for " + prettify(amt) + " Trimp" + ((amt == 1) ? "" : "s") + " to live inside" + ((amt == 1) ? ", though it will be quite lonely." : "!"), "Loot", "gift", "exotic", "exotic");
				}
			}
		},
		Whipimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "Grants 0.3% Trimp resource production speed",
			loot: function () {
				game.unlocks.impCount.Whipimp++;
				game.jobs.Farmer.modifier *= 1.003;
				game.jobs.Lumberjack.modifier *= 1.003;
				game.jobs.Miner.modifier *= 1.003;
				game.jobs.Scientist.modifier *= 1.003;
				game.jobs.Dragimp.modifier *= 1.003;
				game.jobs.Explorer.modifier *= 1.003;
				var amt = Math.pow(1.003, game.unlocks.impCount.Whipimp);
				amt = (amt - 1) * 100;
				var s = (game.unlocks.impCount.Whipimp == 1) ? "" : "s";
				message("Seeing the Whipimp" + s + " fall is causing all of your Trimps to work " + amt.toFixed(2) + "% harder!", "Loot", "star", "exotic", "exotic");
			}
		},
		Venimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "Grants 0.3% Trimp breed speed",
			loot: function () {
				game.unlocks.impCount.Venimp++;
				var amt = Math.pow(1.003, game.unlocks.impCount.Venimp);
				amt = (amt - 1) * 100;
				message("The ground up Venimp now increases your Trimps' breed speed by " + amt.toFixed(2) + "%!", "Loot", "glass", "exotic", "exotic");
			}
		},
		Jestimp: {
			location: "Maps",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "45 seconds of production for 1 random resource",
			loot: function () {
				var eligible = ["food", "wood", "metal", "science"];
				if (game.jobs.Dragimp.owned > 0) eligible.push("gems");
				var roll = Math.floor(Math.random() * eligible.length);
				var item = eligible[roll];
				var amt = simpleSeconds(item, 45);
				amt = scaleToCurrentMap(amt);
				addResCheckMax(item, amt, null, null, true);
				message("That Jestimp gave you " + prettify(amt) + " " + item + "!", "Loot", "*dice", "exotic", "exotic");
				game.unlocks.impCount.Jestimp++;
			}
		},
		Titimp: {
			location: "Maps",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "+100% damage for 30 seconds in maps",
			loot: function () {
				var timeRemaining = parseInt(game.global.titimpLeft, 10);
				if (timeRemaining > 0) {
					timeRemaining += 30;
					if (timeRemaining > 45) timeRemaining = 45;
				}
				else timeRemaining = 30;
				game.global.titimpLeft = timeRemaining;
				message("That Titimp made your Trimps super strong!", "Loot", "*hammer", "exotic", "exotic");
			}
		},
		Chronoimp: {
			location: "Maps",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "5 seconds of production for all basic resources",
			loot: function () {
				var eligible = ["food", "wood", "metal", "science"];
				if (game.jobs.Dragimp.owned > 0) eligible.push("gems");
				var cMessage = "That Chronoimp dropped ";
				for (var x = 0; x < eligible.length; x++){
					var item = eligible[x];
					var amt = simpleSeconds(item, 5);
					amt = scaleToCurrentMap(amt);
					addResCheckMax(item, amt, null, null, true);
					cMessage += prettify(amt) + " " + item;
					if (x == (eligible.length - 1)) cMessage += "!";
					else if (x == (eligible.length - 2)) cMessage += ", and ";
					else cMessage += ", ";
				}
				message(cMessage, "Loot", "hourglass", "exotic", "exotic");
				game.unlocks.impCount.Chronoimp++;
			}
		},
		Magnimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "0.3% extra loot from maps and Zones (Not Helium)",
			loot: function () {
				game.unlocks.impCount.Magnimp++;
				var amt = Math.pow(1.003, game.unlocks.impCount.Magnimp);
				amt = (amt - 1) * 100;
				message("You killed a Magnimp! The strong magnetic forces now increase your loot by " + amt.toFixed(2) + "%!", "Loot", "magnet", "exotic", "exotic");
			}
		},
		Skeletimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 0.77,
			health: 2,
			fast: false,
			loot: function () {
				message("Your Trimps managed to pull 1 perfectly preserved bone from that Skeletimp!", "Loot", "italic", null, "bone");
				game.global.b++;
				game.global.lastSkeletimp = new Date().getTime();
				updateSkeleBtn();
			}
		},
		Megaskeletimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 0.99,
			health: 2.5,
			fast: false,
			loot: function () {
				message("That was a pretty big Skeletimp. Your Trimps scavenged the remains and found 2 perfectly preserved bones!", "Loot", "italic", null, "bone");
				game.global.b += 2;
				game.global.lastSkeletimp  = new Date().getTime();
				updateSkeleBtn();
			}
		}

	},

	mapConfig: {
		names: {
			prefix: ["Whispering", "Sandy", "Little", "Big", "Rancid", "Tired", "Laughing", "Weeping", "Windy", "Terrible", "Nasty", "Dirty",
			"Red", "Black", "Singing", "Fiery", "Rocky", "Haunted", "Forgotten", "Miserable", "Cursed", "Tainted", "Blessed", "Sacred",
			"Abandoned", "Natural", "Enchanted", "Magical", "Calm", "Rugged", "Violent", "Weird", "Secret", "Forbidden", "Bewitched",
			"Dark", "Light", "Magnificent", "Evil", "Holy", "Hallowed", "Desecrated", "Silent", "Eternal", "Underground", "Temperate", "Chilly",
			"Muddy", "Dank", "Steamy", "Humid", "Dry", "Putrid", "Foul", "Dangerous", "Marred", "Blighted", "Crystal", "Frozen", "Simple", "Timeless"],
			suffix: ["Creek.Sea", "Coast.Sea", "Swamp.Sea", "Forest.Forest", "Mountain.Mountain", "Beach.Sea", "Hill.Mountain", "Butte.Mountain",
			"Ridge.Mountain", "Mesa.Mountain", "Valley.Depths", "Peak.Mountain", "Canyon.Depths", "Plateau.Mountain", "Crag.Depths",
			"Crater.Depths", "Oaks.Forest",  "Volcano.Mountain", "Glacier.Sea",  "Brook.Sea", "Cave.Depths",  "Sea.Sea", "Ocean.Sea",
			"Lake.Sea", "Jungle.Forest", "Island.Sea", "Ruins.Depths", "Temple.Depths", "Bog.Sea", "Grove.Forest", "Jungle.Forest",
			"Thicket.Forest", "Woods.Forest", "Oasis.Forest", "Mineshaft.Depths", "Tunnel.Depths", "Depths.Depths", "Cavern.Depths",
			"Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful",
			"Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful"]
		},
		locations: {
		//Add new resources to function getMapIcon in updates.js to get icons on maps
			Sea: {
				resourceType: "Food"
			},
			Mountain: {
				resourceType: "Metal"
			},
			Forest: {
				resourceType: "Wood"
			},
			Depths: {
				resourceType: "Gems"
			},
			Plentiful: {
				resourceType: "Any"
			},
			Hell: {
				resourceType: "Metal",
				upgrade: "Portal"
			},
			Block: {
				resourceType: "Wood",
				upgrade: "Shieldblock"
			},
			Wall: {
				resourceType: "Food",
				upgrade: "Bounty"
			},
			Doom: {
				resourceType: "Metal",
				upgrade: [ "AncientTreasure", "Relentlessness"]
			},
			Prison: {
				resourceType: "Food",
				upgrade: "Keys"
			},
			Bionic: {
				resourceType: "Any",
				upgrade: ["roboTrimp", "Geneticistassist"]
			},
			Void: {
				resourceType: "Any",
				upgrade: ["AutoStorage", "Heirloom", "ImprovedAutoStorage", "MapAtZone"]
			},
			Star: {
				resourceType: "Metal"
			},
			All: {
				resourceType: "Metal"
			}
		},
		sizeBase: 50,
		sizeRange: 25,
		difficultyBase: 1.2,
		difficultyRange: 0.45,
		lootBase: 1.3,
		lootRange: 0.3
	},

	mapUnlocks: {
		roboTrimp: {
			world: 125,
			level: "last",
			icon: "*chain",
			title: "RoboTrimp",
			canRunWhenever: true,
			filterUpgrade: true,
			specialFilter: function (world) {
				var tier = Math.floor((world - 125) / 15);
				return ((game.global.bionicOwned == tier + 1) || (game.global.roboTrimpLevel == tier));
			},
			getShriekValue: function () {
				var level = game.global.roboTrimpLevel;
				if (level == 0) return 1;
				if (level == 1) return 0.85;
				return (0.85 * Math.pow(0.90, level - 1));
			},
			createMap: function(tier) {
				game.global.bionicOwned++;
				if (game.global.bionicOwned == 1)
					message("You found a map to the Bionic Wonderland. Sounds fun!", "Story");
				else
					message("You found a map to an even more advanced version of the Bionic Wonderland! Looks scary... Your scientists remind you that you can only carry 3 of these incredibly heavy, metallic maps at a time.", "Story");
				var roman = romanNumeral(tier + 1);
				createMap(((tier * 15) + 125), "Bionic Wonderland " + roman, "Bionic", 3, 100, 2.6, true);
				purgeBionics();
			},
			fire: function (fromTalent) {
				var level = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)].level;
				var bionicTier = parseInt(((level - 125) / 15), 10) + 1;
				if (bionicTier == game.global.bionicOwned) {
					this.createMap(bionicTier);
				}
				if (fromTalent === true) return;
				if (bionicTier - 1 == game.global.roboTrimpLevel) {
					if (game.global.roboTrimpLevel == 0){
						cancelTooltip();
						var text = "There seems to be a small RoboTrimp that you appear to have orphaned. You decide to take him with you, since you're pretty good at training stuff. He deals <b>20%</b> extra damage for you, and has a special ability. You can learn more about the special ability by hovering over the new <span class='icomoon icon-chain'></span> icon by your soldiers.<br/><br/>You also found a map to a more powerful version of the Bionic Wonderland. You would bet there's another RoboTrimp who needs 'rescuing' in there.";
						if (game.options.menu.tooltips.enabled == 0) text += '<br/><br/><b>Just a heads up</b>: You have tooltips disabled, so you will need to hold shift when you mouse over the <span class="icomoon icon-chain"></span> to read about it.';
						tooltip('confirm', null, 'update', text, null, 'RoboTrimp');
						game.global.roboTrimpLevel = 1;
						document.getElementById("chainHolder").style.visibility = 'visible';
					}
					else {
						game.global.roboTrimpLevel++;
						var values = game.global.roboTrimpLevel;
						values = [(values) * 20, ((1 - this.getShriekValue()) * 100).toFixed(1)];
						message("<span class='icomoon icon-chain'></span> Hey look, another baby RoboTrimp! You decide to add him to your collection. You now deal " + Math.floor(values[0]) + "% extra damage thanks to your pets, and MagnetoShriek now removes " + Math.floor(values[1]) + "% of an Improbability's attack", "Notices");
					}
				}
			}
		},
		Geneticistassist: {
			world: 170,
			level: 79,
			icon: "*clipboard",
			title: "Geneticistassist",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function (){
				return (!game.global.Geneticistassist);
			},
			fire: function () {
				tooltip('The Geneticistassist', null, 'update');
				game.global.Geneticistassist = true;
				unlockJob("Geneticist");
				addNewSetting("GeneticistassistTarget");
				addNewSetting("geneSend");
			}
		},
		AutoStorage: {
			world: 75,
			level: "last",
			icon: "*eye4",
			title: "Auspicious Presence",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function(world) {
				return !game.global.autoStorageAvailable;
			},
			fire: function(){
				var text = "From the void, an auspicious presence reaches out and fills your mind. You feel at peace with the world. It asks you what you desire most, and without a second thought you reply that you wish your Trimps were smart enough to manage storage structures on their own. The presence lets you know that it is done, then dissipates. You instantly regret not asking to go home.";
				tooltip('confirm', null, 'update', text, null, 'Auspicious Presence');
				game.global.autoStorageAvailable = true;
				document.getElementById("autoStorageBtn").style.display = "block";
				createHeirloom();
				message("You found an Heirloom!", "Loot", "*archive", null, "secondary", null, null, true);
			}
		},
		ImprovedAutoStorage: {
			world: 150,
			level: "last",
			icon: "*eye4",
			title: "Auspicious Presence Part II",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function(world) {
				return !game.global.improvedAutoStorage;
			},
			fire: function(){
				var text = "<p>From the void, an auspicious presence reaches out and fills your mind. You feel at peace with the world. It asks you what you desire most. Wait... hasn't this happened before? Last time you asked for your Trimps to be smart enough to manage storage structures on their own. You can make it better this time! You excitedly ask for your Trimps to waste less resources when managing resources on their own. The presence lets you know that it is done, then dissipates. You get serious déjà-vu while regretting not asking to go home.</p><p style='font-weight: bold'>From now on, storage facilities will be constructed instantly. If you collect more resources from one source than you can hold, the extra resources will be used to build new storage facilities without wasting any resources. You may not be home, but your Trimps are now quite talented!</p>";
				tooltip('confirm', null, 'update', text, null, 'Auspicious Presence Part II', null, null, true);
				enableImprovedAutoStorage();
				createHeirloom();
				message("You found an Heirloom!", "Loot", "*archive", null, "secondary");
			}
		},
		MapAtZone: {
			world: 225,
			level: "last",
			icon: "*eye4",
			title: "Auspicious Presence Part III",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function(world) {
				return !game.global.canMapAtZone;
			},
			fire: function(){
				var text = "<p>From the void, an auspicious presence reaches out and fills your mind. You feel at peace with the world. It asks you what you desire most. Wait... how many times has this happened now? You're fairly positive that there was something you regretted not asking last time, but you can't quite remember. You've asked for Trimps to be able to manage storage structures, and you've asked for them to be better at managing those structures. Even though you're content with your storage solutions, you suddenly realize the perfect request! You wish the Trimps would stop pushing so far through the Zones while you're sleeping, so you ask for a way to tell the Trimps to stop fighting at a Zone of your choosing. The presence lets you know that it is done, then dissipates. As usual, you get serious déjà-vu while regretting not asking to go home.</p><p style='font-weight: bold'>From now on, you have access to the Map At Zone setting. This setting can be accessed through the Map Sidebar, Settings, or the 'Configure Maps' popup!</p>";
				tooltip('confirm', null, 'update', text, null, 'Auspicious Presence Part III', null, null, true);
				game.global.canMapAtZone = true;
				addNewSetting("mapAtZone");
				createHeirloom();
				message("You found an Heirloom!", "Loot", "*archive", null, "secondary");
			}
		},
		AncientTreasure: {
			world: 33,
			level: "last",
			icon: "piggy-bank",
			title: "Ancient Treasure",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function(world) {
				return !game.portal.Relentlessness.locked;
			},
			fire: function(){
				addResCheckMax("food", game.resources.food.owned);
				addResCheckMax("wood", game.resources.wood.owned);
				addResCheckMax("metal", game.resources.metal.owned);
				message("After barely escaping a fierce boulder, you check out the relic you found in there. It glows extremely bright for a few seconds before disappearing, and you look at your storages to see that your Food, Wood, and Metal have been doubled!", "Story", "piggy-bank", "highlightStoryMessage");
			}

		},
		Heirloom: {
			world: 6,
			level: "last",
			icon: "*archive",
			title: "Heirloom",
			filterUpgrade: true,
			canRunWhenever: true,
			fire: function () {
				createHeirloom();
				if (game.global.world >= 60 && game.global.voidDeaths == 0 && game.global.voidBuff == "bleed") giveSingleAchieve("Survivor");
				message("You found an Heirloom!", "Loot", "*archive", null, "secondary");
			}
		},
		Keys: {
			world: 80,
			level: "last",
			icon: "*key4",
			title: "The Warden's Keys",
			filterUpgrade: true,
			canRunOnce: true,
			specialFilter: function () {
				return (game.global.prisonClear == 0);
			},
			fire: function () {
				message("You have slain the Warden and taken his keys. How weird would it be if they fit in that key hole on the portal?", "Story");
				game.challenges.Electricity.hasKey = true;
				game.global.prisonClear++;
			}
		},
		Relentlessness: {
			world: 33,
			level: "last",
			icon: "compressed",
			title: "Unleash the Crit",
			filterUpgrade: true,
			canRunOnce: true,
			specialFilter: function () {
				return game.portal.Relentlessness.locked;
			},
			fire: function () {
				message("You've never been here before. Like, ever. This entire place felt cold and unfamiliar. Where are you? Why have so many Trimps had to fall to get here? You're suddenly angry, it's time to take a stand.", "Story");
				message("You have permanantly unlocked a new Perk, Relentlessness, which will remain unlocked through portals.", "Notices");
				game.portal.Relentlessness.locked = false;
			}
		},
		Portal: {
			world: 20,
			level: "last",
			icon: "repeat",
			title: "Portal",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function (level, fromGenerator) {
				if (!this.canRunOnce) return;
				var messageText = (fromGenerator) ? "The world feels a little bit less angry as you fire off your handy Portal Generator. You can tell that somewhere in some dimension, a Megablimp is no more. In front of you, " + ((game.global.runningChallengeSquared) ? "a green, shining box appears" : "45 helium and a green, shining box appear") + " on the ground. In tiny writing on the box, you can make out the words 'Time portal. THIS SIDE UP'." : "Don't ever let anyone tell you that you didn't just kill that Megablimp. Because you did. As he melts away into nothingness, you notice a green, shining box on the ground. In tiny writing on the box, you can make out the words 'Time portal. THIS SIDE UP'.";
				message(messageText, "Story");
				game.global.portalActive = true;
				fadeIn("portalBtn", 10);
				if (game.global.runningChallengeSquared) return;
				fadeIn("helium", 10);
				addHelium(45);
				if (!fromGenerator){
					message("<span class='glyphicon glyphicon-oil'></span> You were able to extract 45 Helium canisters from that Blimp! Now that you know how to do it, you'll be able to extract helium from normal Blimps.", "Story");
				}
				if (game.global.challengeActive == "Metal"){
					game.global.challengeActive = "";
					game.challenges.Metal.abandon();
					game.portal.Artisanistry.locked = false;
					game.challenges.Metal.completed = true;
					message("You have completed the <b>Metal Challenge!</b> You have unlocked a new perk, and Miners have returned to your game.", "Notices");
				}
				if (game.global.challengeActive == "Size"){
					game.global.challengeActive = "";
					game.challenges.Size.abandon();
					game.challenges.Size.completed = true;
					game.portal.Carpentry.locked = false;
					message("You have completed the <b>Size Challenge!</b> You have unlocked a new perk, and your Trimps have been reduced down to their normal size.", "Notices");
				}
				if (game.global.challengeActive == "Discipline"){
					game.global.challengeActive = "";
					game.challenges.Discipline.completed = true;
					game.portal.Range.locked = false;
					message("You have completed the <b>Discipline Challenge!</b> You have unlocked a new perk, and your Trimps have regained their Discipline.", "Notices");
				}
				if (game.global.challengeActive == "Frugal"){
					game.global.challengeActive = "";
					game.global.frugalDone = true;
					game.challenges.Frugal.abandon();
					message("You have completed the 'Frugal' challenge! You can once again find equipment upgrades in maps, and Megabooks now increase gather rates by an extra 10%!", "Notices");
				}
				if (game.global.challengeActive == "Coordinate"){
					game.global.challengeActive = "";
					game.portal.Coordinated.locked = false;
					message("You have completed the 'Coordinate' challenge! The Bad Guys on this world no longer fight together, and have regained their speed. You have unlocked the 'Coordinated' perk!", "Notices");
				}
			}
		},
		Shieldblock: {
			world: 10,
			message: "That thing dropped a book. Doesn't look like an ordinary book. Looks... blockier...",
			level: "last",
			icon: "book",
			title: "Shieldblock",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("Shieldblock");
				if (game.global.runningChallengeSquared) return;
				if (game.global.challengeActive == "Scientist"){
					game.global.challengeActive = "";
					game.global.sLevel = getScientistLevel();
					game.challenges.Scientist.abandon();
					message("You have completed the <b>Scientist Challenge!</b> From now on, you'll " + getScientistInfo(game.global.sLevel, true) + " every time you portal. You've unlocked Scientists, and <b>Don't forget that you can click Research on your Science again!</b>", "Notices");
				}
				if (game.global.challengeActive == "Trimp"){
					game.global.challengeActive = "";
					game.challenges.Trimp.abandon();
					game.portal.Resilience.locked = false;
					message("You have completed the <b>Trimp Challenge!</b> You have unlocked the 'Resilience' perk, and your Trimps can fight together again.", "Notices");
				}
			}
		},
		Bounty: {
			world: 15,
			message: "It's all shiny and stuff. You're pretty sure you've never seen a book this shiny.",
			level: "last",
			icon: "book",
			title: "Bounty",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockUpgrade("Bounty");
			}
		},
		Supershield: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Shield!",
			level: "last",
			icon: "book",
			title: "Supershield",
			prestige: true,
			last: 1,
			fire: function () {
				unlockUpgrade("Supershield");
			}
		},
		Dagadder: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Dagger!",
			level: "last",
			icon: "book",
			title: "Dagadder",
			prestige: true,
			last: 1,
			fire: function () {
				unlockUpgrade("Dagadder");
			}
		},
		Bootboost: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Boots!",
			level: "last",
			icon: "book",
			title: "Bootboost",
			prestige: true,
			last: 1,
			fire: function () {
				unlockUpgrade("Bootboost");
			}
		},
		Megamace: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Mace!",
			level: "last",
			icon: "book",
			title: "Megamace",
			prestige: true,
			last: 2,
			fire: function () {
				unlockUpgrade("Megamace");
			}
		},
		Hellishmet: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Helmet!",
			level: "last",
			icon: "book",
			title: "Hellishmet",
			prestige: true,
			last: 2,
			fire: function () {
				unlockUpgrade("Hellishmet");
			}
		},
		Polierarm: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Polearm!",
			level: "last",
			icon: "book",
			title: "Polierarm",
			prestige: true,
			last: 3,
			fire: function () {
				unlockUpgrade("Polierarm");
			}
		},
		Pantastic: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Pants!",
			level: "last",
			icon: "book",
			title: "Pantastic",
			prestige: true,
			last: 3,
			fire: function () {
				unlockUpgrade("Pantastic");
			}
		},
		Axeidic: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Battleaxe!",
			level: "last",
			icon: "book",
			title: "Axeidic",
			prestige: true,
			last: 4,
			fire: function () {
				unlockUpgrade("Axeidic");
			}
		},
		Smoldershoulder: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Shoulderguards!",
			level: "last",
			icon: "book",
			title: "Smoldershoulder",
			prestige: true,
			last: 4,
			fire: function () {
				unlockUpgrade("Smoldershoulder");
			}
		},
		Greatersword: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Greatsword!",
			level: "last",
			icon: "book",
			title: "Greatersword",
			prestige: true,
			last: 5,
			fire: function () {
				unlockUpgrade("Greatersword");
			}
		},
		Bestplate: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Breastplate!",
			title: "Bestplate",
			level: "last",
			icon: "book",
			prestige: true,
			last: 5,
			fire: function () {
				unlockUpgrade("Bestplate");
			}
		},
		Harmbalest: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Arbalest!",
			title: "Harmbalest",
			level: "last",
			specialFilter: function () {
				return (game.equipment.Arbalest.locked == 0);
			},
			icon: "book",
			prestige: true,
			last: 5,
			fire: function () {
				unlockUpgrade("Harmbalest");
			}
		},
		GambesOP: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Gambeson!",
			title: "GambesOP",
			level: "last",
			specialFilter: function () {
				return (game.equipment.Gambeson.locked == 0);
			},
			icon: "book",
			prestige: true,
			last: 5,
			fire: function () {
				unlockUpgrade("GambesOP");
			}
		},
		Speedexplorer: {
			world: -1,
			specialFilter: function (mapLevel) {
				var booksNeeded = Math.floor((mapLevel - this.next) / 10);
				return (booksNeeded > 0);
			},
			addToCount: true,
			level: [10, 20],
			icon: "book",
			title: "A well-hidden book",
			next: 10,
			fire: function (unused, fromAuto) {
				var mapLevel;
				if (!fromAuto){
					if (!getCurrentMapObject() || !getCurrentMapObject().level) return;
					var mapLevel = getCurrentMapObject().level;
				}
				else{
					mapLevel = game.global.world;
				}
				var booksNeeded = Math.floor((mapLevel - this.next) / 10);
				if (booksNeeded > 0){
					for (var x = 0; x < booksNeeded; x++) {
						unlockUpgrade("Speedexplorer");
						this.next += 10;
					}
					var copy = (booksNeeded == 1) ? "copy" : booksNeeded + " copies";
					message("The " + copy + " of 'Speedexplorer' under these bushes will certainly be useful!", "Unlocks", null, null, 'repeated', convertUnlockIconToSpan(this));
				}
			}
		},
		TheBlock: {
			world: -1,
			message: "Holy cowimp! A unique map!",
			level: [10, 20],
			icon: "th-large",
			title: "The Block",
			startAt: 11,
			canRunOnce: true,
			fire: function () {
				message("You just made a map to The Block!", "Story");
				createMap(11, "The Block", "Block", 2, 100, 1.3, true, true);
			}
		},
		TheWall: {
			world: -1,
			message: "Oh snap! Another unique map!",
			level: [10, 20],
			icon: "th-large",
			title: "The Wall",
			startAt: 15,
			canRunOnce: true,
			fire: function () {
				message("You just made a map to The Wall!", "Story");
				createMap(15, "The Wall", "Wall", 2, 100, 1.5, true, true);
			}
		},
		ThePrison: {
			startAt: 80,
			level: [1, 10],
			icon: "th-large",
			canRunOnce: true,
			title: "The Prison",
			fire: function () {
				game.global.mapsUnlocked = true;
				createMap(80, "The Prison", "Prison", 2.6, 100, 2.6, true);
				message("You found The Prison! You have a bad feeling about going in...", "Story");
			}
		},
		BionicWonderland: {
			startAt: 125,
			level: [1, 15],
			icon: "th-large",
			canRunOnce: true,
			title: "Bionic Wonderland",
			fire: function () {
				message("You found a map to the Bionic Wonderland. Sounds fun!", "Story");
				game.global.bionicOwned++;
				createMap(125, "Bionic Wonderland", "Bionic", 3, 100, 2.6, true);
			}
		},
		ImplodingStar: {
			startAt: 170,
			level: [1, 15],
			icon: 'th-large',
			canRunOnce: true,
			title: 'Imploding Star',
			fire: function () {
				message("You found a map to an Imploding Star inside of a supercooled dimension. The temperature there is perfect!", "Story");
				createMap(170, "Imploding Star", "Star", 3, 100, 3.2, true);
			}
		},
		Mansion: {
			world: -1,
			startAt: 8,
			message: "You found plans for a Mansion! Your Trimps will be pretty stoked",
			level: [10, 20],
			icon: "*home4",
			title: "Mansion",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Mansion");
			}
		},
		Hotel: {
			world: -1,
			startAt: 14,
			message: "You found plans for a hotel! (A decent hotel, too)",
			level: [10, 20],
			icon: "*office",
			title: "The Trimps' Guide to Cheap Hotel Construction",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Hotel");
			}
		},
		UberHut: {
			world: -1,
			startAt: 18,
			message: "This extremely technical book will teach anyone who can understand the big words how to make bigger huts.",
			level: [10, 20],
			icon: "book",
			title: "Hut hut hut",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberHut");
			}
		},
		UberHouse: {
			world: -1,
			startAt: 29,
			message: "This book talks about adding a second floor to your homes! Mind... blown...",
			level: [10, 20],
			icon: "book",
			title: "A Tale of Two Stories",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberHouse");
			}
		},
		UberMansion: {
			world: -1,
			startAt: 34,
			message: "This book will teach you how to make your Trimps share their mansions!",
			level: [10, 20],
			icon: "book",
			title: "Sharing is Caring",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberMansion");
			}
		},
		UberHotel: {
			world: -1,
			startAt: 40,
			message: "This book will teach you how to build smaller hotel rooms!",
			level: [5, 10],
			icon: "book",
			title: "The Art of Tiny Hotel Rooms",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberHotel");
			}
		},
		UberResort: {
			world: -1,
			startAt: 47,
			level: [5, 10],
			message: "Wow! This book! It's so Resortsfull!",
			icon: "book",
			title: "Time for a better vacation",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberResort");
			}
		},
		Resort: {
			world: -1,
			startAt: 25,
			message: "You found plans for a huge resort!",
			level: [10, 20],
			icon: "*building",
			title: "Time for a vacation",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Resort");
			}
		},
		Gateway: {
			world: -1,
			startAt: 30,
			message: "You found a key to Dimension ZZZ!",
			level: [10, 20],
			icon: "cog",
			title: "Transgalactic Gateway",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Gateway");
			}
		},
		Wormhole: {
			world: -1,
			startAt: 37,
			message: "You found a crystal powerful enough to create wormholes!",
			level: [10, 20],
			icon: "link",
			title: "Inter-Dimensional Hole-Maker",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Wormhole");
			}
		},
		Collector: {
			world: -1,
			startAt: 50,
			message: "You found plans for some sort of overly complicated solar panel.",
			level: [3, 19],
			icon: "dashboard",
			title: "Collector",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Collector");
			}
		},
		Trapstorm: {
			world: -1,
			startAt: 10,
			message: "A book that teaches your Foremen a new skill. Riveting.",
			level: [5, 15],
			icon: "book",
			title: "Trapstorm",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("Trapstorm");
			}
		},

		Nursery: {
			world: -1,
			startAt: 23,
			message: "You found blueprints for some sort of nursery that can harness more power from gems.",
			level: [5, 20],
			icon: "home",
			title: "Nursery",
			canRunOnce: true,
			fire: function () {
				unlockBuilding("Nursery");
			}
		},
		//This one is for all maps
		gems: {
			world: -1,
			level: [0, 7],
			icon: "*diamond",
			title: "Gems",
			repeat: 5,
			fire: function (level) {
				var amt = rewardResource("gems", 0.5, level, true);
				message("You found " + prettify(amt) + " gems! Terrific!", "Loot", "*diamond", null, "secondary");
			}
		},
		//This one is for depths maps
		Gems: {
			world: -1,
			level: [0, 4],
			repeat: 3,
			icon: "*diamond",
			title: "Gems",
			filter: true,
			fire: function (level) {
				var amt = rewardResource("gems", 0.5, level, true);
				message("You found " + prettify(amt) + " gems! Terrific!", "Loot", "*diamond", null, "secondary");
			}
		},
		Any: {
			world: -1,
			level: [0, 2],
			icon: "*leaf2",
			title: "Food/Wood/Metal",
			repeat: 2,
			filter: true,
			fire: function (level) {
				var rand = Math.floor(Math.random() * 3);
				switch(rand) {
					case 0:
						game.mapUnlocks.Food.fire(level);
						break;
					case 1:
						game.mapUnlocks.Wood.fire(level);
						break;
					case 2:
						game.mapUnlocks.Metal.fire(level);
						break;
				}
			}
		},
		Metal: {
			world: -1,
			level: [0, 2],
			icon: "*cubes",
			title: "Metal",
			repeat: 2,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("metal", 0.5, level, true);
				message("You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot", "*cubes", null, "primary");
			}
		},
		Food: {
			world: -1,
			level: [0, 2],
			icon: "apple",
			title: "Food",
			repeat: 2,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("food", 0.5, level, true);
				message("That guy just left " + prettify(amt) + " food on the ground! Sweet!", "Loot", "apple", null, "primary");
			}
		},
		Wood: {
			world: -1,
			level: [0, 2],
			icon: "tree-deciduous",
			title: "Wood",
			repeat: 2,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("wood", 0.5, level, true);
				message("You just found " + prettify(amt) + " wood! That's pretty neat!", "Loot", "tree-deciduous", null, "primary");
			}
		}
	},

	//if you put a function in here as fire, you won't have anything unlocked, the name is just for funsies
	//-1 is all worlds, -2 is even world numbers, -3 is odd world numbers, -5 is every 5th world
	//min is inclusive, max is exclusive. too lazy to fix
	//More important stuff should be towards the top in case of bailouts
	worldUnlocks: {
		Shield: {
			message: "You found plans for a shield! It even tells you how to upgrade it, if you have enough wood. That was nice of that Bad Guy.",
			world: 1,
			title: "New Armor",
			level: 4,
			icon: "question-sign"
		},
		Boots: {
			message: "You found plans for Boots! Swell!",
			world: 1,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Dagger: {
			message: "You found plans for a Dagger! Fancy!",
			world: 1,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Mace: {
			message: "You found plans for a mace!",
			world: 2,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Helmet: {
			message: "You found plans for a helmet!",
			world: 2,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Polearm: {
			message: "You found plans for a Polearm!",
			world: 3,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Pants: {
			message: "You found plans for Pants!",
			world: 3,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Battleaxe: {
			message: "You found plans for a Battleaxe!",
			world: 4,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Shoulderguards: {
			message: "You found plans for Shoulderguards!",
			world: 4,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Greatsword: {
			message: "You found plans for a Greatsword!",
			world: 5,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Breastplate: {
			message: "You found plans for a Breastplate!",
			world: 5,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		//Non Equipment
		Bloodlust: {
			message: "You found an ancient book titled Bloodlust. You should look at it or something.",
			world: 1,
			level: 9,
			icon: "book",
			title: "Bloodlust",
			fire: function() {
				unlockUpgrade("Bloodlust");
			}
		},
		Efficiency: {
			message: "Hey, this book might be for you!",
			world: -2,
			level: 9,
			icon: "book",
			title: "Efficiency",
			fire: function() {
				unlockUpgrade("Efficiency");
			}
		},
		Gym: {
			message: "Hey look, plans for a new Gym!",
			world: 2,
			level: 4,
			icon: "home",
			title: "New Building",
			fire: function() {
				unlockBuilding("Gym");
				document.getElementById("blockDiv").style.visibility = "visible";
			}
		},
		TrainTacular: {
			message: "This book is for your Trainers!",
			world: -5,
			level: 9,
			icon: "book",
			title: "TrainTacular",
			fire: function () {
				unlockUpgrade("TrainTacular");
			}
		},
		Warpstation: {
			message: "Time to colonize the galaxy.",
			world: 60,
			level: 19,
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			title: "The Galaxy will be your Ocean",
			icon: "*rocket4",
			fire: function () {
				unlockBuilding("Warpstation");
			}
		},
		Gymystic: {
			world: -5,
			startAt: 25,
			lastAt: 55,
			level: 44,
			icon: "book",
			message: "Trimp cave paintings predicted the existence of a book such as this one, you had no idea it actually existed. It smells dusty.",
			title: "Some old, dusty book",
			fire: function () {
				unlockUpgrade("Gymystic");
			}
		},
		Gymystic2: {
			world: -25,
			startAt: 75,
			lastAt: 150,
			level: 54,
			icon: "book",
			displayAs: "Gymystic",
			message: "Trimp cave paintings predicted the existence of a book such as this one, you had no idea it actually existed. It smells dusty.",
			title: "Some old, dusty book",
			fire: function () {
				unlockUpgrade("Gymystic");
			}
		},
		Dominance: {
			world: 70,
			level: 44,
			icon: "book",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			title: "Formation",
			fire: function () {
				unlockUpgrade("Dominance");
			}
		},
		Barrier: {
			world: 80,
			level: 44,
			icon: "book",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			title: "Formation",
			fire: function () {
				unlockUpgrade("Barrier");
			}
		},
		Potency: {
			message: "This book will help your Trimps make more Trimps!",
			world: -5,
			level: 29,
			icon: "book",
			title: "Trimpma Sutra",
			fire: function () {
				if (game.global.challengeActive == "Trapper"){
					message("Your Scientists let you know that your Trimps won't understand the book, but they offer to hold on to it for you for later. How nice of them!", "Notices");
					game.challenges.Trapper.heldBooks++;
					return;
				}
				unlockUpgrade("Potency");
			}
		},
/* 		SuperShriek: {
			message: "This book will help your RoboTrimp shriek louder!",
			world: 183,
			level: 5,
			icon: "book",
			title: "MagnetoShriek is love, MagnetoShriek is life",
			fire: function () {
				unlockUpgrade("SuperShriek");
			}
		}, */
		//19 is for Armor
		Miner: {
			message: "You found an ancient book about mining. With some research you should be able to teach the Trimps to mine!",
			world: 1,
			level: 29,
			icon: "book",
			title: "Miner",
			fire: function () {
				if (game.global.challengeActive == "Metal"){
					message("Your Trimps simply do not understand what this book is talking about. It's blowing their minds. What is a 'Miner'?!", "Notices");
					game.challenges.Metal.fireAbandon = true;
					return;
				}
				unlockUpgrade("Miners");
			}
		},
		Trainer: {
			message: "You found a book about proper physical training!",
			world: 3,
			level: 3,
			icon: "book",
			title: "Step Up Your Block Game!",
			fire: function () {
				unlockUpgrade("Trainers");
			}
		},
		Scientist: {
			message: "You found a book about Einstrimp!",
			world: 1,
			level: 39,
			icon: "book",
			title: "Scientist",
			fire: function () {
				if (game.global.challengeActive == "Scientist"){
					message("Your Trimps think they're too good at Science to read your dumb book. They're already working on Portal technology!", "Notices");
					game.challenges.Scientist.fireAbandon = true;
					return;
				}
				unlockUpgrade("Scientists");
			}
		},
		Explorer: {
			message: "You found a book detailing the intricacies of solo exploration!",
			world: 15,
			level: 39,
			icon: "book",
			title: "Explorer",
			fire: function () {
				if (game.upgrades.Explorers.allowed === 0) unlockUpgrade("Explorers");
			}
		},
		Speedscience: {
			message: "You found a book called Speedscience! What do you think it could possibly do?!",
			brokenPlanet: -1,
			world: -2,
			level: 39,
			icon: "book",
			title: "Speedscience",
			fire: function () {
			if (game.global.challengeActive == "Scientist"){
				message("You found a book called Speedscience, but you haven't found anyone to read it. Such a shame.", "Notices");
				game.challenges.Scientist.heldBooks++;
				return;
			}
				unlockUpgrade("Speedscience");
			}
		},
		Megascience: {
			message: "You found a book called Megascience! It seems to fade in and out of reality.",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -2,
			level: 39,
			icon: "book",
			title: "Megascience",
			fire: function () {
				unlockUpgrade("Megascience");
			}
		},
		Gigastation: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -1,
			startAt: 61,
			lastAt: 69,
			level: 19,
			icon: "*make-group",
			title: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Gigastation2: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -2,
			startAt: 70,
			lastAt: 78,
			level: 19,
			icon: "*make-group",
			displayAs: "Gigastation",
			title: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Gigastation3: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -33,
			startAt: 81,
			lastAt: 90,
			level: 19,
			icon: "*make-group",
			title: "Gigastation",
			displayAs: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Gigastation4: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -5,
			startAt: 95,
			lastAt: 170,
			level: 19,
			icon: "*make-group",
			title: "Gigastation",
			displayAs: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Gigastation5: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -10,
			startAt: 180,
			lastAt: 229,
			level: 19,
			icon: "*make-group",
			displayAs: "Gigastation",
			title: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Magmamancer: {
			message: "You find a smouldering book that looks like it was pushed from the core of this planet. Inside are drawings of Trimps performing rituals with Gems and Magma. It's very hot to the touch, but you take it with you as you haven't had new reading material in a while.",
			world: 230,
			level: 90,
			icon: "book",
			title: "Magmamancers",
			fire: function () {
				if (game.global.challengeActive == "Metal"){
					game.challenges.Metal.holdMagma = true;
					message("This book really doesn't help too much while you're dealing with the minerlessness of this dimension. Better let your scientists hold this one for you for a bit.", "Notices");
					return;
				}
				unlockUpgrade("Magmamancers");
			}
		},
		//49 is for weapon
		Speedfarming:{
			message: "You found a book called Speedfarming! It looks delicious!",
			brokenPlanet: -1,
			world: -1,
			level: 79,
			icon: "book",
			title: "Speedfarming",
			fire: function () {
				unlockUpgrade("Speedfarming");
			}
		},
		Megafarming:{
			message: "You found a book called Megafarming! It indicates that you should actually water your crops. Brilliant!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -1,
			level: 79,
			icon: "book",
			title: "Megafarming",
			fire: function () {
				unlockUpgrade("Megafarming");
			}
		},

		Speedlumber: {
			message: "You found a book called Speedlumber! It looks long.",
			brokenPlanet: -1,
			world: -1,
			level: 69,
			icon: "book",
			title: "Speedlumber",
			fire: function () {
				unlockUpgrade("Speedlumber");
			}
		},
		Megalumber: {
			message: "You found a book called Megalumber! The quote on the back reads 'How much wood could a Wood Trimp chop if a Wood Trimp could chop wood?'",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -1,
			level: 69,
			icon: "book",
			title: "Megalumber",
			fire: function () {
				unlockUpgrade("Megalumber");
			}
		},
		Speedminer: {
			message: "You found a book called Speedminer!",
			brokenPlanet: -1,
			world: -1,
			level: 59,
			icon: "book",
			title: "Speedminer",
			fire: function() {
				if (game.global.challengeActive == "Metal"){
					message("Your scientists stare blankly at you for a moment, then slowly and quietly place the new book on the shelves.", "Notices");
					game.challenges.Metal.heldBooks++;
					return;
				}
				unlockUpgrade("Speedminer");
			}
		},
		Megaminer: {
			message: "You found a book called Megaminer! The front is really shiny and has a Trimp on it. Creepy, it seems to follow your eyes.",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -1,
			level: 59,
			icon: "book",
			title: "Megaminer",
			fire: function() {
				if (game.global.challengeActive == "Metal"){
					message("Your scientists appreciate the fact that you've managed to find another useless book, but they make sure to let you know it's still useless.", "Notices");
					game.challenges.Metal.heldMegaBooks++;
					return;
				}
				unlockUpgrade("Megaminer");
			}
		},
		Geneticist: {
			message: "Your Trimps report a strange bronze object on the floor, and you decide to come look at it. It looks freaky, so you ask one of your Trimps to pick it up first. He instantly starts itching his face and babbling off a bunch of science stuff, so you let another Trimp touch it and he does the same. This seems to make your Trimps smarter than Scientists, but may cause side effects.",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: 70,
			level: 49,
			title: "The Great Bell of Trimp",
			icon: "bell",
			fire: function () {
				unlockJob("Geneticist");
			}
		},
		Foreman: {
			message: "You found a crafting foreman! He will build buildings automatically for you!",
			world: -1,
			level: 89,
			icon: "user",
			title: "Foreman",
			fire: function () {
				game.global.autoCraftModifier += 0.25;
				updateForemenCount();
			}
		},
		Anger: {
			world: 20,
			level: 99,
			icon: "eye-open",
			title: "The End Of The Road",
			fire: function () {
				message(	"You look down and see a green gem that seems to stare back. You pick it up and feel adrenaline surge through your body. Probably best to bring this back to the lab for some research.", "Story");
				unlockUpgrade("Anger");
			}
		},
		Coordination: {
			message: "You find an ancient book titled Coordination. Exciting.",
			world: -1,
			level: 99,
			get icon (){
				return (game.global.world == mutations.Magma.start() - 1) ?  "*archive2" : "book";
			},
			title: "Coordination",
			fire: function() {
				if (game.global.challengeActive == "Trimp"){
					if (!checkIfLiquidZone())
						message("Your scientists don't think that it's a very smart idea to try any of the suggestions in this book.", "Notices");
					game.challenges.Trimp.heldBooks ++;
					return;
				}
				unlockUpgrade("Coordination");
			}
		},
		Blockmaster: {
			message: "You found a book discussing tactics for better blocking!",
			world: 4,
			level: 29,
			icon: "book",
			title: "Blockmaster",
			fire: function () {
				unlockUpgrade("Blockmaster");
			}
		},
		Egg: {
			message: "This egg looks crazy. Seriously, guys, come look at this crazy egg!",
			world: 17,
			level: 55,
			icon: "record",
			title: "Egg",
			fire: function () {
				if (game.upgrades.Egg.allowed === 0) unlockUpgrade("Egg");
			}
		},
		Doom: {
			world: 33,
			level: [15, 50],
			icon: "th-large",
			title: "Too dark to see",
			fire: function () {
				createMap(33, "Trimple Of Doom", "Doom", 3, 100, 1.8, true);
				message("There is something strange about this map. It doesn't seem to reflect any light at all, just pure darkness.", "Story");
			}
		},
		FirstMap: {
			world: 6,
			level: [1, 5],
			icon: "th-large",
			title: "Tricky Paradise",
			fire: function () {
				game.global.mapsUnlocked = true;
				unlockMapStuff();
				createMap(6, "Tricky Paradise", "Plentiful", 1.2, 45, 0.85);
				message("You found your first map! Travel to your map chamber to check it out.", "Story");
			}
		},
		easterEgg: {
			world: -1,
			locked: true,
			level: [0, 99],
			title: "Colored Egg",
			icon: "*droplet",
			addClass: function () {
				return "easterEgg easterEgg" + getRandomIntSeeded(game.global.eggSeed + 1, 0, 4);
			},
			chance: 0.15,
			fire: function (){}
		},
		//Multiples
		Map: {
			world: -1,
			startAt: 6,
			level: [0, 20],
			repeat: 10,
			icon: "th",
			title: "Map Fragments",
			fire: function() {
				var amt = rewardResource("fragments");
				message("You found " + prettify(amt) + " map fragments!", "Loot", "th", null, "secondary");
			}
		},
		//portal Trumps
		fiveTrimpMax: {
			world: -1,
			level: [10, 20],
			icon: "gift",
			title: "Battle Territory Bonus!",
			repeat: 45,
			fire: function () {
				var amt = 5 + (game.portal.Trumps.modifier * game.portal.Trumps.level);
				game.global.totalGifts += amt;
				amt = addMaxHousing(amt, game.talents.autoStructure.purchased);
				message("You have cleared enough land to support " + prettify(amt) + " more Trimps!", "Loot", "gift", null, "secondary");
			}
		},
		fruit: {
			world: -1,
			level: [0, 4],
			icon: "apple",
			title: "Food",
			repeat: 9,
			fire: function (level) {
				var amt = rewardResource("food", 0.5, level);
				message("That guy just left " + prettify(amt) + " food on the ground! Sweet!", "Loot", "apple", null, 'primary');
			}
		},
		groundLumber: {
			world: -1,
			level: [0, 2],
			icon: "tree-deciduous",
			title: "Wood",
			repeat: 8,
			fire: function (level) {
				var amt = rewardResource("wood", 0.5, level);
				message("You just found " + prettify(amt) + " wood! That's pretty neat!", "Loot", "tree-deciduous", null, 'primary');
			}
		},
		freeMetals: {
			world: -1,
			level: [3, 5],
			title: "Metal",
			icon: "*cubes",
			repeat: 6,
			fire: function (level) {
				var amt = rewardResource("metal", 0.5, level);
				message("You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot", "*cubes", null, 'primary');
			}
		},
		spireMetals: {
			world: -1,
			start: 200,
			level: [1,4],
			repeat: 4,
			fire: function (level) {
				if (!game.global.spireActive) return;
				var amt = rewardResource("metal", 25, level);
				message("There sure is a lot of metal just tossed around in this Spire! You just found " + prettify(amt) + " more!", "Loot", "*safe", "spireMetalsMsg", "primary");
			},
			specialFilter: function (){
				return checkIfSpireWorld();
			},
			title: "Spire Metal",
			icon: "*safe",
			addClass: "spireMetals"
		}
	},
	//buildings with percent = true cannot have multiple purchases at a time
	buildings: {
		Trap: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 5,
			tooltip: function () {
				var catchAmt = (game.portal.Bait.level + 1);
				var s = (catchAmt > 1) ? "s" : "";
				return "Each Trap allows you to catch " + prettify(catchAmt) + " thing" + s + ".";
			},
			cost: {
				food: 10,
				wood: 10
			},
			first: function () {
				if (document.getElementById("trimps").style.visibility == "hidden") fadeIn("trimps", 10);
			}
		},
		Barn: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			tooltip: "Increases your maximum food by 100%.",
			percent: true,
			cost: {
				food: function () {
					return calculatePercentageBuildingCost("Barn", "food", 0.25);
				}
			},
			increase: {
				what: "food.max.mult",
				by: 2
			}
		},
		Shed: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			percent: true,
			tooltip: "Increases your maximum wood by 100%.",
			cost: {
				wood: function () {
					return calculatePercentageBuildingCost("Shed", "wood", 0.25);
				}
			},
			increase: {
				what: "wood.max.mult",
				by: 2
			}
		},
		Forge: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			percent: true,
			tooltip: "Increases your maximum metal by 100%.",
			cost: {
				metal: function () {
					return calculatePercentageBuildingCost("Forge", "metal", 0.25);
				}
			},
			increase: {
				what: "metal.max.mult",
				by: 2
			}
		},
		Hut: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			AP: true,
			tooltip: "Has room for $incby$ more lovely Trimps. All Trimp housing has enough workspaces for only half of the Trimps that can live there.",
			cost: {
				food: [125, 1.24],
				wood: [75, 1.24]
			},
			increase: {
				what: "trimps.max",
				by: 3
			}
		},
		House: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 20,
			AP: true,
			tooltip: "A better house for your Trimps! Each house supports up to $incby$ more Trimps.",
			cost: {
				food: [1500, 1.22],
				wood: [750, 1.22],
				metal: [150, 1.22]
			},
			increase: {
				what: "trimps.max",
				by: 5
			}
		},
		Mansion: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 60,
			AP: true,
			tooltip: "A pretty sick mansion for your Trimps to live in. Each Mansion supports $incby$ more Trimps.",
			cost: {
				gems: [100, 1.2],
				food: [3000, 1.2],
				wood: [2000, 1.2],
				metal: [500, 1.2]

			},
			increase: {
				what: "trimps.max",
				by: 10
			}
		},
		Hotel: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			AP: true,
			tooltip: "A fancy hotel for many Trimps to live in. Complete with room service and a mini bar. Supports $incby$ Trimps.",
			cost: {
				gems: [2000, 1.18],
				food: [10000, 1.18],
				wood: [12000, 1.18],
				metal: [5000, 1.18]

			},
			increase: {
				what: "trimps.max",
				by: 20
			}
		},
		Resort: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 240,
			AP: true,
			tooltip: "A huge resort for your Trimps to live in. Sucks for the ones still stuck in huts. Supports $incby$ Trimps.",
			cost: {
				gems: [20000, 1.16],
				food: [100000, 1.16],
				wood: [120000, 1.16],
				metal: [50000, 1.16]

			},
			increase: {
				what: "trimps.max",
				by: 40
			}
		},
		Gateway: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 480,
			AP: true,
			tooltip: "A Gateway to another dimension, where your Trimps can sleep and work. Supports $incby$ Trimps.",
			cost: {
				fragments: [3000, 1.14],
				gems: [20000, 1.14],
				metal: [75000, 1.14]
			},
			increase: {
				what: "trimps.max",
				by: 100
			}
		},
		Wormhole: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 600,
			AP: true,
			tooltip: "Use your crazy, helium-cooled, easy-to-aim wormhole generator to create easy-to-travel links to other colonizable planets where your Trimps can sleep and work. Each supports $incby$ Trimps. <b>This building costs helium to create.</b>",
			cost: {
				helium: [10, 1.075],
				metal: [100000, 1.1]
			},
			increase:{
				what: "trimps.max",
				by: 1500
			}
		},
		Collector: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 1200,
			AP: true,
			tooltip: "Each collector allows you to harvest more of the power of your home star, allowing your Trimps to colonize a larger chunk of your solar system. Each supports $incby$ Trimps.",
			cost: {
				gems: [500000000000, 1.12]
			},
			increase: {
				what: "trimps.max",
				by: 5000
			}
		},
		Warpstation: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 1200,
			origTime: 1200,
			AP: true,
			tooltip: "Create a gigantic Warpstation, capable of housing tons of Trimps and instantly transporting them back to the home planet when needed. Supports $incby$ Trimps.",
			cost: {
				gems: [100000000000000, 1.4],
				metal: [1000000000000000, 1.4]
			},
			increase: {
				what: "trimps.max",
				by: 10000
			}

		},
		Gym: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 20,
			AP: true,
			tooltip: "A building where your Trimps can work out. Each Gym increases the amount of damage each trimp can block by $incby$~",
			cost: {
				wood: [400, 1.185]
			},
			increase: {
			what: "global.block",
			by: 4
			},
			fire: function () {
				if (game.upgrades.Gymystic.done === 0) return;
				var oldBlock = game.buildings.Gym.increase.by;
				game.buildings.Gym.increase.by *= (game.upgrades.Gymystic.modifier + (0.01 * (game.upgrades.Gymystic.done - 1)));
				game.global.block += ((game.buildings.Gym.increase.by - oldBlock) * (game.buildings.Gym.owned));
			}
		},
		Tribute: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			AP: true,
			tooltip: "Pay a tribute of food to your Dragimp, increasing his appetite and his speed. He will gather gems 5% faster (compounding).",
			cost: {
				food: [10000, 1.05]
			},
			increase: {
				what: "Dragimp.modifier.mult",
				by: 1.05
			}
		},
		Nursery: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			AP: true,
			get tooltip () {
				if (mutations.Magma.active())
					return "<p>Magma is generally not conductive to a healthy Nursery environment. Each Nursery will still increase Trimps per second from breeding by 1% (compounding), but 10% of your active Nurseries will shut down each Zone as the Magma moves closer. Safety first!</p><p>You have purchased " + prettify(this.purchased) + " total Nurseries.</p>";
				return "Construct a gem-powered nursery, where baby Trimps can grow up faster. Increases Trimps per second from breeding by 1% (compounding).";

			},
			cost: {
				gems: [400000, 1.06],
				wood: [1000000, 1.06],
				metal: [500000, 1.06]
			}
		},
	},
//jobs
	jobs: {
		Farmer: {
			locked: 1,
			owned: 0,
			tooltip: "Train one of your Trimps in the ancient art of farming. Each Farmer harvests $modifier$ food per second.",
			cost: {
				food: 5
			},
			increase: "food",
			modifier: 0.5
		},
		Lumberjack: {
			locked: 1,
			owned: 0,
			tooltip: "Show a Trimp how to cut one of those weird trees down. Each Lumberjack hauls back $modifier$ logs per second.",
			cost: {
				food: 5
			},
			increase: "wood",
			modifier: 0.5
		},
		Miner: {
			locked: 1,
			owned: 0,
			tooltip: "Send your misbehaving Trimps to the mines for some therapeutic work. Each Miner can find and smelt $modifier$ bars of metal per second.",
			cost: {
				food: 20
			},
			increase: "metal",
			modifier: 0.5
		},
		Scientist: {
			locked: 1,
			owned: 0,
			tooltip: "It takes some patience, but you can teach these Trimps to do some research for you. Each Scientist records $modifier$ units of pure science each second.",
			cost: {
				food: 100
			},
			increase: "science",
			modifier: 0.5
		},
		Trainer: {
			locked: 1,
			allowAutoFire: true,
			owned: 0,
			tooltip: function () {
				var text = "Each trainer will increase the base amount your soldiers can block by ";
				var heirloomBonus = game.heirlooms.Shield.trainerEfficiency.currentBonus;
				var modifier = game.jobs.Trainer.modifier;
				if (heirloomBonus > 0){
					modifier = calcHeirloomBonus("Shield", "trainerEfficiency", modifier).toFixed(1);
					return text + modifier + "%. (" + game.jobs.Trainer.modifier + "% increased by " + heirloomBonus + "% thanks to " + game.global.ShieldEquipped.name + ")";
				}
				return text + modifier + "%.";
			},
			cost: {
				food: [750, 1.1]
			},
			increase: "custom",
			modifier: 20
		},
		Explorer: {
			locked: 1,
			allowAutoFire: true,
			owned: 0,
			tooltip: "Each explorer will find an average of $modifier$ fragments each second.",
			cost: {
				food: [15000, 1.1]
			},
			increase: "fragments",
			modifier: 0.4
		},
		Dragimp: {
			locked: 1,
			owned: 0,
			increase: "gems",
			modifier: 0.5
		},
		Geneticist: {
			locked: 1,
			allowAutoFire: true,
			owned: 0,
			get tooltip (){
				var text = "<p>Each Geneticist will increase the health of each Trimp by 1% (compounding), but slows the rate at which baby Trimps grow by 2% (compounding).</p>"
				if (this.owned > 0) {
					var breedMult = Math.pow(.98, game.jobs.Geneticist.owned);
					var breedDisplay = (breedMult > 0.0001) ? breedMult.toFixed(4) : breedMult.toExponential(3);
					var healthMult = Math.pow(1.01, this.owned);
					var healthDisplay = prettify((healthMult * 100) - 100) + "%";
					text += "<p>Owning " + prettify(this.owned) + " Geneticist" + ((this.owned == 1) ? "" : "s") + " multiplies your breed speed by " + breedDisplay + ", and adds " + healthDisplay + " Health.</p>";
				}
				return text;
			},
			cost: {
				food: [1000000000000000, 1.03],
			},
			increase: "custom",
			modifier: 1
		},
		Magmamancer: {
			locked: 1,
			owned: 0,
			allowAutoFire: true,
			get tooltip(){
				var timeOnZone = Math.floor((getGameTime() - game.global.zoneStarted) / 60000);
				if (game.talents.magmamancer.purchased) timeOnZone += 5;
				var bonus = (this.getBonusPercent() - 1) * 100;
				var timeStr;
				if (timeOnZone >= 120)
					timeStr = "over 120 minutes (Max)";
				else{
					var remaining = 10 - (timeOnZone % 10);
					var nextBonus = ((this.getBonusPercent(false, Math.floor(timeOnZone / 10) + 1) - 1) * 100);
					timeStr = prettify(timeOnZone) + " minute" + ((timeOnZone == 1) ? "" : "s") + ". In " + prettify(remaining) + " minute" + ((remaining == 1) ? "" : "s") + ", this bonus will increase to " + prettify(nextBonus) + "%";
					if (timeOnZone < 10) bonus = 0;
				}
				var currentMag = (((1 - Math.pow(0.9999, this.owned)) * 3));
				var nextMag = (((1 - Math.pow(0.9999, this.owned + 1)) * 3));
				var nextBonus = (1 - (currentMag / nextMag)) * 100;
				var textString = "<p>Train a Magmamancer to craft pickaxe heads infused with Gems and Magma, custom for the unique rocks in each Zone. The more Magmamancers you have and the longer you spend in one Zone, the more Metal your Trimps will be able to gather!</p><p>For each 10 minutes you spend in a Zone with Magmamancers up to 2 hours, your Magmamancer bonus will increase by 20% (compounding). Your current bonus is <b>" + prettify(bonus) + "%</b>, and " + ((game.talents.magmamancer.purchased) ? "counting your Magmamancermancy Mastery " : "") + "you've been on this Zone for " + timeStr + ".</p>";
				if (this.owned > 0) textString += "<p>Your next Magmamancer will increase the total bonus by " + prettify(nextBonus) + "% (compounding, hold Ctrl to see formula)</p>";
				else textString += "<p>After training your first Magmamancer, your bonus metal will be " + prettify((nextMag * (Math.pow(1.2, this.getBonusPercent(true)) - 1)) * 100) + "%. (Hold Ctrl to see formula)</p>";
				if (ctrlPressed) textString += "<b><p>M = Magmamancer count. T = Time on Zone in minutes, divided by 10, rounded down.</p><p>Metal/Sec *= 1 + (((1 - (0.9999 ^ M)) * 3) * ((1.2 ^ T) - 1))</p><b>";
				return textString;
			},
			cost: {
				gems: [1e60, 1.01]
			},
			increase: "custom",
			modifier: 1,
			getBonusPercent: function (justStacks, forceTime) {
				var boostMult = 0.9999;
				var boostMax = 3;
				var expInc = 1.2;
				var timeOnZone;
				if (typeof forceTime === 'undefined'){
					var timeOnZone = getGameTime() - game.global.zoneStarted;
					if (game.talents.magmamancer.purchased) timeOnZone += 300000;
					timeOnZone = Math.floor(timeOnZone / 600000);
					
					if (timeOnZone > 12) timeOnZone = 12;
					else if (timeOnZone <= 0) return 1;
				}
				else timeOnZone = forceTime;
				if (justStacks) return timeOnZone;
				return 1 + ((((1 - Math.pow(boostMult, this.owned)) * boostMax)) * (Math.pow(expInc, timeOnZone) - 1));
			}
		},
		Amalgamator: {
			locked: 1,
			owned: 0,
			allowAutoFire: true,
			get tooltip(){
				var ratio = this.getTriggerThresh();
				var currentRatio = (game.resources.trimps.realMax() / game.resources.trimps.getCurrentSend());
				var text = "<p>Amalgamators cannot be hired or fired manually. They are magical beings that could barely be considered Trimps anymore, and they will automatically show up to your town whenever your total population to army size ratio rises above <b>" + prettify(ratio) + ":1</b>. Completing Spires II through V will each divide this ratio by 10. If your ratio ever falls below " + prettify(1e3) + ":1, an Amalgamator will leave. Your current ratio is <b>" + prettify(currentRatio) + ":1</b>. At your current army size, you need <b>" + prettify(ratio * game.resources.trimps.getCurrentSend()) + "</b> total Trimps to trigger the next Amalgamator.</p></p><p>Amalgamators fuse some of your spare Trimps to other soldiers, greatly strengthening them. Each Amalgamator increases the amount of Trimps that must be sent into each battle by 1000x (compounding), increases health by 40x (compounding), and increases damage by 50% " + ((game.talents.amalg.purchased) ? "(compounding)" : "(additive)") + ".</p><p>In addition, having at least one Amalgamator will cause Anticipation stacks to increase based on when the last soldiers were sent, rather than being based on time spent actually breeding.</p>";
				if (game.global.challengeActive == "Trimp"){
					text += "<p><i>" + toZalgo("This particular Universe seems to directly conflict with the Amalgamators, yet they're here and the Trimps they Amalgamate seem immune to the dimensional restrictions. Things are getting weird though.", 1, Math.ceil(game.global.world / 100)) + "</i></p>";
				}
				else
					text += "<p><i>Some say the Amalgamators are a curse, some say they're a blessing. The Amalgamators themselves mostly just say \"Blerghhhh\".</i></p>";
				return text;
			},
			cost: {
			},
			increase: "custom",
			populationModifier: 1000,
			healthModifier: 40,
			damageModifier: 0.5,
			fireThresh: 1e3,
			getTriggerThresh: function () {
				var startPoint = 1e10;
				var creditedSpires = game.global.lastSpireCleared;
				if (creditedSpires < 2) return startPoint;
				if (creditedSpires > 5) creditedSpires = 5;
				var reduction = Math.pow(10, (creditedSpires - 1));
				return (startPoint / reduction);
			},
			getFireThresh: function () {
				return this.fireThresh;
			},
			getHealthMult: function () {
				return Math.pow(this.healthModifier, this.owned);
			},
			getPopulationMult: function () {
				return Math.pow(this.populationModifier, this.owned);
			},
			getDamageMult: function () {
				if (game.talents.amalg.purchased) return Math.pow((1 + this.damageModifier), this.owned);
				return (this.owned * this.damageModifier) + 1;
			}
		}
	},

	goldenUpgrades: {
		Helium: {
			tooltip: function() {
				return "Increase helium gain by " + prettify(game.goldenUpgrades.Helium.nextAmt() * 100) + "%.";
			},
			nextAmt: function() {
				return 0.01 * (game.global.goldenUpgrades + 1);
			},
			currentBonus: 0,
			purchasedAt: []
		},
		Battle: {
			tooltip: function() {
				return "Increase Trimp attack and health by " + prettify(game.goldenUpgrades.Battle.nextAmt() * 100) + "%.";
			},
			nextAmt: function() {
				return 0.03 * (game.global.goldenUpgrades + 1);
			},
			currentBonus: 0,
			purchasedAt: []
		},
		Void: {
			tooltip: function() {
				return "Decrease the minimum amount of enemies between Void Map drops by " + prettify(game.goldenUpgrades.Void.nextAmt() * 100) + "%.";
			},
			nextAmt: function() {
				return 0.02 * (game.global.goldenUpgrades + 1);
			},
			currentBonus: 0,
			purchasedAt: []
		}
	},

	upgrades: {
	//Important Upgrades
		Coordination: {
			locked: 1,
			tooltip: "This book will teach your soldiers how to utilize the buddy system. Fighting will now require <coord>% more Trimps (rounded up), but attack and health will grow for each new Trimp.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: [250, 1.3],
					food: [600, 1.3],
					wood: [600, 1.3],
					metal: [300, 1.3]
				}
			},
			fire: function () {
				game.resources.trimps.maxSoldiers = Math.ceil(1.25 * game.resources.trimps.maxSoldiers);
				if (game.portal.Coordinated.level) game.portal.Coordinated.currentSend = Math.ceil(game.portal.Coordinated.currentSend * ((0.25 * Math.pow(game.portal.Coordinated.modifier, game.portal.Coordinated.level)) + 1));
			}
		},
		Gigastation: {
			locked: 1,
			allowed: 0,
			tooltip: "Prestige your Warpstation, increasing the amount of Trimps it can house by 20% and the base cost by 75%. There's no turning back, learning these blueprints will make your previous model of Warpstation obsolete but functional, and you will keep all Trimps housed there. Learning this will build one new Warpstation. <b>Holding Ctrl will cause as many Warpstations as you currently own to be purchased immediately after Gigastation, if you can afford them.</b>",
			done: 0,
			cost: {
				resources: {
					gems: [100000000000000, 1.75],
					metal: [1000000000000000, 1.75],
					science: [100000000000, 1.4]
				}
			},
			fire: function (heldCtrl, noTip) {
				if (game.buildings.Warpstation.purchased > game.buildings.Warpstation.owned){
					clearQueue('Warpstation');
				}
				var oldAmt = game.buildings.Warpstation.owned;
				game.global.lastWarp = game.buildings.Warpstation.owned;
				game.buildings.Warpstation.increase.by *= 1.20;
				game.buildings.Warpstation.cost.gems[0] *= 1.75;
				game.buildings.Warpstation.cost.metal[0] *= 1.75;
				game.buildings.Warpstation.purchased = 1;
				game.buildings.Warpstation.owned = 1;
				addMaxHousing(game.buildings.Warpstation.increase.by, game.talents.autoStructure.purchased);
				if (!noTip) noTip = false;
				if ((ctrlPressed || heldCtrl) && oldAmt > 1) buyBuilding("Warpstation", false, noTip, oldAmt - 1);
			}
		},

	//One Time Use Upgrades, in order of common unlock order
		Battle: { //0
			locked: 1,
			tooltip: "Figure out how to teach these Trimps to kill some Bad Guys.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 10
				}
			},
			fire: function () {
				fadeIn("equipmentTitleDiv", 10);
				fadeIn("equipmentTab", 10);
				fadeIn("battleContainer", 10);
				buildGrid();
				liquifyZone();
				drawGrid();
				game.global.BattleClock = -1;
				fadeIn("metal", 10);
				if (game.global.slowDone) {
					unlockEquipment("Gambeson");
					unlockEquipment("Arbalest");
				}
				if (game.talents.autoJobs.purchased){
					unlockJob("Lumberjack");
					buyAutoJobs(true);
				}
			}
		},
		Bloodlust: { //1
			locked: 1,
			tooltip: "This book will teach your Trimps to Battle on their own.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 60,
					food: 150
				}
			},
			fire: function () {
				game.global.autoBattle = true;
				pauseFight(true);
				fadeIn("pauseFight", 1);
			}
		},
		Blockmaster: { //4
			locked: 1,
			allowed: 0,
			tooltip: "This book will increase the block gained from each Gym by 50%.",
			done: 0,
			cost: {
				resources: {
					science: [750, 1.17],
					food: [2000, 1.17],
					metal: [1000, 1.17]
				}
			},
			fire: function () {
				game.global.block = Math.ceil(1.5 * game.global.block);
				game.buildings.Gym.increase.by = Math.ceil(1.5 * game.buildings.Gym.increase.by);
			}
		},
		Trapstorm: { //10
			locked: 1,
			allowed: 0,
			tooltip: "This book details the fine art of teaching your foremen to actually do stuff instead of just sitting around. When asked, your foremen will start construction on a new Trap if the queue is empty.",
			done: 0,
			cost: {
				resources: {
					science: 10000,
					food: 100000,
					wood: 100000

				}
			},
			fire: function () {
				game.global.trapBuildAllowed = true;
				fadeIn("autoTrapBtn", 10);
				toggleAutoTrap(true);
			}
		},
		Shieldblock: { //11
			locked: 1,
			allowed: 0,
			tooltip: "This book explains methods of using a shield to actually block damage. The current shield will need to be completely destroyed and rebuilt, but it will give block instead of health. <b>This is permanent</b>. $Your Shield Must be Prestige III or higher$",
			done: 0,
			specialFilter: function () {
				return (game.equipment.Shield.prestige >= 3) ? true : false;
			},
			cost: {
				resources: {
					science: 3000,
					wood: 10000
				}
			},
			fire: function () {
			var equipment = game.equipment.Shield;
				prestigeEquipment("Shield", false, true);
				equipment.blockNow = true;
				equipment.tooltip = game.equipment.Shield.blocktip;
				equipment.blockCalculated = Math.round(equipment.block * Math.pow(1.19, ((equipment.prestige - 1) * game.global.prestige.block) + 1));
				levelEquipment("Shield", 1);
			}
		},
		Bounty: { //15
			locked: 1,
			tooltip: "This book will teach your Farmers, Lumberjacks, Miners, Scientists, and Explorers to all be twice as productive.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: [40000, 2],
					food: [100000, 2],
					wood: [100000, 2],
					metal: [100000, 2]
				}
			},
			fire: function () {
				game.jobs.Farmer.modifier *= 2;
				game.jobs.Lumberjack.modifier *= 2;
				game.jobs.Miner.modifier *= 2;
				game.jobs.Scientist.modifier *= 2;
				game.jobs.Explorer.modifier *= 2;

			}
		},
		Egg: { //17
			locked: 1,
			allowed: 0,
			tooltip: "Your top scientists are pretty sure this is a Dragimp egg. They know Dragimps love shiny things, maybe it'll come out for some gems.",
			done: 0,
			cost: {
				resources: {
					gems: 10000
				}
			},
			fire: function () {
				game.jobs.Dragimp.owned = 1;
				fadeIn("gemsPs", 10);
				unlockBuilding("Tribute");
			}
		},
		Anger: { //20
			locked: 1,
			allowed: 0,
			tooltip: "Your scientists are pissed. Not because of anything you did, but this gem seems to be making them mad. It'll take some research, but you think you can create a map to the place the gem originated from.",
			done: 0,
			cost: {
				resources: {
					science: 100000,
					fragments: 15
				}
			},
			fire: function () {
				message("You just made a map to the Dimension of Anger! Should be fun!", "Notices");
				createMap(20, "Dimension of Anger", "Hell", 3, 100, 2.5, true, true);
			}
		},
		Gymystic: { //25
			locked: 1,
			allowed: 0,
			tooltip: "This book will cause each gym you purchase to increase the block provided by all Gyms by 5%. Each consecutive level of this upgrade will increase the block provided by an additional 1%. <b>The extra block provided compounds per Gym.</b>",
			done: 0,
			cost: {
				resources: {
					wood: 1000000000,
					science: 5000000
				}
			},
			modifier: 1.05,
			fire: function () {
				var oldBlock = game.buildings.Gym.increase.by;
				game.buildings.Gym.increase.by = 6 * Math.pow(game.upgrades.Gymystic.modifier + (0.01 * (game.upgrades.Gymystic.done)), game.buildings.Gym.owned);
				game.global.block += ((game.buildings.Gym.increase.by - oldBlock) * game.buildings.Gym.owned);
			}
		},
		SuperShriek: {
			locked: 1,
			allowed: 0,
			get tooltip (){
				var text = "This book will teach your Robotrimp how to do a much better job of shrieking, allowing MagnetoShriek to be used on multiple Corrupted cells in addition to Improbabilities. Upgraded MagnetoShriek starts off only being able to affect 1 cell at a time, but each use after purchasing this upgrade will extend the bonus by one additional cell, up to a max of 5 cells (resets on portal). <br/><br/> Each new Bionic Wonderland clear starting at Z185 will permanently increase the cell count cap by 1.";
				var cap = 5;
				if (game.global.roboTrimpLevel >= 5)
					cap += game.global.roboTrimpLevel - 4;
				var cleared = (game.global.roboTrimpLevel - 4);
				text += " <b>You have cleared " + cleared + " Bionic Wonderland" + ((cleared == 1) ? "" : "s") + " at 185 or higher, and your MagnetoShriek cell count cap will be " + cap + "</b>";
				return text;
			}
		},
	//Formations
		Formations: {
			locked: 1,
			allowed: 0,
			tooltip: "The air may be filled with pollution, but your Trimps seem to be getting smarter and a battle technique from what could only be a past life has crept into your memory. This would probably be a good opportunity to teach it to your Trimps. Once researched, you will be able to enter the 'Heap Formation'. This can be toggled to increase your Trimps' health by 4x, but reduce block and attack by half.",
			done: 0,
			cost: {
				resources: {
					science: 10000000000,
					food: 100000000000
				}
			},
			fire: function () {
				unlockFormation("start");
			}
		},
		Dominance: {
			locked: 1,
			allowed: 0,
			tooltip: "Another formation has crept back into your memory. Where are these coming from? Who are you? Who cares, this one will allow your Trimps to deal 4x damage at the cost of half health and block.",
			done: 0,
			cost: {
				resources: {
					science: 20000000000,
					food: 200000000000
				}
			},
			fire: function () {
				unlockFormation(2);
			}
		},
		Barrier: {
			locked: 1,
			allowed: 0,
			tooltip: "Woah, you just remembered that all Trimps lifting their shields in the same direction at the same time can produce a nice protecting wall. Seems like common sense now that you thought of it. This formation increases block by 4x and cuts the amount of block that enemies can pierce by 50%, at the cost of half attack and health.",
			done: 0,
			cost: {
				resources: {
					science: 40000000000,
					food: 400000000000
				}
			},
			fire: function () {
				unlockFormation(3);
			}
		},
	//Jobs, in order of unlock
		Miners: {
			locked: 1,
			tooltip: "You really don't like reading books, but it seems better than mining yourself.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 60,
					wood: 300,
					metal: 100
				}
			},
			fire: function () {
				unlockJob("Miner");
			}
		},
		Scientists: {
			locked: 1,
			tooltip: "You really don't believe it, but that book indicates that Trimps can be smart. Better read it and find out how.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 100,
					food: 350
				}
			},
			fire: function () {
				unlockJob("Scientist");
			}
		},
		Trainers: {
			locked: 1,
			tooltip: "This book holds all of the secrets of upper management. Train your Trimps to train other Trimps.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 500,
					food: 1000
				}
			},
			fire: function () {
				unlockJob("Trainer");
			}
		},
		Explorers: {
			locked: 1,
			tooltip: "This book will allow you to hire trimps who can create map fragments for you!",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 50000,
					fragments: 5
				}
			},
			fire: function () {
				unlockJob("Explorer");
				fadeIn("fragmentsPs", 10);
			}
		},
		Magmamancers: {
			locked: 1,
			tooltip: "Your scientists think they can study this book to figure out how to train Trimps as Magmamancers. According to your scientists, according to legend, Magmamancers require gems instead of food as sustainance and can increase the rate of Metal gathering more and more as they stay on the same Zone.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 50e15,
					gems: 1e60
				}
			},
			fire: function () {
				unlockJob("Magmamancer");
			}
		},
	//Housing upgrades, in order of unlock
		UberHut: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Hut by 100%.",
				done: 0,
				cost: {
					resources: {
						science: 30000,
						food: 200000,
						metal: 100000
					}
				},
				fire: function () {
					addMaxHousing(game.buildings.Hut.owned * game.buildings.Hut.increase.by, game.talents.autoStructure.purchased);
					game.buildings.Hut.increase.by *= 2;
				}
			},
		UberHouse: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each House by 100%.",
				done: 0,
				cost: {
					resources: {
						science: 300000,
						food: 2000000,
						metal: 1000000
					}
				},
				fire: function () {
					addMaxHousing(game.buildings.House.owned * game.buildings.House.increase.by, game.talents.autoStructure.purchased);
					game.buildings.House.increase.by *= 2;
				}
			},
		UberMansion: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Mansion by 100%.",
				done: 0,
				cost: {
					resources: {
						science: 3000000,
						food: 20000000,
						metal: 10000000
					}
				},
				fire: function () {
					addMaxHousing(game.buildings.Mansion.owned * game.buildings.Mansion.increase.by, game.talents.autoStructure.purchased);
					game.buildings.Mansion.increase.by *= 2;
				}
			},
		UberHotel: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Hotel by 100%.",
				done: 0,
				cost: {
					resources: {
						science: 30000000,
						food: 200000000,
						metal: 100000000
					}
				},
				fire: function () {
					addMaxHousing(game.buildings.Hotel.owned * game.buildings.Hotel.increase.by, game.talents.autoStructure.purchased);
					game.buildings.Hotel.increase.by *= 2;
				}
			},
		UberResort: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Resort by 100%.",
				done: 0,
				cost: {
					resources: {
						science: 300000000,
						food: 2000000000,
						metal: 1000000000
					}
				},
				fire: function () {
					addMaxHousing(game.buildings.Resort.owned * game.buildings.Resort.increase.by, game.talents.autoStructure.purchased);
					game.buildings.Resort.increase.by *= 2;
				}
			},
	//Equipment Prestiges
		Supershield: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your shield. This will bring your shield to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of stats given. @",
			done: 0,
			cost: {
				resources: {
					science: [1200, 1.7],
					gems: [40, 3]
				}
			},
			prestiges: "Shield",
			fire: function () {
				prestigeEquipment("Shield");
			}
		},
		Dagadder: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your dagger. This will bring your dagger to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1250, 1.7],
					gems: [60, 3]
				}
			},
			prestiges: "Dagger",
			fire: function () {
				prestigeEquipment("Dagger");
			}
		},
		Bootboost: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your boots. This will bring your boots to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [1300, 1.7],
					gems: [70, 3]
				}
			},
			prestiges: "Boots",
			fire: function () {
				prestigeEquipment("Boots");
			}
		},
		Megamace: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your mace. This will bring your mace to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1400, 1.7],
					gems: [100, 3]
				}
			},
			prestiges: "Mace",
			fire: function () {
				prestigeEquipment("Mace");
			}
		},
		Hellishmet: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your helmet. This will bring your helmet to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [1450, 1.7],
					gems: [150, 3]
				}
			},
			prestiges: "Helmet",
			fire: function () {
				prestigeEquipment("Helmet");
			}
		},
		Polierarm: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your polearm. This will bring your polearm to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1550, 1.7],
					gems: [225, 3]
				}
			},
			prestiges: "Polearm",
			fire: function () {
				prestigeEquipment("Polearm");
			}
		},
		Pantastic: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your pants. This will bring your pants to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [1600, 1.7],
					gems: [275, 3]
				}
			},
			prestiges: "Pants",
			fire: function () {
				prestigeEquipment("Pants");
			}
		},
		Axeidic: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your axe. This will bring your axe to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1700, 1.7],
					gems: [400, 3]
				}
			},
			prestiges: "Battleaxe",
			fire: function () {
				prestigeEquipment("Battleaxe");
			}
		},
		Smoldershoulder: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your shoulderguards. This will bring your shoulderguards to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [1750, 1.7],
					gems: [525, 3]
				}
			},
			prestiges: "Shoulderguards",
			fire: function () {
				prestigeEquipment("Shoulderguards");
			}
		},
		Greatersword: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your greatsword. This will bring your greatsword to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1850, 1.7],
					gems: [650, 3]
				}
			},
			prestiges: "Greatsword",
			fire: function () {
				prestigeEquipment("Greatsword");
			}
		},
		Bestplate: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your breastplate. This will bring your breastplate to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [1900, 1.7],
					gems: [800, 3]
				}
			},
			prestiges: "Breastplate",
			fire: function () {
				prestigeEquipment("Breastplate");
			}
		},
		Harmbalest: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your arbalest. This will bring your arbalest to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1950, 1.7],
					gems: [810, 3]
				}
			},
			prestiges: "Arbalest",
			fire: function () {
				prestigeEquipment("Arbalest");
			}
		},
		GambesOP: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your gambeson. This will bring your gambeson to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [2000, 1.7],
					gems: [820, 3]
				}
			},
			prestiges: "Gambeson",
			fire: function () {
				prestigeEquipment("Gambeson");
			}
		},
	//Repeatable upgrades, in order of frequency (rarest first)
		Potency: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your trimps how to be 10% more efficient at making baby Trimps!",
			done: 0,
			cost: {
				resources: {
					science: [1000, 1.4],
					wood: [4000, 1.4]
				}
			},
			fire: function () {
				//psh
			}
		},
		TrainTacular: { //5
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trainers to increase block by an additional 5%!",
			done: 0,
			cost: {
				resources: {
					science: [1000, 1.7],
					food: [2000, 1.7],
					wood: [3000, 1.7],
					metal: [2000, 1.7]
				}
			},
			fire: function () {
				game.jobs.Trainer.modifier = Math.ceil(game.jobs.Trainer.modifier += 5);
			}
		},
		Efficiency: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach you how to be twice as productive in everything you do! Hurray! <b>Note that this applies only to your productivity, not workers.</b>",
			done: 0,
			cost: {
				resources: {
					science: [400, 1.25],
					food: [400, 1.2],
					wood: [400, 1.2],
					metal: [400, 1.2]
				}
			},
			fire: function () {
				game.global.playerModifier *= 2;
			}
		},
		Speedminer: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to mine 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.4],
					metal: [500, 1.4]
				}
			},
			fire: function () {
				game.jobs.Miner.modifier *= 1.25;
			}
		},
		Speedlumber: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to cut wood 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.4],
					wood: [500, 1.4]
				}
			},
			fire: function () {
				game.jobs.Lumberjack.modifier *= 1.25;
			}
		},
		Speedfarming: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to farm 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.4],
					food: [500, 1.4]
				}
			},
			fire: function () {
				game.jobs.Farmer.modifier *= 1.25;
			}
		},
		Speedscience: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to science things 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [400, 1.4]
				}
			},
			fire: function () {
				game.jobs.Scientist.modifier *= 1.25;
			}
		},
		Speedexplorer: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to explore 300% more efficiently!",
			done: 0,
			cost: {
				resources: {
					science: [200, 28.9],
					fragments: [500, 4]
				}
			},
			fire: function () {
				game.jobs.Explorer.modifier *= 4;
			}
		},
		Megaminer: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to mine ?% faster!",
			done: 0,
			cost: {
				resources: {
					science: [10000000000, 1.4],
					metal: [100000000000, 1.4]
				}
			},
			fire: function () {
				var amt = (game.global.frugalDone) ? 1.6 : 1.5;
				game.jobs.Miner.modifier *= amt;
			}
		},
		Megalumber: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to chop wood ?% faster!",
			done: 0,
			cost: {
				resources: {
					science: [10000000000, 1.4],
					wood: [100000000000, 1.4]
				}
			},
			fire: function () {
				var amt = (game.global.frugalDone) ? 1.6 : 1.5;
				game.jobs.Lumberjack.modifier *= amt;
			}
		},
		Megafarming: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to farm ?% faster!",
			done: 0,
			cost: {
				resources: {
					science: [10000000000, 1.4],
					food: [100000000000, 1.4]
				}
			},
			fire: function () {
				var amt = (game.global.frugalDone) ? 1.6 : 1.5;
				game.jobs.Farmer.modifier *= amt;
			}
		},
		Megascience: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to science things ?% faster!",
			done: 0,
			cost: {
				resources: {
					science: [100000000000, 1.6]
				}
			},
			fire: function () {
				var amt = (game.global.frugalDone) ? 1.6 : 1.5;
				game.jobs.Scientist.modifier *= amt;
			}
		},
	},

	triggers: {
		Trap: {
			done: 0,
			message: "Maybe there's something meaty and delicious here to Trap.",
			cost: {
				resources: {
					food: 5,
					wood: 5
				}
			},
			fire: function () {
				fadeIn("buyCol", 10);
				unlockBuilding("Trap");
			}
		},
		wood: {
			done: 0,
			message: "You'll need some wood to build stuff...",
			cost: {
				resources: {
					food: 5
				}
			},
			fire: function () {
				fadeIn("wood", 10);

			}
		},
		Barn: {
			done: 0,
			message: "The food stores are getting pretty full, maybe you should start thinking about a Barn.",
			cost: {
				resources: {
					food: 350
				}
			},
			fire: function () {
				unlockBuilding("Barn");
			}
		},
		Shed: {
			done: 0,
			message: "A nice Shed would allow you to keep more wood on hand.",
			cost: {
				resources: {
					wood: 350
				}
			},
			fire: function () {
				unlockBuilding("Shed");
			}
		},
		Forge: {
			done: 0,
			message: "A nice Forge would allow you to store more metal.",
			cost: {
				resources: {
					metal: 350
				}
			},
			fire: function () {
				unlockBuilding("Forge");
			}
		},
		jobs: {
			done: 0,
			message: "There's a weird impish little creature in the trap. A Trimp, you decide to call it. Since you're so creative, you could probably train this Trimp to help out.",
			cost: {
				resources: {
					trimps: 1
				}
			},
			fire: function () {
				fadeIn("jobsTab", 10);
				document.getElementById("trimpTitle").innerHTML = "Trimps";
				document.getElementById("empHide").style.visibility = "visible";
				unlockJob("Farmer");
				document.getElementById("jobsTitleDiv").style.display = "block";
				game.global.menu.jobs = true;
			}
		},
		Lumberjack: {
			done: 0,
			cost: {
				jobs: {
					Farmer: 1
				}
			},
			fire: function () {
				unlockJob("Lumberjack");
			}
		},
		upgrades: {
			done: 0,
			message: "This planet feels so familiar, yet so foreign. Maybe it's time to start sciencing things.",
			cost: {
				resources: {
					trimps: 2,
					food: 15
				}
			},
			fire: function () {
				fadeIn("upgradesTab", 10);
				fadeIn("science", 10);
				document.getElementById("upgradesTitleDiv").style.display = "block";
				game.global.menu.upgrades = true;
			}
		},
		Battle: {
			done: 0,
			once: function() {document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades";},
			message: "War... what is it good for? Exploration, or something.",
			cost: {
				special: function () {
					return (game.triggers.upgrades.done > 0 && game.resources.science.owned > 0);
				}
			},
			fire: function () {
				unlockUpgrade('Battle');
				document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades";
			}
		},
		Hut: {
			done: 0,
			message: "Doesn't seem like all of these little guys will fit in your ship. Luckily, you remember how to make small huts for shelter.",
			cost: {
				resources: {
					trimps: 8
				}
			},
			fire: function () {
				unlockBuilding('Hut');
			}
		},
		House: {
			done: 0,
			message: "It's starting to get pretty crowded up in here. Maybe you should start building some better housing.",
			cost: {
				resources: {
					trimps: 65
				}
			},
			fire: function () {
				unlockBuilding('House');
			}
		},
		breeding: {
			done: 0,
			message: function () {
				if (game.global.challengeActive == "Trapper") return "Your Trimps look really bored.";
				else return "Apparently the Trimps breed if they're not working. Doesn't look pleasant.";
			},
			cost: {
				special: function () {
					return (game.resources.trimps.owned - game.resources.trimps.employed >= 2) ? true : false;
				}
			},
			fire: function () {
				document.getElementById("unempHide").style.visibility = "visible";
			}
		}
	},
	unlocks: {
		imps: {
			Goblimp: false,
			Feyimp: false,
			Flutimp: false,
			Tauntimp: false,
			Venimp: false,
			Whipimp: false,
			Jestimp: false,
			Titimp: false,
			Chronoimp: false,
			Magnimp: false,
		},
		impCount: {
			Goblimp: 0,
			Feyimp: 0,
			Flutimp: 0,
			Tauntimp: 0,
			TauntimpAdded: 0,
			Venimp: 0,
			Whipimp: 0,
			Jestimp: 0,
			Titimp: 0,
			Chronoimp: 0,
			Magnimp: 0
		}
	},
	get workspaces () {
		return Math.ceil(this.resources.trimps.realMax() / 2) - this.resources.trimps.employed;
	},
	set workspaces (value) {
		console.warn('workspaces is now a getter, and does not need to be set');
		return;
	},
};
return toReturn;
}
var game = newGame();
