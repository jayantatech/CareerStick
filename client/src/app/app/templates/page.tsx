import AppHeader from "@/components/AppHeader";

const Templates = () => {
  return (
    <div className="flex flex-col h-screen">
      <AppHeader title="Templates" />
      <div className=" h-full flex flex-col items-center justify-center bg-[#F3F5F6] p-4">
        <div className="bg-white rounded-lg shadow-xl p-3 md:p-12 max-w-2xl w-full">
          <h1
            className={`font-heading text-3xl md:text-4xl font-bold text-[#3B41E9] mb-4 text-center`}
          >
            Templates
          </h1>
          <div
            className={`font-heading text-xl md:text-2xl font-semibold text-[#3B41E9] mb-6 text-center`}
          >
            Coming Soon
          </div>
          <p className={`font-body text-[17px] text-gray-600 mb-8 text-center`}>
            Simplify your workflow! Our collection of customizable templates is
            coming soon to help you create stunning designs and documents in no
            time. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Templates;
