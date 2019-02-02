import * as React from "react";

export interface ContextValue {
    discounts: { [T: string]: { rate: number; amount: number; } };
    onChange: (type: string, rate?: number) => void;
    initialInterest: {
        rate: number;
        amount: number;
    }
}

export const Context = React.createContext<ContextValue>({
    discounts: {},
    onChange: () => undefined,
    initialInterest: {
        rate: 0.0175,
        amount: 0,
    },
});
