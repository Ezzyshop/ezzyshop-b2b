import { type ImportJob } from "@/contexts/yemak-import-context/yemak-context-provider";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button/button";
import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useYemakImport } from "@/contexts/yemak-import-context/yemak.context";

const percent = (job: ImportJob) => {
  if (job.status === "done") return 100;
  if (!job.total) return 0;
  return Math.round((job.current / job.total) * 100);
};

const StatusIcon = ({ job }: { job: ImportJob }) => {
  if (job.status === "done")
    return <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />;
  if (job.status === "error")
    return <AlertCircle className="w-4 h-4 text-destructive shrink-0" />;
  return <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />;
};

const JobCard = ({ job }: { job: ImportJob }) => {
  const { dismissJob } = useYemakImport();
  const pct = percent(job);
  const isDone = job.status === "done";
  const isError = job.status === "error";
  const isFinished = isDone || isError;

  return (
    <div className="bg-background border rounded-xl shadow-lg p-4 w-80 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <StatusIcon job={job} />
          <span className="text-sm font-medium truncate">{job.shopName}</span>
        </div>
        {isFinished && (
          <Button
            variant="ghost"
            size="icon"
            className="w-5 h-5 shrink-0"
            onClick={() => dismissJob(job.id)}
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {!isFinished && (
        <div className="space-y-1">
          <Progress value={pct} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="truncate max-w-[200px]">{job.message}</span>
            <span className="shrink-0">{job.total ? `${pct}%` : "—"}</span>
          </div>
        </div>
      )}

      {isDone && job.result && (
        <p className="text-xs text-muted-foreground">
          Tayyor — {job.result.categories} kategoriya, {job.result.products}{" "}
          mahsulot yaratildi, {job.result.skipped} o'tkazib yuborildi.
        </p>
      )}

      {isError && <p className="text-xs text-destructive">{job.error}</p>}
    </div>
  );
};

export const FloatingImportProgress = () => {
  const { jobs } = useYemakImport();

  if (!jobs.length) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end",
      )}
    >
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
