var funtionsCreeps = {

    // Screep startup and room check codes


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
            creep.memory.minLevel = 100000 ;//100k Min storage by default 
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
            var nearbyContainer = creep.pos.findInRange(FIND_STRUCTURES, 3,{
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 300;    }
                });
            if (nearbyContainer.length != 0){
                source2 = Game.getObjectById(creep.pos.findClosestByRange(nearbyContainer))
                if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source2);
                if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //try again
                }
            }
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    //try again
                }
            }
        }
        
        else if(creep.room.storage.store[RESOURCE_ENERGY] < minLevel) {
            creep.say('Storage LOW')
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    //try again
                }
            }
        }
        else {
            var source2 = Game.getObjectById(creep.memory.StorageId);
            creep.say('TO Storage')
            if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source2);
                if (creep.withdraw(source2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //try again
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
    }
        
        
        
        /**else if(target = creep.pos.findClosestByRange(RUIN);
            creep.travelTo(target);) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source);
            }
        } **/
                
    
};

module.exports = funtionsCreeps;