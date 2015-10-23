<script type="text/javascript">
  React.render(AuthorsList, [
      {name: 'Uncle Bob', url: 'http://butunclebob.com'},
      {name: 'DHH', url: 'http://buildabloginfifteenminutes.com'},
  ]);
</script>

export var AuthorsList = React.createClass({
  render() {
    return <span className="authors-container">
             { 'by ' }{ this.authors() }
           </span>
  },

  authors() {
    return <CommaSeparatedList items={ this.props.authors }
                               listClassName="authors"
                               itemClassName="author">
              <Author />
           </CommaSeparatedList>
  }
});

export var Author = React.createClass({
  render() {
    return <a className="author-link" href={ this.props.url }>
             { this.props.name }
           </a>
  }
});

export var CommaSeparatedList = React.createClass({
  render() {
    return <span className={ this.props.listClassName }>
             { this.list() }
           </span>
  },

  list() {
    return(
      _.map(this.props.items, function(item) {
        return <span className={ this.props.itemClassName }>
                 { this.and(this.props.items, item) }
                 { React.cloneElement(React.Children.only(this.props.children), item) }
                 { this.comma(this.props.items, item) }
               </span>
      }.bind(this))
    )
  },

  comma(items, item) {
    if(item !== _.last(items) && items.length !== 2) {
      return ", ";
    }
  },

  and(items, item) {
    if(item === _.last(items) && item !== _.first(items)) {
      return " and ";
    }
  }
});

export var RecommendationReason = React.createClass({
  render() {
      return <strong id={ this.nodeId() } onMouseOver={ this.displayTooltip }>
               <a className="recommendation-reason-link" href={ this.props.url }>
                 { this.props.name }
               </a>
            </strong>
    },

    nodeId() {
      return `recommendation-reason-${this.props.id}`
    }

    displayTooltip() {
      this.props.openTooltip(
        this.tooltip(),
        this.nodeId()
      )
    },

    tooltip() {
      return <p>
               { this.props.description }
             </p>
    }
});

export var RecommendationReasons = React.createClass({
  render() {
    return <p className="recommendation-reasons-container">
             <span className='because-you-follow'>
               { "Because you follow "}{ this.reasons() }
             </span>
           </p>
  },

  reasons() {
      return <CommaSeparatedList items={ this.props.reasons }
                                 listClassName="recommendation-reasons"
                                 itemClassName="recommendation-reason">
               <RecommendationReason />
            </CommaSeparatedList>
    }
});
