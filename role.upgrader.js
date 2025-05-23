

var sharedFuntionsCreeps = require('functions.creeps');
var functionsCondensedMain = require('CondensedMain')
var roleUpgrader = {

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
            creep.memory.TargetSource = (creep.pos.findClosestByRange(FIND_SOURCES).id);
        }
        if(!creep.memory.LinkCheck){
            functionsCondensedMain.findLinks(creep.room.name) ;
            creep.memory.LinkCheck = "true";
        }

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
	       /* if(creep.ticksToLive < 70){
	            creep.suicide();
	        }
            var source = Game.getObjectById(creep.memory.TargetSource);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }*/
            if (creep.memory.StorageId == "NoValue") {
                sharedFuntionsCreeps.harvest(creep);
            }
            else {
                sharedFuntionsCreeps.harvestWithStoreage(creep);
            }
	    }
	}
};

module.exports = roleUpgrader;
