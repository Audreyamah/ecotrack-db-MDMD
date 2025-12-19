
import catchAsyncError from '../middleware/catchAsyncError.js';
import * as authService from '../services/authService.js';

 export const register = catchAsyncError(async (req, res, next) => {
   
      const email = req.body.email?.toLowerCase();
      const { nom, prenom, password } = req.body;
      if (!email || !nom || !prenom || !password) {
        console.warn('[AuthController][register] Données manquantes:', req.body);
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
      }
      const username = `${nom}_${prenom}`.toLowerCase().replace(/\s+/g, '_');

      // Ajoute la logique pour le rôle ici
      const role = email === 'admin@admin.com' ? 'admin' : 'user';

      const result = await authService.register({ 
        email, 
        username, 
        nom,
        prenom,
        password,
        role // <-- passe le rôle au service
      });
      console.log('[AuthController][register] Utilisateur créé:', result.user.email);
      res.status(201).json({ success: true, data: { user: result.user, qrCode: result.qrCode } });
    
      console.error('[AuthController][register] Erreur:', err);
      res.status(400).json({ error: err.message || 'Erreur lors de l\'inscription.' });
});
 