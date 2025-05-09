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
        if (creep.hits != creep.hitsMax) {// if your not on full HP go home your drunk
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
        if (creep.memory.harvesting == true) {
             var RepairStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, { 
                 filter: (s) => {
                        //Vary HP or max hitpoints 

                        var MaxStructureLimit = 30000;
                        //console.log(MaxStructureLimit);
                        const maxHits = s.hitsMax > MaxStructureLimit ? MaxStructureLimit : s.hitsMax;
                        return s.hits < maxHits && s.structureType != STRUCTURE_WALL;
                    }
            });
            if (RepairStructure != undefined) {
                // try to repair it, if it is out of range
                if (creep.repair(RepairStructure) == ERR_NOT_IN_RANGE) {
                    // Keep on moveing home
                    //creep.travelTo(structure);
                }
                
            }
            var BuildTargets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
              if(creep.build(BuildTargets) == ERR_NOT_IN_RANGE){
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
			else if(creep.harvest(source) == ERR_NOT_ENOUGH_RESOURCES) {
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
			}
		}
        
	}
};

module.exports = roleRemoteHarvester;