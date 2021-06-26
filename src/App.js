import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import DialogContextProvider from './contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import ToastifyHOC from './components/_HOCProvider/ToastifyHOC';

const App = () => {
 const routing = useRoutes(routes);

 return (
  <ThemeProvider theme={theme}>
   <ToastifyHOC>
    <DialogContextProvider>
     <GlobalStyles />
     {routing}
    </DialogContextProvider>
   </ToastifyHOC>
  </ThemeProvider>
 );
};

export default App;
