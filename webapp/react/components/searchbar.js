import React, { Component } from 'react';

export default class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectedSuggestion: null,
      labelVisible: true
    }
  }

  handleChange = (event) => {
    const value = event.target.value;

    this.setState({
      value: value,
      selectedSuggestion: this.state.selectedSuggestion
    });

    this.props.getSuggestions(value);
  };

  selectSuggestion = (index) => {
    this.setState({
      value: this.props.suggestions[index].name,
      selectedSuggestion: index,
    });
    this.props.clearSuggestions();
  };

  hideLabel = () => {
    this.setState({
      value: this.state.value,
      selectedSuggestion: this.state.selectedSuggestion,
      labelVisible: false
    });
  };

  showLabel = () => {
        this.setState({
      value: this.state.value,
      selectedSuggestion: this.state.selectedSuggestion,
      labelVisible: true
    });
  };

  prev = () => {

    if (this.props.suggestions.length === 0) {
      return;
    }

    let index = this.state.selectedSuggestion !== null ? this.state.selectedSuggestion : 0;

    if (index === 0) {
      index = this.props.suggestions.length - 1;
    } else {
      index -= 1;
    }

    this.setState({
      selectedSuggestion: index,
      value: this.props.suggestions[index].name,
      labelVisible: this.state.labelVisible
    });

  };

  next = () => {
    if (this.props.suggestions.length === 0) {
      return;
    }

    let index = this.state.selectedSuggestion !== null ? this.state.selectedSuggestion : -1;

    if (index === (this.props.suggestions.length - 1)) {
      index = 0;
    } else {
      index += 1;
    }

    this.setState({
      selectedSuggestion: index,
      value: this.props.suggestions[index].name,
      labelVisible: this.state.labelVisible
    });
  };

  keydown = (event) => {
    switch (event.keyCode) {
      case 9: // tab
      case 27: // escape
        event.preventDefault();
        break;
      case 13: // enter
        event.preventDefault();
        this.props.onSearch(this.state.value);
        break;   false
      case 38: // up arrow
        event.preventDefault();
        this.prev();
        break;

      case 40: // down arrow
        event.preventDefault();
        this.next();
        break;
    }

    event.stopPropagation();
  };

  renderSuggestions = (suggestions) => {

    const selectSuggestion = this.selectSuggestion;
    const selectedSuggestion = this.state.selectedSuggestion;

    return suggestions.map((suggestion, index) => {

      let className = 'suggestion';
      if (index == selectedSuggestion) {
        className += ' suggestion--selected';
      }

      return (
        <li className={className} key={index} onClick={() => selectSuggestion(index)}>
          {suggestion.name}
        </li>
      );

    });

  };

  search = (event) => {
    event.preventDefault();
    this.props.onSearch(this.state.value);
  };

  render() {

    const suggestionElements = this.renderSuggestions(this.props.suggestions);

    return (
      <div className="searchbar">
        <div className="searchbar__wrapper">

          { this.state.value.length === 0 &&
            <label className="searchbar__label" htmlFor="search-query">
              { this.props.label }
            </label>
          }

          <input className="searchbar__input form-control"
                 type="search"
                 value={ this.state.value }
                 onChange={ this.handleChange.bind(this) }
                 onFocus={ this.hideLabel.bind(this) }
                 onBlur={ this.showLabel.bind(this) }
                 onKeyDown={ this.keydown.bind(this) }
          />

          <input className="searchbar__submit"
                 type="button"
                 value="Search"
                 onClick={ this.search }
                 onFocus={() => this.state}
          />

          <ul className="searchbar__suggestions">
            { suggestionElements }
          </ul>

        </div>
      </div>
    );
  }

  static propTypes = {
    suggestions: React.PropTypes.array,
    getSuggestions: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    label: React.PropTypes.string,
    clearSuggestions: React.PropTypes.func
  };

}
