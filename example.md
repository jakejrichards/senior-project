### Secret of square root module

The secret of the `Sqrt` module in the previous section is the
algorithm for computing the square root.

:::{ .question id="1" text="What is the secret of the Sqrt module?" correct="algo" hint="How do we compute the square root?" }
:::::{ .answer-choice questionId="1" name="algo" text="The algorithm for computing" feedback="Correct" }
:::::
:::::{ .answer-choice questionId="1" name="name" text="The name of the function" feedback="It is not the name of the function." }
:::::
:::::{ .answer-choice questionId="1" name="size" text="The size of the module" feedback="It is not the size of the module." }
:::::
:::

### Contracts: Preconditions and postconditions

The _precondition_ of a function is what the caller (i.e. the client
of the function) must ensure holds when calling the function. A
precondition may specify the valid combinations of values of the
arguments. It may also record any constraints on any "global" state
that the function accesses or modifies.

If the precondition holds, the supplier (i.e. developer) of the
function must ensure that the function terminates with the
_postcondition_ satisfied. That is, the function returns the required
values and/or alters the "global" state in the required manner.

We sometimes call the set of preconditions and postconditions for a
function the _contract_ for that function.

:::{ .question id="2" text="What color is the sky?" correct="blue" hint="It rhymes with moo" redirect="#title-block-header" }
:::::{ .answer-choice questionId="2" name="red" text="Red" feedback="The sky is not red" }
:::::
:::::{ .answer-choice questionId="2" name="blue" text="Blue" feedback="Correct!" }
:::::
:::::{ .answer-choice questionId="2" name="green" text="Green" feedback="The sky is not green" }
:::::
:::::{ .answer-choice questionId="2" name="yellow" text="Yellow" feedback="The sky is not yellow" }
:::::
:::
