import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EventItem = ({ date, title }) => {
  return (
    <View style={styles.eventContainer}>
      <View style={styles.date}>
        <Text>{date}</Text>
      </View>
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 9,
    margin: 4,
    backgroundColor: "#FFF",
    height: 100,
    width: "95%",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    alignItems: "center",
    fontSize: 18,
    fontWeight: 'bold',
    width: '20%',
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
  },
});

export default EventItem;
