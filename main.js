//return;
/// Options
var logCreepActive = true//not working
var remoteCreepHarvest = true//not working
const StatsEnabled = true;
var TragetAtackRoom = "W9S3"
//Memory.rooms.E13S58 = {}
//Memory.rooms.E13S58.avoid = '1';

// do you need to build?
    var ToBuild = Game.constructionSites

// functions import
var Traveler = require('Traveler');
var functionsCondensedMain = require('CondensedMain');
var FunctionsSpawningCode = require('SpawningCode');
var FunctionsRoomInitalise = require('RoomInitalise')
var FunctionsRemoteRoomCode = require('RemoteRoomCode')

require('prototype.spawn')();
//var functionsCommon  = require('functions.common');
var lastResort = require("room.failSafe");
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
var roleClaim = require('role.claim');
var roleReserve = require('role.Reserve');
var roleRemoteRoomScout = require('role.RemoteRoomScout');
// Define the roles you want to filter
//const roles = [  'harvester',  'builder',  'upgrader',  'hauler',  'balancer',  'FatUpgrader', 'miner',  'miner2', 'WallRepairer' , 'AttackCreep', 'Repairer', 'remoteHarvester', 'extractor' ];
//123
//4 5
//678
// Assign Sources By Room
//Room name, Room enegy source ID's , conatainers filled by miners / Remote harest rooms and unites / Links / Extration 

//Memory.rooms.MainRoom = {};

//Memory.rooms.MainRoom.R1S2Supply = "NoValue";
var R1S1 = "680f333b8056990049f513a3" //Memory.rooms.MainRoom.R1S1;
var R1S2 = "680f333b8056990049f513a4" //Memory.rooms.MainRoom.R1S2;
var R1S1Supply = '68176a8dd3c42f094700370a'; //Memory.rooms.MainRoom.R1S1Supply;
var R1S2Supply = '6818ca0bd3c42f0947004b34'; // Memory.rooms.MainRoom.R1S2Supply;
var R1HarvestRoom1 = 'W8S4';
var R1HarvestRoom1unit = 2;//3
var R1HarvestRoom2 = 'W8S2';
var R1HarvestRoom2unit = 2;//2
var R1HarvestRoom3 = 'W9S3';
var R1HarvestRoom3unit = 2;
var R1HarvestRoom4 = 'W7S3';
var R1HarvestRoom4unit = 2;
var R1HarvestRoom5 = 'W7S2';
var R1HarvestRoom5unit = 2;
var R1HarvestRoom6 = 'W9S2';
var R1HarvestRoom6unit = 2;
var R1HarvestRoom7 = 'W9S4';
var R1HarvestRoom7unit = 2;
var R1HarvestRoom8 = 'NUll';
var R1HarvestRoom8unit = 0;
var R1S1TargetContainer = '67fe240ec1213da8522bc437';
var R1S1TargetLink = 'Null';
var R1S2TargetContainer = 'Null';
var R1S2TargetLink = 'Null';
var R1ExtractorSource = 'Null';
var R1ExtratoryType = "RESOURCE_OXYGEN";


    const roleActions = { //DONT FORGET THE FREEKING COMMA
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
        remoteHarvester: roleRemoteHarvester.run,
        claim: roleClaim.run,
        reserver: roleReserve.run,
        RemoteRoomScout: roleRemoteRoomScout.run
    };

module.exports.loop = function () {
    if (!Memory.username) {
        let spawn = Game.spawns[Object.keys(Game.spawns)[0]];
            if (spawn && spawn.owner) {
            Memory.username = spawn.owner.username;
            console.log(`Set Memory.username to: ${Memory.username}`);
        }
    }

      //Game.map.visual.circle(new RoomPosition(25,25,'E12S58'));
    if (!Memory.MainRoom) {
        Memory.MainRoom = Game.spawns['Spawn1'].room.name;} // Assign spawn1's room name to Memory.MainRoom
    var myRoomName = Memory.MainRoom ;
    var MainRoom = Memory.MainRoom ;
     
    var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
        lastResort.saveMyRoom(myRoomName);
    }
    
    // Cleaning scripts
    functionsCondensedMain.Clean(Game);
    // Pixel Generation MMO Code
    //functionsCondensedMain.PixelsGenrate(Game);
    // Room memory layouts
    if (Memory.Initalised != "10" ){
        FunctionsRoomInitalise.Main(Game);
        //Did the room Inialise Fuck up??
        if (Memory.Initalised != "10"){
            console.log("Room Not Initalised")
            //break;
        }
    }
    if (Game.time % 6){
        //let startCPU = Game.cpu.getUsed()
        FunctionsRemoteRoomCode.analyzeOwnedRooms(Game);
        //let usedCPU = (Game.cpu.getUsed() - startCPU)
        //console.log("CPU USED START " + startCPU + " Analysis used " + usedCPU );
    }
    //Rooms LEVEL 
    if (Game.time % 500){  // 8 times a day update the rooms levels
        functionsCondensedMain.RoomsLevelMemory(Game);
    }
    
    
    //Define Roles - This should be memory.roles 
    var creepsByRole = {};
    const roles = Memory.roles ; //[  'harvester',  'builder',  'upgrader',  'hauler',  'balancer',  'FatUpgrader', 'miner',  'miner2', 'WallRepairer' , 'AttackCreep', 'Repairer', 'remoteHarvester' , 'extractor','claim'];
    //creep active in each room based on home and add to room.RoomName.Role
    functionsCondensedMain.CreepAliveHomeMemory(Game);
    

    
    // Populate the creepsByRole object with filtered creeps based on roles
    roles.forEach(role => {
        creepsByRole[role] = _.filter(Game.creeps, creep => creep.memory.role === role && creep.ticksToLive > 200 );
    });

    var Hauler1Current = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler'   ); // && creep.memory.SupplyContainer1 == R1S1Supply not needed anymore 
    var Hauler2Current = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.SupplyContainer1 == R1S2Supply && creep.ticksToLive > 200 );
 

//console.log(MainRoom)
//console.log((Game.rooms[MainRoom].energyCapacityAvailable))
//console.log((Game.rooms[MainRoom].energyAvailable))

    for (let spawnName in Game.spawns) {
           const spawn = Game.spawns[spawnName];
           if(Game.time % 11){
               functionsCondensedMain.updateRoomSources(spawn);
           }
           
    
        //
        if (!spawn.spawning && (Game.time % 6) ) {  // Both not and spawning
            //console.log(spawn.name);
            //console.log(spawn.room.name);
            if (!Memory.rooms[spawn.room.name].Source1){
                const sources = spawn.room.find(FIND_SOURCES);
                sources.forEach((source, index) => {
                Memory.rooms[spawn.room.name][`Source${index + 1}`] = source.id;
                });
            }
            
            for (let role in Memory.rooms[spawn.room.name].TargetScreep) {
                if (Memory.rooms[spawn.room.name].TargetScreep[role]) { 
                    const targetQty = Memory.rooms[spawn.room.name].TargetScreep[role].qty || 0;
                    if (targetQty === 0) continue; // Skip roles that don’t require spawning
                    const activeQty = Memory.rooms[spawn.room.name].ActiveScreeps[role] || 0;

                    if (activeQty < targetQty) {
                        const newName = `${role}${Game.time}`;
                        const WorkerParts = Memory.rooms[spawn.room.name].TargetScreep[role].Template || [WORK, CARRY, MOVE]; 
                        const SIZE = Memory.rooms[spawn.room.name].TargetScreep[role].size || 1;

                        // Define memory object
                        const creepMemory = Memory.rooms[spawn.room.name].TargetScreep[role].memory || { Importedmemory: "none" };
                        creepMemory.role = role; 

                        console.log(`Spawning new ${role}: ${newName} in room ${spawn.room.name} from ${spawn.name}`);
            
                        spawn.spawnCreep(
                            FunctionsSpawningCode.BuildBody(spawn.room.name, SIZE, WorkerParts),
                            newName,
                            { memory: creepMemory }
                        );

                        break; // Exit after spawning one creep
                    }
                }
            }
            console.log("woop woop " + spawn)
            FunctionsRemoteRoomCode.manageSpawning(Game);

            
           /* Memory.roles.forEach(role => {
                if (!Memory.rooms[spawn.room.name].ActiveScreeps[role]  || !Memory.rooms[spawn.room.name].TargetScreep[role]) {
                    //FunctionsRoomInitalise.MemoryStructureRooms(Game)
                }
                //Check if active is less than target 
                //if ((Memory.rooms[spawn.room.name].ActiveScreeps[role]) < (Memory.rooms[spawn.room.name].TargetScreep[role].qty)){
                //    console.log("we need a " + role)
                //}
            });*/
        }
    }
    //Spawn code
    if((Game.time % 2) &&(Game.spawns['Spawn1'].spawning == undefined ) ){
        
        //CreateCustomWorkerCreep Template = Parts, Maxsize, roleName, homeName, TargetSourceName , harvestRoomName , SpawnRoom 
        
        // Function to get creeps by role
        var getCreepsByRole = (role) => creepsByRole[role] || [];
        // write to rooms.home.active Object role:units
        
        

        if((getCreepsByRole('harvester').length == 0) && (getCreepsByRole('balancer').length == 0)){
            var newName = 'Harvester' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,CARRY,MOVE], newName, 
                {memory: {role: 'harvester', TargetSource: R1S2}});
            
            //name = Game.spawns.Spawn1.CreateCustomWorkerCreep("WORK,CARRY,MOVE,CARRY,MOVE", 1,'Harvester', MainRoom, R1S1, MainRoom, MainRoom)
            
        }
        
        else if(getCreepsByRole('AttackCreep').length < 0 && ((Game.rooms[MainRoom].find(FIND_HOSTILE_CREEPS)).length > 0)) {
        var newName = 'AttackCreep' + Game.time;
        let WorkerParts = [TOUGH,MOVE,ATTACK,ATTACK];
        console.log('Spawning new AttackCreep: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,10,WorkerParts), newName, 
            {memory: {role: 'AttackCreep', home: 'E17S58' }});
        }
        
        else if ((((Game.rooms[MainRoom].energyCapacityAvailable)*0.75) <= ((Game.rooms[MainRoom].energyAvailable)))){  //check that 75% of room cap is avalible before attempting to spawn 
            console.log('hi boss')
        if(getCreepsByRole('harvester').length < 1) {
        var newName = 'Harvester' + Game.time;
        let WorkerParts = [WORK,CARRY,MOVE];
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
            {memory: {role: 'harvester', TargetSource: R1S2 }});
            
            //name = Game.spawns.Spawn1.CreateCustomWorkerCreep( Parts: "WORK,CARRY,MOVE", Maxsize: 1, roleName:'Harvester', TargetSourceName: R1S1, SpawnRoom: MainRoom ,(),(),(),(), );
        }
        else if(getCreepsByRole('builder').length < 1 && ToBuild != 'undefined') {
            var newName = 'builder' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE];
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,1,WorkerParts), newName, 
                {memory: {role: 'builder', TargetSource:R1S2}});
        }
        else if(getCreepsByRole('upgrader').length < 0) {  //4 units at size 4 is good
            var newName = 'upgrader' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE];
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,4,WorkerParts), newName, 
                {memory: {role: 'upgrader', TargetSource: R1S1}});
        }
        else if(getCreepsByRole('miner').length < 1) {
            var newName = 'miner' + Game.time;
            let WorkerParts = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
            console.log('Spawning new miner: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,1,WorkerParts), newName,
                {memory: {role: 'miner', TargetSource: R1S1}});
        }
        else if(getCreepsByRole('miner2').length < 1) {
            var newName = 'miner2' + Game.time;
            let WorkerParts = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
            console.log('Spawning new miner2: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,1,WorkerParts), newName,
                {memory: {role: 'miner2', TargetSource: R1S2 }});
        }
        else if(Hauler1Current.length < 4) { // this can now by dynamicly set as the total number or required hauler div by size 
            var newName = 'hauler' + Game.time;
            let WorkerParts = [CARRY,CARRY,MOVE];
            console.log('Spawning new hauler: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'hauler',  TargetContainer: R1S1TargetContainer, TargetLink: R1S2TargetLink}}); //{role: 'hauler', SupplyContainer1: R1S1Supply, TargetContainer: R1S1TargetContainer, TargetLink: R1S2TargetLink}});
        }
        /*else if(Hauler2Current.length < 1) {
            var newName = 'hauler' + Game.time;
            let WorkerParts = [CARRY,CARRY,MOVE];
            console.log('Spawning new hauler: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'hauler', SupplyContainer1: R1S2Supply, TargetContainer: R1S2TargetContainer, TargetLink: R1S2TargetLink}});
        }*/
        else if(getCreepsByRole('balancer').length < 2) {
            var newName = 'Balancer' + Game.time;
            let WorkerParts = [CARRY,CARRY,MOVE];
            console.log('Spawning new Balancer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,6,WorkerParts), newName, 
               {memory: {role: 'balancer'}});
        }
        else if(getCreepsByRole('FatUpgrader').length < 2) {//max 4xsize 4 with current link code
            var newName = 'FatUpgrader' + Game.time;
            let WorkerParts = [WORK,WORK,WORK,CARRY,MOVE];
            console.log('Spawning new FatUpgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,4,WorkerParts), newName, 
               {memory: {role: 'FatUpgrader'}});
        }
        else if(getCreepsByRole('WallRepairer').length < 1) {
            var newName = 'WallRepairer' + Game.time;
            let WorkerParts = [WORK,CARRY,MOVE]; // WallRepair cant spawn in 300
            console.log('Spawning new WallRepairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,4,WorkerParts), newName, 
               {memory: {role: 'WallRepairer',TargetSource: R1S2}});
        }
        else if(getCreepsByRole('Repairer').length < 1) {
            var newName = 'Repairer' + Game.time;
            let WorkerParts = [WORK,CARRY,CARRY,CARRY,MOVE,MOVE];// Repair cant spawn in 300
            console.log('Spawning new Repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,1,WorkerParts), newName, 
               {memory: {role: 'Repairer',TargetSource: R1S1}});
        }
        
        else if(getCreepsByRole('extractor').length < 0) {
            var newName = 'extractor' + Game.time;
            let WorkerParts = [WORK,WORK,MOVE,CARRY,CARRY,MOVE];
            console.log('Spawning new extractor: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,1,WorkerParts), newName, 
               {memory: {role: 'extractor', ExtractorSource:R1ExtractorSource,ExtratoryType: R1ExtratoryType }});
        }
        else if(getCreepsByRole('AttackCreep').length < 0 ) {
        var newName = 'AttackCreep' + Game.time;
        let WorkerParts = [MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,ATTACK,MOVE];
        //let WorkerParts = [TOUGH,TOUGH,MOVE,MOVE,HEAL,TOUGH];
        //let WorkerParts = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];
        //let WorkerParts = [TOUGH,ATTACK,MOVE,ATTACK,ATTACK,MOVE];
        //let WorkerParts = [TOUGH,TOUGH,MOVE,MOVE,ATTACK];
        //let WorkerParts = [TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,HEAL];
        
        console.log('Spawning new AttackCreep: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,15,WorkerParts), newName, 
            {memory: {role: 'AttackCreep', home:TragetAtackRoom }});
        }
        
        
        else if(getCreepsByRole('claim').length < 0) {
            var newName = 'upgrader' + Game.time;
            let WorkerParts = [MOVE,CLAIM];
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,5,WorkerParts), newName, 
                {memory: {role: 'claim', home:'W2S37'}});
        }
        
       else{
           //let startCPU = Game.cpu.getUsed()
            FunctionsRemoteRoomCode.manageSpawning(Game);
            //let usedCPU = (Game.cpu.getUsed() - startCPU)
            //console.log("CPU USED REMOTE HARVEST  START " + startCPU + " SPWAN used " + usedCPU );
           
       }
       
       
        }
    }
    /*
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }*/ 
    // Iterate over all your spawns
    for (let spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];

        // Add visual representation for spawning creeps
        if (spawn.spawning) {
            const spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                { align: 'left', opacity: 0.8 }
            );
        }
        else { 
             // Renew creeps within range and below 2000 ticks to live
            const creeps = spawn.room.find(FIND_MY_CREEPS);
            creeps.forEach(creep => {
                if (spawn.pos.getRangeTo(creep) <= 1 && creep.ticksToLive && creep.ticksToLive < 1350 && !creep.body.some(bodyPart => bodyPart.type === CLAIM)) {
                    if (spawn.renewCreep(creep) === ERR_NOT_ENOUGH_ENERGY) {
                        console.log(`${creep.name} needs more energy to renew.`);
                    }
                    else{
                        //spawn.renewCreep(creep)
                        //console.log(`${creep.name} is beinged renewed.`);
                        //console.log(creep.ticksToLive)
                        spawn.room.visual.text(
                        '🛠️ RENEWING 🛠️',
                        spawn.pos.x + 1,
                        spawn.pos.y,
                        { align: 'left', opacity: 0.8 }
                        );
                    }
                }
            });
        }
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
                    //console.log(MyTower.pos.x);
                    //Game.map.visual.circle(new RoomPosition(25,25,'E12S58'));
                    //Game.map.visual.rect(new RoomPosition(MyTower.pos.x - 5, MyTower.pos.y - 5, MyTower.pos.roomName), 11, 11, {fill: 'transparent', stroke: '#ff0000'});
                    roleTower.run(MyTower);
                
                }
            }
        //Extra line for readability     
    }
   
    
    
 
    
    if (StatsEnabled == true){
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
    	    totalTime = (Game.cpu.getUsed() - totalTime);
    	    console.log("Time to Draw: " + totalTime.toFixed(2));
        } 
    }
    
    
}