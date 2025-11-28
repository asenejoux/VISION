/**
 * Fonction principale qui s'exécute quand on ouvre l'URL de la Web App.
 * Elle charge le fichier 'index.html' et l'affiche à l'utilisateur.
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('SYSTEM PORTFOLIO // ARCHIVES') // Titre de l'onglet
      .addMetaTag('viewport', 'width=device-width, initial-scale=1') // Responsive mobile
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Autorise l'inclusion dans une iframe si besoin
}

/**
 * Fonction utilitaire standard pour inclure le contenu d'autres fichiers HTML
 * (comme le CSS, le JS ou les fichiers de données projets) dans le fichier principal.
 * Appelée via <?!= include('filename'); ?> dans index.html.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

// --- SÉCURITÉ & AUTHENTIFICATION ---

// Le code d'accès secret (Modifiez-le ici si nécessaire)
const ACCESS_CODE = "vision"; 

/**
 * Fonction appelée par le client (via google.script.run) pour vérifier le mot de passe.
 * @param {string} inputCode - Le code saisi par l'utilisateur sur l'écran de login.
 * @return {Object} - Un objet JSON contenant le succès et les infos utilisateur.
 */
function verifyAccess(inputCode) {
  // Simulation d'un petit délai réseau pour donner un effet "Calcul en cours..." (800ms)
  // Utilities.sleep(800);
  
  if (inputCode === ACCESS_CODE) {
    // Récupération de l'email de l'utilisateur connecté (si disponible selon les paramètres de déploiement)
    // Si l'app est déployée en "Exécuter en tant que : Moi" et "Accès : Tout le monde", getEmail() peut être vide.
    // Si l'app est déployée en "Exécuter en tant que : Utilisateur accédant à l'app", getEmail() retournera leur email.
    var email = Session.getActiveUser().getEmail();
    
    return {
      success: true,
      user: email || "GUEST_AGENT", // Fallback si l'email n'est pas capturé
      timestamp: new Date().toISOString()
    };
  } else {
    return {
      success: false,
      message: "ACCESS_DENIED // INVALID_CREDENTIALS"
    };
  }
}