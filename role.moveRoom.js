var roleFlagMove = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // Add flag Location to memory
		if (creep.memory.home !== 'undefined' && !creep.memory.flag){
		    creep.memory.flag = creep.memory.home
		}
		
		var flag = Game.flags[creep.memory.flag];
		
		// travel to flag
		
		
		if (creep.room.name != creep.memory.flag) {
			creep.moveTo(flag.pos);
		}			
        else {
			(creep.memory.role = creep.memory.role1 ) ;
		}           
	}
};

module.exports = roleFlagMove;