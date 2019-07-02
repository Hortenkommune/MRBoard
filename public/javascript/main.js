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


    var meetings = false;

    $('.meetings tbody tr').each(function(i){
        $(this).find('td').each(function(j){
            var html = $(this).html();
            
            //Check date
            if (j==2){
                if (html.slice(0, 10) !== formatDate( new Date() )){
                    $(this).parent().hide();
                } else  {
                    meetings = true;
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
                    },
                    {
                        regex: /mamrelund/ig,
                        roomname: "Mamrelund"
                    },
                    {
                        regex: /bøk/ig,
                        roomname: "Bøk"
                    },
                    {
                        regex: /eik/ig,
                        roomname: "Eik"
                    },
                    {
                        regex: /hassel/ig,
                        roomname: "Hassel"
                    },
                    {
                        regex: /misteltein/ig,
                        roomname: "Misteltein"
                    },
                    {
                        regex: /stromodden/ig,
                        roomname: "Stormodden"
                    },
                    {
                        regex: /bastøy/ig,
                        roomname: "Bastøy"
                    },
                    {
                        regex: /løvøya/ig,
                        roomname: "Løvøya"
                    },
                    {
                        regex: /rødskjær/ig,
                        roomname: "Rødskjær"
                    },
                    {
                        regex: /vealøs/ig,
                        roomname: "Vealøs"
                    },
                    {
                        regex: /østenskjær/ig,
                        roomname: "Østenskjær"
                    },
                    {
                        regex: /møterom ra/ig,
                        roomname: "Ra"
                    },
                    {
                        regex: /adalsborgen/ig,
                        roomname: "Adalsborgen"
                    },
                    {
                        regex: /ynglingesalen/ig,
                        roomname: "Ynglingesalen"
                    },{
                        regex: /møteromsoversikten/ig,
                        roomname: ""
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
    
    // Show message; No meetings today. 
    if (!meetings) {
        $('.meetings .empty').fadeIn();
    }

    // Show meetings
    $('.meetings').fadeIn();

    //Refresh 30 minutes
    var minutes = 30;    
    var millisec = minutes * 60 * 1000;
    setTimeout(function(){
        location.reload();
    }, millisec)
})();