import React from 'react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header 
      className={`items-center content-center flex-wrap border-b-[length:var(--sds-size-stroke-border)] border-b-[color:var(--sds-color-border-default-default)] flex w-full gap-[0_var(--sds-size-space-600)] overflow-hidden pt-[var(--sds-size-space-800)] pr-[var(--sds-size-space-800)] pb-[var(--sds-size-space-800)] pl-[var(--sds-size-space-800)] bg-[color:var(--sds-color-background-default-default)] border-solid max-md:max-w-full max-md:px-5 ${className}`}
      role="banner"
    >
      <div className="self-stretch flex items-center gap-6 w-10 my-auto">
        <div className="self-stretch flex w-10 items-center justify-center my-auto">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/cf5c7b7c794c2c89e396f29f25dd6bd53bd6432a?placeholderIfAbsent=true"
            alt="Company Logo"
            className="aspect-[0.69] object-contain w-6 stroke-[3.5px] stroke-[color:var(--sds-color-icon-default-default)] self-stretch my-auto"
          />
        </div>
      </div>
      <nav 
        className="self-stretch flex min-w-60 w-[1072px] shrink h-8 gap-[8px_var(--sds-size-space-200)] flex-1 basis-[0%] my-auto"
        aria-label="Main navigation"
      >
      </nav>
    </header>
  );
};
