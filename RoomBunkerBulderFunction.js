/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('RoomBulder');
 * mod.thing == 'a thing'; // true
 
 2. Template for All Building Types
Now, let’s define all building types available in Screeps and map them to the matrix. These include:
- Spawn ("S")
- Extensions ("E")
- Roads ("R")
- Containers ("C")
- Towers ("T")
- Storage ("St")
- Links ("L")
- Walls ("W")
- Ramparts ("Ra")
- Observer ("O")
- Power Spawn ("P")
- Extractor ("Ex")
- Labs ("Lb")
- Terminal ("Tm")
- Factory ("F")
- Nuker ("N")

const template = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
console.log(template);



 */

module.exports = {



buildBunker: function buildBunker(roomNamme) {
    //console.log("here we are");
    room = Game.rooms[roomNamme];
    if (!room || !room.controller || !room.controller.my) return;
    
    const maxStructuresPerLevel = {
    [STRUCTURE_EXTENSION]: [0, 0, 5, 10, 20, 30, 40, 50, 60],
    [STRUCTURE_TOWER]: [0, 0, 0, 1, 2, 2, 3, 6, 6],
    [STRUCTURE_STORAGE]: [0, 0, 0, 0, 1, 1, 1, 1, 1],
    [STRUCTURE_LINK]: [0, 0, 0, 0, 2, 3, 4, 5, 6],
    [STRUCTURE_LAB]: [0, 0, 0, 0, 0, 3, 6, 10, 10],
    [STRUCTURE_NUKER]: [0, 0, 0, 0, 0, 0, 0, 0, 1],
    [STRUCTURE_TERMINAL]: [0, 0, 0, 0, 0, 1, 1, 1, 1],
    [STRUCTURE_POWER_SPAWN]: [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [STRUCTURE_FACTORY]: [0, 0, 0, 0, 0, 0, 0, 1, 1],
    [STRUCTURE_OBSERVER]: [0, 0, 0, 0, 0, 0, 0, 1, 1]
};

    const roomMemory = Memory.rooms[room.name] || (Memory.rooms[room.name] = {});
    
    // Run only every 400 ticks
    if (Game.time % 200 !== 0) return;

    const centerFlag = room.find(FIND_FLAGS, { filter: flag => flag.name === `C.${room.name}` })[0];
    if (!centerFlag) return;

    const maxSites = 10;
    let currentSites = room.find(FIND_CONSTRUCTION_SITES).length;
    if (currentSites >= maxSites) return;

    const controllerLevel = room.controller.level;

    if (!roomMemory.Bunker) roomMemory.Bunker = { planned: [], lastRun: Game.time };

    const existingCounts = {};
    room.find(FIND_STRUCTURES).forEach(struct => {
        existingCounts[struct.structureType] = (existingCounts[struct.structureType] || 0) + 1;
    });

    // Convert planned sites into a Set for **fast checking**
    const plannedSet = new Set(roomMemory.Bunker.planned.map(({ x, y, type }) => `${x},${y},${type}`));




    
   const bunkerTemplate = [
  ["0", "R", "R", "R", "C", "R", "R", "R", "C", "R", "R", "R", "0"],
  ["R", "C", "C", "C", "R", "C", "C", "C", "R", "C", "C", "C", "R"],
  ["R", "C", "C", "R", "C", "R", "C", "R", "C", "R", "C", "C", "R"],
  ["R", "C", "R", "C", "C", "C", "R", "C", "C", "C", "R", "C", "R"],
  ["C", "R", "C", "C", "C", "R", "S", "R", "C", "C", "C", "R", "C"],
  ["R", "C", "R", "C", "R", "T", "R", "T", "R", "C", "R", "C", "R"],
  ["R", "C", "C", "R", "S", "T", "R", "T", "P", "R", "C", "C", "R"],
  ["R", "C", "R", "C", "R", "T", "R", "T", "R", "N", "R", "C", "R"],
  ["C", "R", "C", "C", "C", "R", "S", "R", "Tm", "Lb", "Lb", "R", "C"],
  ["R", "C", "R", "C", "L", "R", "R", "R", "Lb", "Lb", "R", "Lb", "R"],
  ["R", "C", "C", "R", "C", "R", "St", "R", "Lb", "R", "Lb", "Lb", "R"],
  ["R", "C", "C", "C", "R", "0", "R", "0", "R", "Lb", "Lb", "0", "R"],
  ["0", "R", "R", "R", "C", "R", "R", "R", "C", "R", "R", "R", "O"]
];

    const structureMapping = {
        "S": { type: STRUCTURE_SPAWN, minRCL: 1 },
        "C": { type: STRUCTURE_EXTENSION, minRCL: 2 },
        "R": { type: STRUCTURE_ROAD, minRCL: 1, lowPriority: true },
        "CT": { type: STRUCTURE_CONTAINER, minRCL: 1 },
        "T": { type: STRUCTURE_TOWER, minRCL: 3 },
        "St": { type: STRUCTURE_STORAGE, minRCL: 4 },
        "L": { type: STRUCTURE_LINK, minRCL: 5 },
        "W": { type: STRUCTURE_WALL, minRCL: 2 },
        "Ra": { type: STRUCTURE_RAMPART, minRCL: 2 },
        "O": { type: STRUCTURE_OBSERVER, minRCL: 8 },
        "P": { type: STRUCTURE_POWER_SPAWN, minRCL: 8 },
        "Ex": { type: STRUCTURE_EXTRACTOR, minRCL: 6 },
        "Lb": { type: STRUCTURE_LAB, minRCL: 6 },
        "Tm": { type: STRUCTURE_TERMINAL, minRCL: 6 },
        "F": { type: STRUCTURE_FACTORY, minRCL: 7 },
        "N": { type: STRUCTURE_NUKER, minRCL: 8 }
    };

   const centerX = centerFlag.pos.x;
    const centerY = centerFlag.pos.y;

    let queue = [];

    for (let y = 0; y < bunkerTemplate.length; y++) {
        for (let x = 0; x < bunkerTemplate[y].length; x++) {
            const type = bunkerTemplate[y][x];
            if (type !== "0" && structureMapping[type]) {
                const pos = new RoomPosition(centerX + x - 6, centerY + y - 6, room.name);
                if (room.lookForAt(LOOK_TERRAIN, pos).includes("wall")) continue;

                const structData = structureMapping[type];
                if (controllerLevel >= structData.minRCL) {
                    const maxAllowed = (maxStructuresPerLevel[structData.type] && maxStructuresPerLevel[structData.type][controllerLevel]) || Infinity;
                    const currentCount = existingCounts[structData.type] || 0;

                    if (currentCount < maxAllowed) {
                        queue.push({ pos, type, priority: structData.lowPriority ? 2 : 1 });
                    }
                }
            }
        }
    }

    queue.sort((a, b) => a.priority - b.priority); // Prioritize core structures first

    for (let site of queue) {
        const siteKey = `${site.pos.x},${site.pos.y},${site.type}`;

        // **Only add if not already planned**
        if (!plannedSet.has(siteKey)) {
            if (currentSites < maxSites) {
                room.createConstructionSite(site.pos, structureMapping[site.type].type);
                roomMemory.Bunker.planned.push({ x: site.pos.x, y: site.pos.y, type: site.type });
                plannedSet.add(siteKey); // Update lookup set
                currentSites++;
            } else {
                break;
            }
        }
    }

    // Re-add missing planned structures if they were destroyed
    roomMemory.Bunker.planned.forEach(({ x, y, type }) => {
        const pos = new RoomPosition(x, y, room.name);
        const hasConstructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, pos).length > 0;
        const hasBuiltStructure = room.lookForAt(LOOK_STRUCTURES, pos).some(s => s.structureType === type);

        if (!hasConstructionSite && !hasBuiltStructure && currentSites < maxSites) {
            room.createConstructionSite(pos, type);
            currentSites++;
        }
    });

    // Outer ramparts at RCL 2+
    if (controllerLevel >= 2) {
        const rampartOffsets = [-7, 7];
        for (let offset of rampartOffsets) {
            for (let i = -6; i <= 6; i++) {
                const pos1 = new RoomPosition(centerX + offset, centerY + i, room.name);
                const pos2 = new RoomPosition(centerX + i, centerY + offset, room.name);
                const rampartKey1 = `${pos1.x},${pos1.y},${STRUCTURE_RAMPART}`;
                const rampartKey2 = `${pos2.x},${pos2.y},${STRUCTURE_RAMPART}`;

                if (!plannedSet.has(rampartKey1) && currentSites < maxSites) {
                    room.createConstructionSite(pos1, STRUCTURE_RAMPART);
                    roomMemory.Bunker.planned.push({ x: pos1.x, y: pos1.y, type: STRUCTURE_RAMPART });
                    plannedSet.add(rampartKey1);
                    currentSites++;
                }

                if (!plannedSet.has(rampartKey2) && currentSites < maxSites) {
                    room.createConstructionSite(pos2, STRUCTURE_RAMPART);
                    roomMemory.Bunker.planned.push({ x: pos2.x, y: pos2.y, type: STRUCTURE_RAMPART });
                    plannedSet.add(rampartKey2);
                    currentSites++;
                }

                if (currentSites >= maxSites) return;
            }
        }
    }

    roomMemory.Bunker.lastRun = Game.time; // Store last execution tick
}




};