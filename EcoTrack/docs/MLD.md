# ----- MLD EcoTrack ------ 

ZONE_URBAINE (
    id_zone INT PRIMARY KEY,
    nom_zone VARCHAR(100) NOT NULL,
    type_zone VARCHAR(50),
    surface_km2 DECIMAL(10,2),
    population_estimee INT,
    densite_population INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)

CONTENEUR (
    id_conteneur INT PRIMARY KEY,
    code_conteneur VARCHAR(50) UNIQUE NOT NULL,
    id_zone INT NOT NULL,
    capacite_litres INT,
    niveau_remplissage INT,
    statut VARCHAR(50),
    date_installation DATE,
    FOREIGN KEY (id_zone) REFERENCES ZONE_URBAINE(id_zone)
)


TYPE_DECHET (
    id_type_dechet INT PRIMARY KEY,
    libelle VARCHAR(100) NOT NULL,
    recyclable BOOLEAN,
    couleur_bac VARCHAR(20),
    impact_co2_estime DECIMAL(10,2)
)

CARACTERISATION_DECHET (
    id_conteneur INT,
    id_type_dechet INT,
    date_affectation DATE,
    PRIMARY KEY (id_conteneur, id_type_dechet),
    FOREIGN KEY (id_conteneur) REFERENCES CONTENEUR(id_conteneur),
    FOREIGN KEY (id_type_dechet) REFERENCES TYPE_DECHET(id_type_dechet)
)

CAPTEUR (
    id_capteur INT PRIMARY KEY,
    reference_capteur VARCHAR(50) UNIQUE NOT NULL,
    id_conteneur INT UNIQUE NOT NULL,
    type_capteur VARCHAR(50),
    date_installation DATE,
    etat VARCHAR(50),
    batterie_pourcentage INT,
    FOREIGN KEY (id_conteneur) REFERENCES CONTENEUR(id_conteneur)
)

MESURE_CAPTEUR (
    id_mesure INT PRIMARY KEY,
    id_capteur INT NOT NULL,
    valeur_mesuree DECIMAL(10,2),
    unite VARCHAR(20),
    date_mesure DATETIME,
    alerte BOOLEAN,
    qualite_signal INT,
    FOREIGN KEY (id_capteur) REFERENCES CAPTEUR(id_capteur)
)

VEHICULE (
    id_vehicule INT PRIMARY KEY,
    immatriculation VARCHAR(20) UNIQUE NOT NULL,
    type_vehicule VARCHAR(50),
    capacite_max INT,
    carburant VARCHAR(50),
    etat VARCHAR(50)
)

AGENT_COLLECTE (
    id_agent INT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    matricule VARCHAR(50) UNIQUE,
    telephone VARCHAR(20),
    date_embauche DATE,
    statut VARCHAR(50)
)

TOURNEE_COLLECTE (
    id_tournee INT PRIMARY KEY,
    id_vehicule INT NOT NULL,
    date_tournee DATE,
    heure_debut TIME,
    heure_fin TIME,
    distance_km DECIMAL(10,2),
    carburant_consomme DECIMAL(10,2),
    FOREIGN KEY (id_vehicule) REFERENCES VEHICULE(id_vehicule)
)

ETAT_TOURNEE (
    id_etat INT PRIMARY KEY,
    libelle VARCHAR(50) UNIQUE NOT NULL
)

HISTORIQUE_ETAT_TOURNEE (
    id_tournee INT,
    id_etat INT,
    date_debut DATETIME,
    date_fin DATETIME,
    commentaire TEXT,
    PRIMARY KEY (id_tournee, id_etat, date_debut),
    FOREIGN KEY (id_tournee) REFERENCES TOURNEE_COLLECTE(id_tournee),
    FOREIGN KEY (id_etat) REFERENCES ETAT_TOURNEE(id_etat)
)

AFFECTATION_TOURNEE_CONTENEUR (
    id_tournee INT,
    id_conteneur INT,
    ordre_passage INT,
    PRIMARY KEY (id_tournee, id_conteneur),
    FOREIGN KEY (id_tournee) REFERENCES TOURNEE_COLLECTE(id_tournee),
    FOREIGN KEY (id_conteneur) REFERENCES CONTENEUR(id_conteneur)
)

AFFECTATION_TOURNEE_AGENT (
    id_tournee INT,
    id_agent INT,
    role VARCHAR(50),
    PRIMARY KEY (id_tournee, id_agent),
    FOREIGN KEY (id_tournee) REFERENCES TOURNEE_COLLECTE(id_tournee),
    FOREIGN KEY (id_agent) REFERENCES AGENT_COLLECTE(id_agent)
)

COLLECTE (
    id_collecte INT PRIMARY KEY,
    id_tournee INT NOT NULL,
    id_conteneur INT NOT NULL,
    date_collecte DATETIME,
    volume_collecte INT,
    poids_collecte DECIMAL(10,2),
    duree_minutes INT,
    commentaire TEXT,
    FOREIGN KEY (id_tournee) REFERENCES TOURNEE_COLLECTE(id_tournee),
    FOREIGN KEY (id_conteneur) REFERENCES CONTENEUR(id_conteneur)
)

CITOYEN (
    id_citoyen INT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    telephone VARCHAR(20),
    date_inscription DATE,
    niveau_engagement INT
)

SIGNALEMENT (
    id_signalement INT PRIMARY KEY,
    id_citoyen INT,
    id_conteneur INT,
    type_signalement VARCHAR(50),
    description TEXT,
    date_signalement DATETIME,
    priorite INT,
    statut VARCHAR(50),
    FOREIGN KEY (id_citoyen) REFERENCES CITOYEN(id_citoyen),
    FOREIGN KEY (id_conteneur) REFERENCES CONTENEUR(id_conteneur)
)

STATISTIQUE_ENVIRONNEMENTALE (
    id_stat INT PRIMARY KEY,
    id_zone INT,
    periode VARCHAR(50),
    taux_recyclage DECIMAL(5,2),
    emission_co2 DECIMAL(10,2),
    volume_dechets DECIMAL(10,2),
    date_generation DATE,
    FOREIGN KEY (id_zone) REFERENCES ZONE_URBAINE(id_zone)
)


