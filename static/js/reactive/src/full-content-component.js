window.FullContentComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
  },
  getInitialState: function(){
    return {"fullChannelsInvisible":true, "createChannelInvisible": true, "topBarInvisible": true, "visibleElementsPushed": false}
  },
  __topBarMouseEnter: function(){
    this.setState({"topBarInvisible": false, "visibleElementsPushed": true})
  },
  __topBarMouseLeave: function(){
    this.setState({"topBarInvisible": true, "visibleElementsPushed": false})
  },
  __onLeftChannel: function(){
    console.log("go left");
  },
  __onRightChannel: function(){
    console.log("go right");
  },
  __onChannelClick: function(){
    this.setState({"fullChannelsInvisible": false, "createChannelInvisible": true, "topBarInvisible": true, "visibleElementsPushed": false})
  },
  __onCreateChannel: function(){
    this.setState({"fullChannelsInvisible": true, "createChannelInvisible": false, "topBarInvisible": true, "visibleElementsPushed": false})
  },
  __onCreateChannelClose: function(){
    this.setState({"fullChannelsInvisible": true, "createChannelInvisible": true})
  },
  __onFullChannelsClose: function(){
    this.setState({"fullChannelsInvisible": true, "createChannelInvisible": true})
  },
  render: function() {
    var specialClassName = this.props.invisible ? " hidden" : "";
    return (
      <div className={"full-content" + specialClassName}>
        <FullChannelsComponent invisible={this.state.fullChannelsInvisible} onClose={this.__onFullChannelsClose}/>
        <CreateChannelComponent invisible={this.state.createChannelInvisible} onClose={this.__onCreateChannelClose}/>
        <TopBarComponent invisible={this.state.topBarInvisible} onMouseEnter={this.__topBarMouseEnter} onMouseLeave={this.__topBarMouseLeave} onLeftChannel={this.__onLeftChannel} onRightChannel={this.__onRightChannel} onChannelClick={this.__onChannelClick} onCreateChannel={this.__onCreateChannel}/>
        <PersonCountComponent pushed={this.state.visibleElementsPushed}/>
        <SocialComponent pushed={this.state.visibleElementsPushed}/>
        <VideoComponent />
      </div>
    );
  },

});