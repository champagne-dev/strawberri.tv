window.VideoComponent = React.createClass({
  componentDidMount: function(){
  	var playerInstance = jwplayer('jwplayer-container');
  	playerInstance.setup({
		file: "//www.youtube.com/watch?v=kKsT9eNK40g",
		height: "100%",
		width: "100%"
	});
  },
  render: function() {
    return (
      <div className="video-wrap-jw" id="jwplayer-container">
      </div>
    );
  },

});