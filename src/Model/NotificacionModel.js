import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    sector: {
      type: String,
      required: true,
    },
    type: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    icon: { type: String, required: true },
    isRead: { type: Boolean, default: false },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "recipientModel",
    },

    recipientModel: {
      type: String,
      required: true,
      enum: ["Employee", "Pacient"],
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
