import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import moment from 'moment'

import 'stylesheets/main.css'

import Calendar from 'components/Calendar'
import DateHeader from 'components/DateHeader'

class DatePicker extends Component {
    render() {
        const { day, month, year, handleChangeDate } = this.props;
        return (
            <div style={STYLES}>
                <DateHeader
                    handleChangeDate={handleChangeDate}
                    {...this.props}
                />
                <Calendar
                    handleChangeDate={handleChangeDate}
                    {...this.props}
                />
            </div>
        );
    }
}

const STYLES = {
    display       : 'flex',
    flexDirection : 'column',
    fontFamily    : "'Roboto', 'sans-serif'",
    fontSize      : '16px',
    width         : '22rem'
}

const now = moment();

DatePicker.propTypes = {
    day              : PropTypes.number,
    month            : PropTypes.number,
    year             : PropTypes.number,
    handleDateChange : PropTypes.func
};

DatePicker.defaultProps = {
    day              : now.date(),
    month            : now.month(),
    year             : now.year(),
    handleDateChange : () => {}
};

export default Radium(DatePicker)
