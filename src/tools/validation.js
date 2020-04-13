export function estSiretValide(siret) {
  var estValide;
  if ( (siret.length != 14) || (isNaN(siret)) )
    estValide = false;
  else {
     // Donc le SIRET est un numérique à 14 chiffres
     // Les 9 premiers chiffres sont ceux du SIREN (ou RCS), les 4 suivants
     // correspondent au numéro d'établissement
     // et enfin le dernier chiffre est une clef de LUHN.
    var somme = 0;
    var tmp;
    for (var cpt = 0; cpt < siret.length; cpt++) {
      if ((cpt % 2) == 0) { // Les positions impaires : 1er, 3è, 5è, etc...
        tmp = siret.charAt(cpt) * 2; // On le multiplie par 2
        if (tmp > 9)
          tmp -= 9;	// Si le résultat est supérieur à 9, on lui soustrait 9
      }
     else
       tmp = siret.charAt(cpt);
       somme += parseInt(tmp);
    }
    if ((somme % 10) == 0)
      estValide = true; // Si la somme est un multiple de 10 alors le SIRET est valide
    else
      estValide = false;
  }
  return estValide;
}

export function formValid(formErrors) {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  return valid;
}

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
export function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}
