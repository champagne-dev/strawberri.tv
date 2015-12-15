var MainComponent = React.createClass({
  propTypes:{
    channels: React.PropTypes.object.isRequired,
    current_channel: React.PropTypes.object.isRequired,
    current_url_index: React.PropTypes.number.isRequired,
  },
  getParamByName: function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },
  getStyle: function(){
    var colors = ["#0D6759", "#69D2E7", "#F38630", "#CBE86B", "#91204D", "#EEE545", "#E6481E", "#0B486B", "#FE4365", "#413D3D" ];
    return { backgroundColor: colors[Math.floor(Math.random() * colors.length)]};
  },
  getInitialState: function(){
    if (this.getParamByName("switch") != "true") {
  	  return {"splashPageInvisible": false, "fullContentInvisible": true};
    } else {
      return {"splashPageInvisible": true, "fullContentInvisible": false};
    }
  },
  componentDidMount: function(){
    var self = this;
    var style = this.getStyle();
    STRAWBERRI.data.mainStyle = style;
    if (this.getParamByName("switch") != "true") {
      setTimeout(function(){
        self.setState({"splashPageInvisible": true, "fullContentInvisible": false});
      }, 50000);
    } 
    
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