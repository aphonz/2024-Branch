var FunctionsRemoteRoomCode = require('RemoteRoomCode')

var roleRemoteRoomScout = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // **Check if resting before selecting a new room**
	if (creep.memory.restUntil && Game.time < creep.memory.restUntil) {
	    creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
	    //let restRemain = creep.memory.restUntil - Game.time;
	    //creep.say(restRemain + " left");
		//console.log(`${creep.name} is resting until tick ${creep.memory.restUntil}`);
		return;
	}
	else{
	// **Check for an existing flag, create one if missing**
		if (!Game.flags[creep.room.name]) {
			creep.room.createFlag(25, 25, creep.room.name, COLOR_ORANGE);
			console.log(`Placed orange flag: ${creep.room.name} at (25,25)`);
		}



	// **Check if target room needs to be selected**
	if (!creep.memory.targetRoom && Game.time %10) {
		let newTarget = FunctionsRemoteRoomCode.selectTargetRoom(creep);
		if (newTarget) {
			creep.memory.targetRoom = newTarget;
		} else {
			// **No valid rooms, return home and rest**
			creep.memory.restUntil = Game.time + 100;
			creep.memory.targetRoom = null;
			console.log(`${creep.name} has no valid scout target, returning home to rest`);
			creep.moveTo(new RoomPosition(25, 25, creep.memory.home));
			return;
		}
	}

	let targetRoom = creep.memory.targetRoom;

	// **Move towards target room**
	if (creep.room.name !== targetRoom) {
		creep.moveTo(new RoomPosition(25, 25, targetRoom)); // Moves inside the room rather than stopping at the edge
	} else {
		// **Scout has entered room, update last seen time**
		let roomMemory = Memory.rooms[creep.memory.home].remoterooms[targetRoom];
		if (roomMemory) {
			//roomMemory.LastSeen = Game.time;
			console.log(`${creep.name} scouted ${targetRoom}, clearing target and acquiring next room`);
		}
		
		// **Clear target and get a new one**
		creep.memory.targetRoom = null;
	}
    }
    }
};

module.exports = roleRemoteRoomScout;