/// Options
var logCreepActive = true
var remoteCreepHarvest = true



// do you need to build?
    var ToBuild = Game.constructionSites

// functions import
var Traveler = require('Traveler');
var functionsCondensedMain = require('CondensedMain');
var FunctionsSpawningCode = require('SpawningCode');
var FunctionsRoomInitalise = require('RoomInitalise')
//var functionsCommon  = require('functions.common');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.Miner');
var roleMiner2 = require('role.Miner2');
var roleExtractor = require('role.extractor');
var roleHauler = require('role.hauler');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallrepairer');
var roleBalancer = require('role.balancer');
var roleFatUpgrader = require('role.fatUpgrader');
var roleAttackCreep = require('role.AttackCreep');
var roleRemoteHarvester = require('role.remoteHarvester');
var roleTower = require('role.tower');
// Define the roles you want to filter
//const roles = [  'harvester',  'builder',  'upgrader',  'hauler',  'balancer',  'FatUpgrader', 'miner',  'miner2', 'WallRepairer' , 'AttackCreep', 'Repairer', 'remoteHarvester', 'extractor' ];
//123
//4 5
//678
// Assign Sources By Room
var MainRoom = "E12S58";
var R1S1 = "59bbc4bd2052a716c3ce8703";
var R1S2 = "59bbc4bd2052a716c3ce8704";
var R1S1Supply = "Null";
var R1S2Supply = "66c9ee5cf2048910a53ae898";
var R1HarvestRoom1 = 'E11S57';
var R1HarvestRoom1unit = 0;
var R1HarvestRoom2 = 'E12S57';
var R1HarvestRoom2unit = 3;
var R1HarvestRoom3 = 'E13S57';
var R1HarvestRoom3unit = 4;
var R1HarvestRoom4 = 'E11S58';
var R1HarvestRoom4unit = 0;
var R1HarvestRoom5 = 'E13S58';
var R1HarvestRoom5unit = 3;
var R1HarvestRoom6 = 'E11S59';
var R1HarvestRoom6unit = 3;
var R1HarvestRoom7 = 'E12S59';
var R1HarvestRoom7unit = 3;
var R1HarvestRoom8 = 'E13S59';
var R1HarvestRoom8unit = 3;
var R1S1TargetContainer = '66c9ee5cf2048910a53ae898';
var R1S1TargetLink = '66c6f7cc6706e51064992c75';
var R1S2TargetContainer = '66c9ee5cf2048910a53ae898';
var R1S2TargetLink = '66c6f7cc6706e51064992c75';
var R1ExtractorSource = '66c31a89ec5fb40036b5f8c2';
var R1ExtratoryType = "RESOURCE_OXYGEN";


    const roleActions = {
        harvester: roleHarvester.run,
        upgrader: roleUpgrader.run,
        builder: roleBuilder.run,
        miner: roleMiner.run,
        miner2: roleMiner2.run,
        extractor: roleExtractor.run,
        balancer: roleBalancer.run,
        hauler: roleHauler.run,
        FatUpgrader: roleFatUpgrader.run,
        WallRepairer: roleWallRepairer.run,
        Repairer: roleRepairer.run,
        AttackCreep: roleAttackCreep.run,
        remoteHarvester: roleRemoteHarvester.run
    };

module.exports.loop = function () {
    
    
    // Cleaning scripts
    functionsCondensedMain.Clean(Game);
    // Pixel Generation MMO Code
    functionsCondensedMain.PixelsGenrate(Game);
    
    //Define Roles
    var creepsByRole = {};
    const roles = [  'harvester',  'builder',  'upgrader',  'hauler',  'balancer',  'FatUpgrader', 'miner',  'miner2', 'WallRepairer' , 'AttackCreep', 'Repairer', 'remoteHarvester' , 'extractor'];
    
    // Populate the creepsByRole object with filtered creeps based on roles
    roles.forEach(role => {
        creepsByRole[role] = _.filter(Game.creeps, creep => creep.memory.role === role);
    });
    
    if (Memory.Initalised != "10" ){
        FunctionsRoomInitalise.Main(Game);
        //Did the room Inialise Fuck up??
        if (Memory.Initalised != "10"){
            console.log("Room Not Initalised")
            //break;
        }
    }
 

    //Remote Harvesters Headcount

    var R1HarvestRoom1unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom1);
    var R1HarvestRoom2unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom2);
    var R1HarvestRoom3unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom3);
    var R1HarvestRoom4unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom4);
    var R1HarvestRoom5unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom5);
    var R1HarvestRoom6unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom6);
    var R1HarvestRoom7unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom7);
    var R1HarvestRoom8unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom8);
    //console.log("room 6 harvesters " + R1HarvestRoom6unitCurrent.length)

//console.log(MainRoom)
//console.log((Game.rooms[MainRoom].energyCapacityAvailable))
//console.log((Game.rooms[MainRoom].energyAvailable))

    //Spawn code
    if(Game.time % 25 ){
        
        // Function to get creeps by role
        var getCreepsByRole = (role) => creepsByRole[role] || [];

        if(getCreepsByRole('harvester').length == 0){
            var newName = 'Harvester' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,CARRY,MOVE], newName, 
                {memory: {role: 'harvester', TargetSource: R1S1}});
        }
        else if(getCreepsByRole('AttackCreep').length < 5 && ((Game.rooms[MainRoom].find(FIND_HOSTILE_CREEPS)).length > 0)) {
        var newName = 'AttackCreep' + Game.time;
        let WorkerParts = [ATTACK,TOUGH,TOUGH,MOVE];
        console.log('Spawning new AttackCreep: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,3,WorkerParts), newName, 
            {memory: {role: 'AttackCreep', TargetSource: R1S1 }});
        }
        if ((((Game.rooms[MainRoom].energyCapacityAvailable)-400) <= ((Game.rooms[MainRoom].energyAvailable)))){
        if(getCreepsByRole('harvester').length < 2) {
        var newName = 'Harvester' + Game.time;
        let WorkerParts = [WORK,CARRY,MOVE];
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,5,WorkerParts), newName, 
            {memory: {role: 'harvester', TargetSource: R1S1 }});
        }
        else if(getCreepsByRole('builder').length < 1 && ToBuild != 'undefined') {
            var newName = 'builder' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE];
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,4,WorkerParts), newName, 
                {memory: {role: 'builder', TargetSource:R1S2}});
        }
        else if(getCreepsByRole('upgrader').length < 1) {
            var newName = 'upgrader' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE];
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,4,WorkerParts), newName, 
                {memory: {role: 'upgrader', TargetSource: R1S2}});
        }
        else if(getCreepsByRole('miner').length < 0) {
            var newName = 'miner' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE];
            console.log('Spawning new miner: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'miner', TargetSource: R1S1}});
        }
        else if(getCreepsByRole('miner2').length < 0) {
            var newName = 'miner2' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE];
            console.log('Spawning new miner2: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'miner2', TargetSource: R1S2, TargetContainer: R1S1TargetContainer, TargetLink: R1S1TargetLink}});
        }
        else if(getCreepsByRole('hauler').length < 0) {
            var newName = 'hauler' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE];
            console.log('Spawning new hauler: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
               {memory: {role: 'hauler', SupplyContainer1: R1S2Supply, TargetContainer: R1S2TargetContainer, TargetLink: R1S2TargetLink}});
        }
        else if(getCreepsByRole('balancer').length < 1) {
            var newName = 'Balancer' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE];
            console.log('Spawning new Balancer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
               {memory: {role: 'balancer'}});
        }
        else if(getCreepsByRole('FatUpgrader').length < 0) {
            var newName = 'FatUpgrader' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE];
            console.log('Spawning new FatUpgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
               {memory: {role: 'FatUpgrader'}});
        }
        else if(getCreepsByRole('WallRepairer').length < 1) {
            var newName = 'WallRepairer' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE,CARRY,CARRY,MOVE];
            console.log('Spawning new WallRepairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'WallRepairer',TargetSource: R1S2}});
        }
        else if(getCreepsByRole('Repairer').length < 1 ) {
            var newName = 'Repairer' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE,CARRY,CARRY,MOVE];
            console.log('Spawning new Repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'Repairer',TargetSource: R1S2}});
        }
        
        else if(getCreepsByRole('extractor').length < 0) {
            var newName = 'extractor' + Game.time;
            let WorkerParts = [WORK,WORK,MOVE,CARRY,CARRY,MOVE];
            console.log('Spawning new extractor: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,1,WorkerParts), newName, 
               {memory: {role: 'extractor', ExtractorSource:R1ExtractorSource,ExtratoryType: R1ExtratoryType }});
        }
        else if(R1HarvestRoom1unitCurrent.length < R1HarvestRoom1unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE];
            console.log('Spawning new remoteHarvester1: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,3,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom1}});
        }
                else if(R1HarvestRoom2unitCurrent.length < R1HarvestRoom2unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE];
            console.log('Spawning new remoteHarvester2: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,3,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom2}});
        }
                else if(R1HarvestRoom3unitCurrent.length < R1HarvestRoom3unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE];
            console.log('Spawning new remoteHarvester3: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,3,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom3}});
        }
                else if(R1HarvestRoom4unitCurrent.length < R1HarvestRoom4unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE];
            console.log('Spawning new remoteHarvester4: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,3,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom4}});
        }
                else if(R1HarvestRoom5unitCurrent.length < R1HarvestRoom5unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE];
            console.log('Spawning new remoteHarvester5: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,3,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom5}});
        }
                else if(R1HarvestRoom6unitCurrent.length < R1HarvestRoom6unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE];
            console.log('Spawning new remoteHarvester6: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,3,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom6}});
        }
                else if(R1HarvestRoom7unitCurrent.length < R1HarvestRoom7unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE];
            console.log('Spawning new remoteHarvester7: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,3,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom7}});
        }
                else if(R1HarvestRoom8unitCurrent.length < R1HarvestRoom8unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE,MOVE,CARRY,CARRY,MOVE,MOVE];
            console.log('Spawning new remoteHarvester8: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,3,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom8}});
        }
       
        }
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    // Object to map roles to their corresponding functions



    // Iterate over all creeps
         for (var name in Game.creeps) {
             var creep = Game.creeps[name];
        
        // Get the action function based on the creep's role
             const action = roleActions[creep.memory.role];
        
        // Execute the action function if it exists
             if (action) {
              action(creep);
            }
        }
    
   
    //Tower 
    for (var name in Game.rooms){
        //console.log(name);
        let MyTowers = (Game.rooms[name].find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER}));
            if (MyTowers.length > 0 ){
                for (let i = 0 ; MyTowers.length > i ; i++) {
                    let MyTower = MyTowers[i];
            
                    //console.log("TESTING NEW LINE ------")
                    //console.log(MyTower.id);
                    //console.log(MyTower.pos);
                    roleTower.run(MyTower);
                
                }
            }
        //Extra line for readability     
    }
   
    
    /*//Links
    var supplyContainerRoom1 = Game.getObjectById("ae41660d8c85850");
    var supplyContainer2Room1 = Game.getObjectById("31b15f113452bae");
    //console.log(supplyContainerRoom1)
    var supplyDemandRoom1 = Game.getObjectById("dcb36d7e7964329");
    if(supplyContainerRoom1.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ){
        supplyContainerRoom1.transferEnergy(supplyDemandRoom1);
    }
    else if(supplyContainer2Room1.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ) {
        supplyContainer2Room1.transferEnergy(supplyDemandRoom1);
    }
    */
    
 
    
    
    var totalTime = Game.cpu.getUsed();
    var statsConsole = require("statsConsole");
    // sample data format ["Name for Stat", variableForStat]
    let myStats = [
    	/*["Creep Managers", CreepManagersCPUUsage],
    	["Towers", towersCPUUsage],
    	["Links", linksCPUUsage],
    	["Setup Roles", SetupRolesCPUUsage],
    	["Creeps", CreepsCPUUsage],
    	["Init", initCPUUsage],
    	["Stats", statsCPUUsage],
	    ["Total", totalCPUUsage] */
    ];
    
    statsConsole.run(myStats); // Run Stats collection
    if (totalTime > Game.cpu.limit) {
    	statsConsole.log("Tick: " + Game.time + "  CPU OVERRUN: " + Game.cpu.getUsed().toFixed(2) + "  Bucket:" + Game.cpu.bucket, 5);
    }
    if ((Game.time % 50) === 0) {
	    console.log(statsConsole.displayHistogram());
	    console.log(statsConsole.displayStats());
	    console.log(statsConsole.displayLogs());
	    console.log(statsConsole.displayMaps()); // Don't use as it will consume ~30-40 CPU
	    totalTime = (Game.cpu.getUsed() - totalTime);
	    console.log("Time to Draw: " + totalTime.toFixed(2));
    }
    
}