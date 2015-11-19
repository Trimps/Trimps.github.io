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
function newGame () {
var toReturn = {
	global: {
		version: 2.7,
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
		radioStacks: 0,
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
		cheater: false,
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
		lastPortal: new Date().getTime(),
		prisonClear: 0,
		frugalDone: false,
		lastUnlock: 0,
		lowestGen: -1,
		titimpLeft: 0,
		mapBonus: 0,
		slowDone: false,
		turkimpTimer: 0,
		statsMode: "current",
		menu: {
			buildings: true,
			jobs: false,
			upgrades: false
		},
		messages: {
			Story: true,
			Loot: true,
			Unlocks: true,
			Combat: true,
			Notices: true
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
		getEnemyAttack: function (level, name) {
			var world = getCurrentMapObject();
			var amt = 0;
			world = (game.global.mapsActive) ? world.level : game.global.world;
			var adjWorld = ((world - 1) * 100) + level;
			amt += 50 * Math.sqrt(world * Math.pow(3.27, world));
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
			
			if (world > 6 && game.global.mapsActive) amt *= 1.1;	
			amt *= game.badGuys[name].attack;
			return Math.floor(amt);
		},
		getEnemyHealth: function (level, name) {
			var world = getCurrentMapObject();
			world = (game.global.mapsActive) ? world.level : game.global.world;
			var amt = 0;
			amt += 130 * Math.sqrt(world * Math.pow(3.265, world));
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
			if (world > 5 && game.global.mapsActive) amt *= 1.1;
			amt *= game.badGuys[name].health;
			return Math.floor(amt);
		}
	},
	options: {
		displayed: false,
		menu: {
			autoSave: {
				enabled: 1,
				description: "Automatically save the game once per minute",
				titles: ["Not Saving", "Auto Saving"],
				onToggle: function () {
					var elem = document.getElementById("saveIndicator");
					if (this.enabled) elem.innerHTML = "<span class='autosaving'>(AutoSaving)</span>";
					else elem.innerHTML = "<span class='notAutosaving'>(Not AutoSaving)</span>";
				}
			},
			standardNotation: {
				enabled: 1,
				description: "Swap between standard and exponential number formatting",
				titles: ["Exponential Formatting", "Standard Formatting"],
			},
			tooltips: {
				enabled: 1,
				description: "Hide button tooltips unless shift is held. Hides formation tooltips until toggled back on.",
				titles: ["Shift for Tooltips", "Showing Tooltips"],
				onToggle: function () {
					if (this.enabled){
						document.getElementById("formation0").title = "No Formation";
						document.getElementById("formation1").title = "Heap Formation - Trimps gain 4x health but lose half of their attack and block";
						document.getElementById("formation2").title = "Dominance Formation - Trimps gain 4x attack but lose half of their health and block";
						document.getElementById("formation3").title = "Barrier Formation - Trimps gain 4x block but lose half of their health and attack";
					}
					else {
						var elems = document.getElementsByClassName("formationBtn");
						for (var x  = 0; x < elems.length; x++){
							elems[x].title = "";
						}
					}
				}
			},
			queueAnimation: {
				enabled: 1,
				description: "Toggle on or off the building queue blue color animation",
				titles: ["No Animation", "Animation"]
			},
			barOutlines: {
				enabled: 1,
				description: "Toggle on or off a black bar at the end of all progress bars",
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
				description: "Toggle on or off large number formatting for jobs and buildings on the left menu",
				titles: ["No Menu Formatting", "Formatting Menu"]
			},
			progressBars: {
				enabled: 1,
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
				description: "Toggles on or off the confirmation pop-up on scary purchases like Wormholes",
				titles: ["Not Confirming", "Confirming"],
			},
			lockOnUnlock: {
				enabled: 0,
				description: "Enables/disables the locking of buildings, jobs, upgrades, and equipment for 1 second after unlocking something new.",
				titles: ["Not Locking", "Locking"],
			},
			mapLoot: {
				enabled: 0,
				description: "Toggle between receiving all equipment for one tier, or receiving all available tiers of the same equipment first when running maps.",
				titles: ["Tier First", "Equip First"]
			},
			deleteSave: {
				enabled: 0,
				description: "Delete your save and start fresh. Your Trimps won't be happy.",
				titles: ["Delete Save"],
				onToggle: function () {
					tooltip('Reset', null, 'update');
					this.enabled = 0;
				}
			}
		}
	},
	//portal
	portal: {
		Coordinated: {
			level: 0,
			locked: true,
			max: 15,
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
			tooltip: "Use your experiences in understanding the attention span of Trimps to increase the damage dealt by all soldiers based on how long it took to get an army together. Increases damage by 2% per level per second up to 30 seconds. Maximum of 10 levels."
		},
		Resilience: {
			level: 0,
			locked: true,
			modifier: 0.1,
			priceBase: 100,
			heliumSpent: 0,
			tooltip: "Use your acquired skills in Trimp strengthening to gain a 10% <b>compounding</b> increase to total Trimp health."
		},
		Relentlessness:{
			level: 0,
			locked: true,
			modifier: 0.05,
			otherModifier: 0.3,
			priceBase: 75,
			heliumSpent: 0,
			tooltip: "You've seen too many Trimps fall, it's time for more aggressive training. Bringing back these memories will cause your Trimps to gain a 5% chance to critically strike for 230% damage at level 1, and they will gain an additional 5% crit chance and 30% crit damage per level. Maximum of 10 levels.",
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
			tooltip: "You're beginning to notice ways to make equally powerful equipment with considerably fewer resources. Bringing back these new ideas will allow you to spend 5% fewer resources <b>than the current cost (compounds)</b> per level on all equipment."
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
			tooltip: "Bring some pheromones with you to ensure that your Trimps will permanantly breed 10% faster."
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
			tooltip: "Practice public speaking with your trimps. Each level increases the amount of resources that workers produce by 5%.",
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
			tooltip: "Walk back through the empty zones, learning how to milk them for every last drop. Each level permanently increases the amount of resources gained from battle by 5%.",
			level: 0
		},

	},
	
	challenges: {
		Discipline: {
			description: "Tweak the portal to bring you back to a universe where Trimps are less disciplined, in order to teach you how to be a better Trimp trainer. Your Trimps' minimum damage will be drastically lower, but their high end damage will be considerably higher. Completing The Dimension Of Anger will cause Trimp damage to return to normal.",
			filter: function () {
				return (game.resources.helium.owned >= 30 || game.global.totalHeliumEarned >= 30);
			},
			unlocks: "Range",
			unlockString: "have 30 total helium"
		},
		Metal: {
			description: "Tweak the portal to bring you to alternate reality, where the concept of Miners does not exist, to force yourself to become frugal with equipment crafting strategies. If you complete The Dimension Of Anger without disabling the challenge, miners will re-unlock.",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 24);
			},
			abandon: function () {
				game.worldUnlocks.Miner.fire();
				for (var x = 0; x < game.challenges.Metal.heldBooks; x++){
					unlockUpgrade("Speedminer");
				}
			},
			fireAbandon: false,
			heldBooks: 0,
			unlocks: "Artisanistry",
			unlockString: "reach Zone 25"
		},
		Size: {
			description: "Tweak the portal to bring you to an alternate reality, where Trimps are bigger and stronger, to force yourself to figure out a way to build larger housing. Your Trimps will gather 50% more Food, Wood, and Metal, but your housing will fit 50% fewer Trimps. If you complete The Dimension of Anger without disabling the challenge, your stats will return to normal.",
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
			fireAbandon: true,
			unlocks: "Carpentry",
			unlockString: "reach Zone 35"
		},
		Scientist: {
			description: "Attempt modifying the portal to harvest resources when travelling. Until you perfect the technique, you will start with <b>_</b> science but will be unable to research or hire scientists. Choose your upgrades wisely! Clearing <b>'The Block' (11)</b> with this challenge active will cause you to start with * each time you use your portal.",
			completed: false,
			heldBooks: 0,
			filter: function (fromCheck) {
				if (game.global.sLevel == 0) return (game.global.highestLevelCleared >= 39);
				else if (game.global.sLevel == 1) return (game.global.highestLevelCleared >= 49);
				else if (game.global.sLevel >= 2) {
					if (game.global.highestLevelCleared > 69 && game.global.prisonClear) return (game.global.highestLevelCleared >= 89);
					else return true;
				}
			},
			abandon: function () {
				game.worldUnlocks.Scientist.fire();
				document.getElementById("scienceCollectBtn").style.display = "block";
				for (var x = 0; x < this.heldBooks; x++){
					unlockUpgrade("Speedscience");
				}
			},
			start: function () {
				document.getElementById("scienceCollectBtn").style.display = "none";
				game.resources.science.owned = getScientistInfo(getScientistLevel());
			},
			onLoad: function () {
				document.getElementById("scienceCollectBtn").style.display = "none";
			},
			fireAbandon: false,
			unlockString: function () {
				if (game.global.sLevel == 0) return "reach Zone 40";
				else if (game.global.sLevel == 1) return "reach Zone 50";
				else if (game.global.sLevel >= 2) return "reach Zone 90";
			}
		},
		Trimp: {
			description: "Tweak the portal to bring you to a dimension where Trimps explode if more than 1 fights at a time. You will not be able to learn Coordination, but completing <b>'The Block' (11)</b> will teach you how to keep your Trimps alive for much longer.",
			completed: false,
			heldBooks: 0,
			fireAbandon: true,
			unlocks: "Resilience",
			filter: function () {
				return (game.global.world >= 60 || game.global.highestLevelCleared >= 59);
			},
			abandon: function () {
				for (var x = 0; x < game.challenges.Trimp.heldBooks; x++){
					unlockUpgrade("Coordination");
				}
			},
			unlockString: "reach Zone 60"
		},
		Trapper: {
			description: "Travel to a dimension where Trimps refuse to breed in captivity, teaching yourself new ways to take advantage of situations where breed rate is low. Clearing <b>'Trimple Of Doom' (33)</b> with this challenge active will return your breeding rate to normal.",
			completed: false,
			heldBooks: 0,
			fireAbandon: true,
			unlocks: "Anticipation",
			filter: function () {
				return (game.global.highestLevelCleared >= 69);
			},
			abandon: function () {
				for (var x = 0; x < game.challenges.Trapper.heldBooks; x++){
					unlockUpgrade("Potency");
				}
			},
			unlockString: "reach Zone 70"
		},
		Electricity: {
			description: "Use the keys you found in the Prison to bring your portal to an extremely dangerous dimension. In this dimension enemies will electrocute your Trimps, stacking a debuff with each attack that damages Trimps for 10% of total health per turn per stack, and reduces Trimp attack by 10% per stack. Clearing <b>'The Prison' (80)</b> will reward you with double helium for all Blimps and Improbabilities killed up to Zone 80. This is repeatable!",
			completed: false,
			hasKey: false,
			filter: function () {
				return (game.global.prisonClear > 0);
			},
			fireAbandon: true,
			abandon: function () {
				game.global.radioStacks = 0;
				updateRadioStacks();
			},
			heldHelium: 0,
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
		Coordinate: {
			description: "Visit a dimension where Bad Guys are Coordinated but never fast, to allow you to study naturally evolved Coordination. Completing <b>'Dimension of Anger' (20)</b> with this challenge active will cause all enemies to lose their Coordination.",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 119);
			},
			unlocks: "Coordinated",
			unlockString: "reach Zone 120"
		},
		Slow: {
			description: "Legends tell of a dimension inhabited by incredibly fast bad guys, where blueprints exist for a powerful yet long forgotten weapon and piece of armor. All bad guys will attack first in this dimension, but clearing <b>Zone 120</b> with this challenge active will forever-after allow you to create these new pieces of equipment.",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 129);
			},
			unlockString: "reach Zone 130"
		},
		Nom: {
			description: "Travel to a dimension where bad guys enjoy the taste of Trimp. Whenever a group of Trimps dies, the bad guy will eat them, gaining 25% (compounding) more attack damage and healing for 5% of their maximum health. The methane-rich atmosphere causes your Trimps to lose 5% of their total health after each attack, but the bad guys are too big and slow to attack first. Clearing <b>Zone 145</b> will reward you with double helium for all Blimps and Improbabilities killed. This is repeatable!",
			completed: false,
			filter: function () {
				return (game.global.highestLevelCleared >= 144);
			},
			heldHelium: 0,
			unlockString: "reach Zone 145"
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
		highestLevel: {
			title: "Highest Zone",
			valueTotal: function () {
				return game.global.highestLevelCleared + 1;
			}
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
		totalHelium: {
			title: "Total Helium Earned",
			display: function () {
				return (game.global.totalHeliumEarned > 0);
			},
			valueTotal: function () {
				return game.global.totalHeliumEarned;
			}
		},
		spentOnWorms: {
			title: "Wormholed Helium",
			display: function () {
				return ((this.value + this.valueTotal) > 0)
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
				var timeThisPortal = new Date().getTime() - game.global.lastPortal;
				timeThisPortal /= 3600000;
				var resToUse = (useTemp) ? game.global.tempHighHelium : game.resources.helium.owned;
				return Math.floor(resToUse / timeThisPortal);
			}
		},
		bestHeliumHour: {
			title: "Best He/Hour all Runs",
			display: function () {
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		planetsBroken: {
			title: "Planets Broken",
			display: function () {
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		}
		
	},
	
	
	
	
	worldText: {
		w2: "Your Trimps killed a lot of bad guys back there. It seems like you're getting the hang of this. However the world is large, and there are many more zones to explore. Chop chop.",
		w3: "By your orders, your scientists have begun to try and figure out how large this planet is.",
		w4: "You order your Trimps to search the area for the keys to your ship, but nobody finds anything. Bummer.",
		w5: "Do you see that thing at the end of this zone? It's huge! It's terrifying! You've never seen anything like it before, but you know that it is a Blimp. How did you know that? Stop knowing things and go kill it.",
		w6: "You step over the corpse of the Blimp as it rapidly deflates, and one of your Trimps chuckles at the sound produced. You all cross the sulfuric river to the next zone, and can feel the presence of an ancient knowledge. Better explore.",
		w7: "Slow and steady wins the race. Unless you're racing someone who is actually trying.",
		w8: "Your settlement is getting crowded, there's Trimps in the streets and you're taking heat. You feel a sudden strong desire to create a map, though you're not quite sure how that would help.",
		w9: "You can't shake the feeling that you've been here before. Deja Vu?",
		w10: "Looks like another Blimp up ahead. Hard to tell from far away, but it looks like it has more heads than the last one.",
		w11: "You're unstoppable as long as nothing stops you. Unfortunately, it seems like something really wants to stop you.",
		w12: "Did you see that green light flash by? Weird. Oh well.",
		w13: "Your scientists have finally concluded their report on the analysis of the size of the world. According to the report, they're pretty sure it's infinitely large, but you're pretty sure they just got bored of checking.",
		w14: "You were trying to help bring back some of the Equipment your Trimps left on the ground in that last zone, and you got a splinter. This planet is getting dangerous, stay alert.",		
		w15: "Another day, another Blimp at the end of the zone",
		w16: "Seriously? Another Blimp so soon?",
		w17: "You climb a large cliff and look out over the new zone. Red dirt, scorched ground, and devastation. Is that a Dragimp flying around out there?!",
		w18: "There seems to be a strange force urging you to keep going. The atmosphere is becoming... angrier. Part of you wants to turn around and go back, but most of you wants to keep going.",
		w19: "You look behind and see your kingdom. You have gems, a colony, and territory. You wonder if enough Trimps have already fallen in battle. After contemplation, one word falls out of your mouth as you begin to move forward. 'Nah'",
		w20: "You can sense that you're close to your goal.",
		w22: "Strange, the sky seems to be getting darker. You ask one of your Trimps for the time, but he doesn't know what a clock is.",
		w25: "You're a rebel. The universe pointed you into that portal, but you kept pushing forward. You feel... less like you've been here before.",
		w27: "It seems like the further you press on, the less you know. You still feel an urge to use the portal, though the urge has begun to dwindle.",
		w29: "Your Trimps came up with a pretty catchy battle song that got stuck in your head. None of them survived the next fight though, and you can't remember most of it. Life's tough.",
		w33: "You climb over a large hill that was separating this zone from the last. The sky is pitch black and lightning crackles in the distance. This is a site of heavy corruption.",
		w35: "You start to wonder how long you've been doing the same thing over and over. There must be something you can do to start to break the cycle. Perhaps you could alter the portal...",
		w40: "You can't help but notice that the Trimps seem to be the only creatures on this planet not immediately hostile towards outsiders. You ask a nearby Trimp soldier what he thinks you are, and he drools a bit.",
		w42: "The world seems so barren out this far. You feel like you're finally starting to get ahead of the curve, but you know by now not to get comfortable.",
		w44: "Each day and night seems to grow longer than the one before. Is time slowing down? Argh! You fall to your knees with a splitting headache and a strong desire to use the portal. After a few minutes, it passes and you forget what happened. What are we talking about?",
		w46: "All traces of hills and mountains have long since been trudged past. The world is flat and hostile. You wish your Trimps were better conversationalists.",
		w48: "As your Trimps scavenge every last bit of helium from that Blimp, one of them begins freaking out. He runs around waving his little arms and making funny noises for a while, eats some dirt, then takes a little nap. You wonder if that's normal. Yeah... probably fine.",
		w50: "It's been a long time since you've found any blueprints in the maps. You start to wonder where those things even come from.",
		w51: "Your scientists have detected an anomaly at the end of Zone 59. They recommend that you stop doing whatever it is that you're doing.",
		w53: "As you get closer to the anomaly, you start to notice more and more strange behaviour from your Trimps. Holes in your memory are starting to become noticeable as multiple existences blend in to one. Trippy.",
		w54: "As you get closer to the anomaly, you start to notice more and more strange behaviour from your Trimps. Holes in your memory are starting to become noticeable as multiple existences blend in to one. Trippy.",
		w56: "A loud boom echoes in the distance, and one of your Trimps runs up to you with outstretched arms, looking quite frightened. He probably just wants some armor and weapons! You hand him some gear and send him on his way.",
		w58: "A huge storm has formed and daylight has become a luxury you have mostly forgotten about. Your Trimps seem to want to go back home, but you're pretty sure you're supposed to keep going this way, so you do. You're very close to the anomaly.",
		w59: "There it is. The anomaly is at the end of the zone. You can see it but you don't know what you're seeing. Where did that... thing... come from?! This is highly Improbable.",
		w60: "The ground instantly cracks and large plumes of green gas escape from the planet's core to the atmosphere. The planet feels different. Everything feels different. This Universe has grown unstable, the planet has broken. What have you done?",
		w61: "Other than all the dead Trimps, that wasn't so bad.",
		w65: "You feel more powerful than ever. The universe seems to be constantly adjusting itself to get rid of you, yet you rise against and persist. Something as tiny as you taking on an entire universe!",
		w68: "You figure some entertainment wouldn't be awful, and decide to teach your Trimps how to play soccer. A few hours and zero progress later, you really regret that decision.",
		w70: "The Improbabilities haven't seemed to slow down. You know you need to figure out a plan, but you don't know what to plan for.",
		w72: "You slash through another Improbability with relative ease, but something isn't right. A sour smell hits your nose and in disgust, you whip around in search of the source. Oh, wait, it's just the Trimps.",
		w80: "When's the last time you made a map? You have a feeling you should probably do that.",
		w82: "Whew, that was an exhilarating kill. You decide to reward your Trimps with some Improbability stew. It's pretty tasty.",
		w83: "That stew was probably a bad idea. Anyone else feeling sick?",
		w85: "An ancient and fuzzy memory just crept back in to your head. You're not quite sure where it came from, but you know the memory is yours. You remember being on a ship, and seeing this planet from orbit. There was someone with you!",
		w87: "Bits and pieces of memories continue trickling back in as you continue to put distance between yourself and the source of Anger. You can almost see in your mind who you came here with. Where could they be...",
		w90: "You decide to ask your scientists to come up with an extravagant machine that can scan your brain for old memories to see if there's anything helpful up there. They seem excited about a new project and quickly get to work.",
		w92: "You hear a huge explosion from the science lab and realize that the brain scan machine will probably never be finished.",
		w95: "Need some motivation? You can do it! Maybe.",
		w100: "You stop dead in your tracks. You remember who you came here with, and you remember that you are not happy with Captain Druopitee for sending you here. You know he landed with you. You know the ship is still here. He's here.",
		w105: "You call a meeting with all of your Trimps to explain the situation. After giving an extremely long, epic, and motivational speech but hearing no reaction from the crowd, you remember that your Trimps cannot understand you. Will you ever learn?",
		w106: "How long have you been trapped on this planet? Months? Decades? Travelling through time sure screws up your chronological perception.",
		w109: "Though you have no idea which direction your home planet is, you still believe the ship's GPS could get you home. Maybe Druopitee has the keys. You really want to find him.",
		w115: "You just remembered what a taco was. You could really use a taco right now.",
		w120: "Your stamina is quickly dwindling. Trying to keep up with so many more extra Trimps each zone is beginning to wear you down. You'll need to practice fighting with stronger, smaller groups to succeed.",
		w125: "Woah, you have a lot of Trimps right now. You hadn't really stopped to think about just how many individual Trimps you have directly under your control in a while. Neat!",
		w130: "You decide to sit down and take a breather, when suddenly a Trimp comes waddle-galloping towards you holding a piece of paper. Hurriedly scrawled on the paper is a drawing of a strange weapon and piece of armor, along with numbers that seem to be dimensional coordinates. You would ask where he found it, but you know better by now.",
		w132: "You can't stop thinking about where that Trimp found the coordinates for the Slow dimension. Why can't whatever is helping you just come out and help you?",
		w135: "Ugh, your back is getting sore. It seems like travelling back in time does not reverse the ageing process for the traveller. Bummer.",
		w136: "One of your scientists has informed you that his team was able to successfully create a cure for a non-existent disease. He explains that it's best to be prepared. You sigh heavily.",
		w137: "One of your scientists has informed you that an outbreak of a new disease was detected in the laboratory. You go to check on your scientists, and it's quite obvious that they're faking it for attention. You sigh heavily.",
		w138: "You spot another scientist running full speed towards you. He hurriedly informs you that they discovered a new dimension near Zone 35 that is occupied by gigantic Trimps. You sigh heavily.",
		w139: "Another scientist is coming. You sigh heavily. He says something dumb. You decide to ignore the scientists for a little bit.",
		w140: "It sure is calm and peaceful now. You watch a Falcimp turn a few circles in the sky. You wouldn't mind having wings, but overall you're pretty happy with your species.",
		w143: "There's a scientist jumping around trying to get your attention. There's nothing interesting in the sky so you pretend to be fascinated with a rock. The scientist can see you're busy and waits patiently.",
		w145: "Your Scientists are not making it easy to ignore them. You not-so-calmly ask what they want. One of them explains that they discovered a new dimension with lots of extra helium. You'll probably check it out, but you won't tell them that."
		
	},
	
	trimpDeathTexts: ["ceased to be", "bit the dust", "took a dirt nap", "expired", "kicked the bucket", "evaporated", "needed more armor", "exploded", "melted", "fell over"],
	badGuyDeathTexts: ["slew", "killed", "destroyed", "extinguished", "liquidated", "vaporized", "demolished", "ruined", "wrecked", "obliterated"],
	
	settings: {
		speed: 10,
		speedTemp: 0,
		slowdown: false,
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
				if (game.portal.Carpentry.level > 0) num = num * (Math.pow(1 + game.portal.Carpentry.modifier, game.portal.Carpentry.level));	
				return Math.floor(num);
			},
			working: 0,
			speed: 5,
			employed: 0,
			soldiers: 0,
			maxSoldiers: 1,
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
		Turkimp: {
			location: "World",
			locked: 1,
			attack: 1,
			health: 1.6,
			fast: false,
			loot: function () {
				//Happy Thanksgiving and stuff.
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
				message("That Chickimp dropped " + prettify(amt) + " food!", "Loot", "apple");
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
		Grimp: {
			location: "Forest",
			attack: 1.1,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("wood", 0.5, level, true);
				message("That Grimp dropped " + prettify(amt) + " wood!", "Loot", "tree-deciduous");
			}
		},
		Seirimp: {
			location: "Mountain",
			attack: 1.15,
			health: 1.4,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", 0.5, level, true);
				message("That Seirimp dropped " + prettify(amt) + " metal! Neat-O.", "Loot", "*cubes");
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
				message("That Blimp dropped " + prettify(amt) + " Food, Wood and Metal! That should be useful.", "Loot", "piggy-bank");
				if (game.global.world >= 21 && (game.global.totalPortals >= 1 || game.global.portalActive)){
					if (game.resources.helium.owned == 0) fadeIn("helium", 10);
					amt = rewardResource("helium", 1, level);
					game.global.totalHeliumEarned += amt;
					message("<span class='glyphicon glyphicon-oil'></span> You were able to extract " + prettify(amt) + " Helium canisters from that Blimp!", "Story");
					if (game.global.challengeActive == "Electricity" && game.global.world <= 79) game.challenges.Electricity.heldHelium += amt;
					else if (game.global.challengeActive == "Nom" && game.global.world <= 149) game.challenges.Nom.heldHelium += amt;
				}
			}
		},
		Megablimp: {
			location: "Hell",
			last: true,
			world: 20,
			attack: 1.1,
			health: 4,
			fast: false
		},
		Dragimp: {
			location: "World",
			world: 17,
			attack: 1,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("gems", 0.35, level, false);
				message("That Dragimp dropped " + prettify(amt) + " gems!", "Loot", "*diamond");
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
				var amt = rewardResource("wood", 2, level, true);
				message("Mitschimp dropped " + prettify(amt) + " wood!", "Loot", "tree-deciduous");
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
				var amt = rewardResource("metal", 2, level, true);
				message("Indianimp dropped " + prettify(amt) + " metal!", "Loot", "*cubes");
				if (game.global.challengeActive == "Trapper"){
					game.global.challengeActive = "";
					game.challenges.Trapper.abandon();
					game.portal.Anticipation.locked = false;
					message("You have completed the 'Trapper' challenge! Your Trimps now remember how to breed, and you have unlocked a new perk!", "Notices");
				}
			}
		},
		Warden: {
			location: "Prison",
			last: true,
			world: 80,
			attack: 2,
			health: 3,
			fast: false
		},
		Improbability: {
			locked: 1,
			location: "World",
			last: true,
			world: 59,
			attack: 1.2,
			health: 6,
			fast: true,
			loot: function (level) {
				if (!game.global.brokenPlanet) planetBreaker();
				var amt = rewardResource("helium", 5, level);
				game.global.totalHeliumEarned += amt;
				message("<span class='glyphicon glyphicon-oil'></span> You managed to steal " + prettify(amt) + " Helium canisters from that Improbability. That'll teach it.", "Story");
				if (game.global.challengeActive == "Electricity" && game.global.world <= 79) game.challenges.Electricity.heldHelium += amt;
				else if (game.global.challengeActive == "Nom" && game.global.world <= 144) game.challenges.Nom.heldHelium += amt;
				if (game.global.challengeActive == "Slow" && game.global.world == 120){
					message("You have completed the Slow challenge! You have found the patterns for the Gambeson and the Arbalest!", "Notices");
					game.global.challengeActive = "";
					if (!game.global.slowDone){
						unlockEquipment("Arbalest");
						unlockEquipment("Gambeson");
					}
					game.global.slowDone = true;
				}
				else if (game.global.challengeActive == "Nom" && game.global.world == 145){
					message("You have completed the Nom challenge! You have been rewarded with " + prettify(game.challenges.Nom.heldHelium) + " Helium, and you may repeat the challenge.", "Notices");
					game.resources.helium.owned += game.challenges.Nom.heldHelium;
					game.global.totalHeliumEarned += game.challenges.Nom.heldHelium;
					game.challenges.Nom.heldHelium = 0;
					game.global.challengeActive = "";
				}
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
				message("That Goblimp dropped " + prettify(amt) + " gems! What a bro!", "Loot", "*diamond", "exotic");
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
				message("That Feyimp gave you " + prettify(amt) + " gems! Thanks Feyimp!", "Loot", "*diamond", "exotic");
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
				message("You stole " + prettify(amt) + " fragments from that Flutimp! It really didn't look like she needed them though, don't feel bad.", "Loot", "th", "exotic");
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
				game.resources.trimps.max += amt;
				game.unlocks.impCount.Tauntimp++;
				game.unlocks.impCount.TauntimpAdded += amt;
				if (game.portal.Carpentry.level) amt *= Math.pow((1 + game.portal.Carpentry.modifier), game.portal.Carpentry.level);
				message("It's nice, warm, and roomy in that dead Tauntimp. It's big enough for " + prettify(amt) + " Trimps to live inside!", "Loot", "gift", "exotic");
				
			}
		},
		Whipimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "Grants 0.3% Trimp gather speed",
			loot: function () {
				game.jobs.Farmer.modifier *= 1.003;
				game.jobs.Lumberjack.modifier *= 1.003;
				game.jobs.Miner.modifier *= 1.003;
				game.jobs.Scientist.modifier *= 1.003;
				game.jobs.Dragimp.modifier *= 1.003;
				game.jobs.Explorer.modifier *= 1.003;
				var amt = Math.pow(1.003, game.unlocks.impCount.Whipimp);
				amt = (amt - 1) * 100;
				message("Seeing the Whipimps fall is causing all of your Trimps to work " + amt.toFixed(2) + "% harder!", "Loot", "star", "exotic");
				game.unlocks.impCount.Whipimp++;
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
				game.resources.trimps.potency *= 1.003;
				var amt = Math.pow(1.003, game.unlocks.impCount.Venimp);
				amt = (amt - 1) * 100;
				message("The ground up Venimp now increases your Trimps' breed speed by " + amt.toFixed(2) + "%!", "Loot", "glass", "exotic");
				game.unlocks.impCount.Venimp++;
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
				var elligible = ["food", "wood", "metal", "science"];
				if (game.jobs.Dragimp.owned > 0) elligible.push("gems");
				if (game.jobs.Explorer.locked == 0) elligible.push("fragments");
				var roll = Math.floor(Math.random() * elligible.length);
				var item = elligible[roll];
				var amt = simpleSeconds(item, 45);
				amt = scaleToCurrentMap(amt);
				addResCheckMax(item, amt);
				message("That Jestimp gave you " + prettify(amt) + " " + item + "!", "Loot", "*dice", "exotic");
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
				game.global.titimpLeft = 30;
				message("That Titimp made your Trimps super strong!", "Loot", "*hammer", "exotic");
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
				var elligible = ["food", "wood", "metal", "science"];
				if (game.jobs.Dragimp.owned > 0) elligible.push("gems");
				if (game.jobs.Explorer.locked == 0) elligible.push("fragments");
				var cMessage = "That Chronoimp dropped ";
				for (var x = 0; x < elligible.length; x++){
					var item = elligible[x];
					var amt = simpleSeconds(item, 5);
					amt = scaleToCurrentMap(amt);
					addResCheckMax(item, amt);
					cMessage += prettify(amt) + " " + item;
					if (x == (elligible.length - 1)) cMessage += "!";
					else if (x == (elligible.length - 2)) cMessage += ", and ";
					else cMessage += ", ";
				}
				message(cMessage, "Loot", "hourglass", "exotic");
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
			dropDesc: "0.3% extra loot from maps and zones (Not Helium)",
			loot: function () {
				game.unlocks.impCount.Magnimp++;
				var amt = Math.pow(1.003, game.unlocks.impCount.Magnimp);
				amt = (amt - 1) * 100;
				message("You killed a Magnimp! The strong magnetic forces now increase your loot by " + amt.toFixed(2) + "%!", "Loot", "magnet", "exotic");
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
				message("Your Trimps managed to pull 1 perfectly preserved bone from that Skeletimp!", "Loot", "italic");
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
				message("That was a pretty big Skeletimp. Your Trimps scavenged the remains and found 2 perfectly preserved bones!", "Loot", "italic");
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
			
			suffix: ["Creek.Sea", "Coast.Sea", "Swamp.Sea", "Forest.Forest", "Mountain.Mountain", "Pass", "Way", "Plains", "Beach.Sea", "Hill.Mountain", "Gorge", "Valley", "Road", "Turn", 
			"Lift", "Peak.Mountain", "Canyon", "Plateau.Mountain", "Crag", "Crater", "Flats", "Oaks.Forest",  "Pit", "Volcano.Mountain", "Glacier.Sea",  "Cavern.Sea", "Cave",  "Nest", "Fork", "Tundra", 
			"Sea.Sea", "Ocean.Sea", "Lake.Sea", "Jungle.Forest", "Island.Sea", "Ruins", "Temple", "Bog.Sea", "Path", "Clearing", "Grove.Forest", "Jungle.Forest", "Thicket.Forest", "Woods.Forest",
			"Oasis.Forest"]
		},
		locations: {
			Sea: {
				resourceType: "Food"
			},
			Mountain: {
				resourceType: "Metal"
			},
			Forest: {
				resourceType: "Wood"
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
				upgrade: "Relentlessness"
			},
			Prison: {
				resourceType: "Food",
				upgrade: "Keys"
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
		Keys: {
			world: 80,
			level: "last",
			icon: "*key4",
			title: "The Warden's Keys",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function () {
				message("You have slain the Warden and taken his keys. How weird would it be if they fit in that key hole on the portal?", "Story");
				game.challenges.Electricity.hasKey = true;
				game.global.prisonClear++;
				if (game.global.challengeActive == "Electricity") {
					message("You have completed the Electricity challenge! You have been rewarded with " + prettify(game.challenges.Electricity.heldHelium) + " Helium, and you may repeat the challenge.", "Notices");
					game.resources.helium.owned += game.challenges.Electricity.heldHelium;
					game.global.totalHeliumEarned += game.challenges.Electricity.heldHelium;
					game.challenges.Electricity.heldHelium = 0;
					game.global.challengeActive = "";
					game.global.radioStacks = 0;
					updateRadioStacks();
				}
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
			fire: function () {
				message("Don't ever let anyone tell you that you didn't just kill that Megablimp. Because you did. As he melts away into nothingness, you notice a green, shining box on the ground. In tiny writing on the box, you can make out the words 'Time portal. THIS SIDE UP'", "Story");
				game.global.portalActive = true;
				fadeIn("helium", 10);
				game.resources.helium.owned += 30;
				game.global.totalHeliumEarned += 30;
				message("<span class='glyphicon glyphicon-oil'></span>You were able to extract 30 Helium canisters from that Blimp! Now that you know how to do it, you'll be able to extract helium from normal Blimps.", "Story"); 
				fadeIn("portalBtn", 10);
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
				if (game.global.challengeActive == "Scientist"){
					game.global.challengeActive = "";
					game.challenges.Scientist.abandon();
					game.global.sLevel = getScientistLevel();
					message("You have completed the <b>Scientist Challenge!</b> From now on, you'll receive " + getScientistInfo(game.global.sLevel, true) + " every time you portal.", "Notices");
				}
				if (game.global.challengeActive == "Trimp"){
					game.global.challengeActive = "";
					game.challenges.Trimp.abandon();
					game.portal.Resilience.locked = false;
					message("You have completed the <b>Trimp Challenge!</b> You have unlocked the 'Resilience' perk, and your Trimps can fight together again.", "Notices");
				}
				unlockUpgrade("Shieldblock");
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
		TheBlock: {
			world: -1,
			message: "Holy cowimp! A unique map!",
			level: [10, 20],
			icon: "th-large",
			title: "The Block",
			startAt: 11,
			canRunOnce: true,
			fire: function () {
				game.global.mapsOwned++;
				game.global.totalMapsEarned++;
				game.global.mapsOwnedArray.push({
					id: "map" + game.global.totalMapsEarned,
					name: "The Block",
					location: "Block",
					clears: 0,
					level: 11,
					difficulty: 1.1,
					size: 100,
					loot: 2,
					noRecycle: true
				});
				unlockMap(game.global.mapsOwnedArray.length - 1);
				message("You just made a map to The Block!", "Notices");
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
				game.global.mapsOwned++;
				game.global.totalMapsEarned++;
				game.global.mapsOwnedArray.push({
					id: "map" + game.global.totalMapsEarned,
					name: "The Wall",
					location: "Wall",
					clears: 0,
					level: 15,
					difficulty: 1.5,
					size: 100,
					loot: 2,
					noRecycle: true
				});
				unlockMap(game.global.mapsOwnedArray.length - 1);
				message("You just made a map to The Wall!", "Loot", "th-large");
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
				unlockMapStuff();
				createMap(80, "The Prison", "Prison", 2.6, 100, 2.6, true);
				message("You found The Prison! You have a bad feeling about going in...", "Story");
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
		gems: {
			world: -1,
			level: [0, 7],
			icon: "*diamond",
			title: "Gems",
			repeat: 5,
			fire: function (level) {
				var amt = rewardResource("gems", 0.5, level, true);
				message("You found " + prettify(amt) + " gems! Terrific!", "Loot", "*diamond");
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
				message("You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot", "*cubes");
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
				message("That guy just left " + prettify(amt) + " food on the ground! Sweet!", "Loot", "apple");
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
				message("You just found " + prettify(amt) + " wood! That's pretty neat!", "Loot", "tree-deciduous");
			}
		}
	},

	//if you put a function in here as fire, you won't have anything unlocked, the name is just for funsies
	//-1 is all worlds, -2 is even world numbers, -3 is odd world numbers, -5 is every 5th world
	//min is inclusive, max is exclusive. too lazy to fix
	//More important stuff should be towards the top in case of bailouts
	worldUnlocks: {
		Shield: {
			message: "You found plans for a shield! It even tells you how to upgrade it, if you have enough wood. That was nice of that bad guy.",
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
			title: "New Ship",
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
			lastAt: 130,
			level: 19,
			icon: "*make-group",
			title: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Gigastation5: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -10,
			startAt: 140,
			level: 19,
			icon: "*make-group",
			title: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
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
				document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 4) + " Foremen";
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
			icon: "book",
			title: "Coordination",
			fire: function() {
				if (game.global.challengeActive == "Trimp"){
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
			message: "There is something strange about this map. It doesn't seem to reflect any light at all, just pure darkness.",
			world: 33,
			level: [15, 50],
			icon: "th-large",
			title: "Too dark to see",
			fire: function () {
				createMap(33, "Trimple Of Doom", "Doom", 3, 100, 1.8, true); 
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
				createMap(6, "Tricky Paradise", "All", 1.20, 40, 1.11);
				message("You found your first map! Travel to your map chamber to check it out.", "Story");
			}
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
				message("You found " + prettify(amt) + " map fragments!", "Loot", "th");
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
				game.resources.trimps.max += amt;
				game.global.totalGifts += amt;
				if (game.portal.Carpentry.level) amt *= Math.pow((1 + game.portal.Carpentry.modifier), game.portal.Carpentry.level);
				message("You have cleared enough land to support " + prettify(amt) + " more Trimps!", "Loot", "gift");
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
				message("That guy just left " + prettify(amt) + " food on the ground! Sweet!", "Loot", "apple");
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
				message("You just found " + prettify(amt) + " wood! That's pretty neat!", "Loot", "tree-deciduous");
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
				message("You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot", "*cubes");
			}
		}
	},
	//buildings with percent = true cannot have multiple purchases at a time
	buildings: {
		Trap: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 5,
			tooltip: "Each Trap allows you to catch one thing.",
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
			tooltip: "Has room for $incby$ more lovely Trimps, and enough workspace for half of them.",
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
			tooltip: "Use your crazy, helium-cooled, easy-to-aim wormhole generator to create easy-to-travel links to other colonizable planets where your Trimps can sleep and work. Each supports $incby$ Trimps. <b>This building costs helium to create.</b>",
			cost: {
				helium: [10, 1.075],
				metal: [100000, 1.1]
			},
			increase:{
				what: "trimps.max",
				by: 1000
			}
		},
		Collector: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 1200,
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
			tooltip: "Construct a gem-powered nursery, where baby Trimps can grow up faster. Increases Trimps per second from breeding by 1% (compounding).",
			cost: {
				gems: [400000, 1.06],
				wood: [1000000, 1.06],
				metal: [500000, 1.06]
			},
			increase: {
				what: "trimps.potency.mult",
				by: 1.01
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
			owned: 0,
			tooltip: "Each trainer will increase the base amount your soldiers can block by $modifier$%.",
			cost: {
				food: [750, 1.1]
			},
			increase: "custom",
			modifier: 20
		},
		Explorer: {
			locked: 1,
			owned: 0,
			tooltip: "Each explorer will find an average of $modifier$ fragments each second.",
			cost: {
				food: [15000, 1.1]
			},
			increase: "fragments",
			modifier: 0.1
		},
		Dragimp: {
			locked: 1,
			owned: 0,
			increase: "gems",
			modifier: 0.5
		},
		Geneticist: {
			locked: 1,
			owned: 0,
			tooltip: "Each Geneticist will increase the health of each Trimp by 1% (compounding), but slows the rate at which baby Trimps grow by 2% (compounding).",
			cost: {
				food: [1000000000000000, 1.03],
			},
			increase: "custom",
			modifier: 1
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
			tooltip: "Prestige your Warpstation, increasing the amount of Trimps it can house by 20% and the base cost by 75%. There's no turning back, learning these blueprints will make your previous model of Warpstation obsolete but functional, and you will keep all Trimps housed there. Learning this will build one new Warpstation.",
			done: 0,
			cost: {
				resources: {
					gems: [100000000000000, 1.75],
					metal: [1000000000000000, 1.75],
					science: [100000000000, 1.4]
				}
			},
			fire: function () {
				if (game.buildings.Warpstation.purchased > game.buildings.Warpstation.owned){
					var thisLength = game.global.buildingsQueue.length;
					var thisRemoved = 0;
					for (var x = 0; x < thisLength; x++){
						if (game.global.buildingsQueue[x - thisRemoved].split('.')[0] == "Warpstation") {
							removeQueueItem("queueItem" + (game.global.nextQueueId - game.global.buildingsQueue.length + x - thisRemoved)); 
							thisRemoved++;
						}
					}
				}
				game.buildings.Warpstation.increase.by *= 1.20;
				game.buildings.Warpstation.cost.gems[0] *= 1.75;
				game.buildings.Warpstation.cost.metal[0] *= 1.75;
				game.buildings.Warpstation.purchased = 1;
				game.buildings.Warpstation.owned = 1;
				game.resources.trimps.max += game.buildings.Warpstation.increase.by;
			}
		},
		
	//One Time Use Upgrades, in order of common unlock order
		Battle: { //0
			locked: 1,
			tooltip: "Figure out how to teach these Trimps to kill some bad guys.",
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
				drawGrid();
				game.global.BattleClock = -1;
				fadeIn("metal", 10);
				if (game.global.slowDone) {
					unlockEquipment("Gambeson");
					unlockEquipment("Arbalest");
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
				fadeIn("pauseFight", 1);
			}
		},
		Blockmaster: { //4
			locked: 1,
			allowed: 0,
			tooltip: "This book will increase the block gained from each Gym by 1.5x",
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
				game.global.mapsOwned++;
				game.global.totalMapsEarned++;
				game.global.mapsOwnedArray.push({
					id: "map" + game.global.totalMapsEarned,
					name: "Dimension of Anger",
					location: "Hell",
					clears: 0,
					level: 20,
					difficulty: 2.5,
					size: 100,
					loot: 3,
					noRecycle: true
				});
				unlockMap(game.global.mapsOwnedArray.length - 1);
				message("You just made a map to the Dimension of Anger! Should be fun!", "Notices");
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
			tooltip: "Another formation has crept back in to your memory. Where are these coming from? Who are you? Who cares, this one will allow your Trimps to deal 4x damage at the cost of half health and block.",
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
	//Housing upgrades, in order of unlock
		UberHut: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Hut by 2x.",
				done: 0,
				cost: {
					resources: {
						science: 30000,
						food: 200000,
						metal: 100000
					}
				},
				fire: function () {
					game.resources.trimps.max += ((game.buildings.Hut.owned) * game.buildings.Hut.increase.by);
					game.buildings.Hut.increase.by *= 2;
				}
			},
		UberHouse: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each House by 2x.",
				done: 0,
				cost: {
					resources: {
						science: 300000,
						food: 2000000,
						metal: 1000000
					}
				},
				fire: function () {
					game.resources.trimps.max += ((game.buildings.House.owned) * game.buildings.House.increase.by);
					game.buildings.House.increase.by *= 2;
				}
			},
		UberMansion: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Mansion by 2x.",
				done: 0,
				cost: {
					resources: {
						science: 3000000,
						food: 20000000,
						metal: 10000000
					}
				},
				fire: function () {
					game.resources.trimps.max += ((game.buildings.Mansion.owned) * game.buildings.Mansion.increase.by);
					game.buildings.Mansion.increase.by *= 2;
				}
			},
		UberHotel: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Hotel by 2x.",
				done: 0,
				cost: {
					resources: {
						science: 30000000,
						food: 200000000,
						metal: 100000000
					}
				},
				fire: function () {
					game.resources.trimps.max += ((game.buildings.Hotel.owned) * game.buildings.Hotel.increase.by);
					game.buildings.Hotel.increase.by *= 2;
				}
			},
		UberResort: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Resort by 2x.",
				done: 0,
				cost: {
					resources: {
						science: 300000000,
						food: 2000000000,
						metal: 1000000000
					}
				},
				fire: function () {
					game.resources.trimps.max += ((game.buildings.Resort.owned) * game.buildings.Resort.increase.by);
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
				game.resources.trimps.potency *= 1.1;
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
		},
		goldMaps: false,
		quickTrimps: false
	}
};
return toReturn;
}
var game = newGame();