import { Link } from "react-router-dom";
import { ArrowRight, Clock, Zap } from "lucide-react";

interface PatternCardProps {
  id: string;
  number: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeComplexity: string;
  icon: React.ReactNode;
}

const PatternCard = ({ id, number, title, description, difficulty, timeComplexity, icon }: PatternCardProps) => {
  const difficultyColors = {
    Easy: "bg-success/10 text-success border-success/30",
    Medium: "bg-warning/10 text-warning border-warning/30",
    Hard: "bg-destructive/10 text-destructive border-destructive/30",
  };

  return (
    <Link to={`/patterns/${id}`} className="block">
      <div className="pattern-card group h-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150" />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Pattern #{number.toString().padStart(2, '0')}
            </span>
          </div>

          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {timeComplexity}
            </span>
          </div>

          <div className="flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Learn Pattern
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PatternCard;
