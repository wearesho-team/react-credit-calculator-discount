import * as React from "react";

export interface ContextValue {
    discounts: { [T: string]: { rate: number; amount: number; } };
    onChange: (type: string, rate?: number) => void;
}

export const Context = React.createContext<ContextValue>({
    discounts: {},
    onChange: () => undefined,
});
