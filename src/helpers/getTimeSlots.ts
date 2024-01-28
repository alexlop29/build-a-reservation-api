// import { Response, ResponseError } from "../handlers";
// const moment = require("moment");

// let isGenerated = false;
// let timeSlots: string[];

// // may want to refactor to query a specific day!
// // improve error handling!

// // can use event emitter to run only once when the server comes up!

// const generateTimeSlots = (): string[] => {
//   console.log(`alex top of generateTimeSlots`);
//   let times = [];
//   let start = moment.startOf("day");
//   let end = moment.endOf("day");

//   console.log(`alex mid of generateTimeSlots: ${start}, ${end}`);

//   while (start <= end) {
//     times.push(start);
//     start.add("m", 15);
//   }

//   return times;
// };

// const getTimeSlots = (): string[] => {
//   if (isGenerated) {
//     return timeSlots;
//   } else {
//     console.log(`alex top of else in getTimeSlots`);
//     timeSlots = generateTimeSlots();
//     console.log(`alex inside getTimeSlots: ${timeSlots}`);
//     isGenerated = true;
//     return timeSlots;
//   }
// };
// // Thought: If we memoize all time slots broken down into 15min increments?
// // how do we efficently remove the booked time slots?
// // well, we could simply pop the matching results?

// class TimeSlots {
//   isCalculated = false;
//   times: string[] = [];
//   start = moment().hour(0).minute(0).second(0).format("HH:mm");
//   end = moment().hour(23).minute(45).second(0).format("HH:mm");

//   constructor() {}

//   get() {}

//   calculate(): Response | ResponseError {
//     try {
//       let currentMoment = moment(this.start, "HH:mm");
//       while (currentMoment.format("HH:mm") <= this.end) {
//         this.times.push(currentMoment.format("HH:mm"));
//         currentMoment.add(15, "minutes");
//       }
//       this.isCalculated = true;
//       return new Response(200, "OK");
//     } catch (error) {
//       throw new ResponseError(500, "Internal Server Error");
//     }
//   }
// }

// // Inefficient and Slow!
// // Need to rethink generating availability efficiently

// // May be able to generate it for a single day(?)
// // pointless calculation

// // maybe we can just split existing availabilities by the new bookings
// // Seems most efficient

// class TimeSlots2 {
//   constructor() {}
// }

// // Should have the ability to query a provider by time

// // availabilityByDay()
// // sunday january 28, 2022
// // looks for all bookings on that date
// // retrieves availabilitiees.dayOfTheWeek
// // calculatedAvailability

// export { TimeSlots };

// export { getTimeSlots };
