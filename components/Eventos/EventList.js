import React from "react";
import { ScrollView } from "react-native";
import EventItem from "./EventItem";

const EventList = ({ events }) => {
  return (
    <ScrollView>
      {events.map((event, index) => (
        <EventItem key={index} date={event.date} title={event.tittle} />
      ))}
    </ScrollView>
  );
};

export default EventList;
