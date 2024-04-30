import { createTheme } from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: '#FFF',
    secondary: '#e54848',
    success: 'green',
  },
  darkColors: {
    primary: 'black',
    secondary: 'gray',
  },
  components: {
    Button: {
      color: 'black',
    },
  },
});

export default { theme };
