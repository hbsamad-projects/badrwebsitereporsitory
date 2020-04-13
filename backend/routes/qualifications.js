const router = require('express').Router();
let Qualification = require('../models/qualification.model');
const pdf = require('html-pdf');

const pdfTemplate = require('../models/pdf.model');

router.route('/').get((req, res) => {
  Qualification.find()
    .then(qualifications => res.json(qualifications))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const siret = req.body.siret;
  const corporatename = req.body.corporatename;
  const sitename = req.body.sitename;
  const street = req.body.street;
  const city = req.body.city;
  const code = Number(req.body.code);
  const country = req.body.country;

  const usage = Number(req.body.usage);
  const pdl = req.body.pdl;
  const s_enedis = Number(req.body.s_enedis);
  const project_ad_inf = req.body.project_ad_inf;

  const contact = {
    lastname: req.body.contact_lastname,
    firstname: req.body.contact_firstname,
    phone: req.body.contact_phone,
    email: req.body.contact_email
  };

  const documents = {
    elec_bill : Number(req.body.documents_elec_bill),
    rib : Number(req.body.documents_rib),
    authorization : Number(req.body.documents_authorization),
    works_plan : Number(req.body.documents_works_plan)
  };


  const charger_needs = {
    nb_s_7kw_c: Number(req.body.charger_needs_nb_s_7kw_c),
    nb_d_7kw_c: Number(req.body.charger_needs_nb_d_7kw_c),
    nb_s_22kw_c: Number(req.body.charger_needs_nb_s_22kw_c),
    nb_d_22kw_c: Number(req.body.charger_needs_nb_d_22kw_c),
    nb_sh_7kw_c: Number(req.body.charger_needs_nb_sh_7kw_c),
    other_data: req.body.charger_needs_other_data
  };


  const other_needs = {
    charging_time: Number(req.body.other_needs_charging_time),
    nb_vehicules: Number(req.body.other_needs_nb_vehicules),
    nb_charges: Number(req.body.other_needs_nb_charges),
    allowed_access_days: Number(req.body.other_needs_allowed_access_days)
  };


  const other_information = {
    installation_type: Number(req.body.other_information_installation_type),
    signalling: Number(req.body.other_information_signalling),
    station_type: Number(req.body.other_information_station_type),
    billing_conditions: Number(req.body.other_information_billing_conditions)
  };


  const comments = req.body.comments;

  const works_conditions = {
    technical_visite_date: Date.parse(req.body.works_conditions_technical_visite_date),
    installation_date: Date.parse(req.body.works_conditions_installation_date),
    access_restrictions: req.body.works_conditions_access_restrictions,
    prevention_plan: req.body.works_conditions_prevention_plan
  };

  const newQualification = new Qualification({
    siret ,
    corporatename ,
    sitename ,
    street,
    city,
    code ,
    country,
    usage,
    pdl,
    s_enedis,
    project_ad_inf,
    contact,
    documents,
    charger_needs,
    other_needs,
    other_information,
    comments,
    works_conditions
  });

  newQualification.save()
  .then(() => res.json('Qualification added!'))
  .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) => {
  Qualification.findById(req.params.id)
    .then(qualification => res.json(qualification))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/pdf/:id').post((req, res) => {
  Qualification.findById(req.params.id)
    .then(qualification => {

      pdf.create(pdfTemplate(qualification), {}).toFile('./routes/result.pdf', (err) => {
          if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
      });
    });
  });

  router.route('/pdf/:id').get((req, res) => {
      res.sendFile(`${__dirname}/result.pdf`);
  });


router.route('/:id').delete((req, res) => {
  Qualification.findByIdAndDelete(req.params.id)
    .then(() => res.json('Qualification deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Qualification.findById(req.params.id)
    .then(qualification => {
      qualification.siret = req.body.siret;
      qualification.corporatename = req.body.corporatename;
      qualification.sitename = req.body.sitename;
      qualification.street = req.body.street;
      qualification.city = req.body.city;
      qualification.code = Number(req.body.code);
      qualification.country = req.body.country;

      qualification.usage = Number(req.body.usage);
      qualification.pdl = req.body.pdl;
      qualification.s_enedis = Number(req.body.s_enedis);
      qualification.project_ad_inf = req.body.project_ad_inf;

      qualification.contact.lastname = req.body.contact_lastname;
      qualification.contact.firstname = req.body.contact_firstname;
      qualification.contact.phone = req.body.contact_phone;
      qualification.contact.email = req.body.contact_email;

      qualification.documents.elec_bill = Number(req.body.documents_elec_bill);
      qualification.documents.rib = Number(req.body.documents_rib);
      qualification.documents.authorization = Number(req.body.documents_authorization);
      qualification.documents.works_plan = Number(req.body.documents_works_plan);

      qualification.charger_needs.nb_s_7kw_c = Number(req.body.charger_needs_nb_s_7kw_c);
      qualification.charger_needs.nb_d_7kw_c = Number(req.body.charger_needs_nb_d_7kw_c);
      qualification.charger_needs.nb_s_22kw_c = Number(req.body.charger_needs_nb_s_22kw_c);
      qualification.charger_needs.nb_d_22kw_c = Number(req.body.charger_needs_nb_d_22kw_c);
      qualification.charger_needs.nb_sh_7kw_c = Number(req.body.charger_needs_nb_sh_7kw_c);
      qualification.charger_needs.other_data = req.body.charger_needs_other_data;

      qualification.other_needs.charging_time = Number(req.body.other_needs_charging_time);
      qualification.other_needs.nb_vehicules = Number(req.body.other_needs_nb_vehicules);
      qualification.other_needs.nb_charges = Number(req.body.other_needs_nb_charges);
      qualification.other_needs.allowed_access_days = Number(req.body.other_needs_allowed_access_days);

      qualification.other_information.installation_type = Number(req.body.other_information_installation_type);
      qualification.other_information.signalling = Number(req.body.other_information_signalling);
      qualification.other_information.station_type = Number(req.body.other_information_station_type);
      qualification.other_information.billing_conditions = Number(req.body.other_information_billing_conditions);

      qualification.comments = req.body.comments;

      qualification.works_conditions.technical_visite_date = Date.parse(req.body.works_conditions_technical_visite_date);
      qualification.works_conditions.installation_date = Date.parse(req.body.works_conditions_installation_date);
      qualification.works_conditions.access_restrictions = req.body.works_conditions_access_restrictions;
      qualification.works_conditions.prevention_plan = req.body.works_conditions_prevention_plan;

      qualification.save()
        .then(() => res.json('Qualification updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
