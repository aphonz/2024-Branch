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

        
    
    
    const harvesters = getCreepsByRole('harvester');
const builders = getCreepsByRole('builder');
const upgraders = getCreepsByRole('upgrader');
const miners = getCreepsByRole('miner');
const haulers = getCreepsByRole('hauler');
const balancers = getCreepsByRole('balancer');
const fatUpgraders = getCreepsByRole('FatUpgrader');
const miners2 = getCreepsByRole('miner2');