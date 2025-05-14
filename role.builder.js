var roleUpgrader = require('role.upgrader');
var sharedFuntionsCreeps = require('functions.creeps');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.home){
            var home = creep.room.name;
            creep.memory.home = home;
        }
        else if (creep.room.name != creep.memory.home){
            creep.memory.flag = creep.memory.home;
        }
        
        if (creep.room.name != creep.memory.home){
            creep.memory.flag = creep.memory.home;
            var flag = Game.flags[creep.memory.flag];
            // travel to flag
            var pos1 = creep.pos
            var pos2 = flag.pos
            if (!pos1.isEqualTo(pos2)) {
                creep.moveTo(flag.pos);
            }
            return;
        }
        if(!creep.memory.TargetSource){
            var TTT111 =  creep.pos.findClosestByRange(FIND_SOURCES);
            creep.memory.TargetSource = TTT111.id;
        }

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    /*else if (!creep.memory.storageContainer) {
            var target = creep.room.find(FIND_STRUCTURES, {
                filter:  structure =>{
                    return (structure.structureType == STRUCTURE_STORAGE );
                }
            });
            if (target.length == 0) {
                creep.memory.storageContainer = 'NoValue';
                creep.memory.StorageId = 'NoValue';
            }
            else {
                creep.memory.storageContainer = creep.room.storage.id;
                creep.memory.StorageId = creep.room.storage.id;
            }
        }*/

	   if (creep.memory.building) {
    let roomMemory = Memory.rooms[creep.room.name] || {};
    if (!roomMemory.construction) {
        roomMemory.construction = { sites: [], lastChecked: 0 };
    }

    // Room-wide check every 100 ticks
    if (Game.time - roomMemory.construction.lastChecked > 100) {
        roomMemory.construction.sites = creep.room.find(FIND_CONSTRUCTION_SITES)
            .map(site => ({ id: site.id, pos: site.pos }));
        roomMemory.construction.lastChecked = Game.time;
        Memory.rooms[creep.room.name] = roomMemory;
    }

    // Find the closest valid construction site
    let validTargets = [];
    for (let i = 0; i < roomMemory.construction.sites.length; i++) {
        let site = Game.getObjectById(roomMemory.construction.sites[i].id);
        if (site) {
            validTargets.push(site);
        }
    }

    if (validTargets.length === 0) {
        roleUpgrader.run(creep);
        return;
    }

    let target = creep.pos.findClosestByRange(validTargets.map(site => new RoomPosition(site.pos.x, site.pos.y, creep.room.name)));

    if (!target) {
        roleUpgrader.run(creep);
        return;
    }

    // Find the corresponding object
    let targetObject = null;
    for (let i = 0; i < validTargets.length; i++) {
        if (validTargets[i].pos.x === target.x && validTargets[i].pos.y === target.y) {
            targetObject = validTargets[i];
            break;
        }
    }

    if (targetObject) {
        if (creep.build(targetObject) === ERR_NOT_IN_RANGE) {
            creep.travelTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    } else {
        // Remove completed target from memory
        for (let i = 0; i < roomMemory.construction.sites.length; i++) {
            if (roomMemory.construction.sites[i].id === targetObject.id) {
                roomMemory.construction.sites.splice(i, 1);
                break;
            }
        }
        Memory.rooms[creep.room.name] = roomMemory;
    }
}



        
	    
	    else {
            
            sharedFuntionsCreeps.harvestWithStoreage(creep);
           
        
	    }
	}
};

module.exports = roleBuilder;