import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import ENV from '../../env';

const MapPreview = (props) => {
  let imagePreviewURL;

  if (props.locations) {
    const center = props.markers
      ? ''
      : `center=${props.locations[0].lat},${props.locations[0].lng}&`;

    const zoom = `zoom=11&scale=2`;

    const size = `size=${Math.floor(
      Dimensions.get('window').width,
    )}x${Math.floor(Dimensions.get('window').height)}`;

    const updatedLocations = props.locations.filter(
      (location) => location.coordinates.lng !== props.selectedLocation.lng,
    );

    let markers = `&markers=color:red%7Csize:mid%7C${props.selectedLocation.lat},${props.selectedLocation.lng}`;

    updatedLocations.map((location) => {
      markers = markers.concat(
        `&markers=color:red%7Csize:tiny%7C${location.coordinates.lat},${location.coordinates.lng}`,
      );
    });

    imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?${center}${zoom}&${size}&maptype=roadmap${markers}&style=feature:poi%7Celement:labels%7Cvisibility:off&key=${ENV.googleApiKey}`;
  } else {
    imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.selectedLocation.lat
    },${props.selectedLocation.lng}&zoom=14&scale=2&size=${`${Math.floor(
      Dimensions.get('window').width,
    )}x300`}&maptype=roadmap&markers=color:red%7Csize:mid%7C${
      props.selectedLocation.lat
    },${
      props.selectedLocation.lng
    }&style=feature:poi%7Celement:labels%7Cvisibility:off&key=${
      ENV.googleApiKey
    }`;
  }

  return (
    <View style={{...styles.mapPreview, ...props.style}}>
      {props.locations || props.selectedLocation ? (
        <Image
          style={styles.image}
          source={{
            uri: imagePreviewURL,
          }}
        />
      ) : (
        props.children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default MapPreview;
