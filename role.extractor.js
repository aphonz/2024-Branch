var roleExtractor = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (!creep.memory.home){
            var home = creep.room.name;
            creep.memory.home = home;
        }
        // Go home
        /*
        if (creep.room.name != creep.memory.home){
            creep.memory.role1 = creep.memory.role;
            creep.memory.role = "moveFlag"
        }
        if (!creep.memory.flag){
            var flag = 'Extractor'+ creep.memory.home;
            creep.memory.flag = flag;
        }
        var flag = creep.memory.flag;
		// travel to flag
		var pos1 = creep.pos
		var pos2 = flag.pos
        // source hunter AI
        if (pos1 != pos2){
            creep.moveTo(pos2)
        }
        */
        if (!creep.memory.ExtractorSource) {
            //var source = creep.pos.findClosestByRange(FIND_MINERAL);
			//creep.memory.source = source.id;
			Creep.say('Source not def') // Minreral ID?
        }
        if (!creep.memory.harvesting) {
            creep.memory.harvesting = false;
        }

        if (creep.store.getFreeCapacity() < 20) {
           creep.memory.harvesting = true;
	    }
	    else{
	       creep.memory.harvesting = false;
        }

	    if(creep.memory.harvesting === true) {
            var TERMINAL = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TERMINAL)     }
            });
		
            if(TERMINAL.length > 0) {
                //creep.say('hi')
                var ResouceType = RESOURCE_OXYGEN ;
                if(creep.transfer(TERMINAL[0], ResouceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(TERMINAL[0]);
                }
            }         
			
		}
		if(creep.memory.harvesting === false ) {
		    //if (!pos1.isEqualTo(pos2)) {
			//creep.moveTo(flag.pos);
		    //}
			var ExtractorSource = Game.getObjectById(creep.memory.ExtractorSource);
			if(creep.harvest(ExtractorSource) == ERR_NOT_IN_RANGE) {
					creep.moveTo(ExtractorSource);
			}
		}
       
	}
};

module.exports = roleExtractor;