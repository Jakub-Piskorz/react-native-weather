import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text as NativeText, View } from 'react-native';
import CloudIcon from '../../assets/icons/cloud';
import SelectDropdown from 'react-native-select-dropdown';
import { LinearGradient } from 'expo-linear-gradient';
import padding from '../utils/padding';

interface geolocation {
  name: string;
  lat: number;
  long: number;
}

const Text = (props) => (
  <NativeText {...props} style={{ color: 'white', ...props.style }}>
    {props.children}
  </NativeText>
);

export default function WeatherScreen() {
  const cities: geolocation[] = [
    { name: 'Warsaw', lat: 52.237049, long: 21.017532 },
    { name: 'Poznań', lat: 52.409538, long: 16.931992 },
    { name: 'Gdańsk', lat: 54.372158, long: 18.638306 },
  ];

  const [selectedCity, setSelectedCity] = useState<geolocation | null>(
    cities[0]
  );

  const urlBuilder = useCallback(
    (lat: number, long: number) =>
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`,
    []
  );
  const [temperature, setTemperature] = useState<number | null>(null);

  // Connects to open-meteo API and returns the temperature in ℃
  const getTemperature = async (lat: number, long: number) => {
    try {
      const weatherResObj = await fetch(urlBuilder(lat, long));
      if (!weatherResObj.ok) {
        throw new Error(weatherResObj.statusText);
      }
      const weatherObj = await weatherResObj.json();
      const _temperature: number | undefined | null =
        weatherObj?.hourly?.temperature_2m[0];
      typeof _temperature === 'number' && setTemperature(_temperature);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  useEffect(() => {
    getTemperature(selectedCity.lat, selectedCity.long);
    const interval = setInterval(() => getTemperature(selectedCity.lat, selectedCity.long), 60000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  return (
    <>
      <LinearGradient
        colors={['rgba(9,78,121,1)', 'rgba(0,212,255,1)']}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={{ paddingBottom: 10 }}>
            <CloudIcon pathStyle={{ stroke: 'white' }} />
          </View>
          <Text
            style={{
              fontSize: 30,
              marginTop: 15,
              marginBottom: 0,
            }}
          >
            {selectedCity.name}
          </Text>
          {temperature && (
            <Text style={{ fontSize: 64, letterSpacing: -5 }}>
              {temperature} °C
            </Text>
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.selectLabel}>Select the city</Text>
          <SelectDropdown
            data={cities || []}
            onSelect={(item) => setSelectedCity(item)}
            rowTextForSelection={(item) => item?.name || ''}
            buttonTextAfterSelection={(item) => item.name}
            onChangeSearchInputText={() => {}}
            defaultValue={selectedCity?.name || ''}
            defaultButtonText={selectedCity?.name || 'Select the city'}
            buttonStyle={styles.selectList}
            buttonTextStyle={styles.selectList.text}
          />
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 4,
    ...padding(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    ...padding(20, 20, 50),
    marginBottom: 20,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  selectLabel: {
    fontWeight: '700',
  },
  selectList: {
    width: 200,
    marginTop: 15,
    maxWidth: '80%',
    backgroundColor: 'unset',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 4,
    borderStyle: 'solid',
    text: {
      color: 'white',
      fontSize: 23,
      lineHeight: 25,
      fontWeight: '400' as '400', // lol typescript
    },
  },
});
