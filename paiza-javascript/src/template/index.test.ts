import { stdin } from "mock-stdin";
import mockConsole from "jest-mock-console";
import { readFileSync } from "fs";

let io = null;
beforeAll(() => (io = stdin()));
afterAll(() => {
  io.restore();
});
beforeEach(() => {
  jest.resetModules();
});

const data = readFileSync(__dirname + "/data.txt", "utf8");
data.split("====================").map((cs, i) => {
  const [x, y] = cs.split("--------------------");
  test(`${i + 1}`, async done => {
    const restore = mockConsole();
    require(__dirname + "/index.js");
    const input = x.trim();
    const output = y.trim();
    input.split("\n").forEach(line => {
      io.send(line);
      io.send("\n");
    });
    io.end();
    io.reset();
    expect(console.log).toBeCalled();
    const result = console.log["mock"].calls.map(call => call[0]).join("\n");
    expect(result).toEqual(output);
    restore();
    done();
  });
});
