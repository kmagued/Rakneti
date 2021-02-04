import React from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {authenticate} from '../store/actions/users';

class HomeScreen extends React.Component {
  state = {
    email: 'kmagued@gmail.com',
    password: 'mypass',
  };

  render() {
    const {email, password} = this.state;

    return (
      <SafeAreaView style={styles.screen}>
        {/* Title */}
        <View style={styles.container}>
          <TextComp style={{fontSize: 40}}>
            <TextComp bold style={{fontSize: 80, color: Colors.primaryColor}}>
              R
            </TextComp>
            AKNETI
          </TextComp>
          <TextComp style={{fontSize: 18}}>Sign in to your account</TextComp>
        </View>
        {/* Inputs */}
        <View style={{paddingTop: 40}}>
          <Input
            icon={<Ionicons name="md-mail" size={18} />}
            placeholder="Email"
            autoCapitalize="none"
            value={this.state.email}
            email
            onChangeText={(email) => {
              this.setState({email});
            }}
            error={this.props.emailError}
          />
          <Input
            icon={<Ionicons name="md-lock-closed" size={18} />}
            placeholder="Password"
            value={this.state.password}
            secureTextEntry
            onChangeText={(password) => {
              this.setState({password});
            }}
            error={this.props.passwordError}
          />
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <TextComp style={{color: 'grey'}}>Forgot your password?</TextComp>
          </TouchableOpacity>
        </View>
        {/* Error */}
        <View style={styles.errorContainer}>
          <TextComp bold style={{color: Colors.error}}>
            {this.props.error}
          </TextComp>
        </View>
        {/* Sign in Button */}
        <View style={styles.btnContainer}>
          <TextComp bold style={styles.btn}>
            Sign in
          </TextComp>
          <TouchableOpacity
            onPress={() => {
              this.props.authenticate(email, password);
            }}>
            <Ionicons
              name="arrow-forward-circle"
              color={Colors.primaryColor}
              size={50}
            />
          </TouchableOpacity>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <TextComp>
            Don't have an account?{' '}
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Signup');
              }}>
              <TextComp black style={{textDecorationLine: 'underline'}}>
                Create
              </TextComp>
            </TouchableOpacity>
          </TextComp>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  decorationTop: {
    backgroundColor: Colors.primaryColor,
    width: 250,
    height: 250,
    borderRadius: 125,
    marginRight: -80,
    marginTop: -90,
    alignSelf: 'flex-end',
  },
  container: {
    alignSelf: 'center',
    flex: 0.45,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordContainer: {
    marginTop: 5,
    alignSelf: 'flex-end',
    marginRight: 40,
  },
  btnContainer: {
    flexDirection: 'row',
    flex: 0.25,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  btn: {
    fontSize: 30,
    marginRight: 10,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = {
  authenticate,
};

const mapStateToProps = (state) => ({
  token: state.users.token,
  error: state.users.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
