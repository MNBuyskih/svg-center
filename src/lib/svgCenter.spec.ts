import {expect} from "chai";
import {svgCenter} from "./svgCenter";

describe("SvgCenter", () => {
  context("with default width and height", () => {
    it("returns a svg with default width and height", () => {
      expect(svgCenter("")).to.include(`width="36"`);
      expect(svgCenter("")).to.include(`height="36"`);
    });
  });

  context("with specified width and height", () => {
    it("returns a svg with specified width and height", () => {
      expect(svgCenter("", 40, 40)).to.include(`width="40"`);
      expect(svgCenter("", 40, 40)).to.include(`height="40"`);
    });
  });
});
