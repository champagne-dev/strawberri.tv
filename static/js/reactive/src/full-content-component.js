window.FullContentComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
    channels: React.PropTypes.object.isRequired,
    current_channel: React.PropTypes.object.isRequired,
    current_url_index: React.PropTypes.number.isRequired,
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
    if(this.props.current_channel.index != 0)
      window.location.href = "/?c=" + this.props.channels[this.props.current_channel.index-1]["hashtag"] + "&switch=true";
    else {
      window.location.href = "/?c=" + this.props.channels[Object.size(this.props.channels)-1]["hashtag"] + "&switch=true";      
    }
  },
  __onRightChannel: function(){
    if(this.props.current_channel.index >= Object.size(this.props.channels)-1)
      window.location.href = "/?c=" + this.props.channels[0]["hashtag"] + "&switch=true";  
    else {
      window.location.href = "/?c=" + this.props.channels[this.props.current_channel.index+1]["hashtag"] + "&switch=true";          
    }
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
        <FullChannelsComponent invisible={this.state.fullChannelsInvisible} channels={this.props.channels} current_channel={this.props.current_channel} onClose={this.__onFullChannelsClose}/>
        <CreateChannelComponent invisible={this.state.createChannelInvisible} onClose={this.__onCreateChannelClose}/>
        <TopBarComponent invisible={this.state.topBarInvisible} onMouseEnter={this.__topBarMouseEnter} onMouseLeave={this.__topBarMouseLeave} onLeftChannel={this.__onLeftChannel} onRightChannel={this.__onRightChannel} onChannelClick={this.__onChannelClick} onCreateChannel={this.__onCreateChannel} current_channel={this.props.current_channel}/>
        <PersonCountComponent pushed={this.state.visibleElementsPushed}/>
        <SocialComponent pushed={this.state.visibleElementsPushed}/>
        <VideoComponent  current_channel={this.props.current_channel} current_url_index={this.props.current_url_index}/>
      </div>
    );
  },

});