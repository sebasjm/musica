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
    padding: 5,
    margin: 10,
    width: 500,
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
        padding: 5,
        margin: 10,
        width: 100,
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

import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';

const iconStyles = makeStyles(theme => ({
  root: {
      position: 'sticky',
      top: 80,
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    icon: {
      boxSizing: 'content-box',
      cursor: 'pointer',
      color: theme.palette.text.primary,
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create(['background-color', 'box-shadow'], {
        duration: theme.transitions.duration.shortest,
      }),
      padding: 5,
      margin: 10,
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
      },
      }
}));


export default function CustomizedSlider({note, time, onChangeNote, onChangeTime, onAddUp, onAddDown, onDelete}) {
  const classes = useStyles();
  const cls = iconStyles();

  return (
    <div className={classes.root}>
      <Icon className={cls.icon} onClick={e => onAddUp()}>arrow_downward</Icon>
      <NotaPrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={((note-300)/ 700)*100} onChangeCommitted={(e,v) => onChangeNote(Math.round(v*700/100+300))}/>
      <Icon className={cls.icon} onClick={e => onAddDown()}>arrow_upward</Icon>
      <TiempoPrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={(time / 16)*100} onChangeCommitted={(e,v) => onChangeTime(Math.round(v*16/100))}/>
      <Icon className={cls.icon} onClick={e => onDelete()}>close</Icon>
    </div>
  );
}
