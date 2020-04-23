import React, { Component } from 'react';

export const options_consumptiondata = {
  cusdt_lusdt:[
    {
      optioncode: "energy",
      optiontype: "energy",
      description: "Energie"
    },
    {
      optioncode: "powercusdt",
      optiontype: "power",
      description: "Puissance souscrite"
    }
  ],
  cuqpt_muqpt:[
    {
      optioncode: "echph",
      optiontype: "energy",
      description: "Energie consommée en heures pleines d'hiver"
    },
    {
      optioncode: "echch",
      optiontype: "energy",
      description: "Energie consommée en heures creuses d'hiver"
    },
    {
      optioncode: "echpe",
      optiontype: "energy",
      description: "Energie consommée en heures pleines d'été"
    },
    {
      optioncode: "echce",
      optiontype: "energy",
      description: "Energie consommée en heures creuses d'été"
    },
    {
      optioncode: "powercuqpt",
      optiontype: "power",
      description: "Puissance souscrite"
    }
  ],
  mudpt:[
    {
      optioncode: "echp",
      optiontype: "energy",
      description: "Energie consommée en heures pleines"
    },
    {
      optioncode: "ecec",
      optiontype: "energy",
      description: "Energie consommée en heures creuses"
    },
    {
      optioncode: "powermudpt",
      optiontype: "power",
      description: "Puissance souscrite"
    }
  ],
  cuadt4c_luadt4c:[
    {
      optioncode: "echph",
      optiontype: "energy",
      description: "Energie consommée en heures pleines d'hiver"
    },
    {
      optioncode: "echch",
      optiontype: "energy",
      description: "Energie consommée en heures creuses d'hiver"
    },
    {
      optioncode: "echpe",
      optiontype: "energy",
      description: "Energie consommée en heures pleines d'été"
    },
    {
      optioncode: "echce",
      optiontype: "energy",
      description: "Energie consommée en heures creuses d'été"
    },
    {
      optioncode: "pshph",
      optiontype: "power",
      description: "Puissance souscrite en heures pleines d'hiver"
    },
    {
      optioncode: "pshch",
      optiontype: "power",
      description: "Puissance souscrite en heures creuses d'hiver"
    },
    {
      optioncode: "pshpe",
      optiontype: "power",
      description: "Puissance souscrite en heures pleines d'été"
    },
    {
      optioncode: "pshce",
      optiontype: "power",
      description: "Puissance souscrite en heures creuses d'été"
    }
  ]
};

export default class ConsumptionData extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {

    var radioGroupDisplay = "";

    if(this.props.fairoption === 'cusdt' || this.props.fairoption === 'lusdt'){
      radioGroupDisplay = options_consumptiondata.cusdt_lusdt.map((option, index) => {
        return (

          <div key={index} className="row form-group justify-content-start">
            <label className="col-sm-6 col-form-label">
              {option.description}
            </label>
            <div className="col-sm-4">
              <input className="form-control" name={option.optioncode} type="text" placeholder="kVA"
              value = {this.props.value[option.optioncode]}
              onChange={this.props.handleChange(option.optioncode)}  />
            </div>
          </div>

        );
        });
    }else if(this.props.fairoption === 'cuqpt' || this.props.fairoption === 'muqpt'){
      radioGroupDisplay = options_consumptiondata.cuqpt_muqpt.map((option, index) => {
        return (
          <div key={index} className="row form-group justify-content-start">
            <label className="col-sm-6 col-form-label">
              {option.description}
            </label>
            <div className="col-sm-4">
              <input className="form-control" name={option.optioncode} type="text" placeholder="kVA"
              value = {this.props.value[option.optioncode]}
              onChange={this.props.handleChange(option.optioncode)}  />
            </div>
          </div>
        );
        });
    }else if(this.props.fairoption === 'mudpt'){
      radioGroupDisplay = options_consumptiondata.mudpt.map((option, index) => {
        return (
          <div key={index} className="row form-group justify-content-start">
            <label className="col-sm-6 col-form-label">
              {option.description}
            </label>
            <div className="col-sm-4">
              <input className="form-control" name={option.optioncode} type="text" placeholder="kVA"
              value = {this.props.value[option.optioncode]}
              onChange={this.props.handleChange(option.optioncode)}  />
            </div>
          </div>
        );
        });
    }else if(this.props.fairoption === 'cuadt4c'||this.props.fairoption === 'luadt4c'){
      radioGroupDisplay = options_consumptiondata.cuadt4c_luadt4c.map((option, index) => {
        return (
          <div key={index} className="row form-group justify-content-start">
            <label className="col-sm-6 col-form-label">
              {option.description}
            </label>
            <div className="col-sm-4">
              <input className="form-control" name={option.optioncode} type="text" placeholder="kVA"
              value = {this.props.value[option.optioncode]}
              onChange={this.props.handleChange(option.optioncode)}  />
            </div>
          </div>
        );
        });
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h5>Saisir la quantité d'énergie et la puissance souscrite correspondants à votre consommation annuelle</h5>
            <form>
                {radioGroupDisplay}
                <div className="buttons-container">
                  <button onClick={this.back}>Précédent</button>
                  <button onClick={this.continue}>Suivant</button>
                </div>
            </form>

          </div>

        </div>
      </div>
    );
  }
}
