describe("share video", () => {
  const userInfo = {
    willNavigate: true,
    email: "testUserShareVideo@123.com",
    fullName: "Testing User",
    password: "12345678",
    passwordConfirm: "12345678",
    userName: "testUserShareVideo",
  };

  const videoTestInfo: TEST.IVideoInfo = {
    login: true,
    willNavigate: false,
    ytbUrl: "https://www.youtube.com/watch?v=DugA46SEuPc",
  };

  const expectedDOMInfo = {
    title: "pinKing",
    partialDesc: "Provided to YouTube by miHoYo",
  };

  before(() => {
    cy.sanitizeDatabase({
      ytbUrl: videoTestInfo.ytbUrl,
      userName: userInfo.userName,
    });
    cy.register(userInfo);
    cy.waitForNetworkIdle("@register", 1000);
    cy.logout(userInfo.fullName);
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("should share a video", () => {
    cy.shareVideo(videoTestInfo, userInfo);
    cy.contains(expectedDOMInfo.partialDesc).should("be.visible");
    cy.contains(expectedDOMInfo.title).should("be.visible");
    cy.getButton("Submit").click();
    cy.waitForNetworkIdle("@shareVideo", 2000);
    cy.contains("Successfully share your video!").should("be.visible");
  });

  it("should yield link error", () => {
    cy.shareVideo(
      { ...videoTestInfo, ytbUrl: "https://www.youtube.com/watch?v=DugA46SEu" },
      userInfo
    );
    cy.getButton("Submit").click();
    cy.contains("Invalid YouTube URL").should("be.visible");
    cy.location("pathname").should("not.eq", "/videos-feed");
  });

  it("should return to log in page", () => {
    cy.shareVideo({ ...videoTestInfo, login: false }, userInfo);
    cy.getButton("Submit").click();
    cy.location("pathname").should("eq", "/auth/login");
  });
});
