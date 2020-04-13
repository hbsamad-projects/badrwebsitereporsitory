import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './PDF-icon.png';
import { saveAs } from 'file-saver';


const Qualification = props => (
  <tr>
    <td>{props.qualification.siret}</td>
    <td>{props.qualification.corporatename}</td>
    <td>{props.qualification.sitename}</td>
    <td>{props.qualification.contact.lastname}</td>
    <td>{props.qualification.contact.firstname}</td>
    <td>{props.qualification.contact.phone}</td>
    <td>{props.qualification.contact.email}</td>
    <td>
      <Link to={"/edit/"+props.qualification._id}>edit</Link> | <a href="#" onClick={() => { props.deleteQualification(props.qualification._id) }}>delete</a>
    </td>
    <td><img width="50px" src={logo} onClick={() => { props.getPDF(props.qualification._id) }}/></td>
  </tr>
)

export default class QualificationsList extends Component {
  constructor(props) {
    super(props);

    this.deleteQualification = this.deleteQualification.bind(this);
    this.getPDF = this.getPDF.bind(this);

    this.state = {qualifications: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/qualifications/')
      .then(response => {
        this.setState({ qualifications: response.data })
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteQualification(id) {
    axios.delete('http://localhost:5000/qualifications/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      qualifications: this.state.qualifications.filter(el => el._id !== id)
    })
  }

  getPDF(id){
    axios.post('http://localhost:5000/qualifications/pdf/'+id)
      .then(() => axios.get('http://localhost:5000/qualifications/pdf/'+id, { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  qualificationList() {
    return this.state.qualifications.map(currentqualification => {
      return <Qualification qualification={currentqualification} deleteQualification={this.deleteQualification} getPDF={this.getPDF} key={currentqualification._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3 className="third-color-engie">Qualifications</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>SIRET</th>
              <th>Entreprise</th>
              <th>Site</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Actions</th>
              <th>Documents</th>
            </tr>
          </thead>
          <tbody>
            { this.qualificationList() }
          </tbody>
        </table>
      </div>
    )
  }
}
