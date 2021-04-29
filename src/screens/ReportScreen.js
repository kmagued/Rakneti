import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import TextComp from '../components/TextComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
class ReportScreen extends React.Component {
  state = {
    title: '',
    content: '',
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.screen}>
          <View
            style={{
              paddingBottom: 20,
              height: '25%',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="ios-arrow-back" size={30} />
            </TouchableOpacity>
            <View>
              <View style={styles.container}>
                <TextComp black style={styles.title}>
                  Report
                </TextComp>
              </View>
              <View style={{paddingHorizontal: 30}}>
                <TextComp style={{fontSize: 16}}>
                  Send your report, we will get contact with you as soon as
                  possible
                </TextComp>
              </View>
            </View>
          </View>
          <View style={{marginVertical: 10, height: '60%'}}>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                placeholder="Enter location title"
                value={this.state.title}
                onChangeText={(title) => this.setState({title})}
              />
            </View>
            <TouchableWithoutFeedback
              style={{height: 300, paddingTop: 10, ...styles.input}}
              onPress={() => this.input.focus()}>
              <TextInput
                ref={(ref) => (this.input = ref)}
                style={{...styles.inputText, lineHeight: 25}}
                placeholder="What do you want to report?"
                value={this.state.content}
                onChangeText={(content) => this.setState({content})}
                blurOnSubmit
                multiline
              />
            </TouchableWithoutFeedback>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.goBack()}>
            <TextComp style={styles.btnText}>Send</TextComp>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  title: {
    fontSize: 26,
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'whitesmoke',
  },
  inputText: {
    fontFamily: 'Ubuntu-Regular',
    padding: 15,
    fontSize: 16,
  },
  btn: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ReportScreen;
