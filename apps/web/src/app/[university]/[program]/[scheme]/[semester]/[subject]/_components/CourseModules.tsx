"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, BrainCircuit, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface Module {
  title: string;
  content: string;
}

interface CourseModulesProps {
  subjectId: string;
  modules: Module[];
  progress: number;
}

export function CourseModules({ subjectId, modules, progress: initialProgress }: CourseModulesProps) {
  const router = useRouter();
  const [loadingModuleIndex, setLoadingModuleIndex] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<boolean[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`completedModules_${subjectId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === modules.length) {
            return parsed;
          }
        } catch (e) {
          // ignore parse errors
        }
      }
    }
    return modules.map(() => false);
  });
  const [progress, setProgress] = useState(initialProgress);

  // Persist completedModules to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`completedModules_${subjectId}`, JSON.stringify(completedModules));
    }
  }, [completedModules, subjectId]);

  // If modules length changes (e.g., new modules added), reset or adjust completedModules
  useEffect(() => {
    if (completedModules.length !== modules.length) {
      setCompletedModules(modules.map(() => false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modules.length]);

  useEffect(() => {
    const newProgress = (completedModules.filter(Boolean).length / modules.length) * 100;
    setProgress(newProgress);
  }, [completedModules, modules.length]);

  const handleChatRedirect = async (module: Module, index: number) => {
    if (!module.content.trim()) {
      alert('No content available for this module.');
      return;
    }

    setLoadingModuleIndex(index);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const title = module.title || 'Selected Module';
    const content = module.content;
    router.push(
      `/chat?title=${encodeURIComponent(title)}&content=${encodeURIComponent(
        content
      )}`
    );
  };

  const handleModuleComplete = (index: number) => {
    const newCompletedModules = [...completedModules];
    newCompletedModules[index] = !newCompletedModules[index];
    setCompletedModules(newCompletedModules);
  };

  return (
    <div className="space-y-4">
      {modules.length === 0 ? (
        <div className="text-center py-10 px-6 bg-muted rounded-2xl">
          <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">No modules found for this syllabus.</p>
          <p className="text-sm text-muted-foreground/80">The content might be under preparation.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-4">
            <Progress value={progress} className="w-full" />
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b-0 rounded-2xl bg-white dark:bg-black/50 backdrop-blur-sm shadow-md overflow-hidden"
                >
                  <AccordionTrigger className="flex justify-between items-center w-full text-left p-6 font-semibold text-lg hover:no-underline">
                    <span className="flex-1 mr-4">{module.title}</span>
                    <Checkbox
                      checked={completedModules[index]}
                      onCheckedChange={() => {
                        handleModuleComplete(index);
                      }}
                    />
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-6 px-6">
                    <div className="mb-6 border-l-2 border-primary pl-4">
                      <h4 className="text-lg font-semibold mb-2">Module Content</h4>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {module.content.trim() || 'No detailed content available.'}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleChatRedirect(module, index)}
                      disabled={loadingModuleIndex === index}
                      className="flex items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background:
                          loadingModuleIndex === index
                            ? 'linear-gradient(90deg, rgba(120,119,198,0.3) 0%, rgba(255,255,255,0.3) 50%, rgba(120,119,198,0.3) 100%)'
                            : undefined,
                        backgroundSize: loadingModuleIndex === index ? '1000px 100%' : undefined,
                        animation: loadingModuleIndex === index ? 'shimmer 2s infinite linear' : undefined,
                      }}
                    >
                      {loadingModuleIndex === index ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-amber-300 transition-transform group-hover:scale-125" />
                      )}
                      Chat with AI about this Module
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </>
      )}
    </div>
  );
}
