const usage = {
  "1":"Bornes pour flotte d'entreprise sur parking privé",
  "2":"Partagé en résidentiel collectif",
  "3":"Individuel en résidentiel collectif",
  "4":"Bornes accessibles au public sur voiries",
  "5":"Bornes accessibles au public sur parking privé"
};

const s_enedis = {
  "1":"C1",
  "2":"C2",
  "3":"C3",
  "4":"C4",
  "5":"C5"
};

const billing_conditions = {
  "1":"A définir",
  "2":"Flotte d'entreprise",
  "3":"Public",
  "4":"Privé"
};

const station_type = {
  "1":"A définir",
  "2":"Autostart",
  "3":"Contrôle d'accès"
};

const signalling = {
  "1":"A définir",
  "2":"Oui",
  "3":"Non"
};

const installation_type = {
  "1":"A définir",
  "2":"Simple",
  "3":"Complexe"
};

const allowed_access_days = {
  "1":"Jours ouvrés uniquement",
  "2":"Weekend uniquement",
  "3":"Toute la semaine"
};

const charging_time = {
  "1":"Moins d'une heure",
  "2":"Moins de trois heures",
  "3":"Moins de cinq heures",
  "4":"Plus de cinq heures"
};

export const getReport = function(jsonData){

  const data = jsonData.map(row => ({

    uniqid: row.uniqid,
    stage: row.stage,
    siret: row.siret,
    corporatename: row.corporatename,
    sitename: row.sitename,
    street: row.street,
    city: row.city,
    code : row.code,
    country: row.country,
    usage: usage[row.usage],
    pdl: row.pdl,
    s_enedis: s_enedis[row.s_enedis],
    project_ad_inf: row.project_ad_inf,
    comments: row.comments,
    contact_lastname: row.contact.lastname,
    contact_firstname: row.contact.firstname,
    contact_phone: row.contact.phone,
    contact_email: row.contact.email,
    documents_elec_bill: row.documents.elec_bill === 1 ? "oui":"non",
    documents_rib: row.documents.rib === 1 ? "oui":"non",
    documents_authorization: row.documents.authorization === 1 ? "oui":"non",
    documents_works_plan: row.documents.works_plan === 1 ? "oui":"non",
    charger_needs_nb_s_7kw_c: row.charger_needs.nb_s_7kw_c,
    charger_needs_nb_d_7kw_c: row.charger_needs.nb_d_7kw_c,
    charger_needs_nb_s_22kw_c: row.charger_needs.nb_s_22kw_c,
    charger_needs_nb_d_22kw_c: row.charger_needs.nb_d_22kw_c,
    charger_needs_nb_sh_7kw_c: row.charger_needs.nb_sh_7kw_c,
    charger_needs_other_data: row.charger_needs.other_data,
    other_needs_charging_time: charging_time[row.other_needs.charging_time],
    other_needs_nb_vehicules: row.other_needs.nb_vehicules,
    other_needs_nb_charges: row.other_needs.nb_charges,
    other_needs_allowed_access_days: allowed_access_days[row.other_needs.allowed_access_days],
    other_information_installation_type: installation_type[row.other_information.installation_type],
    other_information_signalling: signalling[row.other_information.signalling],
    other_information_station_type: station_type[row.other_information.station_type],
    other_information_billing_conditions: billing_conditions[row.other_information.billing_conditions],
    works_conditions_technical_visite_date: row.works_conditions.technical_visite_date,
    works_conditions_installation_date: row.works_conditions.installation_date,
    works_conditions_access_restrictions: row.works_conditions.access_restrictions,
    works_conditions_prevention_plan: row.works_conditions.prevention_plan

  }));

  console.log(data);

  const csvData = objectToCSV(data);
  download(csvData);


};

const download = function(data){
  const blob = new Blob([data], {type: 'text/csv'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'download.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const objectToCSV = function(data){

  const csvRows = [];

  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = headers.map(header => {
      const escaped = (''+row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');

}
