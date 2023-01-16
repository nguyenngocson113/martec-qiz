import classNames from "classnames";
import React, { FC } from "react";

interface TextInputI {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameError?: string;
  type?: undefined | string;
  required?: boolean;
  placeholder?: string;
  classAttr: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  classWrapper?: string;
  icon?: React.Component;
}

const TextInput: FC<TextInputI> = ({
  name,
  value,
  onChange,
  onBlur,
  nameError,
  type,
  required,
  placeholder,
  classAttr,
  label,
  classWrapper,
}) => {
  return (
    <div className={classWrapper}>
      {label && (
        <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
          {label}
        </label>
      )}
      <input
        name={name ?? "name"}
        type={type ?? "text"}
        required={required ?? false}
        value={value ?? name}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames(classAttr, { "border-red-500": nameError })}
        placeholder={placeholder}
      />
      {nameError && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {nameError}
        </span>
      )}
    </div>
  );
};

export default TextInput;
