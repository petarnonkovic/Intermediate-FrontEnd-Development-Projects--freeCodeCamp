function getStreamersData() {

  // usernames to queryAPI
  const channelNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  var createUrl = function (channel) {
    let url = "https://wind-bow.gomix.me/twitch-api/streams/";
    url = `${url}${channel}?callback=?`;
    return url;
  };

  _.each(channelNames, function (channel) {

    var apiUrl = createUrl(channel);
    var streamList = $('.streams');

    $.getJSON(apiUrl, function (data) {

      var channelName = channel;
      var html = '';

      if (data.stream != null) {
        var logoUrl = data.stream.channel.logo;
        var channelLink = data.stream.channel.url;
        var statusGameName = data.stream.game;
        var statusDesc = data.stream.channel.status;
        html = '<li class="online">';
        //console.log(data.stream);
      } else {
        var logoUrl = "http://via.placeholder.com/140x100";
        var channelLink = `https://www.twitch.tv/${channelName}`;
        var statusGameName = "Channel is Offline";
        var statusDesc = "Currently not broadcasting..";
        html = '<li class="offline">';
        //console.log("Channel is Offline!");
      }
      
      html += '<span class="logo"><img id="logo" src="'+ logoUrl +'" alt="Channel logo"></span>';
      html += '<span class="channel-link"><a id="channel" target="_blank" href="'+ channelLink +'">'+ channelName +'</a></span>';
      html += '<span class="status"><h3 class="status-name">'+ statusGameName +'</h3>';
      html += '<p class="status-desc">'+ statusDesc +'.</p></span></li>';
      
      streamList.append(html);
    
    });


  });

}

function initNavigation() {
  var navLinks       = $('.filterLink');
      
  navLinks.each(function(index, link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navLinks.removeClass('active');
      $(this).addClass('active');
      
      var view = $(this).attr('id');
      
      if (view === "all") {
        $(".online, .offline").removeClass("hide");
      } else if (view === "on") {
        $(".online").removeClass("hide");
        $(".offline").addClass("hide");
      } else {
        $(".offline").removeClass("hide");
        $(".online").addClass("hide");
      }
      
    });
  });
}


$(function() {

  // get data from Twitch.Tv API
  // and append to stream list
  getStreamersData();
  
  // init navigation events
  // and filter streams
  initNavigation();
  
});
