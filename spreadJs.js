var count = 50;
var secondsPerWorld = 1800;
var equipmentEach = 25;
var gymsPerLevel = 10;
//rec Max mult means recommended max is x * coordination soldiers
var recMaxMult = 20;
var farmers = 22;
var lumberjacks = 22;
var miners = 22;
var scientists = 22;
var foodSpent = 0;
var metalSpent = 0;
var woodSpent = 0;
var gemsSpent = 0;
var totalFoodSpent = 0;
var totalMetalSpent = 0;
var totalWoodSpent = 0;
var totalGemsSpent = 0;
var totalFoodEarned = 0;
var totalMetalEarned = 0;
var totalWoodEarned = 0;
var totalGemsEarned = 0;
var housingPurchased = 0;
var totalScienceEarned = 0;
var totalScienceSpent = 0;
var totalSciencePercent = 0;
var trimps = game.resources.trimps;
game.global.spreadSheetMode = true;
game.buildings.Hut.locked = 0;

function runCalcs() {
	var mapUnlocks = game.mapUnlocks;
	var worldUnlocks = game.worldUnlocks;
	var equipment = game.equipment;
	var mainTable = document.getElementById("mainTable");
	mainTable.innerHTML = "";
	var titleRow = mainTable.insertRow(0);
	titleRow.style.fontWeight = "bold";
	titleRow.style.fontSize = "1.2em";
	var coordinationRow = mainTable.insertRow();
	var coordinationUpgrade = game.upgrades.Coordination;
	
	var recMaxRow = mainTable.insertRow();
	var breedSpeedRow = mainTable.insertRow();
	var timeToFillRow = mainTable.insertRow();
	breedSpeedRow.style.backgroundColor = "#006600";
	breedSpeedRow.style.color = "white";
	
	
	

	var trimpHealthRow = mainTable.insertRow();
	trimpHealthRow.style.backgroundColor = "grey";
	trimpHealthRow.style.color = "white";
	var trimpBlockRow = mainTable.insertRow();
	trimpBlockRow.style.backgroundColor = "lightGrey";
	var trimpBlockCalcRow = mainTable.insertRow();
	var badAttackRow = mainTable.insertRow();
	badAttackRow.style.backgroundColor = "black";
	badAttackRow.style.color = "white";
	var healthCalcRow = mainTable.insertRow();

	var trimpAttackRow = mainTable.insertRow();
	trimpAttackRow.style.backgroundColor = "grey";
	trimpAttackRow.style.color = "white";
	var badHealthRow = mainTable.insertRow();	
	badHealthRow.style.backgroundColor = "black";
	badHealthRow.style.color = "white";
	var attackCalcRow = mainTable.insertRow();


	var equipCostRow = mainTable.insertRow();
	equipCostRow.style.backgroundColor = "lightGrey";
	var equipCostChangeRow = mainTable.insertRow();
	
	var foodRewardRow = mainTable.insertRow();
	foodRewardRow.style.backgroundColor = "#FF3333";
	var woodRewardRow = mainTable.insertRow();
	woodRewardRow.style.backgroundColor = "#663300";
	woodRewardRow.style.color = "white";
	var metalRewardRow = mainTable.insertRow();
	metalRewardRow.style.backgroundColor = "#FFCC00";
	
	var metalCalcRow = mainTable.insertRow();
	var percentOverRecRow = mainTable.insertRow();
	var foodHousingRow = mainTable.insertRow();
	var woodHousingRow = mainTable.insertRow();
	var metalHousingRow = mainTable.insertRow();
	var gemsHousingRow = mainTable.insertRow();
	var housingPurchasedRow = mainTable.insertRow();
	
	var totalFoodEarnedRow = mainTable.insertRow();
	var foodGatheringRow = mainTable.insertRow();	
	var totalFoodSpentRow = mainTable.insertRow();
	var totalFoodPercentRow = mainTable.insertRow();
	totalFoodEarnedRow.style.backgroundColor = "#FF3333";
	
	var totalWoodEarnedRow = mainTable.insertRow();
	var woodGatheringRow = mainTable.insertRow();
	var totalWoodSpentRow = mainTable.insertRow();
	var totalWoodPercentRow = mainTable.insertRow();
	totalWoodEarnedRow.style.backgroundColor = "#663300";
	totalWoodEarnedRow.style.color = "white";
	
	var totalMetalEarnedRow = mainTable.insertRow();
	var metalGatheringRow = mainTable.insertRow();	
	var totalMetalSpentRow = mainTable.insertRow();
	var totalMetalPercentRow = mainTable.insertRow();
	totalMetalEarnedRow.style.backgroundColor = "#FFCC00";
	
	var totalScienceEarnedRow = mainTable.insertRow();
	var scienceGatheringRow = mainTable.insertRow();
	totalScienceEarnedRow.style.backgroundColor = "#3399FF";
	totalScienceEarnedRow.style.color = "white";
	var totalScienceSpentRow = mainTable.insertRow();
	var totalSciencePercentRow = mainTable.insertRow();
	
	var totalGemsEarnedRow = mainTable.insertRow();
	var totalGemsSpentRow = mainTable.insertRow();
	var totalGemsPercentRow = mainTable.insertRow();
	totalGemsEarnedRow.style.backgroundColor = "#009933";
	totalGemsEarnedRow.style.color = "white";
	
	createMap();
	var map = game.global.mapsOwnedArray[0];
	map.size = 75;
	map.loot = 1.3;
	game.global.currentMapId = "map1";
	buildMapGrid(map.id);
	var lastCost;
	for (var x = 0; x <= count; x++){
		var tempCell = titleRow.insertCell();
		var soldierCell = coordinationRow.insertCell();
		var tHc = trimpHealthRow.insertCell();
		var tBc = trimpBlockRow.insertCell();
		var bAc = badAttackRow.insertCell();		
		var hCr = healthCalcRow.insertCell();
		var tBcR = trimpBlockCalcRow.insertCell();
		var bHc = badHealthRow.insertCell();
		var tAc = trimpAttackRow.insertCell();
		var aCr = attackCalcRow.insertCell();
		var fRr = foodRewardRow.insertCell();
		var wRr = woodRewardRow.insertCell();
		var mRr = metalRewardRow.insertCell();
		var mCr = metalCalcRow.insertCell();
		var eCCr = equipCostChangeRow.insertCell();
		var rMc = recMaxRow.insertCell();
		var bSc = breedSpeedRow.insertCell();
		var tFc = timeToFillRow.insertCell();
		var fHc = foodHousingRow.insertCell();
		var wHc = woodHousingRow.insertCell();
		var mHc = metalHousingRow.insertCell();
		var gHc = gemsHousingRow.insertCell()
		var eCc = equipCostRow.insertCell();
		var pORc = percentOverRecRow.insertCell();
		var hPc = housingPurchasedRow.insertCell();
		var tSEc = totalScienceEarnedRow.insertCell();
		var tSSc = totalScienceSpentRow.insertCell();
		var tSPc = totalSciencePercentRow.insertCell();
		var tFEc = totalFoodEarnedRow.insertCell();
		var tFSc = totalFoodSpentRow.insertCell();
		var tFPc = totalFoodPercentRow.insertCell();
		var tWEc = totalWoodEarnedRow.insertCell();
		var tWSc = totalWoodSpentRow.insertCell();
		var tWPc = totalWoodPercentRow.insertCell();
		var tMEc = totalMetalEarnedRow.insertCell();
		var tMSc = totalMetalSpentRow.insertCell();
		var tMPc = totalMetalPercentRow.insertCell();
		var tGEc = totalGemsEarnedRow.insertCell();
		var tGSc = totalGemsSpentRow.insertCell();
		var tGPc = totalGemsPercentRow.insertCell();
		var fFGc = foodGatheringRow.insertCell();
		var wFGc = woodGatheringRow.insertCell();
		var mFGc = metalGatheringRow.insertCell();
		var sFGc = scienceGatheringRow.insertCell();
		
		var cost = 0;
		if (x == 0){
			tempCell.innerHTML = "World";
			if (x == 0) soldierCell.innerHTML = "Coordination";
			tHc.innerHTML = "Trimp Health";
			tBc.innerHTML = "Trimp Block";
			tAc.innerHTML = "Trimp Attack";
			bHc.innerHTML = "Bad Health";
			bAc.innerHTML = "Bad Attack";
			eCc.innerHTML = "Equipment Cost (" + equipmentEach + " each)";		
			hCr.innerHTML = "Bad attack is x% of Trimp health";
			aCr.innerHTML = "Trimp attack is x% of Bad health";
			tBcR.innerHTML = "Trimp block is x% of Trimp health";
			fRr.innerHTML = "Food from battle";
			wRr.innerHTML = "Wood from battle";
			mRr.innerHTML = "Metal from battle";
			mCr.innerHTML = "Metal from battle is x% of equipment cost";
			eCCr.innerHTML = "Cost difference % from last world";
			rMc.innerHTML = "Rec. max trimps";
			bSc.innerHTML = "Trimps/second 50/50";
			tFc.innerHTML = "Time to replace soldier";
			fHc.innerHTML = "Food for housing";
			wHc.innerHTML = "Wood for housing";
			mHc.innerHTML = "Metal for housing";
			gHc.innerHTML = "Gems for housing";
			pORc.innerHTML = "actual max is % of rec";
			tFEc.innerHTML = "Total food earned";
			tFSc.innerHTML = "Total food spent";
			tFPc.innerHTML = "Food percent";
			tWEc.innerHTML = "Total wood earned";
			tWSc.innerHTML = "Total wood spent";
			tWPc.innerHTML = "Wood percent";
			tMEc.innerHTML = "Total metal earned";
			tMSc.innerHTML = "Total metal spent";
			tMPc.innerHTML = "Metal percent";
			tGEc.innerHTML = "Total gems earned";
			tGSc.innerHTML = "Total gems spent";
			tGPc.innerHTML = "Gems percent";
			hPc.innerHTML = "Housing purchased";
			tSEc.innerHTML = "Total science earned";
			tSSc.innerHTML = "Total science spent";
			tSPc.innerHTML = "Total science percent";
			fFGc.innerHTML = "Food from gathering";
			wFGc.innerHTML = "Wood from gathering";
			mFGc.innerHTML = "Metal from gathering";
			sFGc.innerHTML = "Science from gathering";
		
		}
		else{
			trimps.max += 10;
			tempCell.innerHTML = x;
			var recTrimps = trimps.maxSoldiers * recMaxMult;
	
			for (var a in mapUnlocks){
				if (mapUnlocks[a].world == game.global.world){
					mapUnlocks[a].fire();
				}
				if (typeof mapUnlocks[a].last !== 'undefined' && mapUnlocks[a].last == (x - 5)){
					mapUnlocks[a].last = x;
					game.upgrades[a].fire();
					}
			}
			for (var y in worldUnlocks){
				if (typeof worldUnlocks[y].fire === 'undefined' && ((x - worldUnlocks[y].world) % 5) == 0){
					for (var z = 0; z < equipmentEach; z++){
						if (typeof equipment[y].health !== 'undefined'){
							game.global.health += equipment[y].health;
						}
						else{
							game.global.attack += equipment[y].attack;
						}
						if (typeof equipment[y].cost.metal !== 'undefined') cost += resolvePow(equipment[y].cost.metal, equipment[y]);
						if (typeof equipment[y].cost.wood !== 'undefined') totalWoodSpent += resolvePow(equipment[y].cost.wood, equipment[y]);
						equipment[y].level++;
					}
				}
			}
			totalMetalSpent += cost;
			if (x > 1){
				for (var gymNumba = 0; gymNumba < gymsPerLevel; gymNumba++){
					game.buildings.Gym.owned++;
					game.global.block += game.buildings.Gym.increase.by;
					spendResource(resolvePow(game.buildings.Gym.cost.wood, game.buildings.Gym), "wood");
				}
			}
			if (x >= 3){
				game.jobs.Trainer.owned += 2;
			}
			if (x == 4){
				fireUpgrade("Blockmaster");
				
			}
			if (x == 10){
				fireUpgrade("Blockbetter");
			}
			if (x == 15) fireUpgrade("Blockbetter");
			if (x ==20){
				fireUpgrade("Blockbetter");
			}
			if (x % 5 == 0){
				fireUpgrade("TrainTacular");			
			}
			if (x %10 == 0){
				fireUpgrade("Potency");
			}
			if (x % 2 == 0){
				fireUpgrade("Speedscience");
			}
			fireUpgrade("Speedfarming");
			fireUpgrade("Speedlumber");
			fireUpgrade("Speedminer");
			var foodFromGather = (((recTrimps / 2) * (farmers / 100)) * game.jobs.Farmer.modifier) * secondsPerWorld;
			var woodFromGather = (((recTrimps / 2) * (lumberjacks / 100)) * game.jobs.Lumberjack.modifier) * secondsPerWorld;
			var metalFromGather = (((recTrimps / 2)* (miners / 100)) * game.jobs.Miner.modifier) * secondsPerWorld;
			var scienceFromGather = (((recTrimps / 2) * (scientists / 100)) * game.jobs.Scientist.modifier) * secondsPerWorld;			
			fFGc.innerHTML = prettify(foodFromGather);
			wFGc.innerHTML = prettify(woodFromGather);
			mFGc.innerHTML = prettify(metalFromGather);
			sFGc.innerHTML = prettify(scienceFromGather);
			totalFoodEarned += foodFromGather;
			totalWoodEarned += woodFromGather;
			totalMetalEarned += metalFromGather;
			totalScienceEarned += scienceFromGather;			
			
			var breedSpeed = 0;
			var food = 0;
			var wood = 0;
			var metal = 0;
			var level;
			for (var f = 1; f <= 12; f++){
				level = (100 / 12) * f;
				food += rewardResource("food", 1, level);
				wood += rewardResource("wood", 1, level);
			}
			for (var m = 1; m <= 12; m++){
				level = (100 / 16) * m;
				metal += rewardResource("metal", .5, level);
			}
			if (game.global.world >= 6){
				map.level = game.global.world;
			}
			for (var itemCell in game.global.mapGridArray){
				var cellLevel = parseInt(itemCell) + 1;
				if (game.global.mapGridArray[itemCell].special == "gems") {totalGemsEarned += rewardResource("gems", .008, level);}
			}
			totalFoodEarned += food;
			totalWoodEarned += wood;
			totalMetalEarned += metal;
			
			
			fRr.innerHTML = prettify(food);
			wRr.innerHTML = prettify(wood);
			mRr.innerHTML = prettify(metal);
			//food: 12 wood: 12 metal: 16
			var block = ((game.global.block * (game.jobs.Trainer.owned * (game.jobs.Trainer.modifier / 100) + 1)) * trimps.maxSoldiers);
			//block = 0;
			tBc.innerHTML = prettify(block);
			tHc.innerHTML = prettify(game.global.health * trimps.maxSoldiers);
			tBcR.innerHTML = Math.floor((block / (game.global.health * trimps.maxSoldiers)) * 100) + "%";
			tAc.innerHTML = prettify(game.global.attack * trimps.maxSoldiers);
			bHc.innerHTML = prettify(game.global.getEnemyHealth(99, "Squimp"));
			bAc.innerHTML = prettify(game.global.getEnemyAttack(99, "Squimp"));
			hCr.innerHTML = Math.floor(((game.global.getEnemyAttack(99, "Squimp") - block) / (game.global.health * trimps.maxSoldiers)) * 100) + "%";
			aCr.innerHTML = Math.floor(((game.global.attack * trimps.maxSoldiers) / (game.global.getEnemyHealth(99, "Squimp"))) * 100) + "%";
			eCc.innerHTML = prettify(cost);
			mCr.innerHTML = Math.floor((metal / cost) * 100) + "%";
			
			soldierCell.innerHTML = prettify(trimps.maxSoldiers);
			rMc.innerHTML = prettify(recTrimps);
			eCCr.innerHTML = Math.floor((cost / lastCost) * 100) + "%";
			breedSpeed = Math.floor(recTrimps / 2) * trimps.potency
			bSc.innerHTML = prettify(breedSpeed);
			tFc.innerHTML = (trimps.maxSoldiers / breedSpeed).toFixed(2);
			while (trimps.max < recTrimps && housingPurchased < 50){
				var cheapest = findBestHouse();
				buyHouse(cheapest);
			}
			var percentOverForCell = Math.floor((trimps.max / recTrimps) * 100);
			pORc.innerHTML = percentOverForCell + "%";
			var pORcBack = (percentOverForCell > 105) ? "red" : "white";
			pORc.style.backgroundColor = pORcBack;
			fHc.innerHTML = prettify(foodSpent);
			totalFoodSpent += foodSpent;
			foodSpent = 0;
			wHc.innerHTML = prettify(woodSpent);
			totalWoodSpent += woodSpent;
			woodSpent = 0;
			mHc.innerHTML = prettify(metalSpent);
			totalMetalSpent += metalSpent;
			metalSpent = 0;
			gHc.innerHTML = prettify(gemsSpent);
			totalGemsSpent += gemsSpent;
			gemsSpent = 0;
			
			tFPc.innerHTML = Math.floor((totalFoodEarned / totalFoodSpent) * 100) + "%";
			tFEc.innerHTML = prettify(totalFoodEarned);
			totalFoodEarned = 0;
			tFSc.innerHTML = prettify(totalFoodSpent);
			totalFoodSpent = 0;
			
			tWPc.innerHTML = Math.floor((totalWoodEarned / totalWoodSpent) * 100) + "%";
			tWEc.innerHTML = prettify(totalWoodEarned);
			totalWoodEarned = 0;
			tWSc.innerHTML = prettify(totalWoodSpent);
			totalWoodSpent = 0;
			
			tMPc.innerHTML = Math.floor((totalMetalEarned / totalMetalSpent) * 100) + "%";
			tMEc.innerHTML = prettify(totalMetalEarned);
			totalMetalEarned = 0;
			tMSc.innerHTML = prettify(totalMetalSpent);
			totalMetalSpent = 0;
			
			tGPc.innerHTML = Math.floor((totalGemsEarned / totalGemsSpent) * 100) + "%";
			tGEc.innerHTML = prettify(totalGemsEarned);
			totalGemsEarned = 0;
			tGSc.innerHTML = prettify(totalGemsSpent);
			totalGemsSpent = 0;
			
			tSPc.innerHTML = Math.floor((totalScienceEarned / totalScienceSpent) * 100) + "%";
			tSEc.innerHTML = prettify(totalScienceEarned);
			totalScienceEarned = 0;
			tSSc.innerHTML = prettify(totalScienceSpent);
			totalScienceSpent = 0;
			
			hPc.innerHTML = housingPurchased;
			if (housingPurchased == 50) hPc.style.backgroundColor = "red";
			housingPurchased = 0;
			
			
			lastCost = cost;
			game.global.world++;
			coordinationUpgrade.fire();	
		
		}
	}
}

function fireUpgrade(what) {
	var upgrade = game.upgrades[what];

	for (var item in upgrade.cost.resources){
		console.log(item);
		var cost = resolvePow(upgrade.cost.resources[item], upgrade);
		spendResource(cost, item);
		if (item == "science") console.log(what + " costs " + prettify(cost) + " " + item + " on world " + game.global.world); 
	}
	upgrade.done++;
	upgrade.allowed++;
	upgrade.fire();
}

function upgradeStorage() {
	var building;
	var current;
	var max;
	building = game.buildings.Barn;
	current = totalFoodSpent;
	max = game.resources.food.max;
	while (totalFoodSpent > game.resources.food.max){
		
	}

}

/* buyStorageBuildings(building, current, max){
	while (current > max){
		building.owned++;
		building.purchased++;
		game.resources[building.increase.split('.')[0]].max *= building.increase.by;
		
	}

} */

runCalcs();

function findBestHouse() {
	var cheapest = "";
	var cheapestRatio = 0;
	for (var item in game.buildings){
		var building = game.buildings[item];
		if (typeof building.increase === 'undefined' || building.increase.what != "trimps.max") continue;
		if (building.locked == 1) continue;
		var ratio = 0;
		for (var items in building.cost){
			ratio += resolvePow(building.cost[items], building);
		}
		ratio = ratio / building.increase.by;
		if (ratio < cheapestRatio || cheapestRatio == 0) {
			cheapestRatio = ratio;
			cheapest = item;
		}
	}
	return cheapest;
}

function buyHouse(what) {
//console.log(what + " bein bought");
	var house = game.buildings[what];
	if (typeof house.cost.food !== "undefined") foodSpent += resolvePow(house.cost.food, house);
	if (typeof house.cost.wood !== "undefined") woodSpent += resolvePow(house.cost.wood, house);
	if (typeof house.cost.metal !== "undefined") metalSpent += resolvePow(house.cost.metal, house);
	if (typeof house.cost.gems !== "undefined") gemsSpent += resolvePow(house.cost.gems, house);
	house.owned++;
	house.purchased++;
	trimps.max += house.increase.by;
	housingPurchased++;
}

function spendResource(cost, what){
	switch (what){
			case "food":
				totalFoodSpent += cost;
				break;
			case "wood":
				totalWoodSpent += cost;
				break;
			case "metal":
				totalMetalSpent += cost;
				break;
			case "gems":
				totalGemsSpent += cost;
				break;
			case "science":
				totalScienceSpent += cost;
				break;
		}
}
