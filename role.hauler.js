var sharedFuntionsCreeps = require('functions.creeps');
var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.home){
            var home = creep.room.name;
            creep.memory.home = home;
        }
        if(!creep.memory.TargetDestination){
            //creep.memory.TargetDestination = creep.room.find(STRUCTURE_STORAGE);
            //creep.memory.TargetDestination = 'f21406154f7e1cd';
            creep.memory.TargetDestination = creep.room.storage.id;
            //var TargetDestination = Game.getObjectById(creep.memory.TargetDestination);
        }
        if(!creep.memory.SupplyContainer1 || creep.ticksToLive === 1000){
            sharedFuntionsCreeps.assignSupplyContainer(creep) ;
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
	        
            var storage = Game.getObjectById(creep.memory.SupplyContainer1);
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                 creep.travelTo(storage);
                 if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                     // tried again
                 }
           }
           else{
                creep.say('ERROR');
           }
        }
        else {
            var TargetDestination = Game.getObjectById(creep.memory.TargetDestination);
            if(creep.transfer(TargetDestination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(TargetDestination, {visualizePathStyle: {stroke: '#ffffff'}});
                if(creep.transfer(TargetDestination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    
                    var TargetTraveling = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType === STRUCTURE_EXTENSION || STRUCTURE_LINK &&
                            structure.energy < structure.energyCapacity &&
                            creep.pos.getRangeTo(structure) === 1;
                            }
                        });
                    if(creep.transfer(TargetTraveling, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                         //nearby extentions
                    }
                // tried again
                }
            }
        }
	}
};

module.exports = roleHauler;