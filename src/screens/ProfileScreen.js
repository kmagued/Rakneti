import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';

//Components & Constants
import Header from '../components/Header';
import TextComp from '../components/TextComp';
import Colors from '../constants/Colors';
import CarDetails from '../components/CarDetails';

//Redux
import {connect} from 'react-redux';
import {logout} from '../store/actions/users';

//Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class ProfileScreen extends React.Component {
  renderHistory = (itemData) =>
    itemData.index < 2 && (
      <TouchableOpacity
        style={styles.placeContainer}
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigation.navigate('HistoryDetail', {
            itemDetail: itemData.item,
          })
        }>
        <View style={styles.photo}>
          <Image
            source={{
              uri: itemData.item.image,
            }}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View
          style={{
            backgroundColor: 'whitesmoke',
            padding: 10,
          }}>
          <TextComp
            bold
            numberOfLines={1}
            style={{fontSize: 16}}
            ellipsizeMode="tail">
            {itemData.item.name}
          </TextComp>
          <TextComp>{itemData.item.date}</TextComp>
        </View>
      </TouchableOpacity>
    );

  renderEmpty = () => (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: 30,
        borderRadius: 15,
      }}>
      <>
        <FontAwesome5 name="history" size={70} color={Colors.primaryColor} />
        <View
          style={{
            ...styles.slash,
            borderColor: Colors.primaryColor,
            marginTop: 60,
          }}
        />
        <View
          style={{
            ...styles.slash,
            borderColor: 'white',
            marginTop: 68,
            borderWidth: 3,
            width: 100,
          }}
        />
      </>
      <TextComp style={{fontSize: 16, marginTop: 10}}>
        Your parking history will appear here
      </TextComp>
    </View>
  );

  render() {
    const PARKING_HISTORY = [
      {
        name: 'Point 90',
        image:
          'data:image/jpeg;base64,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',
        date: 'Jan 12, 2021',
      },
      {
        name: 'Cairo Festival City',
        image:
          'https://images.squarespace-cdn.com/content/v1/587e8c8febbd1af57a81deff/1499297234809-S88TB4HNJM6Z34NKUK4C/ke17ZwdGBToddI8pDm48kMxsssW085UEhtchXy-ANxN7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hZPx-jNbZA_TaS-5l2nNKFO34f98NSZoEbqz8SI9N3o1lJc_zfHTsPidpMtCpnTRw/image-asset.jpeg?format=1500w',
        date: 'Jul 29, 2020',
      },
    ];

    return (
      <>
        <SafeAreaView style={{backgroundColor: Colors.secondary}} />
        <SafeAreaView style={styles.screen}>
          <Header
            centerComponent={
              <TextComp style={{color: 'white', fontSize: 20}}>
                Profile
              </TextComp>
            }
            rightComponent={
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Logout', 'Are you sure you want to logout?', [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'Log Out',
                      style: 'destructive',
                      onPress: () => {
                        this.props.logout();
                      },
                    },
                  ]);
                }}>
                <MaterialIcons name="logout" size={23} color="white" />
              </TouchableOpacity>
            }
          />
          <ScrollView overScrollMode="never">
            <View style={styles.container}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.circle}>
                  <TextComp style={{fontSize: 50, color: 'white'}}>
                    {this.props.user.fullName.charAt(0).toUpperCase()}
                  </TextComp>
                </View>
                <TextComp black style={{fontSize: 35, color: Colors.secondary}}>
                  {this.props.user.fullName}
                </TextComp>
                <TextComp
                  style={{color: Colors.secondary, fontSize: 16, marginTop: 3}}>
                  {this.props.user.email}
                </TextComp>
              </View>
            </View>
            <CarDetails car={this.props.user.carDetails} current />
            <CarDetails
              car={{
                make: 'Renault',
                model: 'Logan',
                color: 'black',
                licensePlate: 'قوع ٧٣٤',
              }}
            />

            <View style={styles.container}>
              <View
                style={{
                  ...styles.row,
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}>
                <TextComp bold style={{fontSize: 18}}>
                  Parking History
                </TextComp>
                {this.props.user.parkingHistory && (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('History')}>
                    <TextComp>See all</TextComp>
                  </TouchableOpacity>
                )}
              </View>
              <FlatList
                ListEmptyComponent={this.renderEmpty}
                data={this.props.user.parkingHistory}
                renderItem={this.renderHistory}
                keyExtractor={(item) => item.name}
                numColumns={2}
                scrollEnabled={false}
                initialNumToRender={2}
              />
            </View>
          </ScrollView>
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
  screenTitleContainer: {
    padding: 15,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
  },
  placeContainer: {
    width: 170,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  photo: {
    height: 120,
  },
  slash: {
    width: 85,
    borderWidth: 5,
    transform: [{rotate: '-45deg'}],
    position: 'absolute',
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
