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
class ReportScreen extends React.Component {
  state = {
    title: '',
    content: '',
  };

  render() {
    return (
      <>
        <SafeAreaView style={{backgroundColor: Colors.primaryColor}} />
        <SafeAreaView style={styles.screen}>
          <View
            style={{
              backgroundColor: Colors.primaryColor,
              paddingBottom: 30,
              height: '25%',
              justifyContent: 'space-around',
              borderBottomRightRadius: Platform.OS === 'ios' ? 10 : 0,
              borderBottomLeftRadius: Platform.OS === 'ios' ? 10 : 0,
            }}>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="ios-arrow-back" color="white" size={30} />
            </TouchableOpacity>
            <View>
              <View style={styles.container}>
                <TextComp black style={styles.title}>
                  Report a Problem
                </TextComp>
              </View>
              <View style={{paddingHorizontal: 30}}>
                <TextComp style={{fontSize: 16, color: 'white'}}>
                  Send your report, we will get contact with you as soon as
                  possible
                </TextComp>
              </View>
            </View>
          </View>
          <View style={{marginVertical: 30}}>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                placeholder="Enter location title"
                value={this.state.title}
                onChangeText={(title) => this.setState({title})}
              />
            </View>
            <View style={{height: 300, ...styles.input}}>
              <TextInput
                style={{...styles.inputText, lineHeight: 22}}
                placeholder="What do you want to report?"
                value={this.state.content}
                onChangeText={(content) => this.setState({content})}
                blurOnSubmit
                multiline
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
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
    color: 'white',
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: 'rgb(248, 249, 253)',
    borderWidth: 0.5,
    borderColor: 'grey',
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
  },
  btnText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ReportScreen;
