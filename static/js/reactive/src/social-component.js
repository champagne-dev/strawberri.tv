window.SocialComponent = React.createClass({
  componentDidMount: function() {

    // var canonical_url = "http://localhost:5000"; //should be commented out
    // window.socket = io(canonical_url);

    // window.socket.emit("joinChannel", {channel_name: "channel name"});
    // //window.socket.emit("leaveChannel", {channel_name: "channel name"})
    
    // window.socket.on('userJoined', function(new_user_count){

    // });
    // window.socket.on('userLeft', function(new_user_count){

    // });
    
  },
  getInitialState: function(){
    return {"formEnabled": false};
  },
  toggleForm: function() {
    if (this.state.formEnabled) {
      this.setState({"formEnabled": false});
    } else {
      this.setState({"formEnabled": true});  
    }
    
  },
  propTypes: {
    pushed: React.PropTypes.bool.isRequired,
  },
  render: function() {
  	var specialClassName = this.props.pushed ? " pushed" : "";
    var specialFormClassName = this.state.formEnabled ? "enabled" : "";

    return (
      <div className="socialform">
        <div className={"social" + specialClassName} onClick={this.toggleForm}>
          <i className="fa fa-pencil-square-o"></i>
        </div>
        <div className={"messageForm "+ specialFormClassName}>
          <input type="text" placeholder="name" className="author"/>
          <textarea className="message" placeholder="message"></textarea>
          <input type="button" value="Send" className="sendBtn"/>
        </div>
      </div>
    );
  },

});