import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './myStyle.css';
import {estSiretValide, formValid, isValidDate} from '../tools/validation';
import moment from "moment";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class AddressItem extends Component {
  render() {
    return (
        <div className="row form-group justify-content-start">
            <label className="col-xl-4 col-form-label">{this.props.label}</label>
            <div className="col-xl-4">
              <input
                type="text"
                className = {(this.props.errorMessage.length > 0) ? "form-control is-invalid" : "form-control"}
                id = {this.props.id}
                defaultValue={this.props.value}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}/>
            </div>
            {this.props.errorMessage.length > 0 && (
            <div className="col-xl-4">
              <span className="text-danger">{this.props.errorMessage}</span>
            </div>
            )}
        </div>
      );
  }
}

export class PickItem extends Component {
    render() {
      return (
        <div className="row form-group justify-content-start">
        <label className="col-xl-4 col-form-label">{this.props.label}</label>
        <div className="col-xl-4">
            <select className="form-control" value={this.props.value} id = {this.props.id} onChange={this.props.onChange}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">plus de 10</option>
            </select>
        </div>
        </div>
      );
    }
}

export class AddressInput extends Component {
  render() {
    return (
      <div>
      <AddressItem id="street" label="Adresse" value={this.props.street} errorMessage="" placeholder="" readonly="true" onChange={this.props.onChange} />
      <AddressItem id="city" label="Ville" value={this.props.city} errorMessage="" placeholder="" readonly="true" onChange={this.props.onChange} />
      <AddressItem id="code" label="Code postal" value={this.props.code} errorMessage="" placeholder="" readonly="true" onChange={this.props.onChange} />
      <AddressItem id="country" label="Pays" value={this.props.country} errorMessage="" placeholder="" readonly="true" onChange={this.props.onChange} />
      </div>
    );
  }
}

export class DocumentInput extends Component {
  render() {
    return (
      <div class="custom-control custom-switch">
        <input type="checkbox" checked={this.props.value} class="custom-control-input" id={this.props.inputid} onChange={this.props.onChange} />
        <label class="custom-control-label" for={this.props.inputid}>{this.props.label}</label>
      </div>
    );
  }
}

export class ContactInput extends Component {
  render() {
    return (
      <div className="card"><div className="card-body">
      <h5 className="secondary-color-engie">Contact opérationnel du projet</h5>
      <AddressItem id="contact_lastname" label="Nom" value={this.props.contact_lastname} errorMessage="" placeholder="" readonly="true" onChange={this.props.onChange} />
      <AddressItem id="contact_firstname" label="Prénom" value={this.props.contact_firstname} errorMessage="" placeholder="" readonly="true" onChange={this.props.onChange} />
      <AddressItem id="contact_phone" label="Téléphone" value={this.props.contact_phone} errorMessage="" placeholder="" readonly="true" onChange={this.props.onChange} />
      <AddressItem id="contact_email" label="E-mail" value={this.props.contact_email}  errorMessage={this.props.contact_email_error} placeholder="" readonly="true" onChange={this.props.onChange} />
      </div></div>
    );
  }
}

export class Conditions extends Component {
  render() {
    return (
      <div className="card"><div className="card-body">
      <div className="row form-group justify-content-start">
        <label className="col-xl-4 col-form-label">Date souhaitée de visite technique </label>
        <div className="col-xl-4">
          <DatePicker
            selected={this.props.works_conditions_technical_visite_date}
            onChange={this.props.onChangeTVDate}
            className = {(this.props.tverrorMessage.length > 0) ? "form-control is-invalid" : "form-control"}/>
        </div>
      </div>
      <div className="row form-group justify-content-start">
        <label className="col-xl-4 col-form-label">Date souhaitée de l'installation </label>
        <div className="col-xl-4">
          <DatePicker
            selected={this.props.works_conditions_installation_date}
            onChange={this.props.onChangeInstDate}
            className = {(this.props.iderrorMessage.length > 0) ? "form-control is-invalid" : "form-control"}/>
        </div>
      </div>
      <AddressItem id="works_conditions_access_restrictions" label="Restrictions d'accès" errorMessage="" value={this.props.works_conditions_access_restrictions} placeholder="" readonly="true" onChange={this.props.onChange} />
      <AddressItem id="works_conditions_prevention_plan" label="Plan de prévention pour les travaux" errorMessage="" value={this.props.works_conditions_prevention_plan} placeholder="" readonly="true" onChange={this.props.onChange} />
      </div></div>
    );
  }
}

export class EstablishedNeeds extends Component {
  render() {
    return (
      <div className="card"><div className="card-body">
      <h5 className="secondary-color-engie">Nombre de bornes souhaitées</h5>
      <PickItem id="charger_needs_nb_s_7kw_c" label="Borne simple 7,4kW" value={this.props.nb_s_7kw_c}  placeholder="" readonly="true" onChange={this.props.onChange}/>
      <PickItem id="charger_needs_nb_d_7kw_c" label="Borne double 7,4kW" value={this.props.nb_d_7kw_c}  placeholder="" readonly="true" onChange={this.props.onChange}/>
      <PickItem id="charger_needs_nb_s_22kw_c" label="Borne simple 22kW" value={this.props.nb_s_22kw_c}  placeholder="" readonly="true" onChange={this.props.onChange}/>
      <PickItem id="charger_needs_nb_d_22kw_c" label="Borne double 22kW" value={this.props.nb_d_22kw_c}  placeholder="" readonly="true" onChange={this.props.onChange}/>
      <PickItem id="charger_needs_nb_sh_7kw_c" label="Borne 7,4kW en copropriété" value={this.props.nb_sh_7kw_c}  placeholder="" readonly="true" onChange={this.props.onChange}/>
      <div className="row form-group justify-content-start">
        <label className="col-xl-4 col-form-label">Autres, précisez</label>
        <div className="col-xl-4">
          <textarea className="form-control" value={this.props.other_data} id="charger_needs_other_data" onChange={this.props.onChange}/>
        </div>
      </div>
      </div></div>
    );
  }
}

export class NeedsToBeDefined extends Component {
  render() {
    return (
      <div className="card"><div className="card-body">
      <h5 className="secondary-color-engie">Besoins à définir</h5>
      <div className="row form-group justify-content-start">
        <label className="col-xl-4 col-form-label">Temps de charge acceptable pour 100km</label>
        <div className="col-xl-4">
          <select class="form-control" value={this.props.charging_time} id = "other_needs_charging_time" onChange={this.props.onChange}>
            <option value="1">Moins d'une heure</option>
            <option value="2">Moins de trois heures</option>
            <option value="3">Moins de cinq heures</option>
            <option value="4">Plus de cinq heures</option>
          </select>
        </div>
      </div>
      <PickItem id = "other_needs_nb_vehicules" label="Nombre de véhicules électriques" value={this.props.other_needs_nb_vehicules} placeholder="" readonly="true" onChange={this.props.onChange}/>
      <PickItem id = "other_needs_nb_charges" label="Nombre de charges par jour et par véhicule" value={this.props.other_needs_nb_charges} placeholder="" readonly="true" onChange={this.props.onChange}/>
      <div className="row form-group justify-content-start">
      <label className="col-xl-4 col-form-label">Jours d'accès à la recharge</label>
      <div className="col-xl-4">
      <select className="form-control" value={this.props.access_days} id = "other_needs_allowed_access_days" onChange={this.props.onChange}>
        <option value="1">Jours ouvrés uniquement</option>
        <option value="2">Weekend uniquement</option>
        <option value="3">Toute la semaine</option>
      </select>
      </div>
      </div>
      </div></div>
    );
  }
}

export class OtherInformation extends Component {
  render() {
    return (
      <div className="card"><div className="card-body">
      <h5 className="secondary-color-engie">Autres informations</h5>
      <div className="row form-group justify-content-start">
      <label className="col-xl-4 col-form-label">Type de pose</label>
      <div className="col-xl-4">
        <select class="form-control" value={this.props.installation_type} id = "other_information_installation_type" onChange={this.props.onChange}>
        <option value="1">A définir</option>
        <option value="2">Simple</option>
        <option value="3">Complexe</option>
      </select>
      </div>
      </div>
      <div className="row form-group justify-content-start">
      <label className="col-xl-4 col-form-label">Signalisation</label>
      <div className="col-xl-4">
        <select class="form-control" value={this.props.signalling} id = "other_information_signalling" onChange={this.props.onChange}>
        <option value="1">A définir</option>
        <option value="2">Oui</option>
        <option value="3">Non</option>
      </select>
      </div>
      </div>
      <div className="row form-group justify-content-start">
      <label className="col-xl-4 col-form-label">Type de borne</label>
      <div className="col-xl-4">
        <select class="form-control" value={this.props.station_type} id = "other_information_station_type" onChange={this.props.onChange}>
        <option value="1">A définir</option>
        <option value="2">Autostart</option>
        <option value="3">Contrôle d'accès</option>
      </select>
      </div>
      </div>
      <div className="row form-group justify-content-start">
      <label className="col-xl-4 col-form-label">Condition de facturation à la recharge</label>
      <div className="col-xl-4">
        <select class="form-control" value={this.props.billing_conditions} id = "other_information_billing_conditions" onChange={this.props.onChange}>
        <option value="1">A définir</option>
        <option value="2">Flotte d'entreprise</option>
        <option value="3">Public</option>
        <option value="4">Privé</option>
      </select>
      </div>
      </div>
      </div></div>
    );
  }
}

export default class CreateQualification extends Component {
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
        works_conditions_technical_visite_date:'Date non valide',
        works_conditions_installation_date:'Date non valide'

      }
    }
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

    axios.post('http://backend-eveci.herokuapp.com/qualifications/add', qualification)
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
            <h3 className="third-color-engie"><span>Qualification d'infrastructure de recharge</span></h3>
            <h4 className="primary-color-engie"><span>1. Identification du projet</span></h4>
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
