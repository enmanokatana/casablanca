"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Parser from "../lib/frontend/parser";
import { createGlobalEnv } from "../lib/runtime/environment";
import { evaluate } from "../lib/runtime/interpreter";
import { registerJutosLanguage } from "../lib/casa-Languaage";
import { JutosDocumentation } from "../components/jutos-documentation";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function JutosEditor() {
  const [code, setCode] = useState(`// Welcome to Jutos!

// Let's define a function
fn greet(name) {
  return "Hello, " + name + "!";
}

// Now, let's use our function
let message = greet("World");
print(message);

// Let's do some math
let a = 5;
let b = 3;
let sum = a + b;
print("The sum is: " + sum);

// Conditional statement
if (sum > 7) {
  print("Sum is greater than 7");
} else {
  print("Sum is not greater than 7");
}

// Object literal
let person = {
  name: "Alice",
  age: 30,
  isStudent: false
};

print("Person's name: " + person.name);

// Array and loop
let numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < 5; i = i + 1) {
  print("Number: " + numbers[i]);
}
`);
  const [ast, setAst] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    registerJutosLanguage();
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleParseCode = () => {
    try {
      const parser = new Parser();
      const parsedAst = parser.produceAST(code);
      setAst(JSON.stringify(parsedAst, null, 2));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setAst("");
    }
  };

  const handleRunCode = () => {
    try {
      const parser = new Parser();
      const env = createGlobalEnv();
      const program = parser.produceAST(code);
      const result = evaluate(program, env);
      setOutput(JSON.stringify(result, null, 2));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setOutput("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Jutos Web Editor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Code Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <MonacoEditor
              height="400px"
              language="jutos"
              theme="jutos-theme"
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
              }}
              beforeMount={(monaco) => {
                monaco.editor.defineTheme("jutos-theme", {
                  base: "vs-dark",
                  inherit: true,
                  rules: [
                    {
                      token: "keyword",
                      foreground: "569CD6",
                      fontStyle: "bold",
                    },
                    { token: "type", foreground: "4EC9B0" },
                    { token: "identifier", foreground: "9CDCFE" },
                    { token: "string", foreground: "CE9178" },
                    { token: "number", foreground: "B5CEA8" },
                    { token: "comment", foreground: "6A9955" },
                    { token: "operator", foreground: "D4D4D4" },
                    { token: "function", foreground: "DCDCAA" },
                    { token: "variable", foreground: "9CDCFE" },
                    { token: "parameter", foreground: "9CDCFE" },
                    { token: "property", foreground: "9CDCFE" },
                    { token: "delimiter", foreground: "D4D4D4" },
                    { token: "brackets", foreground: "D4D4D4" },
                  ],
                  colors: {
                    "editor.background": "#1E1E1E",
                    "editor.foreground": "#D4D4D4",
                    "editorLineNumber.foreground": "#858585",
                    "editorCursor.foreground": "#A6A6A6",
                    "editor.selectionBackground": "#264F78",
                    "editor.inactiveSelectionBackground": "#3A3D41",
                  },
                });
              }}
            />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={handleParseCode}>Parse Code</Button>
            <Button onClick={handleRunCode}>Run Code</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Abstract Syntax Tree</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto h-[400px] text-sm">
                {ast}
              </pre>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto h-[200px] text-sm">
            {output}
          </pre>
        </CardContent>
      </Card>
      <JutosDocumentation />
    </div>
  );
}
