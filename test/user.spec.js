/* eslint-disable no-undef */

/**
 * Exemple de test unitaire
 * https://mochajs.org/#getting-started
 */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const crypto = require("crypto");
const db = require("../src/models");
const { User } = db.sequelize.models;

// Assertion style
chai.should();

chai.use(chaiHttp);

let token;
let generatedTestUser = {
  surname: "Test",
  telephone: "0123456789",
  password: "Test@t3st.com",
  email: "t3st@Test.com",
  name: "Test",
};
// Testing Routes
const endpoint = "/api/v1/users";
describe("Testing user routes", () => {
  /**
   * Test the Get route
   */

  it("Fetching users without a proper token should return 401", (done) => {
    chai
      .request(server)
      .get(endpoint)
      .end((err, response) => {
        response.should.have.status(401);
        // console.log(response);
        done();
      });
  });

  it("Fetching a Token for ###### User should return 200", (done) => {
    chai
      .request(server)
      .post(endpoint + "/login")
      // TODO: Utiliser des variables d'environnements ici
      .send({
        email: "infinix.supp@gmail.com",
        password: "1nfinix.supp@gmail.coM",
      })
      //.expect(200)
      .end((err, response) => {
        if (response.status == 200) {
          token = response.body.token;
        }
        response.should.have.status(200);
        done();
      });
  });

  it("Fetching all users with a proper Admin Token should return 200", (done) => {
    chai
      .request(server)
      .get(endpoint)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it("Generating a test user should return 200", (done) => {
    const password = crypto.randomBytes(12).toString("hex") + "@";

    chai
      .request(server)
      .post(endpoint + "/signup")
      .send(generatedTestUser)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  /**
   * Test the Put route
   */
  it("Updating a test user should return 200", (done) => {
    generatedTestUser.surname = "TestTest";
    const email = generatedTestUser.email;
    chai
      .request(server)
      .put(endpoint + "/update/" + email)
      .set({ Authorization: `Bearer ${token}` })
      .send(generatedTestUser)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  /*
  Test if the model is working and if we were able
  to update it properly
  */
  it(`"Surname for user: '${generatedTestUser.email}' should be 'TestTest'"`, async (done) => {
    const email = generatedTestUser.email;
    const updatedUser = await User.findOne({ where: { email } });
    console.log(updatedUser.email);
    assert.equal(updatedUser.surname, "TestTest");
    done();
  });

  /**
   *
   */
});

// Testing Models

// Testing Specific Bits
