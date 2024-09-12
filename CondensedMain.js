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
        Game.cpu.generatePixel();
        }
    }
    
};

module.exports = functionsCondensedMain;    