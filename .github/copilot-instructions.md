# GitHub Copilot Instructions for TypeScript Project

## Coding Guidelines

- **Strict Type Checking**: Always enable strict type checking and ensure your code compiles without any warnings.
- **Type Inference**: Prefer leveraging TypeScript's powerful type inference capabilities instead of explicit type annotations unless the inference is unclear or ambiguous.
- \*\*Avoid \*\*\`\`: Never use the `any` type. Use explicit types or generics instead to maintain type safety.
- **Well-Structured Code**: Write modular, readable, and maintainable code. Follow single-responsibility principles and clearly separate concerns.

## Writing Documentation

Before documenting any code:

1. **Understand the Implementation**:

   - Thoroughly read and comprehend the code.
   - Identify related unit tests and carefully read their implementation to fully grasp the expected behavior.

2. **Documentation Format (TSDoc)**:

   - Always use the TSDoc format for comments.
   - Provide a clear and concise description of functions, classes, interfaces, and types.
   - Detail each parameter, return type, and possible exceptions clearly.

3. **Include Examples**:

   - Every documentation entry should include a practical example.
   - Examples must accurately reflect typical usage scenarios.

**Example TSDoc comment:**

````typescript
/**
 * Calculates the sum of two numbers.
 *
 * @param a - The first number.
 * @param b - The second number.
 * @returns The sum of the two numbers.
 *
 * @example
 * ```typescript
 * const result = sum(2, 3);
 * console.log(result); // Output: 5
 * ```
 */
function sum(a: number, b: number): number {
  return a + b;
}
````

## Writing the README

Before creating the README file:

1. **Review Project Code**:

   - Carefully read and understand the entire codebase.
   - Familiarize yourself thoroughly with the project's architecture, key components, and overall purpose.

2. **Use Demo Project as Reference**:

   - Locate and review the companion demo project, named `<project-name>-demo`, to illustrate practical usage.
   - Include code snippets and explanations inspired by the demo project.

3. **Incorporate Documentation and Comments**:

   - Integrate insights directly from existing TSDoc documentation and inline comments.
   - Clearly explain project installation, configuration, basic usage, and advanced concepts.

**README Example Structure**:

````markdown
# Project Name

Brief description of what the project does and its main purpose.

## Installation

```sh
npm install project-name
````

## Basic Usage

Provide a minimal example extracted from `<project-name>-demo`:

```typescript
import { exampleFunction } from 'project-name';

exampleFunction();
```

## Documentation

Refer to detailed inline TSDoc comments within the codebase for extensive documentation.

## Examples

Detailed examples showing typical usage scenarios based on `<project-name>-demo`.

## Contributing

Instructions on contributing to the project, guidelines for pull requests, code reviews, and feature requests.

## License

Specify the project's license clearly.

```
```
