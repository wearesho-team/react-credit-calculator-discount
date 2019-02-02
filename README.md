# React Credit Calculator Discount

This package allows you to control interest rate/amount for your calculator from
[base package](https://github.com/wearesho-team/react-credit-calculator) with discounts.

## Installation

```bash
npm i --save react-credit-calculator@^2 react-credit-calculator-discount
```

## Usage

1. Put [Discount controller](./src/Controller.tsx) after your calculator controller

```typescript jsx
import * as React from "react";
import * as Calculator from "react-credit-calculator";
import * as Discount from "react-credit-calculator-discount";

export class Layout extends React.Component {
    public render() {
        return (
            <Calculator.Controller>
                <Discount.Controller>
                    {/* ... */}
                </Discount.Controller>
            </Calculator.Controller>
        )
    }
}
```

If discount will be put into discount controller, your target interest rate/amount will change.
You will also able to receive all actual discounts.

2\. Use [Discount control](./src/Control.tsx) and [Discount button](./src/Button.tsx)
to control specific discounts

```typescript jsx
import * as React from "react";
import * as Calculator from "react-credit-calculator";
import * as Discount from "react-credit-calculator-discount";

export class Layout extends React.Component {
    public render() {
        return (
            <Calculator.Controller>
                <Discount.Controller>
                    <Discount.Control type="discountType" rate={0.5}>
                        <Discount.Button {...buttonProps}>
                            Activate/deactivate discount with type "discountType"
                        </Discount.Button>
                    </Discount.Control>
                </Discount.Controller>
            </Calculator.Controller>
        )
    }
}
```

This example shows how to append/remove discount with type "discountType" and rate = 0.5 on button click.
Discount will be either appended or removed, depending on whether it is active.
You can combine different discount types.
You can receive active discounts in [Discount controller context consumer](./src/Context.ts).

```typescript jsx
import * as React from "react";
import * as Discount from "react-credit-calculator-discount";

export const ActiveDiscountsLabel = () => (
    <Discount.Context.Consumer>
        {(context: Discount.ContextValue) => (
            <>
                {
                    Object.keys(context.discounts).map((type) => (
                        <React.Fragment key={type}>
                            <p>Type: {type}</p>
                            <p>Discount amount: {context.discounts[type].amount}</p>
                            <p>Discount rate: {context.discounts[type].rate}</p>
                        </React.Fragment>
                    ))
                }
                <p>
                    Total discount amount:
                    {Object.values(context.discounts).reduce((carry, current) => carry + current.amount, 0)}
                </p>
                <p>
                    Total discount rate:
                    {Object.values(context.discounts).reduce((carry, current) => carry + current.rate, 0)}
                </p>
            </>
        )}
    </Discount.Context.Consumer>
)
```
