import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import TextComp from '../components/TextComp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import DetailsHeader from '../components/DetailsHeader';
import moment from 'moment';
import {cancelReservation} from '../store/actions/locations';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class ReservationDetails extends React.Component {
  expectedTimeToArrive = moment(this.props.date).add(10, 'm');
  now = this.expectedTimeToArrive.diff(moment(Date.now()));

  state = {
    time: moment(this.now).format('mm:ss'),
  };

  componentDidMount() {
    this._isMounted = true;
    setInterval(() => {
      const now = this.expectedTimeToArrive.diff(moment(Date.now()));
      this._isMounted && this.setState({time: moment(now).format('mm:ss')});
    }, 1000);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const reservedParking = this.props.reservedPlace;
    const reservedArea = this.props.reservedArea;
    const date = this.props.date;

    return (
      <Fragment>
        <SafeAreaView style={{backgroundColor: Colors.primaryColor}} />
        <ScrollView
          scrollEnabled={SCREEN_HEIGHT < 800}
          contentContainerStyle={{flex: SCREEN_HEIGHT < 800 ? null : 1}}
          style={styles.screen}>
          <View style={{flex: SCREEN_HEIGHT < 800 ? null : 0.95}}>
            <DetailsHeader
              onBack={() => this.props.navigation.navigate('Home')}
            />
            <View style={{marginHorizontal: 30}}>
              {/* DETAILS */}
              <View style={styles.details}>
                <View style={styles.photo}>
                  <Image
                    source={{uri: reservedParking.image}}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <View>
                  <View style={{width: '80%'}}>
                    <TextComp bold style={{fontSize: 20}}>
                      {reservedParking.name}
                    </TextComp>
                  </View>
                  <TextComp style={{marginBottom: 10}}>
                    {reservedArea.name}
                  </TextComp>
                  <TextComp style={{marginBottom: 2}}>
                    {moment(date).format('MMM DD, YYYY')}
                  </TextComp>
                  <TextComp>{moment(date).format('hh:mm A')}</TextComp>
                </View>
              </View>
              {/* ADDRESS */}
              <View style={styles.addressContainer}>
                <Ionicons name="ios-location-sharp" size={20} />
                <TextComp style={{fontSize: 14, marginLeft: 5}}>
                  {reservedParking.address}
                </TextComp>
              </View>
              {/* DIRECTIONS BUTTON */}
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={{...styles.btn, width: '90%', alignSelf: 'center'}}>
                  <TextComp bold style={{color: 'white', fontSize: 14}}>
                    GET DIRECTIONS
                  </TextComp>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{alignItems: 'center', marginTop: 20, marginBottom: 40}}>
              <TextComp bold style={{color: 'grey', fontSize: 15}}>
                TIME REMAINING TO ARRIVE
              </TextComp>
              <TextComp style={{fontSize: 40, marginBottom: 15}}>
                {this.state.time}
              </TextComp>
            </View>
          </View>
          <View style={{alignSelf: 'center', width: '80%', marginBottom: 20}}>
            <TouchableOpacity
              style={{...styles.btn, backgroundColor: '#333333'}}
              onPress={() => {
                this.props
                  .cancel(
                    reservedParking,
                    reservedArea,
                    reservedParking.parkingAreas.findIndex(
                      (item) => item.name === reservedArea.name,
                    ),
                  )
                  .then(() => {
                    this.props.navigation.navigate('Home');
                  });
              }}>
              <TextComp bold style={{color: 'white', fontSize: 14}}>
                CANCEL RESERVATION
              </TextComp>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  details: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    borderColor: '#ccc',
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  addressContainer: {
    width: '90%',
    paddingTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.primaryColor,
    fontSize: 25,
    marginBottom: 10,
  },
  btnContainer: {
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  btn: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    marginTop: 10,
  },
});

const mapStateToProps = (state) => ({
  reservedPlace: state.users.reservedPlace,
  reservedArea: state.users.reservedArea,
  date: state.users.reservationDate,
});

const mapDispatchToProps = {
  cancel: cancelReservation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationDetails);
