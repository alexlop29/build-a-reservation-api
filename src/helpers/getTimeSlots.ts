const moment = require("moment");

let isGenerated = false;
let timeSlots: string[];

// may want to refactor to query a specific day!
const generateTimeSlots = (): string[] => {
  let times = [];
  let start = moment.startOf("day");
  let end = moment.endOf("day");

  while (start <= end) {
    times.push(start);
    start.add("m", 15);
  }

  return times;
};

const getTimeSlots = (): string[] => {
  if (isGenerated) {
    return timeSlots;
  } else {
    timeSlots = generateTimeSlots();
    isGenerated = true;
    return timeSlots;
  }
};
// Thought: If we memoize all time slots broken down into 15min increments?
// how do we efficently remove the booked time slots?
// well, we could simply pop the matching results?

export { getTimeSlots };
