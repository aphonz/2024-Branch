var functionsCondensedMain = {
    
    // AssignBots code
    AssignBots: function AssignBots(Game){
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        
        
    },
    
    // Cleaner code
    Clean: function Clean(Game){
        if (Game.time % 100 === 0) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]){
                delete Memory.creeps[name];
                console.log('Getting rid of shit bloke ' + name);
                }
            }
        }
    },
    
    //Pixel Code
    PixelsGenrate: function PixelsGenrate(Game){
        //Check if can make a Pixel (might be a MMO only Feature)
         if(Game.cpu.bucket == 10000){
        console.log("PIXELS");
       // Game.cpu.generatePixel();
        }
    },
    
    //Unit in room check
    CreepAliveHomeMemory: function  CreepAliveHomeMemory(Game){
        // Initialize the rooms object if it doesn't already exist
        if (!Memory.rooms) {
            Memory.rooms = {};
        }

        // Reset ActiveScreeps counts for each room at the start of the tick
        Object.keys(Memory.rooms).forEach(roomName => {
            
            if (Memory.rooms[roomName].ActiveScreeps) {
                const roles = Memory.roles
                roles.forEach(role => {
                Memory.rooms[roomName].ActiveScreeps[role] = 0; // Reset each role count to zero
                    });
                }
            else {
                Memory.rooms[roomName].ActiveScreeps = {}; // Ensure ActiveScreeps exists
            }   
        });

        // Loop through all creeps and populate the data in Memory.rooms
        Object.values(Game.creeps).forEach(creep => {
            const roomName = creep.memory.home;
            if (roomName) {
                // Ensure the room is initialized in Memory
                if (!Memory.rooms[roomName]) {
                    Memory.rooms[roomName] = {};
                }
        
                // Ensure ActiveScreeps is initialized as an object
                if (!Memory.rooms[roomName].ActiveScreeps) {
                    Memory.rooms[roomName].ActiveScreeps = {};
                }
    
                const role = creep.memory.role;
                // Check if the creep has a role and sufficient ticks to live
                if (role ) {
                    // Increment the count for this role
                    if (!Memory.rooms[roomName].ActiveScreeps[role]) {
                        Memory.rooms[roomName].ActiveScreeps[role] = 0;
                    }
                    Memory.rooms[roomName].ActiveScreeps[role]++;
                }
            }
        });
    },  //Function end
    
    RoomsLevelMemory: function RoomsLevelMemory(Game){
        Object.keys(Game.rooms).forEach(roomName => {
          let room = Game.rooms[roomName];

            // Initialize Memory for the room if it doesn't exist
            if (!Memory.rooms[roomName]) {
                Memory.rooms[roomName] = {};
            }   
            // Check if the room has a controller and store its level
            if (room.controller) {
                Memory.rooms[roomName].RoomLevel = room.controller.level; // Assign controller level
            } else {
            Memory.rooms[roomName].RoomLevel = null; // For rooms without a controller
            }
        });

    },//Function end
    analyzeOwnedRooms: function analyzeOwnedRoom() {
        let ownedRooms = _.filter(Game.rooms, room => room.find(FIND_MY_SPAWNS).length > 0);

        ownedRooms.forEach(room => {
            this.RemoteanalyzeRoom(room.name);
        });

        console.log(`Analysis started for ${ownedRooms.length} owned rooms.`);
    }, // Function end

    
    RemoteanalyzeRoom: function RemoteanalyzeRoom(roomName) {
    let room = Game.rooms[roomName];
    if (!room) {
        console.log(`Room ${roomName} not visible.`);
        return;
    }

    // Check for an existing flag, create one if missing
    if (!Game.flags[roomName]) {
        room.createFlag(25, 25, roomName);
        console.log(`Created flag: ${roomName} at (25,25)`);
    }

    // Find rooms in range of 2
    let nearbyRooms = [];
    let exits = Game.map.describeExits(roomName);
    for (let exit in exits) {
        let firstLayerRoom = exits[exit];
        nearbyRooms.push(firstLayerRoom);
        let secondLayerExits = Game.map.describeExits(firstLayerRoom);
        for (let secondExit in secondLayerExits) {
            let secondLayerRoom = secondLayerExits[secondExit];
            if (!nearbyRooms.includes(secondLayerRoom)) {
                nearbyRooms.push(secondLayerRoom);
            }
        }
    }

    // Initialize memory structure
    if (!Memory.rooms[roomName]) Memory.rooms[roomName] = { remoterooms: {} };
    if (!Memory.rooms[roomName].remoterooms) Memory.rooms[roomName].remoterooms = {};

    nearbyRooms.forEach(remoteRoom => {
        if (!Memory.rooms[roomName].remoterooms[remoteRoom]) {
            Memory.rooms[roomName].remoterooms[remoteRoom] = {};
            console.log(`Initialized memory for remote room: ${remoteRoom}`);
        }

        let remoteMemory = Memory.rooms[roomName].remoterooms[remoteRoom];

        // Set memory attributes
        remoteMemory.actualHarvesters = _.filter(Game.creeps, creep => creep.memory.role == 'remoteHarvester' && creep.memory.harvestRoom == remoteRoom && creep.ticksToLive > 200).length;
        //remoteMemory.isSafe = Game.map.getRoomStatus(remoteRoom).status === 'normal';
        
        try {
                let hostiles = Game.rooms[remoteRoom] ? Game.rooms[remoteRoom].find(FIND_HOSTILE_CREEPS) : [];
                let hostileStructures = Game.rooms[remoteRoom] ? Game.rooms[remoteRoom].find(FIND_HOSTILE_STRUCTURES) : [];
            
                    if (hostiles.length > 0 || hostileStructures.length > 0) {
                    remoteMemory.isSafe = false;
                    remoteMemory.unsafeUntil = Game.time + 1000; // Mark unsafe for 1000 ticks
                    console.log(`Hostile detected in ${remoteRoom}, marking unsafe until tick ${remoteMemory.unsafeUntil}`);
                } else {
                    // Check if the unsafe status should expire
                    if (remoteMemory.unsafeUntil && Game.time >= remoteMemory.unsafeUntil) {
                        remoteMemory.isSafe = true; // Room is safe again   
                        delete remoteMemory.unsafeUntil; // Remove expiration marker
                        console.log(`Room ${remoteRoom} is safe again.`);
                    }
                }
            } catch (error) {
                console.log(`Error checking safety for ${remoteRoom}:`, error);
            }

        
        remoteMemory.isOwned = !!Game.rooms[remoteRoom] && !!Game.rooms[remoteRoom].controller && !!Game.rooms[remoteRoom].controller.owner;
        remoteMemory.hasReserver = _.some(Game.creeps, creep => creep.memory.role === 'reserver' && creep.memory.targetRoom === remoteRoom);

        //if (!remoteMemory.Sources) {
             try {
                let sources = Game.rooms[remoteRoom] ? Game.rooms[remoteRoom].find(FIND_SOURCES) : [];
                 remoteMemory.Sources = sources.map(source => ({
                   id: source.id,
                     assignedCreeps: _.filter(Game.creeps, creep => creep.memory.source === source.id && creep.memory.targetRoom === remoteRoom).length
                  }));
              } catch (error) {
        //console.log(`Error retrieving sources for ${remoteRoom}:`, error);
       // remoteMemory.Sources = []; // Default to an empty array in case of an error
            }
        //}

        
        if (remoteMemory.Sources && remoteMemory.isSafe === true && remoteMemory.isOwned === false ){
            var targetHarvesters = remoteMemory.Sources.length * 2  
            remoteMemory.harvestersTarget = targetHarvesters;
        }
        else{
            remoteMemory.harvestersTarget = 0;
        }
        

        console.log(`Updated memory for ${remoteRoom}: Target Harvesters: ${remoteMemory.harvestersTarget}, Actual: ${remoteMemory.actualHarvesters}, Safe: ${remoteMemory.isSafe}, Owned: ${remoteMemory.isOwned}, Reserver Assigned: ${remoteMemory.hasReserver}`);
    });

    console.log(`Analysis completed for ${roomName}, tracking ${nearbyRooms.length} remote rooms.`);

    }, //Function end
    
    
     findLinks: function findLinks(roomName) { // Usage findLinks('W8N3'); // Replace with your actual room name
        const room = Game.rooms[roomName];
        if (!room) return;

        const controller = room.controller;
        const storage = room.storage;
        if (!controller || !storage) return;

        // Find links in the room
        const links = room.find(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_LINK
        });

        // Identify Controller Link (within range 1 of controller)
        const controllerLink = links.find(link => link.pos.inRangeTo(controller.pos, 1));

        // Identify Storage Link (within range 3 of storage)
        const storageLink = links.find(link => link.pos.inRangeTo(storage.pos, 3));

        // Save to Memory if they don't exist
        if (!Memory.rooms[roomName]) {
            Memory.rooms[roomName] = {};
        }

        Memory.rooms[roomName].controllerLink = controllerLink ? controllerLink.id : null;
        Memory.rooms[roomName].storageLink = storageLink ? storageLink.id : null;
        if ((Memory.rooms[roomName].storageLink != null ) && (Memory.rooms[roomName].controllerLink != null) ){
            Memory.rooms[roomName].LinkUp = true ;
        } else {
            Memory.rooms[roomName].LinkUp = false ;
        }
        
    },//Function end
    
    validateAndTransferEnergy: function validateAndTransferEnergy(roomName) {
    if (!Memory.rooms[roomName]) return;

    let { controllerLink, storageLink } = Memory.rooms[roomName];

    // Validate if both links still exist
    let controller = Game.getObjectById(controllerLink);
    let storage = Game.getObjectById(storageLink);

    if (!controller) {
        delete Memory.rooms[roomName].controllerLink;
    }
    if (!storage) {
        delete Memory.rooms[roomName].storageLink;
    }
    if ((Memory.rooms[roomName].storageLink != null ) && (Memory.rooms[roomName].controllerLink != null) ){
            Memory.rooms[roomName].LinkUp = true ;
        } else {
            Memory.rooms[roomName].LinkUp = false ;
        }

    // If both links are valid, transfer energy when controllerLink has < 200 energy
    if (controller && storage && controller.store[RESOURCE_ENERGY] < 200) {
        let amount = Math.min(storage.store[RESOURCE_ENERGY], controller.store.getFreeCapacity(RESOURCE_ENERGY));
        if (amount > 0) {
            storage.transferEnergy(controller, amount);
        }
    }
},

updateRoomSources: function updateRoomSources(spawn) {
    if (!Memory.rooms[spawn.room.name]) {
        Memory.rooms[spawn.room.name] = {};
    }
    
    const roomMemory = Memory.rooms[spawn.room.name];

    if (!roomMemory.sources) {
        roomMemory.sources = {};
    }

    const sources = spawn.room.find(FIND_SOURCES);
    
    sources.forEach(source => {
        if (!roomMemory.sources[source.id]) {
            roomMemory.sources[source.id] = {};
        }

        // Check if previously stored container still exists
        if (roomMemory.sources[source.id].containerId) {
            const existingContainer = Game.getObjectById(roomMemory.sources[source.id].containerId);
            if (!existingContainer) {
                delete roomMemory.sources[source.id].containerId;
                delete roomMemory.sources[source.id].pathLength; // Remove invalid path data
            }
        }

        // Find nearest container within range 3
        const containers = source.pos.findInRange(FIND_STRUCTURES, 3, {
            filter: structure => structure.structureType === STRUCTURE_CONTAINER
        });

        if (containers.length > 0) {
            const container = containers[0];
            roomMemory.sources[source.id].containerId = container.id;

            // Calculate path length
            const path = PathFinder.search(spawn.pos, { pos: container.pos, range: 1 });
            roomMemory.sources[source.id].pathLength = path.path.length;
            roomMemory.sources[source.id].HaulerCarry2Needed = (Math.ceil((11 * ((roomMemory.sources[source.id].pathLength) * 2)) / 100));

        }
    });

},

findBaseLocation: function findBaseLocation(room) {
    if (!room) return;

    // Ensure Memory structure exists
    if (!Memory.rooms) Memory.rooms = {};
    if (!Memory.rooms[room.name]) Memory.rooms[room.name] = {};
    if (!Memory.roomToClaim) Memory.roomToClaim = [];

    // Check if the room has already been processed
    if (Memory.rooms[room.name].BaseChecked) {
        return; // Skip processing if already checked
    }

    // Find all sources in the room
    const sources = room.find(FIND_SOURCES);
    const sourceQty = sources.length;

    // If no sources exist, mark the room as incompatible and exit
    if (sourceQty < 1) {
        Memory.rooms[room.name].BaseChecked = true;
        Memory.rooms[room.name].BaseCompatible = false;
        return;
    }

    // Calculate average source position
    let avgX = 0, avgY = 0;
    sources.forEach(source => {
        avgX += source.pos.x;
        avgY += source.pos.y;
    });

    avgX /= sourceQty;
    avgY /= sourceQty;

    // Compute search start point as the midpoint between avg source position & center
    const startX = Math.round((avgX + 25) / 2);
    const startY = Math.round((avgY + 25) / 2);

    const terrain = room.getTerrain();
    const size = 13;
    let basePosition = null;

    // Flood-Fill Search Setup
    let queue = [[startX, startY]];
    let visited = new Set();

    while (queue.length > 0) {
        let [x, y] = queue.shift();
        let key = `${x},${y}`;

        // Skip if already visited
        if (visited.has(key)) continue;
        visited.add(key);

        // Ensure coordinates are within room bounds
        if (x < 0 || x >= 50 || y < 0 || y >= 50) continue;

        let isValid = true;

        // Check for 13x13 empty space, allowing plains (0) and swamp (2)
        for (let offsetX = 0; offsetX < size; offsetX++) {
            for (let offsetY = 0; offsetY < size; offsetY++) {
                const terrainType = terrain.get(x + offsetX, y + offsetY);
                if (terrainType !== 0 && terrainType !== 2) { // Allow plains & swamps
                    isValid = false;
                    break;
                }
            }
            if (!isValid) break;
        }

        if (isValid) {
            basePosition = new RoomPosition(
                Math.min(Math.max(x + Math.floor(size / 2), 0), 49),
                Math.min(Math.max(y + Math.floor(size / 2), 0), 49),
                room.name
            );
            break;
        }

        // Add neighboring positions to queue (up, down, left, right)
        queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    // Store whether the room has been checked
    Memory.rooms[room.name].BaseChecked = true;
    Memory.rooms[room.name].SourceQty = sourceQty;

    if (basePosition) {
        // Store the position in memory
        Memory.rooms[room.name].BaseCompatible = basePosition;

        // Add the room name to the list of rooms to claim
        if (!Memory.roomToClaim.includes(room.name)) {
            Memory.roomToClaim.push(room.name);
        }

        // Place a flag at the center of the base area
        room.createFlag(basePosition.x, basePosition.y, `C.${room.name}`);
    } else {
        Memory.rooms[room.name].BaseCompatible = false; // No valid location found
    }
}

    
};

module.exports = functionsCondensedMain;    