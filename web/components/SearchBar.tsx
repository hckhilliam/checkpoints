import './SearchBar.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { searchGeneral } from '../actions/search';

import Input from './Input';
import Button from './Button';

interface SearchProps {
    search?: (string) => void;
    results?: SearchResults[];
}

interface SearchState {
    searchText: string;
}

export class SearchBar extends React.Component<SearchProps, SearchState>{

    state: SearchState = {
        searchText: ""
    }
    editSearch = (event) => {
        this.setState({searchText: event.target.value});
        this.props.search(event.target.value);
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.search(this.state.searchText);
    }

    render() {
        const { results } = this.props;
        return (
            <form className="searchBar" onSubmit={this.onSubmit} autoComplete="off"> 
                <Input placeholder="Search" name="search" value={this.state.searchText} onChange={this.editSearch}/>
                <Button type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </Button> 
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        results: state.search
    };
};

const mapDispatchToProps = dispatch => {
    return {
        search: (query: string) => {
            dispatch(searchGeneral(query));
        } 
    };
};

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export default SearchBarContainer;

