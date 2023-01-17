import classNames from "classnames";
import React, { FC } from "react";
import Icon from "./Icon";
import Loading from "./Loading";

interface ButtonI {
  isLoading?: boolean;
  text?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  color?: string;
  icon?: string;
  disabled?: boolean;
  outline?: boolean;
}

const COLOR_CLASSES: Record<string, string> = {
  primary: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white",
  error: "bg-red-500 hover:bg-red-700 focus:ring-red-500 text-white",
};

const Button: FC<ButtonI> = ({
  isLoading = false,
  text,
  type,
  onClick,
  className,
  color = "primary",
  icon = "",
  disabled = false,
  outline = true,
}) => {
  return (
    <div className={classNames("flex items-center justify-center")}>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={classNames(
          "w-full inline-flex justify-center items-center px-4 py-2 text-sm font-semibold leading-6 transition duration-150 ease-in-out",
          { "text-opacity-25": isLoading },
          { [COLOR_CLASSES[color]]: true },
          { "rounded-md shadow": outline },
          className
        )}
      >
        <Loading loading={isLoading} />
        <Icon icon={icon} />
        {text && text}
      </button>
    </div>
  );
};

export default Button;
