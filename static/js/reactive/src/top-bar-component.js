window.TopBarComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
    onMouseEnter: React.PropTypes.func.isRequired,
    onMouseLeave: React.PropTypes.func.isRequired,
    onLeftChannel: React.PropTypes.func.isRequired,
    onRightChannel: React.PropTypes.func.isRequired,
    onChannelClick: React.PropTypes.func.isRequired,
    onCreateChannel: React.PropTypes.func.isRequired,
    current_channel: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {"timerpercent": 0, "fakeStart": 0, "end": 0}
  },
  _tickTock: function(){
    var self = this;
    setTimeout(function(){
      var currenttime = Date.now();
      var timefromstart = currenttime - self.state.fakeStart; // how far are we from the start
      var percent = (timefromstart/(self.state.end-self.state.fakeStart)) * 100; // how big is that compared to total channel time
      self.setState({"timerpercent": percent});
      if(percent >= 100)
        self.setState({"fakeStart":currenttime, "end": currenttime+(1000*60*5)});
      self._tickTock();
    }, 1000)
  },
  componentDidMount: function(){
    var fakeStart = this.props.current_channel.video_start; // Replace with start timestamp from current_channel object
    this.setState({"fakeStart":fakeStart, "end": fakeStart+(1000*60*5)}) // 5 minutes = (millis * seconds * minutes)
    this._tickTock();
  },
  render: function() {
    var style = STRAWBERRI.data.mainStyle;
  	var specialClassName = this.props.invisible ? " hidden" : "";
    var timerBarFilledStyle = { width: this.state.timerpercent+"%"};
    return (
      <div className={"top-bar" + specialClassName}  onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} >
        <div className="full-bar" style={style}>
          <div className="channels">
            <a className="create-btn child" onClick={this.props.onCreateChannel}><i className="fa fa-plus"></i></a>
            <a className="left arrow child" onClick={this.props.onLeftChannel}><i className="fa fa-chevron-left"></i></a>
            <h4 className="current child" onClick={this.props.onChannelClick}>{this.props.current_channel.channel_name}</h4>
            <a className="right arrow child" onClick={this.props.onRightChannel}><i className="fa fa-chevron-right"></i></a>
          </div>
        </div>
        <div className="timer-bar">
          <div className="filled timerbar-length" style={timerBarFilledStyle}></div>
          <div className="unfilled timerbar-length"></div>
        </div>
      </div>
    );
  },

});