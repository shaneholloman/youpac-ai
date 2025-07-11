import { useParams } from "react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { ClientOnly } from "~/components/ClientOnly";
import ClientCanvas from "~/components/canvas/ClientCanvas";

export default function ProjectCanvas() {
  const { projectId } = useParams();
  const project = useQuery(api.projects.get, { 
    id: projectId as Id<"projects"> 
  });

  if (!project && project !== undefined) {
    return (
      <div className="flex h-[calc(100vh-var(--header-height))] items-center justify-center">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  return (
    <ClientOnly
      fallback={
        <div className="flex h-[calc(100vh-var(--header-height))] items-center justify-center">
          <p className="text-muted-foreground">Loading canvas...</p>
        </div>
      }
    >
      <ClientCanvas projectId={projectId as Id<"projects">} />
    </ClientOnly>
  );
}