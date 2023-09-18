//jshint esversion:6

module.exports.date = function(){
    const options = { weekday: 'long', day: 'numeric', month: 'long'};
    const today  = new Date();
        
    return today.toLocaleDateString("en-US", options); 

    

}

module.exports.day = function(){
    const options = { weekday: 'long'};
    const today  = new Date();
        
    return today.toLocaleDateString("en-US", options); 

    

}