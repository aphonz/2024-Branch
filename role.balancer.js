var roleBalancer = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
        //var TerminalTarget = Game.getObjectById(TERMINAL[0].id);
        //console.log("ter pw " + (TerminalTarget, RESOURCE_ENERGY) )
	    if(!creep.memory.Supplying) {
	        if(creep.ticksToLive < 40){
	            creep.suicide();
	        }
            var storage = Game.getObjectById(creep.memory.Storage);
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                 creep.travelTo(storage);
           }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                var target = creep.pos.findClosestByRange(targets)
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            /*else if(TERMINAL[0].store[RESOURCE_ENERGY] < 10000){
                    creep.say("time for terminal");
                    if(creep.transfer(TERMINAL[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.travelTo(TERMINAL[0]);
                }
            }*/
            else{
                creep.say('Nap Time')
            }
            
        }
	}
};

module.exports = roleBalancer;