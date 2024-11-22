import AppHeader from "@/components/AppHeader";

const JobTracker = () => {
  return (
    <div className="flex flex-col h-screen">
      <AppHeader title="Salary Analyzer" />
      <div className=" h-full flex flex-col items-center justify-center bg-[#F3F5F6] p-4">
        <div className="bg-white rounded-lg shadow-xl p-3 md:p-12 max-w-2xl w-full">
          <h1
            className={`font-heading text-3xl md:text-4xl font-bold text-[#3B41E9] mb-4 text-center`}
          >
            Salary Analyzer
          </h1>
          <div
            className={`font-heading text-xl md:text-2xl font-semibold text-[#3B41E9] mb-6 text-center`}
          >
            Coming Soon
          </div>
          <p className={`font-body text-[17px] text-gray-600 mb-8 text-center`}>
            Discover your worth! Our AI-powered Salary Analyzer is coming soon
            to help you analyze, compare, and negotiate your salary with
            confidence. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobTracker;
