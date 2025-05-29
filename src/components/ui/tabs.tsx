import React, { useState } from "react";

export function Tabs({ defaultValue, children }: any) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { currentValue: value, setValue })
      )}
    </div>
  );
}

export function TabsList({ children, value, setValue }: any) {
  return (
    <div className="flex gap-2 mb-2">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { currentValue: value, setValue })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, setValue }: any) {
  return (
    <button
      className="rounded px-3 py-1 bg-gray-200 hover:bg-gray-300"
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value: tabValue, currentValue, children }: any) {
  return tabValue === currentValue ? <div>{children}</div> : null;
}
