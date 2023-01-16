import classNames from "classnames";
import { FC, useState } from "react";
import { ReactComponent as EyeIcon } from "../../public/images/eye.svg";
import { ReactComponent as EyeSlashIcon } from "../../public/images/eyeSlash.svg";

interface PasswordInput {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameError?: string;
  required?: boolean;
  placeholder?: string;
  classAttr: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label: string;
  classWrapper?: string;
}

const TextInput: FC<PasswordInput> = ({
  name,
  value,
  onChange,
  onBlur,
  nameError,
  required,
  placeholder,
  classAttr,
  label,
  classWrapper,
}) => {
  const [isShow, setShow] = useState<boolean>(false);
  const Icon = isShow ? EyeSlashIcon : EyeIcon;
  return (
    <div>
      {label && (
        <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
          {label}
        </label>
      )}
      <div className={classWrapper}>
        <input
          name={name ?? "name"}
          type={isShow ? "text" : "password"}
          required={required ?? false}
          value={value ?? name}
          onChange={onChange}
          onBlur={onBlur}
          className={classNames(classAttr, { "border-red-500": nameError })}
          placeholder={placeholder}
        />
        <Icon
          className="absolute mr-2 w-4"
          onClick={() => {
            setShow(!isShow);
          }}
        />
      </div>
      {nameError && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {nameError}
        </span>
      )}
    </div>
  );
};

export default TextInput;
