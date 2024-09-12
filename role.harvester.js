var roleBuilder = require('role.builder');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.TargetSource){
            creep.memory.TargetSource = creep.pos.findClosestByRange(FIND_SOURCES);
        }
        
        if(creep.memory.Supplying && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.Supplying = false;
            creep.say('🔄 Demanding');
	    }
	    if(!creep.memory.Supplying && creep.store.getFreeCapacity() == 0) {
	        creep.memory.Supplying = true;
	        creep.say('🚧 Supplying');
	    }
        
        
	    if(!creep.memory.Supplying) {
	        if(creep.ticksToLive < 70){
	            creep.suicide();
	        }
            var source = Game.getObjectById(creep.memory.TargetSource);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source, {visualizePathStyle: {stroke: '#ffac02'}});
            }
        }
            else {
             var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                // Check if the structure is an extension or spawn with free capacity
                 if ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                      structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                       return true;
                       creep.say('TOWER TIME');
                }
                  return false;
             }
            });

               // If no extensions or spawns are found, check for towers with free capacity
               if (targets.length === 0) {
               targets = creep.room.find(FIND_STRUCTURES, {
                   filter: (structure) => {
                     return (structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_STORAGE) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
           }
                 });
            }
            if(targets.length > 0) {
                var target = creep.pos.findClosestByRange(targets)
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                roleBuilder.run(creep);
            }
        }
	}
};

module.exports = roleHarvester;