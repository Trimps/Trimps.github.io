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
function newGame () {
var toReturn = {
	global: {
		version: 0.14,
		killSavesBelow: 0.05,
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
		autoSave: true,
		start: new Date().getTime(),
		time: 0,
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
		standardNotation: true,
		portalActive: false,
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
		buyTabs: {
			Buildings: true,
			Jobs: true,
			Upgrades: true,
			Equipment: true,
		},
		prestige: {
			attack: 10,
			health: 14,
			cost: 60,
			block: 10,
		},
		getEnemyAttack: function (level, name) {
			var world = getCurrentMapObject();
			var amt = 0;
			world = (game.global.mapsActive) ? world.level : game.global.world;
			var adjWorld = ((world - 1) * 100) + level;
			amt += 50 * Math.sqrt(world * Math.pow(3.27, world));
			amt -= 10;
			if (world == 1){
				amt *= .35;
				amt = (amt * .20) + ((amt * .75) * (level / 100));			
			}
			else if (world == 2){
				amt *= .5;
				amt = (amt * .32) + ((amt * .68) * (level / 100));
			}
			else
			amt = (amt * .375) + ((amt * .7) * (level / 100));
			
			if (world > 6 && game.global.mapsActive) amt *= 1.1;
			
			return Math.floor(amt);
		},
		getEnemyHealth: function (level, name) {
			var world = getCurrentMapObject();
			world = (game.global.mapsActive) ? world.level : game.global.world;
			var amt = 0;
			amt += 130 * Math.sqrt(world * Math.pow(3.265, world));
			amt -= 110;
			if (world == 1 || world == 2 && level < 10){
				amt *= .6;
			amt = (amt * .25) + ((amt * .72) * (level / 100));
			}
			else
			amt = (amt * .4) + ((amt * .4) * (level / 110));
			
			if (world > 5 && game.global.mapsActive) amt *= 1.1;
			
			return Math.floor(amt);
		}
	},
	
	portal: {
	//Names and tooltips not final
		Trumps: {
		//fiveTrimpMax mapUnlock
			locked: 0,
			level: 0,
			modifier: 1,
			tooltip: "Aggressive strategizing allows you to earn $modifier$ extra max population from each battle territory bonus.",
		},
		//breed main
		Pheromones: {
			level: 0,
			modifier: .1,
			tooltip: "Bringing some pheromones back with you will ensure that your Trimps will permanantly breed 10% faster and that you'll smell magnificent. You disagree on the smell.",
		},
		//trapThings main
		Bait: {
			level: 0,
			modifier: 1,
			tooltip: "A few of these in your traps are sure to bring in extra Trimps. Each level allows traps to catch $modifier$ extra Trimps.",
		},
		//startFight main
		Power: {
			level: 0,
			modifier: .05,
			tooltip: "Trimps learn through example. Spending some time benching dead Elephimps should inspire any future Trimps to become stronger too. Adds 5% attack permanently to your Trimps.",
		},
		//startFight main
		Toughness: {
			modifier: .05,
			tooltip: "Pay your Trimps to knock you around a little bit. By learning to not be such a wuss, your Trimps will be less wussy as well. Adds 5% health permanently to your Trimps.",
			level: 0,
		},
		//These are gonna be harder than I thought. There's a lot of checks to prices.
/* 		Cheapskate: {
			modifier: .05,
			tooltip: "Discuss negotiation tactics with your leading scientists. Permanently reduces the cost of all jobs by 5%",
		},
		Resourcefulness: {
			modifier: .05,
			tooltip: "Talk to your scientists about more efficient building designs. Each level reduces the cost of all buildings by 5%",
		}, */
		//updatePs updates
		//gather main
		Motivation: {
			modifier: 0.05,
			tooltip: "Practice public speaking with your trimps. Each level increases the amount of resources that workers produce by 5%",
			level: 0,
		},
		Looting: {
			modifier: .05,
			tooltip: "Walk back through the empty fields, learning how to milk them for every last drop. Each level permanently increases the amount of resources gained from battle by 5%",
			level: 0,
		},
	},
	
	worldText: {
		w2: "Your Trimps killed a lot of bad guys back there. It seems like you're getting the hang of this. However the world is large, and there are many more fields to explore. Chop chop.",
		w5: "Do you see that thing at the end of this field? It's huge! It's terrifying! You've never seen anything like it before, but you know that it is a Blimp. How did you know that? Stop knowing things and go kill it.",
		w7: "Slow and steady wins the race. Unless you're racing someone who is actually trying.",
		w9: "You can't shake the feeling that you've been here before. Deja Vu?",
		w10: "Looks like another Blimp up ahead. Hard to tell from far away, but it looks like it has more heads than the last one.",
		w11: "You're unstoppable as long as nothing stops you. Unfortunately, it seems like something really wants to stop you.",
		w12: "Did you see that green light flash by? Weird. Oh well.",
		w15: "Another day, another Blimp at the end of the field",
		w16: "Seriously? Another Blimp so soon?",
		w17: "You climb a large cliff and look out over the new field. Red dirt, scorched ground, and devastation. Is that a Dragimp flying around out there?!",
		w18: "There seems to be a strange force urging you to keep going. The atmosphere is becoming... angrier. Part of you wants to turn around and go back, but most of you wants to keep going.",
		w19: "You look behind and see your kingdom. You have gems, a colony, and territory. You wonder if enough Trimps have already fallen in battle. After contemplation, one word falls out of your mouth as you begin to move forward. 'Nah'",
		w20: "You can sense that you're close to your goal.",		
	},
	
	trimpDeathTexts: ["ceased to be", "bit the dust", "took a dirt nap", "expired", "kicked the bucket"],
	badGuyDeathTexts: ["slayed", "killed", "destroyed"],
	
	settings: {
		speed: 10,
		speedTemp: 0,
		slowdown: false,
		barAnimation: true
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
			max: -1,
		},
		fragments: {
			owned: 0,
			max: -1,
		},
/* 		helium: {
			owned: 0,
			max: -1,
		} */
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
			health: 4,
			healthCalculated: 4,
			blockNow: false,
			block: 20,
			blockCalculated: 20,
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
			health: 35,
			healthCalculated: 35,
			prestige: 1
		}
	},

	badGuys: {
		Squimp: {
			location: "All",
			attack: 1,
			health: 1,
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
			attack: 1.3,
			health: 0.7,
			fast: false
		},
		Snimp: {
			location: "All",
			attack: 1.1,
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
			health: 3,
			fast: false
		},
		Frimp: {
			location: "Forest",
			attack: 0.75,
			health: 1.2,
			fast: true
		},
		Blimp: {
			location: "World",
			last: true,
			world: 5,
			attack: 1.3,
			health: 10,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("food", 2, level);
				rewardResource("wood", 2, level);
				rewardResource("metal", 2, level);
				message("<span class='glyphicon glyphicon-piggy-bank'></span>That Blimp dropped " + prettify(amt) + "Food, Wood and Metal! That should be useful.", "Loot");
			}
		},
		Dragimp: {
			location: "World",
			world: 11,
			attack: 1,
			health: 2,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("gems", .15, level, true);
				message("<span class='glyphicon glyphicon-certificate'></span>That Dragimp dropped " + prettify(amt) + " gems!", "Loot");
			}
		},
		Mitschimp: {
			location: "Block",
			last: true,
			world: 10,
			attack: 1.2,
			health: 8,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("wood", 2, level, true);
				message("<span class='glyphicon glyphicon-tree-deciduous'></span>Mitschimp dropped " + prettify(amt) + " wood!", "Loot");
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
			
			suffix: ["Creek.Sea", "Coast.Sea", "Swamp", "Forest.Forest", "Mountain.Mountain", "Pass", "Way", "Plains", "Beach.Sea", "Hill.Mountain", "Gorge", "Valley", "Road", "Turn", 
			"Lift", "Peak.Mountain", "Canyon", "Plateau.Mountain", "Crag", "Crater", "Flats", "Oaks.Forest",  "Pit", "Volcano.Mountain", "Glacier",  "Cavern", "Cave",  "Nest", "Fork", "Tundra", 
			"Sea.Sea", "Ocean.Sea", "Lake.Sea", "Jungle.Forest", "Desert", "Island.Sea", "Ruins", "Temple", "Bog", "Path", "Clearing"]
		},
		locations: {
			Sea: {
				resourceType: "Food",
			},
			Mountain: {
				resourceType: "Metal",
			},
			Forest: {
				resourceType: "Wood",
			},
			Hell: {
				resourceType: "Metal",
				upgrade: "Portal",
			},
			Block: {
				resourceType: "Wood",
				upgrade: "Shieldblock",
			},
			All: {
				resourceType: "Metal",
			},
		
		},
		sizeBase: 50,
		sizeRange: 25,
		difficultyBase: 1.2,
		difficultyRange: 0.45,
		lootBase: 1.3,
		lootRange: 0.3
	},
	
	mapUnlocks: {
	 	Portal: {
			world: 21,
			message: "Don't ever let anyone tell you that you didn't just kill that really bad guy. Because you did. As he melts away into nothingness, you notice a shining box on the ground. In tiny writing on the box, you can make out the words 'Time portal. THIS SIDE UP'",
			level: "last",
			icon: "repeat",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function () {
				game.global.portalActive = true;
			}
		},
		Shieldblock: {
			world: 10,
			message: "That thing dropped a book. Doesn't look like an ordinary book. Looks... blockier...",
			level: "last",
			icon: "book",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("Shieldblock");
			}
		},
		Supershield: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Shield!",
			level: "last",
			icon: "book",
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
			last: 5,
			fire: function () {
				unlockUpgrade("Greatersword");
			}
		},
		Bestplate: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Breastplate!",
			level: "last",
			icon: "book",
			last: 5,
			fire: function () {
				unlockUpgrade("Bestplate");
			}
		},
		TheBlock: {
			world: 10,
			message: "Holy cowimp! A unique map!",
			level: [10, 20],
			icon: "th-large",
			canRunOnce: true,
			fire: function () {
				game.global.mapsOwned++;
				game.global.totalMapsEarned++;
				game.global.mapsOwnedArray.push({
					id: "map" + game.global.totalMapsEarned,
					name: "The Block",
					location: "Block",
					clears: 0,
					level: 10,
					difficulty: 1.5,
					size: 100,
					loot: 2,
					noRecycle: true,
				});
				unlockMap(game.global.mapsOwnedArray.length - 1);
				message("You just made a map to The Block!", "Notices");
			}
		},
		Mansion: {
			world: 7,
			message: "You found plans for a Mansion! Your Trimps will be pretty stoked",
			level: [10, 20],
			icon: "home",
			canRunOnce: true,
			fire: function () {
				unlockBuilding("Mansion");
			}
		},
		Hotel: {
			world: 10,
			message: "You found plans for a hotel! (A decent hotel, too)",
			level: "last",
			icon: "home",
			canRunOnce: true,
			fire: function () {
				unlockBuilding("Hotel");
			}
		},
		UberHotel: {
			world: 30,
			message: "You found a book that will teach you how to improve your hotels!",
			level: "last",
			icon: "book",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberHotel");
			}
		},
		Resort: {
			world: 20,
			message: "You found plans for a huge resort!",
			level: "last",
			icon: "home",
			canRunOnce: true,
			fire: function () {
				unlockBuilding("Resort");
			}
		},
		UberResort: {
			world: 40,
			message: "You found a book that will teach you how to improve your resorts!",
			level: "last",
			icon: "book",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberResort");
			}
		},
		gems: {
			world: -1,
			level: [0, 15],
			icon: "certificate",
			repeat: 6,
			fire: function (level) {
				var amt = rewardResource("gems", .25, level, true);
				message("<span class='glyphicon glyphicon-certificate'></span>You found " + prettify(amt) + " gems! Terrific!", "Loot");
			}
		},
		Metal: {
			world: -1,
			level: [0, 5],
			icon: "fire",
			repeat: 6,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("metal", 1, level, true);
				message("<span class='glyphicon glyphicon-fire'></span>You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot");
			},
		},
		Food: {
			world: -1,
			level: [0, 4],
			icon: "apple",
			repeat: 9,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("food", 1, level, true);
				message("<span class='glyphicon glyphicon-apple'></span>That guy just left " + prettify(amt) + " food on the ground! Sweet!", "Loot");
			}
		},
		Wood: {
			world: -1,
			level: [0, 2],
			icon: "tree-deciduous",
			repeat: 8,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("wood", 1, level, true);
				message("<span class='glyphicon glyphicon-tree-deciduous'></span>You just found " + prettify(amt) + " wood! That's pretty neat!", "Loot");
			}
		},

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
 		Potency: {
			message: "Also known as the Trimpma Sutra, this book will help your Trimps make more Trimps",
			world: -5,
			level: 29,
			icon: "book",
			fire: function () {
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
				unlockUpgrade("Miners");
			}
		},
		Trainer: {
			message: "You found an book about proper physical training!",
			world: 3,
			level: 3, 
			icon: "book",
			title: "Step Up Your Block GAME",
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
				unlockUpgrade("Scientists");
			}
		},
		Speedscience: {
			message: "You found a book called Speedscience! What do you think it could possibly do?!",
			world: -2,
			level: 39,
			icon: "book",
			title: "Speedscience",
			fire: function () {
				unlockUpgrade("Speedscience");
			}
		},
		Explorer: {
			message: "You found a book detailing the intricacies of solo exploration!",
			world: 15,
			level: 39,
			icon: "book",
			title: "Explorer",
			fire: function () {
				unlockUpgrade("Explorers");
			}
		},
		//49 is for weapon
		Speedfarming:{
			message: "You found a book called Speedfarming! It looks delicious!",
			world: -1,
			level: 79,
			icon: "book",
			title: "Speedfarming",
			fire: function () {
				unlockUpgrade("Speedfarming");
			}
		},
		Speedlumber: {
			message: "You found a book called Speedlumber! It looks long.",
			world: -1,
			level: 69,
			icon: "book",
			title: "Speedlumber",
			fire: function () {
				unlockUpgrade("Speedlumber");
			}
		},
		Speedminer: {
			message: "You found a book called Speedminer! Hopefully the name will be more creative at some point.",
			world: -1,
			level: 59,
			icon: "book",
			title: "Speedfarming",
			fire: function() {
				unlockUpgrade("Speedminer");
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
		Producer: {
			message: "You found a crazy rare book about how to get the absolute most out of your trimps.",
			world: 6,
			level: 19,
			icon: "book",
			title: "Producer",
			fire: function () {
				unlockUpgrade('Producer');
			}
		},
		Anger: {
			message: "You look down and see a green gem that seems to stare back. You pick it up and feel adrenaline surge through your body. This is where you are supposed to be. Probably best to bring this back to the lab for some research.",
			world: 20,
			level: 99,
			icon: "eye-open",
			title: "The End Of The Road",
			fire: function () {
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
			world: 11,
			level: 55,
			icon: "record",
			title: "Egg",
			fire: function () {
				unlockUpgrade("Egg");
			}
		},
		//Multiples
		Map: {
			world: -1,
			startAt: 6,
			level: [0, 20],
			repeat: 10,
			icon: "th",
			fire: function() {
				game.resources.fragments.owned++;
			}
		},
		//portal Trumps
		fiveTrimpMax: {
			world: -1,
			level: [10, 20],
			icon: "gift",
			repeat: 45,
			fire: function () {
				game.resources.trimps.max += 5;
				var amt = 5 + (game.portal.Trumps.modifier * game.portal.Trumps.level);
				game.resources.trimps.max += amt;
				message("<span class='glyphicon glyphicon-gift'></span>You have cleared enough land to support " + amt + " more Trimps!", "Loot");
			}
		},
		fruit: {
			world: -1,
			level: [0, 4],
			icon: "apple",
			repeat: 9,
			fire: function (level) {
				var amt = rewardResource("food", .5, level);
				message("<span class='glyphicon glyphicon-apple'></span>That guy just left " + prettify(amt) + " food on the ground! Sweet!", "Loot");
			}
		},
		groundLumber: {
			world: -1,
			level: [0, 2],
			icon: "tree-deciduous",
			repeat: 8,
			fire: function (level) {
				var amt = rewardResource("wood", .5, level);
				message("<span class='glyphicon glyphicon-tree-deciduous'></span>You just found " + prettify(amt) + " wood! That's pretty neat!", "Loot");
			}
		},
		freeMetals: {
			world: -1,
			level: [3, 5],
			icon: "fire",
			repeat: 6,
			fire: function (level) {
				var amt = rewardResource("metal", 0.5, level);
				message("<span class='glyphicon glyphicon-fire'></span>You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot");
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
			tooltip: "Each Trap allows you to catch one thing",
			cost: {
				food: 10,
				wood: 10
			},
			first: function () {
				if (document.getElementById("trimps").style.visibility == "hidden") fadeIn("trimps", 10);
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
				wood: [75, 1.24],
			},
			increase: {
				what: "trimps.max",
				by: 3
			}
		},
		Barn: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			tooltip: "Increases your maximum food by 50%",
			percent: true,
			cost: {
				food: function () {
					return calculatePercentageBuildingCost("Barn", "food", .25);
				},
			},
			increase: {
				what: "food.max.mult",
				by: 1.5
			}
		},
		Shed: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			percent: true,
			tooltip: "Increases your maximum wood by 50%",
			cost: {
				wood: function () {
					return calculatePercentageBuildingCost("Shed", "wood", .25);
				}
			},
			increase: {
				what: "wood.max.mult",
				by: 1.5
			}
		},
		Forge: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			percent: true,
			tooltip: "Increases your maximum metal by 50%",
			cost: {
				metal: function () {
					return calculatePercentageBuildingCost("Forge", "metal", .25);
				}
			},
			increase: {
				what: "metal.max.mult",
				by: 1.5
			}
		},
		Gym: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 20,
			tooltip: "A building where your Trimps can work out. Each Gym increases the amount of damage each trimp can block by $incby$.",
			cost: {
				wood: [400, 1.185]
			},
			increase: {
			what: "global.block",
			by: 4
			}
		},
		House: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 20,
			tooltip: "A better house for your Trimps! Each house supports up to $incby$ more Trimps.",
			cost: {
				food: [1000, 1.22],
				wood: [2000, 1.22],
				metal: [250, 1.22]
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
				wood: [4500, 1.2],
				metal: [1000, 1.2],
			},
			increase: {
				what: "trimps.max",
				by: 8
			}
		},
		Hotel: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			tooltip: "A fancy hotel for many Trimps to live in. Complete with room service and a mini bar. Supports $incby$ Trimps.",
			cost: {
				gems: [20, 1.18],
				wood: [120000, 1.18],
				metal: [50000, 1.18],
				food: [100000, 1.18],
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
				gems: [200, 1.16],
				wood: [1200000, 1.16],
				metal: [500000, 1.16],
				food: [1000000, 1.16],
			},
			increase: {
				what: "trimps.max",
				by: 50
			}
		},
		Tribute: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			tooltip: "Pay a tribute of food to your Dragimp, increasing his appetite and his speed. He will gather gems 5% faster.",
			cost: {
				food: [10000, 1.1]
			},
			increase: {
				what: "Dragimp.modifier.mult",
				by: 1.05,
			}
		},
	},

	jobs: {
		Farmer: {
			locked: 1,
			owned: 0,
			tooltip: "Train one of your Trimps in the ancient art of farming. Each Farmer earns $modifier$ food per second",
			cost: {
				food: [5, 1.0]
			},
			increase: "food",
			modifier: 0.5
		},
		Lumberjack: {
			locked: 1,
			owned: 0,
			tooltip: "Show a Trimp how to cut one of those weird trees down. Each Lumberjack hauls back $modifier$ logs per second.",
			cost: {
				food: [5, 1.0]
			},
			increase: "wood",
			modifier: 0.5
		},
		Miner: {
			locked: 1,
			owned: 0,
			tooltip: "Send your misbehaving Trimps to the mines for some therapeutic work. Each Miner can find and smelt $modifier$ bars of metal per second",
			cost: {
				food: [20, 1.0],
			},
			increase: "metal",
			modifier: 0.5
		},
		Scientist: {
			locked: 1,
			owned: 0,
			tooltip: "It takes some patience, but you can teach these Trimps to do some research for you. Each Scientist records $modifier$ units of pure science each second.",
			cost: {
				food: [100, 1.0]
			},
			increase: "science",
			modifier: 0.5
		},
		Trainer: {
			locked: 1,
			owned: 0,
			tooltip: "Each trainer will increase the amount your soldiers can block by $modifier$%",
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
			modifier: .1
		},
		Dragimp: {
			locked: 1,
			owned: 0,
			increase: "gems",
			modifier: .5,
		}
	},
	
	upgrades: {
		Battle: {
			locked: 1,
			tooltip: "Figure out how to teach these Trimps to kill some bad guys",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 10
				}
			},
			fire: function () {
				fadeIn("equipmentTitleDiv", 10);
				fadeIn("EquipmentFilter", 10);
				fadeIn("battleContainer", 10);
				buildGrid();
				drawGrid();
				game.global.BattleClock = -1;
				fadeIn("metal", 10);
			}
		},
		Bloodlust: {
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
				document.getElementById("pauseFight").style.visibility = "visible";
			}
		},
		Coordination: {
			locked: 1,
			tooltip: "This book will teach your soldiers how to utilize the buddy system. Fighting will now require 25% more Trimps (rounded up), but attack and health will be doubled.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: [250, 1.17],
					food: [600, 1.17],
					wood: [600, 1.17],
					metal: [300, 1.17]
				}
			},
			fire: function () {
				game.resources.trimps.maxSoldiers = Math.ceil(1.25 * game.resources.trimps.maxSoldiers);
			}
		},
		Blockmaster: {
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
		Blockbetter: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will increase the block gained from each Gym by 1.5x",
			done: 0,
			cost: {
				resources: {
					science: [750, 1.1],
					food: [2000, 1.1],
					metal: [1000, 1.1]
				}
			},
			fire: function () {
				game.global.block = Math.ceil(2 * game.global.block);
				game.buildings.Gym.increase.by = Math.ceil(2 * game.buildings.Gym.increase.by);
			}
		},
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
		Explorers: {
			locked: 1,
			tooltip: "This book will allow you to hire trimps who can create map fragments for you!",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 100000,
					fragments: 5,
				}
			},
			fire: function () {
				unlockJob("Explorer");
				fadeIn("fragmentsPs", 10);
			}
		},
		Speedlumber: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to cut wood 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.17],
					wood: [750, 1.17]
				}
			},
			fire: function () {
				game.jobs.Lumberjack.modifier = (game.jobs.Lumberjack.modifier * 1.25).toFixed(2);
			}			
		},
		Speedfarming: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to farm 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.17],
					food: [750, 1.17]
				}
			},
			fire: function () {
				game.jobs.Farmer.modifier = (game.jobs.Farmer.modifier * 1.25).toFixed(2);
			}			
		},
		Speedminer: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to mine 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.17],
					metal: [750, 1.17]
				}
			},
			fire: function () {
				game.jobs.Miner.modifier = (game.jobs.Miner.modifier * 1.25).toFixed(2);
			}			
		},
		Speedscience: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to science things 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [400, 1.17]
				}
			},
			fire: function () {
				game.jobs.Scientist.modifier = (game.jobs.Scientist.modifier * 1.25).toFixed(2);
			}			
		},
		Efficiency: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach you how to be twice as productive in everything you do! Hurray! <b>Note that this applies only to your productivity, not workers.</b>",
			done: 0,
			cost: {
				resources: {
					science: [400, 1.2],
					food: [400, 1.2],
					wood: [400, 1.2],
					metal: [400, 1.2]
				}
			},
			fire: function () {
				game.global.playerModifier *= 2;
			}			
		},
		Potency: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your trimps how to be 10% more efficient at making baby Trimps!",
			done: 0,
			cost: {
				resources: {
					science: [1000, 1.4],
					wood: [4000, 1.4],
				}
			},
			fire: function () {
				game.resources.trimps.potency *= 1.1;
			}
		},
		UberHotel: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will increase the space gained from each Hotel by 2x",
			done: 0,
			cost: {
				resources: {
					science: [3000, 1.1],
					food: [200000, 1.1],
					metal: [100000, 1.1]
				}
			},
			fire: function () {
				game.resources.trimps.max += ((game.buildings.House.owned) * game.buildings.House.increase.by);
				game.buildings.House.increase.by *= 2;
			}
		},
		UberResort: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will increase the space gained from each Resort by 2x",
			done: 0,
			cost: {
				resources: {
					science: [30000, 1.1],
					food: [2000000, 1.1],
					metal: [1000000, 1.1]
				}
			},
			fire: function () {
				game.resources.trimps.max += ((game.buildings.Resort.owned * 2) * game.buildings.Resort.increase.by);
				game.buildings.Resort.increase.by *= 2;
			}
		},
		Anger: {
			locked: 1,
			allowed: 0,
			tooltip: "Your scientists are pissed. Not because of anything you did, but this gem seems to be making them mad. It'll take some research, but you think you can create a map to the place the gem originated from.",
			done: 0,
			cost: {
				resources: {
					science: 700000,
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
					level: 21,
					difficulty: 2.5,
					size: 100,
					loot: 3,
					noRecycle: true,
				});
				unlockMap(game.global.mapsOwnedArray.length - 1);
				message("You just made a map to the Dimension of Anger! Should be fun!", "Notices");
			}
		},
		Portal: {
			locked: 1,
			allowed: 0, 
			tooltip: "The portal device you found shines green in the lab. Such a familiar shade...",
			done: 0,
			cost: {
				resources: {
					
				}
			},
			fire: function () {
				prestigeGame();
			}
		},
		Egg: {
			locked: 1,
			allowed: 0,
			tooltip: "Your top scientists are pretty sure this is a Dragimp egg. They know Dragimps love shiny things, maybe it'll come out for some gems.",
			done: 0,
			cost: {
				resources: {
					gems: 10000,
				}
			},
			fire: function () {
				game.jobs.Dragimp.owned = 1;
				fadeIn("gemsPs", 10);
				unlockBuilding("Tribute");
			}
		},
		Producer: {
			locked: 1,
			allowed: 0,
			tooltip: "This book explains some low-stress methods for getting your Trimps to work harder. Low-stress for you, of course. Doubles the rate at which Farmers, Lumberjacks and Miners gather resources.",
			done: 0,
			cost: {
				resources: {
					science: [1500, 1.2],
					food: [5000, 1.2],
					wood: [5000, 1.2],
					metal: [5000, 1.2]
				}
			},
			fire: function () {
				game.jobs.Farmer.modifier *= 2;
				game.jobs.Miner.modifier *= 2;
				game.jobs.Lumberjack.modifier *= 2;
			}
		},
		Shieldblock: {
			locked: 1,
			allowed: 0,
			tooltip: "This book explains methods of using a shield to actually block damage. The current shield will need to be completely destroyed and rebuilt, but it will give health instead of block. <b>This is permanent</b>",
			done: 0,
			cost: {
				resources: {
					science: 3000,
					wood: 10000,
				}
			},
			fire: function () {
				prestigeEquipment("Shield", false, true);
				game.equipment.Shield.blockNow = true;
				game.equipment.Shield.tooltip = game.equipment.Shield.blocktip;
			}
		},
		
		
		
		
		//Equipment upgrades

		TrainTacular: {
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
		Supershield: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your shield. This will destroy your old shield and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1200, 1.7],
					gems: [40, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Shield");
			}
		},
		Dagadder: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your dagger. This will destroy your old dagger and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given.",
			done: 0,
			cost: {
				resources: {
					science: [1250, 1.7],
					gems: [60, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Dagger");
			}
		},
		Bootboost: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your boots. This will destroy your old boots and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1300, 1.7],
					gems: [70, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Boots");
			}
		},
		Megamace: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your mace. This will destroy your old mace and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given.",
			done: 0,
			cost: {
				resources: {
					science: [1400, 1.7],
					gems: [100, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Mace");
			}
		},
		Hellishmet: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your helmet. This will destroy your old helmet and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1450, 1.7],
					gems: [150, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Helmet");
			}
		},
		Polierarm: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your polearm. This will destroy your old polearm and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given.",
			done: 0,
			cost: {
				resources: {
					science: [1550, 1.7],
					gems: [225, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Polearm");
			}
		},
		Pantastic: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your pants. This will destroy your old pants and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1600, 1.7],
					gems: [275, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Pants");
			}
		},
		Axeidic: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your axe. This will destroy your old axe and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given.",
			done: 0,
			cost: {
				resources: {
					science: [1700, 1.7],
					gems: [400, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Battleaxe");
			}
		},
		Smoldershoulder: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your shoulderguards. This will destroy your old shoulderguards and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1750, 1.7],
					gems: [525, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Shoulderguards");
			}
		},
		Greatersword: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your greatsword. This will destroy your old greatsword and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given.",
			done: 0,
			cost: {
				resources: {
					science: [1850, 1.7],
					gems: [650, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Greatsword");
			}
		},
		Bestplate: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your breastplate. This will destroy your old breastplate and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1900, 1.7],
					gems: [800, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Breastplate");
			}
		}
	},

	triggers: {
		Trap: {
			done: 0,
			message: "Maybe there's something meaty and delicious here to Trap",
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
			message: "The food stores are getting pretty full, maybe you should start thinking about a Barn",
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
			message: "A nice Shed would allow you to keep more wood on hand",
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
				fadeIn("JobsFilter", 10);
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
				fadeIn("UpgradesFilter", 10);
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
				resources: {
					science: 1
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
					trimps: 75
				}
			},
			fire: function () {
				unlockBuilding('House');
			}
		},
		breeding: {
			done: 0,
			message: "Apparently the Trimps breed if they're not working. Doesn't look pleasant.",
			cost: {
				special: function () {
					return (game.resources.trimps.owned - game.resources.trimps.employed >= 2) ? true : false;
				}
			},
			fire: function () {
				document.getElementById("unempHide").style.visibility = "visible";
			}
		},
		firstMap: {
			done: 0,
			message: "You just found your first map! Travel to your map chamber to check it out!",
			cost: {
				special: function () {
					return (game.global.mapsOwned > 0) ? true : false;
				}
			},
			fire: function () {
				fadeIn("gems", 10);
			}
		},
		firstFragment: {
			done: 0,
			message: "You found your first map fragment! You can create a map with 3 fragments.",
			cost: {
				special: function () {
					return (game.resources.fragments.owned >= 1 || game.global.mapsOwnedArray.length >= 1) ? true : false;
				}
			},
			fire: function () {
				document.getElementById("mapsBtn").style.visibility = "visible";
				fadeIn("fragments", 10);
			}
		
		}
	}
};
return toReturn;
}
var game = newGame();