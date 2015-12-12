window.PersonCountComponent = React.createClass({
  propTypes: {
    pushed: React.PropTypes.bool.isRequired,
  },
  render: function() {
  	var specialClassName = this.props.pushed ? " pushed" : "";
    return (
      <div className={"person-count" + specialClassName} >
      </div>
    );
  },

});