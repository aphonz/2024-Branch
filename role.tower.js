var roleTower = {

    /** @param {Creep} creep **/
    run: function(Tower) {
        
        var tower = Game.getObjectById(Tower.id);
        //some form of if statement for energy??
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(tower.store.energy != 0){
            if(closestHostile) {
                tower.attack(closestHostile);
            }
            else{
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => (structure.hits + 759) < structure.hitsMax && structure.structureType != STRUCTURE_WALL  && structure.structureType != STRUCTURE_RAMPART});
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
                else{
                var closestDamagedStructure2 = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => (structure.hits ) < 3000 && structure.structureType === STRUCTURE_RAMPART});
                if(closestDamagedStructure2) {
                    tower.repair(closestDamagedStructure2);
                    }
                }    
            }    
        }
        else{
            console.log("Tower ID low power " + tower.id)
        }
        
    }
};

module.exports = roleTower;
