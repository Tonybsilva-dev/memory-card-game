type ScoreBoardProps = {
  time: string;
  moves: number;
  moveTimer: number;
};

const StatItem = ({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string | number;
  color: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`material-symbols-outlined text-${color}-400 text-base`}>
        {icon}
      </span>
      <div className="flex items-center gap-1">
        <span className="text-sm text-zinc-300">{label}:</span>
        <span className={`font-semibold text-${color}-300 text-sm`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export const ScoreBoard = ({ time, moves, moveTimer }: ScoreBoardProps) => {
  return (
    <div className="mx-auto mb-8 w-full max-w-2xl border border-zinc-700 bg-zinc-800 p-4">
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <StatItem icon="mouse" label="Moves" value={moves} color="blue" />
        <StatItem icon="schedule" label="Time" value={time} color="purple" />
        <StatItem
          icon="warning"
          label="Move Timer"
          value={`${moveTimer}s`}
          color="orange"
        />
      </div>
    </div>
  );
};
