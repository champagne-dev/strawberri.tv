window.CreateChannelComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired
  },
  render: function() {
    var specialClassName = this.props.invisible ? " hidden" : "";
    return (
      <div className={"create-channel" + specialClassName}>
        <div className="create-form">
          <h5> Create Channel </h5>
          <input className="channel-name"></input>
          <a className="submit-btn"></a>
        </div>
        <div className="close fa fa-times" onClick={this.props.onClose}>
        </div>
      </div>
    );
  },

});