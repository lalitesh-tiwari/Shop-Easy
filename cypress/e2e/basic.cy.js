describe("Basic E-commerce Flow", () => {

  it("opens home page", () => {
    cy.visit("http://localhost:5173");
    cy.contains("CHOOSE FROM VARIOUS CATEGORIES");
  });

  it("clicks a product and goes to detail page", () => {
    cy.visit("http://localhost:5173");

    cy.get(".pcard").first().click();

    cy.url().should("include", "/product/");
  });

  it("adds product to cart", () => {
    cy.visit("http://localhost:5173");

    cy.get(".pcard").first().click();

    cy.contains("Add to Cart").click();

    cy.contains("Added to Cart");
  });

  it("opens cart page", () => {
    cy.visit("http://localhost:5173/cart");

    cy.contains("Cart");
  });

});