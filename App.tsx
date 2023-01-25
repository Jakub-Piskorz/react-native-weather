import WeatherScreen from './src/screens/weather-screen';

import * as Sentry from 'sentry-expo';
import {SENTRY_DSN} from "@env";

Sentry.init({
  dsn: SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

export default function App() {

  return <WeatherScreen />;
}
