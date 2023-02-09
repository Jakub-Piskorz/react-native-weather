import { Image, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';

const MainScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <View className="pb-3 flex-row items-center mx-4 items-center space-x-2">
        <Image
          className="w-16 h-7"
          source={{
            uri: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png',
          }}
        />
        <TextInput />
        <MagnifyingGlassIcon size={20} color="black" />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
