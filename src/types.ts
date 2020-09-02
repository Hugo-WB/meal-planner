



// TYPES FOR CALENDAR:

// export type UnformattedEvents = string[][]
export type UnformattedEvents = any

export interface FormattedEvent {
  title:string,
  start:string,
  end:string,
}
export type FormattedEvents = FormattedEvent[]