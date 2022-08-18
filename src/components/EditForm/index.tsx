import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryCache } from "react-query";
import { Transition } from "react-transition-group";

import classnames from "classnames";

import CloseIcon from "assets/svg/close";
import { updateTitle } from "api/updateTitle";

type Inputs = {
  title: string;
};

type Props = {
  id : string;
  inProp: boolean;
  lastTitle: string;
  onCancel: () => void;
};

const DURATION = 240;

const formDefaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${
    DURATION * 2
  }ms ease-in-out`,
  opacity: 0,
  bottom: "-180px",
};

const overlayDefaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${
    DURATION * 2
  }ms ease-in-out`,
  opacity: 0,
  display: "none",
};

const formTransitionStyles = {
  unmounted: { bottom: "-180px", opacity: 0 },
  entering: { bottom: 0, opacity: 1 },
  entered: { bottom: 0, opacity: 1 },
  exiting: { bottom: "-180px", opacity: 0 },
  exited: { bottom: "-180px", opacity: 0 },
};

const overlayTransitionStyles = {
  unmounted: { bottom: "-180px", opacity: 0 },
  entering: { display: "block", opacity: 0.85 },
  entered: { display: "block", opacity: 0.85 },
  exiting: { bottom: "-180px", opacity: 0 },
  exited: { bottom: "-180px", opacity: 0 },
};

const EditForm: React.FC<Props> = ({ inProp, onCancel, lastTitle, id }) => {
  const cache = useQueryCache();

  const { register, handleSubmit, errors, reset } = useForm<Inputs>();
  const [mutate] = useMutation(updateTitle, {
    onSuccess: () => {
      cache.invalidateQueries("todos");
    },
  });

  const handleOnClose = () => {
    reset();
    onCancel();
  };

  // React-Hook-Form
  const onSubmit = async (data: Inputs): Promise<void> => {
    try {
      await mutate({id:id, title:data.title});
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  const placeholderStyle = classnames(
    ["text-darkPurple", "flex-1", "bg-transparent", "outline-none"].join(" "),
    {
      "placeholder-red-400": errors.title,
    }
  );

  const inputStyle = classnames(
    "flex justify-center items-center bg-gray-200 px-4 py-2 rounded-lg box-border",
    {
      "bg-red-200": errors.title,
    }
  );

  return (
    <Transition in={inProp} timeout={DURATION}>
      {(state) => {
        return (
          <>
            <div
              onClick={handleOnClose}
              style={{
                ...overlayDefaultStyle,
                ...overlayTransitionStyles[state],
              }}
              className="fixed left-0 top-0 bottom-0 right-0 bg-black"
            />

            <div
              style={{
                ...formDefaultStyle,
                ...formTransitionStyles[state],
              }}
              className="fixed flex flex-col z-10 inset-x-0 rounded-t-lg p-4 h-32 bg-white"
            >
              <form className={inputStyle} onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="title"
                  defaultValue={lastTitle}
                  placeholder={
                  errors.title ? "...Oops!" : "Type your todo here"
                  }
                  className={placeholderStyle}
                  ref={register({
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                    maxLength: {
                      value: 30,
                      message: "No more than 30 characters!",
                    },
                    minLength: {
                      value: 8,
                      message: "Minimum characters is 8!",
                    },
                  })}
                />

                {errors.title ? (
                <button
                  onClick={() => reset()}
                  className="bg-transparent text-md font-bold text-darkPurple outline-none ml-1"
                >
                </button>
                ) : (
                <input
                  type="submit"
                  value="Edit"
                  className="bg-transparent text-md font-bold text-darkPurple outline-none ml-1"
                />
                )}
              </form>
              {errors.title && (
              <span className="text-xs text-red-500 font-semibold tracking-wide mt-2 pl-1">
                {errors?.title?.message}
              </span>
              )}

              <span
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  bottom: "10px",
                  left: "50%",
                }}
              >
                <CloseIcon onClick={handleOnClose} />
              </span>
            </div>
          </>
        );
      }}
    </Transition>
  );
};

export default EditForm;
