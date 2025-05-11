var roleBuilder = require('role.builder');
var sharedFuntionsCreeps = require('functions.creeps');
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
        if (!creep.memory.setup) {
            if (!creep.memory.home) {
                creep.memory.home = creep.room.name;
            }

            if (!creep.memory.harvestRoom) {
                creep.say('I DONT HAVE A TARGET ROOM');
            }

            if (!creep.memory.storageContainer) {
                let target = creep.room.find(FIND_STRUCTURES, {
                    filter: structure => structure.structureType === STRUCTURE_STORAGE
                });
                creep.memory.storageContainer = target.length > 0 ? creep.room.storage.id : 'undefined';
            }
        
            if (!creep.memory.targetRoom) {
                creep.memory.targetRoom = creep.memory.home;
            }

            // Once all conditions are checked, mark setup as complete
            creep.memory.setup = true;
        }

        // Ensure creep moves to safety if injured
        if (creep.hits !== creep.hitsMax) {
            creep.moveTo(new RoomPosition(25, 35, creep.memory.home));        
            return;
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
        //Repair/build structures nearby
        if (creep.memory.harvesting == true && (Game.time % 3 == 0)) {
        const minX = Math.max(0, creep.pos.x - 1);
const maxX = Math.min(49, creep.pos.x + 1);
const minY = Math.max(0, creep.pos.y - 1);
const maxY = Math.min(49, creep.pos.y + 1);

const structures = creep.room.lookForAtArea(LOOK_STRUCTURES, minY, minX, maxY, maxX, true)
    .map(s => s.structure);

const repairTarget = structures.find(s =>
    s.hits < Math.min(s.hitsMax, 30000) && s.structureType !== STRUCTURE_WALL
);

if (repairTarget) {
    creep.repair(repairTarget);
} else {
    const constructionSites = creep.room.lookForAtArea(LOOK_CONSTRUCTION_SITES, minY, minX, maxY, maxX, true)
        .map(s => s.constructionSite);

    if (constructionSites.length > 0) {
        creep.build(constructionSites[0]);
    }
}


                  //sharedFuntionsCreeps.updateSourceRoads(creep);
                    // Keep on moveing home
                    //Lets Build a road 
        //                    creep.pos.createConstructionSite(STRUCTURE_ROAD);
                           
                            //var StructureTesting = creep.room.lookForAt(LOOK_STRUCTURES, creep.room.pos);
                            //console.log(StructureTesting);
                            //if (StructureTesting.length != 0){console.log(StructureTesting[0].structureType)}
                            /*var ContructionSiteTesting = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, creep.room.pos);
                            if(StructureTesting == '' && ContructionSiteTesting == 'undefined'){
                                creep.say('Offroad');
                            }*/ 
                
            
            
            
        }
        
        
        // go home
        if (creep.room.name != creep.memory.targetRoom){
            creep.memory.flag = creep.memory.targetRoom;
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
			/*else if(creep.harvest(source) == ERR_NOT_ENOUGH_RESOURCES) {
					if (!creep.memory.source2) {
                        const sourceFind2 = creep.room.find(FIND_SOURCES, {
                            filter: (source) => source.energy > 20
                            });
			            creep.memory.source2 = sourceFind2.id;
                    }
                    var source2 = Game.getObjectById(creep.memory.source2);
			        if(creep.harvest(source2) == ERR_NOT_IN_RANGE) {
					    creep.moveTo(source2);
			        }
			}*/
		}
        
	}
};

module.exports = roleRemoteHarvester;