import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import moment from 'moment'

import Week from 'components/Week'
import Day from 'components/Day'

class Calendar extends Component {

        handleChangeDay(newMonth, newDay) {
            const { day, month, year } = this.props;
            const date = moment([year, newMonth]);
            const lastDay = date.endOf('month').date();

            let newYear = year;

            if (newMonth > 11) {
                newYear = year + 1
                newMonth = 0;
            } else if (month < 0) {
                newYear = year - 1
                newMonth = 11
            }

            if(day > lastDay) {
                newDay = lastDay;
            }

            this.props.handleChangeDate(newYear, newMonth, newDay);
        }

        render() {
        return (
            <div style={STYLES.container}>
                <div style={STYLES.header}>
                    <div style={STYLES.headerItem}>Sun</div>
                    <div style={STYLES.headerItem}>Mon</div>
                    <div style={STYLES.headerItem}>Tue</div>
                    <div style={STYLES.headerItem}>Wed</div>
                    <div style={STYLES.headerItem}>Thu</div>
                    <div style={STYLES.headerItem}>Fri</div>
                    <div style={STYLES.headerItem}>Sat</div>
                </div>
                {this.renderCalendar()}
            </div>
        );
    }

    makeCalendar() {
        const { year, month, day } = this.props;

        //moment object first day of the month
        const date = moment([year, month]);

        //weekday which the month begins on (number)
        const beginningDay = date.weekday();

        //day which the month ends on (number)
        const endDay = date.endOf('month').date();

        let calendarArray = [Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)]

        let endDayPrevMonth = date.subtract(1,'months').endOf('month').date()

        for (let i = 0; i <= 6; i++) {
            if(i < beginningDay) {
                const prevMonthDay = endDayPrevMonth - beginningDay + i + 1;

                calendarArray[0][i] =
                    <Day
                        handleClick={this.handleChangeDay.bind(this, month - 1, prevMonthDay)}
                        key={i}
                        day={prevMonthDay}
                        differentMonth={true}
                    />;
            } else {
                const curMonthDay = i - beginningDay + 1;

                calendarArray[0][i] =
                    <Day
                        handleClick={this.handleChangeDay.bind(this, month, curMonthDay)}
                        key={i}
                        day={curMonthDay}
                        selected={i - beginningDay + 1 === day}
                    />
            }
        }

        const weeks = 35 - endDay - beginningDay >= 0 ? 5 : 6;
        for (let weekIndex = 1; weekIndex < weeks; weekIndex++) {
            for (let dayIndex = 0; dayIndex <= 6; dayIndex++) {
                const curDay = dayIndex + 1 + (7 * weekIndex) - beginningDay
                if (curDay <= endDay) {
                    calendarArray[weekIndex][dayIndex] =
                        <Day
                            handleClick={this.handleChangeDay.bind(this, month, curDay)}
                            key={(weekIndex * 7) + (dayIndex)}
                            day={curDay}
                            selected={curDay === day}
                        />
                } else {
                    calendarArray[weekIndex][dayIndex] =
                        <Day
                            handleClick={this.handleChangeDay.bind(this, month + 1, curDay - endDay)}
                            key={(weekIndex * 7) + (dayIndex)}
                            day={curDay - endDay}
                            selected={false}
                            differentMonth={true}
                        />
                }
            }
        }
        return calendarArray;
    }

    renderCalendar() {
        const calendarArray = this.makeCalendar();

        return calendarArray.map((week) => {
            return (
                <Week>
                    {week}
                </Week>)
        });
    }
}

const STYLES = {
    header: {
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem 0',
    },

    headerItem: {
        fontWeight: 'bold',
        width: '3rem',
        fontSize: '1rem',
        display: 'flex',
        justifyContent: 'center',
        color: '#9E9E9E'

    },

    container: {
        width: '100%',
        backgroundColor: 'white',
        boxSizing: 'border-box',
        fontWeight: '300',
        padding: '1rem 0'
    },
}

Calendar.propTypes = {
    day             : PropTypes.number.isRequired,
    month           : PropTypes.number.isRequired,
    year            : PropTypes.number.isRequired,
    handleChangeDay : PropTypes.func
};

Calendar.defaultProps = {
    handleChangeDay : () => {}
}

export default Radium(Calendar)
