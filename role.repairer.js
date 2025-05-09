
var roleBuilder = require('role.builder');
var sharedFuntionsCreeps = require('functions.creeps');
module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // ADD HOME
        if (!creep.memory.home){
            var home = creep.room.name;
            creep.memory.home = home;
        }
        //GET Max Hp for ramparts 
        if (!creep.memory.Roomlevel){
            creep.memory.Roomlevel = creep.room.controller.level
            creep.say(creep.room.controller.level);
        }
        // Go home
        if (creep.room.name != creep.memory.home){
            creep.memory.role1 = creep.memory.role;
            creep.memory.role = "moveFlag"
        }
        if (!creep.memory.TargetSource) {
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
			creep.memory.TargetSource = source.id;
        }
        if (!creep.memory.minLevel) {
            creep.memory.minLevel = 5000
        }
        //if (!creep.memory.StorageId) {
        //    creep.memory.StorageId = creep.room.storage.id;
        //}

        // if creep is trying to repair something but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
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
            // find closest structure with less than max hits
            // Exclude walls because they have way too many max hits and would keep
            // our repairers busy forever. We have to find a solution for that later.
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    // the second argument for findClosestByPath is an object which takes
                    // a property called filter which can be a function
                    // we use the arrow operator to define it
                    filter: (s) => {
                        //Vary HP or max hitpoints 
                        // room LVL 1 - 8 vaules are 0.25m , 0.3m , 0.42m , 0.66m, 1m , 1.6m , 2.4m , 3.76m
                        var MaxStructureLimit = ((((creep.memory.Roomlevel*creep.memory.Roomlevel*creep.memory.Roomlevel)*6.5 )+ 248)*1000);
                        //console.log(MaxStructureLimit);
                        const maxHits = s.hitsMax > MaxStructureLimit ? MaxStructureLimit : s.hitsMax;
                        return s.hits < maxHits && s.structureType != STRUCTURE_WALL;
                    }
        });

            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.travelTo(structure);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleBuilder.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // Get resources + suicide
            sharedFuntionsCreeps.harvestWithStoreage(creep);
        }
    }
};