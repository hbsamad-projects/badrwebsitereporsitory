import React, { Component } from 'react';

export default class MeterType extends Component {

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
            <h5>Régime de propriété du compteu</h5>
            <form>
              <div className="bulgy-radios" role="radiogroup" aria-labelledby="bulgy-radios-label" >
                <label>
                  <input name="options" type="radio" value="rented"
                  checked={this.props.selectedOption === 'rented'}
                  onChange={this.props.handleChange('metertype')} />
                  <span className="radio"></span>
                  <span className="label">
                    Vous louez le compteur
                  </span>
                </label>
                <label>
                  <input name="options" type="radio" value="owned"
                  checked={this.props.selectedOption === 'owned'}
                  onChange={this.props.handleChange('metertype')} />
                  <span className="radio"></span>
                  <span className="label">
                    Vous êtes propriétaire du compteur
                  </span>
                </label>
                <label>
                  <input name="options" type="radio" value="none"
                  checked={this.props.selectedOption === 'none'}
                  onChange={this.props.handleChange('metertype')} />
                  <span className="radio"></span>
                  <span className="label">
                    Pas de dispositif de comptage
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
