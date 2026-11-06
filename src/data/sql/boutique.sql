-- Boutique en ligne fictive de jeux et consoles reconditionnés (1SIO Bloc 1, SQ04).
-- Sous-ensemble commun SQLite / MySQL-MariaDB : rejouable tel quel sur un serveur en P06.

CREATE TABLE clients (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    ville VARCHAR(50),
    date_inscription DATE NOT NULL
);

CREATE TABLE produits (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    categorie VARCHAR(20) NOT NULL,
    plateforme VARCHAR(30) NOT NULL,
    prix DECIMAL(6,2) NOT NULL,
    stock INTEGER NOT NULL
);

CREATE TABLE commandes (
    id INTEGER PRIMARY KEY,
    client_id INTEGER NOT NULL,
    date_commande DATE NOT NULL,
    statut VARCHAR(20) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE lignes_commande (
    commande_id INTEGER NOT NULL,
    produit_id INTEGER NOT NULL,
    quantite INTEGER NOT NULL,
    prix_unitaire DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (commande_id, produit_id),
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);

INSERT INTO clients (id, nom, prenom, email, ville, date_inscription) VALUES
(1, 'Martin', 'Léa', 'lea.martin@exemple.fr', 'Lille', '2025-03-12'),
(2, 'Bernard', 'Hugo', 'hugo.bernard@exemple.fr', 'Arras', '2025-06-02'),
(3, 'Dubois', 'Inès', 'ines.dubois@exemple.fr', 'Lille', '2026-01-15'),
(4, 'Thomas', 'Nathan', 'nathan.thomas@exemple.fr', 'Douai', '2025-11-20'),
(5, 'Robert', 'Chloé', 'chloe.robert@exemple.fr', 'Lens', '2026-02-03'),
(6, 'Petit', 'Louis', 'louis.petit@exemple.fr', 'Lille', '2026-04-28'),
(7, 'Durand', 'Emma', 'emma.durand@exemple.fr', 'Arras', '2024-12-05'),
(8, 'Leroy', 'Jules', 'jules.leroy@exemple.fr', NULL, '2026-05-09'),
(9, 'Moreau', 'Sarah', 'sarah.moreau@exemple.fr', 'Valenciennes', '2025-08-17'),
(10, 'Simon', 'Adam', 'adam.simon@exemple.fr', 'Lille', '2025-09-30'),
(11, 'Laurent', 'Manon', 'manon.laurent@exemple.fr', 'Douai', '2026-06-21'),
(12, 'Lefebvre', 'Tom', 'tom.lefebvre@exemple.fr', 'Lens', '2026-09-01');

INSERT INTO produits (id, nom, categorie, plateforme, prix, stock) VALUES
(1, 'Console Switch OLED reconditionnée', 'console', 'Switch', 249.90, 4),
(2, 'Mario Kart 8 Deluxe', 'jeu', 'Switch', 39.90, 12),
(3, 'Super Mario Odyssey', 'jeu', 'Switch', 34.90, 0),
(4, 'Console PS5 reconditionnée', 'console', 'PS5', 389.00, 2),
(5, 'Manette PS5 reconditionnée', 'accessoire', 'PS5', 44.90, 7),
(6, 'Gran Turismo 7', 'jeu', 'PS5', 29.90, 5),
(7, 'Ratchet & Clank : Rift Apart', 'jeu', 'PS5', 24.90, 3),
(8, 'Console PS4 Slim reconditionnée', 'console', 'PS4', 149.00, 0),
(9, 'The Last of Us Part II', 'jeu', 'PS4', 12.90, 9),
(10, 'Game Boy Color', 'console', 'Game Boy', 89.00, 1),
(11, 'Pokémon Jaune', 'jeu', 'Game Boy', 54.90, 2),
(12, 'Tetris', 'jeu', 'Game Boy', 14.90, 6),
(13, 'Console Mega Drive', 'console', 'Mega Drive', 119.00, 1),
(14, 'Sonic the Hedgehog 2', 'jeu', 'Mega Drive', 19.90, 4),
(15, 'Super Nintendo', 'console', 'Super Nintendo', 159.00, 0),
(16, 'Super Mario World', 'jeu', 'Super Nintendo', 44.00, 3),
(17, 'Câble HDMI 2 m', 'accessoire', 'Multi', 7.90, 25),
(18, 'Housse de transport Switch', 'accessoire', 'Switch', 14.50, 10),
(19, 'Carte mémoire 64 Go', 'accessoire', 'Multi', 11.90, 0),
(20, 'Zelda : Tears of the Kingdom', 'jeu', 'Switch', 49.90, 6);

INSERT INTO commandes (id, client_id, date_commande, statut) VALUES
(1, 1, '2026-09-03', 'livrée'),
(2, 2, '2026-09-07', 'livrée'),
(3, 1, '2026-09-21', 'livrée'),
(4, 4, '2026-10-02', 'annulée'),
(5, 5, '2026-10-05', 'livrée'),
(6, 3, '2026-10-11', 'expédiée'),
(7, 7, '2026-10-14', 'livrée'),
(8, 9, '2026-10-19', 'expédiée'),
(9, 10, '2026-10-24', 'en préparation'),
(10, 6, '2026-10-28', 'en préparation'),
(11, 2, '2026-10-30', 'en préparation'),
(12, 12, '2026-11-02', 'en préparation');

INSERT INTO lignes_commande (commande_id, produit_id, quantite, prix_unitaire) VALUES
(1, 1, 1, 249.90),
(1, 2, 1, 39.90),
(2, 11, 1, 54.90),
(2, 12, 1, 14.90),
(3, 18, 1, 14.50),
(3, 20, 1, 49.90),
(4, 4, 1, 389.00),
(5, 6, 1, 29.90),
(5, 5, 2, 44.90),
(6, 2, 1, 39.90),
(6, 17, 2, 7.90),
(7, 13, 1, 119.00),
(7, 14, 1, 19.90),
(8, 9, 1, 12.90),
(9, 10, 1, 89.00),
(9, 12, 1, 14.90),
(10, 3, 1, 34.90),
(11, 7, 1, 24.90),
(11, 17, 1, 7.90),
(12, 1, 1, 249.90),
(12, 20, 1, 49.90);
