# You could have invented Parser Combinators

In my book *Build Your Own Lisp* I use a Parser Combinator library I wrote for C called `mpc` to teach readers about languages and parsing. Lots of people have asked me how this works, curious as to if they might be able to do it themselves. A few even dived into the `mpc` source code!

But unfortunately the implementation of `mpc` in C is quite complex due to various language limitations. Additionally most resources online about Parser Combinators can be quite cryptic for a beginner. This is because much of the text is geared toward people who already know Haskell, the language they were invented using. For those unfamiliar with Haskell, following along can be pretty difficult.

But the ideas behind Parser Combinator libraries are really quite simple. It is more than possible for a beginner to implement a Parser Combinator library in a high level language such as JavaScript in just a few hundred lines of code. In fact, you could have invented Parser Combinators... ([The Orange Duck][1])

---

## 1. The simplest parser

You start with a function which reads the first character from some input. If this first character is `a`, then it returns `a` and advances the input by one. If it isn't, it doesn't advance the input, and returns a failure.

Your boss wants this function to work for any character, not just `a`. Instead of writing a character-specific function, you create a function `lit` that generates parsers for any character:

```js
function lit(c) {
  return function(input) {
    var r = inputRead(input);
    if (r == c) {
      inputAdvance(input, 1);
      return c;
    } else {
      return failure;
    }
  };
}

var parser = lit('a');
var result = parser(input);
```

---

## 2. Adding choice (`or`)

Next, your boss wants the parser to accept one of two characters. Rather than modify the original parser, you build a function `or` that accepts two parsers and returns a new parser: it tries each in turn and returns on the first success. ([The Orange Duck][1])

---

## 3. Why this matters

The insight is simple: by writing small parser-generating functions and combining them, you create infinitely extensible parsers. You could have invented parser combinators. ([The Orange Duck][1])

---

## (Bonus) mpc: C parser combinators

In *mpc*, you define parsers like this (for a basic arithmetic expression grammar):

```c
mpc_parser_t *Expr  = mpc_new("expression");
mpc_parser_t *Prod  = mpc_new("product");
mpc_parser_t *Value = mpc_new("value");
mpc_parser_t *Maths = mpc_new("maths");

mpca_lang(MPCA_LANG_DEFAULT,
  " expression : <product> (('+' | '-') <product>)*; "
  " product    : <value>   (('*' | '/')   <value>)*; "
  " value      : /[0-9]+/ | '(' <expression> ')';    "
  " maths      : /^/ <expression> /$/;               ",
  Expr, Prod, Value, Maths, NULL);

if (mpc_parse("input", input, Maths, &r)) {
  mpc_ast_print(r.output);
  mpc_ast_delete(r.output);
} else {
  mpc_err_print(r.error);
  mpc_err_delete(r.error);
}

mpc_cleanup(4, Expr, Prod, Value, Maths);
```

You can define basic combined parsers using functions like:

* `mpc_char('x')` — single character
* `mpc_string("foo")` — exact string
* `mpc_oneof("+-*/")` — any of the characters
* Sequencing, repetition, choice combinators built into the library ([GitHub][2], [AppSignal Blog][3])

---

## TL;DR

* **Parser combinators** are functions that **generate** parsers.
* Basic parsers (e.g. `lit('a')`) can be **combined** (e.g. with `or`, sequencing).
* This composability makes it easy for beginners to build parsers from scratch.
* C libraries like `mpc` show it's possible even in non-functional languages.

---

I’ve kept the core narrative and code examples intact in Markdown format. If you'd like more sections or prefer additional details, let me know!

[1]: https://theorangeduck.com/page/you-could-have-invented-parser-combinators?utm_source=chatgpt.com "You could have invented Parser Combinators - The Orange Duck"
[2]: https://github.com/orangeduck/mpc?utm_source=chatgpt.com "orangeduck/mpc: A Parser Combinator library for C - GitHub"
[3]: https://blog.appsignal.com/2022/11/15/parser-combinators-in-elixir-a-deeper-dive.html?utm_source=chatgpt.com "Parser Combinators in Elixir: A Deeper Dive | AppSignal Blog"
