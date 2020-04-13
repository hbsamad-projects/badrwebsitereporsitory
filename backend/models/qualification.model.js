const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const qualificationSchema = new Schema({
  siret: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  corporatename: { type: String, required: true },
  sitename: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  code: { type: Number, required: true },
  country: { type: String, required: true },
  usage: { type: Number },
  pdl: { type: String },
  s_enedis: { type: Number },
  project_ad_inf: { type: String },
  contact : {
    lastname: { type: String },
    firstname: { type: String },
    phone: { type: String },
    email: { type: String }
  },
  documents : {
    elec_bill: {type: Number },
    rib: {type: Number },
    authorization: {type: Number },
    works_plan: {type: Number }
  },
  charger_needs : {
    nb_s_7kw_c : {type: Number },
    nb_d_7kw_c : {type: Number },
    nb_s_22kw_c : {type: Number },
    nb_d_22kw_c : {type: Number },
    nb_sh_7kw_c : {type: Number },
    other_data : {type: String }
  },
  other_needs : {
    charging_time : {type: Number},
    nb_vehicules : {type: Number},
    nb_charges : {type: Number},
    allowed_access_days : {type: Number}
  },
  other_information : {
    installation_type : {type: Number},
    signalling : {type: Number},
    station_type : {type: Number},
    billing_conditions : {type: Number}
  },
  comments : { type: String },
  works_conditions : {
    technical_visite_date : {type : Date},
    installation_date : {type : Date},
    access_restrictions : {type: String },
    prevention_plan : {type: String }
  }

}, {
  timestamps: true,
});

const Qualification = mongoose.model('Qualification', qualificationSchema);

module.exports = Qualification;
