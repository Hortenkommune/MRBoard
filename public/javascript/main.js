(function(){
    var formatTime = function(now){
        now = now || today;
        var h = now.getHours();
        var m = now.getMinutes(); 
        if(h<10) {
            h='0'+h;
        } 
        if(m<10) {
            m='0'+m;
        } 
        return h + ':' + m;
    };

    $('.header .date').html( formatTime( new Date() ) );
    setInterval(function(){
        $('.header .date').html( formatTime( new Date() ) );
    }, 15000);
    
    // Show message; No meetings today. 
    $('.meetings .empty').fadeIn();

    // Show meetings
    $('.meetings').fadeIn();

    //Refresh 15 minutes
    var minutes = 15;    
    var millisec = minutes * 60 * 1000;
    setTimeout(function(){
        location.reload();
    }, millisec)
})();