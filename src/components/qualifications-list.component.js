import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './PDF-icon.png';
import { saveAs } from 'file-saver';
import {getReport} from '../tools/dataLoading';


const Qualification = props => (

  <tr>
    <td>{props.qualification.uniqid}</td>
    <td>{props.qualification.stage}</td>
    <td>{props.qualification.siret}</td>
    <td>{props.qualification.corporatename}</td>
    <td>{props.qualification.pdl}</td>
    <td>
      {props.qualification.stage === 'Qualification validée' &&
        <a href="#">devis | </a>
      }
      <Link to={"/edit/"+props.qualification._id}>modifier</Link> | <a href="#" onClick={() => { props.deleteQualification(props.qualification._id) }}>supprimer</a>
    </td>
    <td>
      {props.qualification.stage === 'Qualification validée' &&
        <img width='50px' src={logo} onClick={() => { props.getPDF(props.qualification._id) }}/>
      }
    </td>
    <td></td>
  </tr>
)

export default class QualificationsList extends Component {
  constructor(props) {
    super(props);

    this.deleteQualification = this.deleteQualification.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getPDF = this.getPDF.bind(this);

    this.state = {
      qualifications: []
    };
  }

  componentDidMount() {
    axios.get('https://backend-eveci.herokuapp.com/qualifications/')
      .then(response => {
        this.setState({ qualifications: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteQualification(id) {
    axios.delete('https://backend-eveci.herokuapp.com/qualifications/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      qualifications: this.state.qualifications.filter(el => el._id !== id)
    })
  }

  getPDF(id){
    axios.post('https://backend-eveci.herokuapp.com/qualifications/pdf/'+id)
      .then(() => axios.get('https://backend-eveci.herokuapp.com/qualifications/pdf/'+id, { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      });
  }

  qualificationList() {
    return this.state.qualifications.map(currentqualification => {
      return <Qualification qualification={currentqualification} deleteQualification={this.deleteQualification} getPDF={this.getPDF} key={currentqualification._id}/>;
    })
  }

  onClick(){
    getReport(this.state.qualifications);
  }

  render() {
    return (
      <div className="container">
        <h3 className="third-color-engie">Qualifications</h3>
        <div className="float-right btn-group mb-3">
          <button type="button" className="btn btn-default border border-primary" aria-label="Nouvelle qualification">
            <Link to="/qualification" className="nav-link"><span className="glyphicon glyphicon-plus" aria-hidden="true">
              Nouvelle qualification
            </span></Link>
          </button>
          <button className="btn btn-primary" type="button" onClick={this.onClick}>
            Télécharger
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover table-condenesed">
            <thead className="thead-light">
              <tr>
                <th>Identifiant</th>
                <th>Etape</th>
                <th>SIRET</th>
                <th>Entreprise</th>
                <th>PDL</th>
                <th>Actions</th>
                <th>Qualification</th>
                <th>Devis</th>
              </tr>
            </thead>
            <tbody>
              { this.qualificationList() }
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}
