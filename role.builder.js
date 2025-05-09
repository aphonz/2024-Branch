var roleUpgrader = require('role.upgrader');
var sharedFuntionsCreeps = require('functions.creeps');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.home){
            var home = creep.room.name;
            creep.memory.home = home;
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

	    if(creep.memory.building) {
            var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_CONTAINER
                    )}});
            if(targets == null){
                var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            }
            //console.log(targets)
            if(targets != null){
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    if(creep.build(targets) == ERR_NOT_IN_RANGE){
                        //hi
                    }
                }
            }
            else{
                roleUpgrader.run(creep);
            }
        }
        
	    
	    else {
            
            sharedFuntionsCreeps.harvestWithStoreage(creep);
           
        
	    }
	}
};

module.exports = roleBuilder;