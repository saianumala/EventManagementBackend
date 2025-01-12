import mongoose, { Document } from "mongoose";

interface EventDocument extends Document {
  title: string;
  description: string;
  date: Date;
  otherCategory?: string;
  time: string;
  location?: string;
  isOnline: boolean;
  organizer: string;
  attendees: string[];
  category: string;
  maxAttendees: number;
}

const eventSchema = new mongoose.Schema(
  {
    eventCategory: {
      type: String,
      enum: ["conference", "webinar", "workshop", "meetup", "other"],
      default: "meetup",
      required: true,
    },
    otherCategory: {
      type: String,
      required: function (this: EventDocument) {
        return this.otherCategory === "other";
      },
    },
    eventName: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    location: {
      type: String,
      required: function (this: EventDocument) {
        return !this.isOnline; // if the event is online location is not required
      },
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//
const EventAttendanceSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    leftAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
export const Attendance = mongoose.model("Attendance", EventAttendanceSchema);
