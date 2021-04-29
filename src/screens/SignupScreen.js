import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import TextComp from '../components/TextComp';
import Input from '../components/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../constants/Colors';
import auth from '@react-native-firebase/auth';

class SignupScreen extends React.Component {
  state = {
    fullName: '',
    password: '',
    email: '',
    mobile: '',
    emailError: null,
    passwordError: null,
  };

  componentDidMount() {
    this.onFocusTrigger = this.props.navigation.addListener('focus', () => {
      const user = auth().currentUser;
      if (user) {
        user.delete().catch((err) => console.log(err));
      }
    });
  }

  signupHandler = () => {
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        this.props.navigation.navigate('CarDetails', {
          uid: res.user.uid,
          email: this.state.email,
          mobile: this.state.mobile,
          fullName: this.state.fullName,
        });
        res.user.sendEmailVerification();
      })
      .catch((error) => {
        if (!this.state.email) this.setState({emailError: 'Enter email'});

        if (error.code === 'auth/email-already-in-use') {
          this.setState({emailError: 'Email  already in use'});
        }
        if (error.code === 'auth/invalid-email') {
          if (!this.state.email) this.setState({emailError: 'Enter email'});
          else this.setState({emailError: 'Invalid email'});
        }
        if (error.code === 'auth/weak-password') {
          if (this.state.password)
            this.setState({passwordError: 'Password too weak'});
          else this.setState({passwordError: 'Enter password'});
        }
      });
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={styles.screen}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={{width: '7%', marginLeft: 20}}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Ionicons name="arrow-back" size={25} />
            </TouchableOpacity>
          </View>
          {/* Body */}
          <View style={styles.body}>
            <TextComp bold style={{fontSize: 24, alignSelf: 'center'}}>
              CREATE ACCOUNT
            </TextComp>
            {/* Inputs */}
            <View style={{marginVertical: 30}}>
              <Input
                autoFocus
                icon={<Ionicons name="md-mail" size={18} />}
                placeholder="E-mail"
                value={this.state.email}
                email
                autoCapitalize="none"
                onChangeText={(email) => {
                  this.setState({email, emailError: null});
                }}
                error={this.state.emailError}
              />
              <Input
                icon={<Ionicons name="md-person" size={18} />}
                placeholder="Full Name"
                value={this.state.fullName}
                onChangeText={(fullName) => {
                  this.setState({fullName});
                }}
              />
              <Input
                mobile
                icon={<Entypo name="phone" size={18} />}
                placeholder="Mobile"
                value={this.state.mobile}
                onChangeText={(mobile) => {
                  this.setState({mobile});
                }}
              />
              <Input
                icon={<Ionicons name="md-lock-closed" size={18} />}
                placeholder="Password"
                secureTextEntry
                value={this.state.password}
                onChangeText={(password) => {
                  this.setState({password, passwordError: null});
                }}
                error={this.state.passwordError}
              />
            </View>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.btnContainer}>
              <TextComp bold style={styles.btn}>
                Car Details
              </TextComp>
              <TouchableOpacity onPress={this.signupHandler}>
                <Ionicons
                  name="arrow-forward-circle"
                  color={Colors.primaryColor}
                  size={50}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 0.15,
    justifyContent: 'center',
  },
  btnContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  btn: {
    fontSize: 24,
    marginRight: 10,
  },
  body: {
    flex: 0.65,
    justifyContent: 'center',
  },
  footer: {
    flex: 0.15,
  },
});

export default SignupScreen;
