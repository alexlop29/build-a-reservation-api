/*
Need to adjust moment usage across files
Just want 
*/
const sampleProvider = {
  firstName: "John",
  lastName: "Tucker",
  email: "jtucker@gmail.com",
  phone: "9127772389",
  availabilties: [
    {
      weekDay: "Sunday",
      startAt: "09:00",
      endAt: "17:00",
    },
    {
      weekDay: "Monday",
      startAt: "09:00",
      endAt: "17:00",
    },
    {
      weekDay: "Friday",
      startAt: "09:00",
      endAt: "17:00",
    },
  ],
};

const existingProvider = {
  firstName: "Steph",
  lastName: "Curry",
  email: "scurry@gmail.com",
  phone: "9123123678",
  availabilties: [
    {
      weekDay: "Monday",
      startAt: "09:00",
      endAt: "17:00",
    },
    {
      weekDay: "Tuesday",
      startAt: "09:00",
      endAt: "17:00",
    },
    {
      weekDay: "Wednesday",
      startAt: "09:00",
      endAt: "17:00",
    },
    {
      weekDay: "Thursday",
      startAt: "09:00",
      endAt: "17:00",
    },
    {
      weekDay: "Friday",
      startAt: "09:00",
      endAt: "17:00",
    },
    {
      weekDay: "Saturday",
      startAt: "09:00",
      endAt: "17:00",
    },
    {
      weekDay: "Sunday",
      startAt: "09:00",
      endAt: "17:00",
    },
  ],
};

export { sampleProvider, existingProvider };
