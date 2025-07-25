import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import c1 from '@/assets/Arpit_Solar_Shop_Happy_Cuatomers/c1.jpg';
import c2 from '@/assets/Arpit_Solar_Shop_Happy_Cuatomers/c2.jpg';
import c3 from '@/assets/Arpit_Solar_Shop_Happy_Cuatomers/c3.jpg';
import c4 from '@/assets/Arpit_Solar_Shop_Happy_Cuatomers/c4.jpg';
import c5 from '@/assets/Arpit_Solar_Shop_Happy_Cuatomers/c5.jpg';
import c6 from '@/assets/Arpit_Solar_Shop_Happy_Cuatomers/c6.jpg';
import c7 from '@/assets/Arpit_Solar_Shop_Happy_Cuatomers/c7.jpg';
import c8 from '@/assets/Arpit_Solar_Shop_Happy_Cuatomers/c8.jpg';
import c9 from '@/assets/Arpit_Solar_Shop_Happy_Cuatomers/c9.jpg';

const customerImages = [c1, c2, c3, c4, c5, c6, c7, c8, c9];

interface Project {
  id: string;
  title: string;
  category: string;
  location: string | null;
  cover_image_url: string | null;
}

const ProjectHighlights = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectIndex, setProjectIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, category, location, cover_image_url')
          .limit(6)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextProject = () => setProjectIndex((prev) => (prev + 1) % Math.max(1, projects.length - 2));
  const prevProject = () => setProjectIndex((prev) => (prev === 0 ? Math.max(0, projects.length - 3) : prev - 1));
  const visibleProjects = projects.slice(projectIndex, projectIndex + 3);

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-xl">Loading Showcase...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-background dark:to-muted/40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-semibold">Featured Projects</Badge>
          <h2 className="text-4xl font-bold tracking-tight text-primary mb-4">Our Project Highlights</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our solar success stories in commercial and industrial sectors.
          </p>
        </div>

        {/* Project Cards */}
        {projects.length > 0 && (
          <div className="relative mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleProjects.map((project, index) => (
                <Card key={project.id} className="group rounded-2xl overflow-hidden border-0 bg-white/80 dark:bg-card/60 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-video overflow-hidden">
                    {project.cover_image_url ? (
                      <img
                        src={project.cover_image_url}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-primary to-secondary text-white text-4xl font-bold">
                        {project.category[0]}
                      </div>
                    )}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="secondary" className="bg-white/90 text-primary font-semibold backdrop-blur-sm">{project.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition">{project.title}</h3>
                    {project.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{project.location}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            {projects.length > 3 && (
              <>
                <Button onClick={prevProject} size="icon" variant="ghost" className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full">
                  <ArrowLeft className="h-5 w-5 text-primary" />
                </Button>
                <Button onClick={nextProject} size="icon" variant="ghost" className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </Button>
              </>
            )}
          </div>
        )}

        {/* Instant-Camera Style Slider */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-primary mb-4">Installation Glimpses</h3>
          <p className="text-muted-foreground text-base">Moments captured from real customer sites</p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {customerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-[3/4] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-muted/40">
                <img src={image} alt={`Installation ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProjectHighlights;
