Cypress.Commands.add(
  "shareVideo",
  (videoInfo: TEST.IVideoInfo, userInfo: TEST.IRegisterInfo) => {
    if (videoInfo.login) {
      cy.login(userInfo);
    }

    cy.getButton("Share a Video!").click({ force: true });
    cy.getInputByLabel("Youtube Link").clear().type(videoInfo.ytbUrl);
  }
);
