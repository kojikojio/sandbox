process.stdin.resume();
process.stdin.setEncoding("utf8");

var lines = [];
var reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on("line", line => {
  lines.push(line);
});
reader.on("close", () => {
  const [q] = readInts(lines);
  const ns = [];
  for (let i = 0; i < q; i++) {
    ns.push(readInts(lines)[0]);
  }
  for (let i = 0; i < q; i++) {
    console.log(judge(ns[i]));
  }
});
function judge(n) {
  let count = 0;
  const max = Math.ceil(n / 2);
  for (let i = 1; i <= max; i++) {
    if (n % i === 0) {
      count += i;
    }
  }
  if (count === n) {
    return "perfect";
  }
  if (count === n - 1 || count === n + 1) {
    return "nearly";
  }
  return "neither";
}

function readInts(lines, delimiter = " ") {
  return lines
    .shift()
    .split(delimiter)
    .map(_ => parseInt(_));
}

function readStrs(lines, delimiter = " ") {
  return lines.shift().split(delimiter);
}
function readMat(lines, n, convert) {
  const r = [];
  for (let i = 0; i < n; i++) {
    r.push(lines.shift().split(""));
  }
  if (convert) {
    for (let i = 0; i < r.length; i++) {
      const row = r[i];
      for (let j = 0; j < row.length; j++) {
        r[i][j] = convert[r[i][j]];
      }
    }
  }
  return r;
}
function matrix(height, width, filler) {
  const rows = [];
  for (let i = 0; i < height; i++) {
    rows.push(new Array(width).fill(filler));
  }
  return rows;
}
