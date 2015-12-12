var MainComponent = React.createClass({
  getInitialState: function(){
  	return {"splashPageInvisible": true, "fullContentInvisible": false}
  },
  render: function() {
  	var self = this;
  	setTimeout(function(){
  		self.setState({"splashPageInvisible": true, "fullContentInvisible": false})
  	}, 500)
    return (
      <div className="wrapper">
    	<SplashPageComponent invisible={this.state.splashPageInvisible} />
    	<FullContentComponent invisible={this.state.fullContentInvisible} />
      </div>
    );
  },

});
window.mainView = ReactDOM.render(<MainComponent />, document.getElementById("main"));