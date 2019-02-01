import * as React from "react";
import * as Calculator from "react-credit-calculator";
import { Context, ContextValue } from "./Context";

export interface ControllerState {
    discounts: { [T: string]: number }
}

export class Controller extends React.Component<{}, ControllerState> {
    public static readonly contextType = Calculator.Context;

    public readonly context: Calculator.ContextValue;
    public readonly state: ControllerState = { discounts: {} };

    public render() {
        return (
            <Calculator.Context.Provider value={this.calculatorContextValue}>
                <Context.Provider value={this.childContextValue}>
                    {this.props.children}
                </Context.Provider>
            </Calculator.Context.Provider>
        );
    }

    protected get totalDiscount(): number {
        return Object.values(this.state.discounts).reduce((carry, current) => carry + (current || 0), 0);
    }

    protected get calculatorContextValue(): Calculator.ContextValue {
        const { interest } = this.context;
        const discount = this.totalDiscount;

        return {
            ...this.context,
            interest: discount
                ? {
                    rate: Math.min(interest.rate - interest.rate * discount, 1),
                    amount: Math.max(interest.amount - interest.amount * discount, 0),
                }
                : interest,
        };
    }

    protected get childContextValue(): ContextValue {
        const { amount } = this.context.interest;
        const { discounts } = this.state;
        const targetDiscounts: { [T: string]: { rate: number; amount: number }} = {};

        Object.keys(discounts)
            .filter((key) => !!discounts[key])
            .forEach((type) => {
                targetDiscounts[type] = {
                    rate: discounts[type],
                    amount: amount * discounts[type],
                };
            });

        return {
            discounts: targetDiscounts,
            onChange: this.handleChange,
        }
    }

    protected handleChange = (type: string, rate?: number) => {
        const discounts = {
            ...this.state.discounts,
            [type]: rate,
        };

        this.setState({ discounts });
    }
}
