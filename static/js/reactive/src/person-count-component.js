window.PersonCountComponent = React.createClass({
  propTypes: {
    pushed: React.PropTypes.bool.isRequired,
  },
  getInitialState: function(){
    return {"count": 1}
  },
  componentDidMount: function(){
    var self = this;
    window.socket.on('userJoined', function(data){
      self.setState({"count":data.count})
    });
    window.socket.on('userLeft', function(data){
      self.setState({"count":data.count})
    });
  },
  render: function() {
  	var specialClassName = this.props.pushed ? " pushed" : "";
    return (
      <div className={"person-count" + specialClassName} >
        {this.state.count}
      </div>
    );
  },

});