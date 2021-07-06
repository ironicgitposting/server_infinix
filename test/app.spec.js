/* eslint-disable no-undef */

/**
 * Exemple de test unitaire
 * https://mochajs.org/#getting-started
 */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");

// Assertion style
chai.should();

chai.use(chaiHttp);

describe("APP Bootstrap", () => {
  /**
   * Test the Get route
   */
  describe("GET /api/v1/", () => {
    it("Application should start and return 200", (done) => {
      chai
        .request(server)
        .get("/api/v1/")
        .end((err, response) => {
          response.should.have.status(200);
          // console.log(response);
          done();
        });
    });
  });

  /**
   * Test the Put route
   */

  /**
   * Test the Get (by id) route
   */

  /**
   * Test the Patch route
   */

  /**
   * Test the Delete route
   */
});
