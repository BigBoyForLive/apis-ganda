const mongoose = require("mongoose");

const reservationModel = new mongoose.Schema(
  {
    description: {
      type: String,
      default: "",
      trim: true,
    },

    hote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tables",
      },
    ],
    image: {
      type: String,
      trim: true,
    },
    rate: {
      type: Number,
      trim: true,
    },
    buffet: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    heure: {
      type: Date,
      default: Date.now(),
    },
    places: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      required: [true, "veuillez entrer le nom du menu"],
    },
    price: {
      type: Number,
      required: [true, "veuillez entrer  le prix  menu "],
    },
    lng: {
      type: String,
      // required: true,
    },
    lat: {
      type: String,
      // required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 10 * 24 * 60 * 60 },
    }, // efface automatiquement de la db apres 10jours
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservations", reservationModel);
