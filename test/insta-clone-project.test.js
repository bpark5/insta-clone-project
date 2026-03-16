import { html, fixture, expect } from '@open-wc/testing';
import "../insta-clone-project.js";

describe("InstaCloneProject test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <insta-clone-project
        title="title"
      ></insta-clone-project>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
