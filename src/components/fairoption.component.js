import React, { Component } from 'react';


export const options = {
  less36kva_options:[
    {
      optioncode: "cusdt",
      description: "Courte utilisation sans différentiation temporelle"
    },
    {
      optioncode: "cuqpt",
      description: "Courte utilisation à quatre plages temporelles"
    },
    {
      optioncode: "mudpt",
      description: "Moyenne utilisation à deux plages temporelles"
    },
    {
      optioncode: "muqpt",
      description: "Moyenne utilisation à quatre plages temporelles"
    },
    {
      optioncode: "lusdt",
      description: "Longue utilisation sans différentiation temporelle"
    }
  ],
  more36kva_options:[
    {
      optioncode: "cuadt4c",
      description: "Courte utilisation avec différenciation temporelle à 4 classes"
    },
    {
      optioncode: "luadt4c",
      description: "Longue utilisation avec différenciation temporelle à 4 classes"
    }
  ]
};

export default class FairOption extends Component {

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
    this.props.handleChange('fairoption');
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
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

    var radioGroupDisplay = "";

    if(this.props.powersuscription === 'less36kva'){
      radioGroupDisplay = options.less36kva_options.map((option, index) => {
        return (

          <label  key={index}>
            <input name="options" type="radio" value={option.optioncode}
            checked={this.props.selectedOption === option.optioncode}
            onChange={this.props.handleChange('fairoption')} />
            <span className="radio"></span>
            <span className="label">
              {option.description}
            </span>
          </label>

        );
        });
    }else{
      radioGroupDisplay = options.more36kva_options.map((option, index) => {
        return (
          <label  key={index}>
            <input name="options" type="radio" value={option.optioncode}
            checked={this.props.selectedOption === option.optioncode}
            onChange={this.props.handleChange('fairoption')} />
            <span className="radio"></span>
            <span className="label">
              {option.description}
            </span>
          </label>
        );
        });
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h5>Sélectionner l'option tarifaire d'acheminement souscrite</h5>
            <form>
              <div className="bulgy-radios" role="radiogroup" aria-labelledby="bulgy-radios-label" >

              {radioGroupDisplay}

              </div>
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
