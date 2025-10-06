import PortfolioCase from "@/components/PortfolioCase";

const Index = () => {
  const cases = [
    {
      title: "All-in-4 Upper & Lower",
      src: "cases/All-in-4 Upper Lower.html"
    },
    {
      title: "All-in-6 Lower",
      src: "cases/All-in-6 Lower.html"
    },
    {
      title: "Mirroring Sides",
      src: "cases/Mirroring sides.html"
    },
    {
      title: "Mixed Full Rehabilitation with BOPT",
      src: "cases/Mixed Full Rehabilitation with BOPT.html"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="px-6 py-16 md:py-24 text-center border-b border-border/50">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-resume-heading tracking-tight">
            Digital Smile Designer
          </h1>
          <p className="text-xl md:text-2xl text-resume-subheading font-light">
            CAD/CAM Dental Technician
          </p>
          <p className="text-sm md:text-base text-resume-subtle uppercase tracking-wider">
            Remote Work
          </p>
        </div>
      </header>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <div className="space-y-6 text-resume-body leading-relaxed">
          <p>
            I'm a digital smile designer with <strong className="font-semibold text-resume-heading">7 years of experience</strong> in CAD/CAM dentistry, specializing in <strong className="font-semibold text-resume-heading">Exocad</strong>. I create all types of restorations, including <strong className="font-semibold text-resume-heading">All-on-4, All-on-X</strong>, and full-mouth rehabilitations on <strong className="font-semibold text-resume-heading">monolithic zirconia</strong>.
          </p>
          <p>
            I own a fully equipped dental laboratory in my hometown, which allows me to perform the entire production cycle myself — from digital design to final finishing. This gives me a clear understanding of how each restoration should fit and function inside the patient's mouth.
          </p>
          <p>
            I hold a degree in Dentistry, giving me insight into both the technical and clinical perspectives of each case.
          </p>
          <p>
            Additionally, I've organized and taught courses on staining zirconia with <strong className="font-semibold text-resume-heading">MiYO colors</strong>, sharing my experience as a lecturer with other dental professionals.
          </p>
          <p>
            I work remotely, seven days a week, with turnaround times ranging from <strong className="font-semibold text-resume-heading">10 minutes to 10 hours</strong>, depending on case complexity (delays are extremely rare).
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-light text-resume-heading text-center mb-12 md:mb-16 tracking-tight">
          Portfolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {cases.map((case_, index) => (
            <PortfolioCase
              key={index}
              title={case_.title}
              iframeSrc={case_.src}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-8 text-center">
        <p className="text-sm text-resume-subtle">
          © 2025 Zaur Magomedov — Digital Smile Design & CAD/CAM Expertise
        </p>
      </footer>
    </div>
  );
};

export default Index;
