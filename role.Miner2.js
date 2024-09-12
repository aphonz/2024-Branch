var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.TargetSource){
            creep.memory.TargetSource = creep.pos.findClosestByRange(FIND_SOURCES);
        }
        if(!creep.memory.TargetContainer){
            Creep.say("No Container");
        }
        if(!creep.memory.TargetLink){
            Creep.say("No Link")
        }
        //creep.memory.TargetContainer = '66c9ee5cf2048910a53ae898';
        //creep.memory.TargetLink = '66c6f7cc6706e51064992c75';
        var TargetContainer = creep.memory.TargetContainer;
        var TargetLink = creep.memory.TargetLink;
        
	    if(creep.store.getFreeCapacity() > 0) {
	        if(creep.ticksToLive < 30){
	            creep.suicide();
	        }
	        
            var source = Game.getObjectById(creep.memory.TargetSource);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.travelTo(source, {visualizePathStyle: {stroke: '#ffac02'}});
            }
        }
        else {
            var target = Game.getObjectById(TargetContainer)
            console.log(target.store.getFreeCapacity(RESOURCE_ENERGY));
            
            if(target.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ) {
                creep.say("Link");
                target = Game.getObjectById(TargetLink);
            }
            
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(target, {reusePath: 10},{visualizePathStyle: {stroke: '#ffffff'}});
            }
            
        }
	}
};

module.exports = roleMiner;