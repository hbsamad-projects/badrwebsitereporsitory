import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class QualValidationMod extends Component {
  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
  }

  onCancel(e){
    e.preventDefault();
    this.props.onShowHide();
  }

  render(){
    return(
      <div>
        <Modal show={this.props.showProp} onHide={this.props.onShowHide}>
          <Modal.Header closeButton><h4>Validation</h4></Modal.Header>
          <Modal.Body>
            <div class="form-check">
              <input name="options" type="checkbox" className="form-check-input"
              checked={this.props.documents}
              onChange={this.props.onChange('documents')} />
              <label className="form-check-label">
                Nous avons bien reçu les documents de la part du client
              </label>
            </div>
            <div class="form-check">
              <input name="options" type="checkbox" className="form-check-input"
              checked={this.props.sendemail}
              onChange={this.props.onChange('sendemail')} />
              <label className="form-check-label">
                Envoyer un mail de confirmation au client
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onCancel}>Annuler</Button>
            <Button variant="primary" onClick={this.props.onValidate}>Valider</Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}
