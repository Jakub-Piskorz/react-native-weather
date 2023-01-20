import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useCallback, useEffect, useState } from 'react';
import { SvgCssUri } from 'react-native-svg';

export interface geolocation {
  name: string;
  lat: number;
  long: number;
}

export default function App() {
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
  }, [selectedCity]);

  return (
    <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
      <View style={styles.container}>
        <View style={styles.container}>
          <SvgCssUri width="50%" height="50%" uri="/assets/icons/cloud.svg" />
        </View>
        <Text style={{ fontSize: 20, marginTop: 15, marginBottom: 10 }}>
          Temperature in {selectedCity.name}
        </Text>
        {temperature && <Text style={{ fontSize: 48 }}>{temperature}°C</Text>}
      </View>
      <View style={styles.footer}>
        <Text style={{ padding: 10 }}>Select the city</Text>
        <SelectDropdown
          data={cities || []}
          onSelect={(item) => setSelectedCity(item)}
          rowTextForSelection={(item) => item?.name || ''}
          buttonTextAfterSelection={(item) => item.name}
          onChangeSearchInputText={() => {}}
          defaultValue={selectedCity?.name || ''}
          defaultButtonText={selectedCity?.name || 'Select the city'}
          buttonStyle={styles.selectList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 70,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    padding: 70,
    marginBottom: 20,
    margin: 'auto',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectList: {
    width: 200,
    maxWidth: '80%',
  },
});
