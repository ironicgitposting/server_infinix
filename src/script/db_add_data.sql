/* Civility */
INSERT INTO public."Civility"(id, label, "createdAt", "updatedAt")
	VALUES (1, 'Monsieur', now(), now());
INSERT INTO public."Civility"(id, label, "createdAt", "updatedAt")
	VALUES (2, 'Madame', now(), now());

/* Utlisateurs */
INSERT INTO public."Users"(id, "registrationNumber", surname, name, profession, password, email, telephone, "authorizationAccess",
	"createdAt", "updatedAt", "dateLastSeen", site, language, archived, enabled, "archivedDate", "flagChangePassword", "flagDurablePassword", profile, status, civility)
	VALUES (6,null,'OUJDARI','MOURAD',null,'$2b$10$xORzlmXFWzuS8dpPH408OewOrv5G3CdrCkGwsw4ZxtVPmVExPmoxO','mouradoujdari@gmail.com',0643653480,1,now(),now(),null,null,null,null,null,null,null,null,null,null,1);

INSERT INTO public."Users"(id, "registrationNumber", surname, name, profession, password, email, telephone, "authorizationAccess",
	"createdAt", "updatedAt", "dateLastSeen", site, language, archived, enabled, "archivedDate", "flagChangePassword", "flagDurablePassword", profile, status, civility)
	VALUES (2,null,'LARGEAU','THIERRY',null,'$2b$10$xORzlmXFWzuS8dpPH408OewOrv5G3CdrCkGwsw4ZxtVPmVExPmoxO','largeau.thierry@eni-campus.fr',0643854245,1,now(),now(),null,null,null,null,true,null,null,null,null,null,1);

INSERT INTO public."Users"(id, "registrationNumber", surname, name, profession, password, email, telephone, "authorizationAccess",
	"createdAt", "updatedAt", "dateLastSeen", site, language, archived, enabled, "archivedDate", "flagChangePassword", "flagDurablePassword", profile, status, civility)
	VALUES (3,null,'DAVID','VINCENT',null,'$2b$10$xORzlmXFWzuS8dpPH408OewOrv5G3CdrCkGwsw4ZxtVPmVExPmoxO','david.vincent@eni-campus.fr',0643987548,1,now(),now(),null,null,null,null,true,null,null,null,null,null,1);

INSERT INTO public."Users"(id, "registrationNumber", surname, name, profession, password, email, telephone, "authorizationAccess",
	"createdAt", "updatedAt", "dateLastSeen", site, language, archived, enabled, "archivedDate", "flagChangePassword", "flagDurablePassword", profile, status, civility)
	VALUES (4,null,'SIMON','MELINA',null,'$2b$10$xORzlmXFWzuS8dpPH408OewOrv5G3CdrCkGwsw4ZxtVPmVExPmoxO','melina.simon@eni-campus.fr',0623065123,1,now(),now(),null,null,null,null,null,null,null,null,null,null,2);

INSERT INTO public."Users"(id, "registrationNumber", surname, name, profession, password, email, telephone, "authorizationAccess",
	"createdAt", "updatedAt", "dateLastSeen", site, language, archived, enabled, "archivedDate", "flagChangePassword", "flagDurablePassword", profile, status, civility)
	VALUES (5,null,'METAY','GLORIA',null,'$2b$10$xORzlmXFWzuS8dpPH408OewOrv5G3CdrCkGwsw4ZxtVPmVExPmoxO','metay.gloria@eni-campus.fr',0623065123,1,now(),now(),null,null,null,null,null,null,null,null,null,null,2);


/* Site */
INSERT INTO public."Site"(id, label, adress, "postalCode", city, phone, mail, pays, latitude, longitude, "createdAt", "updatedAt", status)
VALUES (1, 'ENI Nantes', '3 Rue Michael Faraday', '44800', 'Saint-Herblain', '0251676352', 'Nanteseni@campus.fr', 'France', 47.2254753112793, -1.6183825731277466, now(), now(), 1000);

INSERT INTO public."Site"(id, label, adress, "postalCode", city, phone, mail, pays, latitude, longitude, "createdAt", "updatedAt", status)
VALUES (2, 'ENI Rennes', '8 Rue Léo Lagrange', '35131', 'Chartres-de-Bretagne', '0251676352', 'Renneseni@campus.fr', 'France', 48.039066314697266, -1.6919559240341187, now(), now(), 1000);

INSERT INTO public."Site"(id, label, adress, "postalCode", city, phone, mail, pays, latitude, longitude, "createdAt", "updatedAt", status)
VALUES (3, 'ENI Vannes', '8 Rue Léo Lagrange', '35131', 'Chartres-de-Bretagne', '0251676352', 'Vanneseni@campus.fr', 'France', 47.6586772, -2.7599079, now(), now(), 2000);

INSERT INTO public."Site"(id, label, adress, "postalCode", city, phone, mail, pays, latitude, longitude, "createdAt", "updatedAt", status)
VALUES (4, 'ENI Niort', '19 Avenue Léo Lagrange Bât B et C', '79000', 'Niort', '05 35 37 11 83', 'ecole-niort@eni-ecole.fr', 'France', 48.039066314697266, -1.6919559240341187, now(), now(), 1000);

INSERT INTO public."Site"(id, label, adress, "postalCode", city, phone, mail, pays, latitude, longitude, "createdAt", "updatedAt", status)
VALUES (5, 'ENI Quimper', '2 Rue Georges Perros', '29000', 'Quimper', '02 98 50 55 13', 'Vecole-quimper@eni-ecole.fr', 'France', 47.9774618233667, -4.083441363150705, now(), now(), 2000);

/* Véhicules */
INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)
VALUES (1, 1, 'Citroen', 'Citroen C3', true, now(), now(), 'UI-777-SA', null, 1, 1);

INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)
VALUES (2, 1, 'Peugeot', 'Peugeot 208', true, now(), now(), 'AA-123-FF', null, 2, 1);

INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)
VALUES (3, 1, 'Opel', 'Opel Corsa', true, now(), now(), 'SS-777-GT', null, 2, 1);

INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)
VALUES (4, 1, 'Renault', 'Renault Captur', true, now(), now(), 'CV-458-RT', null, 2, 1);

INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)
VALUES (5, 1, 'Volkswagen', 'Volkswagen Golfr', true, now(), now(), 'CV-376-AA', null, 2, 1);

INSERT INTO public."Vehicules"(id, type, libelle, model, "flagService", "createdAt", "updatedAt", immatriculation, state, status, site)
VALUES (6, 1, 'Renault', 'Renault Megane Estate', true, now(), now(), 'CV-009-LI', null, 2, 1);
