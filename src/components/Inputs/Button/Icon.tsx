import { FC, SVGProps } from "react";
import { ReactComponent as ShareIcon } from "./images/share.svg";

const Icons: Record<
  string,
  FC<SVGProps<SVGSVGElement> & { title?: string | undefined }>
> = {
  share: ShareIcon,
};

interface IconI {
  icon?: string;
}
const Icon: FC<IconI> = ({ icon }) => {
  if (!icon) return null;

  const Icon = Icons[icon];

  return (
    <div className="mr-2">
      <Icon />
    </div>
  );
};

export default Icon;
