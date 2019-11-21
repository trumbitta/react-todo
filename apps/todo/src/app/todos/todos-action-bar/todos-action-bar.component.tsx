/** @format */

import React, { FunctionComponent } from 'react';

const TodosActionBar_: FunctionComponent<TodosActionBarProps> = ({
  isDisabledButtons = false,
  onToggleAll,
  onDeleteAll,
}) => {
  const toggleAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onToggleAll();
  };

  const deleteAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onDeleteAll();
  };

  return (
    <aside>
      <button
        type="button"
        {...(isDisabledButtons ? { disabled: true } : null)}
        onClick={toggleAll}
      >
        Toggle all
      </button>

      <button
        type="button"
        {...(isDisabledButtons ? { disabled: true } : null)}
        onClick={deleteAll}
      >
        Delete all
      </button>
    </aside>
  );
};

interface TodosActionBarProps {
  isDisabledButtons?: boolean;
  onToggleAll: () => void;
  onDeleteAll: () => void;
}

export const TodosActionBar = React.memo(TodosActionBar_);
