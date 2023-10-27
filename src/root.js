import { ThemeProvider } from 'styled-components';
import {
  lightTheme,
  MeetingProvider,
  GlobalStyles,
} from 'amazon-chime-sdk-component-library-react';
import MyApp from './App';
const Root = () => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <MeetingProvider>
      <MyApp />
    </MeetingProvider>
  </ThemeProvider>
);

export default Root