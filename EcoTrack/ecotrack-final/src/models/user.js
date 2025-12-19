import mongoose from 'mongoose';
import validator from 'validator'; 

//Installer validator via npm install validator, pour la validation des adresses email

    actif BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
const UserSchema = new mongoose.Schema({
    id_user :{
        type : Number,
        unique : true
    },
    username : {
        type : String,
        minlength : [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'],
        maxlength : [30, 'Le nom d\'utilisateur ne doit pas dépasser 30 caractères'],
        required : [true, 'Le nom d\'utilisateur est obligatoire'],
        unique : true
    },
    email :{
        type:String,
        required:[true, 'L\'email est obligatoire'],
        validate : [
            validator.isEmail,
            'Le mail est incorrect'
        ],
        lowercase: true
    } ,
    motDePasse :{
        type : String,
        required : [true, 'Le mot de passe est obligatoire'],
        minlength : [6, 'Le mot de passe doit contenir au moins 6 caractères'],

    },
    actif BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    actif:{
        type : Boolean,
        default : true
    },
    role:{
        type : String,
        enum:{
            values:['admin', 'agent', 'citoyen'],
            message: 'Veuillez sélectionner un rôle correct'
        },
        default : 'citoyen'
    },
    created_at:{
        type: Date,
        default: Date.now
    }

},  {
    timestamps: true
});



export const User = mongoose.model("User", UserSchema);
