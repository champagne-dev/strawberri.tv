window.CreateChannelComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return {"channel_name": ""};
  },
  __handleInputChange: function(event){
    this.setState({channel_name: event.target.value});
  },
  __onSubmit: function(){
    STRAWBERRI.ajax.createChannel(this.state.channel_name, function(data){
      location.reload();
    })
  },
  render: function() {
    var specialClassName = this.props.invisible ? " hidden" : "";
    return (
      <div className={"create-channel" + specialClassName}>
        <div className="create-form">
          <h5 className="header">Create Channel</h5>
          <input className="channel-name" value={this.state.channel_name} onChange={this.__handleInputChange} ></input>
          <a className="submit-btn" onClick={this.__onSubmit}>SUBMIT</a>
        </div>
        <div className="close fa fa-times" onClick={this.props.onClose}>
        </div>
      </div>
    );
  },

});