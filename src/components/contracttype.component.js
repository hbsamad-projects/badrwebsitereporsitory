import React, { Component } from 'react';

export default class ContractType extends Component {

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

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h5>Sélectionner votre type de contrat</h5>
            <form>
              <div className="bulgy-radios" role="radiogroup" aria-labelledby="bulgy-radios-label" >
                <label>
                  <input name="options" type="radio" value="CU"
                  checked={this.props.selectedOption === 'CU'}
                  onChange={this.props.handleChange('contracttype')} />
                  <span className="radio"></span>
                  <span className="label">
                    Contrat unique (CU)
                  </span>
                </label>
                <label>
                  <input name="options" type="radio" value="CARDCART"
                  checked={this.props.selectedOption === 'CARDCART'}
                  onChange={this.props.handleChange('contracttype')} />
                  <span className="radio"></span>
                  <span className="label">
                    Contrat d'accès aux réseaux de distribution/transport (CARD/CART)
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
