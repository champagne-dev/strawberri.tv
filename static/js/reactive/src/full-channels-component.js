window.FullChannelsComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
  },
  render: function() {
    var specialClassName = this.props.invisible ? " hidden" : "";
    return (
      <div className={"full-channels"+specialClassName}>
        <div className="close fa fa-times" onClick={this.props.onClose}>
        </div>
      </div>
    );
  },

});