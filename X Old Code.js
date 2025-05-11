var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            
            
            //OLD HARVESTER Spawnsers
            else if(R1HarvestRoom1unitCurrent.length < R1HarvestRoom1unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
            console.log('Spawning new remoteHarvester1: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom1}});
        }
                else if(R1HarvestRoom2unitCurrent.length < R1HarvestRoom2unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
            console.log('Spawning new remoteHarvester2: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom2}});
        }
                else if(R1HarvestRoom3unitCurrent.length < R1HarvestRoom3unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
            console.log('Spawning new remoteHarvester3: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom3}});
        }
                else if(R1HarvestRoom4unitCurrent.length < R1HarvestRoom4unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
            console.log('Spawning new remoteHarvester4: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom4}});
        }
                else if(R1HarvestRoom5unitCurrent.length < R1HarvestRoom5unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
            console.log('Spawning new remoteHarvester5: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom5}});
        }
                else if(R1HarvestRoom6unitCurrent.length < R1HarvestRoom6unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
            console.log('Spawning new remoteHarvester6: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom6}});
        }
                else if(R1HarvestRoom7unitCurrent.length < R1HarvestRoom7unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
            console.log('Spawning new remoteHarvester7: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom7}});
        }
                else if(R1HarvestRoom8unitCurrent.length < R1HarvestRoom8unit ) {
            var newName = 'remoteHarvester' + Game.time;
            let WorkerParts = [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
            console.log('Spawning new remoteHarvester8: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(FunctionsSpawningCode.BuildBody(MainRoom,2,WorkerParts), newName, 
               {memory: {role: 'remoteHarvester', harvestRoom: R1HarvestRoom8}});
        }
            
                var R1HarvestRoom1unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom1 && creep.ticksToLive > 200 );
    var R1HarvestRoom2unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom2 && creep.ticksToLive > 200 );
    var R1HarvestRoom3unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom3 && creep.ticksToLive > 200 );
    var R1HarvestRoom4unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom4 && creep.ticksToLive > 200 );
    var R1HarvestRoom5unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom5 && creep.ticksToLive > 200 );
    var R1HarvestRoom6unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom6 && creep.ticksToLive > 200 );
    var R1HarvestRoom7unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom7 && creep.ticksToLive > 200 );
    var R1HarvestRoom8unitCurrent = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == R1HarvestRoom8 && creep.ticksToLive > 200 );
    
    
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
        
        else if ((((Game.rooms[MainRoom].energyCapacityAvailable)*0.25) <= ((Game.rooms[MainRoom].energyAvailable)))){  //check that 75% of room cap is avalible before attempting to spawn 
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
        else if(getCreepsByRole('FatUpgrader').length < 1) {//max 4xsize 4 with current link code
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






            
             /*
    // I give Creeps the ability do Run Code
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        else if(creep.memory.role == 'miner2') {
            roleMiner2.run(creep);
        }
        else if(creep.memory.role == 'balancer') {
            roleBalancer.run(creep);
        }
        else if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        else if(creep.memory.role == 'FatUpgrader') {
            roleFatUpgrader.run(creep);
        }
    }
    */
    
    
        /*
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var Hauler = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    var Balancer = _.filter(Game.creeps, (creep) => creep.memory.role == 'balancer');
    var FatUpgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'FatUpgrader');
    var miner2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner2');
    */
    
    
    
     /*var AllMyGameTowers = Game.rooms
    var tower = Game.getObjectById('66c49e742a9ebc10a14c7db0');
    if(tower.store[RESOURCE_ENERGY] > 0) {
        console.log('TOWER POWER')
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits + 759) < structure.hitsMax && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART});
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        
    //Links
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
    
    
    
    const harvesters = getCreepsByRole('harvester');
const builders = getCreepsByRole('builder');
const upgraders = getCreepsByRole('upgrader');
const miners = getCreepsByRole('miner');
const haulers = getCreepsByRole('hauler');
const balancers = getCreepsByRole('balancer');
const fatUpgraders = getCreepsByRole('FatUpgrader');
const miners2 = getCreepsByRole('miner2');