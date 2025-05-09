var FunctionsSpawningCode = require('SpawningCode');

var RemoteRoomCode = {
// part 1 Analysis 
// part 2 spawn
// Part 3 Scout
// part 3 Defence 


//TODO
// Haulers insteal of all in ones? containers 


//Part 1
analyzeOwnedRooms: function analyzeOwnedRoom() {
        let ownedRooms = _.filter(Game.rooms, room => room.find(FIND_MY_SPAWNS).length > 0);

        ownedRooms.forEach(room => {
            this.RemoteanalyzeRoom(room.name);
        });

        //console.log(`Analysis started for ${ownedRooms.length} owned rooms.`);
    }, // Function end

    
   RemoteanalyzeRoom: function RemoteanalyzeRoom(roomName) {
	let room = Game.rooms[roomName];
	if (!room) {
		console.log(`Room ${roomName} not visible.`);
		if (Memory.rooms[roomName] && Memory.rooms[roomName].remoterooms) {
			for (let remoteRoom in Memory.rooms[roomName].remoterooms) {
				Memory.rooms[roomName].remoterooms[remoteRoom].LastSeen = Game.time;
			}
		}
		return;
	}

	// Initialize memory structure
	if (!Memory.rooms[roomName]) Memory.rooms[roomName] = { remoterooms: {} };
	if (!Memory.rooms[roomName].remoterooms) Memory.rooms[roomName].remoterooms = {};
    let homeroom = Memory.rooms[roomName].name ;
	let nearbyRooms = [];
	let exits = Game.map.describeExits(roomName);
    for (let exit in exits) {
    	let firstLayerRoom = exits[exit];
    	// Ensure the original room isn't added
	    if (firstLayerRoom !== roomName) {
		    nearbyRooms.push(firstLayerRoom);
		    if (!Memory.rooms[roomName].remoterooms[firstLayerRoom]) {
                Memory.rooms[roomName].remoterooms[firstLayerRoom] = { layer: 1 };
            }
    	}
    	let secondLayerExits = Game.map.describeExits(firstLayerRoom);
        for (let secondExit in secondLayerExits) {
	    let secondLayerRoom = secondLayerExits[secondExit];
		        // Ensure the original room isn't added
    		    if (secondLayerRoom !== roomName && !nearbyRooms.includes(secondLayerRoom)) {
	    		    nearbyRooms.push(secondLayerRoom);
	    		    if (secondLayerRoom !== roomName && !Memory.rooms[roomName].remoterooms[secondLayerRoom]) {
                        Memory.rooms[roomName].remoterooms[secondLayerRoom] = { layer: 2 };
                    }

		        }
        }   
    }
    
    



	
	nearbyRooms.forEach(remoteRoom => {
		if (!Memory.rooms[roomName].remoterooms[remoteRoom]) {
			Memory.rooms[roomName].remoterooms[remoteRoom] = { Ignore: false, LastSeen: Game.time };
			console.log(`Initialized memory for remote room: ${remoteRoom}`);
		}

		let remoteMemory = Memory.rooms[roomName].remoterooms[remoteRoom];

		// Skip ignored rooms
		if (remoteMemory.Ignore) {
			//console.log(`Skipping ignored room: ${remoteRoom}`);
			return;
		}
		else{
		    remoteMemory.Ignore = false ;
		}

		// Check if there's vision inside the remote room before updating LastSeen
        if (Game.rooms[remoteRoom] && _.some(Game.creeps, creep => creep.room.name === remoteRoom)) {
            remoteMemory.LastSeen = Game.time;
        }
        if (!remoteMemory.LastSeen){
            remoteMemory.LastSeen = Game.time-1000;
        }
		// Track actual harvesters
		remoteMemory.actualHarvesters = _.filter(Game.creeps, creep => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == remoteRoom && creep.ticksToLive > 200).length;

		try {
            let hostiles = Game.rooms[remoteRoom] ? Game.rooms[remoteRoom].find(FIND_HOSTILE_CREEPS) : [];
            let hostileStructures = Game.rooms[remoteRoom] ? Game.rooms[remoteRoom].find(FIND_HOSTILE_STRUCTURES) : [];

            if (hostiles.length > 0 || hostileStructures.length > 0) {
                remoteMemory.isSafe = false;
                remoteMemory.unsafeUntil = Game.time + 1000;
                console.log(`Hostile detected in ${remoteRoom}, marking unsafe until tick ${remoteMemory.unsafeUntil}`);
            } else {
                // Ensure room automatically becomes safe after 1000 ticks, even if no explicit safety flag exists.
                if (!remoteMemory.unsafeUntil || Game.time >= remoteMemory.unsafeUntil) {
                    remoteMemory.isSafe = true;
                    delete remoteMemory.unsafeUntil;
                    //console.log(`Room ${remoteRoom} is safe again.`);
                }
            }   
        } catch (error) {
            console.log(`Error checking safety for ${remoteRoom}:`, error);
        }


		try {
			if (Game.rooms[remoteRoom] && Game.rooms[remoteRoom].controller) {
	let controller = Game.rooms[remoteRoom].controller;

	// Store the owner or reservation username directly
	if (controller.owner) {
		remoteMemory.isOwned = controller.owner.username;
		remoteMemory.ownedUntil = Game.time + 10000;
		console.log(`Room ${remoteRoom} marked as owned by ${remoteMemory.isOwned} until tick ${remoteMemory.ownedUntil}`);
	} else if (controller.reservation) {
	    remoteMemory.ReserverValue = controller.reservation.ticksToEnd;
		remoteMemory.isOwned = controller.reservation.username;
		remoteMemory.ownedUntil = Game.time + 10000;
		//console.log(`Room ${remoteRoom} marked as reserved by ${remoteMemory.isOwned} until tick ${remoteMemory.ownedUntil}`);
	} else {
		if (remoteMemory.ownedUntil && Game.time >= remoteMemory.ownedUntil) {
			remoteMemory.isOwned = null;
			delete remoteMemory.ownedUntil;
			console.log(`Room ${remoteRoom} ownership expired.`);
		}
	}
}

		} catch (error) {
			console.log(`Error processing room ${remoteRoom}:`, error);
		}

		remoteMemory.hasReserver = _.some(Game.creeps, creep => creep.memory.role === 'reserver' && creep.memory.targetRoom === remoteRoom);

		try {
			if (Game.rooms[remoteRoom]) {
				let sources = Game.rooms[remoteRoom].find(FIND_SOURCES);

				if (!remoteMemory.Sources) remoteMemory.Sources = [];

				sources.forEach(source => {
					let existingSource = remoteMemory.Sources.find(s => s.id === source.id);
					let assignedCreeps = _.filter(Game.creeps, creep => creep.memory.source === source.id && creep.memory.harvestRoom === remoteRoom).length;

					if (existingSource) {
						existingSource.assignedCreeps = assignedCreeps;
					} else {
						remoteMemory.Sources.push({ id: source.id, assignedCreeps });
					}
				});
			}
		} catch (error) {
			console.log(`Error managing sources for ${remoteRoom}:`, error);
		}

		if (remoteMemory.Sources && remoteMemory.isSafe === true && remoteMemory.isOwned === false) {
			var targetHarvesters = remoteMemory.Sources.length * 2;
			remoteMemory.harvestersTarget = targetHarvesters;
		} else {
			remoteMemory.harvestersTarget = 0;
		}
		

		//console.log(`Updated memory for ${remoteRoom}: Target Harvesters: ${remoteMemory.harvestersTarget}, Actual: ${remoteMemory.actualHarvesters}, Safe: ${remoteMemory.isSafe}, Owned: ${remoteMemory.isOwned}, Reserver Assigned: ${remoteMemory.hasReserver}`);
	});

	//console.log(`Analysis completed for ${roomName}, tracking ${nearbyRooms.length} remote rooms.`);
},//END OF FUNCTION




//Part 2

   
manageSpawning: function() {
    const WorkerParts = [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];

    // Iterate through all spawns
    for (let spawn of Object.values(Game.spawns)) {
        if (spawn.spawning) continue; // Skip spawns that are currently busy

        let mainRoom = spawn.room.name;

        // Check if the room has remote mining operations
        if (!Memory.rooms[mainRoom] || !Memory.rooms[mainRoom].remoterooms) continue;

        // Spawn a scout if none exists
        let existingCreep = _.find(Game.creeps, creep => creep.memory.role === 'RemoteRoomScout' && creep.memory.home === mainRoom);

        if (!existingCreep) { 
            let creepName = `RemoteScout_${Game.time}`;
            let result = spawn.spawnCreep([MOVE], creepName, {
                memory: { role: 'RemoteRoomScout', home: mainRoom }
            });

            if (result === OK) {
                console.log(`Spawned new scout creep: ${creepName} for home room ${mainRoom}`);
                return; // **Exit the function completely**
            }
        }

        // If a scout already exists, proceed with remote spawning logic
        for (let remoteRoom of Object.keys(Memory.rooms[mainRoom].remoterooms)
            .filter(remoteRoom => Memory.rooms[mainRoom].remoterooms[remoteRoom].layer !== undefined)
            .sort((a, b) => Memory.rooms[mainRoom].remoterooms[a].layer - Memory.rooms[mainRoom].remoterooms[b].layer)) {

            let remoteMemory = Memory.rooms[mainRoom].remoterooms[remoteRoom];
            console.log(remoteRoom);

            // **Spawn Remote Harvesters** (Max 2 per source)
            if ((remoteMemory.isOwned == Memory.username && !remoteMemory.Ignore) || 
                (!remoteMemory.isOwned && remoteMemory.isSafe && !remoteMemory.Ignore)) {

                console.log("remoteRoom");

                if (remoteMemory.Sources) {
                    for (let source of remoteMemory.Sources) {
                        let assignedHarvesters = _.filter(Game.creeps, creep => creep.memory.source === source.id && creep.memory.harvestRoom === remoteRoom).length;
                        let maxHarvesters = remoteMemory.isOwned === Memory.username ? 3 : 2;

                        console.log(maxHarvesters);

                        if (assignedHarvesters < maxHarvesters) {
                            let bodyConfig = FunctionsSpawningCode.BuildBody(mainRoom, maxHarvesters, WorkerParts);
                            let creepName = `RemoteHarvester_${remoteRoom}_${Game.time}`;
                            let result = spawn.spawnCreep(bodyConfig, creepName, {
                                memory: { role: 'remoteHarvester', source: source.id, harvestRoom: remoteRoom }
                            });

                            if (result === OK) {
                                console.log(`Spawning remote harvester for ${remoteRoom} targeting source ${source.id}`);
                                return; // **Exit the function completely**
                            }
                        }
                    }

                    // **Spawn Reserver** (Max 1 per room, only if energy capacity > 1500)
                    let assignedReserver = _.some(Game.creeps, creep => creep.memory.role === 'reserver' && creep.memory.harvestRoom === remoteRoom);

                    if (!assignedReserver && spawn.room.energyCapacityAvailable > 1500 && remoteMemory.actualHarvesters > 2 && remoteMemory.ReserverValue < 800) {
                        let reserverParts = [CLAIM, CLAIM, MOVE];
                        let creepName = `Reserver_${remoteRoom}_${Game.time}`;
                        let result = spawn.spawnCreep(reserverParts, creepName, {
                            memory: { role: 'reserver', harvestRoom: remoteRoom }
                        });

                        if (result === OK) {
                            console.log(`Spawning reserver for ${remoteRoom}`);
                            return; // **Exit the function completely**
                        }
                    }
                }
            }
        }
    }
}, //end of function 



selectTargetRoom: function selectTargetRoom(creep) {
	let homeRoom = creep.memory.home;
	if (!Memory.rooms[homeRoom] || !Memory.rooms[homeRoom].remoterooms) {
		console.log(`No remote rooms found for home: ${homeRoom}`);
		return null;
	}
	//console.log("Hi MOM");

	let targetRoom = null;
	let oldestLastSeen = Game.time; // Track the room unseen for the longest time

	for (let remoteRoom in Memory.rooms[homeRoom].remoterooms) {
		let roomMemory = Memory.rooms[homeRoom].remoterooms[remoteRoom];

		// Skip ignored rooms ( unsafe rooms unsafe removed due to startup issue)
		if (roomMemory.Ignore) continue;

		// Check last seen time
		let lastSeen = roomMemory.LastSeen || 0;
		if (Game.time - lastSeen > 1000 && lastSeen < oldestLastSeen) {
			targetRoom = remoteRoom;
			oldestLastSeen = lastSeen;
		}
	}

	if (targetRoom) {
		console.log(`Scout creep selected target room: ${targetRoom}`);
		creep.memory.targetRoom = targetRoom; // ✅ **Assign target room to creep's memory**
		return targetRoom;
	} else {
		console.log(`No valid scout target found for ${creep.name}`);
		return null;
	}
},// FUNCTION END






};

module.exports = RemoteRoomCode;    