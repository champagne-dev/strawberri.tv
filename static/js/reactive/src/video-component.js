window.VideoComponent = React.createClass({
  propTypes: {
    current_channel: React.PropTypes.object.isRequired,
    current_url_index: React.PropTypes.number.isRequired,
  },
  getInitialState: function(){
    return {"playerInstance":null, "current_url_index" : this.props.current_url_index}
  },
  _tickTock: function(){
    var self = this;
    setTimeout(function(){
      var currenttime = Date.now();
      var timefromstart = currenttime - self.state.fakeStart; // how far are we from the start
      var percent = (timefromstart/(self.state.end-self.state.fakeStart)) * 100; // how big is that compared to total channel time
      if(percent >= 100){
        //time for channel switch
        if((self.state.current_url_index+1) == self.props.current_channel.urls.length && (self.props.current_url_index+1) != self.props.current_channel.urls.length)
          window.location.reload();
        else{
          self.setState({"fakeStart":currenttime, "end": currenttime+(1000*60*5), "current_url_index":self.state.current_url_index+1})
          STRAWBERRI.playerInstance.load([{
            file: self.props.current_channel.urls[self.props.current_url_index].replace("embed/","watch?v=")
          }]);
        }
      }
      self._tickTock();
    }, 1000)
  },
  componentDidMount: function(){
  	STRAWBERRI.playerInstance = jwplayer('jwplayer-container');
  	STRAWBERRI.playerInstance.setup({
  		file: this.props.current_channel.urls[this.props.current_url_index].replace("embed/","watch?v="),
  		height: "100%",
  		width: "100%",
      autostart: true,
  	});
    var fakeStart = this.props.current_channel.video_start; // Replace with start timestamp from current_channel object
    this.setState({"fakeStart":fakeStart, "end": fakeStart+(1000*60*5)}) // 5 minutes = (millis * seconds * minutes)
    this._tickTock();
  },
  render: function() {
    return (
      <div className="video-wrap-jw" id="jwplayer-container">
      </div>
    );
  },

});