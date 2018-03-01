
 
//Run JQuery
$(document).ready(function(){
  var deletedFollowers = ['brunofin', 'comster404'];
  var deletedURL = 'https://api.twitch.tv/kraken/streams/' + deletedFollowers[i];
  var twitchTV = {
    clientID : 'h2by0ig31bpvl0t5b5bu2kxwinetb1',
    baseURL  : 'https://api.twitch.tv/kraken/streams/freecodecamp',
    followerURL : 'https://api.twitch.tv/kraken/users/freecodecamp/follows/channels',
    deletedURL : 'https://api.twitch.tv/kraken/streams/'
  }
  // FreeCodeCamp stream info and status API call
  $.ajax({
    type: "GET",
    url: twitchTV.baseURL,
    headers: {
     'Client-ID' : twitchTV.clientID
    },
    success : function(response){
    if(response.stream === null){
     $('#fccStatus').html("FreeCode Camp is currently <span id='offline'>Offline</span>!");
     $('#offline').addClass("flashText");
    }else{
      $('#fccStatus').html("FreeCode Camp is currently Online!");   
    }
   }
  });

  $.ajax({
    type: "GET",
    url: twitchTV.followerURL,
    headers: {
     'Client-ID' : twitchTV.clientID
  },
 success : function(response){
  for(var i=0; i < response.follows.length; i++){
    var displayName = response.follows[i].channel.display_name;
    var logo = response.follows[i].channel.logo;
    var status = response.follows[i].channel.status === null?'':response.follows[i].channel.status;
    if(logo===null){
      logo = "../images/noImage.png";
    }
    var member = '<div class="memberContainer">' + '<img src="'+ logo  + '"><h3>'+displayName +'</h3><h4>'+ status +'</h4></div>';
    $('#memberSection').append(member);
    }
 },
 error: function(response){
   console.log("error" + response);
   console.log(response);
   }
  });

  for(var i=0; i < deletedFollowers.length; i++){
    $.ajax({
      type: "GET",
      url: twitchTV.deletedURL + deletedFollowers[i],
      headers: {
     'Client-ID' : twitchTV.clientID
      },
      error : function(response){
        logo="../images/error.png";
        displayName= response.statusText;
        status = response.status===null?'':response.status;
        var member = '<div class="memberContainer">' + '<img src="'+ logo  + '"><h3>'+displayName +'</h3><h4>'+ status +'</h4></div>';
        $('#memberSection').append(member);
     }
  });
}

});