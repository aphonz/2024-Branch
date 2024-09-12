var roleBuilder = require('role.builder');
var roleRemoteHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // end of the world spell 
        //creep.suicide()
        // source hunter AI
        // Setup and hold
        //set check target room
        //setup home 
        // check where should be 
        // travel to target room REQUIRES "creep.memory.harvestRoom"
        //creep.say('starting'); // CHECK IF STARTING THIS CODE
        if (!creep.memory.home){
            var home = creep.room.name;
            creep.memory.home = home;
        }
        if (!creep.memory.harvestRoom){
            Creep.say('I DONT HAVE  A TARGET ROOM');
        }
        if (!creep.memory.storageContainer) {
            var target = creep.room.find(FIND_STRUCTURES, {
                filter:  structure =>{
                    return (structure.structureType == STRUCTURE_STORAGE );
                }
            });
            if (target.length == 0) {
                creep.memory.storageContainer = 'undefined';
            }
            else {
                creep.memory.storageContainer = creep.room.storage.id;
            }
        }
        if (!creep.memory.targetRoom) {
            creep.memory.targetRoom = creep.memory.home;
        }
        // harvest or deliver
        if(creep.carry.energy == 0) {
            creep.memory.harvesting = false;
            creep.memory.targetRoom = creep.memory.harvestRoom;
        }
        if(!creep.memory.harvesting && creep.carry.energy== creep.carryCapacity) {
            creep.memory.harvesting = true;
            creep.memory.targetRoom = creep.memory.home;
        }
        //
        
        if (creep.room.name != creep.memory.targetRoom){
            creep.memory.flag = creep.memory.targetRoom;
            //console.log(creep.memory.flag);
            //if(creep.memory.flag == "undefined"){
            //    console.log(creep.room);
            //    creep.suicide;
            //}
            var flag = Game.flags[creep.memory.flag];
            // travel to flag
            var pos1 = creep.pos
            var pos2 = flag.pos
            if (!pos1.isEqualTo(pos2)) {
                creep.moveTo(flag.pos);
            }
        }
       
        
        else if (creep.memory.harvesting === true) {
            if (creep.memory.storageContainer == "undefined") {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_STORAGE ) &&
                            structure.energy < structure.energyCapacity;
                    }
                });

                if (targets.length > 0) {
                    focusedtarget = creep.pos.findClosestByRange(targets)
                    if (creep.transfer(focusedtarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(focusedtarget);
                    }
                }
                else{
                    roleBuilder.run(creep);
                }

            }
            else {
                var target = Game.getObjectById(creep.memory.storageContainer);
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
	    }
        // Kill the Useless FUCKS
	    else if (creep.ticksToLive < 50){
	        //creep.say("Bai Bai " + creep.ticksToLive)
	        creep.suicide()
	    }
		else if(creep.memory.harvesting === false ) {
		    if (!creep.memory.source) {
                var sourceFind = creep.pos.findClosestByRange(FIND_SOURCES);
			    creep.memory.source = sourceFind.id;
            }
			var source = Game.getObjectById(creep.memory.source);
			if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
			}
		}
        
	}
};

module.exports = roleRemoteHarvester;