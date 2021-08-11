INSERT INTO public."FamilyStatus"(id, label, "createdAt", "updatedAt")
VALUES (1, 'Site', now(), now());
INSERT INTO public."FamilyStatus"(id, label, "createdAt", "updatedAt")
VALUES (2, 'Reservation', now(), now());
INSERT INTO public."FamilyStatus"(id, label, "createdAt", "updatedAt")
VALUES (3, 'Sinister', now(), now());

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (1, 'En attente de validation', now(), now(), 2);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (2, 'En cours', now(), now(), 2);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (3, 'Clôturé', now(), now(), 2);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (4, 'Validé', now(), now(), 2);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (5, 'En retard', now(), now(), 2);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (1000, 'Site Ouvert', now(), now(), 1);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (2000, 'Site Fermé', now(), now(), 1);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")
VALUES (6, 'Annulé', now(), now(), null);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (100, 'Découvert', now(), now(), 3);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (200, 'Pris en charge', now(), now(), 3);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (300, 'Résolu', now(), now(), 3);

INSERT INTO public."Site"(id, label, adress, "postalCode", city, phone, mail, pays, latitude, longitude, "createdAt", "updatedAt", status)
VALUES (1, 'ENI Nantes', '3 Rue Michael Faraday', '44800', 'Saint-Herblain', '0251676352', 'Nanteseni@campus.fr', 'France', 47.2254753112793, -1.6183825731277466, now(), now(), 1000);

INSERT INTO public."Site"(id, label, adress, "postalCode", city, phone, mail, pays, latitude, longitude, "createdAt", "updatedAt", status)
VALUES (2, 'ENI Rennes', '8 Rue Léo Lagrange', '35131', 'Chartres-de-Bretagne', '0251676352', 'Renneseni@campus.fr', 'France', 48.039066314697266, -1.6919559240341187, now(), now(), 1000);

INSERT INTO public."Site"(id, label, adress, "postalCode", city, phone, mail, pays, latitude, longitude, "createdAt", "updatedAt", status)
VALUES (3, 'ENI Vannes', '8 Rue Léo Lagrange', '35131', 'Chartres-de-Bretagne', '0251676352', 'Vanneseni@campus.fr', 'France', 47.6586772, -2.7599079, now(), now(), 2000);


INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)     
VALUES (1, 1, 'auto', 'tesla', true, now(), now(), 'UI-777-SA', null, 1, 1);

INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)     
VALUES (2, 1, 'auto', '208', true, now(), now(), 'AA-123-FF', null, 2, 1);

INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)     
VALUES (3, 1, 'auto', 'A3', true, now(), now(), 'CV-458-RT', null, 2, 1);


