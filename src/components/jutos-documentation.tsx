import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function JutosDocumentation() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Jutos Language Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="mb-4">
          Jutos is a simple interpreted programming language with support for
          basic arithmetic operations, variable declarations, function
          definitions, and object literals.
        </p>

        <h2 className="text-xl font-semibold mb-2">Language Features</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Variable declarations (let and const)</li>
          <li>Function declarations</li>
          <li>Arithmetic operations (+, -, *, /, %)</li>
          <li>Object literals</li>
          <li>Function calls</li>
          <li>Member expressions (object property access)</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Syntax Examples</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm mb-4">
          {`// Variable declaration
let x = 5;
const y = 10;

// Function declaration
fn add(a, b) {
  return a + b;
}

// Object literal
let person = {
  name: "John",
  age: 30
};

// Function call
let result = add(x, y);

// Member expression
let name = person.name;`}
        </pre>

        <h2 className="text-xl font-semibold mb-2">Built-in Functions</h2>
        <ul className="list-disc pl-6">
          <li>
            <code>print(...args)</code>: Prints the arguments to the console
          </li>
          <li>
            <code>time()</code>: Returns the current timestamp
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
