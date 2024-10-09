describe("register", () => {
  const userInfo = {
    willNavigate: false,
    email: "testUserRegister@123.com",
    fullName: "Testing User",
    password: "12345678",
    passwordConfirm: "12345678",
    userName: "testUserRegister",
  };

  before(() => {
    cy.sanitizeDatabase({
      userName: userInfo.userName,
    });
  });

  it("should generate field error", () => {
    cy.visit("/");
    cy.contains("Sign Up").should("exist").click();
    cy.getButton("Sign Up!").click();
    cy.get('p[class^="px-3 pt-2 text-red-500"]').should("have.length", 5);
  });

  it("should succesfully create new user", () => {
    cy.visit("/");
    cy.contains("Sign Up").should("exist").click();

    cy.register(userInfo);

    cy.waitForNetworkIdle("@register", 1500);
    // Check if user is redirected to homepage or the page that theyve recently accessed
    cy.location("pathname").should("not.eq", "/auth/sign-up");
  });

  it("should not return 201, existed credentials", () => {
    cy.visit("/");
    cy.contains("Sign Up").should("exist").click();

    cy.register(userInfo);

    cy.waitForNetworkIdle("@register", 1500);

    // Should stay in the same route if the not sign up successfully
    cy.location("pathname").should("eq", "/auth/sign-up");
  });
});
