import React from "react";
import cn from "classnames";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	labelKey?: string;
	label?: string | any;
	disabled?: boolean;
}

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
	({ labelKey, label, disabled = false, ...rest }, ref) => {
		return (
			<label className="group flex items-center text-heading text-sm cursor-pointer">
				<input
					type="checkbox"
					className={cn("form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading",
						{"cursor-not-allowed bg-gray-100": disabled})
					}
					ref={ref}
					disabled={disabled}
					{...rest}
				/>
				<span className={cn("ms-4 -mt-0.5", {"cursor-not-allowed": disabled})}>{labelKey ? labelKey : label}</span>
			</label>
		);
	}
);
