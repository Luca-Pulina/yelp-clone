import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import RouterIndex from './routes/Index';
import theme from './theme';


const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <RouterIndex />
      </ThemeProvider>
    </div>
  );
}

export default App;
