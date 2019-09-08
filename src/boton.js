import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    width: 800 + theme.spacing(3) * 2,
    height: 50,
    // padding: theme.spacing(3),
  },
  margin: {
    // height: theme.spacing(3),
    // width: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef,
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};


const NotaPrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
    width: 600,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const TiempoPrettoSlider = withStyles({
    root: {
        height: 8,
        width: 200,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
          boxShadow: 'inherit',
        },
      },
      active: {},
      valueLabel: {
        left: 'calc(-50% + 4px)',
      },
      track: {
        height: 8,
        borderRadius: 4,
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
})(Slider);


export default function CustomizedSlider({note, time, onChangeNote, onChangeTime}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NotaPrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={(note/ 1046)*100} onChange={(e,v) => onChangeNote(v)}/>
      <TiempoPrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={(time / 16)*100} onChange={(e,v) => onChangeTime(v)}/>
    </div>
  );
}
