import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="w-fit fixed bottom-24 right-4 xl:right-[calc(50vw-624px)] z-100">
      <div className="sprite" />
    </div>
  );
};

export default Loading;
