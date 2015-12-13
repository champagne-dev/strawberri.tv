var MainComponent = React.createClass({
  propTypes:{
    channels: React.PropTypes.object.isRequired,
  },
  getInitialState: function(){
  	return {"splashPageInvisible": false, "fullContentInvisible": true}
  },
  componentDidMount: function(){
    var self = this;
    setTimeout(function(){
      self.setState({"splashPageInvisible": true, "fullContentInvisible": false})
    }, 500);
  },
  render: function() {
    return (
      <div className="wrapper">
    	<SplashPageComponent invisible={this.state.splashPageInvisible} />
    	<FullContentComponent invisible={this.state.fullContentInvisible} channels={this.props.channels} current_channel={this.props.current_channel}/>
      </div>
    );
  },

});
window.mainView = ReactDOM.render(<MainComponent channels={STRAWBERRI.data.channels} current_channel={STRAWBERRI.data.current_channel}/>, document.getElementById("main"));