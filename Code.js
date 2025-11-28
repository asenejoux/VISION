/**
 * CODE.JS - Backend Google Apps Script
 */

// --- CONFIGURATION ---
// Code d'accès simple (Vous pouvez le changer ici)
const ACCESS_CODE = "vision"; 

/**
 * Point d'entrée : S'exécute quand on ouvre l'URL de l'application.
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('SYSTEM PORTFOLIO // ARCHIVES') // Titre de l'onglet
      .addMetaTag('viewport', 'width=device-width, initial-scale=1') // Mobile friendly
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Fonction utilitaire pour inclure le contenu d'autres fichiers HTML
 * Appelée via <?!= include('filename'); ?> dans index.html
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

/**
 * Vérifie le code d'accès envoyé par l'écran de login.
 * @param {string} inputCode - Le code saisi par l'utilisateur
 */
function verifyAccess(inputCode) {
  // Petite pause pour simuler un calcul (UX)
  Utilities.sleep(500);
  
  if (inputCode === ACCESS_CODE) {
    // Récupération de l'email utilisateur (si disponible dans le contexte d'exécution)
    var email = Session.getActiveUser().getEmail();
    
    return {
      success: true,
      user: email || "GUEST_OPERATOR",
      timestamp: new Date().toISOString()
    };
  } else {
    return {
      success: false,
      message: "ACCESS_DENIED // INVALID_CREDENTIALS"
    };
  }
}