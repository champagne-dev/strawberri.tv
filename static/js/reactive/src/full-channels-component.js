var IndividualChannelComponent = React.createClass({
  propTypes: {
    hashtag: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    invisible: React.PropTypes.bool.isRequired,
  },
  getInitialState: function(){
    return {"backgroundColor":"rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")"}
  },
  render: function() {
    var specialClassName = this.props.invisible ? " hidden" : "";
    var style = {};
    style["backgroundColor"] = this.state.backgroundColor;
    return (
      <div className={"individual-channel"+specialClassName} style={style}>
        {this.props.name}
      </div>
    );
  },

});
window.FullChannelsComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
    channels: React.PropTypes.object.isRequired,
    current_channel: React.PropTypes.object.isRequired,
  },
  getInitialState: function(){
    return {"search_value": ""};
  },
  __handleInputChange: function(event){
    this.setState({search_value: event.target.value});
  },
  render: function() {
    var specialClassName = this.props.invisible ? " hidden" : "";
    var _channels = [];
    for(var id in this.props.channels){
      var _channel = this.props.channels[id];
      var invisible = true;
      if(this.state.search_value == "" || _channel.channel_name.indexOf(this.state.search_value) > -1)
        invisible = false;
      _channels.push(<IndividualChannelComponent key={parseInt(id)} invisible={invisible} index={parseInt(id)} hashtag={_channel.hashtag} name={_channel.channel_name}/>)
    }
    return (
      <div className={"full-channels"+specialClassName}>
        <div className="close fa fa-times" onClick={this.props.onClose}>
        </div>
        <div className="channels-content">
          <h4 className="current-channel">{this.props.current_channel.channel_name}</h4>
          <h4 className="other-channels"> Other Channels </h4>
          <div className="search-form">
            <input className="search-box" value={this.state.search_value} onChange={this.__handleInputChange} ></input>
            <a className="submit-btn fa fa-search"></a>
          </div>
          <div className="all-channels">
            {_channels}
          </div>
        </div>
      </div>
    );
  },

});