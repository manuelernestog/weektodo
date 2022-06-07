import { rrulestr } from "rrule";

export default {
    
  checkIfWasGenerate(repeatingEvent, day) {
    const rule = rrulestr(repeatingEvent.repeating_rule);

    
    console.log(rule, day);
  },
};
