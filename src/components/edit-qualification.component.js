import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './myStyle.css';
import {estSiretValide, formValid, isValidDate} from '../tools/validation';
import moment from "moment";
import {AddressItem,
        PickItem,
        AddressInput,
        DocumentInput,
        ContactInput,
        Conditions,
        EstablishedNeeds,
        NeedsToBeDefined,
        OtherInformation} from './create-qualification.component';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export default class EditQualification extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onChangeTVDate = this.onChangeTVDate.bind(this);
    this.onChangeInstDate = this.onChangeInstDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);

    this.state = {

      siret: '',
      corporatename: '',
      sitename: '',
      street: '',
      city: '',
      code: 75000,
      country: '',

      usage: 2,
      pdl: '',
      s_enedis: 4,
      project_ad_inf: '',

      contact_lastname: '',
      contact_firstname: '',
      contact_phone: '',
      contact_email: '',

      documents_elec_bill: 1,
      documents_rib: 0,
      documents_authorization: 0,
      documents_works_plan: 1,

      charger_needs_nb_s_7kw_c: 0,
      charger_needs_nb_d_7kw_c: 0,
      charger_needs_nb_s_22kw_c: 0,
      charger_needs_nb_d_22kw_c: 0,
      charger_needs_nb_sh_7kw_c: 0,
      charger_needs_other_data: '',

      other_needs_charging_time: 1,
      other_needs_nb_vehicules: 0,
      other_needs_nb_charges: 0,
      other_needs_allowed_access_days: 1,

      other_information_installation_type: 1,
      other_information_signalling: 1,
      other_information_station_type: 1,
      other_information_billing_conditions: 1,

      comments: '',

      works_conditions_technical_visite_date: '',
      works_conditions_installation_date: '',
      works_conditions_access_restrictions: '',
      works_conditions_prevention_plan: '',

      formErrors: {
        siret: "",
        contact_email: "",
        works_conditions_technical_visite_date:'',
        works_conditions_installation_date:''

      }
    }
  }

  componentDidMount() {
    axios.get('https://backend-eveci.herokuapp.com/qualifications/'+this.props.match.params.id)
      .then(response => {

        console.log(response.data.works_conditions.technical_visite_date);

        this.setState({

          siret: response.data.siret,
          corporatename: response.data.corporatename,
          sitename: response.data.sitename,
          street: response.data.street,
          city: response.data.city,
          code: response.data.code,
          country: response.data.country,

          usage: response.data.usage,
          pdl: response.data.pdl,
          s_enedis: response.data.s_enedis,
          project_ad_inf: response.data.project_ad_inf,

          contact_lastname: response.data.contact.lastname,
          contact_firstname: response.data.contact.firstname,
          contact_phone: response.data.contact.phone,
          contact_email: response.data.contact.email,

          documents_elec_bill: response.data.documents.elec_bill,
          documents_rib: response.data.documents.rib,
          documents_authorization: response.data.documents.authorization,
          documents_works_plan: response.data.documents.works_plan,

          charger_needs_nb_s_7kw_c: response.data.charger_needs.nb_s_7kw_c,
          charger_needs_nb_d_7kw_c: response.data.charger_needs.nb_d_7kw_c,
          charger_needs_nb_s_22kw_c: response.data.charger_needs.nb_s_22kw_c,
          charger_needs_nb_d_22kw_c: response.data.charger_needs.nb_d_22kw_c,
          charger_needs_nb_sh_7kw_c: response.data.charger_needs.nb_sh_7kw_c,
          charger_needs_other_data: response.data.charger_needs.other_data,

          other_needs_charging_time: response.data.other_needs.charging_time,
          other_needs_nb_vehicules: response.data.other_needs.nb_vehicules,
          other_needs_nb_charges: response.data.other_needs.nb_charges,
          other_needs_allowed_access_days: response.data.other_needs.allowed_access_days,

          other_information_installation_type: response.data.other_information.installation_type,
          other_information_signalling: response.data.other_information.signalling,
          other_information_station_type: response.data.other_information.station_type,
          other_information_billing_conditions: response.data.other_information.billing_conditions,

          comments: response.data.comments,

          works_conditions_technical_visite_date: new Date(response.data.works_conditions.technical_visite_date),
          works_conditions_installation_date: new Date(response.data.works_conditions.installation_date),
          works_conditions_access_restrictions: response.data.works_conditions.access_restrictions,
          works_conditions_prevention_plan: response.data.works_conditions.prevention_plan
        })
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onChange(e) {
    e.preventDefault();
    let formErrors =  this.state.formErrors;

    if(e.target.id === "siret"){
      formErrors.siret = (estSiretValide(e.target.value))?'':'Siret non valide';
    }

    if(e.target.id === "contact_email"){
      formErrors.contact_email = (emailRegex.test(e.target.value))?'':'Email non valide';
    }

    this.setState({
      formErrors,
      [e.target.id]: e.target.value
    });
  }

  onChangeCheckbox(e) {

    this.setState({
      [e.target.id]: (e.target.checked)?1:0
    });
  }

  onChangeTVDate(date) {
    let formErrors =  this.state.formErrors;

    formErrors.works_conditions_technical_visite_date = (isValidDate(moment(date).format("MM/DD/YYYY")))?'':'Date non valide';

    this.setState({
      formErrors,
      works_conditions_technical_visite_date: date
    });
  }

  onChangeInstDate(date) {
    let formErrors =  this.state.formErrors;

    formErrors.works_conditions_installation_date = (isValidDate(moment(date).format("MM/DD/YYYY")))?'':'Date non valide';

    this.setState({
      formErrors,
      works_conditions_installation_date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if(! formValid(this.state.formErrors)){
      console.error("Invalid form");
      return;
    }

    const qualification = {
      siret: this.state.siret,
      corporatename: this.state.corporatename,
      sitename: this.state.sitename,
      street: this.state.street,
      city: this.state.city,
      code: this.state.code,
      country: this.state.country,

      usage: this.state.usage,
      pdl: this.state.pdl,
      s_enedis: this.state.s_enedis,
      project_ad_inf: this.state.project_ad_inf,

      contact_lastname: this.state.contact_lastname,
      contact_firstname: this.state.contact_firstname,
      contact_phone: this.state.contact_phone,
      contact_email: this.state.contact_email,

      documents_elec_bill: this.state.documents_elec_bill,
      documents_rib: this.state.documents_rib,
      documents_authorization: this.state.documents_authorization,
      documents_works_plan: this.state.documents_works_plan,

      charger_needs_nb_s_7kw_c: this.state.charger_needs_nb_s_7kw_c,
      charger_needs_nb_d_7kw_c: this.state.charger_needs_nb_d_7kw_c,
      charger_needs_nb_s_22kw_c: this.state.charger_needs_nb_s_22kw_c,
      charger_needs_nb_d_22kw_c: this.state.charger_needs_nb_d_22kw_c,
      charger_needs_nb_sh_7kw_c: this.state.charger_needs_nb_sh_7kw_c,
      charger_needs_other_data: this.state.charger_needs_other_data,

      other_needs_charging_time: this.state.other_needs_charging_time,
      other_needs_nb_vehicules: this.state.other_needs_nb_vehicules,
      other_needs_nb_charges: this.state.other_needs_nb_charges,
      other_needs_allowed_access_days: this.state.other_needs_allowed_access_days,

      other_information_installation_type: this.state.other_information_installation_type,
      other_information_signalling: this.state.other_information_signalling,
      other_information_station_type: this.state.other_information_station_type,
      other_information_billing_conditions: this.state.other_information_billing_conditions,

      comments: this.state.comments,

      works_conditions_technical_visite_date: this.state.works_conditions_technical_visite_date,
      works_conditions_installation_date: this.state.works_conditions_installation_date,
      works_conditions_access_restrictions: this.state.works_conditions_access_restrictions,
      works_conditions_prevention_plan: this.state.works_conditions_prevention_plan
    }

    console.log(qualification);

    axios.post('https://backend-eveci.herokuapp.com/qualifications/update/' + this.props.match.params.id, qualification)
      .then(res => {
        console.log(res.data);
        window.location = '/';
      });

  }

  onClear(e) {
    e.preventDefault();

  }

  render() {
    return (
      <div className="container">
        <div className="card"><div className="card-body">
            <h3 className="third-color-engie">Qualification d'infrastructure de recharge</h3>
            <h4 className="primary-color-engie">1. Identification du projet</h4>
            <AddressItem label="SIRET" id="siret" value={this.state.siret} errorMessage={this.state.formErrors.siret} placeholder="" readonly="true" onChange={this.onChange}/>
            <AddressItem label="Entreprise" id="corporatename" value={this.state.corporatename} errorMessage="" placeholder="" readonly="true" onChange={this.onChange}/>
            <AddressItem label="Site" id="sitename" value={this.state.sitename} errorMessage="" placeholder="" readonly="true" onChange={this.onChange}/>
            <AddressInput
              street={this.state.street}
              city={this.state.city}
              code={this.state.code}
              country={this.state.country}
              onChange={this.onChange}
              />
            <div className="row form-group justify-content-start">
              <label className="col-xl-4 col-form-label">Usage</label>
              <div className="col-xl-4">
                <select class="form-control" value={this.state.usage} onChange={this.onChange}>
                  <option value="1">Flotte à usage professionnel et personnel</option>
                  <option value="2">Parking en copropriété</option>
                  <option value="3">Parking en maison individuelle</option>
                  <option value="4">Parking public</option>
                </select>
              </div>
            </div>
            <AddressItem id="pdl" label="Numéro de PDL" value={this.state.pdl} errorMessage="" onChange={this.onChange} placeholder="" readonly="true" />
            <div className="row form-group justify-content-start">
              <label className="col-xl-4 col-form-label">Segment ENEDIS</label>
              <div className="col-xl-4">
                <select class="form-control" id="s_enedis" value={this.state.s_enedis} onChange={this.onChange}>
                  <option value="1">C1</option>
                  <option value="2">C2</option>
                  <option value="3">C3</option>
                  <option value="4">C4</option>
                  <option value="5">C5</option>
                </select>
              </div>
            </div>
            <div className="row form-group justify-content-start">
              <label className="col-xl-4 col-form-label">Précisions le cas échéant</label>
              <div className="col-xl-4">
                <textarea id="project_ad_inf" value={this.state.project_ad_inf} className="form-control" onChange={this.onChange}/>
              </div>
            </div>
            <br/>
            <ContactInput
              contact_lastname={this.state.contact_lastname}
              contact_firstname= {this.state.contact_firstname}
              contact_phone={this.state.contact_phone}
              contact_email= {this.state.contact_email}
              contact_email_error = {this.state.formErrors.contact_email}
              onChange={this.onChange}/>
            <br/>
            <div className="card"><div className="card-body">
            <h5 className="secondary-color-engie">Documents à joindre pour administration du dossier</h5>
            <DocumentInput inputid="documents_elec_bill" value={this.state.documents_elec_bill} label="Copie de la dernière facture d'électricité" onChange={this.onChangeCheckbox}/>
            <DocumentInput inputid="documents_rib" value={this.state.documents_rib} label="RIB" onChange={this.onChangeCheckbox}/>
            <DocumentInput inputid="documents_authorization" value={this.state.documents_authorization} label="Autorisation par mail" onChange={this.onChangeCheckbox}/>
            <DocumentInput inputid="documents_works_plan" value={this.state.documents_works_plan} label="Plan de prévention travaux" onChange={this.onChangeCheckbox}/>
            </div></div>
            <br/>
            <h4 className="primary-color-engie">2. Dimensionnement du parc de recharge</h4>
            <EstablishedNeeds
              nb_s_7kw_c = {this.state.charger_needs_nb_s_7kw_c}
              nb_d_7kw_c = {this.state.charger_needs_nb_d_7kw_c}
              nb_s_22kw_c = {this.state.charger_needs_nb_s_22kw_c}
              nb_d_22kw_c = {this.state.charger_needs_nb_d_22kw_c}
              nb_sh_7kw_c = {this.state.charger_needs_nb_sh_7kw_c}
              other_data = {this.state.charger_needs_other_data}
              onChange={this.onChange}/>
            <br/>
            <NeedsToBeDefined
              charging_time = {this.state.other_needs_charging_time}
              access_days = {this.state.other_needs_allowed_access_days}
              other_needs_nb_vehicules={this.state.other_needs_nb_vehicules}
              other_needs_nb_charges= {this.state.other_needs_nb_vehicules}
              onChange={this.onChange}
              />
            <br/>
            <OtherInformation
              installation_type = {this.state.other_information_installation_type}
              signalling = {this.state.other_information_signalling}
              station_type = {this.state.other_information_station_type}
              billing_conditions = {this.state.other_information_billing_conditions}
              onChange={this.onChange}/>
            <br/>
            <div className="card"><div className="card-body">
            <div className="row form-group justify-content-start">
              <label className="col-xl-4 col-form-label"><h5 className="secondary-color-engie">Commentaires</h5></label>
              <div className="col-xl-4">
                <textarea value={this.state.comments} className="form-control" id = "comments" onChange={this.onChange}/>
              </div>
            </div>
            </div></div>
            <br/>
            <h4 className="primary-color-engie">3. Conditions de réalisation des travaux</h4>
            <Conditions
              works_conditions_technical_visite_date = {this.state.works_conditions_technical_visite_date}
              works_conditions_installation_date = {this.state.works_conditions_installation_date}
              works_conditions_access_restrictions = {this.state.works_conditions_access_restrictions}
              works_conditions_prevention_plan = {this.state.works_conditions_prevention_plan}
              onChange={this.onChange}
              onChangeTVDate = {this.onChangeTVDate}
              onChangeInstDate = {this.onChangeInstDate}
              tverrorMessage = {this.state.formErrors.works_conditions_technical_visite_date}
              iderrorMessage = {this.state.formErrors.works_conditions_installation_date}
              />
            <br/>
            <div class="btn-group float-right form-group">
              <button type="submit" onClick={this.onSubmit} className="btn btn-primary">Valider la qualification</button>
              <button type="reset" className="btn btn-outline-secondary">Recommencer</button>
            </div>
          </div></div>
          <br/>
        </div>
    )
  }
}
