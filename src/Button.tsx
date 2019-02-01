import * as React from "react";
import { ControlContext, ControlContextValue } from "./ControlContext";

export const Button = React.memo((props: React.HTMLProps<HTMLButtonElement>) => (
    <ControlContext.Consumer>
        {(context: ControlContextValue) => (
            <button
                {...props}
                data-active={context.isActive}
                data-discount-type={context.type}
                type="button"
                onClick={() => context.onChange(!context.isActive)}
            />
        )}
    </ControlContext.Consumer>
));
