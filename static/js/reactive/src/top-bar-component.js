window.TopBarComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
    onMouseEnter: React.PropTypes.func.isRequired,
    onMouseLeave: React.PropTypes.func.isRequired,
    onLeftChannel: React.PropTypes.func.isRequired,
    onRightChannel: React.PropTypes.func.isRequired,
    onChannelClick: React.PropTypes.func.isRequired,
    onCreateChannel: React.PropTypes.func.isRequired,
    current_channel: React.PropTypes.object.isRequired,
  },
  render: function() {
  	var specialClassName = this.props.invisible ? " hidden" : "";
    return (
      <div className={"top-bar" + specialClassName} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} >
        <div className="full-bar">
          <div className="channels">
            <a className="create-btn child" onClick={this.props.onCreateChannel}><i className="fa fa-plus"></i></a>
            <a className="left arrow child" onClick={this.props.onLeftChannel}><i className="fa fa-chevron-left"></i></a>
            <h4 className="current child" onClick={this.props.onChannelClick}>{this.props.current_channel.channel_name}</h4>
            <a className="right arrow child" onClick={this.props.onRightChannel}><i className="fa fa-chevron-right"></i></a>
          </div>
        </div>
        <div className="timer-bar">
        </div>
      </div>
    );
  },

});