import React from "react";
import { observer, inject, MobXProviderContext } from "mobx-react";
import { toHHMMSS } from "../../utils/utility";
import "./Clock.scss";

const useStores = () => {
  return React.useContext(MobXProviderContext);
};

const Clock = observer(() => {
  const { taskStore } = useStores();

  return (
    <article>
      <span className="clock-text">{toHHMMSS(taskStore.timeSpent)}</span>
    </article>
  );
});

export default Clock;
