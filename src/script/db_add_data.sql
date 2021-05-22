INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (1, 'En attente de validation', now(), now(), null);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (2, 'En cours', now(), now(), null);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (3, 'Clôturé', now(), now(), null);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (4, 'Validé', now(), now(), null);

INSERT INTO public."Status"(id, label, "createdAt", "updatedAt", "familyStatus")     
VALUES (5, 'En retard', now(), now(), null);

INSERT INTO public."Site"(id, label, adress, "postalCode", city, phone, mail, pays, "createdAt", "updatedAt", status) 
VALUES (1, 'ENI Nantes', '3 Rue Michael Faraday', '44800', 'Saint-Herblain', '0251676352', null, null, now(), now(), null);

INSERT INTO public."Site"(id, label, adress, "postalCode", city, phone, mail, pays, "createdAt", "updatedAt", status)
VALUES (2, 'ENI Rennes', '8 Rue Léo Lagrange', '35131', 'Chartres-de-Bretagne', '0251676352', null, null, now(), now(), null);


INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)     
VALUES (1, 1, 'auto', 'tesla', true, now(), now(), 'UI-777-SA', null, 1, 1);

INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)     
VALUES (2, 1, 'auto', '208', true, now(), now(), 'AA-123-FF', null, 2, 1);

INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)     
VALUES (3, 1, 'auto', 'A3', true, now(), now(), 'CV-458-RT', null, 2, 1);


