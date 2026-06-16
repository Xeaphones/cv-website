import { Fragment } from "react";

import { Separator } from "@/components/ui/separator";

import { splitPipeList } from "./splitPipeList";

type PipeListProps = {
  text: string;
  className?: string;
  withSeparators?: boolean;
};

export function PipeList({ text, className, withSeparators = false }: PipeListProps) {
  const items = splitPipeList(text);

  if (withSeparators) {
    return (
      <>
        {items.map((value, index) => (
          <Fragment key={index}>
            <li className={className}>{value}</li>
            {index < items.length - 1 && <Separator orientation="vertical" />}
          </Fragment>
        ))}
      </>
    );
  }

  return (
    <>
      {items.map((value, index) => (
        <li key={index} className={className}>
          {value}
        </li>
      ))}
    </>
  );
}
