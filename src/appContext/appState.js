import React, {useReducer} from 'react';
import axios from 'axios';
import AppContext from './appContext';
import AppReducer from './appReducer';

import {
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_COUNTRIES,
  CLEAR_FILTER,
  SET_LOADING,
  GET_GLOBAL,
  GET_CONTINENT,
  CLEAR_DETAIL,
  CLEAR_SUMMARY,
  FILTER_SUMMARY,
  ERROR,
} from '../types';

const AppState = (props) => {
  const initialState = {
    countries: null,
    continents: null,
    summary: null,
    current: null,
    detail: null,
    filtered: null,
    filteredSummary: null,
    loading: true,
    error: false,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Get countries
  const getCountries = async () => {
    try {
      const res = await axios.get('https://api.covid19api.com/countries');
      dispatch({type: GET_COUNTRIES, payload: res.data});
    } catch (err) {
      console.log(err);
      dispatch({type: ERROR, payload: true});
    }
  };

  // Get country detail
  const getDetail = async (country) => {
    try {
      const res = await axios.get(
        `https://api.covid19api.com/total/dayone/country/${country}`,
      );
      const {data} = res;
      const len = data.length;
      if (len === 0) {
        dispatch({type: GET_COUNTRY_DETAIL, payload: []});
      } else {
        dispatch({type: GET_COUNTRY_DETAIL, payload: data.reverse()});
      }
    } catch (err) {
      console.log(err);
      dispatch({type: ERROR, payload: true});
    }
  };

  // Get summary
  const getSummary = async () => {
    try {
      const res = await axios.get('https://api.covid19api.com/summary');
      const {
        data: {Date, Global, Countries},
      } = res;

      dispatch({
        type: GET_GLOBAL,
        payload: [{Country: 'Global', ...Global, Date}, ...Countries],
      });
    } catch (err) {
      console.log(err);
      dispatch({type: ERROR, payload: true});
    }
  };

  // Get Continent data
  const getContinent = async (continent) => {
    try {
      const res = await axios.get(
        `https://covid19-update-api.herokuapp.com/api/v1/world/continent/${continent}`,
      );
      dispatch({type: GET_CONTINENT, payload: res.data.countries, continent});
    } catch (err) {
      console.log(err);
      dispatch({type: ERROR, payload: true});
    }
  };
  // Set Loadings
  const setLoading = (loading) => {
    dispatch({type: SET_LOADING, payload: loading});
  };

  // Set Current Contact
  const setCurrent = async (country) => {
    await dispatch({type: SET_CURRENT, payload: country});
  };

  // Clear Current Country
  const clearCurrent = async () => {
    await dispatch({type: CLEAR_CURRENT});
  };

  // Filter Countries
  const filterCountries = (query) => {
    dispatch({type: FILTER_COUNTRIES, payload: query});
  };

  // Filter Summary
  const filterSummary = (query) => {
    dispatch({type: FILTER_SUMMARY, payload: query});
  };

  // Clear Detail
  const clearDetail = () => {
    dispatch({type: CLEAR_DETAIL});
  };

  // Clear Summary Filter
  const clearSummary = () => {
    dispatch({type: CLEAR_SUMMARY});
  };

  //  Clear Filter
  const clearFilter = () => {
    dispatch({type: CLEAR_FILTER});
  };

  const setError = (err) => {
    dispatch({type: ERROR, payload: err});
  };

  return (
    <AppContext.Provider
      value={{
        countries: state.countries,
        current: state.current,
        filtered: state.filtered,
        summary: state.summary,
        filteredSummary: state.filteredSummary,
        loading: state.loading,
        detail: state.detail,
        continents: state.continents,
        error: state.error,
        getCountries,
        getDetail,
        getSummary,
        getContinent,
        setLoading,
        setCurrent,
        clearCurrent,
        filterCountries,
        filterSummary,
        clearFilter,
        clearDetail,
        clearSummary,
        setError,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
