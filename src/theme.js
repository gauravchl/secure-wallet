import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

const muiTheme =  getMuiTheme({
  palette: {
    primary1Color: Colors.blue600,
    primary2Color: Colors.cyan400,
    primary3Color: Colors.grey800,
    accent1Color: Colors.lightBlue400,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
  },
});

export default muiTheme
