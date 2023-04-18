import { 
  Text, 
  TouchableOpacity, 
  View, SafeAreaView, 
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { useState } from 'react';

interface IVideo {
  handleClose: (isOpen: boolean) => void;
  dataURL: string;
}

const Video = ({ handleClose, dataURL }: IVideo) => {
  const [visible, setVisible] = useState(false);

  const ActivityIndicatorElement = () => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color='gray' size={'large'} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => handleClose(false)}
        activeOpacity={0.8}
      >
        <Feather
          name='arrow-left'
          size={24} 
          color='#ffffff' 
        />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
      <WebView
        style={styles.contentWebView}
        source={{ uri: dataURL}}
        javaScriptEnabled={true}
        // cache
        domStorageEnabled={true}
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
      />
      {visible && <ActivityIndicatorElement />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    width: '100%',
    backgroundColor: '#4cbe6c',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 14
  },
  backText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 14
  },
  contentWebView: {
    flex: 1,
    width: '100%',
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    left: 0, right: 0,
    top: 0,bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  }
})

export default Video;