const foo = {
  empanadas: 6,
  milanesas: 2,
  yerba: "1 Kg"
};
const { yerba, ...rest } = foo;
console.log(yerba); // Prints "1 Kg"
console.log(rest); // Prints {empanadas: 6, milanesas: 2}
