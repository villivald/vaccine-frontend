describe("App", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Front page can be opened", function () {
    cy.contains("Vaccines & Vaccinations Statistics");
  });

  it("GRAPHS tab can be opened", function () {
    cy.get("#graphsLink").click();
    cy.contains("Vaccine Arrivals by Month");
  });
});

describe("Filter Vaccine", function () {
  it("user can use filter with correct credentials", function () {
    cy.get("#vaccineListLink").click();
    cy.get("#filterName").type("Pekka");
    cy.get("#filterArea").type("TAYS");
    cy.get("#filterType").type("Antiqua");
    cy.get("#vaccineLink").click();
    cy.contains("Pekka Korpijaakko");
    cy.contains("bad269bc-4e10-4dec-bd40-9bb8ac0a12cd");
    cy.get(".currentVaccineContainer").should("have.css", "display", "flex");
  });

  it("filter fails with wrong credentials", function () {
    cy.get("#vaccineListLink").click();
    cy.get("#filterName").type("Pekka");
    cy.get("#filterArea").type("OYS");
    cy.get("#filterType").type("Antiqua");
    cy.get("html").should("not.contain", "#vaccineLink");
  });
});

describe("Filter Vaccination", function () {
  it("user can use filter with correct credentials", function () {
    cy.get("#vaccinationListLink").click();
    cy.get("#filterBottle").type("75ae9638-3ad5-4433-9e94-55cc2e36c777");
    cy.get("#filterId").type("c379bf66-5a9d-4ba7-95fb-7b67dd05f8d3");
    cy.get("#vaccinationLink").click();
    cy.contains("Teija Koskimies");
    cy.contains("SolarBuddhica");
    cy.get(".currentVaccinationContainer").should(
      "have.css",
      "display",
      "flex"
    );
  });

  it("filter fails with wrong credentials", function () {
    cy.get("#vaccinationListLink").click();
    cy.get("#filterBottle").type("Wrong Source Bottle");
    cy.get("#filterId").type("Wrong Id");
    cy.get("html").should("not.contain", "#vaccinationLink");
  });
});
