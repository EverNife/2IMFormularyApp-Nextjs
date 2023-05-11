import cn from "classnames";
import React, {HTMLInputTypeAttribute, InputHTMLAttributes, useEffect} from "react";
import { AnyMaskedOptions } from "imask";
import { IMask } from "react-imask";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	inputClassName?: string;
	labelKey?: string;
	placeholderKey?: string;
	name: string;
	errorKey?: string;
	type?: HTMLInputTypeAttribute;
	shadow?: boolean;
	disabled?: boolean;
	maskOptions?: AnyMaskedOptions;
	sideComponent?: React.ReactNode;
}
const classes = {
	root: "py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out",
	solid: "border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12",
};
const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className = "block",
			labelKey,
			name,
			errorKey,
			placeholderKey,
			shadow = false,
			type = "text",
			inputClassName,
			maskOptions = undefined,
			sideComponent = undefined,
			disabled = false,
			...rest
		},
		ref
	) => {
		const rootClassName = cn(
			classes.root,
			classes.solid,
			{
				"bg-white": !disabled,
				"bg-gray-100": disabled,
				"focus:shadow-md": shadow,
			},
			inputClassName
		);

		useEffect(() => {
			if (maskOptions !== undefined){
				const inputElement = document.getElementById(name);
				// @ts-ignore
				IMask(inputElement, maskOptions); //Apply IMask (it's a listener) on the input field
			}
		},[name]);

		if (sideComponent !== undefined) {
			return (
				<div className={className}>
					{labelKey && (
						<label
							htmlFor={name}
							className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
						>
							{labelKey}
						</label>
					)}
					<div className="space-x-1 flex">
						<input
							id={name}
							name={name}
							type={type}
							ref={ref}
							// @ts-ignore
							placeholder={placeholderKey}
							className={cn(rootClassName, "w-full")}
							autoComplete="off"
							spellCheck="false"
							aria-invalid={errorKey ? "true" : "false"}
							disabled={disabled}
							{...rest}
						/>
						{sideComponent}
					</div>
					{errorKey && <p className="my-2 text-xs text-red-500">{errorKey}</p>}
				</div>
			);
		}

		return (
			<div className={className}>
				{labelKey && (
					<label
						htmlFor={name}
						className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
					>
						{labelKey}
					</label>
				)}
				<input
					id={name}
					name={name}
					type={type}
					ref={ref}
					// @ts-ignore
					placeholder={placeholderKey}
					className={rootClassName}
					autoComplete="off"
					spellCheck="false"
					aria-invalid={errorKey ? "true" : "false"}
					disabled={disabled}
					{...rest}
				/>
				{errorKey && <p className="my-2 text-xs text-red-500">{errorKey}</p>}
			</div>
		);
	}
);

export default Input;
