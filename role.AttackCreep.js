var roleAttackCreep = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // source hunter AI
        //var targetStructure = creep.room.find(FIND_HOSTILE_STRUCTURES);
        var targetScreeps = creep.room.find(FIND_HOSTILE_CREEPS);
        //var targetTowers = creep.room.find(FIND_HOSTILE_STRUCTURES_TOWERS);
        if(targetScreeps.length > 0) {
            focusedtarget = creep.pos.findClosestByRange(targetScreeps)
            //creep.say(focusedtarget.id)
            if(creep.attack(focusedtarget) == ERR_NOT_IN_RANGE) {
                creep.travelTo(focusedtarget);
            }
        }
        
    }
}

module.exports = roleAttackCreep;