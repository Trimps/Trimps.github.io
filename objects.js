var holidayObj = {
    holiday: "",
    lastCheck: null,
    holidays: {
        Eggy: {
            check: function(day, month){
                if (month == 3) return true;
            }
        },
        Pumpkimp: {
            check: function(day, month){
                if (month == 9 || (month == 10 && day <= 5)) return true;
            }
        },
        Snowy: {
            check: function(day, month){
                if ((month == 11 && day >= 15) || (month == 0 && day <= 15)) return true;
            }
        }
    },
    checkActive: function(name){
        return (this.holiday == name);
    },
    checkAll: function(){
        var date = new Date();
        if (this.lastCheck != null && ((date.getTime() - this.lastCheck.getTime()) < 120000)) return;
        this.lastCheck = date;
        var day = date.getUTCDate();
        var month = date.getUTCMonth();
        for (var holiday in this.holidays){
            if (this.holidays[holiday].check(day, month)){
                if (!this.holiday){
                    message("Loaded " + holiday + " event!", "Notices");
                }
                this.holiday = holiday;
                return;
            }
        }
        if (this.holiday){
            message(this.holiday + " event has come to an end!", "Notices");
        }
        this.holiday = "";
        return;
    }
}

var tutorial = {
    open: false,
    viewingStep: 0,
    start: function(){
        game.global.tutorialActive = true;
        game.global.tutorialOpen = true;
        this.load();
    },
    load: function(){
        if (game.global.tutorialOpen) this.openWindow();
        document.getElementById('openTutorialContainer').style.display = 'block';
        document.getElementById('openTutorialContainer2').style.display = 'block';
        this.toggleSize(true);
    },
    popup: function(){
        game.global.tutorialOpen = !game.global.tutorialOpen;
        if (game.global.totalPortals >= 1) game.global.tutorialStep = 15;
        if (game.global.tutorialOpen) this.openWindow();
        else this.closeWindow();
    },
    closeWindow: function(){
        game.global.tutorialOpen = false;
        document.getElementById('tutorialDiv').style.display = 'none';
    },
    openWindow: function(){
        game.global.tutorialOpen = true;
        this.viewingStep = game.global.tutorialStep;
        document.getElementById('tutorialDiv').style.display = 'block';
        this.getText();
        this.stopFlash();
    },
    reset: function(){
        this.closeWindow();
        document.getElementById('openTutorialContainer').style.display = 'none';
        document.getElementById('openTutorialContainer2').style.display = 'none';
    },
    makeFlash: function(){
        swapClass('flash', 'flashing', document.getElementById('openTutorialBtn'));
        swapClass('flash', 'flashing', document.getElementById('openTutorialBtn2'));
    },
    stopFlash: function(){
        swapClass('flash', 'flashNo', document.getElementById('openTutorialBtn'));
        swapClass('flash', 'flashNo', document.getElementById('openTutorialBtn2'));
    },
    check: function(){
        var oldStep = game.global.tutorialStep;
        if (oldStep == 15) return;
        switch(game.global.tutorialStep){
            case 0:
                if (game.upgrades.Bloodlust.allowed > 0) game.global.tutorialStep++;
                break;
            case 1:
                if (game.global.world >= 2) game.global.tutorialStep++;
                break;
            case 2:
                if (game.global.world >= 4) game.global.tutorialStep++;
                break;
            case 3:
                if (game.global.mapsUnlocked) game.global.tutorialStep++;
                break;
            case 4:
                if (game.global.preMapsActive || game.upgrades.Supershield.allowed > 0 || game.global.mapsActive) game.global.tutorialStep++;
                break;
            case 5:
                if (game.global.mapsActive || game.upgrades.Supershield.allowed > 0) game.global.tutorialStep++;
                break;
            case 6:
                if (game.upgrades.Supershield.allowed > 0 && game.upgrades.Dagadder.allowed > 0 && game.upgrades.Bootboost.allowed > 0) game.global.tutorialStep++;
                break;
            case 7:
                if (game.global.world >= 7 && (game.global.preMapsActive || game.upgrades.Megamace.allowed > 0)) game.global.tutorialStep++;
                break;
            case 8:
                if (game.upgrades.Megamace.allowed > 0 && game.upgrades.Hellishmet.allowed > 0) game.global.tutorialStep++;
                break;
            case 9:
                if (game.upgrades.Trapstorm.allowed > 0) game.global.tutorialStep++;
                break;
            case 10:
                if ((game.upgrades.Shieldblock.allowed > 0) || (!game.mapUnlocks.TheBlock.canRunOnce && game.global.preMapsActive)) game.global.tutorialStep++;
                break;
            case 11:
                if (game.upgrades.Shieldblock.allowed > 0) game.global.tutorialStep++;
                break;
            case 12:
                if (game.upgrades.Bounty.allowed > 0) game.global.tutorialStep++;
                break;
            case 13:
                if (game.upgrades.Anger.done > 0) game.global.tutorialStep++;
                break;
            case 14:
                if (game.global.portalActive) game.global.tutorialStep++;
                break;
        }
        if (oldStep != game.global.tutorialStep) {
            if (!game.global.tutorialOpen){
                this.makeFlash();
            }
            else{
                this.viewingStep = game.global.tutorialStep;
                this.getText();
                this.resetScroll();
            }
        }
    },
    setWinSize: function(){
        var className = (game.global.preMapsActive) ? 'tutorialDivSm' : 'tutorialDiv';
        var classWidth = (game.global.tutorialLg) ? 'tutorialWidthLg' : 'tutorialWidth'
        swapClass('tutorialDiv', className, document.getElementById('tutorialDiv'));
        swapClass('tutorialWidth', classWidth, document.getElementById('tutorialDiv'));
        document.getElementById('tutorialBookmarks').style.display = (game.global.tutorialLg) ? 'inline-block' : 'none';
        document.getElementById('tutorialInner').style.width = (game.global.tutorialLg) ? '79%' : '100%';
        this.resetScroll();
    },
    toggleSize: function(updateOnly){
        if (!updateOnly) game.global.tutorialLg = !game.global.tutorialLg;
        this.setWinSize();
        document.getElementById('tutorialSizeBtn').className = (game.global.tutorialLg) ? 'icomoon icon-shrink' : 'icomoon icon-expand';
        if (game.global.tutorialLg) this.setBookmarks();

    },
    resetScroll: function(){
        var elem = document.getElementById('tutorialTextInner');
        elem.scrollTop = 0;
    },
    next: function(){
        if (game.global.tutorialStep > this.viewingStep) {
            this.viewingStep++;
            this.getText();
            this.resetScroll();
        }
    },
    back: function(){
        if (this.viewingStep > 0){
            this.viewingStep--;
            this.getText();
            this.resetScroll();
        }
    },
    setViewStep: function(to){
        if (to > game.global.tutorialStep || to < 0) return;
        this.viewingStep = to;
        this.getText();
        this.resetScroll();
    },
    setBookmarks: function(){
        var elem = document.getElementById('tutorialBookmarks');
        var titles = ["Battle", "Zones", "Tips 1", "Tips 2", "Found a Map", "Map Chamber", "Mapping", "Equipment Prestige", "Custom Maps", "Map Settings", "Trapstorm", "Unique Maps", "Block", "Bounty", "Anger", "Portal"];
        var text = "";
        for (var x = 0; x <= game.global.tutorialStep; x++){
            if (x > titles.length) break;
            var selected = (x == this.viewingStep) ? ' selected' : '';
            text += "<div class='tutorialBookmark" + selected + "' onclick='tutorial.setViewStep(" + x + ")'>" + titles[x] + "</div>";
        }
        
        elem.innerHTML = text;
    },
    getText: function(){
        var text = "";
        var goal = "";
        var totalSteps = 16;
        switch(this.viewingStep){
            case 0:
                text = "Hello there! Didn't mean to startle you, your look of confusion indicates that you do not remember me. I am your ship's Automated Defensive Voice and Idea Synthesizing On-board Robot, but you can call me ADVISOR. I have noticed that the wildlife in the area seems to be scared of the Ship for now, but if you want to be able to leave the immediate area, you'll need to fight to do it. Luckily I have already completed an analysis of the Trimps, and with enough training they could be used to fight!"
                text += "<br/><br/>After researching Battle, press the F key or click the 'Fight' button to send Trimps to battle. You need 1 free Trimp in your town before you can send it to fight - Trap more Trimps or wait for 2 or more unemployed Trimps to breed if you run out!<br/><br/><i>You can show/hide the ADVISOR window by pressing the 'V' key, or by clicking the gold Star on the middle right after you research Battle. You can also click the <span class='icomoon icon-close' style='color: red'></span> button to close the ADVISOR window, or the <span class='icomoon icon-expand'></span> button next to it to expand this window and see a table of contents.</i>"
                goal = "Research Battle and kill 10 Bad Guys";
                break;
            case 1: //if bloodlust has been unlocked
                text = "I am quite pleased. With your newly found Upgrade Book, you can now Train your Trimps to fight on their own! In order to maximize breed speed, you should teach the Trimps to only go out and fight when housing is completely full.<br/><br/>";
                text += "My sensors have scanned the area, and the map of your current Zone will show you any Bad Guys with special rewards:<br/><span class='glyphicon glyphicon-apple'></span><span class='glyphicon glyphicon-tree-deciduous'></span><span class='icomoon icon-cubes'></span> - Food, Wood, or Metal respectively<br/>";
                text += "<span class='glyphicon glyphicon-question-sign'></span> - New Equipment<br/><span class='glyphicon glyphicon-book'></span> - An Upgrade Book (mouse over it to see Upgrade name)<br/><span class='glyphicon glyphicon-gift'></span> - Increases your max population by 5";
                text += "<br/><span class='glyphicon glyphicon-user'></span> - A foreman to help automatically build things in the queue<br/><br/>You now have lots of tools at your disposal. Keep your Trimps well equipped, research your upgrades, build more housing and you'll be in Zone 2 before you know it."
                goal = "Clear this Zone"
                break;
            case 2: //if on z2+
                text = "You're doing great so far! That Coordination Book you found will allow you to send larger groups of Trimps to fight together at a time. Upgrading this will increase your breeding requirements to maintain a fighting army, but is always worth researching as soon as you can. You will find a Coordination Book at the end of every Zone, allowing you to build a truly massive army. Don't forget that you can build and use Traps to get armies together faster!<br/><br/>";
                text += "You also notice there's blueprints for a Gym on this Zone, which will grant your Trimps the ability to Block some damage from attacks. This is a flat damage reduction per Trimp, meaning it scales with army size as you research more levels of Coordination.<br/><br/>";
                text += "By the way, you can click many of the numbers on the screen to see breakdowns of where those numbers are coming from. For example, click your Trimps' Health to see all of their Health bonuses, Food per Second to see all Food gathering bonuses, or your total number of Trimps to see totals from various sources of Max Trimps.<br/><br/>";
                text += "Continue to improve your town and army. These Bad Guys won't know what hit them.";
                goal = "Reach Zone 4";
                break;
            case 3: //if on z4+
                text = "Here's a couple of tips the Bad Guys don't want you to know:<br/><br/><ul><li>You can click the 'Custom' number button, then type '1/4' to select one quarter of your current available workspaces. This makes it easy to evenly split your workers!</li><li>All Equipment shows how many resources you need to spend for each point of a stat. The lower this number, the more efficient that piece of Equipment is!</li><li>If you ever notice that everything is suddenly really expensive, you probably just need to click '+1' again.</li></ul>"
                goal = "Find something interesting on Zone 6"
                break;
            case 4: //unlocked maps
                text = "You've certainly found something interesting, your first Map! You should try running it.<br/><br/>Click the orange Maps button under AutoFight. Your current group of soldiers can't come with you, so you can either wait for them to... finish fighting, or you can click the button a second time to go on without them.";
                goal = "Enter the Map Chamber";
                break;
            case 5: //entered map chamber
                text = "Welcome to the map chamber! Select the map 'Tricky Paradise' in your map inventory.<br/><br/>Ignore the sliders at the top of this window for now, and take a look directly above the 'Run Map' map button. You'll see that there are currently 3 unique items inside this map, and we want them. To the right, you'll see Size 45 which indicates that this map will have 45 cells, Difficulty 85% indicating that Cell 1 has 15% less health and attack than Cell 1 in Zone 6, and Loot 120% indicating that each drop in this map is worth 20% more resources than the same drop in Zone 6.<br/><br/>Now click 'Run Map' and let's see what happens!"
                goal = "Start Tricky Paradise";
                break;
            case 6: //entered a map
                text = "And they're off! Remember that we want 3 items out of this map, and we can see one of these Upgrade Books at the end right now. Press the 'R' key or click the red button that currently says 'Repeat Off' to turn Map Repeating on, so your Trimps will automatically rerun this map after they get the first upgrade.";
                text += "<br/><br/>You'll need to clear this map 3 times to earn all of its items. Keep an eye on your City and Equipment and this will be a breeze.";
                goal = "Unlock all 3 Map Items from Zone 6";
                break;
            case 7: //Unlocked supershield, dagadder, bootboost
                text = "Amazing job! You've earned all of the Map Items from Zone 6. Remember how you unlocked 3 pieces of Equipment on Zone 1, then 2 pieces each on Zones 2 through 5? From now on, you'll earn upgrades for these Equipments from maps with the same pattern, repeating every 5 Zones. 6, 11, 16 and so on will always have Shield, Dagger, and Boot upgrades, while Maps at all other Zone levels will have 2 upgrades.<br/><br/>";
                text += "These 'prestige' upgrades for your Equipment will reset the Equipment to level 1, but they are extremely powerful. If you have the upgrade available, Prestiging your Equipment before buying more Levels is always more efficient. Because your Equipment resets to level 1, you generally want to try and earn these Upgrades soon after they become available.";
                text += "You also may have noticed that the orange 'Maps' button now has a number next to it, indicating how many maps you've completed. Every time you complete a map with a level equal to your current Zone level, you'll gain a +20% damage buff for the rest of the Zone! This stacks up to 10 times. Remember you can click your Trimps' 'DMG' numbers to see all currently active bonuses.";
                text += "<br/><br/>You can exit your Map the same way you got in, the orange 'Maps' button. Once you're back in the Map Chamber, click it one more time to return to the World."
                goal = "Reach Zone 7, then go back to the Map Chamber";
                break;
            case 8: //entered map chamber on Z7
                text = "Welcome back! We're finally going to take a look at those sliders and settings at the top of the Map Chamber. We don't have a level 7 Map so we'll need to make our own!<br/><br/>";
                text += "The Loot, Size and Difficulty sliders all let you reduce the randomness of the Map Generator. For example, the default roll for Size is 25 to 75 Cells, but if you drag that slider all the way to the right, the roll becomes 25-30, guaranteeing a nice small Map to quickly grab your Upgrades and damage bonuses. However, you'll also notice that there's a Fragment cost displayed at the top that increases or decreases as you drag the sliders.<br/><br/>";
                text += "You don't have a ton of Fragments to work with right now, so you'll need to find a balance you're happy with. I'd suggest leaving the Loot slider alone for now and balancing the Size and Difficulty sliders to whatever you can afford, but you can do whatever you'd like. You can mouse over 'Biome' to see how that Dropdown works, but it doubles the Fragment cost and is best left on 'Random' until later."
                goal = "Create a Level 7 Map and complete it at least twice."
                break;
            case 9: //Unlocked megamace and hellishmet
                text = "You're really getting the hang of this!<br/><br/>Now would be a good time to mention that you can click the grey cogwheel icon next to the maps button to customize some nifty map settings based on what you need. If you like getting 10 stacks of Map Bonus, turn on 'Repeat to 10' and 'Exit to World' and watch your Trimps automatically travel back to your current Zone after their 10th map. If you just want to get your upgrades and get out, 'Repeat for Items' is for you. Check each setting's tooltip for more information!";
                text += "<br/><br/>Speaking of automation, there's another important book we could use for our automation arsenal hiding in a map up ahead. See if you can claim it for our city!"
                goal = "Find a new upgrade in a Level 10 Map";
                break;
            case 10: //Unlocked trapstorm
                text = "Look at that! Gone are the days of adding traps to the building queue yourself, now Trapstorm can handle that for you!<br/><br/>By the way, when in a map you can mouse over the name of the map above the Fight button for some useful information like how long you've been in this map, and how many upgrades remain.<br/><br/>I'm detecting something we haven't seen yet inside a map on the next Zone. Let's go check it out!"
                goal = "Run a Level 11 Map, then enter the Map Chamber"
                break;
            case 11: //Entered map chamber with The Block unlocked
                text = "Looks like we've found a Unique Map! These special maps have unique upgrades that cannot be found any other way. Unique Maps are not recyclable, generally have high loot and large size, and they change color from green to red after they've been completed. You can still run a red Unique Map as much as you want, but the color makes it easy to tell at a glance if you've earned the special upgrade from that map yet.<br/><br/>Note that this map has a size of 100 and a difficulty of 130%, so it will be more difficult than Zone 11. If The Block is too hard for you right now, you could farm an easier map first, go for another Coordination, or whatever else you think might be a good idea. Since this map is not recyclable, you can start it and then switch to a different map without destroying your Unique Map, but doing so will reset your progress in the Unique Map to Cell 1.";
                goal = "Find a way to clear The Block";
                break;
            case 12: //Unlocked Shieldblock
                text = "You've done it! This special new upgrade will convert your Shield from an accessory that provides Health, to a fully fledged Shield that can actually block damage. What crazy technology!<br/><br/>Block should be a major part of your arsenal now. With enough investment you can even get your Trimps' block higher than enemy Attack, causing your Trimps to take no damage!<br/><br/>You've now shown proficiency with most of the basic skills required to lead a Trimp civilization. My sensors are detecting another Unique Map hiding in a Level 15+ Map, and I strongly believe you have what it takes to find and complete it.";
                goal = "Find and complete the Level 15 Unique Map";
                break;
            case 13: //Unlocked Bounty
                text = "Excellent work! You've found and cleared The Wall, and earned the ultra powerful Bounty upgrade.<br/><br/>You've now amassed a powerful army, built a sprawling city, and culled thousands of enemies. There's something frightening at the end of Zone 20, but there's no doubt in my cold artificial mind that you have what it takes to defeat it.";
                goal = "Research the Upgrade Book at the end of Zone 20";
                break;
            case 14: //Unlocked Dimension of Anger
                text = "My scanners are indicating that there is advanced Portal technology inside this Unique Map you've just created, but that it is filled with dangers. It will be a tough map to clear, but you should try to complete this one before finishing Zone 21 if possible.<br/><br/>Good luck.";
                goal = "Complete the Dimension of Anger";
                break;
            case 15: //Completed Dimension of Anger
                text = "You're the best! You've accomplished every task I've asked of you with hardly any complaining, and I couldn't be more proud.<br/><br/>This Portal that you've unlocked is a powerful, ancient technology, powered by Helium. Luckily you also found a contraption that allows you to harvest Helium from the most powerful enemy of each Zone. Whenever you feel like enemies are getting too hard, you can use this Portal to return to Zone 1, and use Helium to make yourself and your Trimps permanently more powerful. The more Helium you find before you use the Portal, the more powerful you'll be after you use it!<br/><br/>This power is gained in the form of 'Perks', which you'll see on the left side of the Portal screen. You can mouse over any of these Perks to see what they do and how much they cost on their tooltip. Each time you buy 1 level of a Perk it becomes more expensive, so if you're looking for a general rule of thumb, try to spend evenly into all of them for now.<br/><br/>";
                text += "The other important thing to know about Portals is that they can be used to start Challenges with powerful rewards. I highly suggest clicking either the 'Discipline' or 'Metal' Challenge on your Portal screen before you activate your Portal, so you can earn a new Perk on your next run!<br/><br/>";
                text += "Your choices from now on are up to you. There's a big World out there to explore, filled with thousands of Upgrade Books to research.<br/><br/>See if you can clear Zone 22 to earn a little more Helium for next run, then activate your Portal.";
                goal += "Clear Zone 22, then Portal with a Challenge"
                break;
            
        }
        if (this.viewingStep != 0 && this.viewingStep != 15) text += "<br/><br/><i>Remember you can toggle the ADVISOR window by pressing V or clicking the gold star by the enemy's name.</i>";
        this.setWinSize();
        document.getElementById('tutorialTextInner').innerHTML = text;
        document.getElementById('tutorialGoal').innerHTML = goal;
        document.getElementById('tutorialStep').innerHTML = "(" + (this.viewingStep + 1) + "/" + totalSteps + ")";
        document.getElementById('tutorialBackBtn').style.display = (this.viewingStep > 0) ? 'inline-block' : 'none';
        document.getElementById('tutorialNextBtn').style.display = (this.viewingStep < game.global.tutorialStep) ? 'inline-block' : 'none';
        if (game.global.tutorialLg) this.setBookmarks();
    }
}

var alchObj = {
    tab: document.getElementById('alchemyTab'),
    load: function(){
        if (game.global.potionData != null) this.potionsOwned = game.global.potionData;
        else {
            for (var x = 0; x < this.potionsOwned.length; x++){
                this.potionsOwned[x] = 0;
                this.potionAuto[x] = 0;
            }
        }
        if (game.global.potionAuto != null) this.potionAuto = game.global.potionAuto;
        if (this.potionsOwned.length < this.potionNames.length){
            var need = this.potionNames.length - this.potionsOwned.length;
            for (var x = 0; x < need; x++){
                this.potionsOwned.push(0);
                this.potionAuto.push(0);
            }
        }
        this.tab.style.display = (game.global.alchemyUnlocked || game.global.challengeActive == "Alchemy") ? 'table-cell' : 'none';
    },
    rewards: {
        Metal: "Potatoes",
        Wood: "Mushrooms",
        Food: "Seaweed",
        Gems: "Firebloom",
        Any: "Berries",
    },
    potionNames: ["Herby Brew", "Gaseous Brew", "Potion of Finding", "Potion of the Void", "Potion of Strength", "Elixir of Crafting", "Elixir of Finding", "Elixir of Accuracy"],
    potionsOwned: [0,0,0,0,0,0,0,0],
    potionAuto: [0,0,0,0,0,0,0,0],
    getRunetrinketMult: function(chance){
        var notFind = 100 - chance;
        notFind *= Math.pow(0.99, this.potionsOwned[2]);
        return (100 - notFind);
    },
    getRunetrinketBonusAmt: function(){
        var world = (game.global.world < 101) ? 101 : game.global.world;
        var orig = game.portal.Observation.getDropChance(world);
        var newMult = game.portal.Observation.getDropChance(world, true);
        return orig - newMult;
    },
    potions: [
        {
            challenge: true,
            cost: [["Potatoes",5,10]],
            description: "Increases all Herbs found by 100% (compounding). <span class='red'>Increases Enemy Attack/Health by 75% (compounding)</span>",
            effectText: "+#% Herbs found",
            enemyMult: 1.75,
            effectComp: 2,
        },
        {
            challenge: true,
            cost: [["Mushrooms",5,5]],
            description: "Increases all Radon gained by 10% (compounding). <span class='red'>Increases Enemy Attack/Health by 30% (compounding)</span>",
            effectText: "+#% Radon",
            enemyMult: 1.3,
            effectComp: 1.10,
        },
        {
            challenge: true,
            cost: [["Seaweed",5,4]],
            description: "Increases all non-radon resources earned by 25% additively. Reduces chance to not find a Runetrinket by 1% (compounding). <span class='red'>Increases the cost of all other Potions by 50% (compounding)</span>",
            effectText: "+#% res",
            effect: 0.25,
        },

        {
            challenge: true,
            cost: [["Firebloom",5,4]],
            description: "Nullifies 5% (compounding) of increased enemy stats from Brews while in Void Maps. <span class='red'>Increases the cost of all other Potions by 50% (compounding)</span>",
            effectText: "#% nullified void stats",
            effectComp: 0.95,
            inverseComp: true
        },
        {
            challenge: true,
            cost: [["Berries",5,4]],
            description: "Increases Trimp Attack/Health by 15% additively. <span class='red'>Increases the cost of all other Potions by 50% (compounding)</span>",
            effectText: "+#% Stats",
            effect: 0.15,
        },
        {
            challenge: false,
            cost: [["Potatoes",2000,4],["Berries",1000,4],["Seaweed",1000,4]],
            description: "Increases all housing by 5% (compounding).",
            effectText: "+#% housing",
            effectComp: 1.05,
        },
        {
            challenge: false,
            cost: [["Mushrooms",10000,4],["Potatoes",3000,4]],
            description: "Increases all non-radon resources by 5% (compounding).",
            effectText: "+#% resources",
            effectComp: 1.05,
        },
        {
            challenge: false,
            cost: [["Firebloom",7000,4],["Seaweed",3000,4]],
            description: "Increases Crit Damage by 25%.",
            effectText: "+#% Crit Damage",
            effect: 0.25,
        }
    ],
    allPotionGrowth: 1.5,
    getPotionCost: function(potionName, getText){
        var index = this.potionNames.indexOf(potionName);
        if (index == -1) return "";
        var potion = this.potions[index];
        var cost = potion.cost;
        var costObj = [];
        var costText = "";
        var owned = 0;
        var thisOwned = this.potionsOwned[index];
        if (potion.challenge && !potion.enemyMult){
            for (var y = 0; y < this.potionsOwned.length; y++){
                if (this.potions[y].challenge != (game.global.challengeActive == "Alchemy")) continue;
                if (y != index && !this.potions[y].enemyMult) owned += this.potionsOwned[y]; //no cost increase for enemyMult potions
            }
        }
        for (var x = 0; x < cost.length; x++){
            var thisCost = Math.ceil(cost[x][1] * Math.pow(cost[x][2], thisOwned));
            if (potion.challenge) thisCost *= Math.pow(this.allPotionGrowth, owned);
            if (getText){
                var ownedName = (game.global.challengeActive == "Alchemy") ? "cowned" : "owned";
                var color = (game.herbs[cost[x][0]][ownedName] < thisCost) ? "red" : "green";
                costText += "<span class='" + color + "'>" + prettify(thisCost) + " " + cost[x][0] + "</span>";
                if (cost.length == x + 2){
                    if (cost.length > 2) costText += ",";
                    costText += " and ";
                }
                else if (cost.length != x + 1) costText += ", ";
            }
            else costObj.push([cost[x][0], thisCost]);
        }
        if (getText) return costText;
        return costObj;
    },
    getPotionEffect: function(potionName){
        if (game.global.universe != 2) return 1;
        var index = this.potionNames.indexOf(potionName);
        if (index == -1) return 1;
        var potion = this.potions[index];
        var onChallenge = (game.global.challengeActive == "Alchemy");
        if (potion.challenge && !onChallenge) return 1;
        if (!potion.effect && !potion.effectComp) return 1;
        var owned = this.potionsOwned[index];
        if (potion.effect) return 1 + (potion.effect * owned);
        return Math.pow(potion.effectComp, owned);

    },
    getRadonMult: function(){
        if (game.global.challengeActive != "Alchemy") return 1;
        var base = 51;
        base *= this.getPotionEffect("Gaseous Brew");
        return base;
    },
    getPotionCount: function(potionName){
        return this.potionsOwned[this.potionNames.indexOf(potionName)];
    },
    getEnemyStats: function(map, voidMap){
        //Challenge only
        var baseMod = 0.1;
        baseMod *= Math.pow(this.potions[0].enemyMult, this.potionsOwned[0]); //Herby Brew
        baseMod *= Math.pow(this.potions[1].enemyMult, this.potionsOwned[1]); //Gaseous Brew
        if (voidMap) {
            baseMod *= 10;
            if (this.potionsOwned[3] > 0) baseMod *= this.getPotionEffect("Potion of the Void");
            return baseMod;
        }
        if (map) return baseMod * 3;
        return baseMod;
    },
    unlock: function(){
        if (typeof game.global.messages.Loot.alchemy === 'undefined') game.global.messages.Loot.alchemy = true;
    },
    mapCleared: function(mapObj){
        if (game.global.universe != 2) return;
        if (game.global.challengeActive != "Alchemy" && !game.global.alchemyUnlocked) return;
        if (!mapObj || !mapObj.location) return;
        var resType = game.mapConfig.locations[mapObj.location].resourceType;
        if (resType == "Scaling") resType = getFarmlandsResType(mapObj);
        var resource = this.rewards[resType];
        if (!resource) return;
        var amt = this.getDropRate(mapObj.level);
        if (mapObj.location == "Farmlands") amt *= 1.5;
        if (amt <= 0) return;
        if (game.global.challengeActive == "Alchemy"){
            game.herbs[resource].cowned += amt;
        }
        else{
            game.herbs[resource].owned += amt;
        }
        message("You found " + prettify(amt) + " " + resource + "!", "Loot", "*leaf3", "alchemy", "alchemy");
        this.openPopup(true);
    },
    canAffordPotion: function(potionName){
        var cost = this.getPotionCost(potionName);
        if (!cost) return false;
        var owned = (game.global.challengeActive == "Alchemy") ? "cowned" : "owned";

        for (var x = 0; x < cost.length; x++){
            var resOwned = game.herbs[cost[x][0]][owned];
            if (resOwned < cost[x][1]) return false;
        }
        return true;
    },
    craftPotion: function(potionName){
        if (!this.canAffordPotion(potionName)) return;
        var cost = this.getPotionCost(potionName);
        var ownedName = (game.global.challengeActive == "Alchemy") ? "cowned" : "owned";
        for (var x = 0; x < cost.length; x++){
            game.herbs[cost[x][0]][ownedName] -= cost[x][1];
        }
        var index = this.potionNames.indexOf(potionName);
        this.potionsOwned[index]++;
        game.global.potionData = this.potionsOwned;
        this.openPopup(true);
    },
    zoneScale: 1.14,
    extraMapScale: 1.25,
    getDropRate: function(mapLevel){
        var world = game.global.world;
        var dif = mapLevel - world;
        if (dif < 0) return 0;
        var base = ((2 + (Math.floor(world / 10) * 5)) * Math.pow(this.zoneScale, world));
        base = Math.floor(base * Math.pow(this.extraMapScale, dif));
        base *= this.getPotionEffect("Herby Brew");
        return base;
    },
    openPopup: function(updateOnly){
        if (updateOnly && (lastTooltipTitle != "Alchemy" || !game.global.lockTooltip)) return;
        var herbContainer = (updateOnly) ? document.getElementById('alchHerbContainer') : null;
        if (updateOnly && !herbContainer) updateOnly = false;
        var text = (updateOnly) ? "" : "<div class='alchemyTitle'>Herbs</div><div id='alchHerbContainer'>";
        var ownedName = (game.global.challengeActive == "Alchemy") ? "cowned" : "owned";
        for (var herb in game.herbs){
            text += "<div class='alchemyPopupHerb'><span class='alchemyPopupName'>" + herb + "</span><br/>" + prettify(game.herbs[herb][ownedName]) + "</div>";
        }
        if (updateOnly){
            herbContainer.innerHTML = text;
        }
        else text += "</div>";
        text += "<div class='alchemyTitle'>Crafts</div>";
        text += "<table id='alchemyCraftTable'><tbody><tr>"
        var count = 0;
        for (var x = 0; x < this.potions.length; x++){
            var potion = this.potions[x];
            if ((game.global.challengeActive == "Alchemy") != potion.challenge) continue;
            if (count % 5 == 0) text += "</tr><tr>";
            
            var name = this.potionNames[x];
            var effectAmt = this.getPotionEffect(name);
            if (potion.inverseComp) effectAmt = 1 - effectAmt;
            else effectAmt--;
            var effectText = prettify(this.potionsOwned[x]) + " owned, " + potion.effectText.replace("#", prettify((effectAmt) * 100));
            if (name == "Potion of Finding") effectText += ", +" + this.getRunetrinketBonusAmt().toFixed(2) + "% RT chance"
            var btnClass = (this.canAffordPotion(name)) ? "colorSuccess" : "colorDisabled";
            if (updateOnly){
                var craftBtn = document.getElementById('alchCraftBtn' + x);
                if (!craftBtn) {
                    cancelTooltip();
                    console.log('button not found for refresh');
                    return;
                }
                swapClass('color', btnClass, craftBtn);
                document.getElementById('alchPotionEffect' + x).innerHTML = effectText;
                document.getElementById('alchPotionCost' + x).innerHTML = this.getPotionCost(name, true);
            }
            else
            text += "<td class='alchemyPopupCraft " + ((potion.enemyMult) ? 'brew' : 'potion') + "'><div class='alchemyPopupName'>" + name + "</div><span id='alchCraftBtn" + x + "' onclick='alchObj.craftPotion(\"" + name + "\")' class='btn btn-sm " + btnClass + "' style='width: 80%; margin-left: 10%;'>Craft</span><br/><span id='alchPotionEffect" + x + "' class='alchemyPotionEffect'>" + effectText + "</span><br/><span id='alchPotionCost" + x + "' class='alchemyCraftCost'>" + this.getPotionCost(name, true) + "</span><div class='alchemyAuto'>AutoCraft up to: <input value='" + this.potionAuto[x] + "' type='number' id='potionAuto" + x + "' /></div><span class='alchemyCraftDescription'>" + potion.description + "</span></td>";
            
            count++;
        }
        text += "</tr></tbody></table><div id='alchBottomText'>";
        if (updateOnly) text = "";
        if (game.global.challengeActive == "Alchemy"){
            text += "<div class='alchemyEnemyStats'>Enemies in this dimension are enchanted, gaining +" + prettify(this.getEnemyStats(false, false) * 100) + "% enemy stats in World, +" + prettify(this.getEnemyStats(true, false) * 100) + "% in Maps, and +" + prettify(this.getEnemyStats(true, true) * 100) + "% in Void Maps. All Radon drops are increased by " + prettify((this.getRadonMult() - 1)  * 100) + "%.";
            text += "</div>";
        }
        text += "<div class='alchemyTitle'>Drop Rates</div><table id='alchemyDropsTable'><tbody>";
        var row1 = "<tr><td style='font-weight: bold; font-style: italic'>Map Level</td>";
        var row2 = "<tr><td style='font-weight: bold; font-style: italic'>Drop Amt</td>";
        for (var y = game.global.world - 1; y <= game.global.world + 10; y++){
            row1 += "<td>" + y + "</td>";
            row2 += "<td>" + prettify(this.getDropRate(y)) + "</td>";
        }
        text += row1 + "</tr>" + row2 + "</tr></tbody></table>";
        if (updateOnly){
            document.getElementById('alchBottomText').innerHTML = text;
            return;
        }
        text += "</div>";
        tooltip('confirm', null, 'update', text, 'alchObj.save()', 'Alchemy', 'Save and Close')
    },
    autoCraft: function(){
        //called once every 2 seconds after alchemy is unlocked or during challenge
        var onChallenge = (game.global.challengeActive == "Alchemy");
        for (var x = 0; x < this.potions.length; x++){
            var potion = this.potions[x];
            if ((potion.challenge) != onChallenge) continue;
            if (this.potionsOwned[x] >= this.potionAuto[x]) continue;
            if (this.canAffordPotion(this.potionNames[x])) this.craftPotion(this.potionNames[x]);
        }
    },
    save: function(){
        for (var x = 0; x < this.potions.length; x++){
            var elem = document.getElementById('potionAuto' + x);
            if (!elem) continue;
            var val = elem.value;
            if (!val || isNumberBad(val)) continue;
            this.potionAuto[x] = val;
        }
        game.global.potionAuto = this.potionAuto;
    },
    portal: function(){
        for (var x = 0; x < this.potions.length; x++){
            if (this.potions[x].challenge) this.potionsOwned[x] = 0;
        }
        for (var herb in game.herbs){
            game.herbs[herb].cowned = 0;
        }
        if (!game.global.alchemyUnlocked) this.tab.style.display = 'none';
        game.global.potionData = this.potionsOwned;
    }
}

var autoBattle = {
    frameTime: 300,
    speed: 1,
    enemyLevel: 1,
    maxEnemyLevel: 1,
    autoLevel: true,
    dust: 0,
    shards: 0,
    shardDust: 0,
    trimp: null,
    enemy: null,
    seed: 4568654,
    enemiesKilled: 0,
    sessionEnemiesKilled: 0,
    sessionTrimpsKilled: 0,
    maxItems: 4,
    notes: "&nbsp;",
    popupMode: "items",
    battleTime: 0,
    lastSelect: "",
    lastActions: [],
    activeContract: "",
    sealed: false,
    canSeal: false,
    lootAvg: {
        accumulator: 0,
        counter: 0
    },
    presets: {
        names: ["Preset 1", "Preset 2", "Preset 3"],
        p1: [],
        p2: [],
        p3: []
    },
    rings: {
        level: 1,
        mods: ["attack"]
    },
    template: function(){
        return {
            level: 1,
            isTrimp: false,
            baseHealth: 50,
            health: 50,
            maxHealth: 50,
            baseAttack: 5,
            attack: 5,
            baseAttackSpeed: 5000,
            attackSpeed: 5000,
            lastAttack: 0,
            shockChance: 0,
            shockMod: 0,
            bleedChance: 0,
            bleedMod: 0,
            bleedTime: 0,
            hadBleed: false,
            poisonChance: 0,
            poisonTime: 0,
            poisonMod: 0,
            poisonStack: 2,
            poisonRate: 1,
            poisonTick: 1000,
            poisonHeal: 0,
            defense: 0,
            lifesteal: 0,
            shockResist: 0,
            poisonResist: 0,
            bleedResist: 0,
            lifestealResist: 0,
            slowAura: 1,
            damageTakenMult: 1,
            enrageMult: 1.25,
            enrageFreq: 60,
            explodeDamage: 0,
            explodeFreq: -1,
            lastExplode: 0,
            berserkMod: -1,
            berserkStack: 0,
            ethChance: 0,
            dmgTaken: 0,
            dustMult: 0,
            gooStored: 0,
            lastGoo: -1,
            immune: "",
            bleed: {
                time: 0,
                mod: 0
            },
            poison: {
                time: 0,
                mod: 0,
                lastTick: 0,
                stacks: 0,
                expired: false,
                hitsAtMax: 0
            },
            shock: {
                time: 0,
                mod: 0,
                count: 0,
                timeApplied: 0
            }
        }
    },
    unlockAllItems: function(){
        for (var item in this.items){
            this.items[item].owned = true;
        }
    },

    resetAll: function(){
        this.enemyLevel = 1;
        this.maxEnemyLevel = 1;
        this.autoLevel = true;
        this.dust = 0;
        this.shards = 0;
        this.trimp = null;
        this.enemy = null;
        this.enemiesKilled = 0;
        this.lastActions = [];
        this.activeContract = "";
        this.resetStats();
        this.rings = this.getFreshRings();
        this.sealed = false;
        this.canSeal = false;
        for (var item in this.items){
            item = this.items[item];
            item.owned = (item.zone) ? false : true;
            item.equipped = false;
            item.hidden = false;
            item.level = 1;
        }
        for (var bonus in this.bonuses){
            this.bonuses[bonus].level = 0;
        }
        for (var oneTimer in this.oneTimers){
            this.oneTimers[oneTimer].owned = false;
        }
        for (var setting in this.settings){
            this.settings[setting].enabled = this.settings[setting].default;
        }
        this.items.Sword.equipped = true;
        this.items.Pants.equipped = true;
        this.presets.p1 = [];
        this.presets.p2 = [];
        this.presets.p3 = [];
        this.resetCombat();
    },
    save: function(){
        var data = {};
        data.enemyLevel = this.enemyLevel;
        data.dust = this.dust;
        data.shards = this.shards;
        data.enemiesKilled = this.enemiesKilled;
        data.maxEnemyLevel = this.maxEnemyLevel;
        data.autoLevel = this.autoLevel;
        data.lastActions = this.lastActions;
        data.presets = this.presets;
        data.activeContract = this.activeContract;
        data.items = {};
        data.rings = this.rings;
        data.sealed = this.sealed;
        data.canSeal = this.canSeal;
        for (var item in this.items){
            var thisItem = this.items[item];
            if (!thisItem.owned) continue;
            data.items[item] = {};
            var saveItem = data.items[item];    
            saveItem.equipped = thisItem.equipped;
            saveItem.owned = thisItem.owned;
            saveItem.level = thisItem.level;
            saveItem.hidden = thisItem.hidden;
        }
        data.bonuses = {};
        for (var bonus in this.bonuses){
            var thisBonus = this.bonuses[bonus];
            if (thisBonus.level == 0) continue;
            data.bonuses[bonus] = thisBonus.level;
        }
        data.oneTimers = {};
        for (var oneTimer in this.oneTimers){
            var thisOneTimer = this.oneTimers[oneTimer];
            if (!thisOneTimer.owned) continue;
            data.oneTimers[oneTimer] = true;
        }
        data.settings = {};
        for (var setting in this.settings){
            if (setting == "practice") continue;
            var thisSetting = this.settings[setting];
            if (thisSetting.enabled == thisSetting.default) continue;
            data.settings[setting] = thisSetting.enabled; 
        }
        game.global.autoBattleData = data;
    },
    load: function(){
        var data = game.global.autoBattleData;
        var tab = document.getElementById('autoBattleTab');
        var canAb = (game.global.highestRadonLevelCleared >= 74);
        if (!canAb || !data || !data.items){
            this.resetAll();
            if (!canAb) tab.style.display = 'none';
            else tab.style.display = 'table-cell';
            return;
        }
        if (data.sealed) tab.style.display = 'none';
        else tab.style.display = 'table-cell';
        this.enemyLevel = data.enemyLevel;
        this.dust = data.dust;
        this.shards = data.shards ? data.shards : 0;
        this.enemiesKilled = data.enemiesKilled;
        this.maxEnemyLevel = data.maxEnemyLevel;
        this.autoLevel = data.autoLevel;
        if (data.rings && data.rings.level) this.rings = data.rings;
        else this.rings = this.getFreshRings();
        if (data.activeContract) this.activeContract = data.activeContract;
        if (data.sealed) this.sealed = true;
        if (data.canSeal) this.canSeal = true;

        if (data.presets) this.presets = data.presets;
        else{
            this.presets.p1 = [];
            this.presets.p2 = [];
            this.presets.p3 = [];
        }

        if (data.lastActions) this.lastActions = data.lastActions;
        for (var x = 0; x < this.lastActions.length; x++){
            if (!this.lastActions[x][6]) this.lastActions[x][6] = 0;
        }
        for (var item in this.items){
            var saveItem = data.items[item];
            var thisItem = this.items[item];
            if (!saveItem) {
                //thisItem.owned = false;
                thisItem.equipped = false;
                thisItem.level = 1;
                thisItem.hidden = false;
                continue;
            }
            
            thisItem.owned = saveItem.owned;
            thisItem.equipped = saveItem.equipped;
            thisItem.level = saveItem.level;
            if (typeof saveItem.hidden !== 'undefined')
            thisItem.hidden = saveItem.hidden;
        }
        for (var bonus in this.bonuses){
            if (!data.bonuses || !data.bonuses[bonus]){
                this.bonuses[bonus].level = 0;
                continue;
            }
            this.bonuses[bonus].level = data.bonuses[bonus];
        }
        for (var oneTimer in this.oneTimers){
            if (!data.oneTimers || !data.oneTimers[oneTimer]){
                this.oneTimers[oneTimer].owned = false;
                continue;
            }
            this.oneTimers[oneTimer].owned = true;
        }
        for (var setting in this.settings){
            if (!data.settings || typeof data.settings[setting] == 'undefined'){
                this.settings[setting].enabled = this.settings[setting].default;
                continue;
            }
            this.settings[setting].enabled = data.settings[setting];
        }
        if (!this.presets.names) this.presets.names = ["Preset 1", "Preset 2", "Preset 3"];
        game.stats.saHighestLevel.valueTotal = this.maxEnemyLevel;
        this.resetCombat(true);
    },
    seal: function(){
        this.sealed = true;
        document.getElementById('autoBattleTab').style.display = 'none';
        cancelTooltip();
    },
    unseal: function(){
        this.sealed = false;
        document.getElementById('autoBattleTab').style.display = 'table-cell';
        tooltip('hide');
        this.popup();
    },
    firstUnlock: function(){
        this.load();
        tooltip('hide');
        tooltip('confirm', null, 'update', "<i>\"As you approach the infinitely tall Spire, a Trimp rushes out and embraces Scruffy. Scruffy introduces you to Huffy, who seems to have also realized that Druopitee is kind of a prick. Huffy lets you know that he managed to destroy the Corruption device at the top, but that it was now crawling with horrible shadowy enemies. Huffy lets you know that he is shielded from the Portal inside the Spire, but that even when you Portal and forget him, he can use your subconscious to help direct him in cleansing the Spire and finding artifacts to make your Trimps stronger.\"</i><br/><br/>You've finally made it to Huffy and the first Spire in this Universe. Huffy needs your help removing all of the Enemies! Check out the new tab titled 'SA' to get started.<br/><br/><b>A tip for once you're in</b>: Huffy has figured out how to put on Pants and a Sword but is struggling beyond that. Click two other items to equip them ASAP!", null, 'Spire Assault Unlocked!', 'Continue', false, true);
    },
    savePreset: function(slot){
        this.presets[slot] = [];
        for (var item in this.items){
            if (this.items[item].equipped) this.presets[slot].push(item);
        }
        this.presets[slot].push(["level", this.enemyLevel]);
        if (this.rings.mods.length) {
            var ringMods = ["ring"];
            for (var x = 0; x < this.rings.mods.length; x++){
                ringMods.push(this.rings.mods[x]);
            }
            this.presets[slot].push(ringMods);
        }
        this.popup(true, false, true);
    },
    loadPreset: function(slot){
        var preset = this.presets[slot];
        var plength = preset.length;
        var maxAdd = this.getMaxItems();
        var added = 0;
        for (var item in this.items){
            this.items[item].equipped = false;
            if (this.settings.loadHide.enabled) this.items[item].hidden = (this.items[item].owned) ? true : false;
        }
        for (var x = 0; x < plength; x++){
            var thisPreset = preset[x];
            if (Array.isArray(thisPreset)){
                if (this.settings.loadLevel.enabled && thisPreset[0] == "level" && thisPreset[1] <= this.maxEnemyLevel){
                    this.enemyLevel = thisPreset[1];
                }
                else if (this.settings.loadRing.enabled && thisPreset[0] == "ring"){
                    this.rings.mods = [];
                    for (var y = 1; y < thisPreset.length; y++){
                        this.changeRing(null, y - 1, thisPreset[y])
                    }
                    var slots = this.getRingSlots();
                    while (this.rings.mods.length < slots){  // Adding random mods until all the slots are filled, this is based on the lvl 15 update code. Thanks Hatterson for the fix
                        var availableMods = this.getAvailableRingMods();
                        var randomMod = availableMods[Math.floor(Math.random() * availableMods.length)];
                        this.rings.mods.push(randomMod);
                    }
                }
                continue;
            }
            if (!this.items[thisPreset] || !this.items[thisPreset].owned) continue;
            if (added >= maxAdd) continue;
            this.items[thisPreset].equipped = true;
            this.items[thisPreset].hidden = false;
            added++;
        }
        this.popupMode = 'items';
        this.resetCombat(true);
        this.popup(true, false, true);
    },
    getItemOrder: function(){
        var items = [];
        for (var item in this.items){
            items.push({name: item, zone: (this.items[item].zone) ? this.items[item].zone : 0})
        }
        function itemSort(a,b){
            if (a.zone > b.zone) return 1;
	        if (a.zone < b.zone) return -1;
        }
        items.sort(itemSort);
        return items;
    },
    getContracts: function(){
        var items = this.getItemOrder();
        var contracts = [];
        for (var x = 0; x < items.length; x++){
            if (!this.items[items[x].name].owned) {
                contracts.push(items[x].name)
                if (contracts.length >= 3) return contracts;
            }
        }
        return contracts;
    },
    contractPrice: function(item){
        var itemObj = this.items[item];
        var dif = itemObj.zone - 75
        var total = (100 * Math.pow(1.2023, dif));
        if (itemObj.dustType == "shards") total /= 1e9;
        return total;
    },
    oneTimerPrice: function(item){
        var itemObj = this.oneTimers[item];
        var allItems = this.getItemOrder();
        var index = itemObj.requiredItems - 1;
        if (itemObj.useShards) index++;
        if (index <= 6) return 10000;
        var lastItem = allItems[index];
        var contractPrice = this.contractPrice(lastItem.name);
        if (itemObj.useShards) return Math.ceil(contractPrice / 2);
        return Math.ceil(contractPrice * 1000) / 10;
    },
    toggleSetting: function(which){
        var setting = this.settings[which];
        if (setting.enabled == setting.text.length - 1) setting.enabled = 0;
        else setting.enabled++;
        if (setting.onToggle) setting.onToggle();
        this.popup(true, false, true);
    },
    settings: {
        loadHide: {
            enabled: 1,
            default: 1,
            text: ["Leave Items on Preset Load", "Hide Unused Items on Preset Load"]
        },
        loadLevel: {
            enabled: 1,
            default: 1,
            text: ["Leave Enemy Level on Preset Load", "Set Enemy Level on Preset Load"]
        },
        loadRing: {
            enabled: 1,
            default: 1,
            text: ["Leave Ring on Preset Load", "Load Ring Mods on Preset Load"],
            hideUnless: function(){
                return (autoBattle.oneTimers.The_Ring.owned);
            }
        },
        practice: {
            enabled: 0,
            default: 0,
            text: ["Practice Off - 10x Speed, no Dust or Progress", "Practice On - 10x Speed, no Dust or Progress"],
            onToggle: function(){
                if (this.enabled) autoBattle.speed = 10;
                else autoBattle.speed = 1;
                autoBattle.resetCombat(true);
            }
        }
    },
    items: {
        //Starting items
        Menacing_Mask: {
            owned: true,
            equipped: false,
            hidden: false,
            level: 1,
            description: function(){
                return "-" + prettify((1 - this.trimpAttackSpeed()) * 100) + "% Huffy Attack Time, +" + prettify((1 - this.enemyAttackSpeed()) * -100) + "% Enemy Attack Time.";
            },
            upgrade: "-2% Huffy Attack Time, +2% Enemy Attack Time (compounding)",
            trimpAttackSpeed: function(){
                return Math.pow(0.98, this.level);
            },
            enemyAttackSpeed: function(){ 
                return 1.05 * Math.pow(1.02, (this.level - 1));
            },
            doStuff: function(){
                autoBattle.trimp.attackSpeed *= this.trimpAttackSpeed();
                autoBattle.enemy.attackSpeed *= this.enemyAttackSpeed();
            },
            priceMod: 5
        },
        Sword: {
            owned: true,
            equipped: true,
            hidden: false,
            level: 1,
            description: function(){
                return "+" + this.effect() + " attack damage.";
            },
            upgrade: "+1 attack damage",
            effect: function(){
                return this.level;
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.effect();
            },
            priceMod: 2.5
        },
        Armor: {
            owned: true,
            equipped: false,
            hidden: false,
            level: 1,
            description: function(){
                return "+" + prettify(this.effect()) + " base health.";
            },
            upgrade: "+20 base health",
            effect: function(){
                return 20 * this.level;
            },
            doStuff: function(){
                autoBattle.trimp.maxHealth += this.effect();
            },
            priceMod: 5
        },
        Rusty_Dagger: {
            owned: true,
            equipped: false,
            hidden: false,
            level: 1,
            description: function(){
                return "Can create a Bleed on the Enemy for 10 seconds. +" + prettify(this.bleedMod() * 100) + "% Bleed Damage" + ((this.level >= 5) ? ", +" + prettify(this.attack()) + " Attack" : "") + ". +" + prettify(this.bleedChance()) + "% Bleed Chance, doubled if the Enemy is Shocked or Poisoned.";
            },
            upgrade: "+10 Attack and +20% Bleed Damage per 5 levels. +5% Bleed Damage and +3% Bleed Chance",
            attack: function(){
                return Math.floor(this.level / 5) * 10;
            },
            bleedChance: function(){
                return 17 + (3 * this.level);
            },
            bleedMod: function(){
                var val = 0.1 + (0.05 * this.level);
                val += (Math.floor(this.level / 5) * 0.2);
                return val;
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.bleedMod += this.bleedMod();
                if (autoBattle.trimp.bleedTime < 10000) autoBattle.trimp.bleedTime = 10000;
                autoBattle.trimp.bleedChance += (autoBattle.enemy.poison.time > 0 || autoBattle.enemy.shock.time > 0) ? (this.bleedChance() * 2) : this.bleedChance();
            },
            startPrice: 25,
            priceMod: 4
        },
        Fists_of_Goo: {
            owned: true,
            equipped: false,
            hidden: false,
            level: 1,
            description: function(){
                return "Can create a Poison on the Enemy for 10 seconds. +" + prettify(this.effect()) + " Poison Damage. +25% Poison Chance, doubled if the enemy is bleeding or shocked."
            },
            upgrade: "+1 poison damage",
            effect: function(){
                return this.level;
            },
            doStuff: function(){
                autoBattle.trimp.poisonMod += this.effect();
                autoBattle.trimp.poisonChance += (autoBattle.enemy.shock.time > 0 || autoBattle.enemy.bleed.time > 0) ? 50 : 25;
                if (autoBattle.trimp.poisonTime < 10000) autoBattle.trimp.poisonTime = 10000;
            },
            priceMod: 6,
            startPrice: 50
        },
        Battery_Stick: {
            owned: true,
            equipped: false,
            hidden: false,
            level: 1,
            description: function(){
                return "Can create a Shock on the Enemy for 10 seconds. +" + prettify(this.shockMod() * 100) + "% Shock Damage. +35% Shock Chance, doubled if the enemy is bleeding or poisoned.";
            },
            upgrade: "+10% Shock Damage",
            shockMod: function(){
                return 0.15 + (0.1 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.shockChance += (autoBattle.enemy.bleed.time > 0 || autoBattle.enemy.poison.time > 0) ? 70 : 35;
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.shockTime = 10000;
            },
            startPrice: 25,
            priceMod: 4
        },
        Pants: {
            owned: true,
            equipped: true,
            hidden: false,
            level: 1,
            description: function(){
                return "+" + prettify(this.effect()) + " Defense."
            },
            upgrade: "+1 Defense",
            effect: function(){
                return this.level;
            },
            doStuff: function(){
                autoBattle.trimp.defense += this.effect();
            },
        },
        //unlockables

        //raincoat, 75
        //pouch 78
        Chemistry_Set: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 81,
            description: function(){
                var stacks = this.poisonStack();
                return "+50% Poison Chance if the Enemy is not already Poisoned. +" + this.defenseEffect() + " Defense if the Enemy is Poisoned. +" + prettify(this.poisonChance()) + "% Poison Chance. Poisons you inflict can stack " + stacks + " more time" + needAnS(stacks) + ".";
            },
            upgrade: "+1 Max Poison Stack per 4 levels. +1 Defense, +4% standard Poison Chance",
            defenseEffect: function(){
                return this.level;
            },
            poisonChance: function(){
                return 6 + (this.level * 4);
            },
            poisonStack: function(){
                var levels = Math.floor(this.level / 4);
                return 1 + levels;
            },
            doStuff: function(){
                if (autoBattle.enemy.poison.time > 0) autoBattle.trimp.defense += this.defenseEffect();
                else autoBattle.trimp.poisonChance += 50;
                autoBattle.trimp.poisonChance += this.poisonChance();
                autoBattle.trimp.poisonStack += this.poisonStack();
            },
            priceMod: 4,
            startPrice: 200
        },
        //bad medkit - 84
        Comfy_Boots: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 87,
            description: function(){
                return "+" + prettify(this.defense()) + " Defense. +" + prettify(this.resistance()) + "% to all Resistances.";
            },
            upgrade: "+2 Defense, +5% Resist",
            defense: function(){
                return 2 + (this.level * 2);
            },
            resistance: function(){
                return (this.level * 5);
            },
            doStuff: function(){
                autoBattle.trimp.defense += this.defense();
                var res = this.resistance();
                autoBattle.trimp.bleedResist += res;
                autoBattle.trimp.poisonResist += res;
                autoBattle.trimp.shockResist += res;
            },
            startPrice: 430
        },
        //Labcoat 90
        Lifegiving_Gem: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 93,
            description: function(){
                return "Increases Dust gained from Enemies by " + prettify(this.effect() * 100) + "% PLUS your Lifesteal amount when the Enemy dies."
            },
            upgrade: "+10% Dust Gained",
            effect: function(){
                return 0.2 + (0.1 * this.level);
            },
            dustIncrease: function(){
                return this.effect() + Math.max(0, (autoBattle.trimp.lifesteal - autoBattle.enemy.lifestealResist));
            },
            startPrice: 650,
            priceMod: 4
        },
        Mood_Bracelet: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 95,
            description: function(){
                return "-" + prettify((1 - this.effect()) * 100) + "% Attack Time and +" + prettify(this.defense()) + " Defense if the Enemy is not Bleeding."
            },
            upgrade: "-3% Attack Time (compounding), +4 Defense",
            effect: function(){
                return 0.8765 * Math.pow(0.97, this.level);
            },
            defense: function(){
                return 6 + (4 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.bleed.time <= 0){
                    autoBattle.trimp.attackSpeed *= this.effect();
                    autoBattle.trimp.defense += this.defense();
                }
            },
            priceMod: 4,
            startPrice: 1100
        },
        Hungering_Mold: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 98,
            description: function(){
                return "Heal for " + prettify(this.healAmt()) + " per stack of Poison whenever one of your Poisons deals damage. Your Poisons tick " + prettify((1 - this.tickMult()) * 100) + "% faster.";
            },
            upgrade: "+0.5 Heal on Poison Tick, +1% Poison Tick Speed",
            healAmt: function(){
                return 0.5 + (0.5 * this.level);
            },
            tickMult: function(){
                return 0.909 * Math.pow(0.99, this.level);
            },
            doStuff: function(){
                autoBattle.trimp.poisonTick *= this.tickMult();
                autoBattle.trimp.poisonHeal += this.healAmt();
            },
            priceMod: 5,
            startPrice: 2000
        },
        Recycler: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 100,
            description: function(){
                return "+" + prettify(this.effect() * 100) + "% Lifesteal. Huffy's Lifesteal heals twice as much off of Bleed damage.";
            },
            upgrade: "+5% Lifesteal",
            effect: function(){
                return 0.2 + (0.05 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.lifesteal += this.effect();
            },
            startPrice: 2800,
            priceMod: 5
        },
        Shining_Armor: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 103,
            description: function(){
                return "+" + prettify(this.defense()) + " Defense. +" + prettify(this.health()) + " Health.";
            },
            upgrade: "+6 defense, +100 health",
            defense: function(){
                return 14 + (6 * this.level);
            },
            health: function(){
                return 200 + (this.level * 100);
            },
            doStuff: function(){
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.maxHealth += this.health();
            },
            priceMod: 5,
            startPrice: 4000
        },
        Shock_and_Awl:{
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 105,
            description: function(){
                return "Can create a Shock on an enemy for 20 seconds. +" + prettify(this.attack()) + " Attack, +" + prettify(this.shockChance()) + "% Shock Chance, +" + prettify(this.shockMod() * 100) + "% Shock Damage. -25% Attack Time if the Enemy is not Shocked, +25% Lifesteal if the Enemy is Shocked.";
            },
            upgrade: "+4 Attack, +10% Shock Chance, +10% Shock Damage",
            attack: function(){
                return 6 + (4 * this.level);
            },
            shockChance: function(){
                return 20 + (10 * this.level);
            },
            shockMod: function(){
                return .40 + (.1 * this.level);
            },
            doStuff: function(){
                if (autoBattle.trimp.shockTime < 20000) autoBattle.trimp.shockTime = 20000;
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.shockChance += this.shockChance();
                autoBattle.trimp.attack += this.attack();
                if (autoBattle.enemy.shock.time <= 0) autoBattle.trimp.attackSpeed *= 0.75;
                else autoBattle.trimp.lifesteal += 0.25;
            },
            priceMod: 5,
            startPrice: 5750
        },
        //spiked gloves - 108
        Tame_Snimp: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 110,
            description: function(){
                return "Can create a Poison on the Enemy for 10 seconds. +" + prettify(this.poisonChance()) + "% Poison Chance, +" + prettify(this.poisonMod()) + " Poison Damage. Enemy Attack is reduced by 15% while the Enemy is Poisoned.";
            },
            upgrade: "+10% Poison Chance, +2 Poison Damage",
            poisonChance: function(){
                return 30 + (10 * this.level);
            },
            poisonMod: function(){
                return 5 + (2 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.poison.time > 0) autoBattle.enemy.attack *= 0.85;
                if (autoBattle.trimp.poisonTime < 10000) autoBattle.trimp.poisonTime = 10000;
                autoBattle.trimp.poisonChance += this.poisonChance();
                autoBattle.trimp.poisonMod += this.poisonMod();
            },
            priceMod: 5.5,
            startPrice: 15000
        },
        Lich_Wraps: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 113,
            description: function(){
                return "When Poisoned, Bleeding, or Shocked, gain +" + prettify(this.attack()) + " Attack, -15% Attack Time, +" + prettify(this.lifesteal() * 100) + "% Lifesteal, and take " + prettify((1 - this.damageTakenMult()) * 100) + "% less damage from all sources.";
            },
            upgrade: "+6 Attack, +6% Lifesteal, -3% damage taken (compounding, never reaching 75%)",
            damageTakenMult: function(){
                return (((0.825 * Math.pow(0.93, (this.level - 1))) / 1.5) + 0.25);
            },
            attack: function(){
                return 9 + (6 * this.level);
            },
            lifesteal: function(){
                return 0.09 + (0.06 * this.level);
            },
            doStuff: function(){
                if (autoBattle.trimp.bleed.time > 0 || autoBattle.trimp.shock.time > 0 || autoBattle.trimp.poison.time > 0){
                    autoBattle.trimp.damageTakenMult *= this.damageTakenMult();
                    autoBattle.trimp.attack += this.attack();
                    autoBattle.trimp.lifesteal += this.lifesteal();
                    autoBattle.trimp.attackSpeed *= 0.85;
                }
            },
            priceMod: 4,
            startPrice: 25000

        },
        Wired_Wristguards: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 115,
            description: function(){
                return "+" + prettify(this.defense()) + " Defense, +" + prettify(this.shockChance()) + "% Shock Chance, +" + prettify(this.shockMod() * 100) + "% Shock Damage, +50% to all Resistances. If the Enemy is Shocked, increase its Attack Time by " + prettify((this.enemySpeed() - 1) * 100) + "%.";
            },
            upgrade: "+3 Defense, +15% Shock Chance, +15% Shock Damage, +2% Enemy Attack Time",
            defense: function(){
                return 7 + (3 * this.level);
            },
            shockChance: function(){
                return 25 + (15 * this.level);
            },
            shockMod: function(){
                return 0.25 + (0.15 * this.level);
            },
            enemySpeed: function(){
                return 1.18 + (0.02 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.shockChance += this.shockChance();
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.shockResist += 50;
                autoBattle.trimp.poisonResist += 50;
                autoBattle.trimp.bleedResist += 50;
                if (autoBattle.enemy.shock.time > 0){
                    autoBattle.enemy.attackSpeed *= this.enemySpeed();
                }
            },
            startPrice: 44000,
            priceMod: 4.5
        },

        Sword_and_Board: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 120,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + prettify(this.defense()) + " Defense, +" + prettify(this.health()) + " Health, +" + prettify(this.resists()) + "% to all Resistances.";
            },
            upgrade: "+5 Attack, +50 Health, +4 Defense, +10% Resists",
            attack: function(){
                return 10 + (5 * this.level);
            },
            defense: function(){
                return 6 + (4 * this.level);
            },
            health: function(){
                return 350 + (50 * this.level);
            },
            resists: function(){
                return 10 + (10 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.maxHealth += this.health();
                var resists = this.resists();
                autoBattle.trimp.shockResist += resists;
                autoBattle.trimp.poisonResist += resists;
                autoBattle.trimp.bleedResist += resists;
            },
            priceMod: 5,
            startPrice: 90000
        },
        Bilious_Boots: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 122,
            description: function(){
                return "+" + prettify(this.poisonMod()) + " Poison Damage, +1 Max Poison Stack, +" + prettify(this.health()) + " Health, +" + prettify(this.resists()) + "% to all Resistances.";
            },
            upgrade: "+3 Poison Damage, +50 Health, +10% Resists",
            poisonMod: function(){
                return 7 + (3 * this.level);
            },
            health: function(){
                return 150 + (50 * this.level);
            },
            resists: function(){
                return 10 + (10 * this.level);
            },
            doStuff: function(){
                var resists = this.resists();
                autoBattle.trimp.shockResist += resists;
                autoBattle.trimp.poisonResist += resists;
                autoBattle.trimp.bleedResist += resists;
                autoBattle.trimp.poisonMod += this.poisonMod();
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.poisonStack++;
            },
            priceMod: 5,
            startPrice: 100000
        },
        Bloodstained_Gloves: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 123,
            description: function(){
                return "+" + prettify(this.bleedChance()) + "% to Bleed Chance, +" + prettify(this.attack()) + " Attack, -25% Enemy Attack Time, -25% Enemy Attack Damage. Fills up " + prettify(this.barFill() * 100) + "% of your Attack Speed bar whenever you cause or receive a Bleed.";
            },
            upgrade: "+5% Bleed Chance, +2 Attack, +5% (up to +160%) bar filled on Bleed",
            attack: function(){
                return 6 + (this.level * 2)
            },
            onBleed: function(){
                autoBattle.trimp.lastAttack += (autoBattle.trimp.attackSpeed * this.barFill());
            },
            bleedChance: function(){
                return 25 + (5 * this.level);
            },
            barFill: function(){
                var fill = 0.20 + (0.05 * this.level);
                if (fill > 1.6) fill = 1.6;
                return fill;
            },
            doStuff: function(){
                autoBattle.trimp.bleedChance += this.bleedChance();
                autoBattle.enemy.attackSpeed *= 0.75;
                autoBattle.enemy.attack *= 0.75;
                autoBattle.trimp.attack += this.attack();
            },
            startPrice: 160000
        },
        Unlucky_Coin: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 125,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack. +" + prettify(this.lifesteal() * 100) + "% Lifesteal if the Enemy is not Poisoned or Bleeding.";
            },
            upgrade: "+4 Attack, +10% Lifesteal",
            attack: function(){
                return 11 + (this.level * 4);
            },
            lifesteal: function(){
                return 0.2 + (this.level * .1);
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                if (autoBattle.enemy.bleed.time <= 0 && autoBattle.enemy.poison.time <= 0){
                    autoBattle.trimp.lifesteal += this.lifesteal();
                }
            },
            priceMod: 5,
            startPrice: 400000
        },
        Eelimp_in_a_Bottle: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 130,
            description: function(){
                return "+" + prettify(this.shockChance()) + "% Shock Chance, +" + prettify(this.shockMod() * 100) + "% Shock Damage, +" + prettify(this.shockResist()) + "% Shock Resist. -" + prettify((1 - this.attackSpeed()) * 100) + "% Attack Time if the Enemy is Shocked. When you Shock an Enemy, they lose all progress towards their attack. +" + prettify(this.attack()) + " Attack for each time you've Shocked this Enemy (up to 10 times).";
            },
            upgrade: "+5% Shock Chance, +5% Shock Damage, -5% Attack Time, +5% Shock Resist, +1 Attack per Shock",
            attackSpeed: function(){
                return 0.9 * Math.pow(0.95, this.level);
            },
            shockChance: function(){
                return 35 + (5 * this.level);
            },
            shockMod: function(){
                return .65 + (.1 * this.level);
            },
            shockResist: function(){
                return 10 + (5 * this.level);
            },
            attack: function(){
                return 2 + this.level;
            },
            doStuff: function(){
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.shockChance += this.shockChance();
                if (autoBattle.enemy.shock.time >= 0) autoBattle.trimp.attackSpeed *= this.attackSpeed();
                autoBattle.trimp.attack += (Math.min(10, autoBattle.enemy.shock.count) * this.attack());
                autoBattle.trimp.shockResist += this.shockResist();
            },
            priceMod: 5,
            startPrice: 1000000
        },        
        Big_Cleaver: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 133,
            description: function(){
                return "Can create a Bleed on the Enemy for 10 seconds. +100% Bleed Chance if the Enemy is at full Health, otherwise +25%. +" + prettify(this.attack()) + " Attack if the Enemy is Bleeding. +" + prettify(this.bleedMod() * 100) + "% Bleed Damage, +" + prettify(this.health()) + " Health.";
            },
            upgrade: "+2 Attack, +25% Bleed Damage, +100 Health",
            attack: function(){
                return 30 + (this.level * 2);
            },
            bleedMod: function(){
                return 1 + (0.25 * this.level);
            },
            health: function(){
                return 500 + (100 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.health == autoBattle.enemy.maxHealth) autoBattle.trimp.bleedChance += 100;
                else autoBattle.trimp.bleedChance += 25;
                autoBattle.trimp.maxHealth += this.health();
                if (autoBattle.enemy.bleed.time > 0) autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.bleedMod += this.bleedMod();
                if (autoBattle.trimp.bleedTime <= 10000) autoBattle.trimp.bleedTime = 10000;
            },
            priceMod: 4,
            startPrice: 3000000
        },
        The_Globulator: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 135,
            description: function(){
                return "+" + prettify(this.defense()) + " Defense and +" + prettify(this.health()) + " Max Health if the Enemy is Poisoned. On adding a new Poison Stack to an Enemy that hasn't had poisons expire, heal for half of this item's Max Health. If the Enemy is at Max Poison Stacks, non-Lifesteal healing effects on you are doubled. +" + prettify(this.poisonMod()) + " Poison Damage."
            },
            upgrade: "+5 Defense, +500 Health, +10 Poison Damage",
            defense: function(){
                return 25 + (5 * this.level);
            },
            health: function(){
                return 500 + (500 * this.level);
            },
            poisonMod: function(){
                return 15 + (10 * this.level);
            },
            onPoisonStack: function(stacks){
                if (stacks == 1) autoBattle.trimp.maxHealth += this.health();
                if (autoBattle.enemy.poison.expired) return;
                autoBattle.trimp.health += (this.health() / 2);
                if (autoBattle.trimp.health > autoBattle.trimp.maxHealth) autoBattle.trimp.health = autoBattle.trimp.maxHealth;
            },
            doStuff: function(){
                if (autoBattle.enemy.poison.time > 0){
                    autoBattle.trimp.maxHealth += this.health();
                    autoBattle.trimp.defense += this.defense();
                }
                autoBattle.trimp.poisonMod += this.poisonMod();
            },
            startPrice: 5e6,
            priceMod: 10
        },
        Metal_Suit: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 138,
            description: function(){
                return "+" + prettify(this.defense()) + " Defense, +" + prettify(this.health()) + " Health, +" + prettify(this.resist()) + "% Bleed Resist. If Huffy has an item that can create a Bleed, gain +" + prettify(this.attack()) + " Attack."
            },
            upgrade: "+30 Defense, +1000 Health, +20% Bleed Resist, +5 Attack",
            attack: function(){
                return 10 + (5 * this.level);
            },
            defense: function(){
                return (-10 + (this.level * 30));
            },
            health: function(){
                return (-500 + (this.level * 1000));
            },
            resist: function(){
                return 30 + (20 * this.level);
            },
            doStuff: function(){
                if (autoBattle.items.Rusty_Dagger.equipped || autoBattle.items.Big_Cleaver.equipped) autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.bleedResist += this.resist();
            },
            priceMod: 10,
            startPrice: 6e6
        },
        Nozzled_Goggles: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 140,
            description: function(){
                return "The Enemy is always Shocked, taking at least " + prettify(this.shockMod() * 100) + "% more damage. +" + prettify(this.health()) + " Health, +" + prettify(this.resist()) +  "% Poison Resist, +3 Maximum Poison Stacks.";
            },
            upgrade: "+20% PermaShock Damage, +1000 Health, 20% Poison Resist",
            shockMod: function(){
                return (0.2 * this.level);
            },
            health: function(){
                return (-500 + (this.level * 1000));
            },
            resist: function(){
                return (20 * this.level);
            },
            doStuff: function(){
                var enemy = autoBattle.enemy;
                if (enemy.shock.time <= 0 || enemy.shock.mod < this.shockMod()){
                    enemy.shock.time = 9999999;
                    enemy.shock.mod = this.shockMod();
                }
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.poisonResist += this.resist();
                autoBattle.trimp.poisonStack += 3;
            },
            startPrice: 7e6,
            priceMod: 10
        },
        Sundering_Scythe: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 143,
            description: function(){
                return "-" + prettify((1 - this.attackTime()) * 100) + "% Attack Time, +" + prettify(this.attack()) + " Attack, +" + prettify(this.health()) + " Health, +" + prettify(this.lifesteal() * 100) + "% Lifesteal. Your Shocks last a maximum of 10 seconds, and your Bleeds can be reapplied when below 5 seconds.";
            },
            upgrade: "-5% Attack Time, +5 Attack, +250 Health, +5% Lifesteal",
            attackTime: function(){
                return 0.842 * Math.pow(0.95, this.level);
            },
            attack: function(){
                return 15 + (5 * this.level);
            },
            health: function(){
                return 500 + (250 * this.level);
            },
            lifesteal: function(){
                return 0.15 + (0.05 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attackSpeed *= this.attackTime();
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.lifesteal += this.lifesteal();
            },
            startPrice: 15e6,
            priceMod: 10
        },
        //Shank 145
        Plague_Bringer: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 148,
            description: function(){
                return "Your Poisons tick +" + prettify((1 - this.tickMult()) * 100) + "% faster. +" + prettify(this.eachPoison()) + " Poison Damage for every percentage point of Bleed or Shock resist on the Enemy. Heal for " + prettify(this.healAmt()) + " per stack of Poison when your Poisons deal damage." 
            },
            upgrade: "+2% Poison Tick Rate, +0.05 Poison Damage per Enemy Resist, +5 Heal on Poison Tick",
            tickMult: function(){
                return 0.816 * Math.pow(0.98, this.level);
            },
            eachPoison: function(){
                return 0.05 + (0.05 * this.level);
            },
            healAmt: function(){
                return 5 + (5 * this.level);
            },
            poisonMod: function(){
                var res = autoBattle.enemy.bleedResist + autoBattle.enemy.shockResist;
                return Math.floor(res * this.eachPoison());
            },
            doStuff: function(){
                autoBattle.trimp.poisonMod += this.poisonMod();
                autoBattle.trimp.poisonTick *= this.tickMult();
                autoBattle.trimp.poisonHeal += this.healAmt();
            },
            startPrice: 70e6,
            priceMod: 10
        },
        Very_Large_Slime: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 150,
            description: function(){
                return "Can create a Poison for 20 seconds. +" + prettify(this.poisonChance()) + "% Poison Chance, +" + prettify(this.poisonMod()) + " Poison Damage, +" + prettify(this.defense()) + " Defense, +" + prettify(this.health()) + " Health. Every third hit against an Enemy with Max Poison Stacks adds another Max Stack (up to +" + prettify(this.maxStacks()) + " Max Stacks)."; 
            },
            upgrade: "+15% Poison Chance, +20 Poison Damage, +50 Defense, +500 Health, +2 Max Stacks",
            poisonChance: function(){
                return 35 + (15 * this.level);
            },
            poisonMod: function(){
                return 10 + (20 * this.level);
            },
            defense: function(){
                return 50 + (50 * this.level);
            },
            health: function(){
                return 500 + (500 * this.level);
            },
            maxStacks: function(){
                return 8 + (this.level * 2);
            },
            doStuff: function(){
                autoBattle.trimp.poisonChance += this.poisonChance();
                autoBattle.trimp.poisonMod += this.poisonMod();
                if (autoBattle.trimp.poisonTime < 20000) autoBattle.trimp.poisonTime = 20000;
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.poisonStack += Math.min(this.maxStacks(), Math.floor(autoBattle.enemy.poison.hitsAtMax / 3));
            },
            startPrice: 100e6,
            priceMod: 10
        },
        //Monkimp Paw, 155
        Grounded_Crown: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 160,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + prettify(this.shockMod() * 100) + "% Shock Damage, +" + prettify(this.defense()) + " Defense, +" + prettify(this.health()) + " Health. If the Enemy is Poisoned or Bleeding, Huffy loses 20% of his Max Health per second.";
            },
            upgrade: "+50 Attack, +50% Shock Damage, +50 Defense, +1000 Health",
            attack: function(){
                return 50 + (50 * this.level);
            },
            shockMod: function(){
                return 0.5 + (0.5 * this.level);
            },
            defense: function(){
                return (50 * this.level);
            },
            health: function(){
                return 500 + (1000 * this.level);
            },
            afterCheck: function(){
                if (autoBattle.enemy.poison.time > 0 || autoBattle.enemy.bleed.time > 0){
                    var mod = 20 / autoBattle.frameTime;
                    autoBattle.trimp.health -= (autoBattle.trimp.maxHealth * mod * autoBattle.trimp.damageTakenMult);
                    if (autoBattle.trimp.health < 0.01) autoBattle.trimp.health = 0;
                }
            },
            doStuff: function(){
                
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.maxHealth += this.health();
            },
            startPrice: 650e6,
            priceMod: 10
        },
        Fearsome_Piercer: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 165,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + prettify(this.lifesteal() * 100) + "% Lifesteal, +" + prettify(this.bleedMod() * 100) + "% Bleed Damage, +" + prettify(this.bleedChance()) + "% Bleed Chance. If you have an item that can cause a Bleed, the Enemy starts combat with 25% less Max Health."
            },
            upgrade: "+75 Attack, +10% Lifesteal, +75% Bleed Damage, +50% Bleed Chance",
            attack: function(){
                return 125 + (75 * this.level);
            },
            lifesteal: function(){
                return 0.3 + (0.1 * this.level);
            },
            bleedMod: function(){
                return 0.25 + (0.75 * this.level);
            },
            bleedChance: function(){
                return 25 + (50 * this.level);
            },
            onEnemy: function(){
                if (autoBattle.items.Rusty_Dagger.equipped || autoBattle.items.Big_Cleaver.equipped || autoBattle.items.Bag_of_Nails.equipped || autoBattle.items.Doppelganger_Diadem.equipped){
                    autoBattle.enemy.baseHealth *= 0.75;
                    autoBattle.enemy.maxHealth *= 0.75;
                    autoBattle.enemy.health = autoBattle.enemy.maxHealth;
                }
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.lifesteal += this.lifesteal();
                autoBattle.trimp.bleedMod += this.bleedMod();
                autoBattle.trimp.bleedChance += this.bleedChance();
            },
            startPrice: 1.5e9,
            priceMod: 10
        },
        Bag_of_Nails: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 168,
            startPrice: 2.7e9,
            priceMod: 10,
            description: function(){
                return "Can create a Bleed on the Enemy for 10 seconds. Enemies are unaffected by your Slow Aura, but deal 25% less damage while Bleeding. +" + prettify(this.attack()) + " Attack, +" + prettify(this.bleedMod() * 100) + "% Bleed Damage, +" + prettify(this.health()) + " Health."
            },
            upgrade: "+100 Attack, +75% Bleed Damage, +500 Health",
            attack: function(){
                return 150 + (this.level * 100);
            },
            bleedMod: function(){
                return 1.25 + (0.75 * this.level);
            },
            health: function(){
                return 500 + (500 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.bleed.time > 0){
                    autoBattle.enemy.attack *= 0.75;
                    autoBattle.enemy.noSlow = true;
                }
                else autoBattle.enemy.noSlow = false;
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.bleedMod += this.bleedMod();
                autoBattle.trimp.maxHealth += this.health();
                if (autoBattle.trimp.bleedTime <= 10000) autoBattle.trimp.bleedTime = 10000;
            }
        },
        Blessed_Protector: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 170,
            description: function(){
                return "+" + prettify(this.health()) + " Health, +" + prettify(this.defense()) + " Defense, +" + prettify(this.lifesteal() * 100) + "% Lifesteal. Huffy gains 0.5% increased Attack for each % of his missing Health. When Huffy is below 50% Health, take 30% less damage from all sources. " 
            },
            upgrade: "+1000 Health, +100 Defense, +25% Lifesteal",
            health: function(){
                return 1000 + (1000 * this.level);
            },
            defense: function(){
                return 100 + (100 * this.level);
            },
            lifesteal: function(){
                return 0.25 + (0.25 * this.level);
            },
            afterCheck: function(){
                if (autoBattle.trimp.health <= 0) return;
                var healthPct = autoBattle.trimp.health / autoBattle.trimp.maxHealth;
                if (healthPct < 0.5){
                    autoBattle.trimp.damageTakenMult *= 0.7;
                }
                if (healthPct < 1){
                    var boost = (1 - healthPct);
                    boost = (1 + (boost * 0.5));
                    autoBattle.trimp.attack *= boost;
                }
            },
            doStuff: function(){
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.lifesteal += this.lifesteal();
            },
            startPrice: 4e9,
            priceMod: 10
        },
        The_Doomspring:{
            description: function(){
                var stack = prettify((1 - this.attackTime()) * 100);
                return "+" + prettify(this.health()) + " Health, -" + stack + "% Attack Time. For every 15000 damage taken this battle, -" + stack + "% more Attack Time. Stacks up to " + this.stacks() + " times.";
            },
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 180,
            upgrade: "-5% Attack Time, +1500 Health, +1 stacks",
            attackTime: function(){
                return 0.842 * Math.pow(0.95, this.level);
            },
            health: function(){
                return 1500 + (1500 * this.level);
            },
            stacks: function(){
                return 2 + this.level;
            },
            doStuff: function(){
                var stacks = Math.floor(autoBattle.trimp.dmgTaken / 15000) + 1;
                var maxStacks = this.stacks();
                if (stacks > maxStacks) stacks = maxStacks;
                autoBattle.trimp.attackSpeed *= Math.pow(this.attackTime(), stacks);
                autoBattle.trimp.maxHealth += this.health();
            },
            dustType: "shards",
            startPrice: 22,
            priceMod: 15
        },
        Snimp__Fanged_Blade: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 185,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + this.poisonStack() + " Max Poison Stacks. If the enemy is Poisoned, +" + prettify(this.bleedMod() * 100) + "% Bleed Damage. If the enemy is Bleeding, +" + prettify(this.poisonMod()) + " Poison Damage.";
            },
            upgrade: "+250 Attack, +5 Max Poison Stacks, +200% Bleed Damage, +250 Poison Damage",
            attack: function(){
                return 250 + (250 * this.level);
            },
            poisonMod: function(){
                return 250 * this.level;
            },
            bleedMod: function(){
                return 1 + (2 * this.level);
            },
            poisonStack: function(){
                return 5 * this.level;
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.poisonStack += this.poisonStack();
                if (autoBattle.enemy.poison.time > 0) autoBattle.trimp.bleedMod += this.bleedMod();
                if (autoBattle.enemy.bleed.time > 0) autoBattle.trimp.poisonMod += this.poisonMod();
            },
            dustType: "shards",
            startPrice: 159,
            priceMod: 15
        },
        //Dopp signet 190
        Wrath_Crafted_Hatchet:{
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 195,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + prettify(this.health()) + " Health, +" + prettify(this.defense()) + " Defense, -" + prettify((1 - this.attackTime()) * 100) + "% Attack Time.";
            },
            upgrade: "+750 Attack, +2000 Health, +200 Defense, -5% Attack Time",
            attack: function(){
                return 1250 + (750 * this.level);
            },
            attackTime: function(){
                return 0.842 * Math.pow(0.95, this.level);
            },
            health: function(){
                return 2000 + (2000 * this.level);
            },
            defense: function(){
                return 200 + (200 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.attackSpeed *= this.attackTime();
                autoBattle.trimp.defense += this.defense();
            },
            dustType: "shards",
            startPrice: 400,
            priceMod: 15
        },
        //basket of souls 200
        Goo_Golem: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 205,
            description: function(){
                return "+" + prettify(this.health()) + " Health, +" + prettify(this.poisonMod()) + " Poison Damage, +" + prettify(this.poisonStack()) + " Max Poison Stacks. If the Enemy is Poisoned, all damage Huffy takes is stored in the Golem, and Huffy takes 10% of the Golem's stored damage every second.";
            },
            upgrade: "+1000 Health, +400 Poison Damage, +5 Max Poison Stacks",
            health: function(){
                return 2000 + (1000 * this.level);
            },
            poisonMod: function(){
                return 400 * this.level;
            },
            poisonStack: function(){
                return 5 + (5 * this.level);
            },
            active: function(){
                if (this.equipped && autoBattle.enemy.poison.time > 0) return true;
                return false;
            },
            doStuff: function(){
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.poisonMod += this.poisonMod();
                autoBattle.trimp.poisonStack += this.poisonStack();
                if (autoBattle.battleTime > autoBattle.trimp.lastGoo + 1000){     
                    if (autoBattle.trimp.lastGoo == -1) autoBattle.trimp.lastGoo = autoBattle.battleTime;
                    else autoBattle.trimp.lastGoo += 1000;
                    var dmg = autoBattle.trimp.gooStored * 0.1;
                    autoBattle.trimp.gooStored -= dmg;
                    autoBattle.damageCreature(autoBattle.trimp, dmg, true);
                }
            },
            dustType: "shards",
            startPrice: 2500,
            priceMod: 15
        },
        Omni_Enhancer: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 210,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + prettify(this.bleedMod() * 100) + "% Bleed Damage, +" + prettify(this.shockMod() * 100) + "% Shock Damage, +" + prettify(this.poisonMod()) + " Poison Damage, +1 Poison Stack Rate, and Poisons tick 10% faster.";
            },
            upgrade: "+2500 Attack, +300% Bleed Damage, +300% Shock Damage, +1000 Poison Damage",
            attack: function(){
                return 2500 + (2500 * this.level);
            },
            bleedMod: function(){
                return 4 + (3 * this.level);
            },
            shockMod: function(){
                return 4 + (3 * this.level);
            },
            poisonMod: function(){
                return (1000 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.bleedMod += this.bleedMod();
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.poisonMod += this.poisonMod();
                autoBattle.trimp.poisonTick *= 0.9;
                autoBattle.trimp.poisonRate++;
            },
            dustType: "shards",
            startPrice: 6300,
            priceMod: 15
        },
        //stormbringer 215
        Box_of_Spores: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 220,
            description: function(){
            return "If the Enemy dies while Poisoned after never Bleeding, it drops " + this.dustMult() + "x more Dust.";
            },
            upgrade: "+1x Dust",
            dustMult: function(){
                return 4 + this.level;
            },
            dustType: "shards",
            startPrice: 60000,
            priceMod: 15
        },
        //nullifium armor 225
        //Myco Mitts 230
        Haunted_Harpoon: { 
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 235,
            description: function(){
                return "+" + prettify(this.health()) + " Health. If the Enemy is Bleeding and has been alive for at least 5 seconds, Huffy gains " + prettify(this.attack()) + " Attack, and the Enemy takes an additional " + prettify(this.bleedTickMult() * 100) + "% of its Bleed damage every second."
            },
            upgrade: "+10,000 Attack, +5000 Health, +100% of Bleed Damage taken per second",
            health: function(){
                return 5000 + (5000 * this.level);
            },
            bleedTickMult: function(){
                return 9 + this.level;
            },
            attack: function(){
                return 15000 + (10000 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.bleed.time > 0 && autoBattle.battleTime > 5000) autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.maxHealth += this.health();
            },
            afterCheck: function(){
                if (autoBattle.enemy.bleed.time > 0 && autoBattle.battleTime > 5000){
                    var bdamage = autoBattle.getBleedDamage(autoBattle.enemy, autoBattle.trimp);
                    var pct = this.bleedTickMult() * (autoBattle.frameTime / 1000);
                    bdamage *= pct;
                    autoBattle.damageCreature(autoBattle.enemy, bdamage);
                    
                }
            },
            dustType: "shards",
            startPrice: 15e5,
            priceMod: 20
        },
        //Dopp Diadem 250
        //Final calc items
        //After all shock resist
        Stormbringer: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 215,
            description: function(){
                return "The Enemy loses all Shock Resistance, adding it instead to Bleed Resistance. +" + prettify(this.shockMod() * 100) + "% Shock Damage, +" + prettify(this.poisonMod()) + " Poison Damage.";
            },
            upgrade: "+500% Shock Damage, +5000 Poison Damage",
            shockMod: function(){
                return 10 + (5 * this.level);
            },
            poisonMod: function(){
                return 5000 + (5000 * this.level);
            },
            doStuff: function(){
                autoBattle.enemy.bleedResist += autoBattle.enemy.shockResist;
                autoBattle.enemy.shockResist = 0;
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.poisonMod += this.poisonMod();
            },
            dustType: "shards",
            startPrice: 20000,
            priceMod: 15
        },
        Bad_Medkit: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 84,
            description: function(){
                return "Causes Bleeds you generate from other items to last at least " + this.bleedTime() + " seconds. +" + prettify(this.bleedChance()) + "% Bleed Chance. +" + prettify(this.lifesteal() * 100) + "% Lifesteal if the enemy is Bleeding.";
            },
            upgrade: "+1s Minimum Bleed Time, +4% Bleed Chance, +2.5% Lifesteal",
            bleedTime: function(){
                return 11 + (1 * this.level);
            },
            lifesteal: function(){
                return 0.175 + (0.025 * this.level);
            },
            bleedChance: function(){
                return 21 + (this.level * 4);
            },
            doStuff: function(){
                if (autoBattle.trimp.bleedTime > 0 && autoBattle.trimp.bleedTime < (this.bleedTime() * 1000)) autoBattle.trimp.bleedTime = this.bleedTime() * 1000;
                if (autoBattle.enemy.bleed.time > 0) autoBattle.trimp.lifesteal += this.lifesteal();
                autoBattle.trimp.bleedChance += this.bleedChance();
            },
            startPrice: 300
        },
        Putrid_Pouch: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 78,
            description: function(){
                return "-10% Attack Time and +" + prettify(this.defense()) + " Defense if the Enemy is Poisoned. Causes Poisons you generate from other items to last at least " + prettify(this.poisonTime() / 1000) + " seconds. +" + prettify(this.poisonChance()) + "% Poison Chance.";
            },
            upgrade: "+1s Poison Duration, +6% Poison Chance, +3 Defense",
            poisonTime: function(){
                return 19000 + (this.level * 1000);
            },
            poisonChance: function(){
                return 14 + (this.level * 6);
            },
            defense: function(){
                return 7 + (3 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.poison.time > 0){
                    autoBattle.trimp.attackSpeed *= 0.9;
                    autoBattle.trimp.defense += this.defense();
                }
                var poisonTime = this.poisonTime();
                if (autoBattle.trimp.poisonTime > 0 && autoBattle.trimp.poisonTime < poisonTime) autoBattle.trimp.poisonTime = poisonTime;
                autoBattle.trimp.poisonChance += this.poisonChance();
            },
            startPrice: 150,
            priceMod: 4
        },
        Raincoat: { //After all bleed chance
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 75,
            description: function(){
                return "If you have a chance to cause Bleeding, gain +" + prettify(this.defense()) + " Defense, +" + prettify(this.health()) + " Health, +" + prettify(this.lifesteal() * 100) + "% Lifesteal, and +" + prettify(this.bleedDamage() * 100) + "% Bleed Damage.";
            },
            upgrade: "+2 defense, +20 health, +2.5% Lifesteal, +10% Bleed Damage",
            defense: function(){
                return 4 + (this.level * 2);
            },
            health: function(){
                return 20 + (20 * this.level);
            },
            lifesteal: function(){
                return 0.125 + (0.025 * this.level)
            },
            bleedDamage: function(){
                return 0.2 + (0.1 * this.level);
            },
            doStuff: function(){
                var bleedChance = autoBattle.trimp.bleedChance;
                if (autoBattle.items.Sacrificial_Shank.equipped) bleedChance = Math.floor(bleedChance * 0.75);
                if (bleedChance > autoBattle.enemy.bleedResist && (autoBattle.trimp.bleedTime > 0 || autoBattle.items.Doppelganger_Diadem.equipped) && autoBattle.trimp.bleedMod > 0){
                    autoBattle.trimp.defense += this.defense();
                    autoBattle.trimp.maxHealth += this.health();
                    autoBattle.trimp.lifesteal += this.lifesteal();
                    autoBattle.trimp.bleedMod += this.bleedDamage();
                }
            },
            startPrice: 100,
            priceMod: 4
        },
        Labcoat: { //after all poison chance
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 90,
            description: function(){
                return "If you have a chance to cause Poison, gain +" + prettify(this.health()) + " Health, -" + prettify((1 - this.attackTime()) * 100) + "% Attack Time, and +" + prettify(this.poisonMod()) + " Poison Damage.";
            },
            upgrade: "+25 Health, -1% Attack Time, +1 Poison Damage",
            health: function(){
                return 25 + (25 * this.level);
            },
            attackTime: function(){
                return Math.pow(0.99, this.level);
            },
            poisonMod: function(){
                return 1 + this.level;
            },
            doStuff: function(){
                var poisonChance = autoBattle.trimp.poisonChance;
                if (autoBattle.items.Sacrificial_Shank.equipped) poisonChance = Math.floor(poisonChance * 0.75);
                if (poisonChance > autoBattle.enemy.poisonResist && autoBattle.trimp.poisonMod > 0 && autoBattle.trimp.poisonTime > 0){
                    autoBattle.trimp.maxHealth += this.health();
                    autoBattle.trimp.attackSpeed *= this.attackTime();
                    autoBattle.trimp.poisonMod += this.poisonMod();
                }
            },
            startPrice: 1500,
            priceMod: 4.5
        },
        Aegis: { //after all health
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 118,
            description: function(){
                return "+" + this.defenseEffect() + " Defense. If Huffy's Health % is higher than Enemy Health %, gain +" + prettify(this.shockChance()) + "% Shock Chance, +" + prettify(this.shockMod() * 100) + "% Shock Damage, 15s Shock Time. Otherwise, this item's Defense is doubled and gain +" + prettify(this.lifestealEffect() * 100) + "% Lifesteal.";
            },
            upgrade: "+4 Defense, +10% Shock Chance, +10% Shock Damage, +10% Lifesteal",
            defenseEffect: function(){
                return 6 + (4 * this.level);
            },
            shockChance: function(){
                return 15 + (10 * this.level);
            },
            shockMod: function(){
                return 0.15 + (0.1 * this.level);
            },
            lifestealEffect: function(){
                return 0.05 + (0.1 * this.level);
            },
            doStuff: function(){
                var hufPct = autoBattle.trimp.health / autoBattle.trimp.maxHealth;
                var enemyPct = autoBattle.enemy.health / autoBattle.enemy.maxHealth;
                if (hufPct > enemyPct){
                    autoBattle.trimp.shockChance += this.shockChance();
                    autoBattle.trimp.shockMod += this.shockMod();
                    if (autoBattle.trimp.shockTime < 15000) autoBattle.trimp.shockTime = 15000;
                    autoBattle.trimp.defense += this.defenseEffect();
                }
                else{
                    autoBattle.trimp.lifesteal += this.lifestealEffect();
                    autoBattle.trimp.defense += (this.defenseEffect() * 2);
                }
            },
            priceMod: 8,
            startPrice: 65000,
        },
        Sacrificial_Shank: { //after all status chances
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 145,
            enemyReduced: 0,
            description: function(){
                return "Multiply Huffy's and the Enemy's highest status effect chance (before resists) by 0.75. -" + prettify((1 - this.attackTime()) * 100) + "% Attack Time, +" + prettify(this.resist()) + "% to all Resists, and +" + prettify(this.lifesteal() * 100) + "% Lifesteal per 10% Huffy or Enemy status chance lost.";
            },
            upgrade: "-1% Attack Time, +1% Resists, +1% Lifesteal per 10% status chance lost",
            attackTime: function(){
                return Math.pow(0.99, this.level);
            },
            resist: function(){
                return (1 * this.level);
            },
            lifesteal: function(){
                return (0.01 * this.level);
            },
            onEnemy: function(){
                var toReduce = ["poisonChance", "bleedChance", "shockChance"];
                var totalReduce = 0;
                var highestElem = "";
                var highestChance = 0;
                for (var x = 0; x < toReduce.length; x++){
                    var name = toReduce[x];
                    if (autoBattle.enemy[name] > highestChance) {
                        highestChance = autoBattle.enemy[name];
                        highestElem = name;
                    }
                }
                var thisReduce = autoBattle.enemy[highestElem] * 0.25;
                if (thisReduce > 0){
                    autoBattle.enemy[highestElem] -= thisReduce;
                    totalReduce += thisReduce;
                }
                this.enemyReduced = totalReduce;
            },
            doStuff: function(){
                var toReduce = ["poisonChance", "bleedChance", "shockChance"];
                var totalReduce = this.enemyReduced;
                var highestElem = "";
                var highestChance = 0;
                for (var x = 0; x < toReduce.length; x++){
                    var name = toReduce[x];
                    if (autoBattle.trimp[name] > highestChance) {
                        highestChance = autoBattle.trimp[name];
                        highestElem = name;
                    }
                }
                var thisReduce = autoBattle.trimp[highestElem] * 0.25;
                if (thisReduce > 0){
                    autoBattle.trimp[highestElem] -= thisReduce;
                    totalReduce += thisReduce;
                }
                totalReduce = Math.floor(totalReduce / 10);
                if (totalReduce <= 0) return;
                autoBattle.trimp.attackSpeed *= Math.pow(this.attackTime(), totalReduce);
                autoBattle.trimp.lifesteal += (this.lifesteal() * totalReduce);
                autoBattle.trimp.poisonResist += (this.resist() * totalReduce);
                autoBattle.trimp.bleedResist += (this.resist() * totalReduce);
                autoBattle.trimp.shockResist += (this.resist() * totalReduce);
            },
            startPrice: 2500000,
            priceMod: 4
        },
        Basket_of_Souls: { //after all additive lifesteal and health (before monkimp)
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 200,
            description: function(){
                return "+" + prettify(this.health()) + " Health, +" + prettify(this.defense()) + " Defense, +" + prettify(this.lifesteal() * 100) + "% Lifesteal, +" + prettify(this.bleedMod() * 100) + "% Bleed Damage, +" + prettify(this.shockMod() * 100) + "% Shock Damage. Multiplies Huffy's Max Health by his Lifesteal value, then multiplies his Lifesteal by 0.5."
            },
            upgrade: "+1000 Health, +300 Defense, +100% Lifesteal, +200% Bleed Damage, +200% Shock Damage",
            health: function(){
                return 2000 + (1000 * this.level);
            },
            defense: function(){
                return 300 + (200 * this.level);
            },
            lifesteal: function(){
                return 2 + (this.level);
            },
            bleedMod: function(){
                return 3 + (2 * this.level);
            },
            shockMod: function(){
                return 3 + (2 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.lifesteal += this.lifesteal();
                autoBattle.trimp.bleedMod += this.bleedMod();
                autoBattle.trimp.shockMod += this.shockMod();
                if (autoBattle.items.Monkimp_Paw.equipped) autoBattle.trimp.lifesteal *= 0.75; //monkimp paw special interaction
                autoBattle.trimp.maxHealth *= autoBattle.trimp.lifesteal;
                autoBattle.trimp.lifesteal *= 0.5;
            },
            dustType: "shards",
            startPrice: 1000,
            priceMod: 15
            
        },
        Monkimp_Paw: { //after basket of souls
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 155,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, removes a fourth of your total Lifesteal."
            },
            upgrade: "+100 Attack",
            attack: function(){
                return (100 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                if (!autoBattle.items.Basket_of_Souls.equipped) autoBattle.trimp.lifesteal *= 0.75; //basket of souls special interaction
                if (autoBattle.trimp.lifesteal < 0) autoBattle.trimp.lifesteal = 0;
            },
            startPrice: 200e6,
            priceMod: 10
        },
        Spiked_Gloves: { //after all attack
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 108,
            description: function(){
                return "+" + this.formatEffect() + "% Attack damage.";
            },
            upgrade: "+5% attack damage",
            formatEffect: function(){
                return prettify(this.effect() * 100);
            },
            effect: function(){
                return .2 + (0.05 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attack *= (1 + this.effect());
            },
            startPrice: 10000,
            priceMod: 6,
        },
        //after all attack and health
        Nullifium_Armor: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 225,
            description: function(){
            return "Huffy gains +" + prettify((this.statMult() -1) * 100) + "% Health, and +" + prettify((this.statMult() -1) * 100) + "% Attack. If the Enemy is not Poisoned, gain " + prettify(this.lifesteal() * 100) + "% Lifesteal.";
            },
            upgrade: "+50% Attack, Health, and Lifesteal",
            statMult: function(){
                return 4.5 + (this.level * 0.5);
            },
            lifesteal: function(){
                return 1.5 + (this.level * 0.5);
            },
            doStuff: function(){
                if (autoBattle.enemy.poison.time <= 0) autoBattle.trimp.lifesteal += this.lifesteal();
                autoBattle.trimp.maxHealth *= this.statMult();
                autoBattle.trimp.attack *= this.statMult();
            },
            dustType: "shards",
            startPrice: 200000,
            priceMod: 20
        },
        Doppelganger_Diadem: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 250,
            description: function(){
                return "Can create a Bleed on the Enemy for 10 seconds. 2x Attack if the Signet is equipped, x2 again if Doppelganger is alive. Doppelganger has 50% more health and can resurrect once per fight.";
            },
            doStuff: function(){
                if (autoBattle.trimp.bleedTime <= 10000) autoBattle.trimp.bleedTime = 10000;
                if (autoBattle.items.Doppelganger_Signet.equipped){
                    autoBattle.trimp.attack *= 2;
                    if (!autoBattle.trimp.doppDown) autoBattle.trimp.attack *= 2;
                    if (typeof autoBattle.trimp.doppLives === 'undefined') autoBattle.trimp.doppLives = 1;
                }

            },
            noUpgrade: true,
            dustType: "shards",
        },
        Doppelganger_Signet: { //actual final attack item
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 190,
            longText: true,
            description: function(){
                return "Summon a Doppelganger which grants you 50% damage reduction, 2x Attack, and +1 Poison Stack Rate while it is alive. Your Doppelganger will explode after taking damage equal to your Max Health or if it would kill the Enemy, redealing all damage dealt so far this fight, and shredding 50% Enemy Defense.";
            },
            onDeath: function(){
                var damageDealt = autoBattle.enemy.dmgTaken;
                autoBattle.damageCreature(autoBattle.enemy, damageDealt, false, true);
                autoBattle.enemy.defense *= 0.5;
                if (autoBattle.trimp.doppLives) autoBattle.trimp.doppLives--;
                else autoBattle.trimp.doppDown = true;
            },
            doppHealth: function(){
                var healthAmt = autoBattle.trimp.maxHealth;
                if (autoBattle.items.Doppelganger_Diadem.equipped){
                    healthAmt *= 1.5;
                    if (!autoBattle.trimp.doppLives) healthAmt *= 2;
                }
                return healthAmt;
            },
            explodeDmg: function(){
                var damageAmt = autoBattle.enemy.dmgTaken;
                if (autoBattle.items.Doppelganger_Diadem.equipped && autoBattle.trimp.doppLives == 1) damageAmt *= 3;
                return damageAmt;
            },
            doStuff: function(){
                if (autoBattle.trimp.doppDown) return;
                autoBattle.trimp.attack *= 2;
                autoBattle.trimp.damageTakenMult *= 0.5;
                autoBattle.trimp.poisonRate++;
                if (autoBattle.trimp.dmgTaken >= this.doppHealth() || this.explodeDmg() >= autoBattle.enemy.health) this.onDeath();
            },
            noUpgrade: true,
            dustType: "shards"
        },
        //Final Poison Damage item
        Myco_Mitts: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 230,
            description: function(){
                return "Multiplies the damage dealt by Poison ticks by " + this.poisonMult() + "x."
            },
            upgrade: "+1x to Poison Damage multiplier",
            poisonMult: function(){
                return 2 + this.level;
            },
            doStuff: function(){
                autoBattle.trimp.poisonMod *= this.poisonMult();
            },
            startPrice: 5e5,
            priceMod: 20,
            dustType: "shards",
        },
        Gaseous_Greataxe: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 260,
            dustMult: function(){
                var mult = 0.75 + ((this.level - 1) * 0.01);
                if (mult > 1) mult = 1;
                return mult; 
            },
            description: function(){
                return "Multiplies your Poison Damage by your Bleed Damage or Shock Damage, whichever is higher. Doubles Poison Stack Rate. +" + prettify(this.maxStacks()) + " Max Poison Stacks. Every 10 seconds increases Max Poison stacks by 10% of this amount and increases Poison damage by 10% (compounding). Reduces Dust and Shard gains by " + Math.round((1 - this.dustMult()) * 100) + "%.";
            },
            upgrade: "+20% more (compounding) Max Poison Stacks, -1% to Dust Penalty",
            maxStacks: function(){
                return Math.floor(100 * Math.pow(1.2, this.level - 1));
            },
            doStuff: function(){
                var higherMod = (autoBattle.trimp.shockMod > autoBattle.trimp.bleedMod) ? autoBattle.trimp.shockMod : autoBattle.trimp.bleedMod;
                if (higherMod < 1) higherMod = 1;
                autoBattle.trimp.poisonMod *= higherMod;
                var timeStacks = Math.floor(autoBattle.battleTime / 10000);
                autoBattle.trimp.poisonMod *= Math.pow(1.1, timeStacks);
                autoBattle.trimp.poisonStack += Math.floor(this.maxStacks() * ((timeStacks + 10) * 0.1));
                autoBattle.trimp.poisonRate *= 2;
            },
            dustType: "shards",
            startPrice: 1e10,
            priceMod: 20
        },
        The_Fibrillator: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 270,
            description: function(){
                return "Multiplies Attack and Poison Damage by " + prettify(this.shockMod()) + "x. Adds " + prettify(this.shockMod() - 1) + " to this item's Attack and Poison Damage multplier for every 10 seconds the current shock on the enemy has lasted. Shocks last a minimum of 30 seconds (Overrides Sundering Scythe). Multiplies Health by " + prettify(this.healthMod()) + "x";
            },
            upgrade: "+0.05 to scaling Attack and Poison Multiplier, +0.25x Health",
            shockMod: function(){
                return 1.1 + ((this.level - 1) * 0.05);
            },
            healthMod: function(){
                return 2 + ((this.level - 1) * 0.25);
            },
            doStuff: function(){
                autoBattle.trimp.maxHealth *= this.healthMod();
                var shockSeconds = 0;
                if (autoBattle.enemy.shock.time > 0){
                    shockSeconds = (autoBattle.battleTime - autoBattle.enemy.shock.timeApplied) / 1000;
                    shockSeconds = Math.floor(shockSeconds / 10);
                    var shockMod = this.shockMod();
                    var toAdd = (shockMod - 1) * shockSeconds;
                    toAdd += shockMod;
                    autoBattle.trimp.attack *= toAdd;
                    autoBattle.trimp.poisonMod *= toAdd;
                }
            },
            dustType: "shards",
            startPrice: 1e12,
            priceMod: 20
        }

    },
    bonuses: {
        Extra_Limbs: {
            description: function(){
                return "Huffy can equip 1 additional item.<br/><br/>"
            },
            level: 0,
            price: 100,
            priceMod: 100
        },
        Radon: {
            description: function(){
                return "Increase all Radon earned by +10% per level.<br/>"
            },
            getMult: function(){
                return 1 + (this.level * 0.1);
            },
            level: 0,
            price: 30000,
            priceMod: 3,
            max: 50
        },
        Stats: {
            description: function(){
                return "Increases Attack and Health in U2 by +10% per level.<br/>"
            },
            getMult: function(){
                return 1 + (this.level * 0.1);
            },
            level: 0,
            price: 20000,
            priceMod: 3,
            max: 50
        },
        Scaffolding: {
            description: function(){
                return "Each level adds +100% Housing and increases the bonus of all other Scaffolds by 10%."
            },
            getMult: function(){
                return 1 + (this.level * Math.pow(1.1, this.level - 1))
            },
            level: 0,
            price: 50,
            useShards: true,
            priceMod: 10,
            max: 18
        }
    },
    oneTimers: {
        Gathermate: {
            get description(){
                return "Gather 5% more Food, Wood, and Metal in U2 for each Spire Assault level cleared.";
            },
            owned: false,
            getMult: function(){
                return 1 + (0.05 * (autoBattle.maxEnemyLevel - 1));
            },
            requiredItems: 7
        },
        Smithriffic: {
            description: "Get an extra Smithy when completing Melting Point.",
            owned: false,
            requiredItems: 11
        },
        Championism: {
            description: "Unlock a new Perk!",
            owned: false,
            onPurchase: function(){
                game.portal.Championism.radLocked = false;
            },
            requiredItems: 15
        },
        Master_of_Arms: {
            description: "Huffy gains +200 Health, +10 Attack, and +2 Poison Damage.",
            owned: false,
            requiredItems: 19
        },
        Artisan: {
            get description(){
                return "All U2 Equipment costs 1% less for each SA level cleared. (Currently " + prettify((1 - this.getMult()) * 100) + "% cheaper)";
            },
            owned: false,
            getMult: function(){
                return Math.pow(0.99, autoBattle.maxEnemyLevel - 1);
            },
            requiredItems: 21
        },
        Battlescruff: {
            description: "Increases all Scruffy XP gained by +2% for each Spire Assault level cleared.",
            owned: false,
            requiredItems: 23
        },
        Collectology: {
            description: "Collectors add 2 Hubs each PLUS another extra Hub for every 30 Spire Assault levels cleared.",
            owned: false,
            requiredItems: 28,
            getHubs: function(){
                return 2 + Math.floor((autoBattle.maxEnemyLevel - 1) / 30);
            }
        },
        Dusty_Tome: {
            description: "+5% Dust found on all levels per Spire Assault level cleared.",
            owned: false,
            requiredItems: 32
        },
        Whirlwind_of_Arms: {
            description: "+1000 Health, +25 Attack, +10 Poison Damage.",
            owned: false,
            requiredItems: 34
        },
        Nullicious: {
            description: "Increase the base Nu value of U2 Heirlooms by 0.5% per Spire Assault level cleared.",
            owned: false,
            requiredItems: 36,
            getMult: function(){
                return 1 + ((autoBattle.maxEnemyLevel - 1) * 0.005);
            }
        },
        Suprism: {
            description: "Increases Prismatic Shield by 3% per Spire Assault level cleared.",
            getMult: function(){
                return ((autoBattle.maxEnemyLevel -1) * 0.03);
            },
            owned: false,
            requiredItems: 39,
        },
        The_Ring: {
            description: "Unlock The Ring.",
            owned: false,
            requiredItems: 42,
            useShards: true,
            onPurchase: function(){
                document.getElementById('autoBattleRingBtn').style.display = 'inline-block';
            }
        },
        Mass_Hysteria: {
            description: "Frenzy is always active.",
            owned: false,
            requiredItems: 45,
            useShards: true
        },
        Burstier: {
            description: "Gamma Burst requires 1 fewer attack before triggering.",
            owned: false,
            requiredItems: 48,
            useShards: true
        },
        Expanding_Tauntimp: {
            description: "Starting after your next Portal, U2 Tauntimps will increase all Trimps gained by " + prettify(game.badGuys.Tauntimp.expandingBase() * 100) + "% per run instead of adding flat housing.",
            owned: false,
            requiredItems: 51,
            useShards: true
        },
        More_Expansion: {
            description: "Unlock the Expansion Perk, further increasing the power of your Tauntimps",
            owned: false,
            requiredItems: 53,
            owned: false,
            useShards: true,
            onPurchase: function(){
                game.portal.Expansion.radLocked = false;
            }
        }
    },
    fight: function(){
        if (!this.trimp || !this.enemy) this.resetCombat();
        this.enemy.lastAttack += this.frameTime;
        this.trimp.lastAttack += this.frameTime;

        this.enemy.maxHealth = this.enemy.baseHealth;
        this.trimp.maxHealth = this.trimp.baseHealth;
        this.enemy.attackSpeed = this.enemy.baseAttackSpeed;
        this.trimp.attackSpeed = this.trimp.baseAttackSpeed;
        this.trimp.attack = this.trimp.baseAttack;
        this.enemy.attack = this.enemy.baseAttack;

        this.trimp.shockChance = 0;
        this.trimp.shockMod = 0;
        this.trimp.shockTime = 0;
        
        this.trimp.bleedChance = 0;
        this.trimp.bleedMod = 0;
        this.trimp.bleedTime = 0;

        this.trimp.poisonChance = 0;
        this.trimp.poisonTime = 0;
        this.trimp.poisonMod = 0;
        this.trimp.poisonStack = 2;
        this.trimp.poisonTick = 1000;
        this.trimp.poisonHeal = 0;
        this.trimp.poisonRate = 1;

        this.trimp.shockResist = 0;
        this.trimp.poisonResist = 0;
        this.trimp.bleedResist = 0;

        this.trimp.defense = 0;
        this.trimp.lifesteal = 0;
        this.trimp.damageTakenMult = 1;
        this.trimp.slowAura = 1;

        this.trimp.dustMult = 0;
        
        this.checkItems();

        if (this.enemy.immune != ""){
            this.trimp[this.enemy.immune + "Chance"] = 0;
        }
        var trimpAttackTime = this.trimp.attackSpeed;
        if (this.trimp.lastAttack >= trimpAttackTime){
            this.trimp.lastAttack -= trimpAttackTime;
            this.attack(this.trimp, this.enemy);
        }
        this.checkPoison(this.trimp);
        if (this.trimp.bleed.time > 0) this.trimp.bleed.time -= this.frameTime;
        if (this.trimp.shock.time > 0) this.trimp.shock.time -= this.frameTime;
        if (this.enemy.health <= 0) {
            this.enemyDied();
            return;
        }
        if (this.trimp.health <= 0){
            this.trimpDied();
            return;
        }
        if (!this.enemy.noSlow) this.enemy.attackSpeed *= this.trimp.slowAura;
        var enemyAttackTime = this.enemy.attackSpeed;
        if (this.enemy.lastAttack >= enemyAttackTime){
            this.enemy.lastAttack -= enemyAttackTime;
            this.attack(this.enemy, this.trimp);
        }
        if (this.enemy.explodeFreq != -1){
            this.enemy.lastExplode += this.frameTime;
            if (this.enemy.lastExplode >= this.enemy.explodeFreq){
                this.enemy.lastExplode -= this.enemy.explodeFreq;
                var dmg = (this.enemy.explodeDamage * this.getAttack(this.enemy)) - this.trimp.defense;
                this.damageCreature(this.trimp, dmg);
            }
        }
        this.checkPoison(this.enemy);
        if (this.enemy.bleed.time > 0) this.enemy.bleed.time -= this.frameTime;
        if (this.enemy.shock.time > 0 && this.enemy.shock.time != 9999999) this.enemy.shock.time -= this.frameTime;
        if (this.trimp.health > this.trimp.maxHealth) this.trimp.health = this.trimp.maxHealth;
        if (this.enemy.health > this.enemy.maxHealth) this.enemy.health = this.enemy.maxHealth;
        if (this.trimp.health <= 0){
            this.trimpDied();
            return;
        }
        if (this.enemy.health <= 0) {
            this.enemyDied();
            return;
        }
    },
    checkItems: function(){
        if (this.oneTimers.Master_of_Arms.owned){
            this.trimp.maxHealth += 200;
            this.trimp.attack += 10;
            this.trimp.poisonMod += 2;
        }
        if (this.oneTimers.Whirlwind_of_Arms.owned){
            this.trimp.maxHealth += 1000;
            this.trimp.attack += 25;
            this.trimp.poisonMod += 10;
        }
        for (var x = 0; x < this.rings.mods.length; x++){
            var modObj = this.ringStats[this.rings.mods[x]];
            modObj.doStuff(this.getRingStatAmt(modObj));
        }
        var ringDmg = this.getRingStatusDamage();
        if (ringDmg > 0){
            ringDmg /= 100;
            this.trimp.bleedMod += ringDmg;
            this.trimp.shockMod += ringDmg;
            this.trimp.poisonMod += this.getRingPoisonDamage();
        }
        var ringChance = this.getRingStatusChance();
        if (ringChance > 0){
            this.trimp.bleedChance += ringChance;
            this.trimp.shockChance += ringChance;
            this.trimp.poisonChance += ringChance;
        }
        for (var item in this.items){
            var itemObj = this.items[item];
            if (!itemObj.equipped) continue;
            if (itemObj.doStuff)  itemObj.doStuff();
        }

        if (this.items.Sundering_Scythe.equipped && this.trimp.shockTime > 10000) this.trimp.shockTime = 10000;
        if (this.items.The_Fibrillator.equipped && this.trimp.shockTime > 0 && this.trimp.shockTime < 30000) this.trimp.shockTime = 30000;
        if (this.items.Blessed_Protector.equipped) this.items.Blessed_Protector.afterCheck(); //after anything that might hurt huffy
        if (this.items.Grounded_Crown.equipped) this.items.Grounded_Crown.afterCheck(); //just deals damage
        if (this.items.Haunted_Harpoon.equipped) this.items.Haunted_Harpoon.afterCheck(); //after anything that might increase the damage of huffy's bleeds
        
        this.trimp.attackSpeed *= this.enemy.slowAura;
        if (this.trimp.attackSpeed <= 500){
            this.trimp.slowAura += ((500 - this.trimp.attackSpeed) / 1000)
            this.trimp.attackSpeed = 500;
        }
    },
    damageCreature: function(creature, dmg, fromGoo, ignoreEth){
        dmg *= creature.damageTakenMult;
        if (creature.isEthereal && !ignoreEth) creature.health += dmg;
        else {
            if (!fromGoo && creature.isTrimp && this.items.Goo_Golem.equipped && this.items.Goo_Golem.active()){
                creature.gooStored += dmg;
            }
            else {
                creature.health -= dmg;
                creature.dmgTaken += dmg;
            }
        }
        return dmg;
    },
    checkPoison: function(creature){
        var opponent = creature.isTrimp ? this.enemy : this.trimp;
        if (creature.poison.time > 0){
            creature.poison.lastTick += this.frameTime;
            var tickTime = opponent.poisonTick;
            if (creature.poison.lastTick >= tickTime){
                var shockMod = 1;
                if (creature.shock.time > 0){
                    shockMod += creature.shock.mod;
                }
                creature.poison.lastTick -= tickTime;
                creature.poison.time -= tickTime;
                var dmg = (creature.poison.mod * creature.poison.stacks * shockMod)
                dmg = this.damageCreature(creature, dmg);
                if (opponent.poisonHeal) {
                    var healFor = (opponent.poisonHeal * creature.poison.stacks);
                    if (this.items.The_Globulator.equipped) healFor *= 2;
                    this.trimp.health += healFor;
                    if (this.trimp.health > this.trimp.maxHealth) this.trimp.health = this.trimp.maxHealth;
                }
                if (creature.poison.time <= 0){
                    creature.poison.time = 0;
                    creature.poison.mod = 0;
                    creature.poison.lastTick = 0;
                    creature.poison.stacks = 0;
                    creature.poison.expired = true;
                    creature.poison.hitsAtMax = 0;
                }
            }
        }
    },
    getAttack: function(fighterObj){
        if (fighterObj.isTrimp) return fighterObj.attack;
        return fighterObj.attack * this.getEnrageMult() * this.getBerserkMult();
    },
    getBerserkMult: function(){
        if (this.enemy.berserkMod == -1) return 1;
        return Math.pow(this.enemy.berserkMod, Math.floor(this.enemy.berserkStack / this.enemy.berserkEvery));
    },
    rollDamage: function(attacker){
        var baseAttack = this.getAttack(attacker);
        var attack = baseAttack * 0.2;
        var roll = Math.floor(Math.random() * 201);
        roll -= 100;
        roll /= 100;
        return (baseAttack + (attack * roll));
    },
    attack: function(attacker, defender){
        var damage = this.rollDamage(attacker);
        var shockMod = 1;
        if (defender.shock.time > 0){
            shockMod = (1 + defender.shock.mod);
            damage *= shockMod;
        }
        damage -= defender.defense;
        if (damage < 0) damage = 0;
        damage = this.damageCreature(defender, damage);
        var atkLifesteal = attacker.lifesteal - defender.lifestealResist;
        if (atkLifesteal > 0){
            attacker.health += (damage * atkLifesteal);
            if (attacker.health > attacker.maxHealth) attacker.health = attacker.maxHealth;
        }
        if (attacker.bleed.time > 0){
            var bdamage = this.getBleedDamage(attacker, defender);
            bdamage = this.damageCreature(attacker, bdamage);
            var defLifesteal = defender.lifesteal - attacker.lifestealResist;
            if (defLifesteal > 0){
                var healAmt = (bdamage * defLifesteal);
                if (defender.isTrimp && this.items.Recycler.equipped) healAmt *= 2;
                defender.health += healAmt;
                if (defender.health > defender.maxHealth) defender.health = defender.maxHealth;
            }
            if (attacker.bleed.time <= 0){
                attacker.bleed.time = 0;
                attacker.bleed.mod = 0;
            } 
        }
        var bleedChance = attacker.bleedChance - defender.bleedResist;
        if (bleedChance > 0 && attacker.bleedMod > 0 && attacker.bleedTime > 0 && (defender.bleed.time <= 0 || this.items.Sundering_Scythe.equipped && defender.bleed.time <= 5000)){
            var roll = Math.floor(Math.random() * 100);
            if (roll < bleedChance){
                if (this.items.Bloodstained_Gloves.equipped) this.items.Bloodstained_Gloves.onBleed();
                if (this.items.Bag_of_Nails.equipped) this.enemy.noSlow = true;
                if (defender.bleed.mod < attacker.bleedMod) defender.bleed.mod = (1 + attacker.bleedMod);
                if (defender.bleed.time < attacker.bleedTime) defender.bleed.time = attacker.bleedTime;
                if (defender.bleed.time > 0) defender.hadBleed = true;
            }
        }
        var poisonChance = attacker.poisonChance - defender.poisonResist;
        if (poisonChance > 0 && attacker.poisonMod > 0 && attacker.poisonTime > 0){
            var roll = Math.floor(Math.random() * 100);
            if (roll < poisonChance){
                if (defender.poison.time < attacker.poisonTime) defender.poison.time = attacker.poisonTime;
                var stackRate = attacker.poisonRate;
                for (var x = 0; x < stackRate; x++){
                    defender.poison.mod = attacker.poisonMod;
                    if (defender.poison.stacks < attacker.poisonStack){
                        defender.poison.stacks++;
                        if (attacker.isTrimp && this.items.The_Globulator.equipped) this.items.The_Globulator.onPoisonStack(defender.poison.stacks);
                    }
                    else defender.poison.hitsAtMax++;
                }
            }
        }
        var shockChance = attacker.shockChance - defender.shockResist;
        if (shockChance > 0 && attacker.shockMod > 0 && attacker.shockTime > 0 && (defender.shock.time <= 0 || (defender.shock.time == 9999999 && attacker.shockMod > defender.shock.mod))){
            var roll = Math.floor(Math.random() * 100);
            if (roll < shockChance){
                if (attacker.isTrimp && this.items.Eelimp_in_a_Bottle.equipped) defender.lastAttack = 0;
                defender.shock.time = attacker.shockTime;
                defender.shock.timeApplied = autoBattle.battleTime;
                defender.shock.mod = attacker.shockMod;
                defender.shock.count++;
            }
        }
        if (attacker.berserkMod != -1) attacker.berserkStack++;
        if (attacker.ethChance > 0) {
            var ethRoll = Math.floor(Math.random() * 100);
            if (ethRoll < attacker.ethChance) attacker.isEthereal = true;
            else attacker.isEthereal = false;
        }
    },
    getBleedDamage: function(attacker, defender){
        var attackerShock = 1;
        if (attacker.shock.time > 0){
            attackerShock = (1 + attacker.shock.mod);
        }
        var bdamage = this.getAttack(defender) * attacker.bleed.mod * attackerShock;
        bdamage -= attacker.defense;
        return bdamage;
    },
    resetCombat: function(resetStats){
        this.trimp = this.template();
        this.trimp.isTrimp = true;
        this.enemy = this.template();
        this.battleTime = 0;
        this.checkItems();
        this.trimp.health = this.trimp.maxHealth;
        this.enemy.level = this.enemyLevel;
        var atkSpdLevel = Math.min(this.enemyLevel, 29);
        this.enemy.baseAttackSpeed *= Math.pow(0.98, atkSpdLevel);
        if (this.enemyLevel >= 30){
            atkSpdLevel = this.enemyLevel - 29;
            this.enemy.slowAura = Math.pow(1.01, atkSpdLevel);
        }
        this.enemy.baseHealth *= Math.pow(1.205, (this.enemyLevel));
        this.enemy.baseAttack += (2 * (this.enemyLevel - 1));
        this.enemy.baseAttack *= Math.pow(1.04, this.enemyLevel);
        if (this.enemyLevel >= 50){
            var newLev = this.enemyLevel - 49;
            this.enemy.baseHealth *= Math.pow(1.1, newLev);
            this.enemy.baseAttack *= Math.pow(1.1, newLev);
        }
        this.enemy.defense += (0.5 * this.enemyLevel);
        this.enemy.poisonResist += this.enemyLevel;
        this.enemy.bleedResist += this.enemyLevel;
        this.enemy.shockResist += this.enemyLevel;
        if (this.enemyLevel >= 15) this.enemy.lifestealResist += (0.03 * (this.enemy.level - 14))
        if (this.enemyLevel >= 30) this.enemy.enrageMult = 1.5;
        this.setProfile();
        this.enemy.maxHealth = this.enemy.baseHealth;
        this.enemy.health = this.enemy.baseHealth;
        if (this.items.Fearsome_Piercer.equipped) this.items.Fearsome_Piercer.onEnemy();
        if (this.items.Sacrificial_Shank.equipped) this.items.Sacrificial_Shank.onEnemy();
        
        this.fight();
        if (resetStats) this.resetStats();
    },
    setProfile: function(){
        this.profile = "";
        if (this.enemyLevel == 1) return;
        var seed = this.seed;
        
        seed += (100 * this.enemyLevel);
        if (this.enemyLevel >= 51) seed += 3125; //Generated with Shold brain RNG
        var doubleResist = true;
        if (this.enemyLevel > 50){
            doubleResist = getRandomIntSeeded(seed++, 0, 100);
            doubleResist = (doubleResist < 20);
        }
        if (this.enemyLevel <= 50) doubleResist = true;
        var effects = ["Healthy", "Fast", "Strong", "Defensive"];
        if (this.enemyLevel > 5) {
            effects.push("Poisoning", "Bloodletting", "Shocking", "Lifestealing");
        }
        if (this.enemyLevel > 10){
            effects.push("Poison Resistant", "Shock Resistant", "Bleed Resistant");
        }
        if (this.enemyLevel > 20){
            effects.push("Enraging");
        }
        if (this.enemyLevel > 50){
            effects.push("Explosive", "Berserking", "Slowing", "Ethereal");
        }
        var effectsCount;
        if (this.enemyLevel < 25) effectsCount = Math.ceil((this.enemyLevel + 1) / 5);
        else effectsCount = 4 + (Math.ceil((this.enemyLevel - 19) / 10));
        var selectedEffects = [];
        var selectedEffectsCount = [];
        var maxEffectStack = 1;
        maxEffectStack += Math.floor(this.enemyLevel / 10);
        var healthMult = 1;
        var attackMult = 1;
        for (var x = 0; x < effectsCount; x++){
            var roll = getRandomIntSeeded(seed++, 0, effects.length);
            var effect = effects[roll];
            if (x == 0 && this.enemyLevel > 150){
                var immunities = ["Poison Immune", "Shock Immune", "Bleed Immune"];
                effect = immunities[(this.enemyLevel - 151) % 3];
            }
            if (!doubleResist && effect.search("Resistant") != -1){
                var offset = this.enemyLevel % 3;
                roll = getRandomIntSeeded(seed++, 0, 100);
                if (roll >= 40){
                    if (offset == 0) effect = "Poison Resistant";
                    if (offset == 1) effect = "Shock Resistant";
                    if (offset == 2) effect = "Bleed Resistant";
                }
            }
            var checkSelected = selectedEffects.indexOf(effect);
            if (checkSelected == -1){
                selectedEffects.push(effect);
                selectedEffectsCount.push(1);
                checkSelected = selectedEffects.length - 1;
            }
            else {
                selectedEffectsCount[checkSelected]++;
            }
            if (selectedEffectsCount[checkSelected] >= maxEffectStack) {
                effects.splice(effects.indexOf(effect), 1);
            }
            var totalStacks = selectedEffectsCount[checkSelected];
            var repeatMod = 1;
            if (totalStacks > 1){
                repeatMod *= Math.pow(0.5, (totalStacks - 1));
            }
            switch(effect){
                case "Healthy":
                    var mod = this.enemyLevel / 30;
                    healthMult += Math.min(1, mod);
                    if (selectedEffectsCount[checkSelected] >= 4) effects.splice(effects.indexOf(effect), 1);
                    break;
                case "Strong":
                    var mod = this.enemyLevel / 30;
                    attackMult += Math.min(1, mod);
                    if (selectedEffectsCount[checkSelected] >= 4) effects.splice(effects.indexOf(effect), 1);
                    break;
                case "Fast":
                    var mod = Math.pow(0.98, this.enemyLevel);
                    this.enemy.baseAttackSpeed *= Math.max(0.5, mod);
                    if (selectedEffectsCount[checkSelected] >= 2) effects.splice(effects.indexOf(effect), 1);
                    break;
                case "Poisoning":
                    this.enemy.poisonChance += Math.ceil(this.enemyLevel * 3 * repeatMod);
                    this.enemy.poisonMod += (Math.ceil((this.enemyLevel / 5) * repeatMod));
                    if (this.enemyLevel >= 30) this.enemy.poisonMod += (this.enemyLevel - 29);
                    if (totalStacks == 1) this.enemy.poisonStack += (Math.floor(this.enemyLevel / 10));
                    else this.enemy.poisonStack++;
                    this.enemy.poisonTime = 2500 + (Math.ceil(this.enemyLevel / 5) * 2500);
                    break;
                case "Bloodletting":
                    this.enemy.bleedChance += Math.ceil(this.enemyLevel * 3 * repeatMod);
                    this.enemy.bleedMod += Math.ceil(Math.min(2, (this.enemyLevel / 20)) * repeatMod);
                    this.enemy.bleedTime = 8000;
                    break;
                case "Shocking":
                    this.enemy.shockChance += Math.ceil(this.enemyLevel * 3 * repeatMod);
                    this.enemy.shockMod += Math.ceil(Math.min(2.5, (this.enemyLevel / 15)) * repeatMod);
                    this.enemy.shockTime = 8000;
                    break;
                case "Poison Resistant":
                    this.enemy.poisonResist += (10 * this.enemyLevel);
                    effects.splice(effects.indexOf(effect), 1);
                    if (!doubleResist || selectedEffects.indexOf('Bleed Resistant') != -1) effects.splice(effects.indexOf('Shock Resistant'), 1);
                    if (!doubleResist || selectedEffects.indexOf('Shock Resistant') != -1) effects.splice(effects.indexOf('Bleed Resistant'), 1);
                    break;
                case "Bleed Resistant":
                    this.enemy.bleedResist += (10 * this.enemyLevel);
                    effects.splice(effects.indexOf(effect), 1);
                    if (!doubleResist || selectedEffects.indexOf('Poison Resistant') != -1) effects.splice(effects.indexOf('Shock Resistant'), 1);
                    if (!doubleResist || selectedEffects.indexOf('Shock Resistant') != -1) effects.splice(effects.indexOf('Poison Resistant'), 1);
                    break;
                case "Shock Resistant":
                    this.enemy.shockResist += (10 * this.enemyLevel);
                    effects.splice(effects.indexOf(effect), 1);
                    if (!doubleResist || selectedEffects.indexOf('Bleed Resistant') != -1) effects.splice(effects.indexOf('Poison Resistant'), 1);
                    if (!doubleResist || selectedEffects.indexOf('Poison Resistant') != -1) effects.splice(effects.indexOf('Bleed Resistant'), 1);
                    break;
                case "Poison Immune":
                    this.enemy.immune = "poison";
                    effects.splice(effects.indexOf('Poison Resistant'), 1);
                    break;
                case "Shock Immune":
                    this.enemy.immune = "shock";
                    effects.splice(effects.indexOf('Shock Resistant'), 1);
                    break;
                case "Bleed Immune":
                    this.enemy.immune = "bleed";
                    effects.splice(effects.indexOf('Bleed Resistant'), 1);
                    break;
                case "Defensive":
                    this.enemy.defense += Math.ceil((this.enemy.level * 0.75) * Math.pow(1.05, this.enemy.level));
                    break;
                case "Lifestealing":
                    this.enemy.lifesteal += Math.min(1, (this.enemyLevel / 50));
                    break;
                case "Enraging":
                    this.enemy.enrageFreq -= 10;
                    this.enemy.enrageMult += 0.1;
                    if (selectedEffectsCount[checkSelected] >= 2) effects.splice(effects.indexOf(effect), 1);
                    break;
                case "Slowing":
                    this.enemy.slowAura += 0.1;

                    break;
                case "Explosive":
                    var count = selectedEffectsCount[checkSelected];
                    if (count >= 3) effects.splice(effects.indexOf(effect), 1);
                    if (count == 1) {
                        this.enemy.explodeDamage = 1.5;
                        this.enemy.explodeFreq = 20000;
                    }
                    else {
                        this.enemy.explodeDamage += 0.3;
                        this.enemy.explodeFreq -= 5000;
                    }
                    effects.splice(effects.indexOf('Berserking'));
                    effects.splice(effects.indexOf('Ethereal'));
                    break;
                case "Berserking":
                    var count = selectedEffectsCount[checkSelected];
                    if (count >= 3) effects.splice(effects.indexOf(effect), 1);
                    if (count == 1) {
                        this.enemy.berserkMod = 1.05;
                        this.enemy.berserkEvery = 4;
                    }
                    else {
                        this.enemy.berserkMod += 0.05;
                        this.enemy.berserkEvery--;
                    }
                    effects.splice(effects.indexOf('Explosive'));
                    effects.splice(effects.indexOf('Ethereal'));
                    break;
                case "Ethereal":
                    var count = selectedEffectsCount[checkSelected];
                    if (count >= 3) effects.splice(effects.indexOf(effect), 1);
                    if (count == 1) {
                        this.enemy.ethChance = 10;
                    }
                    else {
                        this.enemy.ethChance += 5;
                    }
                    effects.splice(effects.indexOf('Explosive'));
                    effects.splice(effects.indexOf('Berserking'));
                    break;
            }
        }
        this.enemy.baseHealth *= healthMult;
        this.enemy.baseAttack *= attackMult;
        for (var x = 0; x < selectedEffects.length; x++){
            this.profile += selectedEffects[x];
            if (selectedEffectsCount[x] > 1) this.profile += " x" + selectedEffectsCount[x] + "";
            this.profile += ", ";
        }
        this.profile = this.profile.substring(0, this.profile.length - 2)
    },
    trimpDied: function(){
        this.sessionTrimpsKilled++;
        this.lootAvg.counter += this.battleTime;
        this.resetCombat();
        if (this.sessionEnemiesKilled < this.sessionTrimpsKilled) swapClass('abTab', 'abTabLosing', document.getElementById('autoBattleTab'));
        this.popup(true, true);
        //this.notes += "Trimp Died. "
    },
    getDustMult: function(){
        var amt = 1;
        if (this.items.Lifegiving_Gem.equipped){
            amt *= (1 + this.items.Lifegiving_Gem.dustIncrease());
        }
        if (this.items.Gaseous_Greataxe.equipped){
            amt *= this.items.Gaseous_Greataxe.dustMult();
        }
        amt += this.trimp.dustMult;
        if (this.oneTimers.Dusty_Tome.owned){
            amt *= (1 + (0.05 * (this.maxEnemyLevel - 1)));
        }
        if (u2Mutations.tree.Dust.purchased){
            var mutMult = 1.25;
            if (u2Mutations.tree.Dust2.purchased){
                mutMult += 0.25;
            }
            amt *= mutMult;
        }
        if (this.items.Box_of_Spores.equipped && !this.enemy.hadBleed && this.enemy.poison.time > 0){
            
            amt *= this.items.Box_of_Spores.dustMult();
        }
        if (game.global.fluffyExp2 >= 1466015503701000) amt *= 5; //don't even look at this line, just move on
        return amt;
    },
    getEnrageMult: function(){
        var enrages = Math.floor(this.battleTime / (this.enemy.enrageFreq * 1000));
        if (enrages < 1) return 1;
        return Math.pow(this.enemy.enrageMult, enrages);
    },
    getDustReward: function(){
        var amt = (1 + ((this.enemy.level - 1) * 5)) * Math.pow(1.19, (this.enemy.level - 1));
        if (this.enemy.level >= 50) amt *= Math.pow(1.1, (this.enemy.level - 49));
        amt *= this.getDustMult();
        return amt;
    },
    enemyDied: function(){
        //this.notes += "Enemy Died. "
        this.sessionEnemiesKilled++;
        game.stats.saKills.value++;
        if (this.sessionEnemiesKilled >= 100 && this.sessionTrimpsKilled == 0 && this.enemyLevel >= 5) giveSingleAchieve("Huffstle");
        if (this.enemyLevel >= 20 && this.trimp.shockTime <= 0 && this.trimp.bleedTime <= 0 && this.trimp.poisonTime <= 0) giveSingleAchieve("Just Smack It");
        if (this.enemyLevel >= 100) giveSingleAchieve("Heroic Huffy");
        var amt = this.getDustReward();
        if (this.speed == 1) {
            this.dust += amt;
            game.stats.saDust.value += amt;
            if (this.enemyLevel > 50){
                this.shardDust += amt;
                if (this.shardDust >= 1e9){
                    var shardAmt = Math.floor(this.shardDust / 1e9);
                    this.shards += shardAmt;
                    this.shardDust -= 1e9 * shardAmt;
                    game.stats.saShards.value += shardAmt;
                }
            }
            
        }
        this.lootAvg.accumulator += amt;
        this.lootAvg.counter += this.battleTime;
        if (this.enemy.level == this.maxEnemyLevel && this.speed == 1 && this.maxEnemyLevel <= 160){
            this.enemiesKilled++;
            if (this.enemiesKilled >= this.nextLevelCount()) {
                if (this.maxEnemyLevel == 160){
                    this.bonuses.Radon.level = 52;
                    this.bonuses.Stats.level = 52;
                    this.bonuses.Scaffolding.level = 20;
                    this.canSeal = true;
                }
                else{
                    this.maxEnemyLevel++;
                    game.stats.saHighestLevel.valueTotal = this.maxEnemyLevel;
                    if (this.autoLevel) this.enemyLevel++;
                    this.enemiesKilled = 0;
                    this.resetStats();
                }
            }
        }
        if (this.sessionEnemiesKilled > this.sessionTrimpsKilled) swapClass('abTab', 'abTabWinning', document.getElementById('autoBattleTab'));
        this.resetCombat();
        this.checkLastActions();
        this.popup(true, false, false, false, true);
    },
    nextLevelCount: function(){
        if (this.enemyLevel < 20) return 10 * this.enemyLevel;
        return (190 + (15 * (this.enemyLevel - 19)))
    },
    update: function(){
        if (game.global.highestRadonLevelCleared < 74) return;
        if (this.sealed) return;
        if (usingRealTimeOffline && this.speed > 1){
            this.settings.practice.enabled = 0;
            this.speed = 1;
        }
        for (var x = 0; x < this.speed; x++){
            this.fight();
            this.popup(true, true);
            this.battleTime += this.frameTime;
        }
    },    
    getMaxItems: function(){
        return this.maxItems + this.bonuses.Extra_Limbs.level;
    },
    getDustPs: function() {
        var dps = 0;
        if (this.lootAvg.accumulator == 0){
            if (!this.enemy) return 0;
            if (this.sessionTrimpsKilled > 0) return 0;
            if (this.enemy.health >= this.enemy.maxHealth) return 0;
            if (this.enemy.health <= 0 || this.trimp.health <= 0) return 0;
            var enPct = this.enemy.health / this.enemy.maxHealth;
            var tpPct = this.trimp.health / this.trimp.maxHealth;
            if (enPct > tpPct) return 0;
            var reward = this.getDustReward();
            dps = (1000 * ((reward * (1 - enPct)) / this.battleTime));
        }
        else dps = (1000 * (this.lootAvg.accumulator / this.lootAvg.counter));
        if (dps < 0.01) dps = 0;
        return dps;
    },
    resetStats: function(){
        this.sessionEnemiesKilled = 0;
        this.sessionTrimpsKilled = 0;
        this.lootAvg.accumulator = 0;
        this.lootAvg.counter = 0;
        this.battleTime = 0;
        swapClass('abTab', 'abTabNone', document.getElementById('autoBattleTab'));
    },
    //popup stuff
    equip: function(item){
        var itemObj = this.items[item];
        if (!itemObj.equipped){
            var count = this.countEquippedItems();
            if (count >= this.getMaxItems()) {
                this.notes = "<span class='red'>You can only equip " + this.getMaxItems() + " items at a time.</span>";
                return;
            }
        }
        if (!itemObj) return;
        itemObj.equipped = !itemObj.equipped;
        if (itemObj.hidden) this.restore(item);
        this.resetCombat(true);
        this.popup(true);
    },
    countEquippedItems: function(){
        var count = 0;
        for (var ck in this.items){
            if (this.items[ck].equipped) count++;
        }
        return count;
    },
    countOwnedItems: function(){
        var count = 0;
        for (var ck in this.items){
            if (this.items[ck].owned) count++;
        }
        return count;
    },
    getBonusCost: function(what){
        var bonus = this.bonuses[what];
        return Math.ceil(bonus.price * Math.pow(bonus.priceMod, bonus.level));
    },
    buyBonus: function(what){
        var bonus = this.bonuses[what];
        var cost = this.getBonusCost(what);
        if (bonus.max && bonus.level >= bonus.max) return;
        if (bonus.useShards){
            if (this.shards < cost) return;
            this.shards -= cost;
        }
        else{
            if (this.dust < cost) return;
            this.dust -= cost;
        }
        bonus.level++;
        this.saveLastAction('bonus', what, cost);
        this.popup(true, false, true);
    },
    buyOneTimer: function(what){
        var bonus = this.oneTimers[what];
        var cost = this.oneTimerPrice(what);
        if (bonus.useShards){
            if (this.shards < cost) return;
            this.shards -= cost;
        }
        else{
            if (this.dust < cost) return;
            this.dust -= cost;
        }
        bonus.owned = true;
        if (bonus.onPurchase) bonus.onPurchase();
        this.saveLastAction('oneTimer', what, cost);
        this.popup(true, false, true);
    },
    hoverItem: function(item, upgrade, event){
		if (event && event.key && event.key != "?") return; // Screenreader tooltip support 
        var itemObj = this.items[item];
        if (!itemObj) return;
        if (upgrade){
            this.notes = itemObj.upgrade + " per level";
        }
        else{
            this.notes = itemObj.description();
        }
        this.popup(true, true);
    },
    upgradeCost: function(item){
        var itemObj = this.items[item];
        if (!itemObj) return;
        var priceMod = 3;
        if (itemObj.priceMod) priceMod = itemObj.priceMod;
        var startPrice = 5;
        if (itemObj.startPrice) startPrice = itemObj.startPrice;
        return startPrice * Math.pow(priceMod, itemObj.level - 1);
    },
    upgrade: function(item){
        var itemObj = this.items[item];
        if (!itemObj) return; 
        var cost = this.upgradeCost(item);
        var currency = (this.items[item].dustType == "shards") ? this.shards : this.dust;
        if (currency < cost) return;
        this.saveLastAction("upgrade", item);
        if (this.items[item].dustType == "shards") this.shards -= cost;
        else this.dust -= cost;
        
        itemObj.level++;
        this.popup(false, false, true);
    },
    checkLastActions: function(){
        var somethinGood = false;
        for (var x = 0; x < this.lastActions.length; x++){
            if (this.lastActions[x][2] > this.dust || this.lastActions[x][6] > this.shards) {
                somethinGood = true;
                break;
            }
        }
        if (!somethinGood) this.lastActions = [];
    },
    saveLastAction: function(type, what, cost){
        var useShards = false;
        if (type == "ring" || ((type == "contract" || type == "cancelContract") && this.items[what].dustType == "shards")) useShards = true;
        if (type == "oneTimer" && this.oneTimers[what].useShards) useShards = true;
        else if (type == "bonus" && this.bonuses[what].useShards) useShards = true;
        if (type == "bonus" || type == "oneTimer" || type == "contract"){
            for (var x = 0; x < this.lastActions.length; x++){
                if (useShards) this.lastActions[x][6] -= cost;
                else this.lastActions[x][2] -= cost;
            }
            return;
        }
        if (type == "cancelContract"){
            for (var x = 0; x < this.lastActions.length; x++){
                if (useShards) this.lastActions[x][6] += cost;
                else this.lastActions[x][2] += cost;
            }
            return;
        }
        var lastLastAction = (this.lastActions.length) ? this.lastActions[this.lastActions.length - 1] : [];
        if (lastLastAction && lastLastAction[0] == 'upgrade' && type == 'upgrade' && lastLastAction[1] == what) lastLastAction[5]++;
        else if (lastLastAction && lastLastAction[0] == 'ring' && type == 'ring') lastLastAction[5]++;
        else if (type == "ring") this.lastActions.push(['ring', null, this.dust, this.maxEnemyLevel, this.enemiesKilled, 1, this.shards])
        else this.lastActions.push([type, what, this.dust, this.maxEnemyLevel, this.enemiesKilled, 1, this.shards]);
        if (this.lastActions.length > 3) this.lastActions.splice(0,1);
    },
    restoreLastAction: function(){
        var action = this.lastActions.splice(this.lastActions.length - 1, 1)[0];
        this.dust = action[2];
        this.shards = (action[6]) ? action[6] : 0;
        this.maxEnemyLevel = action[3];
        this.enemiesKilled = action[4];
        if (action[0] == "upgrade"){
            this.items[action[1]].level -= action[5];
        }
        else if (action[0] == "contract"){
            this.items[action[1]].equipped = false;
            this.items[action[1]].owned = false;
        }
        else if (action[0] == "ring"){
            this.rings.level -= action[5];
            var removeMods = this.rings.mods.length - this.getRingSlots();
            if (removeMods > 0){
                autoBattle.rings.mods.splice(autoBattle.rings.mods.length - removeMods, removeMods);
            }
        }
        if (this.enemyLevel > this.maxEnemyLevel) this.enemyLevel = this.maxEnemyLevel;
        this.confirmUndo = false;
        this.resetStats();
        this.resetCombat();
        this.checkLastActions();
        this.popup(false, false, true);
    },
    confirmUndo: false,
    confirmUndoClicked: function(){
        this.confirmUndo = !this.confirmUndo;
        this.popup(false, false, true);
    },
    levelDown: function(){
        if (this.enemyLevel > 1) {
            this.enemyLevel--;
            this.autoLevel = false;
            this.resetCombat(true);
        }
        this.updatePopupBtns();
    },
    levelUp: function(){

        if (this.enemyLevel < this.maxEnemyLevel){
            this.enemyLevel++;
            this.resetCombat(true);
        }
        this.updatePopupBtns();
    },
    toggleAutoLevel: function(){
        this.autoLevel = !this.autoLevel;
        if (this.autoLevel && this.enemyLevel != this.maxEnemyLevel){
            this.enemyLevel = this.maxEnemyLevel;
            this.resetCombat(true);
        }
        this.updatePopupBtns();
    },
    updatePopupBtns: function(){
        var downBtn = document.getElementById('abDecreaseLevel');
        var upBtn = document.getElementById('abIncreaseLevel');
        var autoBtn = document.getElementById('abAutoLevel');
        if (!downBtn || !upBtn || !autoBtn) return;
        var downBtnColor = (this.enemyLevel > 1) ? "autoItemUpgrade" : "autoColorGrey";
        var upBtnColor = (this.enemyLevel < this.maxEnemyLevel) ? "autoItemUpgrade" : "autoColorGrey";
        var autoBtnColor = (this.autoLevel) ? "autoItemEquipped" : "autoItemHide";
        swapClass("auto", downBtnColor, downBtn);
        swapClass("auto", upBtnColor, upBtn);
        swapClass("auto", autoBtnColor, autoBtn);
        autoBtn.innerHTML = "AutoLevel " + ((this.autoLevel) ? "On" : "Off");
    },
    swapPopup: function(to){
        if (to == "rings" && !this.oneTimers.The_Ring.owned) return;
        this.hideMode = false;
        this.popupMode = to;
        this.notes = "";
        this.confirmUndo = false;
        this.popup(false, false, true);
    },
    toggleHideMode: function(){
        this.hideMode = !this.hideMode;
        this.popupMode = "items";
        this.popup(false, false, true)
    },
    hide: function(itemName){
        this.items[itemName].hidden = true;
        if (this.items[itemName].equipped) this.items[itemName].equipped = false;
        this.popup(false, false, true);
    },
    restore: function(itemName){
        this.items[itemName].hidden = false;
        this.popup(false, false, true);
    },
    completedVoidMap: function(zone){
        if (!this.activeContract) return;
        var item = this.items[this.activeContract];
        if (zone < item.zone) return;
        //completed contract
        item.owned = true;
        message("You have fulfilled your Contract, and Huffy has gained access to " + this.cleanName(this.activeContract) + "!", "Notices");
        this.activeContract = "";
        this.popup(false,false,true);
    },
    abandonContract: function(){
        if (!this.activeContract) return;
        var price = this.contractPrice(this.activeContract);
        if (this.items[this.activeContract].dustType == "shards"){
            this.shards += price;
        }
        else{
            this.dust += price;
        }
        this.saveLastAction('cancelContract', this.activeContract, price);
        this.activeContract = "";
        this.popup(false,false,true);
    },
    acceptContract: function(item){
        if (this.activeContract) return;
        var price = this.contractPrice(item);
        var currency = (this.items[item].dustType == "shards") ? this.shards : this.dust;
        if (currency < price) return;
        this.saveLastAction('contract', item, price);
        if (this.items[item].dustType == "shards") this.shards -= price;
        else this.dust -= price; 
        this.activeContract = item;
        this.popup(false, false, true);
    },
    renamePresetTooltip: function(which){
        var text = "Rename Preset " + which + "<br/><input style='width: 75%; margin-left: 12.5%' id='abPresetNameInput' value='" + this.presets.names[which - 1] + "'/>"
        return text;
    },
    cleanName: function(name){
        return name.split("__").join("-").split("_").join(' ')
    },
    savePresetName: function(which){
        var input = document.getElementById('abPresetNameInput');
        if (!input) return;
        var value = input.value;
        if (value.length < 1) return;
	    value = htmlEncode(value.substring(0, 25));
        this.presets.names[which - 1] = value;
        autoBattle.popup(false,false,false,true);
    },
    help: function(){
        var text = "<ul>";
        text += "<li><b>Click on an item name to equip it. You can have 4 items equipped at the start</b>, but you can purchase 'Extra Limbs' under the Bonus button if you want some more!</li>";
        text += "<li>Huffy can progress to the next level of the Spire after killing the amount of Enemies listed next to your total Dust at the top of the SA window (\"Kill X\"). Huffy must be fighting at your highest reached level in order to progress this counter, otherwise it will say \"Farming\".</li>";
        text += "<li>Equipping or Unequipping an item will reset your \"Session Score\" at the top of the SA window.</li>";
        text += "<li>You can unlock new items for Huffy to use through the 'Contracts' tab. Once you have enough Dust to start a Contract, you'll need to complete a Void Map at or above the specified Zone in U2 to complete it and unlock the item.</li>";
        text += "<li>Defense is a flat damage reduction. Damage taken is equal to (Enemy Attack * Shock Modifier) - Defense.</li>";
        text += "<li>Lifesteal works on Bleed damage but not Poison damage. Lifesteal is based on final damage after Shock and Defense.</li>";
        text += "<li>Shock boosts Poison and Bleed damage as well as normal attack damage.</li>";
        text += "<li>Shocks and Bleeds cannot be applied while the Enemy already has that status effect. Poison can.</li>";
        text += "<li>Resistance against an effect works by subtracting your current resist from the Enemy's chance to cause that effect. If the Enemy has a 50% Poison Chance and you have 25% Poison Resist, the Enemy will have an effective 25% Poison Chance.</li>";      
        text += "<li>Enemy Affixes per level are based on a seed, but everyone has the same seed and sees the same affixes each level. Feel free to discuss strategy with others!</li>";
        text += "<li>Enemies gain +1 Affix every 5 Levels until 20, then gain +1 Affix every 10 Levels</li>";
        text += "<li>Huffy's minimum Attack Time is 0.5 seconds. Any reductions to Attack Time below 0.5 seconds will be converted to Slow Aura, making the Enemy attack up to 50% slower.</li>";
        text += "<li>The Dust reward formula is (1 + ((EnemyLevel - 1) * 5)) * (1.19^(EnemyLevel - 1))</li>";
        text += "<li>The Spire Assault window can be opened with hotkey \"i\"</li>";
        text += "</ul>";
        tooltip('confirm', null, 'update', text, 'autoBattle.popup()', "Spire Assault Help/FAQ", 'Back to Spire Assault', true);
        var elem = document.getElementById('tooltipDiv');
        swapClass('tooltipExtra', 'tooltipExtraLg', elem);
        elem.style.top = "10%";
        elem.style.left = "25%";
    },
    getFreshRings: function(){
        return {
            level: 1,
            mods: []
        }
    },

    getRingStatusDamage: function(){
        if (!this.oneTimers.The_Ring.owned) return 0;
        return this.rings.level * 25 * Math.pow(1.5, Math.floor(this.rings.level / 10));
    },
    getRingPoisonDamage: function(){
        if (!this.oneTimers.The_Ring.owned) return 0;
        return this.rings.level * 15 * Math.pow(5, Math.floor(this.rings.level / 10));
    },
    getRingStatusChance: function(){
        if (this.rings.level < 10) return 0;
        var calcLevel = this.rings.level - 9;
        return calcLevel * 20 * Math.pow(1.25, Math.floor(calcLevel / 10));
    },
    getRingStatAmt: function(modObj){
        return modObj.baseGain * this.rings.level * Math.pow(modObj.perTen, Math.floor(this.rings.level / 10))
    },
    getRingSlots: function(){
        var amt = Math.floor(this.rings.level / 15) + 1;
        if (amt > 3) amt = 3;
        return amt;
    },
    levelRing: function(){
        var cost = this.getRingLevelCost();
        if (this.shards < cost) return;
        this.saveLastAction("ring", null, cost);
        this.shards -= cost;
        this.rings.level++;
        
        this.checkAddRingSlot();
        this.popup(false, false, true);
    },
    checkAddRingSlot: function(){
        var slots = this.getRingSlots();
        if (this.rings.mods.length < slots){
            var availableMods = this.getAvailableRingMods();
            var randomMod = availableMods[Math.floor(Math.random() * availableMods.length)];
            this.rings.mods.push(randomMod);
        }
    },
    getAvailableRingMods: function(){
        var availableMods = [];
        var keys = Object.keys(autoBattle.ringStats);
        for (var x = 0; x < keys.length; x++){
            if (this.rings.mods.indexOf(keys[x]) == -1) availableMods.push(keys[x]);
        }
        return availableMods;
    },
    changeRing: function(elem, slot, useValue){
        var availableMods = this.getAvailableRingMods();
        if (!useValue) useValue = elem.value;
        if (availableMods.indexOf(useValue) == -1) return;
        if (slot > this.getRingSlots() - 1) return;
        this.rings.mods[slot] = useValue;
        this.resetCombat();
        this.popup(false, false, true);
    },
    getRingLevelCost: function(){
        return Math.ceil(15 * Math.pow(2, this.rings.level));
    },
    getRingUi: function(){
        var text = "<div class='ringContainer' style='text-align: center;'><span style='font-size: 1.2em'>The Ring - Level " + this.rings.level + "</span><br/>";
        text += "+ " + prettify(this.getRingStatusDamage()) + "% Bleed/Shock Damage<br/>";
        text += "+ " + prettify(this.getRingPoisonDamage()) + " Poison Damage<br/>";
        var chance = this.getRingStatusChance();
        if (chance > 0) text += "+ " + prettify(this.getRingStatusChance()) + "% Status Chance<br/>";
        for (var x = 0; x < this.rings.mods.length; x++){
            var mod = this.ringStats[this.rings.mods[x]];
            var amt = this.getRingStatAmt(mod);
            text += mod.formatEffect(amt) + "<br/>";
        }
        text += "</div><div class='ringContainer'>";
        if (this.rings.level < 5) text += "Level The Ring to 5 to earn your first customizable slot!";
        else{
            text += "<span style='font-size: 1.2em'>Customizable Slots:</span>"
            var slots = this.getRingSlots();
            var availableMods = this.getAvailableRingMods();
            var options = "";
            for (var x = 0; x < availableMods.length; x++){
                options += "<option value='" + availableMods[x] + "'>" + this.ringStats[availableMods[x]].name + "</option>";
            }
            for (var x = 0; x < slots; x++){
                text += "<select class='autoRingSelect' id='ringSlot" + x + "' onchange='autoBattle.changeRing(this, " + x + ")' value='" + this.rings.mods[x] + "'>";
                text += "<option selected='selected' value='" + this.rings.mods[x] + "'>" + this.ringStats[this.rings.mods[x]].name + "</option>";
                text += options;
                text += "</select>";
            }
            if (this.rings.level < 15) text += "Unlock another slot at Level 15!"
            else if (this.rings.level < 30) text += "Unlock another slot at level 30!"
            
        }
        text += "</div><div class='ringContainer' style='text-align: center; padding-top: 2em;'><button class='btn btn-lg autoItemUpgrade' onclick='autoBattle.levelRing()' style='width: 90%'>Level Up! (" + prettify(this.getRingLevelCost()) + " Shards)</button><br/>";
        text += "Every level increases stats of all mods on The Ring.<br/>Every 10 levels, gains a bigger boost in power!<br/>"
        if (this.rings.level < 10) text += "Gains status chance starting at Level 10.<br/>" 
        text += "</div>";
        return text;
    },
    ringStats: {
            attack: {
                formatEffect: function(amt){
                    return "+ " + prettify(amt) + " Attack";
                },
                name: "Attack",
                doStuff: function(amt){
                    autoBattle.trimp.attack += amt;
                },
                baseGain: 50,
                perTen: 5
            },
            health: {
                formatEffect: function(amt){
                    return "+ " + prettify(amt) + " Health";
                },
                name: "Health",
                doStuff: function(amt){
                    autoBattle.trimp.maxHealth += amt;
                },
                baseGain: 200,
                perTen: 5,
            },
            defense: {
                formatEffect: function(amt){
                    return "+ " + prettify(amt) + " Defense";
                },
                name: "Defense",
                doStuff: function(amt){
                    autoBattle.trimp.defense += amt;
                },
                baseGain: 25,
                perTen: 2.5,
            },
            lifesteal: {
                formatEffect: function(amt){
                    return "+ " + prettify(amt) + "% Lifesteal";
                },
                name: "Lifesteal",
                doStuff: function(amt){
                    amt /= 100;
                    autoBattle.trimp.lifesteal += amt;
                },
                baseGain: 2.5,
                perTen: 4,
            },
            dustMult: {
                formatEffect: function(amt){
                    return "+ " + prettify(amt) + "% Dust Mult";
                },
                name: "Dust Mult",
                doStuff: function(amt){
                    amt /= 100;
                    autoBattle.trimp.dustMult += amt;
                },
                baseGain: 5,
                perTen: 2,
            }
    },
    getCurrencyName: function(item){
        var curName = this.items[item].dustType ? this.items[item].dustType : "dust";
        return curName.charAt(0).toUpperCase() + curName.slice(1);
    },
    updateBonusPrices: function(){
        for (var bonus in this.bonuses){
            var bonusObj = this.bonuses[bonus];
            if (bonusObj.useShards && this.maxEnemyLevel < 51) continue;
            var cost = this.getBonusCost(bonus);
            var costColor = ((!bonusObj.useShards && cost <= this.dust) || (bonusObj.useShards && cost <= this.shards)) ? "green" : "red";
            if (bonusObj.max && bonusObj.level >= bonusObj.max) costColor = "red";
            var elem = document.getElementById(bonus + "BonusPrice");
            if (!elem) return false;
            elem.className = costColor;
        }
        var oneCount = 0;
        var ownedItems = this.countOwnedItems();
        for (var oneTime in this.oneTimers){
            var oneObj = this.oneTimers[oneTime];
            if (oneObj.owned) continue;
            oneCount++;
            if (this.maxEnemyLevel >= 51 && oneCount >= 3) break;
            if (oneCount >= 4) break;
            var cost = this.oneTimerPrice(oneTime);
            var costColor = ((!oneObj.useShards && cost <= this.dust) || (oneObj.useShards && cost <= this.shards)) ? "green" : "red";
            if (ownedItems < oneObj.requiredItems){
                continue;
            }
            var elem = document.getElementById(oneTime + "BonusPrice");
            if (!elem) return false;
            elem.className = costColor;
        }
        return true;
    },
    hideMode: false,
    popup: function(updateOnly, statsOnly, itemsOnly, leaveMode, fromBattle){
		// !game.global.lockTooltip does not work as expected with screenreaders, but checking to see if SA is the last tooltip and if there is a tooltip displayed is effectively the same thing for both (I think? I hope? It looks like it is.)
		// Figuring out why lockTooltip acts inappropriately on SR version is the better solution, but the tooltip code scares me. A lot. 
		let SAActive = lastTooltipTitle == "Spire Assault" && document.getElementById("tooltipDiv").style.display == "block"
        if (fromBattle){
            if (this.popupMode == "bonuses" && !this.updateBonusPrices()){
                itemsOnly = true;
                statsOnly = false;
            }
            else{
                statsOnly = true;
                itemsOnly = false;
            }
        }
        if (!updateOnly && !statsOnly && !itemsOnly) {
            if (!leaveMode) this.popupMode = "items";
            this.hideMode = false;
            this.confirmUndo = false;
        }
		
        if ((updateOnly || itemsOnly) && !SAActive) return; 
        if (usingRealTimeOffline){
            cancelTooltip();
            return;
        }
        var text = "";
        var totalFights = this.sessionEnemiesKilled + this.sessionTrimpsKilled;
        var pctWon = (totalFights > 0) ? "(" + Math.round((this.sessionEnemiesKilled / totalFights) * 100) + "%)" : "&nbsp;";
        var dustPs = this.getDustPs();
        var shardText = "";
        if (this.maxEnemyLevel > 50){
            shardText = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + prettify(this.shards) + " Shards";
            if (this.enemyLevel > 50){
                shardText += " (";
                var shardsPs = dustPs / 1e9;
                if (shardsPs >= 0.01 || shardsPs == 0) shardText += prettify(shardsPs) + " per sec)";
                else {
                    shardsPs = 1 / shardsPs;
                    shardText += "1 per " + prettify(shardsPs) + " sec)";
                }
            }
        }
        var topText = "";
        if (this.canSeal){
            topText += "<div class='sealAutoBattle'>Huffy can go no further up the Spire but can now Seal it to prevent any more Enemies from escaping. All bonuses have been set to 2 levels above their maximum. Congratulations on completing Spire Assault!!! <span onclick='autoBattle.seal()' class='autoItem autoItemEquipped' style='width: initial'>Seal Spire Assault (Can reopen at any time in settings)</span></div>"
        }
        topText += prettify(this.dust) + " Dust (" + prettify(dustPs) + " per sec)" + shardText + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + ((this.settings.practice.enabled == 1) ? "<b style='color: #921707'>Practicing</b>" : ((this.enemyLevel == this.maxEnemyLevel) ? ((this.canSeal) ? "Farming (Max Level)" : "Kill " + (this.nextLevelCount() - this.enemiesKilled)) : "Farming")) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enemies Killed: " + this.sessionEnemiesKilled + "&nbsp;" + pctWon + "&nbsp;&nbsp;&nbsp;Fights Lost: " + this.sessionTrimpsKilled + "<br/>Enemy Level " + this.enemy.level + ((this.profile) ? " (" + this.profile + ")" : "") + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        var buttons = "";

        if (!(updateOnly && statsOnly)) buttons = "<div id='abLevelButtons'><button id='abDecreaseLevel' onclick='autoBattle.levelDown()' class='btn-md btn auto noselect'>- Decrease Enemy Level -</button><button onclick='autoBattle.toggleAutoLevel()' id='abAutoLevel' class='btn btn-md auto'>Set AutoLevel On</button><button onclick='autoBattle.levelUp()' id='abIncreaseLevel' class='btn btn-md auto'>+ Increase Enemy Level +</button><button aria-label='Help' id='abHelpBtn' onclick='autoBattle.help()' class='icomoon icon-question-circle'></button><button aria-label='Close' id='abCloseBtn' onclick='cancelTooltip()' class='icomoon icon-close'></button></div>";
        text = "<div class='noselect'><div id='autoDust'>" + topText + "</div>" + buttons + "<div class='autoBattleTopName'>Huffy</div><div class='autoBattleTopName'>Enemy</div>";
        if (updateOnly || itemsOnly) document.getElementById('autoDust').innerHTML = topText;
        var trimpAttackTime = (this.trimp.attackSpeed);
        var enemyAttackTime = (this.enemy.attackSpeed);

        var hpPct = Math.min(100, ((this.trimp.health / this.trimp.maxHealth) * 100)).toFixed(2);
        var EhpPct = Math.min(100, ((this.enemy.health / this.enemy.maxHealth) * 100)).toFixed(2);
        var atkPct = Math.min(100, ((this.trimp.lastAttack / (trimpAttackTime / 1000)) / 10)).toFixed(2);
        var EatkPct = Math.min(100, ((this.enemy.lastAttack / (enemyAttackTime / 1000)) / 10)).toFixed(2);
        if ((updateOnly && statsOnly) || itemsOnly){
            document.getElementById('autoBattleTrimpHealthBar').style.width = hpPct + "%";
            document.getElementById('autoBattleTrimpAttackBar').style.width = atkPct + "%";
            document.getElementById('autoBattleTrimpHealth').innerHTML = prettify(this.trimp.health);
            document.getElementById('autoBattleTrimpHealthMax').innerHTML = prettify(this.trimp.maxHealth);
            document.getElementById('autoBattleEnemyHealthBar').style.width = EhpPct + "%";
            document.getElementById('autoBattleEnemyAttackBar').style.width = EatkPct + "%";
            document.getElementById('autoBattleEnemyHealth').innerHTML = prettify(this.enemy.health);
            document.getElementById('autoBattleEnemyHealthMax').innerHTML = prettify(this.enemy.maxHealth);
        }
        else{
            text += '<div class="autoBattleBarHolder"><div style="width: ' + hpPct + '%" class="progress-bar percentColorBlue" id="autoBattleTrimpHealthBar" role="progressbar"><span class="noselect innerFightBar"><span id="autoBattleTrimpHealth">' + prettify(this.trimp.health) + '</span>/<span id="autoBattleTrimpHealthMax">' + prettify(this.trimp.maxHealth) + '</span></span></div></div>';
            text += '<div class="autoBattleBarHolder"><div style="width: ' + EhpPct + '%" class="progress-bar rightBar percentColorBlue" id="autoBattleEnemyHealthBar" role="progressbar"><span class="noselect innerFightBar"><span id="autoBattleEnemyHealth">' + prettify(this.enemy.health) + '</span>/<span id="autoBattleEnemyHealthMax">' + prettify(this.enemy.maxHealth) + '</span></span></div></div>';
            text += '<div class="autoBattleBarHolder"><div style="width: ' + atkPct + '%" class="progress-bar percentColorYellow" id="autoBattleTrimpAttackBar" role="progressbar"><span class="innerFightBar">&nbsp;</span></div></div>';
            text += '<div class="autoBattleBarHolder"><div style="width: ' + EatkPct + '%" class="progress-bar rightBar percentColorYellow" id="autoBattleEnemyAttackBar" role="progressbar"><span class="innerFightBar">&nbsp;</span></div></div>';
        }
        var statsText = "";
        var things = ["trimp", "enemy"];
        for (var x = 0; x < things.length; x++){
            var fighterName = things[x];
            var fighterObj = this[fighterName];
            var opponentObj = (fighterObj.isTrimp) ? this.enemy : this.trimp;
            var attackTime = (fighterName == "trimp") ? trimpAttackTime : enemyAttackTime;
            attackTime /= 1000;
            var baseAttack = this.getAttack(fighterObj);
            var attackText = prettify(baseAttack) + " (" + prettify(baseAttack * 0.8) + " - " + prettify(baseAttack * 1.2) + ")";
            var dustBdText = (fighterName == "trimp") ? "<b>Dust Mult: </b>" + prettify(this.getDustMult() * 100) + "%" : "<b>Dust Value:</b> " + prettify(this.getDustReward());
            var lifestealFinal = Math.max(fighterObj.lifesteal - opponentObj.lifestealResist, 0) * 100;
            var lifestealDisplay;
            if (lifestealFinal <= 0 && fighterObj.lifesteal > 0) lifestealDisplay = prettify(lifestealFinal) + "% (" + prettify((fighterObj.lifesteal - opponentObj.lifestealResist) * 100) + "%)";
            else lifestealDisplay = prettify(lifestealFinal) + "%";

            statsText += "<div class='autoStats'><div class='autoStatsBreakup'><b>Attack:</b> " + attackText + "<br/><b>Attack Time:</b> " + prettify(attackTime) + "<br/><b>Defense:</b> " + prettify(fighterObj.defense) + "<br/><b>Lifesteal:</b> " + lifestealDisplay;
            statsText += "</div>";
            statsText += "<div class='autoStatsBreakup'>" + dustBdText + "<br/><b>Poison Resist:</b> " + prettify(fighterObj.poisonResist) + "%<br/><b>Bleed Resist:</b> " + prettify(fighterObj.bleedResist) + "%<br/><b>Shock Resist:</b> " + prettify(fighterObj.shockResist) + "%";
            statsText += "</div>";
            statsText += "<div class='autoStatsBreakup'>";
            if (fighterObj.isTrimp) statsText += "<b>Time:</b> " + formatSecondsAsClock(this.battleTime / 1000, 2) + "<br/>";
            else {
                var enrageFreq = this.enemy.enrageFreq;
                var baseMult = this.enemy.enrageMult;
                baseMult = (baseMult - 1) * 100;
                var currentMult = this.getEnrageMult();
                if (currentMult > 1) statsText += "<b>Enraged!</b> +" + prettify((currentMult - 1) * 100) + "% Attack. " + prettify(baseMult) + "% more every " + enrageFreq + " seconds.";
                else statsText += "<b>Enrages</b> every " + enrageFreq + " seconds, increasing Attack by " + prettify(baseMult) + "%.";
            }
            statsText += "<br/>";
            if (fighterObj.slowAura > 1)
            statsText += "<b>Slowing Aura:</b> " + prettify((fighterObj.slowAura - 1) * 100) + "%";
            statsText += "<br/>";
            if (fighterObj.lifestealResist)
            statsText += "<b>Lifesteal Resist:</b> " + prettify(fighterObj.lifestealResist * 100) + "%";
            statsText += "</div>";
            statsText += "<br/><b>Poisoned:</b> ";
            if (fighterObj.poison.time > 0){
                var timeText = (opponentObj.poisonTick != 1000) ? " every " + prettify(opponentObj.poisonTick / 1000) + " sec" : "every second";
                statsText += prettify(fighterObj.poison.mod * fighterObj.poison.stacks) + " damage " + timeText + " for " + (fighterObj.poison.time / 1000).toFixed(1) + " sec. (" + fighterObj.poison.stacks + "/" + opponentObj.poisonStack + ")";
            }
            else statsText += "None";
            statsText += "<br/><b>Bleed:</b> ";
            if (fighterObj.bleed.time > 0){
                statsText += "Taking " + prettify(fighterObj.bleed.mod * 100) + "% attack damage after each attack for " + (fighterObj.bleed.time / 1000).toFixed(1) + " sec.";
            }
            else statsText += "None";
            statsText += "<br/><b>Shock:</b> ";
            if (fighterObj.shock.time > 0){
                var shockTime = (fighterObj.shock.time == 9999999) ? "<span class='icomoon icon-infinity'></span>" : (fighterObj.shock.time / 1000).toFixed(1);
                statsText += "Taking " + prettify(fighterObj.shock.mod * 100) + "% more damage for " + shockTime + " sec.";
            }
            else statsText += "None";
            
            statsText += "<br/>"
            var freePmod = 0;
            if (this.oneTimers.Master_of_Arms.owned) freePmod += 2;
            if (this.oneTimers.Whirlwind_of_Arms.owned) freePmod += 10;
            var ringStatusChance = this.getRingStatusChance();
            var ringPoison = this.getRingPoisonDamage();
            var ringBleedShock = this.getRingStatusDamage();
            if (fighterObj.poisonChance > 0 && fighterObj.poisonTime > 0 && fighterObj.poisonMod > 0){
                statsText += prettify(fighterObj.poisonChance - opponentObj.poisonResist) + "% chance to poison for " + prettify(fighterObj.poisonTime / 1000) + " sec, dealing " + prettify(fighterObj.poisonMod) + " damage per second, stacking up to " + fighterObj.poisonStack + " times.";
            }
            else if ((fighterObj.poisonChance > 0 && (!ringStatusChance || ringStatusChance < fighterObj.poisonChance)) || fighterObj.poisonTime > 0 || (fighterObj.poisonMod > freePmod && (!ringPoison || ringPoison + freePmod < fighterObj.poisonMod))){
                statsText += "<span class='abError'>"
                if (fighterObj.poisonChance <= 0 && opponentObj.immune == "poison") statsText += "Enemy is immune to Poison!"
                else if (fighterObj.poisonTime <= 0) statsText += "*You need an item that can create a Poison (Like Fists of Goo) to Poison.";
                else if (fighterObj.poisonChance <= 0 && (!this.rings.poison.poisonChance || this.rings.poison.poisonChance < fighterObj.poisonChance)) statsText += "*You need an item that grants Poison Chance to Poison.";
                else if (fighterObj.poisonMod <= 0) statsText += "*You need an item that grants Poison Damage to Poison.";
                statsText += "</span>";
            }
            statsText += "<br/>";
            if (fighterObj.bleedChance > 0 && fighterObj.bleedTime > 0 && fighterObj.bleedMod > 0){
                statsText += prettify(fighterObj.bleedChance - opponentObj.bleedResist) + "% chance to bleed enemies for " + prettify(fighterObj.bleedTime / 1000) + " sec, dealing attack damage plus " + prettify(fighterObj.bleedMod * 100) + "% after each enemy attack.";
            }
            else if ((fighterObj.bleedChance > 0 && (!ringStatusChance || ringStatusChance < fighterObj.bleedChance)) || fighterObj.bleedTime > 0 || (fighterObj.bleedMod > 0 && (!ringBleedShock || ringBleedShock / 100 < fighterObj.bleedMod))){
                statsText += "<span class='abError'>"
                if (fighterObj.bleedChance <= 0 && opponentObj.immune == "bleed") statsText += "Enemy is immune to Bleed!";
                else if (fighterObj.bleedTime <= 0) statsText += "*You need an item that can create a Bleed (Like Rusty Dagger) to cause Bleeding.";
                else if (fighterObj.bleedChance <= 0) statsText += "*You need an item that grants Bleed Chance to cause Bleeding.";
                else if (fighterObj.bleedMod <= 0) statsText += "*You need an item that grants Bleed Damage to cause Bleeding.";
                statsText += "</span>";
            }
            statsText += "<br/>";
            
            if (fighterObj.shockChance > 0 && fighterObj.shockTime > 0 && fighterObj.shockMod > 0){
                statsText += prettify(fighterObj.shockChance - opponentObj.shockResist) + "% chance to shock for " + prettify(fighterObj.shockTime / 1000) + " sec, causing enemies to take " + prettify(fighterObj.shockMod * 100) + "% more damage from all sources.";
            }
            else if ((fighterObj.shockChance > 0 && (!ringStatusChance || ringStatusChance < fighterObj.shockChance)) || fighterObj.shockTime > 0 || (fighterObj.shockMod > 0 && (!ringBleedShock || ringBleedShock / 100 < fighterObj.shockMod))){
                statsText += "<span class='abError'>"
                if (fighterObj.shockChance <= 0 && opponentObj.immune == "shock") statsText += "Enemy is immune to Shock!"
                else if (fighterObj.shockTime <= 0 && !this.items.Nozzled_Goggles.equipped) statsText += "*You need an item that can create a Shock (Like Battery Stick) to Shock.";
                else if (fighterObj.shockChance <= 0) statsText += "*You need an item that grants Shock Chance to Shock.";
                else if (fighterObj.shockMod <= 0) statsText += "*You need an item that grants Shock Damage to Shock.";
                statsText += "</span>";
            }
            statsText += "<br/>";
            if (fighterName == "trimp"){
                if (this.items.Doppelganger_Signet.equipped){
                    statsText += "Doppelganger ";
                    if (this.trimp.doppDown) statsText += " Dead!";
                    else statsText += "Health: " + prettify(autoBattle.items.Doppelganger_Signet.doppHealth() - this.trimp.dmgTaken);
                    if (this.trimp.doppLives == 1) statsText += "&nbsp;<span class='icomoon icon-heart3'></span>&nbsp;&nbsp;";
                    else statsText += "&nbsp;&nbsp;&nbsp;&nbsp;";
                }
                if (this.items.Goo_Golem.equipped && this.items.Goo_Golem.active()){
                    statsText += "Goo Golem: " + prettify(this.trimp.gooStored) + " Stored";
                }
            }
            else if (this.enemyLevel > 50){
                if (fighterObj.explodeFreq != -1){
                    var explodeIn = ((fighterObj.explodeFreq - fighterObj.lastExplode) / 1000).toFixed(1);
                    statsText += "<b>Special:</b> Explodes for " + prettify(fighterObj.explodeDamage * 100) + "% attack damage in " + explodeIn + " sec";
                }
                else if (fighterObj.berserkMod != -1){
                    var mult = this.getBerserkMult();
                    statsText += "<b>Special:</b> Gains x" + fighterObj.berserkMod + " damage after every " + fighterObj.berserkEvery + " attacks. Currently x" + prettify(mult) + ".";
                }
                else if (fighterObj.ethChance > 0){
                    statsText += "<b>Special:</b> " + fighterObj.ethChance + "% chance per attack to turn ethereal, healing from all damage taken. ";
                    if (fighterObj.isEthereal) statsText += "**ETHEREAL**"
                }
                statsText += "<br/>";
            }
            statsText += "</div>"; 
    
        }
        if (updateOnly && statsOnly){
            var elem = document.getElementById('autoBattleStatsText');
            var notesElem = document.getElementById('autoBattleNotes');
            if (elem){
                if (notesElem) notesElem.innerHTML = this.notes;
                elem.innerHTML = statsText;
                if (!itemsOnly) return;
            }
        }
        text += "<div id='autoBattleStatsText'>" + statsText + "</div>";
        var itemsText = "Items (" + this.countEquippedItems() + "/" + this.getMaxItems() + " Equipped)"; 
        text += "<div id='autoBattleMenuButtons'><button id='abItemsBtn' onclick='autoBattle.swapPopup(\"items\")' class='btn btn-lg autoItemUpgrade darkBorder'>" + itemsText + "</button><button onclick='autoBattle.swapPopup(\"bonuses\")' class='btn btn-lg colorNavy'>Bonuses</button><button onclick='autoBattle.swapPopup(\"contracts\")' class='btn btn-lg colorVoidy darkBorder'>Contracts</button><button onclick='autoBattle.swapPopup(\"hidden\")' class='btn btn-lg autoColorOrange darkBorder'>Hidden Items</button><button class='btn btn-lg autoItemHide darkBorder' onclick='autoBattle.toggleHideMode()'>Hide Items</button>";
        text += "<button id='autoBattleRingBtn' onclick='autoBattle.swapPopup(\"rings\")' style='display: " + ((this.oneTimers.The_Ring.owned) ? 'inline-block' : 'none') + "' class='btn btn-lg autoColorTeal active darkBorder'>The Ring</button>";
        text += "<button onclick='autoBattle.swapPopup(\"other\")' class='btn btn-lg autoColorGrey active darkBorder'>Misc</button></div>";
        var notesElem = document.getElementById('autoBattleNotes');
        if (!notesElem || !itemsOnly) text +=  "<div aria-live='polite' id='autoBattleNotes'" + ((this.popupMode == "items" || this.popupMode == "hidden") ? "" : " style='display: none'") + ">" + this.notes + "</div>";
        if (this.popupMode == "items" || this.popupMode == "hidden") {
            if (notesElem) notesElem.style.display = 'block';
        }
        else if (notesElem && itemsOnly) notesElem.style.display = 'none';
        var extraClass = (this.popupMode == "other" || this.popupMode == "bonuses" || this.popupMode == "rings") ? "modeLg" : "modeNone";
        text += "<div id='autoItemsDiv' class='niceScroll " + extraClass + "'>"
        var itemsElem = document.getElementById('autoItemsDiv');
        if (itemsOnly && itemsElem){
            text = "";
            document.getElementById('abItemsBtn').innerHTML = itemsText;
            swapClass('mode', extraClass, itemsElem)
        }
        if (this.popupMode == "items" || this.popupMode == "hidden"){
			text += "<h1 class='visually-hidden'>Spire Assault Items</h1>"
            var itemList = this.getItemOrder();
			var line = ""
            var count = 1;
            var total = 0;
            for (x = 0; x < itemList.length; x++){
                var item = itemList[x].name;
                var itemObj = this.items[item];
                if (!itemObj.owned) continue;
                if (itemObj.hidden != (this.popupMode == "hidden")) continue;
                if (count > 7){
                    text += "<div>" + line + "</div>";
					line = ""
                    count = 1;
                }
                
                var equipClass = (itemObj.equipped) ? "Equipped" : "NotEquipped"; 
				
                var upgradeCost = prettify(this.upgradeCost(item)) + " " + this.getCurrencyName(item);
				line += "<div class='autoItemContainer'><div tabindex=0 id='itemName" + item + "' class='autoItem autoItem" + equipClass + "' role=checkbox aria-checked='" + itemObj.equipped +  "' onclick='autoBattle.equip(\"" + item + "\")' onkeydown='autoBattle.hoverItem(\"" + item + "\", false, event)' onmouseover='autoBattle.hoverItem(\"" + item + "\")'>" + this.cleanName(item) + ((itemObj.noUpgrade) ? "" : " Lv " + itemObj.level) + "</div>";
                if (this.popupMode == "items"){
                    if (this.hideMode)
                        line += "<button class='autoItem autoItemHide' onclick='autoBattle.hide(\"" + item + "\")'>Hide</button>";
                    else if (itemObj.noUpgrade) line += "<button class='autoItem autoColorGrey' aria-disabled=true>Unupgradable</button>"
                    else 
                        line += "<button id='itemUpgrade" + item + "'class='autoItem autoItemUpgrade' onclick='autoBattle.upgrade(\"" + item + "\")' onkeydown='autoBattle.hoverItem(\"" + item + "\", true, event)' onmouseover='autoBattle.hoverItem(\"" + item + "\", true)'>Upgrade (" + upgradeCost + ")</button>";
                }
                else if (this.popupMode == "hidden")
                    line += "<button class='autoItem autoItemRestore' onclick='autoBattle.restore(\"" + item + "\")'>Restore</button>";
				line += "</div>"
                count++;
                total++
            }
            if (total == 0){
                if (this.popupMode == "hidden") line += "<br/><b style='color: white; padding: 2%;'>You have no hidden items right now, but can hide items you're no longer using using the 'Hide Items' button above.</b>";
                else line += "<br/><b>All of your items are hidden!</b>";
            }

            text += "<div>" + line + "</div><br/></div>";
        }
        else if (this.popupMode == "bonuses"){
            for (var bonus in this.bonuses){
                var bonusObj = this.bonuses[bonus];
                if (bonusObj.useShards && this.maxEnemyLevel < 51) continue;
                var cost = this.getBonusCost(bonus);
                var costTextColor = ((!bonusObj.useShards && cost <= this.dust) || (bonusObj.useShards && cost <= this.shards)) ? "green" : "red";
                var costText = prettify(cost) + " " + ((bonusObj.useShards) ? "Shards" : "Dust");
                if (bonusObj.max && bonusObj.level >= bonusObj.max){
                    costTextColor = "red";
                    costText = "Max Level!"
                }
                costText = "<span id='" + bonus + "BonusPrice' class='" + costTextColor + "'>" + costText + "</span>";
                var maxLevel = (bonusObj.max) ? "Max Level " + bonusObj.max : "Unlimited Purchases";
                text += "<button id='" + bonus + "BonusBox' onclick='autoBattle.buyBonus(\"" + bonus + "\")' class='autoBonusBox'>" + this.cleanName(bonus) + "<br/>Level: " + bonusObj.level + " - " + costText + "<br/>" + bonusObj.description() + "<br/>" + maxLevel + "</button>";
            }
            var oneCount = 0;
            var ownedItems = this.countOwnedItems();
            for (var oneTime in this.oneTimers){
                var oneObj = this.oneTimers[oneTime];
                if (oneObj.owned) continue;
                oneCount++;
                if (this.maxEnemyLevel >= 51 && oneCount >= 3) break;
                if (oneCount >= 4) break;
                var cost = this.oneTimerPrice(oneTime);
                var costText = ((!oneObj.useShards && cost <= this.dust) || (oneObj.useShards && cost <= this.shards)) ? "green" : "red";

                costText = "<span id='" + oneTime + "BonusPrice' class='" + costText + "'>" + prettify(cost) + " " + ((oneObj.useShards) ? "Shards" : "Dust") + "</span>";
                if (ownedItems < oneObj.requiredItems){
                    var need = (oneObj.requiredItems - ownedItems);
                    text += "<div class='autoBonusBox autoOneTimerNotOwned' style='padding-top: 2%'><br/>Complete " + need + " more Contract" + needAnS(need) + " to reveal this bonus!</div>";
                }
                else text += "<button onclick='autoBattle.buyOneTimer(\"" + oneTime + "\")' class='autoBonusBox autoOneTimerNotOwned'>" + this.cleanName(oneTime) + "<br/>" + costText + "<br/>" + oneObj.description + "</button>";
            }
            text += "<br/>";
            for (var oneTime in this.oneTimers){
                var oneObj = this.oneTimers[oneTime];
                if (!oneObj.owned) continue;
                text += "<div class='autoBonusBox autoOneTimerOwned'>" + this.cleanName(oneTime) + "<br/><span class='green'>Owned!</span><br/>" + oneObj.description + "</div>";
            }
            text += "</div>";
        }
        else if (this.popupMode == "contracts"){
            var contracts = this.getContracts();
            for (var x = 0; x < contracts.length; x++){
                var item = contracts[x];
                var itemObj = this.items[item];
                var accepted = (this.activeContract == item) ? " accepted" : "";
                var description;
                if (accepted) description = "You have paid the " + ((itemObj.dustType == "shards") ? "Shards" : "Dust") + " and accepted this Contract.<br/>Huffy will gain access to this item as soon as you<br/><b style='font-size:1.3em'>Complete a U2 Z" + itemObj.zone + "+ Void Map</b>";
                else description = itemObj.description();
                var extraClass = "";
                if (itemObj.longText) extraClass = " descriptionSm";
                text += "<div class='contractBox" + accepted + "'><div class='contractTitle'>" + this.cleanName(item) + "</div><div class='contractDescription" + extraClass + "'>" + description + "</div>";
                if (accepted) text += "<button onclick='autoBattle.abandonContract()' class='btn btn-lg autoItemHide'>Abandon and Refund</button>";
                else if (!this.activeContract) text += "<button onclick='autoBattle.acceptContract(\"" + item + "\")' class='btn btn-lg colorVoidy'>Accept (" + prettify(this.contractPrice(item)) + " " + this.getCurrencyName(item) + ", Complete a Z" + itemObj.zone + " Void Map)</button>";
                else text += "<span class='btn btn-lg autoColorGrey'>Other Contract in Progress</span>";
                text += "</div>";
            }
            if (contracts.length < 3){
                var extraText = (contracts.length == 0) ? "There are no Contracts left to complete! Huffy is geared to the teeth!" : "&nbsp;";
                text += "<div class='contractBox' style='width: " + (33.3 * (3 - contracts.length)).toFixed(2) + "%'><div class='contractTitle'>&nbsp;</div><div class='contractDescription'>" + extraText + "</div><span class='btn btn-lg colorVoidy' style='visibility: hidden'>&nbsp</span>"
            }
        }
        else if (this.popupMode == "other"){
            text += "<div class='abOptions'>Settings:&nbsp;";
            for (var setting in this.settings){
                var thisSetting = this.settings[setting];
                if (typeof thisSetting.hideUnless !== 'undefined' && !thisSetting.hideUnless()) continue;
                var className = (thisSetting.enabled) ? "autoItemEquipped" : "autoItemHide";
                text += "<button class='btn btn-md " + className + "' onclick='autoBattle.toggleSetting(\"" + setting + "\")'>" + thisSetting.text[thisSetting.enabled] + "</button>";
            }
            text += "</div>";
            text += "<div class='abMiscBox'><b style='font-size: 1.1em;'>Undo last change</b><br/>";
            var action = this.lastActions[this.lastActions.length - 1];
            if (action){
                if (!this.confirmUndo) text += "<button class='btn autoItemUpgrade btn-md' onclick='autoBattle.confirmUndoClicked()'>Undo</button>";
                else text += "<b>Are you sure?!</b><br/><button class='btn autoItemUpgrade btn-md' onclick='autoBattle.restoreLastAction()'>Yes, Undo</button><button class='btn autoItemHide btn-md' onclick='autoBattle.confirmUndoClicked()'>No, Cancel</button>";
                text += "<br/>";
                if (action[0] == "ring"){
                    text += "Downgrade your ring by " + action[5] + " level" + needAnS(action[5]);
                }
                else {
                    var itemName = this.cleanName(action[1]);
                    text += "Downgrade " + itemName + " by " + action[5] + " level" + needAnS(action[5]);
                }
                text += ", and <b>SET YOUR DUST TO " + prettify(action[2]);
                if (this.maxEnemyLevel >= 51) text += " AND SHARDS TO " + prettify(action[6]);
                text += "</b> (The amount you had the moment before the upgrade).";
                if (this.maxEnemyLevel > action[3]) text += " Your progress will be set back to level " + action[3] + ".";
                else if (this.enemiesKilled > action[4]) text += " Your kill counter will be reduced by " + prettify(this.enemiesKilled - action[4]) + ".";
                text += "<br/>";
            }
            else text += "Undoing your last 3 actions would still leave you with less currency than you have now."
            text += "</div>"
            for (var x = 1; x <= 3; x++){
                var pname = 'p' + x;
                var preset = this.presets[pname];
                text += "<div class='abMiscBox preset'><b style='font-size: 1.1em;'>" + this.presets.names[x-1] + "</b><br/>";
                text += "<button class='btn autoItemEquipped btn-md' onclick='autoBattle.savePreset(\"p" + x + "\")'>Save</button>";
                if (preset.length) text += "<button class='btn autoItemUpgrade btn-md' onclick='autoBattle.loadPreset(\"p" + x + "\")'>Load</button>";
                text += "<button class='btn autoColorOrange btn-md' onclick='tooltip(\"Rename SA Preset\", null, \"update\", " + x + ")'>Rename</button>";
                text += "<div class='presetItems'>";
                var pname = 'p' + x;
                var preset = this.presets[pname];
                if (!preset.length) text += "Nothing Yet";
                for (var y = 0; y < preset.length; y++){
                    if (Array.isArray(preset[y])){
                        if (preset[y][0] == "level" && this.settings.loadLevel.enabled) text += ". Level " + preset[y][1];
                        if (preset[y][0] == "ring" && this.settings.loadRing.enabled){
                            text += ". Ring";
							if (autoBattle.rings.level >= 5) { 
								text += ": "
								for (var z = 1; z < preset[y].length; z++){
									if (z != 1) text += ", ";
									text += this.ringStats[preset[y][z]].name
								}
							}
                        }
                        continue;
                    }
                    if (!this.items[preset[y]] || !this.items[preset[y]].owned) continue;
                    if (y != 0) text += ", ";
                    text += this.cleanName(preset[y]);
                }
                text += "</div>";

                text += "</div>";
            }
            text += "</div>";
        }
        else if (this.popupMode == "rings"){
            text += this.getRingUi();
        }        
        if (itemsOnly && itemsElem){
            itemsElem.innerHTML = text;
        }
        else text += "</div>";
        var scrollTop = 0;
        if (itemsElem){
            scrollTop = itemsElem.scrollTop;
        }
		if (!(itemsOnly && itemsElem)) { cancelTooltip(); tooltip('confirm', null, 'update', text, '', 'Spire Assault', 'Close', false, true)}
        if (!(updateOnly && statsOnly)) this.updatePopupBtns();
        if (scrollTop > 0){
            itemsElem = document.getElementById('autoItemsDiv');
            if (itemsElem){
                itemsElem.scrollTop = scrollTop;
            }
        }
    }
}  

window.addEventListener('resize', function() {
if (!u2Mutations.open) return;
u2Mutations.openTree();
})

var u2Mutations = {
    open: false,
    respecOnPortal: false,
    purchaseCount: 0,
    curTransform: "",
    save: function(){
        var data = {};
        for (var item in this.tree){
            if (this.tree[item].purchased){
                data[item] = true;
            }
        }
        game.global.u2MutationData = data;
    },
    load: function(){
        var count = 0;
        for (var item in this.tree){
            if (game.global.u2MutationData[item]){
                this.tree[item].purchased = true;
                count++;
            }
            else this.tree[item].purchased = false;
        }
        this.purchaseCount = count;
        this.setAlert();
    },
    clear: function(){
        for (var item in this.tree){
            this.tree[item].purchased = false;
        }
        this.purchaseCount = 0;
    },
    respec: function(){
        for (var item in this.tree){
            if (this.tree[item].purchased){
                this.tree[item].purchased = false;
            }
        }
        game.global.mutatedSeeds += game.global.mutatedSeedsSpent;
        this.purchaseCount = 0;
        game.global.mutatedSeedsSpent = 0;
        this.openTree();
    },
    rings: [0, 10],
    tree: {
        Scruffy: {
            pos: [-3, 2],
            color: 'orange',
            description: "Scruffy gains 30% more experience from all sources.",
            purchased: false
        },
        NovaScruff: {
            pos: [-4, 7],
            dn: 'Scruffva',
            color: 'orange',
            require: ['Scruffy'],
            description: "Scruffy gains 300% of the Zone's XP when you kill a primary Nova enemy.",
            purchased: false
        },
        Worship: {
            pos: [-3, 11.5],
            dn: 'Praise the Light',
            color: 'orange',
            require: ['NovaScruff'],
            description: "One Worshipper per Zone changes their mind about leaving.",
            purchased: false
        },
        Nullifium: {
            pos: [-7, 3],
            color: 'orange',
            require: ['Scruffy'],
            description: "Gain 10% more Nullifium when recycling Heirlooms",
            purchased: false
        },
        Heirlots: {
            pos: [-10, 9.5],
            color: 'orange',
            require: ['Nullifium'],
            description: "In U2 above Z200, gain a +5% chance to find your highest available Heirloom tier, and a -5% chance to find the lowest.",
            purchased: false
        },
        Heirmazing: {
            pos: [-13, 16],
            color: 'orange',
            require: ['Heirlots'],
            description: "In U2, you find all Heirlooms at 1 reward tier higher than normal.",
            ring: 1,
            purchased: false
        },
        Slowva: {
            pos: [-12, 5],
            color: 'orange',
            require: ['Nullifium'],
            description: "When attacking a Nova enemy, take only one stack of blinded every 2 attacks.",
            purchased: false
        },
        Poppin: {
            pos: [-7, 18],
            dn: 'Poppin Off',
            color: 'orange',
            require: ['Heirmazing'],
            ring: 1,
            description: "+5% chance in Mutated Zones to spawn an extra Nova.",
            purchased: false
        },
        Worship2: {
            pos: [0, 18.5],
            dn: 'Dedicated',
            color: 'orange',
            require: ['Poppin', 'Worship'],
            ring: 1,
            description: "Worshippers no longer abandon Scruffy.",
            purchased: false
        },
        Health: {
            pos: [1, 2],
            color: '#b307b3',
            description: "Gain +50% Health in U2.",
            purchased: false
        },
        Trimps: {
            pos: [1, 10],
            dn: 'Small Trimps',
            color: '#b307b3',
            require: ["Health"],
            description: "50% more Trimps can fit in housing in U2.",
            purchased: false
        },
        Tauntimps: {
            pos: [6, 12],
            dn: "Tauntimp Farming",
            color: '#b307b3',
            require: ["Trimps"],
            description: "Every 10 Zones in U2, if you have seen fewer Tauntimps in your run than expected, breed the missing amount instantly. Expect 2 more Tauntimps than usual every 10 Zones.",
            purchased: false,
            check: function(){
                if (game.global.universe != 2 || !this.purchased) return;
                if (game.global.world % 10 != 0) return;
                checkAverageExotics("Tauntimp");
            }
        },
        AvgExotic: {
            pos: [14, 15],
            dn: 'Master Farmer',
            color: '#b307b3',
            require: ["Tauntimps"],
            description: "Every 10 Zones in U2 starting at Zone 15, if you have seen fewer Whipimps, Venimps, or Magnimps in your run than expected, breed the missing amount instantly. Expect 2 more of each than usual every 10 Zones",
            purchased: false,
            ring: 1,
            check: function(){
                if (game.global.universe != 2 || !this.purchased || game.global.world < 15) return;
                if (game.global.world % 10 != 5) return;
                var venimp = checkAverageExotics("Venimp");
                var whipimp = checkAverageExotics("Whipimp");
                var magnimp = checkAverageExotics("Magnimp");
                if (venimp + whipimp + magnimp > 0){
                    var text = "Your Trimps noticed that they had seen fewer Exotic Imports than they'd like this run, so they bred some more! Gained " + venimp + " Venimp" + needAnS(venimp) + ", " + whipimp + " Whipimp" + needAnS(whipimp) + ", and " + magnimp + " Magnimp" + needAnS(magnimp) + "."
                    message(text, "Loot", "gift", "exotic", "exotic");
                }
            }
        },
        Attack: {
            pos: [3, 7],
            color: '#b307b3',
            require: ["Health"],
            description: "Gain +50% Attack in U2.",
            purchased: false
        },
        Radon: {
            pos: [7, 8],
            color: '#b307b3',
            dn: 'Mutadon',
            require: ['Attack'],
            description: "Gain 25% more Radon from U2 Mutations.",
            purchased: false
        },
        AllRadon: {
            pos: [12, 9],
            dn: 'Mass Radon',
            color: '#b307b3',
            require: ['Radon'],
            description: "Gain +50% Radon in U2 above Z201.",
            purchased: false
        },
        Unrage: {
            pos: [6, 4],
            color: '#b307b3',
            require: ['Attack'],
            description: "Raging cells start with 4x attack instead of 5x",
            purchased: false
        },
        CritChance: {
            pos: [12, 4],
            dn: 'Mutated Crit',
            color: '#b307b3',
            require: ['Unrage'],
            description: "Gain +25% Crit Chance in U2.",
            purchased: false
        },
        GeneHealth: {
            pos: [21, 5],
            dn: 'Gene Health',
            color: '#b307b3',
            require: ['CritChance', 'AllRadon'],
            singleRequire: true,
            ring: 1,
            description: "Divide Breed Speed by 50, multiply Health by 10.",
        },
        GeneAttack: {
            pos: [18, 12],
            dn: 'Gene Attack',
            color: '#b307b3',
            require: ['CritChance', 'AllRadon'],
            singleRequire: true,
            ring: 1,
            description: "Divide Breed Speed by 50, multiply Attack by 10.",
        },
        Ragiffium: {
            pos: [23, 10],
            color: '#b307b3',
            require: ['GeneAttack', 'GeneHealth'],
            singleRequire: true,
            ring: 1,
            description: "Raging Cells drop 5% of the Nullifium Value of the highest available Heirloom tier at your current Zone."
        },
        Overkill1: {
            pos: [-3, -2],
            dn: 'Overkill',
            color: '#00b700',
            get description(){
                return "0.5% of your damage can Overkill 1 cell in U2, up to 30% of your Highest Zone reached (Overkill up to Z" + Math.floor(game.global.highestRadonLevelCleared * 0.3) + "). U1 Masteries that increase Overkill do not apply in U2.";
            },
            purchased: false
        },
        Overkill2: {
            pos: [-5, -7],
            dn: 'More Overkill',
            color: '#00b700',
            require: ['Overkill1'],
            get description(){
                return "You can Overkill in U2 for an additional 10% of your Highest Zone (up to 40% of Highest Zone, or Z" + Math.floor(game.global.highestRadonLevelCleared * 0.4) + ").";
            },
            purchased: false
        },
        Overkill3: {
            pos: [-8, -12],
            dn: 'Mass Overkill',
            color: '#00b700',
            require: ['Overkill2'],
            get description(){
                return "You can Overkill in U2 for an additional 10% of your Highest Zone (up to 50% of Highest Zone, or Z" + Math.floor(game.global.highestRadonLevelCleared * 0.5) + ").";
            },
            purchased: false
        },
        Decompress: {
            pos: [-8, -3],
            color: '#00b700',
            require: ['Overkill1'],
            description: "Compressed enemies gain 20% less attack and health from each cell they contain.",
            purchased: false
        },
        MaxOverkill: {
            pos: [-12, -7],
            dn: 'Max Overkill',
            color: '#00b700',
            require: ['Decompress'],
            description: "When Overkilling in U2, you can Overkill +1 Cell.",
            purchased: false
        },
        Liq1: {
            pos: [-17, -14],
            dn: 'Liquid',
            color: '#00b700',
            require: ['Overkill3', 'MaxOverkill'],
            singleRequire: true,
            ring: 1,
            get description(){
                return "You can Liquify Zones up to 10% of your Highest Zone. (Up to Z" + Math.floor(game.global.highestRadonLevelCleared * .1) + ")"
            },
            purchased: false,
        },
        Smashing: {
            pos: [-12, -17],
            dn: 'Smashing',
            color: '#00b700',
            require: ['Liq1'],
            description: "+5% chance in Mutated Zones to spawn an extra Compressed Cell.",
            purchased: false
        },
        Liq2: {
            pos: [-7, -18.5],
            dn: 'Liquidier',
            color: '#00b700',
            require: ['Smashing'],
            get description(){
                return "You can Liquify for an additional 10% of your Highest Zone (up to 20% of Highest Zone, or Z" + Math.floor(game.global.highestRadonLevelCleared * 0.2) + ")"
            },
            purchased: false
        },
        Smashing2: {
            pos: [-21, -9.5],
            dn: 'Smashing',
            color: '#00b700',
            require: ['Liq1'],
            description: "+5% chance in Mutated Zones to spawn an extra Compressed Cell.",
            purchased: false
        },
        Liq3: {
            pos: [-23.5, -4],
            dn: 'Waste Not',
            color: '#00b700',
            require: ['Smashing2'],
            get description(){
                var mult = canU2Overkill(true);
                if (!this.purchased){
                    mult += 0.1;
                    if (u2Mutations.tree.Liq2.purchased) mult += 0.1;
                }
                var text = "Your Overkill Zones no longer start until after Liquification.";
                if (u2Mutations.tree.Overkill1.purchased) text += " (With your currently purchased Mutators, Overkill up to " + prettify(mult * 100) + "% of Highest Zone, or Z" + Math.floor(game.global.highestRadonLevelCleared * mult) + ")";
                return text;
            },
            purchased: false
        },
        MaZ: {
            pos: [1,-2],
            dn: 'Mazzy',
            color: '#377cff',
            description: "Gain an additional Map at Zone row in Universe 2.",
            purchased: false
        },
        Loot: {
            pos: [5.65, -6.65],
            color: '#377cff',
            require: ['MaZ'],
            description: "All non-Radon loot gained in U2 is increased by 50%.",
            purchased: false
        },
        RandLoot: {
            pos: [1, -10],
            dn: 'Row Siphon',
            color: '#377cff',
            require: ['MaZ'],
            description: "Cells in Randomized Rows drop 0.5 seconds of Food, Wood, and Metal production on death per row number they were swapped with. For example, if you're fighting a cell on row 2 that has stats from row 9, you'll get 4.5 seconds of production per cell. Your Worshippers don't care about this mutated food but your other Trimps don't mind.",
            purchased: false
        },
        Dust: {
            pos: [10, -2],
            dn: 'Dusty',
            color: '#377cff',
            require: ['MaZ'],
            description: "Huffy earns 25% more Dust from all sources.",
            purchased: false
        },
        RandLoot2: {
            pos: [9.65, -10.65],
            dn: 'Siphonier',
            color: '#377cff',
            require: ['RandLoot', 'Loot'],
            description: "Gain 50% more seconds of loot from Randomized Rows (0.75 seconds per row).",
            purchased: false
        },
        Dust2: {
            pos: [12.65, -5.65],
            dn: 'Dustier',
            color: '#377cff',
            require: ['Dust'],
            description: "Huffy earns an additional 25% Dust from all sources.",
            purchased: false
        },
        Runed: {
            pos: [18, -12],
            dn: 'Runed',
            color: '#377cff',
            require: ['RandLoot2'],
            description: "Increases your Runetrinket cap by 50%. Speccing out of this Mutator stops any bonus earned from Runetrinkets above your cap, but does not remove them.",
            purchased: false,
            ring: 1
        },
        Brains: {
            pos: [11, -17],
            dn: 'Brains to Brawn',
            color: '#377cff',
            require: ['RandLoot2'],
            get description() {return "Increases Trimp Attack by a number based on your total stored Science. Grants +30% Attack at " + prettify(1e25) + " Science, or +300% at " + prettify(1e250) + ". At your current total of " + prettify(game.resources.science.owned) + " Science, <b>you " + ((this.purchased) ? "are gaining" : "would gain") + " +" + prettify((this.getBonus() - 1) * 100) + "% Trimp Attack</b>"},
            getBonus: function(){
				if (game.resources.science.owned < 1) return 1;
				var amt = 1 + (log10(game.resources.science.owned) / 83.3);
				if (amt < 1 || isNumberBad(amt)) return 1;
				return amt;
			},
            purchased: false,
            ring: 1
        },
        MadMap: {
            pos: [17, -17],
            dn: 'Mad Mapper',
            color: '#377cff',
            require: ['Runed', 'Brains'],
            description: "100% of your damage can Overkill in maps at any level. Limited to 1 cell of Overkill if above World Overkill Zone.",
            purchased: false,
            ring: 1
        },
        Randimp1: {
            pos: [5, -14],
            dn: 'Randimp',
            color: '#377cff',
            require: ['RandLoot'],
            description: "Randimps now give the loot of two different Exotic Imports when found.",
            purchased: false
        },
        Randimp2: {
            pos: [5, -19],
            dn: 'Really Randimp',
            color: '#377cff',
            require: ['Randimp1'],
            description: "Randimps now give the loot of three different Exotic Imports when found.",
            purchased: false,
            ring: 1
        }

    },
    purchase: function(what){
        var obj = this.tree[what];
        if (obj.purchased) return;
        var cost = this.nextCost();
        if (game.global.mutatedSeeds < cost) return;
        if (!this.checkRequirements(what)) return;
        obj.purchased = true;
        game.global.mutatedSeeds -= cost;
        game.global.mutatedSeedsSpent += cost; 
        this.purchaseCount++;
        this.openTree();
        this.setAlert();
    },
    setAlert: function(){
        const alertMutation = document.getElementById('mutatorsAlert');
        const alertMastery = document.getElementById('mutatorsAlert2');
        const alertText = game.options.menu.masteryTab.enabled !== 0 && game.global.mutatedSeeds >= this.nextCost() && this.purchaseCount < Object.keys(this.tree).length ? '!' : '';

        if (alertMutation.innerHTML !== alertText) alertMutation.innerHTML = alertText;
        if (alertMastery.innerHTML !== alertText) alertMastery.innerHTML = alertText;

        if (game.global.tabForMastery) {
            updateTalentNumbers();
        } else {
            const seedCount = document.getElementById('talentsEssenceTotal');
            const seedText = (game.options.menu.masteryTab.enabled == 2 || (game.options.menu.masteryTab.enabled == 3 && alertText != "!")) ? " (" + prettify(game.global.mutatedSeeds) + ")" : "";
            if (seedCount.innerHTML !== seedText) seedCount.innerHTML = seedText;
        }
    },
    showNames: function(){
        game.global.showU2MutNames = !game.global.showU2MutNames;
        this.openTree();
    },
    swapTab: function(toMutators){
        game.global.tabForMastery = !toMutators;
        if (toMutators) {
            this.openTree();
            filterTabs('all');
        }
        else {
            this.closeTree();
            filterTabs('talents');
        }
        this.setAlert();
    },
    getMasteryAlert: function(){
        //To show the alert on the 'show masteries' button
        if (!((game.options.menu.masteryTab.enabled == 1 || game.options.menu.masteryTab.enabled == 3))) return "";
        var cost = getNextTalentCost();
        if (cost == -1) return "";
        if (game.global.essence >= cost) return '&nbsp;<span class="alert badge">!</span>&nbsp;&nbsp;';
        return "";
    },
    toggleRespec: function(displayOnly, forceHide){
        var mutRespecBtn = document.getElementById('respecMutatorsBtn');
        if (forceHide || game.global.highestRadonLevelCleared < 200 || this.purhcaseCount < 1) {
            this.respecOnPortal = false;
            mutRespecBtn.style.display = 'none';
            return;
        }
        if (!displayOnly) this.respecOnPortal = !this.respecOnPortal;
        mutRespecBtn.style.display = 'inline-block';
        mutRespecBtn.innerHTML = (this.respecOnPortal) ? 'Cancel Mutator Respec' : 'Respec Mutators On Portal';
        var newClass = (this.respecOnPortal) ? 'autoColorOrange' : 'autoColorTeal';
        swapClass('autoColor', newClass, mutRespecBtn);

    },
    checkRequirements: function(what, ignoreRings){
        var itemObj = this.tree[what];
        if (!ignoreRings && itemObj.ring && itemObj.ring > 0 && this.purchaseCount < this.rings[itemObj.ring]) return false;
        if (!itemObj.require) return true;
        for (var y = 0; y < itemObj.require.length; y++){
            if (!this.tree[itemObj.require[y]].purchased){
                if (!itemObj.singleRequire){
                    return false;
                }
            }
            else if (itemObj.singleRequire){
                return true;
            }
        }
        return (itemObj.singleRequire) ? false : true;
    },
    lastX: null,
    lastY: null,
    translateX: 0,
    translateY: 0,
    lastEvent: 0,
    scale: 1,
    dragging: function(e) {
        var leftMouse = (e.buttons >> 0 & 1) != 0;
        if(leftMouse) {
            var x = e.clientX;
            var y = e.clientY;
            if(u2Mutations.lastX == null) {
                u2Mutations.lastX = x; 
                u2Mutations.lastY = y; 
                return;
            }
            u2Mutations.translateX += x - u2Mutations.lastX;
            u2Mutations.translateY += y - u2Mutations.lastY;
            u2Mutations.update();
            u2Mutations.lastX = x; 
            u2Mutations.lastY = y;
        }
    },
    update: function() {
		var transform = "translate(" + this.translateX + "px, " + this.translateY + "px) scale(" + (this.scale) + ")";
        document.getElementById('mutTree').style.transform = transform;
		this.curTransform = transform; 
    },
    reset: function() {
        if(document.getElementById('mutTree').style.transform === '') {
            this.translateX = 0;
            this.translateY = 0;
            this.scale = 1;
		    this.curTransform = "";
        }
    },
    zoomClicked: function(dir){
        if(dir > 0) {
            this.scale -= 0.1;
        }
        else if(dir < 0) {
            this.scale += 0.1;
        }
        if(this.scale > 1.5) this.scale = 1.5;
        if(this.scale < 0.5) this.scale = 0.5;
        var transform = "translate(" + this.translateX + "px, " + this.translateY + "px) scale(" + (this.scale) + ")";
        document.getElementById('mutTree').style.transform = transform;
		this.curTransform = transform; 
    },
    openTree: function(){
        var scale = Math.min(window.innerWidth, window.innerHeight) / 32;
        //Control sizes of  various elements
        var mutLineWidth = 0.125;
        var arrowLength = 0.5;
        var arrowSize = 0.1;
        var boxScale = 2 * scale;
		screenReaderAssert("Press Shift S to return to the top of the Mutator screen");

        document.getElementById('mutTreeWrapper').style.display = 'block';
        document.getElementById("wrapper").style.display = "none";
        document.getElementById('mutTreeWrapper').innerHTML = '';
        var costText = (Object.keys(this.tree).length > this.purchaseCount) ? "Next Mutator Costs: " + prettify(this.nextCost()) : "All Mutators Purchased!";
        var curTransform = (this.curTransform) ? " style='transform: " + this.curTransform + ";'" : "";
        var text = "<hr class='visually-hidden' title='top of tooltip'/><div style='position: relative; z-index:2;'><div id='mutMenu' aria-owns='masteryInfo' style='position: absolute; top: 2%; left: 2%; display: inline-block;'><span aria-hidden=true style='font-size: 1.1em; margin-left: 0.25em;' class='btn btn-lg btn-info' onclick='u2Mutations.showNames()' id='u2MutShowNameBtn'>" + ((game.global.showU2MutNames) ? "Hide Names" : "Show Names") + "</span><br/><span tabindex=0 role=button style='font-size: 1.1em; margin-top: 0.25em;' id='swapToMasteryBtn' class='btn btn-lg btn-success' onclick='u2Mutations.swapTab(false)'>Show Masteries" + this.getMasteryAlert() + "</span></div><div id='mutSeedCounter' style='background-color: black'>Seeds Available: " + prettify(game.global.mutatedSeeds) + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" + costText + "</div><span role=button tabindex=0 aria-label='close' id='mutTreeCloseBtn' class='icomoon icon-close' onclick='u2Mutations.closeTree()'></span></div><div id='mutTree'" + curTransform + ">";
        text += "<div id='mutRing1' style='width: " + (40.8*scale) + "px; height: " + (33.0*scale) + "px; top: " + (-16.5*scale) + "px; left: " + (-20.4*scale) + "px;'></div>"
		const headers = {Scruffy: "Scruffy and Heirlooms", Health: "Combat, Radon, and Imports", MaZ: "Resources", Overkill1: "Speed"}
        for (var item in this.tree){
            
            var coords = this.tree[item].pos;
            var itemObj = this.tree[item];
            var bgColor = 'available';
            if (itemObj.purchased) bgColor = 'purchased';
            else if (!this.checkRequirements(item)) bgColor = 'requirement';
			var SRBuyText = `${(bgColor == 'requirement') ? "requirement not met" : bgColor }`
            var dn = (itemObj.dn) ? itemObj.dn : item;
			if (usingScreenReader && item in headers) text += `<h1 class='visually-hidden'>${headers[item]}</h1>`
			let tooltip = (usingScreenReader ? '' : 'onmouseover="tooltip(\'' + item + '\', \'Mutator\', event)" onmouseout="tooltip(\'hide\')"')
            text += '<button aria-labelledby="' + item + 'Name" onclick="u2Mutations.purchase(\'' + item + '\')" ' + tooltip + ' id="' + item + 'MutatorBox" class="mutatorBox mutatorBox' + bgColor + '" style="color: ' + itemObj.color + '; width: ' + (boxScale) + 'px; height: ' + (boxScale) + 'px; left: ' + (coords[0] * scale) + 'px; top: ' + (coords[1] * scale) + 'px; font-size: ' + scale * 1.5 + 'px">';
            if (usingScreenReader ) {
				text += '<span class="mutTreeName" id="' + item + 'Name">' + dn + ' ' + SRBuyText + '</span>';
			}
			else {
				if (game.global.showU2MutNames) text += '<span class="mutTreeName">' + dn + '</span>';
			}
            text += '<span class="icomoon icon-star"></span></button>';
            if (!itemObj.require) continue;
            var connect = itemObj.require;
            for (var x = 0; x < connect.length; x++){
                var thisConnect = this.tree[connect[x]].pos;
                var distanceX = thisConnect[0] - coords[0];
                var distanceY = thisConnect[1] - coords[1];
                var length = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
                var angle = Math.atan2(distanceY, distanceX) * 180 / Math.PI;
                var left = (coords[0] * scale + (boxScale/2) - (length*scale/2) + (distanceX/2*scale));
                var top = ((coords[1] - mutLineWidth/2) * scale + (boxScale/2) + (distanceY/2*scale));
                var width = (length * scale);
                var color = itemObj.singleRequire ? "grey" : "white";
                var line = '<div class="mutLine mutLine' + color + '" style="left: ' + left + 'px; top: ' + top + 'px; height: ' + (mutLineWidth*scale) + 'px; width: ' + width + 'px; transform: rotate(' + angle + 'deg);">&nbsp;</div>'
                text += line;

                
                var arrowMidpointX = (thisConnect[0] - (distanceX/2))*scale + (boxScale/2) - (arrowLength*scale/2);
                var arrowMidpointY = (thisConnect[1] - (distanceY/2))*scale + (boxScale/2) - (arrowLength*scale/2);

                text += '<div class="mutArrow mutArrow' + color + '" style="border-left-width:' + (arrowSize*scale) + 'px; border-top-width:' + (arrowSize*scale) + 'px; width: ' + (arrowLength*scale) + 'px; height: ' + (arrowLength*scale) + 'px; top: ' + arrowMidpointY + 'px; left: ' + arrowMidpointX + 'px; transform: rotate(' + (angle-45) + 'deg);"></div>'
            }
        }
        text += "</div>"
        text += "<div id='mutZoomButtons'><button aria-label='Mastery Information' id='masteryInfo' onmouseover='tooltip(\"Mastery Info\", null, event);' onmouseout='tooltip(\"hide\")'>M</button><div id='mutZoomIn' aria-hidden=true onclick='u2Mutations.zoomClicked(-1);' onmouseover='tooltip(\"Zoom In\", \"customText\", event, \"Click this to Zoom In to the Mutators tree. You can also use mouse wheel to zoom, or click and drag the tree to move it around.\");' onmouseout='tooltip(\"hide\")'><span class='icomoon icon-zoom-in'></span></div><div id='mutZoomOut' aria-hidden=true onclick='u2Mutations.zoomClicked(1);' onmouseover='tooltip(\"Zoom Out\", \"customText\", event, \"Click this to Zoom Out of the Mutators tree. You can also use mouse wheel to zoom, or click and drag the tree to move it around.\");' onmouseout='tooltip(\"hide\")'><span class='icomoon icon-zoom-out'></span></div></div>";
        text += "<hr class='visually-hidden' title='bottom of tooltip'/>"
		document.getElementById('mutTreeWrapper').innerHTML = text;
		for (let item in this.tree){
			makeAccessibleTooltip(`${item}MutatorBox`, [item, "Mutator"])
		}
		makeAccessibleTooltip("masteryInfo", ["Mastery Info", null])
        this.open = true;
    },
    closeTree: function(){
        this.open = false;
        document.getElementById('mutTreeWrapper').style.display = 'none';
        document.getElementById("wrapper").style.display = "block";
    },
    nextCost: function(){
        return 300 * Math.pow(2, this.purchaseCount);
    },
    rewardMutation: function(cell){
        if (!cell.u2Mutation || !cell.u2Mutation.length) return 0;
        if (game.global.spireActive && game.global.universe == 2){
            this.types.Spire1.onDeath(cell);
            return;
        }
        var reward = game.global.world - 199;
        var rewardMult = 0;
        if (cell.u2Mutation.length >= 2) giveSingleAchieve("Double Trouble");
        var nullText = "";
        var expText = "";
        for (var x = 0; x < cell.u2Mutation.length; x++){
            var mut = cell.u2Mutation[x];
            if (mut == 'RGE'){
                rewardMult += this.types.Rage.rewardMult();
                if (this.tree.Ragiffium.purchased){
                    var full = getRecycleValueByRarity(getHeirloomRarity(game.global.world, 1, false, true));
                    game.global.nullifium += (full * 0.05);
                    nullText = " and " + prettify(full * 0.05) + " Nullifium";
                }
            }
            else if (mut == 'NVA' || mut == 'NVX'){
                rewardMult += this.types.Nova.rewardMult();
                if (this.tree.NovaScruff.purchased && mut == 'NVA') {
					var novaExpRewardValue = Fluffy.rewardExp(3);
                    expText = " and " + prettify(novaExpRewardValue) + " Exp";
                }
            }
            else if (mut == 'CMP' || mut == 'CMX') rewardMult += this.types.Compression.rewardMult();
            else if (mut == 'CSP' || mut == 'CSX'){
                rewardMult += this.types.Swapper.rewardMult();
                if (u2Mutations.tree.RandLoot.purchased){
                    var seconds = Math.floor(cell.cs / 10);
                    if (u2Mutations.tree.RandLoot2.purchased) seconds *= 0.75;
                    else seconds *= 0.5;
                    var eligible = ["food", "wood", "metal"];
                    var cMessage = "You earned ";
                    for (var y = 0; y < eligible.length; y++){
                        var item = eligible[y];
                        var amt = simpleSeconds(item, seconds);
                        amt = scaleLootBonuses(amt, true);
                        addResCheckMax(item, amt, true, null, true);
                        cMessage += prettify(amt) + " " + item;
                        if (y == (eligible.length - 1)) cMessage += "!";
                        else if (y == (eligible.length - 2)) cMessage += ", and ";
                        else cMessage += ", ";
                    }
                    cMessage += " from that Randomized enemy!"
                    message(cMessage, "Loot", "*dice", null, "primary");
                }
            }
        }
        reward *= rewardMult;
        reward *= cell.u2Mutation.length;
        if (game.global.desoCompletions > 0) reward *= game.challenges.Desolation.getTrimpMult();
        if (game.global.challengeActive == "Daily"){
            reward *= (1 + (getDailyHeliumValue(countDailyWeight()) / 100));
        }
        if (Fluffy.isRewardActive("bigSeeds")) reward *= 10;
        reward *= u2SpireBonuses.seedDrop();
        reward = calcHeirloomBonus("Staff", "SeedDrop", reward);
        game.global.mutatedSeeds += reward;
        if (typeof game.global.messages.Loot.seeds === 'undefined') game.global.messages.Loot.seeds = true;
        message("You found " + prettify(reward) + " Mutated Seed" + needAnS(reward) + nullText + expText + " on that " + this.getName(cell.u2Mutation) + " enemy!", 'Loot', null, 'seedMessage', 'seeds', null, 'background-color: ' + this.getColor(cell.u2Mutation));
        game.stats.mutatedSeeds.value += reward;
        checkAchieve("mutatedSeeds");
        if (!game.global.runningChallengeSquared){
            var radonPct = rewardMult * 0.25;
            if (u2Mutations.tree.Radon.purchased) radonPct *= 1.25;
            var radonReward = rewardResource("helium", 1, 99, false, radonPct);
            message("You were able to take " + prettify(radonReward) + " Radon Vials from that Mutated Enemy!", "Loot", heliumIcon(true), 'helium', 'helium');
        }

        if (this.open) {
            const nextCost = this.nextCost();
            if (game.global.mutatedSeeds >= nextCost) {
                this.openTree();
            } else {
                const seedElem = document.getElementById('mutSeedCounter');
                const costText = Object.keys(this.tree).length > this.purchaseCount ? 'Next Mutator Costs: ' + prettify(nextCost) : 'All Mutators Purchased!';
                const seedText = `Seeds Available: ${prettify(game.global.mutatedSeeds)}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;${costText}`;
                if (seedElem.innerHTML !== seedText) seedElem.innerHTML = seedText;
            }
        }
		
        this.setAlert();
    },
    addMutations: function(array){
        if (game.global.spireActive && game.global.universe == 2) return this.types.Spire1.pattern(array);
        if (game.global.world < 201) return array;
        var thisTypes = this.getTypes();
        if (thisTypes.length == 0) return array;
        for (var item in this.types){
            if (thisTypes.indexOf(item) != -1) array = this.types[item].pattern(array);
        }
        return array;
    },
    getAttack: function(cell){
        var baseAttack;
        var addAttack = 0;
        if (cell.cs){
            baseAttack = game.global.getEnemyAttack(cell.cs, cell.name);
        }
        else baseAttack = game.global.getEnemyAttack(cell.level, cell.name);
        if (cell.cc) addAttack = this.types.Compression.attack(cell, baseAttack);  
        if (cell.u2Mutation.indexOf('NVA') != -1) baseAttack *= 0.01;
        else if (cell.u2Mutation.indexOf('NVX') != -1) baseAttack *= 10;
        baseAttack += addAttack;
        baseAttack *= Math.pow(1.01, (game.global.world - 201));
        return baseAttack;
    },
    getHealth: function(cell){
        var baseHealth;
        var addHealth = 0;
        if (cell.cs){
            baseHealth = game.global.getEnemyHealth(cell.cs, cell.name);
        }
        else baseHealth = game.global.getEnemyHealth(cell.level, cell.name);
        if (cell.cc) addHealth = this.types.Compression.health(cell, baseHealth);
        if (cell.u2Mutation.indexOf('NVA') != -1) baseHealth *= 0.01;
        else if (cell.u2Mutation.indexOf('NVX') != -1) baseHealth *= 0.1;
        baseHealth += addHealth;
        baseHealth *= 2;
        baseHealth *= Math.pow(1.02, (game.global.world - 201));
        return baseHealth;
    },
    getTypes: function(){
        if (game.global.universe != 2) return [];
        if (game.global.world == 201) return ["Rage"];
        else if (game.global.world == 202) return ["Compression"];
        else if (game.global.world == 203) return ["Nova"];
        else if (game.global.world == 204) return ["Swapper"];
        var thisMutations = [];
        var options = ["Rage", "Compression", "Nova", "Swapper"];
        var runTimes = Math.floor((game.global.world - 201) / 50) + 1;
        if (runTimes > 4) runTimes = 4;
        for (var x = 0; x < runTimes; x++){
            var roll = getRandomIntSeeded(game.global.u2MutationSeed++, 0, options.length);
            var result = options.splice(roll, 1);
            thisMutations.push(result[0]);
        }
        return thisMutations;
    },
    getColor: function(thisMutation){
        var colors = {
            RGE: {
                r: 102,
                g: 0,
                b: 102
            },
            CMP: {
                r: 0,
                g: 51,
                b: 0
            },
            CMX: {
                r: 51,
                g: 153,
                b: 102
            },
            NVA: {
                r: 255,
                g: 153,
                b: 0
            },
            NVX: {
                r: 204,
                g: 51,
                b: 0
            },
            CSP: {
                r: 0,
                g: 51,
                b: 153
            },
            CSX: {
                r: 0,
                g: 51,
                b: 153
            },
            S1G: {
                r: 34,
                g: 177,
                b: 76
            },
            S1O: {
                r: 255,
                g: 127,
                b: 39
            },
            S1R: {
                r: 255,
                g: 0,
                b: 0
            }
    
        }
        if (thisMutation.length == 1){
            var useColor = colors[thisMutation[0]];
            return "rgb(" + useColor.r + ", " + useColor.g + ", " + useColor.b + ")";
        }
        var r = 0;
        var g = 0; 
        var b = 0;
        for (var x = 0; x < thisMutation.length; x++){
            var useColor = colors[thisMutation[x]];
            r += useColor.r;
            g += useColor.g;
            b += useColor.b;
        }
        var length = thisMutation.length;
        r = Math.floor(r / length);
        g = Math.floor(g / length);
        b = Math.floor(b / length);
        return "rgb(" + r + ", " + g + ", " + b + ")";
    },
    getName: function(mutList){
        var text = "";
        var nameList = [];
        for (var y = 0; y < mutList.length; y++){
            var name = mutList[y];
            if (name == "RGE") name = "Rage";
            else if (name == "NVA" || name == "NVX") name = "Nova";
            else if (name == "CSX" || name == "CSP") name = "Swapper";
            else if (name == "CMP" || name == "CMX") name = "Compression";
            else if (name == "S1G" || name == "S1R" || name == "S1O") name = "Spire1";
            if (nameList.indexOf(name) != -1) continue;
            nameList.push(name);
        }
        for (var x = 0; x < nameList.length; x++){
            var isPre = (x == 0);
            var isPost = (x == (nameList.length - 1));
            var isMid = (!isPre && !isPost);
            var isFull = (nameList.length == 1);
            var name = nameList[x];
            var target;

            if (isFull) target = "name";
            else if (isPre) target = "pre";
            else if (isPost) target = "post";
            else if (isMid) target = "mid";
            
            text += this.types[name][target];
        }
        return text;
    },
    checkStacks: function(){
        if (game.global.novaMutStacks > 0 && !game.global.mapsActive) this.types.Nova.drawStacks();
        if (game.global.spireMutStacks > 0 && !game.global.mapsActive) this.types.Spire1.drawStacks();
    },
    clearStacks: function(){
        this.types.Nova.clearStacks();
		this.types.Rage.clearStacks();
        this.types.Spire1.clearStacks();
    },
    types: {
        Spire1: {
            pattern: function(currentArray){
                var shape = this.getShape();
                for (var x = 0; x < shape.length; x++){
                    var thisShape = shape[x];
                    currentArray[thisShape[0]].u2Mutation.push(this.defs[thisShape[1]]);
                }
                return currentArray;
            },
            getShape: function(){
                switch(game.global.spireLevel){
                    case 1:
                        return [[4,0],[14,0]];
                    case 2:
                        return [[4,0],[14,0],[24,0],[34,0],[44,0],[54,0]];
                    case 3:
                        return [[3,0],[4,0],[14,0],[24,0],[34,0],[44,0],[53,0],[54,0],[64,0]];
                    case 4:
                        return [[3,0],[4,0],[5,0],[14,0],[15,0],[24,0],[25,0],[34,0],[44,0],[53,0],[54,0],[64,0],[74,0]];
                    case 5:
                        return [[3,0],[4,0],[5,0],[6,0],[14,0],[15,0],[24,0],[25,0],[34,0],[44,0],[53,0],[54,0],[63,0],[64,0],[73,0],[74,0],[82,0],[83,0]];
                    case 6:
                        return [[3,0],[4,0],[5,0],[6,0],[14,0],[15,0],[24,0],[25,0],[34,0],[35,0],[44,0],[45,0],[53,0],[54,0],[55,0],[63,0],[64,0],[65,0],[73,0],[74,0],[75,0],[76,0],[82,0],[83,0],[86,0],[96,0],[97,0]];
                    case 7:
                        return [[2,0],[3,0],[4,0],[5,0],[6,0],[13,0],[14,0],[15,0],[23,0],[24,0],[25,0],[33,0],[34,0],[35,0],[43,0],[44,0],[45,0],[53,0],[54,0],[55,0],[63,0],[64,0],[65,0],[72,0],[73,0],[74,0],[75,0],[76,0],[81,0],[82,0],[83,0],[85,0],[86,0],[87,0],[92,0],[97,0]];    
                    case 8:
                        return [[2,0],[3,0],[4,0],[5,0],[6,0],[13,0],[14,0],[15,0],[23,0],[24,0],[25,0],[33,0],[34,0],[35,0],[41,0],[42,0],[43,0],[44,0],[45,0],[53,1],[54,0],[55,0],[63,0],[64,0],[65,0],[72,0],[73,0],[74,0],[75,0],[76,0],[81,0],[82,0],[83,0],[85,0],[86,0],[87,0],[91,0],[93,0],[95,0],[97,0]];
                    case 9:
                        return [[2,0],[3,0],[4,0],[5,0],[6,0],[13,0],[14,0],[15,0],[23,0],[24,0],[25,0],[33,0],[34,0],[35,0],[40,0],[41,0],[42,0],[43,0],[44,0],[45,0],[46,0],[51,0],[53,1],[54,0],[55,1],[60,0],[61,0],[63,0],[64,0],[65,0],[72,0],[73,0],[74,0],[75,0],[76,0],[81,0],[82,0],[83,0],[85,0],[86,0],[87,0],[91,0],[93,0],[95,0],[97,0]];
                    case 10:
                        return [[2,0],[3,0],[4,0],[5,0],[6,0],[13,0],[14,0],[15,0],[23,0],[24,0],[25,0],[33,0],[34,0],[35,0],[38,0],[40,0],[41,0],[42,0],[43,0],[44,0],[45,0],[46,0],[47,0],[48,0],[51,0],[53,1],[54,0],[55,1],[57,0],[60,0],[61,0],[63,0],[64,0],[65,0],[72,0],[73,0],[74,0],[75,0],[76,0],[81,0],[82,0],[83,0],[85,0],[86,0],[87,0],[88,0],[89,0],[91,0],[93,0],[95,0],[97,0],[99,2]]
                }
            },
            hasMut: function(cell){
                if (!cell.u2Mutation || !cell.u2Mutation.length) return false;
                var mut = cell.u2Mutation[0];
                if (mut == "S1G" || mut == "S1O" || mut == "S1R") return true;
            },
            removeStacks: function(){
                game.global.spireMutStacks = 0;
                this.clearStacks();
            },
            clearStacks: function(){
				manageStacks(null, null, true, 'spireMutStacks', null, null, true);
			},
			drawStacks: function(){
				manageStacks('Spore Cloud', game.global.spireMutStacks.toFixed(1), true, 'spireMutStacks', 'icomoon icon-sun', this.stackTooltip());
			},
            stackTooltip: function(){
                return "The Spore Cloud is choking your Trimps and strengthening the Bad Guys! Trimps deal " + prettify(this.trimpAttackMult()) + "x damage, and enemies deal " + prettify(this.enemyAttackMult()) + "x damage. Gain 1/10th of a stack for every attack against Natural enemies in this Spire and 1 stack when killing them. Stacks reset when completing a Floor. Active in World only."
            },
            onDeath: function(cell){
                var mut = cell.u2Mutation[0];
                if (mut == "S1G") game.global.spireMutStacks++;
                else if (mut == "S1O") game.global.spireMutStacks += 10;
                this.drawStacks();
            },
            attacked: function(cell){
                var mut = cell.u2Mutation[0];
                if (mut == "S1G") game.global.spireMutStacks += 0.1;
                else if (mut == "S1O") game.global.spireMutStacks += 1;
                else if (mut == "S1R") game.global.spireMutStacks += 2;
                this.drawStacks();
            },
            trimpAttackMult: function(){
                return Math.pow(0.99, game.global.spireMutStacks);
            },
            enemyAttackMult: function(){
                return Math.pow(1.01, game.global.spireMutStacks);
            },
            defs: ["S1G", "S1O", "S1R"],
            name: "Natural"
        },
        Rage: {
            pattern: function(currentArray){
                var possible = this.cellCount();
                var spread = (Math.floor(possible / 6) + 1) * 10;
                if (spread > 100) spread = 100;
                var addCorrupteds = getAmountInRange(spread, possible, true);
                for (var a = 0; a < addCorrupteds.length; a++){
                 currentArray[addCorrupteds[a]].u2Mutation.push("RGE");
                }
                return currentArray;
            },
            rewardMult: 1,
            cellCount: function(){
                var max = 60;
                var stacks = 5 + Math.floor((game.global.world - 201) / 5);
                if (stacks > max) stacks = max;
                return stacks;
            },
            hasRage: function(cell){
                if (cell.u2Mutation.indexOf('RGE') != -1) return true;
                if (cell.cc && cell.cc[3] > 0) return true;
                return false;
            },
            attacked: function(){
                this.drawStacks();
                updateAllBattleNumbers();
            },
            enemyAttackMult: function(){
                var base = 5;
                if (u2Mutations.tree.Unrage.purchased) base = 4;
                var enemyCell = getCurrentWorldCell();
                var healthPct = enemyCell.health / enemyCell.maxHealth;
                base *= healthPct;
                return base;
            },
            removeStacks: function(){
                game.global.novaMutStacks = 0;
                this.clearStacks();
            },
            clearStacks: function(){
				manageStacks(null, null, false, 'rageMutStacks', null, null, true);
			},
			drawStacks: function(){
                var stacks = this.enemyAttackMult().toFixed(1);
				manageStacks('Rage', stacks, false, 'rageMutStacks', 'icomoon icon-bullseye', this.stackTooltip());
			},
            stackTooltip: function(){
                var mult = (u2Mutations.tree.Unrage.purchased) ? 4 : 5;
                return "This enemy is enraged! Damage it to weaken it back down. Deals " + mult + "x attack damage, reduced by its remaining percentage of health."
            },
            rewardMult: function(){
                return 1;
            },
            name: "Raging",
            pre: "Rag"
        },
        Nova: {
            pattern: function(currentArray){
                var size = this.novaSize();
                var min = size;
                var max = 9 - size;
                var repeats = this.repeats();
                if (u2Mutations.tree.Poppin.purchased){
                    var chance = 5;
                    var roll = getRandomIntSeeded(game.global.u2MutationSeed++, 0, 100);
                    if (roll < chance) repeats++;
                }
                for (var y = 0; y < repeats; y++){
                    var startC = getRandomIntSeeded(game.global.u2MutationSeed++, min, max);
                    var startR = getRandomIntSeeded(game.global.u2MutationSeed++, min, max);
                    var start = (startR * 10) + startC;
                    currentArray[start].u2Mutation.push('NVA');
                    var cells = [];
                    for (var x = 1; x < size + 1; x++){				
                        cells.push(start + (1 * x));
                        cells.push(start - (1 * x));
                        cells.push(start + (10 * x));
                        cells.push(start - (10 * x));
                    }
                    for (var x = 0; x < cells.length; x++){
                        var thisCell = currentArray[cells[x]].u2Mutation;
                        thisCell.push('NVX');
                    }
                }
                return currentArray;
            },
            novaSize: function(){
                var max = 3;
                var stacks = 1 + Math.floor((game.global.world - 201) / 100);
                if (stacks > max) stacks = max;
                return stacks;
            },
            repeats: function(){
                var max = 3;
                var stacks = 1 + Math.floor((game.global.world - 201) / 75);
                if (stacks > max) stacks = max;
                return stacks;
            },
            hasNova: function(cell){
                if (cell.u2Mutation.indexOf('NVA') != -1) return true;
                if (cell.cc && cell.cc[4] > 0) return true;
                return false;
            },
            attacked: function(){
                if (game.global.novaMutStacks < 50) {
                    if (u2Mutations.tree.Slowva.purchased) game.global.novaMutStacks += 0.5;
                    else game.global.novaMutStacks++;
                }
                else game.global.novaMutStacks = 50;
                this.drawStacks();
                updateAllBattleNumbers();
            },
            trimpAttackMult: function(){
                return Math.pow(0.99, Math.ceil(game.global.novaMutStacks));
            },
            enemyAttackMult: function(){
                return Math.pow(1.01, Math.ceil(game.global.novaMutStacks));
            },
            removeStacks: function(){
                game.global.novaMutStacks = 0;
                this.clearStacks();
            },
            clearStacks: function(){
				manageStacks(null, null, true, 'novaMutStacks', null, null, true);
			},
			drawStacks: function(){
				manageStacks('Blinded', Math.ceil(game.global.novaMutStacks), true, 'novaMutStacks', 'icomoon icon-sun', this.stackTooltip());
			},
            stackTooltip: function(){
                return "Your Trimps are blinded by the Nova! Trimps deal " + prettify(this.trimpAttackMult()) + "x damage, and enemies deal " + prettify(this.enemyAttackMult()) + "x damage. Stacks increase when attacking Nova enemies and clear when you complete this Zone. Active in World only, can stack up to 50 times."
            },
            rewardMult: function(){
                var cells = (1 + (this.novaSize() * 4)) * this.repeats();
                return (u2Mutations.types.Rage.cellCount() / cells);
            },
            name: "Novad",
            pre: "Nov",
            mid: "ova",
            post: "vad"
        },
        Swapper: {
            pattern: function(currentArray){
                var froms = [0,1,2,3,4];
                var tos = [5,6,7,8];
                var repeats = this.repeats();
                for (var y = 0; y < repeats; y++){
                    var swapFrom = getRandomIntSeeded(game.global.u2MutationSeed++, 0, froms.length);
                    var swapTo = getRandomIntSeeded(game.global.u2MutationSeed++, 0, tos.length);
                    swapFrom = froms.splice(swapFrom, 1)[0];
                    swapTo = tos.splice(swapTo, 1)[0];
                    for (var x = 0; x < 10; x++){
                        var cellFrom = (swapFrom * 10) + x;
                        var cellTo = (swapTo * 10) + x;
                        currentArray[cellFrom].u2Mutation.push('CSX');
                        currentArray[cellFrom].cs = cellTo;
                        currentArray[cellTo].u2Mutation.push('CSP');
                        currentArray[cellTo].cs = cellFrom;
                    }
                }
                return currentArray;
            },
            rewardMult: function(){
                return (u2Mutations.types.Rage.cellCount() / (this.repeats() * 20));
            },
            repeats: function(){
                var max = 4;
                var stacks = 1 + Math.floor((game.global.world - 201) / 50);
                if (stacks > max) stacks = max;
                return stacks;
            },
            name: "Randomized",
            pre: "Rand",
            mid: "dom",
            post: "ized"
        },
        Compression: {
            pattern: function(currentArray){
                var repeat = this.repeats();
                var count = this.cellCount();
                if (u2Mutations.tree.Smashing.purchased || u2Mutations.tree.Smashing2.purchased){
                    var chance = 0;
                    if (u2Mutations.tree.Smashing.purchased) chance += 5;
                    if (u2Mutations.tree.Smashing2.purchased) chance += 5;
                    var roll = getRandomIntSeeded(game.global.u2MutationSeed++, 0, 100);
                    if (roll < chance) repeat++;
                }
                var allowedCells = 98 - count;
                var repeatFreq = allowedCells / repeat;
                var min = 0;
                var max = repeatFreq;
                var compMod = 1;
                if (u2Mutations.tree.Decompress.purchased) compMod = 0.8;
                for (var z = 0; z < repeat; z++){
                    var start = getRandomIntSeeded(game.global.u2MutationSeed++, Math.ceil(min), Math.floor(max - count));
                    min += repeatFreq;
                    max += repeatFreq;
                    currentArray[start].u2Mutation.push('CMP');
                    // [count, attack, health, RGE, NVA]
                    var contents = [count, 1, 1, 0, 0];
                    for (var x = start + 1; x < start + count; x++){
                        var thisHealth = 1;
                        var thisAttack = 1;
                        for (var y = 0; y < currentArray[x].u2Mutation.length; y++){
                            var item = currentArray[x].u2Mutation[y];
                            if (item == 'RGE') contents[3]++;
                            else if (item == 'NVA'){
                                contents[4]++;
                                thisHealth *= 0.01;
                                thisAttack *= 0.01;
                            }
                            else if (item == 'NVX'){
                                thisHealth *= 0.1;
                                thisAttack *= 10;
                            }
                            else if (item == 'CSX') {
                                thisHealth *= 1.2;
                                thisAttack *= 1.2;
                            }
                            else if (item == 'CSP'){
                                thisHealth *= 0.8;
                                thisAttack *= 0.8;
                            }
                        }
                        contents[1] += (thisAttack * compMod);
                        contents[2] += (thisHealth * compMod);
                        currentArray[x].u2Mutation.push('CMX');
                        currentArray[x].health = "compressed";
                    }
                    currentArray[start].cc = contents;
                }
                return currentArray;
            },
            cellCount: function(){
                var max = 7;
                var stacks = 3 + Math.floor((game.global.world - 201) / 100);
                if (stacks > max) stacks = max;
                return stacks;
            },
            repeats: function(){
                var max = 6;
                var stacks = 1 + Math.floor((game.global.world - 201) / 40);
                if (stacks > max) stacks = max;
                return stacks;
            },
            rewardMult: function(){
                return (u2Mutations.types.Rage.cellCount() / (this.cellCount() * this.repeats()));
            },
            attack: function(cell, attack){
                return attack * cell.cc[1];
            },
            health: function(cell, health){
                return health * cell.cc[2];
            },
            name: "Compressed",
            mid: "pressed",
            post: "pressed"
        }
    }
}