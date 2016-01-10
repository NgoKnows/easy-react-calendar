import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

class Day extends Component {
    render() {
        const { handleClick, day, selected, differentMonth } = this.props;
        let dayStyles;

        if (selected && !differentMonth) {
            dayStyles = [STYLES.day, STYLES.selected];
        } else if (differentMonth) {
            dayStyles = [STYLES.day, STYLES.differentMonth];
        } else {
            dayStyles = STYLES.day;
        }

        return (
                <div
                    onClick={handleClick}
                    style={dayStyles}
                >
                    {day}
                </div>
        );
    }
}

const STYLES = {
    day: {
        display: 'flex',
        fontSize: '1.25rem',
        height: '1.25rem',
        justifyContent: 'center',
        margin: '0 0.375rem',
        padding: '0.45rem 0.5rem 0.6rem 0.5rem',
        width: '1.25rem',
        ':hover': {
            background: '#2E7D32',
            borderRadius: '50%',
            opacity: 0.75,
            cursor: 'pointer',
            color: 'white',
        }
    },
    selected : {
        background:'#2E7D32',
        borderRadius: '50%',
        color: 'white',
    },
    differentMonth : {
        color: 'grey',
        opacity: '0.4'
    }
}

Day.propTypes = {
    day            : PropTypes.number.isRequired,
    differentMonth : PropTypes.bool,
    handleClick    : PropTypes.func,
    selected       : PropTypes.bool
};

Day.defaultProps = {
    differentMonth : false,
    handleClick    : () => {},
    selected       : false
};

export default Radium(Day)
