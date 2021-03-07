import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {login} from '../store/actions/users';

class HomeScreen extends React.Component {
  state = {
    email: '',
    password: '',
    error: null,
    loading: false,
  };

  loginHandler = (email, password) => {
    this.setState({loading: true});
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.props.login(res.user.uid, res.user.email);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          this.setState({
            error: 'User not found',
            loading: false,
          });
        }
        if (
          error.code === 'auth/invalid-email' ||
          error.code === 'auth/wrong-password'
        ) {
          this.setState({
            error: 'Invalid email or password',
            loading: false,
          });
        }
      });
  };

  render() {
    const {email, password, error, loading} = this.state;

    return (
      <View style={styles.screen}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={{
            uri:
              'https://image.freepik.com/free-photo/empty-parking-lot-parking-lane-outdoor-public-park_1127-3374.jpg',
          }}>
          {/* Title */}
          <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <View style={styles.container}>
              <TextComp style={{fontSize: 40, color: 'white'}}>
                <TextComp
                  bold
                  style={{fontSize: 80, color: Colors.primaryColor}}>
                  R
                </TextComp>
                AKNETI
              </TextComp>
              <TextComp style={{fontSize: 18, color: 'white'}}>
                Sign in to your account
              </TextComp>
            </View>
            {/* Inputs */}
            <View style={{paddingTop: 40}}>
              <Input
                icon={<Ionicons name="md-mail" size={18} />}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                email
                onChangeText={(email) => {
                  this.setState({email, error: ''});
                }}
              />
              <Input
                icon={<Ionicons name="md-lock-closed" size={18} />}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={(password) => {
                  this.setState({password, error: ''});
                }}
              />
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <TextComp style={{color: 'white'}}>
                  Forgot your password?
                </TextComp>
              </TouchableOpacity>
            </View>
            {/* Error */}

            <View style={styles.errorContainer}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <TextComp black style={{color: Colors.primaryColor}}>
                  {error}
                </TextComp>
              )}
            </View>
            {/* Sign in Button */}
            <View style={styles.btnContainer}>
              <TextComp bold style={styles.btn}>
                Sign in
              </TextComp>
              <TouchableOpacity
                onPress={() =>
                  this.loginHandler(this.state.email, this.state.password)
                }>
                <Ionicons
                  name="arrow-forward-circle"
                  color={Colors.primaryColor}
                  size={50}
                />
              </TouchableOpacity>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
              <TextComp style={{color: 'white'}}>
                Don't have an account?{' '}
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Signup');
                  }}>
                  <TextComp
                    black
                    style={{textDecorationLine: 'underline', color: 'white'}}>
                    Create
                  </TextComp>
                </TouchableOpacity>
              </TextComp>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
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
    color: 'white',
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = {
  login,
};

const mapStateToProps = (state) => ({
  token: state.users.token,
  error: state.users.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
