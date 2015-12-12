window.SocialComponent = React.createClass({
  componentDidMount: function() {
    var canonical_url = "http://localhost:5000"; //should be commented out
    window.socket = io(canonical_url);

    window.socket.emit("joinChannel", {channel_name: "channel name"});
    //window.socket.emit("leaveChannel", {channel_name: "channel name"})
    
    window.socket.on('userJoined', function(new_user_count){

    });
    window.socket.on('userLeft', function(new_user_count){

    });
    
  },
  propTypes: {
    pushed: React.PropTypes.bool.isRequired,
  },
  render: function() {
  	var specialClassName = this.props.pushed ? " pushed" : "";
    return (
      <div className={"social" + specialClassName} >
      </div>
    );
  },

});