import React, { Component } from 'react';

export default class VoltageDomain extends Component {

  constructor(props) {
    super(props);

    this.continue = this.continue.bind(this);
    this.back = this.back.bind(this);
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h5>Sélectionner le domaine de tension auquel vous êtes raccordé</h5>
            <form>
              <div className="bulgy-radios" role="radiogroup" aria-labelledby="bulgy-radios-label" >
                <label>
                  <input name="options" type="radio" value="lv"
                  checked={true}
                  onChange = {this.handleOptionChange} />
                  <span className="radio"></span>
                  <span className="label">
                    Basse tension (inférieur à 1000 Volts)
                  </span>
                </label>
              </div>
              <div className="buttons-container">
                <button onClick={this.continue}>Suivant</button>
              </div>
            </form>

          </div>

        </div>
      </div>
    );
  }
}
