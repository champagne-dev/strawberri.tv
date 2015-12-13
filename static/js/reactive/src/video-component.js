window.VideoComponent = React.createClass({
  propTypes: {
    current_channel: React.PropTypes.object.isRequired,
    current_url_index: React.PropTypes.number.isRequired,
  },
  componentDidMount: function(){
    console.log(this.props.current_channel);
    console.log(this.props.current_url_index);
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