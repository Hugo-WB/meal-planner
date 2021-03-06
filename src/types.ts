// TYPES FOR LOCAL DATA:

export interface User {
  uid: string;
  username: string;
}
export interface LocalData {
  currentPage: string;
  loggedIn:boolean;
  user: User;
}
// TYPES FOR CALENDAR:

export interface Event {
  title: string;
  start: [number, number]; // TIME 0 to 23, then minutes 0-60
  end: [number, number];
  weekDay: number; // 0-6 MONDAY-SUNDAY
}
export type Events = Event[];

export interface FormattedEvent {
  title:string,
  start:string,
  end:string,
}
export type FormattedEvents = FormattedEvent[]

export interface PlanFormInputs {
  breakfast:boolean,
  lunch:boolean,
  dinner:boolean,
}
