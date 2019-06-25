(function(){
    var formatDate = function(now){
        now = now || today;
        var dd = now.getDate();
        var mm = now.getMonth()+1; 
        var yyyy = now.getFullYear();
        if(dd<10) {
            dd='0'+dd;
        } 
        if(mm<10) {
            mm='0'+mm;
        } 
        return dd + '/' + mm + '/' + yyyy;
        //return "27/06/2019";
    };
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
    }, 60000);



    $('.meetings tbody tr').each(function(i){
        $(this).find('td').each(function(j){
            var html = $(this).html();
            
            //Check date
            if (j==2){
                if (html.slice(0, 10) !== formatDate( new Date() )){
                    $(this).parent().hide();
                }
            }
            
            //Get time
            if (j==2 || j==3){
                $(this).html( html.slice(html.length-5, html.length) );
            }

            //Replace rooms
            if (j==4){
                var rooms = [
                    {
                        regex: /blåveis/ig,
                        roomname: "Blåveis"
                    },
                    {
                        regex: /hvitveis/ig,
                        roomname: "Hvitveis"
                    },
                    {
                        regex: /soldugg/ig,
                        roomname: "Soldugg"
                    }

                ];
                var roomstr;
                rooms.forEach(function(room){
                    if (html.match(room.regex)){
                        if (roomstr) roomstr += ", ";
                        else roomstr = "";
                        roomstr += room.roomname;
                    }
                });
                $(this).html( roomstr ||  $(this).html() );
            }
        });
    });
    
    

    // Show meetings
    $('.meetings').fadeIn();

    //Refresh 30 minutes
    var minutes = 30;    
    var millisec = minutes * 60 * 1000;
    setTimeout(function(){
       // location.reload();
    }, millisec)
})();