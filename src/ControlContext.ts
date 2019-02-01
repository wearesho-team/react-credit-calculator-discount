import * as React from "react";

export interface ControlContextValue {
    onChange: (isActive: boolean) => void;
    isActive: boolean;
    type: string;
}

export const ControlContext = React.createContext<ControlContextValue>({
    onChange: () => undefined,
    isActive: false,
    type: "",
});
