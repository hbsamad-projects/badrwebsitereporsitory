import React, { Component } from 'react';
import {PickItem} from './create-qualification.component';

export default class NewUses extends Component {

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
            <h5>Saisir les nouveaux usages</h5>
            <form>
              <div >
                <PickItem id = "nb_7" label="Nombre de bornes 7kVA" placeholder="" readonly="true" value={this.props.newuses_nb_7} onChange={this.props.handleChange('nb_7')}/>
                <PickItem id = "nb_22" label="Nombre de bornes 22kVA" placeholder="" readonly="true" value={this.props.newuses_nb_22} onChange={this.props.handleChange('nb_22')}/>
                <PickItem id = "nb_hc_hc" label="Nombre d'heures de charge en heures creuses par borne" placeholder="" readonly="true" value={this.props.newuses_nb_hc_hc} onChange={this.props.handleChange('nb_hc_hc')}/>
                <PickItem id = "nb_hc_hp" label="Nombre d'heures de charge en heures pleines par borne" placeholder="" readonly="true" value={this.props.newuses_nb_hc_hp} onChange={this.props.handleChange('nb_hc_hp')}/>
                <div className="row">
                  <label className="col-xl-4 col-form-label" htmlFor="foisonnement">Coefficient de foisonnement naturel</label>
                  <div className="d-flex range-field my-4 col-xl-8">
                    <div className="w-75">
                      <input  type="range" className="custom-range" min="0.4" max="1" step="0.1" value={this.props.foisonnement}
                              onChange={this.props.handleChange('foisonnement')} id="foisonnement" />
                    </div>
                    <span className="font-weight-bold text-primary ml-2 mt-1 valueSpan">{this.props.foisonnement}</span>
                  </div>
                </div>
                <div className="row">
                  <label className="col-xl-4 col-form-label" htmlFor="safety">Pourcentage de marge pour les usages futurs</label>
                  <div className="d-flex range-field my-4 col-xl-8">
                    <div className="w-75">
                      <input  type="range" className="custom-range" min="0" max="50" step="5" value={this.props.safety}
                              onChange={this.props.handleChange('safety')} id="safety" />
                    </div>
                    <span className="font-weight-bold text-primary ml-2 mt-1 valueSpan">{this.props.safety}%</span>
                  </div>
                </div>
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
