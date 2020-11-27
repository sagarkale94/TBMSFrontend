export interface Movie {
  _id: string,
  description: string,
  name: string,
  posterUrl: string,
  dates: {
    date: Date,
    timeSlots: string[]
  }[]
}
