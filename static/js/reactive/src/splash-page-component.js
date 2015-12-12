window.SplashPageComponent = React.createClass({
  propTypes: {
    invisible: React.PropTypes.bool.isRequired,
  },
  render: function() {
    var specialClassName = this.props.invisible ? " hidden" : ""
    return (
      <div className={"splash-page" + specialClassName}>
        <div className="wrapper">
          <div className="centered">
            <img className="main-image" src="static/img/strawberri.png">
            </img>
            <img className="loading-image" src="static/img/loading.gif">
            </img>
          </div>
        </div>
      </div>
    );
  },

});