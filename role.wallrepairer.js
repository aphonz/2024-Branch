var roleBuilder = require('role.builder');
var sharedFuntionsCreeps = require('functions.creeps');
module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        if (!creep.memory.home){
            var home = creep.room.name;
            creep.memory.home = home;
        }
        // Go home
        if (creep.room.name != creep.memory.home){
            creep.memory.role1 = creep.memory.role;
            creep.memory.role = "moveFlag"
        }
        // if creep is trying to repair something but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        if (!creep.memory.minLevel) {
		    creep.memory.minLevel = 3000
		}
		if (!creep.memory.source){
		    var FullSource = creep.pos.findClosestByRange(FIND_SOURCES);
		    creep.memory.source = FullSource.id
		}
        else if (!creep.memory.storageContainer) {
            var target = creep.room.find(FIND_STRUCTURES, {
                filter:  structure =>{
                    return (structure.structureType == STRUCTURE_STORAGE );
                }
            });
            if (target.length == 0) {
                creep.memory.storageContainer = 'undefined';
                creep.memory.StorageId = 'undefined';
            }
            else {
                creep.memory.storageContainer = creep.room.storage.id;
                creep.memory.StorageId = creep.room.storage.id;
            }
        }
		// if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        else if (creep.memory.working != true || false) {
            // switch state
            creep.memory.working = false;
        }
        
        // if creep is supposed to repair something
        if (creep.memory.working == true) {
            // find all walls in the room
            var walls = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_WALL || STRUCTURE_RAMPART
        });
            if (Game.time % 100 === 0) {
                 var target = undefined;
            }

            // loop with increasing percentages
            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                // find a wall with less than percentage hits

                // for some reason this doesn't work
                // target = creep.pos.findClosestByPath(walls, {
                //     filter: (s) => s.hits / s.hitsMax < percentage
                // });

                // so we have to use this
            //    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
         //               filter: (s) => s.structureType == STRUCTURE_WALL &&
         //           s.hits / s.hitsMax < percentage
        //    });

                for (let wall of walls) {
                    //console.log(wall.hits);
                    //LET set Max Hits so Ramparts and Wall Both get healed evenly (set to 10,000,000 instead of 300M and 10M compared as a %)
                    //var MaXHitsTareget = 300000 ;
                    if (wall.hits / wall.hitsMax < percentage) {
                    //if ((wall.hits / MaXHitsTareget) < percentage) {    
                        target = wall;
                        creep.say("%" + target.hits/target.hitsMax*100)
                        break;
                    }
                }

                // if there is one
                if (target != undefined) {
                    // break the loop
                    break;
                }
            }

            // if we find a wall that has to be repaired
            if (target != undefined) {
                // try to repair it, if not in range
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.travelTo(target);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleBuilder.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        // Get resources + suicide
        else {
            if(creep.memory.storageContainer == "undefined" ){
                //console.log('harvest with no container')
                sharedFuntionsCreeps.harvest(creep);
            }
            else {
                //creep.say('help')
                sharedFuntionsCreeps.harvestWithStoreage(creep);
            }
        }
    }
};