import React, { Component } from 'react';
import Stepper from "./stepper.component";
import VoltageDomain from "./voltagedomain.component";
import PowerSuscription from "./powersuscription.component";
import MeterType from "./metertype.component";
import ContractType from "./contracttype.component";
import FairOption from "./fairoption.component";
import ConsumptionData from "./consumptiondata.component";
import NewUses from "./newuses.component";
import TurpeCalcResult from "./turpecalcresult.component";
import '../App.scss';

const steps = [
  {
    name: "DOMAINE DE TENSION DE RACCORDEMENT",
    description: "Sélectionner le domaine de tension auquel vous êtes raccordé"
  },
  {
    name: "PUISSANCE SOUSCRITE",
    description: "Sélectionner le niveau de puissance souscrit auprès de votre fournisseur"
  },
  {
    name: "DISPOSITIF DE COMPTAGE",
    description: "Régime de propriété du compteur"
  },
  {
    name: "TYPE DE CONTRAT",
    description: "Sélectionner votre type de contrat"
  },
  {
    name: "OPTION TARIFAIRE",
    description: "Sélectionner l'option tarifaire d'acheminement souscrite"
  },
  {
    name: "DONNÉES DE CONSOMMATION",
    description: "Saisir la quantité d'énergie et la puissance souscrite correspondants à votre consommation annuelle"
  },
  {
    name: "NOUVEAUX USAGES",
    description: "Saisir les nouveaux usages"
  },
  {
    name: "RESULTATS",
    description: "Découvrir les résultats"
  }
];

export default class Turpe extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);

    this.state = {
      currentStep: 1,

      voltagedomain: 'lv',
      powersuscription: 'less36kva',
      metertype: 'rented',
      contracttype: 'CU',
      fairoption: "cusdt",
      consumptiondata: {},
      newuses: {
        nb_7:0,
        nb_22:0,
        nb_hc_hc:0,
        nb_hc_hp:0,
        foisonnement:0.5,
        safety:0
      }

    };
  }

  componentDidMount(){
    const stateCopy = this.state.powersuscription;

    this.setState({
      fairoption:(stateCopy === "less36kva")? "cusdt": "cuadt4c"
    });
  }

  /*componentDidUpdate(){
    const stateCopy = this.state.powersuscription;

    this.setState({
      fairoption:(stateCopy === "less36kva")? "cusdt": "cuadt4c"
    });
  }*/

  nextStep = () => {
    const { currentStep } = this.state;
    if(currentStep >= steps.length) return;
    this.setState({
      currentStep: currentStep + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { currentStep } = this.state;
    if(currentStep <= 1) return;
    this.setState({
      currentStep: currentStep - 1
    });
  };

  handleChange = input => e => {

    var fairoption;
    if(input === 'powersuscription'){
      (e.target.value === "less36kva")?fairoption="cusdt":fairoption="cuadt4c";
      this.setState({
        [input]: e.target.value,
        fairoption:fairoption
      });
    }else if(input === 'fairoption'){
      this.setState({
        [input]: e.target.value,
        consumptiondata:{}
      });
    }else{
      this.setState({
        [input]: e.target.value
      });
    }
  };

  handleChangeNewUses = input => e => {

    const {newuses} = this.state;
    newuses[input] = e.target.value;

      this.setState({
        newuses
      });
  };
  handleChangeConsumption = input => e => {

    const {consumptiondata} = this.state;
    consumptiondata[input] = e.target.value;

      this.setState({
        consumptiondata
      });
  };

  render(){

    const {currentStep} = this.state;

    switch (currentStep) {
      case 1:
        return (

          <div className={"stepper-container-vertical"} >
          <h3 className="third-color-engie">Calculatrice du TURPE</h3>
            <Stepper
              direction="vertical"
              steps={steps}
              currentStepNumber={currentStep}
            />
            <VoltageDomain
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            />
        </div>
        );
      case 2:
        return (
          <div className={"stepper-container-vertical"} >
          <h3 className="third-color-engie">Calculatrice du TURPE</h3>
            <Stepper
              direction="vertical"
              steps={steps}
              currentStepNumber={currentStep}
            />
            <PowerSuscription
            handleChange={this.handleChange}
            selectedOption = {this.state.powersuscription}
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            />
        </div>
        );
      case 3:
        return (
          <div className={"stepper-container-vertical"} >
          <h3 className="third-color-engie">Calculatrice du TURPE</h3>
            <Stepper
              direction="vertical"
              steps={steps}
              currentStepNumber={currentStep}
            />
            <MeterType
            handleChange={this.handleChange}
            selectedOption = {this.state.metertype}
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            />
        </div>
        );
      case 4:
        return (
          <div className={"stepper-container-vertical"} >
          <h3 className="third-color-engie">Calculatrice du TURPE</h3>
            <Stepper
              direction="vertical"
              steps={steps}
              currentStepNumber={currentStep}
            />
            <ContractType
            handleChange={this.handleChange}
            selectedOption = {this.state.contracttype}
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            />
        </div>
        );
      case 5:
        return (
          <div className={"stepper-container-vertical"} >
          <h3 className="third-color-engie">Calculatrice du TURPE</h3>
            <Stepper
              direction="vertical"
              steps={steps}
              currentStepNumber={currentStep}
            />
            <FairOption
            handleChange={this.handleChange}
            powersuscription = {this.state.powersuscription}
            selectedOption = {this.state.fairoption}
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            />
        </div>
        );
      case 6:
        return (
          <div className={"stepper-container-vertical"} >
          <h3 className="third-color-engie">Calculatrice du TURPE</h3>
            <Stepper
              direction="vertical"
              steps={steps}
              currentStepNumber={currentStep}
            />
            <ConsumptionData
            handleChange = {this.handleChangeConsumption}
            fairoption = {this.state.fairoption}
            value = {this.state.consumptiondata}
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            />
        </div>
        );
      case 7:
        return (
          <div className={"stepper-container-vertical"} >
          <h3 className="third-color-engie">Calculatrice du TURPE</h3>
            <Stepper
              direction="vertical"
              steps={steps}
              currentStepNumber={currentStep}
            />
            <NewUses
            handleChange = {this.handleChangeNewUses}
            newuses_nb_7 = {this.state.newuses.nb_7}
            newuses_nb_22 = {this.state.newuses.nb_22}
            newuses_nb_hc_hc = {this.state.newuses.nb_hc_hc}
            newuses_nb_hc_hp = {this.state.newuses.nb_hc_hp}
            foisonnement = {this.state.newuses.foisonnement}
            safety = {this.state.newuses.safety}
            nextStep = {this.nextStep}
            prevStep = {this.prevStep}
            />
        </div>);
        case 8:
          return (
            <div className={"stepper-container-vertical"} >
            <h3 className="third-color-engie">Calculatrice du TURPE</h3>
              <Stepper
                direction="vertical"
                steps={steps}
                currentStepNumber={currentStep}
              />
              <TurpeCalcResult
              prevStep = {this.prevStep}
              turpecalcul = {this.state}
              />
          </div>
        );
    }
  }

}
