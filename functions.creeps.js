
var funtionsCreeps = {


// Basic Harvest code Sourced
harvest: function harvest(creep) {
    if (creep.ticksToLive < 70) {
        creep.suicide()
    }
    var source = Game.getObjectById(creep.memory.TargetSource);
    //console.log(source)
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.travelTo(source);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //try again
        }
    }
},
// Core Harvest code with storage 
harvestWithStoreage: function harvestWithStorage(creep){
    if (creep.ticksToLive < 70) {
        creep.suicide()
    }
    if (!creep.memory.StorageId) {
        if (creep.room.storage == undefined){
            creep.memory.StorageId = "NoValue";
        }
        else{
           creep.memory.StorageId = creep.room.storage.id; 
        }
        
    }
    if (!creep.memory.TargetSource) {
        var TTTT111 = creep.pos.findClosestByRange(FIND_SOURCES);
        creep.memory.TargetSource = TTTT111.id;
        
    }
    if (!creep.memory.minLevel) {
        creep.memory.minLevel = 30000 ;//100k Min storage by default 
    }
    //Harvest
    var source = Game.getObjectById(creep.memory.TargetSource);
    if (source.Energy = 0){
       // source = (creep.pos.findClosestByRange(FIND_SOURCES,filter: (structure) => {structure.energy > 0})).id;
    }
    var minLevel = (creep.memory.minLevel);
    //creep.say(creep.room.storage.store[RESOURCE_ENERGY]);
    if (creep.memory.StorageId == "NoValue") {
        creep.say('NO STOREAGE')
        var nearbyContainer = (creep.pos.findInRange(FIND_STRUCTURES, 3,{
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ) && 
                            structure.store.energy > 300;    }
            }))  ;
            //console.log(nearbyContainer)
            //console.log(nearbyContainer.length)
        if (nearbyContainer.length == 1){
            source2 = (creep.pos.findClosestByRange(nearbyContainer))
            if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.travelTo(source2);
            if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //try again
                }
            }
        }
        else if (creep.harvest(source) == ERR_NOT_IN_RANGE||ERR_NOT_ENOUGH_RESOURCES) {
            creep.travelTo(source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                //try again
            }
        }
    }
    
    else if(creep.room.storage.store[RESOURCE_ENERGY] < minLevel) {
        creep.say('Storage LOW')
        var nearbyContainer = (creep.pos.findInRange(FIND_STRUCTURES, 4,{
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK) && 
                            structure.store.energy > 300;    }
            }))  ;
            //console.log(nearbyContainer)
            //console.log(nearbyContainer.length)
        if (nearbyContainer.length > 0){
            source2 = (creep.pos.findClosestByRange(nearbyContainer))
            if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.travelTo(source2);
            if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //try again
                }
            }
        }
        else if (creep.harvest(source) == ERR_NOT_IN_RANGE||ERR_NOT_ENOUGH_RESOURCES) {
            creep.travelTo(source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                //try again
            }
        }
    }
    else {
                var nearbyContainer = (creep.pos.findInRange(FIND_STRUCTURES, 4,{
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK) && 
                            structure.store.energy > 300;    }
            }))  ;
            //console.log(nearbyContainer)
            //console.log(nearbyContainer.length)
        if (nearbyContainer.length > 0){
            source2 = (creep.pos.findClosestByRange(nearbyContainer))
            if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.travelTo(source2);
            if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //try again
                }
            }
        }
        else{
            var source2 = Game.getObjectById(creep.memory.StorageId);
            creep.say('TO Storage')
            if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source2);
                if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //try again
                }
            }
        }
        
    }
},

BetterCreepTransferEnergy: function BetterCreepTransferEnergy(creep,target){
    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.travelTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            //try and transfer again once moved
        }
    }
},

BetterCreepWithdrawEnergy: function BetterCreepWithdrawEnergy(creep){
    if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
             creep.travelTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
        if (creep.withdraw(storage) == ERR_NOT_IN_RANGE){
            //try and transfer again once moved
        }
    }
},

findValidContainer: function findValidContainer(creep) {
    const containers = creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_CONTAINER
    });

    // Only consider containers within a reasonable range (e.g., 5 tiles)
    const nearbyContainers = containers.filter(container => creep.pos.inRangeTo(container, 5));

    // Select the closest valid container
    if (nearbyContainers.length > 0) {
        const targetContainer = creep.pos.findClosestByPath(nearbyContainers);
        creep.memory.TargetContainer = targetContainer.id;
        return targetContainer;
    }

    // Check if a container construction site already exists before making a new one
    const existingSite = creep.room.find(FIND_CONSTRUCTION_SITES, {
        filter: site => site.structureType === STRUCTURE_CONTAINER && creep.pos.inRangeTo(site, 5)
    });

    if (existingSite.length === 0) { // Ensure no duplicate container builds
        if (creep.room.createConstructionSite(creep.pos, STRUCTURE_CONTAINER) === OK) {
            console.log(`Creep ${creep.name} placed a container construction site at ${creep.pos}`);
        }
    }

    return null;
},
updateSourceRoads: function updateSourceRoads(creep) {
    if (!creep.memory.source) return;

    // Ensure the creep's assigned room is visible before proceeding
    const targetRoom = creep.memory.harvestRoom || creep.memory.home;
    if (!Game.rooms[targetRoom]) return; // If room isn't visible, skip processing
    console.log("part11")
    // Retrieve the source object safely
    const source = Game.getObjectById(creep.memory.source);
    if (!source) return; // Ensure source exists before proceeding
    console.log("part12")
    const homeRoom = creep.memory.home;
    const room = Game.rooms[homeRoom];
    if (!room) return;
console.log("part13")
    const spawns = room.find(FIND_MY_SPAWNS);
    if (!spawns.length) return;
    const spawn = spawns[0];
     console.log("part1")
    // Ensure pathfinding won't fail
    if (!spawn.pos || !source.pos) return;
    const path = spawn.pos.findPathTo(source.pos, { ignoreCreeps: true });
    if (!path.length) return; // Check if path was found

    let lastRoomName = homeRoom;

    // Initialize Memory.rooms if it doesn't exist
    if (!Memory.rooms) Memory.rooms = {};
    console.log("lets build some roads")
    path.forEach(pos => {
        if (pos.roomName) lastRoomName = pos.roomName; // Update room tracking safely

        if (!Memory.rooms[lastRoomName]) Memory.rooms[lastRoomName] = { sourceroads: {} };
        if (!Memory.rooms[lastRoomName].sourceroads[creep.memory.source]) {
            Memory.rooms[lastRoomName].sourceroads[creep.memory.source] = [];
        }

        Memory.rooms[lastRoomName].sourceroads[creep.memory.source].push({ x: pos.x, y: pos.y, roomName: lastRoomName });

        if (Game.rooms[lastRoomName]) {
            const result = Game.rooms[lastRoomName].createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
            if (result !== OK) {
                console.log(`Failed to create road at (${pos.x}, ${pos.y}) in ${lastRoomName}, error code: ${result}`);
            }
        }
    });

    console.log(`Source roads updated for creep: ${creep.name}`);
},


assignSupplyContainer: function assignSupplyContainer(creep) {
    const homeRoom = Memory.rooms[creep.memory.home];
    if (!homeRoom || !homeRoom.sources) return;

    for (const sourceName in homeRoom.sources) {
        const source = homeRoom.sources[sourceName];
        const haulersAssigned = _.filter(Game.creeps, c => c.memory.SupplyContainer1 === source.containerId).length;
        const carryNeededPerHauler = source.HaulerCarry2Needed / (homeRoom.TargetScreep.hauler.size || 1);

        if (haulersAssigned < carryNeededPerHauler) {
            creep.memory.SupplyContainer1 = source.containerId;
            return;
        }
    }

    // If no valid assignment is found, clear the assignment.
    creep.memory.SupplyContainer1 = null;
}


    
    
    
    /**else if(target = creep.pos.findClosestByRange(RUIN);
        creep.travelTo(target);) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.travelTo(source);
        }
    } **/
            
};

module.exports = funtionsCreeps;