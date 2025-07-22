import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string | null;
  cover_image_url: string | null;
}

const ProjectHighlights = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, category, location, cover_image_url')
        .limit(6)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.max(1, projects.length - 2));
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, projects.length - 3) : prevIndex - 1
    );
  };

  const visibleProjects = projects.slice(currentIndex, currentIndex + 3);

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-xl">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
            Featured Projects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Project Highlights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our successful solar installations across utility, commercial, and industrial sectors
          </p>
        </div>

        {projects.length > 0 ? (
          <>
            {/* Project Carousel */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {visibleProjects.map((project, index) => (
                  <Card 
                    key={project.id} 
                    className="group hover:shadow-xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm overflow-hidden"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="aspect-video bg-muted overflow-hidden relative">
                      {project.cover_image_url ? (
                        <img
                          src={project.cover_image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-primary text-white">
                          <div className="text-center">
                            <div className="text-4xl font-bold mb-2">
                              {project.category.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-sm opacity-80">
                              {project.category}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge 
                          variant="secondary" 
                          className="bg-white/90 text-primary font-semibold backdrop-blur-sm"
                        >
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      {project.location && (
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="line-clamp-1">{project.location}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Navigation Buttons */}
              {projects.length > 3 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-card shadow-lg hover:shadow-xl z-10"
                    onClick={prevProject}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white dark:bg-card shadow-lg hover:shadow-xl z-10"
                    onClick={nextProject}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="font-semibold px-8">
                <Link to="/gallery">
                  View Project Gallery
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No projects found. Check back soon for our latest installations!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectHighlights;