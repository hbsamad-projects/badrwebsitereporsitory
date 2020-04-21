import React, { Component } from 'react';

export default class PowerSuscription extends Component {

  constructor(props) {
    super(props);

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();

    console.log('You have selected:', this.state.selectedOption);
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
        <div className="row">
          <div className="col-sm-12">
            <h5>Sélectionner le niveau de puissance souscrit auprès de votre fournisseur</h5>
            <form>
              <div className="bulgy-radios" role="radiogroup" aria-labelledby="bulgy-radios-label" >
                <label>
                  <input name="options" type="radio" value="less36kva"
                  checked={this.props.selectedOption === 'less36kva'}
                  onChange={this.props.handleChange('powersuscription')} />
                  <span className="radio"></span>
                  <span className="label">
                    Puissance inférieure ou égale à 36 kVA
                  </span>
                </label>
                <label>
                  <input name="options" type="radio" value="more36kva"
                  checked={this.props.selectedOption === 'more36kva'}
                  onChange={this.props.handleChange('powersuscription')} />
                  <span className="radio"></span>
                  <span className="label">
                    Puissance supérieure à 36 kVA
                  </span>
                </label>
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
