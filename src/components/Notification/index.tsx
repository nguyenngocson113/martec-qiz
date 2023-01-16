import classNames from "classnames";
import React, { FunctionComponent, SVGProps, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import notitcationReducer from "../../store/reducers/notification";
import { ReactComponent as ErrorIcon } from "./error.svg";
import { ReactComponent as SuccessIcon } from "./success.svg";

const Icons: Record<
  string,
  FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>
> = {
  error: ErrorIcon,
  success: SuccessIcon,
};

const Notification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector(
    (state: DefaultRootState) => state.notification
  );

  useEffect(() => {
    notifications.map((notification) => {
      setTimeout(() => {
        dispatch(notitcationReducer.actions.remove(notification.id));
      }, 5000);
    });
  }, [notifications]);

  return (
    <ul>
      {notifications.map((notification) => {
        const { type, content, title } = notification;
        const Icon = Icons[type];

        return (
          <div
            className={classNames(
              "h-screen mt-5 z-50 ml-auto mr-auto fixed right-0 left-0 visible"
            )}
          >
            <div
              className={classNames(
                "border-gray-300 border p-3 flex items-start shadow-lg rounded-md space-x-2",
                {
                  "bg-white": type === "success",
                  "text-white bg-red-500": type === "error",
                }
              )}
            >
              <Icon />
              <div className="flex-1 space-y-1">
                <p className="text-base leading-6 font-medium">{title}</p>
                <p className="text-sm leading-5">{content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default Notification;
