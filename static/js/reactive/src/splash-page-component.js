window.SplashPageComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
  },
  //<img className="loading-image" src="static/img/loading.gif"></img>
  render: function() {
    var specialClassName = this.props.invisible ? " hidden" : ""
    return (
      <div className={"splash-page" + specialClassName}>
        <div className="wrapper">
          <div className="centered">
            <img className="main-image" src="static/img/strawberri_3_white.png">
            </img>
            
          </div>
        </div>
      </div>
    );
  },

});