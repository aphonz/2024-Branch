var RoomInitalise = {
    
    
    
    //Main
    Main: function Main(Game){
        let SetupState = Memory.Initalised;
        if (SetupState == undefined){
            Memory.Initalised = "1";
            SetupState = "1";
        }
        
        console.log('Inital Code at State : ' + SetupState)
        if (SetupState == "1"){
            MemoryStructure(Game);
        }
        if (SetupState == "2"){
            MemoryStructureRooms(Game);
        }
        
        
        
        
        //Memory.Initalised = "1"
    }
};    
    
    
    // Memory Structure BASE
   function MemoryStructure(Game){
       //if (Memory.rooms == undefined){
           Memory.rooms = {} ;
           
       //}
        Memory.Initalised = "2";
        SetupState = "2";
        console.log('Memory Set');
    }
    
    // Memory Structure Rooms
   function MemoryStructureRooms(Game){
        for (var name in Game.rooms){
            if (Memory.rooms.name == undefined) {
                Memory.rooms.name = {} ;
            }
        }
        Memory.Initalised = "10";
        console.log('Rooms Set');
    };
    /*
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
        Game.cpu.generatePixel();
        }
    }
    */


module.exports = RoomInitalise;    