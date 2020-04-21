import React, { Component } from 'react';
import {CalculTurpe} from "../tools/CalculTurpe";
import {options} from "./fairoption.component";
import {options_consumptiondata} from "./consumptiondata.component";

export default class TurpeCalcResult extends Component {

  constructor(props) {
    super(props);

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      turpe: new CalculTurpe( this.props.turpecalcul.voltagedomain,
                                    this.props.turpecalcul.powersuscription,
                                    this.props.turpecalcul.metertype,
                                    this.props.turpecalcul.contracttype,
                                    this.props.turpecalcul.fairoption,
                                    this.props.turpecalcul.consumptiondata,
                                    this.props.turpecalcul.newuses
                                    ).evaluate()
    };

  }

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
  }

  pricePerKwh(){

    switch (this.props.turpecalcul.fairoption) {
      case "cusdt":
      case "lusdt":
        return    Number((this.state.turpe.sum * 100)
                /Number(this.props.turpecalcul.consumptiondata.energy)).toFixed(2);
        break;
      case "cuqpt":
      case "muqpt":
        return    Number((this.state.turpe.sum * 100)
                /(Number(this.props.turpecalcul.consumptiondata.echph)
                + Number(this.props.turpecalcul.consumptiondata.echch)
                + Number(this.props.turpecalcul.consumptiondata.echpe)
                + Number(this.props.turpecalcul.consumptiondata.echce))).toFixed(2);
        break;
      case "mudpt":
        return    Number((this.state.turpe.sum * 100)
                /(Number(this.props.turpecalcul.consumptiondata.echp)
                + Number(this.props.turpecalcul.consumptiondata.ecec))).toFixed(2);
        break;
      case "cuadt4c":
      case "luadt4c":
        return    Number((this.state.turpe.sum * 100)
                /(Number(this.props.turpecalcul.consumptiondata.echph)
                + Number(this.props.turpecalcul.consumptiondata.echch)
                + Number(this.props.turpecalcul.consumptiondata.echpe)
                + Number(this.props.turpecalcul.consumptiondata.echce))).toFixed(2);
        break;
    }
    return null;
  }

  getFairOption(){
    if(this.props.turpecalcul.powersuscription === "less36kva") return options.less36kva_options.filter(o => o.optioncode === this.props.turpecalcul.fairoption)[0].description;
    return options.more36kva_options.filter(o => o.optioncode === this.props.turpecalcul.fairoption)[0].description;
  }

  getConsumptionData(){

    var poweroptions = [];
    var energyoptions = [];

    switch (this.props.turpecalcul.fairoption) {
      case "cusdt":
      case "lusdt":
        poweroptions = options_consumptiondata.cusdt_lusdt.filter(o => o.optiontype === "power");
        energyoptions = options_consumptiondata.cusdt_lusdt.filter(o => o.optiontype === "energy");
        break;
      case "cuqpt":
      case "muqpt":
        poweroptions = options_consumptiondata.cuqpt_muqpt.filter(o => o.optiontype === "power");
        energyoptions = options_consumptiondata.cuqpt_muqpt.filter(o => o.optiontype === "energy");
        break;
      case "mudpt":
        poweroptions = options_consumptiondata.mudpt.filter(o => o.optiontype === "power");
        energyoptions = options_consumptiondata.mudpt.filter(o => o.optiontype === "energy");
        break;
      case "cuadt4c":
      case "luadt4c":
        poweroptions = options_consumptiondata.cuadt4c_luadt4c.filter(o => o.optiontype === "power");
        energyoptions = options_consumptiondata.cuadt4c_luadt4c.filter(o => o.optiontype === "energy");
        break;
    }

    const outputenergy = energyoptions.map((option, index) => {
      return(
        <span>{option.description + " [" + this.props.turpecalcul.consumptiondata[option.optioncode] + "] kWh"}<br/></span>
      );
    });

    const outputpower = energyoptions.map((option, index) => {
      return(
        <span>{option.description + " [" + this.props.turpecalcul.consumptiondata[option.optioncode] + "] kWh"}<br/></span>
      );
    });

    return (
      <li><span className="FieldLabel">Données de puissance et d'énergies : </span>
        <ul>
          <li>
           {outputenergy}
          </li>
          <li>
            {outputpower}
          </li>
        </ul>
      </li>
    );
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {

    return (
      <div className="container">
      <div className="card"><div className="card-body">
      <div id="fond" className="Calculator-stepContent">
        <div className="Calculator-recapCategory">
    		  <h5 className="Title Title--medium-small Title--redSpot">Caractéristiques de la simulation</h5>
          <ul className="Calculator-recapList">
              <li><span className="FieldLabel">Domaine de tension de raccordement : </span>{this.props.turpecalcul.voltagedomain === "lv"?"BT":""}</li>
              <li><span className="FieldLabel">Type de contrat : </span>{this.props.turpecalcul.contracttype === "CU"?"Contrat Unique (CU) : contrat avec le fournisseur incluant l'accès aux réseaux":"Contrat d'accès aux réseaux de distribution/transport (CARD/CART)"}</li>
              <li><span className="FieldLabel">Plage de puissance souscrite :</span>{this.props.turpecalcul.powersuscription === "less36kva"?"Inférieure ou égale à 36 kVA":"Supérieure à 36 kVA"}</li>
              <li><span className="FieldLabel">Dispositif de comptage : </span>
                <ul><li><span className="FieldLabel">Régime de propriété du compteur : </span>{this.props.turpecalcul.metertype === "rented"?"Location du compteur":"Propriétaire du compteur ou aucun compteur"}</li></ul>
              </li>
              <li><span className="FieldLabel">Option tarifaire : </span>{this.getFairOption()}</li>
              {this.getConsumptionData()}
          </ul>
        </div>

        <div className="Calculator-recapCategory">
          <h5 className="Title Title--medium-small Title--redSpot">Facture annuelle d'utilisation des réseaux publics d'électricité</h5>
          <p className="info">Les montants exprimés sont hors taxes.</p>
          <table className="Calculator-recapTable">
            <tbody><tr>
                <td>Composante de gestion (€)</td>
                <td className="result">{this.state.turpe.cg.toFixed(2)}</td>
              </tr>
                              <tr>
                <td>Composante de soutirage (€)</td>
                <td className="result">{(this.state.turpe.cse+this.state.turpe.csp).toFixed(2)}</td>
              </tr>
                              <tr>
                <td className="indent">Part Puissance</td>
                <td className="result">{this.state.turpe.csp.toFixed(2)}</td>
              </tr>
                              <tr>
                <td className="indent">Part Énergie</td>
                <td className="result">{this.state.turpe.cse.toFixed(2)}</td>
              </tr>
                              <tr>
                <td>Composante de comptage (€)</td>
                <td className="result">{this.state.turpe.cc.toFixed(2)}</td>
              </tr>
                                      <tr>
                <td>Contribution tarifaire d’acheminement (€)</td>
                <td className="result">{this.state.turpe.cta.toFixed(2)}</td>
              </tr>
                              <tr className="Calculator-recapResult">
                <td>TOTAL (€)</td>
                <td className="result">{this.state.turpe.sum}</td>
              </tr>
                              <tr className="light">
                <td>Soit, en c€/kWh</td>
                <td className="result">{this.pricePerKwh()}</td>
              </tr>
          </tbody></table>
          <div className="Calculator-nextStep">
          </div>
        </div>
        </div>
        </div>
      </div>
      <div className="buttons-container">
        <button onClick={this.back}>Précédent</button>
      </div>
      </div>
    );
  }
}
