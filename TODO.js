Units have Colours?

Fix wall reapirer Duplicate REF to container creep.memory.storageContainer / creep.memory.StorageId 


DONE
Harvesters not emptying fully - done
--------------------------------------
//var MainRoom
//if game.rooms.length

for(var RoomName in Memory.rooms) {
    //Memory.rooms[RoomName].roles = roles;
    /*for (let i = 0 ; Memory.rooms[RoomName].roles.length > i ; i++) {
            console.log('fuck')
             Memory.rooms[RoomName].roles[i] = {name : roles[i]};
    }*/
}



---------------------------------------

Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );



var initialization = {
 
IN_room: function(roomN)
{
    initial_Room(roomN);
},
 
}; 
 
 
function initial_Room(roomN) 
{
   Game.rooms[roomN].memory.Minable = true;
   Game.rooms[roomN].memory.Safe = true;
   Game.rooms[roomN].memory.Sources = 0;
   Game.rooms[roomN].memory.Type = 'Controlled';
   Game.rooms[roomN].memory.Spawn = {};
   Game.rooms[roomN].memory.Spawn.Spawn_Queue = [];
   Game.rooms[roomN].memory.Spawn.Mode = 'Low_Eco';
   sources(roomN);
   
}
 
function sources(Room_Name)
{
    let RawSources = Game.rooms[Room_Name].find(FIND_SOURCES);
    Game.rooms[Room_Name].memory.Sources = [];
    for(let R=0;RawSources.length>R;R++)
    {
        
        let pos = RawSources[R].pos;
        let id = RawSources[R].id;
 
        let obj = {pos,id};
      
        console.log(R);
        Game.rooms[Room_Name].memory.Sources.push(obj);
 
    }
 
 
    for(var i=0;Memory.rooms[Room_Name].Sources.length>i;i++)
    {
       
        var Sx = Memory.rooms[Room_Name].Sources[i].pos.x;
        var Sy = Memory.rooms[Room_Name].Sources[i].pos.y;
        
        
        Game.rooms[Room_Name].memory.Sources[i].MineablePositions = [];
        
        var terra = new Room.Terrain(Room_Name);
        var count = 0;
        if(terra.get(Sx,Sy-1)   == 0 || terra.get(Sx,Sy-1)   == 2){count++; MineablePositions(i,0,-1);};
        if(terra.get(Sx+1,Sy-1) == 0 || terra.get(Sx+1,Sy-1) == 2){count++; MineablePositions(i,1,-1);};
        if(terra.get(Sx+1,Sy)   == 0 || terra.get(Sx+1,Sy)   == 2){count++; MineablePositions(i,1, 0);};
        if(terra.get(Sx+1,Sy+1) == 0 || terra.get(Sx+1,Sy+1) == 2){count++; MineablePositions(i,1, 1);};
        if(terra.get(Sx,Sy+1)   == 0 || terra.get(Sx,Sy+1)   == 2){count++; MineablePositions(i,0, 1);};
        if(terra.get(Sx-1,Sy+1) == 0 || terra.get(Sx-1,Sy+1) == 2){count++; MineablePositions(i,-1,1);};
        if(terra.get(Sx-1,Sy)   == 0 || terra.get(Sx-1,Sy)   == 2){count++; MineablePositions(i,-1,0);};
        if(terra.get(Sx-1,Sy-1) == 0 || terra.get(Sx-1,Sy-1) == 2){count++; MineablePositions(i,-1,-1);};
        
        Memory.rooms[Room_Name].Sources[i].Minable_Spots = count;
        if(Memory.rooms[Room_Name].Sources[i].Asigned_Work_Parts == undefined){
        Memory.rooms[Room_Name].Sources[i].Asigned_Work_Parts = 0;
        Memory.rooms[Room_Name].Sources[i].Replacement_on_Route = false;
        Memory.rooms[Room_Name].Sources[i].Workers = [];
        }
    }
    function MineablePositions(i,_x,_y)
    {
        if(Game.rooms[Room_Name].memory.Sources[i].MineablePositions == '')
        {
        Game.rooms[Room_Name].memory.Sources[i].MineablePositions[0] = {};
        Game.rooms[Room_Name].memory.Sources[i].MineablePositions[0].Pos = {};
        Memory.rooms[Room_Name].Sources[i].MineablePositions[0].Pos.Y = Memory.rooms[Room_Name].Sources[i].pos.y;
        Memory.rooms[Room_Name].Sources[i].MineablePositions[0].Pos.X = Memory.rooms[Room_Name].Sources[i].pos.x;
        Memory.rooms[Room_Name].Sources[i].MineablePositions[0].Pos.Y += _y; 
        Memory.rooms[Room_Name].Sources[i].MineablePositions[0].Pos.X += _x;
        }
        else
        {
            var K = Game.rooms[Room_Name].memory.Sources[i].MineablePositions.length;
            
            Game.rooms[Room_Name].memory.Sources[i].MineablePositions[K] = {};
            Game.rooms[Room_Name].memory.Sources[i].MineablePositions[K].Pos = {};
            Memory.rooms[Room_Name].Sources[i].MineablePositions[K].Pos.Y = Memory.rooms[Room_Name].Sources[i].pos.y;
            Memory.rooms[Room_Name].Sources[i].MineablePositions[K].Pos.X = Memory.rooms[Room_Name].Sources[i].pos.x;
            Memory.rooms[Room_Name].Sources[i].MineablePositions[K].Pos.Y += _y; 
            Memory.rooms[Room_Name].Sources[i].MineablePositions[K].Pos.X += _x;
        }
    }
}
    
 
module.exports = initialization;



____________________________________________________________________________________



var Init = require('initialization');
var Start = {
 
    Start: function() 
       {
        var count = 0;
        for(var name in Game.spawns){count++;if(count >1){break;}}
 
        if(count ==1)
        {   count = 0; 
            for(var name in Game.rooms){count++;if(count >1){break;}}
            if (count == 1)
            for(var name in Game.rooms)
                {
                if(typeof Memory.rooms == 'undefined' || typeof Memory.rooms[name] == 'undefined')
                {
                    console.log('Code Hard Restart');
                    Clear_Room_Code();
                    INRoom();
                    
                }
            }
        } 
    }
};
function INRoom()
{
    for(var name in Game.rooms)
    {
        console.log('initialising ' + name);
        Init.IN_room(name);
        
    }
}
function INSpawn()
{
    for(var name in Game.spawns)
    {
        console.log('initialising ' + name);
        Init.IN_spawn(name);
    } 
}
 
function Clear_Room_Code()
{
    for(var name in Memory.rooms){
        if(!Game.rooms[name])
        {
            console.log('delete ' + name);
            delete Memory.rooms[name];
        }
        
    }
}
module.exports = Start;