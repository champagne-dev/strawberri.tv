var MainComponent = React.createClass({
  propTypes:{
    channels: React.PropTypes.object.isRequired,
    current_channel: React.PropTypes.object.isRequired,
    current_url_index: React.PropTypes.number.isRequired,
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
    	<FullContentComponent invisible={this.state.fullContentInvisible} channels={this.props.channels} current_channel={this.props.current_channel} current_url_index={this.props.current_url_index}/>
      </div>
    );
  },

});
window.mainView = ReactDOM.render(<MainComponent channels={STRAWBERRI.data.channels} current_channel={STRAWBERRI.data.current_channel} current_url_index={STRAWBERRI.data.current_url_index}/>, document.getElementById("main"));