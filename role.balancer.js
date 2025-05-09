var sharedFuntionsCreeps = require('functions.creeps');
var roleBalancer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.home){
            var home = creep.room.name;
            creep.memory.home = home;
        }
        if(!creep.memory.Storage){
            creep.memory.Storage = creep.room.storage.id;
        }
        if(creep.memory.Supplying && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.Supplying = false;
            creep.say('🔄 Demanding');
	    }
	    if(!creep.memory.Supplying && creep.store.getFreeCapacity() == 0) {
	        creep.memory.Supplying = true;
	        creep.say('🚧 Supplying');
	    }
        var TERMINAL = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TERMINAL)     }
        });
        
	    if (!creep.memory.Supplying) {
	        //creep.say("DUK")
            // **Check if the creep is close to dying—suicide early to prevent wasted actions**
            if (creep.ticksToLive < 40) {
                creep.suicide();
            }       
            // **Retrieve storage object efficiently**
            let storage = Game.getObjectById(creep.memory.Storage);
            // **Check if storage exists before withdrawing**
            if (storage) {
                let withdrawResult = creep.withdraw(storage, RESOURCE_ENERGY);
                if (withdrawResult === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
        } else {
            //creep.say("FUK")
            // **Find valid energy transfer targets**
            /*
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) =>
                    (structure.structureType === STRUCTURE_EXTENSION ||
                     structure.structureType === STRUCTURE_SPAWN ||
                     structure.structureType === STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }); 
            */
            roomName = creep.room.name;
            // Check if storageLink exists once
            const storageLink = Memory.rooms[roomName].storageLink;
    
            // If targets are not cached or cache is outdated (older than 100 ticks), refresh them
            if (!Memory.rooms[roomName].BalancercachedTargets || Memory.rooms[roomName].BalancercachedTargets.tick + 100 < Game.time) {
                let targets = Game.rooms[roomName].find(FIND_STRUCTURES, {
                    filter: structure =>
                        (structure.structureType === STRUCTURE_EXTENSION ||
                         structure.structureType === STRUCTURE_SPAWN ||
                         structure.structureType === STRUCTURE_TOWER)
                });
                // Add storageLink if it exists
                if (storageLink) {
                    const link = Game.getObjectById(storageLink);
                    if (link) targets.push(link);
                }
                // Cache targets list
                Memory.rooms[roomName].BalancercachedTargets = {
                    tick: Game.time,
                    structures: targets.map(s => s.id) // Store only structure IDs for efficiency
                };
            }

            if (!Memory.rooms[roomName] || !Memory.rooms[roomName].BalancercachedTargets) return [];

            // Retrieve cached structures and check their energy capacity every tick
            targets = Memory.rooms[roomName].BalancercachedTargets.structures
                .map(id => Game.getObjectById(id))
                .filter(structure => structure && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        

            
            if (targets.length > 0) {
                // **Select the closest target efficiently**
                let target = creep.pos.findClosestByRange(targets);
                sharedFuntionsCreeps.BetterCreepTransferEnergy(creep, target);
            } else {
            // **Only check TERMINAL when no other targets exist**  
                let terminal = creep.room.terminal;
                if (terminal && terminal.store[RESOURCE_ENERGY] < 10000) {
                    creep.say("Time for terminal");
                    if (creep.transfer(terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal);
                    }
                } else {
                creep.say("Nap Time");
                }
            }
        }
	}
};

module.exports = roleBalancer;