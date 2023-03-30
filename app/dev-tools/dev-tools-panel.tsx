import * as React from 'react';
import clsx from 'clsx';
import { useDevTools } from './dev-tools-context';

export default function DevToolsPanel() {
  const [devSettings, setDevSettings] = useDevTools();
  const [isOpen, setIsOpen] = React.useState(false);

  function toggleVisibility() {
    setIsOpen(!isOpen);
  }

  const toggleMocking: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDevSettings({ ...devSettings, mock: e.currentTarget.checked });
  };

  return (
    <React.Fragment>
      <button
        aria-label="Toggle Developer Tools"
        type="button"
        className="absolute bottom-4 right-4 z-10 flex h-16 w-16 cursor-pointer items-center justify-center border border-solid border-current bg-white p-2 shadow-lg sm:bottom-8 sm:right-8"
        onClick={toggleVisibility}
      >
        {isOpen ? <CloseIcon /> : <ToolsIcon />}
      </button>
      <div
        className={clsx(
          'absolute bottom-0 left-0 w-full overflow-hidden bg-black/80',
          {
            'h-0': !isOpen,
            'p-0': !isOpen,
            'h-auto': isOpen,
            'p-4': isOpen,
            'sm:p-8': isOpen,
          },
        )}
      >
        <h3 className="mb-4 text-xl font-bold text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] sm:mb-8 sm:text-2xl">
          Developer Tools
        </h3>
        <div className="grid w-full grid-cols-1 gap-4 sm:w-[90%] sm:gap-8 md:grid-cols-2">
          <label className="inline-flex cursor-pointer select-none items-center text-white sm:text-xl">
            Mock network requests:
            <input
              type="checkbox"
              className="ml-2 h-5 w-5"
              checked={devSettings?.mock ?? true}
              onChange={toggleMocking}
            />
          </label>
        </div>
      </div>
    </React.Fragment>
  );
}

function ToolsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="32"
      height="32"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.48 7.27c.26.26 1.28 1.33 1.28 1.33l.56-.58-.88-.91 1.69-1.8s-.76-.74-.43-.45c.32-1.19.03-2.51-.87-3.44C4.93.5 3.66.2 2.52.51l1.93 2-.51 1.96-1.89.52-1.93-2C-.19 4.17.1 5.48 1 6.4c.94.98 2.29 1.26 3.48.87zm6.44 1.94l-2.33 2.3 3.84 3.98c.31.33.73.49 1.14.49.41 0 .82-.16 1.14-.49.63-.65.63-1.7 0-2.35l-3.79-3.93zM16 2.53L13.55 0 6.33 7.46l.88.91-4.31 4.46-.99.53-1.39 2.27.35.37 2.2-1.44.51-1.02L7.9 9.08l.88.91L16 2.53z"
      ></path>
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
