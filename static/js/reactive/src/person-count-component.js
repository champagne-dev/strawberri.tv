window.PersonCountComponent = React.createClass({
  propTypes: {
    pushed: React.PropTypes.bool.isRequired,
  },
  getInitialState: function(){
    return {"count": 1}
  },
  componentDidMount: function(){
    var self = this;
    STRAWBERRI.ws.peoplecounter.onUpdatePersonCount(function(data){
      self.setState({"count":data.count})
    });
  },
  render: function() {
  	var specialClassName = this.props.pushed ? " pushed" : "";
    return (
      <div className={"person-count" + specialClassName} >
        <label className="count-number">{this.state.count}</label>
      </div>
    );
  },

});