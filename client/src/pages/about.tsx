import { Clock, Target, TestTube, Infinity } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function About() {
  const teamMembers = [
    {
      name: "Vijay Ramdev",
      role: "Backend Developer",
      description: "YOLOv8 integration & computer vision",
      image: "https://media.licdn.com/dms/image/v2/D4D35AQGZw33F7mV1gQ/profile-framedphoto-shrink_400_400/B4DZgWd0J7HAAc-/0/1752723571624?e=1754679600&v=beta&t=xNKrbCLcpQG-oAYcOJBwgf4KmyT8m5yjup58K43YJ7c",
      links: [
        { type: "GitHub", url: "https://github.com/teambugbusters00" },
        { type: "LinkedIn", url: "https://www.linkedin.com/in/vijay-o-jangid/" }
      ]
    },
    {
      name: "Dinesh Patel",
      role: "Frontend Developer",
      description: "Frontend layout & UI interactions",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGrx34-VuKOrg/profile-displayphoto-shrink_400_400/B4EZNcWB3aHkAg-/0/1732421101344?e=1756944000&v=beta&t=52tckchEEp_-tmAlz0W0DTBjxCqQtyEfx3N_Hg_wJS4",
      links: [
        { type: "GitHub", url: "https://github.com/codingwithdinu" },
        { type: "LinkedIn", url: "https://www.linkedin.com/in/dinesh-patel-35766b2aa/" }
      ]
    },
    {
      name: "Bhawana Kanwar",
      role: "Presenter",
      description: "Project pitching & public presentation",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQF2HtRr9Nj6Jw/profile-displayphoto-scale_400_400/B4EZg_3BfFHgAo-/0/1753418048155?e=1756944000&v=beta&t=oz4FEmaPl-FifkU5K0kpaERGKCjXX_G7_ok6AfDct0s",
      links: [
        { type: "GitHub", url: "" },
        { type: "LinkedIn", url: "https://www.linkedin.com/in/bhawana-kanwar-bb5889337/" }
      ]
    },
    {
      name: "Yuvraj Singh",
      role: "Editor",
      description: "Video editing & visual media support",
      image: "",
      links: [
        { type: "GitHub", url: "" },
        { type: "LinkedIn", url: "" }
      ]
    }
  ];

  const iconMap = {
    GitHub: <FaGithub className="text-lg hover:text-black" />,
    LinkedIn: <FaLinkedin className="text-lg hover:text-blue-600" />
  };

  const technologies = [
    { name: "YOLOv8", description: "State-of-the-art object detection", color: "bg-primary" },
    { name: "Gemini AI", description: "Advanced language understanding", color: "bg-purple-400" },
    { name: "React", description: "Modern web interface", color: "bg-green-400" },
    { name: "TensorFlow", description: "Machine learning framework", color: "bg-blue-400" }
  ];

  const stats = [
    { value: "48hrs", label: "Development Time", icon: Clock, color: "text-primary" },
    { value: "5", label: "AI Models Tested", icon: Target, color: "text-purple-400" },
    { value: "1000+", label: "Test Images", icon: TestTube, color: "text-green-400" },
    { value: "∞", label: "Space Dreams", icon: Infinity, color: "text-primary" }
  ];

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-primary">About AstroSight</h2>
        <p className="text-muted-foreground text-lg">
          Built for the future of space operations with cutting-edge AI technology
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Mission</h3>
          <p className="text-foreground leading-relaxed mb-6">
            AstroSight was developed to revolutionize space station operations by providing real-time, AI-powered object detection and analysis. Our mission is to enhance safety and efficiency for astronauts and mission control teams through intelligent automation.
          </p>
          <p className="text-foreground leading-relaxed">
            Built during a hackathon with space exploration in mind, AstroSight represents the future of human-AI collaboration in space.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-semibold mb-6 text-green-400">Technology Stack</h3>
          <div className="space-y-4">
            {technologies.map((tech, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-4 h-4 ${tech.color} rounded-full mr-4`}></div>
                <span className="text-foreground">
                  <strong>{tech.name}:</strong> {tech.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="glass-card rounded-2xl p-8 mb-12">
        <h3 className="text-2xl font-semibold mb-8 text-center text-primary">
          Development Team
        </h3>
        <div className="grid md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <img
                  src={member.image || "/images/default.jpg"}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-2 border-primary/20"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color || "from-gray-400 to-gray-600"} opacity-20 rounded-full`}></div>
              </div>

              <h4 className="font-semibold text-lg mb-2">{member.name}</h4>
              <p className="text-primary mb-1">{member.role}</p>
              <p className="text-muted-foreground text-sm mb-2">{member.description}</p>

              {/* Social Icons */}
              <div className="flex justify-center gap-3">
                {member.links?.map(
                  (link, i) =>
                    link.url && (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary transition"
                      >
                        {iconMap[link.type]}
                      </a>
                    )
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Stats Section */}
      <div className="glass-morphism rounded-2xl p-8 grid md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index}>
              <div className={`text-3xl font-bold ${stat.color} mb-2 flex items-center justify-center`}>
                <IconComponent className="h-8 w-8 mr-2" />
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
