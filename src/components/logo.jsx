import React from 'react';
import PropTypes from 'prop-types';


let Logo = (props) => {
  let { backgroundColor='#EEEEEE', lockColor='#424242', ...others } = props;

  return (
    <svg width="245px" height="245px" viewBox="38 125 245 245" {...others} >
      <g id="lock" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(38.000000, 125.000000)">
        <circle id="Oval" fill={backgroundColor} cx="122.5" cy="122.5" r="122.5"></circle>
        <path d="M162.5,91 L155.75,91 L155.75,77.2857143 C155.75,58.36 140.63,43 122,43 C103.37,43 88.25,58.36 88.25,77.2857143 L88.25,91 L81.5,91 C74.075,91 68,97.1714286 68,104.714286 L68,173.285714 C68,180.828571 74.075,187 81.5,187 L162.5,187 C169.925,187 176,180.828571 176,173.285714 L176,104.714286 C176,97.1714286 169.925,91 162.5,91 Z M122,152.714286 C114.575,152.714286 108.5,146.542857 108.5,139 C108.5,131.457143 114.575,125.285714 122,125.285714 C129.425,125.285714 135.5,131.457143 135.5,139 C135.5,146.542857 129.425,152.714286 122,152.714286 Z M142.925,91 L101.075,91 L101.075,77.2857143 C101.075,65.56 110.4575,56.0285714 122,56.0285714 C133.5425,56.0285714 142.925,65.56 142.925,77.2857143 L142.925,91 Z" id="Shape" fill={lockColor} fillRule="nonzero"></path>
      </g>
    </svg>
  )
}

Logo.propTypes = {
  backgroundColor: PropTypes.string,
  lockColor: PropTypes.string,
}


export default Logo
