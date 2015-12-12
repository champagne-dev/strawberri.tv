window.TopBarComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
    onMouseEnter: React.PropTypes.func.isRequired,
    onMouseLeave: React.PropTypes.func.isRequired,
    onLeftChannel: React.PropTypes.func.isRequired,
    onRightChannel: React.PropTypes.func.isRequired,
    onChannelClick: React.PropTypes.func.isRequired,
    onCreateChannel: React.PropTypes.func.isRequired,
  },
  render: function() {
  	var specialClassName = this.props.invisible ? " hidden" : "";
    return (
      <div className={"top-bar" + specialClassName} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} >
        <div className="full-bar">
          <div className="channels">
            <a className="left arrow child" onClick={this.props.onLeftChannel}>Left</a>
            <h4 className="current child" onClick={this.props.onChannelClick}>Current Channel</h4>
            <a className="right arrow child" onClick={this.props.onRightChannel}>Right</a>
            <a className="create-btn child" onClick={this.props.onCreateChannel}>+</a>
          </div>
        </div>
        <div className="timer-bar">
        </div>
      </div>
    );
  },

});