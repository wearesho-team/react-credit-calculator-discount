import * as React from "react";
import { Context, ContextValue } from "./Context";
import { ControlContext, ControlContextValue } from "./ControlContext";

export class Control extends React.PureComponent<{ type: string; rate: number }> {
    public static readonly contextType = Context;

    public readonly context: ContextValue;

    public render() {
        return <ControlContext.Provider value={this.childContextValue} children={this.props.children} />;
    }

    protected get childContextValue(): ControlContextValue {
        return {
            onChange: this.handleChange,
            isActive: !!this.context.discounts[this.props.type],
            type: this.props.type,
        }
    }

    protected handleChange = (isActive: boolean) => {
        this.context.onChange(this.props.type, isActive ? this.props.rate : undefined);
    }
}
