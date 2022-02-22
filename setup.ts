import Database from "better-sqlite3";

const db = new Database("./data.db", {
  verbose: console.log,
});

const deleteMuseumsTable = db.prepare(`
DROP TABLE IF EXISTS museums

`);

const deleteWorksTable = db.prepare(`
DROP TABLE IF EXISTS works

`);
deleteWorksTable.run();
deleteMuseumsTable.run();

const createMuseums = db.prepare(`
CREATE TABLE IF NOT EXISTS museums(
  id INTEGER,
  name TEXT NOT NULL,
  city TEXY NOT NULL ,
  PRIMARY KEY (id)
);
`);
createMuseums.run();

const createWorks = db.prepare(`
    CREATE TABLE IF NOT EXISTS works(
        id INTEGER,
        name TEXT NOT NULL,
        picture TEXY NOT NULL, 
        workId INTEGER NOT NULL,
        FOREIGN KEY(workId) REFERENCES museums (id),
        PRIMARY KEY (id)
      );
      `);
createWorks.run();

const museums = [
  {
    name: "National Museum of Archaeology",
    city: "Tirana",
  },
  {
    name: "Louvre ",
    city: "Paris",
  },
  {
    name: "State Hermitage",
    city: "San Petersburg",
  },
  {
    name: "Vatican Museum",
    city: "Vatican",
  },
  {
    name: "The Metropolitan Museum of Art New York",
    city: "New York",
  },
  {
    name: "The British Museum",
    city: "London",
  },
];

const works = [
  {
    name: "Curators",
    picture:
      "https://www.ne-mo.org/fileadmin/_processed_/1/0/csm__c_MRBAB__photo__Dieter_Telemans_wsp_ed7cbf8c2e.jpg",
    workId: 1,
  },
  {
    name: "Historian.",
    picture:
      "https://bestaccreditedcolleges.org/cimages/multimages/16/5db61342-22d0-4ef3-b32c-ebe0b9ef3a70_archivist.jpg",
    workId: 2,
  },
  {
    name: "Tour Guide",
    picture:
      "https://bestaccreditedcolleges.org/cimages/multimages/16/5db61342-22d0-4ef3-b32c-ebe0b9ef3a70_archivist.jpg",
    workId: 3,
  },
  {
    name: "Outreach Director",
    picture:
      "https://artdependence.com/media/11035/beverlymorganwelch_1_resize.jpg?width=609&height=406",
    workId: 3,
  },
  {
    name: "Archivist",
    picture:
      "https://bestaccreditedcolleges.org/cimages/multimages/16/5db61342-22d0-4ef3-b32c-ebe0b9ef3a70_archivist.jpg",
    workId: 4,
  },
  {
    name: "Volunteer",
    picture:
      "https://bestaccreditedcolleges.org/cimages/multimages/16/5db61342-22d0-4ef3-b32c-ebe0b9ef3a70_archivist.jpg",
    workId: 5,
  },
];

const createMuseum = db.prepare(`
INSERT INTO museums ( name, city) VALUES(?,?)
`);
const createWork = db.prepare(`
INSERT INTO works ( name, picture, workId) VALUES(?,?,?)
`);

for (const museum of museums) {
  createMuseum.run(museum.name, museum.city);
}

for (const work of works) {
  createWork.run(work.name, work.picture, work.workId);
}
